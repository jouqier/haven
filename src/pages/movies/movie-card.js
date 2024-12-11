import { userMoviesService } from '../../services/user-movies.js';
import { haptic } from '../../config/telegram.js';
import '../../components/card-review.js';
import '../../components/card-stats.js';
import '../../components/card-cast.js';
import '../../components/card-recomendation.js';
import '../../components/card-info.js';
import '../../components/card-poster.js';
import '../../components/movie-card-buttons.js';
import { navigationManager } from '../../config/navigation.js';

export class MovieCardDetails extends HTMLElement {
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
            title: this._movie.title,
            rating: this._movie.vote_average,
            releaseDate: this._movie.release_date,
            runtime: this._movie.runtime,
            overview: this._movie.overview,
            genres: this._movie.genres.map(g => g.name),
            type: 'movie'
        };
        
        this.shadowRoot.querySelector('movie-info').info = info;

        const reviewElement = this.shadowRoot.querySelector('movie-review');
        const existingReview = userMoviesService.getReview(this._movie.media_type || 'movie', this._movie.id);
        if (existingReview) {
            reviewElement.movie = this._movie;
            reviewElement.review = existingReview;
            reviewElement.style.display = 'flex';
        } else {
            reviewElement.style.display = 'none';
        }

        if (this._movie.credits) {
            this.shadowRoot.querySelector('movie-cast').cast = this._movie.credits.cast;
        }

        if (this._movie.recommendations) {
            const recommendationsElement = this.shadowRoot.querySelector('movie-recommendations');
            recommendationsElement.recommendations = this._movie.recommendations;
            recommendationsElement.currentMovie = this._movie.title;
        }
    }
}

customElements.define('movie-card-details', MovieCardDetails); 