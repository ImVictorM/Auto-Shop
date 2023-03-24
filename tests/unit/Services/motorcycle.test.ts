import chai from 'chai';
import Sinon from 'sinon';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { 
  ALL_MOTOS, 
  VALID_MOTO_FROM_DB, 
  VALID_MOTO_FROM_REQ,
  VALID_ID, 
} from '../../mocks/motorcycle.mock';

const { expect } = chai;

describe('Testing MotorcycleService', function () {
  const service = new MotorcycleService();

  afterEach(function () {
    Sinon.restore();
  });

  it('Can create a motorcycle successfully', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'createOne').resolves(VALID_MOTO_FROM_DB);

    const response = await service.createOne(VALID_MOTO_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });

  it('Can get all motorcycles', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'getAll').resolves(ALL_MOTOS);

    const response = await service.getAll();

    expect(response).to.be.deep.equal(ALL_MOTOS);
  });

  it('Can get a motorcycle by its id', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'getById').resolves(VALID_MOTO_FROM_DB);

    const response = await service.getById(VALID_ID);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });

  it('Can update a motorcycle by its id', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'updateOne').resolves(VALID_MOTO_FROM_DB);

    const response = await service.updateById(VALID_ID, VALID_MOTO_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });

  it('Can delete a motorcycle by its id', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'deleteOne').resolves(VALID_MOTO_FROM_DB);

    const response = await service.deleteById(VALID_ID);

    expect(response).to.be.equal(undefined);
  });

  it('throws an exception when the motocycle id isn\'t valid', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'getById').resolves(null);

    try {
      await service.getById('123');
    } catch (error) {
      expect((error as Error).message).to.be.equal('Invalid mongo id');
      expect((error as Error).stack).to.be.equal('422');
    }
  });

  it('throws an exception when the motorcycle doesn\'t exist', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'getById').resolves(null);

    try {
      await service.getById(VALID_ID);
    } catch (error) {
      expect((error as Error).message).to.be.equal('Motorcycle not found');
      expect((error as Error).stack).to.be.equal('404');
    }
  });
});