require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function decodeEnv(val) {
    if (!val) return val;
    try { return Buffer.from(val, 'base64').toString('utf-8'); } catch { return val; }
}

const CONFIG = {
    TWITCH_CLIENT_ID: decodeEnv(process.env.TWITCH_CLIENT_ID),
    TWITCH_CLIENT_SECRET: decodeEnv(process.env.TWITCH_CLIENT_SECRET),
    TWITCH_REDIRECT_URI: process.env.TWITCH_REDIRECT_URI,
    SEVENTV_API_BASE: 'https://7tv.io/v3',
    TWITCH_API_BASE: 'https://api.twitch.tv/helix',
    TWITCH_AUTH: 'https://id.twitch.tv/oauth2'
};

function log(message, type = 'info') {
    const time = new Date().toLocaleTimeString('ru-RU');
    console.log(`[${time}] [${type.toUpperCase()}] ${message}`);
}

// ==================== 7TV API ====================

app.get('/api/7tv/emotes/search', async (req, res) => {
    try {
        const { query, limit = 20, page = 1 } = req.query;
        const response = await fetch(
            `${CONFIG.SEVENTV_API_BASE}/emotes?query=${encodeURIComponent(query)}&limit=${limit}&page=${page}`
        );
        if (!response.ok) throw new Error('7TV API error');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/7tv/emote-sets/:setId', async (req, res) => {
    try {
        const { setId } = req.params;
        const response = await fetch(`${CONFIG.SEVENTV_API_BASE}/emote-sets/${setId}`);
        if (!response.ok) throw new Error('Emote set not found');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.get('/api/7tv/users/twitch/:twitchId', async (req, res) => {
    try {
        const { twitchId } = req.params;
        const response = await fetch(`${CONFIG.SEVENTV_API_BASE}/users/twitch/${twitchId}`);
        if (!response.ok) throw new Error('7TV user not found');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.post('/api/7tv/gql', async (req, res) => {
    try {
        const { operationName, query, variables, seventvToken } = req.body;

        log(`7TV GQL: ${operationName || variables?.action || 'query'}`);

        const headers = { 'Content-Type': 'application/json' };
        if (seventvToken) {
            headers['Authorization'] = `Bearer ${seventvToken}`;
        }

        const body = { query, variables };
        if (operationName) body.operationName = operationName;

        const response = await fetch('https://7tv.io/v3/gql', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.errors && data.errors.length > 0) {
            log(`7TV GQL Error: ${data.errors[0].message}`, 'error');
            return res.status(400).json({ error: data.errors[0].message, errors: data.errors });
        }

        log(`7TV GQL Success`);
        res.json(data);
    } catch (error) {
        log(`7TV GQL Error: ${error.message}`, 'error');
        res.status(500).json({ error: error.message });
    }
});

// ==================== TWITCH API ====================

app.get('/api/twitch/users', async (req, res) => {
    try {
        const { token } = req.query;
        const response = await fetch(`${CONFIG.TWITCH_API_BASE}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': CONFIG.TWITCH_CLIENT_ID
            }
        });
        if (!response.ok) throw new Error('Invalid token');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.post('/api/twitch/rewards', async (req, res) => {
    try {
        const { token, broadcasterId, title, cost, prompt, is_user_input_required } = req.body;

        log(`Creating reward: title="${title}", cost=${cost}`);

        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/channel_points/custom_rewards?broadcaster_id=${broadcasterId}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    cost,
                    prompt: prompt || '',
                    is_enabled: true,
                    is_user_input_required: is_user_input_required !== false,
                    should_redemptions_skip_request_queue: false
                })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            log(`Twitch API Error: ${errorText}`, 'error');
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();
        log(`Reward created: ${data.data[0].id}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/twitch/rewards', async (req, res) => {
    try {
        const { token, broadcasterId } = req.query;
        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/channel_points/custom_rewards?broadcaster_id=${broadcasterId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID
                }
            }
        );
        if (!response.ok) throw new Error('Failed to get rewards');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/twitch/rewards/:rewardId', async (req, res) => {
    try {
        const { rewardId } = req.params;
        const { token, broadcasterId, title, cost, prompt } = req.body;

        log(`Updating reward: ${rewardId}`);

        const body = {};
        if (title !== undefined) body.title = title;
        if (cost !== undefined) body.cost = cost;
        if (prompt !== undefined) body.prompt = prompt;

        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/channel_points/custom_rewards?broadcaster_id=${broadcasterId}&id=${rewardId}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            log(`Twitch PATCH reward error: ${errorText}`, 'error');
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();
        log(`Reward updated: ${rewardId}`);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/twitch/rewards/:rewardId', async (req, res) => {
    try {
        const { rewardId } = req.params;
        const { token, broadcasterId } = req.query;

        log(`Deleting reward: ${rewardId}`);

        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/channel_points/custom_rewards?broadcaster_id=${broadcasterId}&id=${rewardId}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID
                }
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            log(`Twitch DELETE reward error: ${errorText}`, 'error');
            return res.status(response.status).json({ error: errorText });
        }

        log(`Reward deleted: ${rewardId}`);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.patch('/api/twitch/rewards/redemptions', async (req, res) => {
    try {
        const { token, broadcasterId, rewardId, redemptionId, status } = req.body;

        log(`Updating redemption ${redemptionId} -> ${status}`);

        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/channel_points/custom_rewards/redemptions?` +
            `broadcaster_id=${broadcasterId}&reward_id=${rewardId}&id=${redemptionId}`,
            {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to update redemption: ${errorText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/twitch/rewards/redemptions', async (req, res) => {
    try {
        const { token, broadcasterId, rewardId } = req.query;

        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/channel_points/custom_rewards/redemptions?` +
            `broadcaster_id=${broadcasterId}&reward_id=${rewardId}&status=UNFULFILLED`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID
                }
            }
        );

        if (!response.ok) throw new Error('Failed to get redemptions');

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/twitch/chat/messages', async (req, res) => {
    try {
        const { token, broadcasterId, senderId, message } = req.body;

        log(`Chat message: ${message}`);

        const response = await fetch(`${CONFIG.TWITCH_API_BASE}/chat/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Client-Id': CONFIG.TWITCH_CLIENT_ID,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                broadcaster_id: broadcasterId,
                sender_id: senderId,
                message
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            log(`Chat API Error: ${errorText}`, 'error');
            throw new Error(`Chat message failed: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ==================== TWITCH MODERATION ====================

app.post('/api/twitch/moderation/ban', async (req, res) => {
    try {
        const { token, broadcasterId, moderatorId, userId, duration, reason } = req.body;

        log(`Moderation: user=${userId}, duration=${duration || 'permanent'}`);

        const body = { data: { user_id: userId, reason: reason || '' } };
        if (duration) body.data.duration = duration;

        const response = await fetch(
            `${CONFIG.TWITCH_API_BASE}/moderation/bans?broadcaster_id=${broadcasterId}&moderator_id=${moderatorId}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Client-Id': CONFIG.TWITCH_CLIENT_ID,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        );

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            log(`Moderation Error: ${data.message || response.status}`, 'error');
            return res.status(response.status).json({ error: data.message || 'Ошибка модерации' });
        }

        log(`Moderation Success`);
        res.json(data);
    } catch (error) {
        log(`Moderation Error: ${error.message}`, 'error');
        res.status(500).json({ error: error.message });
    }
});

// ==================== ЗАПУСК ====================

app.listen(PORT, () => {
    console.log(`\n  7TV Rewards Server: http://localhost:${PORT}\n`);
});
