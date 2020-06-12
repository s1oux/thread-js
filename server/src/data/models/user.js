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
    status: { // status string field for user
      type: DataTypes.STRING
    } // resetTokenId should be added in associations as FK..?
  }, {});

  return User;
};
