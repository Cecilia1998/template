<template lang="html">
  <Modal  v-model="inGodownPlan" :loading='loading' width='1200px' :mask-closable='false' footer-hide>
      <p slot="header" style="text-align:center;font-size:16px">
            <span>入库单-详情</span>
      </p>
      <div class="inGodownPlanDetailsModal">
     <Form ref="formFilter" :model="formFilter" :label-width="110" inline style="text-align:left;" >
        <!-- <Row>
          <Col span="8">
             <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:12px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creatorName}}</div>
          </Col>
        </Row> -->
        <!-- <div>&nbsp;</div> -->
        <Row>
            <Col span="6">
              <div ></div>
            </Col>
            <Col span="5">
              <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creatorName}}</div>
            </Col>
            <Col span="5">

            </Col>
            <Col span="5">
              <Form-item label="入库类型" id="inType">
                  <label  v-if="this.formFilter.inOrderType == 'GPT01'">一般入库</label>
                  <label  v-if="this.formFilter.inOrderType == 'GPT02'">拼盘入库</label>
                </Form-item>
            </Col>
            <Col span="3">
            </Col>
          </Row>
        <div>&nbsp;</div>
        <Card id="deliveryInfoDetail" >
          <p slot="title">单据信息</p>
          <Row>
            <Col span="24">


                 <Row>

                   <Col span="8">
                   <div class="status">
                     <Form-item label="入库单号" >
                       <!-- <font color="red" class="font4">*</font> -->
                       <!-- <Input v-model="formFilter.inOrderId" placeholder="请输入" readonly :maxlength='20'/> -->
                       <label>{{formFilter.inOrderId}}</label>
                     </Form-item>
                     </div>
                   </Col>
                   <Col span="6">
                   <div class="status">
                      <Form-item label="入库日期" style="position:relative;">
                        <!-- <font color="red" class="font2" style='position:absolute;left:-65px;top:3px;'>*</font> -->
                        <!-- <DatePicker v-model="formFilter.inDate" type="datetime" format="yyyy-MM-dd" :options="options4"  readonly placeholder="请选择" style="width: 100px"></DatePicker> -->
                        <label>{{formFilter.inDate}}</label>
                      </Form-item>
                      </div>
                   </Col>
                   <!-- <Col span="6">
                     <Form-item label="生成时间">
                       <div class='createdate'>
                         <DatePicker v-model="formFilter.createTime" type="date" format="yyyy-MM-dd" placeholder="请选择" readonly ></DatePicker>
                       </div>
                     </Form-item>
                   </Col> -->
                   <Col span="4">
                     <div class="status">
                     <Form-item label="是否批量">
                        <label  v-if="this.formFilter.isBatchIn == 'P01'">是</label>
                        <label  v-if="this.formFilter.isBatchIn == 'P02'">否</label>
                       <!-- <Select v-model="formFilter.isBatchIn" clearable placeholder="请选择" readonly>
                         <Option value="P01">是</Option>
                         <Option value="P02">否</Option>
                       </Select> -->
                     </Form-item>
                     </div>
                   </Col>

                    <Col span="6">
                     <div class="status">
                       <Form-item label="状态">
                         <label  v-if="this.formFilter.status == 'GPS01'">申请</label>
                         <label  v-if="this.formFilter.status == 'GPS02'">接收</label>
                         <label  v-if="this.formFilter.status == 'GPS03'">组盘中</label>
                         <label  v-if="this.formFilter.status == 'GPS04'">组盘完成</label>
                         <label  v-if="this.formFilter.status == 'GPS05'">入库完成</label>

                       </Form-item>
                     </div>
                   </Col>


                 </Row>
                 <!-- <Row>

                     <Col span="6">
                       <Form-item label="供应商名称">
                         <Input v-model="formFilter.vendorName"  element-id = 'weightTotal' />
                       </Form-item>
                     </Col>

                     <Col span="6">
                     <Form-item label="预计入库总重量">
                        <Input v-model="formFilter.weight"  readonly :maxlength='20' />
                     </Form-item>
                   </Col>
                   <Col span="6">
                     <Form-item label="预计入库总件数">
                      <Input v-model="formFilter.num"  readonly :maxlength='20' />
                     </Form-item>
                   </Col>

                 </Row> -->
             </Col>
           </Row>
         </Card>

         <Card id="entryInfoDetailOfSpecial" style="display:none">
           <p slot="title">入库信息</p>
           <Row type='flex' justify="center">
             <Col span="6">
                 <div class="status">
                   <Form-item label="仓库">
                     <!-- <Input v-model="formFilter.packageQuantity" placeholder="请输入" :maxlength='20'/> -->
                     <label>{{formFilter.warehouseName}}</label>
                   </Form-item>
                 </div>
             </Col>
             <Col span="6">
                 <div class="status">
                   <Form-item label="进仓编号">
                     <!-- <Input v-model="formFilter.packageQuantity" placeholder="请输入" :maxlength='20'/> -->
                     <label>{{formFilter.warehouseEntryId}}</label>
                   </Form-item>
                 </div>
             </Col>
             <Col span="6">
               <div class="status">
                 <Form-item label="生成时间">
                   <label>{{formFilter.createDate}}</label>
                 </Form-item>
               </div>
             </Col>
             <Col span="6">
               <div class="status">
                 <Form-item label="状态">
                   <!-- <Input v-model="formFilter.packageQuantity" placeholder="请输入" :maxlength='20'/> -->
                   <label v-if="formFilter.godownPlanStatus == 'GPS01'">申请</label>
                   <label v-if="formFilter.godownPlanStatus == 'GPS02'">接收</label>
                   <label v-if="formFilter.godownPlanStatus == 'GPS03'">组盘中</label>
                   <label v-if="formFilter.godownPlanStatus == 'GPS04'">组盘完成</label>
                   <label v-if="formFilter.godownPlanStatus == 'GPS05'">入库完成</label>
                 </Form-item>
               </div>
             </Col>
           </Row>
           <Row>
             <Col span="6">
               <div class="status">
                 <Form-item label="总入库件数">
                   <label>{{formFilter.predictQuantityTotal}}</label>
                 </Form-item>
               </div>
             </Col>
           </Row>
         </Card>



         <div id='godownInfosDetail' >
           <div>&nbsp;</div>
           <Row>
             <Col span="16">
                <Row>
                  <Col span='20'>
                    <!-- <Button shape="circle" style="width:120px;height:28px;background-color:#b4b4b4;padding:0px;border-radius:14px;" disabled @click="delConfirmOrder" id='deldetail' icon="md-trash">删除选中项</Button>
                    <Form-item label="新增行数">
                      <InputNumber :max="100" :min="1" v-model="formFilter.num"></InputNumber>
                    </Form-item>
                    &nbsp;&nbsp;
                    <Upload :action="uploadurl" :format="['xlsx','xls']" :max-size="2048" :data="loginStatus" style="display: inline;" name="uploadFile" size="18" :on-success="handleSuccess">
                      <Button icon="ios-cloud-upload-outline" style="font-size:10px">上传文件</Button>
                    </Upload> -->
                  </Col>
                </Row>
             </Col>
             <Col span="8" style="text-align:right;">
               <!-- <Button shape="circle" type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail">增&nbsp;&nbsp;加</Button> -->
             </Col>
           </Row>
           <Row>
             <Col span="24">
                 <Table height="200" ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change=""></Table>
             </Col>
           </Row>
         </div>
     </Form>
   </div>
   <Modal v-model="delete_confirm" width="360">
     <p slot="header" style="color:#f60;text-align:center">
       <Icon type="ios-information-circle"></Icon>
       <span>删除确认</span>
     </p>
     <div style="text-align:center">
       <span style="font-size:22px">确定要删除吗？</span>
     </div>
     <div slot="footer">
       <Button type="error" size="large" long  @click="deleteSelection">确定删除</Button>
     </div>
   </Modal>
   <!-- <div slot="footer" v-if="formFilter.godownPlanStatus == 'GPS01'">
     <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="ok">提&nbsp;&nbsp;交</Button>
   </div> -->
   <!-- <div slot="footer">
     <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="ok" disabled>提&nbsp;&nbsp;交</Button>
   </div> -->
  </Modal>

</template>

<script>
import axios from 'axios'
import iview from 'view-design' //
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      rows:[],
      //上传路径
      uploadurl:sessionStorage.http+'/#',
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      delete_confirm:false,
      inGodownPlan:false,
      loading:true,
      lDetail:1,
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
      deptList:[
        {
          sectorid:'',
          sectorname:''
        }
      ],
      formFilter: {
        num:1,
        creater:'yuy'
      },
      tableColumns: {
        card: [
          // {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
          {title: '序号',key: 'lineNo',width: 70,align: 'center',render: (h, params) => {
            return h('div',+params.row._index+1);
            }},
          {title: '入库单明细号',key: 'inOrderDetailId', width: 300,align: 'center'},
          {title: '物料号',key: 'materielId', width: 150,align: 'center'},
          {title: '物料品类',key: 'remark3',width: 150,align: 'center'},
          {title: '物料名称',key: 'materielName',width: 150,align: 'center'},
          {title: '包装规格',key: 'packageStandards',width: 150,align: 'center'},
          {title: '计量单位',key: 'unit',width: 150,align: 'center'},
          {title: '批量组盘件数',key: 'batckGroupNun',width:150,align: 'center'},
          {title: '入库件数',key: 'num',width:120,align: 'center' },
          {title: '零件重量',key: 'partQuantity',width: 150,align: 'center'},
          {title: '入库重量',key: 'weight',width:120,align: 'center' },
          {title: '单价',key: 'price',width: 150,align: 'center'},
          {title: '供应商',key: 'vendorName',width:150,align: 'center'},
          {title: '生产地',key: 'producerName',width:150,align: 'center'},
          {title: '生产日期',key: 'produceDate',width: 150,align: 'center'},
          {title: '库存预警日期',key: 'stockWarnDate',width: 150,align: 'center'},
          {title: '批次号',key: 'stockBatch',width:150,align: 'center'},
          {title: '存储仓库',key: 'warehouseName',width: 150,align: 'center'},
          {title: '存储库区',key: 'districtName',width: 150,align: 'center'},
          {title: '动检合格证号',key: 'remark5',width:200,align: 'center'},
          {title: '质量状态',key: 'qualityStatus',width: 150 ,align: 'center',
            render: (h, params) => {
                    if(params.row.qualityStatus=='Q'){
                      return h('span','精品');
                    }else if(params.row.qualityStatus=='N'){
                      return h('span','优等');
                    }
            }},          //新增

          {title: '备注',key: 'remark',width:300,align: 'center'},
          {title: '状态', key: 'status',width: 130,align: 'center' ,
            render: (h, params) => {
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
            }}
        ],
         data:[
           {
             deliveryType:'',
             palletizingYard:''
           }
         ]
       },
       // tableColumnsSpecial: {
       //    card: [
       //      {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
       //      {title: '序号',key: 'lineNo',width: 75,align: 'center',render: (h, params) => {
       //        return h('div',+params.row._index+1);
       //        }},
       //      // {title: '入库单号',key: 'godownEntryId',align: 'center'},
       //      {title: '回单号',key: 'backNumber',width:210,align: 'center'},
       //      {title: '入库时间', key: 'godownTime',width:145,align: 'center'},   //新增
       //      {title: '货物类型',key: 'goodType',width:210,align: 'center'},
       //
       //      // {title: '入库类型',key: 'entryTypeName',align: 'center'},
       //      // {title: '入库时间', key: 'godownTime',align: 'center'},   //新增
       //      {title: '码垛口',key: 'palletizingYard',width: 210 ,align: 'center',render: (h, params) => {
       //              var display = '';
       //              if(params.row.palletizingYard == 'AT-0-0-3'){
       //                display = '1号'
       //              }
       //              if(params.row.palletizingYard == 'AT-0-0-9'){
       //                display = '2号'
       //              }
       //              if(params.row.palletizingYard == 'AT-0-0-15'){
       //                display = '3号'
       //              }
       //              if(params.row.palletizingYard == 'AT-0-0-21'){
       //                display = '4号'
       //              }
       //              if(params.row.palletizingYard == 'AT-0-0-27'){
       //                display = '5号'
       //              }
       //              return h("div",display);
       //            // }
       //        }},
       //      {title: '状态',key: 'entryStatusName',align: 'center'},
       //
       //    ],
       //    data:[
       //      {
       //      }
       //    ]
       //  },
      startTimeOption:{},
      godownTypeOption:[],
      godownType:''

    }
  },
  methods:{
    compareFightTimeAndNow(event){
      //选择时间
      var flightTime = event.split(':');
      //当前时间
      var dateTime = new Date().Format('hh:mm:ss');
      var nowTime = dateTime.split(':');

      var name = 'flightTime_'+this.tableColumns.data[params.index].lineNo;
      //计算选择时间秒数
      var time = +flightTime[0] * 3600 + +flightTime[1] * 60 + ++flightTime[2];
      //当前时间秒数
      var now = +nowTime[0] * 3600 + +nowTime[1] * 60 + ++nowTime[2]
      if(time < now){
        iview.Message.error({
          content:"选择的时间,不可小于当前时间",
          duration:5
        });
        params.row.flightTime = '';
        this.tableColumns.data[params.index] = params.row;
        return;
      }
      // disabledDate(time) {
      //   var dateTime=new Date();
      //   dateTime = dateTime.setDate(dateTime.getDate()-1)
      //   return time < new Date(dateTime)
      // }
    },
    //  entryInfoDetail documentInfo deliveryInfoDetail godownInfosDetail entryInfoDetailOfSpecial godownInfosDetailSpecialDetail
    changeContentByPlanType(value){
      // console.log(value)
      // //入库信息
      // var entryInfoDetail =  document.getElementById('entryInfoDetail');
      // //单证信息
      // // var documentInfo =  document.getElementById('documentInfo');
      // //送货信息
      // var deliveryInfoDetail =  document.getElementById('deliveryInfoDetail');
      // //入库单记录
      // var godownInfosDetail =  document.getElementById('godownInfosDetail');
      // //特殊商品-入库星系
      // var entryInfoDetailOfSpecial =  document.getElementById('entryInfoDetailOfSpecial');
      // //特殊商品
      // var godownInfosDetailSpecialDetail =  document.getElementById('godownInfosSpecialDetail');
      //
      //
      // // console.log(this.formFilter) tableColumnsSpecial
      // if(value == 'GPT01'){
      //   entryInfoDetail.style.cssText  = 'display:inline-block;width:100%';
      //   // documentInfo.style.cssText  = 'display:inline-block';
      //   deliveryInfoDetail.style.cssText  = 'display:inline-block;width:100%';
      //   godownInfosDetail.style.cssText  = 'display:block';
      //   entryInfoDetailOfSpecial.style.cssText  = 'display:none';
      //   godownInfosDetailSpecialDetail.style.cssText  = 'display:none';
      // }else if(value == 'GPT02'){
      //   entryInfoDetail.style.cssText  = 'display:inline-block;width:100%';
      //   deliveryInfoDetail.style.cssText  = 'display:inline-block;width:100%';
      //   // documentInfo.style.cssText  = 'display:none';
      //   godownInfosDetail.style.cssText  = 'display:block';
      //   entryInfoDetailOfSpecial.style.cssText  = 'display:none';
      //   godownInfosDetailSpecialDetail.style.cssText  = 'display:none';
      // }else if(value == 'GPT03'){
      //   entryInfoDetail.style.cssText  = 'display:none';
      //   // documentInfo.style.cssText  = 'display:none';
      //   deliveryInfoDetail.style.cssText  = 'display:none';
      //   godownInfosDetail.style.cssText  = 'display:none';
      //   godownInfosDetailSpecialDetail.style.cssText  = 'display:block';
      //   entryInfoDetailOfSpecial.style.cssText  = 'display:block';
      // }else if(value == '1' || value == undefined){
      //   this.$refs.godownPlanType.clearSingleSelect();
      //   entryInfoDetail.style.cssText  = 'display:none';
      //   // documentInfo.style.cssText  = 'display:none';
      //   deliveryInfoDetail.style.cssText  = 'display:none';
      //   godownInfosDetail.style.cssText  = 'display:none';
      //   godownInfosDetailSpecialDetail.style.cssText  = 'display:none';
      //   entryInfoDetailOfSpecial.style.cssText  = 'display:none';
      // }
    },
    //去除时间
    getStartTime(){
      this.startTimeOption = {
          disabledDate(time) {
            return time < new Date()
          }
        }
    },
    //检测入库单id是否已使用
    checkGodownId(godown){
      axios.post(sessionStorage.http +'/checkGodownId',godown)
      .then((res) =>{
        // console.log(res.data)
        if(res.data == '0'){
          this.$Message.error('入库计划单id已使用');
          this.formFilter.godownPlanId = '';
        }
      })
    },
    //检测入库单id是否已使用
    checkPlanId(){
      axios.post(sessionStorage.http +'/checkPlanId',this.formFilter)
      .then((res) =>{
        // console.log(res.data)
        if(res.data == '0'){
          this.$Message.error('入库计划单id已使用');
          this.formFilter.godownPlanId = '';
        }
      })
    },
    // 只能输入数字-校验入库单号
    checkOrderId(e){
      var value=e.target.value.replace(/[^\w\.\/]/ig,'');
      document.getElementById(e.target.id).value = value;
    },
    checkNumber(e){
      var value=e.target.value.replace(/\D/g,'');
      document.getElementById(e.target.id).value = value;
    },
    //计算总数
    countTotal(){


    },
    handleSuccess (res, file) {},
    //删除弹框
    delConfirm(){
      this.delete_confirm = true;
    },
    showTable(){
     console.log(this.tableColumns.data);
    },
    //比较时间
    dueAndPruTime(dueid,proid,params){

    },
    // 客户/供应商,有且只有显示一个
    selectSupplier(){

    },
    selectCustomer(){

      //console.log(this.formFilter.customerid);
    },
    //显示弹框
    show(row){
      console.log(row)
      this.formFilter = row;
      // this.formFilter.startposition=row.backupfield2;
      // console.log(row.createDate)
      axios.get(sessionStorage.http+'//queryDetails?'+"inOrderId="+this.formFilter.inOrderId)
      .then((res) =>{
          // if(this.formFilter.godownPlanType != 'GPT03'){
            this.tableColumns.data = res.data
          // }else if(this.formFilter.godownPlanType == 'GPT03'){
          //   this.tableColumnsSpecial.data = res.data
          // }
      })
      //queryDetailByPlanId
      // this.taskList = godownTypeList;
      this.inGodownPlan = true;
      // this.changeContentByPlanType(this.formFilter.godownPlanType);
      // this.formFilter.creater = sessionStorage.name;

    },
    // 页面验证
    checkOrderDetail(param){
      //conversionRate  invUomCode batchno quantity recvquantity duedate productiondate surfacePackageType
      console.log(param)
      var checkStr = '';
      if(param.backNumber == null || param.backNumber == ''){
        checkStr += '回单号/';
      }
      if(param.warehouseId == undefined || param.warehouseId == ''){
        checkStr += '仓库/';
      }
      if((param.surfacePackageType == undefined || param.surfacePackageType == '') && param.warehouseId == 'OD001'){
        checkStr += '外包装类型/';
      }
      if(param.godownEntryType == undefined || param.godownEntryType == ''){
        checkStr += '入库类型/';
      }
      // if(param.flightNumber == null || param.flightNumber == ''){
      //   checkStr += '航班号/';
      // }//deliveryType
      if(param.deliveryType == undefined || param.deliveryType == ''){
        checkStr += '交货类型/';
      }//码垛口 palletizingYard
      if(param.palletizingYard == null || param.palletizingYard == '' || param.palletizingYard == undefined){
        checkStr += '码垛口/';
      }
      return checkStr;
    },
    ok(){

      this.loading = false
      setTimeout(()=>{this.loading = true},0)
      //入库类型
      if(this.tableColumns.data.length == 0){
        this.$Message.error('明细表不能为空');
        this.inGodownPlan = true;
        setTimeout(()=>{this.loading = true},0)
        this.loading = false
        return
      }else{
          if(this.formFilter.godownPlanType != 'GPT03'){
            for(var i = 0;i< this.tableColumns.data.length; i++){
              console.log(this.tableColumns.data[i])
              var res = this.checkOrderDetail(this.tableColumns.data[i]);
              this.tableColumns.data[i].updateId = sessionStorage.loginStatus;
            //godownPlanId
            if(res != ''){
              iview.Message.error({
                content:"第"+i+1+"行"+res+"未填写或者未选择,请完全填写后,再提交",
                duration:5
              });
              return
            }
          }

        }else if(this.formFilter.godownPlanType == 'GPT03'){
          for(var i = 0;i< this.tableColumnsSpecial.data.length; i++){
            // var res = this.checkOrderDetail(this.tableColumnsSpecial.data[i]);
            this.tableColumnsSpecial.data[i].updateId = sessionStorage.loginStatus;
            //godownPlanId
            if(res != ''){
              iview.Message.error({
                content:"第"+i+1+"行"+res+"未填写或者未选择,请完全填写后,再提交",
                duration:5
              });
              return
            }
          }
        }
        this.formFilter.loginStatus = sessionStorage.loginStatus;
        let entries = [];
        if(this.formFilter.godownPlanType == 'GPT03'){
          entries = this.tableColumnsSpecial.data;
        }else if(this.formFilter.godownPlanType != 'GPT03'){
          entries = this.tableColumns.data;
        }
        axios.post(sessionStorage.http+'/updateGodownEntry?'+'loginStatus='+sessionStorage.loginStatus,{godownEntries:entries})
        .then((res) =>{
          if(res.data == '1'){
            // console.log(res.data)
            iview.Message.success({
              content:'修改成功.',
              duration:5
            });
            document.getElementById('search').click();
            this.inGodownPlan = false;
          }else if(res.data == '0'){
            console.log(res.data)
            iview.Message.error({
              content:'修改失败.',
              duration:5
            });
            this.inGodownPlan = true;
          }

        })


      }

    },
    cancel(){},
    //删除弹框
    delConfirmOrder(){
      this.delete_confirm= true;
    },
    //删除事件
    deleteSelection(){
      for(var i in this.rows){

        // console.log('i='+i);
        this.tableColumns.data.remove(this.rows[i].lineNo);
        // console.log(this.tableColumns.data)
      }
      this.delete_confirm = false;
      for(var j in this.tableColumns.data){
        this.tableColumns.data[j].lineNo = +j + 1;
      }

      document.getElementById('del').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
      document.getElementById('del').setAttribute("disabled","disabled");
    },
    //勾选触发事件
    onSelectionChange(row){
      this.rows = row;
      if(this.rows.length > 0){
        document.getElementById('deldetail').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;");
        document.getElementById('deldetail').removeAttribute("disabled");
      }else{
        document.getElementById('deldetail').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
        document.getElementById('deldetail').setAttribute("disabled","disabled");
      }
    },
    //添加一行
    addDetail(){

      var checkStr = '';
      //入库计划id
      if(this.formFilter.godownPlanId == '' || this.formFilter.godownPlanId == undefined){
        checkStr += '入库计划单号'+'/ ';
      }
      //进仓编号
      if(this.formFilter.warehouseEntryId == '' || this.formFilter.warehouseEntryId == undefined){
        checkStr += '进仓编号'+'/ ';
      }
      //客户
      if(this.formFilter.customerId == '' || this.formFilter.customerId == undefined){
        checkStr += '客户'+'/ ';
      }
      //送货单位
      if(this.formFilter.stockUnit == '' || this.formFilter.stockUnit == undefined){
        checkStr += '送货单位'+'/ ';
      }
      //deliveryType
      if(checkStr != ''){
        iview.Message.error({
          content:'请填写完 '+checkStr +' 中的数据',
          duration:5
        });
        this.inGodownPlan = true;
        return false;
      }
      //console.log(changeDate(this.tableColumns.data));
      // console.log(this.formFilter.num);
      this.lDetail = this.tableColumns.data.length;
      if(this.formFilter.num > 0){
        for(var i = 1;i <= this.formFilter.num; i++){
          this.tableColumns.data.push({
             select:false,
             lineNo:this.lDetail + i,
             godownEntryType:this.godownType
           });
        }
      }
    },
    addDetailSpecial(){

      var checkStr = '';
      //入库计划id
      if(this.formFilter.godownPlanId == '' || this.formFilter.godownPlanId == undefined){
        checkStr += '入库计划单号'+'/ ';
      }
      //进仓编号
      if(this.formFilter.warehouseEntryId == '' || this.formFilter.warehouseEntryId == undefined){
        checkStr += '进仓编号'+'/ ';
      }
      console(checkStr)
      //deliveryType
      if(checkStr != ''){
        iview.Message.error({
          content:'请填写完 '+checkStr +' 中的数据',
          duration:5
        });
        this.inGodownPlan = true;
        return false;
      }
      //console.log(changeDate(this.tableColumns.data));
      // console.log(this.formFilter.num);
      this.lDetail = this.tableColumnsSpecial.data.length;
      if(this.formFilter.num > 0){
        for(var i = 1;i <= this.formFilter.num; i++){
          this.tableColumnsSpecial.data.push({
             select:false,
             lineNo:this.lDetail + i,
             godownEntryType:this.godownType
           });
        }
      }
    },
    //得到时间
    getCreatDate(createdate){
      this.formFilter.predictArriveTime = changeDate(createdate);
      // console.log(createdate);
    },
    //修改时间样式
    changeDate(dateA) {
        var dateee = new Date(dateA).toJSON();
        var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'').replace(/-/g,'').replace(/:/g,'');
        return date;
    },
    initFormatter(){
      Date.prototype.Format = function(fmt) { //
        let o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      }
    }
  },

  created(){
    Array.prototype.indexOfData = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i].lineNo == val) return i;
        }
        return -1;
    },
    Array.prototype.remove = function(val) {
      var index = this.indexOfData(val);
      if (index > -1) {
      this.splice(index, 1);
      }
    },
    this.initFormatter()
  }
}
</script>


<style lang="less" scoped>
    .font{
      position: absolute;
      left: -70px;
    }
    .font4{
      position: absolute;
      left: -65px;
    }
    .font2{
      position: absolute;
      left: -40px;
    }
    .font3{
      position: absolute;
      left: -40px;
    }
    .font6{
      position: absolute;
      left: -90px;
    }
    .fontdetail{
      position: absolute;
      color:#5aa5ff !important;
      left: -150px;
    }
</style>
<style lang="css">

    .ivu-input-icon{
      position: absolute;
      right:45px;
    }
    .ivu-input-icon-normal+.ivu-input{
      width: 120px;
    }
</style>
<style lang="less">
.inGodownPlanDetailsModal{
  th .ivu-table-cell{
        font-size: 12px !important;
        font-weight: bold;
        color:#333;
      }
      #inType label{
        width: 110px;
        padding-top: 5px;
      }
      .ivu-table-cell{
        overflow: inherit;
      }
      .status{
        .ivu-form-item-content{
          line-height: 43px;
        }
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
      // .ivu-table-overflowY {
      //   overflow-y: scroll;
      // }
      .ivu-table-overflow {
            overflow-y: inherit;
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
          right:25px;
      }
     .ivu-input-icon-normal+.ivu-input{
       width: 120px;
     }

     .createdate{
       .ivu-input-icon{
            position: absolute;
            right:45px;
        }
     }

}
</style>
