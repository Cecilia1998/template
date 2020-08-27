<template>
  <div class="emptyTrayOut">
    <Form :label-width="100" v-model = "orderForm">
      <Row>
        <Col span="6">
          <FormItem prop="outorderid" :label="$t('common.outorderId')">
            <Input v-model="orderForm.outorderid" @on-change="getOrders(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="ostatus" :label="$t('common.outorderStatus')">
            <Select clearable filterable v-model="orderForm.ostatus" @on-change="getOrders(1)">
              <Option v-for="item in outstatuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
         <FormItem :label="$t('common.outorderDate')">
            <DatePicker type="datetimerange" :placeholder="$t('message.todoSelect')" format="yyyy-MM-dd HH:mm" v-model="outdaterange" @on-change="getOrders(1)" placement="bottom"></DatePicker>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="flexEnd">
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="cancelConfirm">{{$t('actions.cancelPattern',[$t('common.outbound')])}}</Button>
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="outboundConfirm">{{$t('actions.confirmPattern',[$t('common.outbound')])}}</Button>
      <Button type="primary" class="btnForm" shape="circle" @click="showInsert">{{$t('actions.insert')}}</Button>
    </div>
    <Table ref="table" :height="tableHeight" border stripe :columns="columns" :data="orders" @on-selection-change="v=>deleteBtnFlag=v.length==0"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="orderForm.total" :current="orderForm.pageNum" :page-size="orderForm.pageSize" :page-size-opts="[10,20,30]" @on-change="changePagenum" @on-page-size-change="changePagesize"></Page>
    </div>

    <Modal v-model="modal" :closable="false" :mask-closable="false" scrollable :title="$t('actions.insertPattern',[$t('common.emptytrayOutOrder')])" >
      <Form :label-width="100" ref="model" :model="model" :rules="formValidate" class="formValidate">
        <FormItem prop="warehousename" :label="$t('common.warehouse')">
          <Select v-model="model.warehousename">
            <Option v-for="item in warehouses" :key="item.value" :value="item.label">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem prop="qty" :label="$t('common.num')">
          <InputNumber v-model="model.qty"></InputNumber>
        </FormItem>
        <FormItem prop="remark" readonly :label="$t('common.note')">
          <Input v-model="model.remark" clearable></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">{{$t('actions.cancel')}}</Button>
        <Button type="primary" @click="insert">{{$t('actions.confirm')}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default{
  name:"emptyTrayOut",
  data(){
    var _this = this;
    return {
      //全页面数据
      outstatuses:[],
      warehouses:[],

      deleteBtnFlag:true, //是否有选中的删除项

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
        {title: this.$t('common.index'),align:"center",width:70,render:(h,params)=>{
          return h('div',params.index+1+this.orderForm.pageSize*(this.orderForm.pageNum-1))
        }},
        {
          title:this.$t('common.outorderId'),
          key:"outorderid",
          align:"center"
        },
        {
          title:this.$t('common.warehouse'),
          key:"warehousename",
          align:"center"
        },
        {
          title:this.$t('common.num'),
          key:"qty",
          align:"center"
        },
        {
          title:this.$t('common.outorderStatus'),
          key:"ostatus",
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
          title:this.$t('common.note'),
          key:"remark",
          align:"center" //到此结束
        },
      ],
      orders:[], //表格中的数据

      //对话框数据
      modal:false,
      model:{
        warehousename:'',
        qty:0,
        remark:''
      },
      formValidate:{
        warehousename:[{required:true,message:this.$t('message.empty',[this.$t('common.warehouse')]),trigger:"change"}],
        qty:[
          {required:true,type:"number",message:this.$t('message.empty',[this.$t('common.num')]),trigger:"change"},
        ]
      }
    }
  },
  created() {
    this.getTypes()

  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    this.getOrders(); //获取出库单信息
  },
  methods:{

    //获取系统参数
    async getTypes(){
      this.outstatuses = [];
      await this.getType("outstatus",this.outstatuses);
      await this._axios("get","ware/wareenum",(data)=>{
        this.warehouses = this.arrConvert(data)
      })

    },
    changePagesize(e){
      this.orderForm.pageSize = e;
      this.getOrders(1)
    },
    changePagenum(e){
      this.orderForm.pageNum = e;
      this.getOrders()
    },
    cancel(){
      if(this.title == this.$t('actions.updatePattern',[this.$t('common.outorder')])){
        this.modalColumns.shift()
        delete this.formValidate.outorderid;
      }
      this.modal = false;
    },
    // 显示新增页面
    showInsert(){
      this.title=this.$t('actions.insertPattern',[this.$t('common.outorder')]);
      this.modal = true;
      this.model.children = [{specs:[]}]
      this.submit = this.insert;
    },
    //查询空托盘出库单
    getOrders(num){
      this.orderForm.outdateS = this.outdaterange?this.dateFormat(this.outdaterange[0]):null;
      this.orderForm.outdateE = this.outdaterange?this.dateFormat(this.outdaterange[1]):null;
      if(num) this.orderForm.pageNum = num;
      // this.orderForm.ostatus = 1;

      this._axios("get","outorder/palletoutorder",this.orderForm,(data)=>{
        console.log(data)
        this.orders = data.list;
        this.orderForm.total = data.total;
      })

    },
    //插入出库单
    insert(){
      this.checkValidate("model").then(res=>{
        if(res){
          this._axios("post","outorder/palletoutorder",this.model,(data)=>{
            this.getOrders()
            this.modal = false;
            this.$root.mes("info","w-20200430131600") //提示新增成功
          })

        }else{
          console.log("出库单信息错误")
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
        this.$root.mes('warn','w-20200630172626') //提示是否确定取消出库
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
          console.log(res)
        }
      }).catch(err=>{
        console.log(err)
        this.$root.mes("error","w-20200605180340")//取消出库失败
      })
    },

    //确认出库
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
              this.$axios.put("outorder/epalletout",list).then(res=>{
                if(res.code === 0){
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

    getMaterielName(id,index){
      this.$axios.get(`mitem/mitem?materielid=${id}`).then(res=>{
        // console.log(res)
        if(res.code === 0){
          this.$set(this.model.children[index],'materielname',res.data.materielname)
          this.getSpecs(id,index)
        }else{
          console.log("获取物料名称失败",res)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    getSpecs(id,index){
      //console.log("参数：",id,index)
      return this.$axios.get(`/mitem/mitemspecenum?materielid=${id}`).then(res=>{
        console.log("规格",res)
        if(res.code === 0 && res.data.length>0){
          // this.specenum = res.data;

          for(let i of res.data){
            this.model.children[index].specs.push({label:i.name,value:i.code})
          }
          this.$set(this.model.children[index],"specs",this.model.children[index].specs)
          console.log(this.model.children[index].specs)


        }else{
          console.log("暂无规格信息，或请求错误",res)
        }
      }).catch(err=>{
        console.log(err)
      })
    }

  }
}
</script>

<style lang ="less">
  .emptyTrayOut{
    .ivu-date-picker{
      width: 100%;
    }
   /* .modalTable .ivu-table-cell{
      padding-left: 8px !important;
      padding-right: 8px !important;
    } */
  }

</style>
