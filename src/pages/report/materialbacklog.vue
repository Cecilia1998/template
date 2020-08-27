<template>
  <!-- 不合格红色，过期黄色，近效期蓝色 -->
  <div class="materialbacklog">
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
    <Table :row-class-name="rowClassName"  :columns="columns11" :data="data10" border height="500"></Table>
  </div>
  <br>
    <Page class="page" :total="total" show-total @on-change="changepage" @on-page-size-change="changesize" show-elevator :page-size="pagesize" :page-size-opts="[10,20,30]" show-sizer />
</div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
        let param = {loginStatus:sessionStorage.loginStatus,remark3:'1', curPage : 1,pageSize : 20}
          axios.post(sessionStorage.http+`/getdetaildataByConditionforoverstock`,param)
            .then((result) => {
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
                goodsid:"",
                stockNumber:"",
                goodsdescribe:"",
                checkNumber:"",
                goodstype:""
              },
                columns11: [
                  {title: '序号',key: 'linenum', align: 'center', width: 55,render:(h,params)=>{
                    return h("div",+params.row._index + 1 + (this.pagenumber-1)*this.pagesize)
                  }},
                    {
                        title: '物料名称',
                        key: 'goodsdescribe',
                        align: 'center',
                    },
                    {
                        title: '规格型号',
                        key: 'goodsspecification',
                        align: 'center',
                    },
                    {
                        title: '单位',
                        key: 'measurementdescribe',
                        align: 'center',
                    },
                    {
                        title: 'GMP批号',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '状态',
                        key: 'qualityState',
                        align: 'center',
                    },
                    {
                        title: '库存数量',
                        key: 'number',
                        align: 'center',
                    },
                    {
                        title: '金额',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '复检期/有效期至',
                        key: 'effectivetime',
                        align: 'center',
                    },
                    {
                        title: '积压情况',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '用于产品',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '供应商',
                        key: 'supplierid',
                        align: 'center',
                        render:(h,params)=>{
                          return h("div",params.row.supplierid + params.row.suppliername)
                        }
                    },
                    {
                        title: '生产商',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '使用部门意见',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '计划单位',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '仓库',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '保管员',
                        key: 'gender',
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
      rowClassName (row, index) {
        console.log(row)
         if (row.qualityState == 'F') {
              return 'demo-table-error-row'
          }
          if (+row.overdueflag <0 ) {
               return 'demo-table-warn-row'
           }
           if (+row.dangerflag < 0&& +row.overdueflag > 0 ) {
                return 'demo-table-safe-row'
            }
          return ''
       },
      searchItemTypeByCondition(){
        this.searchCommodityCategory.loginStatus = sessionStorage.loginStatus,
        this.searchCommodityCategory.curPage = this.pagenumber
        this.searchCommodityCategory.pageSize = this.pagesize
        this.searchCommodityCategory.remark3 = '1'
        axios.post(sessionStorage.http+`/getdetaildataByConditionforoverstock`,this.searchCommodityCategory)
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
      exportcheckreport(){
        let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&itemcode="+this.searchCommodityCategory.itemcode+
        "&stocknumber="+this.searchCommodityCategory.stockNumber+
        "&itemname="+this.searchCommodityCategory.itemname+
        "&remark3=1"+
        "&suppliermanagementid="+this.searchCommodityCategory.suppliermanagementid

        window.open(sessionStorage.http+"/exportmaterialbacklogreport?"+param)
      },
    }
}
</script>
<style lang="less">
  .materialbacklog{
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
   .ivu-table .demo-table-error-row td{
      background-color: red;
      color: #333;
    }
    .ivu-table .demo-table-warn-row td{
       background-color: yellow;
       color: #333;
     }
     .ivu-table .demo-table-safe-row td{
        background-color: #BBFFFF;
        color: #333;
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
