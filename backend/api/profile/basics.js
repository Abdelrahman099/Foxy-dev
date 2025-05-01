// api/profile/basics.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // 1) Always set these CORS headers
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2) Handle the preflight request
  if (req.method === 'OPTIONS') {
    // returning early for OPTIONS
    return res.status(200).end();
  }

  // 3) Now handle the real GET
  try {
    const dataPath = path.join(__dirname, '..', '..', 'data', 'profile.json');
    const file = fs.readFileSync(dataPath, 'utf8');
    const profile = JSON.parse(file);
    return res.status(200).json(profile.basics);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
