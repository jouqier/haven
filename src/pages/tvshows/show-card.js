import { userMoviesService } from '../../services/user-movies.js';
import { haptic } from '../../config/telegram.js';
import '../../components/card-review.js';
import '../../components/card-stats.js';
import '../../components/card-cast.js';
import '../../components/card-recomendation.js';
import '../../components/card-info.js';
import '../../components/card-poster.js';
import '../../components/show-card-seasons.js';
import '../../components/show-card-buttons.js';
import { navigationManager } from '../../config/navigation.js';

export class TVShowCardDetails extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    width: 100%;
                    box-sizing: border-box;
                }
            </style>
            <movie-poster></movie-poster>
            <movie-stats></movie-stats>
            <movie-info></movie-info>
            <tv-seasons></tv-seasons>
            <movie-review></movie-review>
            <movie-cast></movie-cast>
            <movie-recommendations></movie-recommendations>
        `;

        document.addEventListener('review-removed', () => {
            const reviewElement = this.shadowRoot.querySelector('movie-review');
            reviewElement.style.display = 'none';
        });

        document.addEventListener('review-submitted', (event) => {
            if (this._movie && event.detail.movieId === this._movie.id) {
                const reviewElement = this.shadowRoot.querySelector('movie-review');
                reviewElement.movie = this._movie;
                reviewElement.review = event.detail.review;
                reviewElement.render();
                reviewElement.style.display = 'flex';
            }
        });
    }

    connectedCallback() {
        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.shadowRoot.addEventListener('person-selected', (e) => {
            const { personId } = e.detail;
            if (personId) {
                haptic.light();
                navigationManager.navigateToPerson(personId);
            }
        });
    }

    set movie(value) {
        this._movie = value;
        this.render();
    }

    render() {
        if (!this._movie) return;
        
        this.shadowRoot.querySelector('movie-poster').movie = this._movie;
        this.shadowRoot.querySelector('movie-stats').movie = this._movie;
        
        const info = {
            title: this._movie.name,
            rating: this._movie.vote_average,
            firstAirDate: this._movie.first_air_date,
            lastAirDate: this._movie.last_air_date,
            status: this._movie.status,
            numberOfSeasons: this._movie.number_of_seasons,
            numberOfEpisodes: this._movie.number_of_episodes,
            overview: this._movie.overview,
            genres: this._movie.genres.map(g => g.name),
            type: 'tv',
            seasons: this._movie.seasons
        };
        
        this.shadowRoot.querySelector('movie-info').info = info;
        
        const seasonsElement = this.shadowRoot.querySelector('tv-seasons');
        seasonsElement.style.display = 'flex';
        seasonsElement.tvId = this._movie.id;
        seasonsElement.seasons = this._movie.seasons;

        const reviewElement = this.shadowRoot.querySelector('movie-review');
        reviewElement.movie = {
            ...this._movie,
            media_type: 'tv'
        };

        if (this._movie.credits) {
            this.shadowRoot.querySelector('movie-cast').cast = this._movie.credits.cast;
        }

        if (this._movie.recommendations) {
            const recommendationsElement = this.shadowRoot.querySelector('movie-recommendations');
            recommendationsElement.recommendations = this._movie.recommendations;
            recommendationsElement.currentMovie = this._movie.name;
        }
    }
}

customElements.define('tv-show-card-details', TVShowCardDetails); 