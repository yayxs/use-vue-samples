<template>
  <div>
    <h3>登录</h3>
    <Header></Header>

    <el-button type="primary" @click="handleChangReg">去注册</el-button>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  methods: {
    handleChangReg() {
      this.getsiteInfo();
      this.$router.push({ name: 'Register' });
    },
    ...mapActions({
      getsiteInfo: 'getsiteInfo', //
    }),
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      console.log(to);
      console.log(from);
    },

  },
};
</script>

<style lang="scss" scoped></style>
