import { UserController } from './user';
import { UserProfileController } from './userProfile';
import { ActivityController } from './activity';

export const CONTROLLERS = [
  new UserController(),
  new UserProfileController(),
  new ActivityController(),
];
