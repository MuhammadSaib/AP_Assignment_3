import dbConnect from '@/lib/dbConnect';
import Movie from '@/models/Movie';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const movie = await Movie.findById(id).populate('genre director');
  if (!movie) return res.status(404).json({ error: 'Not found' });
  res.status(200).json(movie);
}
