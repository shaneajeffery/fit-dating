const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserMessage extends Model {
    static associate() {}
  }

  UserMessage.init(
    {
      toUserId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      fromUserId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      messageId: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      message: DataTypes.STRING,
      messageReadAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'UserMessage',
    }
  );

  return UserMessage;
};
