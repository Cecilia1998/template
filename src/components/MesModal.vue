<template lang="html">
  <div class="mesmodal">
    <!-- <Modal v-model="modal12" draggable scrollable title="modal 1" @on-ok='ok' @on-cancel='cancel' style='position:relative;' ok-text='ok' cancel-text='cancel'> -->

      <!-- <Modal v-model="modal12" draggable scrollable :title="title" @on-ok='ok' @on-cancel='cancel' style='position:relative;' :ok-text='oktext' :cancel-text='canceltext' :footer-hide='getfoothide'> -->

      <Modal v-model="modal12" draggable scrollable :title="title" @on-ok='ok' @on-cancel='cancel' style='position:relative;' :ok-text='oktext' :cancel-text='canceltext' :footer-hide='getfoothide'>
          <span style='position:absolute;display:inline-block;width:4px;height:16px;background-color:#5aa5ff;top:16px;left:0px;'></span>
          <div style='text-align:center;height:100px;line-height:100px;font-size:14px;'>
              <div>
                  <span :style='getstyle()'></span>
                  {{content}}
              </div>

          </div>
    </Modal>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    components: {

    },
    data() {
      return {
          modal12:false,
          type:'info',
          content:'',
          title:''
      }
    },
    computed: {
      canceltext(){
        // 多语言环境显示
        switch(this.$store.state.globalLang){
          case "CN":
            return this.type == "warn" ? "否" : "";
          break;
          case "EN":
            return this.type == "warn" ? "No" : "";
          break;
          case "JP":
            return this.type == "warn" ? "いいえ" : "";
          break;
        }
        // return this.type == "warn" ? "否(N)" : ""
      },
      oktext(){
        // 多语言环境显示效果
        switch(this.$store.state.globalLang){
          case "CN":
            return this.type == "warn" ? "是" : "确定";
          break;
          case "EN":
            return this.type == "warn" ? "Yes" : "Ok";
          break;
          case "JP":
            return this.type == "warn" ? "は" : "確定";
          break;
        }
        // return this.type == "warn"? "是(Y)" : "确定"
      },
      getfoothide(){
        return this.type != "warn"
      }
    },
    methods: {
      show(type, mes){
        this.modal12 = true
        this.type = type
        this.content = localStorage.globalmes ? JSON.parse(localStorage.globalmes)[mes] : ''
        // this.content = this.$store.state.globalmes ? this.$store.state.globalmes[mes] : ''
        switch(this.$store.state.globalLang){
          case 'CN':
            this.title = type == 'info' ? '成功' : (type == 'warn' ? '警告' : '错误')
          break;
          case 'EN':
            this.title = type == 'info' ? 'Success' : (type == 'warn' ? 'Warn' : 'Error')
          break;
          case 'JP':
            this.title = type == 'info' ? '成功' : (type == 'warn' ? '警告' : 'ミス')
          break;
        }
        // this.title = type == 'info' ? '成功' : (type == 'warn' ? '警告' : '错误')
        if(type != 'warn'){
            setTimeout(() => {
               this.modal12 = false
            }, 3000);
        }
      },
      ok(){
        this.$bus.$emit('modalvalue', true)
      },
      cancel(){
        this.$bus.$emit('modalvalue', false)
      },
      getstyle(){
          return {
              'display':'inline-block',
              'width':'32px',
              'height':'32px',
              'line-height':'32px',
              'background':'url(' + require(`../assets/img/${this.type}.png`) + ') no-repeat center center',
              'transform':"translateY(10px)"
          }
      }
    }
  }
</script>

<style lang="less">


</style>
