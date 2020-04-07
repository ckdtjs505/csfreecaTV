import getBlobDuration from "get-blob-duration";

export default class LivePlayer {
  constructor() {
    this.buildUI();
    this.bindDefaultEvent();
    this.videoPlayer.volume = 0.5;

    this.formatDate = function formatDate(seconds) {
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

    this.volumeRange.addEventListener("input", (event) => {
      const {
        target: { value },
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

  static registerView() {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
      method: "POST",
    });
  }

  goFullScreen() {
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
    this.fullScreenBtn.removeEventListener("click", this.goFullScreen);
    this.fullScreenBtn.addEventListener("click", this.exitFullScreen);
  }
}
