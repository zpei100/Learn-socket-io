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
  const li = $('<li></li>');
  li.text(`${newMessage.from} @${createMoment(newMessage.createdAt)}: ${newMessage.message}  `);
  $('#messages').append(li);
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
  console.log('locationMessage:', locationMessage);
  var li = $('<li></li>');
  li.text(`${locationMessage.from} @${createMoment(locationMessage.createdAt)}: `);

  var a = $('<a></a>');
  a.text('My Location');
  a.attr('target', '_blank');
  a.attr('href', locationMessage.url);
  li.append(a);
  $('#messages').append(li);
});
