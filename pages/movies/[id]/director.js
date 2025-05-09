import path from 'path';
import fs from 'fs';

export default function DirectorPage({ director }) {
  if (!director) return <p className="text-center text-red-500 mt-10">Director not found.</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">🎬 Director Info</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{director.name}</h2>

        <p className="text-gray-600">{director.biography}</p>

        <div className="mt-6">
          <a
            href={`/movies/${director.id}`}
            className="inline-block mt-4 text-sm text-blue-500 hover:underline"
          >
            ← Back to Movie
          </a>
        </div>
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
  if (!movie) return { notFound: true };

  const director = data.directors.find(d => d.id === movie.directorId);

  return {
    props: {
      director: director || null
    },
    revalidate: 60,
  };
}
