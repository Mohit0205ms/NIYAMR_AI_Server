const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfService = require('./services/pdfService');

const app = express();
const upload = multer({ dest: 'temp/' });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'NiyamR AI PDF Checker API' });
});

app.post('/api/evaluate-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No PDF uploaded" });
    
    const rules = req.body.rules ? JSON.parse(req.body.rules) : [];
    if (!Array.isArray(rules)) {
      return res.status(400).json({ error: 'Rules must be an array' });
    }
    
    const result = await pdfService.evaluatePdf(req.file, rules);
    res.json({ data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
