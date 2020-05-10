import axios from "axios";

const url = `https://openapi.afreecatv.com/broad/list?client_id=${process.env.AFREECATV_CLIENT_ID}&select_key=cate&select_value=00130000&order_type=view_cnt&page_no=1`;

export async function getAfreecaBroadList() {
  return axios
    .get(url)
    .then(res => res.data)
    .then(data => {
      let JsonData;
      if (typeof data === "string") {
        const preJsonData = data.replace(/[();]/g, "");
        JsonData = JSON.parse(preJsonData);
      } else {
        JsonData = JSON.parse(data);
      }
      return JsonData.broad;
    });
}

export function getData() {}
