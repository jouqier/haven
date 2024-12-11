import TMDBService from '../services/tmdb.js';
import '@material/web/button/filled-tonal-button.js';
import { TG, haptic } from '../config/telegram.js';
import { userDataStore } from '../services/user-data-store.js';

export class SearchScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._searchResults = [];
        this._recentSearches = userDataStore.getRecentSearches();
        this._activeTab = 'movies';
    }

    _saveRecentSearch(item) {
        userDataStore.addRecentSearch(item);
        this._recentSearches = userDataStore.getRecentSearches();
        this.renderRecentMovies();
    }

    async connectedCallback() {
        await this.loadRecentMovies();
        this.render();
        this.setupEventListeners();
        
        // Устанавливаем фокус на поле ввода с небольшой задержкой
        setTimeout(() => {
            const input = this.shadowRoot.querySelector('input');
            input.focus();
        }, 100);
    }

    async loadRecentMovies() {
        try {
            const popularMovies = await TMDBService.getPopularMovies();
            this._recentMovies = popularMovies.results.slice(0, 10);
        } catch (error) {
            console.error('Error loading recent movies:', error);
            this._recentMovies = [];
        }
    }

    setupEventListeners() {
        const input = this.shadowRoot.querySelector('input');
        const clearButton = this.shadowRoot.querySelector('.clear-button');
        const recentSection = this.shadowRoot.querySelector('.recent-section');
        const tabs = this.shadowRoot.querySelectorAll('.tab');
        let debounceTimer;

        // Обработка ввода в поиск
        input.addEventListener('input', () => {
            clearButton.style.display = input.value ? 'block' : 'none';
            
            // Скрываем секцию с recent и empty state при вводе
            if (input.value.trim()) {
                recentSection.style.display = 'none';
            } else {
                recentSection.style.display = 'block';
            }
            
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const query = input.value.trim();
                if (query.length >= 2) {
                    const results = await TMDBService.searchMulti(query);
                    this._searchResults = results.results;
                    this.renderResults();
                } else {
                    this._searchResults = [];
                    this.renderResults();
                }
            }, 300);
        });

        // Очистка поиска
        clearButton.addEventListener('click', () => {
            haptic.light();
            input.value = '';
            clearButton.style.display = 'none';
            this._searchResults = [];
            this.renderResults();
        });

        // Переключение табов
        this.shadowRoot.addEventListener('click', (e) => {
            const tab = e.target.closest('.tab');
            if (tab) {
                const tabs = this.shadowRoot.querySelectorAll('.tab');
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this._activeTab = tab.dataset.type;
                this.renderResults();
            }
        });

        // Клики по результатам поиска
        this.shadowRoot.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.result-item');
            if (resultItem) {
                haptic.light();
                const id = resultItem.dataset.id;
                const selectedItem = this._searchResults.find(item => item.id.toString() === id);
                if (selectedItem) {
                    this._saveRecentSearch(selectedItem);
                    this.dispatchEvent(new CustomEvent('movie-selected', {
                        detail: { 
                            movieId: id, 
                            type: selectedItem.media_type
                        },
                        bubbles: true,
                        composed: true
                    }));
                }
                return;
            }

            // Клики по recent фильмам
            const recentItem = e.target.closest('.recent-item');
            if (recentItem) {
                haptic.light();
                const movieId = recentItem.dataset.movieId;
                const type = recentItem.dataset.type;
                this.dispatchEvent(new CustomEvent('movie-selected', {
                    detail: { movieId, type },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }

    renderRecentMovies() {
        const recentList = this.shadowRoot.querySelector('.recent-list');
        const recentSection = this.shadowRoot.querySelector('.recent-section');
        const subheader = this.shadowRoot.querySelector('.subheader');
        
        if (!this._recentSearches.length) {
            subheader.style.display = 'none';
            recentList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-title">Just start typing…</div>
                    <div class="empty-state-description">Search among millions of Movies and TV Shows</div>
                </div>
            `;
            return;
        }

        subheader.style.display = 'block';
        recentList.innerHTML = this._recentSearches
            .map(item => `
                <div class="recent-item" 
                     data-movie-id="${item.id}"
                     data-type="${item.media_type}">
                    <img class="recent-poster"
                         src="https://image.tmdb.org/t/p/w342${item.poster_path}"
                         alt="${item.title || item.name}"
                         onerror="this.style.backgroundColor='#272A32'">
                    <p class="recent-title">${item.title || item.name}</p>
                </div>
            `)
            .join('');
    }

    renderResults() {
        const resultsContainer = this.shadowRoot.querySelector('.search-results');
        const tabsContainer = this.shadowRoot.querySelector('.tabs');
        const recentSection = this.shadowRoot.querySelector('.recent-section');
        const input = this.shadowRoot.querySelector('input');
        
        // Если поле поиска пустое, не показываем результаты вообще
        if (!input.value.trim()) {
            tabsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            return;
        }
        
        // Показываем "Ничего не нашлось" только если был запрос
        if (!this._searchResults.length) {
            tabsContainer.style.display = 'none';
            recentSection.style.display = 'none';
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-title">Nothing was found</div>
                    <div class="empty-state-description">Maybe hasn't been filmed yet</div>
                </div>
            `;
            return;
        }

        // Разделяем результаты на фильмы и сериалы
        const movies = this._searchResults.filter(item => item.media_type === 'movie');
        const tvShows = this._searchResults.filter(item => item.media_type === 'tv');

        // Показываем табы только если есть результаты
        if (movies.length > 0 || tvShows.length > 0) {
            tabsContainer.style.display = 'flex';
            tabsContainer.innerHTML = `
                <md-filled-tonal-button class="tab ${this._activeTab === 'movies' ? 'active' : ''}" data-type="movies">
                    Movies ${movies.length}
                </md-filled-tonal-button>
                <md-filled-tonal-button class="tab ${this._activeTab === 'tv' ? 'active' : ''}" data-type="tv">
                    TV Shows ${tvShows.length}
                </md-filled-tonal-button>
            `;
            
            // Скрываем секцию Recent
            recentSection.style.display = 'none';
        } else {
            tabsContainer.style.display = 'none';
            recentSection.style.display = 'block';
        }

        // Отображае соответствующие результаты
        const items = this._activeTab === 'movies' ? movies : tvShows;
        resultsContainer.innerHTML = `
            <div class="results-list">
                ${items.map(item => `
                    <div class="result-item" 
                         data-id="${item.id}"
                         data-type="${item.media_type}">
                        <img class="result-poster"
                             src="https://image.tmdb.org/t/p/w185${item.poster_path}"
                             alt="${item.title || item.name}"
                             onerror="this.style.backgroundColor='#272A32'">
                        <p class="result-title">${item.title || item.name}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    max-width: 640px;
                    margin: 0 auto;
                }

                .search-container {
                    display: flex;
                    padding: 8px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                    gap: 16px;
                }

                .search-input-wrapper {
                    display: flex;
                    height: 48px;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                    border-radius: 1000px;
                    background: var(--md-sys-color-surface-bright);
                }

                .search-icon {
                    position: absolute;
                    left: 28px;
                    width: 24px;
                    height: 24px;
                    color: #8B90A0;
                }

                .clear-button {
                    position: absolute;
                    right: 28px;
                    width: 24px;
                    height: 24px;
                    border: none;
                    background: none;
                    color: #8B90A0;
                    cursor: pointer;
                    padding: 0;
                    display: none;
                }

                input {
                    width: 100%;
                    padding: 12px 48px;
                    border: none;
                    border-radius: 1000px;
                    background: #363942;
                    color: #8B90A0;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }

                input:focus {
                    outline: none;
                    background: #363942;
                }

                .tabs {
                    display: none;
                    align-items: center;
                    align-self: stretch;
                }

                .tab {
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
                }

                .tab.active {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-low);
                }

                .recent-section {
                    margin-bottom: 24px;
                }

                .section-title {
                    color: #E0E2ED;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 16px;
                }

                .recent-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 8px 16px;
                    align-self: stretch;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .recent-list::-webkit-scrollbar {
                    display: none;
                }

                .recent-item {
                    flex: 0 0 auto;
                    width: 128px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .recent-item:active {
                    transform: scale(0.95);
                }

                .recent-poster {
                    width: 128px;
                    height: 192px;
                    border-radius: 8px;
                    object-fit: cover;
                    margin-bottom: 8px;
                }

                .recent-title {
                    color: #E0E2ED;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .results-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    padding: 8px 16px;
                    align-self: stretch;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .results-list::-webkit-scrollbar {
                    display: none;
                }

                .result-item {
                    flex: 0 0 auto;
                    width: 128px;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .result-item:hover {
                    transform: scale(1.05);
                }

                .result-poster {
                    width: 128px;
                    height: 192px;
                    border-radius: 8px;
                    object-fit: cover;
                    margin-bottom: 8px;
                }

                .result-title {
                    color: #E0E2ED;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: center;
                    margin: 0;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .subheader {
                    display: flex;
                    padding: 32px 16px 4px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    align-self: stretch;
                    color: var(--md-sys-color-outline);
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
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
            </style>

            <div class="search-container">
                <div class="search-input-wrapper">
                    <svg class="search-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.6569 16.6569M16.65 16.65L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z" stroke="#8B90A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input type="text" placeholder="Movies or TV Shows...">
                    <svg class="clear-button" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#8B90A0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                </div>

                <div class="tabs">
                    <div class="tab active">Movies</div>
                    <div class="tab">TV Shows</div>
                </div>
            </div>

            <div class="recent-section">
                <div class="subheader">Recent</div>
                <div class="recent-list">
                    <!-- Recent items will be inserted here -->
                </div>
            </div>

            <div class="search-results"></div>
        `;

        this.renderRecentMovies();
    }
}

customElements.define('search-screen', SearchScreen); 