import "../scss/styles.scss";

const uploadTarget = document.querySelector(".upload-file");
const uploadName = document.querySelector(".upload-name");

const init = () => {
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
};

init();
