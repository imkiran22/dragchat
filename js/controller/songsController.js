define(['jquery'], function($) {
	return ['$scope', '$timeout','songs', function($scope, $timeout, songs) {
		$scope.songList = songs.fileName;
		$scope.currentAudioTime = "";
		$scope.selectedIndex = "";
		$scope.play = function(index) {
		   stopAll();
		   applyCss(index);
		   $scope.selectedIndex = index;
		   $("#audio-" + index).get(0).play();
		   document.getElementById("audio-" + index).addEventListener("timeupdate", currentTimeFunc);
		};
		function currentTimeFunc(index) {
			var progress = $("#progressIn");
            var value = 0, currentPlayer = document.getElementById("audio-" + $scope.selectedIndex);
            //If duration = infinity set value to 100
            if(currentPlayer.duration == 'Infinity') {
			   value = 100;
			}
			//else if it is > 0 calculate percentage to highlight

     		else if (currentPlayer.currentTime > 0) {
			   value = Math.floor((100 / currentPlayer.duration) * currentPlayer.currentTime);
			}
		    progress.stop().css({'width':value + '%'},500);
		    $('#time').html(formatTime(currentPlayer.currentTime));

			/*if ($scope.selectedIndex !== "" || $scope.selectedIndex !== undefined) {
              $scope.currentAudioTime = currentPlayer.currentTime;
              $scope.currentAudioDuration = currentPlayer.duration;
              $scope.$apply();
			}*/
		}
		$scope.pause = function(index) {
		   applyCss(index);
           $("#audio-" + index).get(0).pause();
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
        $timeout(function() {
            $("#songs-target").addClass('visible bounceInUp');
        }, 200);
	}];
})