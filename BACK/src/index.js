// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const { sequelize, Character } = require('../models'); // Importar sequelize y modelos desde models/index.js
// const typeDefs = require('./schema');
// const resolvers = require('./resolvers');
// const requestLogger = require('../middlewares/requestLogger'); // Importar el middleware

// const app = express();
// const PORT = process.env.PORT || 4000;

// // Usar el middleware de registro de solicitudes
// app.use(requestLogger);

// const startServer = async () => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: { Character }, // Pasar modelos a través del contexto
//   });

//   // Iniciar el servidor Apollo
//   await server.start();
//   server.applyMiddleware({ app });

//   app.listen(PORT, async () => {
//     console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);

//     // Probar la conexión a la base de datos
//     try {
//       await sequelize.authenticate();
//       console.log('Connection to the database has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//   });
// };

// // Iniciar el servidor
// startServer();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { sequelize, Character } = require('../models'); // Importar sequelize y modelos desde models/index.js
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const requestLogger = require('../middlewares/requestLogger'); // Importar el middleware

const app = express();
const PORT = process.env.PORT || 4000;

// Usar el middleware de análisis del cuerpo
app.use(express.json());

// Usar el middleware de registro de solicitudes
app.use(requestLogger);

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { Character }, // Pasar modelos a través del contexto
  });

  // Iniciar el servidor Apollo
  await server.start();
  server.applyMiddleware({ app });

  app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);

    // Probar la conexión a la base de datos
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
};

// Iniciar el servidor
startServer();
