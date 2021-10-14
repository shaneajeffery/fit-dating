import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { activityService } from '../services/activity';

export class ActivityController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get('/api/v1/activity', this.list.bind(this));
    httpServer.get('/api/v1/activity/:id', this.getById.bind(this));
    httpServer.post('/api/v1/activity', this.create.bind(this));
    httpServer.put('/api/v1/activity/:id', this.update.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await activityService.list());
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const activity = await activityService.getById(req.params.id);
    res.send(activity ? 200 : 404, activity);
  }

  private async create(req: Request, res: Response): Promise<void> {
    res.send(await activityService.create(req.body));
  }

  private async update(req: Request, res: Response): Promise<void> {
    res.send(await activityService.update(req.params.id, req.body));
  }
}
