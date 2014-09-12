angular.module('shoplist.services', [])

/**
 * A simple item service that returns shoplist data from Firebase.
 */
.factory('Items', function($firebase, fbURL) {
  // Add three-way data binding
  return $firebase(new Firebase(fbURL)).$asArray();

})

.factory('Item', function($firebase, fbURL) {
  // Add three-way data binding
  return {
		single: function(id) {
			return $firebase(new Firebase(fbURL+id)).$asObject();
		}
	}


})

.factory('Last', function() {
	var lastCheckTimeName 	= 'shoplist-last-checked';
  	var lastChecked 		= localStorage.getItem(lastCheckTimeName);
  	if(!lastChecked) lastChecked = new Date().getTime() ;
	localStorage.setItem(lastCheckTimeName, new Date().getTime() );

 	return lastChecked;
})

.factory('Auth', function($firebase, $state, fbURL) {
	var myRef = new Firebase(fbURL);
	var authClient = new FirebaseSimpleLogin(myRef, function(error, user) {
		 if (error) {
		// an error occurred while attempting login
		console.log(error);
		} else if (user) {
			// user authenticated with Firebase
			console.log("User ID: " + user.uid + ", Provider: " + user.provider);
			$state.go('tab.items')
		} else {
		// user is logged out
		}
	});

	return authClient;
});
