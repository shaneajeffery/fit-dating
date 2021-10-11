/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Activity from '../models/activity';

export class ActivityService {
  public async getById(id: string): Promise<Record<string, unknown>> {
    try {
      return await Activity.findOne({ _id: id }).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async create(activity: Record<string, unknown>): Promise<any> {
    const newActivity = new Activity(activity);

    try {
      return await newActivity.save();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async list(): Promise<Record<string, unknown>[]> {
    try {
      return await Activity.find({}).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async update(id: string, activity: any): Promise<any> {
    try {
      return await Activity.update({ _id: id }, activity).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const activityService = new ActivityService();
