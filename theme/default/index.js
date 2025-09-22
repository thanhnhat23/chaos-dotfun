/**
 *
 * Reldens - React Bootstrap
 *
 */

import { createRoot } from 'react-dom/client';
import App from './app/App.jsx';
import { GameManager } from '../../lib/game/client/game-manager';
import { ClientPlugin } from '../plugins/client-plugin';
const urlParams = new URLSearchParams(window.location.search);
window.RELDENS_LOG_LEVEL = urlParams.get('logLevel') || 7;
window.RELDENS_ENABLE_TRACE_FOR = Number(urlParams.get('traceFor') || 'emergency,alert,critical');

const reldens = new GameManager();
reldens.setupCustomClientPlugin('customPluginKey', ClientPlugin);

// client event listener example with version display:
reldens.events.on('reldens.afterInitEngineAndStartGame', () => {
    const verEl = reldens.gameDom.getElement('#current-version');
    if (verEl) {
        verEl.innerHTML = reldens.config.client.gameEngine.version + ' -';
    }
});

// demo message removal:
reldens.events.on('reldens.startGameAfter', () => {
    reldens.gameDom.getElement('.row-disclaimer')?.remove();
});

reldens.events.on('reldens.activateRoom', (room) => {
    room.onMessage('*', (message) => {
        if ('rski.Bc' !== message.act) {
            return;
        }
        let skillKey = (message.data?.skillKey || '').toString();
        let skillDelay = Number(message.data?.extraData?.sd || 0);
        if ('' !== skillKey && 0 < skillDelay) {
            let skillElement = reldens.gameDom.getElement('.skill-icon-' + skillKey);
            if (!skillElement) {
                return;
            }
            let startTime = Date.now();
            let endTime = startTime + skillDelay;
            function updateCooldown() {
                let currentTime = Date.now();
                let remainingTime = endTime - currentTime;
                if (0 >= remainingTime) {
                    skillElement.style.setProperty('--angle', '360deg');
                    skillElement.classList.remove('cooldown');
                    return;
                }
                let progress = (skillDelay - remainingTime) / skillDelay;
                let angle = progress * 360;
                skillElement.style.setProperty('--angle', `${angle}deg`);
                requestAnimationFrame(updateCooldown);
            }
            skillElement.classList.add('cooldown');
            skillElement.style.setProperty('--angle', '0deg');
            updateCooldown();
        }
    });
});

window.reldens = reldens;

function bootstrap() {
    const container = document.getElementById('root');
    if (!container) {
        console.error('Missing #root element for React mount.');
        return;
    }
    const root = createRoot(container);
    root.render(<App reldens={reldens} />);
}

document.addEventListener('DOMContentLoaded', bootstrap);

