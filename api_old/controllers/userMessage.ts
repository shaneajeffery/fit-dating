import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { userMessageService } from '../services/userMessageService';

export class UserMessageController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get('/api/v1/user_message', this.list.bind(this));
    httpServer.get('/api/v1/user_message/:id', this.getById.bind(this));
    httpServer.post('/api/v1/user_message', this.create.bind(this));
    httpServer.put('/api/v1/user_message/:id', this.update.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await userMessageService.list());
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const activity = await userMessageService.getById(req.params.id);
    res.send(activity ? 200 : 404, activity);
  }

  private async create(req: Request, res: Response): Promise<void> {
    res.send(await userMessageService.create(req.body));
  }

  private async update(req: Request, res: Response): Promise<void> {
    res.send(await userMessageService.update(req.params.id, req.body));
  }
}
