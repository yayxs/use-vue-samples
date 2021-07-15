<template>
  <div>
    <el-form ref="form" label-width="100px"> </el-form>
    <el-form :model="MAPDATA.dataSourceRuleForm" ref="form" label-width="100px">
      <el-form-item prop="chooseOne" label="二选一">
        <el-radio-group v-model="MAPDATA.dataSourceRuleForm.chooseOne">
          <el-radio
            v-for="(item, index) in MAPDATA.dataSourceRuleForm.labels"
            :key="`item.id${index}`"
            :label="item.id"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>

        <section
          style="width:300px;height:100px;"
          v-if="MAPDATA.dataSourceRuleForm.chooseOne === '1'"
        >
          <el-input></el-input>
          <el-input></el-input>
        </section>
        <section v-else style="width:300px;height:100px;">
          <el-button type="primary" size="mini">唤起弹窗</el-button>
        </section>
      </el-form-item>

      <!-- 保存提交以及重置 -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data: () => {
    const validateChooseOne = (a, b, c) => {
      console.log(a);
      console.log(b);
      console.log(c);
    };
    return {
      // 表单的数据及验证规则
      MAPDATA: {
        dataSourceRuleForm: {
          labels: [
            {
              id: "0",
              label: "唤起弹窗",
            },
            {
              id: "1",
              label: "输入框二选一",
            },
          ],
          chooseOne: "0",
        },
        rules: {
          chooseOne: [{ validator: validateChooseOne }],
        },
      },

      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return false;
        } else {
          console.log(valid);
          console.log(`验证成功`);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
      });
    },
  },
};
</script>

<style scoped></style>
