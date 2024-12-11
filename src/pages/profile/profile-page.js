import { TG, haptic } from '../../config/telegram.js';
import { userMoviesService } from '../../services/user-movies.js';
import './profile-avatar.js';
import './profile-stats.js';
import '../../components/media-poster.js';

export class ProfileScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._userData = null;
        this._activeTab = 'want';
        this._initialized = false;
        this._stats = {
            place: 481516,
            following: 23,
            followers: 42,
            want: 0,
            watched: 0,
            tvShows: 0
        };

        // Добавляем маппинг действий
        this._actionMappings = {
            want: 'movies',
            watched: 'movies',
            tvshows: 'tv'
        };
    }

    async connectedCallback() {
        if (this._initialized) return;
        
        this._initialized = true;
        
        // Запрашиваем обновленные данные пользователя
        document.dispatchEvent(new CustomEvent('tg-user-data-updated'));
        
        this._userData = TG?.initDataUnsafe?.user || null;
        await this.loadStats();
        this.render();
        this._setupEventListeners();
    }

    async loadStats() {
        // Получаем списки
        const wantList = userMoviesService.getWantList() || [];
        const watchedList = userMoviesService.getWatchedList() || [];

        // Фильтруем списки по типу контента
        const moviesInWant = wantList.filter(item => item.media_type === 'movie');
        const moviesInWatched = watchedList.filter(item => item.media_type === 'movie');
        const allTVShows = [...wantList, ...watchedList]
            .filter(item => item.media_type === 'tv')
            .filter((item, index, self) => 
                index === self.findIndex((t) => t.id === item.id)
            );

        // Обновляем статистику
        this._stats = {
            place: 481516,
            following: 23,
            followers: 42,
            want: moviesInWant.length,
            watched: moviesInWatched.length,
            tvShows: allTVShows.length
        };
    }

    _setupEventListeners() {
        // Обработка кликов по табам
        const tabs = this.shadowRoot.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const newTab = tab.dataset.tab;
                if (this._activeTab !== newTab) {
                    haptic.light();
                    this._activeTab = newTab;
                    tabs.forEach(t => {
                        t.classList.toggle('active', t.dataset.tab === newTab);
                    });
                    this._initializeContent();
                }
            });
        });

        // Делегирование событий только для кнопок действий
        this.shadowRoot.addEventListener('click', (e) => {
            const actionButton = e.target.closest('.action-button');
            if (actionButton) {
                const action = actionButton.dataset.action;
                this.dispatchEvent(new CustomEvent('tab-changed', {
                    detail: { tab: action },
                    bubbles: true,
                    composed: true
                }));
            }
        });

        this._setupMovieItemListeners();
    }

    // Добавляем новый метод для установки слушателей на элементы фильмов
    _setupMovieItemListeners() {
        // Находим все элементы с постерами
        const movieItems = this.shadowRoot.querySelectorAll('.movie-item');
        
        movieItems.forEach(item => {
            item.addEventListener('click', () => {
                haptic.light();
                
                const id = item.dataset.id;
                const type = item.dataset.type;
                
                // Диспатчим событие для навигации
                this.dispatchEvent(new CustomEvent('movie-selected', {
                    detail: { 
                        movieId: id, 
                        type: type 
                    },
                    bubbles: true,
                    composed: true
                }));
            });

            // Добавляем стили для интерактивности
            item.style.cursor = 'pointer';
            item.addEventListener('mousedown', () => {
                item.style.transform = 'scale(0.95)';
            });
            
            item.addEventListener('mouseup', () => {
                item.style.transform = 'scale(1)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
            });
        });
    }

    render() {
        const profileHeader = `<profile-avatar></profile-avatar>`;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .content {
                    display: flex;
                    padding: 8px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    border-radius: 36px;
                    background: var(--md-sys-color-surface-container-lowest);
                    overflow: hidden;
                }   

                .movies-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
                    gap: 8px;
                    padding: 8px 16px;
                }
                
                .tab-content {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    overflow-y: auto;
                    min-height: 0;
                }
                
                .tabs-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                    height: 40px;
                    touch-action: none;
                }
                
                .tabs-list-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                    touch-action: pan-x;
                }
                
                .tabs-list-wrapper::-webkit-scrollbar {
                    display: none;
                }
                
                .tabs-container::before,
                .tabs-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .tabs-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-surface-container-lowest), transparent);
                }
                
                .tabs-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-surface-container-lowest), transparent);
                }
                
                .tabs-list {
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                    touch-action: pan-x;
                    pointer-events: auto;
                }
                
                .tab {
                    pointer-events: auto;
                    touch-action: manipulation;
                    --md-filled-tonal-button-container-color: rgba(255, 255, 255, 0.0);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-hover-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-pressed-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    --md-filled-tonal-button-container-height: 40px;
                    --md-filled-tonal-button-focus-label-text-color: var(--md-sys-color-on-surface);
                    padding-inline-start: 16px;
                    padding-inline-end: 16px;
                    flex: 0 0 auto;
                }
                
                .tab.active {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-low);
                }
                
                .empty-state {
                    display: flex;
                    flex: auto;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 48px 16px;
                    gap: 8px;
                    text-align: center;
                }
                
                .empty-state-title {
                    color: var(--md-sys-color-on-surface);
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                }

                .empty-state-description {
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                    margin-bottom: 24px;
                }
                
                .action-button {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                }
                
                .movie-item {
                    aspect-ratio: 2/3;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                    will-change: transform;
                }
                
                .movie-item:active {
                    transform: scale(0.95);
                }

                @media (hover: hover) {
                    .movie-item:hover {
                        transform: scale(1.02);
                    }
                }
                
                .show-progress {
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    line-height: 16px;
                    text-align: center;
                }

                .tab-count {
                    margin-left: 4px;
                    color: var(--md-sys-color-outline);
                }
            </style>

            ${profileHeader}

            <profile-stats
                place="${this._stats.place}"
                following="${this._stats.following}"
                followers="${this._stats.followers}">
            </profile-stats>

            <div class="content">
                <div class="tabs-container">
                    <div class="tabs-list-wrapper">
                        <div class="tabs-list">
                            <md-filled-tonal-button 
                                class="tab ${this._activeTab === 'want' ? 'active' : ''}"
                                data-tab="want">
                                Want
                                <span class="tab-count">${this._stats.want}</span>
                            </md-filled-tonal-button>
                            <md-filled-tonal-button 
                                class="tab ${this._activeTab === 'watched' ? 'active' : ''}"
                                data-tab="watched">
                                Watched
                                <span class="tab-count">${this._stats.watched}</span>
                            </md-filled-tonal-button>
                            <md-filled-tonal-button 
                                class="tab ${this._activeTab === 'tvshows' ? 'active' : ''}"
                                data-tab="tvshows">
                                TV Shows
                                <span class="tab-count">${this._stats.tvShows}</span>
                            </md-filled-tonal-button>
                            <div style="padding-right: 12px; flex-shrink: 0;"> </div>
                        </div>
                    </div>
                </div>
                <div class="tab-content">
                    ${this._renderContent()}
                </div>
            </div>
        `;

        const profileAvatar = this.shadowRoot.querySelector('profile-avatar');
        profileAvatar.userData = this._userData;

        this._initializeContent();
        this._setupEventListeners();
    }

    async _initializeContent() {
        const contentContainer = this.shadowRoot.querySelector('.tab-content');
        if (contentContainer) {
            const content = await this._renderContent();
            contentContainer.innerHTML = content;
            this._setupMovieItemListeners(); // Добавляем установку слушателей после рендера контента
        }
    }

    async _renderContent() {
        const activeTab = this._activeTab.toLowerCase();
        
        // Получаем исходные списки
        const wantList = userMoviesService.getWantList() || [];
        const watchedList = userMoviesService.getWatchedList() || [];
        
        // Фильтруем списки по типу контента
        const lists = {
            want: wantList.filter(item => item.media_type === 'movie'),
            watched: watchedList.filter(item => item.media_type === 'movie'),
            tvshows: [...wantList, ...watchedList]
                .filter(item => item.media_type === 'tv')
                .filter((item, index, self) => 
                    index === self.findIndex((t) => t.id === item.id)
                )
        };

        // Обновляем статистику
        const newStats = {
            ...this._stats,
            want: lists.want.length,
            watched: lists.watched.length,
            tvShows: lists.tvshows.length
        };

        // Обновляем счетчики если изменились
        if (JSON.stringify(this._stats) !== JSON.stringify(newStats)) {
            this._updateStats(newStats);
        }

        const currentList = lists[activeTab];
        if (!currentList || currentList.length === 0) {
            return this._renderEmptyState(activeTab);
        }

        // Рендерим все элементы асинхронно
        const renderedItems = await Promise.all(
            currentList.map(item => this._renderMediaItem(item))
        );

        return `
            <div class="movies-grid">
                ${renderedItems.join('')}
            </div>
        `;
    }

    async _renderMediaItem(item) {
        let userRating = null;
        let progress = null;

        if (item.media_type === 'tv') {
            // Для сериалов получаем прогресс и рейтинг
            progress = await userMoviesService.getShowProgress(item.id);
            userRating = progress?.rating;
        } else {
            // Для фильмов получаем только рейтинг
            const userReview = userMoviesService.getReview('movie', item.id);
            userRating = userReview?.rating;
        }

        return `
            <div class="movie-item" 
                 data-id="${item.id}" 
                 data-type="${item.media_type}">
                <media-poster
                    src="https://image.tmdb.org/t/p/w342${item.poster_path}"
                    alt="${item.title || item.name}"
                    ${progress ? `
                        watched-episodes="${progress.watchedEpisodes}"
                        total-episodes="${progress.totalEpisodes}"
                    ` : ''}
                    ${userRating ? `user-rating="${userRating}"` : ''}
                ></media-poster>
            </div>
        `;
    }

    _renderEmptyState(activeTab) {
        const messages = {
            want: 'Want list is empty',
            watched: 'Watched list is empty',
            tvshows: 'TV Shows list is empty'
        };

        const descriptions = {
            want: 'Start adding movies to your Want list',
            watched: 'Start adding movies to your Watched list',
            tvshows: 'Start adding TV shows to your list'
        };

        const actions = {
            want: 'Browse Movies',
            watched: 'Browse Movies',
            tvshows: 'Browse TV Shows'
        };

        return `
            <div class="empty-state">
                <div class="empty-state-title">${messages[activeTab]}</div>
                <div class="empty-state-description">${descriptions[activeTab]}</div>
                <md-filled-tonal-button 
                    class="action-button"
                    data-action="${this._actionMappings[activeTab]}">
                    ${actions[activeTab]}
                </md-filled-tonal-button>
            </div>
        `;
    }

    _updateStats(newStats) {
        this._stats = newStats;
        this.shadowRoot.querySelectorAll('.tab').forEach(tab => {
            const count = tab.querySelector('.tab-count');
            if (count) {
                const tabName = tab.dataset.tab;
                const value = tabName === 'tvshows' ? this._stats.tvShows : this._stats[tabName];
                count.textContent = value;
            }
        });
    }
}

customElements.define('profile-screen', ProfileScreen); 