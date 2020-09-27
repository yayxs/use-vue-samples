<template>
    <div class="patrol-video" v-show="hasVideo" :class="{'patrol-full-screen': fullScreenFlag}">
        <div class="patrol-video-title" v-if="!streamFlag">
            <span :title="videoInfo.className + ' ' + videoInfo.cameraName">{{videoInfo.className}} {{videoInfo.cameraName}}</span>
            <i class="el-icon-close" title="关闭" @click="closeVideo"></i>
        </div>
        <div class="patrol-stream-title" v-if="streamFlag">
            {{videoInfo.cameraName}}
        </div>
        <!-- 播放器 -->
        <div class="main-video" :id="streamFlag?'streamBox'+index:'videoBox'+index">
            <video v-if="!showFlash" :id="streamFlag?'streamId'+index:'videoId'+index"
                   class="video-js vjs-default-skin vjs-big-play-centered flex-grid main-video" style="width:100%;height:100%;object-fit: fill">
                抱歉, 你的浏览器不支持
            </video>
        </div>
        <div class="hidden-div" @click="selectVideo"></div>
        <!-- flash控制界面 -->
        <div v-show="showFlash" class="flash-load-msg">
            <a href="https://get.adobe.com/cn/flashplayer/" target="_blank">安装或者启用FLASH播放器</a>
        </div>
        <!-- 播放器控制栏 -->
        <div class="patrol-video-control-bar" v-if="!streamFlag">
            <div class="refresh-btn" title="刷新" @click.stop="refreshVideo()">
                <i class="el-icon-refresh"></i>
            </div>
            <div class="screen-btn" @click.stop="controlsFullScreen">
                <span class="icon-fullScreen custom-btn">
                    <i class="iconfont icon-larger" v-if="!fullScreenFlag" title="全屏"></i>
                    <i class="iconfont icon-exit" v-if="fullScreenFlag" title="取消全屏"></i>
                </span>
            </div>
            <div class="volume-btn">
                <span class="icon-volume-normal custom-btn" @click.stop="playMuted()" v-if="volume>0" title="静音">
                    <i class="iconfont icon-voice"></i></span>
                <span class="icon-volume-mute custom-btn" @click.stop="playVolume(setVolume)" v-else title="取消静音">
                     <i class="iconfont icon-muted"></i></span>
                <progress-bar width="76px"
                    leftBg="rgb(3,167,250)"
                    bgc="#ccc"
                    class="controls-custom-volume"
                    :index = "{index: 1, volume: volume}"
                    :percent="Number(volume * 100)"
                    @pbar-drag="controlsVolumeDrag"
                    @pbar-seek="controlsVolumeSeek"></progress-bar>
            </div>
        </div>
    </div>
</template>

<script>
import zhCN from '@/assets/media/zh-CN.json';
import videojs from 'video.js';
import progressBar from '@/components/video/video-extend/progress-bar.vue';
import 'video.js/dist/video-js.min.css';
import 'videojs-flash';
import img from '../../../assets/img/playerLoading.gif';
export default {
    name: 'videoPatrol',
    data () {
        return {
            videoId: 'video',
            player: null,
            showFlash: false,
            hasVideo: true,
            playerDefaultPoster: img,
            fullScreenFlag: false,
            startLoad: false,
            volume: 0, // 播放器音量
            setVolume: 0 // 静音时保存当时的音量
        };
    },
    components: {
        progressBar
    },
    props:['videoInfo', 'streamFlag', 'index'],
    watch: {
        'videoInfo.clear' (flag) {
            if (flag) {
                if (this.player) { // 清除播放器
                    this.player.pause();
                    this.player.dispose();
                    this.hasVideo = false;
                }
                if (this.streamFlag) {
                    // 清除副摄像头
                    this.$emit('close', this.index, 'camera');
                } else {
                    // 清除教室
                    this.$emit('close', this.index, 'screen');
                }

            }
        },
        'videoInfo.highBitRateUrl' (url) {
            if (url) {
                this.startLoad = false;
                this.playVideo();
            }
        },
        'videoInfo.muted' (val) {
            if (val) {
                this.player.volume(0);
                this.volume = 0;
            }
        }
    },
    methods: {
        createPlayer () {
            let id = this.streamFlag ? 'streamId' + this.index:'videoId' + this.index;
            let options = {
                autoplay: true,
                preload: true,
                language: zhCN,
                poster: this.playerDefaultPoster,
                muted: true,
                flash: {
                    swf: './media/video-js.swf'
                }
            };
            let v = this;
            return videojs(id, options, function onPlayerReady () {
                videojs.log('Your player is ready!');

                this.on('error', function() {
                    this.dispose();
                });

                this.on("abort", function() {
                    console.log("abort");
                });

                this.on("loadedmetadata", function() {
                    console.log(v.index);
                    v.startLoad = true;
                });

                this.on('stalled ', function() {
                    console.log("stalled");
                });
            });
        },
        /* 关闭当前播放器 */
        closeVideo () {
            if (this.player) {
                this.player.pause();
                this.player.dispose();
                // 如果是全屏状态下关闭播放器，则需要取消全屏
                this.controlsFullScreen();
            }
            this.hasVideo = false;
            this.$emit('closeStream', this.index);
        },
        /* 拖拽音量滚动条 */
        controlsVolumeDrag (volume) {
            this.playVolume(Number(volume / 100).toFixed(1));
        },
        /* 设置播放器音量 */
        playVolume(v) {
            this.volume = v ? v : this.volume;
            this.player.volume(this.volume);
            if (this.volume > 0 && !this.streamFlag) {
                this.$emit('setVolume', this.index);
            }
        },
        /* 点击设置播放器音量 */
        controlsVolumeSeek (volume) {
            this.playVolume(Number(volume / 100).toFixed(1));
        },
        /* 全屏、取消全屏 */
        controlsFullScreen () {
            // this.player.requestFullscreen(); 真全屏
            // 网页端全屏
            if (this.fullScreenFlag) {
                window.onkeydown = null;
                this.fullScreenFlag = false;
                this.$emit('exitFullScreen');
            } else {
                this.fullScreenFlag = true;
                window.onkeydown = (() => {
                    if (window.event.keyCode === 27) {
                        this.fullScreenFlag = false;
                        window.onkeydown = null;
                        this.$emit('exitFullScreen');
                    }
                });
                this.$emit('enterFullScreen');
            }
        },
        /* 静音 */
        playMuted () {
            this.setVolume = this.volume;
            this.player.volume(0);
            this.volume = 0;
        },
        /* 初始化播放器 */
        playVideo () {
            if (this.videoInfo.highBitRateUrl) {
                let url = this.videoInfo.highBitRateUrl;
                if (this.player) {
                    if (this.hasVideo) {
                        this.player.dispose();
                    } else {
                        this.hasVideo = true;
                    }
                    this.addVideoElement(url);
                } else {
                    this.player = this.createPlayer();
                    this.playVolume(this.videoInfo.playerVolume);
                    this.player.src({src: url});
                    this.player.play();
                }
                this.checkUpload(url);
            }
        },
        /* dispose函数会删掉对应的video标签，需要重新添加才能加载视频 */
        addVideoElement (url) {
            let boxId = this.streamFlag ? 'streamBox' + this.index : 'videoBox' + this.index;
            let id = this.streamFlag ? 'streamId' + this.index : 'videoId' + this.index;
            let box = document.getElementById(boxId);
            if(box){
                box.innerHTML = '<video id="' + id + '" class="video-js vjs-default-skin vjs-big-play-centered flex-grid main-video" style="width:100%;height:100%;object-fit: fill"></video>';
            }
            this.player = this.createPlayer();
            this.playVolume(this.videoInfo.playerVolume);
            this.player.src({src: url});
            this.player.play();
        },
        /* 选中视频 */
        selectVideo () {
            if (this.streamFlag) {
                this.$emit('exchange', this.index);
            } else {
                this.$emit('switch', this.index);
            }
        },
        /* 5秒后检查流是否加载成功，没有则重新加载 */
        checkUpload () {
            let that = this;
            setTimeout (() => {
                if (!that.startLoad) {
                    this.playVideo();
                }
            }, 5000);
        },
        refreshVideo () {
            this.playVideo();
        }
    },
    mounted () {
        /* eslint-disable no-undef */
        let hasFlash = window.ActiveXObject
            ? new ActiveXObject('ShockwaveFlash.ShockwaveFlash')
            : navigator.plugins['Shockwave Flash'];
        if (hasFlash) {
            this.showFlash = false;
        } else {
            this.showFlash = true;
            return false;
        }
        this.playVideo();
    }
};
</script>

<style lang="scss">
    .patrol-video {
    height:100%;
    width: 100%;
    position: relative;
    .main-video {
        height:100%;
        width: 100%;
        position: relative;
    }
    .hidden-div {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
    }
    .hidden-div-active {
        border: 2px solid red;
    }
    .patrol-stream-title {
        position: absolute;
        top: 5px;
        left: 5px;
        background: rgba(0,0,0,0.3);
        color: #fff;
        padding: 5px 10px;
        border-radius: 10px;
        z-index: 5;
        font-weight: bold;
    }
    .patrol-video-title {
        text-align: left;
        font-size: 2rem;
        font-weight: bold;
        position: absolute;
        line-height: 40px;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 100%;
        padding-left: 20px;
        height: 40px;
        background: rgba(0,0,0,0.3);
        color: #fff;
        z-index: 5;
        span {
            display: inline-block;
            width: calc(100% - 40px);
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
        }
        .el-icon-close {
            float: right;
            color: #2dabff;
            margin: 6px;
            font-size: 2.4rem;
            font-weight: bold;
            cursor: pointer;
        }
    }
    .patrol-video-control-bar {
        display: none;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 5;
        background: rgba(31, 41, 58, 0.7);
        width: 100%;
        height: 40px;
        color: #EFF4F8;
        .controls-custom-volume {
            height: 10px;
            margin: 10px 0 0 0;
        }
        .volume-btn {
            float: right;
            display: flex;
            margin: 7px 10px;
            .custom-btn {
                cursor: pointer;
                margin-right: 8px;
            }
        }
        .screen-btn {
            float: right;
            margin: 7px;
            cursor: pointer;
        }
        .refresh-btn {
            float: left;
            margin: 10px;
            cursor: pointer;
            font-size: 1.8rem;
        }
    }
    .flash-load-msg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 4;
        height: 100%;
        width: 100%;
        background: #1F293A;
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
}
.patrol-video:hover {
    .patrol-video-control-bar {
        display: inherit;
    }
}
.patrol-full-screen {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}

</style>
