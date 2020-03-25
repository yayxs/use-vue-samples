## vue 生命周期进阶

### 基本流程

- new vue 创建实例
- 初始化事件 生命周期
- **beforeCreate**
- 初始化 注入校验
- **created**
- 是否指定 el
  - 否： 调用 vm.$mount(el)
  - 是：是否指定template
    - 否 将el 外部的html 作为template 编译
    - 是 将 template 编译到render
- **beforeMount**
- 创建vm.$el 并用其替换el
- **mounted**
- 挂载完毕
- 当data 修改的时候：
  - **beforeUpdate**
  - **updated**
- 调用vm.$destroy()
- **beforeDestroy**
- 解除绑定 销毁子组件 事件监听
- 销毁完毕
- **destroyed**

### 父组件和子组件生命周期钩子执行顺序

```
APP.vue        	父组件beforeCreate执行
App.vue			父组件created执行
App.vue			父组件beforeMount执行
HelloWorld.vue	子组件beforeCreate执行
HelloWorld.vue	子组件created执行
HelloWorld.vue	子组件beforeMount执行
HelloWorld.vue	子组件mounted执行
App.vue			父组件mounted执行
```

其实执行顺序总体包括三部分 ：`直接加载渲染`  `父组件进行更新了`  `子组件进行更新了`  `组件销毁`

- 加载
- 更新
- 卸载

### 案例







### 参考阅读

- [Vue 2.x 官网](https://cn.vuejs.org/v2/guide/instance.html)
- 