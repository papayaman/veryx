function initEB(){EB.isInitialized()?startAd():EB.addEventListener(EBG.EventName.EB_INITIALIZED,startAd)}function startAd(){adDiv=document.getElementById("ad"),videoContainer=document.getElementById("video-container"),video=document.getElementById("video"),sdkVideoPlayer=document.getElementById("sdk-video-player"),sdkVideoPlayButton=document.getElementById("sdk-video-play-button"),addEventListeners(),initVideo(),isIOS&&centerWebkitVideoControls()}function addEventListeners(){document.getElementById("clickthrough-button").addEventListener("click",clickthrough),document.getElementById("user-action-button").addEventListener("click",userActionCounter)}function initVideo(){var e=EB.getSDKData(),t=!1,i="mp4";if(null!==e&&"MRAID"===e.SDKType&&e.version>1){document.body.classList.add("sdk"),EB.setExpandProperties({useCustomClose:!0});for(var o=video.getElementsByTagName("source"),n="",d=0;d<o.length;d++)o[d].getAttribute("type")&&o[d].getAttribute("type").toLowerCase()==="video/"+i&&(n=o[d].getAttribute("src"));videoContainer.removeChild(video),video=null,sdkVideoPlayButton.addEventListener("click",function(){""!==n&&EB.playVideoOnNativePlayer(n)}),t=!0}if(!t){videoContainer.removeChild(sdkVideoPlayer);var r=new EBG.VideoModule(video)}videoContainer.style.visibility="visible"}function clickthrough(){video&&video.pause(),EB.clickthrough()}function userActionCounter(){EB.userActionCounter("CustomInteraction")}function centerWebkitVideoControls(){document.body.classList.add("ios-center-video-controls")}var adDiv,videoContainer,video,sdkVideoPlayer,sdkVideoPlayButton,isIOS=/iPhone|iPad|iPod/i.test(navigator.userAgent);window.addEventListener("load",initEB);