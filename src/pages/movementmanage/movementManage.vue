<template lang="html">
  <div class="movementManage">
     <Form ref="formFilter" :model="formFilter" :label-width="90" inline style="text-align:left;" >
              <Form-item label="物料号">
                <Input v-model="formFilter.materielId" @on-change="queryData"  class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="生产地">
                <Input v-model="formFilter.producerName" @on-change="queryData" class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="供应商">
                <Input v-model="formFilter.vendorName" @on-change="queryData"  class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="托盘码">
                <Input v-model="formFilter.palletCode"  @on-change="queryData" class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="起始仓库">
                <Select v-model="moveformFilter.origWarehouseId" clearable @on-change="queryData" placeholder="请选择" style="width: 160px">
                  <Option v-for=" item in this.WarehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="生产日期">
                <DatePicker v-model="formFilter.startEffectDate" type="date" placeholder="请选择" style="width: 120px" @on-change="startDateChangedIn" :options="startTimeOption"></DatePicker> -
                <DatePicker v-model="formFilter.endEffectDate" type="date" placeholder="请选择" style="width: 120px"  @on-change="endDateChangedIn" :options="completeTimeOption"></DatePicker>
              </Form-item>
              <Form-item label="货位号">
                <Input v-model="formFilter.storageId" @on-change="queryData" class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="起始库区" prop="supplier">
                <Select v-model="moveformFilter.origDistrictId" clearable @on-change="queryData" placeholder="请选择" style="width: 160px">
                  <Option v-for=" item in this.DistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="入库日期" prop="insertYmd" >
                <DatePicker v-model="formFilter.startDateReck" type="date" placeholder="请选择" style="width: 120px"@on-change="startDateChangedReck" :options="startTimeOption"></DatePicker> -
                <DatePicker v-model="formFilter.endDateReck" type="date" placeholder="请选择" style="width: 120px"  @on-change="endDateChangedReck" :options="completeTimeOption"></DatePicker>
              </Form-item>
      </Form>
      <br>
      <div class="" style="display:flex;justify-content:space-between">
        <div class="">
          <div class="" style="text-align:left;margin-left:20px">
            移入信息
          </div>
          <Form ref="moveformFilter" :model="moveformFilter" :label-width="90" inline style="text-align:left;" >
            <Form-item label="目标仓库" prop="supplier">
              <Select v-model="moveformFilter.targetWarehouseId" clearable @on-change="getDistrict(moveformFilter.targetWarehouseId)" placeholder="请选择" style="width: 160px">
                <Option v-for=" item in this.WarehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="目标库区" prop="supplier">
                <Select v-model="moveformFilter.targetDistrictId" clearable placeholder="请选择" style="width: 160px">
                  <Option v-for=" item in this.tarDistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="目标货位">
                  <Input v-model="moveformFilter.targetStorageId"  class="textInput" placeholder="请输入" />
              </Form-item>
          </Form>
        </div>
        <div class="">
          <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="confirmMove">确认移库</Button>
          <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="finishMove">导出</Button>
        </div>
      </div>
      <div class="departmenttable">
      <Table border stripe  :loading="loading" ref="selection" :columns="field" :data="dataList"  height=600 style="margin-top:-20px;"  @on-selection-change="onSelectionChange"></Table>
      </div>
      <div class="page">
        &nbsp;
      <Page  show-sizer show-elevator show-total :total="formFilter.pagetotal"  :current="formFilter.curPage" :page-size="formFilter.pageSize"  :page-size-opts="[10,20,30]"  @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'
  export default {
    components: {
    },
     data () {
       return {
         WarehouseList:[],
         DistrictList:[],
         tarDistrictList:[],
         clickSt:true,
         mmm:'8',
         rowIndex:-1,
         trayNo:[],
         test:true,
         deDis:true,
         waa:true,
         delete_confirm_Order:false,
         loading:false,
         testStatusList:['','合格','不合格','质检','AAA'],
         targetDistrictList:[' '],
         supplierList:[],
         rows:[],
         selectobject:[],
         loginStatus:sessionStorage.loginStatus,
         selectedRowMoveOrderId:'',
         moveformFilter:{},
         searchdistrictInfo:{},
         formFilter:{
           moveOrderId:'',
           partCode:'',
           customer:'',
           createDate:'',
           completeDate:'',
           status:'',
           curPage:1,
           pageSize:20,
           sortKey:'moveOrderId',
           sortOrder:'asc',
         },
         dataList:[],
         field:[
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
           {title: '序号',key: 'lineNo',width: 75,align: 'center',
                 render: (h, params) => {
                   return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
                 }
           },
           {title: '物料编号',key: 'materielId',width: 180,align: 'center'},
           {title: '物料名称',key: 'materielName',width: 180,align: 'center'},
           {title: '托盘码',key: 'palletCode', width: 120,align: 'center'},
           {title: '批号',key: 'stockBatch', width: 120,align: 'center'},
           {title: '生产地',key: 'producerName', width: 120,align: 'center'},
           {title: '生产日期', key: 'produceDate',width:120,align: 'center'},
           {title: '供应商', key: 'vendorName',width:180,align: 'center'},
           {title: '件数', key: 'num',width:120,align: 'center'},
           {title: '重量', key: 'weight',width:120,align: 'center'},
          {title: '入库日期', key: 'inTime',width:120,align: 'center'},
          {title: '起始仓库', key: 'warehouseName',width:120,align: 'center'},
          {title: '起始库区',key: 'districtName',width: 130 ,align: 'center'},
          {title: '起始货位', key: 'storageId',width:150,align: 'center'},
          ],
          startTimeOption: {},
          completeTimeOption: {}
        }
      },
      created(){
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
                 this.tarDistrictList.push(item)
               }
             })
          })
          this.formFilter.remark1 = '2'
       this.queryData();
     },
     methods:{
       getDistrict(wareId){
         this.searchdistrictInfo.warehouseId = wareId
         axios.post(sessionStorage.http+`/getDistrict?loginStatus=${sessionStorage.loginStatus}`,this.searchdistrictInfo)
         .then((res) => {
             this.tarDistrictList = []
             res.data.forEach(item => {
              if (item.isStart == '1') {
                this.tarDistrictList.push(item)
              }
            })
         })
       },
       queryData(){
         console.log(this.formFilter)
         this.formFilter.districtId = this.moveformFilter.origDistrictId
         this.formFilter.warehouseId = this.moveformFilter.origWarehouseId
          this.formFilter.loginStatus=sessionStorage.loginStatus
          axios.post(sessionStorage.http +`/getStockStorage`,this.formFilter)
          .then(res => {
          this.formFilter.pagetotal = res.data.length
          this.dataList = res.data.data
          })
          .catch(res => {
          })
       },
       confirmMove(){
         if(this.selectobject.length == 0){
           iview.Message.error({
             content:"请选择一条数据！",
             duration:1,
           });
           return
         }
         if(this.moveformFilter.targetWarehouseId==null || this.moveformFilter.targetWarehouseId== ''){
           iview.Message.error({
             content:"目标仓库不能为空！",
             duration:1,
           });
           return
         }
         if(this.moveformFilter.targetDistrictId==null || this.moveformFilter.targetDistrictId== ''){
           iview.Message.error({
             content:"目标库区不能为空！",
             duration:1,
           });
           return
         }
         if(this.selectobject.length == 1){
           if(this.moveformFilter.targetStorageId==null || this.moveformFilter.targetStorageId== ''){
             iview.Message.error({
               content:"单个货位请选择目标货位！",
               duration:1,
             });
             return
           }
           let param = "loginStatus="+`${sessionStorage.loginStatus}`+
          "&origWarehouseId="+this.selectobject[0].warehouseId+
         "&origDistrictId="+this.selectobject[0].districtId+
         "&origStorageId="+this.selectobject[0].storageId+
         "&palletCode="+this.selectobject[0].palletCode+
           "&targetWarehouseId="+this.moveformFilter.targetWarehouseId+
           "&targetDistrictId="+this.moveformFilter.targetDistrictId+
           "&targetStorageId="+this.moveformFilter.targetStorageId
           axios.post(sessionStorage.http+'/confirmMove',param)
           .then(res => {
             console.log(res)
             if(res.data == '100'){
               this.queryData();
               iview.Message.success({
                 content:"提交成功",
                 duration:5,
               });

               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }else  if(res.data == '0'){
               iview.Message.error({
                 content:"无此货位",
                 duration:1,
               });
               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }else  if(res.data == '1'){
               iview.Message.error({
                 content:"目标货位非空货位",
                 duration:1,
               });
               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }else  if(res.data == '2'){
               iview.Message.error({
                 content:"目标货位不存在",
                 duration:1,
               });
               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }else  if(res.data == '3'){
               iview.Message.error({
                 content:"目标货位与目标库区不一致",
                 duration:1,
               });
               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }else  if(res.data == '4'){
               iview.Message.error({
                 content:"起始货位有其他操作",
                 duration:1,
               });
               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }else if(res.data == '500'){
               iview.Message.error({
                 content:"目标库区无合适货位",
                 duration:1,
               });
               this.clickSt=false,
               setTimeout(() => {
                 this.clickSt=true
               },2000)
               return
             }
           })
           .catch(res => {
           })
           return
         }
         axios.post(sessionStorage.http+`/confirmMoveAll?targetWarehouseId=
           ${this.moveformFilter.targetWarehouseId}&targetDistrictId=
             ${this.moveformFilter.targetDistrictId}`,this.selectobject)
         .then(res => {
             this.queryData();
             iview.Message.success({
               content:"提交成功",
               duration:5,
             });

             this.clickSt=false,
             setTimeout(() => {
               this.clickSt=true
             },2000)
           })
           .catch(res => {
           })
       },
       onSelectionChange (a) {
         this.selectobject = a;
       },
       finishMove(){

        },
           startDateChangedIn(){//有效期起始期改变
             if(this.formFilter.startEffectDate != ''){
               this.formFilter.startEffectTimeStr = this.formartDate(this.formFilter.startEffectDate)
             }else {
               this.formFilter.startEffectTimeStr = undefined
             }
             if(this.formFilter.startEffectDate != '' && this.formFilter.endEffectDate != ''){
               if(this.formartDate(this.formFilter.startEffectDate) > this.formartDate(this.formFilter.endEffectDate)){
                 console.log(this.formFilter.startEffectDate)
                 alert("起始日期不能大于结束日期")
                       this.formFilter.startEffectDate = undefined
                       this.formFilter.startEffectTimeStr = undefined
               }
             }
               this.queryData()
           },
           endDateChangedIn(){//有效期结束期改变
             if(this.formFilter.endEffectDate != ''){
               this.formFilter.endEffectTimeStr = this.formartDate(this.formFilter.endEffectDate)
             }else {
               this.formFilter.endEffectTimeStr = undefined
             }
             if(this.formFilter.startEffectDate != '' && this.formFilter.endEffectDate != ''){
               if(this.formartDate(this.formFilter.startEffectDate) > this.formartDate(this.formFilter.endEffectDate)){
                 console.log(this.formFilter.endEffectDate)
                 alert("结束日期不能小于起始日期")
                      this.formFilter.endEffectDate = undefined
                      this.formFilter.endEffectTimeStr = undefined
               }
             }
             if(this.formFilter.endEffectTimeStr != null && this.formFilter.endEffectTimeStr != undefined){
               this.queryData()
             }
           },

           startDateChangedReck(){//复检期起始日期改变
             if(this.formFilter.startDateReck != ''){
               this.formFilter.starteRecheckTimeStr = this.formartDate(this.formFilter.startDateReck)
             }else {
               this.formFilter.starteRecheckTimeStr = undefined
             }
             if(this.formFilter.startDateReck != '' && this.formFilter.endDateReck != ''){
               if(this.formartDate(this.formFilter.startDateReck) > this.formartDate(this.formFilter.endDateReck)){
                 alert("起始日期不能大于结束日期")
                       this.formFilter.startDateReck = undefined
                       this.formFilter.starteRecheckTimeStr = undefined
               }
             }
               this.queryData()
           },
           endDateChangedReck(){//复检期结束日期改变
             if(this.formFilter.endDateReck != ''){
               this.formFilter.endRecheckTimeStr = this.formartDate(this.formFilter.endDateReck)
             }else {
               this.formFilter.endRecheckTimeStr = undefined
             }
             if(this.formFilter.startDateReck != '' && this.formFilter.endDateReck != ''){
               if(this.formartDate(this.formFilter.startDateReck) > this.formartDate(this.formFilter.endDateReck)){
                 alert("结束日期不能小于起始日期")
                      this.formFilter.endDateReck = undefined
                      this.formFilter.endRecheckTimeStr = undefined
               }
             }
             if(this.formFilter.endRecheckTimeStr != null && this.formFilter.endRecheckTimeStr != undefined){
               this.queryData()
             }
           },
           formartDate(date){//日期格式化
             let  Y = date.getFullYear() +''
             let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
             let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
             let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
             let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
             let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
             // console.log(Y + M + D)
             return Y + M + D
           },
       // 翻页事件
       handleChangePage (value) {

         this.formFilter.curPage = value;
         this.queryData();
         // console.log(value)
       },

       //改变每页大小事件
       handleChangePageSize(value){
         this.formFilter.curPage = '1';
         this.formFilter.pageSize = value;
         this.queryData();
       }
     }
}
</script>
<style lang="less" scoped>
</style>
<style lang="less">
     .movementManage{
       .ivu-table-cell{
         overflow: inherit;
       }
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
         // width: 160px;
         height: 20px;
       }
       .ivu-select{
         // width: 160px;
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
        line-height: 40px
      }
      .departmenttable{
          // .ivu-table td{
          //   background-color:#fff;
          //   height: 40px;
          // }
          // .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
          //   background-color: #f9f9f9;
          //   height: 40px;
          // }
      }
      .ivu-input-icon{
           position: absolute;
           right:45px;
       }
       .page{
     .ivu-select-selection{
       bottom: 6px;
     }
   }
      .ivu-input-icon-normal+.ivu-input{
        width: 120px;
      }
     }
</style>
