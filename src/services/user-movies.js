import { userDataStore } from './user-data-store.js';
import TMDBService from './tmdb.js';

export class UserMoviesService {
    constructor() {
        this._store = userDataStore;
    }

    getMovieState(movieId) {
        const wantList = this._store.getMovies('want');
        const watchedList = this._store.getMovies('watched');

        if (watchedList.find(m => m.id === movieId)) {
            return 'watched';
        }
        if (wantList.find(m => m.id === movieId)) {
            return 'want';
        }
        return 'none';
    }

    addToWant(movie) {
        this._store.addMovie('want', movie);
    }

    addToWatched(movie) {
        this._store.addMovie('watched', movie);
    }

    removeFromWant(movieId) {
        this._store.removeMovie('want', movieId);
    }

    removeFromWatched(movieId) {
        this._store.removeMovie('watched', movieId);
    }

    isEpisodeWatched(tvId, seasonNumber, episodeNumber) {
        return this._store.getEpisodeStatus(tvId, seasonNumber, episodeNumber);
    }

    markEpisodeAsWatched(tvId, seasonNumber, episodeNumber) {
        this._store.setEpisodeStatus(tvId, seasonNumber, episodeNumber, true);
    }

    markEpisodeAsUnwatched(tvId, seasonNumber, episodeNumber) {
        this._store.setEpisodeStatus(tvId, seasonNumber, episodeNumber, false);
    }

    getSeasonReview(tvId, seasonNumber) {
        return this._store.getReview('tv_season', tvId, seasonNumber);
    }

    saveSeasonReview(tvId, seasonNumber, review) {
        this._store.saveReview('tv_season', tvId, review, seasonNumber);
    }

    getReview(type, id, seasonNumber = null) {
        return this._store.getReview(type, id, seasonNumber);
    }

    isSeasonFullyWatched(tvId, seasonNumber, totalEpisodes) {
        const watchedEpisodes = this._store.getSeasonEpisodes(tvId, seasonNumber);
        return watchedEpisodes.length === totalEpisodes;
    }

    getWantList() {
        return this._store.getMovies('want');
    }

    getWatchedList() {
        return this._store.getMovies('watched');
    }

    hasAnyWatchedEpisodes(tvId) {
        const allEpisodes = this._store.getAllEpisodes(tvId);
        return Object.values(allEpisodes).some(episodes => episodes.length > 0);
    }

    removeReview(type, id, seasonNumber = null) {
        this._store.removeReview(type, id, seasonNumber);
    }

    removeSeasonReview(tvId, seasonNumber) {
        this._store.removeReview('tv_season', tvId, seasonNumber);
    }

    removeAllSeasonReviews(tvId) {
        this._store.removeAllSeasonReviews(tvId);
    }

    markSeasonAsWatched(tvId, seasonNumber, totalEpisodes) {
        for (let i = 1; i <= totalEpisodes; i++) {
            this.markEpisodeAsWatched(tvId, seasonNumber, i);
        }
    }

    markSeasonAsUnwatched(tvId, seasonNumber) {
        const watchedEpisodes = this._store.getSeasonEpisodes(tvId, seasonNumber);
        
        watchedEpisodes.forEach(episodeNumber => {
            this._store.setEpisodeStatus(tvId, seasonNumber, episodeNumber, false);
        });
    }

    saveReview(type, id, review, seasonNumber = null) {
        this._store.saveReview(type, id, review, seasonNumber);
    }

    async getShowProgress(tvId) {
        try {
            const details = await TMDBService.getTVDetails(tvId);
            if (!details || !details.seasons) return null;

            // Ищем первую доступную оценку сезона
            const rating = this._getFirstAvailableRating(tvId);

            // Считаем общее количество эпизодов во всех сезонах
            const totalEpisodes = details.seasons.reduce((total, season) => {
                if (season.season_number === 0) return total;
                return total + season.episode_count;
            }, 0);

            // Получаем количество просмотренных эпизодов
            const allEpisodes = this._store.getAllEpisodes(tvId);
            let watchedCount = 0;

            if (allEpisodes) {
                Object.entries(allEpisodes).forEach(([seasonNumber, episodes]) => {
                    if (seasonNumber === '0') return;
                    episodes.forEach(episodeNumber => {
                        if (this.isEpisodeWatched(tvId, parseInt(seasonNumber), episodeNumber)) {
                            watchedCount++;
                        }
                    });
                });
            }

            return {
                watchedEpisodes: watchedCount,
                totalEpisodes: totalEpisodes,
                rating: rating
            };
        } catch (error) {
            console.error('Error getting show progress:', error);
            return null;
        }
    }

    _getFirstAvailableRating(tvId) {
        console.log('Checking ratings for TV show:', tvId);

        // Получаем все оценки сезонов из seasonReviews
        const seasonReviews = this._store._store.tvShows?.seasonReviews;
        if (seasonReviews) {
            // Ищем все оценки для данного сериала
            const seasonKeys = Object.keys(seasonReviews)
                .filter(key => key.startsWith(`${tvId}_`))
                .sort((a, b) => {
                    const seasonA = parseInt(a.split('_')[1]);
                    const seasonB = parseInt(b.split('_')[1]);
                    return seasonA - seasonB;
                });

            // Возвращаем первую найденную оценку
            for (const key of seasonKeys) {
                const review = seasonReviews[key];
                if (review?.rating) {
                    console.log(`Found rating ${review.rating} for season key ${key}`);
                    return review.rating;
                }
            }
        }

        // Если нет оценок сезонов, проверяем общую оценку сериала
        const showReview = this._store.getReview('tv', tvId);
        console.log('Show review:', showReview);
        
        return showReview?.rating || null;
    }

    async getBatchShowProgress(showIds) {
        try {
            // Получаем детали всех сериалов параллельно
            const detailsPromises = showIds.map(id => TMDBService.getTVDetails(id));
            const showDetails = await Promise.all(detailsPromises);

            // Обрабатываем каждый сериал
            return showDetails.map((details, index) => {
                if (!details || !details.seasons) return null;

                const tvId = showIds[index];
                const rating = this._getFirstAvailableRating(tvId);

                // Считаем общее количество эпизодов
                const totalEpisodes = details.seasons.reduce((total, season) => {
                    if (season.season_number === 0) return total;
                    return total + season.episode_count;
                }, 0);

                // Получаем просмотренные эпизоды
                const allEpisodes = this._store.getAllEpisodes(tvId);
                let watchedCount = 0;

                if (allEpisodes) {
                    Object.entries(allEpisodes).forEach(([seasonNumber, episodes]) => {
                        if (seasonNumber === '0') return;
                        episodes.forEach(episodeNumber => {
                            if (this.isEpisodeWatched(tvId, parseInt(seasonNumber), episodeNumber)) {
                                watchedCount++;
                            }
                        });
                    });
                }

                return {
                    showId: tvId,
                    watchedEpisodes: watchedCount,
                    totalEpisodes: totalEpisodes,
                    rating: rating
                };
            });
        } catch (error) {
            console.error('Error getting batch show progress:', error);
            return [];
        }
    }
}

export const userMoviesService = new UserMoviesService(); 