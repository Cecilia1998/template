<template>
  <div class="purchaseOrderManage">
    <Form class='searchModel' v-model="searchModel" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.purchaseOrderId')">
            <Input v-model="searchModel.inwarenoticeid" clearable @on-change="e=>{this.getData(1)}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.supplier')">
            <Select v-model="searchModel.supplierid" clearable @on-change="e=>{this.getData(1)}">
              <Option v-for="item in suppliers" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.status')">
            <Select v-model="searchModel.status" clearable @on-change="e=>{this.getData(1)}">
              <Option v-for="item in statuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.purchaseDate')">
            <Row>
              <Col span="11">
                <DatePicker clearable type="date" @on-change="e=>{this.searchModel.indates = this.dateFormat(e,'yyyy-MM-dd');;this.getData(1)}" v-model="searchModel.indates" format="yyyy-MM-dd" :options="startTime" ></DatePicker>
              </Col>
              <Col span="2"><span>-</span></Col>
              <Col span="11">
                <DatePicker clearable type="date" @on-change="e=>{this.searchModel.indatee = this.dateFormat(e,'yyyy-MM-dd');;this.getData(1)}" v-model="searchModel.indatee"  format="yyyy-MM-dd" :options="endTime"></DatePicker>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div class="spaceBetween">
      <div>
        <!-- <Button class="btnForm" shape="circle" :type="isSelected?'error':'default'" icon="md-trash">删除选中项</Button> -->
      </div>
      <div>
        <Button v-if="$store.state.controls.M_2_200710113005_finish" class="btnForm" shape="circle" type="primary" :type="isSelected?'primary':'default'" @click='finish'>{{$t('actions.purchaseFinish')}}</Button>
        <!-- <Button class="btnForm" shape="circle" type="primary">新增</Button> -->
      </div>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}" @on-row-dblclick="showModal"></Table>

    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="searchModel.pagenum" @on-change="e=>{this.searchModel.pagenum=e;this.getData()}" @on-page-size-change="e=>{this.searchModel.pagesize = e;this.getData(1)}" :page-size="searchModel.pagesize" :page-size-opts="[10,20,30]" ></Page>
    </div>

    <Modal v-model="modal" :title="$t('common.purchaseDetail')" :footer-hide="true" :width="1000" >
      <Form v-model="modalForm" :label-width="100">
        <Row>
          <Col span="6">
            <FormItem :label="$t('common.purchaseOrderId')">
              <Input v-model="modalForm.inwarenoticeid" disabled></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.supplier')">
              <Input v-model="modalForm.suppliername" disabled></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.purchaseDate')">
              <Input v-model="modalForm.indate" disabled></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.status')">
              <Input v-model="statusContent" disabled></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="flexEnd">
        <Button v-if="$store.state.controls.M_2_200710113005_create" shape="circle" v-show="modalForm.status !== 2" class="btnForm" :type="isModalSelected?'primary':'default'" @click="createInOrder">{{$t('actions.createInOrder')}}</Button>
      </div>
      <Table ref="modalTable" :columns="modalColumns" :data="modalData" border stripe @on-selection-change="e=>{isModalSelected = e.length>0}"></Table>

    </Modal>

  </div>
</template>

<script>
  export default{
    name:"purchaseOrderManage",
    components:{
    },
    data(){
      return{
        //页面选项，全页面变量
        isSelected:false, //选中删除项
        suppliers:[], //供应商选项
        statuses:[], //状态选项

        //筛选表格数据
        searchModel:{
          pagesize:20,
          pagenum:1
        },
        startTime:{
          disabledDate:((date)=>{
            return this.searchModel.indatee && date>new Date(this.searchModel.indatee)
          }).bind(this)
        },
        endTime:{
          disabledDate:((date)=>{
            return this.searchModel.indates && date<new Date(this.searchModel.indates)
          }).bind(this)
        },

        //主表格数据
        total:0,
        tableHeight:300,
        columns:[
          {
            type:"selection",
            align:"center",
            width:55,
          },
          {
            title:this.$t('common.index'),
            align:"center",
            width:75,
            render:(h,params)=>{
              return h("div",params.index+1 + this.searchModel.pagesize*(this.searchModel.pagenum-1))
            }
          },
          {
            title:this.$t('common.purchaseOrderId'),
            key:"inwarenoticeid",
            align:"center",

          },
          {
            title:this.$t('common.supplier'),
            key:"suppliername",
            align:"center",

          },
          {
            title:this.$t('common.purchaseDate'),
            key:"indate",
            align:"center",

          },
          {
            title:this.$t('common.purchaseDepart'),
            key:"receivedepart",
            align:"center",

          },
          {
            title:this.$t('common.purchaser'),
            key:"receiver",
            align:"center",

          },
          {
            title:this.$t('common.status'),
            key:"status",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.statuses,params.row.status))
            }
          }
        ],
        tableData:[],

        //对话框数据
        modal:false,
        isModalSelected:false,
        modalForm:{},
        modalData:[],
        modalColumns:[
          {
            type:"selection",
            align:"center",
            width:55,
          },
          {
            title:this.$t('common.index'),
            type:"index",
            align:"center",
            width:65,
          },
          {
            title:this.$t('common.materialId'),
            key:"materialid",
            align:"center",
          },
          {
            title:this.$t('common.materialName'),
            key:"materialname",
            align:"center",
          },
          {
            title:this.$t('common.package'),
            key:"packstands",
            align:"center",
          },
          {
            title:this.$t('common.producer'),
            key:"producername",
            align:"center",
          },
          {
            title:this.$t('common.purchaseQuantity'),
            key:"expectedweight",
            align:"center",
          },
          {
            title:this.$t('common.purchaseUnit'),
            key:"unit",
            align:"center",
          },
          {
            title:this.$t('common.purchaseLimit'),
            key:"receivemax",
            align:"center",
          },
          {
            title:this.$t('common.deliveryDate'),
            key:"receivedate",
            align:"center",
          },
          {
            title:this.$t('common.note'),
            key:"remark",
            align:"center",
          },
        ],




      }
    },
    computed:{
      statusContent(){
        return this.getLabel(this.statuses,this.modalForm.status)
      }
    },
    created() {
      this.getTypes();
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
      // this.searchModel.status = 2;
      this.getData();
    },
    methods:{
      //获取页面选项数据
      async getTypes(){
        await this.getType("purchaseOrderStatus",this.statuses) //采购单状态
        // console.log(this.statuses)
        await this._axios("get","resourceinfo/supplierenum",(data)=>{
          this.suppliers = this.arrConvert(data)
        })
      },
      //获取表格数据
      getData(pagenum){
        if(pagenum) this.searchModel.pagenum = pagenum;
        this._axios("get","inwarenotice/noticeinfo",this.searchModel,(data)=>{
          console.log(data)
          this.tableData = data.list;
          this.total = data.total;
        })
      },
      //采购入库完成
      finish(){
        if(!this.isSelected){ //如果没有选中项
          this.$root.mes("error","w-20200521173305") //提示未选中
        }else{
          this.$root.mes("warn","w-20200713155744").then(res=>{
            if(res){
              let list = this.$refs.table.getSelection()
              this._axios("put","inwarenotice/",list,data=>{
                this.getMes("put",data)
                if(data){
                  this.getData()
                }
              })
              //修改状态为完成
            }
          })
        }
      },
      showModal(e){
        //获取采购单明细
        this._axios("get","inwarenotice/noticedetailinfo",{inwarenoticeid:e.inwarenoticeid},(data)=>{
          console.log(data)
          this.modalForm = e
          this.modalData = data.detailViewList;
          this.modal = true;
          // this.modalData = data.list
        })

      },
      cancel(){
        this.modal = false;
      },
      createInOrder(){
        if(!this.isModalSelected){
          //提示选择采购单明细
          this.$root.mes("error","w-20200521173305")
        }else{
          this.$root.mes("warn","").then(res=>{  //提示是否确认生成入库单
            if(res){
              let list = this.$refs.modalTable.getSelection();
              this._axios("post","inwarenotice/inwareorder",list,data=>{
                if(data){
                  this.$root.mes("info","w-20200713143549") //提示生成入库单成功
                  this.modal  = false;
                  this.getData()
                }
              })
            }
          })

        }
      }

    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
