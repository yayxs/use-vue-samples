<template>
  <div>
    <input type="text" :value="val" @input="handleInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // 避免顶层容器继承属性
  props: {
    val: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);

      // 通知FormItem校验
      this.$parent.$emit("validate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
