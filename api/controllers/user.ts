import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { userService } from '../services/user';

export class UserController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get('user', this.list.bind(this));
    httpServer.get('user/:id', this.getById.bind(this));
    httpServer.post('user', this.create.bind(this));
    httpServer.put('user/:id', this.update.bind(this));
    httpServer.del('user/:id', this.remove.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await userService.list());
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const user = await userService.getById(req.params.id);
    res.send(user ? 200 : 404, user);
  }

  private async create(req: Request, res: Response): Promise<void> {
    res.send(await userService.create(req.body));
  }

  private async update(req: Request, res: Response): Promise<void> {
    res.send(await userService.update({ ...req.body, id: req.params.id }));
  }

  private async remove(req: Request, res: Response): Promise<void> {
    try {
      await userService.delete(req.params.id);
      res.send(200);
    } catch (e) {
      res.send(500);
    }
  }
}
