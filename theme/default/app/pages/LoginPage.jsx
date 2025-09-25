import React from 'react';

const LoginPage = ({ copy }) => {
    const labelClass = 'auth-field__label';
    const inputClass = 'auth-field__input';

    return (
        <div className="auth-forms-flow">
            <form
                name="login-form"
                id="login-form"
                className="login-form auth-form"
                action="#"
                method="post"
            >
                <h3 className="auth-form__title">{copy.login.title}</h3>
                <div className="input-box login-username auth-field">
                    <label htmlFor="username" className={labelClass}>
                        {copy.login.usernameLabel}
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className={`${inputClass} required`}
                        required
                        autoComplete="on"
                    />
                </div>
                <div className="input-box login-password auth-field">
                    <label htmlFor="password" className={labelClass}>
                        {copy.login.passwordLabel}
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={`${inputClass} required`}
                        required
                    />
                </div>
                <div className="input-box submit-container login-submit auth-actions">
                    <div className="loading-container hidden">
                        <img className="auth-loading" src="./assets/web/loading.gif" alt={copy.login.loadingAlt} />
                    </div>
                    <input type="submit" value={copy.login.submit} className="auth-submit" />
                </div>
                <div className="input-box response-error auth-response-error"></div>
            </form>
            <div className="row row-2 firebase-row-container hidden auth-secondary-box">
                <form name="firebase-login" id="firebase-login" className="firebase-login auth-form" action="#" method="post">
                    <h3 className="auth-form__title">{copy.firebase.title}</h3>
                    <div className="input-box firebase-username auth-field">
                        <label htmlFor="firebase-username" className={labelClass}>
                            {copy.firebase.usernameLabel}
                        </label>
                        <input
                            type="text"
                            name="firebase-username"
                            id="firebase-username"
                            className={`${inputClass} required`}
                            required
                        />
                    </div>
                    <div className="input-box response-error auth-response-error"></div>
                </form>
                <div className="firebase-container">
                    <div id="firebaseui-auth-container" className="w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
