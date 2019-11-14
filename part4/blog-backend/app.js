const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blog');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');

console.log('Connecting to ', config.MONODB_URI);

mongoose.connect(config.MONODB_URI, {useNewUrlParser: true})
  .then(()=> {
    console.log('Connected!');
  })
  .catch((error) => {
    console.log('error connecting to DB: ', error.message);
  })

app.use(cors());
if(process.argv[2]==='use-build'){
  app.use(express.static('build'));
}
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;