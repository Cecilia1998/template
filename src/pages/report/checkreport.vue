<template>
  <div class="checkreport">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="物料号">
            <Input v-model="searchCommodityCategory.materielId" @on-change="searchItemTypeByCondition"
            placeholder="请输入"/>
          </Form-item>

          <Form-item label="物料名称" >
            <Input v-model="searchCommodityCategory.materielName" @on-change="searchItemTypeByCondition"
            placeholder="请输入"/>
          </Form-item>


      </div>
    </Form>
    <br><br>
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
          axios.post(sessionStorage.http+`/getcheckdataByCondition`,param)
            .then((result) => {
              console.log(result)
              this.total = result.data.length
              this.data10 = result.data.data
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
              searchCommodityCategory:{
              },
                columns11: [
                  {title: '序号',key: 'linenum',align: 'center', width: 75,
                    render:(h,params)=>{
                      return h("div",+params.row._index + 1+((this.pagenumber-1)*this.pagesize))
                    }
                  },
                    {
                        title: '物料号',
                        key: 'materielId',
                        align: 'center',
                    },
                    {
                        title: '物料名称',
                        key: 'materielName',
                        align: 'center',
                    },
                    {
                        title: '计量单位',
                        key: 'unit',
                        align: 'center',
                    },
                    {
                        title: '包装规格',
                        key: 'packageStandards',
                        align: 'center',
                    },
                    {
                        title: '账存情况',
                        align: 'center',
                        children: [
                            {
                                title: '账存件数',
                                key: 'stockNum',
                                align: 'center',
                            },
                            {
                                title: '账存重量',
                                key: 'stockWeight',
                                align: 'center',
                            },
                        ]
                    },
                    {
                        title: '实际库存件数',
                        key: 'checkNum',
                        align: 'center',
                    },
                    {
                        title: '实际库存重量',
                        key: 'checkWeight',
                        align: 'center',
                    },
                    {
                        title: '盘盈亏情况',
                        align: 'center',
                        children: [
                            {
                                title: '件数',
                                key: 'differNum',
                                align: 'center',
                            },
                            {
                                title: '重量',
                                key: 'differWeight',
                                align: 'center',
                            },
                            {
                                title: '原因',
                                align: 'center',
                            }
                        ]
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
            axios.post(sessionStorage.http+`/getcheckdataByCondition`,this.searchCommodityCategory)
              .then((result) => {
                this.total = result.data.length
                this.data10 = result.data.data
              })
              .catch((err) => {
                console.log('请检查您的网络连接'+err)
              })
          },
          exportcheckreport(){
            let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&materielId="+this.searchCommodityCategory.materielId+
            "&materielName="+this.searchCommodityCategory.materielName+
            "&vendorName="+this.searchCommodityCategory.vendorName+
            "&qualityStatus="+this.searchCommodityCategory.qualityStatus
            window.open(sessionStorage.http+"/exportcheckreport?"+param)
          },
          changepage (pagenumber) {
            this.pagenumber = pagenumber
            this.searchItemTypeByCondition()
          },
          changesize (pagesize) {
            this.pagesize = pagesize
            this.searchItemTypeByCondition()
          },
        }
    }
</script>
<style lang="less">
  .checkreport{
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
