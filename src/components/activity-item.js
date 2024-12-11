import { userMoviesService } from '../services/user-movies.js';
import './media-poster.js';

export class ActivityItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['user-name', 'user-avatar', 'action-type', 'date', 'items'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const userName = this.getAttribute('user-name');
        const userAvatar = this.getAttribute('user-avatar');
        const actionType = this.getAttribute('action-type'); // 'watched' или 'wants'
        const date = this.getAttribute('date');
        const items = JSON.parse(this.getAttribute('items') || '[]');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: var(--md-sys-color-surface-container);
                    border-radius: 12px;
                    padding: 12px;
                }

                .activity-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                }

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    object-fit: cover;
                }

                .header-info {
                    flex: 1;
                }

                .user-name {
                    color: var(--md-sys-color-on-surface);
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 2px;
                }

                .action-type {
                    color: var(--md-sys-color-outline);
                    font-size: 14px;
                }

                .media-list {
                    display: flex;
                    gap: 8px;
                    overflow-x: auto;
                    padding-bottom: 4px;
                    scrollbar-width: none;
                }

                .media-list::-webkit-scrollbar {
                    display: none;
                }

                .media-item {
                    flex: 0 0 auto;
                    width: 100px;
                    aspect-ratio: 2/3;
                }
            </style>

            <div class="activity-header">
                <img class="user-avatar" src="${userAvatar}" alt="${userName}">
                <div class="header-info">
                    <div class="user-name">${userName}</div>
                    <div class="action-type">${actionType === 'watched' ? 'Watched' : 'Wants'}</div>
                </div>
            </div>

            <div class="media-list">
                ${items.map(item => `
                    <div class="media-item" data-id="${item.id}" data-type="${item.media_type}">
                        <media-poster
                            src="https://image.tmdb.org/t/p/w185${item.poster_path}"
                            alt="${item.title || item.name}"
                            ${item.rating ? `user-rating="${item.rating}"` : ''}
                            ${item.watchedEpisodes ? `
                                watched-episodes="${item.watchedEpisodes}"
                                total-episodes="${item.totalEpisodes}"
                            ` : ''}
                        ></media-poster>
                    </div>
                `).join('')}
            </div>
        `;

        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.shadowRoot.querySelectorAll('.media-item').forEach(item => {
            item.addEventListener('click', () => {
                haptic.light();
                const id = item.dataset.id;
                const type = item.dataset.type;
                
                this.dispatchEvent(new CustomEvent('movie-selected', {
                    detail: { movieId: id, type },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }
}

customElements.define('activity-item', ActivityItem); 