import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import Sinon, { SinonSpy } from 'sinon';
import sinonChai from 'sinon-chai';
import CarController from '../../../src/Controllers/CarController';
import CarService from '../../../src/Services/CarService';
import {  
  ALL_CARS_FROM_SERVICE, 
  VALID_CAR_FROM_REQ, 
  VALID_CAR_FROM_SERVICE,
  VALID_ID, 
} from '../mocks/car.mock';

chai.use(sinonChai);

const { expect } = chai;

describe('Testing CarController', function () {
  let controller: CarController;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(function () {
    controller = new CarController();
    res = {} as Response;
    req = { params: { id: null } } as unknown as Request;
    next = Sinon.spy();

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
    res.end = Sinon.stub().returns(res);
  });

  afterEach(function () {
    Sinon.restore();
  });

  it('Can request a car creation successfully', async function () {
    Sinon.stub(CarService.prototype, 'createOne').resolves(VALID_CAR_FROM_SERVICE);
    req.body = VALID_CAR_FROM_REQ;

    await controller.requestCreation(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(VALID_CAR_FROM_SERVICE);
  });

  it('Can request to get all cars', async function () {
    Sinon.stub(CarService.prototype, 'getAll').resolves(ALL_CARS_FROM_SERVICE);

    await controller.requestAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(ALL_CARS_FROM_SERVICE);
  });

  it('Can request to get a car by its id', async function () {
    Sinon.stub(CarService.prototype, 'getById').resolves(VALID_CAR_FROM_SERVICE);
    req.params.id = VALID_ID;

    await controller.requestOne(req, res, next);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(VALID_CAR_FROM_SERVICE);
  });

  it('Can request to update a car by its id', async function () {
    Sinon.stub(CarService.prototype, 'updateById').resolves(VALID_CAR_FROM_SERVICE);
    req.params.id = VALID_ID;

    await controller.requestToUpdateOne(req, res, next);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(VALID_CAR_FROM_SERVICE);
  });

  it('Can request to delete a car by its id', async function () {
    Sinon.stub(CarService.prototype, 'deleteById').resolves();
    req.params.id = VALID_ID;

    await controller.requestToDeleteOne(req, res, next);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledOnceWith();
  });

  it('Calls next function when something went wrong', async function () {
    Sinon.stub(CarService.prototype, 'getById').throws(new Error());
    req.params.id = VALID_ID;

    await controller.requestOne(req, res, next);

    Sinon.assert.calledOnce(next as SinonSpy);
  });
});