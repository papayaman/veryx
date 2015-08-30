/* globals EB:true, EBG:true, console:true */
var adDiv;
var videoContainer;
var video;
var sdkVideoPlayer;
var sdkVideoPlayButton;
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);

function initVideo() {
    var sdkData = EB.getSDKData();
    var useSDKVideoPlayer = false;
    var sdkPlayerVideoFormat = "mp4"; // or use "webm" for the webm format

    if (sdkData !== null) {
        if (sdkData.SDKType === "MRAID" && sdkData.version > 1) {
            document.body.classList.add("sdk");

            // set sdk to use custom close button
            EB.setExpandProperties({
                useCustomClose: true
            });

            var sourceTags = video.getElementsByTagName("source");
            var videoSource = "";

            for (var i = 0; i < sourceTags.length; i++) {
                if (sourceTags[i].getAttribute("type")) {
                    if (sourceTags[i].getAttribute("type").toLowerCase() === "video/" + sdkPlayerVideoFormat) {
                        videoSource = sourceTags[i].getAttribute("src");
                    }
                }
            }

            videoContainer.removeChild(video);
            video = null;

            sdkVideoPlayButton.addEventListener("click", function() {
                if (videoSource !== "") {
                    EB.playVideoOnNativePlayer(videoSource);
                }
            });

            useSDKVideoPlayer = true;
        }
    }

    if (!useSDKVideoPlayer) {
        videoContainer.removeChild(sdkVideoPlayer);
        var videoTrackingModule = new EBG.VideoModule(video);
        console.log(videoTrackingModule);
    }

    videoContainer.style.visibility = "visible";
}

function centerWebkitVideoControls() {
    document.body.classList.add("ios-center-video-controls");
}

function startAd() {
    adDiv = document.getElementById("ad");
    videoContainer = document.getElementById("video-container");
    video = document.getElementById("video");
    sdkVideoPlayer = document.getElementById("sdk-video-player");
    sdkVideoPlayButton = document.getElementById("sdk-video-play-button");

    initVideo();

    if (isIOS) {
        centerWebkitVideoControls();
    }
}

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();
    }
}

window.addEventListener("load", initEB);
