<template>
  <div>
    <hr />
    <p>son com</p>
    <ul>
      <li v-for="item in doList" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <p>{{ this.$store.getters.doList }}</p>
    <hr />
  </div>
</template>
<script>
import store from "../utils/store";
export default {
  name: "son",
  components: {},
  computed: {
    doList() {
      return this.$store.state.list;
    }
  },
  data() {
    return {
      son: store.state.message
    };
  }
};
</script>
