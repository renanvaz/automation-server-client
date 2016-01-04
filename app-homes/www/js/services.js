angular.module('starter.services', [])

.service('Groups', function($q, $timeout){
  this.all = function(){
    var deferred = $q.defer();
    var data = [
      {title: 'Geral', id: 1},
      {title: 'Quarto Renan', id: 2},
      {title: 'Banheiro Renan', id: 3},
      {title: 'Cozinha', id: 4},
      {title: 'Sala', id: 5},
      {title: 'Quintal', id: 6}
    ];

    if (true) {
      $timeout(function() {
        deferred.resolve(data);
      }, 0);
    } else {
      deferred.reject('Greeting ' + name + ' is not allowed.');
    }

    return deferred.promise;
  };

  this.get = function(id){
    var deferred = $q.defer();

    this.all().then(function(data){
      var group = data.filter(function(item){ return item.id == id; })[0];
      group.items = [];

      for (var i = 0; i < 10; i++) {
        group.items.push({id: i, title: 'Point '+i, on: Math.random() > .5});
      }

      deferred.resolve(group);
    });

    return deferred.promise;
  };
});
