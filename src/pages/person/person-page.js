import { TG, haptic } from '../../config/telegram.js';
import { userMoviesService } from '../../services/user-movies.js';
import TMDBService from '../../services/tmdb.js';
import '../../components/media-poster.js';
import { navigationManager } from '../../config/navigation.js';

export class PersonScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._activeTab = 'movies';
        this._movies = [];
        this._tvShows = [];
        this._person = null;
        this._personId = null;
        this._loading = true;
    }

    async connectedCallback() {
        this._personId = new URLSearchParams(window.location.search).get('id');
        
        this.render(); // Показываем начальное состояние загрузки
        await this.loadData(); // Дожидаемся загрузки данных
        this._loading = false;
        this.render(); // Перерисовываем с загруженными данными
        this._setupEventListeners();
    }

    async loadData() {
        try {
            const [person, credits] = await Promise.all([
                TMDBService.getPersonDetails(this._personId),
                TMDBService.getPersonCredits(this._personId)
            ]);
            
            this._person = person;
            this._movies = credits.movie_credits?.cast || [];
            this._tvShows = credits.tv_credits?.cast || [];

            // Сортируем по популярности
            this._movies.sort((a, b) => b.popularity - a.popularity);
            this._tvShows.sort((a, b) => b.popularity - a.popularity);
        } catch (error) {
            console.error('Error loading person data:', error);
        }
    }

    async render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .header {
                    display: flex;
                    padding: 32px;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    align-self: stretch;
                }

                .photo-wrapper {
                    width: 120px;
                    height: 120px;
                    border-radius: 999px;
                    overflow: hidden;
                    background: var(--md-sys-color-surface-container);
                }

                .person-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .photo-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--md-sys-color-surface-container);
                    color: var(--md-sys-color-on-surface);
                    font-size: 48px;
                    font-weight: 600;
                }

                .person-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .person-name {
                    color: var(--md-sys-color-on-surface);
                    text-align: center;
                    font-size: 22px;
                    font-weight: 600;
                    line-height: 28px;
                }

                .person-role {
                    color: var(--md-sys-color-outline);
                    text-align: center;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 20px;
                }

                .content {
                    display: flex;
                    padding: 8px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    border-radius: 36px;
                    //background: var(--md-sys-color-surface-container-lowest);
                    overflow: hidden;
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
                    //background: linear-gradient(to right, var(--md-sys-color-surface-container-lowest), transparent);
                }
                
                .tabs-container::after {
                    right: 0;
                    //background: linear-gradient(to left, var(--md-sys-color-surface-container-lowest), transparent);
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

                .tab-count {
                    margin-left: 4px;
                    color: var(--md-sys-color-outline);
                }

                .media-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 8px;
                    padding: 8px 16px;
                }

                .media-item {
                    aspect-ratio: 2/3;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                    will-change: transform;
                }

                .media-item:active {
                    transform: scale(0.95);
                }

                @media (hover: hover) {
                    .media-item:hover {
                        transform: scale(1.02);
                    }
                }
            </style>

            <div class="header">
                <div class="photo-wrapper">
                    <img class="person-photo" 
                         src="https://image.tmdb.org/t/p/w342${this._person?.profile_path}"
                         alt="${this._person?.name}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="photo-placeholder" style="display: none;">
                        ${this._person?.name?.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div class="person-info">
                    <div class="person-name">${this._person?.name}</div>
                    <div class="person-role">${this._person?.known_for_department}</div>
                </div>
            </div>

            <div class="content">
                <div class="tabs-container">
                    <div class="tabs-list-wrapper">
                        <div class="tabs-list">
                            <md-filled-tonal-button 
                                class="tab ${this._activeTab === 'movies' ? 'active' : ''}"
                                data-tab="movies">
                                Movies
                                <span class="tab-count">${this._movies.length}</span>
                            </md-filled-tonal-button>
                            <md-filled-tonal-button 
                                class="tab ${this._activeTab === 'tv' ? 'active' : ''}"
                                data-tab="tv">
                                TV Shows
                                <span class="tab-count">${this._tvShows.length}</span>
                            </md-filled-tonal-button>
                        </div>
                    </div>
                </div>
                <div class="media-grid">
                    ${this._loading ? 'Loading...' : ''}
                </div>
            </div>
        `;

        if (!this._loading) {
            await this._renderMediaItems();
        }
    }

    _setupEventListeners() {
        // Обработчики для табов
        this.shadowRoot.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const newTab = tab.dataset.tab;
                if (this._activeTab !== newTab) {
                    haptic.light();
                    this._activeTab = newTab;
                    
                    // Обновляем классы активности на табах
                    this.shadowRoot.querySelectorAll('.tab').forEach(t => {
                        t.classList.toggle('active', t.dataset.tab === newTab);
                    });
                    
                    this._renderMediaItems();
                }
            });
        });
    }

    _setupMediaItemListeners() {
        this.shadowRoot.querySelectorAll('.media-item').forEach(item => {
            item.addEventListener('click', () => {
                haptic.light();
                const mediaId = item.dataset.id;
                const mediaType = item.dataset.type;
                
                this.dispatchEvent(new CustomEvent('movie-selected', {
                    detail: { 
                        movieId: mediaId, 
                        type: mediaType 
                    },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }

    async _renderMediaItems() {
        const items = this._activeTab === 'movies' ? this._movies : this._tvShows;
        const renderedItems = await Promise.all(items.map(async (item) => {
            let userRating = null;
            let progress = null;

            if (this._activeTab === 'tv') {
                progress = await userMoviesService.getShowProgress(item.id);
                userRating = progress?.rating;
            } else {
                const userReview = userMoviesService.getReview('movie', item.id);
                userRating = userReview?.rating;
            }

            return `
                <div class="media-item" 
                     data-id="${item.id}"
                     data-type="${this._activeTab === 'movies' ? 'movie' : 'tv'}">
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
        }));

        const mediaGrid = this.shadowRoot.querySelector('.media-grid');
        if (mediaGrid) {
            mediaGrid.innerHTML = renderedItems.join('');
            this._setupMediaItemListeners(); // Устанавливаем обработчики после рендеринга
        }
    }
}

customElements.define('person-screen', PersonScreen); 