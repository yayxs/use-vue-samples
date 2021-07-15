<template>
  <div id="app">
    <LuckyWheel
      ref="LuckyWheel"
      width="300px"
      height="300px"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      :default-config="defaultConfig"
      @start="startCallBack"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      blocks: [
        { padding: '10px', background: '#ffc27a' },
        { padding: '10px', background: '#ff4a4c' },
        { padding: '0px', background: '#fff' },
      ],
      prizes: [
        { fonts: [{ text: '0', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '1', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '2', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '3', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '4', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '5', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '6', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '7', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '8', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
        { fonts: [{ text: '9', top: '30%' }], background: 'rgba(0, 0, 0, 0)' },
      ],
      buttons: [
        { radius: '50px', background: '#d64737' },
        { radius: '45px', background: '#fff' },
        { radius: '41px', background: '#f6c66f', pointer: true },
        {
          radius: '35px',
          background: '#ffdea0',
          imgs: [
            {
              src: require('../src/assets/logo.png'),
              width: '65%',
              top: '-50%',
            },
          ],
        },
      ],
      defaultConfig: {
        offsetDegree: 22.5,
      },
    };
  },
  components: {},
  methods: {
    startCallBack() {
      this.$refs.LuckyWheel.play();
      setTimeout(() => {
        this.$refs.LuckyWheel.stop((Math.random() * 10) >> 0);
      }, 2000);
    },
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
