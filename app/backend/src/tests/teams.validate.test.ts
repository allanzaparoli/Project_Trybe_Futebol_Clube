import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/Teams';
import { app } from '../app';
import { Response } from 'superagent';
import { mockTeam } from '../utils/mocks.utils';
chai.use(chaiHttp);
const { expect } = chai;

describe('Testa requisição', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Teams, 'findAll')
      .resolves(mockTeam as Teams[]);
  });

  afterEach(() => {
    (Teams.findAll as sinon.SinonStub).restore();
  });

  it('Retorna array', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
      .send();

    const result = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;
    expect(result).to.deep.equals(mockTeam);
    expect(status).to.equals(200);
  });
});
