const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class StreamersRepository {
    constructor({ storagePath, ttlMs = 300000 }) {
        this.storagePath = storagePath;
        this.ttlMs = ttlMs;
        this.ensureStorage();
    }

    ensureStorage() {
        const dir = path.dirname(this.storagePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(this.storagePath)) {
            fs.writeFileSync(this.storagePath, JSON.stringify({ streamers: [] }, null, 2), 'utf-8');
        }
    }

    loadAll() {
        try {
            const raw = fs.readFileSync(this.storagePath, 'utf-8');
            const parsed = JSON.parse(raw || '{}');
            return Array.isArray(parsed.streamers) ? parsed.streamers : [];
        } catch (error) {
            console.error('[Chaos] Could not read streamers storage:', error);
            return [];
        }
    }

    saveAll(streamers) {
        const payload = { streamers };
        fs.writeFileSync(this.storagePath, JSON.stringify(payload, null, 2), 'utf-8');
    }

    sanitizeChannelUrl(channelUrl) {
        if (!channelUrl) {
            return '';
        }
        try {
            const url = new URL(channelUrl);
            if (!['http:', 'https:'].includes(url.protocol)) {
                throw new Error('Invalid protocol');
            }
            return url.toString();
        } catch (error) {
            throw new Error('Invalid channel URL');
        }
    }

    normalizeTags(tags) {
        if (!tags) {
            return [];
        }
        if (Array.isArray(tags)) {
            return tags.map((tag) => tag.toString().trim()).filter(Boolean);
        }
        return tags
            .toString()
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
    }

    hashStreamKey(streamKey) {
        if (!streamKey) {
            return null;
        }
        return crypto.createHash('sha256').update(streamKey).digest('hex');
    }

    createToken() {
        return crypto.randomUUID();
    }

    upsert({ displayName, channelUrl, activity, tags, streamKey }) {
        const sanitizedUrl = this.sanitizeChannelUrl(channelUrl);
        const all = this.loadAll();
        const now = Date.now();
        const entryIndex = all.findIndex((item) => item.channelUrl === sanitizedUrl);
        const cleanTags = this.normalizeTags(tags);
        const streamKeyHash = this.hashStreamKey(streamKey);
        const token = this.createToken();
        const baseData = {
            displayName: displayName || 'Chaos Streamer',
            channelUrl: sanitizedUrl,
            activity: activity || '',
            tags: cleanTags,
            lastActiveAt: now,
            status: 'live',
            token,
        };
        if (streamKeyHash) {
            baseData.streamKeyHash = streamKeyHash;
        }
        let entry;
        if (entryIndex >= 0) {
            entry = {
                ...all[entryIndex],
                ...baseData,
            };
            if (!baseData.streamKeyHash && all[entryIndex].streamKeyHash) {
                entry.streamKeyHash = all[entryIndex].streamKeyHash;
            }
            all[entryIndex] = entry;
        } else {
            entry = {
                id: crypto.randomUUID(),
                viewerCount: 0,
                streamKeyHash: streamKeyHash || '',
                ...baseData,
            };
            all.push(entry);
        }
        this.saveAll(all);
        return {
            viewer: this.toViewerPayload(entry),
            session: {
                id: entry.id,
                token: entry.token,
                channelUrl: entry.channelUrl,
                displayName: entry.displayName,
                activity: entry.activity,
                tags: entry.tags,
            }
        };
    }

    touch({ id, token, activity, tags }) {
        const all = this.loadAll();
        const index = all.findIndex((entry) => entry.id === id && entry.token === token);
        if (index === -1) {
            return false;
        }
        all[index].lastActiveAt = Date.now();
        all[index].status = 'live';
        if (activity !== undefined) {
            all[index].activity = activity;
        }
        if (tags) {
            all[index].tags = this.normalizeTags(tags);
        }
        this.saveAll(all);
        return this.toViewerPayload(all[index]);
    }

    markOffline({ id, token }) {
        const all = this.loadAll();
        const index = all.findIndex((entry) => entry.id === id && entry.token === token);
        if (index === -1) {
            return false;
        }
        all[index].status = 'offline';
        all[index].lastActiveAt = Date.now();
        this.saveAll(all);
        return true;
    }

    getLiveStreamers() {
        const all = this.loadAll();
        const limit = Date.now() - this.ttlMs;
        return all
            .filter((entry) => entry.status === 'live' && entry.lastActiveAt >= limit)
            .map((entry) => this.toViewerPayload(entry));
    }

    toViewerPayload(entry) {
        return {
            id: entry.id,
            displayName: entry.displayName,
            activity: entry.activity,
            channelUrl: entry.channelUrl,
            tags: entry.tags || [],
            lastActiveAt: entry.lastActiveAt,
            viewerCount: entry.viewerCount || 0,
        };
    }
}

module.exports.StreamersRepository = StreamersRepository;
