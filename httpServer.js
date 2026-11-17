/**
 * Part A: HTTP Module and Server Creation
 * ---------------------------------------
 * Uses only Node's built-in `http` and `fs` modules (no Express).
 * Runs on port 3000.
 */

// ---- A1: Import built-in modules ----
import http from 'http';

const PORT = 3000;

// ---- A1: Create the HTTP server (this function runs for every request) ----
const server = http.createServer((req, res) => {
  const { method } = req;
  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

  // Home page: welcome page in HTML
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<html><head><title>Vehicle Management</title></head>
       <body style="font-family: Arial, sans-serif; text-align:center; margin-top:60px;">
         <h1>Welcome to the Vehicle Management Application</h1>
         <p>Built with the Node.js HTTP module.</p>
       </body></html>`);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Route not found' }));
});

// Start listening and print a message when the server starts
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
