import { haptic } from '../config/telegram.js';
import './movie-card-buttons.js';
import './show-card-buttons.js';

export class MoviePoster extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._movie = null;
        this._createElements();
    }

    _createElements() {
        this.shadowRoot.innerHTML = `
            <style>
                .action-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                    border-radius: 40px;
                    position: relative;
                    overflow: hidden;
                }
                
                .action-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--poster-background, lightgray);
                    background-position: center;
                    border-radius: 42px;
                }
                
                .action-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.60) 80%);
                    backdrop-filter: blur(20px);
                }
                
                .image-container {
                    display: flex;
                    padding: 32px 96px 16px 96px;
                    flex-direction: column;
                    align-items: center;
                    align-self: stretch;
                    z-index: 1;
                }
                
                .poster img {
                    width: 100%;
                    height: auto;
                    display: block;
                    border-radius: 4px;
                }

                .actions-container {
                    z-index: 1;
                    width: 100%;
                }
            </style>
            
            <div class="action-container">
                <div class="image-container">
                    <div class="poster">
                        <img>
                    </div>
                </div>
                <div class="actions-container">
                    <movie-action-buttons style="display: none"></movie-action-buttons>
                    <tv-show-action-buttons style="display: none"></tv-show-action-buttons>
                </div>
            </div>
        `;

        this._posterImg = this.shadowRoot.querySelector('.poster img');
        this._actionContainer = this.shadowRoot.querySelector('.action-container');
        this._movieActionButtons = this.shadowRoot.querySelector('movie-action-buttons');
        this._tvShowActionButtons = this.shadowRoot.querySelector('tv-show-action-buttons');
    }

    set movie(value) {
        this._movie = value;
        if (this._movie) {
            this._updateContent();
            this._updateActions();
        }
    }

    _updateContent() {
        if (!this._movie) return;

        if (this._movie.poster_path) {
            const posterUrl = `https://image.tmdb.org/t/p/w500${this._movie.poster_path}`;
            this._posterImg.src = posterUrl;
            this._posterImg.alt = this._movie.title || this._movie.name;
            
            this._actionContainer.style.setProperty(
                '--poster-background',
                `url(${posterUrl}) lightgray 50% / cover no-repeat`
            );
        }
    }

    _updateActions() {
        if (this._movie.media_type === 'tv') {
            this._movieActionButtons.style.display = 'none';
            this._tvShowActionButtons.style.display = 'flex';
            this._tvShowActionButtons.tvShow = this._movie;
        } else {
            this._tvShowActionButtons.style.display = 'none';
            this._movieActionButtons.style.display = 'flex';
            this._movieActionButtons.movie = this._movie;
        }
    }
}

customElements.define('movie-poster', MoviePoster);