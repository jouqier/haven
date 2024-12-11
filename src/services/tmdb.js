import { API_CONFIG } from '../config/api.js';

class TMDBService {
    // Получить популярные фильмы
    static async getPopularMovies(page = 1) {
        console.log('Fetching popular movies...');
        try {
            const url = `${API_CONFIG.BASE_URL}/movie/popular?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}&page=${page}`;
            console.log('Request URL:', url);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Popular movies data:', data);
            return data;
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            throw error;
        }
    }

    // Получить детали фильма
    static async getMovieDetails(movieId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/movie/${movieId}?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie details:', error);
            throw error;
        }
    }

    // Поиск фильмов
    static async searchMovies(query) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/search/movie?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}&query=${encodeURIComponent(query)}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching movies:', error);
            throw error;
        }
    }

    // Получить актёрский состав фильма
    static async getMovieCredits(movieId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/movie/${movieId}/credits?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie credits:', error);
            throw error;
        }
    }

    // Получить рекомендации для фильма
    static async getMovieRecommendations(movieId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/movie/${movieId}/recommendations?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie recommendations:', error);
            throw error;
        }
    }

    // Получить полную информацию о фильме (детали + актёры + рекомендации)
    static async getFullMovieInfo(id, type = 'movie') {
        try {
            const [details, credits, recommendations] = await Promise.all([
                type === 'movie' ? this.getMovieDetails(id) : this.getTVDetails(id),
                type === 'movie' ? this.getMovieCredits(id) : this.getTVCredits(id),
                type === 'movie' ? this.getMovieRecommendations(id) : this.getTVRecommendations(id)
            ]);

            let seasons = [];
            if (type === 'tv') {
                seasons = await this.getTVSeasons(id);
            }

            const directors = credits.crew.filter(person => 
                type === 'movie' 
                    ? person.job === 'Director'
                    : person.job === 'Executive Producer'
            );

            const fullCast = [...directors, ...credits.cast];

            const result = {
                ...details,
                type,
                seasons,
                credits: {
                    cast: fullCast,
                    crew: credits.crew
                },
                recommendations: recommendations.results
            };
            
            console.log('Full result:', result); // Для отладки
            return result;
        } catch (error) {
            console.error('Error fetching full info:', error);
            throw error;
        }
    }

    static async searchMulti(query) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/search/multi?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}&query=${encodeURIComponent(query)}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error searching:', error);
            throw error;
        }
    }

    // Получить детали сериала
    static async getTVDetails(id) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/${id}?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            const data = await response.json();
            console.log('TV Details:', data); // Для отладки
            return data;
        } catch (error) {
            console.error('Error fetching TV details:', error);
            throw error;
        }
    }

    // Получить актёрский состав сериала
    static async getTVCredits(tvId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/${tvId}/credits?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching TV credits:', error);
            throw error;
        }
    }

    // Получить рекомендации для сериала
    static async getTVRecommendations(tvId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/${tvId}/recommendations?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching TV recommendations:', error);
            throw error;
        }
    }

    static async getTVSeasons(tvId) {
        try {
            const details = await this.getTVDetails(tvId);
            console.log('TV Details:', details);
            
            // Фильтруем специальные эпизоды (season_number === 0)
            const regularSeasons = details.seasons.filter(season => season.season_number > 0);
            
            // Получаем информацию о каждом сезоне с пагинацией
            const seasonsPromises = [];
            for (const season of regularSeasons) {
                const promise = fetch(
                    `${API_CONFIG.BASE_URL}/tv/${tvId}/season/${season.season_number}?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
                )
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                });
                seasonsPromises.push(promise);
            }

            const seasons = await Promise.all(seasonsPromises);
            console.log('Seasons data:', seasons);
            return seasons;
        } catch (error) {
            console.error('Error fetching TV seasons:', error);
            throw error;
        }
    }

    static async getTrendingMovies() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/trending/movie/day?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching trending movies:', error);
            throw error;
        }
    }

    static async getAnticipatedMovies() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/movie/upcoming?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching anticipated movies:', error);
            throw error;
        }
    }

    static async getTrendingTV() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/trending/tv/day?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching trending TV shows:', error);
            throw error;
        }
    }

    static async getAnticipatedTV() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/on_the_air?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching anticipated TV shows:', error);
            throw error;
        }
    }

    static async getPopularTV() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/popular?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching popular TV shows:', error);
            throw error;
        }
    }

    static async getAiringTodayTV() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/airing_today?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching airing today TV shows:', error);
            throw error;
        }
    }

    static async getTopRatedTV() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/top_rated?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error fetching top rated TV shows:', error);
            throw error;
        }
    }    

    static async getOnTheAirTV() {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/tv/on_the_air?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching on the air TV shows:', error);
            throw error;
        }
    }

    static async getMoviesByGenre(genreId, page = 1) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/discover/movie?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}&with_genres=${genreId}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching movies by genre:', error);
            throw error;
        }
    }

    static async getTVShowsByGenre(genreId, page = 1) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/discover/tv?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}&with_genres=${genreId}&page=${page}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching TV shows by genre:', error);
            throw error;
        }
    }

    static GENRE_MAP = {
        'Action': 28,
        'Adventure': 12,
        'Animation': 16,
        'Comedy': 35,
        'Crime': 80,
        'Documentary': 99,
        'Drama': 18,
        'Family': 10751,
        'Fantasy': 14,
        'History': 36,
        'Horror': 27,
        'Music': 10402,
        'Mystery': 9648,
        'Romance': 10749,
        'Science Fiction': 878,
        'TV Movie': 10770,
        'Thriller': 53,
        'War': 10752,
        'Western': 37
    };

    static getGenreId(genreName) {
        return this.GENRE_MAP[genreName] || '';
    }

    static GENRE_EMOJI_MAP = {
        'Action': '💥',
        'Adventure': '🗺️',
        'Animation': '🎨',
        'Comedy': '😂',
        'Crime': '🚔',
        'Documentary': '📹',
        'Drama': '🎭',
        'Family': '👨‍👩‍👧‍👦',
        'Fantasy': '🔮',
        'History': '📜',
        'Horror': '👻',
        'Music': '🎵',
        'Mystery': '🔍',
        'Romance': '❤️',
        'Science Fiction': '🚀',
        'TV Movie': '📺',
        'Thriller': '😱',
        'War': '⚔️',
        'Western': '🤠'
    };

    static getGenreEmoji(genreName) {
        return this.GENRE_EMOJI_MAP[genreName] || '🎬';
    }

    async getPersonDetails(personId) {
        const response = await this._fetch(`/person/${personId}`);
        return response;
    }

    async getPersonCredits(personId) {
        const response = await this._fetch(`/person/${personId}/combined_credits`);
        return response;
    }

    static async getPersonDetails(personId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/person/${personId}?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching person details:', error);
            throw error;
        }
    }

    static async getPersonCredits(personId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/person/${personId}/combined_credits?api_key=${API_CONFIG.API_KEY}&language=${API_CONFIG.LANGUAGE}`
            );
            const data = await response.json();
            
            // Разделяем на фильмы и сериалы
            return {
                movie_credits: {
                    cast: data.cast.filter(item => item.media_type === 'movie'),
                    crew: data.crew.filter(item => item.media_type === 'movie')
                },
                tv_credits: {
                    cast: data.cast.filter(item => item.media_type === 'tv'),
                    crew: data.crew.filter(item => item.media_type === 'tv')
                }
            };
        } catch (error) {
            console.error('Error fetching person credits:', error);
            throw error;
        }
    }

    static async getPersonImages(personId) {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/person/${personId}/images?api_key=${API_CONFIG.API_KEY}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching person images:', error);
            throw error;
        }
    }
}

export default TMDBService; 