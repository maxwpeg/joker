class ApiError extends Error{
    status;
    message;

    constructor(status, message){
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message = 'Bad request'){
        return new ApiError(400, message)
    }

    static notFound(message = 'Не найдено'){
        return new ApiError(404, message)
    }

    static internal(message = 'Ошибка сервера'){
        return new ApiError(500, message)
    }

    static forbidden(message = 'Доступ запрещен'){
        return new ApiError(403, message)
    }

    static unauthorized(message = 'Пользователь не авторизован'){
        return new ApiError(401, message)
    }
}

module.exports = ApiError;