#!/usr/bin/env node

/**
 * Hausset Website Deployment Script
 * 
 * This script handles the automated deployment of your Hausset website.
 * It watches for content changes and triggers rebuilds as needed.
 */

const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');
const chokidar = require('chokidar');

const CONFIG = {
  contentPath: path.join(__dirname, '../content'),
  buildPath: path.join(__dirname, '../client/dist'),
  serverPath: path.join(__dirname, '../server'),
  clientPath: path.join(__dirname, '../client'),
  watchMode: process.argv.includes('--watch'),
  production: process.env.NODE_ENV === 'production'
};

class DeploymentManager {
  constructor() {
    this.isBuilding = false;
    this.buildQueue = [];
    this.lastBuild = null;
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: '🔵',
      success: '✅',
      warning: '⚠️',
      error: '❌',
      build: '🔨'
    }[type] || '📝';
    
    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  async runCommand(command, args, options = {}) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        ...options
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });

      process.on('error', reject);
    });
  }

  async checkDependencies() {
    this.log('Checking dependencies...', 'info');
    
    try {
      // Check if node_modules exist
      const clientNodeModules = path.join(CONFIG.clientPath, 'node_modules');
      const serverNodeModules = path.join(CONFIG.serverPath, 'node_modules');
      
      await fs.access(clientNodeModules);
      await fs.access(serverNodeModules);
      
      this.log('Dependencies found', 'success');
      return true;
    } catch (error) {
      this.log('Dependencies missing. Run: npm run install:all', 'warning');
      return false;
    }
  }

  async buildClient() {
    if (this.isBuilding) {
      this.log('Build already in progress, queuing...', 'warning');
      return;
    }

    this.isBuilding = true;
    this.log('Building client application...', 'build');

    try {
      await this.runCommand('npm', ['run', 'build'], { 
        cwd: CONFIG.clientPath 
      });
      
      this.lastBuild = new Date();
      this.log(`Client build completed successfully`, 'success');
      
      // Process any queued builds
      if (this.buildQueue.length > 0) {
        this.buildQueue = [];
        setTimeout(() => this.buildClient(), 1000);
      }
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error');
      throw error;
    } finally {
      this.isBuilding = false;
    }
  }

  async startServer() {
    this.log('Starting server...', 'info');
    
    try {
      if (CONFIG.production) {
        await this.runCommand('npm', ['start'], { 
          cwd: CONFIG.serverPath 
        });
      } else {
        await this.runCommand('npm', ['run', 'dev'], { 
          cwd: CONFIG.serverPath 
        });
      }
    } catch (error) {
      this.log(`Server start failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async validateContent() {
    this.log('Validating content files...', 'info');
    
    const requiredFiles = [
      'config/site.json',
      'problems/problems.json',
      'products/screenshots.json'
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(CONFIG.contentPath, file);
      
      try {
        const content = await fs.readFile(filePath, 'utf8');
        JSON.parse(content); // Validate JSON syntax
        this.log(`✓ ${file}`, 'success');
      } catch (error) {
        this.log(`✗ ${file}: ${error.message}`, 'error');
        throw new Error(`Invalid content file: ${file}`);
      }
    }
  }

  setupContentWatcher() {
    if (!CONFIG.watchMode) return;

    this.log('Setting up content file watcher...', 'info');
    
    const watcher = chokidar.watch(CONFIG.contentPath, {
      ignored: /(^|[\/\\])\../, // ignore dotfiles
      persistent: true,
      ignoreInitial: true
    });

    watcher.on('change', (filePath) => {
      const relativePath = path.relative(CONFIG.contentPath, filePath);
      this.log(`Content changed: ${relativePath}`, 'info');
      
      if (filePath.endsWith('.json')) {
        this.validateContentFile(filePath)
          .then(() => {
            this.log('Content validation passed', 'success');
            this.triggerRebuild('content change');
          })
          .catch((error) => {
            this.log(`Content validation failed: ${error.message}`, 'error');
          });
      }
    });

    watcher.on('add', (filePath) => {
      const relativePath = path.relative(CONFIG.contentPath, filePath);
      this.log(`Content added: ${relativePath}`, 'info');
    });

    this.log('Content watcher active', 'success');
  }

  async validateContentFile(filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      JSON.parse(content);
      return true;
    } catch (error) {
      throw new Error(`Invalid JSON in ${path.basename(filePath)}: ${error.message}`);
    }
  }

  triggerRebuild(reason) {
    this.log(`Rebuild triggered: ${reason}`, 'build');
    
    if (this.isBuilding) {
      this.buildQueue.push(reason);
    } else {
      // Debounce rapid changes
      clearTimeout(this.rebuildTimeout);
      this.rebuildTimeout = setTimeout(() => {
        this.buildClient();
      }, 2000);
    }
  }

  async deploy() {
    try {
      this.log('🚀 Starting Hausset website deployment...', 'info');
      
      // Check environment
      this.log(`Environment: ${CONFIG.production ? 'production' : 'development'}`, 'info');
      this.log(`Watch mode: ${CONFIG.watchMode ? 'enabled' : 'disabled'}`, 'info');
      
      // Validate content
      await this.validateContent();
      
      // Check dependencies
      const depsOk = await this.checkDependencies();
      if (!depsOk) {
        process.exit(1);
      }
      
      // Build client
      await this.buildClient();
      
      // Setup content watching
      this.setupContentWatcher();
      
      // Start server
      if (!CONFIG.watchMode) {
        await this.startServer();
      } else {
        this.log('Watch mode: Server should be started separately', 'info');
        this.log('Run: npm run dev', 'info');
      }
      
      this.log('🎉 Deployment completed successfully!', 'success');
      
    } catch (error) {
      this.log(`💥 Deployment failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// CLI handling
if (require.main === module) {
  const manager = new DeploymentManager();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    manager.log('Received SIGINT, shutting down gracefully...', 'info');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    manager.log('Received SIGTERM, shutting down gracefully...', 'info');
    process.exit(0);
  });
  
  // Start deployment
  manager.deploy().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = DeploymentManager;