angular.module('shoplist.services', [])

/**
 * A simple item service that returns shoplist data from Firebase.
 */
.factory('Items', function($firebase, fbURL) {
  // Add three-way data binding
  return $firebase(new Firebase(fbURL)).$asArray();

});
