import path from 'path';
import fs from 'fs';
import Link from 'next/link';

export default function MovieDetails({ movie, directorName }) {
  if (!movie) return <p className="text-center text-red-500 mt-10">Movie not found.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 text-black">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">{movie.title}</h1>

        <p className="mb-2">
          <span className="font-semibold text-gray-700">🎞 Description:</span> {movie.description}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-700">📅 Release Year:</span> {movie.releaseYear}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-700">⭐ Rating:</span> {movie.rating}
        </p>
        <p className="mb-2">
          <span className="font-semibold text-gray-700">🎬 Director:</span>{' '}
          <Link href={`/movies/${movie.id}/director`} className="text-blue-600 hover:underline">
            {directorName}
          </Link>
        </p>

        <Link href="/genres" className="inline-block mt-6 text-sm text-blue-500 hover:underline">
          ← Back to Genres
        </Link>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map(movie => ({   
    params: { id: movie.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find(m => m.id.toString() === params.id);

  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find(d => d.id === movie.directorId);
  const directorName = director ? director.name : 'Unknown';

  return {
    props: {
      movie,
      directorName,
    },
    revalidate: 60,
  };
}
