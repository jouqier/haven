export class MediaPoster extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['src', 'alt', 'watched-episodes', 'total-episodes', 'user-rating'];
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
        const watchedEpisodes = parseInt(this.getAttribute('watched-episodes')) || 0;
        const totalEpisodes = parseInt(this.getAttribute('total-episodes')) || 0;
        const userRating = this.getAttribute('user-rating');
        const posterSrc = this.getAttribute('src');
        const posterAlt = this.getAttribute('alt');
        
        // Вычисляем процент для кругового прогресса
        const progressPercentage = totalEpisodes 
            ? (watchedEpisodes / totalEpisodes) * 100 
            : 0;

        const radius = 4;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference * (1 - progressPercentage / 100);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: relative;
                    height: 100%;
                }

                .poster-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .poster-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .poster-placeholder {
                    height: 100%;
                    background: var(--md-sys-color-surface-container-low);
                    color: var(--md-sys-color-on-surface);
                    align-items: center;
                    justify-content: center;
                    padding: 0 16px;
                    text-align: center;
                    font-size: 14px;
                    font-weight: 600;
                    word-break: break-word;
                    line-height: 1.2;
                }

                .episodes-badge {
                    display: flex;
                    padding: 2px 5px;
                    justify-content: center;
                    align-items: center;
                    gap: 2px;
                    position: absolute;
                    left: 4px;
                    top: 4px;
                    border-radius: 4px;
                    background: var(--md-sys-color-surface-container-low);
                }

                .progress-ring {
                    width: 12px;
                    height: 12px;
                }

                .progress-ring__background {
                    fill: none;
                    stroke: var(--md-sys-color-on-surface);
                    opacity: 0.2;
                    stroke-width: 2;
                }

                .progress-ring__circle {
                    fill: none;
                    stroke: var(--md-sys-color-on-surface);
                    stroke-width: 2;
                    stroke-linecap: round;
                    transform-origin: center;
                    transform: rotate(-90deg);
                    transition: stroke-dashoffset 0.35s;
                }

                .rating-badge {
                    display: flex;
                    padding: 2px 5px;
                    justify-content: center;
                    align-items: center;
                    gap: 2px;
                    position: absolute;
                    right: 4px;
                    top: 4px;
                    border-radius: 4px;
                    background: var(--md-sys-color-surface-container-low);
                }

                .rating-badge svg {
                    width: 10px;
                    height: 10px;
                    fill: var(--md-sys-color-on-surface);
                }

                .value {
                    color: var(--md-sys-color-on-surface);
                    font-size: 11px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
            </style>

            <div class="poster-container">
                ${posterSrc ? `
                    <img class="poster-image" 
                         src="${posterSrc}" 
                         alt="${posterAlt}"
                         loading="lazy"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="poster-placeholder">
                        ${posterAlt || '?'}
                    </div>
                ` : `
                    <div class="poster-placeholder">
                        ${posterAlt || '?'}
                    </div>
                `}
                
                ${watchedEpisodes ? `
                    <div class="episodes-badge">
                        <svg class="progress-ring" viewBox="0 0 12 12">
                            <circle class="progress-ring__background"
                                cx="6" 
                                cy="6" 
                                r="${radius}"
                            />
                            <circle class="progress-ring__circle"
                                cx="6" 
                                cy="6" 
                                r="${radius}"
                                stroke-dasharray="${circumference}"
                                stroke-dashoffset="${offset}"
                            />
                        </svg>
                        <span class="value">${watchedEpisodes}</span>
                    </div>
                ` : ''}

                ${userRating ? `
                    <div class="rating-badge">
                        <svg viewBox="0 0 10 10">
                            <path d="M4.7011 1.4389C4.79714 1.24434 4.84515 1.14707 4.91034 1.11598C4.96706 1.08894 5.03295 1.08894 5.08966 1.11598C5.15485 1.14707 5.20287 1.24434 5.2989 1.4389L6.21002 3.28472C6.23837 3.34216 6.25255 3.37088 6.27327 3.39318C6.29161 3.41292 6.31361 3.42892 6.33804 3.44028C6.36564 3.45311 6.39733 3.45775 6.46071 3.46701L8.49874 3.7649C8.71335 3.79627 8.82066 3.81195 8.87032 3.86437C8.91353 3.90998 8.93385 3.97264 8.92562 4.03493C8.91617 4.10651 8.83848 4.18218 8.68311 4.33351L7.20893 5.76936C7.16298 5.81412 7.14 5.8365 7.12517 5.86313C7.11205 5.88671 7.10362 5.91261 7.10038 5.9394C7.09671 5.96965 7.10213 6.00127 7.11297 6.06449L7.46081 8.09257C7.4975 8.30647 7.51584 8.41343 7.48137 8.47689C7.45138 8.53212 7.39806 8.57085 7.33627 8.5823C7.26525 8.59547 7.16921 8.54496 6.97712 8.44394L5.15515 7.48578C5.09838 7.45593 5.07 7.441 5.0401 7.43514C5.01362 7.42995 4.98639 7.42995 4.95991 7.43514C4.93 7.441 4.90162 7.45593 4.84485 7.48578L3.02288 8.44394C2.83079 8.54496 2.73475 8.59547 2.66373 8.5823C2.60195 8.57085 2.54863 8.53212 2.51864 8.47689C2.48416 8.41343 2.50251 8.30647 2.53919 8.09257L2.88703 6.06449C2.89787 6.00127 2.9033 5.96965 2.89963 5.9394C2.89638 5.91261 2.88796 5.88671 2.87483 5.86313C2.86 5.8365 2.83703 5.81412 2.79107 5.76936L1.31689 4.33351C1.16152 4.18218 1.08383 4.10651 1.07438 4.03493C1.06616 3.97264 1.08648 3.90998 1.12968 3.86437C1.17934 3.81195 1.28665 3.79627 1.50126 3.7649L3.53929 3.46701C3.60267 3.45775 3.63436 3.45311 3.66196 3.44028C3.6864 3.42892 3.7084 3.41292 3.72674 3.39318C3.74746 3.37088 3.76163 3.34216 3.78998 3.28472L4.7011 1.4389Z"/>
                        </svg>
                        <span class="value">${userRating}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('media-poster', MediaPoster); 