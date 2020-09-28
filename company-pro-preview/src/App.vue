<template>
  <div>
    <section class="main-player">
      <simple-video-player @exitFullScreen="exitFullScreen" @enterFullScreen="enterFullScreen" :videoInfo="videoInfo" />
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
    return {
      videoInfo:{
        targetUrl:`https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4`
      }
    };
  },
  methods: {
    exitFullScreen(){
      console.log(`退出全屏`)
    },
    enterFullScreen(){
      console.log(`全屏`)
    }
  },
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
