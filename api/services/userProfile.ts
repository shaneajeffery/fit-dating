/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import UserProfile from '../models/userProfile';

export class UserProfileService {
  public async getById(id: string): Promise<Record<string, unknown>> {
    try {
      return await UserProfile.findOne({ _id: id }).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async create(user: Record<string, unknown>): Promise<any> {
    const newUserProfile = new UserProfile(user);

    try {
      return await newUserProfile.save();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async list(): Promise<Record<string, unknown>[]> {
    try {
      return await UserProfile.find({}).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async update(id: string, user: any): Promise<any> {
    try {
      return await UserProfile.update({ _id: id }, user).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const userProfileService = new UserProfile();
