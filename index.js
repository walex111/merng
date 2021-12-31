const { ApolloServer } = require("apollo-server");
// const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index");
const { MONGODB } = require("./config");

// const pubSub = new PubSub();
const PORT = process.env.PORT || 9000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running on port ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
