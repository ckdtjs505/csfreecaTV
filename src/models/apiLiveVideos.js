import axios from "axios";

const clientId = process.env.AFREECATV_CLIENT_ID;

export async function getAfreecaBroadList(page = 1) {
  const url = `https://openapi.afreecatv.com/broad/list?client_id=${clientId}&select_key=cate&select_value=00130000&order_type=view_cnt&page_no=${page}`;
  // const url = `https://openapi.afreecatv.com/broad/list?client_id=${clientId}&order_type=view_cnt&page_no=${page}`;
  return axios
    .get(url)
    .then(res => {
      return res.data;
    })
    .then(data => {
      let JsonData;
      if (typeof data === "string") {
        const preJsonData = data.replace(/[();]/g, "");
        JsonData = JSON.parse(preJsonData);
        return JsonData.broad;
      }
      return data.broad;
    })
    .catch(error => {
      console.log(error);
    });
}

export function getData() {}
