<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    // // 在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem('store')) {
    //   this.$store.replaceState(
    //     { ...this.$store.state, ...JSON.parse(sessionStorage.getItem('store')) },
    //   );
    // }

    // // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener('beforeunload', () => {
    //   console.log('页面刷新了');
    //   sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    // });
  },
};
</script>
<style></style>
