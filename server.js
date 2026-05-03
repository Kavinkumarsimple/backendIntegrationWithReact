const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" }
];

// Routes

// GET: Fetch all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// POST: Add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }
  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE: Remove a book by ID
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = books.length;
  books = books.filter(book => book.id !== id);
  
  if (books.length === initialLength) {
    return res.status(404).json({ message: "Book not found" });
  }
  
  res.json({ message: "Book deleted successfully" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
