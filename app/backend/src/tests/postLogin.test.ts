import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

import { mockadmin } from '../utils/mocks.utils';

describe('Testa login com sucesso', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(mockadmin as Users);
  });

  afterEach(() => {
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('Testa se o Token retorna', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
    const { token } = chaiHttpResponse.body;
    const { status } = chaiHttpResponse;
    expect(status).to.be.equal(200);
    expect(token).to.be.a('string');
  });
});


