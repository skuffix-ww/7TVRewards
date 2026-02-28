# 🎁 7TV Twitch Rewards

Интеграция 7TV эмоутов с наградами канала Twitch. Зрители могут покупать эмоуты за баллы канала, при этом предыдущий эмоут автоматически заменяется новым.

## 📋 Возможности

- ✅ Авторизация через Twitch OAuth
- ✅ Поиск эмоутов в 7TV
- ✅ Добавление/удаление эмоутов из набора 7TV
- ✅ Создание наград канала за баллы
- ✅ Автоматическая замена эмоута при новой покупке
- ✅ Логирование всех событий
- ✅ Красивый UI в стиле Twitch/7TV

## 🚀 Быстрый старт

### 1. Регистрация приложения в Twitch

1. Перейдите на [Twitch Console](https://dev.twitch.tv/console)
2. Нажмите **"Register Your Application"**
3. Заполните форму:
   - **Name**: Любое название (например, "7TV Rewards")
   - **OAuth Redirect URLs**: `http://localhost:8080`
   - **Category**: Website Integration
4. После создания скопируйте:
   - **Client ID**
   - **Client Secret** (нажмите "New Secret")

### 2. Настройка проекта

```bash
# Установите зависимости
npm install

# Скопируйте файл конфигурации
copy .env.example .env
```

### 3. Конфигурация

Откройте файл `.env` и заполните:

```env
TWITCH_CLIENT_ID=ваш_client_id
TWITCH_CLIENT_SECRET=ваш_client_secret
TWITCH_REDIRECT_URI=http://localhost:8080
PORT=3000
```

Откройте файл `app.js` и укажите Client ID:

```javascript
const CONFIG = {
    SERVER_URL: window.location.origin,
    TWITCH_CLIENT_ID: 'ваш_client_id', // <-- Вставьте ваш Client ID
    TWITCH_REDIRECT_URI: 'http://localhost:8080',
    // ...
};
```

### 4. Запуск сервера

```bash
npm start
```

Сервер запустится на `http://localhost:3000`

### 5. Открытие приложения

Откройте в браузере: `http://localhost:3000`

## 📖 Использование

### 1. Авторизация

1. Нажмите **"Войти через Twitch"**
2. Разрешите приложению доступ к каналу
3. После авторизации отобразится ваш профиль

### 2. Настройка 7TV

1. Узнайте ID вашего emote set на 7TV
   - Перейдите на [7TV](https://7tv.app/)
   - Найдите свой профиль
   - ID находится в URL или через API
2. Введите ID в поле **"ID набора эмоутов 7TV"**
3. Нажмите **"Сохранить"**

### 3. Создание награды

1. Укажите стоимость награды (например, 1000 баллов)
2. Введите название (например, "Добавить 7TV эмоут")
3. Нажмите **"Создать/Обновить награду"**

### 4. Как это работает для зрителей

1. Зритель активирует награду в списке наград канала
2. **Вводит ссылку на 7TV эмоут** (например: `https://7tv.app/emotes/64e2b5e9e610f245e1a8b3c7`)
3. Система списывает баллы канала
4. Автоматически извлекает ID эмоута из ссылки
5. Проверяет существование эмоута в 7TV
6. Найденный эмоут добавляется в набор канала
7. Предыдущий эмоут автоматически удаляется
8. Награда отмечается как выполненной

**Поддерживаемые форматы ссылок:**
- `https://7tv.app/emotes/64e2b5e9e610f245e1a8b3c7`
- `https://7tv.io/emotes/64e2b5e9e610f245e1a8b3c7`
- Просто ID: `64e2b5e9e610f245e1a8b3c7`

### 5. Поиск и добавление эмоута вручную

1. Введите название эмоута в поле поиска
2. Нажмите **"Найти"** или Enter
3. Выберите нужный эмоут из результатов
4. Нажмите **"Добавить в набор"**

## 🔧 API Endpoints

### 7TV API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/7tv/emotes/search?query=NAME` | Поиск эмоутов |
| GET | `/api/7tv/emote-sets/:setId` | Получение набора |
| GET | `/api/7tv/users/:twitchId` | Профиль пользователя |
| POST | `/api/7tv/emote-sets/:setId/emotes` | Добавить эмоут |
| DELETE | `/api/7tv/emote-sets/:setId/emotes/:emoteId` | Удалить эмоут |

### Twitch API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | `/api/twitch/users?token=TOKEN` | Информация о пользователе |
| POST | `/api/twitch/rewards` | Создать награду |
| GET | `/api/twitch/rewards?token=TOKEN&broadcasterId=ID` | Список наград |
| PUT | `/api/twitch/rewards/redemptions` | Обновить статус награды |
| GET | `/api/twitch/rewards/redemptions?token=TOKEN&broadcasterId=ID&rewardId=ID` | Активации наград |

## ⚠️ Важные замечания

### 7TV API

Для полноценной работы с 7TV (добавление/удаление эмоутов) требуется:

1. **7TV OAuth авторизация** - получите токен через [7TV Dashboard](https://7tv.app/dashboard)
2. **JWT токен** - необходим для модификации наборов
3. **Разрешения** - убедитесь, что у вас есть права на редактирование набора

В текущей версии добавление/удаление эмоутов работает в демонстрационном режиме.

### Twitch EventSub

Для реального времени событий рекомендуется использовать WebSocket:

```javascript
// Подписка на события через EventSub
const ws = new WebSocket('wss://eventsub.wss.twitch.tv/ws');
```

В текущей версии используется polling (опрос каждые 5 секунд).

## 🛠️ Технологии

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express
- **API**: Twitch API, 7TV API
- **Стили**: Кастомные CSS с переменными

## 📁 Структура проекта

```
7tv_addding/
├── index.html          # Главная страница
├── styles.css          # Стили
├── app.js              # Frontend логика
├── server.js           # Backend сервер
├── package.json        # Зависимости Node.js
├── .env.example        # Пример конфигурации
└── README.md           # Документация
```

## 🎨 Настройка UI

Для изменения цветовой схемы отредактируйте CSS переменные в `styles.css`:

```css
:root {
    --twitch-purple: #9146ff;
    --twitch-dark: #18181b;
    --7tv-blue: #00ad84;
    /* ... */
}
```

## 🐛 Решение проблем

### Ошибка авторизации Twitch

- Проверьте правильность Client ID
- Убедитесь, что Redirect URI совпадает
- Очистите кэш браузера

### Не загружаются эмоуты

- Проверьте ID emote set
- Убедитесь, что набор существует
- Проверьте консоль на ошибки API

### Не работает добавление эмоута

- Требуется 7TV OAuth токен
- Проверьте права доступа к набору
- Смотрите логи сервера

## 📝 Лицензия

MIT License

## 🔗 Полезные ссылки

- [Twitch Developer Docs](https://dev.twitch.tv/docs)
- [7TV API Docs](https://docs.7tv.app/)
- [Twitch API Tools](https://dev.twitch.tv/tools)

---

**Создано для интеграции 7TV с Twitch каналом** 🎮
