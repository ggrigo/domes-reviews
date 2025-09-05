/**
 * Local Development Server for Domes Reviews
 * 
 * This server provides a local development environment that mimics Netlify Functions
 * allowing full testing of the application including AI review generation.
 * 
 * Usage: node local-server.js
 * Then visit: http://localhost:8888
 * 
 * Note: This is only for local development. Production uses Netlify Functions.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const PORT = 8888;

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle API endpoint for review generation
  if (req.url === '/.netlify/functions/generate-review' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        const { prompt } = JSON.parse(body);
        
        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a helpful assistant that writes authentic, personal hotel reviews based on guest experiences. Keep reviews concise (under 150 words) and genuine.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.9,
            max_tokens: 150
          })
        });

        const data = await response.json();
        const review = data.choices[0].message.content;

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ review }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to generate review', details: error.message }));
      }
    });
    return;
  }

  // Serve static files
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml'
  };
  const contentType = contentTypes[extname] || 'text/plain';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`
╭───────────────────────────────────────────────────╮
│                                                   │
│   Local server ready: http://localhost:${PORT}      │
│                                                   │
│   ✓ Static files served                          │
│   ✓ API endpoint at /.netlify/functions/generate-review │
│   ✓ OPENAI_API_KEY loaded from .env              │
│                                                   │
╰───────────────────────────────────────────────────╯
  `);
});