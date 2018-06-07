const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb');

const myGraphQLSchema = require('./schema');

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 4000;

app.keys = ['This is the session secret'];

router.get('/', async ctx => {
  ctx.body = 'Hello World';
  console.log('ctx:', ctx);
});

router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
router.post('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    // passHeader: `'Authorization': 'Bearer lorem ipsum'`,
  }),
);

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
