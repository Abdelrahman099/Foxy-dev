const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'profile.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
