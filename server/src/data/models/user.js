export default (orm, DataTypes) => {
  const User = orm.define('user', {
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    resetPasswordToken: { // reset password token
      type: DataTypes.STRING,
      unique: true
    },
    resetPasswordExpiresAt: DataTypes.DATE, // reset token expiration time
    status: { // status string field for user
      type: DataTypes.STRING
    }
  }, {});

  return User;
};
