import Link from 'next/link';

export default function GenresPage({ genres }) {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">🎭 Movie Genres</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {genres.map(genre => (
          <li key={genre.id} className="bg-white p-4 rounded-lg shadow hover:bg-purple-50 transition">
            <Link
              href={`/genres/${genre._id}`}
              className="text-lg font-semibold text-purple-700 hover:underline"
            >
              {genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch genres from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
    console.log("Genres response", response)
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    
    const data = await response.json();

    return {
      props: {
        genres: data, // Assuming the response is an array of genres
      },
    };
  } catch (err) {
    console.error('Error fetching genres:', err);
    return {
      props: {
        genres: [], // Return empty array if there's an error
      },
    };
  }
}
