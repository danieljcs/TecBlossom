// const { Op } = require('sequelize');
// const { Character } = require('../models');
// const redisClient = require('../config/redisClient');

// const CACHE_EXPIRATION_TIME = 3600; // Tiempo de expiración en segundos

// const resolvers = {
//   Query: {
//     characters: async (_, { page = 1, filter = {} }) => {
//       const limit = 20;
//       const offset = (page - 1) * limit;

//       const where = { deletedAt: null };

//       if (filter.status) where.status = { [Op.like]: `%${filter.status}%` };
//       if (filter.species) where.species = { [Op.like]: `%${filter.species}%` };
//       if (filter.gender) where.gender = { [Op.like]: `%${filter.gender}%` };
//       if (filter.name) where.name = { [Op.like]: `%${filter.name}%` };
//       if (filter.origin_name) where.origin_name = { [Op.like]: `%${filter.origin_name}%` };

//       const cacheKey = `characters:${JSON.stringify({ page, filter })}`;

//     // Verificar la caché
//       const cachedResult = await new Promise((resolve) => {
//         redisClient.get(cacheKey, (err, result) => {
//           if (err) {
//             console.error('Redis GET error:', err);
//             resolve(null);
//           } else {
//             resolve(result ? JSON.parse(result) : null);
//           }
//         });
//       });

//       if (cachedResult) {
//         return cachedResult;
//       }

//       // Consulta a la base de datos
//       const { count, rows } = await Character.findAndCountAll({
//         where,
//         limit,
//         offset
//       });

//       const totalPages = Math.ceil(count / limit);
//       const nextPage = page < totalPages ? page + 1 : null;
//       const prevPage = page > 1 ? page - 1 : null;

//       const result = {
//         info: {
//           count,
//           pages: totalPages,
//           next: nextPage ? nextPage : null,
//           prev: prevPage ? prevPage : null
//         },
//         results: rows
//       };

//     //   Almacenar en la caché
//       await new Promise((resolve) => {
//         redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(result), (err) => {
//           if (err) {
//             console.error('Redis SET error:', err);
//           }
//           resolve();
//         });
//       });

//       return result;
//     }
//   },
//   Mutation: {
//     updateComment: async (_, { id, comment }) => {
//       const character = await Character.findByPk(id);
//       if (character) {
//         character.comment = comment;
//         await character.save();
//         return character;
//       }
//       throw new Error('Character not found');
//     },
//     markFavorite: async (_, { id }) => {
//       const character = await Character.findByPk(id);
//       if (character) {
//         character.is_favorite = !character.is_favorite;
//         await character.save();
//         return character;
//       }
//       throw new Error('Character not found');
//     },
//     deleteCharacter: async (_, { id }) => {
//       const character = await Character.findByPk(id);
//       if (character) {
//         character.deletedAt = new Date();
//         await character.save();

//         // Eliminar el resultado de la caché si existe
//         const cacheKey = `characters:${JSON.stringify({ page: 1, filter: {} })}`;
//         redisClient.del(cacheKey, (err) => {
//           if (err) {
//             console.error('Redis DEL error:', err);
//           }
//         });

//         return character;
//       }
//       throw new Error('Character not found');
//     }
//   }
// };

// module.exports = resolvers;



// const { Op } = require('sequelize');
// const { Character } = require('../models');
// const redisClient = require('../config/redisClient');

// const CACHE_EXPIRATION_TIME = 28800; // Tiempo de expiración en segundos

// const resolvers = {
//   Query: {
//     characters: async (_, { page = 1, filter = {} }) => {
//       const limit = 20;
//       const offset = (page - 1) * limit;

//       const where = { deletedAt: null };

//       if (filter.status) where.status = { [Op.like]: `%${filter.status}%` };
//       if (filter.species) where.species = { [Op.like]: `%${filter.species}%` };
//       if (filter.gender) where.gender = { [Op.like]: `%${filter.gender}%` };
//       if (filter.name) where.name = { [Op.like]: `%${filter.name}%` };
//       if (filter.origin_name) where.origin_name = { [Op.like]: `%${filter.origin_name}%` };

//       const cacheKey = `characters:${JSON.stringify({ page, filter })}`;

//       // Verificar la caché
//       const cachedResult = await new Promise((resolve) => {
//         redisClient.get(cacheKey, (err, result) => {
//           if (err) {
//             console.error('Redis GET error:', err);
//             resolve(null);
//           } else {
//             resolve(result ? JSON.parse(result) : null);
//           }
//         });
//       });

//       if (cachedResult) {
//         return cachedResult;
//       }

//       // Consulta a la base de datos
//       const { count, rows } = await Character.findAndCountAll({
//         where,
//         limit,
//         offset
//       });

//       const totalPages = Math.ceil(count / limit);
//       const nextPage = page < totalPages ? page + 1 : null;
//       const prevPage = page > 1 ? page - 1 : null;

//       const result = {
//         info: {
//           count,
//           pages: totalPages,
//           next: nextPage ? nextPage : null,
//           prev: prevPage ? prevPage : null
//         },
//         results: rows
//       };

//       // Almacenar en la caché
//       await new Promise((resolve) => {
//         redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(result), (err) => {
//           if (err) {
//             console.error('Redis SET error:', err);
//           }
//           resolve();
//         });
//       });

//       return result;
//     }
//   },
//   Mutation: {
//     updateComment: async (_, { id, comment }) => {
//       const character = await Character.findByPk(id);
//       if (character) {
//         character.comment = comment;
//         await character.save();
//         return character;
//       }
//       throw new Error('Character not found');
//     },
//     markFavorite: async (_, { id }) => {
//       const character = await Character.findByPk(id);
//       if (character) {
//         character.is_favorite = !character.is_favorite;
//         await character.save();
//         return character;
//       }
//       throw new Error('Character not found');
//     },
//     deleteCharacter: async (_, { id }) => {
//       const character = await Character.findByPk(id);
//       if (character) {
//         character.deletedAt = new Date();
//         await character.save();

//         // Eliminar el resultado de la caché si existe
//         const cacheKey = `characters:${JSON.stringify({ page: 1, filter: {} })}`;
//         redisClient.del(cacheKey, (err) => {
//           if (err) {
//             console.error('Redis DEL error:', err);
//           }
//         });

//         return character;
//       }
//       throw new Error('Character not found');
//     }
//   }
// };

// module.exports = resolvers;

const { Op } = require('sequelize');
const { Character } = require('../models');
const redisClient = require('../config/redisClient');
const logExecutionTime = require('../decorators/timeDecorator');

const CACHE_EXPIRATION_TIME = 3600; // Tiempo de expiración en segundos

const resolvers = {
  Query: {
    characters: logExecutionTime(async (_, { page = 1, filter = {} }) => {
      const limit = 20;
      const offset = (page - 1) * limit;

      const where = { deletedAt: null };

      if (filter.status) where.status = { [Op.like]: `%${filter.status}%` };
      if (filter.species) where.species = { [Op.like]: `%${filter.species}%` };
      if (filter.gender) where.gender = { [Op.like]: `%${filter.gender}%` };
      if (filter.name) where.name = { [Op.like]: `%${filter.name}%` };
      if (filter.origin_name) where.origin_name = { [Op.like]: `%${filter.origin_name}%` };

      const cacheKey = `characters:${JSON.stringify({ page, filter })}`;

      // Verificar la caché
      const cachedResult = await new Promise((resolve) => {
        redisClient.get(cacheKey, (err, result) => {
          if (err) {
            console.error('Redis GET error:', err);
            resolve(null);
          } else {
            resolve(result ? JSON.parse(result) : null);
          }
        });
      });

      if (cachedResult) {
        return cachedResult;
      }

      // Consulta a la base de datos
      const { count, rows } = await Character.findAndCountAll({
        where,
        limit,
        offset
      });

      const totalPages = Math.ceil(count / limit);
      const nextPage = page < totalPages ? page + 1 : null;
      const prevPage = page > 1 ? page - 1 : null;

      const result = {
        info: {
          count,
          pages: totalPages,
          next: nextPage ? nextPage : null,
          prev: prevPage ? prevPage : null
        },
        results: rows
      };

      // Almacenar en la caché
      await new Promise((resolve) => {
        redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, JSON.stringify(result), (err) => {
          if (err) {
            console.error('Redis SET error:', err);
          }
          resolve();
        });
      });

      return result;
    }),
  },
  Mutation: {
    updateComment: logExecutionTime(async (_, { id, comment }) => {
      const character = await Character.findByPk(id);
      if (character) {
        character.comment = comment;
        await character.save();
    
        // Eliminar el resultado de la caché si existe
        const cacheKeys = await new Promise((resolve) => {
          redisClient.keys('characters:*', (err, keys) => {
            if (err) {
              console.error('Redis KEYS error:', err);
            }
            resolve(keys);
          });
        });
    
        cacheKeys.forEach((key) => {
          redisClient.del(key, (err) => {
            if (err) {
              console.error('Redis DEL error:', err);
            }
          });
        });
    
        return character;
      }
      throw new Error('Character not found');
    }),
    markFavorite: logExecutionTime(async (_, { id }) => {
      const character = await Character.findByPk(id);
      if (character) {
        character.is_favorite = !character.is_favorite;
        await character.save();
    
        // Eliminar el resultado de la caché si existe
        const cacheKeys = await new Promise((resolve) => {
          redisClient.keys('characters:*', (err, keys) => {
            if (err) {
              console.error('Redis KEYS error:', err);
            }
            resolve(keys);
          });
        });
    
        cacheKeys.forEach((key) => {
          redisClient.del(key, (err) => {
            if (err) {
              console.error('Redis DEL error:', err);
            }
          });
        });
    
        return character;
      }
      throw new Error('Character not found');
    }),
    deleteCharacter: logExecutionTime(async (_, { id }) => {
    const character = await Character.findByPk(id);
      if (character) {
        character.deletedAt = new Date();
        await character.save();

        // Eliminar el resultado de la caché si existe
        const cachePattern = `characters:*`; // Patron para encontrar las claves relevantes

        // Eliminar todas las claves que coincidan con el patrón
        redisClient.keys(cachePattern, (err, keys) => {
          if (err) {
            console.error('Redis KEYS error:', err);
            return;
          }
          if (keys.length > 0) {
            redisClient.del(keys, (err) => {
              if (err) {
                console.error('Redis DEL error:', err);
              } else {
                console.log(`Deleted cache keys: ${keys.join(', ')}`);
              }
            });
          }
        });

        return character;
      }
      throw new Error('Character not found');
    }),
  }
};

module.exports = resolvers;
