var store = {
  state: {
    message: `消息`
  },
  setMessageAction(newValue) {
    this.state.message = newValue;
  },
  clearMessageAction() {
    this.state.message = "";
  }
};

export default store;
