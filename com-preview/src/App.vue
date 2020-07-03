<template>
  <div id="app">
    <bar-com></bar-com>
    <section class="home-art-num">121212</section>
  </div>
</template>

<script>
import barCom from "@/components/barChart/bar_charts.vue";

export default {
  name: "App",
  components: {
    barCom,
  },
};
</script>

<style lang="scss" >
#app{
  border:1px solid red
}
</style>
