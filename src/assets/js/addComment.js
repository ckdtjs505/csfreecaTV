import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const deleteCommentButton = document.querySelectorAll(".jsDeleteButton");
const commentContainer = document.getElementById("jsCommentList");

let commentButton;

const createCommentContainer = comment => {
  // later : creator data input
  const commentText = document.createElement("text");
  commentText.innerHTML = comment;
  commentContainer.prepend(commentText);
};

const removeCommentContainer = () => {
  const commentAll = commentButton.parentNode;
  commentAll.remove();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
};

const deleteComment = async commentId => {
  axios({
    url: `/api/${commentId}/deleteComment`,
    method: "POST",
    data: {
      commentId
    }
  });
};

function handleClick(event) {
  event.preventDefault();
  commentButton = this;
  const commentId = commentButton.name;
  deleteComment(commentId);
  removeCommentContainer();
}

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
  createCommentContainer(comment);
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentButton.forEach(button => {
    button.addEventListener("click", handleClick);
  });
}

if (addCommentForm) {
  init();
}
