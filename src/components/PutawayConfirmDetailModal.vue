<template lang="html">
  <Modal
      v-model="detailconfirm"
      :loading='loading' width='1400px' footer-hide>
      <p slot="header" style="text-align:center;font-size:16px">
            <span>入库记录详情</span>
      </p>
      <div class="detailconfirm">
       <Form ref="formFilter" :model="formFilter" :label-width="115" inline style="text-align:left;" >
          <!-- <Row>
            <Col span="24">
               <div style="text-align:left;"><font style="font-size:16px;padding:0px" color="#59a6fe">入库托盘信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <font style="font-size:12px;" color="#59a6fe">创建人:</font>{{formFilter.name}}</div>
            </Col>
          </Row> -->
          <Card>
            <p slot="title">组盘信息</p>
          <Row >
            <Col span="24">
                 <Row type='flex' justify="end">
                   <Col span="5">
                     <div class="status">
                       <Form-item label="入库单号">
                         <label>{{formFilter.incomingNotice}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="入库单明细号">
                         <label>{{formFilter.godownEntryId}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="物料号">
                         <label>{{formFilter.materialNo}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="批次号">
                         <label>{{formFilter.stockBatch}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="移动类型">
                         <!-- <label>{{formFilter.movetype}}</label> -->
                         <label  v-if="this.formFilter.movetype == 'GPT01'">空托盘入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT02'">二次包装入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT03'">其他入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT04'">拼盘入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT05'">贴签证入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT06'">采购入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT07'">车间退库入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT08'">车间停产退库入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT09'">车间异常退库入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT010'">生产入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT011'">销售退货入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT012'">转标准入库</label>
                         <label  v-if="this.formFilter.movetype == 'GPT013'">暂存入库</label>
                       </Form-item>
                     </div>
                   </Col>
                 </Row>
                 <Row type='flex' justify="end">

                   <Col span="5">
                     <div class="status">
                       <Form-item label="入库日期">
                         <label>{{formFilter.createdate}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="质量状态">
                         <!-- <label>{{formFilter.qualityStatus}}</label> -->
                         <label  v-if="this.formFilter.qualityStatus == 'Q'">待检测</label>
                         <label  v-if="this.formFilter.qualityStatus == 'N'">非限制</label>
                         <label  v-if="this.formFilter.qualityStatus == 'F'">冻结</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="单据来源">
                         <label>{{formFilter.resource}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="入库数量">
                         <label>{{formFilter.quantity}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="入库状态">
                         <label>入库完成</label>
                       </Form-item>
                     </div>
                   </Col>
                   <!-- <Col span="5">

                   </Col> -->
                 </Row>

             </Col>
           </Row>
           </Card>
           <!-- <Row>
             <Col span="24" style="text-align:right;">
               <Button shape="circle" type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="putawayConfirm">上架确认</Button>
               <Button shape="circle" type="primary" style="margin-left:10px;width:120px;height:28px;background-color:#5aa5ff;padding:0px;border-radius:14px;" @click="finishOrder">入库完成</Button>
             </Col>
           </Row> -->
           <br/>
           <Row>
             <Col span="24">
                 <!-- <Table  ref="selection" height='260' :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change=""></Table> -->
                 <Table height="300" ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change=""></Table>
             </Col>
           </Row>
       </Form>
       <div slot="footer">

       </div>
     </div>
  </Modal>
</template>

<script>
import axios from 'axios'
import iview from 'view-design' //
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      formFilter: {
      },
      checkBtn:true,
      needdelrow:{},
      delete_confirm:false,
      supIsAble:false,
      cusIsAble:false,
      detailconfirm:false,
      loading:true,
      lDetail:1,
      tableColumns: {
        card: [
          {title: '序号',key: 'lineNo',width: 70,align: 'center',render: (h, params) => {
            return h('div',+params.row._index+1);
            }},
            {title: '入库单明细号', key: 'godownEntryDetailId',width:150,align: 'center'},          //新增
            {title: '组盘明细号',key: 'trayId',width: 150 ,align: 'center'},
            {title: '物料号',key: 'godownEntryId', width: 150,align: 'center'},
            {title: '批次号', key: 'warehouseId',width: 150,align: 'center' },
          {title: '托盘号',key: 'trayNumber',width:150,align: 'center'},
          // {title: '仓库',key: 'typeName', width: 150,align: 'center'},
          // {title: '库区',key: 'orderholder',width:150,align: 'center'},
          {title: '货位', key: 'storageId',width:150,align: 'center'},   //新增
          {title: '贴签证数', key: 'backupfield4',width:80,align: 'center'},          //新增
          {title: '合格证数',key: 'backupfield5',width: 80 ,align: 'center'},
          {title: '不合格证数',key: 'unqualified', width: 80,align: 'center',render:(h,params)=>{
            return h("div",params.row.backupfield4-params.row.backupfield5)
          }},
          {title: '不合格数',key: 'updateYmd',width:80,align: 'center'},
          {title: '合格数',key: 'qualified',width:120,align: 'center',render:(h,params)=>{
            let aaa = +(params.row.predictQuantity)-(+params.row.updateYmd);
            params.row.qualified = +(aaa.toFixed(3))+0;
            return h("div",params.row.qualified)
          }},
          {title: '入库数量',key: 'predictQuantity',width: 80 ,align: 'center'},
          {title: '入库件数',key: 'districtId',width: 80 ,align: 'center'},
          {title: '计量单位',key: 'backupfield1',width: 100 ,align: 'center'},
          {title: '包装规格',key: 'updateId',width: 100 ,align: 'center'},
          {title: '组盘人',key: 'remark', width: 100,align: 'center'},
          {title: '组盘时间',key: 'groupVendorDate',width: 130 ,align: 'center'},
          {title: '状态', key: 'vendorStatus',width:100,align: 'center',render: (h, params) => {
                    if(params.row.vendorStatus=='zpzh'){
                      return h('span','组盘中');
                    }else if(params.row.vendorStatus=='zpwc'){
                      return h('span','组盘完成');
                    }else if(params.row.vendorStatus=='rkwc'){
                      return h('span','入库完成');
                    }
            }}        //新增

        ],
         data:[]

       }
    }
  },
  methods:{
    //入库完成
    finishOrder(){
      if(this.checkBtn){
        this.checkBtn = false
        setTimeout(() => {
          this.checkBtn = true
        },3000)
        this.loading = false
        setTimeout(()=>{this.loading = true},0);
        axios.post(sessionStorage.http+`/finishOrder?loginStatus=${sessionStorage.loginStatus}`,this.tableColumns.data)
          .then((res) =>{
            console.log(res);
            if(res.message == '2'){
              iview.Message.error({
                content:"尚未确认上架,请确认上架后,再入库完成."
              });
              this.detailconfirm = true;
              setTimeout(()=>{this.loading = true},0);
              this.loading = false;
              return;
            }
            iview.Message.success({
              content:"入库完成。"
            });
            this.detailconfirm = false;
            document.getElementById('searchConfirm').click();
          })
          .catch((err) => {
             iview.Message.error({
               content:err.message,
               duration:5
             });
          })
        }else{
          iview.Message.error({
            content: '请不要重复操作!',
            duration:5
          })
        }


    },
    //显示弹框
    show(row){
      console.log(row);
      this.detailconfirm = true;
      this.formFilter = row;
      // this.needdelrow = row;
      // this.tableColumns.data = [];
      // 查询入库单明细下得所有组盘信息
      axios.get(sessionStorage.http+`/getOrderTrayDetail?godownEntryDetailId=${this.formFilter.godownEntryId}`)
      .then((res) =>{
        console.log(res);
        this.tableColumns.data = res.data;
      })

    },
    putawayConfirm(){
        axios.post(sessionStorage.http+`/confirmOrder?loginStatus=${sessionStorage.loginStatus}`,this.tableColumns.data)
          .then((res) =>{
            console.log(res);
            if(res.message == '2'){
              iview.Message.error({
                content:"已确认上架,请勿重复操作"
              });
              return;
            }
            iview.Message.success({
              content:"已确认上架。"
            });
            this.show(this.needdelrow);
          })



    },
    cancel(){},
    //得到时间
    getCreatDate(createdate){
      this.formFilter.createdate =changeDate(createdate);
      // console.log(createdate);
    },
    //修改时间样式
    changeDate(dateA) {
        var dateee = new Date(dateA).toJSON();
        var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        return date;
    },
    changedate(date){
        var res = '';
        if(date != null || date != ''){
        res = date.substring(0,4)+"-"+date.substring(4,6)+"-"+date.substring(6,8);
        }
        return res;

    }
  },

  created(){
    Array.prototype.indexOfData = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i].lineNo == val) return i;
        }
        return -1;
    },
    Array.prototype.remove = function(val) {
      var index = this.indexOfData(val);
      if (index > -1) {
      this.splice(index, 1);
      }
    }
  }
}
</script>

<style lang="less">
.detailconfirm{
  .ivu-form-item-content{
    line-height: 43px;
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
        width: 160px;
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
       line-height: 50px;
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
          right:45px;
      }
     .ivu-input-icon-normal+.ivu-input{
       width: 120px;
     }
}
</style>
<style lang="less" scoped>
    .font{
      position: absolute;
      left: -75px;
    }
    .font1{
      position: absolute;
      left: -70px;
    }
    .font2{
      position: absolute;
      left: -60px;
    }
    .font3{
      position: absolute;
      left: -50px;
    }
    .fontdetail{
      position: absolute;
      left: -150px;
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
