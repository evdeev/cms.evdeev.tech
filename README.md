# CMS для evdeev.tech

Отдельное Astro-приложение с Keystatic для редактирования контента репозитория
[`evdeev/evdeev.tech`](https://github.com/evdeev/evdeev.tech).

## Локальный запуск

```sh
npm install
npm run dev
```

Откройте <http://localhost:4321/keystatic>. При первом запуске Keystatic предложит
создать GitHub App и выдать ему доступ к репозиторию `evdeev/evdeev.tech`.

После настройки секреты GitHub App будут записаны в локальный `.env`. Файл не
должен попадать в Git. Для деплоя перенесите те же переменные окружения на хостинг.

## Что редактируется

- заметки из `src/content/notes/*.md`;
- главная страница `src/content/pages/home.md`;
- вводная страница заметок `src/content/pages/notes.md`.

Keystatic работает в `github` mode: изменения сохраняются коммитами в репозиторий
сайта, а не в этот репозиторий CMS.

## Проверки

```sh
npm run check
npm run build
```
