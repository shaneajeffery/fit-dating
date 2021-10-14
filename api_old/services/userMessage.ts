/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import UserMessage from '../models/userProfile';

export class UserMessageService {
  public async getConversation(): Promise<Record<string, unknown>> {
    try {
    } catch (err: any) {}
  }

  // May need to paginate this given how many conversations
  public async getAllUserMessages(): Promise<Record<string, unknown>> {
    try {
    } catch (err: any) {}
  }

  public async create(userMessage: Record<string, unknown>): Promise<any> {
    const newUserMessage = new UserMessage(userMessage);

    try {
      return await newUserMessage.save();
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async update(id: string, user: any): Promise<any> {
    try {
      return await UserMessage.update({ _id: id }, user).exec();
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const userMessageService = new UserMessage();
