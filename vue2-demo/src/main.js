import Vue from 'vue'
import App from './App.vue'


import ElementUI from 'element-ui';
// import element from './components/element/element'
import 'element-ui/lib/theme-chalk/index.css';

// import './assets/fonts/font.scss';

// Vue.use(element);
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
