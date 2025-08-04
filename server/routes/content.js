const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const CONTENT_PATH = path.join(__dirname, '../../content');

// Helper function to read JSON files safely
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

// Helper function to check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Get site configuration
router.get('/config', async (req, res) => {
  try {
    const configPath = path.join(CONTENT_PATH, 'config/site.json');
    const config = await readJsonFile(configPath);
    
    if (!config) {
      return res.status(404).json({ error: 'Site configuration not found' });
    }
    
    res.json(config);
  } catch (error) {
    console.error('Error fetching config:', error);
    res.status(500).json({ error: 'Failed to load site configuration' });
  }
});

// Get problems data
router.get('/problems', async (req, res) => {
  try {
    const problemsPath = path.join(CONTENT_PATH, 'problems/problems.json');
    const problems = await readJsonFile(problemsPath);
    
    if (!problems) {
      return res.status(404).json({ error: 'Problems data not found' });
    }
    
    res.json(problems);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: 'Failed to load problems data' });
  }
});

// Get product screenshots
router.get('/products', async (req, res) => {
  try {
    const productsPath = path.join(CONTENT_PATH, 'products/screenshots.json');
    const products = await readJsonFile(productsPath);
    
    if (!products) {
      return res.status(404).json({ error: 'Products data not found' });
    }
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to load products data' });
  }
});

// Get all content (combined endpoint)
router.get('/all', async (req, res) => {
  try {
    const [config, problems, products] = await Promise.all([
      readJsonFile(path.join(CONTENT_PATH, 'config/site.json')),
      readJsonFile(path.join(CONTENT_PATH, 'problems/problems.json')),
      readJsonFile(path.join(CONTENT_PATH, 'products/screenshots.json'))
    ]);

    res.json({
      config: config || {},
      problems: problems || [],
      products: products || [],
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching all content:', error);
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// List available images
router.get('/images', async (req, res) => {
  try {
    const imagesPath = path.join(CONTENT_PATH, 'images');
    
    if (!(await fileExists(imagesPath))) {
      return res.json({ images: [] });
    }
    
    const files = await fs.readdir(imagesPath, { withFileTypes: true });
    const images = files
      .filter(file => file.isFile() && /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file.name))
      .map(file => ({
        name: file.name,
        url: `/content/images/${file.name}`,
        path: `images/${file.name}`
      }));
    
    res.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    res.status(500).json({ error: 'Failed to list images' });
  }
});

module.exports = router;