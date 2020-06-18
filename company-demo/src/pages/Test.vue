<template>
  <div class="container">
    <section class="left">
      <tree-com></tree-com>
    </section>

    <section class="right"></section>
  </div>
</template>

<script>
import TreeCom from "@/components/treeCom/TreeCom.vue";
export default {
  components: { TreeCom },
  data() {
    return {};
  },

  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.container {
  // .left {
  //   width: 100px;
  //   height: 500px;
  //   border: 1px solid red;
  // }
  // .right{
  //   width: 500px;
  //   height: 600px;
  //   border: 1px solid red;
  // }
}
</style>
