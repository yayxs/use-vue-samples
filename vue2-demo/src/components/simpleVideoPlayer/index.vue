<template>
  <div
    class="simple-video-player"
    v-show="isShowVideo"
    :class="{ 'full-screen': fullScreenFlag }"
  >
    <section class="main-video" :id="`videoBox${index}`">
      <video
        v-if="!showFlash"
        :id="`videoId${index}`"
        class="video-js vjs-default-skin vjs-big-play-centered flex-grid main-video"
        style="width:100%;height:100%;object-fit: fill"
      >
        抱歉, 你的浏览器不支持
      </video>
    </section>
    <div class="hidden-div" @click="selectVideo"><span class="toggle-btn-text" title="切换视频">点击切换</span></div>
    <!-- 安装或者启用FLASH播放器提示 -->
    <div v-show="showFlash" class="flash-load-msg">
      <a href="https://get.adobe.com/cn/flashplayer/" target="_blank"
        >请安装或者启用FLASH播放器</a
      >
    </div>
    <!-- 控制栏 -->
    <section class="control-bar">
      <div class="refresh-btn" title="刷新播放器" @click.stop="refreshVideo()">
        <i class="el-icon-refresh"></i>
      </div>
      <!-- 全屏与否 -->
      <div class="screen-btn" @click.stop="controlsFullScreen">
        <span class="icon-fullScreen custom-btn">
          <template v-if="!fullScreenFlag"
            ><i class="el-icon-full-screen" title="全屏"></i
          ></template>
          <template v-else>
            <i class="el-icon-full-screen" title="取消全屏"></i>
          </template>
        </span>
      </div>
      <!-- 音量控制条 -->
      <div class="volume-btn">
        <span
          class="icon-volume-normal custom-btn"
          @click.stop="playMuted()"
          v-if="volume > 0"
          title="静音"
        >
          <i class="playVolume"></i
        ></span>
        <span
          class="icon-volume-mute custom-btn"
          @click.stop="playVolume(setVolume)"
          v-else
          title="取消静音"
        >
          <i class="el-icon-turn-off-microphone"></i
        ></span>
        <progress-bar
          width="76px"
          leftBg="rgb(3,167,250)"
          bgc="#ccc"
          class="controls-custom-volume"
          :index="{ index: 1, volume: volume }"
          :percent="Number(volume * 100)"
          @pbar-drag="controlsVolumeDrag"
          @pbar-seek="controlsVolumeSeek"
        ></progress-bar>
      </div>
    </section>
  </div>
</template>

<script>
import progressBar from "./comps/progressBar";
import poster from "@/assets/imgs/playerLoading.gif";
import zhCN from "@/assets/json/zh-CN.json";
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import "videojs-flash";
export default {
  data() {
    return {
      isShowVideo: true, // 展示当前视频组件
      fullScreenFlag: false, // 默认不全屏
      showFlash: false, // 检测 flash
      volume: 0, // 当前的音量
      setVolume: 0, // 目前的音量值
      player: null, // 当前播放器的实例
      poster: poster,
      startLoad: false, // 默认未开始加载
      timerId: null,
    };
  },
  components: {
    progressBar,
  },
  props: {
    // 索引值
    index: {
      type: Number,
      default: 0,
    },
    // 视频相关信息
    videoInfo: {
      // 播放地址
      targetUrl: {
        type: String,
        default: `rtmp://192.168.12.126:1935/zonekey/00E04CB2C058_film1`,
        // https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4
      },
      // 目前的音量
      playerVolume: 10,
    },
  },
  methods: {
    // hasUsableFlash
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
    // 初始化播放器
    playVideo() {
      if (!this.videoInfo.targetUrl) return false;
      let tempUrl = this.videoInfo.targetUrl; // 播放src链接
      if (this.player) {
        // 清除当前播放器
        this.player.dispose();
        // 重新构建video
        this.createVideo(tempUrl);
      } else {
        console.log(tempUrl);
        this.doPlay(tempUrl);
      }
      //   重载
      this.checkoutVideo();
    },
    checkoutVideo() {
      this.timerId = setTimeout(() => {
        if (!this.startLoad) {
          this.playVideo();
        }
      }, 5000);
    },
    createVideo(url) {
      const box = document.getElementById(`videoBox${this.index}`);
      const eleId = `videoId${this.index}`;
      if (box) {
        box.innerHTML = `
            <video id="${eleId}" class="video-js vjs-default-skin vjs-big-play-centered flex-grid main-video" style="width:100%;height:100%;object-fit: fill"></video>
            `;
        this.doPlay(url);
      }
    },
    // 构建播放器
    doPlay(url) {
      // 开始创建实例
      this.player = this.createPlayer();
      // 重置音量
      this.playVolume(this.videoInfo.playerVolume);
      // 加载视频并播放
      this.player.src({ src: url });
      this.player.play();
    },
    // 设置播放器音量
    playVolume(v) {
      this.volume = v ? v : this.volume;
      this.player.volume(this.volume);
      if (this.volume > 0) {
        this.$emit("setVolume", this.index);
      }
    },
    // 刷新播放器
    refreshVideo() {
      // 刷新
      this.playVideo();
    },
    // 全屏与否
    controlsFullScreen() {
      if (this.fullScreenFlag) {
        console.log(123);

        window.onkeydown = null;
        this.fullScreenFlag = false;
        this.$emit("exitFullScreen");
      } else {
        console.log(456);
        this.fullScreenFlag = true;
        window.onkeydown = () => {
          if (window.event.keyCode === 27) {
            this.fullScreenFlag = false;
            window.onkeydown = null;
            this.$emit("exitFullScreen");
          }
        };
        this.$emit("enterFullScreen");
      }
    },
    // 音量调整
    controlsVolumeDrag() {},
    controlsVolumeSeek() {},
    // 静音操作
    playMuted() {
      console.log(`点击了静音操作`);
    },
    // 选中当前视频
    selectVideo() {
      console.log(`选中当前视频`);
    },
    // 利用videojs创建视频
    createPlayer() {
      const videoEleId = `videoId${this.index}`;
      // <video /> 配置
      const options = {
        autoplay: true,
        preload: true,
        language: zhCN,
        poster: this.poster,
        muted: true,
        flash: {
          swf: "./media/video-js.swf",
        },
      };
      let v = this;
      return videojs(videoEleId, options, function onPlayerReady() {
        videojs.log("player is ready");
        this.on("error", function() {
          this.dispose();
        });

        this.on("abort", function() {});

        this.on("loadedmetadata", function() {
          v.startLoad = true;
        });

        this.on("stalled ", function() {});
      });
    },
  },
  mounted() {
    // 1 是否加载 flash
    this.hasUsableFlash();
    // 2 加载播放
    this.playVideo();
  },
  beforeDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
<style scoped lang="scss">
.simple-video-player {
  /* 跟随父容器宽度 */
  width: 100%;
  height: 100%;
  position: relative;
  .main-video {
    height: 100%;
    width: 100%;
    position: relative;
  }
  /*  */
  .hidden-div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    text-align: center;
    line-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .toggle-btn-text{
        color: #fff;
        display: none;
        font-size: 20px;
        cursor: pointer;
         z-index: 5;
    }
  }
  /* 显示flash提示 */
  .flash-load-msg {
    position: absolute;
    top: 0;
    z-index: 4;
    left: 0;
    height: 100%;
    width: 100%;
    background: #1f293a;
    text-align: center;
    a {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #00ffff;
      text-decoration: underline;
      font-size: 2rem;
    }
  }
  /* 控制条 */
  .control-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: rgba(31, 41, 58, 0.7);
    /* background: pink; */
    z-index: 5;
    color: #eff4f8;
    display: none;
    .controls-custom-volume {
      height: 10px;
      margin: 10px 0 0 0;
    }
    .refresh-btn {
      float: left;
      line-height: 40px;
      cursor: pointer;
      font-size: 1.8rem;
      margin-left: 10px;
    }
    .screen-btn {
      float: right;
      margin: 7px;
      cursor: pointer;
    }
    /* 音量条 */
    .volume-btn {
      height: 100%;
      float: right;
      display: flex;
      align-items: center;
    }
    .custom-btn {
      display: block;
      width: 100%;
      height: 90%;
      line-height: 24px;
      color: #eff4f8;
      cursor: pointer;

      &.icon-volume-normal,
      &.icon-volume-mute {
        display: flex;
        align-items: center;
        margin: 0 12px;
      }
    }
  }
}
/*控制条显示 */
.simple-video-player:hover {
  .control-bar,.toggle-btn-text {
    display: inherit;
  }
}
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
</style>
