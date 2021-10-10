import User from '../models/user';

export class UserService {
  public async getById(id: string): Promise<Customer> {}

  public async create(customer: Customer): Promise<Customer> {}

  public async list(): Promise<Customer[]> {}

  public async update(customer: Customer): Promise<Customer> {}

  public async delete(id: number): Promise<void> {}
}

export const userService = new UserService();
