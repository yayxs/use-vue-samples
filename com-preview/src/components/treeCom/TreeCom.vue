<template>
  <div>
    <ul>
      <tree-item-com
        class="item"
        :item-data="treeData"
        @make-folder="makeFolder"
        @add-item="addItem"
      ></tree-item-com>
    </ul>
  </div>
</template>

<script>
import TreeItemCom from "./TreeItemCom.vue";
export default {
  components: {
    TreeItemCom,
  },
  data() {
    return {
      treeData: {
        name: "1",
        children: [
          { name: "1-1" },
          { name: "1-2" },
          {
            name: "1-3",
            children: [
              {
                name: "1-3-1",
              },
              {
                name: "1-3-2",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    makeFolder(val) {
     
      this.$set(val, "children", []);
      this.addItem(val);
    },
    addItem(val) {
      
      val.children.push({
        name: "add^",
      });
    },
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
