<template>
    <div :id="`BarCharts_c${idTap}`" class="barCharts">
    </div>
</template>
<script>
import echarts from 'echarts';
import InitData from './utils.js'; // 公用初始化传入数据方法
// idTap: 'a' // 单个页面如果有需要多个，则需要传一个唯一的id标识，只有一个可不传
// formatter: (params) => {
//      //  自定义formatter，方法与原生一样
// },
// baseConf: {
//    color: [] // 整体配色
//    title: {  // 标题配置
//        text: '',  // 标题
//        show: '' // 显示隐藏  默认显示
//        color: '', // 标题颜色  默认#333
//        fontSize: '', // 标题字体 默认18
//        left: '', // 默认居中
//        top: '', // 默认auto
//        backgroundColor: '' // 背景颜色  默认透明
//    },
//      tooltip : {
//          trigger: 'axis', // 指示器类型
//          PointerType // 默认为直线，可选为："line" | "shadow"
//      };
//    legend: {
//        show: '',
//        left: '',
//        top: '',
//        color: '',
//        fontSize: '',
//        backgroundColor: '', // 背景颜色
//        data: [] // 信息
//    },
//    seriesData: [
//       {
//          name:'搜索引擎', // 折线名
//          labelshow: true   //  是否显示文本标签。
//          labelPosition: 'top'  // 标签位置 left/[10, 10]/['50%', '50%'] ...
//          data:[820, 932, 901, 934, 1290, 1330, 1320]  // 单条线数据
//          labelshow
//          labelformatter
//          labelfontsize
//      }
//    ],
//    y: {
//        type: 'value'  // 'category'  则必须要通过data设置类目数据
//        name: '' //  坐标轴名称
//        nameLocation: 'end' // 坐标轴名称显示位置
//        fontsize: 16  // 坐标轴名称字体大小
//        nameGap: '' // 名称与轴线的距离
//        data: [] // 类目数据  在category时有效
//        min: null,
//        max: null  // 最大值与最小值
//        lineShow: true, 轴线显示
//        lineColor: '#eee' 轴线颜色
//        lineType: 'solid' 轴线类型
//        show: true,  // x 轴显示与否
//        color: '#eee', // 颜色
//        type: 'solid' //  类型
//        axisTick: true // 坐标轴标记
//    }，
//    x: {
//        type: 'value'  // 'category'  则必须要通过data设置类目数据
//        name: '' //  坐标轴名称
//        nameLocation: 'end' // 坐标轴名称显示位置
//        fontsize: 16  // 坐标轴名称字体大小
//        nameGap: '' // 名称与轴线的距离
//        data: [] // 类目数据  在category时有效
//        min: null,
//        max: null  // 最大值与最小值
//        lineShow: true, 轴线显示
//        lineColor: '#eee' 轴线颜色
//        lineType: 'solid' 轴线类型
//        show: true,  // x 轴显示与否
//        color: '#eee', // 颜色
//        type: 'solid' //  类型
//        axisTick: true // 坐标轴标记
//    }，
//    grid: {
//        show: true  // 是否显示坐标系网格
//        left: '10%',
//        top: '10%',  // 组件离容器边缘的距离
//        borderColor: '#ccc' // 网格背景颜色
//    }
// }
export default {
    data() {
        return {
            chart: null,
            defultConf: {}
        };
    },
    props: {
        baseConf: {
            type: Object,
            required: true
        },
        formatter: null,
        idTap: {
            type: String,
            default: ''
        }
    },
    watch: {
        'baseConf.seriesData': function (obj) {
            if (obj.length) {
                this.drawchart(this.baseConf);
            }
        },
        'baseConf.x.data': function () {
            this.drawchart(this.baseConf);
        }
    },
    methods: {
        handleDefault(arr, obj) {
            let data = [];
            obj.data = obj.data || [];
            arr.forEach(v => {
                data.push({
                    name: v.name || '',
                    type: v.type || 'bar', // type参数需要传递，by 吕雪婷
                    barGap: v.barGap, // barGap参数需要传递，控制每个bar之间的间距， by 吕雪婷
                    symbolSize: v.symbolSize || 1, // 对于线来说，圆圈的大小，有状态图中画线的情况，by 吕雪婷
                    symbol: v.symbol || 'circle',
                    barMaxWidth: v.barMaxWidth || '40%',
                    itemStyle: v.itemStyle || {}, // 为了设置圆圈的颜色和边框，目前设置了没用，by 吕雪婷
                    label: {
                        normal: {
                            show: v.labelshow || false,
                            position: v.labelPosition || 'top',
                            formatter: v.labelformatter || '{c}',
                            fontsize: v.labelfontsize || 12
                        }
                    },
                    stack: v.stack,
                    data: v.data || []
                });
                obj.data.push(v.name || '');
            });
            return data;
        },
        drawRadar(id, obj, seriesData) {
            if (this.chart) {
                this.chart.dispose();
            }
            this.chart = echarts.init(document.getElementById(id));
            let options = {
                color: obj.color,
                title: obj.title,
                tooltip: obj.tooltip,
                legend: obj.legend,
                grid: obj.grid,
                xAxis: obj.xAxis,
                yAxis: obj.yAxis,
                dataZoom: obj.dataZoom || [],
                series: seriesData
            };
            this.$emit('loaded');
            this.chart.setOption(options);
        },
        drawchart(obj) { // 初始化数据
            let title = InitData.getdefaultTitle(obj.title);
            let legend = InitData.getdefaultLegend(obj.legend);
            let X = InitData.getdefaultXYAxis(obj.x);
            let Y = InitData.getdefaultXYAxis(obj.y, 'y');
            let grid = InitData.getdefaultGrid(obj.grid);
            let tooltip = InitData.getdefaultToltip(obj.tooltip, this.formatter || null, 'bar');
            //
            obj.seriesData = obj.seriesData ? obj.seriesData : {};
            let seriesData = this.handleDefault(obj.seriesData, legend);
            this.defultConf = { // 初始化数据
                color: obj.color || ['#2dabff', '#56d28e', '#d95873'],
                title: title,
                legend: legend,
                grid: grid,
                xAxis: X,
                yAxis: Y,
                tooltip: tooltip,
                dataZoom: obj.dataZoom || [] // 下方区间控制，by 吕雪婷
            };
            this.drawRadar(`BarCharts_c${this.idTap}`, this.defultConf, seriesData);
            let _this = this;
            setTimeout(() => {
                window.onresize = function() {
                    _this.chart.resize();
                };
            }, 100);
        }
    },
    mounted() {
        if (this.baseConf.seriesData.length) {
            this.drawchart(this.baseConf);
        }
    }
};
</script>
<style lang="scss">
   .pieCharts {
    width: 100%;
    height: 100%;
}
#radarCharts_c{
    width:100%;
    height: 100%;
}
.lineCharts{
    width:100%;
    height: 100%;
}
.scatter {
    width: 100%;
    height: 100%;
}

.barCharts{
    width:100%;
    height: 100%;
}

#roseChart {
    width: 100%;
    height: 100%;
}

#areaLine {
    width: 100%;
    height: 100%;
    position: relative;
    #areaLine_Chart{
        width: 100%;
        height: 100%;
    }
    .own_tooltip {
        width: 240px;
        height: 160px;
        background-color: rgba(0,0,0,0.7);
        position: absolute;
        top: 0;
        left: 50;
        z-index: 1000;
        padding: 10px 0 10px 0;
        p:nth-of-type(1) {
            color: #2dabff;
            cursor: pointer;
            padding: 0px 0 10px 0;
            font-weight: 800;
            font-size: 14px;
        }
        p:nth-of-type(1):hover {
            color: #2dabff;
        }
        p:nth-of-type(2) {
            color: rgba(255,255,255,0.5);
            cursor: default;
            padding: 0 0 10px 0;
            font-size: 10px;
        }
        ul {
            width: 100%;
            height: 80%;
            display: flex;
            flex-wrap: wrap;
            li {
                color: rgba(255,255,255,0.8);
                width: 110px;
                font-size: 13px;
            }
        }
    }
}

// 知识点气泡组件样式
.knowpointBox{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    .knowpoint{
        display: inline-block;
        margin: 10px;
        padding: 10px;
        color: rgba(255,255,255,1);
        border-radius: 10px;
        cursor: pointer;
    }
    .knowpoint:hover{
        text-shadow: 5px 0 rgba(0, 0, 0, 0.2);
    }
    .pointUse{
        background: rgba(45,171,255,1);
    }
    .pointAbandon{
        background: rgba(72,85,95,1);
    }
    .pointNo{
        position: absolute;
        top: 40%;
        left: 45%;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
    }
}

// 迁移样式
.scatterM {
    width: 100%;
    height: 100%;
    .scatter, .time_scatter {
        width: 100%;
        height: 100%;
    }
    .img_pic {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.7);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 50;
        span {
            font-size: 30px;
            font-weight: 500;
            color: #fff;
            float: right;
            margin-top: 10px;
            margin-right: 10px;
            cursor: pointer;
        }
        span:hover {
            color: #2dabff;
        }
        img {
            width: 960px;
            height: 540px;
            margin-left: 25%;
            margin-top: 10%;
            // box-shadow: 0 0 10px 10px rgba(255,255,255,0.2);
        }
    }
}

// 热力图
.heatmapbox{
    height: 100%;
    width: 100%;
    margin-top: -25px;
    .attendRate{
        color: #fff;
        width: 100%;
        margin-bottom: 10px;
        display: inline-block;
        text-align: right;
    }
    img{
        height: 100%;
        width: 100%;
    }
    .heatmap-canvas{
        width: 100%;
        height: 100%;
    }
}

// 行为时序图
.timeSeriesCharts{
    height: 100%;
    width: 100%;
}
.polarCharts, .sbarCharts {
    height: 100%;
    width: 100%;
}

.sankeyCharts {
    height: 100%;
    width: 100%;
}

</style>
