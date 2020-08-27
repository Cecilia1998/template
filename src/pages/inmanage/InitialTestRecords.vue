<template>
  <div class="">
    <Form class='formFilter' v-model="formFilter" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.materialId')">
            <Input @on-change="getData(1)" v-model="formFilter.mitemid"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.materialName')">
            <Input @on-change="getData(1)" v-model="formFilter.mitemname"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.supplier')">
            <Input @on-change="getData(1)" v-model="formFilter.supplier"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.status')">
            <Select @on-change="getData(1)" clearable v-model="formFilter.status">
              <Option v-for="item in statuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.producerCode')">
            <Input @on-change="getData(1)" v-model="formFilter.producercode"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.materielCode')">
            <Input @on-change="getData(1)" v-model="formFilter.batchno"></Input>
          </FormItem>
        </Col>

      </Row>
    </Form>

    <div class="spaceBetween">
      <div>
        <!-- <Button class="btnForm" shape="circle" :type="isSelected?'error':'default'" icon="md-trash">删除选中项</Button> -->
      </div>
      <div>
        <!-- <Button class="btnForm" shape="circle" type="primary">新增</Button> -->
        <Button v-if="$store.state.controls.M_2_200810151602_recheck" class="btnForm" shape="circle" :type="isSelected?'primary':'default'" @click="showRecheck">{{$t('actions.recheck')}}</Button>
         <Button v-if="$store.state.controls.M_2_200810151602_print" class="btnForm" shape="circle" :type="isSelected?'primary':'default'" @click="showPrint">{{$t('actions.print')}}</Button>
      </div>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}"></Table>

    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="formFilter.pagenum" :page-size="formFilter.pagesize" :page-size-opts="[10,20,30]" @on-change="e=>{this.formFilter.pagenum = e;this.getData()}" @on-page-size-change="e=>{this.formFilter.pagesize=e;this.formFilter.pagenum=1;this.getData()}"></Page>
    </div>
    <Modal v-model="printModel" :title="this.$t('actions.print')" :width="1000" :footer-hide='true'>
      <div>
        <div class="flexEnd">
          <Button @click="printModel = false">{{$t('actions.cancel')}}</Button>
          <Button type="primary" v-print="'#print'">{{$t('actions.print')}}</Button>
        </div>

        <MaterialReceivingRecordsPrintModel1 :data="printData" id="print"></MaterialReceivingRecordsPrintModel1>
      </div>
    </Modal>
    <Modal v-model="recheckModel" :title="$t('actions.recheck')">
      {{this.$t("message.todoSelectRecheckResult")}}：
      <div slot="footer">
        <Button @click="recheckModel = false">{{$t('actions.cancel')}}</Button>
        <Button @click="recheck(0)">{{$t('actions.accept')}}</Button>
        <Button type="primary" @click="recheck(1)">{{$t('actions.notAccepted')}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import MaterialReceivingRecordsPrintModel1 from "../../components/MaterialReceivingRecordsPrintModel1.vue"
  export default{
    name:"",
    components:{
      MaterialReceivingRecordsPrintModel1
    },
    data(){
      return{
        //页面选项，全页面变量
        isSelected:false, //选中删除项
        total:0,
        statuses:[],
        iqcresults:[],
        producers:[],

        printModel:false,
        printData:[],
        recheckModel:false,

        //筛选表格数据
        formFilter:{
          pagesize:20,
          pagenum:1,
        },
        startTime:{
          disabledDate:(function(date){
            return this.formFilter.indatee && date>this.formFilter.indatee;
          }).bind(this)
        },
        endTime:{
          disabledDate:(function(date){
            return this.formFilter.indates && date<this.formFilter.indates;
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
            title:this.$t("common.index"),
            align:"center",
            width:75,
            render:(h,params)=>{
              return h("div",params.index+1 + this.formFilter.pagesize*(this.formFilter.pagenum-1))
            }
          },
          {
            title:this.$t("common.mitemName"), //原辅料名称
            key:"mitemname",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.articleId"), //货号
            key:"mitemid",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.level"),
            key:"mitemgradle",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.arrivalDate"),
            key:"deliverydate",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.producerCode"),
            key:"producercode",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.materielCode"), //物资编码
            key:"batchno",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.validate"),
            key:"validatedate",
            width:120,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.producer"),
            key:"producercode1name",
            width:120,
            align:"center",
          },
          {
            title:this.$t("common.dealer"),
            key:"dealer",
            width:100,
            align:"center",
            // tooltip:true,
          },
          {
            title:this.$t("common.status"),
            key:"iqcstatus",
            width:100,
            align:"center",
            render:(h,params)=>{
              return h('div',this.getLabel(this.statuses,params.row.iqcstatus))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifQualifiedSupplier"),
            key:"supplisqualified",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifAccordWith"), //票物是否相符
            key:"iscomplete",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifPackingSound"),
            key:"packingisok",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifReportQualified"), //检验报告是否合格
            key:"checkisok",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifTransportationQualified"),
            key:"transportisok",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifRefrigerationQualified"),
            key:"freezingisok",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.ifFreezingQualified"),
            key:"coldisok",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',params.row.suppisqualified===1?this.$t('common.yes'):this.$t("common.no"))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.receiveResult"),
            key:"iqcresult",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',this.getLabel(this.iqcresults,params.row.iqcresult))
            }
            // tooltip:true,
          },
          {
            title:this.$t("common.recheckResult"),
            key:"remark1",
            width:80,
            align:"center",
            render:(h,params)=>{
              return h('div',this.getLabel(this.iqcresults,params.row.remark1))
            }
            // tooltip:true,
          }

        ],
        tableData:[],
      }
    },
    async created() {
      await this.getTypes();
      await this.getData();
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    },
    methods:{
      //获取页面选项数据
      async getTypes(){
        await this.getType("iqcstatus",this.statuses)
        await this.getType("iqcresult",this.iqcresults)
      },
      //获取表格数据
      getData(pagenum){
        if(pagenum != undefined){
          this.formFilter.pagenum = pagenum;
        }
        this._axios("get","iqc/iqcinfos",this.formFilter,data=>{
          console.log(data)
          this.total = data.total;
          this.tableData = data.list
        })

      },
      showRecheck(){
        var list =this.$refs.table.getSelection()
        if(list.length>0){
          if(list.length>1){
            //提示“初验记录请依次复核”
            this.$root.mes("error","w-20200812133743")
          }else if(list[0].iqcstatus === 1){
            this.$root.mes("error","w-20200818171423") //提示未初检不可复检
          }else if(list[0].iqcstatus === 3){
            this.$root.mes("error","w-20200812134010") //提示”已复核，无需重新进行“
          }else if(list[0].iqcresult === 0){
            this.$root.mes("error","w-20200812134615") //提示“初验未通过，无需复核”
          }else{
            this.recheckModel = true;
          }
        }else{
          //提示“请选择初验记录”
          this.$root.mes("error","w-20200521173305")
        }
      },
      recheck(res){
        var list = this.$refs.table.getSelection();
        list[0].remark1 = res;
        console.log(list[0])
        this._axios("put","iqc/endcheck",list,data=>{
          if(data){
            //提示复核成功
            this.$root.mes("info","w-20200812134803")
          }else{
            //提示复核失败
            this.$root.mes("error","w-20200812134831")
          }
          this.recheckModel = false;
          this.getData()
        })
      },
      showPrint(){
        this.printData = this.$refs.table.getSelection()
        if(this.printData && this.printData.length>0){
          this.printModel = true;
        }else{
          this.$root.mes("error","w-20200521173305") //提示选择数据
        }

      }


    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
