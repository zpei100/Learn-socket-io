const createMessage = function (from, message) {
  return {
    from, message, createdAt: new Date().getTime()
  }
}

const createLocationMessage = function (from, latitude, longitude) {
  console.log('location is: ', latitude, longitude);
  return {
    from, url: `https://www.google.com/maps/?q=${latitude},${longitude}`, createdAt: new Date().getTime()
  }
}

module.exports = {createMessage, createLocationMessage}