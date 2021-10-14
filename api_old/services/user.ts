/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import User from '../models/user';

export class UserService {
  public async getById(id: string): Promise<Record<string, unknown>> {
    try {
      return await User.findOne({ _id: id }).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async create(user: Record<string, unknown>): Promise<any> {
    const newUser = new User(user);

    try {
      return await newUser.save();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async list(): Promise<Record<string, unknown>[]> {
    try {
      return await User.find({}).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async update(id: string, user: any): Promise<any> {
    try {
      return await User.update({ _id: id }, user).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const userService = new UserService();
