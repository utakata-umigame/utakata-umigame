var $ = require('jquery');
window.jQuery = $;
var bootstrap = require('bootstrap');
var angular = require('angular');
var ngRoute = require('angular-route');
var app = angular.module('App', []);
var io = require("socket.io-client");
app.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
var lobbyChatController= function($scope, socket){
  $scope.allMessages = [];
  $scope.messages = [];
  $scope.text = '';
  $scope.name = '';
  $scope.removePass = '';
  $scope.page = 0;
  $scope.perPage = 10;
  socket.on('connect', function() {
    socket.emit('join', 'LobbyChat');
    socket.emit('fetchLobby');
  });
  socket.on('lobbyChat', function(msg){
    $scope.allMessages = msg;
    refresh(msg);
  });
  $scope.send = function send() {
    var data = {
      type: 'lobbyChat',
      name: $scope.name,
      content: $scope.text,
      removePass: $scope.removePass
    };
    console.log('Sending message:', data);
    socket.emit('message', data);
    $scope.text = '';
  };
  $scope.setName = function setName(){
    socket.emit('identify', $scope.name);
  };
  $scope.remove = function remove(id){
    var data = {
      id: id,
      removePass: $scope.removePass
    };
    socket.emit('removeLobby', data);
  };
  $scope.zeroPage = function zeroPage(){
      $scope.page = 0;
      refresh($scope.allMessages);
  }
  $scope.nextPage = function nextPage(){
    $scope.page += 1;
    refresh($scope.allMessages);
  }
  $scope.prevPage = function prevPage(){
    if($scope.page == 0) return;
    $scope.page -= 1;
    refresh($scope.allMessages);
  }
  function refresh(msg){
    $scope.messages = [];
    for(var i=0; i < $scope.perPage; i++){
      $scope.messages.push(msg[$scope.page*$scope.perPage + i]);
    }
  }
};
app.controller("lobbyChatController", lobbyChatController);
