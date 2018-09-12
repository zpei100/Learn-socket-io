const moment = require('moment');

function createMoment() {
  return moment().format('H:mm a')
}

module.exports = {createMoment}