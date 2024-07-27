module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    species: DataTypes.STRING,
    type: DataTypes.STRING,
    gender: DataTypes.STRING,
    origin_name: DataTypes.STRING,
    origin_url: DataTypes.STRING,
    location_name: DataTypes.STRING,
    location_url: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    created: DataTypes.DATE,
    comment: DataTypes.STRING,
    is_favorite: DataTypes.BOOLEAN,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
    
  }, {
    tableName: 'Characters',
    timestamps: false,
    paranoid: true
  });

  return Character;
};
