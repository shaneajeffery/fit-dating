const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  UserActivity.init(
    {
      userId: DataTypes.STRING,
      activityId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserActivity',
    }
  );

  return UserActivity;
};
