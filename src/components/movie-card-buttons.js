import { haptic } from '../config/telegram.js';
import { userMoviesService } from '../services/user-movies.js';
import './action-sheet.js';
import './review-dialog.js';
import '@material/web/button/filled-tonal-button.js';

export class MovieActionButtons extends HTMLElement {
    static States = {
        NONE: 'none',
        WANT: 'want',
        WATCHED: 'watched'
    };

    static Actions = {
        MOVE_TO_WATCHED: 'move-to-watched',
        REMOVE_FROM_WANT: 'remove-from-want',
        MOVE_TO_WANT: 'move-to-want',
        REMOVE_FROM_WATCHED: 'remove-from-watched',
        EDIT_REVIEW: 'edit-review'
    };

    static Activities = {
        WANT: 'want',
        WATCHED: 'watched',
        REVIEW: 'review',
        EDITED_REVIEW: 'edited-review',
        REMOVED_FROM_WANT: 'removed-from-want',
        REMOVED_FROM_WATCHED: 'removed-from-watched'
    };

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._state = MovieActionButtons.States.NONE;
        this._movie = null;
        this._activityScreen = document.createElement('activity-screen');
        
        this._createElements();
    }

    _createElements() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    padding: 16px;
                    align-items: center;
                    gap: 8px;
                    align-self: stretch;
                    z-index: 1;
                }
                
                md-filled-tonal-button {
                    flex: 1 0 0;
                    --md-filled-tonal-button-container-shape: 1000px;
                    --md-filled-tonal-button-label-text-font: 600 14px sans-serif;
                    height: 48px;
                    transition: all 0.3s ease;
                }

                .want-button {
                    --md-sys-color-secondary-container: ${this._getWantButtonColor()};
                    --md-sys-color-on-secondary-container: #FFF;
                    border: ${this._getWantButtonBorder()};
                    display: ${this._getWantButtonDisplay()};
                }

                .watched-button {
                    --md-sys-color-secondary-container: ${this._getWatchedButtonColor()};
                    --md-sys-color-on-secondary-container: #FFF;
                    display: ${this._getWatchedButtonDisplay()};
                }

                .button-content {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
            </style>
            
            <md-filled-tonal-button class="want-button">
                <div class="button-content">Want</div>
            </md-filled-tonal-button>
            <md-filled-tonal-button class="watched-button">
                <div class="button-content">Watched</div>
            </md-filled-tonal-button>
        `;

        this._wantButton = this.shadowRoot.querySelector('.want-button');
        this._watchedButton = this.shadowRoot.querySelector('.watched-button');
        this._wantButtonContent = this._wantButton.querySelector('.button-content');
        this._watchedButtonContent = this._watchedButton.querySelector('.button-content');

        this._setupEventListeners();
    }

    _getWantButtonColor() {
        return this._state === MovieActionButtons.States.WANT ? 
            'transparent' : 
            'rgba(255, 255, 255, 0.32)';
    }

    _getWantButtonBorder() {
        return this._state === MovieActionButtons.States.WANT ? 
            '2px solid var(--md-sys-color-on-surface)' : 
            'none';
    }

    _getWantButtonDisplay() {
        return this._state === MovieActionButtons.States.WATCHED ? 'none' : 'flex';
    }

    _getWatchedButtonColor() {
        return this._state === MovieActionButtons.States.WATCHED ? 
            'var(--md-sys-color-primary-container)' : 
            'rgba(255, 255, 255, 0.32)';
    }

    _getWatchedButtonDisplay() {
        return this._state === MovieActionButtons.States.WANT ? 'none' : 'flex';
    }

    _setupEventListeners() {
        this._wantButton.addEventListener('click', () => {
            if (!this._movie) return;
            haptic.light();
            
            if (this._state === MovieActionButtons.States.WANT) {
                this._showWantContextMenu();
            } else {
                this._addToWant();
            }
        });

        this._watchedButton.addEventListener('click', () => {
            if (!this._movie) return;
            haptic.light();
            
            if (this._state === MovieActionButtons.States.WATCHED) {
                this._showWatchedContextMenu();
            } else {
                this._handleWatchedClick();
            }
        });
    }

    set movie(value) {
        this._movie = value;
        if (this._movie) {
            this._state = userMoviesService.getMovieState(this._movie.id);
            this._updateButtonStates();
        }
    }

    _updateButtonStates() {
        this._updateButtonContent();
        this._updateButtonVisibility();
        this._updateButtonStyles();
    }

    _updateButtonContent() {
        this._wantButtonContent.textContent = 
            this._state === MovieActionButtons.States.WANT ? '✓ Want' : 'Want';
        this._watchedButtonContent.textContent = 
            this._state === MovieActionButtons.States.WATCHED ? '✓ Watched' : 'Watched';
    }

    _updateButtonVisibility() {
        this._wantButton.style.display = this._getWantButtonDisplay();
        this._watchedButton.style.display = this._getWatchedButtonDisplay();
    }

    _updateButtonStyles() {
        this._wantButton.style.border = this._getWantButtonBorder();
        this._wantButton.style.setProperty('--md-sys-color-secondary-container', this._getWantButtonColor());
        this._watchedButton.style.setProperty('--md-sys-color-secondary-container', this._getWatchedButtonColor());
    }

    _addToWant() {
        userMoviesService.addToWant(this._movie);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.WANT);
        this._state = MovieActionButtons.States.WANT;
        this._updateButtonStates();
    }

    _showWantContextMenu() {
        const menu = document.createElement('context-menu');
        menu.options = [
            { 
                label: 'Move to Watched',
                action: MovieActionButtons.Actions.MOVE_TO_WATCHED
            },
            {
                label: 'Remove from Want',
                action: MovieActionButtons.Actions.REMOVE_FROM_WANT
            }
        ];

        menu.addEventListener('menu-action', this._handleWantMenuAction.bind(this));
        document.body.appendChild(menu);
    }

    _showWatchedContextMenu() {
        const menu = document.createElement('context-menu');
        menu.options = [
            {
                label: 'Move to Want',
                action: MovieActionButtons.Actions.MOVE_TO_WANT
            },
            {
                label: 'Remove from Watched',
                action: MovieActionButtons.Actions.REMOVE_FROM_WATCHED
            },
            {
                label: 'Edit Review',
                action: MovieActionButtons.Actions.EDIT_REVIEW
            }
        ];

        menu.addEventListener('menu-action', this._handleWatchedMenuAction.bind(this));
        document.body.appendChild(menu);
    }

    _handleWantMenuAction(e) {
        switch (e.detail.action) {
            case MovieActionButtons.Actions.MOVE_TO_WATCHED:
                this._handleMoveToWatched();
                break;
            case MovieActionButtons.Actions.REMOVE_FROM_WANT:
                this._handleRemoveFromWant();
                break;
        }
    }

    _handleWatchedMenuAction(e) {
        switch (e.detail.action) {
            case MovieActionButtons.Actions.MOVE_TO_WANT:
                this._handleMoveToWant();
                break;
            case MovieActionButtons.Actions.REMOVE_FROM_WATCHED:
                this._handleRemoveFromWatched();
                break;
            case MovieActionButtons.Actions.EDIT_REVIEW:
                this._handleEditReview();
                break;
        }
    }

    _handleMoveToWatched() {
        userMoviesService.removeFromWant(this._movie.id);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.REMOVED_FROM_WANT);
        
        userMoviesService.addToWatched(this._movie);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.WATCHED);
        this._state = MovieActionButtons.States.WATCHED;
        this._updateButtonStates();
        
        this._showReviewDialog();
    }

    _handleRemoveFromWant() {
        userMoviesService.removeFromWant(this._movie.id);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.REMOVED_FROM_WANT);
        this._state = MovieActionButtons.States.NONE;
        this._updateButtonStates();
    }

    _handleMoveToWant() {
        const movieId = this._movie.id;
        const type = this._movie.media_type || 'movie';

        userMoviesService.removeFromWatched(movieId);
        userMoviesService.removeReview(type, movieId);
        this._dispatchReviewRemoved(movieId, type);
        
        userMoviesService.addToWant(this._movie);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.REMOVED_FROM_WATCHED);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.WANT);
        
        this._state = MovieActionButtons.States.WANT;
        this._updateButtonStates();
    }

    _handleRemoveFromWatched() {
        const movieId = this._movie.id;
        const type = this._movie.media_type || 'movie';

        userMoviesService.removeFromWatched(movieId);
        userMoviesService.removeReview(type, movieId);
        
        this._dispatchReviewRemoved(movieId, type);
        this._state = MovieActionButtons.States.NONE;
        this._updateButtonStates();
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.REMOVED_FROM_WATCHED);
    }

    _handleEditReview() {
        const reviewDialog = this._createReviewDialog(true);
        reviewDialog.addEventListener('review-submitted', () => {
            this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.EDITED_REVIEW);
        });
    }

    _handleWatchedClick() {
        haptic.medium();
        userMoviesService.addToWatched(this._movie);
        this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.WATCHED);
        this._state = MovieActionButtons.States.WATCHED;
        this._updateButtonStates();
        this._showReviewDialog();
    }

    _showReviewDialog(isEdit = false) {
        const reviewDialog = this._createReviewDialog(isEdit);
        reviewDialog.addEventListener('review-submitted', (event) => {
            this._activityScreen.addActivity(this._movie, MovieActionButtons.Activities.REVIEW);
            this._dispatchReviewSubmitted(event.detail);
        });
    }

    _createReviewDialog(isEdit = false) {
        const reviewDialog = document.createElement('review-dialog');
        reviewDialog.movie = this._movie;
        reviewDialog.isEdit = isEdit;
        document.body.appendChild(reviewDialog);
        return reviewDialog;
    }

    _dispatchReviewSubmitted(detail) {
        document.dispatchEvent(new CustomEvent('review-submitted', {
            bubbles: true,
            composed: true,
            detail
        }));
    }

    _dispatchReviewRemoved(movieId, type = 'movie') {
        document.dispatchEvent(new CustomEvent('review-removed', {
            bubbles: true,
            composed: true,
            detail: {
                movieId,
                type
            }
        }));
    }
}

customElements.define('movie-action-buttons', MovieActionButtons); 