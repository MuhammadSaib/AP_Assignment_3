import { useRouter } from 'next/router';

export default function Home({ trendingMovies }) {
  const router = useRouter();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6">Movie House</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trending Movies</h2>
      
      <ul className="space-y-4">
        {trendingMovies.map(movie => (
          <li key={movie._id} className="bg-white text-black shadow p-4 rounded-lg hover:bg-blue-50 transition">
            <p className="text-lg font-medium">
              🎞 <strong>{movie.title}</strong> ({movie.releaseYear})
            </p>
            <p className="text-sm text-gray-600">⭐ Rating: {movie.rating}</p>
          </li>
        ))}
      </ul>

      <div className="text-center mt-8">
        <button
          onClick={() => router.push('/genres')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Browse Genres
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    // Fetch movies from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    
    // Sort the movies based on the rating
    const trendingMovies = data
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);

    return {
      props: { trendingMovies },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (err) {
    console.error('Error fetching trending movies:', err);
    return {
      props: {
        trendingMovies: [], // Return empty array if error occurs
      },
    };
  }
}
