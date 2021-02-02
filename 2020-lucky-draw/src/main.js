import Vue from 'vue'
import App from './App.vue'
import LuckDraw from 'vue-luck-draw'
Vue.config.productionTip = false
Vue.use(LuckDraw)
new Vue({
  render: h => h(App),
}).$mount('#app')
