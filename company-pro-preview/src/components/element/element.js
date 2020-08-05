import {
  Input,
  Select,
  Option,
  TabPane,
  Form,
  FormItem,
  Tag,
  Button
} from "element-ui"; // 按需引入组件 docs https://github.com/ElemeFE/element/blob/master/components.json
let elementUIs = [Input, Select, Option, TabPane, FormItem, Form, Tag ,Button];
export default {
  install(Vue) {
    elementUIs.forEach((elementUI) => [
      Vue.component(elementUI.name, elementUI),
      // Vue.use(elementUI)    // 也可以使用 Vue.use()
    ]);
  },
};
