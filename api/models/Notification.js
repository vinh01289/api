/**
 * Notification.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    customerId: {
      model: 'customer'
    },

    title: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string',
      required: true
    },

  },

};
