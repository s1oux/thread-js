import { ResetTokenModel } from '../models/index';
import BaseRepository from './baseRepository';

class ResetTokenRepository extends BaseRepository {}

export default new ResetTokenRepository(ResetTokenModel);
