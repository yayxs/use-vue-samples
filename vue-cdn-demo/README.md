[TOC]

## 1. el-form 分析

常用的`form`表单组件到底是什么样的呢？先来看一下

### 1.1 el-form

```vue
<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
```

|   参数   |           说明           | 类型 |
| :------: | :----------------------: | :--: |
|  model   | 表单数据对象（数据模型） | 对象 |
|  rules   |       表单验证规则       | 对象 |
| validate |    全局校验方法（1）     |      |

> （1）全局校验方法：对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise

### 1.2 el-form-item

```vue
<el-form-item label="密码" prop="pass">
   ...
</el-form-item>
```

| 参数  |          说明          |  类型  |
| :---: | :--------------------: | :----: |
| label |        标签文本        | 字符串 |
| prop  | 表单域 model 字段（2） | 字符串 |
|       |                        |        |

> 表单域 model 字段:在使用 validate、resetFields 方法的情况下，该属性是必填的

### 1.3 el-input

```vue
<el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
```

## 2. Element 表单功能分析

- 外层 form:
  - 管理数据模型 model
  - 检验规则
  - 全局校验方法
- 每一 item 项 FormItem
  - 显示标签
  - 执行校验 prop
  - 显示校验结果
- 输入 input
  - 绑定数据模型 v-model
  - 通知 item 项执行校验

**思考**

问题一：input 是自定义组件，是怎么实现数据的绑定？

问题二：中间 item 项怎么知道什么时候执行校验，校验的数据和规则是怎么得到的？

问题三：外层 form 怎么进行的全局校验？用什么方法把数据模型和校验的规则传递内部组件？

## 3 .自定义 form 实现

### 3.1 my-input

**自定义组件实现 v-model 的要素**

- :value

接收外部传来的`value`

```vue
 <input type="text" :value="value">
```

```vue
props:{ value:{ type:String, default:'' } }
```

- @input 事件

```js
    <input type="text" :value="val" @input="handleInput" />
```

