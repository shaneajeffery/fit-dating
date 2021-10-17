const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DietaryInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
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