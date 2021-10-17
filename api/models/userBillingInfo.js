const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserBillingInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  UserBillingInfo.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserBillingInfo',
    }
  );
  return UserBillingInfo;
};
