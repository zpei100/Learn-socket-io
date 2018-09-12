const moment = require('moment');

const createMessage = function (from, message) {
  return {
    from, message, createdAt: moment().valueOf()
  }
}

const createLocationMessage = function (from, latitude, longitude) {
  console.log('location is: ', latitude, longitude);
  return {
    from, url: `https://www.google.com/maps/?q=${latitude},${longitude}`, createdAt: moment().valueOf()
  }
}

module.exports = {createMessage, createLocationMessage}