var users = (function() {
  var users = {};

  return {
    addUser: function(id, user) {
      users[id] = user
    },
    getUsers: function() {
      return users
    },
    removeUser: function (id) {
      delete users[id]
    },
    start: function() {
      users = {}
    },
    roomUsers: function(room) {
      var allUsers = Object.keys(users);
      return allUsers.filter(function(user) {
        return user.room === room;
      }).map(function(user) {
        user.name;
      })
    }

  }

})()

module.exports = {users}