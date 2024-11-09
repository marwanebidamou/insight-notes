import { Router } from 'express';
import { getNotes, createNote, updateNote, deleteNote, changeNoteStatus, summarizeNote } from '../controllers/notesController';

const router = Router();

// Route to get all notes
router.get('/', getNotes);

// Route to create a new note
router.post('/', createNote);

// Route to update a note by ID
router.put('/:id', updateNote);

// Route to delete a note by ID
router.delete('/:id', deleteNote);

// Route to update a note status by ID
router.patch('/:id/status', changeNoteStatus);

// Route to summarize a note by ID
router.post('/:id/summarize', summarizeNote);

export default router;
