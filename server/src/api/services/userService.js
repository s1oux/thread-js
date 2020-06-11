import userRepository from '../../data/repositories/userRepository';

export const getUserById = async userId => {
  const { id, username, email, imageId, image } = await userRepository.getUserById(userId);
  return { id, username, email, imageId, image };
};

// updating user via users id => needed to sent new user object at all
export const update = async user => userRepository.updateById(
  user.id, user
);
