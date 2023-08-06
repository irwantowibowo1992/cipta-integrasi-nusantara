require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const db = require('./helpers/db')
const seedData = require('../db/seeds_test/seed_user')

const API = 'http://localhost:7000/api'
const token = process.env.TOKEN_TEST

chai.use(chaiHttp);

const expect = chai.expect;

describe('Auth api', () => {
    beforeEach(async () => {
        await db.migrate.latest()
        await seedData()
    })

    after(async () => {
        await db.migrate.rollback()
    })

    it('should success register user', (done) => {
        const param = {
            "name": "Rina Pratama",
            "email": "simantab@harakirimail.com",
            "password": "rinapratama"
        }

        chai
            .request(API)
            .post('/register')
            .send(param)
            .end(
                (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message')
                    expect(res.body.message).to.equal('Register successfully')
                    done();
                }
            );
    })

    it('should return user info and token', (done) => {
        const userParam = {
            email: "simantab@harakirimail.com",
            password: "rinapratama",
        };

        chai
            .request(API)
            .post('/login')
            .send(userParam)
            .end(
                (err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.data).to.be.an('object')
                    expect(res.body.data).to.have.property('user');
                    expect(res.body.data).to.have.property('token');
                    done()
                }
            );
    })

    it('should return user data', (done) => {
        chai
            .request(API)
            .get(`/me`)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.data).to.be.an('object');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('name')
                expect(res.body.data).to.have.property('email');
                done();
            })
    })
})