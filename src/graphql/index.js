const Router = require('koa-router');
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');

const schema = require('./schema');
const router = new Router();

router.get('/graphql', graphqlKoa({ schema }));

router.post('/graphql', graphqlKoa({ schema }));

router.get(
  '/graphiql',
  graphiqlKoa({
    endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    // passHeader: `'Authorization': 'Bearer lorem ipsum'`,
  }),
);

module.exports = router;
