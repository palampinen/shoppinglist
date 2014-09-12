angular.module('shoplist.controllers', [])



.controller('AppCtrl', function($scope) {
  $scope.showAdd = false;
  $scope.toggleAdd = function(){
    $scope.showAdd = !$scope.showAdd

  }
})

.controller('LoginCtrl', function($scope,Auth) {
  $scope.login = function(){
    Auth.login('facebook', {
    rememberMe: true,
    scope: 'email,user_likes'
    });
  }
})

.controller('ItemsCtrl', function($scope, $timeout, Items, Last) {

  $scope.lastChecked = Last;
  $scope.items = Items;

  //  Add item, parameters text, added, done
  $scope.addItem = function(text,bought) {
   var added = new Date().getTime();

    
    // search if item exists, preventing duplicates
    var i = 0,
        t = text.toUpperCase(),
        exists =  false;
    Items.forEach(function(element) {
      if(element.name.toUpperCase() == t){

          Items[i].done = bought;
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
    	Items.$add({name:text, added: added, done:bought}).then(function(data) {
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


.controller('ItemDetailCtrl', function($scope, $stateParams, Item,fbURL) {

  $scope.item = Item.single($stateParams.itemId);
  $scope.today = new Date().getTime();





function imageToDataUri(imgDataUrl, width, height) {
    var img = new Image();
    img.src = imgDataUrl;

    /// create an off-screen canvas
    var canvas = document.createElement('canvas');


    /// set its dimension to target size
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext('2d');

    /// draw source image into the off-screen canvas:
    ctx.drawImage(img, 0, 0, width, height);

    /// encode image to data-uri with base64 version of compressed image
    return canvas.toDataURL();
}

// Img handling
  function handleFileSelect(evt) {
    var f = evt.target.files[0];
    var reader = new FileReader();
    reader.onload = (function(theFile) {
      return function(e) {
        var filePayload = e.target.result;
        //var resizedImg = imageToDataUri(filePayload, 300, 300);

        var img   = new Image()
          width   = 300,
          height  = 300;
        img.src   = filePayload;

        img.onload = function() {
        var tempW = img.width,
            tempH = img.height;



        if (tempW > tempH) {
            tempH *= width / tempW;
            tempW = width;
          
        }else {
            tempW *= height / tempH;
            tempH = height;
        }


        var canvas = document.createElement('canvas');
        /// set its dimension to target size
        canvas.width = tempW;
        canvas.height = tempH;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, tempW, tempH);


        /// encode image to data-uri with base64 version of compressed image
        //var resizedImg = canvas.toDataURL();
        var resizedImg = canvas.toDataURL('image/jpeg',0.9);

        var f = new Firebase(fbURL+$stateParams.itemId+'/image');



          // Set the file payload
          f.set(resizedImg, function() { 

            document.getElementById("pano").src = resizedImg;
          });
        }
      };
    })(f);
    reader.readAsDataURL(f);
  }



  $scope.fireFileUpload =  function() { document.getElementById("file-upload").click() }
  $scope.fireCameraUpload =  function() { document.getElementById("camera-upload").click() }
  document.getElementById("file-upload").addEventListener('change', handleFileSelect, false);
  document.getElementById("camera-upload").addEventListener('change', handleFileSelect, false);
  
  /*if(document.getElementById("img-placeholder"))
    document.getElementById("img-placeholder").addEventListener('click', $scope.fireCameraUpload, false);
   document.getElementById("pano").addEventListener('click', fireFileUpload, false);
  */
 

});