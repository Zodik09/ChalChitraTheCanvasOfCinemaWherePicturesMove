import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../redux/counter/moviesSlice';

const Hero = () => {
    const dispatch = useDispatch();
    const { movies, loading, error } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchPopularMovies());
    }, [dispatch]);

    if (loading) return <p className="text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {movies}
            {/* {movies.map((movie) => (
                <div key={movie.id} className="bg-gray-800 p-4 rounded-lg">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded mb-2"
                    />
                    <h3 className="text-white font-semibold">{movie.title}</h3>
                </div>
            ))} */}
        </div>
    );
};

export default Hero;

// <div className='bg-black w-full p-5'>