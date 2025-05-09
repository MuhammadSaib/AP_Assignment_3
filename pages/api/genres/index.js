import dbConnect from '@/lib/dbConnect';
import Genre from '@/models/Genre';

export default async function handler(req, res) {
  await dbConnect();
  const genres = await Genre.find({});
  res.status(200).json(genres);
}
