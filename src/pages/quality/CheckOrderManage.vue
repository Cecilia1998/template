<template>
  <div class="qualityManage">
    <Form class='formFilter' v-model="formFilter" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.materialId')">
            <Input @on-change="getData(1)" v-model="formFilter.materialid"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.materialName')">
            <Input @on-change="getData(1)" v-model="formFilter.materialName"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.inDate')">
            <Row>
              <Col span="11">
                <DatePicker :options="startTime" format="yyyy-MM-dd" v-model="formFilter.indates" @on-change="e=>{this.formFilter.indates = this.dateFormat(e,'yyyy-MM-dd') ;getData(1)}" ></DatePicker>
              </Col>
              <Col span="2"><span>-</span></Col>
              <Col span="11">
                <DatePicker :options="endTime" format="yyyy-MM-dd" v-model="formFilter.indatee" @on-change="e=>{this.formFilter.indatee = this.dateFormat(e,'yyyy-MM-dd') ;getData(1)}" ></DatePicker>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.status')">
            <Select @on-change="getData(1)" v-model="formFilter.status">
              <Option v-for="item in statuses" :key="item.value" :value="item.value!=undefined?item.value:-1">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.originalBatchno')">
            <Input @on-change="getData(1)" v-model="formFilter.originalbatchno"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.batchno')">
            <Input @on-change="getData(1)" v-model="formFilter.batchno"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div class="spaceBetween">
      <div>
        <!-- 左侧的按钮 -->
      </div>
      <div>
        <Button :type="isSelected?'primary':'default'" shape="circle" class="btnForm">{{$t('actions.confirmPattern',[$t("actions.requestCheck")])}}</Button>
        <Button :type="isSelected?'primary':'default'" shape="circle" class="btnForm">{{$t("actions.backToStagingArea")}}</Button>
        <Button :type="isSelected?'primary':'default'" shape="circle" class="btnForm">{{$t("actions.backToSortingArea")}}</Button>
        <Button :type="isSelected?'primary':'default'" shape="circle" class="btnForm">{{$t("actions.samplingRegist")}}</Button>
        <Button :type="isSelected?'primary':'default'" shape="circle" class="btnForm">{{$t("actions.qualityRegist")}}</Button>
      </div>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="total" :current="formFilter.pagenum" :page-size="formFilter.pagesize" :page-size-opts="[10,20,30]" @on-change="e=>{getData(e)}" @on-page-size-change="e=>{formFilter.pagesize = e;getData(1)}"></Page>
    </div>
  </div>
</template>

<script>
  export default{
    name:"qualityManage",
    components:{

    },
    data(){
      return{
        //页面选项，全页面变量
        isSelected:false, //选中删除项
        total:0,
        statuses:[],

        //筛选表格数据
        formFilter:{
          pagesize:20,
          pagenum:1,
        },
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
            width:70,
            render:(h,params)=>{
              return h("div",params.index+1 + this.formFilter.pagesize*(this.formFilter.pagenum-1))
            }
          },
          {
            title:this.$t("common.checkListId"),
            key:"",
            width:120,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.materialId'),
            key:"materialid",
            width:120,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.materialName'),
            key:"materialname",
            width:120,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.supplier'),
            key:"supplierid",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.producer'),
            key:"producerid",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.originalBatchno'),
            key:"originalbatchno",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.batchno'),
            key:"batchno",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.inDate'),
            key:"indate",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.stockNum'),
            key:"producerid", //
            width:100,
            align:"right",
            tooltip:true,
          },
          {
            title:this.$t('common.validate'),
            key:"validate",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.recheckDate'),
            key:"recheckdate",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.sampleWorkshop'),
            key:"producerid", //
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.sampleQuantity'),
            key:"producerid", //
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.status'),
            key:"status",
            width:100,
            align:"center",
            tooltip:true,
          },
        ],
        tableData:[],



      }
    },
    async created() {
      await this.getTypes();
      await this.getData()
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    },
    methods:{
      //获取页面选项数据
      async getTypes(){

      },
      //获取表格数据
      getData(pagenum){
        if(pagenum!=undefined){
          this.formFilter.pagenum = pagenum;
        }
        console.log(this.formFilter)
      }

    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
