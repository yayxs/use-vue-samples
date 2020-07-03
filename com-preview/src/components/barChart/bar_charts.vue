<template>
  <div :id="my_chart" class="barCharts"></div>
</template>

<script>
import echarts from "echarts";
import InitData from "./utils.js";
export default {
  data() {
    return {
      chart: null,
      defultConf: {},
      my_chart: "my_chart",
    };
  },
  props: {
    /**
     * 默认配置
     */
    baseConf: {
      type: Object,
      default() {
        return {
          color: ["#C26F4E", "#46A85B", "#2DABFF"],
          dataZoom: [
            {
              backgroundColor: "rgba(19,60,163,0.3)",
              borderColor: "#133CA3",
              bottom: 30,
              endValue: "测试虚转实",
              fillerColor: "rgba(255,255,255,0.3)",
              height: 12,
              startValue: "测试开通站点测试开通站点",
              type: "slider",
              handleStyle: {
                borderColor: "#93CDF3",
                borderWidth: 1,
                color: "#2dabff",
              },
              textStyle: {
                color: "rgba(255,255,255,0.5)",
              },
            },
          ],
          grid: {
            borderColor: "rgba(255,255,255,0.5)",
            height: "45%",
            left: "43",
            show: false,
            top: "30",
          },
          legend: {
            backgroundColor: "transparent",
            color: "#fff",
            fontSize: "12",
            itemGap: 20, // 控制每个legend之间的间距
            itemHeight: 4, // 控制legend的显示高度
            itemWidth: 16, // 控制legend的显示宽度
            right: "0",
            show: true,
            top: "0",
            data: [
              "教师",
              "领导",
              "学生",
              "领导",
              "教师",
              "学生",
              "领导",
              "教师",
              "学生",
              "教师",
              "领导",
              "学生",
            ],
          },
          seriesData: [
            {
              barGap: 0.2,
              barMaxWidth: 30,
              data: [19, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

              labelshow: false,
              name: "领导",
              type: "bar",
            },
            {
              barGap: 0.2,
              barMaxWidth: 30,
              data: [298, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              labelshow: false,
              name: "教师",
              type: "bar",
            },
            {
              barGap: 0.2,
              barMaxWidth: 30,
              data: [865, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              labelshow: false,
              name: "学生",
              type: "bar",
            },
          ],
          x: {
            axisinterval: "auto",
            color: "rgba(255,255,255,1)",
            data: [
              "云平台",
              "辽宁省",
              "测试开通站点测试开通站点",
              "测试分布式下级站点巡视",
              "测试虚转实",
              "测试开通站点",
              "22",
              "测试巡视下级站点",
              "子机构test",
              "123132",
              "测试分布式下级站点2",
              "cssss",
              "ccc",
            ],
            fontsize: 10,
            name: "站点",
            nameLocation: "end",
            type: "category",
          },
          y: {
            axisColor: "rgba(255,255,255,1)",
            color: "rgba(255,255,255,1)",
            fontsize: 10,
            max: null,
            name: "数量",
            nameLocation: "end",
            type: "value",
          },
        };
      },
    },
  },
  methods: {
    handleDefault(arr, obj) {
      let data = [];
      obj.data = obj.data || [];
      arr.forEach((v) => {
        data.push({
          name: v.name || "",
          type: v.type || "bar", // type参数需要传递，by 吕雪婷
          barGap: v.barGap, // barGap参数需要传递，控制每个bar之间的间距， by 吕雪婷
          symbolSize: v.symbolSize || 1, // 对于线来说，圆圈的大小，有状态图中画线的情况，by 吕雪婷
          symbol: v.symbol || "circle",
          barMaxWidth: v.barMaxWidth || "40%",
          itemStyle: v.itemStyle || {}, // 为了设置圆圈的颜色和边框，目前设置了没用，by 吕雪婷
          label: {
            normal: {
              show: v.labelshow || false,
              position: v.labelPosition || "top",
              formatter: v.labelformatter || "{c}",
              fontsize: v.labelfontsize || 12,
            },
          },
          stack: v.stack,
          data: v.data || [],
        });
        obj.data.push(v.name || "");
      });
      return data;
    },
    init() {
      let dom = document.getElementById("my_chart");
      if (dom) {
        let chartInit = echarts.init(dom);
        let option = {
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: "bar",
            },
          ],
        };
        chartInit.setOption(option);
      }
    },
    /**
     * 参数obj 是初始化数据
     * InitData 就是一个对象
     */
    drawchart(obj) {
      let title = InitData.getdefaultTitle(obj.title); // 标题配置
      let legend = InitData.getdefaultTitle(obj.legend);
      let X = InitData.getdefaultXYAxis(obj.x);
      let Y = InitData.getdefaultXYAxis(obj.y, "y");
      let grid = InitData.getdefaultGrid(obj.grid);
      let tooltip = InitData.getdefaultToltip(
        obj.tooltip,
        this.formatter || null,
        "bar"
      );
      obj.seriesData = obj.seriesData ? obj.seriesData : {};
      let seriesData = this.handleDefault(obj.seriesData, legend);
      this.defultConf = {
        // 初始化数据
        color: obj.color || ["#2dabff", "#56d28e", "#d95873"],
        title: title,
        legend: legend,
        grid: grid,
        xAxis: X,
        yAxis: Y,
        tooltip: tooltip,
        dataZoom: obj.dataZoom || [], // 下方区间控制，by 吕雪婷
      };
      this.drawRadar(this.my_chart, this.defultConf, seriesData);
      setTimeout(() => {
        // 窗口大小发生改变
        window.onresize = () => {
          // console.log(`窗口大小发生改变`)
          // 在容器大小发生改变的时候
          this.chart.resize();
        };
      });
    },
    drawRadar(id, obj, seriesData) {
      if (this.chart) {
        // 一上来先销毁图表实例 接着绘制
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
        series: seriesData,
      };
      console.log(JSON.stringify(options,2,null,))
      this.$emit("loaded");
      // this.chart.setOption(options);
    },
  },
  mounted() {
    this.baseConf.seriesData.length && this.drawchart(this.baseConf);
  },
};
</script>
<style scoped lang="scss">
.barCharts {
  width: 650px;
  height: 210px;
}
</style>
