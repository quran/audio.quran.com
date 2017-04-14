module.exports = (sequelize, DataTypes) => {
  const recitation = sequelize.define(
    'recitation',
    {
      name: DataTypes.STRING,
      arabic: DataTypes.STRING,
      slug: DataTypes.STRING
    },
    {
      timestamps: false,
      classMethods: {
        associate: models => {
          this.hasMany(models.audioFile);
          this.belongsToMany(models.qari, { through: models.audioFile });
        }
      }
    }
  );
  return recitation;
};
