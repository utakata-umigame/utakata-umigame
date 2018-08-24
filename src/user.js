module.exports = function() {
  this.name = '';
  this.removePass = '';
  this.currentRoom = '';
  this.getName = function() {
    if(this.name) return this.name;
    else return sessionStorage.name;
  };
  this.setName = function(name) {
    this.name = name;
    sessionStorage.name = name;
  };
  this.getRemovePass = function() {
    if(this.removePass) return this.removePass;
    else return sessionStorage.removePass;
  };
  this.setRemovePass = function(removePass) {
    this.removePass = removePass;
    sessionStorage.removePass = removePass;
  };
  this.getRoom = function() {
    return this.currentRoom;
  };
  this.setRoom = function(room) {
    this.currentRoom = room;
  };
  this.getPerPage = function() {
    if(this.perPage) return this.perPage;
    else return sessionStorage.perPage;
  };
  this.setPerPage = function(value) {
    this.perPage = value;
    sessionStorage.perPage = value;
  };
};
