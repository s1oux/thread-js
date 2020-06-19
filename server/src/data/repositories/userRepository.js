import { Op } from 'sequelize';

import { UserModel, ImageModel } from '../models/index';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository {
  addUser(user) {
    return this.create(user);
  }

  getByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  getByToken(token) {
    return this.model.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: { [Op.gt]: Date.now() }
      }
    });
  }

  getByUsername(username) {
    return this.model.findOne({ where: { username } });
  }

  getUserById(id) {
    return this.model.findOne({
      group: [
        'user.id',
        'image.id'
      ],
      where: { id },
      include: {
        model: ImageModel,
        attributes: ['id', 'link']
      }
    });
  }
}

export default new UserRepository(UserModel);
