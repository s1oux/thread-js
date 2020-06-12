export default (orm, DataTypes) => {
  const ResetToken = orm.define('resetToken', {
    token: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    expiresAt: DataTypes.DATE
  }, {});
  return ResetToken;
};

