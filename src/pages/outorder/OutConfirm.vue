<template lang="html">
  <div class="outConfirm">
    <Form ref="formFilter" :model="formFilter" :label-width="84" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <tr>
        <td>
          <div class="" style="position:relative">
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库通知单号</span>
              <span class="inputBox">
                <Input v-model="formFilter.outcomingNotice" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库单号</span>
              <span class="inputBox">
                <Input v-model="formFilter.outOrderId" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;运&nbsp;输&nbsp;方&nbsp;式&nbsp;</span>
              <span class="inputBox">
                <Input v-model="formFilter.transportMode" placeholder="请输入" clearable  class="textInput" />
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;&nbsp;&nbsp;单&nbsp;据&nbsp;来&nbsp;源&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Select v-model="formFilter.orderSource"  clearable @on-clear="customeridClear">
                  <Option value="SAP" >SAP</Option>
                  <Option value="WMS" >WMS</Option>
                </Select>
              </span>
            </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;&nbsp;&nbsp;移&nbsp;动&nbsp;类&nbsp;型&nbsp;&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Select v-model="formFilter.movetype"  clearable @on-clear="customeridClear">
                    <Option v-for="(option, index) in moveTypeList" :value="option.id" :key="index">{{option.name}}</Option>
                </Select>
              </span>
            </span>

            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库单状态 </span>
              <span class="inputBox" >
                <Select v-model="formFilter.outStatus"    clearable @on-clear="customeridClear">
                    <!-- <Option v-for="(option, index) in customerOptions" :value="option.id" :key="index">{{option.name}}</Option> -->
                    <Option value="CK01">申请</Option>
                    <Option value="CK02">接收</Option>
                    <Option value="CK03">出库中</Option>
                    <Option value="CK04">出库完成</Option>
                    <!-- <Option value="CK01">未出库</Option> -->
                </Select>
              </span>
            </span>
            </span>

            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;内部订单号&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Input v-model="formFilter.orderbillnum" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>

            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">到站地点</span>
              <span class="inputBox">
                <Input v-model="formFilter.receivePlace" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>

            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;收&nbsp;货&nbsp;单&nbsp;位&nbsp;</span>
              <span class="inputBox">
                <Input v-model="formFilter.receiver" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>


            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">供&nbsp;应&nbsp;商&nbsp;</span>
              <span class="inputBox">
                <Select v-model="formFilter.supplierId"  clearable @on-clear="customeridClear">
                    <Option v-for="(option, index) in supplierList" :value="option.id" :key="index">{{option.name}}</Option>
                </Select>
                <Input v-model="formFilter.movetype" placeholder="请输入"  class="textInput" />
              </span>
            </span> -->
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;预计出库日期&nbsp;</span>
              <span style="top:20px;">
                <DatePicker v-model="formFilter.startDateOut" @on-change="startDateChangedOut" type="date" style="position:absolute;bottom:18px;right:690px" placeholder="请选择" class="dateInput" ></DatePicker>
                <span style="position:absolute;bottom:3px;right:683px">-</span>
                <DatePicker v-model="formFilter.endDateOut" @on-change="endDateChangedOut" type="date" style="position:absolute;bottom:18px;right:560px" placeholder="请选择" class="dateInput" ></DatePicker>
                <!-- <Form-item label="预计出库日期"> -->
<!-- <Input v-model="formFilter.movetype" placeholder="请输入"  class="textInput" /> -->
                <!-- <DatePicker v-model="formFilter.startDateOut" @on-change="startDateChangedOut" type="date" placeholder="请选择" style="height: 28px;"></DatePicker> -->
                <!-- - -->
                <!-- <DatePicker v-model="formFilter.endDateOut" @on-change="endDateChangedOut" type="date" placeholder="请选择" style="height: 28px;"></DatePicker> -->
              <!-- </Form-item > -->
              </span>
            </span>

          <div class="" style="position:absolute;bottom:7px;right:50px">
            <Button shape="circle" @click="temporarilySave"  type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >暂存入库</Button>
            <Button shape="circle" @click="completeOutOrder"  type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >出库完成</Button>


            <Button type="primary" id="queryOutOrder" shape="circle" v-show="false" @click="query">查询</Button>

        </div>

      </div>


        </td>
      </tr>
      <tr>
        <td align="right">

        </td>
      </tr>



    </Form>
    <table height="10px">

    </table>
    <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-row-dblclick="showDetail"></Table>

    <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
    <br />
    <div class="outConfirmPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>

    <!-- <ul id="vfor">
    	<template v-for="(a,b,c) in names">
    		<li>{{c}}</li>
    	</template>
    </ul> -->
    <LabelInfoRecord ref='LabelInfoRecord'></LabelInfoRecord>
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import FileSaver from 'file-saver'
import iview from 'view-design'
import XLSX from 'xlsx'
import LabelInfoRecord from '@/components/LabelInfoRecord'
export default {
  components: {
LabelInfoRecord
   },
  data () {
    return {

      total:0,
      stockList:[],
      moveTypeList:[],
      supplierList:[],
      outLock:false,
      hasSelected:'false',
    loading:false,
     model14: [],
     loading2: false,
     options2: [],
     list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut'],

      formFilter: {
        curPage:1,
        pageSize:20,
        startDateInStr:'',
        endDateInStr:'',
        startDateOutStr:'',
        endDateOutStr:'',
        startDateDueStr:'',
        endDateDueStr:'',
        loginStatus:`${sessionStorage.loginStatus}`,
      },

      definePageSize:10,
      tableColumns: {
        data:[
          {
            keyid:'',
            districtid:'',
            storageid:'',
            itemcode:'',
            itemname:'',
            inquantity:'',
            outquantity:'',
            unquantity:'',
            canquantity:'',
            invUomCode:'',
            customerid:'',
            batchno:'',
            productiondate:'',
            expirationdate:'',
            putindate:'',
            type:'',
          }
        ],
         card: [
                  {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center',fixed: 'left'},
                  {title: '序号',key: 'rowid',width: 80,align: 'center'},
                  {title: '出库单号', key: 'outOrderId',width:200,align: 'center'},
                  {title: '移动类型', key: 'movetypeTxt',width:120,align: 'center'},
                  {title: '紧急出库', key: 'standby4',width:150,align: 'center',
                    render: (h, params) => {
                        if(params.row.standby4 == '0'){
                          return h('span','否')
                        }else if(params.row.standby4 == '1'){
                          return h('span','是')
                        }else{
                          return h('span','')
                        }
                      }
                     },
                  {title: '预计出库日期', key: 'predictOutDate',width:150, align: 'center' },
                  {title: '预计总出库数量', key: 'quantity',width:150,align: 'center'},
                  // {title: '预计总出库件数', key: 'pieces',width:150,align: 'center'},
                  // {title: '单位件数X出库件量', key: 'standby3',width:150,align: 'center'},
                  // {title: '零散数量', key: 'standby4',width:150,align: 'center'},
                  // {title: '相关单据号',key: 'storageid', width:200,align: 'center'},
                  {title: '单据来源', key: 'orderSource',width:90,align: 'center'},
                  // {title: '移动类型', key: 'movetypeTxt',width:120,align: 'center'},
                  {title: '出库单状态', key: 'outStatus',width:120,align: 'center',
                    render: (h, params) => {
                        if(params.row.outStatus == 'CK01'){
                          return h('span','申请')
                        }else if(params.row.outStatus == 'CK02'){
                          return h('span','接收')
                        }else if(params.row.outStatus == 'CK03'){
                          return h('span','出库中')
                        }else if(params.row.outStatus == 'CK04'){
                          return h('span','出库完成')
                        }else{
                          return h('span','')
                        }
                      }
                  },
                  // {title: '预定出库日期', key: 'predictOutDate',width:150, align: 'center' },
                  // {title: '实际出库日期', key: 'outDate',width:150, align: 'center' },
                  // {title: '出库数量', key: 'quantity',width:120,align: 'center'},
                  // {title: '件数', key: 'pieces',width:120,align: 'center'},
                  {title: '运输方式', key: 'transportMode',width:120,align: 'center'},
                  {title: '到站地点', key: 'receivePlace',width:120,align: 'center'},
                  {title: '接收部门', key: 'trayno',width:120,align: 'center'},
                  {title: '收货单位', key: 'receiver',width:120,align: 'center'},
                  {title: '接收工厂',key: 'outquantity',width:120,align: 'center'},
                  // {title: '接收库存地点', key: 'itemcode',width:120,align: 'center'},
                  // {title: '客户', key: 'customerName',width:120,align: 'center'},
                  {title: '成本中心', key: 'costcenterTxt',width:120,align: 'center'},
                  {title: '出库通知单号',key: 'outcomingNotice',width:200, align: 'center'},
                  {title: '内部订单号', key: 'orderbillnum',width:200,align: 'center'},

                  // {title: '发货标识',key: 'inquantity',width:120,align: 'center'},

         ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    this.queryOutConfirmData()
    this.queryOutSelectList()
    // this.getStockBasic()
  },
  updated(){

  },
  computed:{

  },
  methods:{
    testtest(){

    },
    addNotice(){//新增出库通知
      // this.$refs.addOutNotice.show();
    },
    showDetail(row){
      if(row.standby4 == '0'){

      }
      if(row.standby4 == '1'){
        this.$refs.LabelInfoRecord.show(row);
      }

    },
    query(){
      this.queryOutConfirmData()
    },
    queryOutConfirmData(){//查询数据
      axios.post(sessionStorage.http+'/outOrder/queryOutConfirmData?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.tableColumns.data = res.data.resultData
        this.total = res.data.total
        // this.trimPageData()
        //this.recordQueryCondition()
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },
    queryOutSelectList(){
      axios.post(sessionStorage.http+'/outOrder/queryOutSelectList?loginStatus='+`${sessionStorage.loginStatus}`,'')
      .then((res) =>{
        // this.customerList = res.data.customer
        this.moveTypeList = res.data.moveType
        this.supplierList = res.data.supplier
      })
    },

    completeOutOrder(){//出库完成
      let choosenOrder = []
      for(var i = 0; i < this.tableColumns.data.length; i++ ){
        let allotConfirm = this.tableColumns.data[i]
        // console.log(this.tableColumns.data[i])
        // console.log(allotConfirm)
        if(allotConfirm._checked && allotConfirm.outStatus == 'CK03'){
          choosenOrder.push(this.tableColumns.data[i])
        }
      }
     //  if(choosenOrder.length > 1){
     //   this.$Message.error("一次只可选择一条任务确认拣选")
     // }else
     if (choosenOrder.length == 0) {
       this.$Message.error("请选择可完成的任务")
     }else {
       if (!this.outLock) {
         this.outLock = true
         axios.post(sessionStorage.http+'/outOrder/completeOutOrder?loginStatus='+`${sessionStorage.loginStatus}`,choosenOrder)
         .then((res) =>{
            this.outLock = false
           if(res.data == true){
             this.$Message.success(res.message)
             this.queryOutConfirmData()
           }else {
             this.$Message.error(res.message)
           }

         }).catch((err) => {
            this.outLock = false
         })
       }
     }
   },
   temporarilySave(){//暂存
     let choosenOrder = []
     for(var i = 0; i < this.tableColumns.data.length; i++ ){
       let allotConfirm = this.tableColumns.data[i]
       if(allotConfirm._checked && allotConfirm.outStatus == 'CK04' && allotConfirm.movetype == 'CMT03'){
         choosenOrder.push(this.tableColumns.data[i])
       }
     }
     // console.log(this.tableColumns.data);
     // console.log(choosenOrder)
    //  if(choosenOrder.length > 1){
    //   this.$Message.error("一次只可选择一条任务确认拣选")
    // }else
    if (choosenOrder.length == 0) {
      this.$Message.error("请选择可暂存的任务")
    }else {
      if (!this.outLock) {
        this.outLock = true
        axios.post(sessionStorage.http+'/outOrder/temporarilySave?loginStatus='+`${sessionStorage.loginStatus}`,choosenOrder)
        .then((res) =>{
           this.outLock = false
          if(res.data == true){
            this.$Message.success(res.message)
            this.queryOutConfirmData()
          }else {
            this.$Message.error(res.message)
          }

        }).catch((err) => {
           this.outLock = false
        })
      }
    }
   },

   onSelect(selection,row){
     console.log(row.rowid - (this.formFilter.curPage - 1) * this.formFilter.pageSize)
     console.log(selection)
     console.log(row)
     this.tableColumns.data[(row.rowid - (this.formFilter.curPage - 1) * this.formFilter.pageSize) - 1]._checked = true
     this.hasSelected = 'true'
   },
   onSelectCancel(selection,row){
     this.tableColumns.data[(row.rowid - (this.formFilter.curPage - 1) * this.formFilter.pageSize) - 1]._checked = false
     this.getHasSelected()
   },
   onSelectAll(selection){
     for(var i = 0;i < this.tableColumns.data.length;i++){
       this.tableColumns.data[i]._checked = true
     }
     // for(var i = 0;i<selection.length;i++){
     //   this.tableColumns.data[selection[i].rowid-1]._checked = true
     // }
     this.hasSelected = 'true'
   },
   onSelectAllCancel(selection){
     for(var i = 0;i < this.tableColumns.data.length;i++){
       this.tableColumns.data[i]._checked = false
     }
     this.hasSelected = 'false'
   },
   onSelectionChange (rows) {//将选中的行记录下来

     // if(rows.length > 0){
     //   this.hasSelected = 'true'
     // }else {
     //   this.hasSelected = 'false'
     // }
     // if(rows.length == this.formFilter.pageSize){
     //   this.allChoosen = true
     // }else {
     //   this.allChoosen = false
     // }
      // this.detailRows = rows
    },
    getHasSelected(){
      this.hasSelected = 'false'
      for(var i = 0; i < this.tableColumns.data.length; i++ ){
        if(this.tableColumns.data[i]._checked){
          this.hasSelected = 'true'
          break
        }
      }
      if(this.hasSelected == 'false'){
        this.allChoosen = false
      }
    },

    //分割标记
    getStockBasic(){//查询基本数据的id和nameMap
      axios.post(sessionStorage.http+'/getStockBasic?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        //标记
        this.customerOptions = res.data.customer
        this.airlineOptions = res.data.airline
        this.freightStationOptions = res.data.freightStation
        this.productTypeOptions = res.data.productType
        let option = {name:'-所有-',id:'',}
        this.customerOptions.splice(0,0,option)
        this.airlineOptions.splice(0,0,option)
        this.freightStationOptions.splice(0,0,option)
        this.productTypeOptions.splice(0,0,option)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },
    clearData(){
      this.formFilter.districtId = undefined
      this.queryOutConfirmData()
    },
    districtIdClear(){
      this.formFilter.districtId = undefined
      this.queryOutConfirmData()
    },
    storageIdClear(){
      this.formFilter.storaeId = undefined
      this.queryOutConfirmData()
    },
    traynoClear(){
      this.formFilter.trayno = undefined
      this.queryOutConfirmData()
    },
    customeridClear(){
      this.formFilter.customerid = undefined
      this.queryOutConfirmData()
    },
    goodsIdClear(){
      this.formFilter.goodsId = undefined
      this.queryOutConfirmData()
    },
    goodsNameClear(){
      this.formFilter.goodgoodsName = undefined
      this.queryOutConfirmData()
    },
    recordQueryCondition(){
      this.districtId = this.formFilter.districtId
      this.storaeId = this.formFilter.storaeId
      this.trayno = this.formFilter.trayno
      this.goodsId = this.formFilter.goodsId
      this.goodgoodsName = this.formFilter.goodgoodsName
      this.batchno = this.formFilter.batchno
      this.customerid = this.formFilter.customerid
      this.startDateOutStr = this.formFilter.startDateOutStr
      this.endDateOutStr = this.formFilter.endDateOutStr
      this.startdstartDateDueStr = this.formFilter.startdstartDateDueStr
      this.endDateDueStr = this.formFilter.endDateDueStr
      this.startDateInStr = this.formFilter.startDateInStr
      this.endDateInStr = this.formFilter.endDateInStr
    },
    exportData(){
      //let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&districtId="+this.districtId+"&storaeId="+this.storaeId+"&trayno="+this.trayno+"&goodsId="+this.goodsId+"&goodgoodsName="+this.goodgoodsName+"&batchno="+this.batchno+"&customerid="+this.customerid+"&startDateOutStr="+this.startDateOutStr+"&endDateOutStr="+this.endDateOutStr+"&startdstartDateDueStr="+this.startdstartDateDueStr+"&endDateDueStr="+this.endDateDueStr+"&startDateInStr="+this.startDateInStr+"&endDateInStr="+this.endDateInStr
      window.open(sessionStorage.http+"/exportStockSDetail")

    },


    trimPageData(){
      var startIndex = (this.formFilter.curPage - 1) * this.formFilter.pageSize
      var endIndex = startIndex + this.formFilter.pageSize
      this.tableColumns.data = []
      for (var i = startIndex; i < this.stockList.length && i <endIndex; i++) {
        this.tableColumns.data.push(this.stockList[i])
      }
    },

    queryPageData(){//查询数据
      axios.post(sessionStorage.http+'/getStockStoragePage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res.data)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },
    formartDate(date){//日期格式化

      let  Y = date.getFullYear() +''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
      console.log(date.getDate())
      console.log(D)
      // console.log(Y + M + D)
      return Y +'-'+ M +'-' + D
    },
    flightDateChange(){//航班日期改变
      if(this.formFilter.flightDate != ''){
        this.formFilter.flightDateStr = this.formartDate(this.formFilter.flightDate)
      }else {
        this.formFilter.flightDateStr = undefined
      }
    },
    startDateChangedOut(){//出库日期起始日期改变
      if(this.formFilter.startDateOut != ''){
        this.formFilter.startDateOutStr = this.formartDate(this.formFilter.startDateOut)
      }else {
        this.formFilter.startDateOutStr = undefined
      }
      if(this.formFilter.startDateOut != '' && this.formFilter.endDateOut != ''){
        if(this.formartDate(this.formFilter.startDateOut) > this.formartDate(this.formFilter.endDateOut)){
          this.$Message.error("起始日期不能大于结束日期")
                this.formFilter.startDateOut = undefined
                this.formFilter.startDateOutStr = undefined
        }
      }
      if(this.formFilter.startDateOutStr != null && this.formFilter.startDateOutStr != undefined){
        this.queryOutConfirmData()
      }
    },
    endDateChangedOut(){//出库日期结束日期改变
      if(this.formFilter.startDateOut != '' && this.formFilter.endDateOut != ''){
        if(this.formartDate(this.formFilter.startDateOut) > this.formartDate(this.formFilter.endDateOut)){
          this.$Message.error("结束日期不能小于起始日期")
               this.formFilter.endDateOut = ''
               this.formFilter.endDateOutStr = undefined
        }
      }
      if(this.formFilter.endDateOut != ''){
        // this.formFilter.endDateOut.setDate(this.formFilter.endDateOut.getDate()+1)
        this.formFilter.endDateOutStr = this.formartDate(this.formFilter.endDateOut)
      }else {
        this.formFilter.endDateOutStr = undefined
      }
      if(this.formFilter.endDateOutStr != null && this.formFilter.endDateOutStr != undefined){
        this.queryOutConfirmData()
      }
    },
    startDateChangedIn(){//入库日期起始期改变
      if(this.formFilter.startDateIn != ''){
        this.formFilter.startDateInStr = this.formartDate(this.formFilter.startDateIn)
      }else {
        this.formFilter.startDateInStr = undefined
      }
      if(this.formFilter.startDateIn != '' && this.formFilter.endDateIn != ''){
        if(this.formartDate(this.formFilter.startDateIn) > this.formartDate(this.formFilter.endDateIn)){
          console.log(this.formFilter.startDateIn)
          this.$Message.error("起始日期不能大于结束日期")
                this.formFilter.startDateIn = undefined
                this.formFilter.startDateInStr = undefined
        }
      }
      if(this.formFilter.startDateInStr != null && this.formFilter.startDateInStr != undefined){
        this.queryOutConfirmData()
      }
    },
    endDateChangedIn(){//入库日期结束期改变
      if(this.formFilter.endDateIn != ''){
        this.formFilter.endDateInStr = this.formartDate(this.formFilter.endDateIn)
      }else {
        this.formFilter.endDateInStr = undefined
      }
      if(this.formFilter.startDateIn != '' && this.formFilter.endDateIn != ''){
        if(this.formartDate(this.formFilter.startDateIn) > this.formartDate(this.formFilter.endDateIn)){
          console.log(this.formFilter.endDateIn)
          this.$Message.error("结束日期不能小于起始日期")
               this.formFilter.endDateIn = undefined
               this.formFilter.endDateInStr = undefined
        }
      }
      if(this.formFilter.endDateInStr != null && this.formFilter.endDateInStr != undefined){
        this.queryOutConfirmData()
      }
    },
    changeToIdNameOptions(origin,target){//将id-name对象数组转为id-name选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].name,value:origin[i].id}
        target.push(option)
      }
    },

    changeToIdOptions(origin,target){//将id-name对象数组转为id-id选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].id,value:origin[i].id}
        target.push(option)
      }
    },
    changeToNameOptions(origin,target){//将id-name对象数组转为name-name选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].name,value:origin[i].name}
        target.push(option)
      }
    },

    //库区
    getDistrict (query) {
        if (query !== '') {
            this.districtLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.districtLoading = false;
               this.districtOptions = this.districtAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.districtOptions = this.districtAllOptions;
        }
    },

    changeDistrict(query){
      if(query != true && query != false){
        this.districtTransition = query//将筛选条件用过渡对象记录
      }
    },
    getAllDistrict(){
      axios.get(sessionStorage.http+'/getAllDistrictIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.districtList = res.data
        this.changeToIdNameOptions(this.districtList,this.districtAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    districtOpenClose(open){
      if(open){
        if(this.formFilter.districtId == ' '){
          this.formFilter.districtId = undefined
        }
        this.districtOptions = this.districtAllOptions
      }else{
        console.log(this.formFilter.districtId)
        let contain = false//默认下拉框选择项不包含筛选条件
        for (var i = 0; i < this.districtOptions.length; i++) {
            let option = this.districtOptions[i]
            if(option.name == this.districtTransition){//下拉框选择项包含筛选条件
              this.formFilter.districtId = option.id
              contain = true
            }
         }
         if(!contain && this.districtTransition != ''){
           this.districtOptions = []
           let option = {label:"",value:' '}
           this.districtOptions.push(option)
           this.formFilter.districtId = option.id
         }
      }
      console.log(this.formFilter.districtId)
    },

    //货位号
    getStorage (query) {
        if (query !== '') {
            this.storageLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.storageLoading = false;
               this.storageOptions = this.storageAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.storageOptions = this.storageAllOptions;
        }
    },

    changeStorage(query){
      if(query != true && query != false){
        this.storageTransition = query
      }
    },

    getAllStorage(){
      axios.get(sessionStorage.http+'/getAllStorageIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.storageList = res.data
        this.changeToIdOptions(this.storageList,this.storageAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },


    storageOpenClose(open){
      if(open){
        if(this.formFilter.storageId == ' '){
          this.formFilter.storageId = undefined
        }
        this.storageOptions = this.storageAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.storageOptions.length; i++) {
            let option = this.storageOptions[i]
            if(option.name == this.storageTransition){
              this.formFilter.storageId = option.id
              contain = true
            }
         }
         if(!contain && this.storageTransition != ''){
           this.storageOptions = []
           let option = {label:"",value:' '}
           this.storageOptions.push(option)
           this.formFilter.storageId = option.id
         }
      }
    },

    //托盘
    gettrayno (query) {
        if (query !== '') {
            this.traynoLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.traynoLoading = false;
               this.traynoOptions = this.traynoAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.traynoOptions = this.traynoAllOptions;
        }
    },

    changetrayno(query){
      if(query != true && query != false){
        this.traynoTransition = query
      }
    },

    getAlltrayno(){
      axios.get(sessionStorage.http+'/getAllTrayIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.traynoList = res.data
        this.changeToIdOptions(this.traynoList,this.traynoAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    ttraynoOpenClose(open){
      if(open){
        if(this.formFilter.trayno == ' '){
          this.formFilter.trayno = undefined
        }
        this.traynoOptions = this.traynoAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.traynoOptions.length; i++) {
            let option = this.traynoOptions[i]
            if(option.name == this.traynoTransition){
              this.formFilter.storageId = option.id
              contain = true
            }
         }
         if(!contain && this.traynoTransition != ''){
           this.traynoOptions = []
           let option = {label:"",value:' '}
           this.traynoOptions.push(option)
           this.formFilter.trayno = option.id
         }
      }
    },

    //商品编号
    getGoodsId (query) {
        if (query !== '') {
            this.goodsIdLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.goodsIdLoading = false;
               this.goodsIdOptions = this.goodsIdAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.goodsIdOptions = this.goodsIdAllOptions;
        }
    },

    changeGoodId(query){
      if(query != true && query != false){
        this.goodsIdTransition = query
      }
    },

    getAllGoods(){
      axios.get(sessionStorage.http+'/getAllgoodsIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.goodsList = res.data
        this.changeToIdOptions(this.goodsList,this.goodsIdAllOptions)
        this.changeToNameOptions(this.goodsList,this.goodsNameAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },


    goodsIdOpenClose(open){
      if(open){
        if(this.formFilter.goodsId == ' '){
          this.formFilter.goodsId = undefined
        }
        this.goodsIdOptions = this.goodsIdAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.goodsIdOptions.length; i++) {
            let option = this.goodsIdOptions[i]
            if(option.name == this.goodsIdTransition){
              this.formFilter.goodsId = option.id
              contain = true
            }
         }
         if(!contain && this.goodsIdTransition != ''){
           this.goodsIdOptions = []
           let option = {label:"",value:' '}
           this.goodsIdOptions.push(option)
           this.formFilter.goodsId = option.id
         }
      }
    },

    //商品名称
    getGoodsName (query) {
        if (query !== '') {
            this.goodsNameLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.goodsNameLoading = false;
               this.goodsNameOptions = this.goodsNameAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.goodsNameOptions = this.goodsNameAllOptions;
        }
    },

    changeGoodName(query){
      if(query != true && query != false){
        this.goodsNameTransition = query
      }
    },

    goodsNameOpenClose(open){
      if(open){
        if(this.formFilter.goodsName == ' '){
          this.formFilter.goodsName = undefined
        }
        this.goodsNameOptions = this.goodsNameAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.goodsNameOptions.length; i++) {
            let option = this.goodsNameOptions[i]
            if(option.name == this.goodsNameTransition){
              this.formFilter.goodsName = option.id
              contain = true
            }
         }
         if(!contain && this.goodsNameTransition != ''){
           this.goodsNameOptions = []
           let option = {label:"",value:' '}
           this.goodsNameOptions.push(option)
           this.formFilter.goodsName = option.id
         }
      }
    },

    //客户
    getAllCustomer(){
      axios.get(sessionStorage.http+'/getAllCustomerIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.customerList = res.data
        this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },



    handleChangePage (value) {
     this.formFilter.curPage = value
     this.trimPageData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      // const paths = this.$route.path.split('/')
    },

    handleSubmit () {
       // const paths = this.$route.path.split("/")
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
        this.queryOutConfirmData();
      }
    }
  }
}
</script>
<style lang="less">
.outConfirm{
  th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-table-overflow {
      overflow-y: inherit;
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
      // bottom: 3px;
    }
    .ivu-select-selection{
      border:1px solid #888888;
      bottom:7px !important;
    }
    .ivu-input-icon-normal + .ivu-input{
      bottom:7px !important;
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
        bottom: -4px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
   .outConfirmPage{
     .ivu-select-selection{
        bottom: 6px;
      }
   }
}
.changeDate{
  .ivu-input-icon-normal + .ivu-input{
    width: 160px;
  }
  .ivu-input-icon{
       position: absolute;
       right:-35px;
       bottom: -4px;
   }
}

</style>

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
.textInput{
  width: 160px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
.textOutput{
  width: 40px;
  display: inline-block;
}
// .dateInput{
//   width: 120px;
//   height: 28px;
//   color: #333333;
// }
.clear{clear:both;}
.outBox{
  display: inline-block;
  line-height: 50px;
  // width: 240px;
}
.inputBox{
  line-height: 40px;
  height: 40px;
}
.blank{
  display: inline-block;
  width: 15px;
}
.redLabel{
  color: red;
  text-align: right;
  color: #fe3838;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.blackLabel{
  display: inline-block;
  text-align: right;
  font-family: Microsoft YaHei;
  font-size: 12px;
  color: #5aa5ff;
}
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
