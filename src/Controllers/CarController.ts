import { Router } from 'express';
import CarService from '../Services/CarService';
import Controller from './Controller';
import ICar from '../Interfaces/ICar';
import Car from '../Domains/Car';

class CarController extends Controller<ICar, Car> {
  constructor() {
    const service = new CarService();
    super(service);
  }

  public initRoutes(): Router {
    this.router.get('/', (req, res) => this.requestAll(req, res));
    this.router.get('/:id', (req, res, next) => this.requestOne(req, res, next));
    this.router.put('/:id', (req, res, next) => this.requestToUpdateOne(req, res, next));
    this.router.post('/', (req, res) => this.requestCreation(req, res));
    this.router.delete('/:id', (req, res, next) => this.requestToDeleteOne(req, res, next));
    return this.router;
  }
}

export default CarController;