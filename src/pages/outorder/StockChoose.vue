<template lang="html">
  <div class="stockChoose">
    <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <tr>
        <td>
          <div class="" style="position:relative">
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库单号</span>
              <span class="inputBox">
                <Input v-model="formFilter.outOrderId" placeholder="请输入" clearable class="textInput" />
              </span>
            </span>
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">明细单号</span>
              <span class="inputBox">
                <Input v-model="formFilter.outOrderDetailId" placeholder="请输入" clearable class="textInput" />
              </span>
            </span> -->
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">物料号</span>
            <span class="inputBox">
              <Input v-model="formFilter.materielId" placeholder="请输入" clearable class="textInput" />
            </span>
          </span>
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">物料名称</span>
            <span class="inputBox">
              <Input v-model="formFilter.materielName" placeholder="请输入" clearable class="textInput" />
            </span>
          </span>
          <!-- <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">是否贴标 <span class="inputBox">
              <Select v-model="formFilter.navDiv"  clearable @on-clear="customeridClear" filterable remote  :loading="customerLoading"  @on-query-change="changeCustomer">
                  <Option v-for="(option, index) in airlineOptions" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
            </span>
          </span>
          </span> -->
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">批次号</span>
            <span class="inputBox">
              <Input v-model="formFilter.batchNo" placeholder="请输入" clearable class="textInput" />
            </span>
          </span>


          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">出库仓库</span>
            <span class="inputBox">
            <Select v-model="formFilter.warehouseId" placeholder="请选择" clearable>
              <Option v-for=" item in warehouseList" :key="item.warehouseId" :value="item.warehouseId">{{ item.warehouseName }}</Option>
            </Select>
            </span>
          </span>

          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">出库库区 </span>
              <span class="inputBox">
            <Select v-model="formFilter.districtId" placeholder="请选择" clearable>
              <Option v-for=" item in districtList" :key="item.districtId" :value="item.districtId">{{ item.districtName }}</Option>
            </Select>
            </span>
          </span>
          </span>

          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">&nbsp;出库类型</span>
            <span class="inputBox">
              <Select v-model="formFilter.remark"  clearable @on-clear="customeridClear" filterable remote  :loading="customerLoading"  @on-query-change="changeCustomer">
                  <Option v-for="(option, index) in moveTypeList" :value="option.id" :key="index">{{option.name}}</Option>
              </Select>
              <!-- <Input v-model="formFilter.movetype" placeholder="请输入"  class="textInput" /> -->
            </span>
          </span>


          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">质量状态 </span>
            <span class="inputBox">
            <Input v-model="formFilter.qualityStatus" placeholder="请输入" clearable class="textInput" />
            </span>
          </span>
          </span>
          <!-- <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">库区</span>
            <span class="inputBox">
              <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
            </span>
          </span>
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">货位</span>
            <span class="inputBox">
              <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
            </span>
          </span>
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">托盘号</span>
            <span class="inputBox">
              <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
            </span>
          </span>
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">有效期</span>
            <span class="inputBox">
              <DatePicker v-model="formFilter.startDateIn" @on-change="startDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
              -
              <DatePicker v-model="formFilter.endDateIn" @on-change="endDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
            </span>
          </span>
          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">复检期</span>
            <span class="inputBox">
              <DatePicker v-model="formFilter.startDateIn" @on-change="startDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
              -
              <DatePicker v-model="formFilter.endDateIn" @on-change="endDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
            </span>
          </span>

          <span class="outBox">
            <span class="blank" style="width:20px;">&nbsp;</span>
            <span class="blackLabel">供应商 / 车间</span>
            <span class="inputBox">
              <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
            </span>
          </span>-->


          <div class="" style="position:absolute;bottom:15px;right:50px">

          <Button shape="circle" @click="completeOutPlan" v-if="false" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >确&nbsp;&nbsp;定</Button>

          <Button type="primary" id="queryDetailChooseStock" shape="circle" v-show="false" @click="queryOutDetailChooseStock">查询</Button>
        </div>

      </div>


        </td>
      </tr>



    </Form>
    <table height="10px">

    </table>
    <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" @on-row-dblclick="showDetail"></Table>

    <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
    <br />
    <div class="stockChoosePage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>

    <!-- <ul id="vfor">
    	<template v-for="(a,b,c) in names">
    		<li>{{c}}</li>
    	</template>
    </ul> -->
    <!-- <addOutNotice ref='addOutNotice'></addOutNotice> -->
    <stockChooseDetail ref='stockChooseDetail'></stockChooseDetail>
  </div>
</template>
  </div>
</template>

<script>
// import addOutNotice from '@/pages/outOrder/AddOutNotice'
import stockChooseDetail from '@/pages/outorder/StockChooseDetail'
import axios from 'axios'
import router from '../../router'
import FileSaver from 'file-saver'
import iview from 'view-design'
import XLSX from 'xlsx'

export default {
  components: {
    // addOutNotice,
    stockChooseDetail,

   },
  data () {
    return {

      warehouseList:[], //所有的仓库
      districtList:[], //所有的库区

      total:0,
      stockList:[],
      moveTypeList:[{"id":"CKT04","name":"拼盘出库"},{"id":"CKT05","name":"一般出库"}],
      supplierList:[],
customerLoading:false,
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
        batchNo:''
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
           // {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center',fixed: 'left'},
           //{title: '序号',key: 'rowid',width: 80,align: 'center',fixed: 'left'},
           {
            title: "序号",
            key: "lineNo",
            width: 100,
            align: "center",
            fixed: 'left',
            render: (h, params) => {
              return h(
                "div",
                params.row._index +
                  1 +
                  this.formFilter.pageSize * (this.formFilter.curPage - 1)
              );
            }
          },
           {title: '出库单号',key: 'outOrderId',width:250, align: 'center',fixed: 'left'},
           {title: '明细单号',key: 'outOrderDetailId',width:250, align: 'center',fixed: 'left'},
           // {title: '单据来源', key: 'orderSource',width:90,align: 'center'},
           {title: '出库类型', key: 'movetypeTxt',width:200,align: 'center'},
           {title: '物料号', key: 'materielId',width:120,align: 'center'},
           {title: '物料名称', key: 'materielName',width:120,align: 'center'},
           {title: '供应商', key: 'vendorName',width:120,align: 'center'},
           {title: '生产地', key: 'producerName',width:120,align: 'center'},
           {title: '批次号', key: 'batchNo',width:120,align: 'center'},
           {title: '出库件数', key: 'num',width:120,align: 'center'},
           {title: '出库重量', key: 'weight',width:120,align: 'center'},
           {title: '状态', key: 'status',width:120,align: 'center',
             render: (h, params) => {
               if(params.row.status == '0'){
                 return h('span','新建')
               }else if(params.row.status == '1'){
                 return h('span','确认出库')
               }else if(params.row.status == '2'){
                 return h('span','出库中')
               }else if(params.row.status == '3'){
                 return h('span','出库完成')
               }
            }
           },
           // {title: '实物出库', key: 'realOut',width:120,align: 'center',
           //   render: (h, params) => {
           //     if(params.row.realOut == 'Y'){
           //       return h('span','是')
           //     }else if(params.row.realOut == 'N'){
           //       return h('span','否')
           //     }else{
           //       return h('span','未确认')
           //     }
           //  }
           // },
           // {title: '检验批号', key: 'checkBatch',width:120,align: 'center'},


          // {title: '是否出零散', key: 'remark3',width:240,align: 'center'},
        //   {title: '是否出零散', key: 'remark3',width:120,align: 'center',
        //    render: (h, params) => {
        //      if(params.row.remark3 == 'YLS'){
        //        return h('span','是')
        //      }else if(params.row.remark3 == 'NLS'){
        //        return h('span','否')
        //      }
        //   }
        //  },
           {title: '包装规格', key: 'packageStandards',width:120,align: 'center'},

           {title: '计量单位', key: 'unit',width:120,align: 'center'},
           {title: '质量状态', key: 'qualityStatus',width:120,align: 'center',
            render: (h, params) => {
               if(params.row.qualityStatus == 'Q'){
                 return h('span','精品')
               }else if(params.row.qualityStatus == 'N'){
                 return h('span','优等')
               }
            }
           },
           {title: '客户', key: 'customerId',width:120,align: 'center'},
           {title: '出库日期', key: 'outDate',width:120,align: 'center'},
           {title: '出库仓库',key: 'warehouseName',width:200, align: 'center'},
           {title: '出库库区', key: 'districtName',width:120,align: 'center'},

           // {title: '剩余重量', key: 'Surplus',width:120,align: 'center' ,render:(h,params)=>{
           //   // this.tableColumns.data[params.index].Surplus = +((params.row.weight+params.row.partQuantity-params.row.actualWeight).toFixed(3))+0;
           //   // return h("div",+((this.tableColumns.data[params.index].surplusquantity).toFixed(3))+0)
           //   this.tableColumns.data[params.index].Surplus = +((params.row.weight-params.row.actualWeight).toFixed(3))+0;
           //   return h("div",+((this.tableColumns.data[params.index].Surplus).toFixed(3))+0)
           // }},
           // {title: '库存件数', key: 'pieces',width:100,align: 'center'},

           // {title: '指示数量', key: 'noticeQuantity',width:120,align: 'center'},
           // {title: '指示件数', key: 'noticePieces',width:120,align: 'center'},
           // {title: '接收部门',key: 'receiveDept',width:200, align: 'center'},
           // {title: '接收人',key: 'receiveby',width:200, align: 'center'},
           // {title: '接收工厂',key: 'recvPlantTxt', width:200,align: 'center'},
           // {title: '接收库存地点', key: 'recvLocTxt',width:120,align: 'center'},
           // {title: '工厂',key: 'plantTxt', width:200,align: 'center'},
           // {title: '仓库编号', key: 'warehouseId',width:120,align: 'center'},
           // {title: '库区编号', key: 'districtId',width:200,align: 'center'},
           // {title: '特殊库存编号', key: 'specificflgno',width:150,align: 'center'},
           // {title: '特殊库存行项目', key: 'specificflgitem',width:150, align: 'center' },
           // {title: '承运单位', key: 'carrierunit',width:120,align: 'center'},


         ]

       }

    }
  },
  created(){

    //获取所有的仓库
    this.getAllWarehouse();

    //获取所有的库区
    this.getAllDistrict();

    this.queryOutDetailChooseStock()
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
        if(this.formFilter.batchNo != "" && this.formFilter.batchNo.match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)) {
        } else {
          this.formFilter.batchNo = "";
        }
        this.queryOutDetailChooseStock()
      }
    }
  },
  methods:{

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

    testtest(){

    },
    queryOutDetailChooseStock(){//查询出库明细选择库存
      this.formFilter.outStatus = 'CK02'
      axios.post(sessionStorage.http+'/queryOutDetailChooseStock?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.tableColumns.data = res.data.list
        this.total = res.data.total
      })
    },
    addNotice(){//新增出库通知
      // this.$refs.addOutNotice.show();
    },
    showDetail(row){
      this.$refs.stockChooseDetail.show(row);
    },
    // queryOutSelectList(){
    //   axios.post(sessionStorage.http+'/outOrder/queryOutSelectList?loginStatus='+`${sessionStorage.loginStatus}`,'')
    //   .then((res) =>{
    //     this.moveTypeList = res.data.moveType
    //     this.supplierList = res.data.supplier
    //   })
    // },



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
        this.trimPageData()
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
      return Y + M + D
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
        this.queryData()
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
        this.formFilter.endDateOut.setDate(this.formFilter.endDateOut.getDate()+1)
        this.formFilter.endDateOutStr = this.formartDate(this.formFilter.endDateOut)
      }else {
        this.formFilter.endDateOutStr = undefined
      }
      if(this.formFilter.endDateOutStr != null && this.formFilter.endDateOutStr != undefined){
        this.queryData()
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
        this.queryData()
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
        this.queryData()
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

    getCustomer (query) {
        if (query !== '') {
            this.customerLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.customerLoading = false;
               this.customerOptions = this.customerAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.customerOptions = this.customerAllOptions;
        }
    },

    changeCustomer(query){
      if(query != true && query != false){
        this.customerTransition = query
      }
    },

    customerOpenClose(open){
      if(open){
        if(this.formFilter.customerId == ' '){
          this.formFilter.customerId = undefined
        }
        this.customerOptions = this.customerAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.customerOptions.length; i++) {
            let option = this.customerOptions[i]
            if(option.name == this.customerTransition){
              this.formFilter.customerId = option.id
              contain = true
            }
         }
         if(!contain && this.customerTransition != ''){
           this.customerOptions = []
           let option = {label:"",value:' '}
           this.customerOptions.push(option)
           this.formFilter.customerId = option.id
         }
      }
    },


    handleChangePage (value) {
     this.formFilter.curPage = value
     this.queryOutDetailChooseStock()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      this.queryOutDetailChooseStock()
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

}
</script>
<style lang="less">
.stockChoose{
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
   .stockChoosePage{
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
