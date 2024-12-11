import { haptic } from '../config/telegram.js';
import { userDataStore } from '../services/user-data.js';
import { TG } from '../config/telegram.js';
import '../components/activity-item.js';

export class ActivityScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._activities = [];
        this._userData = null;
    }

    connectedCallback() {
        this._userData = TG?.initDataUnsafe?.user || null;
        this.loadActivities();
        this.render();
        this._setupEventListeners();
    }

    _setupEventListeners() {
        // Слушаем события от activity-item
        this.shadowRoot.addEventListener('movie-selected', (e) => {
            const { movieId, type } = e.detail;
            if (movieId && type) {
                this.dispatchEvent(new CustomEvent('movie-selected', {
                    detail: { movieId, type },
                    bubbles: true,
                    composed: true
                }));
            }
        });
    }

    loadActivities() {
        this._activities = userDataStore.getActivities();
    }

    _groupActivitiesByDate() {
        // Группируем активности по дате и действию
        const groups = this._activities.reduce((acc, activity) => {
            const date = new Date(activity.date).toDateString();
            const key = `${date}_${activity.action}`;
            
            if (!acc[key]) {
                acc[key] = {
                    date: activity.date,
                    action: activity.action,
                    items: []
                };
            }
            
            acc[key].items.push({
                id: activity.id,
                title: activity.title,
                media_type: activity.type,
                poster_path: activity.poster_path,
                rating: activity.rating,
                watchedEpisodes: activity.watchedEpisodes,
                totalEpisodes: activity.totalEpisodes
            });
            
            return acc;
        }, {});

        // Сортируем группы по дате (сначала новые)
        return Object.values(groups).sort((a, b) => b.date - a.date);
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 16px;
                    background: var(--md-sys-color-surface-container-lowest);
                }
                
                .activities-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .empty-state {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 32px 16px;
                    text-align: center;
                    color: var(--md-sys-color-outline);
                }
            </style>

            ${this._activities.length ? `
                <div class="activities-list">
                    ${this._groupActivitiesByDate().map(group => `
                        <activity-item
                            user-name="${this._userData?.first_name || 'Guest'}"
                            user-avatar="${this._userData?.photo_url || ''}"
                            action-type="${group.action}"
                            date="${group.date}"
                            items='${JSON.stringify(group.items)}'
                        ></activity-item>
                    `).join('')}
                </div>
            ` : `
                <div class="empty-state">
                    No activity yet
                </div>
            `}
        `;
    }

    addActivity(movie, action) {
        const activity = {
            id: movie.id,
            title: movie.title || movie.name,
            type: movie.media_type || 'movie',
            action,
            date: Date.now(),
            poster_path: movie.poster_path,
            rating: movie.rating,
            watchedEpisodes: movie.watchedEpisodes,
            totalEpisodes: movie.totalEpisodes
        };
        
        userDataStore.addActivity(activity);
        this._activities = userDataStore.getActivities();
        this.render();
    }
}

customElements.define('activity-screen', ActivityScreen); 