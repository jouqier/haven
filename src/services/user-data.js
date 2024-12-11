class UserDataStore {
    constructor() {
        this._store = this._loadFromStorage();
    }

    _loadFromStorage() {
        const data = localStorage.getItem('user_data');
        if (!data) {
            return this._getInitialStore();
        }
        return JSON.parse(data);
    }

    _getInitialStore() {
        return {
            version: "1.0",
            userId: "guest",
            movies: {},
            tvShows: {
                episodes: {},
                reviews: {},
                seasonReviews: {}
            },
            activity: [],
            search: {
                recent: []
            }
        };
    }

    _saveToStorage() {
        localStorage.setItem('user_data', JSON.stringify(this._store));
    }

    getActivities() {
        return this._store.activity || [];
    }

    addActivity(activity) {
        // Проверяем наличие всех необходимых полей
        const requiredFields = ['id', 'title', 'type', 'action', 'date'];
        if (!requiredFields.every(field => activity.hasOwnProperty(field))) {
            console.error('Missing required fields in activity:', activity);
            return;
        }

        // Проверяем статус контента
        const isInWantList = this._isInWantList(activity.id, activity.type);
        const isInWatchedList = this._isInWatchedList(activity.id, activity.type);

        // Добавляем активность только если контент есть в одном из списков
        if (isInWantList || isInWatchedList) {
            // Получаем дополнительные данные в зависимости от типа контента
            const enrichedActivity = this._enrichActivityData(activity);

            // Добавляем активность в начало массива
            this._store.activity = [enrichedActivity, ...this._store.activity || []];
            
            // Ограничиваем количество хранимых активностей (например, последние 100)
            if (this._store.activity.length > 100) {
                this._store.activity = this._store.activity.slice(0, 100);
            }

            this._saveToStorage();
        }
    }

    _enrichActivityData(activity) {
        const { id, type, action } = activity;
        let enrichedData = { ...activity };

        if (type === 'tv') {
            // Для сериалов добавляем информацию о просмотренных эпизодах
            const episodes = this._store.tvShows.episodes[id] || {};
            const totalEpisodes = Object.keys(episodes).length;
            const watchedEpisodes = Object.values(episodes).filter(e => e.watched).length;

            // Получаем рейтинг сериала
            const tvShow = this._store.tvShows;
            const seasonReviews = tvShow.seasonReviews || {};
            const showReview = Object.keys(seasonReviews)
                .filter(key => key.startsWith(`${id}_`))
                .map(key => seasonReviews[key])
                .find(review => review?.rating);

            enrichedData = {
                ...enrichedData,
                watchedEpisodes,
                totalEpisodes,
                rating: showReview?.rating
            };
        } else if (type === 'movie') {
            // Для фильмов добавляем рейтинг
            const movieReview = this._store.movies[id];
            if (movieReview?.rating) {
                enrichedData.rating = movieReview.rating;
            }
        }

        return enrichedData;
    }

    clearActivities() {
        this._store.activity = [];
        this._saveToStorage();
    }

    removeActivitiesByContent(contentId, contentType) {
        // Проверяем, есть ли контент в списках want/watched
        const isInWantList = this._isInWantList(contentId, contentType);
        const isInWatchedList = this._isInWatchedList(contentId, contentType);

        // Если контент не в списках want/watched, удаляем все связанные активности
        if (!isInWantList && !isInWatchedList) {
            this._store.activity = this._store.activity.filter(activity => 
                !(activity.id === contentId && activity.type === contentType)
            );
            this._saveToStorage();
        }
    }

    _isInWantList(contentId, contentType) {
        if (contentType === 'movie') {
            return this._store.movies[contentId]?.want || false;
        } else if (contentType === 'tv') {
            return this._store.tvShows.reviews[contentId]?.want || false;
        }
        return false;
    }

    _isInWatchedList(contentId, contentType) {
        if (contentType === 'movie') {
            return this._store.movies[contentId]?.watched || false;
        } else if (contentType === 'tv') {
            // Для сериала проверяем наличие просмотренных эпизодов
            const episodes = this._store.tvShows.episodes[contentId] || {};
            return Object.values(episodes).some(e => e.watched);
        }
        return false;
    }

    // Обновляем метод удаления из списка want
    removeFromWantList(contentId, contentType) {
        if (contentType === 'movie') {
            if (this._store.movies[contentId]) {
                this._store.movies[contentId].want = false;
            }
        } else if (contentType === 'tv') {
            if (this._store.tvShows.reviews[contentId]) {
                this._store.tvShows.reviews[contentId].want = false;
            }
        }
        this._saveToStorage();
        this.removeActivitiesByContent(contentId, contentType);
    }

    // Обновляем метод удаления из списка watched
    removeFromWatchedList(contentId, contentType) {
        if (contentType === 'movie') {
            if (this._store.movies[contentId]) {
                this._store.movies[contentId].watched = false;
            }
        } else if (contentType === 'tv') {
            const episodes = this._store.tvShows.episodes[contentId] || {};
            Object.keys(episodes).forEach(episodeKey => {
                episodes[episodeKey].watched = false;
            });
            this._store.tvShows.episodes[contentId] = episodes;
        }
        this._saveToStorage();
        this.removeActivitiesByContent(contentId, contentType);
    }

    // ... остальные методы класса ...
}

export const userDataStore = new UserDataStore(); 