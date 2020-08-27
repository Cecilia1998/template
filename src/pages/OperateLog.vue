<template lang="html">
  <div class="tackStockRecord">
    <Form ref="formFilter" :model="formFilter" :label-width="95" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <table>
        <tr>
          <td colspan="2">
            <Form-item label="操作人">
              <Input v-model="formFilter.operatorName" @on-keyup="operatorNameChange" @on-blur="operatorNameChange" placeholder="请输入" class="textInput" style="width:160px" />
            </Form-item>
            <Form-item label="操作类型">
              <Select v-model="formFilter.operType" clearable placeholder="请选择" @on-change="" class="textInput"  style="width: 160px">
                <Option value="">-所有-</Option>
                <Option value="新增">新增</Option>
                <Option value="修改">修改</Option>
                <Option value="删除">删除</Option>
              </Select>
            </Form-item>
            <Form-item label="操作时间">
                <DatePicker v-model="formFilter.startDateOper" @on-change="startDateChangedOper" type="date" placeholder="请选择" class="dateInput" ></DatePicker>-<DatePicker v-model="formFilter.endDateOper" @on-change="endDateChangedOper" type="date" placeholder="请选择" class="dateInput" ></DatePicker>

            </Form-item>
          </td>

        </tr>

        </table>
      </Form>

    <Table height=500 border stripe :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-row-dblclick	="showRowDetail"></Table>


    <br />
    <div class="operatepage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>

    <addTakeStock ref='addTakeStock'></addTakeStock>
    <takeStockRecordDetail ref='takeStockRecordDetail'></takeStockRecordDetail>
      <Button id="showDetail" v-show="false" type="primary" shape="circle"y class="ButtonBlue"  icon="ios-search" @click="showDetailById">显示明细</Button>
      <Input v-model="formFilter.showCheckId" v-show="false" id="showCheckId" class="textInput" />
  </div>
</template>


<script>
import axios from 'axios'
import addTakeStock from '@/pages/takestock/AddTakeStock'
import takeStockRecordDetail from '@/pages/takestock/TakeStockRecordDetail'
import iview from 'view-design'
// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
    addTakeStock,
    takeStockRecordDetail
     // FilterBar,
     // List
   },
  data () {
    return {
      total:0,

      loading:false,
      formFilter: {
        curPage:1,
        pageSize:20,
        startDate:'',
        endDate:'',
        loginStatus:`${sessionStorage.loginStatus}`,
      },

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
          {title: '操作类型',key: 'operType',width: 120,align: 'center'},
          {title: '操作人',key: 'operatorName',width: 120,align: 'center'},
          {title: '操作时间', key: 'operTime',width: 250,align: 'center'},
          {title: '操作菜单',key: 'operMenu',width:150,align: 'center'},
          {title: '功能描述',key: 'operMethod',width:300,align: 'center'},
          {title: '操作信息描述',key: 'operColData',width: 700, align: 'center'},
        ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    this.queryData()
  },
  updated(){

  },
  computed:{

  },
  methods:{
    testtest(){

    },
    queryData(){//查询数据
      console.log(this.formFilter)
      axios.post(sessionStorage.http+'/querySystemOperLog?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
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
    .tackStockRecord{
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
