const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const graphqlEndpoint = require('./graphql');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb');

const app = new Koa();
const PORT = process.env.PORT || 4000;

app
  .use(logger())
  .use(bodyParser())
  .use(graphqlEndpoint.routes());

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
