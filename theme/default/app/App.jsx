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
            className={`auth-page${isActive ? '' : ' is-inactive'}`}
            data-route={route}
            aria-hidden={!isActive}
            style={{ display: isActive ? 'block' : 'none' }}
        >
            {children}
        </section>
    );
};

const AuthNavigation = ({ links, activeRoute, onNavigate }) => (
    <div className="auth-nav">
        {links.map(({ route, label }) => {
            const isActive = activeRoute === route;
            const resolvedClasses = ['auth-nav__button'];
            if (isActive) {
                resolvedClasses.push('is-active');
            }
            return (
                <button
                    key={route}
                    type="button"
                    className={resolvedClasses.join(' ')}
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
        <div className="wrapper auth-wrapper">
            <div className="auth-layout">
                <div className="content auth-content">
                    <div className="forms-container auth-shell">
                        <div className="auth-disclaimer row-disclaimer">
                            {copy.disclaimer.map((line, index) => (
                                <Fragment key={line}>
                                    {line}
                                    {index < copy.disclaimer.length - 1 && <br />}
                                </Fragment>
                            ))}
                        </div>
                        <div className="auth-card">
                            <div className="auth-card__header">
                                <div>
                                    <h2 className="auth-card__title">{currentSectionLabel}</h2>
                                    <p className="auth-card__subtitle">Choose how you want to enter the adventure.</p>
                                </div>
                                <AuthNavigation links={navLinks} activeRoute={activeRoute} onNavigate={handleNavigate} />
                            </div>
                            <div className="auth-card__body">
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
                        <div id="terms-and-conditions" className="terms-layout hidden">
                            <div className="terms-content">
                                <h3 className="terms-heading">{copy.terms.heading}</h3>
                                <div className="terms-body mt-4 text-sm leading-relaxed text-slate-200"></div>
                            </div>
                            <div className="terms-consent">
                                <input type="checkbox" id="accept-terms-and-conditions" />
                                <label className="accept-terms-and-conditions-label" htmlFor="accept-terms-and-conditions">
                                    {copy.terms.acceptLabel}
                                </label>
                            </div>
                            <img
                                id="terms-and-conditions-close"
                                className="box-close"
                                src="./assets/controls/bx.png"
                                alt="close"
                            />
                        </div>
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
                        <div className="player-selection-shell">
                            <div className="player-selection-form-errors"></div>
                            <div className="player-selection-card">
                            <form
                                name="player-selector-form"
                                id="player-selector-form"
                                className="player-selector-form player-selection-form hidden"
                                action="#"
                                method="post"
                            >
                                <h3 className="form-title">
                                    <label htmlFor="player-select-element">{copy.playerSelection.selectLabel}</label>
                                </h3>
                                <div className="input-box player-select-box auth-field">
                                    <select
                                        className="select-element auth-field__select"
                                        id="player-select-element"
                                        name="player-select-element"
                                    ></select>
                                </div>
                                <div className="player-selection-additional-info"></div>
                                <div className="input-box submit-container player-select-submit auth-actions">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input type="submit" value={copy.playerSelection.selectSubmit} className="auth-submit" />
                                </div>
                            </form>
                            <form
                                name="player-create-form"
                                id="player-create-form"
                                className="player-create-form player-selection-form hidden"
                                action="#"
                                method="post"
                            >
                                <h3 className="form-title">
                                    {copy.playerSelection.createTitle}
                                </h3>
                                <div className="input-box player-create-name auth-field">
                                    <label htmlFor="new-player-name" className="auth-field__label">
                                        {copy.playerSelection.createNameLabel}
                                    </label>
                                    <input
                                        type="text"
                                        name="new-player-name"
                                        id="new-player-name"
                                        className="required auth-field__input"
                                        required
                                    />
                                </div>
                                <div className="player-creation-additional-info"></div>
                                <div className="input-box submit-container player-create-submit auth-actions">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input type="submit" value={copy.playerSelection.createSubmit} className="auth-submit" />
                                </div>
                                <div className="input-box response-error"></div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="game-container hidden">
                        <div id="reldens"></div>
                    </div>
                </div>
                <div className="footer">
                    <div className="copyright">
                        <a href="https://www.dwdeveloper.com/">
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
