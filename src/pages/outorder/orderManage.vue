<template lang="html">

  <div class="login">
    <Row :gutter="24">
      <i-col span="24" class="demo-tabs-style1" style="background: #e3e8ee;padding:16px;">
          <Tabs type="card">
              <Tab-pane label="出库单：单据管理">
                <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
                  <Row gutter="10">
                      <Col span="4">
                        <Form-item label="出库单号">
                          <Input v-model="formFilter.order_id" style="width: 120px"/>
                        </Form-item>
                      </Col>
                      <Col span="4">
                        <Form-item label="出库类型">
                            <Select v-model="formFilter.order_type" placeholder="请选择" @on-change="" style="width: 120px">
                            <Option value="">-所有状态-</Option>
                            <Option value="1">一般出库</Option>
                            <Option value="2">盘点出库</Option>
                            <Option value="3">临时出库</Option>
                            <Option value="4">退货出库</Option>
                          </Select>
                        </Form-item>
                      </Col>
                      <Col span="4">
                        <Form-item label="客户">
                          <Select v-model="formFilter.customer" placeholder="请选择" @on-change="" style="width: 120px">
                            <Option value="">-所有状态-</Option>
                            <Option value="1">百度</Option>
                            <Option value="2">腾讯</Option>
                            <Option value="3">阿里</Option>
                            <Option value="4">华为</Option>
                          </Select>
                        </Form-item>
                      </Col>
                      <Col span="4">
                        <Form-item label="供应商">
                          <Select v-model="formFilter.supplier" placeholder="请选择" @on-change="" style="width: 120px">
                            <Option value="">-所有状态-</Option>
                            <Option value="1">佛山华涛</Option>
                            <Option value="2">中山霖扬</Option>
                            <Option value="3">珠海恩捷</Option>
                            <Option value="4">珠海银岭</Option>
                          </Select>
                        </Form-item>
                      </Col>
                        <Col span="8">
                        <Form-item label="申请日期">
                          <Date-picker type="daterange" placement="bottom-end" v-model="formFilter.payback_date"></Date-picker>--
                          <Date-picker type="daterange" placement="bottom-end" v-model="formFilter.payback_date"></Date-picker>
                        </Form-item>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="12">
                          &nbsp;&nbsp;&nbsp;

                      </Col>
                      <Col span="8">
                        <Form-item label="">
                        </Form-item>
                      </COL>
                      <Col span="4" >
                        <Button type="primary" shape="circle" icon="ios-search" @click="click" id="check" style="width: 100px"><font color="white">查询</font></Button>
                      </Col>
                  </Row>

                </Form>
                <Table :loading="loading" ref="selection" :columns="tableColumns.card" :data="[]" @on-selection-change="onSelectionChange" style="margin-top:20px;"></Table>
                <br/>
                <Page :total="total" :current="formFilter.cur_page" :page-size="definePageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,50,100,200,300]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:left"></Page>
              </Tab-pane>
              <Tab-pane label="出库单：拆单/合单">
                <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
                  <Row gutter="10">
                      <Col span="4">
                        <Form-item label="新出库单号">
                          <Input v-model="formFilter.order_id" style="width: 120px"/>
                        </Form-item>
                      </Col>
                      <Col span="4">
                        <Form-item label="出库类型">
                            <Select v-model="formFilter.order_type" placeholder="请选择" @on-change="" style="width: 120px">
                            <Option value="">-所有状态-</Option>
                            <Option value="1">一般出库</Option>
                            <Option value="2">盘点出库</Option>
                            <Option value="3">临时出库</Option>
                            <Option value="4">退货出库</Option>
                          </Select>
                        </Form-item>
                      </Col>
                      <Col span="4">
                        <Form-item label="客户">
                          <Select v-model="formFilter.customer" placeholder="请选择" @on-change=""  style="width: 120px">
                            <Option value="">-所有状态-</Option>
                            <Option value="1">百度</Option>
                            <Option value="2">腾讯</Option>
                            <Option value="3">阿里</Option>
                            <Option value="4">华为</Option>
                          </Select>
                        </Form-item>
                      </Col>
                      <Col span="4">
                        <Form-item label="供应商">
                          <Select v-model="formFilter.supplier" placeholder="请选择" @on-change="" style="width: 120px">
                            <Option value="">-所有状态-</Option>
                            <Option value="1">佛山华涛</Option>
                            <Option value="2">中山霖扬</Option>
                            <Option value="3">珠海恩捷</Option>
                            <Option value="4">珠海银岭</Option>
                          </Select>
                        </Form-item>
                      </Col>
                        <Col span="8">
                        <Form-item label="申请日期">
                          <Date-picker type="daterange"  placement="bottom-end" v-model="formFilter.payback_date" style="width: 120px"></Date-picker>--
                          <Date-picker type="daterange" placement="bottom-end" v-model="formFilter.payback_date" style="width: 120px"></Date-picker>
                        </Form-item>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="12">

                          <Form-item label="申请部门">
                            <Select v-model="formFilter.department" placeholder="请选择" @on-change="" style="width: 120px">
                              <Option value="">-所有状态-</Option>
                              <Option value="1">开发一部</Option>
                              <Option value="2">开发二部</Option>
                              <Option value="3">开发三部</Option>
                              <Option value="4">开发四部</Option>
                              <Option value="4">开发五部</Option>
                            </Select>
                          </Form-item>

                      </Col>
                      <Col span="8">
                        <Form-item label="">
                        </Form-item>
                      </COL>
                      <Col span="4" >

                        <Button type="primary" shape="circle" icon="ios-search" @click="click" id="check" style="width: 100px"><font color="white">查询</font></Button>
                      </Col>
                  </Row>
                </Form>
                <Table :loading="loading" ref="selection" :columns="tableColumns.card1" :data="[]" @on-selection-change="onSelectionChange" style="margin-top:20px;"></Table>
                <br />
                <Page :total="total" :current="formFilter.cur_page" :page-size="definePageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,50,100,200,300]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:left"></Page>
              </Tab-pane>
              <Tab-pane label="出库单：波次单">
                <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
                  <Row>
                      <Col span="12">

                        <Form-item label="波次号">
                          <Input v-model="formFilter.ware_No" style="width: 120px"/>
                        </Form-item>

                      </Col>
                      <Col span="8">
                        <Form-item label="">
                        </Form-item>
                      </COL>
                      <Col span="4" >

                        <Button type="primary" shape="circle" icon="ios-search" @click="findAll" id="check" style="width: 100px"><font color="white">查询</font></Button>
                      </Col>
                  </Row>
                </Form>
                <Table :loading="loading" ref="selection" :columns="tableColumns.card2" :data="[]" @on-selection-change="onSelectionChange" style="margin-top:20px;"></Table>
                <br />
                <Page :total="total" :current="formFilter.cur_page" :page-size="definePageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,50,100,200,300]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:left"></Page>

              </Tab-pane>
          </Tabs>
      </i-col>
  </Row>


  </div>
</template>
<script>
    export default {

    }
</script>




<script>
import axios from 'axios'
import router from '../../router'
export default {
  components: {
   },
  data () {
    return {
      loading:false,
      total:0,
      formFilter: {
        cur_page:1
      },
      definePageSize:10,
      tableColumns: {
         card: [
           {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
           {title: '出库单号',key: 'order_id',width: 100,align: 'center'},
           {title: '出库类型',key: 'user_name',width: 90,align: 'center'},
           {title: '所属部门',key: 'mobile', width: 120,align: 'center'},
           {title: '导入日期', key: 'principal',width:120,sortable: true,align: 'center'},   //新增
           {title: '出库总数', key: 'surplus_money',width:120,sortable: true,align: 'center'},          //新增
           {title: '客户', key: 'dispatch_payed',width:120,align: 'center'},          //新增
           {title: '创建人', key: 'true_total_money',width:120,align: 'center'},          //新增
           {title: '状态',key: 'overdue_day',width: 120,sortable: true,align: 'center'},
           { title: '更新日期',key: 'late_fee',width: 150 ,align: 'center'},

           {title: '操作', key: 'action',align: 'center', width: 300,
             render: (h, params) => {
               const permissions = params.row.permissions
               const lea_status = params.row.status
               let buttons = []
               if (true) {
                 buttons.push(h('Button', {
                   props: {
                     type: 'info',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.handleApplyLeavecase(params.row.collection_id)
                     }
                   }
                 }, '申请留案'))
               }
               return h('div', buttons)
             }
           }
         ],
         card1: [
           {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
           {title: '新出库单号',key: 'order_id',width: 100,align: 'center'},
           {title: '出库单号',key: 'order_id',width: 100,align: 'center'},
           {title: '出库类型',key: 'user_name',width: 90,align: 'center'},
           {title: '申请日期',key: 'mobile', width: 120,align: 'center'},
           {title: '出库单数量', key: 'principal',width:120,sortable: true,align: 'center'},   //新增
           {title: '已接收总数', key: 'surplus_money',width:120,sortable: true,align: 'center'},          //新增
           {title: '客户', key: 'dispatch_payed',width:120,align: 'center'},          //新增
           {title: '创建人', key: 'true_total_money',width:120,align: 'center'},          //新增
           {title: '申请部门', key: 'true_total_money',width:120,align: 'center'},          //新增
           {title: '状态',key: 'overdue_day',width: 120,sortable: true,align: 'center'},
           {title: '操作', key: 'action',align: 'center', width: 300,
             render: (h, params) => {
               const permissions = params.row.permissions
               const lea_status = params.row.status
               let buttons = []
               if (true) {
                 buttons.push(h('Button', {
                   props: {
                     type: 'info',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.handleApplyLeavecase(params.row.collection_id)
                     }
                   }
                 }, '申请留案'))
               }
               return h('div', buttons)
             }
           }
         ],
         card2: [
           {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
           {title: '波次号',key: 'order_id',width: 100,align: 'center'},
           {title: '出库类型',key: 'user_name',width: 90,align: 'center'},
           {title: '所属部门',key: 'mobile', width: 120,align: 'center'},
           {title: '申请日期', key: 'principal',width:120,sortable: true,align: 'center'},   //新增
           {title: '出库总数', key: 'surplus_money',width:120,sortable: true,align: 'center'},          //新增
           {title: '客户', key: 'dispatch_payed',width:120,align: 'center'},          //新增
           {title: '创建人', key: 'true_total_money',width:120,align: 'center'},          //新增
           {title: '申请部门', key: 'true_total_money',width:120,align: 'center'},          //新增
           {title: '状态',key: 'overdue_day',width: 120,sortable: true,align: 'center'},
           {title: '操作', key: 'action',align: 'center', width: 300,
             render: (h, params) => {
               const permissions = params.row.permissions
               const lea_status = params.row.status
               let buttons = []
               if (true) {
                 buttons.push(h('Button', {
                   props: {
                     type: 'info',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.handleApplyLeavecase(params.row.collection_id)
                     }
                   }
                 }, '申请留案'))
               }
               return h('div', buttons)
             }
           }
         ],
         installment: [
           {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
           {title: '订单号',key: 'order_id',width: 100, align: 'center'},
           {title: '姓名', key: 'user_name',width: 90, align: 'center'},
           {title: '手机号',key: 'mobile',width: 120, align: 'center',
	           render: (h, params) => {
	             return h('div', params.row.mobile && params.row.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
	           }
           },
           {title: '借款金额',key: 'principal',width: 110,sortable: true, align: 'center'},
           {title: '待还金额',key: 'surplus_money', width: 120, sortable: true, align: 'center'},
           {title: '逾期天数',key: 'overdue_day',width: 120,sortable: true, align: 'center'},
           {title: '还款时间',key: 'true_repayment_time',width: 120, align: 'center'},
           { title: '催收状态', key: 'status', width: 120, align: 'center'},
           {title: '最后催收时间',key: 'last_collection_time',width: 140, sortable: true, align: 'center' },
           {title: '催收结果', key: 'collection_result',width:120, align: 'center'},               //新增
           {title: '催收员',key: 'collection_name',width: 120, align: 'center'},
           {title: '催收分组',key: 'current_overdue_group',width: 120, align: 'center'},
           {title: '留言/备注', key: 'remark',width:180, align: 'center'},                         //新增
           {title: '派单时间', key: 'dispatch_time',width:120, align: 'center'},                    //新增
           {title: '协催员', key: 'assist_user',width: 90,align: 'center'},
           {title: '标签', key: 'tags', align: 'center', width:80, align: 'center',
               render: (h, params) => {
                 const tags = params.row.tags
                 let buttons = []
                 tags.forEach((v,i)=>{
                   buttons.push(h('Tag', {
                     props: {
                       color:v.color,
                       type:"border"
                     },
                     style: {
                       marginRight:'5px',
                     },
                   },v.title))
                 })
                 return h('Tag', buttons)
               }
            },
           {title: '操作',key: 'action',align: 'center', width: 200,
             render: (h, params) => {
               const permissions = params.row.permissions
               let buttons = []
               if (true) {
                 buttons.push(h('Button', {
                   props: {
                     type: 'primary',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.handleCollection(params.row.collection_id)
                     }
                   }
                 }, '催收'))
               }
               return h('div', buttons)
             }
           }
         ],
       }

    }
  },
  created(){
    sessionStorage.a = 'a'
    // console.log(sessionStorage)
    //this.$router.history.current.path为当前网页的路径
  },
  computed:{

  },
  methods:{
    handleSubmit () {
       const paths = this.$route.path.split("/")
     },
     exportfile(){

     },

     click(){
       alert("我最帅!")
     },
     onSelectionChange (rows) {
       this.rows = rows
     },
     handleChangePage (value) {
       const paths = this.$route.path.split('/')
     },
     handleChangePageSize(value){
       const paths = this.$route.path.split('/')
     },
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
<style>
    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content {
        height: 500px;
        margin-top: -16px;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
        background: #fff;
        padding: 16px;
    }

    .demo-tabs-style1 > .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
        border-color: transparent;
    }

    .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
        border-color: #fff;
    }
</style>
