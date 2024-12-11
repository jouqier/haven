import { TG } from './telegram.js';

export class NavigationManager {
    constructor() {
        this._currentTab = 'movies';
        this._navigationStack = [];
        this._modalStack = [];
        this._temporaryScreensStack = [];
        
        window.addEventListener('popstate', (event) => {
            if (this._modalStack.length > 0) {
                const modal = this._modalStack.pop();
                modal.remove();
                return;
            }
            
            if (this._temporaryScreensStack.length > 0) {
                const tempScreen = this._temporaryScreensStack.pop();
                tempScreen.remove();
                
                const previousState = this._navigationStack[this._navigationStack.length - 1];
                if (previousState) {
                    this._dispatchNavigationEvent(previousState);
                }
                return;
            }
            
            if (event.state) {
                this._dispatchNavigationEvent(event.state);
            } else {
                this.goBack();
            }
        });
    }

    get currentTab() {
        return this._currentTab;
    }

    _pushState(state) {
        const lastState = this._navigationStack[this._navigationStack.length - 1];
        if (lastState && 
            lastState.type === state.type && 
            lastState.mediaId === state.mediaId && 
            lastState.mediaType === state.mediaType) {
            return;
        }

        if (this._navigationStack.length === 0) {
            const tabState = {
                type: 'tab',
                name: this._currentTab
            };
            this._navigationStack.push(tabState);
        }
        
        this._navigationStack.push(state);
    }

    _popState() {
        return this._navigationStack.pop();
    }

    _dispatchNavigationEvent(state) {
        if (state.type === 'tab') {
            this._currentTab = state.name;
        }
        window.dispatchEvent(new CustomEvent('navigation-changed', {
            detail: { state }
        }));
    }

    getPreviousState() {
        return this._navigationStack[this._navigationStack.length - 2];
    }

    goBack() {
        console.log('goBack called');
        console.log('Current navigation stack:', [...this._navigationStack]);
        console.log('Current temporary stack:', [...this._temporaryScreensStack]);
        console.log('Current modal stack:', [...this._modalStack]);

        if (this._modalStack.length > 0) {
            const modal = this._modalStack.pop();
            modal.remove();
            return true;
        }

        if (this._temporaryScreensStack.length > 0) {
            const tempScreen = this._temporaryScreensStack.pop();
            tempScreen.remove();
            
            const previousState = this._navigationStack[this._navigationStack.length - 1];
            if (previousState) {
                this._dispatchNavigationEvent(previousState);
            }
            console.log('After closing temporary screen, navigation stack:', [...this._navigationStack]);
            return true;
        }

        if (this._navigationStack.length <= 1) {
            const state = {
                type: 'tab',
                name: this._currentTab
            };
            this._navigationStack = [];
            this._dispatchNavigationEvent(state);
            return false;
        }
        
        this._popState();
        const previousState = this._navigationStack[this._navigationStack.length - 1];
        this._dispatchNavigationEvent(previousState);
        console.log('After pop state, navigation stack:', [...this._navigationStack]);
        return true;
    }

    navigateToTab(tab, skipTabBar = true) {
        const url = new URL(window.location);
        url.searchParams.delete('id');
        url.searchParams.delete('name');
        url.searchParams.delete('from');
        url.searchParams.delete('type');
        window.history.pushState(null, '', url);

        while (this._modalStack.length > 0) {
            const modal = this._modalStack.pop();
            modal.remove();
        }

        this._navigationStack = [];
        
        const state = {
            type: 'tab',
            name: tab
        };
        this._dispatchNavigationEvent(state);
    }

    navigateToDetails(mediaId, mediaType, sourceTab) {
        console.log('navigateToDetails:', { mediaId, mediaType, sourceTab });
        console.log('Current navigation stack:', [...this._navigationStack]);
        console.log('Current temporary stack:', [...this._temporaryScreensStack]);

        // Закрываем все временные экраны
        while (this._temporaryScreensStack.length > 0) {
            const tempScreen = this._temporaryScreensStack.pop();
            tempScreen.remove();
        }

        const state = {
            type: 'details',
            mediaId,
            mediaType,
            sourceTab: sourceTab || this._currentTab
        };
        
        const url = new URL(window.location);
        url.searchParams.set('id', mediaId);
        url.searchParams.set('type', mediaType);
        window.history.pushState(state, '', url);
        
        this._pushState(state);
        console.log('Navigation stack after details:', [...this._navigationStack]);
        this._dispatchNavigationEvent(state);
    }

    navigateToGenre(genreId, genreName, from, type) {
        const state = {
            type: 'genre',
            genreId,
            genreName,
            from,
            mediaType: type,
            isTemporary: true
        };
        
        const url = new URL(window.location);
        url.searchParams.set('id', genreId);
        url.searchParams.set('name', genreName);
        if (from) url.searchParams.set('from', from);
        if (type) url.searchParams.set('type', type);
        
        window.history.replaceState(state, '', url);
        
        const genreScreen = document.createElement('genre-screen');
        document.querySelector('#movies-container').appendChild(genreScreen);
        this._temporaryScreensStack.push(genreScreen);
        
        this._dispatchNavigationEvent(state);
    }

    navigateToPerson(personId) {
        console.log('navigateToPerson:', { personId });
        console.log('Current navigation stack:', [...this._navigationStack]);
        console.log('Current temporary stack:', [...this._temporaryScreensStack]);

        // Сначала удаляем все существующие экраны персоны
        while (this._temporaryScreensStack.length > 0) {
            const tempScreen = this._temporaryScreensStack.pop();
            tempScreen.remove();
        }

        const state = {
            type: 'person',
            personId,
            isTemporary: true
        };
        
        const url = new URL(window.location);
        url.searchParams.set('id', personId);
        window.history.replaceState(state, '', url);
        
        const personScreen = document.createElement('person-screen');
        document.querySelector('#movies-container').appendChild(personScreen);
        this._temporaryScreensStack.push(personScreen);
        
        console.log('Navigation stack after person:', [...this._navigationStack]);
        console.log('Temporary stack after person:', [...this._temporaryScreensStack]);
        this._dispatchNavigationEvent(state);
    }

    pushModal(element) {
        this._modalStack.push(element);
        window.history.pushState(null, '', window.location.href);
    }

    removeModal(element) {
        const index = this._modalStack.indexOf(element);
        if (index !== -1) {
            this._modalStack.splice(index, 1);
        }
    }
}

export const navigationManager = new NavigationManager();