detail<template lang="html">
  <Modal class="recordDetail"
      v-model="detail"
      :loading='loading'
      footer-hide
      @on-ok="ok"
      @on-cancel="cancel" width='90%'
      ok-text='提交'
      cancel-text='关闭'>
      <p slot="header" style="text-align:center;font-size:18px">
            <span>盘点记录详情</span>
      </p>
    <Form ref="formFilter" :model="formFilter" :label-width="90" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <table  height="20px">
        <tr>
          <!-- <td class=" yaHei18"  style="width:50px" align="right" >仓库&nbsp;&nbsp;</td>
          <td>
            <span class=" yaHei18"  style="width:50px" align="right">{{formFilter.warehouseid}}</span>
          </td> -->
          <!-- <td class="inputPopLable yaHei18">库区&nbsp;&nbsp;</td>
          <td>
            <span class=" yaHei18"  style="width:50px" align="right">{{formFilter.districtid}}</span>
          </td> -->

          <td class="inputPopLable yaHei18">供应商/车间&nbsp;&nbsp;</td>
          <td>
            <span class=" yaHei18"  style="width:50px" align="right">{{formFilter.customerid}}</span>
          </td>
          <td class="inputPopLable yaHei18">盘库类型&nbsp;&nbsp;</td>
          <td>

            <span v-show="this.formFilter.status != 'CDS1' && this.formFilter.checktype == 'CD01'"class=" yaHei18"  style="width:50px" align="right">临时盘</span>
              <span v-show="this.formFilter.status != 'CDS1' && this.formFilter.checktype == 'CD02'"class=" yaHei18"  style="width:50px" align="right">全盘</span>
              <!-- <span v-show="this.formFilter.status != 'CDS1' && this.formFilter.checktype == 'CD03'"class=" yaHei18"  style="width:50px" align="right">全盘</span> -->
          </td>
          <td>
            <td class="inputPopLable yaHei18">锁库方式&nbsp;&nbsp;</td>
            <td>
                <span v-show="this.formFilter.status != 'CDS1' && this.formFilter.locktype == 'LD01'"class=" yaHei18"  style="width:50px" align="right">不锁</span>
                  <span v-show="this.formFilter.status != 'CDS1' && this.formFilter.locktype == 'LD03'"class=" yaHei18"  style="width:50px" align="right">全锁</span>
            </td>
          <td class="inputPopLable yaHei18">创建时间&nbsp;&nbsp;</td>
          <td>
            <span class=" yaHei18"  style="width:50px" align="right">{{formFilter.insertymd}}</span>
          </td>
          <td class="inputPopLable yaHei18"  >备注&nbsp;&nbsp;</td>
          <td>
            <span v-show="this.formFilter.status == 'CDS3' " class="textOutput">{{formFilter.remark}}</span>
          </td>


        </tr>
        <tr>

        </tr>
      </table>


  </Form>

    <Table height=400 border stripe :loading="loading" ref="selection" :columns="tableColumnsDetail.card" :data="tableColumnsDetail.data" @on-selection-change="onSelectionChange" ></Table>
    <br />
    <div class="takeStockRecordDetailPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>


  </Modal>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'
// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      checkDetails:[],
      endIndex:0,//当前结束盘点的表格行
      detailRows:[],//选择的明细行
      detail:false,//用于控制是否显示本弹窗
      loading:false,
      deleteDetails:[],//要删除的明细
      couldDelet:'false',
      detailList:[],

      //库区
      districtList:[],
      districtAllOptions: [],
      districtLoading: false,
      districtOptions: [],
      districtTransition:'',

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
        locktype:'LD01',
        itemcode:'',
        curPage:1,
        pageSize:20,
        loginStatus:`${sessionStorage.loginStatus}`,
        checkrecordid:'',
      },
      tableColumnsDetail: {
        data:[
          {
            rowid:'',
            storageid:'',
            enterdate:'',
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
           // {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
          {title: '序号',key: 'rowid',width: 60,align: 'center'},

          {title: '明细单号',key: 'checkdetailid',width: 300,align: 'center'},
          {title: '货位号',key: 'storageid',width: 100,align: 'center'},
          // {title: '货位状态',key: 'enterdate',width: 90,align: 'center'},
           {title: '批次号',key: 'stocknumber',width: 200,align: 'center'},
          {title: '物料/成品号',key: 'itemcode',width: 200,align: 'center'},
          {title: '物料/成品名称', key: 'itemname',width: 200,align: 'center'},
          {title: '库存数量',key: 'originquantity',width:110,align: 'center'},
          {title: '库存单位',key: 'unit',width:110,align: 'center'},
          {title: '盘点数量',key: 'checkquantity',width: 110, align: 'center',
           render: (h, params) => {
             if(params.row.teststatus == 'CDS3'){
                return h('span',{},params.row.checkquantity)
             }
             return h('div',[
               h('InputNumber',{
                 props: {
                     //将单元格的值给Input
                     'v-model':params.row.checkquantity,
                     'value':params.row.checkquantity,
                     'min':0,
                     },
               on:{
                    'on-change':(value)=> {
                      params.row.checkquantity = value
                   },
                   'on-blur':()=>{
                     this.tableColumnsDetail.data[params.row._index].checkquantity = params.row.checkquantity
                     this.tableColumnsDetail.data[params.row._index].differquantity = params.row.checkquantity - this.tableColumnsDetail.data[params.row._index].originquantity
                   }
                 }
                 }
               )]);
             }},

          {title: '差异数量',key: 'differquantity', width: 110,align: 'center'},

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
          //       on:{
          //            'on-change':(value)=> {
          //              params.row.disqualifiedquantity = value
          //
          //           },
          //           'on-blur':()=>{
          //             if(params.row.disqualifiedquantity > params.row.originquantity || params.row.disqualifiedquantity > params.row.checkquantity){
          //               params.row.disqualifiedquantity = null
          //               this.tableColumnsDetail.data[params.row._index].disqualifiedquantity = null
          //               alert('不合格数量不能大于库存数量和盘点数量')
          //             }else {
          //               this.tableColumnsDetail.data[params.row._index].disqualifiedquantity = params.row.disqualifiedquantity
          //             }
          //
          //           }
          //         }
          //         }
          //       )]);
          //   }
          //
          //
          //    }},

          {title: '盘点开始时间',key: 'checkstarttime',width:170,align: 'center'},
          {title: '盘点结束时间', key: 'checkendtime',width:170, align: 'center' },
          {title: '托盘号',key: 'trayno',width:110,align: 'center'},
          {title: '是否锁库',key: 'islock',width:110,align: 'center' ,
          render: (h, params) => {
            if(this.formFilter.status != 'CDS1'){
              if(params.row.islock == '0'){
                return h('span',{},'否')
              }else {
                return h('span',{},'是')
              }
            }
                return h('Select', {
                  props:{
                    'value':this.tableColumnsDetail.data[params.index].islock
                  },
                  //props,
                 on: {
                        'on-change':(isLock) => {
                          this.tableColumnsDetail.data[params.index].islock = isLock
                          console.log(isLock)
                            console.log(this.tableColumnsDetail.data[params.index].islock)
                        }
                  },
                   },
                 [
                  h('Option',{
                      props: {
                           value: '0'
                      }
                   },'否'),
                    h('Option',{
                        props: {
                            value: '1'
                         }
                     },'是')
               ]);
            },
          },

          {title: '备注',key: 'remark',width:200,align: 'center', render: (h, params) => {
            if(params.row.teststatus == 'CDS3'){
               return h('span',{},params.row.remark)
            }
             return h('div',[
               h('Input',{
                 props: {
                     //将单元格的值给Input
                     'v-model':params.row.itemcode,
                     'element-id':"itemcode_"+this.tableColumnsDetail.data[params.index].checkdetailid
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
    allotId(){//给行数据分配行号
      for (var i = 0; i < this.detailList.length; i++) {
        this.detailList[i].rowid = i+1
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
          this.allotId()
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
    queryCheckDetail(){//查询盘点明细
      axios.post(sessionStorage.http+'/queryCheckRecorderDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        res.data.checkOrder.loginStatus = this.formFilter.loginStatus
        res.data.checkOrder.curPage = this.formFilter.curPage
        res.data.checkOrder.pageSize = this.formFilter.pageSize
        this.formFilter = res.data.checkOrder
        this.detailList = res.data.checkDetailOrders
        this.total = res.data.checkDetailOrders.length
        this.allotId()
        this.trimPageData()
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    queryCheckRecorderDetail(){//查询盘点明细
      axios.post(sessionStorage.http+'/queryCheckRecorderDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        res.data.checkOrder.loginStatus = this.formFilter.loginStatus
        this.formFilter = res.data.checkOrder
        this.tableColumnsDetail.data = res.data.checkDetailOrders
        this.allotId()
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    show(checkrecordid){
      this.formFilter.checkrecordid = checkrecordid
      this.queryCheckDetail()
      this.detail = true;
      //this.loading = false;
    },
    ok(){

      this.loading = false;
    },
    cancel(){
      //document.getElementById("queryCheckOrderData").click()
      //alert(113)
      //this.loading = false;
    },
    saveAlterCheckOrder(){
      let checkOrderPack = {checkOrder:this.formFilter,checkDetailOrders:this.tableColumnsDetail.data}
      axios.post(sessionStorage.http+'/saveAlterCheckOrder?loginStatus='+`${sessionStorage.loginStatus}`,checkOrderPack)
      .then((res) =>{
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

    deleteCheckDetail(){//删除选中的行
      this.deleteDetails = []
      for(let i = this.detailRows.length - 1; i >= 0 ; i--){
        if(this.detailRows[i].teststatus == 'CDS3'){
          alert("第"+(i+1)+"条数据已完成盘点，不可删除")
        }else {
          this.deleteDetails.push(this.detailRows[i])
          this.tableColumnsDetail.data.splice(this.detailRows[i].rowid,1);
        }
        if(this.deleteDetails.length > 0){
          this.couldDelet = 'false'
          axios.post(sessionStorage.http+'/deleteCheckDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.deleteDetails)
          .then((res) =>{
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
          this.allotId()

        }
      }
    },
    onSelectionChange (rows) {//将选中的行记录下来
      if(rows.length > 0){
        this.couldDelet = 'true'
      }else {
        this.couldDelet = 'false'
      }
       this.detailRows = rows
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
      this.detailRows = []
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

    handleChangePage (value) {
     this.formFilter.curPage = value
     this.trimPageData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      // const paths = this.$route.path.split('/')
    },

    trimPageData(){
      var startIndex = (this.formFilter.curPage - 1) * this.formFilter.pageSize
      var endIndex = startIndex + this.formFilter.pageSize
      this.tableColumnsDetail.data = []
      for (var i = startIndex; i < this.detailList.length && i <endIndex; i++) {
        console.log(i)
        this.tableColumnsDetail.data.push(this.detailList[i])
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
  // border: 1px solid red;
}
.textOutput{
  display: inline-block;
  margin-top: 10px;
  width: 160px;
  height: 28px;
  font-size: 12px;
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
    .recordDetail{
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
      .takeStockRecordDetailPage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
</style>
