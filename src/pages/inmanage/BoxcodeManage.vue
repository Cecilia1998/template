<template>
  <div class="boxcodeManage">
    <Form class='formFilter' v-model="formFilter" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.materialId')">
            <Input v-model="formFilter.materialid" @on-change="getData(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.batchno')">
            <Input v-model="formFilter.batchno" @on-change="e=>{getData(1)}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.inDate')">
            <Row>
              <Col span="11">
                <DatePicker v-model="formFilter.indates" type="date" :options="startTime" format="yyyy-MM-dd" @on-change="e=>{this.formFilter.indates = this.dateFormat(this.formFilter.indates,'yyyy-MM-dd');this.getData(1)}"></DatePicker>
              </Col>
              <Col span="2"><span>-</span></Col>
              <Col span="11">
                <DatePicker v-model="formFilter.indatee" type="date" :options="endTime" format="yyyy-MM-dd" @on-change="e=>{this.formFilter.indatee = this.dateFormat(this.formFilter.indatee,'yyyy-MM-dd');this.getData(1)}"></DatePicker>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.inorderType')">
            <Select v-model="formFilter.inwaretype" @on-change="e=>{getData(1)}" clearable>
              <Option v-for="item in inwaretypes" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div class="spaceBetween">
      <div>
        <!-- <Button class="btnForm" shape="circle" :type="isSelected?'error':'default'" icon="md-trash">删除选中项</Button> -->
      </div>
      <div>
        <Button class="btnForm" v-if="$store.state.controls.M_2_200715115418_print" shape="circle" :type="isSelected?'primary':'default'" @click="print">{{$t('actions.print')}}</Button>
        <!-- <Button class="btnForm" shape="circle" type="primary">新增</Button> -->
      </div>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}"></Table>
    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="formFilter.pageNum" :page-size="formFilter.pageSize" :page-size-opts="[10,20,30]" @on-change="e=>{this.getData(e)}" @on-page-size-change="e=>{this.formFilter.pageSize =e;this.getData(1)}"></Page>
    </div>

    <!-- <Modal v-model="modal" title="条形码">
      <div>
        <Print></Print>
      </div>
    </Modal> -->
  </div>
</template>

<script>
  import Print from "../../components/Print.vue"
  export default{
    name:"boxcodeManage",
    components:{
      Print
    },
    data(){
      return{
        //页面选项，全页面变量
        total:0, //表格中数据总数
        isSelected:false, //表格中是否有选中数据
        inwaretypes:[],
        isParts:[], //是否零件

        //筛选表格数据
        formFilter:{
          pageSize:20,
          pageNum:1,
          lang:this.$store.state.globalLang
        },
        //给日期选择器添加范围判定
        startTime:{
          disabledDate:(function(date){
            return this.formFilter.indatee && date>new Date(this.formFilter.indatee);
          }).bind(this)
        },
        endTime:{
          disabledDate:(function(date){
            return this.formFilter.indates && date<new Date(this.formFilter.indates);
          }).bind(this)
        },

        //主表格数据
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
              return h("div",params.index+1 + this.formFilter.pageSize*(this.formFilter.pageNum-1))
            }
          },
          {
            title:this.$t('common.materialId'),
            key:"materielid",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.materialName'),
            key:"materielname",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.originalBatchno'),
            key:"originbatchno",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.batchno'),
            key:"batchno",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.inDate'),
            key:"indate",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.boxcode'),
            key:"itembarcode",
            align:"center",

          },
          {
            title:this.$t('common.whetherPart'),
            key:"isPart",
            align:"center",
            tooltip:true,
            render:(h,params)=>{
              return h("div",this.getLabel(this.isParts,params.row.isPart))
            }

          },
          {
            title:this.$t('common.package'),
            key:"specdesc",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.num'),
            key:"qty",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.whetherPrinted'),
            key:"printcount",
            align:"center",
            tooltip:true,
            render:(h,params)=>{
              return h('div',params.row.printcount>0?this.$t('common.yes'):this.$t('common.no'))
              // if(this.$store.state.globalLang == "CN"){
              //   return h('div',params.row.printcount>0?"是":"否")
              // }else if(this.$store.state.globalLang == "EN"){
              //   return h('div',params.row.printcount>0?"Yes":"No")
              // }else{
              //   return h('div',params.row.printcount>0?"は":"いいえ")
              // }

            }

          }
        ],
        tableData:[],

        modal:true,

      }
    },
    created() {
      this.getTypes();
      this.getData(1);
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    },
    methods:{
      //获取页面选项数据
      async getTypes(){
        await this.getType("InstockType",this.inwaretypes)
        await this.getType("isPart",this.isParts)
      },
      //获取表格数据
      getData(num){
        this.formFilter.pageNum = num;
        console.log(this.formFilter)
        this._axios("get","itembarcode/itembarcodes",this.formFilter,data=>{
          console.log(data)
          this.tableData = data.list;
          this.total = data.total;
        })
      },
      print(){
        let list = this.$refs.table.getSelection()
        this._axios("put","itembarcode/itembarcode",list,data=>{
          if(data){
            this.$root.mes("info","w-20200722134033") //打印成功
            this.getData(1)
          }else{
            this.$root.mes("error","w-20200722134105") //打印失败
          }
        })
      }
    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
