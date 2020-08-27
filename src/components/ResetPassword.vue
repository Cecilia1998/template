<!-- 修改密码组件 -->
<!-- 2020/5/14修改
  “重置密码”修改为“修改密码”
 -->


<template>
  <!-- <Modal v-model="modal" title="重置密码" okText="确认修改" cancelText="" :footer-hide="true" @on-ok="submit" @on-cancel="cancel" :loading="loading" draggable width='500px'> -->
  <Modal :mask-closable='false' :footer-hide="true" :class="getCommons('resetModal')" v-model="modal" :title="$t('resetPassword.title')" :okText="$t('resetPassword.okText')" @on-ok="submit" @on-cancel="cancel" :loading="loading" width='500px'>
      <Form ref="form" :model="form" :label-width="120" inline>
        <!-- 用户名-->
        <Form-item :label="$t('resetPassword.username')">
          <Input v-model="form.opername" :placeholder="$t('resetPassword.username')" style="width:200px"/>
        </Form-item>
        <!-- 验证码-->
        <div :class="getCommons('code')">
          <span :class="getClass" @click='getCode'>{{$t("resetPassword.getCodeText")}}</span>
        </div>
        <Form-item :label="$t('resetPassword.codeLabel')">
          <Input v-model="code" :placeholder='$t("resetPassword.codePlaceholder")' style="width:200px"/>
        </Form-item>
        <!-- 新密码-->
        <Form-item :label="$t('resetPassword.pwdLabel')">
          <Input v-model="newpassword" :placeholder="$t('resetPassword.pwdPlaceholder')" style="width:200px"/>
        </Form-item>
        <!-- 确认密码-->
        <Form-item :label="$t('resetPassword.checkPwdLabel')">
          <Input v-model="form.password" :placeholder='$t("resetPassword.checkPwdPlaceholder")' style="width:200px"/>
        </Form-item>
        <!-- <footer style="display:flex;justify-content:flex-end;">
          <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;"
           @click='submit'>提交</Button>
        </footer> -->
      </Form>
      <footer style="display:flex;justify-content:flex-end;">
        <Button type="primary" shape="circle" :class="getBtnClass('btnClass')" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;"
         @click='submit'>{{$t("resetPassword.changePwd")}}</Button>
      </footer>
  </Modal>
</template>
<script>
import axios from 'axios'
import iview from 'view-design'
import { getTitles, getButtons } from '../Util'
 export default {
   created(){

   },
   data () {
     return {
       clickSt:true,
       flag:true,
       emailSt:true,
       codeSt: 0,
       code:'',
       newpassword:'',
       form:{
         opername:'',
         password:''
       },
       modal: false,
       loading: true,
     }
   },
   computed: {
     getClass(){
       if(this.codeSt > 1){
         return 'dis_confircode'
       } else {
         return 'confircode'
       }
     }
   },
   methods: {
     getCommons(a){
       return getTitles(a)
     },
     getBtnClass(a){
       return getButtons(a)
     },
     show (name) {
       this.modal = true
       this.form.opername = name
     },
     submit () {
       let operSt = (/^[a-zA-Z0-9_]{1,14}$/).test(this.form.opername)
       let passwordrSt = (/^[a-zA-Z0-9_]{6,12}$/).test(this.form.password)
       let emailSt = (/^[a-zA-Z0-9_]{6}$/).test(this.code)
       let allSt = operSt && passwordrSt && emailSt

       this.loading = false
       setTimeout(() => { this.loading = true }, 0)
      if(!this.clickSt){
        return
      }
       if(this.newpassword != this.form.password){
           this.$Message.error('确认密码与密码不一致')
           this.modal = true
           setTimeout(() => { this.loading = true }, 0)
           this.loading = false
           this.clickSt = false
           setTimeout(() => {this.clickSt = true},2000)
           return
       }
       if(!operSt){
         this.$Message.error({
           content:'用户名格式错误！',
           duration:2
         })
         this.clickSt = false
         setTimeout(() => {this.clickSt = true},2000)
         return
       }
       if(!emailSt){
         this.$Message.error({
           content:'邮箱验证码格式错误！',
           duration:2
         })
         this.clickSt = false
         setTimeout(() => {this.clickSt = true},2000)
         return
       }
       if(!passwordrSt ){
         this.$Message.error({
           content:'密码格式错误！',
           duration:2
         })
         this.clickSt = false
         setTimeout(() => {this.clickSt = true},2000)
         return
       }
       else {
           axios.post(`/changeCode?code=${this.code}`,this.form)
           .then((res) => {
             this.modal = false
             iview.Message.success({content: res.message,duration:3})
           })
           .catch((err) => {
             iview.Message.error({content: err,duration:2})
             this.clickSt = false
             setTimeout(() => {this.clickSt = true},2000)
             this.loading = true
           })
       }

     },
     cancel(){
     },
     getCode(){
       if(!this.flag){
         return
       }
       if(!(this.codeSt > 1) && this.emailSt){
         this.emailSt = false
         axios.get(`/sendMail?opername=${this.form.opername}`,{timeout:60000})
         .then((res) => {
           this.flag = false
           setTimeout(()=>{this.flag = true},2000)
           this.codeTimeout(10)
           iview.Message.success({content: res.message,duration:2})
         })
         .catch((err) => {
           iview.Message.error({content: err,duration:2})
           this.flag = false
           setTimeout(()=>{this.flag = true},2000)
           this.emailSt = true
         })
       } else {
         return
       }

     },
     codeTimeout (i) {
      this.codeSt = i
      this.getText = i + 's后重新获取'
      const timeout = setTimeout(() => {
        if (i <= 1) {
          clearTimeout(timeout)
          this.getText = '获取邮箱验证码'
          this.emailSt = true
        } else {
          this.codeTimeout(--i)
        }
      }, 1000)
    },


   }
 }
</script>
<style lang="less">

    // 从这儿开始
    .btnClass_blue{
      background-color: rgb(85,167,253) !important;
      border-color: rgb(85,167,253) !important;
    }
    .btnClass_yellow{
      background-color: rgb(233,156,45) !important;
      border-color: rgb(233,156,45) !important;
    }
    .btnClass_purple{
      background-color: rgb(75,72,237) !important;
      border-color: rgb(75,72,237) !important;
    }
    .btnClass_pink{
      background-color: rgb(250,83,189) !important;
      border-color: rgb(250,83,189) !important;
    }
    .btnClass_red{
      background-color: rgb(253,97,99) !important;
      border-color: rgb(253,97,99) !important;
    }
    // 到这儿结束
    .code_blue{
      color:rgb(85,167,253);
    }
    .code_yellow{
      color:rgb(233,156,45);
    }
    .code_purple{
      color:rgb(75,72,237);
    }
    .code_pink{
      color:rgb(250,83,189);
    }
    .code_red{
      color:rgb(253,97,99);
    }
    // 从这儿开始
    .resetModal_blue{
        .ivu-form .ivu-form-item-label{
          color:rgb(85,167,253) !important;
        }
        .ivu-modal-header p, .ivu-modal-header-inner{
          color:rgb(85,167,253) !important;
        }
    }
    .resetModal_yellow{
        .ivu-form .ivu-form-item-label{
          color:rgb(233,156,45) !important;
        }
        .ivu-modal-header p, .ivu-modal-header-inner{
          color:rgb(233,156,45) !important;
        }
    }
    .resetModal_purple{
        .ivu-form .ivu-form-item-label{
          color:rgb(75,72,237) !important;
        }
        .ivu-modal-header p, .ivu-modal-header-inner{
          color:rgb(75,72,237) !important;
        }
    }
    .resetModal_pink{
        .ivu-form .ivu-form-item-label{
          color:rgb(250,83,189) !important;
        }
        .ivu-modal-header p, .ivu-modal-header-inner{
          color:rgb(250,83,189) !important;
        }
    }
    .resetModal_red{
        .ivu-form .ivu-form-item-label{
          color:rgb(253,97,99) !important;
        }
        .ivu-modal-header p, .ivu-modal-header-inner{
          color:rgb(253,97,99) !important;
        }
    }
  .resetModal{

    .ivu-form .ivu-form-label-right .ivu-form-inline{
      position: relative;
    }

    .confircode{
      width: 126px;
      text-align: center;
      position: absolute;
      right: 19px;
      top: 72px;
      font-size: 18px !important;
      cursor: pointer;
    }
    .dis_confircode{
      width: 126px;
      text-align: center;
      position: absolute;
      right: 19px;
      top: 72px;
      font-size: 18px !important;
    }
    th .ivu-table-cell{
      font-size: 18px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-form .ivu-form-item-label{
      font-size: 18px !important;
    }
    .ivu-input-wrapper{
      width: 160px;
      height: 24px;
    }
    .ivu-select{
      width: 160px;
      height: 24px;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active{
      background-color: white !important;
      font-size: 20px;
      border-radius: 8px;

    }
    .ivu-tabs-ink-bar{
      background-color: #fff;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
      font-size: 20px;
      background-color: #f3f3f3;
    }
    .ivu-tabs-nav-scroll{
      background-color: #f3f3f3;
    }
    .ivu-input{
      border:1px solid #888888;
    }
    .ivu-select-selection{
      border:1px solid #888888;
    }
    .ivu-table-overflowY {
      overflow-y: scroll;
    }
   .ivu-table-tbody{
     font-size: 16px;
     color:#333;
     line-height: 40px;
     vertical-align: middle;
   }
   .ivu-table td{
     background-color:#fff;
   }
   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
   }
   .ivu-input-icon{
        position: absolute;
        right:45px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
}
</style>
