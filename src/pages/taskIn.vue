<template lang="html">
  <div class="">
    <div class="taskIn">
      <!-- <span class="title" >入库任务详情</span> -->
      <Table  height='490' ref="inorderlist" stripe border :columns="tableColumns.card" :data="tableColumns.data"></Table>
    </div>

    <Modal v-model="errorMessage" width="360" :closable='false' :footer-hide='true'>
      <!-- <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>数据确认</span>
      </p> -->
      <div style="text-align:center">
        <span style="font-size:30px">{{inGoDownResult}}</span>
      </div>
    </Modal>
  </div>
</template>

<script>
    export default {
    }
</script>

<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../router'

// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
//import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      //错误弹框
      errorMessage:false,

      //错误信息
      inGoDownResult:'',

      tableColumns: {
         card: [
           {title: '序号',key: 'lineNo',width: 120,align: 'center',
               render: (h, params) => {
                 return h('div', params.row._index + 1)
               }
           },
           // {title: '任务类型',key: 'taskType',width:250,align: 'center'},
           {title: '入库单号',key: 'entryId',align: 'center'},
           {title: '托盘号',key: 'trayNo',width:250, align: 'center'},
           {title: '货位', key: 'targetstorageid',width:250,align: 'center'},
           {title: '物料', key: 'partname',width:250,align: 'center'},
           {title: '件数', key: 'pieces',width:250,align: 'center'},
           {title: '数量', key: 'quantity',width:250,align: 'center'},
         ],
         data:[
           {}
         ]
       },

    }
  },

  created(){

    let that = this

    if(typeof(WebSocket) == "undefined") {
        console.log("您的浏览器不支持WebSocket");
    }else{
        console.log("您的浏览器支持WebSocket");

        	//实现化WebSocket对象，指定要连接的服务器地址与端口  建立连接
          //等同于socket = new WebSocket("ws://localhost:8083/checkcentersys/websocket/20");   sessionStorage.http+`/editInOrder

          // var socketIp = localStorage.http + '/websocket/inGoDownEntryDetail';
          //var socketIp = `${localStorage.http}/websocket/inGoDownEntryDetail`;
          //var socketIp = 'http://192.168.17.50:8088/websocket/taskIn';


            //1.0当入库任务数据更新时更新页面
            var socket;
            var socketIp = 'http://localhost:8088/websocket/taskIn';

            socketIp = socketIp.replace("http","ws");
            socket = new WebSocket(socketIp);

            //打开事件
            socket.onopen = function() {
                console.log("taskIn对应的websocket已打开");
            };
            //获得消息事件
            socket.onmessage = function(msg) {
              console.log("wwww")
                console.log(msg.data);
                that.inGoDownResult = msg.data;
                //发现消息进入    开始处理前端触发逻辑-->更新页面数据（重新调用查询方法）
                that.searchTask();
            };
            //关闭事件
            socket.onclose = function() {
                console.log("taskIn对应的websocket已关闭");
            };
            //发生了错误事件
            socket.onerror = function() {
                alert("taskIn对应的websocket发生了错误");
                //此时可以尝试刷新页面
            }
            //离开页面时，关闭socket
            //jquery1.8中已经被废弃，3.0中已经移除
            // $(window).unload(function(){
            //     socket.close();
            //});

            //2.0扫码入库时如果有错误信息，弹框显示
            var socket2;
            var socketIp2 = 'http://localhost:8088/websocket/taskInError';

            socketIp2 = socketIp2.replace("http","ws");
            socket2 = new WebSocket(socketIp2);

            //打开事件
            socket2.onopen = function() {
                console.log("taskInError对应的websocket已打开");
            };
            //获得消息事件
            socket2.onmessage = function(msg) {
                console.log(msg.data);
                that.inGoDownResult = msg.data;
                //发现消息进入    开始处理前端触发逻辑
                if(that.inGoDownResult.startsWith("错误")){
                  that.errorMessage = true;
                  setTimeout(() => {that.errorMessage = false},10000)

                }
            };
            //关闭事件
            socket2.onclose = function() {
                console.log("taskInError对应的websocket已关闭");
            };
            //发生了错误事件
            socket2.onerror = function() {
                alert("taskInError对应的websocket发生了错误");
                //此时可以尝试刷新页面
            }
            //离开页面时，关闭socket
            //jquery1.8中已经被废弃，3.0中已经移除
            // $(window).unload(function(){
            //     socket.close();
            //});

    };


      // console.log(this.testdata)
      // setInterval(()=>{
      //     this.modifyTestData({testdata:2})
      // },1000)
    // sessionStorage.http = "http://192.168.17.38:8088"
    that.searchTask();

  },
  mounted () {
    // setTimeout(()=>{
    //   this.$Message.error({
    //     content:this.errmessage,
    //     duartion:2
    //   })
    // },1000)

    this.errmessage && this.$Message.error({
      content:this.errmessage,
      duartion:2
    })


    this.searchTask();

  },

  methods:{


    //页面初始化，查询数据
    searchTask(){
      axios.post(localStorage.http +`/searchTaskIn`)
      .then((res) =>{
        console.log(res)
        this.tableColumns.data = res.data;
      })
    },


 }

}
</script>

<style lang="less" scoped>
</style>
<style  lang='less'>
  .taskIn{
  th .ivu-table-cell{
        font-size: 42px !important;
        font-weight: bold;
        color:#333;
        height: 100px;
        line-height: 100px;
      }
      .title{
        font-size: 30px;
        // text-align: right;
        margin-right: 100px;
        margin-top: 10px;
      }
      .timeIn{
        font-size: 40px;
        text-align: right;
        margin-right: 20px;
        margin-top: 20px;
      }
      .ivu-form .ivu-form-item-label{
        color:#5aa5ff !important;
        font-size: 12px !important;
        font-family:"Microsoft YaHei";
        line-height: 20px;
      }
      .ivu-input-wrapper{
        width: 160px;
        height: 20px;
      }
      .ivu-select{
        width: 160px;
        height: 20px;
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
        font-size: 14px;
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
       font-size: 36px;
       color:#333;

       font-family:"Microsoft YaHei";
       vertical-align: middle;
     }
     .ivu-table td{
       background-color:#fff;
       height: 80px;
     }
     .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
       background-color: #f9f9f9;
       height: 80px;
     }
     .ivu-input-icon{
          position: absolute;
          right:45px;
      }
     .ivu-input-icon-normal+.ivu-input{
       width: 120px;
     }
     .page{
       .ivu-select-selection{
         bottom: 6px;
       }
     }
  }
   </style>
