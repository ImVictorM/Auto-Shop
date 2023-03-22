import { Router } from 'express';

abstract class Controller <ServiceType> {
  protected service: ServiceType;
  protected router: Router;

  constructor(service: ServiceType) {
    this.service = service;
    this.router = Router();
  }

  abstract initRoutes(): Router;
}

export default Controller;
