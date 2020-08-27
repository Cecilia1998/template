<template lang="html">
  <div class="stockDetail">
    <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">
      <tr>
        <td colspan="2" >
          <Form-item label="货位号">
              <Input v-model="formFilter.storageId"  placeholder="请输入"style="width:160px" />
          </Form-item>
          <Form-item label="托盘号">
            <Input v-model="formFilter.palletCode"  placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="供应商">
            <Input v-model="formFilter.vendorName" placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="物料号">
              <Input v-model="formFilter.materielId" placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="生产地">
              <Input v-model="formFilter.producerName"  placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="仓库" >
            <Select v-model="formFilter.warehouseId"  placeholder="请选择" style="width: 160px">
              <Option value=" ">所有</Option>
              <Option v-for=" item in this.WarehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="批次号" >
            <Input v-model="formFilter.stockBatch"
            placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="库区" >
            <Select v-model="formFilter.districtId" placeholder="请选择" style="width: 160px">
              <Option value=" ">所有</Option>
              <Option v-for=" item in this.DistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
            </Select>
          </Form-item>
          <!-- <Form-item label="生产日期" id="product_date">
            <DatePicker v-model="formFilter.startEffectDate" @on-change="startDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker> - <DatePicker v-model="formFilter.endEffectDate" @on-change="endDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </Form-item> -->
          <Form-item label="轨迹日期" id="product_date">
            <DatePicker v-model="formFilter.startDateReck" @on-change="startDateChangedReck" type="date" placeholder="请选择" class="dateInput" ></DatePicker> - <DatePicker v-model="formFilter.endDateReck" @on-change="endDateChangedReck" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </Form-item>
        </td>
      </tr>
      <tr>
        <td>
        </td>
        <td align="right" >
          <Form-item label="   ">
            <span class="textOutput">&nbsp;</span>
            <Button  type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='exportData'>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</Button>
          </Form-item>
        </td>
      </tr>
    </Form>
    <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" ></Table>
    <br/>
    <div class="stockDetailPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import FileSaver from 'file-saver'
import iview from 'view-design'
import XLSX from 'xlsx'
export default {
  components: {
   },
  data () {
    return {
      WarehouseList:[],
      DistrictList:[],
      total:0,
      stockList:[],
      supplierOptions:[],
      loading:false,
      curPage:1,
      pageSize:20,
      formFilter: {
        storageId:'',
        palletCode:'',
        vendorCode:'',
        materielId:'',
        producerCode:'',
        stockBatch:'',
        districtId:'',
        curPage:1,
        pageSize:20,
        startDateInStr:'',
        endDateInStr:'',
        startDateDueStr:'',
        endDateDueStr:'',
        startEffectTimeStr:'',
        endEffectTimeStr:'',
        starteRecheckTimeStr:'',
        endRecheckTimeStr:'',
        loginStatus:`${sessionStorage.loginStatus}`,
      },
      definePageSize:10,
      tableColumns: {
        data:[
        ],
         card: [
          {title: '序号',key: 'keyid',width: 80,align: 'center',render:(h,params)=>{
              return h("div",+params.row._index + 1 + (this.formFilter.curPage - 1) * this.formFilter.pageSize)
            }},

          {title: '物料号', key: 'materielId',width: 300,align: 'center'},
          {
              title: '境域',
              key: 'condition',
              width: 150,
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
          {title: '物料品类', key: 'category',width: 150,align: 'center'},
          {title: '物料名称', key: 'materielName',width: 150,align: 'center'},
          {title: '货位号',key: 'storageId', width: 150,align: 'center'},
          {title: '托盘号', key: 'palletCode',width:120,align: 'center'},
          {title: '批次号', key: 'stockBatch',width:120,align: 'center'},
          {title: '生产地', key: 'producerName',width:120,align: 'center'},
          {title: '库存轨迹时间', key: 'createTime',width:160,align: 'center'},
          {title: '供应商', key: 'vendorName',width:120,align: 'center'},
          {title: '件数',key: 'trailNum',width:200,align: 'center'},
          {title: '重量(T)',key: 'trailWeight',width:200,align: 'center', render:(h,params)=>{
            let islabel = params.row.trailWeight;
            if(params.row.unit == 'KG'){
              islabel = params.row.trailWeight/1000;
            }else if(params.row.unit == 'G'){
              islabel = params.row.trailWeight/1000000;
            }else if(params.row.unit == '件'){
              islabel = '';
            }
              return h('div',islabel);
            }},
          {title: '客户',key: 'returnquantity',width:130,align: 'center'},
          {title: '仓库', key: 'warehouseName', width:120,align: 'center' },
          {title: '库区', key: 'districtName', width:120,align: 'center' },
           {title: '业务单号',key: 'orderId',width: 230, align: 'center'},
           {title: '业务类型',key: 'orderType',width: 230, align: 'center', render:(h,params)=>{
               let islabel = '';
               if(params.row.orderType == '0'){
                 islabel = '入库';
               }else if(params.row.orderType == '1'){
                 islabel = '出库';
               }else if(params.row.orderType == '2'){
                 islabel = '盘点入库';
               }else if(params.row.orderType == '3'){
                 islabel = '盘点出库';
               }else if(params.row.orderType == '4'){
                 islabel = '盘盈';
               }else if(params.row.orderType == '5'){
                 islabel = '盘亏';
               }else if(params.row.orderType == '6'){
                 islabel = '移库出库';
               }else if(params.row.orderType == '7'){
                 islabel = '移库入库';
               }else if(params.row.orderType == '8'){
                 islabel = '拼盘出库';
               }else if(params.row.orderType == '9'){
                 islabel = '拼盘入库';
               }
               return h('div',islabel);
             }}
         ]
       }
    }
  },
  created(){        //渲染成功之后的专改
    axios.get(sessionStorage.http+`/getAllWareHouseInfo?loginStatus=${sessionStorage.loginStatus}`)
     .then((res)=>{
       res.data.forEach(item => {
          if (item.isStart == '1') {
            this.WarehouseList.push(item)
          }
        })
     })
     axios.get(sessionStorage.http+`/getAllDistrictInfo?loginStatus=${sessionStorage.loginStatus}`)
      .then((res)=>{
        res.data.forEach(item => {
           if (item.isStart == '1') {
             this.DistrictList.push(item)
           }
         })
      })
      let curDate = new Date();
        this.formFilter.startDateReck = curDate
      this.formFilter.endDateReck = new Date(curDate.getTime() + 24*60*60*1000)
      this.formFilter.starteRecheckTimeStr = this.formartDate(curDate)
      this.formFilter.endRecheckTimeStr = this.formartDate(new Date(curDate.getTime() + 24*60*60*1000))
    this.formFilter.remark1 = '2'
    this.queryData()
  },
  computed:{
  },
  methods:{
    exportData(){
      let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&storageId="+
      this.formFilter.storageId+"&palletCode="+this.formFilter.palletCode+"&vendorCode="+this.formFilter.vendorCode+
      "&materielId="+this.formFilter.materielId+"&producerCode="+this.formFilter.producerCode+
      "&stockBatch="+this.formFilter.stockBatch+"&districtId="+this.formFilter.districtId+
      "&starteRecheckTimeStr="+this.formFilter.starteRecheckTimeStr+
      "&endRecheckTimeStr="+this.formFilter.endRecheckTimeStr
      console.log(param)
      window.open(sessionStorage.http+"/exportStockSDetail?"+param)

    },
    queryData(){//查询数据
      axios.post(sessionStorage.http+'/getStockDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        this.tableColumns.data = res.data.data
        this.stockList = res.data.data
        this.total = res.data.length
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    formartDate(date){//日期格式化
      let  Y = date.getFullYear() +''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
      // console.log(Y + M + D)
      return Y + M + D+'000000'
    },

    startDateChangedIn(){//有效期起始期改变
      if(this.formFilter.startEffectDate != ''){
        this.formFilter.startEffectTimeStr = this.formartDate(this.formFilter.startEffectDate)
      }else {
        this.formFilter.startEffectTimeStr = undefined
      }
      if(this.formFilter.startEffectDate != '' && this.formFilter.endEffectDate != ''){
        if(this.formartDate(this.formFilter.startEffectDate) > this.formartDate(this.formFilter.endEffectDate)){
          console.log(this.formFilter.startEffectDate)
          alert("起始日期不能大于结束日期")
                this.formFilter.startEffectDate = undefined
                this.formFilter.startEffectTimeStr = undefined
        }
      }
      if(this.formFilter.startEffectTimeStr != null && this.formFilter.startEffectTimeStr != undefined){
        this.queryData()
      }
    },
    endDateChangedIn(){//有效期结束期改变
      if(this.formFilter.endEffectDate != ''){
        this.formFilter.endEffectTimeStr = this.formartDate(this.formFilter.endEffectDate)
      }else {
        this.formFilter.endEffectTimeStr = undefined
      }
      if(this.formFilter.startEffectDate != '' && this.formFilter.endEffectDate != ''){
        if(this.formartDate(this.formFilter.startEffectDate) > this.formartDate(this.formFilter.endEffectDate)){
          console.log(this.formFilter.endEffectDate)
          alert("结束日期不能小于起始日期")
               this.formFilter.endEffectDate = undefined
               this.formFilter.endEffectTimeStr = undefined
        }
      }
      if(this.formFilter.endEffectTimeStr != null && this.formFilter.endEffectTimeStr != undefined){
        this.queryData()
      }
    },

    startDateChangedReck(){//复检期起始日期改变
      if(this.formFilter.startDateReck != ''){
        this.formFilter.starteRecheckTimeStr = this.formartDate(this.formFilter.startDateReck)
      }else {
        this.formFilter.starteRecheckTimeStr = undefined
      }
      if(this.formFilter.startDateReck != '' && this.formFilter.endDateReck != ''){
        if(this.formartDate(this.formFilter.startDateReck) > this.formartDate(this.formFilter.endDateReck)){
          alert("起始日期不能大于结束日期")
                this.formFilter.startDateReck = undefined
                this.formFilter.starteRecheckTimeStr = undefined
        }
      }
      if(this.formFilter.starteRecheckTimeStr != null && this.formFilter.starteRecheckTimeStr != undefined){
        this.queryData()
      }
    },
    endDateChangedReck(){//复检期结束日期改变
      if(this.formFilter.endDateReck != ''){
        this.formFilter.endRecheckTimeStr = this.formartDate(this.formFilter.endDateReck)
      }else {
        this.formFilter.endRecheckTimeStr = undefined
      }
      if(this.formFilter.startDateReck != '' && this.formFilter.endDateReck != ''){
        if(this.formartDate(this.formFilter.startDateReck) > this.formartDate(this.formFilter.endDateReck)){
          alert("结束日期不能小于起始日期")
               this.formFilter.endDateReck = undefined
               this.formFilter.endRecheckTimeStr = undefined
        }
      }
      if(this.formFilter.endRecheckTimeStr != null && this.formFilter.endRecheckTimeStr != undefined){
        this.queryData()
      }
    },

    handleChangePage (value) {
     this.formFilter.curPage = value
     this.queryData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      this.queryData()
    },

  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        this.queryData();
      }
    }
  }
}
</script>
<style lang="less">
.stockDetail{
  th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-form .ivu-form-item-label{
      color:#5aa5ff !important;
      font-size: 12px !important;
      font-family:"Microsoft YaHei";
      line-height: 20px;
    }
    .ivu-input-wrapper{
       width: 120px;
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
      line-height: 40px;
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
        right:5px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
   .stockDetailPage{
     .ivu-select-selection{
        bottom: 6px;
      }
   }
}

</style>

<style lang="less" scoped>
.width50{
  width: 150px;
}
.clear{clear:both;}

.title{
  color: blue;
  text-align: left;
  width: 30%;
}
.fontRed{
  color: red;
}
.fontBlue{
  color: blue;
}
.font15{
  font-size: 15px;
}
.yaHei18{
    font-size: 18px;
  }
.font20{
    font-size: 20px;
  }
.backBlue{
  background-color: #5aa5ff;
}
.yaHeiStrong18{
  font-family: Microsoft YaHei;
  font-size: 18px;
  font-weight: bold;
}
.yaHei18{
  font-family: Microsoft YaHei;
  font-size: 18px;
}
.blueYaHei18{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 18px;
}
.blueYaHei20{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 20px;
}
.redYaHei18{
  color: #fe3838;
  font-family: Microsoft YaHei;
  font-size: 18px;
}
.ButtonBlue{
  background-color: #5aa5ff;
  height: 28px;
  font-size: 16px;
  color: #ffffff;
  width: 120px;
  line-height: 5px;
}
.textInput{
  width: 160px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
.textOutput{
  width: 40px;
  display: inline-block;
}
// .dateInput{
//   width: 120px;
//   height: 28px;
//   color: #333333;
// }
.clear{clear:both;}

.title{
  /* border: 1px solid red; */
  /* float: left; */
  /* font-size: 15px; */
  color: blue;
  text-align: left;
  width: 30%;
}




td{
   // border: 1px solid red;
}
.hint{
  text-align: center;
  align:center;
}
  #overdue_day input,#product_date input{
  display: inline-block;
  width: 100px;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
</style>
