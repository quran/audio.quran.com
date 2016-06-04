'use strict';
module.exports = function(sequelize, DataTypes) {
  var section = sequelize.define('section', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        this.hasMany(models.qari, {foreignKey: 'section_id'});
      }
    }
  });
  return section;
};
