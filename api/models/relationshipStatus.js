const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RelationshipStatus extends Model {
    static associate(models) {
      this.belongsTo(models.UserProfile, {
        sourceKey: 'relationshipStatus',
        foreignKey: 'id',
      });
    }
  }
  RelationshipStatus.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'RelationshipStatus',
    }
  );
  return RelationshipStatus;
};
