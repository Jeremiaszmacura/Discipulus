const env = process.env.NODE_ENV || 'development'; // eslint-disable-line
const credentials = require(`./.credentials.${env}`);

module.exports = { credentials }
