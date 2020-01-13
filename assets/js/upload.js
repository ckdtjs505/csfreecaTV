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
let videoRecorder;

const handlevideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "녹화 시작";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handlevideoData);
  recordBtn.addEventListener("click", stopRecording);
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
