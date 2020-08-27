<template lang="html">
  <div class="tackStock">
    <Form ref="formFilter" :model="formFilter" :label-width="65" inline style="text-align:left;">
    <div>
        <Form-item label="入库单号">
          <Input v-model="formFilter.inOrderId" @on-keyup="checkrecordidChange" @on-blur="checkrecordidChange" class="textInput" placeholder="请输入" />
        </Form-item>

        <Form-item label="托盘码">
          <Input v-model="formFilter.palletCode" @on-keyup="checkrecordidChange" @on-blur="checkrecordidChange" class="textInput" placeholder="请输入" />
        </Form-item>

        <Form-item label="批次号">
          <Input v-model="formFilter.stockBatch" @on-keyup="checkrecordidChange" @on-blur="checkrecordidChange" class="textInput" placeholder="请输入" />
        </Form-item>

        <Form-item label="物料编号">
          <Input v-model="formFilter.materielId" @on-keyup="checkrecordidChange" @on-blur="checkrecordidChange" class="textInput" placeholder="请输入" />
        </Form-item>

        <Form-item label="物料名称">
          <Input v-model="formFilter.materielName" @on-keyup="checkrecordidChange" @on-blur="checkrecordidChange" class="textInput" placeholder="请输入" />
        </Form-item>

        <Form-item label="仓库">
          <Select v-model="formFilter.warehouseId"  placeholder="请选择" style="width: 160px">
            <Option value=" ">所有</Option>
            <Option v-for=" item in this.WarehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
          </Select>
        </Form-item>

        <Form-item label="库区">
          <Select v-model="formFilter.districtId" placeholder="请选择" style="width: 160px">
            <Option value=" ">所有</Option>
            <Option v-for=" item in this.DistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
          </Select>
        </Form-item>

        <Form-item label="货位号">
          <Input v-model="formFilter.storageId" @on-keyup="checkrecordidChange" @on-blur="checkrecordidChange" class="textInput" placeholder="请输入" />
      </Form-item>
    </div>
  </Form>
  <div class="" style="display:flex;justify-content:space-between;">
    <div class="">
    </div>
    <div class="">
      <Button  type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='addCheck'>确认盘点</Button>
    </div>
  </div>
  <Table height=630 border stripe :loading="loading"  ref="selection" style="margin-top:20px" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-row-dblclick="showRowDetail"></Table>
  <div class="page">
      &nbsp;
      <Page :total="formFilter.pagetotal" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
  </div>
  </div>
</template>


<script>
import axios from 'axios'
import router from '../../router'
import addTakeStock from '@/pages/takestock/AddTakeStock'
import detailTakeStock from '@/pages/takestock/DetailTakeStock'
import iview from 'view-design'
export default {
  components: {
    addTakeStock,
    detailTakeStock
   },
  data () {
    return {
        WarehouseList:[],
        DistrictList:[],
        startDateOption:{},
        endDateOption:{},
        startTimeOption: {},
        completeTimeOption: {},
        delete_confirm:false,
        checkDetails:[],
        searchIndex:0,//当前查询库存的表格行
        checkOrderRows:[],//选择的盘点行
        deleteCheckOrders:[],//要删除的盘点行
        total:0,
        stockList:[],
        sessionId:'',
        loading:false,
        formFilter: {
        // 分页信息
        pagetotal:1,
        curPage:1,
        pageSize:20,
        status:"",
        applyDate:new Date(),
        lockType:'',
        itemcode:'',
        startDate:'',
        endDate:'',
        loginStatus:`${sessionStorage.loginStatus}`,
      },
      definePageSize:10,
      tableColumns: {
        data:[
          {
            select:false,
            rowid:'',
            districtid:'',
            checkrecordid:'',
            checktype:'',
            originquantity:'',
            checkquantity:'',
            differquantity:'',
            checktime:'',
            remark:'',
            status:'',
          }
        ],
         card: [
          {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
          {title: '序号',key: 'rowid',width: 80,align: 'center',
              render: (h, params) => {
                return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
              }
          },
          {title: '入库单号', key: 'inOrderId',width: 250,align: 'center'},
          {title: '物料编号',key: 'materielId',width:110,align: 'center'},
          {title: '物料名称',key: 'materielName',width:150,align: 'center'},
          {title: '托盘码',key: 'palletCode',width:150,align: 'center'},
          {title: '货位号',key: 'storageId',width:150,align: 'center'},
          {title: '组盘件数',key: 'num',width: 150, align: 'center'},
          {title: '组盘重量',key: 'weight', width: 150,align: 'center'},
          {title: '零件重量',key: 'partWeight',width:150,align: 'center'},
          {title: '批次号',key: 'stockBatch',width: 150, align: 'center'},
          {title: '生产地',key: 'producerName', width: 150,align: 'center'},
          {title: '生产日期',key: 'produceDate',width:170,align: 'center'},
          {title: '供应商',key: 'vendorName',width:250,align: 'center'},
          {title: '质量状态',key: 'qualityStatus',width:100,align: 'center',
          render:(h,params)=>{
            let islabel = '';
          if(params.row.qualityStatus=='Q'){
            islabel = '精品';
          }else if(params.row.qualityStatus=='N'){
            islabel = '优等';
          }
          return h('div',islabel);
          }},
          {title: '包装规格',key: 'packageStandards',width:100,align: 'center'},
          {title: '计量单位',key: 'unit',width:170,align: 'center'},
          {title: '存储仓库',key: 'warehouseName',width:170,align: 'center'},
          {title: '存储库区',key: 'districtName',width:170,align: 'center'},
          {title: '入库日期',key: 'inTime',width:170,align: 'center'},
         ]
       }
    }
  },
  created(){        //渲染成功之后的专改
    axios.get(sessionStorage.http+`/getAllWareHouseInfo?loginStatus=${sessionStorage.loginStatus}`)
     .then((res)=>{
       res.data.forEach(item => {
          if (item.isStart == '1') {
            this.WarehouseList.push(item)
          }
        })
     })
     axios.get(sessionStorage.http+`/getAllDistrictInfo?loginStatus=${sessionStorage.loginStatus}`)
      .then((res)=>{
        res.data.forEach(item => {
           if (item.isStart == '1') {
             this.DistrictList.push(item)
           }
         })
      })
    this.queryData()
  },
  methods:{
    addCheck(){//新增盘点
      if(this.checkOrderRows.length == 0){
        iview.Message.error({
          content:'选择要盘点的行',
          duration:5
        });
        return
      }
      this.checkOrderRows.loginStatus = sessionStorage.loginStatus
      console.log(this.checkOrderRows)
      axios.post(sessionStorage.http+'/addCheckOrder?loginstatus='+`${sessionStorage.loginStatus}`,this.checkOrderRows)
      .then((res) =>{
        if(res.data==500){
          iview.Message.error({
            content:'所选货位中包含有任务在执行的货位，不可盘点',
            duration:5
          });
          return
        }
        iview.Message.success({
          content:res.message,
          duration:5,
          onClose:function(){
          }
        })
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    onSelectionChange (rows) {//将选中的行记录下来
       this.checkOrderRows = rows
     },
    checkrecordidChange(){//盘库单号改变
      if(this.formFilter.checkrecordid.length > 30){
        this.formFilter.checkrecordid = this.formFilter.checkrecordid.substr(0,30)
      }
    },
    queryData(){
      this.formFilter.remark1 = '2'
      axios.post(sessionStorage.http+'/queryStock?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
          this.tableColumns.data = res.data.data
          this.formFilter.pagetotal = res.data.length
      })
    },
    formartDate(date){//日期格式化
      let  Y = date.getFullYear() + '-'
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D
    },
    //关于datepicker的方法
    onStartDateChange(startDate, type) {
      this.endDateOption = {
         disabledDate(endDate) {
           return endDate < new Date(startDate)
         }
       }
    },
     /**
      * 结束时间发生变化时触发,设置开始时间不可选择的日期
      * 开始时间小于等于结束时间,且小于等于当前时间
      * @param {string} date 格式化后的日期
      * @param {string} type 当前的日期类型
      */
    onEndDateChange(endDate, type) {
      console.log("结束时间" + endDate)
     this.startDateOption = {
       disabledDate(startDate) {
         return startDate > new Date(endDate) && new Date(endDate)
       }
     }
    },
     handleChangePage (value) {
       this.formFilter.curPage = value;
       this.queryData();
     },
     handleChangePageSize(value){
       this.formFilter.curPage = '1';
       this.formFilter.pageSize = value;
       this.queryData();
     },
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
    font-size: 12px;
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
  font-size: 12px;
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
  width: 50px;
}
.inputPopLable{
  width: 150px;
  align:right;
  text-align: right;
}
.textLongInput{
  width: 1000px;
  height: 28px;
  color: #333333;
}
.clear{clear:both;}

.title{
  color: blue;
  text-align: left;
  width: 30%;
}
td{
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
    .tackStock{
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
       .page{
          .ivu-select-selection{
          bottom: 6px;
          }
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
      .takeStockPage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
</style>
