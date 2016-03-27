define(['jquery'], function($) {
	return ['$scope', '$timeout','songs', function($scope, $timeout, songs) {
		$scope.songList = songs.fileName;
		$scope.currentAudioTime = "";
		$scope.selectedIndex = "";
		$scope.muteOnOffBool = true;
		$scope.pauseOnPlayerBool = true;
		$scope.play = function(index) {
		   stopAll();
		   applyCss(index);
		   $scope.pauseOnPlayerBool = true;
		   $scope.selectedIndex = index;
		   $("#audio-" + index).get(0).play();
		   document.getElementById("audio-" + index).addEventListener("timeupdate", currentTimeFunc);
		};
		$scope.muteOnOff = function(bool) {
           var currentPlayer = document.getElementById("audio-" + $scope.selectedIndex);
           if (currentPlayer !== undefined && currentPlayer !== null) { 
               currentPlayer.muted = bool;
               $scope.muteOnOffBool = !bool;
           }
		};
		$scope.pauseOnPlayer = function(bool) {
		   var currentPlayer = document.getElementById("audio-" + $scope.selectedIndex);
           if (currentPlayer !== undefined && currentPlayer !== null) { 
           	   $scope.pauseOnPlayerBool = !bool;
               if (!bool) {
                   currentPlayer.play();
                   return;
               }
               currentPlayer.pause();
           }
		};
		function currentTimeFunc(index) {
			var progress = $("#progressIn"), progressOut = $("#progressOut");
            var value = 0, currentPlayer = document.getElementById("audio-" + $scope.selectedIndex);
            //If duration = infinity set value to 100
            if(currentPlayer.duration == 'Infinity') {
			   value = 100;
			}
			//else if it is > 0 calculate percentage to highlight
     		else if (currentPlayer.currentTime > 0) {
			   value = Math.floor((100 / currentPlayer.duration) * currentPlayer.currentTime);
			   if (value >=100) {
                   $scope.pauseOnPlayerBool = false;
                   /*Play Next Song*/
                   $scope.stepForward();
                   $scope.$apply();
			   }
			}
		    progress.stop().animate({'width': value + '%'}, 10);
		    $('#time span').html(formatTime(currentPlayer.currentTime));
		}
		$scope.progress = function(event) {
           var progressOut = $("#progressOut"), x, newTime, currentPlayer = document.getElementById("audio-" + $scope.selectedIndex);
           x = event.clientX - progressOut.offset().left;
           if (currentPlayer !== undefined && currentPlayer !== null) {
           	  newTime = (x / progressOut.width()) * currentPlayer.duration;
           	  currentPlayer.currentTime = Math.floor(newTime);
           }
		};
		$scope.pause = function(index) {
		   applyCss(index);
           $("#audio-" + index).get(0).pause();
           $scope.pauseOnPlayerBool = false;
		};
		function stopAll() {
			$('audio').each(function(){
            this.pause(); // Stop playing
            this.currentTime = 0; // Reset time
           });  
		}
		function applyCss(index) {
		   $("#song-ul li").addClass('unSelectedPlayer').removeClass('selectedPlayer');
		   $("#song-ul #song-li-" + index).removeClass('unSelectedPlayer').addClass('selectedPlayer');
		}
		function formatTime(seconds) {
		    minutes = Math.floor(seconds / 60);
		    minutes = (minutes >= 10) ? minutes : "" + minutes;
		    seconds = Math.floor(seconds % 60);
		    seconds = (seconds >= 10) ? seconds : "0" + seconds;
		    return minutes + ":" + seconds;
		}
		$scope.stepForward = function() {
           var currentElem = $("#song-ul").find("li.selectedPlayer").next().attr("id");
           if (currentElem !== undefined && currentElem !== null) {
              $scope.play(parseInt(currentElem.substr(currentElem.lastIndexOf("-")+1, currentElem.length)));
              return;
           }
           if ($("#song-ul").find("li.selectedPlayer").length && !$("#song-ul").find("li.selectedPlayer").next().length){
           	  	$scope.play(0);
           	  	return;
           }
		};
		$scope.stepBackward = function() {
           var currentElem = $("#song-ul").find("li.selectedPlayer").prev().attr("id");
           if (currentElem !== undefined && currentElem !== null) {
              $scope.play(parseInt(currentElem.substr(currentElem.lastIndexOf("-")+1, currentElem.length)));
              return;
           }
           if ($("#song-ul").find("li.selectedPlayer").length && !$("#song-ul").find("li.selectedPlayer").prev().length){
           	  	$scope.play($("#song-ul").find("li").length - 1);
           	  	return;
           }
		};
        $timeout(function() {
            $("#songs-target").addClass('visible bounceInUp');
        }, 200);
	}];
})