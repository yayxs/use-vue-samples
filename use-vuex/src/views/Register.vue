<template>
  <div>
    <h2>注册</h2>
    <Header></Header>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  methods: {
    ...mapMutations({
      changeTitle: 'changeTitle', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
  created() {
    this.changeTitle('修改密码');
  },
};
</script>

<style lang="scss" scoped></style>
