import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations.js';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import GuestPage from './pages/GuestPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';

const AUTH_ROUTES = ['/login', '/signup', '/guest', '/forgot'];

const AuthPage = ({ route, currentRoute, children }) => {
    const isActive = currentRoute === route;
    return (
        <section
            className={["auth-page w-full transition-opacity duration-300", isActive ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-95'].join(' ')}
            data-route={route}
            aria-hidden={!isActive}
            hidden={!isActive}
            style={{ display: isActive ? undefined : 'none' }}
        >
            {children}
        </section>
    );
};

const AuthNavigation = ({ links, activeRoute, onNavigate }) => (
    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
        {links.map(({ route, label }) => {
            const isActive = activeRoute === route;
            const base = 'inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70';
            const resolvedClasses = isActive
                ? `${base} border-sky-400 bg-sky-500/80 text-white shadow-lg shadow-sky-500/30`
                : `${base} border-white/15 bg-white/10 text-slate-200 hover:border-sky-400 hover:bg-sky-500/30 hover:text-white`;
            return (
                <button
                    key={route}
                    type="button"
                    className={resolvedClasses}
                    onClick={() => onNavigate(route)}
                >
                    {label}
                </button>
            );
        })}
    </div>
);

const Shell = ({ copy }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState('/login');

    const handleNavigate = useCallback((route) => {
        const resolvedRoute = AUTH_ROUTES.includes(route) ? route : '/login';
        navigate(resolvedRoute);
        setActiveRoute(resolvedRoute);
    }, [navigate]);
    useEffect(() => {
        const rawPath = (location.pathname || '').toLowerCase();
        const trimmedPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, '') : rawPath;
        const nextRoute = AUTH_ROUTES.includes(trimmedPath) ? trimmedPath : '/login';
        if (trimmedPath !== nextRoute) {
            navigate(nextRoute, { replace: true });
            return;
        }
        setActiveRoute((previous) => (previous === nextRoute ? previous : nextRoute));
    }, [location.pathname, navigate]);
    const navLinks = copy.nav || translations.en.nav;
    const currentSectionLabel = navLinks.find((link) => link.route === activeRoute)?.label || navLinks[0]?.label || 'Login';

    return (
        <div className="wrapper relative min-h-screen overflow-hidden text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 opacity-95"></div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_60%)]"></div>
            <div className="relative z-10 flex min-h-screen flex-col">
                <div className="content flex-1 px-4 pb-16">
                    <div className="row row-disclaimer mx-auto mt-10 w-full max-w-4xl !max-w-4xl !bg-white/10 !p-6 !shadow-2xl border border-white/10 text-center text-sm leading-relaxed text-slate-200 backdrop-blur-xl">
                        {copy.disclaimer.map((line, index) => (
                            <Fragment key={line}>
                                {line}
                                {index < copy.disclaimer.length - 1 && <br />}
                            </Fragment>
                        ))}
                    </div>
                    <div className="mt-10 flex w-full justify-center px-2">
                        <div className="forms-container flex w-full max-w-5xl flex-col items-center gap-8">
                            <div className="w-full rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl md:p-10">
                                <div className="flex flex-col gap-6 border-b border-white/10 pb-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
                                    <div>
                                        <h2 className="mt-2 text-3xl font-semibold text-white">{currentSectionLabel}</h2>
                                        <p className="mt-1 text-sm text-slate-300">
                                            Choose how you want to enter the adventure.
                                        </p>
                                    </div>
                                    <AuthNavigation links={navLinks} activeRoute={activeRoute} onNavigate={handleNavigate} />
                                </div>
                                <div className="relative mt-8 space-y-2">
                                    <AuthPage route="/login" currentRoute={activeRoute}>
                                        <LoginPage copy={copy} />
                                    </AuthPage>
                                    <AuthPage route="/signup" currentRoute={activeRoute}>
                                        <SignupPage copy={copy} />
                                    </AuthPage>
                                    <AuthPage route="/guest" currentRoute={activeRoute}>
                                        <GuestPage copy={copy} />
                                    </AuthPage>
                                    <AuthPage route="/forgot" currentRoute={activeRoute}>
                                        <ForgotPasswordPage copy={copy} />
                                    </AuthPage>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="terms-and-conditions" className="hidden">
                        <div className="terms-and-conditions-text rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                            <h3 className="terms-heading text-2xl font-semibold text-white">{copy.terms.heading}</h3>
                            <div className="terms-body mt-4 text-sm leading-relaxed text-slate-200"></div>
                        </div>
                        <div className="terms-box mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-200 backdrop-blur">
                            <input type="checkbox" id="accept-terms-and-conditions" />
                            <label className="accept-terms-and-conditions-label cursor-pointer" htmlFor="accept-terms-and-conditions">
                                {copy.terms.acceptLabel}
                            </label>
                        </div>
                        <img
                            id="terms-and-conditions-close"
                            className="box-close mt-4 h-6 w-6 cursor-pointer"
                            src="./assets/controls/bx.png"
                            alt="close"
                        />
                    </div>
                    <div id="instructions" className="hidden">
                        <div className="instructions-content rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                            <h3 className="text-2xl font-semibold text-white">{copy.instructions.heading}</h3>
                            <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-slate-200">
                                {copy.instructions.steps.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ul>
                            <img
                                id="instructions-close"
                                className="box-close mt-6 h-6 w-6 cursor-pointer"
                                src="./assets/controls/bx.png"
                                alt="close"
                            />
                        </div>
                    </div>
                    <div id="game-over" className="hidden">
                        <div className="game-over-content rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center text-lg font-semibold text-slate-100 shadow-2xl backdrop-blur-xl">
                            <h3>
                                {copy.gameOver.map((line, index) => (
                                    <Fragment key={line}>
                                        {line}
                                        {index < copy.gameOver.length - 1 && (
                                            <Fragment>
                                                <br />
                                                <br />
                                            </Fragment>
                                        )}
                                    </Fragment>
                                ))}
                            </h3>
                        </div>
                    </div>
                    <div id="player-selection" className="hidden">
                        <div className="selection-forms-container rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
                            <div className="player-selection-form-errors"></div>
                            <form
                                name="player-selector-form"
                                id="player-selector-form"
                                className="player-selector-form hidden"
                                action="#"
                                method="post"
                            >
                                <h3 className="form-title text-center text-lg font-semibold text-white">
                                    <label htmlFor="player-select-element">{copy.playerSelection.selectLabel}</label>
                                </h3>
                                <div className="input-box player-select-box mt-4">
                                    <select
                                        className="input-box select-element w-full rounded-xl border border-white/15 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                                        id="player-select-element"
                                        name="player-select-element"
                                    ></select>
                                </div>
                                <div className="player-selection-additional-info mt-3 text-sm text-slate-300"></div>
                                <div className="input-box submit-container player-select-submit mt-4 flex items-center justify-end gap-3">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input type="submit" value={copy.playerSelection.selectSubmit} />
                                </div>
                            </form>
                            <form
                                name="player-create-form"
                                id="player-create-form"
                                className="player-create-form hidden"
                                action="#"
                                method="post"
                            >
                                <h3 className="form-title text-center text-lg font-semibold text-white">
                                    {copy.playerSelection.createTitle}
                                </h3>
                                <div className="input-box player-create-name mt-4">
                                    <label htmlFor="new-player-name">{copy.playerSelection.createNameLabel}</label>
                                    <input type="text" name="new-player-name" id="new-player-name" className="required" required />
                                </div>
                                <div className="player-creation-additional-info mt-3 text-sm text-slate-300"></div>
                                <div className="input-box submit-container player-create-submit mt-4 flex items-center justify-end gap-3">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input type="submit" value={copy.playerSelection.createSubmit} />
                                </div>
                                <div className="input-box response-error"></div>
                            </form>
                        </div>
                    </div>
                    <div className="game-container hidden">
                        <div id="reldens"></div>
                    </div>
                </div>
                <div className="footer mt-auto bg-slate-950/80 py-6 text-center text-sm text-slate-300 backdrop-blur">
                    <div className="copyright">
                        <a className="hover:text-white hover:underline" href="https://www.dwdeveloper.com/">
                            by D<span className="text-black text-lowercase">w</span>
                            <span className="text-capitalize">Developer</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = ({ reldens }) => {
    const lang = (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
    const locale = translations[lang] ? lang : 'en';
    const copy = translations[locale];

    useEffect(() => {
        if (reldens && typeof reldens.clientStart === 'function') {
            reldens.clientStart();
        }
    }, [reldens]);

    return (
        <BrowserRouter>
            <Shell copy={copy} />
        </BrowserRouter>
    );
};

export default App;
