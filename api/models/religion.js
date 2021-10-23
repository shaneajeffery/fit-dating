const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Religion extends Model {
    static associate(models) {
      this.belongsTo(models.UserProfile, {
        sourceKey: 'religion',
        foreignKey: 'id',
      });
    }
  }
  Religion.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Religion',
    }
  );
  return Religion;
};
