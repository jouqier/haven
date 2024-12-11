import { scrollLock } from '../utils/scroll.js';
import { navigationManager } from '../config/navigation.js';

export class ContextMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        scrollLock.enable();
        navigationManager.pushModal(this);
    }

    disconnectedCallback() {
        scrollLock.disable();
        navigationManager.removeModal(this);
    }

    set options(value) {
        this._options = value;
        this.render();
        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.shadowRoot.querySelector('.overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('overlay')) {
                this.remove();
            }
        });

        this.shadowRoot.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                this.dispatchEvent(new CustomEvent('menu-action', {
                    detail: { action },
                    bubbles: true,
                    composed: true
                }));
                this.remove();
            });
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    animation: fadeIn 0.2s ease-out;
                }
                
                .menu {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: var(--md-sys-color-surface-container-high);
                    border-radius: 40px;
                    padding: 8px;
                    margin: 8px;
                    z-index: 1001;
                    animation: slideUp 0.3s ease-out;                  
                }
                
                .menu-item {
                    width: 100%;
                    padding: 24px;
                    text-align: center;
                    color: var(--md-sys-color-on-surface);
                    background: transparent;
                    border: none;
                    border-radius: 1000px;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 24px;
                    letter-spacing: 0.15px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }
                
                .menu-item:hover {
                    background: var(--md-sys-color-surface-container-highest);
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }              
            </style>
            
            <div class="overlay">
                <div class="menu">
                    ${this._options.map(option => `
                        <button class="menu-item" data-action="${option.action}">
                            ${option.label}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

customElements.define('context-menu', ContextMenu);