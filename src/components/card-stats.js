export class MovieStats extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['want', 'watched', 'reviews'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                
                :host {
                    display: flex;
                    padding: 8px 16px;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                }
                
                .stat {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1 0 0;
                }
                
                .count {
                    color: #E0E2ED;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 20px;
                }
                
                .label {
                    color: #8B90A0;
                    text-align: center;
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                }
            </style>
            
                <div class="stat">
                    <span class="count">${this.getAttribute('want') || 481516}</span>
                    <span class="label">Want</span>
                </div>
                <div class="stat">
                    <span class="count">${this.getAttribute('watched') || 23}</span>
                    <span class="label">Watched</span>
                </div>
                <div class="stat">
                    <span class="count">${this.getAttribute('reviews') || 42}</span>
                    <span class="label">Reviews</span>
                </div>
        `;
    }
}

customElements.define('movie-stats', MovieStats); 