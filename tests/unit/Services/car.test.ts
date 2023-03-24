import chai from 'chai';
import Sinon from 'sinon';
import CarODM from '../../../src/Models/CarODM';
import CarService from '../../../src/Services/CarService';
import { VALID_CAR_FROM_REQ, ALL_CARS, VALID_CAR_FROM_DB, VALID_ID } from '../../mocks/car.mock';

const { expect } = chai;

describe('Testing CarService', function () {
  const service = new CarService();

  afterEach(function () {
    Sinon.restore();
  });

  it('Can create a car successfully', async function () {
    Sinon.stub(CarODM.prototype, 'createOne').resolves({ ...VALID_CAR_FROM_REQ, id: '123456' });

    const response = await service.createOne(VALID_CAR_FROM_REQ);

    expect(response).to.be.deep.equal({ ...VALID_CAR_FROM_REQ, id: '123456' });
  });

  it('Can get all cars', async function () {
    Sinon.stub(CarODM.prototype, 'getAll').resolves(ALL_CARS);

    const response = await service.getAll();

    expect(response).to.be.deep.equal(ALL_CARS);
  });

  it('Can get a car by its id', async function () {
    Sinon.stub(CarODM.prototype, 'getById').resolves(VALID_CAR_FROM_DB);

    const response = await service.getById(VALID_CAR_FROM_DB.id);

    expect(response).to.be.deep.equal(VALID_CAR_FROM_DB);
  });

  it('Can update a car by its id', async function () {
    Sinon.stub(CarODM.prototype, 'updateOne').resolves(VALID_CAR_FROM_DB);

    const response = await service.updateById(VALID_ID, VALID_CAR_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_CAR_FROM_DB);
  });

  it('Can delete a car by its id', async function () {
    Sinon.stub(CarODM.prototype, 'deleteOne').resolves(VALID_CAR_FROM_DB);

    const response = await service.deleteById(VALID_ID);

    expect(response).to.be.equal(undefined);
  });

  it('throws an exception when the car id isn\'t valid', async function () {
    Sinon.stub(CarODM.prototype, 'getById').resolves(null);

    try {
      await service.getById('123');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
      expect((error as Error).stack).to.be.equal('422');
    }
  });

  it('throws an exception when the car doesn\'t exist', async function () {
    Sinon.stub(CarODM.prototype, 'getById').resolves(null);

    try {
      await service.getById(VALID_ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Car not found');
      expect((error as Error).stack).to.be.equal('404');
    }
  });
});