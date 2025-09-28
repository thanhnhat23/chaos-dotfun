/**
 *
 * Chaos - React Bootstrap
 *
 */

import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import { GameManager } from '../../lib/game/client/game-manager';
import { ClientPlugin } from '../plugins/client-plugin';

const urlParams = new URLSearchParams(window.location.search);
window.CHAOS_LOG_LEVEL = urlParams.get('logLevel') || 7;
window.CHAOS_ENABLE_TRACE_FOR = Number(urlParams.get('traceFor') || 'emergency,alert,critical');

const chaosManager = new GameManager();
chaosManager.setupCustomClientPlugin('customPluginKey', ClientPlugin);

chaosManager.events.on('reldens.afterInitEngineAndStartGame', () => {
    const verEl = chaosManager.gameDom.getElement('#current-version');
    if (verEl) {
        verEl.innerHTML = chaosManager.config.client.gameEngine.version + ' -';
    }
});

chaosManager.events.on('reldens.startGameAfter', () => {
    chaosManager.gameDom.getElement('.row-disclaimer')?.remove();
});

chaosManager.events.on('reldens.activateRoom', (room) => {
    room.onMessage('*', (message) => {
        if ('rski.Bc' !== message.act) {
            return;
        }
        const skillKey = (message.data?.skillKey || '').toString();
        const skillDelay = Number(message.data?.extraData?.sd || 0);
        if (skillKey !== '' && skillDelay > 0) {
            const skillElement = chaosManager.gameDom.getElement('.skill-icon-' + skillKey);
            if (!skillElement) {
                return;
            }
            const endTime = Date.now() + skillDelay;
            const updateCooldown = () => {
                const remainingTime = endTime - Date.now();
                if (remainingTime <= 0) {
                    skillElement.style.setProperty('--angle', '360deg');
                    skillElement.classList.remove('cooldown');
                    return;
                }
                const progress = (skillDelay - remainingTime) / skillDelay;
                const angle = progress * 360;
                skillElement.style.setProperty('--angle', `${angle}deg`);
                requestAnimationFrame(updateCooldown);
            };
            skillElement.classList.add('cooldown');
            skillElement.style.setProperty('--angle', '0deg');
            updateCooldown();
        }
    });
});

window.chaos = chaosManager;
window.reldens = chaosManager; // backward compatibility for existing modules

function bootstrap() {
    const container = document.getElementById('root');
    if (!container) {
        console.error('Missing #root element for React mount.');
        return;
    }
    const root = createRoot(container);
    root.render(<App reldens={chaosManager} />);
}

document.addEventListener('DOMContentLoaded', bootstrap);
