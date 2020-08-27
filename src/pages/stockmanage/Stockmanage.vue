<template lang="html">
  <div class="stock">
    <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">
      <tr >
        <td colspan="2">
          <Form-item label="货位号">
              <Input v-model="formFilter.storageId"  @on-change="queryData"  placeholder="请输入"style="width:160px" />
          </Form-item>
          <Form-item label="托盘号">
              <Input v-model="formFilter.palletCode"  @on-change="queryData"  placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="供应商">
            <Input v-model="formFilter.vendorName"  @on-change="queryData"  placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="物料号">
              <Input v-model="formFilter.materielId"  @on-change="queryData"  placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="生产地">
            <Input v-model="formFilter.producerName"  @on-change="queryData"  placeholder="请输入" style="width:160px"/>
          </Form-item>
          <Form-item label="仓库" >
            <Select v-model="formFilter.warehouseId" @on-change="queryData" placeholder="请选择" style="width: 160px">
              <Option value=" ">所有</Option>
              <Option v-for=" item in this.WarehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="库区" >
            <Select v-model="formFilter.districtId" @on-change="queryData" placeholder="请选择" style="width: 160px">
              <Option value=" ">所有</Option>
              <Option v-for=" item in this.DistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="生产日期" id="product_date">
            <DatePicker v-model="formFilter.startEffectDate"  @on-change="startDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker> - <DatePicker v-model="formFilter.endEffectDate"  @on-change="endDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </Form-item>
          <Form-item label="入库日期" id="product_date">
            <DatePicker v-model="formFilter.startDateReck" @on-change="startDateChangedReck" type="date" placeholder="请选择" class="dateInput" ></DatePicker> - <DatePicker v-model="formFilter.endDateReck" @on-change="endDateChangedReck" type="date" placeholder="请选择" class="dateInput" ></DatePicker>
          </Form-item>
        </td>
      </tr>
      <tr>
        <td  align="left">
        </td>
        <td  align="right">
          <Form-item label="" >
          </Form-item>
          <Form-item label="" >
            <Button  type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='exportData'>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</Button>
          </Form-item>
        </td>
     </tr>
    </Form>
    <Table height=500  border stripe :loading="loading" ref="selection"  :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" ></Table>
    <br />
    <div class="stockStoragePage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import iview from 'view-design'
export default {
  components: {
   },
  data () {
    return {
      WarehouseList:[],
      DistrictList:[],
      total:0,
      loading:false,
      curPage:1,
      pageSize:20,
      formFilter: {
        storageId:'',
        palletCode:'',
        vendorName:'',
        materielId:'',
        producerName:'',
        warehouseId:'',
        districtId:'',
        curPage:1,
        pageSize:20,
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
          {title: '序号',key: 'rowid',width: 80,align: 'center',render:(h,params)=>{
              return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
            }},
          {title: '物料号', key: 'materielId',width:200,align: 'center'},
          {title: '物料名称', key: 'materielName',width:200,align: 'center'},
          {title: '货位号',key: 'storageId', width:120,align: 'center'},
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
          {title: '托盘号', key: 'palletCode',width:180,align: 'center'},
          {title: '批次号', key: 'stockBatch',width:120,align: 'center'},
          {title: '生产地', key: 'producerName',width:120,align: 'center'},
          {title: '生产日期', key: 'produceDate',width:120,align: 'center'},
          {title: '供应商', key: 'vendorName',width:120,align: 'center'},
          {title: '件数', key: 'num',width:120,align: 'center'},
          {title: '重量(T)', key: 'weight',width:150, align: 'center', render:(h,params)=>{
              let islabel = params.row.weight;
              if(params.row.unit == 'KG'){
                islabel = params.row.weight/1000;
              }else if(params.row.unit == 'G'){
                islabel = params.row.weight/1000000;
              }else if(params.row.unit == '件'){
                islabel = '';
              }
              return h('div',islabel);
            }},
          {title: '存储预警日期', key: 'stockWarnDate',width:120,align: 'center'},
          {title: '入库日期',key: 'inTime',width:120,align: 'center'},
          {title: '仓库', key: 'warehouseName', width:120,align: 'center' },
          {title: '库区',key: 'districtName',width:120,align: 'center'}
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
    this.formFilter.startDateReck = new Date()
    this.formFilter.endDateReck = new Date()
    this.formFilter.starteRecheckTimeStr = this.formartDate(new Date())
    this.formFilter.endRecheckTimeStr = this.formartDate(new Date())
    this.formFilter.remark1 = '2'
    this.queryData()
  },
  methods:{
    exportData(){
      let param = "loginStatus="+`${sessionStorage.loginStatus}`+
      "&storageId="+this.formFilter.storageId+"&palletCode="+this.formFilter.palletCode+"&vendorName="+
      this.formFilter.vendorName+"&materielId="+this.formFilter.materielId+"&producerName="+this.formFilter.producerName+"&warehouseId="
      +this.formFilter.warehouseId+"&districtId="+this.formFilter.districtId+"&starteRecheckTimeStr="
      +this.formFilter.starteRecheckTimeStr+"&endRecheckTimeStr="+this.formFilter.endRecheckTimeStr+
      "&startEffectTimeStr="+this.formFilter.startEffectTimeStr+"&endEffectTimeStr="+this.formFilter.endEffectTimeStr

      window.open(sessionStorage.http+"/exportStockStorage?"+param)

    },
    queryData(){//查询数据
      axios.post(sessionStorage.http+'/getStockStorage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
          this.tableColumns.data  = res.data.data
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
      var date = new Date(date);
      let  Y = date.getFullYear() +''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
      // console.log(Y + M + D)
      return Y + M + D
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
                this.formFilter.startDateReck = ''
                this.formFilter.starteRecheckTimeStr = ''
        }
      }
        this.queryData()
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
               this.formFilter.endDateReck = ''
               this.formFilter.endRecheckTimeStr = ''
        }
      }
        this.queryData()
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
                this.formFilter.startEffectDate = ''
                this.formFilter.startEffectTimeStr = ''
        }
      }
        this.queryData()
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
               this.formFilter.endEffectDate = ''
               this.formFilter.endEffectTimeStr = ''
        }
      }
      if(this.formFilter.endEffectTimeStr != null && this.formFilter.endEffectTimeStr != undefined){
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
}
</script>


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
  width: 180px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
.textOutput{
  width: 30px;
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

<style lang="less">
    .stock{
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
      .stockStoragePage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }

</style>
