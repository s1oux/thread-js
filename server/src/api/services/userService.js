import userRepository from '../../data/repositories/userRepository';
import { encrypt } from '../../helpers/cryptoHelper';
import { sendResetEmail } from '../../helpers/mailHelper';

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

export const update = async user => userRepository.updateById(
  user.id, user
);

export const sendResetTokenByEmail = async (email, clientHost) => {
  const user = await getUserByEmail(email);
  if (user) {
    const token = await encrypt(user.email);
    const userToUpdate = {
      ...user.dataValues,
      resetPasswordToken: token,
      resetPasswordExpiresAt: Date.now() + (60 * 60 * 1000)
    };
    const updatedUser = await update(userToUpdate);
    const result = await sendResetEmail(updatedUser, clientHost);
    return { ...result, notfound: false };
  }
  return { notfound: true };
};

export const resetPassword = async ({ user, password }) => {
  const fetchedUser = await getUserByEmail(user.email);
  const encryptedPassword = await encrypt(password);
  const userToUpdate = {
    ...fetchedUser.dataValues,
    password: encryptedPassword,
    resetPasswordToken: null,
    resetPasswordExpiresAt: null
  };
  const updatedUser = await update(userToUpdate);
  return updatedUser;
};
