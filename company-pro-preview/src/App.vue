<template>
  <div>
    <section class="main-player">
      <simple-video-player />
    </section>
  </div>
</template>

<script>
// 引入简易播放器
import SimpleVideoPlayer from '@/components/simpleVideoPlayer'
export default {
  name: "App",
  components:{
    SimpleVideoPlayer
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped lang="scss">
.main-player{
  width: 600px;
  height: 400px;
  margin: auto;
  border: 1px solid #ccc;
}
</style>
