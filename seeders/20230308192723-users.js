'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users',
    [
      {
        firstName:'Luis',
        lastName:'Guerra',
        email:'guerra@home.pt',
        password:'12345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'Paulo',
        lastName:'Soares',
        email:'soares@home.pt',
        password:'12345678',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName:'Manuel',
        lastName:'Sousa',
        email:'sousa@home.pt',
        password:'12345678',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}
    );    
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
