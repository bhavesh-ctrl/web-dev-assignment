import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { initSchema, createSchool, listSchools } from './models/School.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/schoolImages', express.static(path.join(__dirname, 'upload', 'schoolImages')));

// Ensure DB schema exists
initSchema().catch(err => {
  console.error('DB init error:', err);
});

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'upload', 'schoolImages'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    const ext = path.extname(file.originalname || '').toLowerCase();
    cb(null, unique + ext);
  }
});
const upload = multer({ storage });

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/schools', upload.single('image'), async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;
    const imagePath = req.file ? `schoolImages/${req.file.filename}` : null;

    if(!name || !address || !city || !state || !contact || !email_id){
      return res.status(400).json({ error: 'All fields are required' });
    }

    const created = await createSchool({
      name, address, city, state, contact, image: imagePath, email_id
    });

    res.status(201).json({ id: created.id, image: imagePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create school' });
  }
});

app.get('/api/schools', async (req, res) => {
  try {
    const rows = await listSchools();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Backend listening on port', PORT);
});
