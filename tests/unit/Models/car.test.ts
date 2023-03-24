import chai from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarODM from '../../../src/Models/CarODM';
import { ALL_CARS, VALID_CAR_FROM_DB, VALID_CAR_FROM_REQ, VALID_ID } from '../../mocks/car.mock';

const { expect } = chai;

describe('Testing CarODM', function () {
  const odm = new CarODM();

  afterEach(function () {
    Sinon.restore();
  });

  it('Can create a car successfully', async function () {
    Sinon.stub(Model, 'create').resolves(VALID_CAR_FROM_DB);

    const response = await odm.createOne(VALID_CAR_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_CAR_FROM_DB);
  });

  it('Can get all cars', async function () {
    Sinon.stub(Model, 'find').resolves(ALL_CARS);

    const response = await odm.getAll();

    expect(response).to.be.deep.equal(ALL_CARS);
  });

  it('Can get a car by its id', async function () {
    Sinon.stub(Model, 'findById').resolves(VALID_CAR_FROM_DB);

    const response = await odm.getById(VALID_ID);

    expect(response).to.be.deep.equal(VALID_CAR_FROM_DB);
  });

  it('Can update a car by its id', async function () {
    Sinon.stub(Model, 'findOneAndUpdate').resolves(VALID_CAR_FROM_DB);

    const response = await odm.updateOne(VALID_ID, VALID_CAR_FROM_REQ);

    expect(response).to.be.deep.equal(VALID_CAR_FROM_DB);
  });

  it('Can delete a car by its id', async function () {
    Sinon.stub(Model, 'findOneAndDelete').resolves(VALID_CAR_FROM_DB);

    const response = await odm.deleteOne(VALID_ID);

    expect(response).to.be.equal(VALID_CAR_FROM_DB);
  });
});