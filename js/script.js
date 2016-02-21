// 2. This code loads the IFrame Player API code asynchronously.
var player, tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
            'onReady': onPlayerReady,
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

$.getJSON("js/users.json", function (data) {
    var users = ["<option disabled selected>Select friend's video</option>"];
    $.each(data.users, function (key, val) {
        users.push("<option id='" + val.id + "' value='" + val.video + "'>" + val.fullname + "</option>")
    });

    $("#users").html(users.join("")).change(function () {

        var a = $(this).val().split("v=")[1]
        console.log(a);
        if (a) {
            player.loadVideoById(a)
        }

    });
});


$("#pause").on("click", function () {
    player.pauseVideo()
});
$("#play").on("click", function () {
    player.playVideo()
});