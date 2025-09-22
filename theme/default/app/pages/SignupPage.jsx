import React from 'react';

const SignupPage = ({ copy }) => {
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-44';
    const inputClass =
        'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';

    return (
        <div className="row row-1 w-full !max-w-none !bg-transparent !p-0 !shadow-none">
            <form
                name="register-form"
                id="register-form"
                className="register-form mx-auto w-full max-w-3xl space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
                action="#"
                method="post"
            >
                <h3 className="form-title text-left text-2xl font-semibold text-white">{copy.register.title}</h3>
                <div className="input-box reg-email flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label htmlFor="reg-email" className={labelClass}>
                        {copy.register.emailLabel}
                    </label>
                    <input type="email" name="reg-email" id="reg-email" className={inputClass} required />
                </div>
                <div className="input-box reg-username flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label htmlFor="reg-username" className={labelClass}>
                        {copy.register.usernameLabel}
                    </label>
                    <input type="text" name="reg-username" id="reg-username" className={inputClass} required />
                </div>
                <div className="input-box reg-password flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label htmlFor="reg-password" className={labelClass}>
                        {copy.register.passwordLabel}
                    </label>
                    <input type="password" name="reg-password" id="reg-password" className={inputClass} required />
                </div>
                <div className="input-box reg-re-password flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label htmlFor="reg-re-password" className={labelClass}>
                        {copy.register.rePasswordLabel}
                    </label>
                    <input type="password" name="reg-re-password" id="reg-re-password" className={inputClass} required />
                </div>
                <div className="input-box hidden terms-and-conditions-link-container justify-end">
                    <p className="terms-and-conditions-link cursor-pointer text-sm text-slate-300 underline">
                        {copy.register.termsLink}
                    </p>
                </div>
                <div className="input-box submit-container reg-submit flex items-center justify-end gap-3">
                    <div className="loading-container hidden">
                        <img src="./assets/web/loading.gif" alt={copy.register.loadingAlt} />
                    </div>
                    <input
                        type="submit"
                        value={copy.register.submit}
                        className="rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                    />
                </div>
                <div className="input-box response-error text-sm text-rose-400"></div>
            </form>
        </div>
    );
};

export default SignupPage;
