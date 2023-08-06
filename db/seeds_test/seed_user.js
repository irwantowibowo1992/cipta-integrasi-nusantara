const UserModel = require('../../src/models/user.model')

const data = {
    name: 'Irwanto Wibowo',
    email: 'irwanto@domain.com',
    password: '$2a$10$Q6VCrLqE/0PGhedNvfcBQuRGi4unSSgEh/znOWq2OTTJYLnSD65Xm'
}

async function seedData() {
    await UserModel.query().insert(data)
}

module.exports = seedData