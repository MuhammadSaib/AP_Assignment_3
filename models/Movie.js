import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseYear: Number,
    rating: Number,
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true }
  });
  

// Prevent model overwrite during hot reloads
export default mongoose.models.Movie || mongoose.model('Movie', movieSchema);
