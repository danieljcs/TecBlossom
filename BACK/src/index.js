const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { sequelize, Character } = require('../models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const requestLogger = require('../middlewares/requestLogger');

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use(requestLogger);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { Character },
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);

    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
};

startServer();
