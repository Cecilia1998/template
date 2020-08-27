<template lang="html">
  <div class="outSchedule">
    <Form ref="formFilter" :model="formFilter" :label-width="84" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <tr>
        <td>
          <div class="" style="position:relative">
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库通知单号</span>
              <span class="inputBox">
                <Input v-model="formFilter.outOrderDetailId" placeholder="请输入" clearable class="textInput" />
              </span>
            </span> -->
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库单号&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Input v-model="formFilter.outOrderId" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库类型</span>
              <span class="inputBox">
                <!-- <Input v-model="formFilter.orderType" placeholder="请输入" clearable class="textInput" /> -->

                  <Select v-model="formFilter.orderType"  clearable>
                      <!-- <Option v-for="(option, index) in customerOptions" :value="option.id" :key="index">{{option.name}}</Option> -->
                      <Option value="CKT05">一般出库</Option>
                      <Option value="CKT04">拼盘出库</Option>
                      <!-- <Option value="CK01">未出库</Option> -->
                  </Select>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">客户</span>
              <span class="inputBox">
                <Input v-model="formFilter.customerId" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">移动类型&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Select v-model="formFilter.movetype"  clearable @on-clear="customeridClear" filterable remote  :loading="customerLoading" >
                    <Option v-for="(option, index) in moveTypeList" :value="option.id" :key="index">{{option.name}}</Option>
                </Select>
              </span>
            </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">物料/产品号</span>
              <span class="inputBox">
                <Input v-model="formFilter.materialNo" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">物料/产品描述</span>
              <span class="inputBox">
                <Input v-model="formFilter.materialDesc" placeholder="请输入" clearable class="textInput" />
              </span>
            </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;库&nbsp;存&nbsp;批&nbsp;号&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Input v-model="formFilter.stockBatch" placeholder="请输入" clearable class="textInput" />
              </span>
            </span> -->


            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">&nbsp;检&nbsp;验&nbsp;批&nbsp;号&nbsp;&nbsp;</span>
              <span class="inputBox">
                <Input v-model="formFilter.checkBatch" placeholder="请输入" clearable class="textInput" />
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">质量状态 <span class="inputBox">
                <Select v-model="formFilter.qualityStatus"  clearable @on-clear="customeridClear" filterable remote  >
                  <Option value="" >-所有-</Option>
                  <Option value="Q" >待检</Option>
                  <Option value="N" >非限制</Option>
                  <Option value="F" >冻结</Option>
                </Select>
              </span>
            </span>
            </span> -->
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库状态 &nbsp;&nbsp;</span>
              <span class="inputBox">
                <Select v-model="formFilter.status"  clearable @on-clear="customeridClear">
                    <!-- <Option v-for="(option, index) in customerOptions" :value="option.id" :key="index">{{option.name}}</Option> -->
                    <Option value="0">申请</Option>
                    <Option value="1">接收</Option>
                    <Option value="2">出库中</Option>
                    <Option value="3">出库完成</Option>
                    <!-- <Option value="CK01">未出库</Option> -->
                </Select>
              </span>
            </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <!-- <span class="blackLabel">单据来源 &nbsp;&nbsp;</span>
              <span class="inputBox">
                <Select v-model="formFilter.orderSource"  clearable @on-clear="customeridClear" filterable remote>
                  <Option value="" >-所有-</Option>
                  <Option value="SAP" >SAP</Option>
                  <Option value="WMS" >WMS</Option>
                </Select>
              </span> -->
            </span>
            </span>
            <span class="outBox">
              <span class="blank" >&nbsp;</span>
                <Form-item label="出库日期">

                <DatePicker :options="options2" v-model="formFilter.startDateOut" @on-change="getStartDateOut" format="yyyy-MM-dd" type="date" placeholder="请选择" ></DatePicker>
                -
                <DatePicker :options="options1" v-model="formFilter.endDateOut" @on-change="getEndDateOut" format="yyyy-MM-dd" type="date" placeholder="请选择" ></DatePicker>
              </Form-item >
              <!-- </span> -->
            </span>

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">领料开关状态<span class="inputBox">
                <Select v-model="formFilter.standby2"  clearable @on-clear="customeridClear" filterable remote>
                  <Option value="" >-所有-</Option>
                  <Option value="0" >开启</Option>
                  <Option value="1" >关闭</Option>
                </Select>
              </span>
            </span>
            </span> -->

          <div class="" style="position:absolute;bottom:15px;right:50px">


        </div>

      </div>


        </td>
      </tr>
      <tr>
        <td align="right">
          <!-- <Button shape="circle" @click="completeOutPlan"  type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >强制完成</Button>
          <Button shape="circle" @click="completeOutPlan"  type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >取消强制完成</Button> -->

          <Button type="primary" id="queryOutOrder" shape="circle" v-show="false" @click="queryOutSchedule">查询</Button>
        </td>
      </tr>



    </Form>
    <table height="10px">

    </table>
    <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" @on-row-dblclick="showDetail"></Table>

    <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
    <br />
    <div class="outSchedulePage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>

    <!-- <ul id="vfor">
    	<template v-for="(a,b,c) in names">
    		<li>{{c}}</li>
    	</template>
    </ul> -->
    <!-- <addOutNotice ref='addOutNotice'></addOutNotice> -->
    <!-- <outNoticeDetail ref='outNoticeDetail'></outNoticeDetail> -->
    <outDetail ref='outDetail'></outDetail>

  </div>
</template>
  </div>
</template>

<script>
// import addOutNotice from '@/pages/outOrder/AddOutNotice'
import outDetail from '@/pages/outorder/OutDetail'
// import outNoticeDetail from '@/pages/outOrder/OutNoticeDetail'
import axios from 'axios'
import router from '../../router'
import FileSaver from 'file-saver'
import iview from 'view-design'
import XLSX from 'xlsx'

export default {
  components: {
    // addOutNotice,
    // outNoticeDetail,
    outDetail
   },
  data () {
    return {

      total:0,
      stockList:[],
      moveTypeList:[],
      supplierList:[],
customerLoading:false,
    loading:false,

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

                  {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
                  {title: '序号',key: 'rowid',width: 80,align: 'center'},
                  {title: '出库单号',key: 'outOrderId',width:220, align: 'center'},
                {title: '出库类型',key: 'orderType',width:200, align: 'center', render:(h,params)=>{
                    let islabel = params.row.orderType;
                    if(params.row.orderType == 'CKT05'){
                      return h('span','一般出库')
                    }else if(params.row.orderType == 'CKT04'){
                      return h('span','拼盘出库')
                    }
                    return h('div',islabel);
                  }},
                  // {title: '出库库区',key: '',width:200, align: 'center'},
                  {title: '出库日期', key: 'outDate',width:150, align: 'center' },
                  {title: '出库总件数', key: 'num',width:150,align: 'center'},
                    {title: '出库总重量', key: 'quantity',width:150,align: 'center'},
                  // {title: '货位号', key: '',width:240,align: 'center'},

                  {title: '客户', key: 'customerId',width:150,align: 'center'},
                  {title: '出库单状态', key: 'status',width:120,align: 'center',
                    render: (h, params) => {
                      if(params.row.status == '0'){
                        return h('span','申请')
                      }else if(params.row.status == '1'){
                        return h('span','接收')
                      }else if(params.row.status == '2'){
                        return h('span','出库中')
                      }else if(params.row.status == '3'){
                        return h('span','出库完成')
                      }else{
                        return h('span','未定义')
                      }

                     }
                  },
                  // {title: '实际出库日期', key: 'outDate',width:150, align: 'center' },
                  // {title: '件数', key: 'pieces',width:120,align: 'center'},


         ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    this.queryOutSchedule()
    // this.queryOutSelectList()
  },
  updated(){

  },
  computed:{

  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        // console.log(this.formFilter)
        // this.formFilter.curPage = 1
        this.queryOutSchedule();
      }
    }
  },
  methods:{
    testtest(){

    },
    // queryOutSelectList(){
    //   axios.post(sessionStorage.http+'/outOrder/queryOutSelectList?loginStatus='+`${sessionStorage.loginStatus}`,'')
    //   .then((res) =>{
    //     this.moveTypeList = res.data.moveType
    //     this.supplierList = res.data.supplier
    //   })
    // },
    queryOutSchedule(){//查询出库进度
      axios.post(sessionStorage.http+'/queryOutOrderData?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res.data);
        this.tableColumns.data = res.data.resultData
        this.total = res.data.total
          // this.formFilter.curPage = res.data.curPage
      })
      .catch((err) => {

      })
    },
    addNotice(){//新增出库通知
      this.$refs.addOutNotice.show();
    },
    showDetail(row){
      // this.$refs.outNoticeDetail.show();
      this.$refs.outDetail.show(row);
    },




    //分割标记


    clearData(){
      this.formFilter.districtId = undefined
      this.queryData()
    },
    districtIdClear(){
      this.formFilter.districtId = undefined
      this.queryData()
    },
    storageIdClear(){
      this.formFilter.storaeId = undefined
      this.queryData()
    },
    traynoClear(){
      this.formFilter.trayno = undefined
      this.queryData()
    },
    customeridClear(){
      this.formFilter.customerid = undefined
      this.queryData()
    },
    goodsIdClear(){
      this.formFilter.goodsId = undefined
      this.queryData()
    },
    goodsNameClear(){
      this.formFilter.goodgoodsName = undefined
      this.queryData()
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

    queryData(){//查询数据
      axios.post(sessionStorage.http+'/getoutNotice?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.stockList = res.data.resultData
        this.total = res.data.total
        this.formFilter.curPage = res.data.curPage
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
        this.queryOutSchedule()
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
        this.queryOutSchedule()
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
        this.queryOutSchedule()
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
        this.queryOutSchedule()
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



    handleChangePage (value) {
     this.formFilter.curPage = value
     this.queryOutSchedule();
     // this.trimPageData()
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
     },


    //next -xuj
    //关于datepicker的方法
    getStartDateOut(startDateOut) {

      this.options1 = {
        disabledDate(date) {
          return date.valueOf() < new Date(startDateOut) - 86400000;
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.startDateOut = startDateOut;

    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
     getEndDateOut(endDateOut) {

      this.options2 = {
        disabledDate(date) {
          return date.valueOf() > new Date(endDateOut);
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.endDateOut = endDateOut;
     },
  },

}
</script>
<style lang="less">
.outSchedule{
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
   .outSchedulePage{
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
