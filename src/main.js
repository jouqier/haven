import { TG, initTelegram } from './config/telegram.js';
import { navigationManager } from './config/navigation.js';
import './theme.css';
import '@material/web/button/filled-tonal-button.js';
import '@material/web/checkbox/checkbox.js';
import './pages/movies/movie-card.js';
import './components/card-info.js';
import './components/card-poster.js';
import './components/card-cast.js';
import './components/card-recomendation.js';
import './components/show-card-seasons.js';
import './pages/search-page.js';
import './components/bottom-navigation.js';
import './pages/movies/movies-page.js';
import './pages/tvshows/shows-page.js';
import TMDBService from './services/tmdb.js';
import './pages/profile/profile-page.js';
import './pages/activity-page.js';
import './pages/tvshows/show-card.js';
import './pages/genre/genre-page.js';
import './pages/person/person-page.js';

// Обработчик выбора фильма/сериала
document.addEventListener('movie-selected', async (event) => {
    const { movieId, type, sourceTab } = event.detail;
    try {
        navigationManager.navigateToDetails(movieId, type, sourceTab);
    } catch (error) {
        console.error('Ошибка при показе деталей фильма:', error);
    }
});

async function showMovieDetails(id, type = 'movie') {
    const container = document.querySelector('#movies-container');
    
    // Очищаем контейнер от всех экранов
    container.innerHTML = '';
    
    try {
        const data = await TMDBService.getFullMovieInfo(id, type);
        const movieData = {
            ...data,
            media_type: type
        };
        
        document.documentElement.style.setProperty(
            '--movie-backdrop',
            `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`
        );
        
        const cardElement = document.createElement(type === 'movie' ? 'movie-card-details' : 'tv-show-card-details');
        cardElement.movie = movieData;
        container.appendChild(cardElement);
        
        window.scrollTo(0, 0);
    } catch (error) {
        console.error('Ошибка при показе деталей:', error);
    }
}

// Обработчик переключения табов
document.addEventListener('tab-changed', (event) => {
    const { tab } = event.detail;
    navigationManager.navigateToTab(tab, false); // Убираем пропуск обновления таб-бара
    
    // Обновляем активный таб в TabBar
    const tabBar = document.querySelector('tab-bar');
    if (tabBar) {
        tabBar.setActiveTab(tab);
    }
});

// Добавляем обработчик для события выбора жанра
document.addEventListener('genre-selected', (event) => {
    const { genreId, genreName, from, type } = event.detail;
    try {
        navigationManager.navigateToGenre(genreId, genreName, from, type);
    } catch (error) {
        console.error('Ошибка при показе жанра:', error);
    }
});

// Обработчик для события выбора персоны
document.addEventListener('person-selected', (event) => {
    const { personId } = event.detail;
    try {
        navigationManager.navigateToPerson(personId);
    } catch (error) {
        console.error('Ошибка при показе информации о персоне:', error);
    }
});

function showMainScreen(screenName) {
    console.log('Showing screen:', screenName);
    
    const container = document.querySelector('#movies-container');
    container.innerHTML = '';
    
    let screen;
    switch (screenName) {
        case 'profile':
            screen = document.createElement('profile-screen');
            break;
        case 'movies':
            screen = document.createElement('movies-screen');
            break;
        case 'tv':
            screen = document.createElement('tv-shows-screen');
            break;
        case 'activity':
            screen = document.createElement('activity-screen');
            break;    
        case 'search':
            screen = document.createElement('search-screen');
            break;
        case 'genre':
            screen = document.createElement('genre-screen');
            break;
        case 'person':
            screen = document.createElement('person-screen');
            break;
        default:
            console.error('Unknown screen:', screenName);
            return;
    }
     
    if (screen) {
        container.appendChild(screen);
        window.scrollTo(0, 0);
    }
}

// Обработик изменения навигации
window.addEventListener('navigation-changed', async (event) => {
    const { state } = event.detail;
    const container = document.querySelector('#movies-container');
    
    try {
        if (!state) {
            // Возврат на предыдущий экран
            const currentTab = navigationManager.currentTab;
            const previousState = navigationManager.getPreviousState();
            
            if (previousState) {
                if (previousState.type === 'details') {
                    // Если возвращаемся из деталей фильма
                    const sourceTab = previousState.sourceTab || currentTab;
                    showMainScreen(sourceTab);
                } else {
                    showMainScreen(currentTab);
                }
            } else {
                showMainScreen(currentTab);
            }
            return;
        }
        
        // Очищаем контейнер перед показом нового экрана
        container.innerHTML = '';
        
        if (state.type === 'details') {
            // Показываем детали фильма/сериала
            await showMovieDetails(state.mediaId, state.mediaType);
        } else if (state.type === 'tab') {
            // Показываем экран таба
            showMainScreen(state.name);
        } else if (state.type === 'person') {
            // Показываем экран персоны
            const personScreen = document.createElement('person-screen');
            container.appendChild(personScreen);
        } else if (state.type === 'genre') {
            // Показываем экран жанра
            const genreScreen = document.createElement('genre-screen');
            container.appendChild(genreScreen);
        }
    } catch (error) {
        console.error('Ошибка при обработке навигации:', error);
    }
});

// Инициализация приложения
window.addEventListener('DOMContentLoaded', async () => {
    try {
        // Сначала инициализируем Telegram
        await initTelegram();
        
        // Проверяем, что получили данные пользователя
        if (!window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
            console.warn('Не удалось получить ID пользователя Telegram');
        }
        
        // Теперь инициализируем приложение
        navigationManager.navigateToTab('movies');
        showMainScreen('movies');
    } catch (error) {
        console.error('Ошибка инициализации приложения:', error);
    }
});