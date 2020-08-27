<template lang="html">
  <div class="tackStockRecord">
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
        <Form-item label="盘点状态">
          <Select v-model="formFilter.checkStatus" clearable placeholder="请选择"  style="width: 100px">
            <Option value="">-所有-</Option>
            <Option value="0">创建</Option>
            <Option value="2">盘库完成</Option>
            <Option value="3">差异确认</Option>
          </Select>
        </Form-item>
        <Form-item label="仓库">
          <Select v-model="formFilter.warehouseId"  placeholder="请选择" style="width: 160px">
            <Option v-for=" item in this.WarehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
          </Select>
        </Form-item>

        <Form-item label="库区">
          <Select v-model="formFilter.districtId" placeholder="请选择" style="width: 160px">
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
      <!-- <Button  type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='exportCheckRecorder'>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</Button> -->
      <Button  type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='saveCheckRecorder'>盘点登记</Button>
      <Button  type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='confirmDiffer'>差异确认</Button>
    </div>
  </div>
  <br>
    <Table height=500 border stripe :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" ></Table>
    <br />
    <div class="takeStockRecordPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import router from '../../router'
import iview from 'view-design'
export default {
  components: {
   },
  data () {
    return {
      WarehouseList:[],
      DistrictList:[],
      checkDetails:[],
      searchIndex:0,//当前查询库存的表格行
      checkOrderRows:[],//选择的盘点行
      total:1,
      stockList:[],
      startDateOption:{},
      endDateOption:{},
      loading:false,
      formFilter: {
        pagetotal:15,
        curPage:1,
        pageSize:20,
        startDate:'', //申请开始时间
        endDate:'',   //申请结束时间
        applyDate:new Date(),
        lockType:'',
        status:"('CDS3')", //盘库状态默认
        itemcode:'',
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
            {title: '物料编号',key: 'materielId',width: 300,align: 'center'},
            {title: '物料名称',key: 'materielName',width: 200,align: 'center'},
            {title: '批次号',key: 'stockBatch',width:150,align: 'center'},
            {title: '生产地',key: 'producerName',width:150,align: 'center'},
            {title: '生产日期',key: 'productionDate',width:150,align: 'center'},
            {title: '供应商',key: 'vendorName',width: 150, align: 'center'},
            {title: '包装规格',key: 'packageStandards',width:180,align: 'center'},
            {title: '计量单位',key: 'unit',width:100,align: 'center'},
            {title: '托盘码',key: 'palletCode',width:100,align: 'center'},
            {title: '货位号',key: 'storageId',width:140,align: 'center'},
            {title: '盘前件数',key: 'stockNum',width:100,align: 'center'},
            {title: '盘前重量',key: 'stockWeight',width:250,align: 'center'},
            {title: '盘前零件重量',key: 'stockPartWeight',width:250,align: 'center'},
            {title: '盘后件数',key: 'checkNum',width:250,align: 'center',
            render: (h, params) => {
              if (params.row.checkStatus == '0') {
                return h('Input',{
                  props: {
                   'value':params.row.checkNum,
                  },on:{
                        'on-change':(value)=> {
                            this.tableColumns.data[params.index].checkNum =  event.target.value;
                            params.row.checkNum =  event.target.value
                            for(let i=0;i < this.checkOrderRows.length;i++){
                               if(params.row.checkOrderId == this.checkOrderRows[i].checkOrderId){
                                 this.checkOrderRows[i].checkNum = params.row.checkNum
                               }
                             }
                       }
                     },
                  style: {
                    width:"160px",
                    marginBottom:'12px'
                  }
                })
              }else {
                return h('div',params.row.checkNum)
              }
          }},
          {title: '盘后零件重量',key: 'checkPartWeight',width:250,align: 'center',
          render: (h, params) => {
            if (params.row.checkStatus == '0') {
              return h('Input',{
                props: {
                 'value':params.row.checkPartWeight,
                },on:{
                      'on-change':(value)=> {
                        params.row.checkPartWeight =  event.target.value
                          this.tableColumns.data[params.index].checkPartWeight =  event.target.value;
                          this.tableColumns.data[params.index].checkWeight = parseFloat(params.row.checkNum)*parseFloat(params.row.packageStandards)+parseFloat(event.target.value)
                          for(let i=0;i < this.checkOrderRows.length;i++){
                             if(params.row.checkOrderId == this.checkOrderRows[i].checkOrderId){
                               this.checkOrderRows[i].checkPartWeight = params.row.checkPartWeight
                             }
                           }
                     }
                   },
                style: {
                  width:"160px",
                  marginBottom:'12px'
                }
              }
            )
            }else {
              return h('div',params.row.checkPartWeight)
            }
          }
          },
            {title: '盘后重量',key: 'checkWeight',width:250,align: 'center',
            render: (h, params) => {
              if (params.row.checkStatus == '0') {
                return h('Input',{
                  props: {
                   'value':params.row.checkWeight,
                },on:{
                      'on-change':(value)=> {
                        params.row.checkResult = value - params.row.stockWeight
                        params.row.checkWeight =  event.target.value
                        for(let i=0;i < this.checkOrderRows.length;i++){
                           if(params.row.checkOrderId == this.checkOrderRows[i].checkOrderId){
                             this.checkOrderRows[i].checkWeight = params.row.checkWeight
                             this.checkOrderRows[i].checkResult = params.row.checkResult
                           }
                         }
                          this.tableColumns.data[params.index].checkWeight =  event.target.value;
                     }
                   },
                style: {
                  width:"160px",
                  marginBottom:'12px'
                },
              }   )
              }else {
                return h('div',params.row.checkWeight)
              }
            }},

            {title: '盘盈/盘亏',key: 'checkResult',width:250,align: 'center', render:(h,params)=>{
              let islabel = '';
              if(params.row.checkResult > 0){
                islabel = '盘盈';
              }else if(params.row.checkResult < 0){
                islabel = '盘亏';
              }
                return h('div',islabel);
              }}
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
     confirmDiffer(){
       if(this.checkOrderRows.length == 0){
         iview.Message.error({
           content:'请选择要确认的行',
           duration:5
         });
         return
       }
       for (var i = 0; i < this.checkOrderRows.length; i++) {
         if(this.checkOrderRows[i].checkStatus=='3'){
           iview.Message.error({
             content:'包含已确认记录',
             duration:5
           });
           return
         }
         if(this.checkOrderRows[i].checkStatus!='2'){
           iview.Message.error({
             content:'请先进行盘点登记',
             duration:5
           });
           return
         }
       }
       axios.post(sessionStorage.http+'/confirmDiffer?loginStatus='+`${sessionStorage.loginStatus}`,this.checkOrderRows)
       .then((res) =>{
         iview.Message.success({
           content:res.message,
           duration:5,
         })
         this.checkOrderRows = []
         this.queryData()
       })
       .catch((err) => {
          iview.Message.error({
            content:'网络或服务器错误',
            duration:5
          });
       })
       this.checkOrderRows = []
     },
     saveCheckRecorder(){
       if(this.checkOrderRows.length == 0){
         alert("请选择要登记的行")
         return
       }
       for (var i = 0; i < this.checkOrderRows.length; i++) {
         if (this.checkOrderRows[i].checkStatus == '2' || this.checkOrderRows[i].checkStatus == '3') {
           iview.Message.error({
             content:'包含已登记记录',
             duration:5
           });
           return
         }
         if (this.checkOrderRows[i].checkNum == '' || this.checkOrderRows[i].checkNum == null) {
           iview.Message.error({
             content:'盘后件数不可为空',
             duration:5
           });
           return
         }
         if (this.checkOrderRows[i].unit != '件') {
           if (this.checkOrderRows[i].checkWeight == '' || this.checkOrderRows[i].checkWeight == null) {
             iview.Message.error({
               content:'盘后重量不可为空',
               duration:5
             });
             return
           }
           if (this.checkOrderRows[i].checkPartWeight == '' || this.checkOrderRows[i].checkPartWeight == null) {
             iview.Message.error({
               content:'盘后零件件数不可为空',
               duration:5
             });
             return
           }
         }

         this.checkOrderRows[i].checkResult = this.checkOrderRows[i].checkNum - this.checkOrderRows[i].stockNum
       }
       axios.post(sessionStorage.http+'/saveCheckRecorder?loginStatus='+`${sessionStorage.loginStatus}`,this.checkOrderRows)
       .then((res) =>{
         iview.Message.success({
           content:'登记成功',
           duration:5
         });
         this.checkOrderRows = []
         this.queryData()
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

    queryData(){//查询数据
      axios.post(sessionStorage.http+'/getAllCheckRecord?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        this.tableColumns.data = res.data.data
         this.total = res.data.length
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
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
      this.startDateOption = {
        disabledDate(startDate) {
          return startDate > new Date(endDate) && new Date(endDate)
        }
      }
     },
     queryPageData(){//查询数据
       axios.post(sessionStorage.http+'/getStockStoragePage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
       .then((res) =>{
       })
       .catch((err) => {
          iview.Message.error({
            content:'网络或服务器错误',
            duration:5
          });
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
     exportCheckRecorder(){
       let param = "loginStatus="+`${sessionStorage.loginStatus}`+
        "&checkrecordid="+this.formFilter.checkrecordid+
        "&checktype="+this.formFilter.checktype+
        "&approveStatus="+this.formFilter.approveStatus+
        "&startDate="+this.formFilter.startDate+
        "&endDate="+this.formFilter.endDate;
       window.open(sessionStorage.http+"/exportCheckRecorder?"+param)
     },
     handleChangePage (value) {
      this.formFilter.curPage = value
      this.trimPageData()
     },
     handleChangePageSize(value){
       this.formFilter.curPage = '1'
       this.formFilter.pageSize = value
     },
   },
   watch: {
     formFilter: {
       deep: true,
       handler() {
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
}
.textOutput{
  display: inline-block;
  width: 50px;
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
      .takeStockRecordPage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
</style>
