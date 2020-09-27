<template>
  <div>
    <template v-if="!showFlash">
      <section id="video-box">
        <video
          v-if="!showFlash"
          :id="videoId"
          class="video-js vjs-default-skin vjs-big-play-centered flex-grid "
          style="width:100%;height:100%;object-fit: fill"
        >
          抱歉, 你的浏览器不支持
        </video>
      </section>
    </template>
    <template v-else>
      <a href="https://get.adobe.com/cn/flashplayer/" target="_blank"
        >安装或者启用FLASH播放器</a
      >
    </template>
  </div>
</template>

<script>
import videojs from "video.js";
// 导入中文字体包
import ZHCN from "./assets/json/zh-CN.json";
// 导入video.js 的样式文件 Don't forget to include the Video.js CSS, located at video.js/dist/video-js.css.
import 'video.js/dist/video-js.min.css';

export default {
  data() {
    return {
      videoId: "videoId",
      showFlash: false,
      player: null, // 播放器实例
      startLoad: false,
      timerId: null,
    };
  },
  methods: {
    // 首先判断浏览器是否安装或启用的flash
    hasUsableFlash() {
      let hasFlash = window.ActiveXObject // 检测浏览器是否支持 ActiveXObject
        ? // eslint-disable-next-line no-undef
          new ActiveXObject("ShockwaveFlash.ShockwaveFlash") // 返回flash控件对象
        : navigator.plugins["Shockwave Flash"]; // 谷歌、火狐、微软Edge、Safari等现代浏览器

      if (hasFlash) {
        this.showFlash = false;
      } else {
        this.showFlash = true;
        return false;
      }
    },
    playVideo() {
      let url = `//vjs.zencdn.net/v/oceans.mp4`;
      // 判断实例是否存在
      if (this.player) {
        // 存在
        // 销毁当前的实例
        this.player.dispose();
        // 添加 <video> 标签
        this.addVideoEle(url);
        console.log(`当前实例已经存在`);
      } else {
        console.log(`当前实例不存在`);
        this.player = this.createPlayer();
        this.player.src({ src: url });
        this.player.play();
      }
      // 加载失败的话，开始重新加载
      this.rePlayVideo(url);
    },
    // 添加Video 标签
    addVideoEle(url) {
      let box = document.querySelector("#video-box");
      console.log(box)
      if (box) {
        box.innerHTML = `
         <video
          v-if="!showFlash"
          :id="videoId"
          class="video-js vjs-default-skin vjs-big-play-centered flex-grid "
          style="width:100%;height:100%;object-fit: fill"
        >
          抱歉, 你的浏览器不支持
        </video>
        `;
      }
      // 获取播放实例
      this.player = this.createPlayer();
      // 指定src
      this.player.src = {
        src: url,
      };
      // 开始播放
      this.player.play();
    },
    createPlayer() {
      // 获取dom
      let dom = document.querySelector("#videoId");
      // 配置项
      const options = {
        autoplay: true,
        preload: true,
        language: ZHCN,
        poster: "./assets/imgs/video_poster.png",
        muted: true,
        flash: {
          swf: "video-js.swf",
        },
      };
      /**
       * 参数一 dom 元素
       * 参数二 配置项
       * 参数三 可选的回调函数
       */
      let _this = this
      let tempPlayer = videojs(dom, options, function onPlayerReady() {
        videojs.log("播放器准备好了");
        this.on("error", function() {
          this.dispose();
        });

        this.on("abort", function() {
          videojs.log("abort");
        });

        this.on("loadedmetadata", function() {
          _this.startLoad = true;
          videojs.log("loadedmetadata");
        });

        this.on("stalled ", function() {
          videojs.log("stalled");
        });
      });
      // 放回当前的播放器
      return tempPlayer;
    },
    rePlayVideo() {
      this.timerId = setTimeout(() => {
        console.log(this.startLoad)
        if (!this.startLoad) {
          console.log(`重新加载视频`)
          this.playVideo();
        }
      }, 5000);
    },
  },
  mounted() {
    // 1 是否加载 flash
    this.hasUsableFlash();
    // 2 初始化播放
    this.playVideo();
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  },
};
</script>
<style scoped lang="scss"></style>
