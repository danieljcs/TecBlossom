const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rick_and_blossom', 'admin', 'Drako2023', {
  host: '186.82.13.136',
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000,
  },
  logging: console.log, // Activa el logging para ver los mensajes en la consola
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
