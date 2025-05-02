const fs = require('fs');
const path = require('path');

// This is a dynamic API route that will handle any image request
// The URL format will be /api/images/imageName.png
module.exports = (req, res) => {
  try {
    // Get the image name from the request parameters
    const { imageName } = req.query;
    
    console.log('Request for image:', imageName);
    
    if (!imageName) {
      return res.status(400).json({ error: 'Image name is required' });
    }

    // Construct possible paths to check
    const imagesDir = path.join(process.cwd(), 'public', 'Images');
    
    // First try the exact path
    let fullPath = path.join(imagesDir, imageName);
    
    // Check if the file exists with exact path
    if (!fs.existsSync(fullPath)) {
      console.log('Image not found at path:', fullPath);
      
      // Try to find the file with case-insensitive matching
      try {
        const files = fs.readdirSync(imagesDir);
        
        // Find a case-insensitive match
        const matchingFile = files.find(file => 
          file.toLowerCase() === imageName.toLowerCase());
        
        if (matchingFile) {
          fullPath = path.join(imagesDir, matchingFile);
          console.log('Found matching file with different case:', matchingFile);
        } else {
          // Special case for "wally8.png" - redirect to "Wally.png"
          if (imageName.toLowerCase() === 'wally8.png') {
            fullPath = path.join(imagesDir, 'Wally.png');
            console.log('Redirecting wally8.png to Wally.png');
          } else {
            console.log('No matching file found in directory. Available files:', files);
            return res.status(404).json({ error: 'Image not found' });
          }
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
