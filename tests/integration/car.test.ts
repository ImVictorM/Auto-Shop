import chai from 'chai';
import Sinon from 'sinon';

import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../src/app';
import { 
  ALL_CARS, 
  ALL_CARS_FROM_SERVICE, 
  VALID_CAR_FROM_DB, 
  VALID_CAR_FROM_REQ, 
  VALID_CAR_FROM_SERVICE, 
  VALID_ID, 
} from '../mocks/car.mock';

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

  describe('Route: POST /cars', function () {
    it('Can create a new car', async function () {
      Sinon.stub(Model, 'create').resolves(VALID_CAR_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .post('/cars')
        .send(VALID_CAR_FROM_REQ);
      
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_CAR_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });

  describe('Route: GET /cars/:id', function () {
    it('can get a car by its id', async function () {
      Sinon.stub(Model, 'findById').resolves(VALID_CAR_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .get(`/cars/${VALID_ID}`);
      
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_CAR_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: PUT /cars/:id', function () {
    it('Can update a car', async function () {
      Sinon.stub(Model, 'findOneAndUpdate').resolves(VALID_CAR_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .put(`/cars/${VALID_ID}`)
        .send(VALID_CAR_FROM_REQ);
      
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_CAR_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: DELETE /cars/:id', function () {
    it('Can delete a car', async function () {
      Sinon.stub(Model, 'findOneAndDelete').resolves(VALID_CAR_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .delete(`/cars/${VALID_ID}`);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({});
      expect(chaiHttpResponse.status).to.be.equal(204);
    });
  });

  describe('Error cases', function () {
    it('Throws an exception when id from request isn\'t valid', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .delete('/cars/2');
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid mongo id' });
      expect(chaiHttpResponse.status).to.be.equal(422);
    });
    it('Throws an exception when car doesn\'t exists on db', async function () {
      Sinon.stub(Model, 'findById').resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get(`/cars/${VALID_ID}`);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Car not found' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  });
});