import dbConnect from '@/lib/dbConnect';
import Director from '@/models/Director';
import Movie from '@/models/Movie';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const director = await Director.findById(id);
  if (!director) return res.status(404).json({ error: 'Not found' });

  const movies = await Movie.find({ director: id });
  res.status(200).json({ director, movies });
}
