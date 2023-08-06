const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'Irwanto Wibwo', 
      email: 'irwanto@domain.com', 
      password: '$2a$10$Q6VCrLqE/0PGhedNvfcBQuRGi4unSSgEh/znOWq2OTTJYLnSD65Xm'
    }
  ]);
};
