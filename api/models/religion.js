const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Religion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
