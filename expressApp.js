/**
 * Part B: Vehicle Management REST API using Express.js
 * ----------------------------------------------------
 * Implements full CRUD (Create, Read, Update, Delete) on vehicles.
 * Runs on port 4000.
 */

// ---- B1: Import Express and create the application ----
import express from 'express';

const PORT = 4000;
const app = express();

// Middleware: parse incoming JSON request bodies into req.body
app.use(express.json());

// In-memory "database": array with three sample vehicles (no real database used)
let vehicles = [
  { id: 1, vehicleName: 'Hyundai Creta', vehicleNumber: 'HR26AB1234', type: 'SUV', price: 1500000 },
  { id: 2, vehicleName: 'Honda City', vehicleNumber: 'DL3CAB4567', type: 'Sedan', price: 1200000 },
  { id: 3, vehicleName: 'Tata Nexon', vehicleNumber: 'UP14CD9876', type: 'SUV', price: 1100000 }
];

// Start the server
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
