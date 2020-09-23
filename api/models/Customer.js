/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    address: {
      type: 'string',
      required: true
    },

    phone: {
      type: 'string',
      required: true,
      unique: true
    },

    lat: {
      type: 'number',
      required: true
    },

    long: {
      type: 'number',
      required: true
    },

    owner: {
      model: 'user'
    },

    createBy: {
      model: 'user'
    },

    updateBy: {
      model: 'user'
    }
  },

};
