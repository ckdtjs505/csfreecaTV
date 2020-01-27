import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const deleteCommentButton = document.querySelectorAll(".jsDeleteButton");
let commentButton;

const removeCommentContainer = () => {
  const commentAll = commentButton.parentNode;
  commentAll.remove();
};

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

async function deleteComment(commentId) {
  const response = axios({
    url: `/api/${commentId}/deleteComment`,
    method: "POST",
    data: {
      commentId
    }
  });
  if ((await response).status === 200) {
    removeCommentContainer();
  }
}

function handleClick(event) {
  event.preventDefault();
  commentButton = this;
  const commentId = commentButton.name;
  deleteComment(commentId);
}

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
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
