angular.module('shoplist.controllers', [])



.controller('AppCtrl', function($scope,$location,$timeout) {
  $scope.showAdd = false;
  $scope.toggleAdd = function(){
    $scope.showAdd = !$scope.showAdd
    

    $timeout(function(){
      if(document.getElementById('addInput'))
        document.getElementById('addInput').focus();
      else 
        document.getElementById('addInput2').focus();
    });
    
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

  Items.$loaded().then(function(data) {
      $scope.loaded = true;
  });

  $scope.lastChecked = Last;
  $scope.items = Items;

    // Today for modifying added-value
  $scope.today = new Date().getTime();

  $scope.toggleItem = function(item,items) {
    if(item.done)
      (item.endTime != undefined) ? item.endTime.push(new Date().getTime()) : item.endTime = [new Date().getTime()]; 
    else
      (item.boughtTime != undefined) ? item.boughtTime.push(new Date().getTime()) : item.boughtTime = [new Date().getTime()];

    item.done=!item.done;
    item.added= new Date().getTime();
    items.$save(item)
  }

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

        if(!bought)
          (Items[i].endTime != undefined) ? Items[i].endTime.push(new Date().getTime()) : Items[i].endTime = [new Date().getTime()]; 
        else
          (Items[i].boughtTime != undefined) ? Items[i].boughtTime.push(new Date().getTime()) : Items[i].boughtTime = [new Date().getTime()];


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



})


.controller('ItemDetailCtrl', function($scope, $stateParams, Item,fbURL) {

 // $scope.item = Item.single($stateParams.itemId);
  $scope.today = new Date().getTime();


  /* Async Trial
  Item.single($stateParams.itemId).then(function(data) {
      $scope.item = data;
  });
  */


  $scope.format = function(timestamp) {
    var time = new Date(timestamp);
    return time.getDate() + '.' + (parseInt(time.getMonth())+1) + '.' + time.getFullYear();
  }

  $scope.getTimeAgo = function(ago) {
  var diff = (new Date().getTime() - ago) / 60000; // minutes

  if(diff < 60)
      return Math.round(diff) + ' min';
  else if(diff < 60 * 24)
      return Math.round(diff/60) + ' h';
  else (diff < 60 * 24)
      return Math.round(diff/60/24) + ' pv';
  }



  Item.single($stateParams.itemId).$loaded().then(function(data) {
    
    if ( data.boughtTime)
     data.boughtTime = data.boughtTime.reverse()

    $scope.item = data


    var data = {
        labels: ["Tammi", "Helmi", "Maalis", "Huhti", "Touko", "Kesä", "Heinä","Elo","Syys"],
        datasets: [
            {
                label: $scope.item.name,
                fillColor: "rgba(220,220,220,0.1)",
                strokeColor: "#A0968A",
                pointColor: "#A0968A",
              
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [1, 2, 4, 1, 5, 5, $scope.item.endTime.length]
            }
        ]
    };
    var options = {
      scaleFontFamily: "'Muli', 'Helvetica', 'Arial', sans-serif",
      scaleFontColor: "#C9BFB3",
      scaleFontSize: 9,
      scaleFontStyle: "300",
      ///Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines : true,

      //String - Colour of the grid lines
      scaleGridLineColor : "rgba(0,0,0,.0)",

      //Number - Width of the grid lines
      scaleGridLineWidth : 1,

      //Boolean - Whether the line is curved between points
      bezierCurve : true,

      //Number - Tension of the bezier curve between points
      bezierCurveTension : 0.4,

      //Boolean - Whether to show a dot for each point
      pointDot : true,

      //Number - Radius of each point dot in pixels
      pointDotRadius : 4,

      //Number - Pixel width of point dot stroke
      pointDotStrokeWidth : 1,

      //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius : 20,

      //Boolean - Whether to show a stroke for datasets
      datasetStroke : true,

      //Number - Pixel width of dataset stroke
      datasetStrokeWidth : 1,

      //Boolean - Whether to fill the dataset with a colour
      datasetFill : true,

      //String - A legend template
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

  };

/*
    var ctx = document.getElementById("itemChart").getContext("2d");
    var lineChart = new Chart(ctx).Line(data, options);
*/
  $scope.toggleItem = function(item) {
    if(item.done)
      (item.endTime != undefined) ? item.endTime.push(new Date().getTime()) : item.endTime = [new Date().getTime()]; 
    else
      (item.boughtTime != undefined) ? item.boughtTime.push(new Date().getTime()) : item.boughtTime = [new Date().getTime()];

    item.done=!item.done;
    item.added= new Date().getTime();
    item.$save();

  }

}); 

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