const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb');

const myGraphQLSchema = require('./schema');

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 4000;

router.get('/', async ctx => {
  ctx.body = 'Hello World';
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
