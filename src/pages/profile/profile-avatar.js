import { TG } from '../../config/telegram.js';

export class ProfileAvatar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._userData = null;
        this._createElements();
        
        // Добавляем слушатель для обновления данных пользователя
        document.addEventListener('tg-user-data-updated', () => {
            const newUserData = TG?.initDataUnsafe?.user;
            if (newUserData && this._userData) {
                // Проверяем, изменилась ли аватарка
                if (newUserData.photo_url !== this._userData.photo_url) {
                    this._userData = newUserData;
                    this._updateContent();
                }
            }
        });
    }

    _createElements() {
        this.shadowRoot.innerHTML = `
            <style>
                .action-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                    border-radius: 40px;
                    position: relative;
                    overflow: hidden;
                }
                
                .action-container::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--avatar-background, var(--md-sys-color-surface-container));
                    background-position: center;
                    border-radius: 42px;
                }
                
                .action-container::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.60) 80%);
                    backdrop-filter: blur(20px);
                }
                
                .avatar-container {
                    display: flex;
                    padding: 32px 16px 32px 16px;
                    flex-direction: column;
                    align-items: center;
                    align-self: stretch;
                    z-index: 1;
                    gap: 16px;
                }
                
                .avatar {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 4px solid var(--md-sys-color-primary-container);
                }
                
                .avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .avatar-placeholder {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
                    color: white;
                    font-size: 48px;
                    font-weight: 600;
                }

                .profile-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: white;
                }

                .user-name {
                    font-size: 22px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                }

                .user-handle {
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                    color: var(--md-sys-color-outline);
                    margin-bottom: 8px;                    
                }

                .join-date {
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 16px;
                    color: var(--md-sys-color-outline);
                }
            </style>
            
            <div class="action-container">
                <div class="avatar-container">
                    <div class="avatar">
                        <img>
                    </div>
                    <div class="profile-info">
                        <div class="user-name"></div>
                        <div class="user-handle"></div>
                        <div class="join-date"></div>
                    </div>
                </div>
            </div>
        `;

        this._avatarImg = this.shadowRoot.querySelector('.avatar img');
        this._actionContainer = this.shadowRoot.querySelector('.action-container');
        this._userName = this.shadowRoot.querySelector('.user-name');
        this._userHandle = this.shadowRoot.querySelector('.user-handle');
        this._joinDate = this.shadowRoot.querySelector('.join-date');
    }

    set userData(value) {
        this._userData = value;
        this._updateContent(); // Всегда обновляем контент
    }

    _updateContent() {
        if (!this._userData) {
            this._userName.textContent = 'Guest User';
            this._userHandle.textContent = '@guest';
            this._joinDate.textContent = 'Member since 2024';
            
            const avatar = this._avatarImg.parentElement;
            avatar.innerHTML = `<div class="avatar-placeholder">G</div>`;
            this._actionContainer.style.setProperty(
                '--avatar-background',
                'linear-gradient(135deg, #FF6B6B, #4ECDC4)'
            );
            return;
        }

        const { first_name, last_name, username, photo_url } = this._userData;
        const fullName = [first_name, last_name].filter(Boolean).join(' ') || 'User';
        const joinDate = new Date().toLocaleDateString('en-US', { 
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });

        if (photo_url) {
            this._avatarImg.src = photo_url;
            this._avatarImg.alt = fullName;
            this._actionContainer.style.setProperty(
                '--avatar-background',
                `url(${photo_url}) lightgray 50% / cover no-repeat`
            );
        } else {
            const avatar = this._avatarImg.parentElement;
            avatar.innerHTML = `<div class="avatar-placeholder">${fullName[0]}</div>`;
        }

        this._userName.textContent = fullName;
        this._userHandle.textContent = `@${username || 'username'}`;
        this._joinDate.textContent = `Member since ${joinDate}`;
    }
}

customElements.define('profile-avatar', ProfileAvatar);