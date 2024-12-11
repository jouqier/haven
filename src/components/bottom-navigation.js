import { haptic } from '../config/telegram.js';

export class TabBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._activeTab = 'movies';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        const defaultTab = this.shadowRoot.querySelector(`[data-tab="${this._activeTab}"]`);
        if (defaultTab) {
            defaultTab.classList.add('active');
        }
    }

    setActiveTab(tabName) {
        if (this._activeTab === tabName) return;
        
        this._activeTab = tabName;
        this.setAttribute('active-tab', tabName);
        
        const tabs = this.shadowRoot.querySelectorAll('.tab-item');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });
        
        this.dispatchEvent(new CustomEvent('tab-changed', {
            detail: { tab: tabName },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: var(--md-sys-color-scrim);
                    z-index: 1000;
                }

                .tab-bar {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 0 16px;
                    padding-top: 12px; 
                    padding-bottom: calc(12px + env(safe-area-inset-bottom)); 
                    gap: 8px;               
                }

                .tab-item {
                    position: relative;
                    display: flex;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 100px;
                    flex: 1 0 0;
                    align-self: stretch;                    
                }

                .tab-item.active {
                    background: var(--md-sys-color-surface-container-low);
                }

                .tab-item.active .tab-icon {
                    color: var(--md-sys-color-on-surface);
                }

                .tab-icon {
                    width: 24px;
                    height: 24px;
                }

                .tab-label {
                    display: none;
                }
            </style>

            <div class="tab-bar">
                <a class="tab-item" data-tab="profile">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M12.6002 15C9.43012 15 6.61099 16.5306 4.81619 18.906C4.4299 19.4172 4.23675 19.6728 4.24307 20.0183C4.24795 20.2852 4.41555 20.6219 4.62556 20.7867C4.89738 21 5.27406 21 6.02742 21H19.173C19.9263 21 20.303 21 20.5748 20.7867C20.7848 20.6219 20.9524 20.2852 20.9573 20.0183C20.9636 19.6728 20.7705 19.4172 20.3842 18.906C18.5894 16.5306 15.7703 15 12.6002 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12.6002 12C15.0855 12 17.1002 9.98528 17.1002 7.5C17.1002 5.01472 15.0855 3 12.6002 3C10.1149 3 8.10019 5.01472 8.10019 7.5C8.10019 9.98528 10.1149 12 12.6002 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Профиль</span>
                </a>

                <a class="tab-item" data-tab="movies">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M2.80005 12H22.8M2.80005 7H7.80005M17.8 7H22.8M2.80005 17H7.80005M17.8 17H22.8M7.80005 22V2M17.8 22V2M7.60005 22H18C19.6802 22 20.5203 22 21.162 21.673C21.7265 21.3854 22.1854 20.9265 22.4731 20.362C22.8 19.7202 22.8 18.8802 22.8 17.2V6.8C22.8 5.11984 22.8 4.27976 22.4731 3.63803C22.1854 3.07354 21.7265 2.6146 21.162 2.32698C20.5203 2 19.6802 2 18 2H7.60005C5.91989 2 5.07981 2 4.43808 2.32698C3.87359 2.6146 3.41465 3.07354 3.12703 3.63803C2.80005 4.27976 2.80005 5.11984 2.80005 6.8V17.2C2.80005 18.8802 2.80005 19.7202 3.12703 20.362C3.41465 20.9265 3.87359 21.3854 4.43808 21.673C5.07981 22 5.91989 22 7.60005 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Фильмы</span>
                </a>
                <a class="tab-item" data-tab="tv">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M7.57181 21C8.90661 20.3598 10.41 20 12 20C13.59 20 15.0934 20.3598 16.4282 21M6.8 17H17.2C18.8802 17 19.7202 17 20.362 16.673C20.9265 16.3854 21.3854 15.9265 21.673 15.362C22 14.7202 22 13.8802 22 12.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V12.2C2 13.8802 2 14.7202 2.32698 15.362C2.6146 15.9265 3.07354 16.3854 3.63803 16.673C4.27976 17 5.11984 17 6.8 17Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Сериалы</span>
                </a>
<!--                <a class="tab-item" data-tab="activity">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M9.55439 21C10.2595 21.6224 11.1858 22 12.2002 22C13.2147 22 14.1409 21.6224 14.846 21M18.2002 8C18.2002 6.4087 17.5681 4.88258 16.4429 3.75736C15.3176 2.63214 13.7915 2 12.2002 2C10.6089 2 9.08279 2.63214 7.95757 3.75736C6.83236 4.88258 6.20021 6.4087 6.20021 8C6.20021 11.0902 5.42068 13.206 4.54988 14.6054C3.81534 15.7859 3.44807 16.3761 3.46154 16.5408C3.47645 16.7231 3.51507 16.7926 3.66199 16.9016C3.79467 17 4.3928 17 5.58907 17H18.8114C20.0076 17 20.6058 17 20.7384 16.9016C20.8854 16.7926 20.924 16.7231 20.9389 16.5408C20.9524 16.3761 20.5851 15.7859 19.8505 14.6054C18.9797 13.206 18.2002 11.0902 18.2002 8Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Активность</span>
                </a> -->
                <a class="tab-item" data-tab="search">
                    <svg class="tab-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M21.4001 21L17.057 16.6569M17.0501 16.65L17.057 16.6569M17.057 16.6569C18.5047 15.2091 19.4001 13.2091 19.4001 11C19.4001 6.58172 15.8184 3 11.4001 3C6.98187 3 3.40015 6.58172 3.40015 11C3.40015 15.4183 6.98187 19 11.4001 19C13.6093 19 15.6093 18.1046 17.057 16.6569Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="tab-label">Поиск</span>
                </a>
            </div>
        `;
    }

    setupEventListeners() {
        const tabs = this.shadowRoot.querySelectorAll('.tab-item');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = tab.dataset.tab;
                
                haptic.light();
                
                this.setActiveTab(tabName);
                
                this.dispatchEvent(new CustomEvent('tab-changed', {
                    detail: { tab: tabName },
                    bubbles: true,
                    composed: true
                }));
            });
        });
    }
}

customElements.define('tab-bar', TabBar); 