export default (orm, DataTypes) => {
  const Post = orm.define('post', {
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    paranoid: true // for soft deletion
  }, {});

  return Post;
};
