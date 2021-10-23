const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DietaryInterest extends Model {
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'UserDietaryInterests',
        sourceKey: 'id',
        foreignKey: 'dietaryInterestId',
        as: '_dietaryInterests',
      });
    }
  }
  DietaryInterest.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'DietaryInterest',
    }
  );
  return DietaryInterest;
};
