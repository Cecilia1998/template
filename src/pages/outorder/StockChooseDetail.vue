<template lang="html">
  <div class="stockChooseDetail">
    <Modal v-model="showStockChooseDetail" title="货位匹配明细" :mask-closable='false' footer-hide okText="确定" cancel-text='取消'
    @on-cancel="closeModal" :loading="loading" width='75%' style="height:500px;">
      <Form ref="formFilter" :model="formFilter" :label-width="80" inline style="text-align:left;">
        <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
        <tr>
          <td>
            <div class="" style="position:relative">
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库单号:</span>
              <span class="inputBox">
                <span>{{outDetail.outOrderId}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">明细单号:</span>
              <span class="inputBox">
                <span>{{outDetail.outOrderDetailId}}</span>
              </span>
            </span>

            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">物料号:</span>
              <span class="inputBox">
                <span>{{outDetail.materielId}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">物料名称:</span>
              <span class="inputBox">
                <span>{{outDetail.materielName}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">批次号:</span>
              <span class="inputBox">
                <span>{{outDetail.batchNo}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">出库件数:</span>
              <span class="inputBox">
                <span>{{outDetail.num}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">出库重量:</span>
              <span class="inputBox">
                <span>{{outDetail.weight}}</span>
              </span>
            </span>


            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">剩余重量:</span>
              <span class="inputBox">
                <span>{{outDetail.Surplus}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">是否出零散:</span>
              <span class="inputBox">
                <span v-if="outDetail.remark3 == 'YLS'">是</span>
                <span v-if="outDetail.remark3 == 'NLS'">否</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">移动类型:</span>
              <span class="inputBox">
                <span>{{outDetail.movetypeTxt}}</span>
              </span>
            </span> -->
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="" style="position:relative">
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库仓库:</span>
              <span class="inputBox">
                <span>{{outDetail.warehouseName}}</span>
              </span>
            </span>

            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">出库库区:</span>
              <span class="inputBox">
                <span>{{outDetail.districtName}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:65px;">&nbsp;</span>
              <span class="blackLabel">状态:</span>
              <span class="inputBox">
                <span v-if="outDetail.status == '0'">新建</span>
                <span v-if="outDetail.status == '1'">确认出库</span>
                <span v-if="outDetail.status == '2'">出库中</span>
                <span v-if="outDetail.status == '3'">出库完成</span>

                <!-- <span v-if="outDetail.status == 'CKD01'">未分配货位</span>
                <span v-if="outDetail.status == 'CKD02'">货位未确认</span>
                <span v-if="outDetail.status == 'CKD03'">货位确认中</span>
                <span v-if="outDetail.status == 'CKD04'">货位已确认</span>
                <span v-if="outDetail.status == 'CKD05'">出库完成</span>
                <span v-if="outDetail.status == 'CKD06'">出库完成</span> -->

              </span>
            </span>
            <!-- <span class="outBox" v-if="formFilter.realOut == 'Y' || formFilter.realOut == 'N'">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">实物出库</span>
              <span class="inputBox">
                <span v-if="outDetail.realOut == 'Y'">是</span>
                <span v-if="outDetail.realOut != 'Y'">否</span>
              </span>
            </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">允许发货:</span>
              <span class="inputBox">
                <span>{{outDetail.flag}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收部门:</span>
              <span class="inputBox">
                <span>{{outDetail.receiveDept}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收人:</span>
              <span class="inputBox">
                <span>{{outDetail.receiveby}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收工厂:</span>
              <span class="inputBox">
                <span>{{outDetail.recvPlantTxt}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">接收库存地点:</span>
              <span class="inputBox">
                <span>{{outDetail.recvLocTxt}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">工厂:</span>
              <span class="inputBox">
                <span>{{outDetail.plantTxt}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">库存地点:</span>
              <span class="inputBox">
                <span>{{outDetail.locationTxt}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">特殊库存标识:</span>
              <span class="inputBox">
                <span>{{outDetail.specificflgTxt}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">特殊库存编号:</span>
              <span class="inputBox">
                <span>{{outDetail.specificflgno}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">特殊库存行项目:</span>
              <span class="inputBox">
                <span>{{outDetail.specificflgitem}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">承运单位:</span>
              <span class="inputBox">
                <span>{{outDetail.carrierunit}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">实物出库:</span>
                <span class="inputBox">
                <Select v-model="outDetail.realOut"  style="width:75px;" @on-change="changequantity">
                  <Option value="Y">是</Option>
                  <Option value="N">否</Option>
                </Select>
              </span>
             </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库数量:</span>
              <span class="inputBox">
                <span>{{outDetail.quantity}}</span>
              </span>
             </span>
            </span> -->
            <!-- <span class="outBox" v-if="!isReChooseStorage">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">剩余分配数:</span>
              <span class="inputBox">
                <span>{{outDetail.standby3}}</span>
              </span>
            </span> -->
            <!-- <span>
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="inputBox blackLabel">
                <Checkbox v-model="isLabel" @on-change="urgentOut">紧急出库</Checkbox>
              </span>
            </span>
            <span class="outBox" v-if="isshow">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">修改的数量:</span>
              <span class="inputBox">
                <Input v-model="outDetail.standby4" placeholder="请输入" style="width:75px;" class="textInput" />
              </span>
            </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库通知单号</span>
              <span class="inputBox">
                <span v-if="outDetail.outcomingNotice != '' ">{{outDetail.outcomingNotice}}</span>
                <span v-if="outDetail.outcomingNotice == '' ">无通知单</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">内部订单号</span>
              <span class="inputBox">
                <span>{{outDetail.orderbillnum}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">移动类型</span>
              <span class="inputBox">
                <span>{{outDetail.movetypeTxt}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">出库单状态</span>
              <span class="inputBox">
                <span>{{outDetail.outStatus}}</span>
              </span>
            </span>
            <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">单据来源</span>
              <span class="inputBox">
                <span>{{outDetail.orderSource}}</span>
              </span>
            </span> -->

            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">收货单位</span>
              <span class="inputBox">
                <span>{{outDetail.receiver}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">客户</span>
              <span class="inputBox">
                <span>{{outDetail.customerName}}</span>
              </span>
            </span> -->
            <!-- <span class="outBox">
              <span class="blank" style="width:20px;">&nbsp;</span>
              <span class="blackLabel">成本中心</span>
              <span class="inputBox">
                <span>{{outDetail.costcenterTxt}}</span>
              </span>
            </span> -->

            <!-- <div class="" style="position:absolute;bottom:15px;right:50px">

                <Button shape="circle" @click="confirmOutStorage" v-if="!isReChooseStorage" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >确认货位</Button>
                <Button shape="circle" @click="reChooseStorage"  v-if="!isReChooseStorage" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >重选货位</Button>
              <Button shape="circle" @click="confirmReChooseStorage"   v-if="isReChooseStorage" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >重选确认</Button>

              <Button type="primary" id="queryOutOrder" shape="circle" v-show="false" @click="">查询</Button>
          </div> -->

        </div>


          </td>
        </tr>
        <tr>
          <td align="right">
            <Button shape="circle" @click="confirmOutStorage" v-if="!isReChooseStorage" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >确认货位</Button>
            <!-- <Button shape="circle" @click="reChooseStorage"  v-if="!isReChooseStorage" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >重选货位</Button> -->
          <!-- <Button shape="circle" @click="confirmReChooseStorage"   v-if="isReChooseStorage" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  >重选确认</Button> -->

          <Button type="primary" id="queryOutOrder" shape="circle" v-show="false" @click="">查询</Button>

          </td>
        </tr>



      </Form>
      <table height="10px">

      </table>
      <!-- <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" ></Table> -->
      <Table height=500 border stripe  :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" ></Table>
      <!-- <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table> -->
      <br />
      <div class="stockChooseDetailPage">
        <Page :total="total" :current="curPage" :page-size="pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
      </div>

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
      outLock:false,
      showStockChooseDetail:false,//modal显示标记
      couldDelet:false,//删除标记
      newLine:1,//新增行数
      loading:false,
      total:0,
      outDetail:{},
      rows:[],
      stockChooseDetail:[],
      isReChooseStorage:false,//重新选择货位标记
      originAllot:{title: '原分配数量', key: 'quantity',width:120,align: 'center'},
      curPage:1,
      pageSize:20,
      formFilter: {
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
      flag:true,
      isshow:false,
      isLabel:false,
      choosenDetail:[],


      tableColumns: {//表格数据
        data:[
          {
            keyid:'',
            districtid:'',
            storageid:'',
            itemcode:'',
            itemname:'',
            inquantity:'',
            remark:'',
            unquantity:'',
            canquantity:'',
            invUomCode:'',
            customerid:'',
            batchno:'',
            productiondate:'',
            expirationdate:'',
            putindate:'',
            type:'',
          }
        ],
         card: [
                  {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center',},
                  {title: '序号',key: 'rowid',width: 80,align: 'center'},
                  {title: '物料号', key: 'materielId',width:120,align: 'center'},
                  {title: '物料名称', key: 'materielName',width:120,align: 'center'},
                  {title: '批次号', key: 'stockBatch',width:120,align: 'center'},
                  // {title: '实物出库', key: 'realOut',width:120,align: 'center',
                  // render: (h, params) => {
                  //   // if(params.row.detailStatus != 'CKD01'){
                  //   //   if (params.row.realOut == 'Y') {
                  //   //     return h('span','是')
                  //   //   }else {
                  //   //     return h('span','否')
                  //   //   }
                  //   // }
                  //   let options = [];
                  //   options.push(h("Option",{props:{value:'Y'}},'是'));
                  //   options.push(h("Option",{props:{value:'N'}},'否'));
                  //   return h('Select', {
                  //     props:{
                  //       value: params.row.realOut
                  //     },
                  //     style:{
                  //       width:'90px',
                  //       // 'text-algin':'left',
                  //       bottom:"7px",
                  //     },
                  //     on:{
                  //       'on-change':(realOut) => {
                  //         params.row.realOut = realOut
                  //         let isChecked = this.tableColumns.data[params.index]
                  //         // axios.post(sessionStorage.http + `/outOrder/saveAlterOutDetail?loginStatus=${sessionStorage.loginStatus}`, params.row)
                  //         //   .then((res) => {
                  //         //       if(res.data == true){
                  //         //         this.tableColumns.data[params.index] = params.row
                  //         //         this.outOrderDetail[params.row.rowid-1] = params.row
                  //         //         if (isChecked) {
                  //         //           this.tableColumns.data[params.index]._checked = true
                  //         //           this.outOrderDetail[params.row.rowid-1]._checked = true
                  //         //         }
                  //         //       }
                  //         //   })
                  //
                  //       }
                  //     }
                  //
                  //   },options)
                  //
                  //    }
                  // },
                  // {title: '状态', key: 'status',width:120,align: 'center',
                  //   render: (h, params) => {
                  //     if (params.row.status == '0') {
                  //       return h('span','未确认')
                  //     }else if(params.row.status == '1') {
                  //       return h('span','已确认')
                  //     }else {
                  //       return h('span','已确认')
                  //     }
                  //    }
                  // },
                  {title: '货位号', key: 'storageId',width:120,align: 'center'},
                  {title: '托盘号', key: 'palletCode',width:120,align: 'center'},
                  {title: '库存件数', key: 'num',width:120,align: 'center'},
                  {title: '库存重量', key: 'weight',width:120,align: 'center'},
                  {title: '零件重量', key: 'partWeight',width:120,align: 'center'},
                  {title: '出库件数', key: 'remark',width:100,align: 'center'},
                   {title: '出库重量', key: 'remark4',width:240,align: 'center'},
                   // {title: '零散数量', key: 'remark3',width:100,align: 'center'},
                   {title: '是否出零散',key: 'remark5',width: 150 ,align: 'center', render: (h, params) => {
                      if(params.row.remark5=='YLS'){
                          return h('span','出零散');
                        }else if(params.row.remark5=='NLS'){
                          return h('span','非零散');
                        }
                   // options.push(h("Option",{props:{value:'F'}},'不合格'));
                  //  return h('Select', {
                  //    props:{
                  //        value: params.row.remark5
                  //    },
                  //    style:{
                  //      width:'80px',
                  //      'text-algin':'left',
                  //      'margin-bottom':'11px'
                  //    },
                  //    on:{
                  //      'on-change':(remark5) => {
                  //         // alert(params.row.remark5)
                  //         if(remark5=='YLS'&&(params.row.partWeight==null||params.row.partWeight==''||params.row.partWeight==undefined)){
                  //           params.row.remark5 = 'NLS'
                  //           this.tableColumns.data[params.index].remark5= 'NLS'
                  //           this.$Message.error("没有零件，不能出零件")
                  //         }else if(remark5=='YLS'){
                  //           // params.row.remark4=params.row.remark4+params.row.partWeight
                  //           this.tableColumns.data[params.index].remark4=this.tableColumns.data[params.index].remark4 == '0'?this.tableColumns.data[params.index].partWeight:this.tableColumns.data[params.index].remark4 + this.tableColumns.data[params.index].partWeight
                  //           params.row.remark5 = remark5
                  //           this.tableColumns.data[params.index].remark5 = remark5
                  //           // console.log()
                  //         }else{
                  //           this.tableColumns.data[params.index].remark4 = this.tableColumns.data[params.index].packageStandards*this.tableColumns.data[params.index].remark
                  //           this.tableColumns.data[params.index].remark5 = remark5
                  //         }
                  //      }
                  //    }
                  //  },options)
                 }},
                  // {title: '分配数量', key: 'allotQuantity',width:120,align: 'center',
                  //   render: (h, params) => {
                  //     if (this.outDetail.detailStatus == 'CKD04' || params.row.stockQuantity == params.row.allotQuantity) {
                  //       return h('span',params.row.allotQuantity)
                  //     }
                  //     return h('div',[
                  //       h('InputNumber',{
                  //         props: {
                  //             //将单元格的值给Input
                  //             //'v-model':params.row.checkWeight,
                  //             value:params.row.allotQuantity,
                  //             'min':0,
                  //             },
                  //        style: {
                  //          width:"60px",
                  //        },
                  //       on:{
                  //            'on-change':(value)=> {
                  //              if (value > params.row.stockQuantity) {
                  //                this.$Message.error("分配数量不能大于库存数量")
                  //                setTimeout(()=>{
                  //                  params.row.allotQuantity = params.row.quantity
                  //                  this.tableColumns.data[params.index] = params.row
                  //                  this.stockChooseDetail[params.row.rowid - 1] =  params.row
                  //                },10)
                  //              }else if (value > this.outDetail.quantity) {
                  //                this.$Message.error("分配数量不能大于出库数量")
                  //                setTimeout(()=>{
                  //                  params.row.allotQuantity = params.row.quantity
                  //                  this.tableColumns.data[params.index] = params.row
                  //                  this.stockChooseDetail[params.row.rowid - 1] =  params.row
                  //                },10)
                  //              }else {
                  //                params.row.allotQuantity = value
                  //                let quantityUnit = Math.floor(params.row.stockQuantity / params.row.stockPieces)
                  //                if(quantityUnit == 0){
                  //                  quantityUnit = 1
                  //                }
                  //                let outPiece = Math.floor(value / quantityUnit)
                  //                // console.log(quantityUnit)
                  //                // console.log(outPiece)
                  //                // params.row.quantity = realValue
                  //                params.row.allotPieces = outPiece
                  //
                  //                this.tableColumns.data[params.index] = params.row
                  //                this.stockChooseDetail[params.row.rowid - 1] =  params.row
                  //                 // console.log(this.rows[params.row.rowid - 1])
                  //                // this.rows[params.row.rowid - 1] = params.row
                  //                for(var i = 0;i<this.rows.length;i++){
                  //                  var row  =  this.rows[i]
                  //                  if(params.row.storaeId == row.storaeId && params.row.trayNo ==  row.trayNo){
                  //                    this.rows[i] = params.row
                  //                  }
                  //                }
                  //                // console.log(this.rows)
                  //                var shengYu = 0
                  //                for(var i = 0;i<this.tableColumns.data.length;i++){
                  //                  var row  =  this.tableColumns.data[i]
                  //                  // console.log(row)
                  //
                  //                  if(row.allotQuantity == null){
                  //                    row.allotQuantity = 0
                  //                  }
                  //                  shengYu += row.allotQuantity
                  //                }
                  //                this.outDetail.standby3 = (this.outDetail.quantity - shengYu).toFixed(3)
                  //                // console.log(params.row)
                  //                // this.stockChooseDetail[params.row.rowid - 1].allotQuantity = value
                  //              }
                  //
                  //           },
                  //           'on-blur':(even)=>{
                  //
                  //           }
                  //         }
                  //
                  //       }
                  //     )]);
                  //   }
                  // },
                  //
                  // {title: '分配件数', key: 'allotPieces',width:120,align: 'center'},
                  {title: '计量单位', key: 'unit',width:120,align: 'center'},
                  {title: '包装规格',key: 'packageStandards',width:200, align: 'center'},
                  // {title: '检验批号', key: 'checkBatch',width:120,align: 'center'},
                  // {title: '质量状态', key: 'qualityStatus',width:120,align: 'center',
                  //   render: (h, params) => {
                  //     if (params.row.qualityStatus == 'Q') {
                  //       return h('span','待检')
                  //     }else if(params.row.qualityStatus == 'N') {
                  //       return h('span','非限制')
                  //     }else if(params.row.qualityStatus == 'F') {
                  //       return h('span','冻结')
                  //     }else {
                  //       return h('span','未定义')
                  //     }
                  //    }
                  // },
                  // {title: '承运单位', key: 'carrierunit',width:120,align: 'center'},
                  // {title: '允许发货', key: 'flag',width:120,align: 'center'},



         ]

       },



      //分割标记





      stockList:[],




    }
  },
  created(){        //渲染成功之后的专改


  },
  updated(){

  },
  computed:{

  },
  methods:{
    //紧急出库
    urgentOut(){
      console.log(this.isLabel)
      if(this.isLabel == true){
        this.outDetail.isUrgentOut = '1'
      }else{
        this.outDetail.isUrgentOut = '0'
      }
      this.queryStockChooseDetail()
    },
    changequantity(value){
      console.log(this.outDetail.realOut)
      if(this.outDetail.realOut == 'Y'){
        this.isshow = false
        this.queryStockChooseDetail()
      }
      if(this.outDetail.realOut == 'N'){
        this.isshow = true
        this.tableColumns.data = []
      }
    },
    testtest(){

    },
    show(outDetail){
      this.isshow = false
      this.isLabel = false
      this.rows = [];
      this.outDetail = outDetail
      this.outDetail.realOut = 'Y'
      this.outDetail.standby3 = this.outDetail.quantity
      this.showStockChooseDetail = true
      if(outDetail.status != '1'){
        this.isReChooseStorage = true
      }else{
       this.isReChooseStorage = false
      }

      this.outDetail.isUrgentOut = '0'
      this.queryStockChooseDetail()
      // if(this.tableColumns.card.length > 14){
      //   this.tableColumns.card.splice(9,1)
      // }
      // console.log(this.tableColumns.card)
      if(this.tableColumns.card[9].key == 'originAllot'){
        this.tableColumns.card.splice(9,1)
      }
    },
    queryStockChooseDetail(){//查询库存选择明细
      axios.post(sessionStorage.http+'/reChooseStorage?loginStatus='+`${sessionStorage.loginStatus}`,this.outDetail)
      .then((res) =>{

        if(res.data != null){
          this.stockChooseDetail = res.data
        }else{
          iview.Message.error({
            content:res.message,
            duration:5
          });
        }


        this.total = res.data.length
        if(this.outDetail.detailStatus == 'CKD04'){
          this.isReChooseStorage = true
        }else{
          console.log("ssssss");
          console.log(this.stockChooseDetail)
          for (var i = 0; i < this.stockChooseDetail.length; i++) {
            let detail = this.stockChooseDetail[i]
            // detail.allotQuantity = 0
            // detail.allotPieces = 0
            if(detail.unit == "件"){
              detail.remark4 = null;
            }else{
             detail.remark4 = detail.remark5 == "YLS"?parseFloat(detail.packageStandards)*detail.remark + parseFloat(detail.partWeight) :parseFloat(detail.packageStandards)*detail.remark
            }
            detail.outOrderDetailId = this.outDetail.outOrderDetailId
            detail.outOrderId = this.outDetail.outOrderId
            // if(detail.stockQuantity == detail.allotQuantity){
            //   this.outDetail.standby3 =(parseFloat(this.outDetail.standby3) - detail.allotQuantity).toFixed(3)
            // }
          }
        }
        if(this.stockChooseDetail.length == 0){
          iview.Message.error({
            content:'库存不足，请稍后再试!',
            duration:5
          });
        }
        this.trimRowid()
        this.trimPageData()

      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },
    confirmOutStorage(){//确认出库货位
      // console.log(this.rows.length)
      // console.log(this.rows)
      // if(this.outDetail.realOut == 'N'){
      //   this.outLock = true
      //
      //   axios.post(sessionStorage.http+'/outOrder/confirmOutStorage?loginStatus='+`${sessionStorage.loginStatus}`,[{outOrderDetailId:this.outDetail.outOrderDetailId,realOut:this.outDetail.realOut,standby4:this.outDetail.standby4}])
      //   .then((res) =>{
      //       this.outLock = false
      //     console.log(res)
      //     if(res.data == true){
      //       this.$Message.success(res.message)
      //       this.changeStatus()
      //       this.trimPageData()
      //       document.getElementById('queryDetailChooseStock').click();
      //       this.showStockChooseDetail = false
      //     }else {
      //       this.$Message.error(res.message)
      //     }
      //   })
      //   .catch((err) => {
      //      this.outLock = false
      //   })
      //   return
      // }
      if(this.rows.length <= 0){
          this.$Message.error("请勾选,再提交")
          return
      }
      // let pass = true
      // let choosenDetail = []
      // var comfirmQuantity = 0;
      // for (var i = 0; i < this.rows.length - 1; i++) {
      //   let detail = this.rows[i]
      //   // if(detail.status == '0'){
      //   // if(parseFloat(detail.allotQuantity) == 0){
      //   //   this.$Message.error("勾选明细的分配数量为0,请勿勾选")
      //   //   return;
      //   // }
      //   comfirmQuantity += detail.stockQuantity
      //   if(comfirmQuantity.toFixed(3) > this.outDetail.quantity){
      //     this.$Message.error("勾选明细的数量大于需要出库的数量")
      //     return
      //   }
      //   detail.outOrderId = this.outDetail.outOrderId
      //   detail.outOrderDetailId = this.outDetail.outOrderDetailId
      //   detail.realOut = this.outDetail.realOut
      //   detail.standby4 = this.outDetail.standby4
      //   detail.isUrgentOut = this.outDetail.isUrgentOut
      //   detail.allotQuantity = detail.stockQuantity
      //   detail.allotPieces = detail.stockPieces
      //   choosenDetail.push(detail)
      //   // }
      // }
      // var lastRow = this.rows[this.rows.length - 1]
      // comfirmQuantity += lastRow.stockQuantity
      //条件:明细是累计数量<出库明细数量
      // if(((comfirmQuantity + lastRow.stockQuantity).toFixed(3) < this.outDetail.quantity)){
      //     this.$Message.error("勾选明细的数量小于需要出库的数量")
      //     return
      // }
      // let quantityUnit = Math.floor(params.row.stockQuantity / params.row.stockPieces)
      // if(quantityUnit == 0){
      //   quantityUnit = 1
      // }
      // let outPiece = Math.floor(value / quantityUnit)

      // lastRow.outOrderId = this.outDetail.outOrderId
      // lastRow.outOrderDetailId = this.outDetail.outOrderDetailId
      // lastRow.realOut = this.outDetail.realOut
      // lastRow.standby4 = this.outDetail.standby4
      // lastRow.isUrgentOut = this.outDetail.isUrgentOut
      // var quantityUnit = Math.floor(lastRow.stockQuantity / lastRow.stockPieces)
      // if(quantityUnit == 0){
      //   quantityUnit = 1
      // }
      // lastRow.allotQuantity = (this.outDetail.quantity - comfirmQuantity).toFixed(3)
      // lastRow.allotPieces =Math.floor(lastRow.allotQuantity / quantityUnit)
      // choosenDetail.push(lastRow)
      // if(this.outDetail.realOut != 'Y' || this.outDetail.realOut != 'N'){
      //   this.$Message.error("请选择实物出库");
      //   return
      // }
      // console.log(this.rows)
      // console.log(comfirmQuantity.toFixed(3))
      // console.log(this.outDetail.quantity)
      // if(comfirmQuantity.toFixed(3) < this.outDetail.quantity){
      //   // console.log(comfirmQuantity.toFixed(3))
      //   // console.log(this.outDetail.quantity)
      //   this.$Message.error("分配数量小于出库数量,请重新填写")
      //   return
      // }
      // if(comfirmQuantity.toFixed(3) > this.outDetail.quantity){
      //   this.$Message.error("分配数量大于出库数量,请重新填写")
      //   return
      // }
      if (this.rows.length > 0) {
        //可能先勾选数据，再重新赋值，
        this.rows.forEach((item,index) => {
          var trayno = item.palletCode;
          this.tableColumns.data.forEach((i) => {
            if(i.palletCode == trayno){
              this.rows[index] = i;
              // break;
            }
          })
        })


        // if (this.flag) {
          // this.outLock = true
          axios.post(sessionStorage.http+'/confirmOutStorage?loginStatus='+`${sessionStorage.loginStatus}`+`&outOrderDetailId=`+`${this.outDetail.outOrderDetailId}`,this.rows)
          .then((res) =>{
              // this.outLock = false
            console.log(res)
            document.getElementById('queryDetailChooseStock').click();
            this.showStockChooseDetail = false
            // if(res.data == true){
            //   this.$Message.success(res.message)
            //   for (var i = 0; i < choosenDetail.length; i++) {
            //     this.stockChooseDetail[choosenDetail[i].rowid - 1].status = '1'
            //   }
            //   this.changeStatus()
            //   this.trimPageData()
            //   document.getElementById('queryDetailChooseStock').click();
            //   this.showStockChooseDetail = false
            // }else {
            //   this.$Message.error(res.message)
            // }
          })
          .catch((err) => {
             // this.outLock = false
          })
        // }
      }else {
        this.$Message.error("请选择可确认货位的数据")
      }

    },
    changeStatus(){//改变状态
       this.outDetail.detailStatus = 'CKD04'
      for (var i = 0; i < this.stockChooseDetail.length; i++) {
        if (this.stockChooseDetail[i].status == '0') {
          this.outDetail.detailStatus = 'CKD03'
          break
        }
      }
      // this.outDetail.detailStatus = detailStatus
    },

    reChooseStorage(){//重选出库货位
      let pass = false
      for (var i = 0; i < this.stockChooseDetail.length; i++) {
        let detail = this.stockChooseDetail[i]
        if(detail.status == '0'){
          pass = true
          break
        }
      }
      if (pass) {
        if (!this.outLock) {
          this.outLock = true
          axios.post(sessionStorage.http+'/outOrder/reChooseStorage?loginStatus='+`${sessionStorage.loginStatus}`,this.outDetail)
          .then((res) =>{
            console.log(res)
            this.outLock = false
            this.isReChooseStorage = true
            if(this.tableColumns.card[9].key != 'originAllot'){
              this.tableColumns.card.splice(9,0,this.originAllot)
            }


            this.stockChooseDetail = res.data
            this.total = res.data.length
            this.trimRowid()
            this.trimPageData()
          }).catch((err) => {
             this.outLock = false
          })
        }
      }else {
        this.$Message.error("所有出库货位都已确认，不可重新选择")
      }
    },
    confirmReChooseStorage(){//重选货位确定
      let allotQuantity = 0;
      let reChooseDetail = []
      for (var i = 0; i < this.stockChooseDetail.length; i++) {
        console.log(this.stockChooseDetail[i])
        console.log(this.stockChooseDetail[i].allotQuantity)
        if (this.stockChooseDetail[i].allotQuantity != null) {
          allotQuantity += this.stockChooseDetail[i].allotQuantity
          reChooseDetail.push(this.stockChooseDetail[i])
        }
      }
      if (allotQuantity != this.outDetail.quantity) {
        this.$Message.error("分配数量的总数要等于出库数量")
      }else {
        let chooseStoragePack = {outDetail:this.outDetail,storageAllots:reChooseDetail}
        if (!this.outLock) {
          this.outLock = true
          axios.post(sessionStorage.http+'/outOrder/confirmReChooseStorage?loginStatus='+`${sessionStorage.loginStatus}`,chooseStoragePack)
          .then((res) =>{
             this.outLock = false
            if(res.data == true){
              this.$Message.success(res.message)
              this.isReChooseStorage = false

              this.tableColumns.card.splice(9,1)
              this.queryStockChooseDetail()
            }else {
              this.$Message.error(res.message)
            }

          }).catch((err) => {
             this.outLock = false
          })
        }
      }
    },
    closeModal(){
      document.getElementById("queryDetailChooseStock").click()
    },



    //分割标记

    deleteDetail(){//删除选中的行
      this.delete_confirm = false
      for(let i = this.stockChooseDetail.length - 1; i >= 0 ; i--){
        if(this.stockChooseDetail[i]._checked){
          this.stockChooseDetail.splice(this.stockChooseDetail[i].rowid-1,1)
        }
      }
      this.total = this.stockChooseDetail.length
      this.trimRowid()
      this.trimPage()
      this.hasSelected = 'false'
    },
    onSelect(selection,row){
      // this.stockChooseDetail[row.rowid-1]._checked = true
      // this.hasSelected = 'true'
      // if(this.flag){
      //   if((+this.outDetail.Surplus) > (+this.row.weight)){
      //     this.outDetail.Surplus=this.outDetail.Surplus-this.row.weight
      //     this.row.remark=this.row.weight
      //     this.row.remark=this.row.num
      //     this.choosenDetail.push(row)
      //   }else{
      //     this.row.remark=this.outDetail.Surplus
      //     this.row.remark=this.row.num
      //     this.outDetail.Surplus=0
      //     this.choosenDetail.push(row)
      //     this.flag=false
      //   }
      // }
      //
      // alert(this.flag)
    },
    onSelectCancel(selection,row){
      // this.stockChooseDetail[row.rowid-1]._checked = false
      // this.getHasSelected()
      // this.choosenDetail.forEach((item,index) => {
      //   if(row.palletCode==item.palletCode){
      //     this.outDetail.Surplus=this.outDetail.Surplus+this.row.weight
      //     this.flag=true
      //     this.choosenDetail.remove(index,1)
      //   }
      // })

    },
    onSelectAll(selection){
      for(var i = 0;i < this.stockChooseDetail.length;i++){
        this.stockChooseDetail[i]._checked = true
      }
      // for(var i = 0;i<selection.length;i++){
      //   this.stockChooseDetail[selection[i].rowid-1]._checked = true
      // }
      this.hasSelected = 'true'
    },
    onSelectAllCancel(selection){
      // for(var i = 0;i < this.stockChooseDetail.length;i++){
      //   this.stockChooseDetail[i]._checked = false
      // }
      // this.hasSelected = 'false'
    },
    onSelectionChange (rows) {//将选中的行记录下来
      this.rows = rows
      // if((+this.outDetail.Surplus) > (+this.rows.weight)){
      //   outDetail.Surplus=outDetail.Surplus-this.rows.weight
      // }else{
      //   outDetail.Surplus=0
      //   this.flag=false
      // }
      console.log(rows)
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
       for(var i = 0; i < this.stockChooseDetail.length; i++ ){
         if(this.stockChooseDetail[i]._checked){
           this.hasSelected = 'true'
           break
         }
       }
       if(this.hasSelected == 'false'){
         this.allChoosen = false
       }
     },
    trimRowid(){
      for (var i = 0; i < this.stockChooseDetail.length; i++) {
        this.stockChooseDetail[i].rowid = i+1
      }
    },
    trimPageData(){
      var startIndex = (this.curPage - 1) * this.pageSize
      var endIndex = startIndex + this.pageSize
      this.tableColumns.data = []
      for (var i = startIndex; i < this.stockChooseDetail.length && i < endIndex; i++) {
        this.tableColumns.data.push(this.stockChooseDetail[i])
      }
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
      axios.post(sessionStorage.http+'/getstockChooseDetail?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res)
        this.stockList = res.data.resultData
        this.total = res.data.total
        this.trimPageData()
        //this.recordQueryCondition()
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },


    queryPageData(){//查询数据
      axios.post(sessionStorage.http+'/getStockStoragePage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res.data)
      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
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
      return Y + M + D
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
      axios.get(sessionStorage.http+'/getAllCustomerIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
      .then((res) =>{
        this.customerList = res.data
        this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
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
     this.curPage = value
     this.trimPageData()
    },
    handleChangePageSize(value){
      this.pageSize = value
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
.stockChooseDetail{
  th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-table-overflow {
      overflow-y: inherit;
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
   .stockChooseDetailPage{
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
