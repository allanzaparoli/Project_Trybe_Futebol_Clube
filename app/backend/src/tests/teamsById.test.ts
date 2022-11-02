import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/Teams';
import { app } from '../app';
import { Response } from 'superagent';
import { mockTeamById } from '../utils/mocks.utils';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa id do teams', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, 'findOne')
      .resolves(mockTeamById as Teams);
  });

  afterEach(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  });

  it('Retorna o id do team', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1')
      .send();
    
    const result = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;
    expect(result).to.deep.equals(mockTeamById);
    expect(status).to.equals(200);
  });
});
