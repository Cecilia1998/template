<template lang="html">
  <div class="outTaskSchedule">
    <Form ref="formFilter" :model="formFilter" :label-width="95" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <table>
        <tr>
          <td colspan="2">

            <Form-item label="任务类型">
              <Select v-model="formFilter.orderType" clearable placeholder="请选择" @on-change="" class="textInput"  style="width: 160px">
                <Option value="">-所有-</Option>
                <Option value="1">出库</Option>
                <Option value="3">盘点出库</Option>
                <Option value="5">拼盘出库</Option>
              </Select>
            </Form-item>
            <Form-item label="托盘码">
                <Input v-model="formFilter.palletCode" placeholder="请输入" clearable class="textInput" />
            </Form-item>
            <Form-item label="仓库" >
              <Select v-model="formFilter.warehouseId" placeholder="请选择" clearable>
                <Option v-for=" item in warehouseList" :key="item.warehouseId" :value="item.warehouseId">{{ item.warehouseName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="库区" >
              <Select v-model="formFilter.districtId" placeholder="请选择" clearable>
                <Option v-for=" item in districtList" :key="item.districtId" :value="item.districtId">{{ item.districtName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="任务状态">
                <Select v-model="formFilter.status" placeholder="请选择" style="width: 120px;" clearable>
                <!-- <Option value="">-所有部门-</Option> -->
                    <Option value="0">新建</Option>
                    <Option value="1">已发送WCS</Option>
                    <Option value="2">任务异常</Option>
                    <Option value="3">完成</Option>
                    <Option value="4">暂停</Option>
                <!-- <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option> -->
                </Select>
            </Form-item>

          </td>

        </tr>

        </table>
      </Form>
      <div class="" style="position:relative;">
        <div>
          <Input v-model="testTaskId" placeholder="请输入" clearable class="textInput" />
          <Button shape="circle" @click="testTaskOut"  type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >测试出库</Button>
        </div>
        <div class="" style="position:absolute;right:0px;top:-54px;z-index:999">
          <Button type="primary" shape="circle" @click="exportcheckreport"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">导&nbsp;&nbsp;出</Button>
        </div>
      </div>
    <Table height=500 border stripe :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-row-dblclick	="showRowDetail"></Table>


    <br />
    <div class="operatepage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import router from '../../router'
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
      testTaskId:'', //测试数据 taskId
      total:0,

      loading:false,
      formFilter: {
        curPage:1,
        pageSize:20,
        startDate:'',
        endDate:'',
        loginStatus:`${sessionStorage.loginStatus}`,
      },
      warehouseList:[], //所有的仓库
      districtList:[], //所有的库区

      definePageSize:10,
      tableColumns: {
        data:[
          {
            rowid:'',
            operType:'',
            operatorName:'',
            operTime:'',
            operMenu:'',
            operMethod:'',
            operColData:'',

          }
        ],
         card: [
           {title: '序号',key: 'rowid',width: 80,align: 'center'},
           {title: '出库单号',key: 'ordeId',width: 120,align: 'center'},
           {title: '任务单号',key: 'taskId',width: 120,align: 'center'},
          {title: '任务类型',key: 'orderType',width: 120,align: 'center'},
          {title: '仓库',key: 'warehouseName',width: 120,align: 'center'},
          {title: '库区',key: 'districtName',width: 120,align: 'center'},
          {title: '货位号',key: 'startStorageId',width: 120,align: 'center'},
          {title: '托盘号', key: 'palletCode',width: 250,align: 'center'},
          {title: '开始位置',key: 'startStorageId',width:150,align: 'center'},
          {title: '结束位置',key: 'endStorageId',width:300,align: 'center'},
          {title: '开始时间',key: 'startTime',width:300,align: 'center'},
          {title: '结束时间',key: 'finishTime',width:300,align: 'center'},
          {title: '任务状态',key: 'status',width: 120, align: 'center',render: (h, params) => {
            if(params.row.status == '0'){
              return h('span','新建')
            }else if(params.row.status == '1'){
              return h('span','已发送WCS')
            }else if(params.row.status == '2'){
              return h('span','任务异常')
            }else if(params.row.status == '3'){
              return h('span','完成')
            }else if(params.row.status == '4'){
              return h('span','暂停')
            }
            else{
              return h('span','')
            }

             }},

        ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    this.queryData();
    //获取所有的仓库
    this.getAllWarehouse();

    //获取所有的库区
    this.getAllDistrict();
  },
  updated(){

  },
  computed:{

  },
  methods:{

    testTaskOut(){//下发拣选任务


         axios.post(sessionStorage.http+'/testTaskOut?loginStatus='+`${sessionStorage.loginStatus}`+'&taskId=' + `${this.testTaskId}`)
         .then((res) =>{
           this.$Message.success("出库完成")
         }).catch((err) => {
           this.$Message.success("出库失败")
         })


    },

    exportcheckreport(){
            let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&orderType="+this.formFilter.orderType+
            "&ordeId="+this.formFilter.ordeId+
            "&districtId="+this.formFilter.districtId
            window.open(sessionStorage.http+"/exportOutWareTaskDetail?"+param)
          },
    testtest(){

    },
    queryData(){//查询数据
      console.log(this.formFilter)
      axios.post(sessionStorage.http+'/quaryOutWareTaskDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.tableColumns.data = res.data.resultData
        this.total = res.data.total
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    //获取所有的仓库
    getAllWarehouse(){
      axios.get(sessionStorage.http+`/getAllWareHouseInfo?loginStatus=${sessionStorage.loginStatus}`)
         .then((res)=>{
           this.warehouseList = res.data;
         })
    },

    //获取所有的库区
    getAllDistrict(){
        axios.get(sessionStorage.http+`/getAllDistrictInfo?loginStatus=${sessionStorage.loginStatus}`)
          .then((res)=>{
            this.districtList = res.data;
          })
    },

    formartDate(date){//日期格式化
      let  Y = date.getFullYear() + ''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 + '';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() + '';
      return Y + M + D
    },
    startDateChangedOper(){//操作时间起始日期改变
      if(this.formFilter.startDateOper != ''){
        this.formFilter.startDate = this.formartDate(this.formFilter.startDateOper)
      }else {
        this.formFilter.startDate = undefined
      }
      if(this.formFilter.startDateOper != '' && this.formFilter.endDateOper != ''){
        if(this.formartDate(this.formFilter.startDateOper) > this.formartDate(this.formFilter.endDateOper)){
          alert("起始日期不能大于结束日期")
                this.formFilter.startDateOper = undefined
                this.formFilter.startDate = undefined
        }
      }
    },
    endDateChangedOper(){//操作时间结束日期改变
      if(this.formFilter.endDateOper != ''){
        this.formFilter.endDate = this.formartDate(this.formFilter.endDateOper)
      }else {
        this.formFilter.endDate = undefined
      }
      if(this.formFilter.startDateOper != '' && this.formFilter.endDateOper != ''){
        if(this.formartDate(this.formFilter.startDateOper) > this.formartDate(this.formFilter.endDateOper)){
          alert("结束日期不能小于起始日期")
               this.formFilter.endDateOper = undefined
               this.formFilter.endDate = undefined
        }
      }
    },
    handleChangePage (value) {
     this.formFilter.curPage = value
     this.queryData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      // const paths = this.$route.path.split('/')
    },

    handleSubmit () {

     },
     exportfile(){

     },
     onDoubleClick(value){
       console.log(value)
     }
  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        console.log(this.formFilter)
        this.queryData();
      }
    }
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
.yaHei18{
    font-size: 18px;
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
  font-size: 18px;
}
.blueYaHei18{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 18px;
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
.inputLable{
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
    .outTaskSchedule{
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
      .operatepage{
        .ivu-select-selection{
          bottom: 6px
        }
      }
    }
</style>
