const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserWorkouts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  UserWorkouts.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserWorkouts',
    }
  );
  return UserWorkouts;
};
