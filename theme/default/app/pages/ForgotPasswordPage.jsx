import React from 'react';

const ForgotPasswordPage = ({ copy }) => {
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-44';
    const inputClass = 'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';

    return (
        <div className="row row-2 forgot-password-container w-full !max-w-xl !bg-transparent !p-0 !shadow-none">
            <form
                name="forgot-form"
                id="forgot-form"
                className="forgot-form w-full space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
                action="#"
                method="post"
            >
                <h3 className="form-title text-center text-2xl font-semibold text-white md:text-left">{copy.forgot.title}</h3>
                <div className="input-box forgot-email flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label htmlFor="forgot-email" className={labelClass}>
                        {copy.forgot.emailLabel}
                    </label>
                    <input type="email" name="forgot-email" id="forgot-email" className={inputClass} required />
                </div>
                <div className="input-box submit-container forgot-submit flex items-center justify-end gap-3">
                    <div className="loading-container hidden">
                        <img src="./assets/web/loading.gif" alt={copy.forgot.loadingAlt} />
                    </div>
                    <input
                        type="submit"
                        value={copy.forgot.submit}
                        className="rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                    />
                </div>
                <div className="input-box response-error text-sm text-rose-400"></div>
            </form>
        </div>
    );
};

export default ForgotPasswordPage;
