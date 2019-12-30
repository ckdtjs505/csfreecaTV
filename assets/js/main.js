import "../scss/styles.scss";

const uploadTarget = document.getElementById("upload-file");
const uploadName = document.getElementById("upload-name");

function init() {
  uploadTarget.addEventListener("change", () => {
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
  });
}

init();
