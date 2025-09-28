import React, { useEffect, useMemo, useRef, useState } from "react";
import { BrowserProvider, formatEther } from "ethers";

const shortenAddress = (value) => {
    if (!value || value.length <= 10) {
        return value || '';
    }
    return `${value.slice(0, 6)}...${value.slice(-4)}`;
};

const STREAMER_POLL_INTERVAL = 15000;

const ViewerPage = ({ copy }) => {
    const viewerCopy = copy?.viewer || {};
    const walletCopy = viewerCopy.wallet || {};
    const donationCopy = viewerCopy.donations || {};
    const fallbackStreamers = useMemo(() => {
        if (Array.isArray(viewerCopy.streamers)) {
            return viewerCopy.streamers.filter(Boolean);
        }
        return [];
    }, [viewerCopy.streamers]);

    const [liveStreamers, setLiveStreamers] = useState([]);
    const [loadingStreamers, setLoadingStreamers] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const buffOptions = Array.isArray(donationCopy.buffOptions) ? donationCopy.buffOptions : [];
    const eventOptions = Array.isArray(donationCopy.eventOptions) ? donationCopy.eventOptions : [];

    const providerRef = useRef(null);
    const [wallet, setWallet] = useState({ address: '', balance: '', network: '' });
    const [status, setStatus] = useState('idle');
    const [feedback, setFeedback] = useState('');

    const streamers = liveStreamers.length > 0 ? liveStreamers : fallbackStreamers;

    useEffect(() => {
        let isMounted = true;
        const fetchStreamers = async () => {
            if (!isMounted) {
                return;
            }
            setLoadingStreamers(true);
            try {
                const response = await fetch('/api/streamers/live');
                if (!response.ok) {
                    throw new Error('Request failed');
                }
                const payload = await response.json();
                if (!isMounted) {
                    return;
                }
                const received = Array.isArray(payload.streamers) ? payload.streamers : [];
                setLiveStreamers(received);
                setLastUpdated(Date.now());
            } catch (error) {
                console.warn('[Chaos] Failed to load live streamers.', error);
                if (isMounted) {
                    setLiveStreamers([]);
                }
            } finally {
                if (isMounted) {
                    setLoadingStreamers(false);
                }
            }
        };
        fetchStreamers();
        const interval = setInterval(fetchStreamers, STREAMER_POLL_INTERVAL);
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    const viewerCountLabel = (count) => {
        const template = viewerCopy.viewerCountLabel || '{count} viewers';
        return template.replace('{count}', Number(count || 0).toLocaleString());
    };

    const formatDonationCta = (option) => {
        const template = donationCopy.donateCta || 'Donate {amount} SOL';
        return template.replace('{amount}', option.amount);
    };

    const handleDonate = (streamer, option) => {
        if (status !== 'connected') {
            setFeedback(donationCopy.requiresWallet || walletCopy.connectPrompt || 'Please connect your wallet before donating.');
            return;
        }
        const template = donationCopy.success || 'Request {option} for {streamer} registered. It will trigger once {amount} SOL is received.';
        const message = template
            .replace('{option}', option.label)
            .replace('{streamer}', streamer.displayName || streamer.name || 'streamer')
            .replace('{amount}', option.amount);
        setFeedback(message);
    };

    const connectWallet = async () => {
        setFeedback('');
        if (typeof window === 'undefined' || !window.ethereum) {
            setFeedback(walletCopy.noProvider || 'No Web3 wallet detected in your browser.');
            return;
        }
        try {
            setStatus('connecting');
            const browserProvider = new BrowserProvider(window.ethereum);
            const accounts = await browserProvider.send('eth_requestAccounts', []);
            const address = accounts?.[0] || '';
            const network = await browserProvider.getNetwork();
            let balance = '0';
            if (address) {
                const rawBalance = await browserProvider.getBalance(address);
                balance = formatEther(rawBalance);
            }
            providerRef.current = browserProvider;
            setWallet({
                address,
                balance,
                network: network?.name || `chain-${network?.chainId ?? ''}`
            });
            setStatus('connected');
            setFeedback(walletCopy.connected || 'Wallet connected. You can donate now.');
        } catch (error) {
            console.error('Wallet connect error:', error);
            setStatus('error');
            setFeedback(walletCopy.error || 'Could not connect wallet. Please try again.');
        }
    };

    const disconnectWallet = () => {
        providerRef.current = null;
        setWallet({ address: '', balance: '', network: '' });
        setStatus('idle');
        setFeedback(walletCopy.disconnected || 'Wallet disconnected.');
    };

    const statusLabel = walletCopy.status?.[status] || walletCopy.status?.idle || '';
    const watchCta = viewerCopy.watchCta || 'Watch channel';

    const renderTags = (tags) => {
        if (!Array.isArray(tags) || tags.length === 0) {
            return null;
        }
        return tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs">
                #{tag}
            </span>
        ));
    };

    return (
        <div className="w-full">
            <header className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-semibold text-white md:text-4xl">{viewerCopy.title}</h2>
                {viewerCopy.subtitle && (
                    <p className="mt-3 text-sm text-slate-300 md:text-base">{viewerCopy.subtitle}</p>
                )}
                {viewerCopy.note && (
                    <p className="mt-2 text-xs uppercase tracking-wide text-slate-400">{viewerCopy.note}</p>
                )}
                {lastUpdated && (
                    <p className="mt-2 text-xs text-slate-500">
                        {viewerCopy.lastUpdatedLabel || 'Last update'}: {new Date(lastUpdated).toLocaleTimeString()}
                    </p>
                )}
            </header>
            <section className="mt-8 w-full rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-xl font-semibold text-white">{walletCopy.title}</h3>
                        {walletCopy.description && (
                            <p className="mt-2 text-sm text-slate-300">{walletCopy.description}</p>
                        )}
                        <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">{statusLabel}</p>
                    </div>
                    <div className="flex gap-3">
                        {status === 'connected' ? (
                            <button
                                type="button"
                                className="rounded-full border border-rose-400/40 bg-rose-500/20 px-5 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/30"
                                onClick={disconnectWallet}
                            >
                                {walletCopy.disconnectCta || 'Disconnect'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
                                onClick={connectWallet}
                            >
                                {walletCopy.connectCta || 'Connect wallet'}
                            </button>
                        )}
                    </div>
                </div>
                {wallet.address && (
                    <dl className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200 md:grid-cols-3">
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-slate-400">{walletCopy.labels?.address || 'Address'}</dt>
                            <dd className="mt-1 font-mono text-sm">{shortenAddress(wallet.address)}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-slate-400">{walletCopy.labels?.network || 'Network'}</dt>
                            <dd className="mt-1 text-sm capitalize">{wallet.network}</dd>
                        </div>
                        <div>
                            <dt className="text-xs uppercase tracking-wide text-slate-400">{walletCopy.labels?.balance || 'Balance'}</dt>
                            <dd className="mt-1 text-sm">{Number(wallet.balance || 0).toFixed(4)} SOL</dd>
                        </div>
                    </dl>
                )}
            </section>
            {feedback && (
                <div className="mt-6 w-full rounded-3xl border border-sky-400/40 bg-sky-500/10 p-4 text-sm text-sky-100">
                    {feedback}
                </div>
            )}
            <section className="mt-8 w-full space-y-6">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <h3 className="text-xl font-semibold text-white">{viewerCopy.streamListTitle}</h3>
                    {loadingStreamers && (
                        <span className="text-xs text-slate-400">{viewerCopy.loadingLabel || 'Refreshing live streamers...'}</span>
                    )}
                </div>
                {streamers.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 text-center text-sm text-slate-300">
                        {viewerCopy.emptyState || 'No streamers are live right now. Check back soon!'}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {streamers.map((streamer) => (
                            <article
                                key={streamer.id || streamer.name || streamer.channelUrl}
                                className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur"
                            >
                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-xs font-semibold text-sky-200">
                                                LIVE
                                            </span>
                                            <div>
                                                <h4 className="text-lg font-semibold text-white">{streamer.displayName || streamer.name || 'Chaos streamer'}</h4>
                                                {streamer.activity && <p className="text-sm text-slate-300">{streamer.activity}</p>}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                            <span className="rounded-full bg-white/5 px-3 py-1 text-slate-200">
                                                {viewerCountLabel(streamer.viewerCount)}
                                            </span>
                                            {renderTags(streamer.tags)}
                                        </div>
                                        {streamer.channelUrl && (
                                            <div>
                                                <a
                                                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition hover:text-sky-100"
                                                    href={streamer.channelUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {watchCta}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid w-full gap-4 md:max-w-md">
                                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                                            <h5 className="text-sm font-semibold text-sky-200">{donationCopy.buffTitle}</h5>
                                            {buffOptions.length > 0 ? (
                                                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                                                    {buffOptions.map((option) => (
                                                        <li key={option.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-3 md:flex-row md:items-center md:justify-between">
                                                            <div>
                                                                <p className="font-semibold text-white">{option.label}</p>
                                                                {option.description && (
                                                                    <p className="text-xs text-slate-400">{option.description}</p>
                                                                )}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center rounded-full bg-sky-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                                                                onClick={() => handleDonate(streamer, option)}
                                                            >
                                                                {formatDonationCta(option)}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-3 text-xs text-slate-400">{donationCopy.emptyBuffs || 'Buff options will appear here soon.'}</p>
                                            )}
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                                            <h5 className="text-sm font-semibold text-amber-200">{donationCopy.eventTitle}</h5>
                                            {eventOptions.length > 0 ? (
                                                <ul className="mt-3 space-y-3 text-sm text-slate-200">
                                                    {eventOptions.map((option) => (
                                                        <li key={option.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-3 md:flex-row md:items-center md:justify-between">
                                                            <div>
                                                                <p className="font-semibold text-white">{option.label}</p>
                                                                {option.description && (
                                                                    <p className="text-xs text-slate-400">{option.description}</p>
                                                                )}
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900 shadow-lg shadow-amber-500/30 transition hover:bg-amber-400"
                                                                onClick={() => handleDonate(streamer, option)}
                                                            >
                                                                {formatDonationCta(option)}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="mt-3 text-xs text-slate-400">{donationCopy.emptyEvents || 'Event options will appear here soon.'}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default ViewerPage;
