import { Controller } from './controller';
import { HttpServer } from '../server/httpServer';
import { Request, Response } from 'restify';
import { userProfileService } from '../services/userProfile';

export class UserProfileController implements Controller {
  public initialize(httpServer: HttpServer): void {
    httpServer.get('/api/v1/user_profile', this.list.bind(this));
    httpServer.get('/api/v1/user_profile/:id', this.getById.bind(this));
    httpServer.post('/api/v1/user_profile', this.create.bind(this));
    httpServer.put('/api/v1/user_profile/:id', this.update.bind(this));
  }

  private async list(req: Request, res: Response): Promise<void> {
    res.send(await userProfileService.list());
  }

  private async getById(req: Request, res: Response): Promise<void> {
    const userProfile = await userProfileService.getById(req.params.id);
    res.send(userProfile ? 200 : 404, userProfile);
  }

  private async create(req: Request, res: Response): Promise<void> {
    res.send(await userProfileService.create(req.body));
  }

  private async update(req: Request, res: Response): Promise<void> {
    res.send(await userProfileService.update(req.params.id, req.body));
  }
}
