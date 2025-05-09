import dbConnect from '@/lib/dbConnect';
import Movie from '@/models/Movie';
import Genre from '@/models/Genre'; // Required for Mongoose to know how to populate the 'genre' field
import Director from '@/models/Director'; // Required for Mongoose to know how to populate the 'director' field

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Populate the 'genre' and 'director' fields in the Movie documents
      const movies = await Movie.find({}).populate('genre director');
      return res.status(200).json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      return res.status(500).json({ error: 'Failed to fetch movies' });
    }
  }
}
