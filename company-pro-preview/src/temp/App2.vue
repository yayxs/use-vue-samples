<style scoped>
.polarCharts,
.sbarCharts {
  height: 100%;
  /* width: 100%; */
  width: 600px;
}

.subjectPie {
  box-sizing: border-box;
  padding: 50px 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  height: 310px !important;
  width: 461px !important;
}
.charts_component {
  border: 1px solid red;
  width: 461px;
  /* width: 561px; */
  /* overflow-x: auto; */

  height: 310px;
}
.container{
  width: 1180px;
  height: 340px;
  border:1px solid blue
}
</style>
<template>
<section class="container">
   <section class="charts_component">
    <div class="subjectPie">
      <div id="my_chart" class="polarCharts" ></div>
    </div>
  </section>
</section>
 
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {
      polarChart: null,
      options:null,
      str:600
    };
  },
  watch:{
    'options.legend.data.length':{
      handler(val){
        console.log(val)
        let cols = Math.ceil(val/8) // 列数
        console.log(cols)
      },
      deep:true
    }
  },
  methods: {
    drawPie(id) {
      this.polarChart = echarts.init(document.getElementById(id));
      let options = {
        color: [
          "#E3E9EE",
          "#E45555",
          "#EE7549",
          "#E48D52",
          "#EED149",
          "#BCEC68",
          "#53CB80",
          "#5DB772",
          "#3FA4D9",
          "#5F8BEA",
          "#3F72D9",
          "#8A76F1",
          "#6c60d5",
          "#E381F1",
          "#EB74A4",
          "#8a2c4e",
          "#7b2c8a",
          "#2f2c8a",
          "#2c768a",
          "#2c8a58",
          "#3f8a2c",
        ],
        angleAxis: {
          clockwise: false,
          min: 0,
          max: 100,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        radiusAxis: {
          type: "category",
          data: [
            "语文",
            "数学",
            "英语",
            "音乐",
            "美术",
            "道法",
            "健康",
            "科学",
            "写字",
            "班队实践",
            "足球",
            "体育活动",
            "品社",
            "少先队活动",
            "信息",
            "阅读",
            "跳跳糖",
            "计算机跑",
            "机器人跑",
            "叮叮当当",
          ],
          nameTextStyle: {
            color: "#fff",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            interval: 0,
          },
          z: 10,
        },
        polar: {
          center: ["40%", "50%"],
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        series: [
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              0,
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [
              100,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
              0,
            ],
            coordinateSystem: "polar",
            name: "E",
            stack: "b",
            barGap: "-100%",
            emphasis: {
              itemStyle: {
                opacity: 0,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            coordinateSystem: "polar",
            name: "语文",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
            coordinateSystem: "polar",
            name: "数学",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0],
            coordinateSystem: "polar",
            name: "英语",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
            coordinateSystem: "polar",
            name: "音乐",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "美术",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "道法",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "健康",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "科学",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "写字",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "班队实践",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "足球",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "体育活动",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "品社",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "少先队活动",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "信息",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "阅读",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "跳跳糖",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "计算机跑",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "机器人跑",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
          {
            type: "bar",
            data: [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            coordinateSystem: "polar",
            name: "叮叮当当",
            stack: "a",
            tooltip: {
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#eee",
              textStyle: {
                color: "#000",
              },
            },
          },
        ],
        legend: {
          show: true,
          orient: "vertical", // 方向
          top: "middle",
          right: "0",
          itemWidth: 14,
          data: [
            "语文",
            "数学",
            "英语",
            "音乐",
            "美术",
            "道法",
            "健康",
            "科学",
            "写字",
            "班队实践",
            "足球",
            "体育活动",
            "品社",
            "少先队活动",
            "信息",
            "阅读",
            "跳跳糖",
            "计算机跑",
            "机器人跑",
            "叮叮当当",
          ],
        },
      };
      this.options=options
      this.polarChart.on("mouseover", (params) => {
        // 禁止作为背景的图表的高亮显示
        if (params.seriesName === "E") {
          this.polarChart.dispatchAction({
            type: "downplay",
          });
        }
      });
      this.polarChart.setOption(options, true);
      this.polarChart.resize();
    },
  },
  mounted() {
    this.drawPie(`my_chart`);
  },
};
</script>
