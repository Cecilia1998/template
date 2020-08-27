<template lang="html">
  <div class="checkOrder">
    <Form ref="formFilter" :model="formFilter" :label-width="84" inline style="text-align:left;">
      <Tabs >
          <TabPane label="请检单查看" name="name1">
          <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
            <span class="outBox">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">入库单号&nbsp;&nbsp;</span>
                <span class="inputBox">
                    <Input v-model="formFilter.inwareno" placeholder="请输入" clearable class="textInput" />
                </span>
            </span>
            <span class="outBox">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">请检单号&nbsp;&nbsp;</span>
                <span class="inputBox">
                    <Input v-model="formFilter.checkno" placeholder="请输入" clearable class="textInput" />
                </span>
            </span>
            <span class="outBox">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">物料编号&nbsp;&nbsp;</span>
                <span class="inputBox">
                    <Input v-model="formFilter.materialno" placeholder="请输入" clearable class="textInput" />
                </span>
            </span>
            <span class="outBox">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">状&nbsp;&nbsp;态&nbsp;&nbsp;</span>
                <span class="inputBox">
                    <Select v-model="formFilter.orderStatus"  clearable  filterable remote>
                        <Option value="" >-所有-</Option>
                        <Option value="QJ01" >取样申请</Option>
                        <Option value="QJ02" >取样中</Option>
                        <Option value="QJ03" >取样完成</Option>
                    </Select>
                </span>
            </span>
        <Row>
          <Col span='22' style='text-align:left'>
          &nbsp;
          </Col>
          <Col span='2' style='text-align:right'>
            <tr>
              <td align="right">
                <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="completePleaseOrder">取样完成</Button>
              </td>
            </tr>
          </Col>
        </Row>
        <br />
        <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="recOut" @on-row-dblclick="showDetail"></Table>

        <br />
        <div class="outNoticePage">
          <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
        </div>
        <Button type="primary" id="queryPleaseOrder" shape="circle" v-show="false" @click="queryPleaseOrder">查询</Button>
        <Button type="primary" id="queryTaskDetail" shape="circle" v-show="false" @click="queryTaskDetail">查询</Button>
        </TabPane>
        <TabPane label="任务查看" name="name2">
          <Table height=500 border stripe  :loading="loading" ref="selection" :columns="taskTable.card" :data="taskTable.data" ></Table>
        </TabPane>
      </Tabs>
    </Form>

    <PleaseCheckStockDetail ref='PleaseCheckStockDetail'></PleaseCheckStockDetail>
  </div>
</template>

<script>
import PleaseCheckStockDetail from '@/components/PleaseCheckStockDetail'
import axios from 'axios'
import router from '../../router'
import FileSaver from 'file-saver'
import iview from 'view-design'
import XLSX from 'xlsx'

export default {
  components: {
    PleaseCheckStockDetail
   },
  data () {
    return {
      uploadurl:sessionStorage.http+'/outOrder/uploadOutOrder?loginStatus='+`${sessionStorage.loginStatus}`,
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      customerList:[],
      total:0,
      stockList:[],

    loading:false,
    customerLoading:true,
    rows:[],
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

      taskTable:{
        card:[
          // {title: '序号',key: 'taskid',align: 'center'},
          {title: '序号',key: 'lineNo',width: 75,align: 'center',render:(h,params)=>{
            return h("div",+params.row._index + 1)
          }},
          {title: '任务单号',key: 'taskid',width:180,align: 'center'},
          {title: '请检单号',key: 'warehouseid',width:180,align: 'center'},
          {title: '任务类型',key: 'tasktype', width: 160,align: 'center',render:(h,params)=>{
            if(params.row.tasktype == '0'){
              return h('div','入库');
            }
            if(params.row.tasktype == '1'){
              return h('div','出库');
            }
            if(params.row.tasktype == '2'){
              return h('div','移库');
            }
          }},
          {title: '托盘号', key: 'origtrayno',width:180,align: 'center'},   //新增
          {title: '开始位置', key: 'origstorageid',width:180,align: 'center'},          //新增
          {title: '结束位置', key: 'targetstorageid',width:180,align: 'center'},
          {title: '执行顺序', key: 'teststatus',width:180,align: 'center'},
          {title: '下发时间', key: 'insertymd',width:180,align: 'center'},
          {title: '回传标识', key: 'status',width:160,align: 'center',render:(h,params)=>{
            let traystatus = '';
            if(params.row.status == '0'){
              traystatus = '未下发';
            }
            if(params.row.status == '1'){
              traystatus = 'WCS接收';
            }
            if(params.row.status == '2'){
              traystatus = '小车接收';
            }
            if(params.row.status == '3'){
              traystatus = '执行中';
            }
            if(params.row.status == '4'){
              traystatus = '任务完成';
            }
            return h('div',traystatus);
          }},
        ],
        data:[]
      },
      definePageSize:10,
      tableColumns: {
        data:[
          {}
        ],
         card: [
                  {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
                  {title: '序号',key: 'rowid',width: 80,align: 'center'},
                  {title: '入库单号',key: 'inwareno',width:200, align: 'center'},
                  {title: '请检单号',key: 'checkno',width:200, align: 'center'},
                  {title: '物料号', key: 'materialno',width:200,align: 'center'},
                  {title: '物料名称', key: 'materialdesc',width:200,align: 'center'},
                  {title: '库存批号', key: 'inventorynumber',width:120,align: 'center'},
                  {title: '有效期', key: 'validitydate',width:150, align: 'center' },
                  {title: '复检期', key: 'reviewdate',width:150,align: 'center'},
                  {title: '取样数量', key: 'inweight',width:90,align: 'center'},
                  {title: '取样件数', key: 'num',width:90,align: 'center'},
                  {title: '包装类型', key: 'packtypename',width:120,align: 'center'},
                  {title: '单据类型', key: 'type',width:120,align: 'center',
                    render: (h, params) => {
                        if(params.row.type == '0'){
                          return h('span','请检单')
                        }else if(params.row.type == '1'){
                          return h('span','复检单')
                        }else{
                          return h('span','')
                        }

                     }
                  },
                  {title: '入库业务类型', key: 'incomingtype',width:120,align: 'center',
                  render: (h, params) => {
                    if(params.row.incomingtype == 'GPT012'){
                      return h('span','转标准入库')
                    }else if(params.row.incomingtype == 'GPT011'){
                      return h('span','销售退货入库')
                    }else if(params.row.incomingtype == 'GPT010'){
                      return h('span','生产入库')
                    }else if(params.row.incomingtype == 'GPT09'){
                      return h('span','车间异常退库入库')
                    }else if(params.row.incomingtype == 'GPT08'){
                      return h('span','车间停产退库入库')
                    }else if(params.row.incomingtype == 'GPT07'){
                      return h('span','车间退库入库')
                    }else if(params.row.incomingtype == 'GPT06'){
                      return h('span','采购入库')
                    }else{
                      return h('span','')
                    }

                     }},
                  {title: '请检单状态', key: 'orderStatus',width:120,align: 'center',
                  render: (h, params) => {
                    if(params.row.orderStatus == 'QJ01'){
                      return h('span','取样申请')
                    }else if(params.row.orderStatus == 'QJ02'){
                      return h('span','取样中')
                    }else if(params.row.orderStatus == 'QJ03'){
                      return h('span','取样完成')
                    }else{
                      return h('span','')
                    }

                     }
                  },
         ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    this.queryPleaseOrder()
    this.queryTaskDetail()
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
        this.formFilter.curPage = 1
        this.queryPleaseOrder();
      }
    }
  },
  methods:{

    queryTaskDetail(){
    axios.post(sessionStorage.http+'/pleaseCheck/queryTaskOut?loginStatus='+`${sessionStorage.loginStatus}`)
          .then((res) =>{
            console.log(res)
            this.taskTable.data = res.data
          })
    },
    recOut(rows){
      this.rows = rows
    },
    completePleaseOrder(){
      if(this.rows.length <= 0){
        this.$Message.error("请勾选数据")
        return
      }
      axios.post(sessionStorage.http+'/pleaseCheck/completePleaseOrder?loginStatus='+`${sessionStorage.loginStatus}`,this.rows)
            .then((res) =>{
              console.log(res)
              this.taskTable.data = res.data
            })
    },
    showDetail(row){
      this.$refs.PleaseCheckStockDetail.show(row);
    },
    handleSuccess(res, file){
      if(res.data == true){
          this.$Message.success(res.message)
            this.queryPleaseOrder();
      }else{
          this.$Message.error(res.message)
      }
    },
    testtest(){

    },
    queryPleaseOrder(){
      // this.formFilter.outStatus = 'CK01';
      axios.post(sessionStorage.http+'/pleaseCheck/queryPleaseCheck?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.total = res.data.total
        this.tableColumns.data = res.data.resultData
      })
    },


    //分割标记
    getStockBasic(){//查询基本数据的id和nameMap
      // axios.post(sessionStorage.http+'/getStockBasic?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      // .then((res) =>{
      //   console.log(res)
      //   //标记
      //   this.customerOptions = res.data.customer
      //   this.airlineOptions = res.data.airline
      //   this.freightStationOptions = res.data.freightStation
      //   this.productTypeOptions = res.data.productType
      //   let option = {name:'-所有-',id:'',}
      //   this.customerOptions.splice(0,0,option)
      //   this.airlineOptions.splice(0,0,option)
      //   this.freightStationOptions.splice(0,0,option)
      //   this.productTypeOptions.splice(0,0,option)
      // })
      // .catch((err) => {
      //    // iview.Message.error({
      //    //   content:'网络或服务器错误',
      //    //   duration:5
      //    // });
      // })
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
      // axios.post(sessionStorage.http+'/getoutNotice?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      // .then((res) =>{
      //   console.log(res)
      //   this.stockList = res.data.resultData
      //   this.total = res.data.total
      //   this.trimPageData()
      //   //this.recordQueryCondition()
      // })
      // .catch((err) => {
      //    // iview.Message.error({
      //    //   content:'网络或服务器错误',
      //    //   duration:5
      //    // });
      // })
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
      // axios.post(sessionStorage.http+'/getStockStoragePage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      // .then((res) =>{
      //   console.log(res.data)
      // })
      // .catch((err) => {
      //    // iview.Message.error({
      //    //   content:'网络或服务器错误',
      //    //   duration:5
      //    // });
      // })
    },
    formartDate(date){//日期格式化
      let  Y = date.getFullYear() +''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
      // console.log(Y + M + D)
      return  Y +'-'+ M +'-' + D
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
      // if(this.formFilter.startDateOutStr != null && this.formFilter.startDateOutStr != undefined){
      //   this.queryData()
      // }
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
        // this.formFilter.endDateOut.setDate(this.formFilter.endDateOut.getDate())
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
       this.queryPleaseOrder();
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
        this.queryPleaseOrder();
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

  },

}
</script>
<style lang="less">
.checkOrder{
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
   .outNoticePage{
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
