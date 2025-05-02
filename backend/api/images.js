const fs = require('fs');
const path = require('path');

// Function to handle image requests
module.exports = async (req, res) => {
  try {
    // Extract the image name from the request path
    // The URL format will be /api/images/imageName.png
    const imagePath = req.url.replace(/^\/api\/images\/?/, '');
    
    if (!imagePath) {
      return res.status(400).json({ error: 'Image path is required' });
    }

    // Construct the full path to the image
    const fullPath = path.join(process.cwd(), 'public', 'Images', imagePath);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'Image not found' });
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
