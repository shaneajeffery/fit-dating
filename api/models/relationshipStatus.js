const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RelationshipStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
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
