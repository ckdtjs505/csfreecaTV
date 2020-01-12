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

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    recordBtn.innerHTML = "녹화 에러";
    recordBtn.removeEventListener("click", startRecording);
  }
};

function init() {
  uploadTarget.addEventListener("change", handleUploadName);
  recordBtn.addEventListener("click", startRecording);
}

if (recordContainer) {
  init();
}
