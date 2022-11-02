import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/Teams';
import { app } from '../app';
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa falha no teams', () => {
  let chaiHttpResponse: Response;

  it('Retorna id invalido', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/teams/999')
    .send();
    
    const { status } = chaiHttpResponse;
    const { message } = chaiHttpResponse.body;
    expect(message).to.equals('Team not found');
    expect(status).to.equals(404);
  });
});
