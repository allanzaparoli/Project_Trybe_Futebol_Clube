import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa validador de requisição', () => {
  let chaiHttpResponse: Response;

  it('Token não funciona', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send();
    const { status } = chaiHttpResponse;
    expect(status).to.be.equal(404);
  });
});

