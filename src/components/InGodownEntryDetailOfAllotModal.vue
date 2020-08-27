<template lang="html">
  <Modal v-model="detail" :loading='loading'width='1400px' :mask-closable='false'>
  <p slot="header" style="text-align:center;font-size:16px">
        <span>入库通知单明细</span>
  </p>
  <div class="ingodownentrydetailofallotmodel">
    <Form ref="formFilter" :model="formFilter" :label-width="120" inline style="text-align:left;" >

      <!-- <Row>
        <Col span="24">
          <div style="text-align:left;"><font color="#59a6fe" style="font-size:16px">入库通知单详情</font></div>
        </Col>
      </Row> -->

      <Card>
        <p slot="title">入库通知单信息</p>
      <Row>
        <Col span="24">
             <Row type='flex' justify="end">
               <Col span="5">
                   <Form-item label="入库通知单号" prop="order_id" status-icon >
                     <label style="font-size:12px;line-height:12px;">{{formFilter.ingodownentryid}}</label>
                   </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="相关单据号">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="通知单状态">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="预定入库日期">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="4">
                 <Form-item label="实际入库日期">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
             </Row>
             <Row type='flex' justify="end">
               <Col span="5">
                 <Form-item label="采购订单号">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="移动类型">
                  <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="供应商代码">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="供应商描述">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="4">
                 <Form-item label="车间代码">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <!-- <Col span="5">

               </Col> -->
             </Row>
             <Row type='flex' justify="end">
               <Col span="5">
                 <Form-item label="车间描述">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="交货人">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="收货部门">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="收货人">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="4">
                 <Form-item label="生产厂家名称">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
             </Row>
             <Row type='flex' justify="end">
               <Col span="5">
                 <Form-item label="单据来源">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="是否实物不入库">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="备注" style="width: 415px;">
                   <label style="font-size:12px">{{formFilter.typeName}}</label>
                 </Form-item>
               </Col>
               <Col span="9">
                 <!-- <Form-item label="生产厂家名称">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item> -->
               </Col>
             </Row>
          </Col>
      </Row>
      </Card>
      <Row>
        <Col span="6">
          <!-- <Button shape="circle" style="width:120px;height:28px;-color:#b4b4b4" disabled @click="" id='createtray'><font style="size:24px">生成托盘</font></Button> -->
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="24">
          <Table  ref="selection" height='260' stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>
        </Col>
      </Row>
    </Form>
  </div>
  <div slot="footer">
    <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="ok">分配托盘</Button>
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
      //重复点击使用
      checkBtn:true,
      //生成托盘的数据
      needdelrow:[],
      delete_confirm:false,
      supIsAble:false,
      cusIsAble:false,
      detail:false,
      loading:true,
      taskList:[
        {
          taskid:'',
          typename:''
        }
      ],
      customerList:[
        {
          customerid:'',
          customername:''
        }
      ],
      supplierList:[
        {
          supplierid:'',
          suppliername:''
        }
      ],
      deptList:[
        {
          sectorid:'',
          sectorname:''
        }
      ],
      formFilter: {
        cur_page:1,
        num:1,
        creater:''
      },
      lDetail:1,
      tableColumns: {
        card: [
          {title: '选择',key: 'select',width:50,type: 'selection',align: 'center'},
          {title: '序号',key: 'lineNo',width:75,align: 'center',render:(h,params)=>{
            return h("div",+params.row._index + 1)
          }},
          {title: '物料/产品号',key: 'conversionRate',width:130,align: 'center'},
          {title: '物料/产品描述',key: 'productname',width:135, align: 'center'},
          {title: '厂家批号', key: 'invUomCode',width:100,align: 'center',render:(h,params)=>{
            let text = '';
            if(params.row.invUomCode == '0'){
              text= '个';
            }
            else{
              text= '箱';
            }
            return h('div',text)
          }
        },   //新增
        {title: '库存批号', key: 'batchno',width:140,align: 'center'},          //新增
        {title: 'GMP批号', key: 'recvquantity',width:140,align: 'center'},          //新增
        {title: '质量状态',key: 'allotcount',width:210,align: 'center',render:(h,params)=>{
          if(params.row.iscreate == '0'){
            return h('div',[h('Input',{
              props:{
                value:params.row.allotcount,
                'element-id':'allotcount_'+this.tableColumns.data[params.index].lineNo
              },
              on:{
                'on-change':(event)=> {
                  params.row.allotcount = event.target.value;
                  this.tableColumns.data[params.index] = params.row;
                },
                'on-keyup':(e)=>{
                  console.log(e);
                  var value=e.target.value.replace(/\D/g,'');
                  params.row.allotcount = value;
                  this.tableColumns.data[params.index] = params.row;
                  document.getElementById('allotcount_'+this.tableColumns.data[params.index].lineNo).value = value;
                }
              }
            })]);
          }else{
            return h('div',params.row.allotcount);
          }
        }},
        {title: '生产日期',key: 'boxnum',width:210,align: 'center',render: (h, params) => {
          if(params.row.iscreate == '0'){
            return h('div',[h('Input',{
              props:{
                value:params.row.boxnum,
                'element-id':'boxnum_'+this.tableColumns.data[params.index].boxnum
              },
              on:{
                'on-change':(event)=> {
                  params.row.boxnum = event.target.value;
                  this.tableColumns.data[params.index] = params.row;
                },
                'on-keyup':(e)=>{
                  this.checkOrderId(e);
                }
              }
            })]);
          }
          else{
            return h('div',params.row.boxnum);
          }

        }
      },
      {title: '有效期至', key: 'FinishCount', width:210,align: 'center',render:(h,params)=>{
        return h("div",[
          h("div",+params.row.remark1 + " -- " + (params.row.recvquantity - +params.row.remark1)),
        ])
      }},
      {title: '复检日期', key: 'remark', width:140,align: 'center'},
      {title: '交叉污染', key: 'iscreate',width:150, align: 'center',render:(h,params)=>{
        let text = '';
        if(params.row.iscreate == '0'){
          text= '未生成托盘'
        }
        else{
          text= '已完全生成托盘'
        }
        return h('div',text)
      }

    },
    {title: '数量', key: 'remark', width:140,align: 'center'},
    {title: '件数', key: 'remark', width:140,align: 'center'}
  ],
  data:[]

}
}
},
methods:{
  // 只能输入数字-校验入库单号
  checkOrderId(e){
    var value=e.target.value.replace(/[^\w\.\/]/ig,'');
    document.getElementById(e.target.id).value = value;
  },
  //生成托盘的勾选事件
  //勾选触发事件
  onSelectionChange(row){
    this.needdelrow = row;
    // if(this.needdelrow.length > 0){
    //   document.getElementById('createtray').setAttribute("style","background-color:#5aa5ff;width:120px;height:28px;");
    //   document.getElementById('createtray').removeAttribute("disabled");
    // }else{
    //   document.getElementById('createtray').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
    //   document.getElementById('createtray').setAttribute("disabled","disabled");
    // }
  },
  showTable(){
    console.log(this.tableColumns.data);
  },
  //比较时间
  dueAndPruTime(dueid,proid,params){
    let dueTime = new Date(document.getElementById(dueid).value);
    let proTime = new Date(document.getElementById(proid).value);

    // console.log(dueTime);
    if(dueTime.getTime() < proTime.getTime()){
      //params.row.duedate = undefined;
      document.getElementById(dueid).value = null;
      // this.tableColumns.data[params.index].duedate = null;
      this.$Message.error('到期日不可小于当前时间');
      // console.log(this.tableColumns);
      return false;
    }
  },
  //显示弹框
  show(row){
    console.log(row);
    this.supIsAble = false;
    this.cusIsAble = false;
    this.detail = true;
    this.formFilter = row;
    this.formFilter.creater = '';
    this.formFilter.num = 1;
    this.tableColumns.data = [];
    row.loginStatus = sessionStorage.loginStatus;
    //查询入库单明细
    axios.post(sessionStorage.http+`/getInOrderDetails?loginStatus=${sessionStorage.loginStatus}`,row)
    .then((res) =>{
      console.log(res);
      this.tableColumns.data = res.data;
    })
    .catch((err) => {
      iview.Message.error({
        content:err.message,
        duration:5
      });
    })

  },
  ok(){
    if(this.checkBtn){
      this.checkBtn = false
      setTimeout(() => {
        this.checkBtn = true
      },3000)
        //弹框定格
        this.loading = false;
        setTimeout(()=>{this.loading = true},0);

        // 验证
        let check = true;
        if(this.needdelrow.length == 0){
          this.$Message.error('尚未勾选生成明细,不可生成托盘');
          check = false;
          return
        }
        console.log(this.needdelrow);
        for(var i in this.needdelrow){
          if(this.needdelrow.allotcount == null && parseInt(this.needdelrow.allotcount) == 0){
            this.$Message.error('零件号:'+this.needdelrow.conversionRate+',分配数量不可为空/0');
            check = false;
            break;
          }
        }
        if(check == false){
          // this.$Message.error('明细表不能为空');
          this.detail = true
          setTimeout(()=>{this.loading = true},0)
          this.loading = false
          return
        }else{

          axios.post(sessionStorage.http+`/createTray?loginStatus=${sessionStorage.loginStatus}`,{order:this.formFilter,orderdetail:this.needdelrow,loginStatus:sessionStorage.loginStatus})
          .then((res) =>{
            console.log(res);
            // document.getElementById('search').click();
            if(res.data.remark3 == '2'){
              if(this.formFilter.customerid != null){
                this.$Message.error("客户:"+this.formFilter.customerid+'未绑定货位');
              }
              if(this.formFilter.suppliermanagementid != null){
                this.$Message.error("供应商:"+this.formFilter.suppliermanagementid+'未绑定货位');
              }
              check = false;
            }
            if(res.data.remark3 == '1'){
              this.$Message.error('托盘已使用完');
              check = false;
            }
            if(res.data.remark3 == '3'){
              this.$Message.error('分配的数量小于该:'+this.needdelrow.conversionRate+'货位的最小货位上限数,不可入库');
              check = false;
            }
            if(check == true){
              this.detail = false;
              document.getElementById('toTwoTabs').click();
              setTimeout(() => {
                document.getElementById('searchtray').click();
              },500)
              this.$Message.success('生成托盘成功');
            }else{
              this.name = 'name1';
              this.detail = true;
            }
          })

          //console.log(this.tableColumns.data)

        }
      }else{
        iview.Message.error({
          content: '请不要重复操作!',
          duration:5
        })
      }

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
  initFormatter(){
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
  // this.initFormatter()
}
}
</script>

<style lang="less">
.ingodownentrydetailofallotmodel{
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

</style>
