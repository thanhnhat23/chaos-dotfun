import React from 'react';

const ForgotPasswordPage = ({ copy }) => {
    const labelClass = 'auth-field__label';
    const inputClass = 'auth-field__input';

    return (
        <div className="auth-forms-flow">
            <form
                name="forgot-form"
                id="forgot-form"
                className="forgot-form auth-form"
                action="#"
                method="post"
            >
                <h3 className="auth-form__title">{copy.forgot.title}</h3>
                <div className="input-box forgot-email auth-field">
                    <label htmlFor="forgot-email" className={labelClass}>
                        {copy.forgot.emailLabel}
                    </label>
                    <input type="email" name="forgot-email" id="forgot-email" className={`${inputClass} required`} required />
                </div>
                <div className="input-box submit-container forgot-submit auth-actions">
                    <div className="loading-container hidden">
                        <img className="auth-loading" src="./assets/web/loading.gif" alt={copy.forgot.loadingAlt} />
                    </div>
                    <input type="submit" value={copy.forgot.submit} className="auth-submit" />
                </div>
                <div className="input-box response-error auth-response-error"></div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
