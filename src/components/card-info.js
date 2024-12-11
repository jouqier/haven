import { haptic } from '../config/telegram.js';
import TMDBService from '../services/tmdb.js';
import '@material/web/button/filled-tonal-button.js';

export class MovieInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set info(value) {
        this._info = value;
        this.render();
    }

    render() {
        if (!this._info) return;
        
        console.log('Info in MovieInfo:', this._info);
        const { type, title, rating, overview, genres } = this._info;
        console.log('Genres extracted:', genres);
        
        // Проверяем, что genres существует, является массивом и не пустой
        const hasGenres = Array.isArray(genres) && genres.length > 0;
        
        const metaInfo = type === 'tv' 
            ? this._renderTVMeta()
            : this._renderMovieMeta();

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

                h1, h2, h3, h4, p {
                    margin: 0;
                }                

                .title {
                    text-align: center;
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                    color: var(--md-sys-color-on-surface);
                }
                
                .title-info {
                    display: flex;
                    padding: 16px 24px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                }

                .meta {
                    display: flex;
                    padding: 0px 16px;
                    justify-content: center;
                    align-items: flex-start;
                    align-self: stretch;
                    text-align: center;
                    gap: 4px;
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
                
                .overview {
                    align-self: stretch;
                    font-size: 14px;
                    line-height: 20px;
                    font-style: normal;
                    font-weight: 600;
                    color: var(--md-sys-color-on-surface);
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                    transition: all 0.2s ease;
                    margin-bottom: 0;
                }
                
                .overview.expanded {
                    -webkit-line-clamp: unset;
                    margin-bottom: 24px;
                }

                .more-button {
                    position: absolute;
                    right: 16px;
                    bottom: 8px;
                    background: linear-gradient(270deg, var(--md-sys-color-surface-container-lowest) 70%, transparent);
                    border: none;
                    padding: 0px 0px 0px 32px;
                    color: var(--md-sys-color-on-surface);
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .overview.expanded + .more-button {
                    bottom: 0;
                }

                .overview-container {
                    display: flex;
                    padding: 8px 16px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-start;
                    align-self: stretch;
                    cursor: pointer;
                    position: relative;
                }

                .genres-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                    height: 40px;
                }

                .genres-list-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                }

                .genres-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .genres-container::before,
                .genres-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .genres-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-surface-container-lowest), transparent);
                }

                .genres-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-surface-container-lowest), transparent);
                }

                .genres-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                md-filled-tonal-button {
                    flex-shrink: 0;
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-low);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    --md-filled-tonal-button-container-height: 40px;
                    --md-filled-tonal-button-hover-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-pressed-label-text-color: var(--md-sys-color-on-surface);
                    --md-filled-tonal-button-focus-label-text-color: var(--md-sys-color-on-surface);
                    padding-inline-start: 16px;
                    padding-inline-end: 16px;
                }

                .subheader {
                    display: flex;
                    padding: 16px 16px 4px 16px;
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
            </style>

            <div class="title-info">
                <div class="title">${title}</div>
                ${metaInfo}
            </div>

            <div class="overview-container">
                <p class="overview">${overview}</p>
                <button class="more-button">…MORE</button>
            </div>
            
            ${hasGenres ? `
                <div class="subheader">Genres</div>

                <div class="genres-container">
                    <div class="genres-list-wrapper">
                        <div class="genres-list">
                            ${genres.map(genre => `
                                <md-filled-tonal-button 
                                    class="genre-chip"
                                    data-genre-id="${TMDBService.getGenreId(genre)}"
                                >${genre}</md-filled-tonal-button>
                            `).join('')}
                            <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
        
        // Добавляем обработчик для раскрытия/схлопывания текста
        const overviewContainer = this.shadowRoot.querySelector('.overview-container');
        const overviewElement = this.shadowRoot.querySelector('.overview');
        const moreButton = this.shadowRoot.querySelector('.more-button');

        overviewContainer.addEventListener('click', () => {
            const isExpanded = overviewElement.classList.toggle('expanded');
            moreButton.textContent = isExpanded ? 'LESS' : '…MORE';
        });

        // Перед установкой рекомендаций
        const recommendationsElement = this.shadowRoot.querySelector('movie-recommendations');
        if (recommendationsElement) {
            if (recommendations && recommendations.length > 0) {
                recommendationsElement.recommendations = recommendations;
            } else {
                recommendationsElement.style.display = 'none';
            }
        }

        // Добавляем обработчик для жанров
        const genreChips = this.shadowRoot.querySelectorAll('.genre-chip');
        genreChips.forEach(genreChip => {
            genreChip.addEventListener('click', () => {
                haptic.light();
                const genreName = genreChip.textContent;
                const genreId = genreChip.dataset.genreId;
                
                // Определяем тип медиа на основе наличия определенных полей
                const mediaType = this._info.number_of_seasons || this._info.first_air_date ? 'tv' : 'movie';
                
                // Получаем ID из родительского элемента, учитывая Shadow DOM
                const parentCard = this.getRootNode().host;
                const currentId = parentCard?.movie?.id;
                
                console.log('Genre click:', {
                    genreName,
                    genreId,
                    mediaType,
                    currentId,
                    parentCard: parentCard?.tagName
                });

                this.dispatchEvent(new CustomEvent('genre-selected', {
                    detail: { 
                        genreId,
                        genreName,
                        from: currentId,
                        type: mediaType
                    },
                    bubbles: true,
                    composed: true
                }));
            });
        });

        console.log('Genres in MovieInfo:', genres);
    }

    _renderTVMeta() {
        const { 
            rating, 
            firstAirDate,
            lastAirDate,
            status,
            numberOfSeasons,
            numberOfEpisodes,
            air_date
        } = this._info;

        const startYear = firstAirDate 
            ? new Date(firstAirDate).getFullYear()
            : air_date 
                ? new Date(air_date).getFullYear()
                : this._info.first_air_date 
                    ? new Date(this._info.first_air_date).getFullYear()
                    : '???';
                    
        const endYear = lastAirDate 
            ? new Date(lastAirDate).getFullYear() 
            : status === 'Ended' 
                ? new Date().getFullYear() 
                : 'Present';
                
        const statusText = status === 'Ended' ? 'Ended' : 'In progress';
        
        return `
            <div class="meta">
                <span>${rating} IMDb</span>
                <span>•</span>
                <span>${startYear} - ${endYear}</span>
                <span>•</span>
                <span>${statusText}</span>
            </div>
        `;
    }

    _renderMovieMeta() {
        const { rating, releaseDate, runtime } = this._info;
        
        const date = new Date(releaseDate);
        const formattedDate = date.toLocaleDateString('en-EN', { 
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        const formattedRuntime = `${hours} ч ${minutes} мин`;

        return `
            <div class="meta">
                <span>${rating} IMDb</span>
                <span>•</span>
                <span>${formattedDate}</span>
                <span>•</span>
                <span>${formattedRuntime}</span>
            </div>
        `;
    }

    _pluralize(number, one, two, five) {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }
}

customElements.define('movie-info', MovieInfo); 