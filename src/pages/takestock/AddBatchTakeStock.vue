<template lang="html">
  <Modal class="addTakeStock"
      v-model="add"
      mask-closable='false'
      :loading='loading'
      footer-hide
      width='90%'
      height='95%'
      ok-text=''
      cancel-text=''>
      <p slot="header" style="text-align:center;font-size:18px">
            <span>批量新增盘点登记</span>
      </p>
      <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">

      <table  height="20px">
        <tr>
          <td class="inputPopLable redYaHei18" style="width:50px">*仓库</td>
          <td class="warehouse">
              <Select v-model="formFilter.warehouseid"  clearable  remote  :loading="warehouseLoading" @on-open-change="warehouseOpenClose" @on-clear="warehouseClear">
                  <Option v-for="(option, index) in warehouseOptions" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
          </td>
          <td class="inputPopLable redYaHei18" >*库区</td>
          <td>
            <Select v-model="formFilter.districtid"  clearable  remote  :loading="districtLoading" @on-open-change="districtOpenClose" >
                <Option v-for="(option, index) in districtOptions" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
          </td>

          <td class="inputPopLable redYaHei18">*客户</td>
          <td>
            <Select v-model="formFilter.customerid"  clearable filterable remote :remote-method="getCustomer" :loading="customerLoading" @on-open-change="customerOpenClose" @on-query-change="changeCustomer">
                <Option v-for="(option, index) in customerOptions" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
          </td>
          <td class="inputPopLable yaHei18">申请日期</td>
          <td>
              <DatePicker v-model="formFilter.applyDate" disabled type="date" placeholder="起始日期" class="dateInput" ></DatePicker>
          </td>
          <td class="inputPopLable redYaHei18">*盘库类型</td>
          <td>
            <Select v-model="formFilter.checktype" placeholder="请选择" @on-change="checkTypeChange" class="textInput"  style="width: 160px">
              <Option value="CD01">日盘</Option>
              <Option value="CD02">周盘</Option>
              <Option value="CD03">月盘</Option>
              <Option value="CD04">季度盘</Option>
              <Option value="CD05">半年盘</Option>
              <Option value="CD06">年盘</Option>
              <Option value="CD07">临时盘</Option>
            </Select>
          </td>
          <td  class="inputPopLable yaHei18">锁库方式</td>
          <td>
            <Select v-model="formFilter.locktype" placeholder="" @on-change="lockTypeChange" :disabled = lockDisable class="textInput"  style="width: 160px">
              <Option value="LD01">不锁</Option>
              <Option value="LD03">全锁</Option>
            </Select>
          </td>
        </tr>
        <tr>
          <td colspan="12">&nbsp;</td>
        </tr>
        <tr>
          <td v-if="allChecked == 'true'" class="inputPopLable yaHei18" style="width:90px">开始日期</td>
          <td v-if="allChecked == 'true'">
            <DatePicker v-model="formFilter.startDate" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </td>
          <td v-if="allChecked == 'true'" class="inputPopLable yaHei18" style="width:90px">结束日期</td>
          <td v-if="allChecked == 'true'">
            <DatePicker v-model="formFilter.endDate" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </td>
          <td class="inputPopLable yaHei18" style="width:50px">备注</td>
          <td colspan="3">
            <Input v-model="formFilter.remark" @on-keyup="remarkChange" @on-blur="remarkChange" class="textLongInput" style="width:300px"/>
          </td>

        </tr>

      </table>
      </form>
      <span style="display:inline-block;width:5px"> &nbsp;</span>
      <table>
        <tr>
          <td >
            <Checkbox class="yaHei18" v-model="formFilter.isAllChecked"  :disabled='false' @on-change="allCheckChange">全盘</Checkbox>
          </td>
          <td >
            <Checkbox class="yaHei18" v-model="allChoosen"  :disabled='false' @on-change="allChoosenChange">选择所有页</Checkbox>
          </td>
        </tr>
      </table>
    <table>
      <tr width="100%">
        <td width="78%" align="left">

          <Button v-show="hasSelected == 'false' || allChecked == 'true'" type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
          <Button v-show="hasSelected == 'true' && allChecked == 'false'"  type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" @click="delete_confirm = true" icon="md-trash">删除选中项</Button>
        </td>
        <td align="right" width="400px" >
          <div class="" style="display:flex;justify-content:center;">
            <!-- <Button   type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='allCheck'>全&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;盘</Button>&nbsp; -->
            <!-- <Button  v-if="allChecked == 'false'" type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='addDetail'>新增明细</Button>
            <Button  v-if="allChecked == 'true'" type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4;" @click='addDetail'>新增明细</Button>&nbsp; -->
            <Button   type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='saveNewCheckOrder'>提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</Button>&nbsp;
            <Button type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4">盘点开始</Button>

          </div>

        </td>
      </tr>
    </table>
    <table height="10px">

    </table>

    <Table id='tableBatchId' height=400  border stripe :loading="loading" ref="selection" :columns="tableColumnsAdd.card" :data="tableColumnsAdd.data" @on-selection-change="onSelectionChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel"	></Table>
    <br />
    <div class="addTakeStockPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>
    <Modal v-model="delete_confirm" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span style="font-size:14px">删除确认</span>
      </p>
      <div style="text-align:center">
        <span style="font-size:14px">确定要删除吗？</span>
      </div>
      <div slot="footer" align = "center">
        <Button type="error" long style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" @click="deleteDetail">确定删除</Button>
      </div>
    </Modal>

  </Modal>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'

export default {
  components: {

   },
  data () {
    return {
      delete_confirm:false,//删除提示
      lockDisable:false,//锁库不可用
      checkDetails:[],
      searchIndex:0,//当前查询库存的表格行
      detailRows:[],//选择的明细行
      add:false,//用于控制是否显示本弹窗
      loading:false,
      lastDistrictID:'',//选择的上一个库区id
      hasSelected:'false',
      allChecked:'false',
      allCheckDetail:[],//全部的明细列表
      allChoosen:false,//全选
      submitLock:false,
      //库区
      districtList:[],
      districtAllOptions: [],
      districtLoading: false,
      districtOptions: [],
      districtTransition:'',

      //仓库
      warehouseList:[],
      warehouseAllOptions: [],
      warehouseLoading: false,
      warehouseOptions: [],
      warehouseTransition:'',

      //客户
      customerList:[],
      customerAllOptions: [],
      customerLoading: false,
      customerOptions: [],
      customerTransition:'',

      total:0,
      stockList:[],

      formFilter: {
        applyDate:new Date(),
        inWarehouseId:'',
        locktype:'LD01',
        isAllCheck:'0',//是否全盘：1：是；0：否
        isAllChecked:false,
        itemcode:'',
        curPage:1,
        pageSize:20,
        loginStatus:`${sessionStorage.loginStatus}`,

      },
      tableColumnsAdd: {
        data:[
          {
            select:false,
            storageid:'',
            inWarehouseId:'',
            receiptId:'',
            originquantity:'',
            unit:'',
            InventoryWeight:null,
            checkWeight:null,
            checkquantity:null,
            differquantity:'',
            differentWeight:'',
            disqualifiedquantity:null,
            checkstarttime:'',
            checkendtime:'',
            trayno:'',
            islock:'0',
            remark:'',
            checkdetailid:0,
          }
        ],
         card: [
           {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
          {title: '货位',key: 'storageid',width: 80,align: 'center'},
          {title: '进仓编号',key: 'inWarehouseId',width: 200,align: 'center', render: (h, params) => {
            if(params.row.inWarehouseId != null && params.row.inWarehouseId != ''){
              return h('span',{},params.row.inWarehouseId)
            }
             return h('div',[
               h('Input',{
                 props: {
                     //将单元格的值给Input
                     'search':true,
                     'value':params.row.inWarehouseId,
                     },
                  style: {
                    width:"160px",
                  },
               on:{
                    'on-change':(event)=> {
                      console.log(this.tableColumnsAdd.data[params.row._index].itemcode)
                   },
                   'on-search':(value)=> {
                     this.formFilter.inWarehouseId = value
                     let noValue = this.noValueFilter()
                     this.searchIndex = params.row.rowid - 1
                     if(!noValue && value != ''){
                       this.takeStockGoods()
                     }
                  },
                   'on-keyup':(value)=> {

                  },
                   'on-blur':(event)=>{

                   }
                 }
                 }
               )
             ]);
             }},
          {title: '回单号', key: 'receiptId',width: 200,align: 'center'},
          {title: '库存数量',key: 'originquantity',width:90,align: 'center'},
          {title: '库存单位',key: 'unit',width:90,align: 'center'},
          {title: '库存重量(kg)',key: 'InventoryWeight',width:110,align: 'center'},
          {title: '盘点数量',key: 'checkquantity',width: 90, align: 'center', render: (h, params) => {
             return h('div',[
               h('InputNumber',{
                 props: {
                     //将单元格的值给Input
                     //'v-model':params.row.checkquantity,
                     value:params.row.checkquantity,
                     'min':0,
                     },
                style: {
                  width:"60px",
                },
               on:{
                    'on-change':(value)=> {
                      let realValue = Math.floor(value)

                      params.row.checkquantity = realValue
                      params.row.differquantity = realValue - params.row.originquantity
                      this.tableColumnsAdd.data[params.row._index] = params.row
                      console.log(params.row)

                   },
                   'on-blur':()=>{

                     if(params.row.checkquantity != null && params.row.disqualifiedquantity != null && params.row.checkquantity < params.row.disqualifiedquantity){

                       setTimeout(()=>{
                          params.row.checkquantity = null
                          params.row.differquantity = null
                          this.tableColumnsAdd.data[params.index] = params.row
                          alert('盘点数量不能小于不合格数量')
                      },50)

                     }
                   }
                 }
                 }
               )]);
             }},
         {title: '盘点重量(kg)',key: 'checkWeight',width: 110, align: 'center', render: (h, params) => {
            return h('div',[
              h('InputNumber',{
                props: {
                    //将单元格的值给Input
                    //'v-model':params.row.checkWeight,
                    value:params.row.checkWeight,
                    'min':0,
                    },
               style: {
                 width:"60px",
               },
              on:{
                   'on-change':(value)=> {
                     params.row.checkWeight = value

                     params.row.differentWeight = value - params.row.InventoryWeight
                     this.tableColumnsAdd.data[params.row._index] = params.row
                  },
                  'on-blur':()=>{

                    }
                  }

                }
              )]);
            }},

          {title: '差异数量',key: 'differquantity', width: 90,align: 'center'},
          {title: '差异重量(kg)',key: 'differentWeight', width:110,align: 'center'},

          {title: '不合格数量',key: 'disqualifiedquantity',width:100,align: 'center', render: (h, params) => {
             return h('div',[
               h('InputNumber',{
                 props: {
                     //将单元格的值给Input
                     'v-model':params.row.itemcode,
                     'min':0,
                     'value':params.row.disqualifiedquantity,
                     },
               style: {
                 width:"60px",
               },
               on:{
                    'on-change':(value)=> {
                      if((params.row.originquantity != null &&value > params.row.originquantity) || (params.row.checkquantity != null && value > params.row.checkquantity)){
                        console.log(params.row.checkquantity)
                        params.row.disqualifiedquantity = null
                        alert('不合格数量不能大于库存数量和盘点数量')
                      }else {
                        params.row.disqualifiedquantity = value
                      }
                       this.tableColumnsAdd.data[params.row._index] = params.row

                   },

                 }
                 }
               )]);
             }},

          {title: '盘点开始时间',key: 'checkstarttime',width:150,align: 'center'},
          {title: '盘点结束时间', key: 'checkendtime',width:150, align: 'center' },
          {title: '托盘号',key: 'trayno',width:110,align: 'center'},
          {title: '是否锁库',key: 'islock',width:110,align: 'center' ,
          render: (h, params) => {
            if ( this.formFilter.locktype == 'LD03') {
              return h('span',{},'是')
            }
                return h('Select', {
                  props:{
                    'value':this.tableColumnsAdd.data[params.index].islock,
                    class:'lockSelection'
                  },
                  //props,
                 on: {
                        'on-change':(isLock) => {
                          this.tableColumnsAdd.data[params.index].islock = isLock
                          console.log(isLock)
                            console.log(this.tableColumnsAdd.data[params.index].islock)
                        }
                  },
                   },
                 [
                  h('Option',{
                      props: {
                           value: '0',
                           class:'lockSelection'
                      }
                   },'否'),
                    h('Option',{
                        props: {
                            value: '1',
                            class:'lockSelection'
                         }
                     },'是')
               ]);
            },
          },

          {title: '备注',key: 'remark',width:200,align: 'center', render: (h, params) => {
             return h('div',[
               h('Input',{
                 props: {
                     //将单元格的值给Input
                     'v-model':params.row.itemcode,
                     'element-id':"itemcode_"+this.tableColumnsAdd.data[params.index].checkdetailid
                     },
               on:{
                    'on-change':(event)=> {
                      this.detailRemarkChange(event.target.value,params.row._index)

                   },
                   'on-blur':(e)=>{

                   }
                 }
                 }
               )]);
             }},

          {title: '操作', key: 'action',align: 'center', width: 100,
            render: (h, params) => {
              const permissions = params.row.permissions
              const lea_status = params.row.status
              let buttons = []

              if (true) {
                buttons.push(h('span', {
                  props: {
                    color:'red'

                  },
                  style: {
                    marginRight: '5px',
                    color:'#cccccc'
                  },
                  on: {
                    click: () => {
                      this.showDetail(params);
                    }
                  }
                }, '盘点结束'))
              }
              return h('div', buttons)
            }
          }
         ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    this.getAllWarehouse()
    this.getAllCustomer()
  },
  updated(){

  },
  computed:{

  },
  methods:{
    testtest(){

    },
    getAllStockCheck(){//获取全盘盘点数据
      axios.post(sessionStorage.http+'/takeAllStockCheck?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        //console.log(res)
        if (res.data.length > 0) {

          this.allCheckDetail = res.data
          this.formFilter.curPage = 1
          this.total = this.allCheckDetail.length
          this.trimRowid()
          this.trimPage()
          this.hasSelected = 'false'
        }else {
          iview.Message.error({
            content:'无库存',
            duration:5,
            onClose:function(){

            }
          })
        }

      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    allCheckChange(){
      if(this.formFilter.isAllChecked){
        if(this.formFilter.warehouseid == '' || this.formFilter.warehouseid == undefined){
          alert('请选择想要全盘的仓库')
          setTimeout(() => {
              this.formFilter.isAllChecked = false
          }, 50);

        }else {
          this.hasSelected = 'false'
          this.allChoosen = false
          this.getAllStockCheck()
          this.formFilter.locktype = 'LD03'
          this.formFilter.isAllCheck = '1'
          this.lockDisable = true
          this.allChecked = 'true'
        }
      }else{
        this.hasSelected = 'false'
        this.allChoosen = false
        this.allChecked = 'false'
        this.formFilter.isAllCheck = '0'
        this.lockDisable = false
        this.checkTypeChange()
        if(this.formFilter.districtid == '' || this.formFilter.districtid == undefined){
          this.allCheckDetail = []
          this.tableColumnsAdd.data = []
        }else{
          this.getBatchStockCheck()
        }
      }
    },
    getBatchStockCheck(){//获取批量盘点数据
      if(this.allChecked == 'false' && this.formFilter.districtid != undefined && this.formFilter.districtid != '' ){
        axios.post(sessionStorage.http+'/takeBatchStockCheck?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
        .then((res) =>{
          //console.log(res)
          if (res.data.length > 0) {

            this.allCheckDetail = res.data
            this.formFilter.curPage = 1
            this.total = this.allCheckDetail.length
            this.trimRowid()
            this.trimPage()
            this.hasSelected = 'false'
          }else {
            iview.Message.error({
              content:'无库存',
              duration:5,
              onClose:function(){

              }
            })
          }

        })
        .catch((err) => {
           iview.Message.error({
             content:'网络或服务器错误',
             duration:5
           });
        })
      }
    },
    trimPage(){
      this.tableColumnsAdd.data = []
      // let start = (this.formFilter.curPage - 1) * this.formFilter.pageSize
      // let end = this.formFilter.curPage  * this.formFilter.pageSize
      // let realEnd = end > start +  this.formFilter.pageSize ? start +  this.formFilter.pageSize : end
      // this.tableColumnsAdd.data = this.allCheckDetail.slice(start,realEnd)
      for(var i = (this.formFilter.curPage - 1) * this.formFilter.pageSize,j = 0;j < this.formFilter.pageSize && i < this.allCheckDetail.length;i++,j++){
        this.tableColumnsAdd.data[j] = this.allCheckDetail[i]

      }
    },
    checkTypeChange(){//盘库类型改变
      if(this.formFilter.checktype == 'CD05' || this.formFilter.checktype == 'CD06'){
        this.formFilter.locktype = 'LD03'
        setTimeout(() => {
            this.lockDisable = true
        }, 50);
        this.lockTypeChange()
      }else {
        this.lockDisable = false

      }
    },
    lockTypeChange(){
      if (this.formFilter.locktype == 'LD03') {
        if(this.tableColumnsAdd.data.length > 0){
          this.tableColumnsAdd.data[0].locktype = "LD03"
        }
      }else {
        if(this.tableColumnsAdd.data.length > 0){
          this.tableColumnsAdd.data[0].locktype = "LD01"
        }
      }
    },
    show(){//显示本弹窗
      this.add = true;
      this.formFilter.districtid = undefined
      this.formFilter.warehouseName = undefined
      this.formFilter.warehouseid = undefined
      this.formFilter.customerid = undefined
      this.formFilter.checktype = undefined
      this.formFilter.locktype = undefined
      this.tableColumnsAdd.data = []
      this.allCheckDetail=[]
      this.addDetail()
      this.lastDistrictID = ''
      //this.formFilter.districtid = undefined
      //this.districtTransition = ''
      //this.loading = false;
    },
    ok(){

      this.loading = false;
    },
    cancel(){
      this.loading = false;
    },
    saveNewCheckOrder(){
      if(this.tableColumnsAdd.data.length == 0){
        alert("无明细数据，不可提交")
      }else {
        if(!this.submitLock){
          this.submitLock = true
          let checkOrderPack = {loginStatus:`${sessionStorage.loginStatus}`,checkOrder:this.formFilter,checkDetailOrders:this.allCheckDetail}
          axios.post(sessionStorage.http+'/saveNewCheckOrder?loginStatus='+`${sessionStorage.loginStatus}`,checkOrderPack)
          .then((res) =>{
            setTimeout(()=>{
              this.submitLock = false
            },2000)
            if(res.data == null){
              iview.Message.error({
                content:res.message,
                duration:5,
                onClose:function(){

                }
              })
            }else {
              this.lastDistrictID = ''
              document.getElementById("showCheckId").value = res.data
              document.getElementById("showDetail").click()
              this.add = false
              iview.Message.success({
                content:res.message,
                duration:5,
                onClose:function(){

                }
              })
            }

          })
          .catch((err) => {
             // iview.Message.error({
             //   content:'网络或服务器错误',
             //   duration:5
             // });
             setTimeout(()=>{
               this.submitLock = false
             },2000)
          })
        }
      }
    },

    deleteDetail(){//删除选中的行
      this.delete_confirm = false
      for(let i = this.allCheckDetail.length - 1; i >= 0 ; i--){
        if(this.allCheckDetail[i]._checked){
          this.allCheckDetail.splice(this.allCheckDetail[i].rowid-1,1)
        }
      }
      this.total = this.allCheckDetail.length
      this.trimRowid()
      this.trimPage()
      this.hasSelected = 'false'
    },
    trimRowid(){//分配行号
      for(var i = 0;i<this.allCheckDetail.length;i++){
        this.allCheckDetail[i].rowid = i + 1
      }
    },
    getHasSelected(){
      this.hasSelected = 'false'
      for(var i = 0; i < this.allCheckDetail.length; i++ ){
        if(this.allCheckDetail[i]._checked){
          this.hasSelected = 'true'
          break
        }
      }
      if(this.hasSelected == 'false'){
        this.allChoosen = false
      }
    },
    allChoosenChange(){
      if (this.allChoosen) {
        for(var i = 0;i < this.allCheckDetail.length;i++){
          this.allCheckDetail[i]._checked = true
        }
        this.hasSelected = 'true'
      }else {
        for(var i = 0;i < this.allCheckDetail.length;i++){
          this.allCheckDetail[i]._checked = false
        }
        this.hasSelected = 'false'
      }
      this.trimPage()
    },
    onSelect(selection,row){
      this.allCheckDetail[row.rowid-1]._checked = true
      this.hasSelected = 'true'
    },
    onSelectCancel(selection,row){
      this.allCheckDetail[row.rowid-1]._checked = false
      this.getHasSelected()
    },
    onSelectAll(selection){
      for(var i = 0;i<selection.length;i++){
        this.allCheckDetail[selection[i].rowid-1]._checked = true
      }
      this.hasSelected = 'true'
    },
    onSelectAllCancel(selection){
      for(var i = 0;i<this.tableColumnsAdd.data.length;i++){
        this.allCheckDetail[this.tableColumnsAdd.data[i].rowid-1]._checked = false
      }
      this.getHasSelected()
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
       this.detailRows = rows
     },
    remarkChange(){//备注表头改变
      if(this.formFilter.remark.length > 50){
        this.formFilter.remark = this.formFilter.remark.substr(0,50)
      }
    },
    detailRemarkChange(value,index){
      if(value.length > 50){
        this.tableColumnsAdd.data[index].remark = value.substr(0,50)
      }else {
        this.tableColumnsAdd.data[index].remark = value
      }
    },
    noValueFilter(){//必填值过滤
      if (this.formFilter.districtid=='' || this.formFilter.districtid== undefined) {
        alert('库区不能为空')
        return true
      }else if (this.formFilter.customerid=='' || this.formFilter.customerid== undefined) {
        alert('客户不能为空')
        return true
      }else if (this.formFilter.checktype=='' || this.formFilter.checktype== undefined) {
        alert('盘库类型不能为空')
        return true
      }
      return false
    },
    addDetail(){//新增盘点明细
      //this.noValueFilter()
      let detail = {select:false,storageid:'',inWarehouseId:'',receiptId:'',originquantity:'',unit:'',InventoryWeight:'',checkquantity:null,checkWeight:null,differquantity:'',differentWeight:'',disqualifiedquantity:null,checkstarttime:'',checkendtime:'',trayno:'',islock:'0', remark:'',locktype:'',rowid:this.allCheckDetail.length+1}
      this.allCheckDetail.push(detail)
      this.total = this.allCheckDetail.length
      this.hasSelected = 'false'
      this.formFilter.curPage = parseInt((this.total - 1)/this.formFilter.pageSize) +1
      this.trimPage()
      this.detailRows = []
    },

    takeStockGoods(){//查询指定零件的库存
      axios.post(sessionStorage.http+'/takeStockGoodsByIn?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        //console.log(res)
        if (res.data.length > 0) {
          this.checkDetails = res.data
          this.addResultDetail()
        }else {
          iview.Message.success({
            content:'选定客户在该库区无此商品',
            duration:5,
            onClose:function(){

            }
          })
        }

      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    addResultDetail(){//将商品库存显示到表格
     this.allCheckDetail.splice(this.searchIndex,1)
      for (var i = 0; i < this.checkDetails.length; i++) {
        this.allCheckDetail.splice(this.searchIndex+i,0,this.checkDetails[i])
      }
      this.trimRowid()
      this.trimPage()
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
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    queryWareHouse(){//查询仓库
      axios.post(sessionStorage.http+'/queryWareHouse?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        this.formFilter.warehouseName = '1'
        this.formFilter.warehouseName = res.data
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    districtOpenClose(open){//库区下拉框打开或关闭
      if(open){
        this.districtOptions = this.districtAllOptions
      }else{

      }
    },

    //仓库
    getAllWarehouse(){
      axios.post(sessionStorage.http+'/getAllWarehouse?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.warehouseList = res.data
        this.changeToIdNameOptions(this.warehouseList,this.warehouseAllOptions)
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    getWarehouse (query) {
        if (query !== '') {
            this.warehousLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.warehousLoading = false;
               this.warehouseOptions = this.warehouseAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.warehouseOptions = this.warehouseAllOptions;
        }
    },

    changeWarehouse(query){
      if(query != true && query != false){
        this.warehousTransition = query
      }
    },
    warehouseClear(){
      this.districtid = ''
      this.districtOptions = []
      this.districtAllOptions = []
    },
    warehouseOpenClose(open){
      if(open){
        this.warehouseOptions = this.warehouseAllOptions
      }else{
        this.getAssignDistrict()
      }
    },
    warehouseOpenClose2(open){
      if(open){
        if(this.formFilter.warehouseid == ' '){
          this.formFilter.warehouseid = undefined
        }
        this.warehouseOptions = this.warehouseAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.warehouseOptions.length; i++) {
            let option = this.warehouseOptions[i]
            if(option.label == this.warehouseTransition){
              this.formFilter.warehouseid = option.value
              contain = true
            }
         }
         if(!contain && this.warehouseTransition != ''){
           this.warehouseOptions = []
           let option = {label:"",value:' '}
           this.warehouseOptions.push(option)
           this.formFilter.warehouseid = option.value
         }
        this.getAssignDistrict()
      }
    },

    getAssignDistrict(){//获取指定仓库的库区
      console.log(this.formFilter)
      axios.post(sessionStorage.http+'/getAssignDistrict?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.districtList = res.data
        this.districtAllOptions = []
        this.formFilter.districtid = null
        this.changeToIdNameOptions(this.districtList,this.districtAllOptions)
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    //客户
    getAllCustomer(){
      axios.get(sessionStorage.http+'/getAllCustomerIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.customerList = res.data
        this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
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
        if(this.formFilter.customerid == ' '){
          this.formFilter.customerid = undefined
        }
        this.customerOptions = this.customerAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.customerOptions.length; i++) {
            let option = this.customerOptions[i]
            if(option.label == this.customerTransition){
              this.formFilter.customerid = option.value
              contain = true
            }
         }
         if(!contain && this.customerTransition != ''){
           this.customerOptions = []
           let option = {label:"",value:' '}
           this.customerOptions.push(option)
           this.formFilter.customerid = option.value
         }
      }
    },
    handleChangePage (value) {
     this.formFilter.curPage = value
     this.trimPage()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      this.trimPage()
      // const paths = this.$route.path.split('/')
    },

    watch: {
      formFilter: {
        deep: true,
        handler() {
          //this.getBatchStockCheck();
        }
      }
    }

  }
}
</script>

<style lang="less">
    .addTakeStock{
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
         // width: 160px;
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
      .ivu-table-cell{
        overflow: inherit;
      }
     #tableBatchId .ivu-select{
        width: 60px !important;
      }
      .addTakeStockPage{
        .ivu-select-selection{
           bottom: 6px;
         }
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
warehouse .textInput{
  width: 180px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
.inputPopLable{
  padding-top: 10px;
  width: 120px;
  align:right;
  text-align: right;
}
  .lockSelection{
  width: 20px;
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

.textOutput{
  display: inline-block;
  width: 90px;
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
