<template lang="html">
  <div class="movementQuery">
        <!-- //formFilter表示名字(ref),:model表示绑定的数据对象 -->
     <Form ref="formFilter" :model="formFilter" :label-width="102" inline style="text-align:left;" >

              <Form-item label="物料号" prop="moveOrderId">
                <Input id="moveOrderId" v-model="formFilter.materielId" @on-keyup="checkMoveOrderId" placeholder='请输入' @on-blur="checkMoveOrderId" element-id = "ingodownentryid" style="width: 160px;"/>
              </Form-item>
              <Form-item label="生产地">
                <Input v-model="formFilter.producerName" class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="供应商">
                <Input v-model="formFilter.vendorName"  class="textInput" placeholder="请输入" />
              </Form-item>
              <Form-item label="托盘码">
                <Input v-model="formFilter.palletCode"  class="textInput" placeholder="请输入" />
              </Form-item>

              <Form-item label="移库类型" prop="remark1" >
                <Select v-model="formFilter.remark1" style="width: 160px" placeholder='请选择' >
                  <Option value="">-所有-</Option>
                  <Option value="MD01">库内移库</Option>
                  <Option value="MD02">跨区移库</Option>
                </Select>
              </Form-item>

       </Form>

       <div class="departmenttable">
         <Table stripe border :loading="loading" ref="selection" :columns="addMoveTable.field" :data="addMoveTable.datalist" height=600 @on-sort-change='sortChange' style="margin-top:20px;"></Table>
       </div>

       &nbsp;
     <div class='page'>
       <Page  show-sizer show-elevator show-total :total="formFilter.pagetotal"  :current="formFilter.curPage" :page-size="formFilter.pageSize"  :page-size-opts="[10,20,30]"  @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
     </div>
</div>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'

  export default {

     data () {
       return {

         waa:true,
         loading:false,
         loginStatus:sessionStorage.loginStatus,

         //库区集合
         targetDistrictList:[],
         WarehouseList:[],
         DistrictList:[],
         formFilter:{
           moveOrderId:'',
           remark1:'',
           targetTrayNo:'',
           targetDistrict:'',
           targetStorageId:'',
           entryDate:'',
           partCode:'',
           partName:'',
           batchNo:'',
           // 分页信息
           pagetotal:10,
           curPage:1,
           pageSize:20,
           //排序信息
           sortKey:'moveOrderId',
           sortOrder:'asc',
         },


         addMoveTable:{
           datalist:[],

           field:[
               {title: '序号',key: 'lineNo',width: 75,align: 'center',
                       render: (h, params) => {
                          return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
                       }
               },
               {title: '物料编号',key: 'materielId',width: 180,align: 'center'},
               {title: '物料名称',key: 'materielName',width: 180,align: 'center'},
               {title: '托盘码',key: 'palletCode', width: 120,align: 'center'},
               {title: '批号',key: 'stockBatch', width: 120,align: 'center'},
               {title: '件数', key: 'num',width:120,align: 'center'},
               {title: '重量', key: 'weight',width:120,align: 'center'},
               {title: '入库日期', key: 'inTime',width:120,align: 'center'},
               {title: '起始仓库', key: 'origWarehouseId',width:120,align: 'center', render:(h,params)=>{
                   let redjsh = this.WarehouseList.find(item=>{
                     return item.warehouseId==params.row.origWarehouseId
                   }).warehouseName
                     return h('div',redjsh);
                 }},
               {title: '起始库区',key: 'origDistrictId',width: 130 ,align: 'center', render:(h,params)=>{
                   let redjsh = this.DistrictList.find(item=>{
                     return item.districtId==params.row.origDistrictId
                   }).districtName
                     return h('div',redjsh);
                 }},
               {title: '起始货位', key: 'origStorageId',width:150,align: 'center'},
               {title: '目标仓库', key: 'targetWarehouseId',width:120,align: 'center', render:(h,params)=>{
                 let redjsh = this.WarehouseList.find(item=>{
                   return item.warehouseId==params.row.targetWarehouseId
                 }).warehouseName
                   return h('div',redjsh);
                 }},
               {title: '目标库区',key: 'targetDistrictId',width: 130 ,align: 'center', render:(h,params)=>{
                   let redjsh = this.DistrictList.find(item=>{
                     return item.districtId==params.row.targetDistrictId
                   }).districtName
                     return h('div',redjsh);
                   }},
               {title: '目标货位', key: 'targetStorageId',width:150,align: 'center'},
               {title: '移库类型',key: 'remark1', width: 120,align: 'center', render:(h,params)=>{
                       if(params.row.remark1 == 'MD01'){
                         return h('div','库内移库');
                       }else{
                          return h('div','跨区移库');
                       }
                 }},
               {title: '移库时间', key: 'createTime',width:120,align: 'center'},
               {title: '供应商', key: 'vendorName',width:180,align: 'center'},
                {title: '生产地',key: 'producerName', width: 120,align: 'center'},


            ],
        },
        startTimeOption: {},
        completeTimeOption: {}
        }
      },

     created(){
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
      this.query();

    },

    watch:{
        formFilter:{
          deep:true,
          handler(){
            if(this.waa == false){
            //  console.log(this.formFilter)
              this.query();


            }else{
              this.waa = false
            }

          }
        }

    },


     methods:{

       //排序事件双向绑定排序字段和排序方式
      sortChange(value){

        this.formFilter.sortKey = value.key
        this.formFilter.sortOrder = value.order
      },



       query(){
         axios.post(sessionStorage.http+`/queryMoverOrderByCondition?loginStatus=${sessionStorage.loginStatus}`,this.formFilter)

         .then(res => {
           console.log("查询数据")
           console.log(this.formFilter)
           console.log(res)
           this.addMoveTable.datalist = res.data.resultData
           this.formFilter.pagetotal = res.data.total
         })
         .catch(res => {
           this.formFilter.pagetotal = 1
         })
       },

       // //在districtInfo数据表中查询所有的库区集合
       // axios.get(sessionStorage.http +`/move/getDistrictInfoList?loginStatus=${sessionStorage.loginStatus}`)
       // .then(res => {
       //   for(let i=0;i<res.data.length;i++){
       //     this.targetDistrictList.push(res.data[i].districtName)
       //   }
       // })
       // .catch(res => {
       // }),


       // 关于datepicker的方法
       onStartTimeChange(startTime, type) {
         this.completeTimeOption = {
            disabledDate(completeTime) {
              return completeTime < new Date(startTime)
            }
          }
     },
        /**
         * 结束时间发生变化时触发,设置开始时间不可选择的日期
         * 开始时间小于等于结束时间,且小于等于当前时间
         * @param {string} date 格式化后的日期
         * @param {string} type 当前的日期类型
         */
      onCompleteTimeChange(completeTime, type) {
        this.startTimeOption = {
          disabledDate(startTime) {
            return new Date(completeTime) < startTime
          }
        }
      },

       // 表单验证相关的方法
       // 只能输入数字-校验入库单号
       checkMoveOrderId(e){
         var value=e.target.value.replace(/[^\w\.\/]/ig,'');
         document.getElementById(e.target.id).value = value;
       },


       // 翻页事件
       handleChangePage (value) {
         this.formFilter.curPage = value;
         this.query();
         console.log(value)
       },

       //改变每页大小事件
       handleChangePageSize(value){
         this.formFilter.pageSize = value;
         this.query();
       }
     }
}


     </script>
     <style lang="less">
     .movementQuery{
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
        line-height: 40px;
        vertical-align: middle;
      }
      .departmenttable{
          .ivu-table td{
            background-color:#fff;
            height: 40px;
          }
          .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
            background-color: #f9f9f9;
            height: 40px;
          }
      }
      .ivu-input-icon{
           position: absolute;
           right:45px;
       }
       .page{
     .ivu-select-selection{
       bottom: 6px;
     }
   }

      .ivu-input-icon-normal+.ivu-input{
        width: 120px;
      }
     }
     </style>
