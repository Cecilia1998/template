<template lang="html">
  <div :class="getCommons('inordermanage')">
    <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;" >
       <!-- <Row>
         <Col span="24">
            <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:12px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creater}}</div>
         </Col>
       </Row> -->
       <!-- <div>&nbsp;</div> -->
       <Row>
         <Col span="24">
              <Row type='flex' justify="end">
                <Col span="5">
                    <Form-item label="入库通知单号" prop="order_id" status-icon >
                      <font color="red" class="font">*</font>
                      <Input v-model="formFilter.incomingNotice" placeholder="请输入" style="width: 160px;" @on-keyup="checkOrderId" element-id = 'ingodownentryidadd' @on-blur="checkOrderIdUse"  :maxlength='20' />
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="入库单号">
                      <Input v-model="formFilter.godownEntryId" style="width: 160px;" readonly element-id = 'orderquantity'/>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="物料号">
                      <Input v-model="formFilter.materialNo" style="width: 160px;" readonly element-id = 'orderquantity'/>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="批次号">
                      <Input v-model="formFilter.stockBatch" style="width: 160px;" readonly element-id = 'orderquantity'/>
                    </Form-item>
                </Col>
                <Col span="4">
                  <Form-item label="移动类型">
                    <font color="red" class="font1">*</font>
                    <Select v-model="formFilter.movetype" placeholder="请选择" @on-change="selectCustomer" style="width: 160px;" v-bind:disabled="cusIsAble">
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





                <!-- <Col span="4">
                  <Form-item label="实际入库日期">
                    <font color="red" class="font">*</font>
                    <div class='createdate'>
                      <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                    </div>
                  </Form-item>
                </Col> -->




              </Row>
              <Row type='flex' justify="end">
                <Col span="5">
                  <Form-item label="仓库">
                    <font color="red" class="font1">*</font>
                    <Select v-model="formFilter.location" placeholder="请选择" @on-change="selectCustomer" style="width: 160px;" v-bind:disabled="cusIsAble">
                      <Option value="">-所有状态-</Option>
                        <Option v-for=" item in customerList" :value="item.customerid" :key="item.customerid">{{ item.customername }}</Option>
                    </Select>
                  </Form-item>
                </Col>
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
                <Col span="5">
                  <Form-item label="质量状态">
                    <font color="red" class="font3">*</font>
                    <Select v-model="formFilter.qualityStatus" placeholder="请选择" @on-change="" style="width: 160px" >
                      <Option value="">-所有部门-</Option>
                      <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col span="5">
                  <Form-item label="单据来源">
                   <font color="red" class="font2">*</font>
                    <Select v-model="formFilter.resource" placeholder="请选择" @on-change="selectSupplier" style="width: 160px" ref="suppliermanagementid" v-bind:disabled="supIsAble">
                      <Option value="">-所有状态-</Option>
                      <Option v-for=" item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col span="4">
                  <Form-item label="入库状态">
                   <font color="red" class="font2">*</font>
                    <Select v-model="formFilter.status" placeholder="请选择" @on-change="selectSupplier" style="width: 160px" ref="suppliermanagementid" v-bind:disabled="supIsAble">
                      <Option value="">-所有状态-</Option>
                      <Option v-for=" item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option>
                    </Select>
                  </Form-item>
                </Col>
              </Row>

          </Col>
        </Row>
        <Row>
      <Col span='12' style="text-align:left">
          &nbsp;&nbsp;&nbsp;&nbsp;
        <Button shape="circle" type="primary" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" disabled @click="delConfirmOrder" id='delOrder' icon="md-trash">删除选中项</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <!-- <Upload :action="uploadurl" :format="['xlsx','xls']" :max-size="2048" :data="loginStatus" :show-upload-list="false"  style="display: inline;" name="uploadGodown" size="18" :on-success="handleSuccess">
          <Button icon="ios-cloud-upload-outline" style="font-size:10px">上传文件</Button>
        </Upload> -->
        <!-- <div class="pic_upload">
        		<Upload
        		ref="upload"
        		:show-upload-list="false"
        		type="drag"
        		:format="['jpg','jpeg','png']"
        		:on-success="handleSuccess"
        		action="http://localhost:8088/uploadImg"
        		style="display: inline-block;width:80px;">
        		<div style="width: 80px;height:20px;line-height: 20px;">
              <Icon type="md-camera"/>
        		</div>
        		</Upload>
        	</div> -->
      </Col>
      <Col span='12' style="text-align:right">
        <!-- showPredict showAddOfHS -->
        <!-- <Button type="primary" shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="showPredict">预计入库</Button> -->
        <!-- <Button type="primary" shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="showPlan">入库计划单</Button> -->
        <!-- <Button type="primary" shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="showAddOfHS">新增明细</Button>&nbsp;&nbsp; -->
        <!-- <Button type="primary" shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" to="/ingodownmanage/godownReceive">入库接收</Button> -->
        <!-- <Button type="primary" shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="">标签打印</Button> -->
        <Button type="primary" shape="circle" style="margin-left:10px;width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="receiveOrder">接&nbsp;&nbsp;收</Button>
      </Col>
    </Row>
    <br/>
    </Form>
    <div class="inordermanageTable">
      <Table :loading="loading"  height='520' ref="inorderlist" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-row-dblclick="showdetail"></Table>
    </div>
    <br />
    <div class='page'>
      <Page :total="formFilter.rowtotal" :current="formFilter.currpage" :page-size="formFilter.pagesize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
    </div>
    <Modal
        v-model="modal1"
        title="入库单明细"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
    <inGodownEntryAddModal ref='inGodownEntryAddModal'></inGodownEntryAddModal>
    <InGodownEntryDetailsOfHSModal ref='InGodownEntryDetailsOfHSModal'></InGodownEntryDetailsOfHSModal>
    <Modal v-model="delete_confirm_Order" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span style="font-size:14px">确定要删除吗？</span>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="error" size="large" style="width:120px;border-radius:14px;font-size:14px"  @click="deleteSelectionOrder">确定删除</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'
import { getTitles, getButtons } from '../../Util'
import inGodownEntryAddModal from '@/components/InGodownEntryAddModal'
import InGodownEntryDetailsOfHSModal from '@/components/InGodownEntryDetailsOfHSModal'

// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
     inGodownEntryAddModal,
     InGodownEntryDetailsOfHSModal
   },
  data () {
    return {
      receiveBtn:true,
      //上传路径
      uploadurl:sessionStorage.http+'/uploadInOrder',
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      delete_confirm_Order:false,
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
      deptList:[
        {
          sectorid:'',
          sectorname:''
        }
      ],
      isAutoBatch:false,
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
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
           {title: '序号',key: 'lineNo',width: 70,align: 'center',render: (h, params) => {
             return h('div',+params.row._index+1);
             }},
           {title: '入库通知单号',key: 'incomingNotice',width:150,align: 'center'},
           {title: '入库单号',key: 'godownEntryId', width: 150,align: 'center'},
           {title: '物料号',key: 'materialNo', width: 150,align: 'center'},
           {title: '批次号',key: 'stockBatch',width:150,align: 'center'},
           {title: '移动类型',key: 'movetype', width: 130,align: 'center'},
           {title: '码垛口',key: 'startposition',width: 130 ,align: 'center'},
           {title: '仓库',key: 'location',width: 130 ,align: 'center'},
           {title: '预定入库日期', key: 'createdate',width:150,align: 'center'},   //新增
           {title: '质量状态', key: 'qualityStatus',width:150,align: 'center'},          //新增
           {title: '单据来源',key: 'resource',width: 130 ,align: 'center'},
           {title: '创建者',key: 'creater',width: 130 ,align: 'center'},
           {title: '预计入库数量', key: 'quantity',width: 130,align: 'center' },
           {title: '实际入库数量', key: 'actualquantity',width: 130,align: 'center' },
           {title: '件数', key: 'stockNum',width: 130,align: 'center' },
           {title: '计量单位', key: 'unit',width: 130,align: 'center' },
           {title: '状态', key: 'status',width: 130,align: 'center' },
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

    this.formFilter.godownentrystatus = '1';
    axios.post(sessionStorage.http +`/getInOrderInit?loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
    .then((res) =>{
      console.log(res)
      this.tableColumns.data = res.data.entries;
      this.taskList = res.data.taskTypes;
      this.deptList = res.data.department;
      this.customerList = res.data.customerInfos;
      this.supplierList = res.data.supplierManagements;
      this.isAutoBatch = res.data.autoBatch;
      this.formFilter.rowtotal = res.data.rowtotal;
      this.formFilter.currpage = res.data.currpage;
      this.formFilter.pagesize = res.data.pagesize;

    })
    .catch((err) => {
       iview.Message.error({
         content:err,
         duration:5
       });
    })

  },
  computed:{

  },
  methods:{
    getCommons(a){
      return getTitles(a)
    },

    getBtnClass(a){
      return getButtons(a)
    },


    //查询
    search(){
      document.getElementById('search').click();
    },
    //删除事件
    deleteSelectionOrder(){
      axios.post(sessionStorage.http +`/delOrder?loginStatus=${sessionStorage.loginStatus}`,this.rows)
      .then((res) =>{
        // console.log(res.data)
        if(res.message == 'success'){
          iview.Message.success({
            content:"删除成功",
            duration:5
          });
          document.getElementById('delOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
          document.getElementById('delOrder').setAttribute("disabled","disabled");
          document.getElementById('search').click();
          this.delete_confirm_Order = false;
        }else{
          iview.Message.error({
            content:"删除失败",
            duration:5
          });
        }

      })
      .catch((err) => {
         iview.Message.error({
           content:err.message,
           duration:5
         });
      })
    },
    //删除弹框
    delConfirmOrder(){
      this.delete_confirm_Order = true;
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
    //上传文件成功后
    handleSuccess (res, file) {
            console.log(res)
            // console.log(file)
            if(res.message == 'success'){
              document.getElementById('search').click();
            }else if(res.message == '1'){
              this.$Message.error('日期格式错误,请查看(yyyy/MM/dd)');
              return;
            }else if(res.message == '2'){
              this.$Message.error('入库单单已存在,请重新定义');
              return;
            }else if(res.message == '3'){
              this.$Message.error('尚未勾选入库单,不可接收');
              return;
            }else if(res.message == '4'){
              this.$Message.error('尚未勾选入库单,不可接收');
              return;
            }else if(res.message == '5'){
              this.$Message.error('到期日日期格式不正确,请重新填写');
              return;
            }else if(res.message == '6'){
              this.$Message.error('生产日期格式不正确,请重新填写');
              return;
            }else if(res.message == '7'){
              this.$Message.error('到期日小于生产日期,请重新填写');
              return;
            }else if(res.message == '8'){
              this.$Message.error('供应商或者客户不存在,请重新填写');
              return;
            }else if(res.message == '9'){
              this.$Message.error('入库型号不存在,请重新填写');
              return;
            }else if(res.message == '10'){
              this.$Message.error('用户未登录');
              return;
            }else if(res.message == '11'){
              this.$Message.error('文件为空');
              return;
            }

    },
    // 只能输入数字-校验入库单号
    checkOrderId(e){
      var value=e.target.value.replace(/[^\w\.\/]/ig,'');
      document.getElementById(e.target.id).value = value;
    },
    //接收入库单
    receiveOrder(){
      if(this.receiveBtn){
        this.receiveBtn = false
        setTimeout(() => {
          this.receiveBtn = true
        },3000)
        if(this.rows.length <= 0){
          this.$Message.error('尚未勾选入库单,不可接收');
          return;
        }
        axios.post(sessionStorage.http +`/receiveOrder?loginStatus=${sessionStorage.loginStatus}`,this.rows)
        .then((res) =>{
          // console.log(res.data)
          iview.Message.success({
            content:'接收成功.',
            duration:5
          });
          document.getElementById('search').click();

        })
      }else{
        iview.Message.error({
          content: '请不要重复操作!',
          duration:5
        })
      }

    },
    handleSubmit () {
       const paths = this.$route.path.split("/");
       alert(paths);
     },
     exportfile(){

     },
     onSelectionChange (rows) {
       this.rows = rows;
       if(this.rows.length > 0){
         document.getElementById('delOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;");
         document.getElementById('delOrder').removeAttribute("disabled");
       }else{
         document.getElementById('delOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
         document.getElementById('delOrder').setAttribute("disabled","disabled");
       }
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
       this.$refs.InGodownEntryDetailsOfHSModal.show();
     },
     ok(){
       alert('ok');
     },
     cancel(){
       alert('cancel');
     },
     //查询按钮
     allOrder(){

       this.formFilter.godownentrystatus = '1';
       // axios.post(sessionStorage.http +`/getAllOrder?loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
       // .then((res) =>{
       //   this.tableColumns.data = res.data.entries;
       //   this.formFilter.rowtotal = res.data.rowtotal;
       //   this.formFilter.currpage = res.data.currpage;
       //   this.formFilter.pagesize = res.data.pagesize;
       //   console.log(res.data)
       //
       // })
       // .catch((err) => {
       //    iview.Message.error({
       //      content:err.message,
       //      duration:5
       //    });
       // })
     },
     //新增,尹波
     addShow(){
       this.$refs.inGodownEntryAddModal.show(this.taskList,this.customerList,this.supplierList,this.deptList,this.isAutoBatch);
       console.log(this.isAutoBatch)
     }

  }
}
</script>

<style  lang='less'>
  // 从这儿开始
  // .btnClass_blue{
  //   background-color: rgb(85,167,253) !important;
  //   border-color: rgb(85,167,253) !important;
  // }
  // .btnClass_yellow{
  //   background-color: rgb(233,156,45) !important;
  //   border-color: rgb(233,156,45) !important;
  // }
  // .btnClass_purple{
  //   background-color: rgb(75,72,237) !important;
  //   border-color: rgb(75,72,237) !important;
  // }
  // .btnClass_pink{
  //   background-color: rgb(250,83,189) !important;
  //   border-color: rgb(250,83,189) !important;
  // }
  // .btnClass_red{
  //   background-color: rgb(253,97,99) !important;
  //   border-color: rgb(253,97,99) !important;
  // }
  // 到这儿结束


  // 从这儿开始
  // .inordermanage_blue{
  //   .ivu-form .ivu-form-item-label{
  //     color:rgb(85,167,253) !important;
  //   }
  // }
  // .inordermanage_yellow{
  //   .ivu-form .ivu-form-item-label{
  //     color:rgb(233,156,45) !important;
  //   }
  // }
  // .inordermanage_purple{
  //   .ivu-form .ivu-form-item-label{
  //     color:rgb(75,72,237) !important;
  //   }
  // }
  // .inordermanage_pink{
  //   .ivu-form .ivu-form-item-label{
  //     color:rgb(250,83,189) !important;
  //   }
  // }
  // .inordermanage_red{
  //   .ivu-form .ivu-form-item-label{
  //     color:rgb(253,97,99) !important;
  //   }
  // }



  .inordermanage{
    th .ivu-table-cell{
          font-size: 12px !important;
          font-weight: bold;
          color:#333;
        }


        .ivu-input-icon{
          position: absolute;
          right: 44px !important;
        }
        .ivu-form .ivu-form-item-label{
          font-size: 12px !important;
          font-family:"Microsoft YaHei";
          line-height: 20px;
          color:rgb(85,167,253) !important;
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
            right:25px;
        }
       .ivu-input-icon-normal+.ivu-input{
         width: 120px;
       }

       .createdate{
         .ivu-input-icon{
              position: absolute;
              right:45px;
          }
       }
     }
   </style>
