<template lang="html">
  <div class="commodityscustomer">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="商品名称">
            <Select v-model="searchCommoditySCustomer.goodsid" clearable placeholder="请选择"
            @on-change="searchCommoditySCustomerByCondition">
              <Option v-for="(itemtype,key) in itemtypelist" :key="key" :value="itemtype.goodsid">
              {{itemtype.goodsname}}</Option>
            </Select>
          </Form-item>
          <Form-item label="供应商名称" >
            <Select v-model="searchCommoditySCustomer.supplierid" clearable placeholder="请选择"
            @on-change="searchCommoditySCustomerByCondition">
              <Option v-for="(supplierinfo,key) in supplierinfolist" :key="key" :value="supplierinfo.supplierid">
              {{supplierinfo.suppliername}}</Option>
            </Select>
          </Form-item>
          <Form-item label="客户名称" >
            <Select v-model="searchCommoditySCustomer.customerid" clearable placeholder="请选择"
            @on-change="searchCommoditySCustomerByCondition">
              <Option v-for="(customerinfo,key) in customerinfolist" :key="key" :value="customerinfo.customerid">
              {{customerinfo.customername}}</Option>
            </Select>
          </Form-item>
          <Form-item label="登记时间" >
            <tr>
              <td>
                <DatePicker v-model="searchCommoditySCustomer.startdate" type="date" placeholder="请选择"
                @on-change="onStartTimeChange" style="width: 120px" :options="startTimeOption"
                :editable="false"></DatePicker>
              </td>
              <!-- <td>
                <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/>
              </td> -->
              -
              <td>
                <DatePicker v-model="searchCommoditySCustomer.enddate" style="width: 120px" type="date" placeholder="请选择"
                @on-change="onEndTimeChange" :options="endTimeOption"
                :editable="false"></DatePicker>
              </td>
            </tr>
          </Form-item>
      </div>
    </Form>
    <Row>
      <Col span="24" style="display:flex;justify-content:space-between">
        <div class="" >
          <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="delete_confirm=true"
          style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
          <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
          style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
        </div>
      </Col>
    </Row>
    <br>
    <Table stripe border height=520 :columns="tableColumns.card" :data="commoditySCustomerShow"
    @on-selection-change="onSelectionChange"></Table>
    <br>
    <div class="page">
      <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize"
      @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
    </div>

    <Modal v-model="delete_confirm" width="360" style="font-size:14px" :mask-closable='false'>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span>确定要删除吗？</span>
      </div>
      <div slot="footer" style="display:flex;justify-content:center;">
        <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection">确定删除</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import $ from 'jquery'
import router from '../../router'
export default {
  components: {},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:20,
      delete_confirm:false,
      deleteButtonFlag:true,
      commoditySCustomer:[],
      commoditySCustomerShow:[],
      deleteCommoditySCustomer:[],
      itemtypelist:[],
      supplierinfolist:[],
      customerinfolist:[],
      startTimeOption: {},
      endTimeOption: {},
      searchCommoditySCustomer:{},
      tableColumns: {
        card: [
          {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '商品编号', key: 'goodsid', align: 'center'},
          {title: '商品名称',key: 'goodsName', align: 'center'},
          {title: '供应商名称',key: 'supplierName', align: 'center'},
          {title: '客户名称',key: 'customerName', align: 'center'},
          // {title: '包装规格',key: 'packType', align: 'center'},
          {title: '登记时间', key: 'registertime', align: 'center'}
          ],
      }
    }
  },

  created(){
    axios.post(sessionStorage.http+`/selectAllCommoditySCustomer?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      this.commoditySCustomerShow=result.data.list
      this.total=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err.message)
    })

    axios.post(sessionStorage.http+`/getAllQuery?loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      this.itemtypelist=result.data
      this.supplierinfolist=result.data1
      this.customerinfolist=result.data2
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err.message)
    })

  },

  computed:{},

  methods:{
    searchCommoditySCustomerByCondition(){
        axios.post(sessionStorage.http+`/getCommoditySCustomerByCondition?pageNum=1&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`, this.searchCommoditySCustomer)
        .then((result) => {
          this.commoditySCustomerShow=result.data.list
          this.total=result.data.total
          // this.searchCommoditySCustomer.startdate=null
          // this.searchCommoditySCustomer.enddate=null
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err.message)
        })
    },

    onSelectionChange (row) {
      this.deleteCommoditySCustomer = row
      if(this.deleteCommoditySCustomer.length>0){
        this.deleteButtonFlag=false
      }else{
        this.deleteButtonFlag=true
      }
    },

    deleteSelection(){
      if(this.deleteCommoditySCustomer.length==0){
        this.delete_confirm = false;
        this.$Message.info('请先勾选需要删除项');
      }else{
        axios.post(sessionStorage.http+`/deleteCommoditySCustomer?pageNum=${this.pageNum}&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`, this.deleteCommoditySCustomer,this.searchCommoditySCustomer)
        .then((result) => {
          this.commoditySCustomerShow=result.data.list
          this.total=result.data.total
          this.delete_confirm = false;
          this.deleteButtonFlag = true;
          this.$Message.success('删除成功');
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err.message)
        })
      }
    },

    handleChangePage (value) {
      this.pageNum = value
      axios.post(sessionStorage.http+`/getCommoditySCustomerByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchCommoditySCustomer)
      .then((result) => {
        this.commoditySCustomerShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err.message)
      })
    },

    handleChangePageSize(value){
      this.pageSize = value
      this.pageNum = 1
      axios.post(sessionStorage.http+`/getCommoditySCustomerByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchCommoditySCustomer)
      .then((result) => {
        this.commoditySCustomerShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err.message)
      })
    },

    //登记时间
    onStartTimeChange(startTime, type) {
          this.endTimeOption = {
            disabledDate(endTime) {
              return endTime < new Date(startTime)
            }
          }
          this.searchCommoditySCustomerByCondition();
        },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onEndTimeChange(endTime, type) {
        this.startTimeOption = {
          disabledDate(startTime) {
            return startTime > new Date(endTime)
          }
        }
        this.searchCommoditySCustomerByCondition();
      }

  }
}

</script>

<style lang="css">
  .ivu-table-overflowX{
    overflow-x: hidden;
  }
</style>

<style lang="less">
  .commodityscustomer{
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
