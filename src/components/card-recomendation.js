import { haptic } from '../config/telegram.js';

export class MovieRecommendations extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set recommendations(value) {
        if (!value || value.length === 0) {
            this.style.display = 'none';
            return;
        }
        
        this.style.display = 'flex';
        this._recommendations = value;
        this.render();
        this.setupEventListeners();
    }

    set currentMovie(value) {
        this.setAttribute('current-movie', value);
        this.render();
    }

    setupEventListeners() {
        this.shadowRoot.addEventListener('click', (e) => {
            const movieItem = e.target.closest('.movie-item');
            if (movieItem) {
                haptic.light();
                const movieId = movieItem.dataset.id;
                const type = movieItem.dataset.type;
                
                this.dispatchEvent(new CustomEvent('movie-selected', {
                    detail: { movieId, type },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }

    render() {
        if (!this._recommendations) return;

        const recommendationItems = this._recommendations.map(movie => `
            <div class="movie-item" 
                 data-id="${movie.id}"
                 data-type="${movie.media_type || 'movie'}"
                 style="cursor: pointer;">
                <img class="movie-poster"
                    src="https://image.tmdb.org/t/p/w342${movie.poster_path}"
                    alt="${movie.title || movie.name}"
                    onerror="this.style.backgroundColor='#272A32'"
                    loading="lazy">
                <p class="movie-title">${movie.title || movie.name}</p>
            </div>
        `).join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    padding: 8px 0px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                    border-radius: 36px;
                    background: var(--md-sys-color-surface-container-lowest);
                    overflow: hidden;
                }

                .title-info {
                    display: flex;
                    padding: 16px 24px 16px 24px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                }

                .title {
                    text-align: center;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                    color: var(--md-sys-color-on-surface);
                }
                
                .recommendations-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                }

                .recommendations-list-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .recommendations-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .recommendations-container::before,
                .recommendations-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .recommendations-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-surface-container-lowest), transparent);
                }

                .recommendations-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-surface-container-lowest), transparent);
                }

                .recommendations-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }
                
                .movie-item {
                    display: flex;
                    width: 100px;
                    flex-direction: column;
                    align-items: center;
                    transition: transform 0.2s;
                }

                .movie-item:active {
                    transform: scale(0.95);
                }
                
                .movie-poster {
                    aspect-ratio: 2/3;
                    border-radius: 12px;
                    overflow: hidden;
                    width: 100px;
                    border-radius: 4px;
                    object-fit: cover;
                }
                
                .movie-title {
                    align-self: stretch;
                    color: var(--md-sys-color-on-surface);
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                    padding: 8px 0px;
                    margin: 0;
                }
            </style>

            <div class="title-info">
                <div class="title">If you like ${this.getAttribute('current-movie')}</div>
            </div>

            <div class="recommendations-container">
                <div class="recommendations-list-wrapper">
                    <div class="recommendations-list">
                        ${recommendationItems}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('movie-recommendations', MovieRecommendations); 