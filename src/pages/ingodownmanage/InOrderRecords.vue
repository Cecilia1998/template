<template lang="html">
  <div class="InOrderRecords">
    <Form ref="formFiltertray" :model="formFilter" :label-width="85" inline style="text-align:left;">
      <Row>
        <Col span="24">
             <!-- <Row type='flex' justify="end"> -->
               <Col span="5">
                   <Form-item label="入库单号" prop="order_id" status-icon >
                     <Input v-model="formFilter.inOrderId" placeholder="请输入" style="width: 160px;" @on-keyup="checkOrderId"  @on-change="checkOrderIdUse"  :maxlength='20' />
                   </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="入库单明细号">
                   <Input v-model="formFilter.inOrderDetailId" placeholder="请输入" style="width: 160px;" @on-keyup="checkOrderId"  @on-change="checkOrderIdUse"  :maxlength='20' />
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="物料号">
                   <Input v-model="formFilter.materielId" placeholder="请输入" style="width: 160px;" @on-keyup="checkOrderId"  @on-change="checkOrderIdUse"  :maxlength='20' />
                 </Form-item>
               </Col>
               <!-- <Col span="5">
                 <Form-item label="预定入库日期">
                   <font color="red" class="font">*</font>
                   <div class='createdate'>
                     <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                   </div>
                 </Form-item>
               </Col> -->


               <Col span="5">
                 <Form-item label="批次号">
                   <DatePicker v-model="formFilter.stockBatch" style="width: 160px;"  @on-change="stockBatchChangedOut" format="yyyy-MM-dd" type="date" placeholder="请选择"></DatePicker>
                 </Form-item>
               </Col>

               <!-- <Col span="4">
                 <Form-item label="实际入库日期">
                   <font color="red" class="font">*</font>
                   <div class='createdate'>
                     <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                   </div>
                 </Form-item>
               </Col> -->

               <!-- <Col span="4">
                 <Form-item label="入库类型">
                     <Select v-model="formFilter.movetype" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                     <Option value="GPT01">一般入库</Option>
                     <Option value="GPT02">拼盘入库</Option>
                   </Select>
                 </Form-item>
               </Col> -->


             <!-- </Row> -->
             <!-- <Row type='flex' justify="end"> -->
               <Col span="5">
                 <Form-item label="物料名称">
                   <Input v-model="formFilter.materielName" style="width: 160px;" @on-change="checkOrderIdUse" />
                 </Form-item>
               </Col>
               <!-- <Col span="5">
                 <Form-item label="供应商">
                   <Select v-model="formFilter.vendorName" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                     <Option value="Q">待检测</Option>
                     <Option value="N">非限制</Option>
                     <Option value="F">冻结</Option>
                   </Select>
                 </Form-item>
               </Col> -->
               <!-- <Col span="5">
                 <Form-item label="生产地">
                   <Select v-model="formFilter.producerCode" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                   <Option value="WMS">WMS</Option>
                   <Option value="SAP">SAP</Option>
                   </Select>
                 </Form-item>
               </Col> -->


               <!--
               <Col span="4">
                 <Form-item label="入库类型">
                   <Select v-model="formFilter.inOrderType" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                   <Option value="GPT01">一般入库</Option>
                   <Option value="GPT02">拼盘入库</Option>
                   </Select>
                 </Form-item>

               </Col> -->
               <!-- <Col span="5">

               </Col> -->
             <!-- </Row>
             <Row type='flex' justify="end"> -->
                <Col span="5">
                 <Form-item label="质量状态">
                   <!-- <font color="red" class="font2">*</font> -->
                   <!-- <Select v-model="formFilter.qualityStatus" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px"  v-bind:disabled="supIsAble"> -->
                   <Select v-model="formFilter.qualityStatus" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                     <Option value="Q">精品</Option>
                     <Option value="N">优等</Option>
                   </Select>
                 </Form-item>
               </Col>
               <!-- <Col span="5">
                 <Form-item label="存储预警日期" id='overdue_day'>
                   <tr>
                     <td>
                       <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" style="width: 110px" @on-change="onStartTimeChange" :options="startTimeOption" clearable></DatePicker>
                     </td>
                     <td>-</td>
                     <td>
                       <DatePicker v-model="formFilter.remark2" type="date" placeholder="请选择" style="width: 110px" :options="endTimeOption" @on-change="onEndTimeChange" clearable></DatePicker>
                     </td>
                   </tr>
                 </Form-item>
               </Col> -->
               <Col span="5">
                 <Form-item label="存储仓库">
                   <Select v-model="formFilter.warehouseName" clearable placeholder="请选择"
                  style="text-align:left;width: 160px;height:20px" >
                     <Option v-for="(warehouseNamenameinfo,key) in warehouseNameInfo" :key="key" :value="warehouseNamenameinfo.warehouseName">
                     {{warehouseNamenameinfo.warehouseName}}</Option>
                   </Select>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="存储库区">
                   <Select v-model="formFilter.districtName" clearable placeholder="请选择"
                  style="text-align:left;width: 160px;height:20px" >
                     <Option v-for="(districtNameinfo,key) in districtNameInfo" :key="key" :value="districtNameinfo.districtName">
                     {{districtNameinfo.districtName}}</Option>
                   </Select>
                 </Form-item>
               </Col>

               <Col span="5">
                 <Form-item label="是否批量入库">
                   <Select v-model="formFilter.isBatchIn" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                     <Option value="P01">是</Option>
                     <Option value="P02">否</Option>
                   </Select>
                 </Form-item>
               </Col>
             <!-- </Row>
             <Row type='flex' justify="end"> -->
               <Col span="5">
                 <Form-item label="入库单状态">
                   <Select v-model="formFilter.status" placeholder="请选择" @on-change="checkOrderIdUse" style="width: 160px;height:20px" clearable>
                     <Option value="GPS01">申请</Option>
                     <Option value="GPS02">接收</Option>
                     <Option value="GPS04">入库完成</Option>
                   </Select>
                 </Form-item>
               </Col>
               <Col span="5">
                 <Form-item label="生产日期" id='overdue_day'>
                   <tr>
                     <td>
                       <DatePicker :options="options4" v-model="formFilter.startProduceDate"  @on-change="getStartProduceDate" format="yyyy-MM-dd" type="date" placeholder="请选择"></DatePicker>
                     </td>
                     <td>-</td>
                     <td>
                       <DatePicker :options="options3" v-model="formFilter.endProduceDate"  @on-change="getEndProduceDate" format="yyyy-MM-dd" type="date" placeholder="请选择"></DatePicker>
                     </td>
                   </tr>
                 </Form-item>

               </Col>
               <Col span="5">
                 <Form-item label="入库日期" id='overdue_day'>
                      <DatePicker :options="options2" format="yyyy-MM-dd" v-model="formFilter.startInDate" type="date" placeholder="请选择" style="width: 110px"  @on-change="getStartInDate" ></DatePicker>-
                      <DatePicker :options="options1" format="yyyy-MM-dd" v-model="formFilter.endInDate"   type="date" placeholder="请选择" style="width: 110px"  @on-change="getEndInDate" ></DatePicker>
                 </Form-item>
               </Col>
             <!-- </Row> -->
           </Col>
         </Row>
    <br/>
    </Form>
    <Table :loading="loading" height='520' ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change=""></Table>
    <!-- <Table :loading="loading" height='520' ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" @on-row-dblclick=""></Table> -->
    <br />
    <div class='page'>
      <Page  show-sizer show-elevator show-total :total="this.total"  :current="this.pageNum" :page-size="this.pageSize"  :page-size-opts="[10,20,30]"
      @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
    </div>
  <putawayConfirmDetailModal ref="putawayConfirmDetailModal"></putawayConfirmDetailModal>
  </div>
</template>
<script>
    export default {

    }
</script>


  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'
import putawayConfirmDetailModal from '@/components/PutawayConfirmDetailModal'

// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
     putawayConfirmDetailModal

   },
  data () {
    return {
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      row:{},
      rows:[],
      warehouseNameInfo:[],
      districtNameInfo:[],
      taskList:[
        {
          taskid:'',
          typename:''
        }
      ],
      customerList:[
        {
          customerid:'',
          customername:''
        }
      ],
      supplierList:[
        {
          supplierid:'',
          suppliername:''
        }
      ],
      loading:false,
      total:0,
      pageNum:1,
      pageSize:20,
      formFilter: {

      },
      modal1:false,
      definePageSize:10,
      tableColumns: {
        card: [
          // {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
          {title: '序号',key: 'lineNo',width: 70,align: 'center',render:(h,params)=>{
            this.tableColumns.data[params.index].lineNo=+params.row._index + 1 + (this.pageNum-1)*this.pageSize
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '入库单号',key: 'inOrderId',width:150,align: 'center'},
          {title: '入库单明细号',key: 'inOrderDetailId', width: 150,align: 'center'},
          {title: '物料号',key: 'materielId', width: 150,align: 'center'},
          {title: '物料品类',key: 'remark3', width: 150,align: 'center'},
          {title: '物料名称',key: 'materielName',width: 150,align: 'center'},
          {title: '包装规格',key: 'packageStandards',width: 150,align: 'center'},
          {title: '计量单位',key: 'unit',width: 150,align: 'center'},
          {title: '入库件数',key: 'actualNum',width:120,align: 'center' },
          {title: '入库重量',key: 'actualWeight',width:120,align: 'center' ,render: (h, params) => {

                    return h('span',params.row.packageStandards*params.row.actualNum+params.row.partQuantity);
            }},
          {title: '零件重量',key: 'partQuantity',width: 150,align: 'center'},
          {title: '单价',key: 'price',width:150,align: 'center'},
          {title: '供应商名称',key: 'vendorName',width:150,align: 'center'},
          {title: '生产地',key: 'producerName',width:150,align: 'center'},
          {title: '生产日期',key: 'produceDate',width:150,align: 'center'},
          {title: '入库日期', key: 'inDate',width:150,align: 'center'},  //-xj 预定入库日期 -> 入库日期
          {title: '存储预警日期',key: 'stockWarnDate',width:150,align: 'center'},
          {title: '批次号',key: 'stockBatch',width:150,align: 'center'},
          {title: '存储仓库',key: 'warehouseName',width:150,align: 'center'},
          {title: '存储库区',key: 'districtName',width:150,align: 'center'},
          {title: '动检合格证号',key: 'remark5',width:150,align: 'center'},
          {title: '质量状态',key: 'qualityStatus',width: 130 ,align: 'center',render: (h, params) => {
                  if(params.row.qualityStatus=='Q'){
                    return h('span','精品');
                  }else if(params.row.qualityStatus=='N'){
                    return h('span','优等');

                  }
            }},
          {title: '入库类型',key: 'remark1',width:150,align: 'center',render: (h, params) => {
                    if(params.row.remark1=='GPT01'){
                      return h('span','一般入库');
                    }else if(params.row.remark1=='GPT02'){
                      return h('span','拼盘入库');
                    }
            }},
          {title: '是否批量入库',key: 'isBatchIn', width: 130,align: 'center',render: (h, params) => {
                    if(params.row.isBatchIn=='P02'){
                      return h('span','否');
                    }else if(params.row.isBatchIn=='P01'){
                      return h('span','是');
                    }
            }},
          // {title: '入库类型', key: 'inOrderType',width:150,align: 'center',render: (h, params) => {
          //     if(params.row.inOrderType=='GPT01'){
          //       // alert('2222222')
          //       return h('span','一般入库');
          //     }else if(params.row.inOrderType=='GPT02'){
          //       return h('span','拼盘入库');
          //     }
          //   }
          // },

         // {title: '生产日期', key: 'produceDate',width:150,align: 'center'},


          {title: '入库单状态',key: 'status',width: 130 ,align: 'center',render: (h, params) => {
                    if(params.row.status=='GPS01'){
                      return h('span','申请');
                    }else if(params.row.status=='GPS02'){
                      return h('span','接收');
                    }else if(params.row.status=='GPS03'){
                      return h('span','组盘中');
                    }else if(params.row.status=='GPS04'){
                      return h('span','组盘完成');
                    }else if(params.row.status=='GPS05'){
                      return h('span','入库完成');
                    }
            }},

          {title: '备注', key: 'remark',width:150,align: 'center'}

          // {title: '码垛口',key: 'startposition',width: 130 ,align: 'center',render: (h, params) => {
          //         if(params.row.startposition=='A-1-11-1'){
          //           return h('span','1号口');
          //         }else if(params.row.startposition=='A-1-11-26'){
          //           return h('span','2号口');
          //         }
          //   }},

          // {title: '单据来源',key: 'resource', width: 130,align: 'center'},



          // {title: '实际已接收件数', key: 'actualNum',width: 130,align: 'center' },
          // {title: '实际已接收数量', key: 'actualWeight',width: 130,align: 'center' },
          // {title: '剩余数量', key: 'surplusquantity',width: 130,align: 'center' ,render:(h,params)=>{
          //   this.tableColumns.data[params.index].surplusquantity = +((params.row.weight+params.row.partQuantity-params.row.actualWeight).toFixed(3))+0;
          //   return h("div",+((this.tableColumns.data[params.index].surplusquantity).toFixed(3))+0)
          // }}

        ],
         data:[
           {
             // select:false,
             // lineNo:'1',
             ingodownentryid:'20181104001',
             godownentrytype:'一般入库',
             createdate:'20181114',
             quantity:200,
             remark1:200,
             orderholder:'上海速锐',
             operName:'',
             statusName:'申请'

           }
         ]

       },
       startTimeOption: {},
       endTimeOption: {}

    }
  },
  created(){
    //sessionStorage.a = 'a'
    // console.log(sessionStorage)
    //this.$router.history.current.path为当前网页的路径

    //默认查询所有入库单
    // 查询任务类型
    //查询客户
    //查询供应商

    // this.formFilter.godownentrystatus = '3';
    this.getNameInfo();
  this.getInOrderInit();

  },
  computed:{

  },
  methods:{

    getInOrderInit(){
      axios.post(sessionStorage.http +`/getInOrderInit?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        // console.log(res)
        this.tableColumns.data = res.data.list;
        this.total=res.data.total
        // this.taskList = res.data.taskTypes;
        // this.customerList = res.data.customerInfos;
        // this.supplierList = res.data.supplierManagements;
        // this.formFilter.rowtotal = res.data.rowtotal;
        // this.formFilter.currpage = res.data.currpage;
        // this.formFilter.pagesize = res.data.pagesize;

      })
      .catch((err) => {
        iview.Message.error({
          content:err.message,
          duration:5
        });
      })
    },

    //格式化后的日期
    //修改时间样式
    getNameInfo(){

      axios.get(sessionStorage.http+`/getAllWareHouseInfo?loginStatus=${sessionStorage.loginStatus}`)
       .then((res)=>{
         this.warehouseNameInfo = [];
         res.data.forEach(item => {
            if (item.isStart == '1') {
              this.warehouseNameInfo.push(item)
            }
          })
       })
       axios.get(sessionStorage.http+`/getAllDistrictInfo?loginStatus=${sessionStorage.loginStatus}`)
        .then((res)=>{
          this.districtNameInfo = [];
          res.data.forEach(item => {
             if (item.isStart == '1') {
               this.districtNameInfo.push(item)
             }
           })
        })
    },
    add0(m){return m<10?'0'+m:m },

    changeDate(dateA) {
        var dateee = new Date(dateA);
        // var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        // return date.substring(0,11);
        let y = dateee.getFullYear()
        let m = dateee.getMonth()+1
        let d = dateee.getDate()
        return y + '-' + this.add0(m) + '-' + this.add0(d)
    },

    startDateChangedOut(){//生产日期起始日期改变

      if(this.formFilter.startProduceDate != '' && this.formFilter.endProduceDate != ''){
        if(this.formartDate(this.formFilter.startProduceDate) > this.formartDate(this.formFilter.endProduceDate)){
          this.$Message.error("起始日期不能大于结束日期")
                this.formFilter.startProduceDate = undefined
                // this.formFilter.startproduceDateStr = undefined
        }
      }
      if(this.formFilter.startProduceDate != ''){
        this.formFilter.startProduceDate = this.formartDate(this.formFilter.startProduceDate)
            this.checkOrderIdUse()
      }else {
        this.formFilter.startProduceDate = undefined
            this.checkOrderIdUse()
      }
    },
    endDateChangedOut(){//生产日期结束日期改变
      if(this.formFilter.startProduceDate != '' && this.formFilter.endProduceDate != ''){
        if(this.formartDate(this.formFilter.startProduceDate) > this.formartDate(this.formFilter.endProduceDate)){
          this.$Message.error("结束日期不能小于起始日期")
               this.formFilter.endProduceDate = ''
               // this.formFilter.endproduceDateStr = undefined
        }
      }
      if(this.formFilter.endProduceDate != ''){
        this.formFilter.endProduceDate = this.formartDate(this.formFilter.endProduceDate)
        this.checkOrderIdUse()
      }else {
        this.formFilter.endProduceDate = undefined
        this.checkOrderIdUse()
      }
    },
    formartDate(date){//日期格式化
      let  Y = date.getFullYear() + '-'
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D
    },
    startInDateChangedOut(){//入库日期起始日期改变
      // if(this.formFilter.startinDate != ''){
      //   this.formFilter.startinDateStr = this.formartDate(this.formFilter.startinDate)
      // }else {
      //   this.formFilter.startinDateStr = undefined
      // }
      if(this.formFilter.startinDate != '' && this.formFilter.endProduceDate != ''){
        if(this.formartDate(this.formFilter.startinDate) > this.formartDate(this.formFilter.endProduceDate)){
          this.$Message.error("起始日期不能大于结束日期")
                this.formFilter.startinDate = undefined
                // this.formFilter.startinDateStr = undefined
        }
      }
      if(this.formFilter.startinDate != null && this.formFilter.startinDate != undefined){
        this.checkOrderIdUse()
      }
    },
    endInDateChangedOut(){//入库日期结束日期改变
      if(this.formFilter.startinDate != '' && this.formFilter.endinDate != ''){
        if(this.formartDate(this.formFilter.startinDate) > this.formartDate(this.formFilter.endinDate)){
          this.$Message.error("结束日期不能小于起始日期")
               this.formFilter.endinDate = ''
               // this.formFilter.endinDateStr = undefined
        }
      }
      // if(this.formFilter.endinDate != ''){
      //   this.formFilter.endinDateStr = this.formartDate(this.formFilter.endinDate)
      // }else {
      //   this.formFilter.endinDateStr = undefined
      // }
      if(this.formFilter.endinDate != null && this.formFilter.endinDate != undefined){
        this.checkOrderIdUse()
      }
    },
    checkOrderIdUse(){
       // alert(this.formFilter.createdate)
       // alert(this.formFilter.remark2)
       axios.post(sessionStorage.http +`/getInOrderInit?pageNum=${this.pageNum}&pageSize=${this.pageSize}&loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
       .then((res) =>{
         this.tableColumns.data = res.data.list;
         this.total=res.data.total

       })
       .catch((err) => {
          iview.Message.error({
            content:err.message,
            duration:5
          });
       })
    },

    onStartTimeChange(startTime, type) {
					this.endTimeOption = {
						disabledDate(endTime) {
							return endTime < new Date(startTime)
						}
					}
          this.checkOrderIdUse();
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
        this.checkOrderIdUse();
			},
    // 只能输入数字-校验入库单号
    checkOrderId(e){
      var value=e.target.value.replace(/[^\w\.\/]/ig,'');
      document.getElementById(e.target.id).value = value;
    },
    handleSubmit () {
       const paths = this.$route.path.split("/");
       alert(paths);
     },
     handleChangePage (value) {
       // const paths = this.$route.path.split('/');
       this.pageNum = value
       this.checkOrderIdUse();
     },
     handleChangePageSize(value){
       // const paths = this.$route.path.split('/');
       this.pageSize = value
       this.pageNum = 1
       this.checkOrderIdUse();
     },
     showdetail(row){
       this.$refs.putawayConfirmDetailModal.show(row);
     },
     ok(){
       alert('ok');
     },
     cancel(){
       alert('cancel');
     },

stockBatchChangedOut(stockBatch) {

  this.options1 = {
    disabledDate(date) {
      return date.valueOf() < new Date(stockBatch) - 86400000;
    }
  }
  //将选择的时间赋值给参数
  this.formFilter.stockBatch = stockBatch;
},
    //next -xuj
    //关于datepicker的方法
    getStartInDate(startInDate) {

      this.options1 = {
        disabledDate(date) {
          return date.valueOf() < new Date(startInDate) - 86400000;
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.startInDate = startInDate;
    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
     getEndInDate(endInDate) {

      this.options2 = {
        disabledDate(date) {
          return date.valueOf() > new Date(endInDate);
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.endInDate = endInDate;
     },

    getStartProduceDate(startInDate) {

      this.options3 = {
        disabledDate(date) {
          return date.valueOf() < new Date(startInDate) - 86400000;
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.startProduceDate = startInDate;


    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
     getEndProduceDate(endInDate) {

      this.options4 = {
        disabledDate(date) {
          return date.valueOf() > new Date(endInDate);
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.endProduceDate = endInDate;
     },

     //查询按钮
     // allOrder(){
     //
     //   this.formFilter.godownentrystatus = '3';
     //   axios.post(sessionStorage.http +`/getAllOrder?loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
     //   .then((res) =>{
     //     this.tableColumns.data = res.data.entries;
     //     this.formFilter.rowtotal = res.data.rowtotal;
     //     this.formFilter.currpage = res.data.currpage;
     //     this.formFilter.pagesize = res.data.pagesize;
     //     console.log(res.data)
     //
     //   })
     //   .catch((err) => {
     //      iview.Message.error({
     //        content:err.message,
     //        duration:5
     //      });
     //   })
     // }
  },
    watch: {
    formFilter: {
      deep: true,
      handler() {

        this.getInOrderInit();
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
<style  lang='less'>
  .InOrderRecords{
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
      // .ivu-input-wrapper{
      //   width: 160px;
      //   height: 20px;
      // }
      // .ivu-select{
      //   width: 160px;
      //   height: 20px;
      // }
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
         bottom: 6px;
       }
     }
  }
   </style>
