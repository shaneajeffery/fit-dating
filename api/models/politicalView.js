const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PoliticalView extends Model {
    static associate(models) {
      this.belongsTo(models.UserProfile, {
        sourceKey: 'politicalView',
        foreignKey: 'id',
      });
    }
  }
  PoliticalView.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PoliticalView',
    }
  );
  return PoliticalView;
};
