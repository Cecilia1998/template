<template lang="html">
  <div :class="getCommons('inordermanage')">
    <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
      <Row justify='start'>
      <!-- //formFilter表示名字(ref),:model表示绑定的数据对象 -->
        <Col span='5'>
          <Form-item label="入库单号">
            <Input v-model="formFilter.incomingNotice" style="width: 160px;height:20px" placeholder='请输入'  :maxlength='20' @on-keyup="checkOrderId" @on-change="search"  element-id = "ingodownentryid"/>
          </Form-item>
        </Col>
        <Col span='5'>
          <Form-item label="移动类型">
            <Select v-model="formFilter.movetype" placeholder="请选择" @on-change="search" style="width: 160px;height:20px" clearable>
              <!-- <Option value="">-所有-</Option> -->
              <Option value="GPT01">空托盘入库</Option>
              <Option value="GPT02">二次包装入库</Option>
              <Option value="GPT03">其他入库</Option>
              <Option value="GPT04">拼盘入库</Option>
              <Option value="GPT05">贴签证入库</Option>
              <Option value="GPT06">采购入库</Option>
              <Option value="GPT07">车间退库入库</Option>
              <Option value="GPT08">车间停产退库入库</Option>
              <Option value="GPT09">车间异常退库入库</Option>
              <Option value="GPT010">生产入库</Option>
              <Option value="GPT011">销售退货入库</Option>
              <Option value="GPT012">转标准入库</Option>
              <Option value="GPT013">暂存入库</Option>
              <!-- <Option v-for=" item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option> -->
            </Select>
          </Form-item>
        </Col>
        <Col span='5'>
          <Form-item label="单据来源">
            <Select v-model="formFilter.resource" placeholder="请选择" @on-change="search" style="width: 160px" clearable>
              <!-- <Option value="">-所有-</Option> -->
              <Option value="WMS">WMS</Option>
              <Option value="SAP">SAP</Option>

              <!-- <Option v-for=" item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option> -->
            </Select>
          </Form-item>
        </Col>
        <Col span='5'>
          <Form-item label="预定入库日期" id='overdue_day'>
            <tr>
              <td>
                <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" style="width: 160px" @on-change="onStartTimeChange" :options="startTimeOption" clearable></DatePicker>
              </td>
              <td>-</td>
              <td>
                <DatePicker v-model="formFilter.backupfield4" type="date" placeholder="请选择" style="width: 160px" :options="endTimeOption" @on-change="onEndTimeChange" clearable></DatePicker>
              </td>
            </tr>
          </Form-item>
        </Col>
        <Col span='4' style="text-align:right">
          <Button type="primary" shape="circle" @click="allOrder" style="width:120px;height:28px;padding:0px;display:none;border-radius:14px;background-color:#5aa5ff;" id="search">查询<Icon type="ios-search" size="18" /></Button>
          <!-- <Form-item label="">
            <Input v-model="formFilter.ingodownentryid" style="width: 160px;height:20px" placeholder='请输入'  :maxlength='20' @on-keyup="checkOrderId" @on-change="search"  element-id = "ingodownentryid"/>
          </Form-item> -->
        </Col>
    </Row>
    <Row>
      <Col span='5' style="text-align:left">
        <Form-item label="创建人">
          <Input v-model="formFilter.creater" style="width: 160px;height:20px" placeholder='请输入'  :maxlength='20' @on-change="search" />
        </Form-item>
      </Col>
      <Col span='5'>
        <Form-item label="状态">
          <Select v-model="formFilter.status" placeholder="请选择" @on-change="search" style="width: 160px;height:20px" clearable>
            <!-- <Option value="">-所有-</Option> -->
            <!-- <Option value="GPS01">申请</Option> -->
            <Option value="GPS02">接收</Option>
            <Option value="GPS03">入库中</Option>
            <Option value="GPS04">入库完成</Option>
            <!-- <Option v-for=" item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option> -->
          </Select>
        </Form-item>
        </Col>
        <Col span='5'>

        </Col>
        <Col span='5'>

        </Col>
        <Col span='4'>

        </Col>
    </Row>

    <br/>
    </Form>
    <div class="inordermanageTable">
      <Table :loading="loading"  height='520' ref="inorderlist" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-row-dblclick="showdetail"></Table>
    </div>
    <br />
    <div class='page'>
      <!-- <Page :total="formFilter.rowtotal" :current="formFilter.currpage" :page-size="formFilter.pagesize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page> -->
      <Page  show-sizer show-elevator show-total :total="this.total"  :current="this.pageNum" :page-size="this.pageSize"  :page-size-opts="[10,20,30]"
      @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
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
    <InGodownPlanModal ref='InGodownPlanModal'></InGodownPlanModal>
    <InGodownPlanDetailsModal ref='InGodownPlanDetailsModal'></InGodownPlanDetailsModal>
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
import InGodownPlanModal from '@/components/InGodownPlanModal'
import InGodownPlanDetailsModal from '@/components/InGodownPlanDetailsModal'

// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
     InGodownPlanModal,
     InGodownPlanDetailsModal
   },
  data () {
    return {
      receiveBtn:true,
      clickSt:true,
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
      pageNum:1,
      pageSize:20,
      formFilter: {

      },
      modal1:false,
      definePageSize:10,
      tableColumns: {
         card: [
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
           {title: '序号',key: 'lineNo',width: 100,align: 'center',render:(h,params)=>{
             this.tableColumns.data[params.index].lineNo=+params.row._index + 1 + (this.pageNum-1)*this.pageSize
             return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
           }},
           {title: '入库单号',key: 'incomingNotice',width:200,align: 'center'},
           {title: '移动类型',key: 'movetype', width: 200,align: 'center',render: (h, params) => {
             if(params.row.movetype=='GPT01'){
               // alert('2222222')
               return h('span','空托盘入库');
             }else if(params.row.movetype=='GPT02'){
               return h('span','二次包装入库');
             }else if(params.row.movetype=='GPT03'){
               return h('span','其他入库');
             }else if(params.row.movetype=='GPT04'){
               return h('span','拼盘入库');
             }else if(params.row.movetype=='GPT05'){
               return h('span','贴签证入库');
             }else if(params.row.movetype=='GPT06'){
               return h('span','采购入库');
             }else if(params.row.movetype=='GPT07'){
               return h('span','车间退库入库');
             }else if(params.row.movetype=='GPT08'){
               return h('span','车间停产退库入库');
             }else if(params.row.movetype=='GPT09'){
               return h('span','车间异常退库入库');
             }else if(params.row.movetype=='GPT010'){
               return h('span','生产入库');
             }else if(params.row.movetype=='GPT011'){
               return h('span','销售退货入库');
             }else if(params.row.movetype=='GPT012'){
               return h('span','转标准入库');
             }else if(params.row.movetype=='GPT013'){
               return h('span','暂存入库');
             }

             // console.log(params)
             // return h('div',+);
             }},
           {title: '预计入库日期', key: 'createdate',width:200,align: 'center'},   //新增
           {title: '预计入库总数量',key: 'quantity',width: 200 ,align: 'center'},
           {title: '预计入库总件数',key: 'backupfield1',width: 200 ,align: 'center'},
           {title: '单据来源',key: 'resource',width: 200 ,align: 'center'},
           {title: '创建人',key: 'creater',width: 160 ,align: 'center'},
           {title: '状态', key: 'status',width: 160,align: 'center',render: (h, params) => {
             if(params.row.status=='GPS01'){
               return h('span','申请');
             }else if(params.row.status=='GPS02'){
               return h('span','接收');
             }else if(params.row.status=='GPS03'){
               return h('span','入库中');
             }else if(params.row.status=='GPS04'){
               return h('span','入库完成');
             }

             } }
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
             operName:'',
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


    axios.post(sessionStorage.http +`/getSomePlanOrders?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
    .then((res) =>{
      console.log(res)
      this.tableColumns.data = res.data.list;
      this.total=res.data.total
      // this.taskList = res.data.taskTypes;
      // this.deptList = res.data.department;
      // this.customerList = res.data.customerInfos;
      // this.supplierList = res.data.supplierManagements;
      // this.isAutoBatch = res.data.autoBatch;
      // this.formFilter.rowtotal = res.data.rowtotal;
      // this.formFilter.currpage = res.data.currpage;
      // this.formFilter.pagesize = res.data.pagesize;

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

    //格式化后的日期
    //修改时间样式

    add0(m){return m<10?'0'+m:m },

    changeDate(dateA) {
        var dateee = new Date(dateA);
        // var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        // return date.substring(0,11);
        let y = dateee.getFullYear()
        let m = dateee.getMonth()+1
        let d = dateee.getDate()
        return y + '-' + this.add0(m) + '-' + this.add0(d)
    },


    getCommons(a){
      return getTitles(a)
    },

    getBtnClass(a){
      return getButtons(a)
    },


    //查询
    search(){
      // alert('121212')
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

        var kkk='';

        this.rows.forEach((item,index)=>{

          if(item.status!='GPS01'){
            kkk+=(item.lineNo)+'/';
          }

        })

        if(kkk!=''){
          // alert('kkk')
          iview.Message.error({
            content:'第'+kkk+'已接收，不可重复接收',
            duration:5
          });
          this.rows=[]
          document.getElementById('search').click();
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
         let i=0

          for(let item of this.rows) {
            if(item.status!='GPS01'){
              i=1
            }
          }
                if (i) {
                  document.getElementById('delOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
                  document.getElementById('delOrder').setAttribute("disabled","disabled");
                if(!this.clickSt){
                  return
                }
                this.$Message.error('已接受的单据不可删除');
                this.clickSt=false
                setTimeout(()=>{
                  this.clickSt=true
                },2000)
                // this.delete_confirm = false;
              }else{
                document.getElementById('delOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;");
                document.getElementById('delOrder').removeAttribute("disabled");
              }

       }else{
         document.getElementById('delOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
         document.getElementById('delOrder').setAttribute("disabled","disabled");
       }
     },
     handleChangePage (value) {
       this.pageNum = value
       this.allOrder();
     },
     // handleChangePage (value) {
     //   const paths = this.$route.path.split('/');
     //   this.formFilter.currpage = value;
     //   this.allOrder();
     // },
     handleChangePageSize(value){
       this.pageSize = value
       this.pageNum = 1
       this.allOrder();
     },
     showdetail(row){
       this.$refs.InGodownPlanDetailsModal.show(row);
     },
     ok(){
       alert('ok');
     },
     cancel(){
       alert('cancel');
     },
     //查询按钮
     allOrder(){

       if(this.formFilter.createdate != null && this.formFilter.createdate != ''){
          this.formFilter.createdate = this.changeDate(this.formFilter.createdate);
        }
        if(this.formFilter.backupfield4 != null && this.formFilter.backupfield4 != ''){
          this.formFilter.backupfield4 = this.changeDate(this.formFilter.backupfield4);
        }
        // alert(this.formFilter.createdate)
        // alert(this.formFilter.remark2)
       // console.log(this.formFilter)
       // this.formFilter.godownentrystatus = '1';
       axios.post(sessionStorage.http +`/getSomePlanOrders?pageNum=${this.pageNum}&pageSize=${this.pageSize}&loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
       .then((res) =>{
         console.log(res)
         this.tableColumns.data = res.data.list;
         this.total=res.data.total


       })
       .catch((err) => {
          iview.Message.error({
            content:err,
            duration:5
          });
       })
     },
     //新增
     addShow(){
       this.$refs.InGodownPlanModal.show();
       // console.log(this.isAutoBatch)
     }

  }
}
</script>

<style  lang='less'>
  // 从这儿开始
  .btnClass_blue{
    background-color: rgb(85,167,253) !important;
    border-color: rgb(85,167,253) !important;
  }
  .btnClass_yellow{
    background-color: rgb(233,156,45) !important;
    border-color: rgb(233,156,45) !important;
  }
  .btnClass_purple{
    background-color: rgb(75,72,237) !important;
    border-color: rgb(75,72,237) !important;
  }
  .btnClass_pink{
    background-color: rgb(250,83,189) !important;
    border-color: rgb(250,83,189) !important;
  }
  .btnClass_red{
    background-color: rgb(253,97,99) !important;
    border-color: rgb(253,97,99) !important;
  }
  // 到这儿结束


  // 从这儿开始
  .inordermanage_blue{
    .ivu-form .ivu-form-item-label{
      color:rgb(85,167,253) !important;
    }
  }
  .inordermanage_yellow{
    .ivu-form .ivu-form-item-label{
      color:rgb(233,156,45) !important;
    }
  }
  .inordermanage_purple{
    .ivu-form .ivu-form-item-label{
      color:rgb(75,72,237) !important;
    }
  }
  .inordermanage_pink{
    .ivu-form .ivu-form-item-label{
      color:rgb(250,83,189) !important;
    }
  }
  .inordermanage_red{
    .ivu-form .ivu-form-item-label{
      color:rgb(253,97,99) !important;
    }
  }



  .inordermanage{
  th .ivu-table-cell{
        font-size: 12px !important;
        font-weight: bold;
        color:#333;
      }
      .ivu-form .ivu-form-item-label{
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
     .inordermanageTable{
       .ivu-table td{
         background-color:#fff;
         height: 40px;
       }
       .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
         background-color: #f9f9f9;
         height: 40px;
       }
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
