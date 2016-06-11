'use strict';
module.exports = function(sequelize, DataTypes) {
  var recitation = sequelize.define('recitation', {
    name: DataTypes.STRING,
    arabic: DataTypes.STRING,
    slug: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.audioFile);
        this.belongsToMany(models.qari, {through: models.audioFile});
      }
    }
  });
  return recitation;
};
