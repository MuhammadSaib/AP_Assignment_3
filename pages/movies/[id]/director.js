import Link from 'next/link';

export default function DirectorPage({ director, movieId }) {
  if (!director) {
    return <p className="text-center text-red-500 mt-10">Director not found.</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">🎬 Director Info</h1>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{director.name}</h2>

        <p className="text-gray-600">{director.biography}</p>

        <div className="mt-6">
          <Link
            href={`/movies/${movieId}`}  // Linking back to the movie page
            className="inline-block mt-4 text-sm text-blue-500 hover:underline"
          >
            ← Back to Movie
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch all movies to get the movie IDs
  const movieRes = await fetch('http://localhost:3000/api/movies'); 
  const movies = await movieRes.json();

  // Check if movies data is available
  if (!movies || movies.length === 0) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  // Generate paths for each movie with movie_id as the dynamic parameter
  const paths = movies.map(movie => ({
    params: { id: movie._id.toString() },  // Ensure _id is properly converted to string
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

// Fetch the director data for the movie
export async function getStaticProps({ params }) {
  try {
    // Fetch movie data based on the movie_id (params.id)
    const movieRes = await fetch(`http://localhost:3000/api/movies/${params.id}`);
    if (!movieRes.ok) {
      throw new Error('Movie not found');
    }
    
    const movie = await movieRes.json();
    const directorId = movie.director._id;  // Get the director ID from the movie

    // Fetch the director data based on the directorId
    const directorRes = await fetch(`http://localhost:3000/api/directors/${directorId}`);
    if (!directorRes.ok) {
      throw new Error('Director not found');
    }

    const director = await directorRes.json();
    console.log("Director", director)
    return {
      props: {
        director: director.director || null,
        movieId: params.id,  // Pass the movie ID for the back link
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        director: null,
        movieId: params.id,  // Pass the movie ID even if there's an error
      },
    };
  }
}
