const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  UserMessage.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserMessage',
    }
  );
  return UserMessage;
};
