const chokidar = require('chokidar');
const path = require('path');

const CONTENT_PATH = path.join(__dirname, '../content');

console.log('🔍 Starting content file watcher...');
console.log(`📁 Watching: ${CONTENT_PATH}`);

// Initialize watcher
const watcher = chokidar.watch(CONTENT_PATH, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
  depth: 3
});

// Content change handler
function handleContentChange(eventType, filePath) {
  const relativePath = path.relative(CONTENT_PATH, filePath);
  const timestamp = new Date().toLocaleTimeString();
  
  console.log(`\n[${timestamp}] 📝 Content ${eventType}: ${relativePath}`);
  
  // Determine content type
  let contentType = 'unknown';
  if (filePath.includes('/config/')) contentType = 'configuration';
  else if (filePath.includes('/problems/')) contentType = 'problems';
  else if (filePath.includes('/products/')) contentType = 'products';
  else if (filePath.includes('/images/')) contentType = 'assets';
  
  console.log(`   📂 Type: ${contentType}`);
  
  if (process.env.AUTO_REBUILD === 'true') {
    console.log('   🔄 Auto-rebuild triggered');
    // Here you could trigger a rebuild process if needed
    // For now, the React app will fetch updated content via API
  }
}

// Event listeners
watcher
  .on('add', (filePath) => handleContentChange('added', filePath))
  .on('change', (filePath) => handleContentChange('changed', filePath))
  .on('unlink', (filePath) => handleContentChange('removed', filePath))
  .on('addDir', (dirPath) => {
    const relativePath = path.relative(CONTENT_PATH, dirPath);
    console.log(`📁 Directory added: ${relativePath}`);
  })
  .on('unlinkDir', (dirPath) => {
    const relativePath = path.relative(CONTENT_PATH, dirPath);
    console.log(`📁 Directory removed: ${relativePath}`);
  })
  .on('error', (error) => {
    console.error('❌ Watcher error:', error);
  })
  .on('ready', () => {
    console.log('✅ Content watcher ready for changes');
    console.log('\n💡 Make changes to files in the content/ folder to see them reflected on your website');
    console.log('   • Edit content/config/site.json for site settings');
    console.log('   • Update content/problems/problems.json for problem statements');
    console.log('   • Modify content/products/screenshots.json for product info');
    console.log('   • Add images to content/images/ folder\n');
  });

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping content watcher...');
  watcher.close().then(() => {
    console.log('✅ Content watcher stopped');
    process.exit(0);
  });
});