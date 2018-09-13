var socket = io();
var createMoment = function(time) {
  return moment(time).format('h:mm a');
}

socket.on('connect', () => {
  socket.emit('userJoined');
});

socket.on('anotherUserJoined', function() {
  //later, replace with actual user information
  console.log('Another user has joined!');
});

$('#sendMessage').on('click', function(e) {
  e.preventDefault();
  var message = $('#message')[0];
  socket.emit('createMessage', message.value);
  message.value = ''; 
});

socket.on('newMessage', function(newMessage) {
  var template = $('#message-template').html();
  var message = Mustache.render(template, {
    from: newMessage.from,
    createdAt: moment(newMessage.createdAt).format('h:mm a'),
    message: newMessage.message
  });

  $('#messages').append(message);
});

var locationButton = $('#locationButton')
locationButton.on('click', function() {

  var disableButton = function (btn) {
    btn.text('Sending...')
    btn.attr('disabled', 'disabled')
  }

  var enableButton = function(btn, text) {
    btn.removeAttr('disabled')
    btn.text(text);
  }
  
  disableButton(locationButton);

  navigator.geolocation.getCurrentPosition(
    function(location) {
      enableButton(locationButton, 'Send Location');
      var position = location.coords;
      socket.emit('sendLocation', position.latitude, position.longitude);
    },
    function() {
      locationButton.removeAttr('disabled');
      alert('Could not fetch location!');
    }
  );
});

socket.on('sendLocationMessage', function(locationMessage) {

  var template = $('#location-message-template').html();
  var message = Mustache.render(template, {
    from: locationMessage.from,
    createdAt: moment(locationMessage.createdAt).format('h:mm a'),
    url: locationMessage.url
  });

  $('#messages').append(message);
});
