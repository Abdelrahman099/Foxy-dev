const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Read profile data
const profileData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'profile.json'), 'utf8'));

// API Routes
app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

app.get('/api/profile/basics', (req, res) => {
  res.json(profileData.basics);
});

app.get('/api/profile/skills', (req, res) => {
  res.json(profileData.skills);
});

app.get('/api/profile/projects', (req, res) => {
  res.json(profileData.projects);
});

app.get('/api/profile/education', (req, res) => {
  res.json(profileData.education);
});

app.get('/api/profile/work', (req, res) => {
  res.json(profileData.work);
});

app.get('/api/profile/languages', (req, res) => {
  res.json(profileData.languages);
});

app.get('/api/profile/interests', (req, res) => {
  res.json(profileData.interests);
});

app.get('/api/profile/certificates', (req, res) => {
  res.json(profileData.certificates);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
