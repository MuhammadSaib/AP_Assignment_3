import dbConnect from '@/lib/dbConnect';
import Movie from '@/models/Movie';
import Genre from '@/models/Genre';
import Director from '@/models/Director';

export default async function handler(req, res) {
  try {
    await dbConnect();
    // Clear existing data (optional)
    await Movie.deleteMany({});
    await Genre.deleteMany({});
    await Director.deleteMany({});
    console.log("Data base created")
    // Insert genres
    const genresData = [
      { name: "Science Fiction" },
      { name: "Adventure" },
      { name: "Drama" },
      { name: "Thriller" }
    ];
    const genres = await Genre.insertMany(genresData);

    // Insert directors
    const directorsData = [
      { name: "Christopher Nolan", biography: "British-American director..." },
      { name: "Baz Luhrmann", biography: "Australian director..." },
      { name: "Bong Joon-ho", biography: "South Korean filmmaker..." },
      { name: "The Wachowskis", biography: "Sibling duo..." },
      { name: "Damien Chazelle", biography: "American director..." },
    ];
    const directors = await Director.insertMany(directorsData);

    // Map IDs
    const genreMap = {
      "g1": genres[0]._id,
      "g3": genres[1]._id,
      "g4": genres[2]._id,
      "g5": genres[3]._id
    };
    const directorMap = {
      "d1": directors[0]._id,
      "d3": directors[1]._id,
      "d4": directors[2]._id,
      "d5": directors[3]._id,
      "d6": directors[4]._id
    };

    // Insert movies
    const moviesData = [
      {
        title: "Inception",
        description: "A mind-bending thriller...",
        releaseYear: 2010,
        rating: 8.8,
        genre: genreMap["g1"],
        director: directorMap["d1"]
      },
      {
        title: "The Great Gatsby",
        description: "A mysterious millionaire...",
        releaseYear: 2013,
        rating: 7.2,
        genre: genreMap["g4"],
        director: directorMap["d3"]
      },
      {
        title: "Interstellar",
        description: "A team of explorers...",
        releaseYear: 2014,
        rating: 8.6,
        genre: genreMap["g3"],
        director: directorMap["d1"]
      },
      {
        title: "Parasite",
        description: "A poor family schemes...",
        releaseYear: 2019,
        rating: 8.6,
        genre: genreMap["g5"],
        director: directorMap["d4"]
      },
      {
        title: "The Matrix",
        description: "A hacker discovers...",
        releaseYear: 1999,
        rating: 8.7,
        genre: genreMap["g1"],
        director: directorMap["d5"]
      },
      {
        title: "La La Land",
        description: "A jazz musician and actress...",
        releaseYear: 2016,
        rating: 8.0,
        genre: genreMap["g4"],
        director: directorMap["d6"]
      }
    ];

    await Movie.insertMany(moviesData);

    return res.status(200).json({ message: 'Database seeded successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Seeding failed' });
  }
}
