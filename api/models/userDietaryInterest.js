const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDietaryInterest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  UserDietaryInterest.init(
    {
      userId: DataTypes.STRING,
      dietaryInterestId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserDietaryInterest',
    }
  );

  return UserDietaryInterest;
};
