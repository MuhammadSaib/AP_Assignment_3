import { useRouter } from 'next/router';
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
          <Link href={`/movies/${movie._id}/director`} className="text-blue-600 hover:underline">
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
  const res = await fetch('http://localhost:3000/api/movies');
  const data = await res.json();

  const paths = data.map((movie) => ({
    params: { id: movie._id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
  if (!movieRes.ok) {
    console.error(`Failed to fetch movie data: ${movieRes.statusText}`);
    return { notFound: true }; // Return not found if movie is not found
  }

  const movie = await movieRes.json();

  if (!movie) {
    return { notFound: true };
  }
  const directorRes = await fetch(`http://localhost:3000/api/directors/${movie.director._id}`);
  if (!directorRes.ok) {
    console.error(`Error fetching director data: ${directorRes.statusText}`);
    return { props: { movie, directorName: 'Unknown' } };
  }

  const director = await directorRes.json();
  console.log("Director \n", director)
  const directorName = director ? director.director.name : 'Unknown';

  return {
    props: {
      movie,
      directorName,
    },
    revalidate: 60,
  };
}
