<template lang="html">

  <div class="full-screen">
    <div class="menuTop">
      <div class="topLeft">
        <i></i>

      </div>
      <div class="topRight topRight_blue">
        <span>{{$t('layout.welcome')}}</span>
        <div class='outter-container'>
          <p class="text" :key="text.id">{{text.val}}</p>
         <!-- <transition class="inner-container" name="slide" mode="out-in">

          </transition> -->
        </div>

        <div class="userInfo">

          <img src="../assets/img/user.png" alt="">
          <span class="userName">{{getName}}</span>
          <!-- <i-select v-model="$store.state.globalWare" :placeholder="$t('layout.warehouses')"
                    style="width: 40%;height: 20%;margin-left: 10px;background-color:rgba(0,0,0,0.0)">
            <i-option v-for="item in wareEnum" :key="item.code" :value="!item.code?' ':item.code">{{
              item.name}}
            </i-option>
          </i-select>
 -->
         <!-- <i-select v-model= "language" :placeholder="$t('layout.language')" @on-change="setLang"
                    style="width: 40%;height: 40%;margin-left: 10px;margin-right: 10px;">
            <i-option v-for="(item,index) in langEnum" :key = "index" :value = "!item.code?' ':item.code">{{item.name}}</i-option>
          </i-select> -->

          <i class="icon" @click='logOut'></i>

        </div>
      </div>
    </div>
    <div class="menuBottom">
      <div class="bottomLeft bottomLeft_blue">
        <Menu :theme="menuColor" @on-select='Onselect' accordion>
          <Submenu v-for="(item,index) in menuList" :name="index+1" :key="index+1">
                    <span slot="title">
                        <i :class="getCommons(item.menuView)"></i>
                        {{item.menuLabel}}
                    </span>
            <MenuItem v-for="(it,index) in item.children" :name="it.menuAction" :key="index">{{it.menuLabel}}</MenuItem>
          </Submenu>
        </Menu>
      </div>
      <div class="bottomRight">
        <div class="innerTop">
          <div class="curlocate">
            {{$t('layout.curLocate')}}
          </div>
          <div>
            <Breadcrumb>
              <Breadcrumb-item v-for="(v, k) in paths" :key='k' :to="v.href">{{v.name}}</Breadcrumb-item>
            </Breadcrumb>
          </div>
        </div>
        <div class="innerBottom">
          <router-view/>
        </div>
        <!--<addOutOrder ref='addOutOrder'></addOutOrder>-->
      </div>
    </div>
  </div>


</template>

<script>
  import axios from 'axios'
  import iview from 'view-design'
  import {getTitles} from '../Util'
  import {mapActions, mapGetters} from 'vuex'
  import {routers} from '../router/router'
  // import MesModal from '../components/MesModal'
  import Vue from 'vue'
  //轮询时间
  const totalDuration = 5000;
  export default {
    components: {
      //addOutOrder,
      // MesModal
      // FilterBar,
      // List
    },

    data() {
      return {
        formFilter: '', //查询工作提醒的过滤条件
        workRemindData: [], //需要循环滚动的数据
        number: 0,  //工作提醒
        allMenu: [],
        menuColor: 'dark',
        menuList: [],
        pathList: [],
        ware: null,
        language: this.$store.state.globalLang,
        wareEnum: [
          {
            warehouseId: null,
            warehouseName: null
          }
        ],
        router1:null,
        langEnum: {
          code: "",
          name: ""
        },
        activeKey:1
      }
    },
    async created() {


      await axios.get(`/getMenuIds?lang=${this.$store.state.globalLang}`)
        .then((res) => {
          this.menuList = res.data
        })
        .catch(() => {
        });

        this.router1=JSON.parse(localStorage.getItem('routerList'));
        //工作提醒 轮询
        this.startMove();

        // 获取语言选项（5.14新增）
        // /systemparam/paramenum?code=language
        await axios.get('/systemparam/paramlangenum').then((res)=>{
          if(res.message == "success"){
            this.langEnum = res.data
            //console.log(this.langEnum)
          }
        }).catch((err)=>{
          console.log(err)
        })


    },
    mounted() {
      let userAgent = navigator.userAgent;
      let is_fireFox = userAgent.indexOf("Firefox")>-1;
      // window.addEventListener("unload",e=>{
      //   this.$axios.get("logout").then(res=>{
      //     console.log(res)
      //   })
      //   // _gap_time = new Date().getTime() - _beforeUnload_time;
      //   // 		if(_gap_time <= 5){
      //   // 			// $.post('webLoginController.do?delSession2');//浏览器关闭
      //   //       this.$axios.get("logout").then(res=>{
      //   //         console.log(res)
      //   //       })
      //   // 		}else{//浏览器刷新
      //   // 		}
      // })

      window.addEventListener("beforeunload",e=>{
        e.preventDefault()
        this.$axios.get("logout").then(res=>{
          console.log(res)
        })

      })
    },

    computed: {
      ...mapGetters('rolemanage', ['testdata']),
      getName() {
        return sessionStorage.opername
      },
      paths() {
        if(this.$route.path=="/home"){
         return [{
            name: this.$t('layout.home'),
            href: '/home'
          }]
        }
        let rout="";
        if(this.router1 == null){this.router1 = []}
        this.router1.forEach(item=>{
          const tmp=item.children.find(it=>it.menuAction==this.$route.path);
         if(tmp!==undefined)rout = tmp
        })
        return [{
                 name:this.$t('layout.home'),
                 href: '/'
               },
                 {
                   name: rout.parentLabel,
                   href: null
                 },
                 {
                   name: rout.menuLabel,
                   href: null
                 }
               ]
      },

      //渲染数据
      text() {

        return {
          id: this.number,
          val: this.workRemindData[this.number]
        }
      },
    },


    methods: {
      ...mapActions('rolemanage', ['fetchGrouplist']),
      getCommons(a) {
        return getTitles(a)
      },
      //轮询
      startMove() {
        let timer = setTimeout(() => {
          if (this.workRemindData.length === 1 || this.number === this.workRemindData.length - 1) {
            this.number = 0;
          } else {
            this.number += 1;
          }
          this.startMove();
        }, totalDuration)
      },



      Onselect(name) {
        this.$router.push(name)
      },
      logOut() {
        // location.href = location.origin + '#/login?redirect=' + encodeURIComponent(location.hash)
        this.$axios.get("logout").then(res=>{
          console.log(res)
          this.$Message.success("退出登录成功")
          this.$router.push('/login')
          delete sessionStorage.opername
          delete sessionStorage.operatorid
          localStorage.removeItem('routerList');
          //localStorage.removeItem('user');
          sessionStorage.removeItem("token");
        })

      },

    }
  }
</script>

<style lang="less">
  .full-screen {
    width: 100%;
    height: 100%;
    .outter-container{
      height: 36px;
      overflow: hidden;
      // .inner-container {
      //   animation: myMove 5s linear infinite;
      //   animation-fill-mode: forwards;
      // }
    }
    /*文字无缝滚动*/
    @keyframes myMove {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-75px);
      }
      100% {
        transform: translateY(-150px);
      }
    }

    .slide-enter-active, .slide-leave-active {
      transition: all 0.5s linear;
    }
    .slide-leave-to {
      transform: translateY(-20px);
    }
    .slide-enter {
      transform: translateY(20px);
    }

    .syspermis_blue {
      background: url(../assets/img/syspermis.png) center center no-repeat;
    }
    .syspermis {
      display: inline-block;
      width: 24px;
      height: 20px;
    }

    .report {
      display: inline-block;
      width: 24px;
      height: 20px;
    }
    .report_blue {
      background: url(../assets/img/report.png) center center no-repeat;
    }

    .basicinfo_blue {
      background: url(../assets/img/basicinfo.png) center center no-repeat;
    }
    .basicinfo {
      display: inline-block;
      width: 24px;
      height: 20px;
    }

    .innermanage_blue {
      background: url(../assets/img/innermanage.png) center center no-repeat;
    }
    .innermanage {
      display: inline-block;
      width: 24px;
      height: 20px;
    }

    .dugmanage {
      display: inline-block;
      width: 22px;
      height: 20px;
    }
    .dugmanage_blue {
      background: url(../assets/img/dugmanage.png) center center no-repeat;
    }

    .quality {
      display: inline-block;
      width: 16px;
      height: 16px;
    }
    .quality_blue {
      background: url(../assets/img/quantityM.png) center center no-repeat;
    }

    .outmanage_blue {
      background: url(../assets/img/outmanage.png) center center no-repeat;
    }
    .outmanage {
      display: inline-block;
      width: 24px;
      height: 20px;
    }

    .panmanage_blue {
      background: url(../assets/img/panmanage.png) center center no-repeat;
    }
    .panmanage {
      display: inline-block;
      width: 24px;
      height: 24px;
    }

    .removemanage_blue {
      background: url(../assets/img/removemanage.png) center center no-repeat;
    }
    .removemanage {
      display: inline-block;
      width: 24px;
      height: 24px;
    }

    .stockmanage_blue {
      background: url(../assets/img/stockmanage.png) center center no-repeat;
    }
    .stockmanage {
      display: inline-block;
      width: 24px;
      height: 24px;
    }

    .sysmanage_blue {
      background: url(../assets/img/sysmanage.png) center center no-repeat;
    }
    .sysmanage {
      display: inline-block;
      width: 20px;
      height: 24px;
    }

    .setmanage_blue {
      background: url(../assets/img/setmanage.png) center center no-repeat;
    }
    .setmanage {
      display: inline-block;
      width: 20px;
      height: 24px;
    }



    .menuTop {
      display: flex;
      height: 86px;
    }

    .topLeft {
      width: 210px;
      font-family: "AriaIMT";
      background: linear-gradient(to right, #333 50%, #112f5a);;
      display: -webkit-box;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      color: #fff;
      i {
        display: inline-block;
        // width: 215px;
        // height: 80px;
        width: 200px;
        height: 90px;
        background: url('../assets/img/login_logo.png') no-repeat center center;
        // margin-right: 2px;
        margin-left: 2px;
      }
      .worldwide {
        color: #2258aa;
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 10px;
        .eng {
          font-family: 'Arial-BoldMT';
          font-size: 10px;
          font-weight: bold;
          .group {
            font-weight: normal;
            font-family: 'MicrosoftYaHeiLight';
            color: #ed6053;
          }
        }
        .chs {
          font-size: 10px;
          margin-top: 4px;
        }
      }
    }
    .topRight_blue {
      background: url('../assets/img/head_blue.jpg') no-repeat center center;
    }

    .topRight {
      flex: 1;
      background-color: blue;
      padding: 30px 30px 30px 40px;
      color: #fff;
      font-size: 24px;
      font-family: "Microsoft YaHei";
      display: flex;
      justify-content: space-between;
      align-items: center;
      &>span{
        display: inline-block;
        width: 600px;
      }
      .userInfo {
        display: flex;
        justify-content: center;
        align-items: center;
        .userName {
          margin-left: 16px;
          margin-right: 36px;
          font-size: 20px;
        }
        .icon {
          display: inline-block;
          width: 64px;
          height: 61px;
          background: url('../assets/img/switch_closebtn.png') no-repeat center center;
          cursor: pointer;
        }
        .icon:hover {
          background: url('../assets/img/switch_openbtn.png') no-repeat center center;
        }
      }
    }

    .menuBottom {
      height: calc(100% - 86px);
      display: flex;
    }

    .bottomLeft {
      background-color: rgb(42, 42, 42);
      // width: 210px;
      flex: 0 0 210px;
      height: 100%;
      overflow: auto;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 0px;
      }
      // justify-content: center;

      .ivu-menu{
        width: 100% !important;
      }
    }

    .bottomLeft_blue {
      .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu) {
        color: #fff;
        background-color: rgb(85, 167, 253) !important;
      }
      .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover {
        font-family: "Microsoft YaHei";
        font-size: 14px;
      }
      .ivu-menu-submenu-title{
        span{
          display: inline-block;
          width: 160px;
          text-align: left;
        }
      }

    }

    .bottomRight {
      flex: 1;
      width: calc(100% - 210px);
      height: 100%;
      overflow-y: auto;
      position: relative;
      // overflow: hidden;
    }

    .innerTop {
      height: 69px;
      line-height: 69px;
      padding: 0px 20px;
      font-size: 20px;
      text-align: left;
      display: flex;
      position: absolute;

      justify-content: flex-start;
      align-items: center;
      .curlocate {
        margin-right: 20px;
        font-size: 16px;
      }
    }

    .innerBottom {
      // position: absolute;
      // top: 69px;
      margin-top: 69px;
      width:100%;
      padding: 0 10px;
    }

    .ivu-menu-dark {
      background-color: rgb(42, 42, 42);
    }

    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
      background: rgb(42, 42, 42);
    }

    .ivu-menu {
      font-size: 16px;
      font-family: "Microsoft YaHei";
      color: #fff;
    }
  }


</style>
