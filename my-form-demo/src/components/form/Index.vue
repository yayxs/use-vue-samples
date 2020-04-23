<template>
  <div>
    <my-form :model="model" :rules="rules" ref="formsasa">
      <my-form-item label="用户名" prop="username">
        <my-input v-model="model.username" autocomplete="off"></my-input>
      </my-form-item>
      <my-form-item label="用户名" prop="username">
        <my-input
          type="password"
          v-model="model.password"
          autocomplete="off"
        ></my-input>
      </my-form-item>
      <my-form-item label="提交" prop="username">
        <button @click="submit">提交</button>
      </my-form-item>
    </my-form>
  </div>
</template>

<script>
import myForm from "./Form";
import myFormItem from "./FormItem";
import myInput from "./Input";
export default {
  components: {
    myForm,
    myFormItem,
    myInput,
  },
  data() {
    return {
      model: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }],
      },
    };
  },
  methods: {
    submit() {},
  },
};
</script>

<style lang="scss" scoped></style>
