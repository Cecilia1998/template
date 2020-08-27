<template>
  <div class="dangermaterial">
    <Form :label-width="100" inline style="text-align:left;">
      <div>
        <Form-item label="开始日期">
            <DatePicker v-model="searchCommodityCategory.startDatestr" @on-change="startDateChanged"  style="width: 120px" type="date" placeholder="请选择" class="dateInput"></DatePicker>
        </Form-item>

        <Form-item label="结束日期">
            <DatePicker v-model="searchCommodityCategory.endDatestr" @on-change="endDateChanged" type="date" style="width: 120px" placeholder="请选择" class="dateInput"></DatePicker>
        </Form-item>
    </div>
  </Form>
  <div class="" style="position:relative;">
    <div class="" style="position:absolute;right:0px;top:-54px;z-index:999">
      <Button type="primary" shape="circle" @click="exportcheckreport"
      style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">导&nbsp;&nbsp;出</Button>
    </div>
    <Table  :columns="columns11" :data="data10" border height="500"></Table>
  </div>
  <br>
    <Page class="page" :total="total" show-total @on-change="changepage" @on-page-size-change="changesize" show-elevator :page-size="pagesize" :page-size-opts="[10,20,30]" show-sizer />
</div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
        this.searchCommodityCategory.startDatestr = this.formartDateStart(new Date())
        this.searchCommodityCategory.endDatestr = this.formartDateEnd(new Date())
        this.searchCommodityCategory.startDate = this.searchCommodityCategory.startDatestr
        this.searchCommodityCategory.endDate = this.searchCommodityCategory.endDatestr
        let param = {loginStatus:sessionStorage.loginStatus, curPage : 1,pageSize : 20,
          startDate:this.searchCommodityCategory.startDate,
          endDate:this.searchCommodityCategory.endDate}
          axios.post(sessionStorage.http+`/getdangerdataByCondition`,param)
            .then((result) => {
              console.log(result)
              this.data10 = result.data.data
              this.total = result.data.length
            })
            .catch((err) => {
              console.log('请检查您的网络连接'+err)
            })
      },
        data () {
            return {
              total:0,
              pagesize:20,
              pagenumber:1,
              customerdescribe:"",
              searchCommodityCategory:{

              },
                columns11: [
                  {title: '序号',key: 'linenum',align: 'center', width: 60,
                    render:(h,params)=>{
                      return h("div",+params.row._index + 1+((this.pagenumber-1)*this.pagesize))
                    }
                  },
                    {
                        title: '境域',
                        key: 'condition',
                        align: 'center',
                        render:(h,params)=>{
                          let islabel = '';
                        if(params.row.condition=='0'){
                          islabel = '国产';
                        }else if(params.row.condition=='1'){
                          islabel = '进口';
                        }
                        return h('div',islabel);
                        }
                    },
                    {
                        title: '品类',
                        key: 'category',
                        align: 'center',
                    },
                    {
                        title: '品名',
                        key: 'materielName',
                        align: 'center',
                    },
                    {
                        title: '供应商',
                        key: 'supplier',
                        align: 'center',
                    },
                    {
                        title: '规格',
                        key: 'packageStandards',
                        align: 'center',
                    },
                    {
                        title: '单位',
                        key: 'unit',
                        align: 'center',
                    },
                    {
                        title: '上期结存数',
                        key: 'trayNum',
                        align: 'center',
                    },
                    {
                        title: '入库数量',
                        key: 'inNum',
                        align: 'center',
                    },
                    {
                        title: '出库数量',
                        key: 'outNum',
                        align: 'center',
                    },
                    {
                        title: '本期结存数量',
                        align: 'center',
                        render: (h, params) => {
                            return h('span',(+params.row.trayNum)+(+params.row.inNum)-params.row.outNum)
                          }
                    },

                    {
                        title: '备注',
                        key: 'remark',
                        align: 'center',
                    }
                ],
                data10: []
            }
        },
        mounted () {
        },
        methods:{

          searchItemTypeByCondition(){

            this.searchCommodityCategory.loginStatus = sessionStorage.loginStatus,
            this.searchCommodityCategory.curPage = this.pagenumber
            this.searchCommodityCategory.pageSize = this.pagesize
            console.log(this.searchCommodityCategory)
            axios.post(sessionStorage.http+`/getInOutDataByCondition`,this.searchCommodityCategory)
              .then((result) => {
                this.data10 = result.data.data
                this.total = result.data.length
              })
              .catch((err) => {
                console.log('请检查您的网络连接'+err)
              })
          },
          changepage (pagenumber) {
            this.pagenumber = pagenumber
            this.searchItemTypeByCondition()
          },
          changesize (pagesize) {
            this.pagesize = pagesize
            this.searchItemTypeByCondition()
          },
          startDateChanged(){//出库日期起始日期改变
            if(this.searchCommodityCategory.startDatestr != ''){
              this.searchCommodityCategory.startDate = this.formartDate(this.searchCommodityCategory.startDatestr)
            }else {
              this.searchCommodityCategory.startDate = undefined
            }
            if(this.searchCommodityCategory.startDatestr != '' && this.searchCommodityCategory.endDatestr != ''){
              if(+this.formartDate(this.searchCommodityCategory.startDatestr) > +this.formartDate(this.searchCommodityCategory.endDatestr)){
                console.log(this.searchCommodityCategory.startDate)
                alert("起始日期不能大于结束日期")
                      this.searchCommodityCategory.startDate = undefined
                      this.searchCommodityCategory.startDatestr = undefined
              }
            }
            if(this.searchCommodityCategory.startDate != null && this.searchCommodityCategory.startDate != undefined){
              this.searchItemTypeByCondition()
            }
          },
          endDateChanged(){//出库日期结束日期改变
            if(this.searchCommodityCategory.endDatestr != ''){
              this.searchCommodityCategory.endDate = this.formartDateEnd(this.searchCommodityCategory.endDatestr)
            }else {
              this.searchCommodityCategory.endDate = undefined
            }
            if(this.searchCommodityCategory.startDatestr != '' && this.searchCommodityCategory.endDatestr != ''){
              if(+this.formartDate(this.searchCommodityCategory.startDatestr) > +this.formartDateEnd(this.searchCommodityCategory.endDatestr)){
                console.log(this.searchCommodityCategory.endDate)
                alert("结束日期不能小于起始日期")
                     this.searchCommodityCategory.endDate = undefined
                     this.searchCommodityCategory.endDatestr = undefined
              }
            }
            if(this.searchCommodityCategory.endDate != null && this.searchCommodityCategory.endDate != undefined){
              this.searchItemTypeByCondition()
            }
          },
          exportcheckreport(){
            let param = "loginStatus="+`${sessionStorage.loginStatus}`+
            "&startDate="+this.searchCommodityCategory.startDate+
            "&endDate="+this.searchCommodityCategory.endDate

            window.open(sessionStorage.http+"/exportdangerdetailreport?"+param)
          },
          formartDate(date){//日期格式化
            var date = new Date(date);
            let  Y = date.getFullYear() +''
            let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
            let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
            let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
            let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
            let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
            return  Y + M  + D+'000000'
          },
          formartDateStart(date){//日期格式化
            var date = new Date(date);
            let  Y = date.getFullYear() +''
            let  M = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + '' : date.getMonth() + 1 +'';
            let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
            let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
            let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
            let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
            return  Y + M  + D+'000000'
          },
          formartDateEnd(date){//日期格式化
            var date = new Date(date);
            let  Y = date.getFullYear() +''
            let  M = date.getMonth() + 2 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 2 +'';
            let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
            let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
            let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
            let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
            return  Y + M  + D+'999999'
          },
        }
    }
</script>
<style lang="less">
  .dangermaterial{
    th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-table-tbody{
      line-height: 16px !important;
    }
    .ivu-form .ivu-form-item-label{
      color:#5aa5ff !important;
      font-size: 12px !important;
      font-family:"Microsoft YaHei";
      line-height: 20px;
    }
    .ivu-input-wrapper{
      width: 160px;
      height: 20px;
    }
    .ivu-select{
      width: 160px;
      height: 20px;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active{
      background-color: white !important;
      font-size: 20px;
      border-radius: 8px;
    }
    .ivu-tabs-ink-bar{
      background-color: #fff;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
      font-size: 14px;
      background-color: #f3f3f3;
    }
    .ivu-tabs-nav-scroll{
      background-color: #f3f3f3;
    }
    .ivu-input{
      border:1px solid #888888;
    }
    .ivu-select-selection{
      border:1px solid #888888;
    }
    .ivu-table-overflowY {
      overflow-y: scroll;
    }
   .ivu-table-tbody{
     font-size: 12px;
     color:#999;
     font-family:"Microsoft YaHei";
     vertical-align: middle;
   }
   .ivu-table td{
     background-color:#fff;
     height: 40px;
   }

   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
     height: 40px;
   }
   .ivu-input-icon{
        position: absolute;
        right:45px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
   .page{
     .ivu-select-selection{
       bottom: 6px
     }
   }
  }
</style>
