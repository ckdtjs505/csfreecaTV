import Axios from "axios";

const video = document.querySelector(".video");
let page = 1;

const showBroadList = data => {
  console.log(data);
  const broadlistHtml = [];
  data.forEach(ele => {
    const broad = `
    <div class="liveVideoBlock">
    <a href="http://play.afreecatv.com/${ele.user_id}/${ele.broad_no}/embed">
        <img class="videoBlock__thumnbnail" src="${ele.broad_thumb}">
        <img class="avatarImg" src="//profile.img.afreecatv.com/LOGO/${ele.user_id.substr(
          0,
          2
        )}/${ele.user_id}/${ele.user_id}.jpg">
        <div class="video__content">
            <h4 class="videoBlock__title">${ele.broad_title}</h4>
            <div class="videoBlock__views"><img src="/img/play.png" alt="" srcset="">
                <h6 class="videoBlock__views_title">${ele.total_view_cnt}</h6>
            </div>
        </div>
    </a>
    </div>
     `;
    broadlistHtml.push(broad);
  });

  video.innerHTML += broadlistHtml.join("");
};

if (video) {
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + Math.ceil(window.scrollY) ===
      document.body.scrollHeight
    ) {
      Axios({
        url: `/api/${(page += 1)}/broadlist`,
        method: "get"
      }).then(object => showBroadList(object.data));
    }
  });
}
