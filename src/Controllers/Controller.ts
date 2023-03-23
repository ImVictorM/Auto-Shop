import { Router, Request, Response, NextFunction } from 'express';
import Service from '../Services/Service';
import HTTPStatusCode from '../utils/HTTPStatusCode';

abstract class Controller <DataInterface, Domain> {
  protected service: Service<DataInterface, Domain>;
  protected router: Router;

  constructor(service: Service<DataInterface, Domain>) {
    this.service = service;
    this.router = Router();
  }

  protected async requestAll(_req: Request, res: Response) {
    const docList = await this.service.getAll();
    return res.status(HTTPStatusCode.OK).json(docList);
  }

  protected async requestCreation(req: Request, res: Response) {
    const docFromReq = req.body;
    const createdDoc = await this.service.createOne(docFromReq);
    return res.status(HTTPStatusCode.CREATED).json(createdDoc);
  }

  protected async requestOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const document = await this.service.getById(id);
      return res.status(HTTPStatusCode.OK).json(document);
    } catch (error) {
      return next(error);
    }
  }

  protected async requestToUpdateOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const patch = req.body;

    try {
      const updatedDocument = await this.service.updateById(id, patch);
      return res.status(HTTPStatusCode.OK).json(updatedDocument);
    } catch (error) {
      return next(error);
    }
  }

  abstract initRoutes(): Router;
}

export default Controller;
