/**
 * Part A: HTTP Module and Server Creation
 * ---------------------------------------
 * Uses only Node's built-in `http` and `fs` modules (no Express).
 * Runs on port 3000.
 */

// ---- A1: Import built-in modules ----
import http from 'http';

const PORT = 3000;

// In-memory "database": an array of vehicle objects (no real database used)
const vehicles = [
  { id: 1, vehicleName: 'Hyundai Creta', vehicleNumber: 'HR26AB1234', type: 'SUV', price: 1500000 },
  { id: 2, vehicleName: 'Honda City', vehicleNumber: 'DL3CAB4567', type: 'Sedan', price: 1200000 },
  { id: 3, vehicleName: 'Tata Nexon', vehicleNumber: 'UP14CD9876', type: 'SUV', price: 1100000 }
];

// ---- Helper functions to send responses with the correct Content-Type ----

// Sends a JSON response with the given status code
const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data, null, 2)); // null, 2 = pretty-print
};

// Sends an HTML response with the given status code
const sendHtml = (res, statusCode, html) => {
  res.writeHead(statusCode, { 'Content-Type': 'text/html' });
  res.end(html);
};

// ---- A1: Create the HTTP server (this function runs for every request) ----
const server = http.createServer((req, res) => {
  const { method } = req;
  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

  // Home page: welcome page in HTML
  if (pathname === '/' && method === 'GET') {
    return sendHtml(
      res,
      200,
      `<html><head><title>Vehicle Management</title></head>
       <body style="font-family: Arial, sans-serif; text-align:center; margin-top:60px;">
         <h1>Welcome to the Vehicle Management Application</h1>
         <p>Built with the Node.js HTTP module.</p>
         <p><a href="/vehicles">Vehicles</a> | <a href="/about">About</a> | <a href="/info">Info</a></p>
       </body></html>`
    );
  }

  // GET /vehicles: list of all vehicles as JSON
  if (pathname === '/vehicles' && method === 'GET') {
    return sendJson(res, 200, vehicles);
  }

  // /about: application information
  if (pathname === '/about' && method === 'GET') {
    return sendJson(res, 200, {
      application: 'Vehicle Management Web Application',
      version: '1.0.0',
      description: 'Maintains vehicle records using the Node.js HTTP module with in-memory storage.',
      technologies: ['Node.js', 'HTTP Module', 'FS Module']
    });
  }

  sendJson(res, 404, { error: 'Route not found' });
});

// Start listening and print a message when the server starts
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
