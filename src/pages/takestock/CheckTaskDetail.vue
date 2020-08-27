detail<template lang="html">
  <Modal class="recordDetail"
      v-model="detail"
      :loading='loading'
      footer-hide
      :mask-closable='false'
      @on-ok="ok"
      @on-cancel="cancel" width='50%'
      ok-text='提交'
      cancel-text='关闭'>
      <p slot="header" style="text-align:center;font-size:18px">
            <span>盘点任务列表</span>
      </p>

    <Table height=400 border stripe :loading="loading" ref="selection" :columns="tableColumnsDetail.card" :data="tableColumnsDetail.data" @on-selection-change="" ></Table>
    <br />
    <!-- <div class="takeStockRecordDetailPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div> -->


  </Modal>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'
// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      checkDetails:[],
      endIndex:0,//当前结束盘点的表格行
      detailRows:[],//选择的明细行
      detail:false,//用于控制是否显示本弹窗
      loading:false,
      deleteDetails:[],//要删除的明细
      couldDelet:'false',
      detailList:[],
      total:0,

      formFilter: {
        checkdetailid:'',
        locktype:'LD01',
        itemcode:'',
        curPage:1,
        pageSize:20,
        loginStatus:`${sessionStorage.loginStatus}`,
        checkrecordid:'',
      },
      tableColumnsDetail: {
        data:[
          {
            lineno:'',
            taskid:'',
            warehouseid:'',
            origdistrictid:'',
            origstorageid:'',
            origtrayno:'',
            movequantity:'',
            targetstorageid:'',
            remark:'',
          }
        ],
         card: [
          {title: '序号',key: 'lineno',width: 80,align: 'center'},
          {title: '任务编号',key: 'taskid',width: 200,align: 'center'},

          {title: '原货位',key: 'origstorageid',width: 120,align: 'center'},
          // {title: 'hu号',key: 'origtrayno',width:110,align: 'center'},
          {title: '移动件数',key: 'movequantity',width:90,align: 'center'},
          {title: '目标货位',key: 'targetstorageid',width: 120, align: 'center'},
          {title: '备注',key: 'remark', width: 300,align: 'center'},
          {title: '操作', key: 'action',align: 'center', width: 100,
            render: (h, params) => {
              if(params.row.status=='2'){
                return  h('span', {},"已完成")
              }
              let buttons = []
              if(params.row.status=='0'){
                buttons.push(h('a', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.sendTask(params);
                    }
                  }
                }, '下发'))
              }
              if(params.row.status=='1'){
                buttons.push(h('a', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.completeTask(params);
                    }
                  }
                }, '完成'))
              }

              return h('div', buttons)
            }
          }


        ]
      }
    }
  },
  created(){        //渲染成功之后的专改

  },
  updated(){

  },
  computed:{

  },
  methods:{
    testtest(){

    },
    sendTask(params){
      let pass = true
      if(params.index != 0){
        if(this.tableColumnsDetail.data[params.index - 1].status != '2'){
          this.$Message.error("前面的任务未完成，不可下发本任务")
          pass = false
        }
      }
      if(this.tableColumnsDetail.data[params.index].status == '1'){
        this.$Message.error("本任务已下发，不可重复下发")
        pass = false
      }
      if(pass){
        axios.post(sessionStorage.http+'/sendCheckTask?loginStatus='+`${sessionStorage.loginStatus}`,params.row)
        .then((res) =>{
          this.tableColumnsDetail.data[params.index].status = '1'
          // this.trimRowid()
          iview.Message.success({
            content:res.message,
            duration:5
          });
        })
        .catch((err) => {
           // iview.Message.error({
           //   content:'网络或服务器错误',
           //   duration:5
           // });
        })
      }

    },
    completeTask(params){
      let pass = true
      if(pass){
        axios.post(sessionStorage.http+'/completeCheckTask?loginStatus='+`${sessionStorage.loginStatus}`,params.row)
        .then((res) =>{
          this.tableColumnsDetail.data[params.index].status = '2'
          // this.trimRowid()
          iview.Message.success({
            content:res.message,
            duration:5
          });
        })
        .catch((err) => {
           // iview.Message.error({
           //   content:'网络或服务器错误',
           //   duration:5
           // });
        })
      }

    },
    trimRowid(){
      for (var i = 0; i < this.tableColumnsDetail.data.length; i++) {
        this.tableColumnsDetail.data[i].lineno = i+1
      }
    },
    queryCheckTaskDetail(){//查询任务明细
      axios.post(sessionStorage.http+'/queryCheckTaskDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        this.tableColumnsDetail.data = res.data
        this.trimRowid()
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    show(checkdetailid){
      this.formFilter.checkdetailid = checkdetailid
      //this.queryCheckDetail()
      this.queryCheckTaskDetail()
      this.detail = true;
      //this.loading = false;
    },
    ok(){

      this.loading = false;
    },
    cancel(){
      //document.getElementById("queryCheckOrderData").click()
      //alert(113)
      //this.loading = false;
    },

    handleChangePage (value) {
     this.formFilter.curPage = value
     this.trimPageData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      // const paths = this.$route.path.split('/')
    },

    trimPageData(){
      var startIndex = (this.formFilter.curPage - 1) * this.formFilter.pageSize
      var endIndex = startIndex + this.formFilter.pageSize
      this.tableColumnsDetail.data = []
      for (var i = startIndex; i < this.detailList.length && i <endIndex; i++) {
        console.log(i)
        this.tableColumnsDetail.data.push(this.detailList[i])
      }
    },

  }
}
</script>

<style lang="less" scoped>
.width50{
  width: 150px;
}
.clear{clear:both;}

.title{
  color: blue;
  text-align: left;
  width: 30%;
}
.fontRed{
  color: red;
}
.fontBlue{
  color: blue;
}
.font15{
  font-size: 15px;
}

.font20{
    font-size: 20px;
  }
.backBlue{
  background-color: #5aa5ff;
}
.yaHeiStrong18{
  font-family: Microsoft YaHei;
  font-size: 18px;
  font-weight: bold;
}
.yaHei18{
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.blueYaHei18{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.blueYaHei20{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 20px;
}
.redYaHei18{
  color: #fe3838;
  font-family: Microsoft YaHei;
  font-size: 18px;
}
.ButtonBlue{
  background-color: #5aa5ff;
  height: 28px;
  font-size: 16px;
  color: #ffffff;
  width: 120px;
  line-height: 5px;
}
.ButtonGrey{
  background-color: #cccccc;
  border-color:#cccccc;
  height: 28px;
  font-size: 16px;
  color: #ffffff;
  width: 120px;
  line-height: 5px;
}
.textInput{
  width: 160px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
.textOutput{
  display: inline-block;
  margin-top: 10px;
  width: 160px;
  height: 28px;
  font-size: 12px;
}
.inputPopLable{
  width: 100px;
  align:right;
  text-align: right;
}
.textLongInput{
  width: 1000px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
// .dateInput{
//   width: 120px;
//   height: 28px;
//   color: #333333;
// }
.clear{clear:both;}

.title{
  /* border: 1px solid red; */
  /* float: left; */
  /* font-size: 15px; */
  color: blue;
  text-align: left;
  width: 30%;
}




td{
  // border: 1px solid red;
}
.hint{
  text-align: center;
  align:center;
}
  #overdue_day input,#product_date input{
  display: inline-block;
  width: 100px;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
</style>

<style lang="less">
    .recordDetail{
     th .ivu-table-cell{
         font-size: 12px !important;
         font-weight: bold;
         color:#333;
       }
       .ivu-form .ivu-form-item-label{
         color:#5aa5ff !important;
         font-size: 12px !important;
         font-family:"Microsoft YaHei";
         line-height: 20px;
       }
       .ivu-input-wrapper{
          width: 120px;
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
         font-size: 12px;
         color:#999;
         font-family:"Microsoft YaHei";
         vertical-align: middle;
         line-height: 40px;
       }
       .ivu-table td{
         background-color:#fff;
         height: 40px;
       }
       .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
         background-color: #f9f9f9;
         height: 40px;
       }
      .ivu-input-icon{
           position: absolute;
           right:5px;
       }
      .ivu-input-icon-normal+.ivu-input{
        width: 120px;
      }
      .takeStockRecordDetailPage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
</style>
