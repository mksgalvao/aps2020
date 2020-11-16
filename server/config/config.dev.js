const _ = require('lodash');
const defaultConfig = require('./config.default');

/**
 * Configuration for development environment
 */
let devConfig = {
  auth: {
    verifyEmail: true, // If true, require email verification when signing up
    resetPassword: true, // If true, be able to reset password via email
  },
  morgan: {
    format: 'dev', // TODO: possible values: combined, common, dev, short, tiny
  },
  oauth: {
    storeTokens: false, // If true, the OAuth accessToken and refreshToken will be stored in database
  },
  seed: {
    logging: true,
    users: [
      {
        username: 'root',
        email: 'root@tdev.app',
        password: 'password',
        firstName: 'Root',
        lastName: 'Account',
        role: 'root',
      },
      {
        username: 'admin',
        email: 'admin@tdev.app',
        password: 'password',
        firstName: 'Admin',
        lastName: 'Account',
        role: 'admin',
      },
      {
        username: 'user',
        email: 'user@tdev.app',
        password: 'password',
        firstName: 'User',
        lastName: 'Account',
        role: 'user',
      },
    ],
    dams: [
      {
        _id: 0,
        name: 'Cantareira',
        location: {
          lat: -23.1566035,
          lng: -46.3984796,
        },
      },
      {
        _id: 1,
        name: 'Alto Tietê',
        location: {
          lat: -23.4456417,
          lng: -46.3388959,
        },
      },
      {
        _id: 2,
        name: 'Guarapiranga',
        location: {
          lat: -23.6878731,
          lng: -46.7244247,
        },
      },
      {
        _id: 3,
        name: 'Cotia',
        location: {
          lat: -23.7112341,
          lng: -46.9700857,
        },
      },
      {
        _id: 4,
        name: 'Rio Grande',
        location: {
          lat: -23.7631571,
          lng: -46.6366037,
        },
      },
      {
        _id: 5,
        name: 'Rio Claro',
        location: {
          lat: -23.5572303,
          lng: -45.9311983,
        },
      },
      {
        _id: 17,
        name: 'São Lourenço',
        location: {
          lat: -23.916974,
          lng: -47.2005764,
        },
      },
    ],
  },
};

devConfig = _.merge({}, defaultConfig, devConfig);

module.exports = devConfig;
