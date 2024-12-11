import { TG, haptic } from '../config/telegram.js';

export class MovieCast extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set cast(value) {
        const filteredCast = value.filter(person => {
            if (person.media_type === 'tv' && person.known_for_department === 'Acting') {
                return true;
            }
            
            if (person.character) return true;
            if (person.job === 'Director' && person.media_type !== 'tv') return true;
            
            return false;
        });

        const uniqueCast = filteredCast.reduce((acc, person) => {
            if (!acc.some(p => p.id === person.id)) {
                let role = '';
                if (person.character) {
                    role = person.character.split('/')[0].trim();
                } else if (person.job === 'Director') {
                    role = 'Director';
                } else if (person.known_for_department === 'Acting') {
                    role = person.roles?.[0]?.character || 'Actor';
                }

                acc.push({
                    ...person,
                    character: role,
                    job: role
                });
            }
            return acc;
        }, []);
        
        this._cast = uniqueCast;
        this.render();
    }

    render() {
        if (!this._cast || this._cast.length === 0) {
            this.style.display = 'none';
            return;
        }
        
        this.style.display = 'flex';

        const castItems = this._cast.map(person => `
            <div class="cast-item" data-person-id="${person.id}">
                <div class="cast-photo-wrapper">
                    <img class="cast-photo" 
                         src="https://image.tmdb.org/t/p/w185${person.profile_path}"
                         alt="${person.name}"
                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="cast-photo-placeholder" style="display: none;">
                        ${person.name.charAt(0).toUpperCase()}
                    </div>
                </div>
                <div class="cast-info">
                    <p class="cast-name">${person.name}</p>
                    <p class="cast-role">${person.character || person.job}</p>
                </div>
            </div>
        `).join('');

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

                h1,
                h2,
                h3,
                h4,
                p {
                    margin: 0;
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
                
                .cast-container {
                    position: relative;
                    display: flex;
                    padding: 8px 0;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 8px;
                    align-self: stretch;
                }

                .cast-list-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    scrollbar-width: none;
                }

                .cast-list-wrapper::-webkit-scrollbar {
                    display: none;
                }

                .cast-container::before,
                .cast-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 16px;
                    pointer-events: none;
                    z-index: 1;
                }

                .cast-container::before {
                    left: 0;
                    background: linear-gradient(to right, var(--md-sys-color-surface-container-lowest), transparent);
                }

                .cast-container::after {
                    right: 0;
                    background: linear-gradient(to left, var(--md-sys-color-surface-container-lowest), transparent);
                }

                .cast-list {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    flex-wrap: nowrap;
                    padding: 0 16px;
                }

                .cast-item {
                    display: flex;
                    width: 72px;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }
                
                .cast-photo-wrapper {
                    width: 72px;
                    height: 72px;
                    border-radius: 999px;
                    overflow: hidden;
                    background: #272A32;
                }
                
                .cast-photo {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%);
                }
                
                .cast-photo-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #272A32;
                    color: #E0E2ED;
                    font-size: 24px;
                    font-weight: 600;
                }
                
                .cast-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    align-self: stretch;
                }
                
                .cast-name {
                    align-self: stretch;
                    color: var(--md-sys-color-on-surface);
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
                
                .cast-role {
                    align-self: stretch;
                    color: var(--md-sys-color-outline);
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
            </style>
            
            <div class="title-info">
                <div class="title">Cast and Crew</div>
            </div>

            <div class="cast-container">
                <div class="cast-list-wrapper">
                    <div class="cast-list">
                        ${castItems}
                        <div style="padding-right: 4px; flex-shrink: 0;"> </div>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.querySelectorAll('.cast-item').forEach(item => {
            item.addEventListener('click', () => {
                haptic.light();
                this.dispatchEvent(new CustomEvent('person-selected', {
                    detail: { personId: item.dataset.personId },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }
}

customElements.define('movie-cast', MovieCast); 