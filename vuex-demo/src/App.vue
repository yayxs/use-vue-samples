<template>
  <div id="app">
    <p>{{ msg }}</p>
    <Son></Son>
    <button @click="setMessageActionHandle">测试按钮</button>
    <button @click="clearMessageActionHandle">清除数据</button>
    <Counter></Counter>
    <p>{{ other }}</p>
    <button @click="changeNameHandle">改名</button>
    <p>my name is {{ name }}</p>
    <button @click="getYoungHandle">变年轻</button>
    <p>my age is {{ age }}</p>
    <button @click="dispatcHandle">分发改变</button>
  </div>
</template>

<script>
import Son from "./view/son";
import Counter from "./components/counter";
import store from "./utils/store";
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "app",
  components: {
    Son,
    Counter
  },
  computed: {
    ...mapGetters(["other"]),
    ...mapState(["name", "age"])
  },
  data() {
    return {
      msg: store.state.message
    };
  },
  methods: {
    setMessageActionHandle() {},
    clearMessageActionHandle() {},
    changeNameHandle() {
      this.$store.commit("changeName", "lisi");
    },
    // getYoungHandle() {
    //   this.$store.commit("getYoung", {
    //     age: 12
    //   });
    // }
    getYoungHandle() {
      this.$store.commit({
        type: "getYoung",
        age: 10
      });
    },
    // 分发
    // dispatcHandle() {
    //   this.$store.dispatch("change");
    // },
    ...mapActions({
      dispatcHandle: "change"
    })
  }
};
</script>

<style></style>
