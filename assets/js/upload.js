const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");

const videoPreview = document.getElementById("jsVideoPreview");
const uploadTarget = document.getElementById("upload-file");
const uploadName = document.getElementById("upload-name");

function handleUploadName() {
  let filename;
  if (window.FileReader) {
    // modern browser
    filename = uploadTarget.files[0].name;
  } else {
    // old IE
    filename = uploadTarget.value
      .split("/")
      .pop()
      .split("\\")
      .pop();
  }
  uploadName.value = filename;
}

let streamObject;

const handlevideoData = event => {
  console.log(event);
};

const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.addEventListener("dataavailable", handlevideoData);
  videoRecorder.start();
  console.log(videoRecorder);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "녹화 중지";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "녹화 에러";
    recordBtn.removeEventListener("click", getVideo);
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  uploadTarget.addEventListener("change", handleUploadName);
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
