<template lang="html">
  <div class="addOutOrder">
    <Modal v-model="showAddOutOrder" title="新增出库单" :mask-closable='false' footer-hide okText="确定" cancel-text='取消' @on-ok="" @on-cancel="" :loading="loading" width='85%' style="height:500px;">
      <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">
        <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->





        <tr>
          <td>
            <div class="" >
              <span class="outBox" style="position:relative">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel" >出库单号</span>
                <font color="red" class="font" style='position:absolute;left:15px;top:3px;'>*</font>
                <span class="inputBox">
                  <Input v-model="formFilter.outOrderId" readonly placeholder="请输入"  class="textInput" />
                </span>
              </span>
              <span class="outBox" style="position:relative">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel" >出库类型 <span>
                  <font color="red" class="font" style='position:absolute;left:15px;top:3px;'>*</font>
                  <Select v-model="formFilter.orderType"  @on-change="movetypeChange" filterable remote   style="width:160px;">
                    <!-- <Option value=""></Option> -->
                    <!-- <Option value="CKT01">二次包装出库</Option>
                    <Option value="CKT02">贴签证出库</Option>
                    <Option value="CKT03">空托盘出库</Option> -->
                    <Option value="CKT05">一般出库</Option>
                    <Option value="CKT04">拼盘出库</Option>
                    <!-- <Option value="CKT08">退货出库</Option> -->
                  </Select>
                </span>
              </span>
              </span>

            <span class="outBox" style="position:relative">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">客户</span>
              <font color="red" class="font" style='position:absolute;left:15px;top:3px;'>*</font>
              <span class="inputBox">
                <!-- <Select v-model="formFilter.customerId"  clearable @on-clear="customeridClear" filterable remote  :loading="customerLoading"  @on-query-change="changeCustomer" style="width:160px">
                    <Option v-for="(option, index) in customerList" :value="option.customerId" :key="index">{{option.customerName}}</Option>
                </Select> -->
                <Input v-model="formFilter.customerId" placeholder="请输入"  class="textInput" />
              </span>
            </span>

              <span class="outBox" style="position:relative">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">出库日期</span>
                <font color="red" class="font" style='position:absolute;left:15px;top:3px;'>*</font>
                <span class="inputBox">
                  <DatePicker v-model="formFilter.outDate" @on-change="getOutDate" type="date" placeholder="请选择" class="dateInput" style="width:160px;"></DatePicker>
                  <!-- -
                  <DatePicker v-model="formFilter.endDateIn" @on-change="endDateChangedIn" type="date" placeholder="请选择" class="dateInput" ></DatePicker> -->
                </span>
              </span>
              <!-- <span class="outBox">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">出库口 <span class="inputBox">
                  <Select v-model="formFilter.remark1"  filterable remote   style="width:160px;">
                    <Select v-model="formFilter.remark1" clearable placeholder="请选择"
                      <Option v-for="(item,key) in entrancelist" :value="item.entranceId" :key="key">{{ item.remark1 }}</Option>
                    </Select>

                  </Select>
                </span>
              </span> -->
                <!-- <span class="blackLabel">出库口</span> -->
                <!-- <span class="inputBox">
                  <Form-item label="出库口">
                    <Select v-model="formFilter.entry" clearable placeholder="请选择"
                      <Option v-for="(item,key) in entrancelist" :value="item.entranceId" :key="key">{{ item.remark1 }}</Option>
                    </Select>

                  </Form-item>
                </span> -->
              </span>
              <!-- <span class="outBox">
                <span class="blank" style="width:20px;">&nbsp;</span>
                <span class="blackLabel">预计出库件数</span>
                <span class="inputBox">
                  <Input v-model="formFilter.num" readonly placeholder="请输入"  class="textInput" />
                </span>
              </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">预计出库重量</span>
              <span class="inputBox">
                <Input v-model="formFilter.quantity" readonly placeholder="请输入"  class="textInput" />
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">创建人</span>
              <span class="inputBox">
                <Input v-model="formFilter.creatorName" readonly placeholder="请输入"  class="textInput" />
              </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收库存地点</span>
              <span class="inputBox">
                <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
              </span>
            </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收部门</span>
              <span class="inputBox">
                <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">收货单位</span>
              <span class="inputBox">
                <Input v-model="formFilter.receiver" placeholder="请输入"  class="textInput" />
              </span>
            </span> -->




            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收工厂</span>
              <span class="inputBox">
                <Input v-model="formFilter.godowninId" placeholder="请输入"  class="textInput" />
              </span>
            </span> -->



        </div>
      </td>
    </tr>
      <Row>
        <Col span='4'>
          <Button v-show="hasSelected == 'false'" type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
          <Button v-show="hasSelected == 'true'"  type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" @click="delete_confirm = true" icon="md-trash">删除选中项</Button>

        </Col>
        <Col span='20'>
          <div class="" style="text-align:right">
            <Input v-model="newLine" v-if="false" class="textInput" style="width:30px;"/>
            <span class="blackLabel" v-if="false" >行明细</span>
              <Button shape="circle" @click="addOutOrderDetail" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >添&nbsp;&nbsp;加</Button>
            <Button shape="circle" @click="submitNewOutOrder"  type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >提&nbsp;&nbsp;交</Button>

            <Button type="primary" id="queryOutOrder" shape="circle" v-show="false" @click="query">查询</Button>
        </div>
        </Col>

      </Row>



      </Form>
      <table height="10px">

      </table>
      <div  v-show="formFilter.orderType != 'CKT04' ">
        <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" ></Table>

        <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
        <br />
        <div class="addOutOrderPage">
          <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
        </div>
      </div>
      <div  v-show="formFilter.orderType == 'CKT04' ">
        <Table height=500 border stripe  :loading="loading" ref="selection" :columns="pinpan.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" ></Table>

        <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
        <br />
        <div class="addOutOrderPage">
          <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
        </div>
      </div>

      <Modal v-model="delete_confirm" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span style="font-size:14px">删除确认</span>
        </p>
        <div style="text-align:center">
          <span style="font-size:14px">确定要删除吗？</span>
        </div>
        <div slot="footer" align = "center">
          <Button type="error" long style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" @click="deleteDetail">确定删除</Button>
        </div>
      </Modal>
    </Modal>
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
      quantitytest:[],
      quantitytest2:[],
      entrancelist:[],
      movetype:'',
      showAddOutOrder:false,//modal显示标记
      couldDelet:false,//删除标记
      newLine:1,//新增行数
      outOrderDetail:[],
      hasSelected:'false',
      delete_confirm:false,
      customerList:[],
      formFilter: {
        outOrderId:'',
        orderType:'',
        num:'',
        quantity:'',
        status:'',
        creatorId:'',
        creatorName:'',
        createTime:'',
        outDate:'',
        curPage:1,
        pageSize:20,
        startDateInStr:'',
        endDateInStr:'',
        startDateOutStr:'',
        endDateOutStr:'',
        startDateDueStr:'',
        endDateDueStr:'',
        loginStatus:`${sessionStorage.loginStatus}`,
      },
      predictOutDateD:null,
      total:0,

      pinpan:{
        card: [
                 {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
                 {title: '序号',key: 'rowid',width: 80,align: 'center'},
                 {title: '* 物料号',key: 'materielId',width:200, align: 'center',

                 render: (h, params) => {
                   if(params.row.materielId != null && params.row.materielId != ''){
                     return h('span',params.row.materielId)
                   }
                   return h('div',[
                     h('Input',{
                       props: {
                           //将单元格的值给Input
                           'search':true,
                           'value':params.row.materielId,
                           },
                        style: {
                          width:"160px",
                          // bottom:"3px",
                        },
                     on:{
                          'on-change':(event)=> {
                         },
                         'on-search':(materielId)=> {
                           let could = true
                           // for (var i = 0; i < this.outOrderDetail.length; i++) {
                           //   if (this.outOrderDetail[i].materielId == materielId) {
                           //     this.$Message.error("该物料/产品号已存在，不可重复添加")
                           //     could = false
                           //     break
                           //   }
                           // }
                           if (could) {
                            this.getOutMaterial(materielId)
                           }
                        },
                         'on-keyup':(value)=> {

                        },
                         'on-blur':(event)=>{

                         }
                       }
                       }
                     )
                   ]);
                   }

                  // render: (h, params) => {
                  //   if(params.row.materialNo != null && params.row.materialNo != ''){
                  //     return h('span',params.row.materialNo)
                  //   }
                  //   return h('div',[
                  //     h('Input',{
                  //       props: {
                  //           //将单元格的值给Input
                  //           'search':true,
                  //           'value':params.row.materialNo,
                  //           },
                  //        style: {
                  //          width:"160px",
                  //          // top:"21px"
                  //          // bottom:"3px",
                  //        },
                  //     on:{
                  //          'on-change':(event)=> {
                  //         },
                  //         'on-search':(materialNo)=> {
                  //           let could = true
                  //           if (this.outOrderDetail.length > 0) {
                  //             if (this.outOrderDetail[0].materialNo != materialNo) {
                  //               this.$Message.error("同一拼盘出库不能出不同的物料")
                  //               could = false
                  //             }
                  //           }
                  //           if (could) {
                  //            this.getOutMaterial(materialNo)
                  //           }
                  //        },
                  //         'on-keyup':(value)=> {
                  //
                  //        },
                  //         'on-blur':(event)=>{
                  //
                  //         }
                  //       }
                  //       }
                  //     )
                  //   ]);
                  //   }
                  },
                {title: '物料名称',key: 'materielName', width:200,align: 'center'},
                {title: '批次号', key: 'stockBatch',width:150,align: 'center'},
                 {title: '托盘码',key: 'palletCode', width:200,align: 'center'},
                 {title: '货位号',key: 'storageId', width:200,align: 'center'},
                 {title: '库存件数', key: 'num',width:100,align: 'center'},
                 {title: '库存重量', key: 'weight',width:150,align: 'center'},
                 {title: '零件重量', key: 'partWeight',width:100,align: 'center'},
                 {title: '质量状态', key: 'qualityStatus',width:100,align: 'center',
                 render: (h, params) => {
                   if(params.row.qualityStatus == 'Q'){
                     return h('span','精品')
                   }else if(params.row.qualityStatus == 'N'){
                     return h('span','优等')

                   }else{
                     return h('span','未定义')
                   }

                    }
                 },
                 {title: '包装规格', key: 'packageStandards',width:120,align: 'center'},
                 {title: '计量单位', key: 'unit',width:100,align: 'center'},
                 {title: '供应商',key: 'vendorName',width:200, align: 'center'},
                 {title: '生产商',key: 'producerName',width:200, align: 'center'},
                 {title: '出库仓库',key: 'warehouseName', width:200,align: 'center'},
                 {title: '出库库区', key: 'districtName',width:120,align: 'center'},
                 // {title: '计量单位', key: 'unit',width:100,align: 'center'},



        ]
      },
      tableColumns: {//表格数据
        data:[
          {
            outOrderDetailId:'',
            outOrderId:'',
            rowid:'',
            materielId:'',
            materielName:'',
            batchNo:'',
            packageStandards:'',
            qualityStatus:'',
            produceDate:'',
            num:'',
            weight:'',
            status:'0',
            warehouseId:'',
            districtId:'',
            price:'',
            sumPrice:'',
            packageType:'',
            unit:'',

          }
        ],
         card: [
                  {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center',},
                  {title: '序号',key: 'rowid',width: 80,align: 'center'},
                  {title: '* 物料号',key: 'materielId',width:200, align: 'center',
                   render: (h, params) => {
                     if(params.row.materielId != null && params.row.materielId != ''){
                       return h('span',params.row.materielId)
                     }
                     return h('div',[
                       h('Input',{
                         props: {
                             //将单元格的值给Input
                             'search':true,
                             'value':params.row.materielId,
                             },
                          style: {
                            width:"160px",
                            // bottom:"3px",
                          },
                       on:{
                            'on-change':(event)=> {
                           },
                           'on-search':(materielId)=> {
                             let could = true
                             for (var i = 0; i < this.outOrderDetail.length; i++) {
                               if (this.outOrderDetail[i].materielId == materielId) {
                                 this.$Message.error("该物料/产品号已存在，不可重复添加")
                                 could = false
                                 break
                               }
                             }
                             if (could) {
                              this.getOutMaterial(materielId)
                             }
                          },
                           'on-keyup':(value)=> {

                          },
                           'on-blur':(event)=>{

                           }
                         }
                         }
                       )
                     ]);
                     }},
                  {title: '物料名称',key: 'materielName', width:200,align: 'center'},
                  {title: '批次号', key: 'stockBatch',width:150,align: 'center'},
                  // {title: '指示件数', key: 'noticePieces',width:120,align: 'center'},
                  {title: '库存件数', key: 'num',width:100,align: 'center'},


                  //{title: '零件重量', key: 'partWeight',width:100,align: 'center'},
                  {title: '* 出库件数', key: 'outQuantity',width:100,align: 'center',
                  render: (h, params) => {
                     return h('div',[
                       h('InputNumber',{
                         props: {
                             //将单元格的值给Input
                             //'v-model':params.row.checkquantity,
                             value:params.row.outQuantity,
                             'min':0,
                             'step':1
                             },
                        style: {
                          width:"60px",
                        },
                       on:{
                            'on-change':(value)=> {

                              params.row.outQuantity = value

                              if(params.row.remark3=='YLS'){
                                this.tableColumns.data[params.index].standby1 =(parseInt(this.tableColumns.data[params.index].outQuantity) * parseFloat(this.tableColumns.data[params.index].packageStandards)  + parseFloat(this.tableColumns.data[params.index].partWeight)).toFixed(3)
                              } else{
                                this.tableColumns.data[params.index].standby1 =(parseInt(this.tableColumns.data[params.index].outQuantity) * parseFloat(this.tableColumns.data[params.index].packageStandards)).toFixed(3)
                              }

                              this.tableColumns.data[params.index] = params.row

                           },
                           'on-blur':()=>{
                             if (params.row.outQuantity > params.row.num) {
                               this.$Message.error("出库数量不能大于实际库存数量")
                               params.row.outQuantity = params.row.num
                             }else {
                               // this.formFilter.num= params.row.outQuantity
                               // this.formFilter.quantity= params.row.standby1
                               this.outOrderDetail[params.row.rowid-1].outQuantity = params.row.outQuantity
                               this.outOrderDetail[params.row.rowid-1].pieces = params.row.pieces
                               this.outOrderDetail[params.row.rowid-1].standby1 = params.row.standby1
                               this.outOrderDetail[params.row.rowid-1].remark3 = params.row.remark3

                               let len = this.tableColumns.data.length
                               if(len == 1){
                                 this.formFilter.num = this.outOrderDetail[params.row.rowid-1].outQuantity
                                 this.formFilter.quantity = (+params.row.outQuantity) * (+params.row.packageStandards)
                               }else{
                                 // alert(e.target.value)
                                 // this.tableColumns.data[params.index].quantity = e.target.value
                                 // alert(this.tableColumns.data[params.index].quantity)
                                      this.quantitytest = []
                                      this.tableColumns.data.forEach(item => {
                                        this.quantitytest.push(item.outQuantity)
                                      })
                                        let bbbb=this.quantitytest.reduce((pre, next) => {
                                        return (+pre) + (+next)
                                      })
                                      this.formFilter.num = +(bbbb.toFixed(3))+0
                                      // this.formFilter.quantity = this.formFilter.num * (+params.row.packageStandards)

                                      this.quantitytest2 = []
                                      this.tableColumns.data.forEach(item => {
                                        this.quantitytest2.push(item.standby1)
                                      })
                                        this.formFilter.quantity = this.quantitytest2.reduce((pre, next) => {
                                        return (+pre) + (+next)
                                      })

                               }

                             }


                           }
                         }
                         }
                       )]);
                     }
                   },
                   // {title: '单位数量X出库件数', key: 'standby1',width:240,align: 'center'},
                   {title: '库存重量', key: 'weight',width:150,align: 'center'},
                   {title: '出库重量', key: 'standby1',width:240,align: 'center'},
                   // {title: '零散数量', key: 'remark3',width:100,align: 'center'},
                   {title: '* 是否出零散',key: 'remark3',width: 150 ,align: 'center', render: (h, params) => {
                   let options = [];
                   options.push(h("Option",{props:{value:'YLS'}},'出零散'));
                   options.push(h("Option",{props:{value:'NLS'}},'非零散'));
                   // options.push(h("Option",{props:{value:'F'}},'不合格'));
                   return h('Select', {
                     props:{
                         value: params.row.remark3
                     },
                     style:{
                       width:'80px',
                       'text-algin':'left',
                       'margin-bottom':'11px'
                     },
                     on:{
                       'on-change':(remark3) => {
                         if(remark3=='YLS'&&(params.row.partWeight==null||params.row.partWeight==''||params.row.partWeight==undefined)){
                           params.row.remark3 = 'NLS'
                           //this.tableColumns.data[params.index].remark3= 'NLS'
                           this.tableColumns.data[params.index] = params.row
                           this.outOrderDetail[params.row.rowid-1].remark3 = params.row.remark3
                           this.$Message.error("没有零件，不能出零件")
                         }else if(remark3=='YLS'){
                           this.tableColumns.data[params.index].standby1 =(parseInt(this.tableColumns.data[params.index].outQuantity) * parseFloat(this.tableColumns.data[params.index].packageStandards)  + parseFloat(this.tableColumns.data[params.index].partWeight)).toFixed(3)
                         } else{
                             this.tableColumns.data[params.index].standby1 =(parseInt(this.tableColumns.data[params.index].outQuantity) * parseFloat(this.tableColumns.data[params.index].packageStandards)).toFixed(3)
                          }
                           params.row.remark3 = remark3


                           this.tableColumns.data[params.index] = params.row
                           this.outOrderDetail[params.row.rowid-1].remark3 = params.row.remark3

                       }
                     }
                   },options)
                 }},

                   {title: '包装规格', key: 'packageStandards',width:120,align: 'center'},
                   {title: '计量单位', key: 'unit',width:100,align: 'center'},
                   {title: '质量状态', key: 'qualityStatus',width:100,align: 'center',
                   render: (h, params) => {
                     if(params.row.qualityStatus == 'Q'){
                       return h('span','精品')
                     }else if(params.row.qualityStatus == 'N'){
                       return h('span','优等')
                     }else{
                       return h('span','未定义')
                     }

                      }
                   },
                  //  {title: '供应商',key: 'vendorName',width:200, align: 'center'},
                  //  {title: '生产商',key: 'producerName',width:200, align: 'center'},
                   {title: '出库仓库',key: 'warehouseName', width:200,align: 'center'},
                   {title: '出库库区', key: 'districtName',width:120,align: 'center'},
                   // {title: '工厂',key: 'plantTxt', width:200,align: 'center'},
                   // {title: '库存地点', key: 'locationTxt',width:120,align: 'center'},
                   // {title: '特殊库存标识', key: 'specificflgTxt',width:150,align: 'center'},
                   // {title: '特殊库存编号', key: 'specificflgno',width:150,align: 'center'},
                   // {title: '特殊库存行项目', key: 'specificflgitem',width:150, align: 'center' },




         ]

       },



      //分割标记




      stockList:[],

    loading:false,


    }
  },
  created(){        //渲染成功之后的专改
    // this.queryData()
    // this.getStockBasic()

  },

  methods:{
    testtest(){

    },

    getOutDate(outDate) {
      //将选择的时间赋值给参数
      this.formFilter.outDate = outDate;
    },
    movetypeChange(){
      // if(this.formFilter.movetype = '')
      // alert(this.formFilter.orderType)
      this.outOrderDetail = []
      this.tableColumns.data = []
      this.addOutOrderDetail()
    },
    query(){},
    addOutOrderDetail(){
      let detail = {materialNo:'',quantity:null,canQuantity:0,canPieces:0,quantityUnit:0}
      this.tableColumns.data.push(detail)
    },
    submitNewOutOrder(){
      // 初始化数据 --xuj
      this.formFilter.num = 0;
      this.formFilter.quantity = 0;
      if(this.formFilter.orderType == null || this.formFilter.orderType == ''){
        this.$Message.error("出库类型不能为空")
        return;
      }

      if(this.formFilter.customerId == null || this.formFilter.customerId == ''){
        this.$Message.error("客户不能为空")
        return
      }
      if(this.formFilter.outDate == null || this.formFilter.outDate == ''){
        this.$Message.error("出库日期不能为空")
        return
      }


      if (this.outOrderDetail.length > 0) {
        if(this.formFilter.orderType!='CKT04'){
          let newOrder = []
          let quantity = 0
          let stockquantity = 0
          for (var i = 0; i < this.outOrderDetail.length; i++) {
            if(this.outOrderDetail[i]._checked){
              // console.log(this.outOrderDetail[i].remark3)
              // if(this.outOrderDetail[i].remark3 == null || (this.outOrderDetail[i].quantity+parseFloat(this.outOrderDetail[i].remark3).toFixed(3)) == 0){


              if(this.outOrderDetail[i].outQuantity=='0'||this.outOrderDetail[i].outQuantity == null||this.outOrderDetail[i].outQuantity == undefined){
                this.$Message.error("'出库件数'未输入,请填写完整")
                return;
              }
              if(this.outOrderDetail[i].remark3 == null){
                this.$Message.error("'是否出零散'未选择,请填写完整")
                return;
              }
              this.outOrderDetail[i].outOrderId=this.formFilter.outOrderId
              this.outOrderDetail[i].batchNo=this.outOrderDetail[i].stockBatch
              this.outOrderDetail[i].num=this.outOrderDetail[i].outQuantity
              this.outOrderDetail[i].weight=this.outOrderDetail[i].standby1
              this.outOrderDetail[i].remark=this.formFilter.orderType
              this.outOrderDetail[i].actualWeight=0
              this.outOrderDetail[i].remark4=this.formFilter.remark1
              // quantity += this.outOrderDetail[i].quantity + parseFloat(this.outOrderDetail[i].remark3)
              // stockquantity += this.outOrderDetail[i].canQuantity
              newOrder.push(this.outOrderDetail[i])

              // 计算出库单的总出库件数和总出库重量 --xuj
              this.formFilter.num = this.formFilter.num + parseInt(this.outOrderDetail[i].outQuantity);
              this.formFilter.quantity = this.formFilter.quantity + parseFloat(this.outOrderDetail[i].standby1);
            }
          }
          // if(quantity <= 0){
          //   this.$Message.error("勾选明细的出库数量为0,请填写完整")
          //   return
          // }
          // console.log(stockquantity)
          // console.log(quantity)
          // if(this.formFilter.movetype == 'CKT01' && stockquantity != quantity){
          //   this.$Message.error("二次包装必须全部出库")
          //   return
          // }
          if (newOrder.length > 0) {

            let outPack = {outOrder:this.formFilter,outDetails:newOrder}

            axios.post(sessionStorage.http+'/submitNewOutOrder?loginStatus='+`${sessionStorage.loginStatus}`+`&orderType=`+`${this.formFilter.orderType}`,outPack)
            .then((res) =>{
              if (res.data == true) {
                this.$Message.success(res.message)
                this.showAddOutOrder = false
                this.hasSelected = 'false'
                document.getElementById("queryOutOrder").click()
              }else {
                this.$Message.error(res.message)
              }


            })
          }else {
            this.$Message.error("请选择要提交的明细")
          }
      }else{//---------------------------------拼盘-------------------------------------
        let newOrder = []
        let quantity = 0
        let stockquantity = 0
        this.quantitytest = []
        this.quantitytest2 = []
        for (var i = 0; i < this.outOrderDetail.length; i++) {
          if(this.outOrderDetail[i]._checked){
            // console.log(this.outOrderDetail[i].remark3)
            // if(this.outOrderDetail[i].remark3 == null || (this.outOrderDetail[i].quantity+parseFloat(this.outOrderDetail[i].remark3).toFixed(3)) == 0){
            //   if(this.outOrderDetail[i].remark3 == null || (this.outOrderDetail[i].outQuantity=='0'||this.outOrderDetail[i].outQuantity == null||this.outOrderDetail[i].outQuantity == undefined)){
            //   this.$Message.error("勾选明细的出库数量为0,请填写完整")
            //   return;
            // }
            this.outOrderDetail[i].outOrderId=this.formFilter.outOrderId
            this.outOrderDetail[i].batchNo=this.outOrderDetail[i].stockBatch
            // this.outOrderDetail[i].num=this.outOrderDetail[i].outQuantity
            // this.outOrderDetail[i].weight=this.outOrderDetail[i].standby1
            this.outOrderDetail[i].remark=this.formFilter.orderType
            this.outOrderDetail[i].actualWeight=0
            this.outOrderDetail[i].remark4=this.formFilter.remark1
            this.outOrderDetail[i].remark5=this.outOrderDetail[i].storageId
            // quantity += this.outOrderDetail[i].quantity + parseFloat(this.outOrderDetail[i].remark3)
            // stockquantity += this.outOrderDetail[i].canQuantity
            newOrder.push(this.outOrderDetail[i])

            this.quantitytest.push(this.outOrderDetail[i].num)
            this.quantitytest2.push(this.outOrderDetail[i].weight)
          }
        }

        // this.quantitytest = []
        // this.newOrder.forEach(item => {
        //   this.quantitytest.push(item.num)
        // })
          let bbbb=this.quantitytest.reduce((pre, next) => {
          return (+pre) + (+next)
        })
        this.formFilter.num = +(bbbb.toFixed(3))+0
        // this.formFilter.quantity = this.formFilter.num * (+this.newOrder[0].packageStandards)

        // this.quantitytest2 = []
        // this.newOrder.forEach(item => {
        //   this.quantitytest2.push(item.weight)
        // })
          this.formFilter.quantity = this.quantitytest2.reduce((pre, next) => {
          return (+pre) + (+next)
        })

        // if(quantity <= 0){
        //   this.$Message.error("勾选明细的出库数量为0,请填写完整")
        //   return
        // }
        // console.log(stockquantity)
        // console.log(quantity)
        // if(this.formFilter.movetype == 'CKT01' && stockquantity != quantity){
        //   this.$Message.error("二次包装必须全部出库")
        //   return
        // }
        if (newOrder.length > 0) {
          let outPack = {outOrder:this.formFilter,outDetails:newOrder}

          axios.post(sessionStorage.http+'/submitNewOutOrder?loginStatus='+`${sessionStorage.loginStatus}`+`&orderType=`+`${this.formFilter.orderType}`,outPack)
          .then((res) =>{
            if (res.data == true) {
              this.$Message.success(res.message)
              this.showAddOutOrder = false
              this.hasSelected = 'false'
              document.getElementById("queryOutOrder").click()
            }else {
              this.$Message.error(res.message)
            }


          })
        }else {
          this.$Message.error("请选择要提交的明细")
        }
      }
      }else {
        this.$Message.error("无明细数据，不可提交")
      }

    },
    getOutMaterial(materielId,params){
      if(this.formFilter.orderType == null || this.formFilter.orderType == ''){
        this.$Message.error("出库类型不能为空")
        return
      }
      if(this.formFilter.customerId == null || this.formFilter.customerId == ''){
        this.$Message.error("客户不能为空")
        return
      }
      if(this.formFilter.outDate == null || this.formFilter.outDate == ''){
        this.$Message.error("出库日期不能为空")
        return
      }
      if (this.formFilter.orderType != 'CKT04' ) {
        // alert('12121212')
        axios.post(sessionStorage.http+'/getOutMaterial?loginStatus='+`${sessionStorage.loginStatus}`+'&materialNo='+materielId+'&movetype='+this.formFilter.orderType,'')
        .then((res) =>{
          if (res.message == 'success') {
            for (var i = 0; i < res.data.length; i++) {
              let row = res.data[i];
              row.outQuantity = 0
              this.outOrderDetail.push(row)
            }
            this.total = this.outOrderDetail.length
            this.trimRowid()
            this.trimPageData()
          }else {
            if(this.formFilter.orderType == 'CKT08'){
              this.$Message.error("该物料/产品号无不良品")
            }else{
              this.$Message.error("该物料/产品号无库存")
            }
            // params.row.materialNo = ''
            // this.tableColumns.data[params.index].materialNo = ''
          }

        })
      }else {
        axios.post(sessionStorage.http+'/getPinPanOutMaterial?loginStatus='+`${sessionStorage.loginStatus}`+'&materialNo='+materielId+'&movetype='+this.formFilter.movetype,'')
        .then((res) =>{
          if (res.message == 'success') {
            for (var i = 0; i < res.data.length; i++) {
              let row = res.data[i];
              // row.remark3 = 0
              this.outOrderDetail.push(row)
            }
            this.total = this.outOrderDetail.length
            this.trimRowid()
            this.trimPageData()
          }else {
            this.$Message.error("该物料/产品号无库存")
            // params.row.materialNo = ''
            // this.tableColumns.data[params.index].materialNo = ''
          }

        })
      }


    },
    deleteDetail(){//删除选中的行
      this.delete_confirm = false
      for(let i = this.outOrderDetail.length - 1; i >= 0 ; i--){
        if(this.outOrderDetail[i]._checked){
          this.outOrderDetail.splice(this.outOrderDetail[i].rowid-1,1)
        }
      }
      this.total = this.outOrderDetail.length
      this.trimRowid()
      this.trimPageData()
      this.hasSelected = 'false'
    },
    onSelect(selection,row){
      this.outOrderDetail[row.rowid-1]._checked = true
      this.hasSelected = 'true'
    },
    onSelectCancel(selection,row){
      this.outOrderDetail[row.rowid-1]._checked = false
      this.getHasSelected()
    },
    onSelectAll(selection){
      for(var i = 0;i < this.outOrderDetail.length;i++){
        this.outOrderDetail[i]._checked = true
      }
      // for(var i = 0;i<selection.length;i++){
      //   this.outOrderDetail[selection[i].rowid-1]._checked = true
      // }
      this.hasSelected = 'true'
    },
    onSelectAllCancel(selection){
      for(var i = 0;i < this.outOrderDetail.length;i++){
        this.outOrderDetail[i]._checked = false
      }
      this.hasSelected = 'false'
    },
    onSelectionChange (rows) {//将选中的行记录下来

      // if(rows.length > 0){
      //   this.hasSelected = 'true'
      // }else {
      //   this.hasSelected = 'false'
      // }
      // if(rows.length == this.formFilter.pageSize){
      //   this.allChoosen = true
      // }else {
      //   this.allChoosen = false
      // }
       // this.detailRows = rows
     },
     getHasSelected(){
       this.hasSelected = 'false'
       for(var i = 0; i < this.outOrderDetail.length; i++ ){
         if(this.outOrderDetail[i]._checked){
           this.hasSelected = 'true'
           break
         }
       }
       if(this.hasSelected == 'false'){
         this.allChoosen = false
       }
     },
    trimRowid(){
      for (var i = 0; i < this.outOrderDetail.length; i++) {
        this.outOrderDetail[i].rowid = i+1
      }
    },
    trimPageData(){
      var startIndex = (this.formFilter.curPage - 1) * this.formFilter.pageSize
      var endIndex = startIndex + this.formFilter.pageSize
      this.tableColumns.data = []
      for (var i = startIndex; i < this.outOrderDetail.length && i <endIndex; i++) {
        this.tableColumns.data.push(this.outOrderDetail[i])
      }
    },
    show(){

      axios.get(sessionStorage.http+`/getAllCustomerIdNameMap?loginStatus=${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.customerList = res.data
        //this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })

      this.showAddOutOrder = true
      this.tableColumns.data = []
      this.addOutOrderDetail()
      this.outOrderDetail = []
      this.formFilter.orderType = '' //出库类型
      this.formFilter.customerId = '' //客户
      this.formFilter.outDate = new Date(); //出库日期
      this.formFilter.status = '0'
      this.formFilter.creatorName = sessionStorage.opername;
      this.formFilter.creatorId = sessionStorage.loginStatus;
      axios.get(sessionStorage.http+'/autoCreateId?type=CK')
      .then(res => {
        console.log(res)
        this.formFilter.outOrderId = res.data
      })
      .catch(res => {
      })

      //获取入库口
      axios.get(sessionStorage.http+`/getOutEntrances?loginStatus=${sessionStorage.loginStatus}`)
      .then((result) => {
        this.entrancelist=result.data
      })
      .catch((err)=>{
        iview.Message.error({
          content:err.message,
          duration:5
        });
      })

    },
    predictOutDateChanged(){//预计出库日期改变
      if(this.formFilter.predictOutDateD != ''){
        this.formFilter.predictOutDate = this.formartDate(this.formFilter.predictOutDateD)
        if (this.formFilter.predictOutDate < this.formartDate(new Date())) {
          this.$Message.error("预计出库日期不能小于当前日期")
          this.formFilter.predictOutDateD = ""
          this.formFilter.predictOutDate = ""
        }
      }else {
        this.formFilter.predictOutDate = ""
      }
      alert(this.formFilter.predictOutDate)
      alert(123)

    },
    formartDate(date){//日期格式化
      let  Y = date.getFullYear() +''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
      // console.log(Y + M + D)
      return Y +'-'+ M +'-' + D
    },



    //分割标记
    getStockBasic(){//查询基本数据的id和nameMap
      axios.post(sessionStorage.http+'/getStockBasic?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        //标记
        this.customerOptions = res.data.customer
        this.airlineOptions = res.data.airline
        this.freightStationOptions = res.data.freightStation
        this.productTypeOptions = res.data.productType
        let option = {name:'-所有-',id:'',}
        this.customerOptions.splice(0,0,option)
        this.airlineOptions.splice(0,0,option)
        this.freightStationOptions.splice(0,0,option)
        this.productTypeOptions.splice(0,0,option)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },
    clearData(){
      this.formFilter.districtId = undefined
      this.queryData()
    },
    districtIdClear(){
      this.formFilter.districtId = undefined
      this.queryData()
    },
    storageIdClear(){
      this.formFilter.storaeId = undefined
      this.queryData()
    },
    traynoClear(){
      this.formFilter.trayno = undefined
      this.queryData()
    },
    customeridClear(){
      this.formFilter.customerid = undefined
      this.queryData()
    },
    goodsIdClear(){
      this.formFilter.goodsId = undefined
      this.queryData()
    },
    goodsNameClear(){
      this.formFilter.goodgoodsName = undefined
      this.queryData()
    },
    recordQueryCondition(){
      this.districtId = this.formFilter.districtId
      this.storaeId = this.formFilter.storaeId
      this.trayno = this.formFilter.trayno
      this.goodsId = this.formFilter.goodsId
      this.goodgoodsName = this.formFilter.goodgoodsName
      this.batchno = this.formFilter.batchno
      this.customerid = this.formFilter.customerid
      this.startDateOutStr = this.formFilter.startDateOutStr
      this.endDateOutStr = this.formFilter.endDateOutStr
      this.startdstartDateDueStr = this.formFilter.startdstartDateDueStr
      this.endDateDueStr = this.formFilter.endDateDueStr
      this.startDateInStr = this.formFilter.startDateInStr
      this.endDateInStr = this.formFilter.endDateInStr
    },
    exportData(){
      //let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&districtId="+this.districtId+"&storaeId="+this.storaeId+"&trayno="+this.trayno+"&goodsId="+this.goodsId+"&goodgoodsName="+this.goodgoodsName+"&batchno="+this.batchno+"&customerid="+this.customerid+"&startDateOutStr="+this.startDateOutStr+"&endDateOutStr="+this.endDateOutStr+"&startdstartDateDueStr="+this.startdstartDateDueStr+"&endDateDueStr="+this.endDateDueStr+"&startDateInStr="+this.startDateInStr+"&endDateInStr="+this.endDateInStr
      window.open(sessionStorage.http+"/exportStockSDetail")

    },

    queryData(){//查询数据
      // axios.post(sessionStorage.http+'/getaddOutOrder?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      // .then((res) =>{
      //   console.log(res)
      //   this.stockList = res.data.resultData
      //   this.total = res.data.total
      //   this.trimPageData()
      //   //this.recordQueryCondition()
      // })
      // .catch((err) => {
      //    // iview.Message.error({
      //    //   content:'网络或服务器错误',
      //    //   duration:5
      //    // });
      // })
    },


    queryPageData(){//查询数据
      // axios.post(sessionStorage.http+'/getStockStoragePage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      // .then((res) =>{
      //   console.log(res.data)
      // })
      // .catch((err) => {
      //    // iview.Message.error({
      //    //   content:'网络或服务器错误',
      //    //   duration:5
      //    // });
      // })
    },

    flightDateChange(){//航班日期改变
      if(this.formFilter.flightDate != ''){
        this.formFilter.flightDateStr = this.formartDate(this.formFilter.flightDate)
      }else {
        this.formFilter.flightDateStr = undefined
      }
    },
    startDateChangedOut(){//出库日期起始日期改变
      if(this.formFilter.startDateOut != ''){
        this.formFilter.startDateOutStr = this.formartDate(this.formFilter.startDateOut)
      }else {
        this.formFilter.startDateOutStr = undefined
      }
      if(this.formFilter.startDateOut != '' && this.formFilter.endDateOut != ''){
        if(this.formartDate(this.formFilter.startDateOut) > this.formartDate(this.formFilter.endDateOut)){
          this.$Message.error("起始日期不能大于结束日期")
                this.formFilter.startDateOut = undefined
                this.formFilter.startDateOutStr = undefined
        }
      }
      if(this.formFilter.startDateOutStr != null && this.formFilter.startDateOutStr != undefined){
        this.queryData()
      }
    },
    endDateChangedOut(){//出库日期结束日期改变
      if(this.formFilter.startDateOut != '' && this.formFilter.endDateOut != ''){
        if(this.formartDate(this.formFilter.startDateOut) > this.formartDate(this.formFilter.endDateOut)){
          this.$Message.error("结束日期不能小于起始日期")
               this.formFilter.endDateOut = ''
               this.formFilter.endDateOutStr = undefined
        }
      }
      if(this.formFilter.endDateOut != ''){
        this.formFilter.endDateOut.setDate(this.formFilter.endDateOut.getDate()+1)
        this.formFilter.endDateOutStr = this.formartDate(this.formFilter.endDateOut)
      }else {
        this.formFilter.endDateOutStr = undefined
      }
      if(this.formFilter.endDateOutStr != null && this.formFilter.endDateOutStr != undefined){
        this.queryData()
      }
    },
    startDateChangedIn(){//入库日期起始期改变
      if(this.formFilter.startDateIn != ''){
        this.formFilter.startDateInStr = this.formartDate(this.formFilter.startDateIn)
      }else {
        this.formFilter.startDateInStr = undefined
      }
      if(this.formFilter.startDateIn != '' && this.formFilter.endDateIn != ''){
        if(this.formartDate(this.formFilter.startDateIn) > this.formartDate(this.formFilter.endDateIn)){
          console.log(this.formFilter.startDateIn)
          this.$Message.error("起始日期不能大于结束日期")
                this.formFilter.startDateIn = undefined
                this.formFilter.startDateInStr = undefined
        }
      }
      if(this.formFilter.startDateInStr != null && this.formFilter.startDateInStr != undefined){
        this.queryData()
      }
    },
    endDateChangedIn(){//入库日期结束期改变
      if(this.formFilter.endDateIn != ''){
        this.formFilter.endDateInStr = this.formartDate(this.formFilter.endDateIn)
      }else {
        this.formFilter.endDateInStr = undefined
      }
      if(this.formFilter.startDateIn != '' && this.formFilter.endDateIn != ''){
        if(this.formartDate(this.formFilter.startDateIn) > this.formartDate(this.formFilter.endDateIn)){
          console.log(this.formFilter.endDateIn)
          this.$Message.error("结束日期不能小于起始日期")
               this.formFilter.endDateIn = undefined
               this.formFilter.endDateInStr = undefined
        }
      }
      if(this.formFilter.endDateInStr != null && this.formFilter.endDateInStr != undefined){
        this.queryData()
      }
    },
    changeToIdNameOptions(origin,target){//将id-name对象数组转为id-name选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].name,value:origin[i].id}
        target.push(option)
      }
    },

    changeToIdOptions(origin,target){//将id-name对象数组转为id-id选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].id,value:origin[i].id}
        target.push(option)
      }
    },
    changeToNameOptions(origin,target){//将id-name对象数组转为name-name选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].name,value:origin[i].name}
        target.push(option)
      }
    },

    //库区
    getDistrict (query) {
        if (query !== '') {
            this.districtLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.districtLoading = false;
               this.districtOptions = this.districtAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.districtOptions = this.districtAllOptions;
        }
    },

    changeDistrict(query){
      if(query != true && query != false){
        this.districtTransition = query//将筛选条件用过渡对象记录
      }
    },
    getAllDistrict(){
      axios.get(sessionStorage.http+'/getAllDistrictIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.districtList = res.data
        this.changeToIdNameOptions(this.districtList,this.districtAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    districtOpenClose(open){
      if(open){
        if(this.formFilter.districtId == ' '){
          this.formFilter.districtId = undefined
        }
        this.districtOptions = this.districtAllOptions
      }else{
        console.log(this.formFilter.districtId)
        let contain = false//默认下拉框选择项不包含筛选条件
        for (var i = 0; i < this.districtOptions.length; i++) {
            let option = this.districtOptions[i]
            if(option.name == this.districtTransition){//下拉框选择项包含筛选条件
              this.formFilter.districtId = option.id
              contain = true
            }
         }
         if(!contain && this.districtTransition != ''){
           this.districtOptions = []
           let option = {label:"",value:' '}
           this.districtOptions.push(option)
           this.formFilter.districtId = option.id
         }
      }
      console.log(this.formFilter.districtId)
    },

    //货位号
    getStorage (query) {
        if (query !== '') {
            this.storageLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.storageLoading = false;
               this.storageOptions = this.storageAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.storageOptions = this.storageAllOptions;
        }
    },

    changeStorage(query){
      if(query != true && query != false){
        this.storageTransition = query
      }
    },

    getAllStorage(){
      axios.get(sessionStorage.http+'/getAllStorageIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.storageList = res.data
        this.changeToIdOptions(this.storageList,this.storageAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },


    storageOpenClose(open){
      if(open){
        if(this.formFilter.storageId == ' '){
          this.formFilter.storageId = undefined
        }
        this.storageOptions = this.storageAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.storageOptions.length; i++) {
            let option = this.storageOptions[i]
            if(option.name == this.storageTransition){
              this.formFilter.storageId = option.id
              contain = true
            }
         }
         if(!contain && this.storageTransition != ''){
           this.storageOptions = []
           let option = {label:"",value:' '}
           this.storageOptions.push(option)
           this.formFilter.storageId = option.id
         }
      }
    },

    //托盘
    gettrayno (query) {
        if (query !== '') {
            this.traynoLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.traynoLoading = false;
               this.traynoOptions = this.traynoAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.traynoOptions = this.traynoAllOptions;
        }
    },

    changetrayno(query){
      if(query != true && query != false){
        this.traynoTransition = query
      }
    },

    getAlltrayno(){
      axios.get(sessionStorage.http+'/getAllTrayIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.traynoList = res.data
        this.changeToIdOptions(this.traynoList,this.traynoAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    ttraynoOpenClose(open){
      if(open){
        if(this.formFilter.trayno == ' '){
          this.formFilter.trayno = undefined
        }
        this.traynoOptions = this.traynoAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.traynoOptions.length; i++) {
            let option = this.traynoOptions[i]
            if(option.name == this.traynoTransition){
              this.formFilter.storageId = option.id
              contain = true
            }
         }
         if(!contain && this.traynoTransition != ''){
           this.traynoOptions = []
           let option = {label:"",value:' '}
           this.traynoOptions.push(option)
           this.formFilter.trayno = option.id
         }
      }
    },

    //商品编号
    getGoodsId (query) {
        if (query !== '') {
            this.goodsIdLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.goodsIdLoading = false;
               this.goodsIdOptions = this.goodsIdAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.goodsIdOptions = this.goodsIdAllOptions;
        }
    },

    changeGoodId(query){
      if(query != true && query != false){
        this.goodsIdTransition = query
      }
    },

    getAllGoods(){
      axios.get(sessionStorage.http+'/getAllgoodsIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.goodsList = res.data
        this.changeToIdOptions(this.goodsList,this.goodsIdAllOptions)
        this.changeToNameOptions(this.goodsList,this.goodsNameAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },


    goodsIdOpenClose(open){
      if(open){
        if(this.formFilter.goodsId == ' '){
          this.formFilter.goodsId = undefined
        }
        this.goodsIdOptions = this.goodsIdAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.goodsIdOptions.length; i++) {
            let option = this.goodsIdOptions[i]
            if(option.name == this.goodsIdTransition){
              this.formFilter.goodsId = option.id
              contain = true
            }
         }
         if(!contain && this.goodsIdTransition != ''){
           this.goodsIdOptions = []
           let option = {label:"",value:' '}
           this.goodsIdOptions.push(option)
           this.formFilter.goodsId = option.id
         }
      }
    },

    //商品名称
    getGoodsName (query) {
        if (query !== '') {
            this.goodsNameLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.goodsNameLoading = false;
               this.goodsNameOptions = this.goodsNameAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.goodsNameOptions = this.goodsNameAllOptions;
        }
    },

    changeGoodName(query){
      if(query != true && query != false){
        this.goodsNameTransition = query
      }
    },

    goodsNameOpenClose(open){
      if(open){
        if(this.formFilter.goodsName == ' '){
          this.formFilter.goodsName = undefined
        }
        this.goodsNameOptions = this.goodsNameAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.goodsNameOptions.length; i++) {
            let option = this.goodsNameOptions[i]
            if(option.name == this.goodsNameTransition){
              this.formFilter.goodsName = option.id
              contain = true
            }
         }
         if(!contain && this.goodsNameTransition != ''){
           this.goodsNameOptions = []
           let option = {label:"",value:' '}
           this.goodsNameOptions.push(option)
           this.formFilter.goodsName = option.id
         }
      }
    },

    //客户
    getAllCustomer(){
      axios.get(sessionStorage.http+`/getAllCustomerIdNameMap?loginStatus=${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.customerList = res.data
        // this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    getCustomer (query) {
        if (query !== '') {
            this.customerLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.customerLoading = false;
               this.customerOptions = this.customerAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.customerOptions = this.customerAllOptions;
        }
    },

    changeCustomer(query){
      if(query != true && query != false){
        this.customerTransition = query
      }
    },

    customerOpenClose(open){
      if(open){
        if(this.formFilter.customerId == ' '){
          this.formFilter.customerId = undefined
        }
        this.customerOptions = this.customerAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.customerOptions.length; i++) {
            let option = this.customerOptions[i]
            if(option.name == this.customerTransition){
              this.formFilter.customerId = option.id
              contain = true
            }
         }
         if(!contain && this.customerTransition != ''){
           this.customerOptions = []
           let option = {label:"",value:' '}
           this.customerOptions.push(option)
           this.formFilter.customerId = option.id
         }
      }
    },


    handleChangePage (value) {
     this.formFilter.curPage = value
     this.trimPageData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      // const paths = this.$route.path.split('/')
    },

    handleSubmit () {
       // const paths = this.$route.path.split("/")
     },
     exportfile(){

     },
     onDoubleClick(value){
       console.log(value)
     }
  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        console.log(this.formFilter)
        this.queryData();
      }
    }
  }
}
</script>
<style lang="less">
.addOutOrder{
  th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    // .ivu-table-overflow {
    //   overflow-y: inherit;
    // }
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
      // bottom: 3px;
    }
    .ivu-select-selection{
      border:1px solid #888888;
      bottom:7px !important;
    }
    .ivu-input-icon-normal + .ivu-input{
      bottom:7px !important;
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
        bottom: -4px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
   .addOutOrderPage{
     .ivu-select-selection{
        bottom: 6px;
      }
   }
}
.changeDate{
  .ivu-input-icon-normal + .ivu-input{
    width: 160px;
  }
  .ivu-input-icon{
       position: absolute;
       right:-35px;
       bottom: -4px;
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
.dateInput{
  width: 120px;
  height: 28px;
  color: #333333;
}
.clear{clear:both;}
.outBox{
  display: inline-block;
  line-height: 50px;
  // width: 240px;
}
.inputBox{
  line-height: 40px;
  height: 40px;
}
.blank{
  display: inline-block;
  width: 15px;
}
.redLabel{
  color: red;
  text-align: right;
  color: #fe3838;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.blackLabel{
  display: inline-block;
  text-align: right;
  font-family: Microsoft YaHei;
  font-size: 12px;
  color: #5aa5ff;
}
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
