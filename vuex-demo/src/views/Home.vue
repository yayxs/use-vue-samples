<template>
  <div>
    <h3>首页</h3>
    <el-button type="primary" @click="handleLogin">
      登录
    </el-button>
    <el-button type="primary" @click="handleReg">注册</el-button>

  </div>
</template>

<script>
export default {
  methods: {
    handleLogin() {
      this.$router.push({ name: 'Login' });
    },
    handleReg() {
      this.$router.push({ name: 'Register' });
    },
  },
};
</script>

<style lang="scss" scoped></style>
