<template>
  <div id="app">
    <MesModal ref="mesmodal"></MesModal>
    <router-view/>
  </div>
</template>

<script>
  import MesModal from '@/components/MesModal'
export default {
  name: 'App',
  components:{MesModal},
  methods:{
  }
}
</script>

<style lang="less">
@import './assets/styles/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  min-width: 1200px;
  height: 100vh;
}

.spaceBetween{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
/* 表单中操作按钮的宽度为120px */
.btnForm{
  min-width: 120px;
  padding: 0 5px;
  .ivu-icon{
    margin-right: 0;
  }
}
/* 表单标签的颜色为蓝色 */
.ivu-form .ivu-form-item-label{
  color: #5AA5FF;
  height: 40px;
  padding:0px 12px 0px 0;
  display: flex;
  // flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
/* 表单中每一项的下边距缩小 */
.ivu-form-item{
  margin-bottom: 10px;
}
/* 需要验证的表单每一项下边距正常 */
.formValidate .ivu-form-item{
  margin-bottom: 24px;
}
/* 分页的上下边距 */
.page .ivu-page{
  margin: 10px 0;
  height: 30px;
  /* position: absolute;
  bottom: 10px;
  left:50%;
  transform: translateX(-50%); */
}

.flexEnd{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  &>*{
    margin-left: 10px;
  }
}
.flexStart{
  display: flex;
  justify-content: center;
}

.flexStart{
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}
.maintain{
  margin: 20px 0;
}

.ivu-modal-header{
  text-align: center;
}

</style>
