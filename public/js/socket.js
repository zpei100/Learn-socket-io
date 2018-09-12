var socket = io();

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
  li.text(`${newMessage.from}: ${newMessage.message}`);
  $('#messages').append(li);
});

$('#locationButton').on('click', function() {
  navigator.geolocation.getCurrentPosition(
    function(location) {
      var position = location.coords;
      socket.emit('sendLocation', position.latitude, position.longitude);
    },
    function() {
      alert('Could not fetch location!');
    }
  );
});

socket.on('sendLocationMessage', function(locationMessage) {
  console.log('locationMessage:', locationMessage);
  var li = $('<li></li>');
  li.text(`From: ${locationMessage.from}: `);

  var a = $('<a></a>');
  a.text('My Location');
  a.attr('target', '_blank');
  a.attr('href', locationMessage.url);
  li.append(a);
  $('#messages').append(li);
});
