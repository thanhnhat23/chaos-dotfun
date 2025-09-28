const { Logger } = require('@reldens/utils');

class StreamersApi {
    static register({ app, repository, ttlMs = 300000 }) {
        if (!app || !repository) {
            Logger.warning('[Chaos] Streamers API skipped - missing app or repository.');
            return false;
        }

        const repo = repository;
        if (typeof repo.ttlMs === 'undefined') {
            repo.ttlMs = ttlMs;
        }

        app.get('/api/streamers/live', (req, res) => {
            try {
                const streamers = repo.getLiveStreamers();
                res.json({ streamers });
            } catch (error) {
                Logger.error('[Chaos] Failed to list streamers.', error);
                res.status(500).json({ error: 'Failed to load streamers.' });
            }
        });

        app.post('/api/streamers/link', (req, res) => {
            const { displayName, channelUrl, activity, tags, streamKey } = req.body || {};
            try {
                if (!channelUrl) {
                    return res.status(400).json({ error: 'channelUrl is required.' });
                }
                const { viewer, session } = repo.upsert({ displayName, channelUrl, activity, tags, streamKey });
                res.status(201).json({ streamer: viewer, session });
            } catch (error) {
                Logger.error('[Chaos] Could not link streamer.', error);
                res.status(400).json({ error: error.message || 'Invalid streamer payload.' });
            }
        });

        app.post('/api/streamers/ping', (req, res) => {
            const { id, token, activity, tags } = req.body || {};
            if (!id || !token) {
                return res.status(400).json({ error: 'id and token are required.' });
            }
            try {
                const viewer = repo.touch({ id, token, activity, tags });
                if (!viewer) {
                    return res.status(404).json({ error: 'Streamer session not found.' });
                }
                res.json({ streamer: viewer });
            } catch (error) {
                Logger.error('[Chaos] Streamer ping failed.', error);
                res.status(500).json({ error: 'Could not update streamer status.' });
            }
        });

        app.post('/api/streamers/offline', (req, res) => {
            const { id, token } = req.body || {};
            if (!id || !token) {
                return res.status(400).json({ error: 'id and token are required.' });
            }
            try {
                const removed = repo.markOffline({ id, token });
                if (!removed) {
                    return res.status(404).json({ error: 'Streamer session not found.' });
                }
                res.json({ success: true });
            } catch (error) {
                Logger.error('[Chaos] Could not mark streamer offline.', error);
                res.status(500).json({ error: 'Failed to update streamer status.' });
            }
        });

        Logger.info('[Chaos] Streamers API routes registered.');
        return true;
    }
}

module.exports.StreamersApi = StreamersApi;

