<template>
  <div class="">
    <Form class='formFilter' v-model="formFilter" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.operator')">
            <Input v-model="formFilter.username" clearable @on-change="getData"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.operationContent')">
            <Input v-model="formFilter.desc1" clearable @on-change="getData"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.operationType')">
            <Select v-model="formFilter.type" clearable @on-change="getData">
              <Option v-for="item in types" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.module')">
            <Select v-model="formFilter.modeldesc" clearable @on-change="getData">
              <Option v-for="item in modules" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('common.operationDate')">
            <Row>
              <Col span="11">
                <DatePicker type="date" format="yyyy-MM-dd" @on-change="getData" v-model="formFilter.opertimeS" :options="startTime"></DatePicker>
              </Col>
              <Col span="2"><span>-</span></Col>
              <Col span="11">
                <DatePicker type="date" format="yyyy-MM-dd" @on-change="getData" v-model="formFilter.opertimeE" :options="endTime"></DatePicker>
              </Col>
            </Row>
          </FormItem>
        </Col>

      </Row>
    </Form>

    <div class="spaceBetween" v-show="false">
      <Button class="btnForm" shape="circle" :type="isSelected?'error':'default'" icon="md-trash">{{$t('actions.deleteSelected')}}</Button>
      <Button class="btnForm" shape="circle" type="primary">{{$t('actions.insert')}}</Button>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}"></Table>

    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="formFilter.pageNum" :page-size="formFilter.pageSize" :page-size-opts="[10,20,30]" @on-change="e=>{this.formFilter.pageNum = e;this.getData()}" @on-page-size-change="e=>{this.formFilter.pageSize = e;this.getData()}"></Page>
    </div>
  </div>
</template>

<script>
  export default{
    name:"",
    components:{

    },
    data(){
      return{
        //页面选项，全页面变量
        isSelected:false, //选中删除项
        total:1,
        types:[], //操作类型
        modules:[], //操作模块

        //筛选表格数据
        formFilter:{
          pageSize:20,
          pageNum:1,
        },
        startTime:{
          disabledDate:(function(date){
            return this.formFilter.opertimeE && date>new Date(this.formFilter.opertimeE);
          }).bind(this)
        },
        endTime:{
          disabledDate:(function(date){
            return this.formFilter.opertimeS && date<new Date(this.formFilter.opertimeS);
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
            title:this.$t('common.operator'),
            key:"name",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.operationDate'),
            key:"opertime",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.operationType'),
            key:"type",
            align:"center",
            tooltip:true,
            render:(h,params)=>{
              return h('div',this.getLabel(this.types,params.row.type))
            }
          },
          {
            title:this.$t('common.operationModule'),
            key:"modeldesc",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.operationContent'),
            key:"desc1",
            align:"center",
            tooltip:true,
          }

        ],
        tableData:[],



      }
    },
    // watch:{
    //   formFilter:{
    //     deep:true,
    //     handler(){
    //       this.getData()
    //     }
    //   }
    // },
    created() {
      this.getTypes();
      this.getData();
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    },
    methods:{
      //获取页面选项数据
      async getTypes(){
        await this.getType("syslogtype",this.types)
        await this._axios("get","syslog/model",data=>{
          this.modules=[];
          data.forEach(item=>{
            this.modules.push({label:item,value:item})
          })
        })
      },
      //获取表格数据
      getData(){
        this.formFilter.opertimeS = this.dateFormat(this.formFilter.opertimeS,"yyyy-MM-dd hh:mm:ss")
        this.formFilter.opertimeE = this.dateFormat(this.formFilter.opertimeE,"yyyy-MM-dd hh:mm:ss")
        this._axios("get","syslog/logs",this.formFilter,data=>{
          this.tableData = data.list;
          this.total = data.total
        })
      },

    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
