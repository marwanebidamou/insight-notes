import mongoose, { Document, Schema } from 'mongoose';

// Define the Note interface that extends Document for type safety
export interface INote extends Document {
    title: string;
    content: string;
    summary?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create the schema with type definitions and default values
const NoteSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the Mongoose model based on the schema and interface
export default mongoose.model<INote>('Note', NoteSchema);