import Vue from 'vue'
import App from './App.vue'
// import VueRouter from 'vue-router'
// import Vuex from 'vuex'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
// Vue.use(VueRouter)
// Vue.use(ElementUI);
// Vue.use(Vuex)

/**
 * 主要依赖
 * vue 2.3.3
 * vue-router 2.3.1
 * vuex 3.0.1
 * element-ui 2.0.11
 * axios 0.17.1
 * echarts 4.2.1
 * jquery 3.3.1
 * 
 */
new Vue({
  render: h => h(App),
}).$mount('#app')
