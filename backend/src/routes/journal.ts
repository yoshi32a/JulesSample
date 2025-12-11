import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Journal } from '../models/journal';

const router = express.Router();
const DATA_FILE = path.join(__dirname, '../../data/journals.json');

// Helper to read data
const readData = (): Journal[] => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Helper to write data
const writeData = (data: Journal[]) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET all journals
router.get('/', (req: Request, res: Response) => {
  const journals = readData();
  res.json(journals);
});

// GET single journal
router.get('/:id', (req: Request, res: Response) => {
  const journals = readData();
  const journal = journals.find((j) => j.id === req.params.id);
  if (journal) {
    res.json(journal);
  } else {
    res.status(404).json({ message: 'Journal not found' });
  }
});

// POST new journal
router.post('/', (req: Request, res: Response) => {
  const journals = readData();
  const newJournal: Journal = {
    id: Date.now().toString(), // Simple ID generation
    title: req.body.title,
    content: req.body.content,
    date: new Date().toISOString(),
    tags: req.body.tags || [],
  };
  journals.push(newJournal);
  writeData(journals);
  res.status(201).json(newJournal);
});

// PUT update journal
router.put('/:id', (req: Request, res: Response) => {
  const journals = readData();
  const index = journals.findIndex((j) => j.id === req.params.id);
  if (index !== -1) {
    const updatedJournal = { ...journals[index], ...req.body };
    journals[index] = updatedJournal;
    writeData(journals);
    res.json(updatedJournal);
  } else {
    res.status(404).json({ message: 'Journal not found' });
  }
});

// DELETE journal
router.delete('/:id', (req: Request, res: Response) => {
  let journals = readData();
  const initialLength = journals.length;
  journals = journals.filter((j) => j.id !== req.params.id);
  if (journals.length < initialLength) {
    writeData(journals);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Journal not found' });
  }
});

export default router;
