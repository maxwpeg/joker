const ApiError = require('../errors')

function errorHandlingMiddleware (err, req, res, next){

    if( err instanceof ApiError){
        return res.status(err.status).json(typeof err.message === 'object' ? err.message : {message: err.message})
    }

    return res.status(500).json(err ? {message: err.toString()} : {message: "Unexpected errors"})
}

module.exports = errorHandlingMiddleware;