<template lang="html">
  <div class="addTemporary">
    <Modal v-model="showAddTemporary" title="出库单明细" :mask-closable='false' footer-hide okText="确定" cancel-text='取消'  :loading="loading" width='90%' style="height:500px;">
      <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">
        <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
        <tr width="100%">
          <td align="left" width="83%">
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">暂存入库单号</span>
              <span class="inputBox">
                <Input v-model="formFilter.outOrderId" placeholder="请输入"  class="textInput" />
              </span>
            </span>

          </td>
          <td align="right"  >
            <Button type="primary" id="queryOutOrder" shape="circle"  @click="queryTemporaryOut" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;">出库查询</Button>&nbsp;&nbsp;
            <Button shape="circle" @click="confirmTemporaryOut" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >确认出库</Button>
            <Button shape="circle" @click="" v-if="false" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >取消确认</Button>
          <Button shape="circle" @click=""  v-if="false" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >提&nbsp;&nbsp;交</Button>


          </td>
        </tr>
        <tr>
          <td align="right">

          </td>
        </tr>



      </Form>
      <table height="10px">

      </table>
      <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" ></Table>

      <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
      <br />
      <div class="addTemporaryPage">
        <Page :total="total" :current="curPage" :page-size="pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
      </div>

    </Modal>
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

export default {
  components: {

   },
  data () {
    return {
      outLock:false,
      noticeQuantity:{title: '指示数量', key: 'noticeQuantity',width:120,align: 'center'},
      showAddTemporary:false,//modal显示标记
      couldDelet:false,//删除标记
      newLine:1,//新增行数
      loading:false,
      total:0,
      outOrder:{},
      outOrderDetail:[],
      curPage:1,
      pageSize:20,
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



      tableColumns: {//表格数据
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
                  {title: '行号',key: 'rowid',width: 80,align: 'center'},
                  {title: '物料/产品号', key: 'materialNo',width:120,align: 'center'},
                  {title: '物料/产品描述', key: 'materialDesc',width:120,align: 'center'},
                  {title: '库存批号', key: 'stockBatch',width:120,align: 'center'},
                  {title: '出库数量', key: 'quantity',width:120,align: 'center',},
                  {title: '检验批号', key: 'checkBatch',width:120,align: 'center'},
                  {title: '质量状态', key: 'qualityStatus',width:120,align: 'center',
                    render: (h, params) => {
                      if (params.row.qualityStatus == 'Q') {
                        return h('span','待检')
                      }else if(params.row.qualityStatus == 'N') {
                        return h('span','非限制')
                      }else if(params.row.qualityStatus == 'F') {
                        return h('span','冻结')
                      }else {
                        return h('span','')
                      }
                     }
                  },
                  {title: '接收部门',key: 'receiveDept',width:200, align: 'center'},
                  {title: '接收人',key: 'receiveby',width:200, align: 'center'},
                  {title: '接收工厂',key: 'recvPlantTxt', width:200,align: 'center'},
                  {title: '接收库存地点', key: 'recvLocTxt',width:120,align: 'center'},
                  {title: '工厂',key: 'plantTxt', width:200,align: 'center'},
                  {title: '库存地点', key: 'locationTxt',width:120,align: 'center'},
                  {title: '特殊库存标识', key: 'specificflgTxt',width:150,align: 'center'},
                  {title: '特殊库存编号', key: 'specificflgno',width:150,align: 'center'},
                  {title: '特殊库存行项目', key: 'specificflgitem',width:150, align: 'center' },

                  // {title: '件数', key: 'pieces',width:120,align: 'center'},
                  // {title: '包装规格', key: 'itemcode',width:120,align: 'center'},
                  {title: '计量单位', key: 'unit',width:120,align: 'center'},
                  {title: '承运单位', key: 'carrierunit',width:120,align: 'center'},
                  {title: '允许发货', key: 'flag',width:120,align: 'center'},



         ]

       },



      //分割标记





      stockList:[],




    }
  },
  created(){        //渲染成功之后的专改
    // this.queryData()
    // this.getStockBasic()

  },
  updated(){

  },
  computed:{

  },
  methods:{
    testtest(){

    },
    alterOutDetailQuantity(detail){//修改出库数量
      axios.post(sessionStorage.http+'/outOrder/alterOutDetailQuantity?loginStatus='+`${sessionStorage.loginStatus}`,detail)
      .then((res) =>{

      })
    },
    queryTemporaryOut(){//查询暂存出库单
      if(this.formFilter.outOrderId == null || this.formFilter.outOrderId == ''){
        this.$Message.error("请输入要出库的暂存入库单号")
      }else {
        axios.post(sessionStorage.http+'/outOrder/queryTemporaryOut?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
        .then((res) =>{
          if (res.data == false) {
            this.$Message.error(res.message)
          }else {
            this.outOrderDetail = res.data
            this.total = res.data.length
            this.trimRowid()
            this.trimPageData()
          }
        })
      }
    },
    confirmTemporaryOut(){//确认暂存出库
      if (this.outOrderDetail.length == 0) {
        this.$Message.error("无出库明细，不可出库")
      }else {
        if (!this.outLock) {
          this.outLock = true
          axios.post(sessionStorage.http+'/outOrder/confirmTemporaryOut?loginStatus='+`${sessionStorage.loginStatus}`,this.outOrderDetail)
          .then((res) =>{
            this.outLock = false
            if (res.data == true) {
              this.$Message.success(res.message)
              this.showAddOutOrder = false
              document.getElementById("queryOutOrder").click()
            }else {
              this.$Message.error(res.message)
            }
          }).catch((err) => {
             this.outLock = false
          })
        }else {
          this.$Message.error("请稍等")
        }
      }
    },



    //标记
    confirmOut(){//确认出库
      let pass = true
      let choosenDetail = []
      for (var i = 0; i < this.outOrderDetail.length; i++) {
        let detail = this.outOrderDetail[i]
        console.log(detail);
        if(detail._checked && detail.detailStatus == 'CKD01'){
          if(detail.realOut == '' || detail.realOut == null){
            pass = false
            this.$Message.error("第"+(i+1)+"条数据是否实物出库未选择")
            return;
          }if(detail.quantity == 0){
            pass = false
            this.$Message.error("第"+(i+1)+"条数据出库数量为0")
            return;
          }else{
            choosenDetail.push(detail)
          }
        }
      }
      if (choosenDetail.length == 0) {
        this.$Message.error("请选择可确认出库的数据")
      }else if (choosenDetail.length > 1) {
        this.$Message.error("只可选择一条数据确认出库")
      }else {
        if (!this.outLock) {
          this.outLock = true
          axios.post(sessionStorage.http+'/outOrder/confirmOut?loginStatus='+`${sessionStorage.loginStatus}`,choosenDetail)
          .then((res) =>{
            console.log(res)
            this.outLock = false
            if (res.data == true) {
              this.$Message.success(res.message)
              let index = choosenDetail[0].rowid - 1
              this.outOrderDetail[index].detailStatus = 'CKD02'
              this.trimRowid()
              this.trimPageData()
            }else {
              this.$Message.error(res.message)
            }
          }).catch((err) => {
             this.outLock = false
          })
        }else {
          this.$Message.error("请稍等")
        }
      }


    },
    show(){
      this.formFilter.outOrderId = ''
      this.showAddTemporary = true
    },
    queryOutDetail(){//查询数据
      axios.post(sessionStorage.http+'/outOrder/queryOutDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.outOrder)
      .then((res) =>{
        console.log(res)
        this.outOrderDetail = res.data
        this.total = res.data.length
        this.trimRowid()
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
    deleteDetail(){//删除选中的行
      this.delete_confirm = false
      for(let i = this.outOrderDetail.length - 1; i >= 0 ; i--){
        if(this.outOrderDetail[i]._checked){
          this.outOrderDetail.splice(this.outOrderDetail[i].rowid-1,1)
        }
      }
      this.total = this.outOrderDetail.length
      this.trimRowid()
      this.trimPage()
      this.hasSelected = 'false'
    },
    onSelect(selection,row){
      this.outOrderDetail[row.rowid-1]._checked = true
      this.hasSelected = 'true'
    },
    onSelectCancel(selection,row){
      this.outOrderDetail[row.rowid-1]._checked = false
      this.getHasSelected()
    },
    onSelectAll(selection){
      for(var i = 0;i < this.outOrderDetail.length;i++){
        this.outOrderDetail[i]._checked = true
      }
      // for(var i = 0;i<selection.length;i++){
      //   this.outOrderDetail[selection[i].rowid-1]._checked = true
      // }
      this.hasSelected = 'true'
    },
    onSelectAllCancel(selection){
      for(var i = 0;i < this.outOrderDetail.length;i++){
        this.outOrderDetail[i]._checked = false
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
       for(var i = 0; i < this.outOrderDetail.length; i++ ){
         if(this.outOrderDetail[i]._checked){
           this.hasSelected = 'true'
           break
         }
       }
       if(this.hasSelected == 'false'){
         this.allChoosen = false
       }
     },
    trimRowid(){
      for (var i = 0; i < this.outOrderDetail.length; i++) {
        this.outOrderDetail[i].rowid = i+1
      }
    },
    trimPageData(){
      var startIndex = (this.curPage - 1) * this.pageSize
      var endIndex = startIndex + this.pageSize
      this.tableColumns.data = []
      for (var i = startIndex; i < this.outOrderDetail.length && i < endIndex; i++) {
        this.tableColumns.data.push(this.outOrderDetail[i])
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
      axios.post(sessionStorage.http+'/getaddTemporary?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
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
     this.curPage = value
     this.trimPageData()
    },
    handleChangePageSize(value){
      this.pageSize = value
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
        //this.queryData();
      }
    }
  }
}
</script>
<style lang="less">
.addTemporary{
  th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    // .ivu-table-overflow {
    //   overflow-y: inherit;
    // }
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
   .addTemporaryPage{
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
.dateInput{
  width: 120px;
  height: 28px;
  color: #333333;
}
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
