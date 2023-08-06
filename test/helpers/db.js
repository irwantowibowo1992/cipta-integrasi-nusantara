const knex = require('knex')
const { Model } = require('objection')

const testConfig = require('../../knexfile').test

const testDb = knex(testConfig)
Model.knex(testDb)

module.exports = testDb