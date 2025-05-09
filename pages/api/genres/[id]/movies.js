import dbConnect from '@/lib/dbConnect';
import Movie from '@/models/Movie';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const movies = await Movie.find({ genre: id }).populate('genre director');
  res.status(200).json(movies);
}
