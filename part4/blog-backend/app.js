const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('Connecting to ', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useFindAndModify: false})
  .then(()=> {
    logger.info('Connected!');
  })
  .catch((error) => {
    logger.error('error connecting to DB: ', error.message);
  })

app.use(cors());

if(process.argv[2]==='use-build'){
  app.use(express.static('build'));
}

app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);


app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;