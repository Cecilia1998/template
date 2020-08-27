<template>
  <div class="inOrderManage">
    <Form :label-width="120" v-model.sync = "form">
      <Row>
        <!-- <Col span="6">
          <FormItem prop="inwarenoticeid" label="入库通知单编号">
            <Input v-model.sync="form.inwarenoticeid" @on-change="getOrders"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="inwarenoticedetailid" label="入库通知单明细编号">
            <Input v-model.sync="form.inwarenoticedetailid" @on-change="getOrders"></Input>
          </FormItem>
        </Col> -->
        <Col span="6">
          <FormItem prop="inwaredetailid" label="入库单明细编号">
            <Input v-model.sync="form.inwaredetailid" @on-change="getOrders"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="inwaretype" label="入库类型">
            <Select clearable filterable v-model.sync="form.inwaretype" @on-change="getOrders">
              <Option v-for="item in inwaretypes" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="status" label="状态">
            <Select clearable filterable v-model.sync="form.status" @on-change="getOrders">
              <Option v-for="item in statuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="stockbatch" label="批号">
            <Input clearable filterable v-model.sync="form.stockbatch" @on-change="getOrders"></Input>
          </FormItem>
        </Col>
        <Col span="8">
         <FormItem label="入库时间">
            <DatePicker type="daterange" format="yyyy-MM-dd" v-model.sync="indaterange" @on-change="getOrders" placement="bottom"></DatePicker>
          </FormItem>
        </Col>

      </Row>
    </Form>

    <Table ref="table" :height="tableHeight" border stripe :columns="columns" :data="orders" @on-selection-change="v=>deleteBtnFlag=v.length==0"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="this.total" :current="form.pagenum" :page-size="form.pagesize" :page-size-opts="[10,20,30]" @on-change="changePagenum" @on-page-size-change="changePagesize"></Page>
    </div>
  </div>
</template>

<script>
  export default{
    name:"inOrderManage",
    data(){
      return{
        //参数信息
        statuses:[],
        inwaretypes:[],
        tableHeight:300,
        suppliers:[],

        //表单信息
        form:{
          pagenum:1,
          pagesize:20,
        },
        indaterange:[],

        //表格信息
        orders:[],
        columns:[
          {
            title:"序号",
            align:"center",
            width:60,
            render:(h,params)=>{
              return h('div',params.index+1+this.form.pagesize*(this.form.pagenum-1))
            }
          },
          {
            title:"入库单明细号",
            key:"inWareDetailId",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"入库通知单明细号",
            key:"inWareNoticeDetailId",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"供应商",
            key:"supplierCode",
            align:"center",
            tooltip:true,
            width:120,
            render:(h,params)=>{
              return h('div',this.getLabel(this.suppliers,params.row.supplierCode))
            }
          },
          {
            title:"供应商批号",
            key:"stockBatch",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"本厂批号",
            key:"",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"规格",
            key:"packageStandards",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"入库数量",
            key:"receiveWeight",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"入库件数",
            key:"receiveNum",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"已组盘数量",
            key:"trayWeight",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"已组盘件数",
            key:"trayNum",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"质量状态",
            key:"qualityStatus",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"生产日期",
            key:"produceDate",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"有效期",
            key:"",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"复检期",
            key:"",
            align:"center",
            tooltip:true,
            width:120
          },
          {
            title:"是否赠品",
            key:"",
            align:"center",
            tooltip:true,
            width:120
          }
        ],
        total:0

      }
    },
    created() {
      this.getOrders()
      this.getTypes()
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 195;
    },
    methods:{
      //获取系统参数
      async getTypes(){
        await this.getType("instockinformstatus",this.statuses) //状态
        await this.getType('InstockType',this.inwaretypes) //入库类型
        // await this.getType("datasource",this.datasources) //数据来源
        await this._axios("get","resourceinfo/supplierenum",(res)=>{
          this.suppliers = this.arrConvert(res)
          console.log(this.suppliers)
        })
      },
      getOrders(){
        this.form.indates = this.dateFormat(this.indaterange[0],'yyyy-MM-dd')
        this.form.indatee = this.dateFormat(this.indaterange[1],'yyyy-MM-dd')

        this._axios("get","inwareorder/orderinfo",this.form,(res)=>{
          console.log(res)
          this.orders = res.list;
          this.total = res.total
        })
      },
      changePagenum(e){
        this.form.pagenum = e;
        this.getOrders()
      },
      changePagesize(e){
        this.form.pagesize = e;
        this.getOrders()
      }
    }
  }
</script>
<style lang="less">
  .inOrderManage{
    .ivu-date-picker{
      width: 100%;
    }
  }
</style>
