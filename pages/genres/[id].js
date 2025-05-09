import path from 'path';
import fs from 'fs';
import Link from 'next/link';

export default function GenreDetailPage({ genre, movies }) {
  if (!genre) return <p className="text-center text-red-500">Genre not found.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-purple-600 mb-6 text-center">
        🎭 {genre.name} Movies
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies found in this genre.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map(movie => (
            <li
              key={movie.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="text-lg font-semibold text-purple-700 hover:underline"
              >
                <strong>{movie.title}</strong> ({movie.releaseYear})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.genres.map(genre => ({
    params: { id: genre.id.toString() }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const genre = data.genres.find(g => g.id.toString() === params.id);
  if (!genre) return { notFound: true };

  const filteredMovies = data.movies.filter(m => m.genreId === genre.id);

  return {
    props: {
      genre,
      movies: filteredMovies
    },
    revalidate: 60
  };
}
