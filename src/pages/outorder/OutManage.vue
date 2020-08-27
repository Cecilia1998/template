<template>
  <div class="outManage">
    <Form :label-width="100" v-model.sync = "orderForm">
      <Row>
        <Col span="6">
          <FormItem prop="outorderid" :label="$t('common.outorderId')">
            <Input v-model.sync="orderForm.outorderid" @on-change="getOrders(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="ordertype" :label="$t('common.outorderType')">
            <Select clearable filterable v-model.sync="orderForm.ordertype" @on-change="getOrders(1)">
              <Option v-for="item in this.ordertypes" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="ostatus" :label="$t('common.outorderStatus')">
            <Select clearable filterable v-model.sync="orderForm.ostatus" @on-change="getOrders(1)">
              <Option v-for="item in outstatuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="ostatus" :label="$t('common.accorderId')">
            <Input v-model.sync="orderForm.aboutno" @on-change="getOrders(1)"></Input>
          </FormItem>
        </Col>
        <Col span="8">
         <FormItem :label="$t('common.outorderDate')">
            <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" v-model.sync="outdaterange" @on-change="getOrders(1)" placement="bottom"></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="flexEnd">
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="printConfirm">{{$t('actions.printPattern',[$t('common.outorder')])}}</Button>
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="printConfirm">{{$t('actions.printPattern',[$t('common.withcarOrder')])}}</Button>
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="cancelConfirm">{{$t('actions.cancelPattern',[$t('common.outbound')])}}</Button>
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="outboundConfirm">{{$t('actions.confirmPattern',[$t('common.outbound')])}}</Button>
    </div>
    <Table ref="table" :height="tableHeight" border stripe :columns="columns" :data="orders" @on-row-dblclick="showUpdate" @on-selection-change="v=>deleteBtnFlag=v.length==0"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="orderForm.total" :current="orderForm.pageNum" :page-size="orderForm.pageSize" :page-size-opts="[10,20,30]" @on-change="changePagenum" @on-page-size-change="changePagesize"></Page>
    </div>

    <Modal v-model="updateModal" width="1000" closeable :title="$t('actions.updatePattern',[$t('common.outorder')])" scrollable mask >
      <Form v-model="updateModel" ref="updateModel" :label-width="100">
        <Row>
          <Col span="6">
            <FormItem :label="$t('common.outorderId')">
              <Input v-model="updateModel.outorderid" readonly></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.outorderType')">
              <Input v-model="ordertypeContent" readonly></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.outorderStatus')">
              <Input v-model="outstatusContent" readonly ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.outorderDate')">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="updateModel.outdate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.accorderId')">
              <Input v-model="updateModel.aboutno" readonly></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.workshop')+'/'+$t('common.client')">
              <Input v-model="updateModel.workshop"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.priority')">
              <Input v-model="updateModel.priority"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.advancedHours')">
              <Input v-model="updateModel.advancehours" number></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.mergeorderId')">
              <Input v-model="updateModel.remark1" readonly></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div>
        <Button class="btnForm btnModal" :type="modalBtnFlag?'error':'default'" shape="circle" @click="deleteConfirm">{{$t('actions.deleteSelected')}}</Button>
      </div>
      <Table ref="modalTable" border stripe :columns="updateColumns" :data="updateModel.details" @on-selection-change="v=>{modalBtnFlag=v.length>0}"></Table>
      <div slot="footer" class="flexEnd">
        <Button @click="updateModal=false;updateModel={}">{{$t('actions.cancel')}}</Button>
        <Button type="primary" @click="update">{{$t('actions.confirm')}}</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
export default{
  name:"outManage",
  components:{
  },
  data(){
    var _this = this;
    return {
      //全页面数据
      ordertypes:[],
      outstatuses:[],
      effectives:[],
      qstatuses:[], //质量状态

      //表单数据
      outdaterange:[],
      orderForm:{
        total:0,
        pageSize:20,
        pageNum:1,


      },
      //表格数据
      tableHeight:400, //表格高度
      columns:[
        {
          type:"selection",
          align:"center",
          width:55
        },
        {title:this.$t('common.index'),align:"center",width:70,render:(h,params)=>{
          return h('div',params.index+1+this.orderForm.pageSize*(this.orderForm.pageNum-1))
        }},
        {
          title:this.$t('common.outorderId'),
          key:"outorderid",
          align:"center"
        },
        {
          title:this.$t('common.outorderType'),
          key:"ordertype",
          align:"center",
          render:(h,params)=>{
            return h('div',this.getLabel(this.ordertypes,params.row.ordertype))
          }
        },
        {
          title:this.$t('common.outorderStatus'),
          key:"status",
          align:"center",
          render:(h,params)=>{
            for(let i of this.outstatuses){
              if(params.row.ostatus == i.value){
                return h('div',i.label);
              }
            }
          }
        },
        {
          title:this.$t('common.outorderDate'),
          key:"outdate",
          align:"center"
        },
        {
          title:this.$t('common.workshop')+"/"+this.$t('common.client'),
          key:"workshop",
          align:"center"
        },
        {
          title:this.$t('common.advancedHours'),
          key:"advancehours",
          align:"center"
        },
        {
          title:this.$t('common.priority'),
          key:"priority",
          align:"center"
        },
        {
          title:this.$t('common.mergeorderId'),
          key:"remark1", //从此开始，key需要修改
          align:"center"
        },
        {
          title:this.$t('common.accorderId'),
          key:"remark2",
          align:"center"
        },
        {
          title:this.$t('common.note'),
          key:"remark",
          align:"center" //到此结束
        },
      ],
      orders:[], //表格中的数据

      //对话框数据
      departs:[],
      workers:[],

      updateModal:false,
      updateModel:{

      },
      updateColumns:[
        {
          type:"selection",
          align:"center",
          width:55
        },
        {title: this.$t('common.index'),type:"index",align:"center",width:70},
        {
          title:this.$t('common.detailId'),
          key:"outorderdetailid",
          align:"center",
          width:150
        },
        {
          title:this.$t('common.materialId'),
          key:"materielid",
          align:"center",
          width:150,
        },
        {
          title:this.$t('common.materialName'),
          key:"materielname",
          align:"center",
          width:100,
        },
        {
          title:this.$t('common.unit'),
          key:"unit",
          align:"center",
          width:100,
        },
        {
          title:this.$t('common.package'),
          key:"specname",
          align:"center",
          width:100,
        },
        {
          title:this.$t('common.batch'),
          key:"batchno",
          align:"center",
          width:150,
        },
        {
          title:this.$t('common.warehouse'),
          key:"remark4",
          align:"center",
          width:100,
        },
        {
          title:this.$t('common.district'),
          key:"remark5",
          align:"center",
          width:100,
        },
        {
          title:this.$t('common.outNum'),
          key:"num",
          align:"center",
          width:100,
          render:(h,params)=>{
            return h("Input",{
              props:{
                value:this.updateModel.details[params.index].num
              },
              on:{
                "input":(e)=>{
                  this.$set(this.updateModel.details[params.index],"num",e)
                }
              }
            })
          }
        },

      ],

      //操作数据
      //删除
      deleteBtnFlag:true, //是否有选中的删除项
      modalBtnFlag:false,
    }
  },
  created() {
    this.getTypes()

  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    this.getOrders(); //获取出库单信息
  },
  computed:{
    ordertypeContent(){
      return this.getLabel(this.ordertypes,this.updateModel.ordertype)
    },
    outstatusContent(){
      return  this.getLabel(this.outstatuses,this.updateModel.ostatus)
    }
  },
  methods:{

    //获取系统参数
    async getTypes(){
      this.ordertypes = [];
      this.effectives = [];
      this.outstatuses = [];
      await this.getType("outstocktype",this.ordertypes); //出库类型
      await this.getType("outstatus",this.outstatuses); //出库单状态
      await this.getType("actionflg",this.effectives); //是否有效
      await this.getType("quailtytype",this.qstatuses) //质量状态
      await this._axios("get","dept/deptenum",(data)=>{
        this.departs = this.arrConvert(data)
      })
      // console.log(this.ordertypes)

      //获取质量状态参数
    },
    // 表格选中项改变时的方法
    // onSelectionChange(row){
    //   this.selectedInfo = row;
    //   if(!this.selectedInfo ||this.selectedInfo.length>0){
    //     this.deleteBtnFlag = false;
    //   }else{
    //     this.deleteBtnFlag = true;
    //   }
    // },
    changePagesize(e){
      this.orderForm.pageSize = e;
      this.getOrders()
    },
    changePagenum(e){
      this.orderForm.pageNum = e;
      this.getOrders()
    },
    cancel(){
      this.updateModal = false;
    },
    showUpdate(e){
      // console.log(e)

      if(!this.$store.state.controls.M_2_200609101012_update){
       return;
      }else if(e.ostatus!=1){
        this.$root.mes("error","w-20200612093817")
      }else{
        this.updateModal = true;
        this.updateModel = e;
      }
    },

    //查询出库单
    getOrders(num){
      this.orderForm.outdateS = this.outdaterange?this.dateFormat(this.outdaterange[0]):null;
      this.orderForm.outdateE = this.outdaterange?this.dateFormat(this.outdaterange[1]):null;
      if(num) this.orderForm.pageNum = num;
      // this.orderForm.ostatus = 1;
      this._axios("get","outorder/outorder",this.orderForm,(data)=>{
        // console.log(data)
        this.orders = data.list;
        this.orders = JSON.parse(JSON.stringify(this.orders).replace(/children/g,"details"));
        this.orderForm.total = data.total;
      })

    },
    //根据部门id获取下面的人员
    getWorkers(departid){
      this._axios("get","user/usersbydept",{sectorid:departid},(data)=>{
        this.workers =[];
        for(let d of data){
          this.workers.push({label:d.opername,value:d.operatorid})
        }
      })
    },
    update(){
      this.updateModel.outdate = this.dateFormat(this.updateModel.outdate)
      this._axios("put","outorder/outorder",this.updateModel,(data)=>{
        if(data){
          this.updateModal = false;
          this.updateModel = {}
          this.getOrders()
        }
      })
    },
    //取消出库确认
    cancelConfirm(){
      if(this.deleteBtnFlag){
        // 提示选择操作数据
        this.$root.mes('error','w-20200521173305')
      }else{
        for(var i of this.$refs.table.getSelection()){
          if(i.ostatus != 1){
            this.$root.mes("error","w-20200616134907");
            return;
          }
        }

        //是否确认
        this.$root.mes('warn','w-20200611131048') //提示是否确定取消出库
        .then(res => {
            if(res){
              this.changeStatus();
            }
        })
        .catch(err => {console.log(err) })
      }
    },
    //取消出库
    changeStatus(){
      var list = this.$refs.table.getSelection()
      console.log(list)
      this.$axios.put(`outorder/coutorder`,list).then(res=>{
        if(res.code === 0){
          this.$root.mes("info","w-20200430131709")//取消出库成功
          this.getOrders()
        }else{
          this.$root.mes("error","w-20200605180340")//取消出库失败
          // console.log(res)
        }
      }).catch(err=>{
        // console.log(err)
        this.$root.mes("error","w-20200605180340")//取消出库失败
      })
    },

    //确认出库
    outboundConfirm(){
      if(this.deleteBtnFlag){
        // 提示选择操作数据
        this.$root.mes('error','w-20200521173305')
      }else{
        for(var i of this.$refs.table.getSelection()){
          if(i.ostatus != 1){
            this.$root.mes("error","w-20200616134907"); //非申请状态不可确认出库
            return;
          }
        }
        //是否确认
        this.$root.mes('warn','w-20200611131048') //提示是否确认出库
        .then(res => {
            if(res){
              var list = this.$refs.table.getSelection();
              this.$axios.put("outorder/eoutorder",list).then(res=>{
                console.log(res)
                if(res.data === true){
                  this.$root.mes("info","w-20200707104319")//确认出库成功
                  this.getOrders()
                }else{
                  this.$root.mes("error","w-20200707104510")//确认出库失败
                  // console.log(res)
                }
              }).catch(err=>{
                this.$root.mes("error","w-20200707104510")//确认出库失败
              })
            }
        })
        .catch(err => {console.log(err) })
      }
    },

    //打印随车单确认
    printConfirm(){
      console.log("确定打印随车单？")
    },



    deleteConfirm(){
      if(!this.modalBtnFlag){
        // 提示选择操作数据
        this.$root.mes('error','w-20200521173305')
      }else{
        //是否确认
        this.$root.mes('warn','w-20200512154954') //提示是否确定删除
        .then(res => {
           var list = this.$refs.modalTable.getSelection();
           for(let l of list){
             for(let d in this.updateModel.details){
               if(this.updateModel.details[d].outorderdetailid == l.outorderdetailid){
                 this.updateModel.details.splice(d,1)
                 break;
               }
             }
           }
        })
        .catch(err => {console.log(err) })
      }
    },

  }
}
</script>

<style lang ="less">
  .btnModal{
    margin: 10px 0;
  }
  .outManage{
    .ivu-date-picker{
      width: 100%;
    }
   /* .modalTable .ivu-table-cell{
      padding-left: 8px !important;
      padding-right: 8px !important;
    } */

  }

</style>
