import React from 'react';

const RoleSelectionPage = ({ copy, onSelect }) => {
    const rolesCopy = copy?.roles || {};
    const cards = Array.isArray(rolesCopy.cards) ? rolesCopy.cards : [];

    const handleSelect = (route) => {
        if (typeof onSelect === 'function') {
            onSelect(route);
        }
    };

    return (
        <div className="w-full">
            <header className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-semibold text-white md:text-4xl">{rolesCopy.title}</h2>
                {rolesCopy.subtitle && (
                    <p className="mt-3 text-sm text-slate-300 md:text-base">{rolesCopy.subtitle}</p>
                )}
            </header>
            <div className="mt-10 grid w-full gap-6 lg:grid-cols-3">
                {cards.length > 0 ? (
                    cards.map((card) => (
                        <article
                            key={card.key || card.route}
                            className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur transition hover:-translate-y-1 hover:border-sky-400 hover:shadow-sky-500/20"
                        >
                            <div>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                                        {card.icon || '*'}
                                    </span>
                                    <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                                </div>
                                {card.description && (
                                    <p className="mt-4 text-sm text-slate-300">{card.description}</p>
                                )}
                                {Array.isArray(card.highlights) && card.highlights.length > 0 && (
                                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                                        {card.highlights.map((highlight) => (
                                            <li key={highlight} className="flex items-start gap-2">
                                                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-sky-400"></span>
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <button
                                type="button"
                                className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400"
                                onClick={() => handleSelect(card.route || '/streamer/login')}
                            >
                                {card.action}
                            </button>
                        </article>
                    ))
                ) : (
                    <div className="col-span-full rounded-3xl border border-white/10 bg-slate-900/60 p-6 text-center text-sm text-slate-300">
                        {rolesCopy.emptyState || 'No roles available right now.'}
                    </div>
                )}
            </div>
            {rolesCopy.note && (
                <p className="mt-8 text-center text-xs text-slate-400">{rolesCopy.note}</p>
            )}
        </div>
    );
};

export default RoleSelectionPage;
