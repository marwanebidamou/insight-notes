import mongoose, { Document, Schema } from 'mongoose';

// Define the Note interface that extends Document for type safety
export interface INote extends Document {
    title: string;
    content: string;
    summary?: string;
    status: NoteStatus;
    createdAt: Date;
    updatedAt: Date;
}

export enum NoteStatus {
    NotStarted = "Not Started",
    InProgress = "In Progress",
    Completed = "Completed",
    Archived = "Archived"
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
    status: {
        type: String,
        enum: Object.values(NoteStatus),
        default: NoteStatus.NotStarted,
        required: true
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

