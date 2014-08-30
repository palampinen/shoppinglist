angular.module('shoplist.controllers', [])

.controller('DashCtrl', function($scope) {
})

.controller('ItemsCtrl', function($scope, $timeout, Items) {
  $scope.items = Items;

  //  Add item, parameters text, added, done
  $scope.addItem = function(text) {
	$scope.items.$add({name:text, added:new Date().getTime(), done:false}).then(function(data) {
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
