const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');

const posts = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
    vote: 1,
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    vote: 1,
  },
];

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (postId: Int!): Post
  }
`;

// The resolvers
const resolvers = {
  Query: { posts: () => posts },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

module.exports = schema;
