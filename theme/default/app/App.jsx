import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { translations } from './translations.js';
import LoginPage from './pages/LoginPage.jsx';
import GuestPage from './pages/GuestPage.jsx';
import RoleSelectionPage from './pages/RoleSelectionPage.jsx';
import ViewerPage from './pages/ViewerPage.jsx';

const NAV_ROUTES = ['/', '/streamer', '/viewer', '/guest'];

<<<<<<< HEAD
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
=======
const Navigation = ({ links, currentPath }) => (
    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
        {links.map(({ route, label }) => {
            const isActive = currentPath === route;
            const base = 'inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70';
            const resolvedClasses = isActive
                ? `${base} border-sky-400 bg-sky-500/80 text-white shadow-lg shadow-sky-500/30`
                : `${base} border-white/15 bg-white/10 text-slate-200 hover:border-sky-400 hover:bg-sky-500/30 hover:text-white`;
            return (
                <Link key={route} to={route} className={resolvedClasses}>
>>>>>>> 8ec9633b (update UI and more)
                    {label}
                </Link>
            );
        })}
    </div>
);

const CanvasLayout = ({ copy }) => {
    const location = useLocation();
    const navLinks = Array.isArray(copy.nav) && copy.nav.length > 0 ? copy.nav : translations.en.nav;
    const currentPath = NAV_ROUTES.includes(location.pathname) ? location.pathname : '/';
    const showNav = currentPath !== '/';
    const currentSectionLabel =
        navLinks.find((link) => link.route === currentPath)?.label ||
        (currentPath === '/' ? copy.roles?.title : '') ||
        navLinks[0]?.label ||
        'Chaos';
    const sectionDescriptions = {
        '/': copy.roles?.subtitle,
        '/streamer': copy.streamer?.intro,
        '/viewer': copy.viewer?.subtitle,
        '/guest': copy.guest?.title
    };
    const heroDescription = sectionDescriptions[currentPath] || copy.heroDescription || 'Choose how you want to enter the world of Chaos.';

    return (
<<<<<<< HEAD
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
=======
        <div className="wrapper relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 opacity-95"></div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_60%)]"></div>
            <div className="relative z-10 flex min-h-screen flex-col">
                <div className="content flex-1 px-4 pb-16">
                    <div className="row row-disclaimer mx-auto mt-10 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm leading-relaxed text-slate-200 shadow-2xl backdrop-blur-xl">
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
                                        {heroDescription && <p className="mt-1 text-sm text-slate-300">{heroDescription}</p>}
                                    </div>
                                    {showNav && <Navigation links={navLinks} currentPath={currentPath} />}
                                </div>
                                <div className="relative mt-8 space-y-2">
                                    <Outlet />
>>>>>>> 8ec9633b (update UI and more)
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
<<<<<<< HEAD
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
=======
                    </div>
                    <div id="player-selection" className="hidden">
                        <div className="selection-forms-container flex flex-col gap-6 rounded-3xl border border-white/10 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
                            <div className="player-selection-form-errors text-sm text-rose-400"></div>
                            <form
                                name="player-selector-form"
                                id="player-selector-form"
                                className="player-selector-form hidden space-y-5 rounded-2xl border border-white/15 bg-slate-950/60 p-6 shadow-xl"
                                action="#"
                                method="post"
                            >
                                <h3 className="form-title text-lg font-semibold text-white">
>>>>>>> 8ec9633b (update UI and more)
                                    <label htmlFor="player-select-element">{copy.playerSelection.selectLabel}</label>
                                </h3>
                                <div className="input-box player-select-box auth-field">
                                    <select
<<<<<<< HEAD
                                        className="select-element auth-field__select"
=======
                                        className="input-box select-element w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
>>>>>>> 8ec9633b (update UI and more)
                                        id="player-select-element"
                                        name="player-select-element"
                                    ></select>
                                </div>
<<<<<<< HEAD
                                <div className="player-selection-additional-info"></div>
                                <div className="input-box submit-container player-select-submit auth-actions">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input type="submit" value={copy.playerSelection.selectSubmit} className="auth-submit" />
=======
                                <div className="player-selection-additional-info text-sm text-slate-300"></div>
                                <div className="input-box submit-container player-select-submit mt-4 flex items-center justify-end gap-3">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input
                                        type="submit"
                                        value={copy.playerSelection.selectSubmit}
                                        className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                                    />
>>>>>>> 8ec9633b (update UI and more)
                                </div>
                            </form>
                            <form
                                name="player-create-form"
                                id="player-create-form"
<<<<<<< HEAD
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
=======
                                className="player-create-form hidden space-y-5 rounded-2xl border border-white/15 bg-slate-950/60 p-6 shadow-xl"
                                action="#"
                                method="post"
                            >
                                <h3 className="form-title text-lg font-semibold text-white">{copy.playerSelection.createTitle}</h3>
                                <div className="input-box player-create-name mt-4">
                                    <label htmlFor="new-player-name" className="text-sm font-semibold text-slate-200">{copy.playerSelection.createNameLabel}</label>
                                    <input type="text" name="new-player-name" id="new-player-name" className="required w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40" required />
                                </div>
                                <div className="player-creation-additional-info text-sm text-slate-300"></div>
                                <div className="input-box submit-container player-create-submit mt-4 flex items-center justify-end gap-3">
                                    <div className="loading-container hidden">
                                        <img src="./assets/web/loading.gif" alt={copy.playerSelection.loadingAlt} />
                                    </div>
                                    <input
                                        type="submit"
                                        value={copy.playerSelection.createSubmit}
                                        className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                                    />
>>>>>>> 8ec9633b (update UI and more)
                                </div>
                                <div className="input-box response-error text-sm text-rose-400"></div>
                            </form>
                            </div>
                        </div>
                    </div>
                    <div className="game-container hidden">
                        <div id="reldens"></div>
                    </div>
                </div>
<<<<<<< HEAD
                <div className="footer">
                    <div className="copyright">
                        <a href="https://www.dwdeveloper.com/">
                            by D<span className="text-black text-lowercase">w</span>
                            <span className="text-capitalize">Developer</span>
                        </a>
                    </div>
=======
                <div className="footer mt-auto bg-slate-950/80 py-6 text-center text-sm text-slate-300 backdrop-blur">
                    <div className="uppercase tracking-widest text-slate-500">Chaos Platform</div>
>>>>>>> 8ec9633b (update UI and more)
                </div>
            </div>
        </div>
    );
};

const RoleSelectionRoute = ({ copy }) => {
    const navigate = useNavigate();
    return <RoleSelectionPage copy={copy} onSelect={(route) => navigate(route)} />;
};

const StreamerRoute = ({ copy }) => (
    <LoginPage copy={copy} streamerCopy={copy.streamer} registerCopy={copy.register} forgotCopy={copy.forgot} />
);

const ViewerRoute = ({ copy }) => <ViewerPage copy={copy} />;
const GuestRoute = ({ copy }) => <GuestPage copy={copy} />;

const AppRoutes = ({ copy }) => (
    <Routes>
        <Route element={<CanvasLayout copy={copy} />}>
            <Route index element={<RoleSelectionRoute copy={copy} />} />
            <Route path="streamer" element={<StreamerRoute copy={copy} />} />
            <Route path="viewer" element={<ViewerRoute copy={copy} />} />
            <Route path="guest" element={<GuestRoute copy={copy} />} />
            <Route path="signup" element={<Navigate to="/streamer" replace />} />
            <Route path="forgot" element={<Navigate to="/streamer" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
);

const App = ({ reldens }) => {
    const lang = (typeof document !== 'undefined' && document.documentElement.lang) || 'en';
    const locale = translations[lang] ? lang : 'en';
    const copy = translations[locale];

    useEffect(() => {
        if (reldens && typeof reldens.clientStart === 'function') {
            reldens.clientStart();
        }
    }, [reldens]);

    useEffect(() => {
        const playerSelection = document.getElementById('player-selection');
        if (!playerSelection) {
            return undefined;
        }
        const styleNodes = () => {
            playerSelection.querySelectorAll('.selection-forms-container').forEach((container) => {
                container.classList.add('flex', 'flex-col', 'gap-6', 'rounded-3xl', 'border', 'border-white/10', 'bg-slate-900/90', 'p-6', 'shadow-2xl', 'backdrop-blur-xl');
            });
            playerSelection.querySelectorAll('.player-selector-form').forEach((form) => {
                form.classList.add('space-y-5');
            });
            playerSelection.querySelectorAll('.player-create-form').forEach((form) => {
                form.classList.add('space-y-5');
            });
            playerSelection.querySelectorAll('.player-select-box').forEach((box) => {
                box.classList.add('space-y-2');
            });
            playerSelection.querySelectorAll('.player-selection-additional-info').forEach((info) => {
                info.classList.add('flex', 'flex-col', 'gap-4');
            });
            playerSelection.querySelectorAll('.player-selection-additional-info .input-box').forEach((box) => {
                box.classList.add('flex', 'flex-col', 'gap-2', 'md:flex-row', 'md:items-center', 'md:justify-between');
            });
            playerSelection.querySelectorAll('.player-selection-additional-info label').forEach((label) => {
                label.classList.add('text-sm', 'font-semibold', 'text-slate-200');
            });
            playerSelection.querySelectorAll('.player-selection-additional-info select').forEach((select) => {
                select.classList.add('w-full', 'max-w-xs', 'rounded-xl', 'border', 'border-white/15', 'bg-slate-900/80', 'px-4', 'py-3', 'text-sm', 'text-slate-100', 'focus:border-sky-400', 'focus:outline-none', 'focus:ring-2', 'focus:ring-sky-500/40');
            });
            playerSelection.querySelectorAll('.class-path-select-avatar').forEach((avatar) => {
                avatar.classList.add('mt-4', 'rounded-2xl', 'border', 'border-white/15', 'bg-slate-950/70', 'p-2', 'shadow-lg');
            });
            playerSelection.querySelectorAll('.avatar-container').forEach((container) => {
                container.classList.add('flex', 'flex-col', 'items-center');
            });
        };
        styleNodes();
        const observer = new MutationObserver(() => styleNodes());
        observer.observe(playerSelection, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }
        let currentSession = null;
        let intervalId = null;

        const readStoredSession = () => {
            try {
                const raw = window.localStorage.getItem('chaosStreamerSession');
                if (!raw) {
                    return null;
                }
                return JSON.parse(raw);
            } catch (error) {
                console.warn('[Chaos] Unable to parse streamer session.', error);
                return null;
            }
        };

        const sendPing = async (payload) => {
            if (!payload?.id || !payload?.token) {
                return;
            }
            try {
                await fetch('/api/streamers/ping', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: payload.id,
                        token: payload.token,
                        activity: payload.activity || '',
                        tags: payload.tags || [],
                        channelUrl: payload.channelUrl || ''
                    })
                });
            } catch (error) {
                console.warn('[Chaos] Streamer ping failed.', error);
            }
        };

        const applySession = (payload) => {
            currentSession = payload;
            if (!currentSession?.id || !currentSession?.token) {
                if (intervalId) {
                    clearInterval(intervalId);
                }
                intervalId = null;
                return;
            }
            sendPing(currentSession);
            if (intervalId) {
                clearInterval(intervalId);
            }
            intervalId = setInterval(() => sendPing(currentSession), 60000);
        };

        applySession(readStoredSession());

        const handleSessionEvent = (event) => {
            applySession(event?.detail ?? readStoredSession());
        };

        const handleStorage = () => {
            applySession(readStoredSession());
        };

        const handleUnload = () => {
            if (!currentSession?.id || !currentSession?.token) {
                return;
            }
            const payload = JSON.stringify({ id: currentSession.id, token: currentSession.token });
            try {
                const blob = new Blob([payload], { type: 'application/json' });
                navigator.sendBeacon('/api/streamers/offline', blob);
            } catch (error) {
                fetch('/api/streamers/offline', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: payload,
                    keepalive: true
                }).catch(() => {});
            }
        };

        window.addEventListener('chaos:streamer-session', handleSessionEvent);
        window.addEventListener('storage', handleStorage);
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
            window.removeEventListener('chaos:streamer-session', handleSessionEvent);
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, []);

    return (
        <BrowserRouter>
            <AppRoutes copy={copy} />
        </BrowserRouter>
    );
};

export default App;
