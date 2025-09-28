import React, { useEffect, useMemo, useState } from 'react';
import SignupPage from './SignupPage.jsx';
import ForgotPasswordPage from './ForgotPasswordPage.jsx';

<<<<<<< HEAD
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
=======
const STORAGE_KEY = 'chaosStreamerSession';

const LoginPage = ({ copy, streamerCopy, registerCopy, forgotCopy }) => {
    const labelClass = 'text-sm font-semibold text-slate-200';
    const inputClass =
        'required w-full rounded-xl border border-white/15 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40';
    const youtubeCopy = streamerCopy?.youtube || {};
    const statusCopy = youtubeCopy.status || {};
    const messagesCopy = youtubeCopy.messages || {};

    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [linkForm, setLinkForm] = useState({ displayName: '', channelUrl: '', streamKey: '', activity: '', tags: '' });
    const [session, setSession] = useState(null);
    const [linkFeedback, setLinkFeedback] = useState('');
    const [linkState, setLinkState] = useState('idle');
    const [activeModal, setActiveModal] = useState(null);

    const updateLoginField = (field) => (event) => {
        const value = event.target.value;
        setLoginForm((prev) => ({ ...prev, [field]: value }));
    };

    const updateLinkField = (field) => (event) => {
        const value = event.target.value;
        setLinkForm((prev) => ({ ...prev, [field]: value }));
    };

    const persistSession = (payload) => {
        setSession(payload);
        if (typeof window !== 'undefined') {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
            window.dispatchEvent(new CustomEvent('chaos:streamer-session', { detail: payload }));
        }
    };

    const clearSession = () => {
        setSession(null);
        if (typeof window !== 'undefined') {
            window.localStorage.removeItem(STORAGE_KEY);
            window.dispatchEvent(new CustomEvent('chaos:streamer-session', { detail: null }));
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return undefined;
        }
        try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return undefined;
            }
            const stored = JSON.parse(raw);
            if (stored) {
                setSession(stored);
                setLinkState('linked');
                setLinkForm((prev) => ({
                    ...prev,
                    displayName: stored.displayName || prev.displayName,
                    channelUrl: stored.channelUrl || prev.channelUrl,
                    activity: stored.activity || prev.activity,
                    tags: Array.isArray(stored.tags) ? stored.tags.join(', ') : stored.tags || prev.tags
                }));
                setLinkFeedback(messagesCopy.linkSuccess || statusCopy.linked || 'Channel linked.');
            }
        } catch (error) {
            console.warn('[Chaos] Could not read streamer session.', error);
        }
        return undefined;
    }, [messagesCopy.linkSuccess, statusCopy.linked]);

    const resolvedStatus = useMemo(() => {
        if (linkState === 'linking') {
            return statusCopy.linking || 'Syncing with the Chaos viewer list...';
        }
        if (linkState === 'linked') {
            return statusCopy.linked || 'Channel linked. Chaos viewers can find you live.';
        }
        if (linkState === 'error') {
            return linkFeedback || messagesCopy.linkError || 'Could not link channel.';
        }
        if (linkState === 'offline') {
            return statusCopy.offline || 'Channel unlinked.';
        }
        return linkFeedback || statusCopy.idle || 'No YouTube channel linked yet.';
    }, [linkFeedback, linkState, messagesCopy.linkError, statusCopy]);

    const parsedTags = useMemo(() => {
        return linkForm.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
    }, [linkForm.tags]);

    const handleLink = async () => {
        setLinkFeedback('');
        if (!linkForm.channelUrl.trim()) {
            setLinkFeedback(messagesCopy.linkError || 'Channel URL is required.');
            setLinkState('error');
            return;
        }
        setLinkState('linking');
        const payload = {
            displayName: linkForm.displayName.trim() || loginForm.username.trim() || 'Chaos Streamer',
            channelUrl: linkForm.channelUrl.trim(),
            streamKey: linkForm.streamKey.trim(),
            activity: linkForm.activity.trim(),
            tags: parsedTags
        };
        try {
            const response = await fetch('/api/streamers/link', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.error || 'Request failed.');
            }
            const data = await response.json();
            const storedSession = {
                id: data.session.id,
                token: data.session.token,
                channelUrl: payload.channelUrl,
                displayName: payload.displayName,
                activity: payload.activity,
                tags: payload.tags
            };
            persistSession(storedSession);
            setLinkForm((prev) => ({ ...prev, streamKey: '' }));
            setLinkFeedback(messagesCopy.linkSuccess || statusCopy.linked || 'Channel linked. Chaos viewers can find you live.');
            setLinkState('linked');
        } catch (error) {
            console.error('[Chaos] Link channel error:', error);
            setLinkFeedback(error.message || messagesCopy.linkError || 'Could not link channel.');
            setLinkState('error');
        }
    };

    const handleUnlink = async () => {
        setLinkFeedback('');
        const currentSession = session;
        try {
            if (currentSession) {
                await fetch('/api/streamers/offline', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: currentSession.id, token: currentSession.token })
                });
            }
        } catch (error) {
            console.warn('[Chaos] Could not mark streamer offline.', error);
        }
        clearSession();
        setLinkState('offline');
        setLinkFeedback(messagesCopy.unlinkSuccess || statusCopy.offline || 'Channel unlinked.');
    };

    const statusBadgeClass =
        linkState === 'error'
            ? 'text-rose-300'
            : linkState === 'linking'
            ? 'text-sky-300'
            : linkState === 'offline'
            ? 'text-slate-300'
            : 'text-emerald-300';

    return (
        <>
            <div className="flex w-full flex-col gap-6">
                <div className="grid w/full gap-6 lg:grid-cols-2">
                    <form
                        name="login-form"
                        id="login-form"
                        className="flex flex-col gap-5 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl"
                        action="#"
                        method="post"
                    >
                        <h3 className="text-left text-2xl font-semibold text-white">{copy.login.title}</h3>
                        <div className="flex flex-col gap-2">
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
                                value={loginForm.username}
                                onChange={updateLoginField('username')}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className={labelClass}>
                                {copy.login.passwordLabel}
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className={inputClass}
                                required
                                value={loginForm.password}
                                onChange={updateLoginField('password')}
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                            <span className={statusBadgeClass}>{resolvedStatus}</span>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    className="text-sky-300 underline transition hover:text-sky-100"
                                    onClick={() => setActiveModal('forgot')}
                                >
                                    {copy.login.forgotLink}
                                </button>
                                <button
                                    type="button"
                                    className="text-sky-300 underline transition hover:text-sky-100"
                                    onClick={() => setActiveModal('signup')}
                                >
                                    {copy.login.signupLink}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-3">
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
                    <div className="firebase-row-container hidden h-full w-full rounded-3xl border border-dashed border-white/15 bg-slate-900/40 p-6 shadow-inner">
                        <form name="firebase-login" id="firebase-login" className="flex h-full flex-col gap-4" action="#" method="post">
                            <h3 className="text-xl font-semibold text-white">{copy.firebase.title}</h3>
                            <div className="flex flex-col gap-2 text-sm text-slate-200">
                                <label htmlFor="firebase-username" className="font-semibold">
                                    {copy.firebase.usernameLabel}
                                </label>
                                <input type="text" name="firebase-username" id="firebase-username" className={inputClass} required />
                            </div>
                            <div className="flex-1 rounded-xl border border-white/10 bg-slate-900/60 p-4">
                                <div id="firebaseui-auth-container" className="h-full w-full"></div>
                            </div>
                            <div className="input-box response-error text-sm text-rose-400"></div>
                        </form>
                    </div>
>>>>>>> 8ec9633b (update UI and more)
                </div>
                {streamerCopy && (
                    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                            <div className="space-y-4 lg:max-w-md">
                                <h3 className="text-xl font-semibold text-white">{youtubeCopy.heading}</h3>
                                {streamerCopy?.intro && <p className="text-sm text-slate-300">{streamerCopy.intro}</p>}
                                {youtubeCopy.description && <p className="text-sm text-slate-300">{youtubeCopy.description}</p>}
                                {youtubeCopy.helper && (
                                    <p className="text-xs uppercase tracking-wide text-slate-400">{youtubeCopy.helper}</p>
                                )}
                                <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200" data-status={linkState}>
                                    <span id="youtube-status-message" className={statusBadgeClass}>
                                        {resolvedStatus}
                                    </span>
                                </div>
                            </div>
                            <form
                                name="youtube-link-form"
                                id="youtube-link-form"
                                className="flex w-full flex-col gap-4 lg:max-w-md"
                                action="#"
                                method="post"
                            >
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="youtube-display-name" className={labelClass}>
                                        {youtubeCopy.displayNameLabel || 'Display name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube-display-name"
                                        id="youtube-display-name"
                                        className={inputClass}
                                        placeholder="Chaos channel"
                                        autoComplete="off"
                                        value={linkForm.displayName}
                                        onChange={updateLinkField('displayName')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="youtube-channel-url" className={labelClass}>
                                        {youtubeCopy.channelLabel}
                                    </label>
                                    <input
                                        type="url"
                                        name="youtube-channel-url"
                                        id="youtube-channel-url"
                                        className={inputClass}
                                        placeholder="https://www.youtube.com/@yourchannel"
                                        autoComplete="off"
                                        value={linkForm.channelUrl}
                                        onChange={updateLinkField('channelUrl')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="youtube-stream-key" className={labelClass}>
                                        {youtubeCopy.streamKeyLabel}
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube-stream-key"
                                        id="youtube-stream-key"
                                        className={inputClass}
                                        placeholder="Paste your YouTube stream key"
                                        autoComplete="off"
                                        value={linkForm.streamKey}
                                        onChange={updateLinkField('streamKey')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="youtube-activity" className={labelClass}>
                                        {youtubeCopy.activityLabel || 'What are you streaming?'}
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube-activity"
                                        id="youtube-activity"
                                        className={inputClass}
                                        placeholder="Speedrun, PvE raids, ..."
                                        value={linkForm.activity}
                                        onChange={updateLinkField('activity')}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="youtube-tags" className={labelClass}>
                                        {youtubeCopy.tagsLabel || 'Tags'}
                                    </label>
                                    <input
                                        type="text"
                                        name="youtube-tags"
                                        id="youtube-tags"
                                        className={inputClass}
                                        placeholder="Chaos, PvE, Challenge"
                                        value={linkForm.tags}
                                        onChange={updateLinkField('tags')}
                                    />
                                    {youtubeCopy.tagsHint && (
                                        <p className="text-xs text-slate-400">{youtubeCopy.tagsHint}</p>
                                    )}
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            id="youtube-link-submit"
                                            className={`inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition ${linkState === 'linking' ? 'bg-emerald-800/60 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-400'}`}
                                            disabled={linkState === 'linking'}
                                            onClick={handleLink}
                                        >
                                            {youtubeCopy.connectCta}
                                        </button>
                                        {(session || linkState === 'linked') && (
                                            <button
                                                type="button"
                                                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 shadow-lg shadow-slate-900/20 transition hover:bg-slate-700"
                                                onClick={handleUnlink}
                                            >
                                                {youtubeCopy.disconnectCta || 'Unlink channel'}
                                            </button>
                                        )}
                                    </div>
                                    <a
                                        className="text-sm font-semibold text-sky-300 transition hover:text-sky-200"
                                        href={youtubeCopy.helpUrl || 'https://support.google.com/youtube/answer/2474026?hl=en'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {youtubeCopy.helpCta}
                                    </a>
                                </div>
                            </form>
                        </div>
                    </section>
                )}
            </div>
            {activeModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur">
                    <div className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-900/90 p-6 shadow-2xl">
                        <button
                            type="button"
                            className="absolute right-4 top-4 rounded-full bg-slate-800/80 p-2 text-slate-200 transition hover:bg-slate-700"
                            onClick={() => setActiveModal(null)}
                        >
                            ✕
                        </button>
                        {activeModal === 'signup' ? (
                            <SignupPage copy={{ ...copy, register: registerCopy || copy.register }} />
                        ) : (
                            <ForgotPasswordPage copy={{ ...copy, forgot: forgotCopy || copy.forgot }} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginPage;
