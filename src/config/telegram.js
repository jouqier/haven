import { BOT_CONFIG } from './bot.js';
import { navigationManager } from './navigation.js';

export const TG = window.Telegram?.WebApp;

// Проверяем поддержку функций в текущей версии
const FEATURES_SUPPORTED = {
    haptic: TG?.version >= '6.1',
    backButton: TG?.version >= '6.1'
};

export const initTelegram = () => {
    if (!TG) {
        console.error('Telegram WebApp не доступен');
        return;
    }

    try {
        TG.ready();
        TG.expand();
        
        TG.enableClosingConfirmation();
        
        TG.onEvent('backButtonClicked', () => {
            if (!navigationManager.goBack()) {
                TG.close();
            }
        });
        
        TG.setHeaderColor('#000000');
        TG.setBackgroundColor('#000000');
        
        // Обрабатываем изменение навигации только если поддерживается BackButton
        if (FEATURES_SUPPORTED.backButton) {
            window.addEventListener('navigation-changed', () => {
                const hasHistory = navigationManager.getPreviousState() !== undefined;
                if (hasHistory) {
                    showBackButton();
                } else {
                    hideBackButton();
                }
            });
        }
        
        window.addEventListener('beforeunload', () => {
            TG.disableClosingConfirmation();
        });

        TG.onEvent('viewportChanged', () => {
            if (!TG.isExpanded) {
                TG.disableClosingConfirmation();
            }
        });

    } catch (error) {
        console.error('Ошибка инициализации Telegram:', error);
    }
};

export const showBackButton = () => {
    if (FEATURES_SUPPORTED.backButton && TG?.BackButton) {
        TG.BackButton.show();
    }
};

export const hideBackButton = () => {
    if (FEATURES_SUPPORTED.backButton && TG?.BackButton) {
        TG.BackButton.hide();
    }
};

export const haptic = {
    light: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
    },
    medium: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        }
    },
    heavy: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
        }
    },
    selection: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.selectionChanged();
        }
    },
    success: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        }
    },
    warning: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('warning');
        }
    },
    error: () => {
        if (FEATURES_SUPPORTED.haptic && window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
    }
}; 