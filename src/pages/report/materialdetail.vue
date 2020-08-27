<template>
  <div class="materialdetail">
    <Form :label-width="90" inline style="text-align:left;">
      <div>
        <Form-item label="物料产品码">
          <Input v-model="searchCommodityCategory.itemcode" @on-change="searchItemTypeByCondition"
          placeholder="请输入"/>
        </Form-item>

        <Form-item label="物料产品描述" >
          <Input v-model="searchCommodityCategory.itemname" @on-change="searchItemTypeByCondition"
          placeholder="请输入"/>
        </Form-item>


        <Form-item label="在库批号" >
          <Input v-model="searchCommodityCategory.stocknumber" @on-change="searchItemTypeByCondition"
          placeholder="请输入"/>
        </Form-item>

        <Form-item label="车间" >
          <Input v-model="searchCommodityCategory.suppliermanagementid" @on-change="searchItemTypeByCondition"
          placeholder="请输入"/>
        </Form-item>

    </div>
  </Form>
  <div class="" style="position:relative;">
    <div class="" style="position:absolute;right:0px;top:-54px;z-index:999">
      <Button type="primary" shape="circle" @click="exportcheckreport"
      style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">导&nbsp;&nbsp;出</Button>
    </div>
    <Table :columns="columns11" :data="data10" border height="500"></Table>
  </div>
  <br>
    <Page class="page" :total="total" show-total @on-change="changepage" @on-page-size-change="changesize" show-elevator :page-size="pagesize" :page-size-opts="[10,20,30]" show-sizer />
</div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
        let param = {loginStatus:sessionStorage.loginStatus, curPage : 1,pageSize : 20}
          axios.post(sessionStorage.http+`/getdetaildataByCondition`,param)
            .then((result) => {
              this.data10 = result.data.data
              for (var i = 0; i < this.data10.length; i++) {
                this.data10[i].number = this.data10[i].number.toFixed(3)
                this.data10[i].updateid = (+this.data10[i].updateid).toFixed(3)
              }
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
                goodsid:"",
                stockNumber:"",
                goodsdescribe:"",
                checkNumber:"",
                goodstype:""
              },
                columns11: [
                    {
                        title: '年',
                        align: 'right',
                        render:(h,params)=>{
                          let isstart = '';
                          let strs = [];
                          strs = params.row.putindate.split("-")
                            isstart = strs[0];
                          return h('div',isstart);
                        }
                    },
                    {
                        title: '月',
                        align: 'right',
                        render:(h,params)=>{
                          let isstart = '';
                          let strs = [];
                          strs = params.row.putindate.split("-")
                            isstart = strs[1];
                          return h('div',isstart);
                        }
                    },
                    {
                        title: '日',
                        align: 'right',
                        render:(h,params)=>{
                          let isstart = '';
                          let strs = [];
                          strs = params.row.putindate.split("-")
                            isstart = strs[2];
                          return h('div',isstart);
                        }
                    },

                    {
                        title: '批号',
                        key: 'stocknumber',
                        align: 'center',
                    },
                    {
                        title: '摘要',
                        align: 'center',
                          key: 'suppliername'
                    },
                    {
                        title: '增加数量',
                        key: 'number',
                        render:(h,params)=>{
                          let isstart = '';
                          if(params.row.type == '1'){
                            isstart = params.row.inquantity;
                          }else{
                            isstart = '';
                          }
                          return h('div',isstart);
                        }
                    },
                    {
                        title: '减少数量',
                        key: 'number',
                        render:(h,params)=>{
                          let isstart = '';
                          if(params.row.type == '1'){
                            isstart = '';
                          }else{
                            isstart = params.row.outquantity;
                          }
                          return h('div',isstart);
                        }
                    },
                    {
                        title: '结存数量',
                        key: 'number',
                        align: 'center',
                    },
                    {
                        title: '记录人',
                        align: 'center',
                          key: 'caddress'
                    },
                    {
                        title: '批次剩余量',
                        key: 'updateid',
                        align: 'center',
                    },
                    {
                        title: '备注',
                        key: 'gender',
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
            axios.post(sessionStorage.http+`/getdetaildataByCondition`,this.searchCommodityCategory)
              .then((result) => {
                this.data10 = result.data.data
                for (var i = 0; i < this.data10.length; i++) {
                  this.data10[i].number = this.data10[i].number.toFixed(3)
                  this.data10[i].updateid = (+this.data10[i].updateid).toFixed(3)
                }
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
          exportcheckreport(){
            let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&itemcode="+this.searchCommodityCategory.itemcode+
            "&stocknumber="+this.searchCommodityCategory.stockNumber+
            "&itemname="+this.searchCommodityCategory.itemname+
            "&suppliermanagementid="+this.searchCommodityCategory.suppliermanagementid

            window.open(sessionStorage.http+"/exportmaterialdetailreport?"+param)
          },
        }
    }
</script>
<style lang="less">
  .materialdetail{
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
