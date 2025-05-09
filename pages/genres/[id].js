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
              key={movie._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <Link
                href={`/movies/${movie._id}`}
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
  const genreResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
  
  if (!genreResponse.ok) {
    throw new Error('Failed to fetch genres');
  }

  const genres = await genreResponse.json();

  // Log the structure of the genres response
  console.log('Fetched genres:', genres);

  // Check if genres is an array
  if (!Array.isArray(genres)) {
    throw new Error('Genres data is not an array');
  }

  const paths = genres.map(genre => {
    console.log('Genre:', genre); 
    if (!genre._id) {
      throw new Error(`Genre missing _id: ${JSON.stringify(genre)}`);
    }
    return {
      params: { id: genre._id.toString() } 
    };
  });

  return {
    paths,
    fallback: false
  };
}



export async function getStaticProps({ params }) {
  const genreResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/genres`);
  const genres = await genreResponse.json();

  const genre = genres.find(g => g._id.toString() === params.id);
  if (!genre) return { notFound: true };

  const movieResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies`);
  const movies = await movieResponse.json();

  const filteredMovies = movies.filter(m => m.genreId === genre.id);

  return {
    props: {
      genre,
      movies: filteredMovies
    },
    revalidate: 60
  };
}
