<template>
  <div>
    <li>
      <div :class="{ bold: isFolder }" @click="toggle" @dblclick="makeFolder">
        {{ itemData.name }}
        <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <tree-item-com
          class="item"
          v-for="(child, index) in itemData.children"
          :key="index"
          :item-data="child"
          @make-folder="$emit('make-folder', $event)"
          @add-item="$emit('add-item', $event)"
        ></tree-item-com>
        <li class="add" @click="$emit('add-item', itemData)">+</li>
      </ul>
    </li>
    <section style="border:1px solid red">{{ fullName }}</section>
    <p>请输入一个问题 <input v-model="question" /></p>
    <hr />
    <p>{{ answer }}</p>
  </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
<script>
import axios from "axios";
import _ from "lodash";
export default {
  name: "treeItemCom",
  data() {
    return {
      // 默认是关闭
      isOpen: false,
      firstName: "ya",
      lastName: "yxs",
      question: "",
      answer: "答案",
    };
  },
  watch: {
    //   question 发生改变函数进行执行
    question(newVal, oldVal) {
      this.answer = "等待……";
      this.debouncedGetAnswer();
    },
  },
  computed: {
    /**
     * 是否是文件夹，当tree数据有子节点，并且有长度
     */
    isFolder() {
      return this.itemData.children && this.itemData.children.length;
    },
    fullName: {
      get() {
        return `${this.firstName}--${this.lastName}`;
      },
      set(newVal) {
        console.log(newVal);
      },
    },
  },
  props: {
    itemData: {
      required: true,
      type: Object,
      //  对象或数组默认值必须从一个工厂函数获取
      default() {
        return {};
      },
    },
  },
  methods: {
    toggle() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder() {
      console.log(`makeFolder`);
      if (!this.isFolder) {
        this.$emit("make-folder", this.itemData);
        this.isOpen = true;
      }
    },
    getAnswer() {
      if (this.question.indexOf("?") === -1) {
      
        this.answer = "11111111111";
        return;
      }
      axios
        .get("https://yesno.wtf/api")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
  },
};
</script>
<style scoped>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
