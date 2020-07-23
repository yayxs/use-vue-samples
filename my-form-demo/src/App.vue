<template>
  <div id="app">首页显示的信息</div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
export default {
  name: "App",
  components: {},
  mounted() {
    _.throttle(() => {
      console.log(123);
    });
    axios(`https://jsonplaceholder.typicode.com/todos/1`).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style></style>
