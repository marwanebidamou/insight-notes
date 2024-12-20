import { Request, Response } from 'express';
import Note, { INote, NoteStatus } from '../models/Note';
import AiService from '../services/AiGenerationService';
import { OPENAI_API_KEY } from '../config/env';

const aiService = new AiService(OPENAI_API_KEY || '');

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
    try {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const notes: INote[] = await Note.find()
            .skip(skip)
            .limit(limit);


        const total = await Note.countDocuments();

        res.json({
            notes,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// Create a new note
export const createNote = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    try {
        const newNote = new Note({ title, content });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Update a note by ID
export const updateNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content, updatedAt: Date.now() }, { new: true });
        if (!updatedNote) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        res.json(updatedNote);
    } catch (error) {
        res.status(400).json({ error });
    }
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Note.findByIdAndDelete(id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Change note status
export const changeNoteStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    try {

        if (!Object.values(NoteStatus).includes(status)) {
            res.status(400).json({ message: 'Invalid status value' });
            return;
        }

        const updatedNote = await Note.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedNote) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }

        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error });
    }
};


// Summarize a note by ID
export const summarizeNote = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const note = await Note.findById(id);
        if (!note) {
            res.status(404).json({ message: 'Note not found' });
            return;
        }
        const summary = await aiService.summarizeText(note.title + " " + note.content);
        note.summary = summary;
        await note.save();
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
};