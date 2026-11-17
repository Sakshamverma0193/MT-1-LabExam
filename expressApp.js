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

// ---- Validation helpers ----

// True if a value is undefined, null or an empty string
const isBlank = (value) => value === undefined || value === null || String(value).trim() === '';

// True only for real numbers greater than 0 (a string like "500" is rejected)
const isPositiveNumber = (value) => typeof value === 'number' && Number.isFinite(value) && value > 0;

// Checks vehicle fields. Returns an error message, or null if everything is valid.
const validateVehicle = (data) => {
  const missing = ['vehicleName', 'vehicleNumber', 'type', 'price'].filter((f) => isBlank(data[f]));
  if (missing.length > 0) return `Missing required fields: ${missing.join(', ')}`;
  if (!isPositiveNumber(data.price)) return 'Price must be a positive number';
  return null;
};

// ---- B2: CRUD endpoints ----

// READ ALL - GET /vehicles
app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

// READ ONE - GET /vehicles/:id  (:id is a route parameter)
app.get('/vehicles/:id', (req, res) => {
  const id = Number(req.params.id); // route params are strings, so convert
  const vehicle = vehicles.find((v) => v.id === id);

  // Vehicle not found -> 404
  if (!vehicle) return res.status(404).json({ error: `Vehicle with id ${req.params.id} not found` });

  res.json(vehicle);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
