<template>
  <div id="app">
    首页显示的信息
    <el-button type="primary" @click="handleClick">这是个按钮</el-button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  methods: {
    handleClick() {
      console.log(123);
    },
  },
  mounted() {
    axios(`https://jsonplaceholder.typicode.com/todos/1`).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style></style>
