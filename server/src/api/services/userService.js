import userRepository from '../../data/repositories/userRepository';

export const getUserById = async userId => {
  const { id, username, email, imageId, status, image } = await userRepository.getUserById(userId);
  return { id, username, email, imageId, status, image };
};

export const getUserByEmail = async email => {
  const user = await userRepository.getByEmail(email);
  return user;
};

export const getUserByToken = async token => {
  const user = await userRepository.getByToken(token);
  return user;
};

// updating user via users id => needed to sent new user object at all
export const update = async user => userRepository.updateById(
  user.id, user
);
