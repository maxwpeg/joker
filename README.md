# Joker Backend

## Описание
Joker - это серверное приложение, написанное на Node.js, которое позволяет пользователям публиковать анекдоты, ставить лайки и управлять аккаунтами. Приложение использует Sequelize для работы с базой данных.

## Стек технологий
- Node.js
- Express.js
- Sequelize (PostgreSQL)
- JWT (JSON Web Tokens) для аутентификации


## Структура проекта
```
backend/
├── controller/
│   ├── UserController.js
│   ├── JokeController.js
│   └── LikeController.js
├── service/
│   ├── UserService.js
│   ├── JokeService.js
│   ├── TokenService.js
│   └── LikeService.js
├── db/
│   ├── db.js
│   └── index.js
├── dto/
│   └── UserDto.js
├── errors/
│   └── index.js
├── router/
│   ├── JokeRouter
│   │   └──index.js
│   ├── LikeRouter
│   │   └──index.js
│   ├── UserRouter
│   │   └──index.js
│   └── index.js
├── swagger/
│   └── index.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandlingMiddleware.js
└── index.js
```


## Сущности

### User
Пользователь (администратор) приложения.
- `id` (integer): Уникальный идентификатор.
- `username` (string): Имя пользователя.
- `email` (string): Электронная почта.
- `password` (string): Хэшированный пароль.
- `refreshToken` (string): Токен для обновления JWT.
- `isAdmin` (boolean): Признак администратора.

### Joke
Анекдот, публикуемый пользователями.
- `id` (integer): Уникальный идентификатор.
- `text` (string): Текст анекдота.
- `title` (string): Заголовок анекдота.
- `date` (date): Дата публикации.
- `tags` (array of strings): Теги анекдота.
- `userId` (integer): Идентификатор пользователя, который опубликовал анекдот.

### Like
Лайк на анекдот.
- `id` (integer): Уникальный идентификатор.
- `userId` (integer): Идентификатор пользователя, поставившего лайк.
- `jokeId` (integer): Идентификатор анекдота, которому поставили лайк.

## Роутеры

### User Routes
- `POST /users/register` - Регистрация пользователя
- `POST /users/login` - Авторизация пользователя
- `POST /users/logout` - Выход пользователя
- `GET /users/refresh` - Обновление JWT токена
- `GET /users` - Получение всех пользователей
- `GET /users/:id` - Получение имени пользователя по ID
- `POST /users/checkAdmin` - Проверка прав администратора

### Joke Routes
- `POST /jokes` - Создание нового анекдота
- `GET /jokes/:tag` - Получение анекдотов по тегу
- `GET /jokes` - Получение всех анекдотов
- `GET /jokes/top` - Получение топа анекдотов
- `DELETE /jokes/:id` - Удаление анекдота
- `GET /jokes/:jokeId/isliked` - Проверка, поставил ли пользователь лайк

### Like Routes
- `POST /likes/:jokeId` - Поставить или убрать лайк анекдоту

## Контроллеры

### UserController
- `register(req, res, next)` - Регистрация нового пользователя
- `login(req, res, next)` - Авторизация пользователя
- `logout(req, res, next)` - Выход пользователя
- `refresh(req, res, next)` - Обновление JWT токена
- `getAllUsers(req, res, next)` - Получение всех пользователей
- `getUsernameById(req, res, next)` - Получение имени пользователя по ID
- `checkAdmin(req, res, next)` - Проверка прав администратора

### JokeController
- `createNewJoke(req, res, next)` - Создание нового анекдота
- `getTaggedJokes(req, res, next)` - Получение анекдотов по тегу
- `getAllJokes(req, res, next)` - Получение всех анекдотов
- `getTopJokes(req, res, next)` - Получение топ анекдотов
- `deleteJoke(req, res, next)` - Удаление анекдота
- `isLiked(req, res, next)` - Проверка, поставил ли пользователь лайк

### LikeController
- `addLike(req, res, next)` - Поставить или убрать лайк анекдоту

## Сервисы

### UserService
- `register(email, username, password, isAdmin)` - Регистрация нового пользователя
- `login(username, password)` - Авторизация пользователя
- `refresh(refreshToken)` - Обновление JWT токена
- `getAllUsers()` - Получение всех пользователей
- `getUsernameById(id)` - Получение имени пользователя по ID

### JokeService
- `createNewJoke(text, title, date, tags, userId)` - Создание нового анекдота
- `findJokeByTag(tag)` - Поиск анекдотов по тегу
- `getAllJokes()` - Получение всех анекдотов
- `deleteJoke(id)` - Удаление анекдота
- `findJokeById(jokeId)` - Поиск анекдота по ID
- `getTopJokes()` - Получение топ анекдотов

### LikeService
- `addLike(jokeId, userId)` - Поставить лайк анекдоту
- `deleteLike(id)` - Убрать лайк анекдота
- `findLikeByJokeAndUser(jokeId, userId)` - Поиск лайка по анекдоту и пользователю

## Middleware

### authMiddleware
- `Middleware` для проверки аутентификации и авторизации пользователя.

### errorHandlingMiddleware
 - `errorHandlingMiddleware` обрабатывает ошибки, возникшие в процессе выполнения запросов, и возвращает соответствующие ответы.
## Ошибки

### ApiError
- Класс для обработки и генерации ошибок API.

## DTO
### UserDto
 - `UserDto` используется для передачи данных пользователя между различными уровнями приложения.

## Базы данных
Для поднятия баз данных необходимо из корня проекта выполнить команду:
```
docker-compose up -d
```
Прописанный `docker`-файл автоматически поднимет необходимые образы.
## Лицензия
Этот проект лицензируется под лицензией MIT.
