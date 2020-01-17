<template>
  <div>
    <p>counter组件中的{{ count }}</p>
    <p>counter组件中的{{ localComputed }}</p>
    <button @click="addHandle">counter +12</button>
    <!-- <p>counter组件中的{{ countPlus }}</p> -->
    <hr />
    <!-- <p>counter 计数器中的值{{this.$store.}}</p> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
// import mutationTypes from "../store/mutation-types.js";
import { INCREMENT } from "../store/mutation-types.js";
export default {
  name: "counter",
  components: {},
  // computed: {
  //   count() {
  //     return this.$store.state.count;
  //   }
  // },
  // computed: mapState({
  //   count: state => state.count,

  //   countPlus(state) {
  //     return state.count + 2;
  //   }
  // }),
  // computed: mapState(["count"]),
  // 局部计算属性+全局
  computed: {
    localComputed() {
      return 22;
    },
    ...mapState(["count"])
  },
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    ...mapMutations({
      addHandle: INCREMENT
    })
    // addHandle() {
    //   this.$store.commit({
    //     type: INCREMENT
    //   });
    // }
  }
};
</script>
