import path from 'path';
import fs from 'fs';
import { useState } from 'react';
import Link from 'next/link';

export default function MoviesPage({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = selectedGenre === 'all'
    ? movies
    : movies.filter(movie => movie.genreId === selectedGenre);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎥 All Movies</h1>

      <div>
        <label>Filter by Genre: </label>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="all">All</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {filteredMovies.map(movie => (
          <div key={movie.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
            <Link href={`/movies/${movie.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      movies: data.movies,
      genres: data.genres,
    },
    revalidate: 60,
  };
}

