import chai from 'chai';
import Sinon from 'sinon';

import chaiHttp = require('chai-http');
import { Model } from 'mongoose';
import app from '../../src/app';
import { 
  ALL_MOTOS, 
  ALL_MOTOS_FROM_SERVICE, 
  VALID_ID, 
  VALID_MOTO_FROM_DB, 
  VALID_MOTO_FROM_REQ, 
  VALID_MOTO_FROM_SERVICE, 
} from '../mocks/motorcycle.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Motorcycle routes', function () {
  let chaiHttpResponse;

  afterEach(function () {
    Sinon.restore();
  });

  describe('Route: GET /motorcycles', function () {
    it('Can get all motorcycles', async function () {
      Sinon.stub(Model, 'find').resolves(ALL_MOTOS);  

      chaiHttpResponse = await chai
        .request(app)
        .get('/motorcycles');
      
      expect(chaiHttpResponse.body).to.be.deep.equal(ALL_MOTOS_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: POST /motorcycles', function () {
    it('Can create a new motorcycle', async function () {
      Sinon.stub(Model, 'create').resolves(VALID_MOTO_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .post('/motorcycles')
        .send(VALID_MOTO_FROM_REQ);
      
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_MOTO_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(201);
    });
  });

  describe('Route: GET /motorcycles/:id', function () {
    it('can get a motorcycle by its id', async function () {
      Sinon.stub(Model, 'findById').resolves(VALID_MOTO_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .get(`/motorcycles/${VALID_ID}`);
      
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_MOTO_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: PUT /motorcycles/:id', function () {
    it('Can update a motorcycles', async function () {
      Sinon.stub(Model, 'findOneAndUpdate').resolves(VALID_MOTO_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .put(`/motorcycles/${VALID_ID}`)
        .send(VALID_MOTO_FROM_REQ);
      
      expect(chaiHttpResponse.body).to.be.deep.equal(VALID_MOTO_FROM_SERVICE);
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  describe('Route: DELETE /motorcycles/:id', function () {
    it('Can delete a motorcycle', async function () {
      Sinon.stub(Model, 'findOneAndDelete').resolves(VALID_MOTO_FROM_DB);  

      chaiHttpResponse = await chai
        .request(app)
        .delete(`/motorcycles/${VALID_ID}`);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({});
      expect(chaiHttpResponse.status).to.be.equal(204);
    });
  });

  describe('Error cases', function () {
    it('Throws an exception when id from request isn\'t valid', async function () {
      chaiHttpResponse = await chai
        .request(app)
        .delete('/motorcycles/2');
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid mongo id' });
      expect(chaiHttpResponse.status).to.be.equal(422);
    });
    it('Throws an exception when motorcycle doesn\'t exists on db', async function () {
      Sinon.stub(Model, 'findById').resolves(null);

      chaiHttpResponse = await chai
        .request(app)
        .get(`/motorcycles/${VALID_ID}`);
      
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Motorcycle not found' });
      expect(chaiHttpResponse.status).to.be.equal(404);
    });
  });
});