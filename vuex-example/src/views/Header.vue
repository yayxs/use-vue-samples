<template>
  <div style="border: 1px solid red; width: 100px; height: 100px">
    {{ oldTitle }}
    <p style="border: 1px solid black">{{ newTitle }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      siteInfo: 'siteInfo',
      txt: 'txt',
    }),
    oldTitle() {
      const info = JSON.parse(window.sessionStorage.getItem('siteInfo'));
      console.log(info);
      if (info) {
        return info.title;
      }
      console.log(this.siteInfo.title);
      return this.siteInfo.title;
    },
    newTitle() {
      const txtTemp = JSON.parse(window.sessionStorage.getItem('txt'));
      if (txtTemp) {
        return txtTemp;
      }
      return this.txt;
    },
  },
  methods: {
    ...mapActions({
      getsiteInfo: 'getsiteInfo', //
    }),
  },
  mounted() {
    this.getsiteInfo();
  },
};
</script>

<style lang="scss" scoped></style>
