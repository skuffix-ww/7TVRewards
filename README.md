# 7TV Rewards

Система для покупки 7TV эмоутов за Twitch Channel Points. Зритель активирует награду → эмоут автоматически добавляется в набор.

## 🚀 Быстрый старт

### 1. Twitch приложение

1. [Twitch Console](https://dev.twitch.tv/console) → Register Your Application
2. Redirect URL: `http://localhost:3000`
3. Category: Website Integration
4. Скопируйте **Client ID** и **Client Secret**

### 2. Установка

```bash
npm install
```

`.env`:
```env
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
TWITCH_REDIRECT_URI=http://localhost:3000
PORT=3000
```

### 3. Запуск

```bash
npm start
```

Откройте `http://localhost:3000`

## ⚙️ Настройка

**7TV токен** (для добавления/удаления эмоутов):
1. Откройте [7tv.app](https://7tv.app)
2. F12 → Network → обновите страницу
3. Найдите запрос к `7tv.io`
4. Скопируйте значение `Authorization` (без `Bearer `)
5. Вставьте в приложение

**Награда**: создайте новую или выберите существующую из списка

## 📋 Как это работает

1. Зритель активирует награду и отправляет ссылку на эмоут
2. Система извлекает ID и проверяет существование
3. Удаляет старый эмоут, добавляет новый
4. Отправляет результат в чат

Поддерживаемые форматы:
- `https://7tv.app/emotes/ID`
- `https://7tv.io/emotes/ID`
- Просто ID

## 🔧 Технологии

- Frontend: HTML5, CSS3, Vanilla JS
- Backend: Node.js, Express
- API: Twitch Helix API, 7TV GQL API

## 📚 Структура проекта

```
├── index.html
├── styles.css
├── app.js          # Клиентская логика
├── server.js       # Express сервер
├── package.json
└── .env            # Конфигурация
```

## ⚠️ Проблемы

| Проблема | Решение |
|----------|---------|
| Ошибка авторизации | Проверьте Client ID и Redirect URI (`http://localhost:3000`) |
| Наборы не загружаются | Убедитесь что у вас есть 7TV аккаунт, привязанный к Twitch |
| Эмоуты не добавляются | Проверьте 7TV токен (с правами на редактирование) |
| DUPLICATE_REWARD | Награда существует — выберите её из списка |

## 📖 API

**POST** `/api/7tv/gql` — GQL прокси  
**GET** `/api/7tv/emote-sets/:setId` — Набор эмоутов  
**GET** `/api/twitch/users` — Информация о пользователе  
**POST** `/api/twitch/rewards` — Создать награду  
**GET** `/api/twitch/rewards` — Список наград  
**GET** `/api/twitch/rewards/redemptions` — Активации  
**POST** `/api/twitch/chat/messages` — Сообщение в чат

## 📄 Лицензия

MIT