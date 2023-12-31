const {Model} = require('objection');
const Knex = require('knex');
const bcrypt = require('bcrypt');
const knexConfig = require('../../knexfile');

const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
Model.knex(knex);

class User extends Model {
    /**
     * create action before insert in database
     */
    static get tableName() {
        return 'users';
    }

    async $beforeInsert() {
        this.password = await bcrypt.hash(this.password, 10);
        this.created_at = await new Date().toISOString();
    }

    /**
     * create action before update in database
     */
    async $beforeUpdate() {
        this.updated_at = await new Date().toISOString();
    }

    /**
     * It returns column name object
     */
    static column = {
        id: `${this.tableName}.id`,
        name: `${this.tableName}.name`,
        email: `${this.tableName}.email`,
        password: `${this.tableName}.password`,
        created_at: `${this.tableName}.created_at`,
        updated_at: `${this.tableName}.updated_at`,
        deleted_at: `${this.tableName}.deleted_at`,
    };
}

module.exports = User;
