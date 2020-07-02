const options = {
  color: ["#C26F4E", "#46A85B", "#2DABFF"], //
  title: {
    text: "这是这是这是这是标题b",
    show: true,
    left: "center",
    top: "auto",
    backgroundColor: "skyblue",
    textStyle: {
      color: "red",
      fontSize: 20,
    },
  },
  tooltip: {
    trigger: "axis", // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
    axisPointer: { // 配置坐标轴指示器的快捷方式
      type: "shadow", // 'line' 直线指示器 // 'shadow' 阴影指示器 // 'none' 无指示器 // 'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。
    },
  },
  legend: { // 图例
    text: "",
    show: true,
    left: "center",
    top: "0",
    backgroundColor: "transparent",
    textStyle: {
      color: "#fff",
      fontSize: "12",
    },
    data: ["领导", "教师", "学生"],
  },
  grid: { // 直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
    show: false,
    left: "43",
    top: "30",
    borderColor: "rgba(255,255,255,0.5)",
    width: "75%",
    height: "45%",
  },
  xAxis: {
    type: "category",
    name: "站点",
    nameLocation: "end",
    nameTextStyle: {
      fontsize: 10,
      color: "#fff",
    },
    nameGap: "15",
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
    min: null,
    max: null,
    splitLine: {
      show: false,
      lineStyle: {
        color: "#eee",
        type: "solid",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255,255,255,1)",
        type: "solid",
      },
    },
    axisLabel: {
      show: true,
      interval: "auto",
      color: "#fff",
    },
    axisTick: {
      show: true,
    },
    boundaryGap: true,
  },
  yAxis: {
    type: "value",
    name: "数量",
    nameLocation: "end",
    nameTextStyle: {
      fontsize: 10,
      color: "#fff",
    },
    nameGap: "15",
    data: [],
    min: 0,
    max: null,
    splitLine: {
      show: false,
      lineStyle: {
        color: "#eee",
        type: "solid",
      },
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255,255,255,1)",
        type: "solid",
      },
    },
    axisLabel: {
      show: true,
      interval: 0,
      color: "rgba(255,255,255,1)",
    },
    axisTick: {
      show: true,
    },
    boundaryGap: true,
  },
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
  series: [
    {
      name: "领导",
      type: "bar",
      barGap: 0.2,
      symbolSize: 1,
      symbol: "circle",
      barMaxWidth: 30,
      itemStyle: {},
      label: {
        normal: {
          show: false,
          position: "top",
          formatter: "{c}",
          fontsize: 12,
        },
      },
      data: [19, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "教师",
      type: "bar",
      barGap: 0.2,
      symbolSize: 1,
      symbol: "circle",
      barMaxWidth: 30,
      itemStyle: {},
      label: {
        normal: {
          show: false,
          position: "top",
          formatter: "{c}",
          fontsize: 12,
        },
      },
      data: [298, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "学生",
      type: "bar",
      barGap: 0.2,
      symbolSize: 1,
      symbol: "circle",
      barMaxWidth: 30,
      itemStyle: {},
      label: {
        normal: {
          show: false,
          position: "top",
          formatter: "{c}",
          fontsize: 12,
        },
      },
      data: [865, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ],
};

console.log(options);
