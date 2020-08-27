<template>
  <div class="">
    <Form class='formFilter' v-model="formFilter" :label-width="100">
      <Row>
        <Col span="6" xl="4" >
          <FormItem label="仓库">
            <Select v-model="warehouseid" clearable>
              <Option v-for="item in warehouses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6" xl="4" >
          <FormItem label="库区">
            <Select v-model="districtid" clearable>
              <Option v-for="item in districts" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6" xl="4" >
          <FormItem label="货区">
            <Select v-model="formFilter.cargoareaid" clearable>
              <Option v-for="item in cargoareas" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6" xl="4" >
          <FormItem label="货位">
            <Select v-model="formFilter.cargoareaid" clearable>
              <Option v-for="item in cargoareas" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6" xl="4" >
          <FormItem label="托盘号">
            <Input v-model="formFilter.trayid"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <div class="spaceBetween">
      <div>
        <Button class="btnForm" shape="circle" :type="isSelected?'error':'default'" icon="md-trash">删除选中项</Button>
      </div>
      <div>
        <Button class="btnForm" shape="circle" type="primary">新增</Button>
      </div>
    </div>

    <Table class="table" :max-height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}"></Table>
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
            title:"序号",
            align:"center",
            width:65,
            render:(h,params)=>{
              return h("div",params.index+1 + this.formFilter.pagesize*(this.formFilter.pagenum-1))
            }
          },
          {
            title:"",
            key:"",
            align:"center",
            tooltip:true,

          }
        ],
        tableData:[],



      }
    },
    watch:{
      formFilter:{
        deep:true,
        handler(){
          this.getData()
        }
      }
    },
    created() {
      this.getTypes();
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop;
    },
    methods:{
      //获取页面选项数据
      async getTypes(){

      },
      //获取表格数据
      getData(num){
        if(num) this.formFilter.pagenum = num;
        console.log(this.formFilter)
        this._axios("get","",this.formFilter,data=>{
          console.log(data)
        })

      },

    },
  }
</script>

<style lang="less">
@import '../../assets/styles/common';

</style>
