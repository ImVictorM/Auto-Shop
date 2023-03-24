import chai from 'chai';
import { NextFunction, Request, Response } from 'express';
import Sinon, { SinonSpy } from 'sinon';
import sinonChai from 'sinon-chai';
import MotorcycleController from '../../../src/Controllers/MotorcycleController';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { 
  ALL_MOTOS_FROM_SERVICE, 
  VALID_MOTO_FROM_REQ, 
  VALID_MOTO_FROM_SERVICE,
  VALID_ID,
} from '../mocks/motorcycle.mock';

chai.use(sinonChai);

const { expect } = chai;

describe('Testing MotorcycleController', function () {
  let controller: MotorcycleController;
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(function () {
    controller = new MotorcycleController();
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

  it('Can request a motorcycle creation successfully', async function () {
    Sinon.stub(MotorcycleService.prototype, 'createOne').resolves(VALID_MOTO_FROM_SERVICE);
    req.body = VALID_MOTO_FROM_REQ;

    await controller.requestCreation(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(VALID_MOTO_FROM_SERVICE);
  });

  it('Can request to get all motorcycles', async function () {
    Sinon.stub(MotorcycleService.prototype, 'getAll').resolves(ALL_MOTOS_FROM_SERVICE);

    await controller.requestAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(ALL_MOTOS_FROM_SERVICE);
  });

  it('Can request to get a motorcycle by its id', async function () {
    Sinon.stub(MotorcycleService.prototype, 'getById').resolves(VALID_MOTO_FROM_SERVICE);
    req.params.id = VALID_ID;

    await controller.requestOne(req, res, next);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(VALID_MOTO_FROM_SERVICE);
  });

  it('Can request to update a motorcycle by its id', async function () {
    Sinon.stub(MotorcycleService.prototype, 'updateById').resolves(VALID_MOTO_FROM_SERVICE);
    req.params.id = VALID_ID;

    await controller.requestToUpdateOne(req, res, next);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(VALID_MOTO_FROM_SERVICE);
  });

  it('Can request to delete a motorcycle by its id', async function () {
    Sinon.stub(MotorcycleService.prototype, 'deleteById').resolves();
    req.params.id = VALID_ID;

    await controller.requestToDeleteOne(req, res, next);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledOnceWith();
  });

  it('Calls next function when something went wrong', async function () {
    Sinon.stub(MotorcycleService.prototype, 'getById').throws(new Error());
    req.params.id = VALID_ID;

    await controller.requestOne(req, res, next);

    Sinon.assert.calledOnce(next as SinonSpy);
  });
});