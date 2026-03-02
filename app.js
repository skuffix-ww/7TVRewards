// ==================== КОНФИГУРАЦИЯ ====================

const CONFIG = {
    SERVER_URL: window.location.origin,
    TWITCH_CLIENT_ID: atob('Y3BheHZvc3czcXdsc3YzeDhhOHd1eHUyamwwZzho'),
    TWITCH_REDIRECT_URI: 'https://7tvrewards-production.up.railway.app',
    SEVENTV_API_BASE: 'https://7tv.io/v3',
    SCOPES: 'channel:manage:redemptions user:read:email user:write:chat'
};

const EMOTES_PER_PAGE = 24;
const REWARDS_PER_PAGE = 5;

// ==================== ПЕРЕВОДЫ ====================

const TRANSLATIONS = {
    ru: {
        subtitle: 'Twitch Channel Points → 7TV Emotes',
        'auth.title': 'Авторизация',
        'auth.login': 'Войти через Twitch',
        'auth.logout': 'Выйти',
        'auth.role': 'Стример',
        'seventv.title': '7TV Настройки',
        'seventv.token.label': 'Токен 7TV',
        'seventv.token.save': 'Сохранить',
        'seventv.set.label': 'Набор эмоутов',
        'seventv.set.first': 'Сначала авторизуйтесь',
        'seventv.set.manual': 'Или введите ID набора вручную',
        'seventv.set.placeholder': 'ID набора эмоутов',
        'seventv.set.load': 'Загрузить',
        'seventv.emotes.title': 'Эмоуты в наборе',
        'seventv.filter.placeholder': 'Фильтр по названию...',
        'seventv.sort.default': 'По умолчанию',
        'seventv.sort.asc': 'А → Я',
        'seventv.sort.desc': 'Я → А',
        'reward.title': 'Награда канала',
        'reward.name': 'Название',
        'reward.cost': 'Стоимость',
        'reward.desc': 'Описание награды',
        'reward.chat.toggle': 'Отправлять сообщение в чат о результате',
        'reward.toast.toggle': 'Показывать всплывающие уведомления',
        'reward.slots.label': 'Слотов эмоутов',
        'reward.slots.unlimited': 'Без ограничений',
        'reward.slots.hint': 'Сколько эмоутов хранить до удаления старых',
        'reward.slots.hint.unlimited': 'Эмоуты накапливаются без удаления',
        'reward.create': 'Создать награду',
        'reward.existing': 'Существующие награды',
        'reward.existing.hint': '(нажмите, чтобы выбрать для отслеживания)',
        'reward.tracked': 'Отслеживаемая награда',
        'emote.search.title': 'Поиск эмоутов',
        'emote.search.placeholder': 'Название эмоута...',
        'emote.search.btn': 'Найти',
        'emote.active': 'Активные эмоуты',
        'dash.title': 'Дашборд',
        'dash.clear': 'Очистить историю',
        'dash.history': 'История',
        'dash.stats': 'Статистика',
        'dash.search': 'Поиск по имени или эмоуту...',
        'dash.pts': 'Баллов потрачено',
        'dash.emotes': 'Эмоутов добавлено',
        'dash.users': 'Уникальных зрителей',
        'dash.top': 'Топ зрителей',
        'log.title': 'Лог событий',
        'log.clear': 'Очистить',
        'log.filter': 'Фильтр лога...',
        'ts.title': 'Не работает 7TV?',
        'info.title': 'О приложении',
        'info.desc': 'Автоматическая замена 7TV эмоутов через награды канала Twitch. Зрители покупают эмоуты за баллы канала — система добавляет их в набор.',
        'info.dev': 'Разработка',
        'info.for': 'Сделано для',
        'info.thanks': 'Спасибки',
        'info.other': 'Другие интересные проекты',
        'info.other.note': 'не мои',
        'info.donate': 'Поддержать проект:',
        'changelog.title': 'Патч-ноуты',
        'settings.language': 'Язык / Language',
        'auth.status.ok': 'Авторизован',
        'auth.status.not': 'Не авторизован',
        'seventv.status.ok': 'Подключено',
        'seventv.status.not': 'Не найден',
        'seventv.status.error': 'Ошибка',
        'seventv.set.fail': 'Не удалось загрузить',
        'token.empty': 'Токен пуст',
        'token.saved': 'Токен сохранён',
        'token.saved.warn': 'Токен сохранён (не удалось проверить)',
        'nodata.history': 'История пуста',
        'nodata.search': 'Ничего не найдено',
        'log.waiting': 'Ожидание авторизации...',
        'banner.support': 'Мотивация и оплата серверов:',
        'cl.new': 'Новое',
        'cl.fix': 'Исправление',
        'cl.change': 'Изменение',
        'cl.info': 'Инфо',
        'seventv.status.init': 'Не подключено',
        'seventv.token.placeholder': 'Вставьте ваш 7TV токен',
        'token.hint': 'Откройте <a href="https://7tv.app" target="_blank">7tv.app</a>, залогиньтесь → F12 → Network → обновите страницу → найдите любой запрос к <code>7tv.io</code> → скопируйте значение заголовка <code>Authorization</code> (без "Bearer ")',
        'reward.prompt.placeholder': 'Текст, который увидят зрители при активации награды',
    },
    en: {
        subtitle: 'Twitch Channel Points → 7TV Emotes',
        'auth.title': 'Authorization',
        'auth.login': 'Login with Twitch',
        'auth.logout': 'Logout',
        'auth.role': 'Streamer',
        'seventv.title': '7TV Settings',
        'seventv.token.label': '7TV Token',
        'seventv.token.save': 'Save',
        'seventv.set.label': 'Emote Set',
        'seventv.set.first': 'Authorize first',
        'seventv.set.manual': 'Or enter set ID manually',
        'seventv.set.placeholder': 'Emote set ID',
        'seventv.set.load': 'Load',
        'seventv.emotes.title': 'Emotes in set',
        'seventv.filter.placeholder': 'Filter by name...',
        'seventv.sort.default': 'Default',
        'seventv.sort.asc': 'A → Z',
        'seventv.sort.desc': 'Z → A',
        'reward.title': 'Channel Reward',
        'reward.name': 'Name',
        'reward.cost': 'Cost',
        'reward.desc': 'Reward description',
        'reward.chat.toggle': 'Send chat message on result',
        'reward.toast.toggle': 'Show toast notifications',
        'reward.slots.label': 'Emote slots',
        'reward.slots.unlimited': 'Unlimited',
        'reward.slots.hint': 'How many emotes to keep before removing oldest',
        'reward.slots.hint.unlimited': 'Emotes accumulate without deletion',
        'reward.create': 'Create reward',
        'reward.existing': 'Existing rewards',
        'reward.existing.hint': '(click to select for tracking)',
        'reward.tracked': 'Tracked reward',
        'emote.search.title': 'Emote Search',
        'emote.search.placeholder': 'Emote name...',
        'emote.search.btn': 'Find',
        'emote.active': 'Active emotes',
        'dash.title': 'Dashboard',
        'dash.clear': 'Clear history',
        'dash.history': 'History',
        'dash.stats': 'Statistics',
        'dash.search': 'Search by name or emote...',
        'dash.pts': 'Points spent',
        'dash.emotes': 'Emotes added',
        'dash.users': 'Unique viewers',
        'dash.top': 'Top viewers',
        'log.title': 'Event Log',
        'log.clear': 'Clear',
        'log.filter': 'Filter log...',
        'ts.title': '7TV not working?',
        'info.title': 'About',
        'info.desc': 'Automatic 7TV emote replacement via Twitch channel rewards. Viewers buy emotes with channel points — the system adds them to the set.',
        'info.dev': 'Development',
        'info.for': 'Made for',
        'info.thanks': 'Credits',
        'info.other': 'Other interesting projects',
        'info.other.note': 'not mine',
        'info.donate': 'Support the project:',
        'changelog.title': 'Patch Notes',
        'settings.language': 'Язык / Language',
        'auth.status.ok': 'Authorized',
        'auth.status.not': 'Not authorized',
        'seventv.status.ok': 'Connected',
        'seventv.status.not': 'Not found',
        'seventv.status.error': 'Error',
        'seventv.set.fail': 'Failed to load',
        'token.empty': 'Token empty',
        'token.saved': 'Token saved',
        'token.saved.warn': 'Token saved (could not verify)',
        'nodata.history': 'History empty',
        'nodata.search': 'Nothing found',
        'log.waiting': 'Waiting for authorization...',
        'banner.support': 'Motivation and server costs:',
        'cl.new': 'New',
        'cl.fix': 'Fix',
        'cl.change': 'Change',
        'cl.info': 'Info',
        'seventv.status.init': 'Not connected',
        'seventv.token.placeholder': 'Paste your 7TV token',
        'token.hint': 'Open <a href="https://7tv.app" target="_blank">7tv.app</a>, log in → F12 → Network → refresh the page → find any request to <code>7tv.io</code> → copy the <code>Authorization</code> header value (without "Bearer ")',
        'reward.prompt.placeholder': 'Text that viewers will see when activating the reward',
    }
};

// ==================== СОСТОЯНИЕ ====================

const state = {
    twitchToken: null,
    userId: null,
    broadcasterId: null,
    emoteSetId: null,
    activeEmotes: [],       // очередь добавленных эмоутов [{id, name}, ...]
    maxEmoteSlots: 1,       // сколько эмоутов можно добавить до удаления старых
    slotsDisabled: false,   // если true — удалять старые эмоуты не надо
    rewardId: null,
    seventvToken: null,
    sendChatMessages: true,
    // pagination
    allSetEmotes: [],
    setEmotePage: 1,
    setEmoteFilter: '',
    searchQuery: '',
    searchPage: 1,
    searchHasMore: false,
    rewardsPage: 1,
    allRewards: [],
    // beta v2.0.0β
    betaEnabled: false,
    rewardCost: 0,
    emoteHistory: [],        // [{id, userId, userName, emoteId, emoteName, timestamp, cost}] — cap 500
    userModeration: {},      // {userId: {type:'ban'|'mute'|'block', until:timestamp|null, name:string}}
    // v1.5.0
    toastEnabled: true,
    // v1.5.1
    setEmoteSort: 'default',
    // v1.5.2
    language: 'ru',
    // v1.5.3 advanced mode chat messages (empty = use default)
    chatMsgSuccess: '',
    chatMsgFail: '',
    chatMsgDuplicate: ''
};

let sessionCount = 0; // сбрасывается при перезагрузке, не сохраняется

// ==================== ИНИЦИАЛИЗАЦИЯ ====================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyTranslations();
    initListeners();
    checkAuth();
    startFloatingEmotes();
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
        if (state.toastEnabled !== undefined) {
            document.getElementById('toast-toggle').checked = state.toastEnabled;
        }
        if (!state.language) state.language = 'ru';
        // Миграция: activeEmote → activeEmotes
        if (state.activeEmote && !state.activeEmotes?.length) {
            state.activeEmotes = [state.activeEmote];
            delete state.activeEmote;
        }
        if (!Array.isArray(state.activeEmotes)) state.activeEmotes = [];
        if (!state.maxEmoteSlots) state.maxEmoteSlots = 1;
        document.getElementById('max-emote-slots').value = state.maxEmoteSlots;
        if (state.slotsDisabled) {
            document.getElementById('slots-unlimited').checked = true;
            document.getElementById('max-emote-slots').disabled = true;
        }
        // Beta state
        if (!Array.isArray(state.emoteHistory)) state.emoteHistory = [];
        if (!state.userModeration || typeof state.userModeration !== 'object') state.userModeration = {};
        if (state.betaEnabled) {
            applyVersionDisplay('v2.0.0β');
            document.getElementById('dashboard-section').style.display = 'block';
            updateBetaButton(true);
            renderDashboard();
        }
        // v1.5.3 — populate advanced mode inputs
        if (state.chatMsgSuccess) {
            const el = document.getElementById('chat-msg-success');
            if (el) el.value = state.chatMsgSuccess;
        }
        if (state.chatMsgFail) {
            const el = document.getElementById('chat-msg-fail');
            if (el) el.value = state.chatMsgFail;
        }
        if (state.chatMsgDuplicate) {
            const el = document.getElementById('chat-msg-duplicate');
            if (el) el.value = state.chatMsgDuplicate;
        }
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
        slotsDisabled: state.slotsDisabled,
        rewardId: state.rewardId,
        seventvToken: state.seventvToken,
        sendChatMessages: state.sendChatMessages,
        toastEnabled: state.toastEnabled,
        language: state.language,
        // beta
        betaEnabled: state.betaEnabled,
        rewardCost: state.rewardCost,
        emoteHistory: state.emoteHistory,
        userModeration: state.userModeration,
        // v1.5.3
        chatMsgSuccess: state.chatMsgSuccess,
        chatMsgFail: state.chatMsgFail,
        chatMsgDuplicate: state.chatMsgDuplicate
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
    document.getElementById('emote-set-filter').addEventListener('input', (e) => {
        state.setEmoteFilter = e.target.value;
        state.setEmotePage = 1;
        renderSetEmotesPage();
    });
    document.getElementById('emote-set-sort').addEventListener('change', (e) => {
        state.setEmoteSort = e.target.value;
        renderSetEmotesPage();
    });

    // Scroll top
    const btnScrollTop = document.getElementById('btn-scroll-top');
    window.addEventListener('scroll', () => {
        btnScrollTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    btnScrollTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Log filter
    document.getElementById('log-filter').addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        document.querySelectorAll('#event-log .log-entry').forEach(entry => {
            entry.style.display = entry.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
    });

    // Rewards
    document.getElementById('btn-create-reward').addEventListener('click', handleCreateReward);
    document.getElementById('send-chat-messages').addEventListener('change', (e) => {
        state.sendChatMessages = e.target.checked;
        saveState();
    });
    document.getElementById('toast-toggle').addEventListener('change', (e) => {
        state.toastEnabled = e.target.checked;
        saveState();
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.language = btn.dataset.lang;
            saveState();
            applyTranslations();
        });
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
    document.getElementById('slots-unlimited').addEventListener('change', (e) => {
        state.slotsDisabled = e.target.checked;
        document.getElementById('max-emote-slots').disabled = e.target.checked;
        document.getElementById('slots-hint').textContent = e.target.checked
            ? t('reward.slots.hint.unlimited')
            : t('reward.slots.hint');
        saveState();
        log(e.target.checked ? 'Слоты отключены — эмоуты без ограничений' : `Слоты включены: ${state.maxEmoteSlots}`, 'info');
        updateActiveEmotesDisplay();
    });

    // Advanced Mode toggle
    document.getElementById('btn-advanced-toggle').addEventListener('click', () => {
        const content = document.getElementById('advanced-mode-content');
        const arrow = document.querySelector('#btn-advanced-toggle .advanced-arrow');
        const isOpen = content.classList.contains('open');
        content.classList.toggle('open');
        arrow.textContent = isOpen ? '▼' : '▲';
    });
    // Advanced Mode inputs
    const advancedInputs = { 'chat-msg-success': 'chatMsgSuccess', 'chat-msg-fail': 'chatMsgFail', 'chat-msg-duplicate': 'chatMsgDuplicate' };
    Object.entries(advancedInputs).forEach(([id, key]) => {
        document.getElementById(id).addEventListener('input', (e) => {
            state[key] = e.target.value;
            saveState();
        });
    });

    // Search
    document.getElementById('btn-search-emote').addEventListener('click', () => handleSearchEmote(true));
    document.getElementById('emote-search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearchEmote(true);
    });

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

    // Collapsible v2.0.0β entry
    document.getElementById('cl-toggle-beta').addEventListener('click', () => {
        document.getElementById('cl-body-beta').classList.toggle('collapsed');
        document.getElementById('cl-entry-beta').classList.toggle('cl-collapsed');
    });

    // Version archive
    const versionArchiveModal = document.getElementById('version-archive-modal');
    document.getElementById('btn-version-archive').addEventListener('click', () => {
        document.getElementById('info-modal').style.display = 'none';
        renderVersionArchive();
        versionArchiveModal.style.display = 'flex';
    });
    document.getElementById('btn-close-version-archive').addEventListener('click', () => {
        versionArchiveModal.style.display = 'none';
    });
    versionArchiveModal.addEventListener('click', (e) => {
        if (e.target === versionArchiveModal) versionArchiveModal.style.display = 'none';
    });

    // Beta modal
    const betaModal = document.getElementById('beta-modal');
    document.getElementById('btn-close-beta-modal').addEventListener('click', () => {
        betaModal.style.display = 'none';
    });
    betaModal.addEventListener('click', (e) => {
        if (e.target === betaModal) betaModal.style.display = 'none';
    });
    document.getElementById('btn-beta-activate').addEventListener('click', () => {
        activateBeta(false);
    });
    document.getElementById('btn-beta-reauth').addEventListener('click', () => {
        activateBeta(true);
    });

    // Beta info modal (WIP) - click on changelog badge
    const betaInfoModal = document.getElementById('beta-info-modal');
    document.querySelector('.badge-clickable')?.addEventListener('click', () => {
        betaInfoModal.style.display = 'flex';
    });
    document.getElementById('btn-close-beta-info').addEventListener('click', () => {
        betaInfoModal.style.display = 'none';
    });
    betaInfoModal.addEventListener('click', (e) => {
        if (e.target === betaInfoModal) betaInfoModal.style.display = 'none';
    });

    // Dashboard tabs
    document.querySelectorAll('.dash-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('dash-' + tab.dataset.tab).classList.add('active');
        });
    });

    // History filter
    document.getElementById('history-filter').addEventListener('input', () => {
        if (state.betaEnabled) renderHistoryTab();
    });

    // Clear history
    document.getElementById('btn-clear-history').addEventListener('click', () => {
        state.emoteHistory = [];
        saveState();
        renderDashboard();
        log('История очищена', 'info');
    });

    // Mod modal
    const modModal = document.getElementById('mod-modal');
    document.getElementById('btn-close-mod-modal').addEventListener('click', () => {
        modModal.style.display = 'none';
    });
    modModal.addEventListener('click', (e) => {
        if (e.target === modModal) modModal.style.display = 'none';
    });

    // History list event delegation for mod buttons
    document.getElementById('history-list').addEventListener('click', handleHistoryClick);

    // Logo easter egg
    document.querySelector('.logo').addEventListener('click', triggerLogoBurst);

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

function showToast(message, type = 'info', duration = 3500, link = null) {
    if (!state.toastEnabled) return;
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    if (link) {
        toast.innerHTML = `<a href="${link}" target="_blank" class="toast-link">${message}</a>`;
    } else {
        toast.textContent = message;
    }
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('toast-visible'));
    setTimeout(() => {
        toast.classList.remove('toast-visible');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);
}

function updateSessionCounter() {
    const el = document.getElementById('session-count');
    if (el) el.textContent = `+${sessionCount}`;
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
    status.textContent = authed ? t('auth.status.ok') : t('auth.status.not');
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
        statusEl.innerHTML = `<span class="badge badge-warning">${t('token.empty')}</span>`;
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
        statusEl.innerHTML = `<span class="badge badge-success">${t('token.saved')}</span>`;
        log('Токен 7TV сохранён и проверен', 'success');
    } catch (err) {
        statusEl.innerHTML = `<span class="badge badge-warning">${t('token.saved.warn')}</span>`;
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
        stvStatus.textContent = t('seventv.status.ok');
        stvStatus.className = 'badge badge-success';

        log(`7TV: найдено ${emoteSets.length || 1} наборов`, 'success');
    } catch (err) {
        select.innerHTML = `<option value="">${t('seventv.set.fail')}</option>`;
        select.disabled = true;

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = t('seventv.status.not');
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

    container.innerHTML = '<div class="no-data"><span class="loader"></span></div>';
    section.style.display = 'block';

    try {
        const res = await fetch(`${CONFIG.SEVENTV_API_BASE}/emote-sets/${state.emoteSetId}`);
        if (!res.ok) throw new Error('Набор не найден');

        const data = await res.json();
        state.allSetEmotes = data.emotes || [];
        state.setEmotePage = 1;

        countBadge.textContent = state.allSetEmotes.length;
        renderSetEmotesPage();
        updateActiveEmotesDisplay();

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = t('seventv.status.ok');
        stvStatus.className = 'badge badge-success';

        log(`Загружено ${state.allSetEmotes.length} эмоутов`, 'success');
    } catch (err) {
        container.innerHTML = `<div class="no-data">Ошибка: ${err.message}</div>`;
        document.getElementById('emotes-pagination').style.display = 'none';

        const stvStatus = document.getElementById('seventv-status');
        stvStatus.textContent = t('seventv.status.error');
        stvStatus.className = 'badge badge-error';

        log(`Ошибка загрузки набора: ${err.message}`, 'error');
    }
}

function renderSetEmotesPage() {
    const container = document.getElementById('emotes-container');
    const paginationEl = document.getElementById('emotes-pagination');
    const filter = state.setEmoteFilter.toLowerCase().trim();

    let emotes = filter
        ? state.allSetEmotes.filter(e => e.name.toLowerCase().includes(filter))
        : [...state.allSetEmotes];

    if (state.setEmoteSort === 'asc') emotes.sort((a, b) => a.name.localeCompare(b.name));
    else if (state.setEmoteSort === 'desc') emotes.sort((a, b) => b.name.localeCompare(a.name));

    const totalPages = Math.max(1, Math.ceil(emotes.length / EMOTES_PER_PAGE));
    if (state.setEmotePage > totalPages) state.setEmotePage = totalPages;

    const start = (state.setEmotePage - 1) * EMOTES_PER_PAGE;
    container.innerHTML = '';

    if (emotes.length === 0) {
        container.innerHTML = '<div class="no-data">' + (filter ? 'Нет совпадений' : 'Нет эмоутов в наборе') + '</div>';
    } else {
        emotes.slice(start, start + EMOTES_PER_PAGE).forEach(emote => container.appendChild(createEmoteElement(emote, false, true)));
    }

    renderPagination(paginationEl, state.setEmotePage, totalPages, (page) => {
        state.setEmotePage = page;
        renderSetEmotesPage();
    });
}

function renderPagination(container, currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) {
        container.style.display = 'none';
        return;
    }
    container.style.display = 'flex';

    const parts = [];
    const win = 2;
    const lo = Math.max(1, currentPage - win);
    const hi = Math.min(totalPages, currentPage + win);

    if (lo > 1) parts.push(1);
    if (lo > 2) parts.push('…');
    for (let i = lo; i <= hi; i++) parts.push(i);
    if (hi < totalPages - 1) parts.push('…');
    if (hi < totalPages) parts.push(totalPages);

    container.innerHTML =
        `<button class="page-btn" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}>‹</button>` +
        parts.map(p => p === '…'
            ? `<span class="page-ellipsis">…</span>`
            : `<button class="page-btn${p === currentPage ? ' active' : ''}" data-page="${p}">${p}</button>`
        ).join('') +
        `<button class="page-btn" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}>›</button>`;

    container.querySelectorAll('.page-btn:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => onPageChange(parseInt(btn.dataset.page)));
    });
}

function createEmoteElement(emote, clickable, deletable = false) {
    const el = document.createElement('div');
    el.className = `emote-item${clickable ? ' clickable' : ''}${deletable ? ' deletable' : ''}`;
    el.innerHTML = `
        <img src="https://cdn.7tv.app/emote/${emote.id}/2x.webp" alt="${emote.name}" loading="lazy">
        <span class="emote-name">${emote.name}</span>
        ${deletable ? '<button class="emote-delete-btn" title="Удалить из набора">✕</button>' : ''}
    `;
    if (clickable) {
        el.addEventListener('click', () => selectEmote(emote));
    }
    if (deletable) {
        el.addEventListener('click', (e) => {
            if (!e.target.closest('.emote-delete-btn')) {
                window.open(`https://7tv.app/emotes/${emote.id}`, '_blank');
            }
        });
        el.querySelector('.emote-delete-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            try {
                await removeEmoteFromSet(emote.id);
                state.activeEmotes = state.activeEmotes.filter(ae => ae.id !== emote.id);
                state.allSetEmotes = state.allSetEmotes.filter(ae => ae.id !== emote.id);
                saveState();
                renderSetEmotesPage();
                document.getElementById('emotes-count').textContent = state.allSetEmotes.length;
                log(`Эмоут "${emote.name}" удалён вручную`, 'info');
                showToast(`Эмоут "${emote.name}" удалён`, 'success');
            } catch (err) {
                log(`Ошибка удаления: ${err.message}`, 'error');
                showToast(`Ошибка: ${err.message}`, 'error');
            }
        });
    }
    return el;
}

// ==================== ПОИСК ЭМОУТОВ ====================

async function handleSearchEmote(newSearch) {
    const input = document.getElementById('emote-search');
    const container = document.getElementById('search-results');
    const paginationEl = document.getElementById('search-pagination');

    if (newSearch) {
        const query = input.value.trim();
        if (!query) {
            log('Введите название для поиска', 'warning');
            return;
        }
        state.searchQuery = query;
        state.searchPage = 1;
    }

    container.innerHTML = '<div class="no-data"><span class="loader"></span></div>';
    paginationEl.style.display = 'none';

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

        container.innerHTML = '';

        if (emotes.length === 0 && state.searchPage === 1) {
            container.innerHTML = `<div class="no-data">${t('nodata.search')}</div>`;
        } else {
            emotes.forEach(emote => container.appendChild(createEmoteElement(emote, true)));

            state.searchHasMore = emotes.length >= EMOTES_PER_PAGE;
            const hasPrev = state.searchPage > 1;
            const hasNext = state.searchHasMore;

            if (hasPrev || hasNext) {
                paginationEl.style.display = 'flex';
                paginationEl.innerHTML =
                    `<button class="page-btn" id="s-prev" ${!hasPrev ? 'disabled' : ''}>‹</button>` +
                    `<span class="page-btn active" style="cursor:default;min-width:40px;">${state.searchPage}</span>` +
                    `<button class="page-btn" id="s-next" ${!hasNext ? 'disabled' : ''}>›</button>`;

                if (hasPrev) paginationEl.querySelector('#s-prev').addEventListener('click', () => {
                    state.searchPage--;
                    handleSearchEmote(false);
                });
                if (hasNext) paginationEl.querySelector('#s-next').addEventListener('click', () => {
                    state.searchPage++;
                    handleSearchEmote(false);
                });
            }

            if (newSearch) log(`Найдено: ${emotes.length}${state.searchHasMore ? '+' : ''}`, 'success');
        }
    } catch (err) {
        log(`Ошибка поиска: ${err.message}`, 'error');
        container.innerHTML = '<div class="no-data">Ошибка поиска</div>';
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

    // Обновляем набор перед проверкой дубликатов
    try {
        const freshRes = await fetch(`${CONFIG.SEVENTV_API_BASE}/emote-sets/${state.emoteSetId}`);
        if (freshRes.ok) {
            const freshData = await freshRes.json();
            state.allSetEmotes = freshData.emotes || [];
        }
    } catch (_) { /* используем кэш */ }

    // Проверка дубликатов в наборе
    const duplicateById = state.allSetEmotes.find(e => e.id === emote.id);
    if (duplicateById) {
        log(`Эмоут "${emote.name}" уже есть в наборе!`, 'warning');
        return 'duplicate';
    }

    try {
        // Удаляем самые старые эмоуты если очередь заполнена (и слоты включены)
        if (!state.slotsDisabled) {
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
        }

        // Убираем дубликат из очереди если уже есть
        state.activeEmotes = state.activeEmotes.filter(e => e.id !== emote.id);

        // Добавляем новый — с ретраем при конфликте имён
        log(`Добавление: ${emote.name}...`, 'info');
        let addedName = emote.name;
        let success = false;

        for (let attempt = 0; attempt < 5; attempt++) {
            const nameToUse = attempt === 0 ? emote.name : `${emote.name}_${attempt + 1}`;
            try {
                await addEmoteToSetAPI(emote.id, nameToUse);
                addedName = nameToUse;
                success = true;
                break;
            } catch (err) {
                if (err.message && err.message.includes('conflicting name') && attempt < 4) {
                    log(`Имя "${nameToUse}" занято, пробую "${emote.name}_${attempt + 2}"...`, 'warning');
                    continue;
                }
                throw err; // другая ошибка или последняя попытка
            }
        }

        if (!success) {
            throw new Error('Не удалось добавить эмоут после нескольких попыток');
        }

        state.activeEmotes.push({ id: emote.id, name: addedName });
        saveState();

        const suffix = addedName !== emote.name ? ` (как "${addedName}")` : '';
        log(`Эмоут "${emote.name}" добавлен${suffix}!${state.slotsDisabled ? '' : ` (${state.activeEmotes.length}/${state.maxEmoteSlots})`}`, 'success');
        showToast(`✦ ${emote.name} добавлен в набор!`, 'success', 3500, `https://7tv.app/emotes/${emote.id}`);
        sessionCount++;
        updateSessionCounter();
        await loadEmoteSet();
        updateActiveEmotesDisplay();

        return true;
    } catch (err) {
        log(`Ошибка: ${err.message}`, 'error');
        showToast(`Ошибка: ${err.message}`, 'error');
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
                <p>${state.slotsDisabled ? `Эмоут ${i + 1}` : (i === 0 && state.activeEmotes.length >= state.maxEmoteSlots ? 'Следующий на удаление' : `Слот ${i + 1}/${state.maxEmoteSlots}`)}</p>
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
        state.allRewards = data.data || [];
        state.rewardsPage = 1;
        renderRewardsPage();

        // Если уже есть выбранная награда — показать и запустить слушатель
        if (state.rewardId) {
            const selected = state.allRewards.find(r => r.id === state.rewardId);
            if (selected) {
                showSelectedReward(selected);
                startRewardListener();
            }
        }
    } catch (err) {
        log(`Ошибка наград: ${err.message}`, 'error');
    }
}

function renderRewardsPage() {
    const listSection = document.getElementById('rewards-list');
    const container = document.getElementById('rewards-container');
    const paginationEl = document.getElementById('rewards-pagination');
    const rewards = state.allRewards;

    if (rewards.length === 0) {
        listSection.style.display = 'none';
        return;
    }

    listSection.style.display = 'block';

    const totalPages = Math.max(1, Math.ceil(rewards.length / REWARDS_PER_PAGE));
    if (state.rewardsPage > totalPages) state.rewardsPage = totalPages;

    const start = (state.rewardsPage - 1) * REWARDS_PER_PAGE;
    const pageRewards = rewards.slice(start, start + REWARDS_PER_PAGE);

    container.innerHTML = '';
    pageRewards.forEach(reward => {
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

    renderPagination(paginationEl, state.rewardsPage, totalPages, (page) => {
        state.rewardsPage = page;
        renderRewardsPage();
    });

    if (state.rewardsPage === 1) log(`Наград: ${rewards.length}`, 'info');
}

function selectReward(reward) {
    state.rewardId = reward.id;
    state.rewardCost = reward.cost;
    saveState();

    renderRewardsPage();
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
        state.rewardCost = cost;
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

    // Проверка модерации
    const mod = state.userModeration[redemption.user_id];
    if (mod) {
        if (mod.type === 'block' || (mod.type === 'ban' && mod.until && Date.now() < mod.until)) {
            log(`${userName} заблокирован — награда отменена`, 'warning');
            await markRedemptionStatus(redemption.id, 'CANCELED');
            return;
        }
        // Убираем истекшие баны
        if (mod.type === 'ban' && mod.until && Date.now() >= mod.until) {
            delete state.userModeration[redemption.user_id];
            saveState();
        }
    }

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

        const result = await addEmoteToSet(emote);

        if (result === true) {
            // Запись в историю
            state.emoteHistory.unshift({
                id: crypto.randomUUID(),
                userId: redemption.user_id,
                userName,
                emoteId: emote.id,
                emoteName: emote.name,
                timestamp: Date.now(),
                cost: state.rewardCost
            });
            if (state.emoteHistory.length > 500) state.emoteHistory.pop();
            saveState();
            if (state.betaEnabled) renderDashboard();

            await sendChatNotification(userName, emote.name, true);
            await markRedemptionStatus(redemption.id, 'FULFILLED');
        } else if (result === 'duplicate') {
            await sendChatNotification(userName, emote.name, false, 'emote_duplicate');
            await markRedemptionStatus(redemption.id, 'CANCELED');
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

    const fill = (tmpl, user, emote) =>
        tmpl.replace(/\{user\}/g, user || '').replace(/\{emote\}/g, emote || '');

    let message;
    if (success) {
        const tmpl = state.chatMsgSuccess || '[7TV] {emote} добавлен по запросу {user}!';
        message = fill(tmpl, userName, emoteName);
    } else if (reason === 'emote_duplicate') {
        const tmpl = state.chatMsgDuplicate || '[7TV] {user}, эмоут {emote} уже есть в наборе!';
        message = fill(tmpl, userName, emoteName);
    } else {
        const tmpl = state.chatMsgFail || '[7TV] Не удалось добавить эмоут для {user}.';
        message = fill(tmpl, userName, emoteName);
        if (reason && reason !== 'Ошибка добавления') message += ` Причина: ${reason}`;
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


// ==================== БЕТА v2.0.0β ====================

function applyVersionDisplay(version) {
    const modalVer = document.getElementById('modal-version');
    const footerVer = document.getElementById('footer-version');
    if (modalVer) modalVer.textContent = version;
    if (footerVer) footerVer.textContent = version;
    document.title = `7TV Emote Rewards — ${version}`;
}

function updateBetaButton(active) {
    // Кнопка теперь в архиве версий, не в changelog
    // Стилизуем иконку архива если бета активна
    const archiveBtn = document.getElementById('btn-version-archive');
    if (archiveBtn) {
        archiveBtn.style.color = active ? 'var(--purple-hover)' : '';
        archiveBtn.style.borderColor = active ? 'var(--purple)' : '';
    }
}

function activateBeta(reauth = false) {
    state.betaEnabled = true;
    saveState();
    applyVersionDisplay('v2.0.0β');
    updateBetaButton(true);
    document.getElementById('dashboard-section').style.display = 'block';
    renderDashboard();
    document.getElementById('beta-modal').style.display = 'none';
    log('Бета v2.0.0β активирована!', 'success');

    if (reauth) {
        // Добавляем channel:moderate и перерегистрируемся
        const scopesWithMod = CONFIG.SCOPES + ' channel:moderate';
        const url = `https://id.twitch.tv/oauth2/authorize` +
            `?client_id=${CONFIG.TWITCH_CLIENT_ID}` +
            `&redirect_uri=${encodeURIComponent(CONFIG.TWITCH_REDIRECT_URI)}` +
            `&response_type=token` +
            `&scope=${encodeURIComponent(scopesWithMod)}`;
        window.location.href = url;
    }
}

function deactivateBeta() {
    state.betaEnabled = false;
    saveState();
    applyVersionDisplay('v1.5.4');
    updateBetaButton(false);
    document.getElementById('dashboard-section').style.display = 'none';
    log('Бета деактивирована', 'info');
}

// ==================== ДАШБОРД ====================

function renderDashboard() {
    renderHistoryTab();
    renderStatsTab();
}

function renderHistoryTab() {
    const container = document.getElementById('history-list');
    const filterVal = (document.getElementById('history-filter')?.value || '').toLowerCase().trim();

    let items = state.emoteHistory;
    if (filterVal) {
        items = items.filter(h =>
            h.userName.toLowerCase().includes(filterVal) ||
            h.emoteName.toLowerCase().includes(filterVal)
        );
    }

    if (items.length === 0) {
        container.innerHTML = `<div class="no-data">${filterVal ? t('nodata.search') : t('nodata.history')}</div>`;
        return;
    }

    container.innerHTML = items.map(entry => {
        const mod = state.userModeration[entry.userId];
        let modBadge = '';
        if (mod) {
            const labels = { ban: 'БАН', mute: 'МУТ', block: 'БЛОК' };
            const classes = { ban: 'mod-badge-ban', mute: 'mod-badge-mute', block: 'mod-badge-block' };
            modBadge = `<span class="mod-badge ${classes[mod.type]}">${labels[mod.type]}</span>`;
        }

        const modButtons = mod
            ? `<div class="mod-actions">
                <button class="btn-mod btn-mod-unmod" data-action="unmod" data-uid="${entry.userId}">Снять</button>
              </div>`
            : `<div class="mod-actions">
                <button class="btn-mod btn-mod-ban" data-action="ban" data-uid="${entry.userId}" data-uname="${entry.userName}">Бан</button>
                <button class="btn-mod btn-mod-mute" data-action="mute" data-uid="${entry.userId}" data-uname="${entry.userName}">Мут</button>
                <button class="btn-mod btn-mod-block" data-action="block" data-uid="${entry.userId}" data-uname="${entry.userName}">Блок</button>
              </div>`;

        return `<div class="history-entry">
            <img src="https://cdn.7tv.app/emote/${entry.emoteId}/2x.webp" alt="${entry.emoteName}" loading="lazy">
            <div class="history-entry-info">
                <span class="emote-name-hist">${entry.emoteName}</span>
                <span class="user-name-hist">${entry.userName}${modBadge}</span>
                <span class="time-hist">${formatRelativeTime(entry.timestamp)}</span>
            </div>
            ${entry.cost ? `<span class="history-cost">${entry.cost} pts</span>` : ''}
            ${modButtons}
        </div>`;
    }).join('');
}

function renderStatsTab() {
    const history = state.emoteHistory;
    const totalPts = history.reduce((sum, h) => sum + (h.cost || 0), 0);
    const totalEmotes = history.length;
    const uniqueUsers = new Set(history.map(h => h.userId)).size;

    document.getElementById('stat-total-pts').textContent = totalPts.toLocaleString();
    document.getElementById('stat-total-emotes').textContent = totalEmotes;
    document.getElementById('stat-unique-users').textContent = uniqueUsers;

    // Лидерборд
    const userStats = {};
    history.forEach(h => {
        if (!userStats[h.userId]) {
            userStats[h.userId] = { name: h.userName, totalCost: 0, count: 0 };
        }
        userStats[h.userId].totalCost += (h.cost || 0);
        userStats[h.userId].count++;
    });

    const sorted = Object.entries(userStats)
        .sort((a, b) => b[1].totalCost - a[1].totalCost)
        .slice(0, 10);

    const lbContainer = document.getElementById('leaderboard');
    if (sorted.length === 0) {
        lbContainer.innerHTML = '<div class="no-data">Нет данных</div>';
        return;
    }

    lbContainer.innerHTML = sorted.map(([, data], i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        return `<div class="leaderboard-item">
            <span class="lb-rank ${rankClass}">#${i + 1}</span>
            <span class="lb-name">${data.name}</span>
            <span class="lb-stats">${data.totalCost.toLocaleString()} pts · ${data.count} эмоутов</span>
        </div>`;
    }).join('');
}

// ==================== МОДЕРАЦИЯ ====================

let pendingModAction = null; // {action, userId, userName}

function handleHistoryClick(e) {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    const userId = btn.dataset.uid;
    const userName = btn.dataset.uname;

    if (action === 'unmod') {
        removeMod(userId);
        return;
    }

    if (action === 'block') {
        applyBlock(userId, userName);
        return;
    }

    // ban / mute — показываем выбор длительности
    pendingModAction = { action, userId, userName };
    openModModal(action, userName);
}

function openModModal(action, userName) {
    const modal = document.getElementById('mod-modal');
    const title = document.getElementById('mod-modal-title');
    const user = document.getElementById('mod-modal-user');
    const desc = document.getElementById('mod-modal-desc');
    const content = document.getElementById('mod-modal-content');

    title.textContent = action === 'ban' ? 'Бан пользователя' : 'Мут пользователя';
    user.textContent = userName;
    desc.textContent = action === 'ban'
        ? 'Заблокировать добавление эмоутов на выбранный период'
        : 'Замутить в чате Twitch на выбранный период';

    const durations = [
        { label: '1 мин', seconds: 60 },
        { label: '10 мин', seconds: 600 },
        { label: '1 час', seconds: 3600 },
        { label: '6 часов', seconds: 21600 },
        { label: '24 часа', seconds: 86400 },
        { label: '7 дней', seconds: 604800 }
    ];

    content.innerHTML = `<div class="duration-grid">
        ${durations.map(d => `<button class="duration-btn" data-seconds="${d.seconds}">${d.label}</button>`).join('')}
    </div>`;

    // Обработчики длительности
    content.querySelectorAll('.duration-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const seconds = parseInt(btn.dataset.seconds);
            if (pendingModAction) {
                if (pendingModAction.action === 'ban') {
                    applyBan(pendingModAction.userId, pendingModAction.userName, seconds);
                } else if (pendingModAction.action === 'mute') {
                    applyMute(pendingModAction.userId, pendingModAction.userName, seconds);
                }
                pendingModAction = null;
            }
            modal.style.display = 'none';
        });
    });

    modal.style.display = 'flex';
}

function applyBan(userId, userName, seconds) {
    state.userModeration[userId] = { type: 'ban', until: Date.now() + seconds * 1000, name: userName };
    saveState();
    renderHistoryTab();
    log(`${userName} забанен на ${formatDuration(seconds)}`, 'warning');
}

async function applyMute(userId, userName, seconds) {
    try {
        const res = await fetch(`${CONFIG.SERVER_URL}/api/twitch/moderation/ban`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: state.twitchToken,
                broadcasterId: state.broadcasterId,
                moderatorId: state.userId,
                userId,
                duration: seconds,
                reason: '7TV Rewards: мут'
            })
        });
        if (res.ok) {
            log(`${userName} замучен в чате на ${formatDuration(seconds)}`, 'success');
        } else {
            const data = await res.json().catch(() => ({}));
            log(`Ошибка мута ${userName}: ${data.error || res.status}`, 'error');
        }
    } catch (err) {
        log(`Ошибка мута: ${err.message}`, 'error');
    }

    state.userModeration[userId] = { type: 'mute', until: Date.now() + seconds * 1000, name: userName };
    saveState();
    renderHistoryTab();
}

function applyBlock(userId, userName) {
    state.userModeration[userId] = { type: 'block', until: null, name: userName };
    saveState();
    renderHistoryTab();
    log(`${userName} заблокирован навсегда`, 'warning');
}

function removeMod(userId) {
    const name = state.userModeration[userId]?.name || userId;
    delete state.userModeration[userId];
    saveState();
    renderHistoryTab();
    log(`Модерация снята: ${name}`, 'info');
}

// ==================== УТИЛИТЫ ВРЕМЕНИ ====================

function formatRelativeTime(timestamp) {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return 'только что';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} мин назад`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} ч назад`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} д назад`;
    return new Date(timestamp).toLocaleDateString('ru-RU');
}

function formatDuration(seconds) {
    if (seconds < 60) return `${seconds} сек`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} мин`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ч`;
    return `${Math.floor(seconds / 86400)} д`;
}

// ==================== АРХИВ ВЕРСИЙ ====================

const VERSION_ARCHIVE = [
    {
        id: 'v2.0.0b',
        name: 'v2.0.0β',
        desc: 'Дашборд: история эмоутов, модерация (бан/мут/блок), статистика, лидерборд',
        badge: 'beta',
        isBeta: true,
        activate: () => {
            document.getElementById('version-archive-modal').style.display = 'none';
            document.getElementById('beta-modal').style.display = 'flex';
        },
        deactivate: () => {
            deactivateBeta();
            renderVersionArchive();
        },
        isActive: () => state.betaEnabled
    }
    // Можно добавлять новые версии сюда в будущем
];

function renderVersionArchive() {
    const container = document.getElementById('version-archive-list');
    container.innerHTML = VERSION_ARCHIVE.map(v => {
        const active = v.isActive();
        const badgeClass = v.badge === 'beta' ? 'badge-beta' : 'badge-info';

        let btnHtml;
        if (active) {
            btnHtml = `<button class="va-btn va-btn-deactivate" data-va-action="deactivate" data-va-id="${v.id}">Деактивировать</button>`;
        } else {
            btnHtml = `<button class="va-btn va-btn-activate" data-va-action="activate" data-va-id="${v.id}">Активировать</button>`;
        }

        return `<div class="version-archive-item${active ? ' active' : ''}">
            <div class="va-info">
                <span class="va-name"><span class="badge ${badgeClass}" style="margin-right:6px;">${v.name}</span>${active ? '✓ Активна' : ''}</span>
                <span class="va-desc">${v.desc}</span>
            </div>
            ${btnHtml}
        </div>`;
    }).join('');

    // Event delegation
    container.querySelectorAll('[data-va-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.vaId;
            const action = btn.dataset.vaAction;
            const version = VERSION_ARCHIVE.find(v => v.id === id);
            if (!version) return;
            if (action === 'activate') version.activate();
            else if (action === 'deactivate') version.deactivate();
        });
    });
}

// ==================== ЛЕТАЮЩИЕ ЭМОУТЫ ====================

let floatingInterval = null;

function startFloatingEmotes() {
    if (floatingInterval) clearInterval(floatingInterval);

    // Спавним каждые 2-4 секунды
    floatingInterval = setInterval(spawnFloatingEmote, 3000);
    // Сразу несколько
    setTimeout(spawnFloatingEmote, 500);
    setTimeout(spawnFloatingEmote, 1500);
}

function spawnFloatingEmote() {
    const emotes = state.allSetEmotes;
    if (!emotes || emotes.length === 0) return;

    const container = document.getElementById('floating-emotes');
    if (!container) return;

    // Ограничиваем кол-во одновременных
    if (container.children.length > 15) return;

    const randomEmote = emotes[Math.floor(Math.random() * emotes.length)];
    const img = document.createElement('img');
    img.className = 'floating-emote';
    img.src = `https://cdn.7tv.app/emote/${randomEmote.id}/2x.webp`;
    img.alt = '';
    img.width = 48;
    img.height = 48;

    // Рандомная позиция по X
    img.style.left = Math.random() * 90 + 5 + '%';
    // Рандомная длительность
    const duration = 10 + Math.random() * 10; // 10-20 sec
    img.style.setProperty('--float-duration', duration + 's');
    // Рандомный размер
    const scale = 0.6 + Math.random() * 0.8;
    img.style.width = (48 * scale) + 'px';
    img.style.height = (48 * scale) + 'px';

    container.appendChild(img);

    // Удаляем после анимации
    setTimeout(() => {
        if (img.parentNode) img.remove();
    }, duration * 1000 + 500);
}

// ==================== LOGO EASTER EGG ====================

let _burstActive = false;

function triggerLogoBurst() {
    if (_burstActive || !state.allSetEmotes || state.allSetEmotes.length === 0) return;

    _burstActive = true;
    const logo = document.querySelector('.logo');
    const DURATION = 5000;
    const STEP = 150; // ms между буквами

    // Разбиваем на отдельные буквы с сохранением цветов
    logo.innerHTML =
        [...'7TV'].map(c => `<span class="logo-char logo-char-purple">${c}</span>`).join('') +
        [...'Rewards'].map(c => `<span class="logo-char logo-char-teal">${c}</span>`).join('');

    logo.classList.add('logo-cycling');

    const charSpans = [...logo.querySelectorAll('.logo-char')];
    let idx = Math.floor(Math.random() * state.allSetEmotes.length);

    function wave() {
        charSpans.forEach((span, i) => {
            setTimeout(() => {
                if (!_burstActive) return;
                const emote = state.allSetEmotes[idx % state.allSetEmotes.length];
                idx++;

                let img = span.querySelector('img');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'logo-char-emote';
                    img.alt = '';
                    span.appendChild(img);
                    span.classList.add('logo-char-replaced');
                }

                img.src = `https://cdn.7tv.app/emote/${emote.id}/2x.webp`;
                img.classList.remove('logo-char-emote-pop');
                void img.offsetWidth;
                img.classList.add('logo-char-emote-pop');
            }, i * STEP);
        });
    }

    wave();
    const waveTimer = setInterval(wave, charSpans.length * STEP + 300);

    setTimeout(() => {
        clearInterval(waveTimer);
        logo.classList.remove('logo-cycling');
        logo.innerHTML = '7TV<span>Rewards</span>';
        _burstActive = false;
    }, DURATION);
}

// ==================== I18N ====================

function t(key) {
    const lang = state.language || 'ru';
    return (TRANSLATIONS[lang] || TRANSLATIONS.ru)[key] ?? key;
}

function applyTranslations() {
    const T = TRANSLATIONS[state.language] || TRANSLATIONS.ru;
    const set = (sel, key) => {
        const el = document.querySelector(sel);
        if (el && T[key] !== undefined) el.textContent = T[key];
    };
    const setPH = (id, key) => {
        const el = document.getElementById(id);
        if (el && T[key] !== undefined) el.placeholder = T[key];
    };

    // data-i18n: textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (T[key] !== undefined) el.textContent = T[key];
    });
    // data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (T[key] !== undefined) el.placeholder = T[key];
    });

    // Header
    set('.subtitle', 'subtitle');

    // Auth
    set('#auth-section .card-header h2', 'auth.title');
    set('#btn-logout', 'auth.logout');
    set('.user-role', 'auth.role');

    // 7TV Settings
    set('#seventv-section .card-header h2', 'seventv.title');
    const lbl7tvToken = document.querySelector('label[for="seventv-token"]');
    if (lbl7tvToken) lbl7tvToken.textContent = T['seventv.token.label'];
    set('#btn-save-token', 'seventv.token.save');
    const lblEmoteSet = document.querySelector('label[for="emote-set-select"]');
    if (lblEmoteSet) lblEmoteSet.textContent = T['seventv.set.label'];
    // Manual ID label has data-i18n already
    setPH('emote-set-id', 'seventv.set.placeholder');
    set('#btn-save-set', 'seventv.set.load');
    set('#current-emotes .section-header h3', 'seventv.emotes.title');
    setPH('emote-set-filter', 'seventv.filter.placeholder');
    const sortSel = document.getElementById('emote-set-sort');
    if (sortSel && sortSel.options.length >= 3) {
        sortSel.options[0].text = T['seventv.sort.default'];
        sortSel.options[1].text = T['seventv.sort.asc'];
        sortSel.options[2].text = T['seventv.sort.desc'];
    }
    const firstOpt = document.querySelector('#emote-set-select option[value=""]');
    if (firstOpt) firstOpt.text = T['seventv.set.first'];

    // Rewards
    set('#rewards-section .card-header h2', 'reward.title');
    const lblName = document.querySelector('label[for="reward-title"]');
    if (lblName) lblName.textContent = T['reward.name'];
    const lblCost = document.querySelector('label[for="reward-cost"]');
    if (lblCost) lblCost.textContent = T['reward.cost'];
    const lblDesc = document.querySelector('label[for="reward-prompt"]');
    if (lblDesc) lblDesc.textContent = T['reward.desc'];
    // slots label has data-i18n; checkbox spans have data-i18n — handled above
    // slots-hint: re-apply depending on unlimited state
    const slotsHint = document.getElementById('slots-hint');
    if (slotsHint) slotsHint.textContent = state.slotsDisabled ? T['reward.slots.hint.unlimited'] : T['reward.slots.hint'];
    set('#rewards-list .section-header h3', 'reward.existing');
    const existHint = document.querySelector('#rewards-list .section-header .form-hint');
    if (existHint) existHint.textContent = T['reward.existing.hint'];
    set('#selected-reward-info h3', 'reward.tracked');

    // Emote management
    set('#emote-management .card-header h2', 'emote.search.title');
    setPH('emote-search', 'emote.search.placeholder');
    set('#btn-search-emote', 'emote.search.btn');
    set('#active-emote h3', 'emote.active');

    // Dashboard
    set('#dashboard-section h2', 'dash.title');
    set('#btn-clear-history', 'dash.clear');
    const histTab = document.querySelector('.dash-tab[data-tab="history"]');
    if (histTab) histTab.textContent = T['dash.history'];
    const statsTab = document.querySelector('.dash-tab[data-tab="stats"]');
    if (statsTab) statsTab.textContent = T['dash.stats'];
    setPH('history-filter', 'dash.search');
    const statPts = document.getElementById('stat-total-pts');
    if (statPts?.nextElementSibling) statPts.nextElementSibling.textContent = T['dash.pts'];
    const statEmotes = document.getElementById('stat-total-emotes');
    if (statEmotes?.nextElementSibling) statEmotes.nextElementSibling.textContent = T['dash.emotes'];
    const statUsers = document.getElementById('stat-unique-users');
    if (statUsers?.nextElementSibling) statUsers.nextElementSibling.textContent = T['dash.users'];
    set('.leaderboard-title', 'dash.top');

    // Log
    set('#log-section h2', 'log.title');
    set('#btn-clear-log', 'log.clear');
    setPH('log-filter', 'log.filter');

    // Troubleshooting
    set('.troubleshooting-title h3', 'ts.title');

    // Info modal
    set('#info-modal .modal-header h2', 'info.title');
    set('#info-modal .modal-desc', 'info.desc');
    const credH = document.querySelectorAll('.modal-credits h3');
    if (credH[0]) credH[0].textContent = T['info.dev'];
    if (credH[1]) credH[1].textContent = T['info.for'];
    if (credH[2]) credH[2].textContent = T['info.thanks'];
    set('.modal-donate > p', 'info.donate');

    // Changelog modal
    set('#changelog-modal .modal-header h2', 'changelog.title');

    // Token hint (contains HTML links/code tags)
    const tokenHint = document.getElementById('token-hint');
    if (tokenHint) tokenHint.innerHTML = T['token.hint'];

    // Auth status badge (static initial state only — don't override dynamic state)
    const authStatus = document.getElementById('auth-status');
    if (authStatus && authStatus.classList.contains('badge-warning')) {
        authStatus.textContent = T['auth.status.not'];
    }

    // 7TV status badge (static initial state only)
    const stvStatus = document.getElementById('seventv-status');
    if (stvStatus && stvStatus.classList.contains('badge-warning')) {
        stvStatus.textContent = T['seventv.status.init'];
    }

    // Initial log entry (only if it's still the default placeholder)
    const firstLog = document.querySelector('#event-log .log-entry');
    if (firstLog && firstLog.querySelector('.log-time')?.textContent === '[--:--:--]') {
        firstLog.childNodes[firstLog.childNodes.length - 1].textContent = ' ' + T['log.waiting'];
    }

    // Sync lang toggle buttons
    const lang = state.language || 'ru';
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

// ==================== TROUBLESHOOTING ====================

function toggleTroubleshooting() {
    const card = document.querySelector('.troubleshooting-card');
    const body = document.getElementById('troubleshooting-content');
    if (card && body) {
        const isOpen = card.classList.contains('open');
        if (isOpen) {
            body.classList.remove('open');
            card.classList.remove('open');
        } else {
            body.classList.add('open');
            card.classList.add('open');
        }
    }
}

function openReyohoho1080p() {
    const isFirefox = /Firefox\//i.test(navigator.userAgent);
    const url = isFirefox
        ? 'https://addons.mozilla.org/ru/firefox/addon/reyohoho-twitch-proxy/'
        : 'https://chromewebstore.google.com/detail/reyohoho-twitch-proxy-108/ohgphcndclpcmbglhldmnagagdbmkoef?authuser=0&hl=ru';
    window.open(url, '_blank');
}
