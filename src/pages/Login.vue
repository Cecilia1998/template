<!-- 5.14本页面修改内容

  1.语言选项通过接口获取，并且把修改后的值传递给store
  2.输入密码添加toggle选择是否明文展示
  3.修改用户名密码的验证方法
  4.设置登录按钮在用户名密码格式错误时不可点击
 -->


<template lang="html">
  <div class="login">
    <div id="header">
      <i></i>
      <span>{{ $t('login.title') }}</span>
    </div>
    <div class="hiddenClass" v-show='false'>
      <img src="../assets/img/login.png" alt="">
    </div>
    <div id="footer">
      <div id="foleft">
        <div :class="'innerleft innerleft_'+language"></div>
      </div>
      <div id="foright">
        <div id="inneright">
          <h3>{{$t("login.loginTitle")}}</h3>
          <div id="innerlogin">
            <p class="user userCol_blue">
              <i></i>
              <input type='text' :placeholder="$t('login.userPlaceholder')" @keyup="checkError(form.opername,'name')" v-model='form.opername'
                autocomplete="off"></input>
            </p>
            <!-- 输入密码 -->
            <p class="password pasCol_blue">
              <i></i>
              <input :type="!toggleType?'text':'password'" :placeholder="$t('login.pwdPlaceholder')" v-model='form.password'
                autocomplete="off" @keyup="checkError(form.password,'pwd')"></input>
            </p>
            <i :class="{'eye ivu-icon':true,'ivu-icon-ios-eye':!toggleType,'ivu-icon-ios-eye-off':toggleType}" @click="toggle()"></i>
            <!-- 设置语言 -->
            <p class="setlang">
              <i></i>
              <Select v-model="language" @on-change="setLang">
                <Option v-for="(item,index) in langEnum" :key="index" :value="item.code">{{item.name}}</Option>
              </Select>
            </p>

              <!-- 修改密码-->
            <div class="aboutpassword spaceBetween">
              <div><i></i><span @click='resetPass'>{{$t('login.changePwd')}}</span></div>
              <div>
                <Checkbox v-model="remberPassSt" @on-change='remberPass'>{{$t('login.rememberPwd')}}</Checkbox>
              </div>
            </div>

            <!-- 错误信息提示 -->
            <div class="errmessage">
              <div v-show="!ifError">
                <i></i>
                <span>{{errorMsg}}</span>
              </div>
            </div>

            <i-button type="primary" class="loginBtn" size="large" @click="login" :disabled="!(regName.test(form.opername)&&regPwd.test(form.password))" long>{{$t('login.login')}}</i-button>


          </div>
        </div>
      </div>
    </div>
    <ResetPassword ref='resetPassword'></ResetPassword>
  </div>
</template>



<script>
  import axios from 'axios'
  import view from 'view-design'
  import store from '../store'
  import ResetPassword from '@/components/ResetPassword'
  import Vue from 'vue'
  // import {mapActions, mapGetters} from 'vuex'
  export default {
    components: {
      ResetPassword,
    },
    data() {
      return {
        modalstatus: false,
        globalColor: 'iconblue',
        ware: null,
        remberPassSt: false,
        clickSt: true,
        lgSt: false,
        form: {
          opername: localStorage.opername ? localStorage.opername : '',
          password: localStorage.password ? localStorage.password : '',
        },
         /* 语言选项*/
        langEnum: [],
        language: "",/* 当前选中语言*/
        toggleType: true, /* 当前密码是否可看*/
        errorMsg:"",/* 错误信息 */
        ifError:true, /* 是否显示错误信息*/
        regName:/^[a-zA-Z0-9_]{1,14}$/,
        regPwd:/^[a-zA-Z0-9_]{6,12}$/,
        flag:true
      }
    },


    created() {
      this.$Message.config({
        duration: 5
      });

      this.language = this.$store.state.globalLang

    },
    methods: {
      change(){
        console.log(this.language)
      },
      selectColor(name) {
        this.globalColor = name;
        localStorage.globalColor = name;
      },
      login() {

        let status = location.href.indexOf('redirect') > 0;

        axios.post('/login', this.form)
          .then(async (res) => {
            // this.lgSt = false;
            console.log(res)
            if(res.code === -2){
              this.$Message.error(this.$t('message.hasLogined'))
            }else if(res.code === -1){
              this.$Message.error(res.message)
            }else{
              sessionStorage.opername = res.data.opername;
              sessionStorage.operatorid = res.data.operatorid;
              sessionStorage.setItem("token",res.message)
              //获取用户可访问的菜单
              await axios.get(`/getMenuIds?lang=${this.$store.state.globalLang}`).then((res) => {
                  if(res.code === 0){
                    this.$store.dispatch('routerAdd', res.data);
                    localStorage.setItem('routerList', JSON.stringify(res.data));
                    this.$router.push(`/`)
                  }else{
                    console.log("错误！请求返回信息：",res)
                  }
                })
                .catch((err) => {
                  console.log(err)
                });
              console.log('operatorid:',sessionStorage.operatorid)
              await axios.get(`/getControlsByuser`).then((res) => {
                console.log(res)
                  if(res.code === 0){
                    console.log("权限",res.data)
                    this.$store.dispatch('setControls', res.data);
                    localStorage.setItem('controls', JSON.stringify(res.data));
                  }else{
                    console.log(res,"获取控件权限失败")
                  }


                  // this.$router.push(`/`)
                })
                .catch((err) => {
                  console.log(err)
                });
              view.Message.success({
                content: "success",
                duration: 3,
              });

              if (this.remberPassSt) {
                localStorage.opername = this.form.opername;
                localStorage.password = this.form.password;
                localStorage.remberPassSt = this.remberPassSt
              }
              //获取系统语言选项
              await axios.get('/sysLanguage/downlang?lang='+this.language)
                .then(res => {
                  this.$store.dispatch('setglobalmes', res.data);
                  localStorage.setItem('globalmes', JSON.stringify(res.data));
                })
                .catch(err => {
                  console.log(err);
                })
            }


          })
          .catch((err) => {
            console.log(err)
          })
      },
      loginin() {
        this.$router.push('/')
      },
      remberPass() {
        if (this.remberPassSt) {
          localStorage.opername = this.form.opername
          localStorage.password = this.form.password
          localStorage.remberPassSt = this.remberPassSt
        } else {
          delete localStorage.remberPassSt
          delete localStorage.password
          delete localStorage.opername
        }
      },
      resetPass() {
        this.$refs.resetPassword.show(this.form.opername)
      },
      // 修改语言
      setLang() {
        console.log(this.language)
        // this.$store.dispatch("setLang", this.language)
        // this.$i18n.locale = this.language
        // console.log(this.$store.state.globalLang)
        // //根据语言选项获取系统消息
        // axios.get('/sysLanguage/downlang?lang='+this.language)
        //   .then(res => {
        //     this.$store.dispatch('setglobalmes', res.data);
        //     localStorage.setItem('globalmes', JSON.stringify(res.data));
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })
        this.$store.dispatch('setLang',this.language)
        this.$i18n.locale = this.language
        console.log(this.$store.state.globalLang)
        // 设置系统信息语言
        axios.get('/sysLanguage/downlang?lang='+this.language)
          .then(res => {
            console.log("修改语言选项后的 "+res);
            this.$store.dispatch('setglobalmes', res.data);
            localStorage.setItem('globalmes', JSON.stringify(res.data));
          })
          .catch(err => {
            console.log(err);
          })
        // 设置菜单文字语言
        axios.get(`/getMenuIds?lang=${this.$store.state.globalLang}`)
          .then((res) => {
            console.log("菜单数据"+res)
            this.menuList = res.data
          })
          .catch(() => {
          });

      },
      toggle() {
        this.toggleType = !this.toggleType;
      },
      // 5.14修改
      // 判断用户名或者密码是否错误，value表示判断的值，type表示判断的是用户名还是密码
      checkError(value,type){
        let lang = this.$store.state.globalLang
        if(type == "name"){

          this.ifError = this.regName.test(value)

          if(!this.ifError){
            this.errorMsg = this.$t('message.errorExgPattern',[this.$t('common.username')])
          }else{
            this.errorMsg = ""
          }
        }else if(type=="pwd"){

          this.ifError = this.regPwd.test(value)

          if(!this.ifError){
            this.errorMsg = this.$t('message.errorExgPattern',[this.$t('login.pwdPlaceholder')])
            // this.errorMsg = lang=="CN"?"密码格式错误":(lang=="EN"?"Password format error":"暗号フォーマットの誤り")
          }else{
            this.errorMsg = ""
          }
        }
      }
    },
    mounted() {
      // 获取语言选项
      axios.get('/systemparam/paramlangenum').then((res) => {
        if (res.code == 0) {
          this.langEnum = res.data
        }
      }).catch((err) => {
        console.log(err)
      })

    }
  }
</script>
<style lang="less">
  .login{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    min-height: 100vh;
    // background-size:100% 100%;
    color: white;
    background: url('../assets/img/login.png') no-repeat;
    overflow: auto;
    .colorBorder {
      padding: 10px;
    }
    //修改语言设置
    .setlang{
      &>i{
        // display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 6px 0 0 6px;
        background:#55a7fd url('../assets/img/icon_changeLanguage.png') no-repeat center center;
        z-index: 3;
      }
      .ivu-select{
        width: calc(100% - 50px);
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        text-align: left;
        background-color: #eee;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        -moz-border-radius-topright: 6px;
        -moz-border-radius-bottomright: 6px;
        &.ivu-select-single.ivu-select-default{
          .ivu-select-selection,.ivu-select-selection,.ivu-select-selected-value,.ivu-select-placeholder{
            height: 50px;
            line-height: 50px;
            border: none;
            font-size: 20px;
            background-color: inherit;
            padding-left: 10px;
            outline:none;
          }
        }
        &.ivu-select-visible .ivu-select-selection{
          box-shadow: 0 0 0 #fff;
        }
      }
    }
    #innerlogin {
        width: 350px;
        background-color: white;
        margin: 10px auto;
        margin-bottom: 32px;
        border-radius: 10px;
        color: #666;
        font-size: 20px;
        padding: 32px 30px;
        position: relative;

         // position: relative;
        input {
          outline: 0 none;
          border: 0 none;
          text-indent: 1em;
          background-color: rgb(238, 238, 238);
          border-radius: 0 6px 6px 0;
          // flex:1;
          width:240px;
        }

        .eye {
          position: absolute;
          right: 35px;
          top: 117px;
          font-size: 20px;
        }


        p{
          // width: 300px;
          height: 50px;
          line-height: 50px;
          margin-bottom: 20px;
          border-radius: 6px;
          display: flex;
          justify-content: space-between;
        }
        // 用户名输入框样式
        .userCol_blue {
          i {
            background: rgb(85, 167, 253) url('../assets/img/userico.png') no-repeat center center;
          }
        }
        .user {
          i {
            display: inline-block;
            height: 50px;
            flex: 0 0 50px;
            border-radius: 6px 0 0 6px;
            z-index: 3;
          }

        }
        // 密码输入框样式
        .pasCol_blue {
          i {
            background: rgb(85, 167, 253) url('../assets/img/passwordico.png') no-repeat center center;
          }
        }
        .password {
          i {
            display: inline-block;
            height: 50px;
            flex:0 0 50px;
            border-radius: 6px 0 0 6px;
            z-index: 2;
          }
        }

    // 错误信息提示
        .errmessage {
          color: red;
          font-size: 16px;
          text-align: center;
          // align-items: center;
          // justify-content: center;
          height: 32px;
          line-height: 32px;
          margin: 10px 0;
          transform: translateY(-10px);
          i {
            display: inline-block;
            margin-right: 10px;
            width: 32px;
            height: 32px;
            background: url('../assets/img/errmessage.png') no-repeat center center;
            position: relative;
            top:10px;

          }
        }

    // 记住密码和修改密码
        .aboutpassword {
          font-size: 12px;
          color: #55A7FD;
          font-family: "microsoft yahei";
          overflow: hidden;
          margin-bottom: 0;
          align-items: baseline;
          div{
            float: left;
            clear: left;
          }
          i{
            width: 15px;
            height: 15px;
            display: inline-block;
            vertical-align: bottom;
            margin-right: 3px;
            background: url('../assets/img/icon_changePwd.png') no-repeat center center;
          }
          .ivu-checkbox-wrapper{
            font-size: 12px;
          }
        }
        .iconblue {
          display: inline-block;
          width: 14px;
          height: 14px;
          background-color: rgb(85, 167, 253);
          margin-left: 15px;
        }

      }
      #header {
        text-align: center;
        height: 62px;
        margin-top: 50px;
        color: rgb(255, 255, 255);
        line-height: 62px;
        font-size: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'MicrosoftYaHei';
        color: #fff;

        span{
          width:60%
        }

        .worldwide {
          color: #2258aa;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-right: 40px;
          line-height: 31px;

          .eng {
            font-family: 'Arial-BoldMT';
            font-size: 30px;
            font-weight: bold;

            .group {
              font-weight: normal;
              font-family: 'MicrosoftYaHeiLight';
              color: #ed6053;
            }
          }

          .chs {
            font-size: 24px;
            margin-top: 8px;
          }
        }

      }

      #header i {
        vertical-align: middle;
        display: inline-block;
        width: 60px;
        height: 74px;
        background: url('../assets/img/logo.png') no-repeat center center;
        background-size: 100% 100%;
        margin-right: 8px;
      }

      #footer {
        width: 100%;
        height: 70%;
        margin-top: 30px;
        display: flex;
        justify-content: space-around;
        // height:550px;
      }

      #foleft {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #foright {
        // height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .innerleft_CN {
        background: url('../assets/img/car11.png') no-repeat center center;
      }
      .innerleft_EN {
        background: url('../assets/img/car11_en.png') no-repeat center center;
      }
      .innerleft_JP {
        background: url('../assets/img/car11_jp.png') no-repeat center center;
      }

      .innerleft {
        width: 70%;
        height: 90%;
        background-size: 100% 100%;
      }

      #inneright {
        width: 450px;
        background: rgba(255, 255, 255, .1);
        border-radius: 10px;

        h3 {
          font-weight: normal;
          font-family: Microsoft YaHei;
          color: rgb(255, 255, 255);
          font-size: 24px;
          margin: 10px 0 0;
          padding: 0 30px;
        }
      }

      .login-form {
        background: rgb(255, 255, 255);
        width: 400px;
        margin: 0px auto;
        padding: 20px 0 45px;
        border-radius: 10px;
      }

      .container::-webkit-scrollbar {
        display: none
      }

  }

</style>
