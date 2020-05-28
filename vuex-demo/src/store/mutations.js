export default {
  setInfo(state, payload) {
    console.log(state);
    console.log(payload);

    state.siteInfo.title = payload.title;
    window.sessionStorage.setItem('siteInfo', JSON.stringify(payload));
    console.log(state.siteInfo.title);
  },
  changeTitle(state, payload) {
    console.log(state);
    console.log(payload);

    state.txt = payload;
    window.sessionStorage.setItem('txt', JSON.stringify(payload));
  },
};
