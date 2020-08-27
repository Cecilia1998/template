detail<template lang="html">
  <Modal class="detailTakeStock"
      v-model="detail"
      mask-closable='false'
      :loading='loading'
      footer-hide
      @on-ok="ok"
      @on-cancel="cancel" width='90%'
      ok-text='提交'
      cancel-text='关闭'>
      <p slot="header" style="text-align:center;font-size:18px">
            <span v-show="this.transport.approvestatus == '未审批'">审批盘点登记</span>
            <span v-show="this.transport.approvestatus != '未审批'">修改盘点登记</span>
      </p>
      <table>
        <tr>
          <td align="left">

            <span class="outBox">
              <span class="blank">&nbsp;</span>
              <span class="redLabel">盘库类型 </span>
              <span class="textOutput">
                <span v-show="this.transport.checktype == '临时盘'"class="textOutput">临时盘</span>
                <span v-show="this.transport.checktype == '全盘'"class="textOutput">全盘</span>
              </span>
            </span>


            <span class="outBox">
              <span class="blank">&nbsp;&nbsp;</span>
              <span class="redLabel">申请日期</span>
              <span class="textOutput">{{this.transport.insertymd}}</span>
            <!-- <span class="textOutput">{{this.formFilter.applytime}}</span> -->
            </span>

            <!-- 审批状态为'未审批' -->
            <span class="outBox" v-show="this.transport.approvestatus == '未审批' ">
              <span class="blank">&nbsp;</span>
              <span class="redLabel">计划盘点开始日期</span>
                <span class="textOutput">
                  <DatePicker  v-model="formFilter.checkstarttime" @on-change="startDateChanged" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
                  <!-- <span class="textOutput">{{formFilter.checkStartTime}}</span> -->
                </span>
            </span>

            <span class="outBox" v-show="this.transport.approvestatus == '未审批' ">
              <span class="blank">&nbsp;</span>
              <span class="redLabel">计划盘点结束日期</span>
                <span class="textOutput">
                  <DatePicker  v-model="formFilter.checkendtime" @on-change="endDateChanged" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
                  <!-- <span class="textOutput">{{formFilter.checkEndTime}}</span> -->
                </span>
            </span>
            <!-- 审批状态为'审批通过' -->
           <span class="outBox" v-show="this.transport.approvestatus == '审批通过' ">
             <span class="blank">&nbsp;</span>
             <span class="redLabel">计划盘点开始日期</span>
               <span class="textOutput">
                 <!-- <DatePicker  v-model="formFilter.checkstarttime" @on-change="startDateChanged" type="date" placeholder="请选择" class="dateInput" ></DatePicker> -->
                 {{transport.checkstarttime}}
               </span>
           </span>

           <span class="outBox" v-show="this.transport.approvestatus == '审批通过' ">
             <span class="blank">&nbsp;</span>
             <span class="redLabel">计划盘点结束日期</span>
               <span class="textOutput">
                 <!-- <DatePicker  v-model="formFilter.checkendtime" @on-change="endDateChanged" type="date" placeholder="请选择" class="dateInput" ></DatePicker> -->
                 {{transport.checkendtime}}
               </span>
           </span>
            <span class="outBox" v-show="this.transport.approvestatus != '未审批' ">
              <span class="blank">&nbsp;</span>
              <span class="redLabel">盘点状态</span>
              <span class="textOutput" >
                <Select v-model="formFilter.status"  placeholder="" class="textInput"  style="width: 160px;text-align:left;">
                  <Option v-for="(option, index) in checkStatusOptions" :value="option.value" :key="index">{{option.label}}</Option>
                </Select>
              </span>
            </span>


            <span class="outBox">
              <span class="blank">&nbsp;</span>
              <span class="redLabel">备&nbsp;注</span>
              <span class="textOutput">
                <Input v-model="formFilter.remark" @on-keyup="remarkChange" @on-blur="remarkChange" class="textLongInput" style="width:300px"/>
                <!-- <span v-show="formFilter.status == 'CDS3' " class="textOutput">{{formFilter.remark}}</span> -->
              </span>
            </span>
          </td>
        </tr>
      </table>



      <br>

      <div class="" style="display:flex;justify-content:space-between">
        <div class="">
          <Button shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" :disabled='deDis' v-show="this.transport.approvestatus != '未审批' " @click="delConfirmOrder" id='delOrder' icon="md-trash">删除选中项</Button>
        </div>
        <div class="">
          <!-- <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="addShow">新&nbsp;&nbsp;增</Button> -->
          <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" v-show="this.transport.approvestatus == '未审批' " @click="approveAllCheck">通&nbsp;&nbsp;过</Button>
          <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" v-show="this.transport.approvestatus == '未审批' " @click="rejectAllCheck">驳&nbsp;&nbsp;回</Button>
          <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" v-show="this.transport.approvestatus != '未审批' " @click="saveAlterCheckOrder">提&nbsp;&nbsp;交</Button>

        </div>
      </div>



  <div class="detailTakeTable">
    <Table id="tableDetailId"  border stripe height=400 :loading="loading" style="margin-top:20px;" ref="selection"  :columns="tableColumnsDetail.card" :data="tableColumnsDetail.data" @on-selection-change="onSelectionChange" @on-row-dblclick="showTaskDetail"></Table>
  </div>

    <br />
    <Modal v-model="delete_confirm" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span style="font-size:14px">删除确认</span>
      </p>
      <div style="text-align:center">
        <span style="font-size:14px">确定要删除吗？</span>
      </div>
      <div slot="footer" align = "center">
        <Button type="error" long style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" @click="deleteCheckDetail">确定删除</Button>
      </div>
    </Modal>

    <checkTaskDetail ref='checkTaskDetail'></checkTaskDetail>
  </Modal>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'
import checkTaskDetail from '@/pages/takestock/CheckTaskDetail'
// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
    checkTaskDetail,
     // FilterBar,
     // List
   },
  data () {
    return {
      testdata:'',
       //该条盘库信息的审批状态
       approveStatus:'',

       //双击事件传入弹框的对象
       transport:{},

       //最终的盘库状态
       terminalCheckOrder:{
         checkrecordid:'',
         status:''
       },

       ChoosenDetail:[], //选择盘库完成时符合条件的数据

       //选中行的数据，用于提交盘库数量和备注信息
       allCheckDetail:[],
       selectedRows:[],//选择的明细行

       delete_confirm:false,
       lockDisable:false,
       checkDetails:[],
       endIndex:0,//当前结束盘点的表格行

       detail:false,//用于控制是否显示本弹窗
       loading:false,
       deleteDetails:[],//要删除的明细
       couldDelet:'false',
       submitLock:false,




       total:0,
       stockList:[],

       checkStatusOptions:[{label:"创建",value:"CDS1"},{label:"盘库中",value:"CDS2"},{label:"盘库完成",value:"CDS3"}],

       formFilter: {
         applyDate:new Date(),
         locktype:'LD01',
         itemcode:'',
         pagetotal:1,
         curPage:1,
         pageSize:20,
         loginStatus:`${sessionStorage.loginStatus}`,
         //盘库单的状态
         originStatus:'',
         status:'',
         //盘库id
         checkrecordid:'',



         remark:'', //备注
         checkstarttime:'', //计划盘点开始时间
         checkendtime:'' //计划盘点结束时间

       },

       dataNotPage:[], //后台查询到的所有盘库明细

       tableColumnsDetail: {
         data:[
           {
             select:false,
             storageid:'',
             itemcode:'',
             itemname:'',
             originquantity:'',
             unit:'',
             checkquantity:null,
             differquantity:'',
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
           {title: '序号',key: 'rowid',width: 80,align: 'center',
               render: (h, params) => {
                 return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
               }
           },
          {title: '货位',key: 'storageid',width: 100,align: 'center'},
          {title: '批次号',key: 'stocknumber',width: 160,align: 'center'},
          {title: '物料/成品号',key: 'itemcode',width: 160,align: 'center'},
          {title: '物料/成品描述', key: 'itemname',width: 120,align: 'center'},
          {title: '库存数量',key: 'originquantity',width:90,align: 'center'},
          {title: '库存件数',key: 'originpieces',width:90,align: 'center'},
          {title: '包装规格',key: 'unit',width:90,align: 'center'},
          {title: '计量单位',key: 'standby4',width:90,align: 'center'},
             // {title: '盘点数量',key: 'checkquantity',width:90,align: 'center'},
          {title: '盘点数量',key: 'checkquantity',width: 90, align: 'center',
           render: (h, params) => {
             if(this.transport.approveStatus == "未审批" || params.row.teststatus == 'CDS1'){
               return h('div',{},'')
             }
             if(params.row.teststatus == 'CDS3'){
                return h('div',{},params.row.checkquantity)
             }

              return h('InputNumber',{
                 props: {
                     //将单元格的值给Input
                     //'v-model':params.row.checkquantity,
                     'value':params.row.checkquantity,
                     'min':0,
                     },
                 style: {
                   width:"60px",

                 },
               on:{
                    'on-change':(value)=> {
                    params.row.checkquantity = value
                    params.row.differquantity = (value - params.row.originquantity).toFixed(3)

                      this.tableColumnsDetail.data[params.row._index] = params.row


                   },
                   'on-blur':()=>{

                     if(params.row.checkquantity != null && params.row.disqualifiedquantity != null && params.row.checkquantity < params.row.disqualifiedquantity){

                       setTimeout(()=>{
                          params.row.checkquantity = null
                          params.row.differquantity = null
                          this.tableColumnsDetail.data[params.index] = params.row
                          alert('盘点数量不能小于不合格数量')
                      },50)

                     }
                   }

                 }
                 }
               );
             }},

          {title: '差异数量',key: 'differquantity', width: 110,align: 'center'},
          {title: '盘点件数',key: 'checkpieces',width: 90, align: 'center',
           render: (h, params) => {
             if(this.transport.approveStatus == "未审批" || params.row.teststatus == 'CDS1'){
               return h('div',{},'')
             }
             if(params.row.teststatus == 'CDS3'){
                return h('div',{},params.row.checkpieces)
             }

              return h('InputNumber',{
                 props: {
                     //将单元格的值给Input
                     //'v-model':params.row.checkquantity,
                     'value':params.row.checkpieces,
                     'min':0,
                     },
                 style: {
                   width:"60px",

                 },
               on:{
                    'on-change':(value)=> {
                    params.row.checkpieces = value
                    params.row.differpieces = value - params.row.originpieces

                      this.tableColumnsDetail.data[params.row._index] = params.row


                   },
                   // 'on-blur':()=>{
                   //
                   //   if(params.row.checkpieces != null && params.row.disqualifiedquantity != null && params.row.checkquantity < params.row.disqualifiedquantity){
                   //
                   //     setTimeout(()=>{
                   //        params.row.checkquantity = null
                   //        params.row.differquantity = null
                   //        this.tableColumnsDetail.data[params.index] = params.row
                   //        alert('盘点数量不能小于不合格数量')
                   //    },50)
                   //
                   //   }
                   // }

                 }
                 }
               );
             }},
             {title: '差异件数',key: 'differpieces', width: 110,align: 'center'},

          // {title: '不合格数量',key: 'disqualifiedquantity',width:130,align: 'center', render: (h, params) => {
          //   if(params.row.teststatus == 'CDS3'){
          //      return h('span',{},params.row.disqualifiedquantity)
          //   }else {
          //     return h('div',[
          //       h('InputNumber',{
          //         props: {
          //             //将单元格的值给Input
          //             'v-model':params.row.disqualifiedquantity,
          //             'min':0,
          //             'value':params.row.disqualifiedquantity,
          //             },
          //         style: {
          //           width:"60px",
          //         },
          //       on:{
          //            'on-change':(value)=> {
          //
          //              if((params.row.originquantity != null &&value > params.row.originquantity) || (params.row.checkquantity != null && value > params.row.checkquantity)){
          //                console.log(params.row.checkquantity)
          //                params.row.disqualifiedquantity = null
          //                alert('不合格数量不能大于库存数量和盘点数量')
          //              }else {
          //                params.row.disqualifiedquantity = value
          //              }
          //               this.tableColumnsDetail.data[params.row._index] = params.row
          //           },
          //
          //         }
          //         }
          //       )]);
          //   }
          //
          //
          //    }},




          {title: '实际盘点开始时间',key: 'checkstarttime',width:170,align: 'center'},
          {title: '实际盘点结束时间', key: 'checkendtime',width:170, align: 'center' },

          {title: '是否锁库',key: 'islock',width:110,align: 'center' ,
            render: (h, params) => {
              return h('div', '是' )
            }
          },
// {title: '备注 (差异说明)',key: 'remark',align: 'center'}
{title: '备注 (差异说明)',width:300,key: 'remark',align: 'center', render: (h, params) => {

   if(this.transport.approveStatus == "未审批"){
     return h('div',{},'')
   }
   //行数据的状态为"盘库完成"
   if(params.row.teststatus == 'CDS3'){
      return h('div',{},params.row.remark)
   }
   return h('Input',{
       style:{
         width:'240px'
       },
       props: {
           // type:'text',
           //将单元格的值给Input
           value:params.row.remark,
           // 'v-model':params.row.remark,
          // 'element-id':"itemcode_"+this.tableColumnsDetail.data[params.index].checkdetailid
       },
       on:{
           //  'on-change':(event) => {
           //
           //
           //
           // },
           'on-blur':(e)=>{
             this.detailRemarkChange(event.target.value,params.row._index)
           }
       }
     })
   }

 },

          // {title: '操作', key: 'action',align: 'center', width: 100,
          //   render: (h, params) => {
          //     if(params.row.teststatus == 'CDS2'){
          //       return h('a',{
          //         on: {
          //           click: () => {
          //             this.endIndex = params.row._index
          //              this.endCheck(params.row)
          //           }
          //         }
          //       },'盘点结束')
          //     }else{
          //       return h('a',{
          //         style: {
          //           color: '#cccccc'
          //         },
          //         on: {
          //           click: () => {
          //             alert("未开始盘点或已盘点结束")
          //           }
          //         }
          //       }, '盘点结束')
          //     }
          //   }
          // }
        ]
      }
    }
  },
  created(){        //渲染成功之后的专改

  },
  updated(){

  },
  computed:{

  },
  methods:{
    testtest(){

    },
    checkTypeChange(){//盘库类型改变
      if(this.formFilter.checktype == 'CD01' || this.formFilter.checktype == 'CD05'){
        this.formFilter.locktype = 'LD01'
        setTimeout(() => {
            this.lockDisable = true
        }, 100);
        if(this.tableColumnsDetail.data.length > 0){
          this.tableColumnsDetail.data[0].locktype = "LD01"
        }
      }else {
        this.lockDisable = false
        if(this.tableColumnsDetail.data.length > 0){
          this.tableColumnsDetail.data[0].locktype = "LD03"
        }
      }
    },



      approveAllCheck(){//审批通过
        if(this.formFilter.checkstarttime == null ||  this.formFilter.checkstarttime == ''){
          this.$Message.error("计划盘点开始日期不能为空")
        }else if (this.formFilter.checkendtime == null || this.formFilter.checkendtime == '') {
          this.$Message.error("计划盘点结束日期不能为空")
        }else {
          this.getAllStatus()
          this.formFilter.status = ''
          axios.post(sessionStorage.http+'/approveAllCheck?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
          .then((res) =>{
            console.log("全盘查看数据")
            console.log(res)
            //this.formFilter = res.data
            this.trimCheckStartTime()
            //更新主页面的盘库信息
            document.getElementById("reBtn").click()
            setTimeout(()=>{
            this.getCheckStatus()
          },50)
            iview.Message.success({
              content:res.message,
              duration:5,
              onClose:function(){

              }
            })
          })
          .catch((err) => {
             // iview.Message.error({
             //   content:'网络或服务器错误',
             //   duration:5
             // });
          })
        }
    },

//展示任务详情
showTaskDetail(row){
  console.log("行信息")
  console.log(row)
  if (row.teststatus != null && (row.teststatus == 'CDS2' || row.teststatus == 'CDS3')) {
    this.$refs.checkTaskDetail.show(row.checkdetailid);
  }else {
    this.$Message.error("尚未生成任务")
  }
},

getAllStatus(){
  let create = {label:"创建",value:"CDS1"}
  let onCheck = {label:"盘库中",value:"CDS2"}
  let complete = {label:"盘库完成",value:"CDS3"}
  this.checkStatusOptions = []
  this.checkStatusOptions.push(create)
  this.checkStatusOptions.push(onCheck)
  this.checkStatusOptions.push(complete)
},
trimCheckStartTime(){
  for (var i = 0; i < this.allCheckDetail.length; i++) {
    this.allCheckDetail[i].checkstarttime = this.formFilter.checkStartTime
  }

},
rejectAllCheck(){//驳回
  axios.post(sessionStorage.http+'/rejectAllCheck?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
  .then((res) =>{
    this.formFilter = res.data
    //更新主页面的盘库信息
    document.getElementById("reBtn").click()
    iview.Message.success({
      content:res.message,
      duration:5,
      onClose:function(){

      }
    })
  })
  .catch((err) => {
     // iview.Message.error({
     //   content:'网络或服务器错误',
     //   duration:5
     // });
  })
},
getCheckStatus(){
  this.getAllStatus()
  if(this.formFilter.isAllCheck == '1' ){
    if(this.formFilter.status != 'CDS1'){
      this.checkStatusOptions.splice(0,1)
    }else{
      this.checkStatusOptions.splice(1,2)
    }
  }else {
    if(this.formFilter.status != 'CDS1'){
      this.checkStatusOptions.splice(0,1)
    }else{
      this.checkStatusOptions.splice(2,1)
    }
  }
},
startCheck(){//开始盘点
  let checkOrderPack = {loginStatus:`${sessionStorage.loginStatus}`,checkOrder:this.formFilter,checkDetailOrders:this.tableColumnsDetail.data}
  axios.post(sessionStorage.http+'/startCheck?loginStatus='+`${sessionStorage.loginStatus}`,checkOrderPack)
  .then((res) =>{
    if(res.data == null){
    }else {
      res.data.checkOrder.loginStatus = this.formFilter.loginStatus
      this.formFilter = res.data.checkOrder
      this.tableColumnsDetail.data = res.data.checkDetailOrders

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
endCheck(checkDetail){//结束盘点
  checkDetail.loginStatus = this.formFilter.loginStatus
  axios.post(sessionStorage.http+'/endCheck?loginStatus='+`${sessionStorage.loginStatus}`,checkDetail)
  .then((res) =>{
    console.log(res.data)
    console.log(res.message)
    if(res.data != null){
      //console.log(this.endIndex)
      res.data.rowid = this.endIndex
      this.tableColumnsDetail.data.splice(this.endIndex,1)
      this.tableColumnsDetail.data.splice(this.endIndex,0,res.data)
      iview.Message.success({
        content:res.message,
        duration:5,
        onClose:function(){
        }
      })
    }else {
      iview.Message.error({
        content:res.message,
        duration:5
      });
    }

  })
  .catch((err) => {
     iview.Message.error({
       content:'网络或服务器错误',
       duration:5
     });
  })
},
//查询盘点明细
queryCheckDetail(){
 axios.post(sessionStorage.http+'/queryCheckDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.transport)
 .then((res) =>{

   this.formFilter = res.data.checkOrder
   //将盘库单状态定义给this.formFilter的初始状态
   this.formFilter.originStatus = res.data.checkOrder.status;

   //将盘库明细定义给弹框要显示的数据
   this.dataNotPage = res.data.checkDetailOrders
   this.formFilter.pagetotal = this.dataNotPage.length

   this.formFilter.pageSize = 20
   this.formFilter.curPage = 1
   //设置当前页=1 ,每次查询默认为第一页的
 // this.formFilter.curPage = 2;

 console.log("所有的数据")
 console.log(this.dataNotPage)
 console.log(this.formFilter.pagetotal)
 console.log(this.formFilter.curPage)

   this.tableColumnsDetail.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,(this.formFilter.curPage)*this.formFilter.pageSize)
   console.log("显示的数据")
   console.log(this.tableColumnsDetail.data)

   //在初始化页面，将查询到的盘库明细赋值给选中的行数据，保存时使用
   this.allCheckDetail = res.data.checkDetailOrders

   if(this.formFilter.checktype == 'CD01' || this.formFilter.checktype == 'CD05'){
       this.lockDisable = true
   }
 })
 .catch((err) => {
    iview.Message.error({
      content:'网络或服务器错误',
      duration:5
    });
 })
},




    //弹框初始化 checkrecordid->盘库id  approveStatus->盘库审批状态
    show(row){



      this.transport = row;
      // this.formFilter.checkrecordid = row.checkrecordid;
      console.log("onDoubleClick事件的结果")
      console.log(this.transport)

      this.queryCheckDetail()
      this.detail = true;
      //this.loading = false;

    },


    ok(){

      this.loading = false;
    },
    cancel(){
     document.getElementById("queryCheckOrderData").click()
      //alert(113)
      //this.loading = false;
    },

    //提交按钮
    submit(){
      if(this.formFilter.status == '盘库中'){

      }
    },


    //提交按钮提交数据
  saveAlterCheckOrder(){
    console.log("查看状态")
    console.log(this.formFilter.originStatus);
    console.log(this.formFilter.status);


      //盘点状态是否正确
      let pass = true
      //是否开始盘点
      let startCheck = false

      if(this.formFilter.originStatus == 'CDS1' && this.formFilter.status == 'CDS3'){
        pass = false
        this.$Message.error("盘点状态不能从创建直接变成盘库完成")
      }else if (this.formFilter.originStatus == 'CDS1' && this.formFilter.status == 'CDS2') {//开始盘点
        startCheck = true
        for(let value of this.allCheckDetail){
          //将所有盘点明细的状态改为"CDS2"->"盘库中"
          value.teststatus = 'CDS2'
        }
        this.checkOrderPack = {loginStatus:`${sessionStorage.loginStatus}`,checkOrder:this.formFilter,checkDetailOrders:this.allCheckDetail}
        // this.$Message.success("可能需要较长时间，请耐心等待")
      }else if ((this.formFilter.originStatus == 'CDS1' && this.formFilter.status == 'CDS2') || (this.formFilter.originStatus == 'CDS2') || (this.formFilter.originStatus == 'CDS2' && this.formFilter.status == 'CDS3')) {
        if(this.selectedRows.length == 0){
          pass = false
          this.$Message.error("请选择需提交数据的明细行")
        }

        //当状态从"盘库中"变为"盘库完成"，就需要勾选按钮了
        this.getCompleteDetail();
        if(this.choosenDetail.length == 0){
          pass = false
          this.$Message.error("请选择可完成盘点的明细行")
        }else{
          for(let value of this.choosenDetail){
            value.teststatus = 'CDS3'
          }
          this.checkOrderPack = {loginStatus:`${sessionStorage.loginStatus}`,checkOrder:this.formFilter,checkDetailOrders:this.choosenDetail}
        }
      }else {
        //当状态从"盘库中"变为"盘库中"，也需要勾选按钮
        // this.getChoosenDetail()
        for(let value of this.selectedRows){
          value.teststatus = 'CDS2'
        }
        this.checkOrderPack = {loginStatus:`${sessionStorage.loginStatus}`,checkOrder:this.formFilter,checkDetailOrders:this.selectedRows}
      }

      if(pass){
        this.loading = true

        axios.post(sessionStorage.http+'/saveAlterCheckOrder?loginStatus='+`${sessionStorage.loginStatus}`,this.checkOrderPack)
        .then((res) =>{
          this.loading = false


          //更新盘库单原始状态
         this.formFilter.originStatus = res.data.checkOrder.status;


          // console.log("查看相关数据")
          // console.log(res.data.checkDetailOrders)
          // console.log("hhha")
          //
          //   //判定对应的盘库单的状态
          //   let num = 0;
          //   let num1 = 0;
          //   for(let i=0;i<res.data.checkDetailOrders.length;i++){
          //     if(res.data.checkDetailOrders[i].teststatus == 'CDS2'){
          //       num++;
          //       break;
          //     }
          //     if(res.data.checkDetailOrders[i].teststatus == 'CDS3'){
          //       num1++;
          //     }
          //   }
          //
          //   //实时更改盘库单的状态
          //   this.terminalCheckOrder.checkrecordid = this.transport.checkrecordid;
          //   console.log("num的值和状态")
          //   console.log(num);
          //   console.log(this.transport.status)
          //
          //   if(num != 0 && this.transport.checkDetailOrders.status == '创建'){
          //     this.terminalCheckOrder.status = 'CDS2';
          //     //更新盘库单状态
          //     this.updateCheckOrderStatus(this.terminalCheckOrder);
          //   }else{
          //     if(num1 == res.data.checkDetailOrders.length && this.transport.status == '盘库中'){
          //       this.terminalCheckOrder.status = 'CDS3';
          //
          //       //更新盘库单状态
          //       this.updateCheckOrderStatus(this.terminalCheckOrder);
          //       //更新货位状态
          //
          //     }
          //   }

          //更新弹框页面的数据
          this.queryCheckDetail()

          //更新主页面的盘库信息
          document.getElementById("reBtn").click()

          iview.Message.success({
            content:res.message,
            duration:1,
            onClose:function(){
            }
          })

        })

      }


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
     formartDate2(date){//日期格式化
       let  Y = date.getFullYear() + '-'
       let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
       let  D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
       let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
       let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
       let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
       return Y + M + D + h + m + s
     },
     startDateChanged(){//申请日期起始日期改变
      if(this.formFilter.checkstarttime != ''){
        this.formFilter.checkStartTime = this.formartDate(this.formFilter.checkstarttime)
        let now = new Date()
        if(this.formFilter.checkStartTime <= this.formartDate(now)){
          this.$Message.error("起始日期只能为当前之后的日期")
          this.formFilter.checkstarttime = undefined
          this.formFilter.checkStartTime = null
        }
      }else {
        this.formFilter.checkStartTime = null
      }
      if(this.formFilter.checkstarttime != '' && this.formFilter.checkendtime != ''){
        if(this.formartDate(this.formFilter.checkstarttime) > this.formartDate(this.formFilter.checkendtime)){
          this.$Message.error("开始日期不能大于结束日期")
                this.formFilter.checkstarttime = undefined
                this.formFilter.checkStartTime = null
        }
      }
    },
    endDateChanged(){//申请日期结束日期改变
      if(this.formFilter.checkendtime != ''){
        this.formFilter.checkEndTime = this.formartDate(this.formFilter.checkendtime)
      }else {
        this.formFilter.checkEndTime = null
      }
      if(this.formFilter.checkstarttime != '' && this.formFilter.checkendtime != ''){
        if(this.formartDate(this.formFilter.checkstarttime) > this.formartDate(this.formFilter.checkendtime)){
          this.$Message.error("结束日期不能小于开始日期")
               this.formFilter.checkendtime = undefined
               this.formFilter.checkEndTime = null
        }
      }
    },

    // 翻页事件-xj
         handleChangePage (value) {
           this.formFilter.curPage = value;
           // if(this.formFilter.checktype == 'CD02'){
           //   this.getAllStockCheck();
           // }else{
             this.tableColumnsDetail.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
           // }

           // console.log(value)
         },

         //改变每页大小事件-xj
         handleChangePageSize(value){
           this.formFilter.pageSize = value;
           console.log(this.formFilter.checktype)
           //如果是全盘的话
           // if(this.formFilter.checktype == 'CD02'){
           //   this.getAllStockCheck();
           // }else{
             this.tableColumnsDetail.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
           // }
         },
    //特定情况下更新盘点单的状态
    updateCheckOrderStatus(terminalCheckOrder){
      console.log("查看后续更新的盘点的状态")
      console.log(terminalCheckOrder)
      axios.post(sessionStorage.http+'/updateCheckOrderStatus?loginStatus='+`${sessionStorage.loginStatus}`,terminalCheckOrder)
      .then((res) =>{

      })
    },
    //选择盘库完成时的数据校验
       getCompleteDetail(){
         this.choosenDetail = []
         //this.alterIndex = []
         for (var i = 0; i < this.selectedRows.length; i++) {
           if(this.selectedRows[i].checkquantity != null && this.selectedRows[i].teststatus == 'CDS2'){
             this.choosenDetail.push(this.selectedRows[i])
             //this.alterIndex.push(this.allCheckDetail[i].rowid -1)
           }
         }
       },





       deleteCheckDetail(){//删除选中的行
        this.delete_confirm = false
        this.deleteDetails = []
        for(let i = 0; i < this.selectedRows.length ; i++){
          if(this.selectedRows[i].teststatus == 'CDS3'){
            alert("第"+(i+1)+"条数据已完成盘点，不可删除")
          }else {
            this.deleteDetails.push(this.selectedRows[i])
          }
        }
        if(this.deleteDetails.length > 0){
          this.couldDelet = 'false'
          let checkPack = {loginStatus:this.formFilter.loginStatus,checkDetailOrders:this.deleteDetails}
          axios.post(sessionStorage.http+'/deleteCheckDetail?loginStatus='+`${sessionStorage.loginStatus}`,checkPack)
          .then((res) =>{
            console.log("开始")
            for (var i = this.deleteDetails.length -1; i >= 0 ; i--) {
              this.tableColumnsDetail.data.splice(this.deleteDetails[i].rowid,1);
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


        }
      },
    onSelectionChange (rows) {//将选中的行记录下来
      if(rows.length > 0){
        this.couldDelet = 'true'
      }else {
        this.couldDelet = 'false'
      }

      this.selectedRows = rows

     },
    remarkChange(){//备注表头改变
      if(this.formFilter.remark.length > 50){
        this.formFilter.remark = this.formFilter.remark.substr(0,50)
      }
    },
    detailRemarkChange(value,index){
      if(value.length > 50){
        this.tableColumnsDetail.data[index].remark = value.substr(0,50)
      }else {
        this.tableColumnsDetail.data[index].remark = value
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
      this.noValueFilter()
      let detail = {select:false,storageid:'',itemcode:'',itemname:'',originquantity:'',unit:'',checkquantity:'',differquantity:'',disqualifiedquantity:'',checkstarttime:'',checkendtime:'',trayno:'',islock:'0', remark:'',checkdetailid:this.tableColumnsDetail.data.length}
      this.tableColumnsDetail.data.push(detail)
      this.selectedRows = []
    },



    showEndCheckdetail(){//将商品库存显示到表格
     this.tableColumnsdetail.data.splice(this.endIndex,1)
      for (var i = 0; i < this.checkdetails.length; i++) {
        this.tableColumnsdetail.data.splice(this.endIndex,0,this.checkdetails[i])
      }
      for (var i = 0; i < this.tableColumnsDetail.data.length; i++) {
        this.tableColumnsDetail.data[i].checkdetailid = i
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
.inputPopLable{
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
.blackLabel{
  display: inline-block;
  text-align: right;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.outBox{
  display: inline-block;
  line-height: 40px;
  // width: 240px;
}
.blank{
  display: inline-block;
  width: 25px;
}
span{
  // border: 1px solid red;
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
    .detailTakeStock{
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
       // .textOutput{
       //    display: inline-block;
       //    width: 140px;
       //  }
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
         bottom: 7px;
       }
       .ivu-select-selection{
         border:1px solid #888888;
         bottom:7px !important;
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
           bottom: -4px;
       }
      .ivu-input-icon-normal+.ivu-input{
        width: 120px;
      }
      .ivu-table-cell{
        overflow: inherit;
      }
     #tableDetailId .ivu-select{
        width: 60px !important;
      }
      .detailTakeStockPage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
 </style>
