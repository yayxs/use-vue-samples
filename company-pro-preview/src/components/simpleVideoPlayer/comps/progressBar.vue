<template>
    <div>
        <div class="progress-wrapper" :style="wrapStyle">
            <div class="progress-tool-bar"
                 @mousedown.stop="mousedownHandler"
                 @mouseover.stop="mouseoverHandler"
                 @mousemove.stop="mousemoveHandler"
                 @mouseup.stop="mouseupHandler"
                 @mouseout.stop="mouseoutHandler"
                 @click.stop="clickHandler"
                 :style="pBarStyle">
                <div class="progress-tool-left" :style="leftStyle">
                    <!--当前进度信息-->
                    <div class="progress-tool-ball" :style="ballStyle"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'progressBar',
    props: {
        leftBg: String,
        bgc: String,
        ballBgc: String,
        height: String,
        width: String,
        percent: {type: Number, default: 0},
        streamType: String,
        index: Object
    },
    data() {
        return {
            wrapStyle: {
                'width': this.width
            },
            pBarStyle: {
                'backgroundColor': this.bgc,
                'height': this.height
            },
            leftStyle: {
                'width': this.percent + '%',
                'background': this.leftBg,
                'height': this.height
            },
            ballStyle: {
                'width': this.height,
                'height': this.height,
                'right': -parseInt(this.height) / 2 + 'px',
                'borderRadius': parseInt(this.height) / 2 + 'px',
                'backgroundColor': this.ballBgc
            },
            // 标记是否按下鼠标
            isMouseDownOnBall: false,
            // 鼠标进body时是否是mousedown
            isMouseDownOnBody: false,
            // 鼠标离开进度条时的pageX
            outProgressPageX: 0,
            // 主要用于防止一个页面内有多个本组件，MouseMove时互相影响而设置的字段
            isCurrentProgress: false
        };
    },
    computed: {
        bodyEle() {
            return document.getElementsByTagName('body')[0];
        },
        progressElement() {
            return this.$el.getElementsByClassName('progress-tool-bar')[0];
        },
        progressOffsetLeft() {
            return this.progressElement.getBoundingClientRect().left;
        }
    },
    methods: {
        videoIndexRatio(ratio) {
            return (ratio ? `${this.progressElement.offsetWidth * ratio}px` : false);
        },
        mousedownHandler(e) {
            if (this.streamType === 'live') return; // 直播时禁用进度条
            if (e.which === 1) {
                this.isMouseDownOnBall = true;
                this.isCurrentProgress = true;
                this.$emit('pbar-select', true, this.index);
            }
        },
        mousemoveHandler(e) {
            if (this.isMouseDownOnBall && this.isCurrentProgress) {
                let offsetLeft = this.$el.getElementsByClassName('progress-tool-bar')[0].getBoundingClientRect().left;
                let decimal = (e.pageX - offsetLeft) / this.progressElement.clientWidth;
                let percent = decimal * 100;
                this.leftStyle.width = `${percent < 100 ? percent : 100}%`;
                this.$emit('pbar-drag', percent, this.index);
                this.$emit('pbar-select', true, this.index);
            }
        },
        mouseupHandler(e) {
            if (this.isMouseDownOnBall && this.isCurrentProgress) {
                let offsetLeft = this.$el.getElementsByClassName('progress-tool-bar')[0].getBoundingClientRect().left;
                let decimal = (e.pageX - offsetLeft) / this.progressElement.clientWidth;
                let percent = decimal * 100;
                this.leftStyle.width = `${percent < 100 ? percent : 100}%`;
                this.$emit('pbar-seek', percent, this.index);
                this.$emit('pbar-select', false, this.index);
                this.isMouseDownOnBody = false;
                this.outProgressPageX = 0;
                this.bodyEle.removeEventListener('mousemove', this.bodyMousemoveHandler);

                this.isMouseDownOnBall = false;
                this.isCurrentProgress = false;
            }
        },
        mouseoverHandler(e) {
            // 没有按左键进入进度条
            if (e.which === 0) {
                this.isMouseDownOnBall = false;
                this.$emit('pbar-select', false);
            }
        },
        mouseoutHandler(e) {
            if (e.which === 1 && this.isCurrentProgress) {
                this.outProgressPageX = e.pageX;
                this.isMouseDownOnBody = true;
                this.$emit('pbar-select', true, this.index);
                this.bodyEventHandler();
            }
        },
        // body元素的事件监听器
        bodyEventHandler() {
            let body = this.bodyEle;
            body.addEventListener('mousemove', this.bodyMousemoveHandler);
            body.addEventListener('mouseup', (e) => { // eslint-disable-line
                this.isMouseDownOnBall = false;
                this.isMouseDownOnBody = false;
                this.outProgressPageX = 0;
                this.isCurrentProgress = false;
                this.$emit('pbar-select', false, this.index);
                body.removeEventListener('mousemove', this.bodyMousemoveHandler);
            });
        },
        clickHandler(e) {
            if (this.streamType === 'live') return; // 直播时禁用进度条
            let offsetLeft = this.$el.getElementsByClassName('progress-tool-bar')[0].getBoundingClientRect().left;
            let decimal = (e.pageX - offsetLeft) / this.progressElement.clientWidth;
            let percent = decimal * 100;
            this.leftStyle.width = `${percent < 100 ? percent : 100}%`;
            this.$emit('pbar-seek', percent, this.index);
        },
        // body元素的mousemove事件监听器
        bodyMousemoveHandler(e) {
            e.preventDefault();
            if (e.which === 1 && this.isMouseDownOnBody === true) {
                this.$emit('pbar-select', true, this.index);
                let offsetX = e.pageX - this.outProgressPageX;
                // 右移了
                if (offsetX > 0) {
                    // 在进度条右边界内
                    let offsetLeft = this.$el.getElementsByClassName('progress-tool-bar')[0].getBoundingClientRect().left;
                    if (e.pageX < this.progressElement.clientWidth + offsetLeft) {
                        let decimal = (e.pageX - offsetLeft) / this.progressElement.clientWidth;
                        let percent = decimal * 100;
                        this.leftStyle.width = `${percent < 100 ? percent : 100}%`;
                        this.$emit('pbar-drag', percent, this.index);
                        // 超出右边界
                    } else {
                        this.leftStyle.width = '100%';
                        this.$emit('pbar-drag', 100, this.index);
                    }
                    // 左移了
                } else if (offsetX < 0) {
                    // 在进度条左边界内
                    let offsetLeft = this.$el.getElementsByClassName('progress-tool-bar')[0].getBoundingClientRect().left;
                    if (e.pageX > offsetLeft) {
                        let offsetLeft = this.$el.getElementsByClassName('progress-tool-bar')[0].getBoundingClientRect().left;
                        let decimal = (e.pageX - offsetLeft) / this.progressElement.clientWidth;
                        let percent = decimal * 100;
                        this.leftStyle.width = `${percent < 100 ? percent : 100}%`;
                        this.$emit('pbar-drag', percent, this.index);
                        // 超出左边界
                    } else {
                        this.leftStyle.width = '0%';
                        this.$emit('pbar-drag', 0, this.index);
                    }
                }
            } else {
                this.$emit('pbar-select', false, this.index);
            }
        }
    },
    watch: {
        percent(cur) {
            this.leftStyle.width = `${cur < 100 ? cur : 100}%`;
        }
    }
};
</script>

<style type="text/css" lang="scss" scoped>
    $passBlue: #3D99FA;
    $progressGrey: #DCDCDC;
    $indexGrey: #EFF4F8;
    $fontWhite: #FFFFFF;
    $dotBg: #FFFF00;
    .progress-wrapper {
        width: 100%;
        height: 100%;

        .progress-tool-bar {
            width: 100%;
            height: 40%;
            cursor: pointer;
            transition: height 0.15s;

            &:after {
                content: '';
                display: block;
                width: 100%;
                height: 150%;
            }

            .progress-tool-left {
                width: 1%;
                height: 100%;
                background-color: $progressGrey;
                position: relative;
                left: 0;
                top: 0;
                transition: all 0.15s;

                .video-index {
                    position: absolute;
                    left: 0;
                    top: -1px;
                    width: 7px;
                    height: 7px;
                    border-radius: 3px;
                    z-index: 5;
                    background-color: $dotBg;

                    &:hover {
                        .video-index-content {
                            visibility: visible;
                        }
                    }

                    .video-index-content {
                        visibility: hidden;
                        position: absolute;
                        top: -30px;
                        left: 0;
                        padding: 7px;
                        border-radius: 3px;
                        opacity: 0.9;
                        white-space: nowrap;
                        color: $fontWhite;
                        background-color: rgba(31, 41, 58, .5);
                        transition: all 0.15s;
                        transform: translateX(-50%);
                    }
                }

                .progress-tool-ball {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: 2px solid $passBlue;
                    position: absolute;
                    right: -8px;
                    top: -5px;
                    z-index: 2;
                    transition: all 0.15s;
                    background-color: $fontWhite;
                }
            }

            &:hover {
                height: 50%;

                .progress-tool-left {
                    .progress-tool-ball {
                        transform: scale(1.1);
                    }
                }
            }
        }
    }
</style>
