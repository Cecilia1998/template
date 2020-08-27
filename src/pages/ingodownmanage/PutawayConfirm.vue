<template lang="html">
  <div class="putawayconfirm">
    <Form ref="formFiltertray" :model="formFilter" :label-width="85" inline style="text-align:left;">
      <Row>
        <Col span="24">
             <Row type='flex' justify="end">
               <Col span="5">
                   <Form-item label="入库通知单号" prop="order_id" status-icon >
                     <font color="red" class="font">*</font>
                     <Input v-model="formFilter.ingodownentryid" placeholder="请输入" style="width: 160px;" @on-keyup="checkOrderId" element-id = 'ingodownentryidadd' @on-blur="checkOrderIdUse"  :maxlength='20' />
                   </Form-item>
               </Col>
               <Col span="4">
                 <Form-item label="相关单据号">
                   <font color="red" class="font1">*</font>
                   <Select v-model="formFilter.godownentrytype" placeholder="请选择" @on-change="" style="width: 160px;">
                     <Option value="">-所有入库类型-</Option>
                     <Option v-for=" item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
                   </Select>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="通知单状态">
                   <font color="red" class="font1">*</font>
                   <Select v-model="formFilter.customerid" placeholder="请选择" @on-change="selectCustomer" style="width: 160px;" v-bind:disabled="cusIsAble">
                     <Option value="">-所有状态-</Option>
                       <Option v-for=" item in customerList" :value="item.customerid" :key="item.customerid">{{ item.customername }}</Option>
                   </Select>
                 </Form-item>
               </Col>
               <!-- <Col span="5">
                 <Form-item label="预定入库日期">
                   <font color="red" class="font">*</font>
                   <div class='createdate'>
                     <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                   </div>
                 </Form-item>
               </Col> -->


               <Col span="5">
                 <Form-item label="预定入库日期" id='overdue_day'>
                   <tr>
                     <td>
                       <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" style="width: 120px" @on-change="onStartTimeChange" :options="startTimeOption" clearable></DatePicker>
                     </td>
                     <td>-</td>
                     <td>
                       <DatePicker v-model="formFilter.enddate" type="date" placeholder="请选择" style="width: 120px" :options="endTimeOption" @on-change="onEndTimeChange" clearable></DatePicker>
                     </td>
                   </tr>
                 </Form-item>
               </Col>


               <!-- <Col span="4">
                 <Form-item label="实际入库日期">
                   <font color="red" class="font">*</font>
                   <div class='createdate'>
                     <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                   </div>
                 </Form-item>
               </Col> -->

               <Col span="5">
                 <Form-item label="实际入库日期" id='overdue_day'>
                   <tr>
                     <td>
                       <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" style="width: 120px" @on-change="onStartTimeChange" :options="startTimeOption" clearable></DatePicker>
                     </td>
                     <td>-</td>
                     <td>
                       <DatePicker v-model="formFilter.enddate" type="date" placeholder="请选择" style="width: 120px" :options="endTimeOption" @on-change="onEndTimeChange" clearable></DatePicker>
                     </td>
                   </tr>
                 </Form-item>
               </Col>


             </Row>
             <Row type='flex' justify="end">
               <Col span="5">
                 <Form-item label="采购订单号">
                   <font color="red" class="font3">*</font>
                   <Select v-model="formFilter.sectorname" placeholder="请选择" @on-change="" style="width: 160px" >
                     <Option value="">-所有部门-</Option>
                     <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option>
                   </Select>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="移动类型">
                  <font color="red" class="font2">*</font>
                   <Select v-model="formFilter.suppliermanagementid" placeholder="请选择" @on-change="selectSupplier" style="width: 160px" ref="suppliermanagementid" v-bind:disabled="supIsAble">
                     <Option value="">-所有状态-</Option>
                     <Option v-for=" item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option>
                   </Select>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="供应商代码">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="供应商描述">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item>
               </Col>
               <Col span="4">
                 <Form-item label="组盘人">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item>
               </Col>
               <!-- <Col span="5">

               </Col> -->
             </Row>
             <Row type='flex' justify="end">
               <Col span="5">
                 <Form-item label="入库单号">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="上架时间" id='overdue_day'>
                   <tr>
                     <td>
                       <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" style="width: 120px" @on-change="onStartTimeChange" :options="startTimeOption" clearable></DatePicker>
                     </td>
                     <td>-</td>
                     <td>
                       <DatePicker v-model="formFilter.enddate" type="date" placeholder="请选择" style="width: 120px" :options="endTimeOption" @on-change="onEndTimeChange" clearable></DatePicker>
                     </td>
                   </tr>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="库存批号">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item>
               </Col>
               <Col span="9">
                 <Form-item label="任务状态">
                  <font color="red" class="font2">*</font>
                   <Select v-model="formFilter.suppliermanagementid" placeholder="请选择" @on-change="selectSupplier" style="width: 160px" ref="suppliermanagementid" v-bind:disabled="supIsAble">
                     <Option value="">-所有状态-</Option>
                     <Option v-for=" item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option>
                   </Select>
                 </Form-item>
               </Col>
               <!-- <Col span="4">
                 <Form-item label="生产厂家名称">
                   <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                 </Form-item>
               </Col> -->
             </Row>
         </Col>
       </Row>
  <br/>
    </Form>
    <Table :loading="loading" height='520' ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" @on-row-dblclick="showdetail"></Table>
    <br />
    <div class='page'>
      <Page :total="formFilter.rowtotal" :current="formFilter.currpage" :page-size="formFilter.pagesize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
    </div>
  <putawayConfirmDetailModal ref="putawayConfirmDetailModal"></putawayConfirmDetailModal>
  </div>
</template>
<script>
    export default {

    }
</script>


  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'
import putawayConfirmDetailModal from '@/components/PutawayConfirmDetailModal'

// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
     putawayConfirmDetailModal

   },
  data () {
    return {
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      row:{},
      rows:[],

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
      loading:false,
      total:0,
      formFilter: {
        currpage:1,
        pagesize:20,
        godownentrystatus:'',
      },
      modal1:false,
      definePageSize:10,
      tableColumns: {
         card: [
           {title: '序号',key: 'lineNo',width: 75,align: 'center',render: (h, params) => {
             return h('div',+params.row._index+1);
             }},
           {title: '任务号',key: 'ingodownentryid',width:250,align: 'center'},
           {title: '托盘号',key: 'typeName', width: 120,align: 'center'},
           {title: '入库通知单号', key: 'createdate',width:145,align: 'center'},   //新增
           {title: '相关单据号', key: 'quantity',width:150,align: 'center'},          //新增
           {title: '入库单号', key: 'remark1',width:180,align: 'center'},          //新增
           {title: '采购订单号',key: 'orderholder',width:350,align: 'center'},
           {title: '供应商/车间描述',key: 'name',width: 150 ,align: 'center'},
           {title: '物料/产品描述',key: 'sectorname',width: 150 ,align: 'center'},
           {title: '库存批号', key: 'statusName',width: 100,align: 'center' },
           {title: '生产日期',key: 'name',width: 150 ,align: 'center'},
           {title: '质量状态',key: 'sectorname',width: 150 ,align: 'center'},
           {title: '货位', key: 'statusName',width: 100,align: 'center' },
           {title: '数量',key: 'name',width: 150 ,align: 'center'},
           {title: '件数',key: 'sectorname',width: 150 ,align: 'center'},
           {title: '上架时间', key: 'statusName',width: 100,align: 'center' }
         ],
         data:[
           {
             // select:false,
             // lineNo:'1',
             ingodownentryid:'20181104001',
             godownentrytype:'一般入库',
             createdate:'20181114',
             quantity:200,
             remark1:200,
             orderholder:'上海速锐',
             operName:'尹波',
             statusName:'申请'

           }
         ]

       },
       startTimeOption: {},
       endTimeOption: {}

    }
  },
  created(){
    //sessionStorage.a = 'a'
    // console.log(sessionStorage)
    //this.$router.history.current.path为当前网页的路径

    //默认查询所有入库单
    // 查询任务类型
    //查询客户
    //查询供应商

    this.formFilter.godownentrystatus = '3';
    axios.post(sessionStorage.http +`/getInOrderInit?loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
    .then((res) =>{
      console.log(res)
      this.tableColumns.data = res.data.entries;
      this.taskList = res.data.taskTypes;
      this.customerList = res.data.customerInfos;
      this.supplierList = res.data.supplierManagements;
      this.formFilter.rowtotal = res.data.rowtotal;
      this.formFilter.currpage = res.data.currpage;
      this.formFilter.pagesize = res.data.pagesize;

    })
    .catch((err) => {
       iview.Message.error({
         content:err.message,
         duration:5
       });
    })





  },
  computed:{

  },
  methods:{
    //查询
    search(){
      document.getElementById('searchConfirm').click();
    },
    onStartTimeChange(startTime, type) {
					this.endTimeOption = {
						disabledDate(endTime) {
							return endTime < new Date(startTime)
						}
					}
          this.search();
				},
			/**
			 * 结束时间发生变化时触发,设置开始时间不可选择的日期
			 * 开始时间小于等于结束时间,且小于等于当前时间
			 * @param {string} date 格式化后的日期
			 * @param {string} type 当前的日期类型
			 */
			onEndTimeChange(endTime, type) {
				this.startTimeOption = {
					disabledDate(startTime) {
						return startTime > new Date(endTime)
					}
				}
        this.search();
			},
    // 只能输入数字-校验入库单号
    checkOrderId(e){
      var value=e.target.value.replace(/[^\w\.\/]/ig,'');
      document.getElementById(e.target.id).value = value;
    },
    handleSubmit () {
       const paths = this.$route.path.split("/");
       alert(paths);
     },
     handleChangePage (value) {
       const paths = this.$route.path.split('/');
       this.formFilter.currpage = value;
       this.allOrder();
     },
     handleChangePageSize(value){
       const paths = this.$route.path.split('/');
       this.formFilter.pagesize = value;
       this.allOrder();
     },
     showdetail(row){
       this.$refs.putawayConfirmDetailModal.show(row);
     },
     ok(){
       alert('ok');
     },
     cancel(){
       alert('cancel');
     },
     //查询按钮
     allOrder(){

       this.formFilter.godownentrystatus = '3';
       axios.post(sessionStorage.http +`/getAllOrder?loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
       .then((res) =>{
         this.tableColumns.data = res.data.entries;
         this.formFilter.rowtotal = res.data.rowtotal;
         this.formFilter.currpage = res.data.currpage;
         this.formFilter.pagesize = res.data.pagesize;
         console.log(res.data)

       })
       .catch((err) => {
          iview.Message.error({
            content:err.message,
            duration:5
          });
       })
     }
  }
}
</script>

<style lang="less" scoped>
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
<style  lang='less'>
  .putawayconfirm{
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
     .page{
       .ivu-select-selection{
         bottom: 6px;
       }
     }
  }
   </style>
