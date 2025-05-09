import mongoose from 'mongoose';

const DirectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  biography: { type: String }
});

export default mongoose.models.Director || mongoose.model('Director', DirectorSchema);
