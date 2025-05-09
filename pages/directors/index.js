// import useSWR from 'swr';
// import Link from 'next/link';

// const fetcher = (url) => fetch(url).then((res) => res.json());

// export default function DirectorsPage() {
//   const { data, error } = useSWR('/api/directors', fetcher);

//   if (error) return <p className="text-center text-red-500 mt-10">Failed to load directors.</p>;
//   if (!data) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
//         <h1 className="text-3xl font-bold text-purple-700 mb-4">🎬 Directors</h1>

//         {data.directors.map((director) => (
//           <div key={director.id} className="mb-6 border-b pb-6">
//             <h2 className="text-2xl font-semibold text-gray-800">{director.name}</h2>
//             <p className="text-gray-600 mt-2">{director.biography}</p>

//             <h4 className="text-lg font-medium mt-4 text-black">Movies Directed:</h4>
//             <ul className="list-disc pl-5 mt-2">
//               {data.movies
//                 .filter((movie) => movie.directorId === director.id)
//                 .map((movie) => (
//                   <li key={movie.id} className="mt-2">
//                     <Link href={`/movies/${movie.id}`} className="text-blue-500 hover:underline">
//                       {movie.title}
//                     </Link>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

// export default function DirectorsPage() {
//   const [directors, setDirectors] = useState([]);
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [directorsRes, moviesRes] = await Promise.all([
//           axios.get('/api/directors'),
//           axios.get('/api/movies'),
//         ]);
//         setDirectors(directorsRes.data);
//         setMovies(moviesRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//         setError(true);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (error) return <p className="text-center text-red-500 mt-10">Failed to load data.</p>;
//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="p-8 bg-gray-100 min-h-screen">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
//         <h1 className="text-3xl font-bold text-purple-700 mb-4">🎬 Directors</h1>

//         {directors.map((director) => (
//           <div key={director._id} className="mb-6 border-b pb-6">
//             <h2 className="text-2xl font-semibold text-gray-800">{director.name}</h2>
//             <p className="text-gray-600 mt-2">{director.biography}</p>

//             <h4 className="text-lg font-medium mt-4 text-black">Movies Directed:</h4>
//             <ul className="list-disc pl-5 mt-2">
//               {movies
//                 .filter((movie) => movie.director.toString() === director._id.toString())
//                 .map((movie) => (
//                   <li key={movie._id} className="mt-2">
//                     <Link href={`/movies/${movie._id}`} className="text-blue-500 hover:underline">
//                       {movie.title}
//                     </Link>
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function DirectorsPage() {
  const [directors, setDirectors] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [directorsRes, moviesRes] = await Promise.all([
          axios.get('/api/directors'),
          axios.get('/api/movies'),
        ]);
        setDirectors(directorsRes.data);
        setMovies(moviesRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) return <p className="text-center text-red-500 mt-10">Failed to load data.</p>;
  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-4">🎬 Directors</h1>

        {directors.map((director) => (
          <div key={director._id} className="mb-6 border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{director.name}</h2>
            <p className="text-gray-600 mt-2">{director.biography}</p>

            <h4 className="text-lg font-medium mt-4 text-black">Movies Directed:</h4>
            <ul className="list-disc pl-5 mt-2">
              {movies
                .filter((movie) => movie.director._id.toString() === director._id.toString()) // Ensure the director._id is being compared properly
                .map((movie) => (
                  <li key={movie._id} className="mt-2">
                    <Link href={`/movies/${movie._id}`} className="text-blue-500 hover:underline">
                      {movie.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
