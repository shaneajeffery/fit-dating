import { Next, Request, Response } from 'restify';
import errors = require('restify-errors');
import User from '../models/user';

module.exports = (server) => {
  server.post('/users', (req: Request, res: Response, next: Next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    const data = req.body || {};
    const user = new User(data);

    user.save(function (err) {
      if (err) {
        console.error(err);
        return next(new errors.InternalError(err.message));
      }
      res.send(201);
      next();
    });
  });

  server.get('/users', (req: Request, res: Response, next: Next) => {
    User.find(req.params, (err, docs) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(docs);
      next();
    });
  });

  server.get('/user/:user_id', (req: Request, res: Response, next: Next) => {
    User.findOne({ _id: req.params.user_id }, (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      }

      res.send(doc);
      next();
    });
  });

  server.put('/user/:user_id', (req: Request, res: Response, next: Next) => {
    if (!req.is('application/json')) {
      return next(new errors.InvalidContentError("Expects 'application/json'"));
    }

    let data = req.body || {};
    if (!data._id) {
      data = Object.assign({}, data, { _id: req.params.user_id });
    }

    User.findOne({ _id: req.params.user_id }, (err, doc) => {
      if (err) {
        console.error(err);
        return next(new errors.InvalidContentError(err.errors.name.message));
      } else if (!doc) {
        return next(
          new errors.ResourceNotFoundError(
            'The resource you requested could not be found.'
          )
        );
      }

      User.update({ _id: data._id }, data, function (err) {
        if (err) {
          console.error(err);
          return next(new errors.InvalidContentError(err.errors.name.message));
        }
        res.send(200, data);
        next();
      });
    });
  });
};
