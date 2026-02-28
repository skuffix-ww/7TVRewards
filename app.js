// ==================== КОНФИГУРАЦИЯ ====================

const CONFIG = {
    SERVER_URL: window.location.origin,
    TWITCH_CLIENT_ID: atob('Y3BheHZvc3czcXdsc3YzeDhhOHd1eHUyamwwZzho'),
    TWITCH_REDIRECT_URI: 'https://7tvrewards-production.up.railway.app',
    SEVENTV_API_BASE: 'https://7tv.io/v3',
    SCOPES: 'channel:manage:redemptions user:read:email user:write:chat'
};

const EMOTES_PER_PAGE = 24;

// ==================== СОСТОЯНИЕ ====================

const state = {
    twitchToken: null,
    userId: null,
    broadcasterId: null,
    emoteSetId: null,
    activeEmotes: [],       // очередь добавленных эмоутов [{id, name}, ...]
    maxEmoteSlots: 1,       // сколько эмоутов можно добавить до удаления старых
    rewardId: null,
    seventvToken: null,
    sendChatMessages: true,
    // pagination
    allSetEmotes: [],
    displayedSetEmotes: 0,
    searchQuery: '',
    searchPage: 1,
    searchHasMore: false
};

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initListeners();
    checkAuth();
    startCountdown();
});

function loadState() {
    const saved = localStorage.getItem('7tv-rewards-state');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
        if (state.emoteSetId) {
            document.getElementById('emote-set-id').value = state.emoteSetId;
        }
        if (state.seventvToken) {
            document.getElementById('seventv-token').value = state.seventvToken;
        }
        if (state.sendChatMessages !== undefined) {
            document.getElementById('send-chat-messages').checked = state.sendChatMessages;
        }
        // Миграция: activeEmote → activeEmotes
        if (state.activeEmote && !state.activeEmotes?.length) {
            state.activeEmotes = [state.activeEmote];
            delete state.activeEmote;
        }
        if (!Array.isArray(state.activeEmotes)) state.activeEmotes = [];
        if (!state.maxEmoteSlots) state.maxEmoteSlots = 1;
        document.getElementById('max-emote-slots').value = state.maxEmoteSlots;
    }
}

function saveState() {
    localStorage.setItem('7tv-rewards-state', JSON.stringify({
        twitchToken: state.twitchToken,
        userId: state.userId,
        broadcasterId: state.broadcasterId,
        emoteSetId: state.emoteSetId,
        activeEmotes: state.activeEmotes,
        maxEmoteSlots: state.maxEmoteSlots,
        rewardId: state.rewardId,
        seventvToken: state.seventvToken,
        sendChatMessages: state.sendChatMessages
    }));
}

function initListeners() {
    // Auth
    document.getElementById('btn-login').addEventListener('click', handleLogin);
    document.getElementById('btn-logout').addEventListener('click', handleLogout);

    // 7TV token
    document.getElementById('btn-save-token').addEventListener('click', saveSeventvToken);
    document.getElementById('seventv-token').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveSeventvToken();
    });
    document.getElementById('btn-toggle-token').addEventListener('click', () => {
        const input = document.getElementById('seventv-token');
        input.type = input.type === 'password' ? 'text' : 'password';
    });
    document.getElementById('emote-set-select').addEventListener('change', handleEmoteSetSelect);
    document.getElementById('btn-save-set').addEventListener('click', handleSaveEmoteSet);
    document.getElementById('btn-load-more-emotes').addEventListener('click', showMoreSetEmotes);

    // Rewards
    document.getElementById('btn-create-reward').addEventListener('click', handleCreateReward);
    document.getElementById('send-chat-messages').addEventListener('change', (e) => {
        state.sendChatMessages = e.target.checked;
        saveState();
    });
    document.getElementById('max-emote-slots').addEventListener('change', (e) => {
        const val = parseInt(e.target.value);
        if (val >= 1) {
            state.maxEmoteSlots = val;
            saveState();
            log(`Слотов эмоутов: ${val}`, 'info');
            updateActiveEmotesDisplay();
        }
    });

    // Search
    document.getElementById('btn-search-emote').addEventListener('click', () => handleSearchEmote(true));
    document.getElementById('emote-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearchEmote(true);
    });
    document.getElementById('btn-load-more-search').addEventListener('click', () => handleSearchEmote(false));

    // Log
    document.getElementById('btn-clear-log').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('event-log').innerHTML = '';
        document.getElementById('log-count').textContent = '0';
    });
    document.getElementById('log-toggle').addEventListener('click', () => {
        const collapse = document.getElementById('log-collapse');
        collapse.classList.toggle('collapsed');
    });

    // Info modal
    const modal = document.getElementById('info-modal');
    document.getElementById('btn-info').addEventListener('click', () => {
        modal.style.display = 'flex';
    });
    document.getElementById('btn-close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Changelog modal
    const changelog = document.getElementById('changelog-modal');
    document.getElementById('btn-changelog').addEventListener('click', () => {
        changelog.style.display = 'flex';
    });
    document.getElementById('btn-close-changelog').addEventListener('click', () => {
        changelog.style.display = 'none';
    });
    changelog.addEventListener('click', (e) => {
        if (e.target === changelog) changelog.style.display = 'none';
    });

    handleAuthCallback();
}

// ==================== ЛОГИРОВАНИЕ ====================

function log(message, type = 'info') {
    const el = document.getElementById('event-log');
    const time = new Date().toLocaleTimeString('ru-RU');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.innerHTML = `<span class="log-time">[${time}]</span>${message}`;
    el.insertBefore(entry, el.firstChild);
    while (el.children.length > 200) el.removeChild(el.lastChild);
    document.getElementById('log-count').textContent = el.children.length;
}

// ==================== АВТОРИЗАЦИЯ ====================

function handleLogin() {
    const url = `https://id.twitch.tv/oauth2/authorize` +
        `?client_id=${CONFIG.TWITCH_CLIENT_ID}` +
        `&redirect_uri=${encodeURIComponent(CONFIG.TWITCH_REDIRECT_URI)}` +
        `&response_type=token` +
        `&scope=${encodeURIComponent(CONFIG.SCOPES)}`;
    log('Переход к авторизации Twitch...', 'info');
    window.location.href = url;
}

function handleAuthCallback() {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        if (token) {
            state.twitchToken = token;
            state.userId = null;
            saveState();
            log('Авторизация успешна!', 'success');
            window.history.replaceState(null, null, window.location.pathname);
            verifyToken();
        }
    }
}

function checkAuth() {
    if (state.twitchToken) {
        updateAuthUI(true);
        verifyToken();
    } else {
        updateAuthUI(false);
    }
}

async function verifyToken() {
    try {
        const res = await fetch('https://api.twitch.tv/helix/users', {
            headers: {
                'Authorization': `Bearer ${state.twitchToken}`,
                'Client-Id': CONFIG.TWITCH_CLIENT_ID
            }
        });
        if (!res.ok) throw new Error('Неверный токен');

        const data = await res.json();
        const user = data.data[0];
        state.userId = user.id;
        state.broadcasterId = user.id;

        document.getElementById('username').textContent = user.display_name;
        document.getElementById('user-avatar').src = user.profile_image_url;

        saveState();
        updateAuthUI(true);
        log(`Вход: ${user.display_name}`, 'success');

        loadChannelRewards();
        load7TVUserData();

        if (state.emoteSetId) {
            loadEmoteSet();
        }
    } catch (err) {
        log(`Ошибка токена: ${err.message}`, 'error');
        handleLogout();
    }
}

function handleLogout() {
    state.twitchToken = null;
    state.userId = null;
    state.broadcasterId = null;
    saveState();
    log('Выход', 'info');
    updateAuthUI(false);
}

function updateAuthUI(authed) {
    document.getElementById('btn-login').style.display = authed ? 'none' : 'inline-flex';
    document.getElementById('btn-logout').style.display = authed ? 'inline-flex' : 'none';
    document.getElementById('user-info').style.display = authed ? 'flex' : 'none';

    const status = document.getElementById('auth-status');
    status.textContent = authed ? 'Подключено' : 'Не авторизован';
    status.className = `badge ${authed ? 'badge-success' : 'badge-warning'}`;

    document.getElementById('seventv-section').style.display = authed ? 'block' : 'none';
    document.getElementById('rewards-section').style.display = authed ? 'block' : 'none';
    document.getElementById('emote-management').style.display = authed ? 'block' : 'none';
}

// ==================== 7TV: ТОКЕН ====================

async function saveSeventvToken() {
    const raw = document.getElementById('seventv-token').value.trim();
    // Убираем "Bearer " если пользователь скопировал с ним
    const token = raw.replace(/^Bearer\s+/i, '');
    const statusEl = document.getElementById('token-status');

    if (!token) {
        log('Введите токен 7TV', 'warning');
        statusEl.innerHTML = '<span class="badge badge-warning">Токен пуст</span>';
        return;
    }

    state.seventvToken = token;
    document.getElementById('seventv-token').value = token;
    saveState();

    // Проверяем токен — делаем тестовый GQL запрос
    statusEl.innerHTML = '<span class="loader"></span>';
    try {
        const res = await fetch(`${CONFIG.SERVER_URL}/api/7tv/gql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: '{ user(id: "0") { id } }',
                variables: {},
                seventvToken: token
            })
        });
        // Даже если запрос "ошибочный" (user не найден) — главное что сервер ответил, а не 401
        if (res.status === 401 || res.status === 403) {
            throw new Error('Невалидный токен');
        }
        statusEl.innerHTML = '<span class="badge badge-success">Токен сохранён</span>';
        log('Токен 7TV сохранён и проверен', 'success');
    } catch (err) {
        statusEl.innerHTML = '<span class="badge badge-warning">Токен сохранён (не удалось проверить)</span>';
        log(`Токен сохранён, но проверка не прошла: ${err.message}`, 'warning');
    }
}

// ==================== 7TV: ПОЛЬЗОВАТЕЛЬ И НАБОРЫ ====================

async function load7TVUserData() {
    if (!state.broadcasterId) return;

    const select = document.getElementById('emote-set-select');
    select.innerHTML = '<option value="">Загрузка...</option>';

    try {
        const res = await fetch(`${CONFIG.SERVER_URL}/api/7tv/users/twitch/${state.broadcasterId}`);
        if (!res.ok) throw new Error('7TV аккаунт не найден');

        const data = await res.json();
        const emoteSets = data.user?.emote_sets || [];
        const activeSetId = data.emote_set?.id || data.emote_set_id || null;

        select.innerHTML = '';

        if (emoteSets.length === 0) {
            // fallback: use the active set from connection
            if (data.emote_set) {
                const opt = document.createElement('option');
                opt.value = data.emote_set.id;
                opt.textContent = data.emote_set.name || `Набор ${data.emote_set.id}`;
                select.appendChild(opt);
            } else {
                select.innerHTML = '<option value="">Наборы не найдены</option>';
            }
        } else {
            const defaultOpt = document.createElement('option');
            defaultOpt.value = '';
            defaultOpt.textContent = '-- Выберите набор --';
            select.appendChild(defaultOpt);

            emoteSets.forEach(set => {
                const opt = document.createElement('option');
                opt.value = set.id;
                opt.textContent = set.name || `Набор ${set.id}`;
                if (set.id === activeSetId) opt.textContent += ' (активный)';
                select.appendChild(opt);
            });
        }

        select.disabled = false;

        // Авто-выбор сохранённого или активного набора
        if (state.emoteSetId) {
            select.value = state.emoteSetId;
        } else if (activeSetId) {
            select.value = activeSetId;
            state.emoteSetId = activeSetId;
            saveState();
            loadEmoteSet();
        }

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = 'Подключено';
        stvStatus.className = 'badge badge-success';

        log(`7TV: найдено ${emoteSets.length || 1} наборов`, 'success');
    } catch (err) {
        select.innerHTML = '<option value="">Не удалось загрузить</option>';
        select.disabled = true;

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = 'Не найден';
        stvStatus.className = 'badge badge-error';

        log(`7TV: ${err.message}`, 'error');
    }
}

function handleEmoteSetSelect(e) {
    const setId = e.target.value;
    if (!setId) return;
    state.emoteSetId = setId;
    document.getElementById('emote-set-id').value = setId;
    saveState();
    log(`Набор выбран: ${setId}`, 'info');
    loadEmoteSet();
}

async function handleSaveEmoteSet() {
    const id = document.getElementById('emote-set-id').value.trim();
    if (!id) {
        log('Введите ID набора', 'warning');
        return;
    }
    state.emoteSetId = id;
    saveState();

    // Обновляем select если есть такой вариант
    const select = document.getElementById('emote-set-select');
    if (select.querySelector(`option[value="${id}"]`)) {
        select.value = id;
    }

    log(`ID набора: ${id}`, 'info');
    await loadEmoteSet();
}

// ==================== 7TV: ЭМОУТЫ НАБОРА ====================

async function loadEmoteSet() {
    if (!state.emoteSetId) return;

    const container = document.getElementById('emotes-container');
    const section = document.getElementById('current-emotes');
    const countBadge = document.getElementById('emotes-count');
    const loadMoreBtn = document.getElementById('btn-load-more-emotes');

    container.innerHTML = '<div class="no-data"><span class="loader"></span></div>';
    section.style.display = 'block';

    try {
        const res = await fetch(`${CONFIG.SEVENTV_API_BASE}/emote-sets/${state.emoteSetId}`);
        if (!res.ok) throw new Error('Набор не найден');

        const data = await res.json();
        state.allSetEmotes = data.emotes || [];
        state.displayedSetEmotes = 0;

        countBadge.textContent = state.allSetEmotes.length;
        container.innerHTML = '';

        if (state.allSetEmotes.length === 0) {
            container.innerHTML = '<div class="no-data">Нет эмоутов в наборе</div>';
            loadMoreBtn.style.display = 'none';
        } else {
            showMoreSetEmotes();
        }

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = 'Подключено';
        stvStatus.className = 'badge badge-success';

        log(`Загружено ${state.allSetEmotes.length} эмоутов`, 'success');
    } catch (err) {
        container.innerHTML = `<div class="no-data">Ошибка: ${err.message}</div>`;
        loadMoreBtn.style.display = 'none';

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = 'Ошибка';
        stvStatus.className = 'badge badge-error';

        log(`Ошибка загрузки набора: ${err.message}`, 'error');
    }
}

function showMoreSetEmotes() {
    const container = document.getElementById('emotes-container');
    const loadMoreBtn = document.getElementById('btn-load-more-emotes');
    const start = state.displayedSetEmotes;
    const end = Math.min(start + EMOTES_PER_PAGE, state.allSetEmotes.length);

    for (let i = start; i < end; i++) {
        const emote = state.allSetEmotes[i];
        container.appendChild(createEmoteElement(emote, false));
    }

    state.displayedSetEmotes = end;

    if (end < state.allSetEmotes.length) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.textContent = `Загрузить ещё (${state.allSetEmotes.length - end} осталось)`;
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

function createEmoteElement(emote, clickable) {
    const el = document.createElement('div');
    el.className = `emote-item${clickable ? ' clickable' : ''}`;
    el.innerHTML = `
        <img src="https://cdn.7tv.app/emote/${emote.id}/2x.webp" alt="${emote.name}" loading="lazy">
        <span class="emote-name">${emote.name}</span>
    `;
    if (clickable) {
        el.addEventListener('click', () => selectEmote(emote));
    }
    return el;
}

// ==================== ПОИСК ЭМОУТОВ ====================

async function handleSearchEmote(newSearch) {
    const input = document.getElementById('emote-search');
    const container = document.getElementById('search-results');
    const loadMoreBtn = document.getElementById('btn-load-more-search');

    if (newSearch) {
        const query = input.value.trim();
        if (!query) {
            log('Введите название для поиска', 'warning');
            return;
        }
        state.searchQuery = query;
        state.searchPage = 1;
        container.innerHTML = '<div class="no-data"><span class="loader"></span></div>';
    } else {
        state.searchPage++;
    }

    try {
        const res = await fetch(`${CONFIG.SERVER_URL}/api/7tv/gql`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                operationName: 'SearchEmotes',
                query: `query SearchEmotes($query: String!, $limit: Int, $page: Int) {
                    emotes(query: $query, limit: $limit, page: $page) {
                        items { id name }
                    }
                }`,
                variables: {
                    query: state.searchQuery,
                    limit: EMOTES_PER_PAGE,
                    page: state.searchPage
                }
            })
        });
        if (!res.ok) throw new Error('Ошибка поиска');

        const data = await res.json();
        const emotes = data.data?.emotes?.items || [];

        if (newSearch) container.innerHTML = '';

        if (emotes.length === 0 && newSearch) {
            container.innerHTML = '<div class="no-data">Ничего не найдено</div>';
            loadMoreBtn.style.display = 'none';
        } else {
            emotes.forEach(emote => {
                container.appendChild(createEmoteElement(emote, true));
            });

            // Показываем "Загрузить ещё" если пришла полная страница
            if (emotes.length >= EMOTES_PER_PAGE) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.textContent = 'Загрузить ещё';
            } else {
                loadMoreBtn.style.display = 'none';
            }

            if (newSearch) log(`Найдено эмоутов: ${emotes.length}+`, 'success');
        }
    } catch (err) {
        log(`Ошибка поиска: ${err.message}`, 'error');
        loadMoreBtn.style.display = 'none';
    }
}

// ==================== ВЫБОР И ДОБАВЛЕНИЕ ЭМОУТА ====================

function selectEmote(emote) {
    state.selectedEmote = emote;
    log(`Выбран: ${emote.name}`, 'info');

    // Убираем выделение с предыдущего
    document.querySelectorAll('.emote-item.selected').forEach(el => el.classList.remove('selected'));

    const activeSection = document.getElementById('active-emote');
    activeSection.style.display = 'block';

    const container = document.getElementById('active-emote-container');
    container.innerHTML = `
        <img src="https://cdn.7tv.app/emote/${emote.id}/3x.webp" alt="${emote.name}">
        <div class="emote-info">
            <h4>${emote.name}</h4>
            <p>ID: ${emote.id}</p>
            <button class="btn btn-success btn-sm" style="margin-top:8px;" id="btn-add-emote">Добавить в набор</button>
        </div>
    `;

    document.getElementById('btn-add-emote').addEventListener('click', () => addEmoteToSet(emote));
}

async function addEmoteToSet(emote) {
    if (!state.emoteSetId) {
        log('Сначала выберите набор 7TV', 'warning');
        return;
    }
    if (!state.seventvToken) {
        log('Введите токен 7TV для добавления эмоутов', 'warning');
        return;
    }

    // Проверка дубликатов в наборе
    const duplicateById = state.allSetEmotes.find(e => e.id === emote.id);
    const duplicateByName = state.allSetEmotes.find(e => e.name === emote.name && e.id !== emote.id);
    if (duplicateById) {
        log(`Эмоут "${emote.name}" уже есть в наборе!`, 'warning');
        return false;
    }
    if (duplicateByName) {
        log(`Эмоут с именем "${emote.name}" уже есть в наборе (${duplicateByName.id})!`, 'warning');
        return false;
    }

    try {
        // Удаляем самые старые эмоуты если очередь заполнена
        while (state.activeEmotes.length >= state.maxEmoteSlots) {
            const oldest = state.activeEmotes.shift();
            if (oldest && oldest.id !== emote.id) {
                log(`Удаление: ${oldest.name}...`, 'info');
                try {
                    await removeEmoteFromSet(oldest.id);
                } catch (e) {
                    log(`Не удалось удалить ${oldest.name}: ${e.message}`, 'warning');
                }
            }
        }

        // Убираем дубликат из очереди если уже есть
        state.activeEmotes = state.activeEmotes.filter(e => e.id !== emote.id);

        // Добавляем новый
        log(`Добавление: ${emote.name}...`, 'info');
        await addEmoteToSetAPI(emote.id, emote.name);

        state.activeEmotes.push({ id: emote.id, name: emote.name });
        saveState();

        log(`Эмоут "${emote.name}" добавлен! (${state.activeEmotes.length}/${state.maxEmoteSlots})`, 'success');
        await loadEmoteSet();
        updateActiveEmotesDisplay();

        return true;
    } catch (err) {
        log(`Ошибка: ${err.message}`, 'error');
        return false;
    }
}

function updateActiveEmotesDisplay() {
    const section = document.getElementById('active-emote');
    const container = document.getElementById('active-emote-container');

    if (state.activeEmotes.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    container.innerHTML = state.activeEmotes.map((emote, i) => `
        <div class="active-emote-item">
            <img src="https://cdn.7tv.app/emote/${emote.id}/2x.webp" alt="${emote.name}">
            <div class="emote-info">
                <h4>${emote.name}</h4>
                <p>${i === 0 && state.activeEmotes.length >= state.maxEmoteSlots ? 'Следующий на удаление' : `Слот ${i + 1}/${state.maxEmoteSlots}`}</p>
            </div>
        </div>
    `).join('');
}

// ==================== 7TV GQL API ====================

const SEVENTV_GQL_MUTATION = `
mutation ChangeEmoteInSet($id: ObjectID!, $action: ListItemAction!, $emote_id: ObjectID!, $name: String) {
    emoteSet(id: $id) {
        emotes(id: $emote_id, action: $action, name: $name) {
            id
            name
        }
    }
}`;

async function addEmoteToSetAPI(emoteId, emoteName) {
    const res = await fetch(`${CONFIG.SERVER_URL}/api/7tv/gql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: SEVENTV_GQL_MUTATION,
            variables: {
                id: state.emoteSetId,
                action: 'ADD',
                emote_id: emoteId,
                name: emoteName || null
            },
            seventvToken: state.seventvToken
        })
    });

    const data = await res.json();
    if (!res.ok || data.error) {
        throw new Error(data.error || 'Ошибка добавления эмоута');
    }
    return data;
}

async function removeEmoteFromSet(emoteId) {
    const res = await fetch(`${CONFIG.SERVER_URL}/api/7tv/gql`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: SEVENTV_GQL_MUTATION,
            variables: {
                id: state.emoteSetId,
                action: 'REMOVE',
                emote_id: emoteId
            },
            seventvToken: state.seventvToken
        })
    });

    const data = await res.json();
    if (!res.ok || data.error) {
        throw new Error(data.error || 'Ошибка удаления эмоута');
    }
    return data;
}

// ==================== НАГРАДЫ ====================

async function loadChannelRewards() {
    try {
        const res = await fetch(
            `${CONFIG.SERVER_URL}/api/twitch/rewards?token=${state.twitchToken}&broadcasterId=${state.broadcasterId}`
        );
        if (!res.ok) throw new Error('Ошибка загрузки наград');

        const data = await res.json();
        const rewards = data.data || [];

        const listSection = document.getElementById('rewards-list');
        const container = document.getElementById('rewards-container');
        container.innerHTML = '';

        if (rewards.length === 0) {
            listSection.style.display = 'none';
        } else {
            listSection.style.display = 'block';
            rewards.forEach(reward => {
                const el = document.createElement('div');
                el.className = 'reward-item clickable';
                if (state.rewardId === reward.id) el.classList.add('selected');
                el.innerHTML = `
                    <div class="reward-info">
                        <h4>${reward.title}</h4>
                        <p>${reward.is_enabled ? 'Активна' : 'Неактивна'}${reward.is_user_input_required ? ' | Требует ввод' : ''}</p>
                    </div>
                    <span class="reward-cost">${reward.cost} pts</span>
                `;
                el.addEventListener('click', () => selectReward(reward));
                container.appendChild(el);
            });
            log(`Наград: ${rewards.length}`, 'info');
        }

        // Если уже есть выбранная награда — показать и запустить слушатель
        if (state.rewardId) {
            const selected = rewards.find(r => r.id === state.rewardId);
            if (selected) {
                showSelectedReward(selected);
                startRewardListener();
            }
        }
    } catch (err) {
        log(`Ошибка наград: ${err.message}`, 'error');
    }
}

function selectReward(reward) {
    state.rewardId = reward.id;
    saveState();

    // Обновляем выделение
    document.querySelectorAll('#rewards-container .reward-item').forEach(el => {
        el.classList.toggle('selected', el.querySelector('.reward-info h4')?.textContent === reward.title);
    });

    showSelectedReward(reward);
    startRewardListener();

    log(`Отслеживание награды: "${reward.title}"`, 'success');
}

function showSelectedReward(reward) {
    const section = document.getElementById('selected-reward-info');
    section.style.display = 'block';
    document.getElementById('selected-reward-container').innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
                <h4 style="color:var(--text-primary);margin-bottom:2px;">${reward.title}</h4>
                <p style="color:var(--text-muted);font-size:0.8rem;">ID: ${reward.id}</p>
            </div>
            <span class="reward-cost">${reward.cost} pts</span>
        </div>
    `;
}

async function handleCreateReward() {
    const title = document.getElementById('reward-title').value.trim();
    const cost = parseInt(document.getElementById('reward-cost').value);
    const prompt = document.getElementById('reward-prompt').value.trim();

    if (!title) { log('Введите название награды', 'warning'); return; }
    if (cost < 1) { log('Стоимость > 0', 'warning'); return; }

    try {
        const res = await fetch(`${CONFIG.SERVER_URL}/api/twitch/rewards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: state.twitchToken,
                broadcasterId: state.broadcasterId,
                title,
                cost,
                prompt,
                is_user_input_required: true
            })
        });

        if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            if (errData.error && errData.error.includes('DUPLICATE_REWARD')) {
                log(`Награда "${title}" уже существует — выберите её из списка ниже`, 'warning');
                await loadChannelRewards();
                return;
            }
            throw new Error(errData.error || 'Ошибка создания награды');
        }

        const data = await res.json();
        state.rewardId = data.data[0].id;
        saveState();

        log(`Награда "${title}" создана (${cost} pts)`, 'success');
        await loadChannelRewards();
        startRewardListener();
    } catch (err) {
        log(`Ошибка: ${err.message}`, 'error');
    }
}

// ==================== СЛУШАТЕЛЬ НАГРАД ====================

let pollingInterval = null;
let isPolling = false;
const processedRedemptions = new Set();

function startRewardListener() {
    if (pollingInterval) clearInterval(pollingInterval);
    isPolling = false;
    processedRedemptions.clear();
    log('Слушатель наград запущен', 'info');
    pollingInterval = setInterval(checkNewRedemptions, 5000);
}

async function checkNewRedemptions() {
    if (!state.rewardId || !state.twitchToken) return;
    if (isPolling) return;

    isPolling = true;
    try {
        const res = await fetch(
            `${CONFIG.SERVER_URL}/api/twitch/rewards/redemptions?token=${state.twitchToken}&broadcasterId=${state.broadcasterId}&rewardId=${state.rewardId}`
        );
        if (!res.ok) return;

        const data = await res.json();
        const redemptions = data.data || [];

        for (const r of redemptions) {
            if (processedRedemptions.has(r.id)) continue;
            processedRedemptions.add(r.id);
            await processRedemption(r);
        }
    } catch (_) {
        // тихий polling
    } finally {
        isPolling = false;
    }
}

async function processRedemption(redemption) {
    const userName = redemption.user_name || redemption.user?.display_name || 'Unknown';
    const userInput = (redemption.user_input || '').trim();

    log(`${userName} активировал награду!`, 'success');

    if (!userInput) {
        log(`${userName}: нет ссылки на эмоут`, 'warning');
        await sendChatNotification(userName, null, false, 'Не указана ссылка на эмоут');
        await markRedemptionStatus(redemption.id, 'CANCELED');
        return;
    }

    const emoteId = extractEmoteIdFromUrl(userInput);
    if (!emoteId) {
        log(`Неверная ссылка: "${userInput}"`, 'error');
        await sendChatNotification(userName, null, false, 'Неверная ссылка');
        await markRedemptionStatus(redemption.id, 'CANCELED');
        return;
    }

    try {
        const emote = await getEmoteById(emoteId);
        if (!emote) {
            log(`Эмоут ${emoteId} не найден`, 'error');
            await sendChatNotification(userName, null, false, 'Эмоут не найден');
            await markRedemptionStatus(redemption.id, 'CANCELED');
            return;
        }

        log(`Найден: ${emote.name}`, 'info');

        const success = await addEmoteToSet(emote);

        if (success) {
            await sendChatNotification(userName, emote.name, true);
            await markRedemptionStatus(redemption.id, 'FULFILLED');
        } else {
            await sendChatNotification(userName, emote.name, false, 'Ошибка добавления');
            await markRedemptionStatus(redemption.id, 'CANCELED');
        }
    } catch (err) {
        log(`Ошибка обработки: ${err.message}`, 'error');
        await sendChatNotification(userName, null, false, err.message);
        await markRedemptionStatus(redemption.id, 'CANCELED');
    }
}

// ==================== ЧАТ ====================

async function sendChatNotification(userName, emoteName, success, reason) {
    if (!state.sendChatMessages) return;

    let message;
    if (success) {
        message = `[7TV] Эмоут "${emoteName}" добавлен по запросу ${userName}!`;
    } else {
        message = `[7TV] Не удалось добавить эмоут для ${userName}.`;
        if (reason) message += ` Причина: ${reason}`;
    }

    try {
        await fetch(`${CONFIG.SERVER_URL}/api/twitch/chat/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: state.twitchToken,
                broadcasterId: state.broadcasterId,
                senderId: state.userId,
                message
            })
        });
        log(`Чат: ${message}`, 'info');
    } catch (err) {
        log(`Ошибка отправки в чат: ${err.message}`, 'warning');
    }
}

// ==================== УТИЛИТЫ ====================

function extractEmoteIdFromUrl(url) {
    try {
        if (!url.includes('://')) return url.trim() || null;
        const pathname = new URL(url).pathname;
        const match = pathname.match(/\/emotes\/([a-zA-Z0-9]+)/);
        return match ? match[1] : null;
    } catch {
        return url.trim() || null;
    }
}

async function getEmoteById(emoteId) {
    try {
        const res = await fetch(`${CONFIG.SEVENTV_API_BASE}/emotes/${emoteId}`);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

async function markRedemptionStatus(redemptionId, status) {
    try {
        await fetch(`${CONFIG.SERVER_URL}/api/twitch/rewards/redemptions`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: state.twitchToken,
                broadcasterId: state.broadcasterId,
                rewardId: state.rewardId,
                redemptionId,
                status
            })
        });
        log(`Статус награды: ${status}`, 'info');
    } catch (err) {
        log(`Ошибка статуса: ${err.message}`, 'error');
    }
}

// ==================== ОТСЧЁТ ====================

function startCountdown() {
    // Дедлайн — 1 месяц от запуска (28 марта 2026)
    const deadline = new Date('2026-03-28T23:59:59');
    const timerEl = document.getElementById('countdown-timer');

    function update() {
        const now = new Date();
        const diff = deadline - now;

        if (diff <= 0) {
            timerEl.textContent = 'Время вышло!';
            timerEl.style.color = 'var(--red)';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerEl.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;

        if (days <= 3) {
            timerEl.style.color = 'var(--red)';
        } else if (days <= 7) {
            timerEl.style.color = 'var(--yellow)';
        }
    }

    update();
    setInterval(update, 1000);
}
