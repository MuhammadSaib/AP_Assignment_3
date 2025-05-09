import dbConnect from '@/lib/dbConnect';
import Director from '@/models/Director';

export default async function handler(req, res) {
  await dbConnect();
  const directors = await Director.find({});
  res.status(200).json(directors);
}
