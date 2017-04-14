module.exports = (sequelize, DataTypes) => {
  const section = sequelize.define(
    'section',
    {
      name: DataTypes.STRING
    },
    {
      timestamps: false,
      classMethods: {
        associate: models => {
          this.hasMany(models.qari, { foreignKey: 'section_id' });
        }
      }
    }
  );
  return section;
};
