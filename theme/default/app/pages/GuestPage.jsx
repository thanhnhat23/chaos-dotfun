import React from 'react';

const GuestPage = ({ copy }) => {
    const labelClass = 'text-sm font-semibold text-slate-200 md:w-48';
    const inputClass =
        'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';

    return (
        <div className="row row-0 w-full !max-w-xl !bg-transparent !p-0 !shadow-none">
            <form
                name="guest-form"
                id="guest-form"
                className="guest-form w-full space-y-5 rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
                action="#"
                method="post"
            >
                <h3 className="form-title text-center text-2xl font-semibold text-white md:text-left">{copy.guest.title}</h3>
                <div className="input-box guest-username flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <label htmlFor="guest-username" className={labelClass}>
                        {copy.guest.usernameLabel}
                    </label>
                    <input type="text" name="guest-username" id="guest-username" className={inputClass} required />
                </div>
                <div className="input-box submit-container guest-submit flex items-center justify-center gap-3 md:justify-end">
                    <div className="loading-container hidden">
                        <img src="./assets/web/loading.gif" alt={copy.guest.loadingAlt} />
                    </div>
                    <input
                        type="submit"
                        value={copy.guest.submit}
                        className="rounded-full bg-sky-500 px-6 py-2 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                    />
                </div>
                <div className="input-box response-error text-sm text-rose-400"></div>
            </form>
        </div>
    );
};

export default GuestPage;
