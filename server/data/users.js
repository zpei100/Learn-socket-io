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
    inRoom: function(room) {
      var allIDs = Object.keys(users);
      return allIDs.filter(function(id) {
        return users[id].room === room;
      }).map(function(id) {
        return users[id].name;
      })
    }

  }

})()

module.exports = {users}