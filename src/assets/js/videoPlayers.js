import getBlobDuration from "get-blob-duration";

export default class LivePlayer {
  constructor() {
    this.buildUI();
    this.bindDefaultEvent();
    this.videoPlayer.volume = 0.5;
  }

  buildUI() {
    this.videoContainer = document.getElementById("jsVideoPlayer");
    this.videoPlayer = document.querySelector("#jsVideoPlayer video");
    this.playBtn = document.getElementById("jsPlayButton");
    this.volumeBtn = document.getElementById("jsVolButton");
    this.fullScreenBtn = document.getElementById("jsFullScreen");
    this.currentTime = document.getElementById("currentTime");
    this.totalTime = document.getElementById("totalTime");
    this.volumeRange = document.getElementById("jsVolume");
  }

  bindDefaultEvent() {
    this.playBtn.addEventListener("click", () => {
      if (this.videoPlayer.paused) {
        this.videoPlayer.play();
        this.playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        this.videoPlayer.pause();
        this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });

    this.volumeBtn.addEventListener("click", () => {
      if (this.videoPlayer.muted) {
        this.volumeRange.value = this.videoPlayer.volume;
        this.videoPlayer.muted = false;
        this.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else {
        this.volumeRange.value = 0;
        this.videoPlayer.muted = true;
        this.volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
    });

    this.fullScreenBtn.addEventListener("click", () => {
      if (this.videoContainer.requestFullscreen) {
        this.videoContainer.requestFullscreen();
      } else if (this.videoContainer.webkitrequestFullscreen) {
        this.videoContainer.webkitrequestFullscreen();
      } else if (this.videoContainer.msrequestFullscreen) {
        this.videoContainer.msrequestFullscreen();
      } else if (this.videoContainer.mozRequestFullScreen) {
        this.videoContainer.mozRequestFullScreen();
      }
      this.fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
      this.fullScreenBtn.removeEventListener("click", this);
      this.fullScreenBtn.addEventListener("click", () => {
        this.fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        this.fullScreenBtn.addEventListener("click", this);
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitexitFullscreen) {
          document.webkitexitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        }
      });
    });

    this.videoPlayer.addEventListener("loadeddata", async () => {
      const duration = await getBlobDuration(this.videoPlayer.src);
      const totalTimeString = this.formatDate(duration);
      this.totalTime.innerHTML = totalTimeString;
      setInterval(this.getCurrentTime, 1000);
    });

    this.videoPlayer.addEventListener("ended", () => {
      this.registerView();
      this.videoPlayer.currentTime = 0;
      this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    this.volumeRange.addEventListener("input", event => {
      const {
        target: { value }
      } = event;
      this.videoPlayer.volume = value;
      if (value >= 0.7) {
        this.volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      } else if (value >= 0.3) {
        this.volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
      } else if (value >= 0.1) {
        this.volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
      } else {
        this.volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      }
    });
  }
}

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    volumeRange.value = videoPlayer.volume;
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScreenBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitexitFullscreen) {
    document.webkitexitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.webkitrequestFullscreen) {
    videoContainer.webkitrequestFullscreen();
  } else if (videoContainer.msrequestFullscreen) {
    videoContainer.msrequestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  }
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

const setTotalTime = async () => {
  const duration = await getBlobDuration(videoPlayer.src);
  const totalTimeString = formatDate(duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
};

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handelDrag(event) {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.7) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.3) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (value >= 0.1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadeddata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handelDrag);
}

if (videoContainer) {
  init();
}
