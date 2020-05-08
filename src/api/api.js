import axios from "axios";

const url = `https://openapi.afreecatv.com/broad/list?client_id=${process.env.AFREECATV_CLIENT_ID}&select_key=cate&select_value=00130000&order_type=view_cnt&page_no=5`;

export function getAfreecaBroadList() {
  axios.get(url).then(res => console.log(res.data));
}

export function getData() {}
