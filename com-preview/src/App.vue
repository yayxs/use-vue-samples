<template>
  <div id="app">
    <section class="con">
       <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item
        label="相机预置位"
        prop="preset"
      >
        <el-tag
          size="small"
          type="info"
          :key="`${item}-${index}`"
          v-for="(item, index) in presetStr"
          closable
          :disable-transitions="false"
          @close="closeTag(index)"
        >
          {{ item }}
        </el-tag>
        <section class="tag_container">
          <el-input
          style="width:200px"
            v-model="ruleForm.preset"
            placeholder="输入1-256的整数"
          ></el-input>
          <el-button type="primary" @click="handleAddTagClick" size="small"
            >添加</el-button
          >
        </section>
      </el-form-item>
    </el-form>
    </section>
   
  </div>
</template>

<script>
export default {
  name: "app",
 data(){
   return {
     ruleForm:{
       preset:''
     },
     presetStr:['1','2']
   }
 },
methods:{
  closeTag(){

  },
  handleAddTagClick(){
    console.log(1)
  }
},
  components: {},
};
</script>

<style lang="scss" scoped>
.con{
  width: 300px;
  border:1px solid red
}

</style>
