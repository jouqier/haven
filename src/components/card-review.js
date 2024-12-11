import { userMoviesService } from '../services/user-movies.js';
import { haptic } from '../config/telegram.js';
import { TG } from '../config/telegram.js';

export class MovieReview extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._movie = null;
        this._reviews = [];
        this._review = null;
        this._user = null;
        this._initUser();

        document.addEventListener('season-review-submitted', (e) => {
            if (this._movie && e.detail.tvId === this._movie.id) {
                const review = {
                    ...e.detail.review,
                    seasonNumber: e.detail.seasonNumber
                };
                
                const index = this._reviews.findIndex(r => r.seasonNumber === e.detail.seasonNumber);
                if (index !== -1) {
                    this._reviews[index] = review;
                } else {
                    this._reviews.push(review);
                }
                
                this.render();
            }
        });

        document.addEventListener('review-submitted', (e) => {
            if (this._movie && e.detail.movieId === this._movie.id) {
                this._review = e.detail.review;
                this.render();
            }
        });

        document.addEventListener('review-removed', (e) => {
            if (this._movie && e.detail.movieId === this._movie.id) {
                this._review = null;
                this.render();
            }
        });
    }

    async _initUser() {
        if (TG.initDataUnsafe.user) {
            this._user = {
                firstName: TG.initDataUnsafe.user.first_name,
                lastName: TG.initDataUnsafe.user.last_name,
                photo: TG.initDataUnsafe.user.photo_url
            };
            this.render();
        }
    }

    set movie(value) {
        this._movie = value;
        if (value && value.media_type === 'tv') {
            this._loadAllSeasonReviews();
        }
        this.render();
    }

    _loadAllSeasonReviews() {
        this._reviews = this._movie.seasons
            .map(season => {
                const review = userMoviesService.getSeasonReview(this._movie.id, season.season_number);
                if (review) {
                    return {
                        ...review,
                        seasonNumber: season.season_number
                    };
                }
                return null;
            })
            .filter(Boolean);

        this.render();
    }

    set review(value) {
        this._review = value;
        this.render();
    }

    _getRatingEmoji(rating) {
        const emojis = {
            'X': '❌',
            '10': '🤯',
            '9': '🤩',
            '8': '😍',
            '7': '😊',
            '6': '🙂',
            '5': '😐',
            '4': '😕',
            '3': '😣',
            '2': '😫',
            '1': '🤮'
        };
        return emojis[rating] || '❌';
    }

    _getRatingStars(rating) {
        return Array(10).fill('★')
            .map((star, index) => `
                <span style="color: ${index < rating ? 'var(--md-sys-color-on-surface)' : 'var(--md-sys-color-outline)'}">
                    ${star}
                </span>
            `).join('');
    }

    render() {
        if (!this._movie) return;

        const userPhoto = this._user?.photo || '';
        const userName = [this._user?.firstName, this._user?.lastName]
            .filter(Boolean)
            .join(' ') || 'User';

        if (this._movie.media_type === 'tv' && this._reviews?.length > 0) {
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

                    .review-container {
                        display: flex;
                        padding: 16px;
                        flex-direction: column;
                        gap: 8px;
                        align-self: stretch;
                        background: var(--md-sys-color-surface-container);
                        margin: 8px 16px;
                        border-radius: 32px;
                    }

                    .review-header {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                    }

                    .avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 999px;
                        overflow: hidden;
                    }

                    .avatar img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .avatar-placeholder {
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(45deg, #7C3AED, #EC4899);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        font-size: 16px;
                    }

                    .user-info {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    }

                    .username {
                        color: var(--md-sys-color-outline);
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px;
                    }

                    .rating-stars {
                        font-size: 14px;
                    }

                    .review-text {
                        color: var(--md-sys-color-on-surface);
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px;
                        margin: 0;
                        padding: 0 0 0 56px;
                    }

                    .edit-button {
                        background: none;
                        border: none;
                        padding: 8px;
                        cursor: pointer;
                        color: var(--md-sys-color-outline);
                    }

                    .bottom-container {
                        display: flex;
                        margin: 8px 16px 0px 16px;
                    }

                    .bottom-avatar-wrapper {
                        width: 72px;
                        height: 72px;
                        border-radius: 999px;
                        overflow: hidden;
                        background: var(--md-sys-color-surface-container-highest);
                    }

                    .bottom-avatar {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .bottom-avatar-placeholder {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--md-sys-color-surface-container-highest);
                        color: var(--md-sys-color-on-surface);
                        font-size: 24px;
                        font-weight: 600;
                    }

                    .rating-badge {
                        position: absolute;
                        bottom: -8px;
                        background: var(--md-sys-color-primary);
                        color: var(--md-sys-color-on-primary);
                        border-radius: 999px;
                        padding: 2px 6px;
                        font-size: 11px;
                        font-weight: 600;
                        line-height: 16px;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                </style>
                
                <div class="title-info">
                    <div class="title">Reviews</div>
                </div>

                ${this._reviews.map(review => `
                    <div class="review-container">
                        <div class="review-header">
                            <div class="avatar">
                                ${userPhoto 
                                    ? `<img src="${userPhoto}" alt="${userName}">`
                                    : `<div class="avatar-placeholder">${userName.charAt(0)}</div>`
                                }
                            </div>
                            <div class="user-info">
                                <div class="username">${userName} • Season ${review.seasonNumber}</div>
                                <div class="rating-stars">${this._getRatingStars(review.rating)}</div>
                            </div>
                            <button class="edit-button" data-season="${review.seasonNumber}">✏️</button>
                        </div>
                        ${review.text ? `<p class="review-text">${review.text}</p>` : ''}
                    </div>
                `).join('')}
            `;
        } else if (this._review) {
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

                    .review-container {
                        display: flex;
                        padding: 16px;
                        flex-direction: column;
                        gap: 8px;
                        align-self: stretch;
                        background: var(--md-sys-color-surface-container);
                        margin: 8px 16px;
                        border-radius: 32px;
                    }

                    .review-header {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                    }

                    .avatar {
                        width: 40px;
                        height: 40px;
                        border-radius: 999px;
                        overflow: hidden;
                    }

                    .avatar img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .avatar-placeholder {
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(45deg, #7C3AED, #EC4899);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-weight: 600;
                        font-size: 16px;
                    }

                    .user-info {
                        display: flex;
                        flex-direction: column;
                        flex: 1;
                    }

                    .username {
                        color: var(--md-sys-color-outline);
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px;
                    }

                    .rating-stars {
                        font-size: 14px;
                    }

                    .review-text {
                        color: var(--md-sys-color-on-surface);
                        font-size: 14px;
                        font-style: normal;
                        font-weight: 600;
                        line-height: 20px;
                        margin: 0;
                        padding: 0 0 0 56px;
                    }

                    .edit-button {
                        background: none;
                        border: none;
                        padding: 8px;
                        cursor: pointer;
                        color: var(--md-sys-color-outline);
                    }

                    .bottom-container {
                        display: flex;
                        padding: 8px 16px 0px 16px;
                        align-items: center;
                        gap: 8px;
                        align-self: stretch;
                    }
            
                    .bottom-wrapper {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .bottom-avatar-wrapper {
                        width: 72px;
                        height: 72px;
                        border-radius: 999px;
                        overflow: hidden;
                        background: var(--md-sys-color-surface-container-highest);
                    }

                    .bottom-avatar {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .bottom-avatar-placeholder {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: var(--md-sys-color-surface-container-highest);
                        color: var(--md-sys-color-on-surface);
                        font-size: 24px;
                        font-weight: 600;
                    }

                    .rating-badge {
                        position: relative;
                        bottom: 12px;
                        background: var(--md-sys-color-primary);
                        color: var(--md-sys-color-on-primary);
                        border-radius: 999px;
                        padding: 2px 6px;
                        font-size: 11px;
                        font-weight: 600;
                        line-height: 16px;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                </style>
                
                <div class="title-info">
                    <div class="title">Reviews</div>
                </div>

                ${this._review.text ? `
                    <div class="review-container">
                        <div class="review-header">
                            <div class="avatar">
                                ${userPhoto 
                                    ? `<img src="${userPhoto}" alt="${userName}">`
                                    : `<div class="avatar-placeholder">${userName.charAt(0)}</div>`
                                }
                            </div>
                            <div class="user-info">
                                <div class="username">${userName}</div>
                                <div class="rating-stars">${this._getRatingStars(this._review.rating)}</div>
                            </div>
                            <button class="edit-button">✏️</button>
                        </div>
                        <p class="review-text">${this._review.text}</p>
                    </div>
                ` : ''}

                <div class="bottom-container">
                    <div class="bottom-wrapper">
                        <div class="bottom-avatar-wrapper">
                            ${userPhoto 
                                ? `<img class="bottom-avatar" src="${userPhoto}" alt="${userName}">`
                                : `<div class="bottom-avatar-placeholder">${userName.charAt(0)}</div>`
                            }
                        </div>
                        <div class="rating-badge">
                            <span>★</span>
                            <span>${this._review.rating}</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            this.shadowRoot.innerHTML = '';
        }

        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.shadowRoot.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', () => {
                haptic.light();
                if (this._movie.media_type === 'tv') {
                    const seasonNumber = button.dataset.season;
                    const reviewDialog = document.createElement('review-dialog');
                    const seasonInfo = {
                        ...this._movie.seasons[seasonNumber - 1],
                        title: `Season ${seasonNumber}`,
                        media_type: 'tv_season'
                    };
                    reviewDialog.setAttribute('season-number', seasonNumber);
                    reviewDialog.setAttribute('tv-id', this._movie.id);
                    reviewDialog.movie = seasonInfo;
                    reviewDialog.isEdit = true;
                    document.body.appendChild(reviewDialog);
                    
                    reviewDialog.addEventListener('review-submitted', () => {
                        this._loadAllSeasonReviews();
                    });
                } else {
                    const reviewDialog = document.createElement('review-dialog');
                    reviewDialog.movie = this._movie;
                    reviewDialog.isEdit = true;
                    document.body.appendChild(reviewDialog);
                    
                    reviewDialog.addEventListener('review-submitted', (event) => {
                        this._review = event.detail.review;
                        this.render();
                    });
                }
            });
        });
    }
}

customElements.define('movie-review', MovieReview);