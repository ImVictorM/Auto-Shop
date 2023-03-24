import chai from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { 
  ALL_MOTOS, 
  VALID_MOTO_FROM_DB, 
  VALID_MOTO_FROM_REQ, 
  VALID_ID, 
} from '../../mocks/motorcycle.mock';

const { expect } = chai;

describe('Testing MotorcycleODM', function () {
  const odm = new MotorcycleODM();

  afterEach(function () {
    Sinon.restore();
  });

  it('Can create a motorcycle successfully', async function () {
    Sinon.stub(Model, 'create').resolves(VALID_MOTO_FROM_DB);

    const response = await odm.createOne(VALID_MOTO_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });

  it('Can get all motorcycles', async function () {
    Sinon.stub(Model, 'find').resolves(ALL_MOTOS);

    const response = await odm.getAll();

    expect(response).to.be.deep.equal(ALL_MOTOS);
  });

  it('Can get a motorcycle by its id', async function () {
    Sinon.stub(Model, 'findById').resolves(VALID_MOTO_FROM_DB);

    const response = await odm.getById(VALID_ID);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });

  it('Can update a motorcycle by its id', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(VALID_MOTO_FROM_DB);

    const response = await odm.updateOne(VALID_ID, VALID_MOTO_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_MOTO_FROM_DB);
  });

  it('Can delete a motorcycle by its id', async function () {
    Sinon.stub(Model, 'findOneAndDelete').resolves(VALID_MOTO_FROM_DB);

    const response = await odm.deleteOne(VALID_ID);

    expect(response).to.be.equal(VALID_MOTO_FROM_DB);
  });
});