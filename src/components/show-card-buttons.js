import { haptic } from '../config/telegram.js';
import { userMoviesService } from '../services/user-movies.js';
import './action-sheet.js';
import './review-dialog.js';
import '@material/web/button/filled-tonal-button.js';

export class TVShowActionButtons extends HTMLElement {
    static States = {
        NONE: 'none',
        WANT: 'want',
        WATCHED: 'watched'
    };

    static Actions = {
        REMOVE_FROM_WANT: 'remove-from-want',
        REMOVE_FROM_WATCHED: 'remove-from-watched',
        MARK_ALL_WATCHED: 'mark-all-watched',
        MARK_ALL_UNWATCHED: 'mark-all-unwatched',
        MOVE_TO_WANT: 'move-to-want',
        WATCHING: 'watching'
    };

    static Activities = {
        WANT: 'want',
        WATCHED: 'watched',
        WATCHING: 'watching',
        REMOVED_FROM_WANT: 'removed-from-want',
        REMOVED_FROM_WATCHED: 'removed-from-watched'
    };

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._state = TVShowActionButtons.States.NONE;
        this._tvShow = null;
        this._hasWatchedEpisodes = false;
        this._activityScreen = document.createElement('activity-screen');
        
        document.addEventListener('all-seasons-watched', (e) => {
            if (this._tvShow?.id === e.detail.tvId) {
                userMoviesService.addToWatched(this._tvShow);
                this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.WATCHED);
                this._state = TVShowActionButtons.States.WATCHED;
                this._updateButtonStates();
            }
        });
        
        document.addEventListener('change', (e) => {
            if (e.target.tagName === 'MD-CHECKBOX' && this._tvShow) {
                if (this._state === TVShowActionButtons.States.NONE && e.target.checked) {
                    this._handleWatching();
                }
            }
        });
        
        document.addEventListener('episode-status-changed', (e) => {
            if (this._tvShow?.id === e.detail.tvId && e.detail.hasWatchedEpisodes) {
                this._handleWatching();
            }
        });
        
        this._createElements();
        this._setupEventListeners();
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
    }

    _getWantButtonColor() {
        return this._state === TVShowActionButtons.States.WANT ? 
            'transparent' : 
            'rgba(255, 255, 255, 0.32)';
    }

    _getWantButtonBorder() {
        return this._state === TVShowActionButtons.States.WANT ? 
            '2px solid var(--md-sys-color-on-surface)' : 
            'none';
    }

    _getWantButtonDisplay() {
        return this._state === TVShowActionButtons.States.WATCHED ? 'none' : 'flex';
    }

    _getWatchedButtonColor() {
        return this._state === TVShowActionButtons.States.WATCHED ? 
            'var(--md-sys-color-primary-container)' : 
            'rgba(255, 255, 255, 0.32)';
    }

    _getWatchedButtonDisplay() {
        return this._state === TVShowActionButtons.States.WANT ? 'none' : 'flex';
    }

    _setupEventListeners() {
        this._setupTVShowEventListeners();
        this._setupButtonEventListeners();
    }

    _setupTVShowEventListeners() {
        document.addEventListener('all-seasons-watched', this._handleAllSeasonsWatched.bind(this));
        document.addEventListener('all-seasons-unwatched', this._handleAllSeasonsUnwatched.bind(this));
        document.addEventListener('episode-watched-status-changed', this._handleEpisodeStatusChanged.bind(this));
    }

    _setupButtonEventListeners() {
        this._wantButton.addEventListener('click', () => {
            if (!this._tvShow) return;
            haptic.light();
            
            if (this._state === TVShowActionButtons.States.WANT) {
                this._showWantContextMenu();
            } else {
                this._addToWant();
            }
        });

        this._watchedButton.addEventListener('click', () => {
            if (!this._tvShow) return;
            haptic.light();
            this._showTVWatchedMenu();
        });
    }

    set tvShow(value) {
        this._tvShow = value;
        if (this._tvShow) {
            this._state = userMoviesService.getMovieState(this._tvShow.id);
            this._updateButtonStates();
        }
    }

    _handleAllSeasonsWatched(e) {
        if (this._tvShow?.id === e.detail.tvId) {
            haptic.medium();
            this._markAsWatched();
        }
    }

    _handleAllSeasonsUnwatched(e) {
        if (this._tvShow?.id === e.detail.tvId) {
            this._removeFromWatched();
        }
    }

    _handleEpisodeStatusChanged(e) {
        if (this._tvShow?.id === e.detail.tvId) {
            this._hasWatchedEpisodes = e.detail.hasWatchedEpisodes;
            this._updateButtonStates();
        }
    }

    _updateButtonStates() {
        this._updateButtonContent();
        this._updateButtonVisibility();
        this._updateButtonStyles();
    }

    _updateButtonContent() {
        this._wantButtonContent.textContent = this._state === TVShowActionButtons.States.WANT ? 
            '✓ Want' : 'Want';
        this._watchedButtonContent.textContent = this._state === TVShowActionButtons.States.WATCHED ? 
            '✓ Watched' : 'Watched';
    }

    _updateButtonVisibility() {
        if (this._state === TVShowActionButtons.States.WATCHED || 
            this._state === TVShowActionButtons.States.WANT) {
            this._wantButton.style.display = this._getWantButtonDisplay();
            this._watchedButton.style.display = this._getWatchedButtonDisplay();
        } else if (this._hasWatchedEpisodes) {
            this._wantButton.style.display = 'none';
            this._watchedButton.style.display = 'flex';
        } else {
            this._wantButton.style.display = 'flex';
            this._watchedButton.style.display = 'flex';
        }
    }

    _updateButtonStyles() {
        this._wantButton.style.border = this._getWantButtonBorder();
        this._wantButton.style.setProperty('--md-sys-color-secondary-container', this._getWantButtonColor());
        this._watchedButton.style.setProperty('--md-sys-color-secondary-container', this._getWatchedButtonColor());
    }

    _addToWant() {
        userMoviesService.addToWant(this._tvShow);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.WANT);
        this._state = TVShowActionButtons.States.WANT;
        this._updateButtonStates();
    }

    _markAsWatched() {
        userMoviesService.addToWatched(this._tvShow);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.WATCHED);
        this._state = TVShowActionButtons.States.WATCHED;
        this._updateButtonStates();
    }

    _removeFromWatched() {
        userMoviesService.removeFromWatched(this._tvShow.id);
        this._state = TVShowActionButtons.States.NONE;
        this._updateButtonStates();
    }

    _showWantContextMenu() {
        const menu = document.createElement('context-menu');
        menu.options = [
            { 
                label: 'Remove from Want',
                action: TVShowActionButtons.Actions.REMOVE_FROM_WANT
            },
            {
                label: "I'm watching this",
                action: TVShowActionButtons.Actions.WATCHING
            },
            {
                label: 'Mark all as watched',
                action: TVShowActionButtons.Actions.MARK_ALL_WATCHED
            }
        ];

        menu.addEventListener('menu-action', this._handleWantMenuAction.bind(this));
        document.body.appendChild(menu);
    }

    _showTVWatchedMenu() {
        const menu = document.createElement('context-menu');
        
        const checkPromise = new Promise(resolve => {
            console.log('Waiting for check-all-seasons-result...');
            document.addEventListener('check-all-seasons-result', (e) => {
                console.log('Got check-all-seasons-result:', e.detail);
                if (this._tvShow?.id === e.detail.tvId) {
                    resolve(e.detail.allWatched);
                }
            }, { once: true });
        });

        console.log('Dispatching check-all-seasons for tvId:', this._tvShow.id);
        document.dispatchEvent(new CustomEvent('check-all-seasons', {
            bubbles: true,
            composed: true,
            detail: { tvId: this._tvShow.id }
        }));

        checkPromise.then(allSeasonsWatched => {
            console.log('Creating menu with allSeasonsWatched:', allSeasonsWatched);
            menu.options = this._getContextMenuOptions(allSeasonsWatched);
            menu.addEventListener('menu-action', this._handleWatchedMenuAction.bind(this));
            document.body.appendChild(menu);
        });
    }

    _getContextMenuOptions(allSeasonsWatched) {
        if (this._state === TVShowActionButtons.States.WATCHED) {
            return allSeasonsWatched ? [
                { label: 'Remove from Watched', action: TVShowActionButtons.Actions.REMOVE_FROM_WATCHED },
                { label: 'Mark all as unwatched', action: TVShowActionButtons.Actions.MARK_ALL_UNWATCHED },
                { label: 'Move to Want', action: TVShowActionButtons.Actions.MOVE_TO_WANT }
            ] : [
                { label: 'Remove from Watched', action: TVShowActionButtons.Actions.REMOVE_FROM_WATCHED },
                { label: 'Mark all as watched', action: TVShowActionButtons.Actions.MARK_ALL_WATCHED },
                { label: 'Move to Want', action: TVShowActionButtons.Actions.MOVE_TO_WANT }
            ];
        }
        
        return [
            { label: 'Mark all as watched', action: TVShowActionButtons.Actions.MARK_ALL_WATCHED },
            { label: "I'm watching this", action: TVShowActionButtons.Actions.WATCHING }
        ];
    }

    _handleWantMenuAction(e) {
        switch (e.detail.action) {
            case TVShowActionButtons.Actions.REMOVE_FROM_WANT:
                this._handleRemoveFromWant();
                break;
            case TVShowActionButtons.Actions.WATCHING:
                this._handleWatching();
                break;
            case TVShowActionButtons.Actions.MARK_ALL_WATCHED:
                this._handleMarkAllWatched();
                break;
        }
    }

    _handleWatchedMenuAction(e) {
        switch (e.detail.action) {
            case TVShowActionButtons.Actions.REMOVE_FROM_WATCHED:
                this._handleRemoveFromWatched();
                break;
            case TVShowActionButtons.Actions.MARK_ALL_UNWATCHED:
                this._handleMarkAllUnwatched();
                break;
            case TVShowActionButtons.Actions.MARK_ALL_WATCHED:
                this._dispatchTVAction(e.detail.action);
                break;
            case TVShowActionButtons.Actions.MOVE_TO_WANT:
                this._handleMoveToWant();
                break;
            case TVShowActionButtons.Actions.WATCHING:
                this._handleWatching();
                break;
        }
    }

    _handleRemoveFromWant() {
        userMoviesService.removeFromWant(this._tvShow.id);
        userMoviesService.removeAllSeasonReviews(this._tvShow.id);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.REMOVED_FROM_WANT);
        this._state = TVShowActionButtons.States.NONE;
        this._updateButtonStates();
        this._dispatchTVAction('clear-all-seasons');
    }

    _handleRemoveFromWatched() {
        userMoviesService.removeFromWatched(this._tvShow.id);
        userMoviesService.removeAllSeasonReviews(this._tvShow.id);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.REMOVED_FROM_WATCHED);
        this._state = TVShowActionButtons.States.NONE;
        this._updateButtonStates();
        this._dispatchTVAction('clear-all-seasons');
    }

    _handleWatching() {
        userMoviesService.addToWatched(this._tvShow);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.WATCHING);
        this._state = TVShowActionButtons.States.WATCHED;
        this._updateButtonStates();
    }

    _handleMoveToWant() {
        userMoviesService.removeFromWatched(this._tvShow.id);
        userMoviesService.addToWant(this._tvShow);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.WANT);
        this._state = TVShowActionButtons.States.WANT;
        this._updateButtonStates();
    }

    _handleMarkAllWatched() {
        haptic.medium();
        
        this._dispatchTVAction(TVShowActionButtons.Actions.MARK_ALL_WATCHED);
        
        userMoviesService.removeFromWant(this._tvShow.id);
        userMoviesService.addToWatched(this._tvShow);
        this._activityScreen.addActivity(this._tvShow, TVShowActionButtons.Activities.WATCHED);
        this._state = TVShowActionButtons.States.WATCHED;
        this._updateButtonStates();
    }

    _handleMarkAllUnwatched() {
        haptic.medium();
        
        this._dispatchTVAction(TVShowActionButtons.Actions.MARK_ALL_UNWATCHED);
        
        this._updateButtonStates();
    }

    _dispatchTVAction(action) {
        document.dispatchEvent(new CustomEvent('tv-action', {
            bubbles: true,
            composed: true,
            detail: {
                tvId: this._tvShow.id,
                action
            }
        }));
    }
}

customElements.define('tv-show-action-buttons', TVShowActionButtons); 