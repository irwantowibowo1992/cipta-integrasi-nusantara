require('dotenv').config();
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const app = express();

const logFormat = {
    remote: ':remote-addr',
    user: ':remote-user',
    method: ':method',
    path: ':url',
    code: ':status',
    size: ':res[content-length]',
    agent: ':user-agent',
    responseTime: ':response-time',
};

// Swagger in here

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());

app.use(cors());
app.options('*', cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const {getFullPath} = require('./src/utils/string.util');
const ErrorHandler = require('./src/utils/exception.util');
const traverseDir = getFullPath(__dirname + '/src/routes/');
traverseDir.map((fullPath) => {
    app.use('/', require(fullPath));
});

// Documentation
if (process.env.SWAGGER_ON === 'true') {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUI = require('swagger-ui-express');
    const swaggerDefinition = require('./config/swagger.config');

    const options = {
        swaggerDefinition,
        apis: ['./docs/**/*.yaml'],
    };

    const custom = {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'My Project',
    };

    // initialize swagger js-jsdoc
    const swaggerSpec = swaggerJSDoc(options);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, custom));
}

const errorHandler = new ErrorHandler()
app.use((err, req, res, next) => {
    errorHandler.handle(err, req, res, next)
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log('server running on port', port);
})
