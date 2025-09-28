import React, { useCallback } from 'react';

const GuestPage = ({ copy }) => {
    const labelClass = 'auth-field__label';
    const inputClass = 'auth-field__input';

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        const chaos = window.chaos || window.reldens;
        if (!chaos || !chaos.config) {
            console.warn('[Chaos] Guest submission ignored. Game manager not ready.');
            return;
        }
        const allowCustomName = chaos.config.get?.('client/general/users/allowGuestUserName', false);
        const inputEl = event.currentTarget.querySelector('#guest-username');
        const randomName = `guest-${Math.random().toString(36).slice(2, 14)}`;
        const username = allowCustomName && inputEl ? inputEl.value.trim() || randomName : randomName;
        if (allowCustomName && inputEl) {
            inputEl.value = username;
        }
        try {
            chaos.startGame(
                {
                    formId: 'guest-form',
                    username,
                    password: username,
                    rePassword: username,
                    isGuest: true
                },
                true
            );
        } catch (error) {
            console.error('[Chaos] Failed to start guest session.', error);
        }
    }, []);

    return (
        <div className="auth-forms-flow">
            <form
                name="guest-form"
                id="guest-form"
                className="guest-form auth-form"
                action="#"
                method="post"
                onSubmit={handleSubmit}
            >
                <h3 className="auth-form__title">{copy.guest.title}</h3>
                <div className="input-box guest-username auth-field">
                    <label htmlFor="guest-username" className={labelClass}>
                        {copy.guest.usernameLabel}
                    </label>
                    <input
                        type="text"
                        name="guest-username"
                        id="guest-username"
                        className={`${inputClass} required`}
                        required
                    />
                </div>
                <div className="input-box submit-container guest-submit auth-actions auth-actions--center">
                    <div className="loading-container hidden">
                        <img className="auth-loading" src="./assets/web/loading.gif" alt={copy.guest.loadingAlt} />
                    </div>
                    <input type="submit" value={copy.guest.submit} className="auth-submit" />
                </div>
                <div className="input-box response-error auth-response-error"></div>
            </form>
        </div>
    );
};

export default GuestPage;
