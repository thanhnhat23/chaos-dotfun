import React from 'react';

const SignupPage = ({ copy }) => {
    const labelClass = 'auth-field__label';
    const inputClass = 'auth-field__input';

    return (
        <div className="auth-forms-flow">
            <form
                name="register-form"
                id="register-form"
                className="register-form auth-form"
                action="#"
                method="post"
            >
                <h3 className="auth-form__title">{copy.register.title}</h3>
                <div className="input-box reg-email auth-field">
                    <label htmlFor="reg-email" className={labelClass}>
                        {copy.register.emailLabel}
                    </label>
                    <input type="email" name="reg-email" id="reg-email" className={`${inputClass} required`} required />
                </div>
                <div className="input-box reg-username auth-field">
                    <label htmlFor="reg-username" className={labelClass}>
                        {copy.register.usernameLabel}
                    </label>
                    <input type="text" name="reg-username" id="reg-username" className={`${inputClass} required`} required />
                </div>
                <div className="input-box reg-password auth-field">
                    <label htmlFor="reg-password" className={labelClass}>
                        {copy.register.passwordLabel}
                    </label>
                    <input type="password" name="reg-password" id="reg-password" className={`${inputClass} required`} required />
                </div>
                <div className="input-box reg-re-password auth-field">
                    <label htmlFor="reg-re-password" className={labelClass}>
                        {copy.register.rePasswordLabel}
                    </label>
                    <input type="password" name="reg-re-password" id="reg-re-password" className={`${inputClass} required`} required />
                </div>
                <div className="input-box hidden terms-and-conditions-link-container auth-field">
                    <p className="terms-and-conditions-link">
                        {copy.register.termsLink}
                    </p>
                </div>
                <div className="input-box submit-container reg-submit auth-actions">
                    <div className="loading-container hidden">
                        <img className="auth-loading" src="./assets/web/loading.gif" alt={copy.register.loadingAlt} />
                    </div>
                    <input type="submit" value={copy.register.submit} className="auth-submit" />
                </div>
                <div className="input-box response-error auth-response-error"></div>
            </form>
        </div>
    );
};

export default SignupPage;
