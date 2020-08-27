<template>
  <div class="unqualified">
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

          <Form-item label="客户描述" >
            <Input v-model="customerdescribe" @on-change="searchItemTypeByCondition"
            placeholder="请输入"/>
          </Form-item>

          <Form-item label="登记日期" >
              <DatePicker v-model="searchCommodityCategory.startDate" @on-change="searchItemTypeByCondition" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
              -<DatePicker v-model="searchCommodityCategory.endDate" @on-change="searchItemTypeByCondition" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </Form-item>

          <Form-item label="供应商车间" >
            <Input v-model="searchCommodityCategory.supplierManagementid" @on-change="searchItemTypeByCondition"
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
          axios.post(sessionStorage.http+`/getunqualifieddataByCondition`,param)
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
              },
                columns11: [
                  {
                      title: '时间',
                      align: 'center',
                      key: 'putindate',
                  },
                    {
                        title: '批号',
                        key: 'stocknumber',
                        align: 'center',
                    },
                    {
                        title: '数量',
                        key: 'diffquantity',
                        align: 'center',
                    },
                    {
                        title: '摘要',
                        key: 'suppliername',
                          align: 'center',
                    },
                    {
                        title: '不合格项目',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '记录人',
                        key: 'insertid',
                        align: 'center',
                    },
                    {
                        title: '处理情况',
                        align: 'center',
                        children: [
                            {
                                title: '年',
                                key: 'monthday',
                                align: 'right',
                            },
                            {
                                title: '处理方式',
                                key: 'cname',
                                align: 'center',
                            }
                        ]
                    },
                    {
                        title: '记录人',
                        key: 'gender',
                        align: 'center',
                    },
                    {
                        title: '不合格证使用情况',
                        align: 'center',
                        children: [
                            {
                                title: '年',
                                key: 'monthday',
                                align: 'right',
                            },
                            {
                                title: '数量(张)',
                                key: 'caddress',
                                align: 'center',
                            },
                            {
                                title: '粘贴人',
                                key: 'cname',
                                align: 'center',
                            },
                            {
                                title: '复核人',
                                key: 'cname',
                                align: 'center',
                            }
                        ]
                    },
                ],
                data10: []
            }
        },
        mounted () {
        },
        methods:{
          searchItemTypeByCondition(){
             this.searchCommodityCategory.startDate = this.dateFormat(this.searchCommodityCategory.startDate)
             this.searchCommodityCategory.endDate = this.dateFormat(this.searchCommodityCategory.endDate)
             this.searchCommodityCategory.loginStatus = sessionStorage.loginStatus,
             this.searchCommodityCategory.curPage = this.pagenumber
             this.searchCommodityCategory.pageSize = this.pagesize

            axios.post(sessionStorage.http+`/getunqualifieddataByCondition`,this.searchCommodityCategory)
              .then((result) => {
                this.data10 = result.data.data
                this.total = result.data.length
              })
              .catch((err) => {
                console.log('请检查您的网络连接'+err)
              })
          },
          dateFormat (date) {
            if (date=='') {
              return ''
            }
            let time = new Date(date);
            let year = time.getFullYear();
            let month = Number(Number(time.getMonth()) + 1) >= 10 ? Number(time.getMonth()) + 1 : '0' + Number(Number(time.getMonth()) + 1);
            let day = Number(time.getDate()) >= 10 ? time.getDate() : '0' + time.getDate();
            // let hour = Number(time.getHours()) >= 10 ? time.getHours() : '0' + time.getHours();
            // let minutes = Number(time.getMinutes()) >= 10 ? time.getMinutes() : '0' + time.getMinutes();
            // let second = Number(time.getSeconds()) >= 10 ? time.getSeconds() : '0' + time.getSeconds();
            return `${year}-${month}-${day}`;
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
            let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&itemcode="+this.searchCommodityCategory.goodsid+
            "&stocknumber="+this.searchCommodityCategory.stockNumber+
            "&goodsDescribe="+this.searchCommodityCategory.goodsdescribe+
            "&checknumber="+this.searchCommodityCategory.checkNumber+"&supplierManagementId="+this.searchCommodityCategory.supplierManagementId


            window.open(sessionStorage.http+"/exportunqualifiedreport?"+param)
          },
        }
    }
</script>
<style lang="less">
  .unqualified{
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
