import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import { INCREMENT } from "./store/mutation-types";
Vue.use(Vuex);
Vue.config.productionTip = false;
// A 计数器
const moduleA = {
  state: {
    count: 0
  },
  mutations: {
    // ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [INCREMENT](state) {
      // eslint-disable-next-line no-console
      console.log(1212);
      state.count = state.count + 12;
    },
    // increment: state => state.count++,
    decrement: state => state.count--
  },
  actions: {},
  getters: {
    other: state => {
      return state.count + 5;
    }
  }
};
// B 人物
const moduleB = {
  state: {
    name: "zs",
    age: 25,
    sex: "男"
  },
  mutations: {
    changeName: (state, newName) => {
      state.name = newName;
    },
    // 载荷概念 返老还童
    getYoung: (state, payload) => {
      state.age = payload.age;
    },
    changeSex: (state, payload) => {
      state.sex = payload.sex;
    }
  },
  actions: {
    //  context 对象并不是 store 实例本身
    // change(context) {
    //   context.commit("changeName", "wahaha");
    // }
    change({ commit }) {
      setTimeout(() => {
        commit("changeName", "wahaha");
      }, 1000);
    },
    actionA({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("changeSex");
          resolve();
        }, 2000);
      });
    }
  }
};

// C list
const moduleC = {
  state: {
    list: [
      { id: 1, name: "zs" },
      { id: 2, name: "ls" }
    ]
  },
  getters: {
    doList: state => state.list.filter(item => item.id === 1),
    // 通过方法 getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果
    getNameById: state => id => {
      return state.list.find(item => item.id === id);
    }
  },
  mutations: {},
  actions: {}
};

// const obj = {
//   // 存放数据
//   state: {},
//   // 仓库的计算属性
//   getters: {},
//   // 类似事件
//   mutations: {},
//   // 异步操作actions
//   actions: {
//     // async actionB({ commit, dispatch }) {
//     //   await dispatch("actionA"); // 等待 actionA 完成
//     //   commit('gotOtherData', await getOtherData())
//     // }
//   }
// };
const store = new Vuex.Store({
  moduleA,
  moduleB,
  moduleC
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
