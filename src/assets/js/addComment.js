import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const deleteCommentButton = document.querySelector("jsDeleteButton");

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if ((await response).status === 200) {
    window.location.reload();
  }
};

const deleteComment = () => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST"
  });
  console.log(response);
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentButton.addEventListener("click", deleteComment);
}

if (addCommentForm) {
  init();
}
