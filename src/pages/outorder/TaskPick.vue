<template>
  <div class="taskPick">
    <Form class='formFilter' v-model="formFilter" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.outorderId')">
            <Input v-model="formFilter.outorderid" @on-change="e=>{this.getData(1)}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.accorderId')">
            <Input v-model="formFilter.aboutno" @on-change="e=>{this.getData(1)}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.materialId')">
            <Input v-model="formFilter.materielid" @on-change="e=>{this.getData(1)}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.materialName')">
            <Input v-model="formFilter.materielname" @on-change="e=>{this.getData(1)}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.pickStatus')">
            <Select v-model="formFilter.status" clearable>
              <Option v-for="item in pickStatuses" @on-change="e=>{this.getData(1)}" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.batch')">
            <Input v-model="formFilter.batchno" @on-change="e=>{this.getData(1)}"></Input>
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
        <Button class="btnForm" shape="circle" :type="isSelected?'primary':'default'" @click="pick">{{$t('actions.confirmPattern',[$t('common.pick')])}}</Button>
      </div>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}"></Table>

    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="formFilter.pageNum" :page-size="formFilter.pageSize" :page-size-opts="[10,20,30]" @on-change="e=>{this.getData(e)}" @on-page-size-change="e=>{this.formFilter.pageSize =e;this.getData(1)}"></Page>
    </div>
  </div>
</template>

<script>
  export default{
    name:"taskPick",
    components:{

    },
    data(){
      return{
        //页面选项，全页面变量
        isSelected:false, //选中删除项
        total:0,
        pickStatuses:[],

        //筛选表格数据
        formFilter:{
          pageSize:20,
          pageNum:1,
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
            width:65,
            render:(h,params)=>{
              return h("div",params.index+1 + this.formFilter.pageSize*(this.formFilter.pageNum-1))
            }
          },
          {
            title:this.$t('common.picktaskId'),
            key:"",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.outorderId'),
            key:"outorderid",
            align:"center",
            tooltip:true,

          },
          {
            title:this.$t('common.trayId'),
            key:"",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.materialId'),
            key:"materielid",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.materialName'),
            key:"materielname",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.package'),
            key:"specdesc",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.batch'),
            key:"batchno",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.status'),
            key:"status",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.measureUnit'),
            key:"unit",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.totalNum'),
            key:"",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.totalWeight'),
            key:"",
            align:"center",
            tooltip:true
          },

          {
            title:this.$t('common.planPickNum'),
            key:"",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.planPickWeight'),
            key:"",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.actualPickNum'),
            key:"actNum",
            align:"center",
            tooltip:true,
            render:(h,params)=>{
              return h('Input',{
                props:{
                  value:params.row.actNum,
                  number:true
                },
                on:{
                  "input":e=>{
                    this.tableData[params.index].actNum = e
                  }
                }
              })
            }
          },
          {
            title:this.$t('common.actualPickWeight'),
            key:"actWeight",
            align:"center",
            tooltip:true,
            render:(h,params)=>{
              return h('Input',{
                props:{
                  value:params.row.actWeight,
                  number:true
                },
                on:{
                  "input":e=>{
                    this.tableData[params.index].actWeight = e
                  }
                }
              })
            }
          }
        ],
        tableData:[
          {
            actNum:12,
            actWeight:0,
          }
        ],



      }
    },
    created() {
      this.getTypes();
      this.getData()
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    },
    methods:{
      //获取页面选项数据
      async getTypes(){
        await this.getType("pickStatus",this.pickStatuses)
      },
      //获取表格数据
      getData(num){
        if(num){this.formFilter.pageNum = num}
        this._axios('get',"outorder/taskpick",this.formFilter,data=>{
          if(data &&data.list.length>0){
            this.tableData = data.list;
            this.total = data.total;
          }
        })

      },
      pick(){
        let list = this.$refs.table.getSelection();
        console.log(list)
        this._axios("put","outorder/taskpick",list,data=>{
          console.log(data)
        })
      }

    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
