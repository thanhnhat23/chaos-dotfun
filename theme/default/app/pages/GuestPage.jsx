import React from 'react';

const GuestPage = ({ copy }) => {
    const labelClass = 'auth-field__label';
    const inputClass = 'auth-field__input';

    return (
        <div className="auth-forms-flow">
            <form
                name="guest-form"
                id="guest-form"
                className="guest-form auth-form"
                action="#"
                method="post"
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
