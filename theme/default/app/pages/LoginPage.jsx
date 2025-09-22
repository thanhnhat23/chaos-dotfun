import React from 'react';

const LoginPage = ({ copy }) => {
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-40';
    const inputClass =
        'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';

    return (
        <div className="row row-1 w-full !max-w-none !bg-transparent !p-0 !shadow-none">
            <div className="grid w-full gap-6 lg:grid-cols-[1.05fr,_0.95fr]">
                <form
                    name="login-form"
                    id="login-form"
                    className="login-form space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
                    action="#"
                    method="post"
                >
                    <h3 className="form-title text-left text-2xl font-semibold text-white">{copy.login.title}</h3>
                    <div className="input-box login-username flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <label htmlFor="username" className={labelClass}>
                            {copy.login.usernameLabel}
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className={inputClass}
                            required
                            autoComplete="on"
                        />
                    </div>
                    <div className="input-box login-password flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <label htmlFor="password" className={labelClass}>
                            {copy.login.passwordLabel}
                        </label>
                        <input type="password" name="password" id="password" className={inputClass} required />
                    </div>
                    <div className="input-box submit-container login-submit flex items-center justify-end gap-3">
                        <div className="loading-container hidden">
                            <img src="./assets/web/loading.gif" alt={copy.login.loadingAlt} />
                        </div>
                        <input
                            type="submit"
                            value={copy.login.submit}
                            className="rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                        />
                    </div>
                    <div className="input-box response-error text-sm text-rose-400"></div>
                </form>
                <div className="row row-2 firebase-row-container hidden !max-w-none !bg-slate-900/60 !p-6 !shadow-xl space-y-4 rounded-2xl border border-white/10 backdrop-blur">
                    <form name="firebase-login" id="firebase-login" className="firebase-login space-y-4" action="#" method="post">
                        <h3 className="form-title text-xl font-semibold text-white">{copy.firebase.title}</h3>
                        <div className="input-box firebase-username flex flex-col gap-2 text-sm text-slate-200">
                            <label htmlFor="firebase-username" className="font-semibold">
                                {copy.firebase.usernameLabel}
                            </label>
                            <input
                                type="text"
                                name="firebase-username"
                                id="firebase-username"
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="input-box response-error text-sm text-rose-400"></div>
                    </form>
                    <div className="firebase-container flex flex-1 items-center justify-center rounded-xl border border-dashed border-white/20 bg-slate-900/30 p-4">
                        <div id="firebaseui-auth-container" className="w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
