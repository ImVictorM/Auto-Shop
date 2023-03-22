import { NextFunction, Request, Response, Router } from 'express';

abstract class Controller <ServiceType> {
  protected req: Request;
  protected res: Response;
  protected next: NextFunction;
  protected service: ServiceType;

  constructor(service: ServiceType, req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = service;
  }

  abstract initRoutes(): Router;
}

export default Controller;
