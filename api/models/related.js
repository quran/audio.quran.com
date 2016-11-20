module.exports = function init(sequelize, DataTypes) {
  const Related = sequelize.define('related', {
    qari: DataTypes.INTEGER,
    related: { type: DataTypes.INTEGER, field: 'related', primaryKey: true }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    tableName: 'related',
    instanceMethods: {
      toJSON: function json() {
        return {
          id: this.related
        };
      }
    }

  });
  return Related;
};
