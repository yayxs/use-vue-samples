
import axios from 'axios';

export default {
  async getsiteInfo({ commit }) {
    const res = await axios('http://rap2.taobao.org:38080/app/mock/255935/api/v1/siteinfo');
    const { data } = res;
    console.log(data);
    commit('setInfo', data.siteinfo);
  },
};
