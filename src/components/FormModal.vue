<template>
  <div class="formModal">
    <Modal v-model="modal" :width="!width?600:width" :closable="false" :mask-closable="false" scrollable ok-text="提交" >
      <div class="close" @click="close"><Icon type="md-close" :size="24" ></Icon></div>
      <p slot="header" style="text-align:center">
          <span>{{title}}</span>
      </p>
      <form-create class="formValidate" v-model="formData.model" :rule="formData.rule" :option="formData.option?formData.option:option"></form-create>
      <div slot="footer" class="flexEnd">
        <Button type="default" @click="cancel">{{!cancelText?$t('actions.cancel'):cancelText}}</Button>
        <Button type="primary" @click="submit">{{!okText?$t('actions.submit'):okText}}</Button>
      </div>

    </Modal>
  </div>
</template>

<script>
  export default{
    name:"formModal",
    props:{
      modal:Boolean,
      title:String,
      formData:Object,
      submit:Function,
      cancel:Function,
      cancelText:String,
      okText:String,
      width:Number
    },
    data(){
      return{
        option:{
          form:{
            labelWidth:undefined,
          },
          submitBtn:{
            show:false
          }

        }
      }
    },
    methods:{
      close(){
        this.$emit('close',false)
      }
    }
  }
</script>

<style>
  .flexEnd button{
    margin-left: 10px;
  }
  .close{
    position: absolute;
    right: 10px;
    top: 10px;
  }
</style>
