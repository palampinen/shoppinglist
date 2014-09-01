angular.module('shoplist.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ItemsCtrl', function($scope, $timeout, Items) {
  $scope.items = Items;

  //  Add item, parameters text, added, done
  $scope.addItem = function(text) {
  	var added = new Date().getTime();

    
    // search if item exists, preventing duplicates
    var i = 0,
        t = text.toUpperCase(),
        exists =  false;
    Items.forEach(function(element) {
      if(element.name.toUpperCase() == t){

          Items[i].done = false,
          Items[i].added = added;
          Items.$save(Items[i]);
          exists = true;
          // end loop
          return false;
        }
      i++;
    });

    // add item if not found
    if(!exists)
    	Items.$add({name:text, added: added, done:false}).then(function(data) {
    		$scope.itemText = ''
    	});

  };

  //  Get time passed from last action 
  $scope.getTimeAgo = function(ago) {
	var diff = (new Date().getTime() - ago) / 60000; // minutes

	if(diff < 60)
	  	return Math.round(diff) + ' min';
	else if(diff < 60 * 24)
	  	return Math.round(diff/60) + ' h';
	else (diff < 60 * 24)
	  	return Math.round(diff/60/24) + ' pv';
  }

  // Today for modifying added-value
  $scope.today = new Date().getTime();

})

/*
.controller('ItemDetailCtrl', function($scope, $stateParams, Items) {
  $scope.item = Items.get($stateParams.itemId);
})
*/
