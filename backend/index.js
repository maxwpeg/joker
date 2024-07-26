const express = require('express');
const app = express();
const sequelize = require('./db/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandlingMiddleware = require('./middleware/errorHandlingMiddleware')
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./Swagger/index.json');

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require('dotenv').config();

const router = require('./router')

const swaggerConfig = require('./swagger');
swaggerConfig(app);

const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('', router);
app.use(errorHandlingMiddleware);

async function start() {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

start();

