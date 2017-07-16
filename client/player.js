$(function(){
    var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

var player;

function onYouTubePlayerAPIReady() {
    console.log("onYouTubePlayerAPIReady");
 // create the global player from the specific iframe (#video)
  player = new YT.Player('video', {
    events: {
      // call this function when player is ready to use
      'onReady': onPlayerReady
    }
  });
}
var is_playing=false;
function onPlayerReady(event) {
  
  // bind events
  var playButton = document.getElementById("play-button");

  playButton.addEventListener("click", function() {
    if(!is_playing)
    {
            player.playVideo();
            is_playing=true;
            $(playButton).removeClass("play");
            $(playButton).addClass("pause");
           
    }
    else
    {
        player.pauseVideo();
        is_playing=false;
        $(playButton).removeClass("pause");
        $(playButton).addClass("play");
    }

  });
  
}