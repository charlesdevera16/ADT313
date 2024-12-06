import React, { useState, useEffect } from 'react';
import { useUser } from '../../../contexts/UserContext';
import { useMovie } from '../../../contexts/MovieContext';
import './search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();
    const { searchMovies, getMovieDetails, addMovie, addCasts, addPhotos, addVideos } = useMovie();

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmQxYTllMmM4MzkwZDIxYTY4YmJlMzE3YTNiM2ZmYSIsIm5iZiI6MTczMzMwNjUwMC43MjEsInN1YiI6IjY3NTAyODg0NWY3NDRiZjE3NDFlMDEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09r7rTktrNXWylHcXNAKDEjf5NeabsVwVwBTuMOp2mc',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
                alert('Error loading movies. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPopularMovies();
    }, []);

    const handleSearch = async (query) => {
        if (!query) {
            setLoading(true);
            try {
                const response = await fetch(
                    'https://api.themoviedb.org/3/movie/popular',
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmQxYTllMmM4MzkwZDIxYTY4YmJlMzE3YTNiM2ZmYSIsIm5iZiI6MTczMzMwNjUwMC43MjEsInN1YiI6IjY3NTAyODg0NWY3NDRiZjE3NDFlMDEwYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.09r7rTktrNXWylHcXNAKDEjf5NeabsVwVwBTuMOp2mc',
                            'Content-Type': 'application/json'
                        }
                    }
                );
                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error('Error fetching popular movies:', error);
            } finally {
                setLoading(false);
            }
            return;
        }
        
        setLoading(true);
        try {
            const results = await searchMovies(query);
            setMovies(results);
        } catch (error) {
            console.error('Error searching movies:', error);
            alert('Error searching movies. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddMovie = async (movie) => {
        try {
            const { credits, images, videos } = await getMovieDetails(movie.id);

            const movieData = {
                userId: user.id,
                tmdbId: movie.id,
                title: movie.title,
                overview: movie.overview,
                popularity: movie.popularity,
                releaseDate: movie.release_date,
                voteAverage: movie.vote_average,
                backdropPath: movie.backdrop_path || '',
                posterPath: movie.poster_path || '',
                isFeatured: false,
                dateCreated: new Date().toISOString(),
                dateUpdated: new Date().toISOString()
            };

            const savedMovie = await addMovie(movieData);

            if (credits.cast?.length > 0) {
                const castsData = credits.cast.slice(0, 10).map(cast => ({
                    movieId: savedMovie.id,
                    userId: user.id,
                    name: cast.name || '',
                    url: cast.profile_path || '',
                    characterName: cast.character || '',
                    dateCreated: new Date().toISOString(),
                    dateUpdated: new Date().toISOString()
                }));
                await addCasts(castsData);
            }

            if (images.backdrops?.length > 0) {
                const photosData = images.backdrops.slice(0, 5).map(image => ({
                    movieId: savedMovie.id,
                    userId: user.id,
                    url: image.file_path || '',
                    description: `Backdrop image for ${movie.title}`,
                    dateCreated: new Date().toISOString(),
                    dateUpdated: new Date().toISOString()
                }));
                await addPhotos(photosData);
            }

            if (videos.results?.length > 0) {
                const videosData = videos.results.map(video => ({
                    movieId: savedMovie.id,
                    userId: user.id,
                    url: `https://www.youtube.com/watch?v=${video.key}`,
                    name: video.name || '',
                    site: video.site || '',
                    videoKey: video.key || '',
                    videoType: video.type || '',
                    official: video.official || false,
                    dateCreated: new Date().toISOString(),
                    dateUpdated: new Date().toISOString()
                }));
                await addVideos(videosData);
            }

            alert('Movie added successfully!');
        } catch (error) {
            console.error('Error adding movie:', error);
            alert(`Error adding movie: ${error.message}`);
        }
    };

    return (
        <div className="search-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                />
                <button onClick={() => handleSearch(searchQuery)}>Search</button>
            </div>

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="movie-grid">
                    {movies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                onError={(e) => {
                                    e.target.src = '/placeholder.png';
                                }}
                            />
                            <div className="movie-info">
                                <h3>{movie.title}</h3>
                                <p>{movie.release_date}</p>
                                <button onClick={() => handleAddMovie(movie)}>Add Movie</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
