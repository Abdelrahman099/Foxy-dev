const fs = require('fs');
const path = require('path');

// Function to handle image requests
module.exports = (req, res) => {
  try {
    // In Vercel serverless functions, the URL structure is different
    // Extract the image name from various possible request formats
    let imagePath;
    
    // Check if we have a query parameter (used by Vercel rewrites)
    if (req.query && req.query.path) {
      imagePath = req.query.path;
    } else {
      // Try to extract from URL path
      // Handle various URL formats
      const url = req.url || '';
      
      // Log the full URL for debugging
      console.log('Request URL:', url);
      console.log('Request query:', req.query);
      
      // Handle different URL patterns
      if (url.includes('/api/images/')) {
        imagePath = url.split('/api/images/')[1];
      } else if (url.startsWith('/')) {
        imagePath = url.substring(1); // Remove leading slash
      } else {
        imagePath = url;
      }
    }
    
    console.log('Extracted image path:', imagePath);
    
    if (!imagePath) {
      return res.status(400).json({ error: 'Image path is required' });
    }

    console.log('Image requested:', imagePath);
    console.log('Current working directory:', process.cwd());
    
    // First try with the exact path provided
    let fullPath = path.join(process.cwd(), 'public', 'Images', imagePath);
    
    // Check if the file exists with exact path
    if (!fs.existsSync(fullPath)) {
      console.log('Image not found at path:', fullPath);
      
      // Try to find the file with case-insensitive matching
      try {
        const imagesDir = path.join(process.cwd(), 'public', 'Images');
        const files = fs.readdirSync(imagesDir);
        
        // Find a case-insensitive match
        const matchingFile = files.find(file => 
          file.toLowerCase() === imagePath.toLowerCase());
        
        if (matchingFile) {
          fullPath = path.join(imagesDir, matchingFile);
          console.log('Found matching file with different case:', matchingFile);
        } else {
          console.log('No matching file found in directory. Available files:', files);
          return res.status(404).json({ error: 'Image not found' });
        }
      } catch (dirError) {
        console.error('Error reading images directory:', dirError);
        return res.status(404).json({ error: 'Image not found' });
      }
    }

    // Determine the content type based on file extension
    const ext = path.extname(fullPath).toLowerCase();
    const contentTypeMap = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml'
    };
    
    const contentType = contentTypeMap[ext] || 'application/octet-stream';
    
    // Read the file and send it as a response
    const imageBuffer = fs.readFileSync(fullPath);
    
    // Set appropriate headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    // Send the image
    return res.status(200).send(imageBuffer);
  } catch (error) {
    console.error('Error serving image:', error);
    return res.status(500).json({ error: 'Failed to serve image' });
  }
};
