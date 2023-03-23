import chai from 'chai';
import Sinon from 'sinon';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import { VALID_MOTO_FROM_DB, VALID_MOTO_FROM_REQ } from './mocks/motorcycle.mock';

const { expect } = chai;

describe('Testing MotorcycleService', function () {
  const service = new MotorcycleService();

  afterEach(function () {
    Sinon.restore();
  });

  it('Can create a motorcycle succesffully', async function () {
    Sinon.stub(MotorcycleODM.prototype, 'createOne').resolves(VALID_MOTO_FROM_DB);

    const response = await service.createOne(VALID_MOTO_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });
});