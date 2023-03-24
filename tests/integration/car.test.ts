import chai from 'chai';
import Sinon from 'sinon';

import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../src/app';
import { ALL_CARS, ALL_CARS_FROM_SERVICE } from '../mocks/car.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Car routes', function () {
  let chaiHttpResponse;

  afterEach(function () {
    Sinon.restore();
  });

  describe('Route: GET /cars', function () {
    it('Can get all cars', async function () {
      Sinon.stub(Model, 'find').resolves(ALL_CARS);  

      chaiHttpResponse = await chai
        .request(app)
        .get('/cars');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_CARS_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });
});