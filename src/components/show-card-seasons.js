import { TG } from '../config/telegram.js';
import { haptic } from '../config/telegram.js';
import { userMoviesService } from '../services/user-movies.js';

export class TVSeasons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Добавляем слушатель события обновления сезонов
        document.addEventListener('tv-seasons-updated', () => {
            if (this._seasons) {
                this._handleSeasonChange('1'); // Обновляем текущий сезон
            }
        });

        // Слушаем события от MovieActions
        document.addEventListener('tv-action', (e) => {
            if (this._tvId === e.detail.tvId) {
                switch (e.detail.action) {
                    case 'mark-all-watched':
                        this._markAllSeasonsWatched();
                        break;
                    case 'mark-all-unwatched':
                        this._markAllSeasonsUnwatched();
                        break;
                    case 'clear-all-seasons':
                        this._clearAllSeasons();
                        break;
                }
            }
        });

        document.addEventListener('check-all-seasons', (e) => {
            if (this._tvId === e.detail.tvId) {
                console.log('Checking seasons for tvId:', this._tvId);
                console.log('Current seasons:', this._seasons);
                
                const allWatched = this._seasons.every(season => {
                    if (season.season_number === 0) return true;
                    
                    // Получаем количество эпизодов из season.episodes.length
                    const totalEpisodes = season.episodes?.length;
                    if (!totalEpisodes) return true; // Пропускаем сезоны без эпизодов
                    
                    const isWatched = userMoviesService.isSeasonFullyWatched(
                        this._tvId,
                        season.season_number,
                        totalEpisodes
                    );
                    console.log(`Season ${season.season_number} watched:`, {
                        totalEpisodes,
                        isWatched
                    });
                    return isWatched;
                });
                
                console.log('All seasons watched:', allWatched);
                
                document.dispatchEvent(new CustomEvent('check-all-seasons-result', {
                    bubbles: true,
                    composed: true,
                    detail: { 
                        tvId: this._tvId,
                        allWatched 
                    }
                }));
            }
        });
    }

    set seasons(value) {
        this._seasons = value;
        if (value && value.length > 0) {
            this.render();
            setTimeout(() => this._handleSeasonChange('1'), 0);
        }
    }

    render() {
        if (!this._seasons || !this._seasons.length) return;

        const seasonTabs = this._seasons
            .filter(season => season.episodes?.length > 0) // Фильтруем сезоны без эпизодов
            .map((season, index) => `
                <md-filled-tonal-button class="season-tab" data-season="${season.season_number}" 
                    ${index === 0 ? 'selected' : ''}>
                    Сезон ${season.season_number}
                </md-filled-tonal-button>
            `).join('');

        const currentSeason = this._seasons[0];
        const episodes = currentSeason.episodes?.map(episode => `
            <div class="episode-wrapper">
                <div class="episode-item">
                    <div class="episode-number">${episode.episode_number}</div>
                    <div class="episode-info">
                        <div class="episode-title">${episode.name}</div>
                        <div class="episode-date">${new Date(episode.air_date).toLocaleDateString('ru-RU')}</div>
                    </div>
                    <md-checkbox touch-target="wrapper"></md-checkbox>
                </div>
                <div class="divider"></div>
            </div>
        `).join('') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                }

                /* Скрываем компонент только если он находится внутри movie-info */
                :host-context(movie-info) {
                    display: none !important;
                }

                .seasons-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                    height: 40px;
                }

                .seasons-list-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow-x: auto;
                    overflow-y: hidden;
                    scrollbar-width: none;
                    -webkit-overflow-scrolling: touch;
                }

                .seasons-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .seasons-container::before,
                .seasons-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .seasons-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-scrim), transparent);
                }

                .seasons-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-scrim), transparent);
                }

                .seasons-list {
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                .season-tab {
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

                .season-tab[selected] {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-low);
                }

                .episodes-list {
                    display: flex;
                    padding-top: 8px;
                    flex-direction: column;
                    align-items: flex-start;
                    align-self: stretch;
                }

                .episode-item {
                    display: flex;
                    padding: 10px 16px;
                    align-items: center;
                    gap: 4px;
                    align-self: stretch;
                }

                .episode-number {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 20px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    color: var(--md-sys-color-outline);
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }

                .episode-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    flex: 1 0 0;
                }

                .episode-title {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    color: var(--md-sys-color-on-surface);;
                    text-overflow: ellipsis;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }

                .episode-date {
                    overflow: hidden;
                    color: var(--md-sys-color-outline);
                    text-overflow: ellipsis;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }

                .episode-wrapper {
                    display: flex;
                    flex-direction: column;
                    align-self: stretch;
                }

                .divider {
                    height: 1px;
                    background: var(--md-sys-color-surface-container-low);
                    margin: 8px 16px;
                }

                md-checkbox {
                    --md-checkbox-container-shape: 4px;
                    --md-checkbox-outline-color: rgba(255, 255, 255, 0.5);
                    --md-checkbox-selected-container-color: #E0E2ED;
                    --md-checkbox-selected-icon-color: #10131B;
                    margin-right: auto;
                }

                .unwatched-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--md-sys-color-primary-container);
                    display: inline-block;
                    margin-left: 4px;
                }

                .season-actions {
                    display: flex;
                    padding: 8px 16px;
                    justify-content: center;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                }

                .mark-watched-button,
                .mark-unwatched-button,
                .rate-season-button {
                    --md-filled-tonal-button-container-color: var(--md-sys-color-surface-container-high);
                    --md-filled-tonal-button-label-text-color: var(--md-sys-color-on-surface);
                    width: 100%;
                }
            </style>

            <div class="seasons-container">
                <div class="seasons-list-wrapper">
                    <div class="seasons-list">
                        ${seasonTabs}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>

            <div class="episodes-list">
                ${episodes}
            </div>
        `;

        this.shadowRoot.querySelectorAll('.season-tab').forEach(tab => {
            tab.addEventListener('click', () => this._handleSeasonChange(tab.dataset.season));
        });
    }

    _handleSeasonChange(seasonNumber) {
        haptic.light();
        seasonNumber = parseInt(seasonNumber);
        const season = this._seasons.find(s => s.season_number === seasonNumber);
        if (!season || !season.episodes?.length) return;
        
        const episodesList = this.shadowRoot.querySelector('.episodes-list');
        
        this.shadowRoot.querySelectorAll('.season-tab').forEach(tab => {
            tab.toggleAttribute('selected', parseInt(tab.dataset.season) === seasonNumber);
        });

        const totalEpisodes = season.episodes.length;
        const isFullyWatched = userMoviesService.isSeasonFullyWatched(
            this._tvId, 
            seasonNumber,
            totalEpisodes
        );

        episodesList.innerHTML = season.episodes.map(episode => {
            const isWatched = userMoviesService.isEpisodeWatched(
                this._tvId,
                seasonNumber,
                episode.episode_number
            );
            return `
                <div class="episode-wrapper">
                    <div class="episode-item">
                        <div class="episode-number">
                            ${episode.episode_number}
                            ${!isWatched ? '<span class="unwatched-dot"></span>' : ''}
                        </div>
                        <div class="episode-info">
                            <div class="episode-title">${episode.name}</div>
                            <div class="episode-date">
                                ${new Date(episode.air_date).toLocaleDateString('ru-RU')}
                            </div>
                        </div>
                        <md-checkbox 
                            touch-target="wrapper"
                            data-episode="${episode.episode_number}"
                            ${isWatched ? 'checked' : ''}
                        ></md-checkbox>
                    </div>
                    <div class="divider"></div>
                </div>
            `;
        }).join('');

        episodesList.innerHTML += `
            <div class="season-actions">
                ${!isFullyWatched ? `
                    <md-filled-tonal-button class="mark-watched-button">
                        Mark all as Watched
                    </md-filled-tonal-button>
                ` : `
                    <md-filled-tonal-button class="rate-season-button">
                        Rate season
                    </md-filled-tonal-button>
                    <md-filled-tonal-button class="mark-unwatched-button">
                        Mark all as Unwatched
                    </md-filled-tonal-button>
                `}
            </div>
        `;

        this._setupEventListeners(seasonNumber, totalEpisodes);
    }

    _setupEventListeners(seasonNumber, totalEpisodes) {
        // Очищаем старые слушатели перед добавлением новых
        this.shadowRoot.querySelectorAll('md-checkbox').forEach(checkbox => {
            const newCheckbox = checkbox.cloneNode(true);
            checkbox.parentNode.replaceChild(newCheckbox, checkbox);
        });
        
        // Добавляем новые слушатели
        this.shadowRoot.querySelectorAll('md-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                haptic.medium();
                const episodeNumber = parseInt(checkbox.dataset.episode);
                
                if (checkbox.checked) {
                    userMoviesService.markEpisodeAsWatched(this._tvId, seasonNumber, episodeNumber);
                    document.dispatchEvent(new CustomEvent('episode-status-changed', {
                        bubbles: true,
                        composed: true,
                        detail: { 
                            tvId: this._tvId,
                            hasWatchedEpisodes: true 
                        }
                    }));
                } else {
                    userMoviesService.markEpisodeAsUnwatched(this._tvId, seasonNumber, episodeNumber);
                }

                // Обновляем UI точки
                const episodeWrapper = checkbox.closest('.episode-item');
                const unwatchedDot = episodeWrapper.querySelector('.unwatched-dot');
                if (checkbox.checked && unwatchedDot) {
                    unwatchedDot.remove();
                } else if (!checkbox.checked && !unwatchedDot) {
                    const episodeNumber = episodeWrapper.querySelector('.episode-number');
                    episodeNumber.innerHTML += '<span class="unwatched-dot"></span>';
                }

                // Проверяем состояние сезона и обновляем кнопки
                const isSeasonFullyWatched = userMoviesService.isSeasonFullyWatched(
                    this._tvId, 
                    seasonNumber,
                    totalEpisodes
                );
                this._updateSeasonActions(seasonNumber, isSeasonFullyWatched, totalEpisodes);
            });
        });

        this._setupActionButtons(seasonNumber, totalEpisodes);
    }

    _setupActionButtons(seasonNumber, totalEpisodes) {
        // Очищаем старые слушатели кнопок
        const watchedButton = this.shadowRoot.querySelector('.mark-watched-button');
        if (watchedButton) {
            const newWatchedButton = watchedButton.cloneNode(true);
            watchedButton.parentNode.replaceChild(newWatchedButton, watchedButton);
            
            newWatchedButton.addEventListener('click', () => {
                haptic.medium();
                
                userMoviesService.markSeasonAsWatched(this._tvId, seasonNumber, totalEpisodes);
                
                // Обновляем UI чекбоксов
                this.shadowRoot.querySelectorAll('md-checkbox').forEach(checkbox => {
                    checkbox.checked = true;
                    const episodeWrapper = checkbox.closest('.episode-item');
                    const unwatchedDot = episodeWrapper.querySelector('.unwatched-dot');
                    if (unwatchedDot) {
                        unwatchedDot.remove();
                    }
                });

                document.dispatchEvent(new CustomEvent('episode-status-changed', {
                    bubbles: true,
                    composed: true,
                    detail: { 
                        tvId: this._tvId,
                        hasWatchedEpisodes: true 
                    }
                }));

                // Обновляем состояние кнопок
                this._updateSeasonActions(seasonNumber, true, totalEpisodes);
            });
        }

        const unwatchedButton = this.shadowRoot.querySelector('.mark-unwatched-button');
        if (unwatchedButton) {
            const newUnwatchedButton = unwatchedButton.cloneNode(true);
            unwatchedButton.parentNode.replaceChild(newUnwatchedButton, unwatchedButton);
            
            newUnwatchedButton.addEventListener('click', () => {
                haptic.medium();
                
                userMoviesService.markSeasonAsUnwatched(this._tvId, seasonNumber);
                
                // Обновляем UI чекбоксов
                this.shadowRoot.querySelectorAll('md-checkbox').forEach(checkbox => {
                    checkbox.checked = false;
                    const episodeWrapper = checkbox.closest('.episode-item');
                    const episodeNumber = episodeWrapper.querySelector('.episode-number');
                    if (!episodeNumber.querySelector('.unwatched-dot')) {
                        episodeNumber.innerHTML += '<span class="unwatched-dot"></span>';
                    }
                });

                // Обновляем состояние кнопок
                this._updateSeasonActions(seasonNumber, false, totalEpisodes);
            });
        }

        // Добавляем обработчик для кнопки оценки сезона
        const rateButton = this.shadowRoot.querySelector('.rate-season-button');
        if (rateButton) {
            const newRateButton = rateButton.cloneNode(true);
            rateButton.parentNode.replaceChild(newRateButton, rateButton);
            
            newRateButton.addEventListener('click', () => {
                haptic.light();
                this._openSeasonReviewDialog(seasonNumber);
            });
        }
    }

    _updateSeasonActions(seasonNumber, isFullyWatched, totalEpisodes) {
        const actionsContainer = this.shadowRoot.querySelector('.season-actions');
        if (!actionsContainer) return;

        if (isFullyWatched) {
            actionsContainer.innerHTML = `
                <md-filled-tonal-button class="rate-season-button">
                    Rate season
                </md-filled-tonal-button>
                <md-filled-tonal-button class="mark-unwatched-button">
                    Mark all as Unwatched
                </md-filled-tonal-button>
            `;
        } else {
            actionsContainer.innerHTML = `
                <md-filled-tonal-button class="mark-watched-button">
                    Mark all as Watched
                </md-filled-tonal-button>
            `;
        }

        // Устанавливаем слушатели только для кнопок
        this._setupActionButtons(seasonNumber, totalEpisodes);
    }

    _openSeasonReviewDialog(seasonNumber) {
        const reviewDialog = document.createElement('review-dialog');
        reviewDialog.setAttribute('season-number', seasonNumber);
        reviewDialog.setAttribute('tv-id', this._tvId);
        
        const seasonInfo = {
            ...this._seasons[seasonNumber - 1],
            title: `Season ${seasonNumber}`,
            media_type: 'tv_season'
        };
        reviewDialog.movie = seasonInfo;
        
        document.body.appendChild(reviewDialog);
        
        reviewDialog.addEventListener('review-submitted', (event) => {
            const review = event.detail.review;
            userMoviesService.saveSeasonReview(this._tvId, seasonNumber, review);
            
            this.dispatchEvent(new CustomEvent('season-review-submitted', {
                bubbles: true,
                composed: true,
                detail: {
                    tvId: this._tvId,
                    seasonNumber,
                    review
                }
            }));
        });
    }

    set tvId(value) {
        this._tvId = value;
    }

    _markAllSeasonsWatched() {
        haptic.medium();
        
        // Отмечаем все эпизоды каждого сезона как просмотренные
        this._seasons.forEach(season => {
            if (season.season_number === 0) return; // Пропускаем специальные эпизоды
            
            // Отмечаем каждый эпизод сезона как просмотренный
            season.episodes.forEach(episode => {
                userMoviesService.markEpisodeAsWatched(
                    this._tvId,
                    season.season_number,
                    episode.episode_number
                );
            });
        });

        // Обновляем UI текущего сезона
        const currentSeasonTab = this.shadowRoot.querySelector('.season-tab[selected]');
        if (currentSeasonTab) {
            this._handleSeasonChange(currentSeasonTab.dataset.season);
        }
        
        // Отправляем событие о просмотре всех сезонов
        document.dispatchEvent(new CustomEvent('all-seasons-watched', {
            bubbles: true,
            composed: true,
            detail: { tvId: this._tvId }
        }));
    }

    _markAllSeasonsUnwatched() {
        haptic.medium();
        
        // Снимаем отметки со всех эпизодов каждого сезона
        this._seasons.forEach(season => {
            if (season.season_number === 0) return; // Пропускаем специальные эпизоды
            
            // Снимаем отметки с каждого эпизода сезона
            season.episodes.forEach(episode => {
                userMoviesService.markEpisodeAsUnwatched(
                    this._tvId,
                    season.season_number,
                    episode.episode_number
                );
            });
        });

        // Обновляем UI текущего сезона
        const currentSeasonTab = this.shadowRoot.querySelector('.season-tab[selected]');
        if (currentSeasonTab) {
            this._handleSeasonChange(currentSeasonTab.dataset.season);
        }
    }

    _clearAllSeasons() {
        haptic.light();
        
        // Снимаем отметки со всех эпизодов каждого сезона
        this._seasons.forEach(season => {
            if (season.season_number === 0) return; // Пропускаем специальные эпизоды
            userMoviesService.markSeasonAsUnwatched(this._tvId, season.season_number);
        });

        // Обновляем UI текущего сезона
        const currentSeasonTab = this.shadowRoot.querySelector('.season-tab[selected]');
        if (currentSeasonTab) {
            this._handleSeasonChange(currentSeasonTab.dataset.season);
        }

        // Отправляем событие об очистке всех сезонов
        document.dispatchEvent(new CustomEvent('all-seasons-cleared', {
            bubbles: true,
            composed: true,
            detail: { tvId: this._tvId }
        }));
    }
}

customElements.define('tv-seasons', TVSeasons); 