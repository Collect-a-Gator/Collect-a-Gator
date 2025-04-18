import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Entry must be assigned to a specific user"],
    },
    date: { 
        type: String,
        required: [true, "Entry must have a date"],
    },
    location: {
        type: String, 
        required: [true, "Entry must have a location"],  
    },
    placeID: {
        type: String,
        required: [true, "Entry must have a place ID"],
    },
    title: {
        type: String,
        required: [true, "Entry must have a title"],
    },
    content: {
        type: String, 
        required: [true, "Entry must have content"],
    },
    longitude: {
        type: Number,
        required: [true, "Entry must have a longitude"],
    },
    latitude: {
        type: Number,
        required: [true, "Entry must have a latitude"],
    }
});

export const Entry = mongoose.model('Entry', entrySchema);
