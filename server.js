// ============================================================
//  React Fetch Requests — Student Backend (Node.js + Express)
//  Run:  node server.js
//  API:  http://localhost:5000
// ============================================================

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// ── Middleware ───────────────────────────────────────────────
app.use(cors());              // Allow requests from React (port 3000)
app.use(express.json());      // Parse JSON request bodies (req.body)

// ── In-memory "database" ────────────────────────────────────
let products = [
  { id: 1, name: "Laptop",     price: 999,  category: "Electronics" },
  { id: 2, name: "Headphones", price: 79,   category: "Electronics" },
  { id: 3, name: "Desk Chair", price: 249,  category: "Furniture"   },
  { id: 4, name: "Notebook",   price: 5,    category: "Stationery"  },
  { id: 5, name: "Backpack",   price: 49,   category: "Accessories" },
];

let users = [
  { id: 1, name: "Ashan",  email: "ashan@example.com"  },
  { id: 2, name: "Nimal",  email: "nimal@example.com"  },
  { id: 3, name: "Dilani", email: "dilani@example.com" },
];

// ── Root ─────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "Student API is running!",
    endpoints: [
      "GET    /api/products",
      "GET    /api/products/:id",
      "POST   /api/products",
      "DELETE /api/products/:id",
      "GET    /api/users",
      "POST   /api/users",
    ],
  });
});

// ── PRODUCTS ─────────────────────────────────────────────────

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET single product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// POST create a new product
app.post("/api/products", (req, res) => {
  const { name, price, category } = req.body;

  // Basic validation
  if (!name || !price) {
    return res.status(400).json({ error: "name and price are required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price: Number(price),
    category: category || "General",
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// DELETE a product by id
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const deleted = products.splice(index, 1)[0];
  res.json({ message: "Deleted successfully", product: deleted });
});

// ── USERS ────────────────────────────────────────────────────

// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// POST create a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  Student API running at http://localhost:${PORT}`);
  console.log(`  Try: http://localhost:${PORT}/api/products\n`);
});
