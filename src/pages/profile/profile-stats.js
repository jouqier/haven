export class ProfileStats extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['place', 'following', 'followers'];
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
                    padding: 16px;
                    justify-content: space-between;
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
                    color: var(--md-sys-color-on-surface);
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 24px;
                }
                
                .label {
                    color: var(--md-sys-color-outline);
                    font-size: 12px;
                    line-height: 16px;
                }
            </style>
            
            <div class="stat">
                <span class="count">${this.getAttribute('place') || 0}</span>
                <span class="label">Place</span>
            </div>
            <div class="stat">
                <span class="count">${this.getAttribute('following') || 0}</span>
                <span class="label">Following</span>
            </div>
            <div class="stat">
                <span class="count">${this.getAttribute('followers') || 0}</span>
                <span class="label">Followers</span>
            </div>
        `;
    }
}

customElements.define('profile-stats', ProfileStats); 