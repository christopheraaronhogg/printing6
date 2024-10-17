import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const isDevelopment = process.env.NODE_ENV !== 'production';

if (isDevelopment) {
  // In development, serve files from the root directory
  app.use(express.static(__dirname));
} else {
  // In production, serve files from the dist directory
  app.use(express.static('dist'));
}

const dataFile = path.join(__dirname, 'jobs.json');

// ... (keep the existing CRUD operations)

// Serve the frontend
app.get('*', (req, res) => {
  if (isDevelopment) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(port, () => {
  console.log(`Server running in ${isDevelopment ? 'development' : 'production'} mode at http://localhost:${port}`);
});