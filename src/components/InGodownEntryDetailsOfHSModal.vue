<template lang="html">
  <Modal  v-model="inGodownEntryDetail" :loading='loading' width='1500px' :mask-closable='false' footer-hide>
      <p slot="header" style="text-align:center;font-size:16px">
            <span>入库单</span>
      </p>
      <div class="ideanGodownEntryDetailsOfHS">
     <Form ref="formFilter" :model="formFilter" :label-width="110" inline style="text-align:left;" >
        <Row>
          <Col span="8">
             <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:12px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creater}}</div>
          </Col>
        </Row>
        <Row>
          <Col span="5">
            <div class="status">
              <Form-item label="仓库" style="margin:20px 0 30px 18px ">
                <font color="red" class="font2">*</font>
                <Select v-model="formFilter.warehouseId" placeholder="请选择" disabled style="width: 160px;height:20px;display:none" clearable element-id='warehouseId' @on-change='changeContentByWarehouse' @on-clear='clearGodownAndWarehouse'>
                  <Option value="AT001" >自动仓</Option>
                  <Option value="OD001" >普通仓</Option>
                </Select>
                <label>{{formFilter.warehouseName}}</label>
              </Form-item>
            </div>
          </Col>
          <Col span="6">
            <div class="status">
              <Form-item label="入库类型" style="margin:20px 0 23px 11px ">
                <font color="red" class="font4">*</font>
                <Select v-model="formFilter.godownEntryType" placeholder="请选择" style="width: 160px;height:20px;display:none" @on-change='changeContentByGodownType' clearable id='godownType' ref='godownType' disabled>
                   <Option v-for=" item in pageForDetail" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
                </Select>
                <label>{{formFilter.entryTypeName}}</label>
              </Form-item>
            </div>
          </Col>
          <Col span="12">
          </Col>
        </Row>
        <Card id='bookSpaceInfoDetail' >
          <div>&nbsp;</div>
          <p slot="title">入库单明细</p>
          <Row>
            <Col span="24">
                 <Row>

                   <Col span="5">
                       <div class="status">
                         <Form-item label="入库单号">
                           <label>{{formFilter.backNumber}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="入库通知单号">
                           <label>{{formFilter.warehouseEntryId}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="入库通知单行号">
                         <label>{{formFilter.customerName}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="移动类型">
                         <label>{{changeDate(formFilter.godownTime)}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="移动类型描述">
                         <label>{{formFilter.flightNumber}}</label>
                       </Form-item>
                     </div>
                   </Col>
                 </Row>
                 <Row>

                   <Col span="5">
                     <div class="status">
                       <Form-item label="移动标识">
                         <label>{{formFilter.navigationDivision}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="采购订单号">
                         <label>{{formFilter.flightDate}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                      <div class="status">
                        <Form-item label="成本中心">
                          <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                        </Form-item>
                      </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="成本中心描述">
                         <label>{{formFilter.mainPort}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="交货人">
                         <label>{{formFilter.secondPort}}</label>
                       </Form-item>
                     </div>
                   </Col>

                 </Row>
                 <Row>

                   <Col span="5">
                     <div class="status">
                       <Form-item label="收货人">
                         <label>{{formFilter.shippingPlace}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="收货日期">
                         <label>{{formFilter.shippingPlace}}</label>
                       </Form-item>
                     </div>
                     <!-- <div class="status">
                       <Form-item label="码垛口">
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-3'">1号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-9'">2号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-15'">3号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-21'">4号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-27'">5号</label>
                       </Form-item>
                     </div> -->
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="发送工厂">
                         <label>{{formFilter.freightStation}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="发送工厂描述">
                         <label>{{formFilter.deliveryTypeName}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                       <div class="status">
                         <Form-item label="发送库存地点">
                           <label>{{formFilter.backupfield1}}</label>
                         </Form-item>
                       </div>
                   </Col>
                 </Row>
                 <Row>

                   <Col span="5">
                     <div class="status">
                       <Form-item label="发送库存地点描述">
                         <label>{{formFilter.backupfield2}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="工厂">
                           <label>{{formFilter.remark}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="工厂描述">
                         <label>{{formFilter.remark}}</label>
                       </Form-item>
                     </div>
                     <!-- <div class="status">
                       <Form-item label="状态">
                         <label v-if="formFilter.godownEntryStatus == 'RS01'">申请</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS02'">接收</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS03'">入库中</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS04'">已贴标</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS05'">入库完成</label>
                       </Form-item>
                     </div> -->
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="库存地点">
                           <label>{{formFilter.remark}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="库存地点描述">
                           <label>{{formFilter.remark}}</label>
                         </Form-item>
                       </div>
                   </Col>
                </Row>

                <Row>

                  <Col span="5">
                    <div class="status">
                      <Form-item label="特殊库存标识">
                        <label>{{formFilter.navigationDivision}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="特殊库存标识描述">
                        <label>{{formFilter.flightDate}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                     <div class="status">
                       <Form-item label="特殊库存编号">
                         <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                       </Form-item>
                     </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="特殊库存行项目">
                        <label>{{formFilter.mainPort}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                    <div class="status">
                      <Form-item label="物料号">
                        <label>{{formFilter.secondPort}}</label>
                      </Form-item>
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col span="5">
                    <div class="status">
                      <Form-item label="物料描述">
                        <label>{{formFilter.navigationDivision}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="供应商代码">
                        <label>{{formFilter.flightDate}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                     <div class="status">
                       <Form-item label="供应商名称">
                         <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                       </Form-item>
                     </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="生产厂家名称">
                        <label>{{formFilter.mainPort}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                    <div class="status">
                      <Form-item label="生产厂家批号">
                        <label>{{formFilter.secondPort}}</label>
                      </Form-item>
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col span="5">
                    <div class="status">
                      <Form-item label="库存批号">
                        <label>{{formFilter.navigationDivision}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="检验批号">
                        <label>{{formFilter.flightDate}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                     <div class="status">
                       <Form-item label="GMP批号">
                         <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                       </Form-item>
                     </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="质量状态">
                        <label>{{formFilter.mainPort}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                    <div class="status">
                      <Form-item label="数量">
                        <label>{{formFilter.secondPort}}</label>
                      </Form-item>
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col span="5">
                    <div class="status">
                      <Form-item label="计量单位">
                        <label>{{formFilter.navigationDivision}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="生产日期">
                        <label>{{formFilter.flightDate}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                     <div class="status">
                       <Form-item label="有效日期至">
                         <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                       </Form-item>
                     </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="复检日期">
                        <label>{{formFilter.mainPort}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                    <div class="status">
                      <Form-item label="交叉污染标识">
                        <label>{{formFilter.secondPort}}</label>
                      </Form-item>
                    </div>
                  </Col>

                </Row>

                <Row>

                  <Col span="5">
                    <div class="status">
                      <Form-item label="研发物料标识">
                        <label>{{formFilter.navigationDivision}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="采样大小">
                        <label>{{formFilter.flightDate}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                     <div class="status">
                       <Form-item label="备注">
                         <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                       </Form-item>
                     </div>
                  </Col>
                  <Col span="4">
                    <div class="status">
                      <Form-item label="件数">
                        <label>{{formFilter.mainPort}}</label>
                      </Form-item>
                    </div>
                  </Col>
                  <Col span="5">
                    <div class="status">
                      <Form-item label="包装规格">
                        <label>{{formFilter.secondPort}}</label>
                      </Form-item>
                    </div>
                  </Col>

                </Row>

             </Col>
           </Row>
         </Card>
        <Card id='bookSpaceInfoPoSunDetail' style='display:none'>
          <div>&nbsp;</div>
          <p slot="title">订舱信息</p>
          <Row>
            <Col span="24">
                 <Row>
                   <Col span="5">
                       <div class="status">
                         <Form-item label="回单号">
                           <label>{{formFilter.backNumber}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="进仓编号">
                           <label>{{formFilter.warehouseEntryId}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="客户">
                         <label>{{formFilter.customerName}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="入库时间">
                         <label>{{changeDate(formFilter.godownTime)}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="航班号">
                         <label>{{formFilter.flightNumber}}</label>
                       </Form-item>
                     </div>
                   </Col>
                 </Row>
                 <Row>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="航司">
                         <label>{{formFilter.navigationDivision}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="航班日期">
                         <label>{{formFilter.flightDate}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                      <div class="status">
                        <Form-item label="航班时间">
                          <label>{{(formFilter.flightTime+"").substring(0,8)}}</label>
                        </Form-item>
                      </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="主目的港">
                         <label>{{formFilter.mainPort}}</label>
                       </Form-item>
                     </div>
                   </Col>

                   <Col span="5">
                     <div class="status">
                       <Form-item label="分目的港">
                         <label>{{formFilter.secondPort}}</label>
                       </Form-item>
                     </div>
                   </Col>
                 </Row>
                 <Row>

                   <Col span="5">
                     <div class="status">
                       <Form-item label="舱位">
                         <label>{{formFilter.shippingPlace}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                     <div class="status">
                       <Form-item label="货站">
                         <label>{{formFilter.freightStation}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="交货类型">
                         <label>{{formFilter.deliveryTypeName}}</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="主单号">
                           <label>{{formFilter.backupfield1}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="分单号">
                         <label>{{formFilter.backupfield2}}</label>
                       </Form-item>
                     </div>
                   </Col>
                 </Row>
                 <Row>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="码垛口">
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-3'">1号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-9'">2号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-15'">3号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-21'">4号</label>
                         <label v-if="formFilter.palletizingYard == 'AT-0-0-27'">5号</label>
                       </Form-item>
                     </div>
                   </Col>
                   <Col span="4">
                       <div class="status">
                         <Form-item label="备注">
                           <label>{{formFilter.remark}}</label>
                         </Form-item>
                       </div>
                   </Col>
                   <Col span="5">
                     <div class="status">
                       <Form-item label="状态">
                         <label v-if="formFilter.godownEntryStatus == 'RS01'">申请</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS02'">接收</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS03'">入库中</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS04'">已贴标</label>
                         <label v-if="formFilter.godownEntryStatus == 'RS05'">入库完成</label>
                       </Form-item>
                     </div>
                   </Col>
                </Row>
             </Col>
           </Row>
         </Card>

         <Card id='godownInfoDetail' >
           <p slot="title">入库信息</p>
           <Row>
             <Col span="5">
               <div class="status">
                 <Form-item label="总入库件数">
                    <!-- <Input v-model="formFilter.predictQuantityTotal" @on-keyup="checkNumber" element-id = 'predictQuantityTotalDetail' placeholder="请输入" :maxlength='20' readonly/> -->
                    <label>{{formFilter.predictQuantityTotal}}</label>
                 </Form-item>
               </div>
             </Col>
             <Col span="5">
               <div class="status">
                 <Form-item label="总体积(cm³)">
                  <!-- <Input v-model="formFilter.volumeTotal" @on-keyup="checkNumber" element-id = 'volumeTotalDetail' placeholder="请输入" :maxlength='20' readonly/> -->
                  <label>{{formFilter.volumeTotal}}</label>
                 </Form-item>
               </div>
             </Col>
             <Col span="5">
               <div class="status">
                 <Form-item label="总重量(kg)">
                   <!-- <Input v-model="formFilter.weightTotal" @on-keyup="checkNumber" element-id = 'weightTotalDetail' placeholder="请输入" :maxlength='20' readonly/> -->
                   <label>{{formFilter.weightTotal}}</label>
                 </Form-item>
               </div>
             </Col>
             <Col span="5">
               <div class="status">
                 <Form-item label="外包装情况">
                   <!-- <Select v-model="formFilter.surfacePackageType" placeholder="请选择"  clearable v-bind:disabled="surfacePackageTypeAble">
                     <Option value="-1">-所有-</Option>
                     <Option value="WBZ01">破损</Option>
                     <Option value="WBZ02">变形</Option>
                     <Option value="WBZ03">托盘受损</Option>
                     <Option value="WBZ04">受潮</Option>
                     <Option value="WBZ05">污渍</Option>
                     <Option v-for=" item in wbzTypes" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
                   </Select> -->
                   <label>{{formFilter.surfaceName}}</label>
                 </Form-item>
               </div>
             </Col>
           </Row>
         </Card>
         <div id='entryInfosOfSpecialDetail' >

             <div>&nbsp;</div>
             <Row>
               <Col span="16">
                  <Row>
                    <Col span='20'>
                      <!-- <Button shape="circle" style="width:120px;height:28px;background-color:#b4b4b4;padding:0px;border-radius:14px;" disabled @click="delConfirmOrder" id='deldetailofOrderSpecial' icon="md-trash">删除选中项</Button>
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
                 <!-- <Button shape="circle" type="pr/imary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail" v-bind:disabled='detailBtn'>增&nbsp;&nbsp;加</Button> -->
               </Col>
             </Row>
             <Row>
               <Col span="24">
                   <Table height="200" ref="tableColumns" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>
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
   <div slot="footer" v-if="formFilter.godownEntryStatus == 'RS01'">
     <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="ok">提&nbsp;&nbsp;交</Button>
   </div>
   <div slot="footer" v-if="formFilter.godownEntryStatus != 'RS01'">
     <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="ok" disabled>提&nbsp;&nbsp;交</Button>
   </div>
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
      detailBtn:false,
      displayAble:false,
      labellingAble:false,
      surfacePackageTypeAble:false,
      rows:[],
      //上传路径
      uploadurl:sessionStorage.http+'/#',
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      delete_confirm:false,
      inGodownEntryDetail:false,
      loading:true,
      lDetail:1,
      taskList:[
        {
          taskid:'',
          typename:''
        }
      ],
      wbzTypes:[
        {
          taskid:'',
          typename:''
        }
      ],
      pageForDetail:[
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
        creater:'',
        godownTime:''
      },
      tableColumns: {
         card: [
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
           {title: '序号',key: 'lineNo',width: 75,align: 'center',render: (h, params) => {
             return h('div',+params.row._index+1);
             }},
           // {title: '入库单明细号',key: 'godownEntryDetailId',width:210,align: 'center'},
           {title: '库区', key: 'districtName',width: 210,align: 'center'},
           {title: '货位号', key: 'storageId',width:210,align: 'center'},          //新增
           {title: '托盘号', key: 'trayNumber',width:210,align: 'center'},          //新增
           {title: '包装类型',key: 'packageName',width: 150,align: 'center'},
           {title: '货物类型',key: 'goodName',width: 150 ,align: 'center'},
           {title: '总入库件数',key: 'predictQuantityTotal',width: 210 ,align: 'center'},
           {title: '长(cm)',key: 'longness',width: 210 ,align: 'center'},
           {title: '宽(cm)',key: 'width',width: 210 ,align: 'center'},
           {title: '高(cm)',key: 'height',width: 210 ,align: 'center'},
           {title: '体积(cm³)',key: 'volume',width: 210 ,align: 'center'},
           {title: '毛重(kg)',key: 'weight',width: 210 ,align: 'center',render: (h, params) => {
               if(this.formFilter.warehouseId == 'AT001'){
                 return h('div',"无");
               }
               if(this.formFilter.warehouseId == 'OD001'){
                 return h('div',params.row.weight);
               }
             }},
         ],
         data:[
           {
           }
         ]
       },
      startTimeOption:{},
      tableColumnsOfSpecial: {
         card: [
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
           {title: '序号',key: 'lineNo',width: 75,align: 'center',render: (h, params) => {
             return h('div',+params.row._index+1);
             }},
           // {title: '入库单明细号',key: 'ingodownentryid',align: 'center'},
           {title: '库区', key: 'districtName',width: 150,align: 'center' },
           {title: '货位号', key: 'storageId',width:150,align: 'center'},          //新增
           {title: '托盘号', key: 'trayNumber',width:150,align: 'center'},          //新增
           {title: '货物类型',key: 'goodName',align: 'center'},
           {title: '总入库件数',key: 'predictQuantityTotal',width: 150 ,align: 'center'}
         ],
         data:[
         ]
       }

    }
  },
  methods:{
    //计算总入库件数/体积/毛重
    calculateTotalWeight(){
      var weight = 0;
      for(var i = 0;i< this.tableColumns.data.length; i++){
        var res =  this.tableColumns.data[i];
        if(res.weight != null && res.weight != '' && res.weight != undefined){
          weight += +res.weight;
        }
        this.formFilter.weightTotal = weight;
      }
    },
    calculateTotalQuantity(){
      var quantity = 0;
      for(var i = 0;i< this.tableColumns.data.length; i++){
        var res =  this.tableColumns.data[i];
        if(res.predictQuantityTotal != null && res.predictQuantityTotal != '' && res.predictQuantityTotal != undefined){
          quantity += +res.predictQuantityTotal;
        }
        this.formFilter.predictQuantityTotal = quantity;
      }
    },
    calculateTotalVolume(){
      var volume = 0;
      for(var i = 0;i< this.tableColumns.data.length; i++){
        var res =  this.tableColumns.data[i];
        if(res.volume != null && res.volume != '' && res.volume != undefined){
          volume += +res.volume;
        }
        this.formFilter.volumeTotal = volume;
      }
    },
    calculateVolume(params){
      var long = this.tableColumns.data[params.index].longness;
      if(long == null || long == '' || long == undefined){
        long = 0;
      }
      var width = this.tableColumns.data[params.index].width;
      if(width == null || width == '' || width == undefined){
        width = 0;
      }
      var height = this.tableColumns.data[params.index].height;
      if(height == null || height == '' || height == undefined){
        height = 0;
      }
      return long * width *height
    },
    clearGodownAndWarehouse(){
      this.setGodownTypeAndWarehouse();
    },
    //仓库改变
    changeContentByWarehouse(value){
      if(value == 'AT001'){
        this.labellingAble = true;
        this.detailBtn = true;
        this.displayAble = true;
        this.surfacePackageTypeAble = true;
      }else if(value == 'OD001'){
        this.labellingAble = false;
        this.detailBtn = false;
        this.displayAble = true;
        this.surfacePackageTypeAble = false;
      }else if(value == '-1'){
        this.setGodownTypeAndWarehouse();
      }
    },
    setGodownTypeAndWarehouse(){
      this.displayAble = false;
      this.$refs.godownType.clearSingleSelect()
      //订舱信息
      var bookSpaceInfoDetail =  document.getElementById('bookSpaceInfoDetail');
      //破损
      var bookSpaceInfoPoSunDetail =  document.getElementById('bookSpaceInfoPoSunDetail');
      //单证信息
      // var documentInfoDetail =  document.getElementById('documentInfoDetail');
      //入库信息
      var godownInfoDetail =  document.getElementById('godownInfoDetail');
      //入库单明细
      var entryInfosDetail =  document.getElementById('entryInfosDetail');
      //入库单明细-外靠
      var entryInfoOfWaiKaoDetail =  document.getElementById('entryInfoOfWaiKaoDetail');
      //入库单明细-特殊商品
      var entryInfosOfSpecialDetail =  document.getElementById('entryInfosOfSpecialDetail');
      // godownInfoDetail.style.cssText  = 'display:none';
      // bookSpaceInfoDetail.style.cssText  = 'display:none';
      bookSpaceInfoPoSunDetail.style.cssText  = 'display:none';
      // documentInfoDetail.style.cssText  = 'display:none';
      entryInfosDetail.style.cssText  = 'display:none';
      // entryInfosOfSpecialDetail.style.cssText  = 'display:none';
      entryInfoOfWaiKaoDetail.style.cssText  = 'display:none';
    }
    ,
    // bookSpaceInfoDetail documentInfoDetail godownInfoDetail entryInfosDetail entryInfoOfWaiKaoDetail entryInfosOfSpecialDetail godownType
    changeContentByGodownType(value){
      console.log(this.displayAble)
      if(this.displayAble == false && value != undefined){
        // this.formFilter.godownType = null;
        this.$refs.godownType.clearSingleSelect()
        iview.Message.error({
          content:'请先选择仓库',
          duration:5
        });
        return;
      }
      //订舱信息
      var bookSpaceInfoDetail =  document.getElementById('bookSpaceInfoDetail');
      //破损
      var bookSpaceInfoPoSunDetail =  document.getElementById('bookSpaceInfoPoSunDetail');
      //单证信息
      // var documentInfoDetail =  document.getElementById('documentInfoDetail');
      //入库信息
      var godownInfoDetail =  document.getElementById('godownInfoDetail');
      //入库单明细
      var entryInfosDetail =  document.getElementById('entryInfosDetail');
      //入库单明细-外靠
      var entryInfoOfWaiKaoDetail =  document.getElementById('entryInfoOfWaiKaoDetail');
      //入库单明细-特殊商品
      var entryInfosOfSpecialDetail =  document.getElementById('entryInfosOfSpecialDetail');

      // var warehouseId = this.formFilter.warehouseId;
      // this.formFilter = {};
      // if(value == 'RT05' || value == 'RT03'){
      //   this.formFilter.godownPlanId = '不存在计划单';
      // }
      // this.formFilter.warehouseId = warehouseId;
      // this.formFilter.godownEntryType = value;
      // this.formFilter.num = 1;
      // this.formFilter.godownPlanStatus = 'RS01';
      // this.formFilter.godownTime = new Date().Format('yyyy-MM-dd');
      this.formFilter.creater = sessionStorage.name;
      // console.log(this.formFilter)
      // this.tableColumns.data = [];
      if(value == 'RT02' || value == 'RT01' || value == 'RT06' || value == 'RT07'){
        // godownInfoDetail.style.cssText  = 'display:inline-block;width:100%';
        // bookSpaceInfoDetail.style.cssText  = 'display:none';
        bookSpaceInfoPoSunDetail.style.cssText  = 'display:inline-block;width:100%';
        // documentInfoDetail.style.cssText  = 'display:inline-block;width:100%';
        entryInfosDetail.style.cssText  = 'display:block';
        // entryInfosOfSpecialDetail.style.cssText  = 'display:none';
        entryInfoOfWaiKaoDetail.style.cssText  = 'display:none';
      }else if(value == 'RT04'){
        bookSpaceInfoPoSunDetail.style.cssText  = 'display:none';
        // godownInfoDetail.style.cssText  = 'display:none';
        // bookSpaceInfoDetail.style.cssText  = 'display:none';
        // documentInfoDetail.style.cssText  = 'display:none';
        entryInfosDetail.style.cssText  = 'display:none';
        // entryInfosOfSpecialDetail.style.cssText  = 'display:inline-block;width:100%';
        entryInfoOfWaiKaoDetail.style.cssText  = 'display:none';
      }else if(value == 'RT03'){
        // godownInfoDetail.style.cssText  = 'display:inline-block;width:100%';
        // bookSpaceInfoDetail.style.cssText  = 'display:inline-block;width:100%';
        bookSpaceInfoPoSunDetail.style.cssText  = 'display:none';
        // documentInfoDetail.style.cssText  = 'display:inline-block;width:100%';
        entryInfosDetail.style.cssText  = 'display:block';
        // entryInfosOfSpecialDetail.style.cssText  = 'display:none';
        entryInfoOfWaiKaoDetail.style.cssText  = 'display:none';
      }else if(value == 'RT05'){
        // godownInfoDetail.style.cssText  = 'display:none';
        // bookSpaceInfoDetail.style.cssText  = 'display:none';
        // documentInfoDetail.style.cssText  = 'display:none';
        bookSpaceInfoPoSunDetail.style.cssText  = 'display:none';
        entryInfosDetail.style.cssText  = 'display:block';
        // entryInfosOfSpecialDetail.style.cssText  = 'display:none';
        entryInfoOfWaiKaoDetail.style.cssText  = 'display:inline-block;width:100%';
      }else{
        // godownInfoDetail.style.cssText  = 'display:none';
        // bookSpaceInfoDetail.style.cssText  = 'display:none';
        bookSpaceInfoPoSunDetail.style.cssText  = 'display:none';
        // documentInfoDetail.style.cssText  = 'display:none';
        entryInfosDetail.style.cssText  = 'display:none';
        // entryInfosOfSpecialDetail.style.cssText  = 'display:none';
        entryInfoOfWaiKaoDetail.style.cssText  = 'display:none';
      }
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
    checkOrderIdUse(){
      // axios.post(sessionStorage.http +'/checkOrderId',this.formFilter)
      // .then((res) =>{
      //   // console.log(res.data)
      //   if(res.message == 'fail'){
      //     this.$Message.error('进仓编号已使用');
      //     this.formFilter.ingodownentryid = '';
      //   }
      // })
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
    show(taskList,customerList,wbzTypes,pageForDetail,row){
      // console.log(taskList);
      // console.log(customerList);
      //
      // console.log(supplierList);
      // console.log(row.godownTime);
      // this.formFilter = row;
      // // console.log(this.formFilter.godownTime)
      // axios.post(sessionStorage.http+'/searchEntryDetail?'+'loginStatus='+sessionStorage.loginStatus+"&godownEntryId="+this.formFilter.godownEntryId)
      // .then((res) =>{
      //   if(this.formFilter.godownEntryType == 'RT04'){
      //     this.tableColumnsOfSpecial.data = res.data
      //   }else {
      //     this.tableColumns.data = res.data
      //   }
      // })
      // this.customerList = customerList;
      // this.taskList = pageForDetail;
      // this.pageForDetail = pageForDetail;
      // this.wbzTypes = wbzTypes;

      this.inGodownEntryDetail = true;
      // this.formFilter = {};
      // this.formFilter.num = 1;
      // this.tableColumns.data = [];
      // this.changeContentByWarehouse(this.formFilter.warehouseId);
      // this.changeContentByGodownType(this.formFilter.godownEntryType);
      // this.formFilter.creater = sessionStorage.name;

    },
    // 页面验证
    checkOrderDetail(param){
      //weight volume height width longness predictQuantityTotal  goodsType packageType trayNumber storageId districtId godownEntryDetailId
      var checkStr = '';
      if((param.districtId == null || param.districtId == '') && this.formFilter.warehouseId == 'OD001'){//普通仓验证
        checkStr += '库区/';
      }
      if((param.storageId == null || param.storageId == '') && this.formFilter.warehouseId == 'OD001'){
        checkStr += '货位/';
      }
      if((param.districtId == null || param.districtId == '') && this.formFilter.warehouseId == 'OD001'){
        checkStr += '批次号/';
      }
      if((param.trayNumber == null || param.trayNumber == '') && this.formFilter.warehouseId == 'OD001'){
        checkStr += '托盘号/';
      }
      if((param.predictQuantityTotal == null || param.predictQuantityTotal == '' ||  +param.predictQuantityTotal == 0) && this.formFilter.warehouseId == 'OD001' ){
        checkStr += '总入库件数/';
      }
      if((param.longness == null || param.longness == '' ||  +param.longness == 0) && this.formFilter.warehouseId == 'OD001' ){
        checkStr += '长/';
      }
      if((param.width == null || param.width == '' ||  +param.width == 0) && this.formFilter.warehouseId == 'OD001' ){
        checkStr += '宽/';
      }
      if((param.height == null || param.height == '' ||  +param.height == 0) && this.formFilter.warehouseId == 'OD001' ){
        checkStr += '高/';
      }
      if((param.volume == null || param.volume == '' ||  +param.volume == 0) && this.formFilter.warehouseId == 'OD001' ){
        checkStr += '体积/';
      }
      if((param.weight == null || param.weight == '' ||  +param.weight == 0) && this.formFilter.warehouseId == 'OD001' ){
        checkStr += '毛重/';
      }
      if((param.packageType == null || param.packageType == '') && this.formFilter.warehouseId == 'OD001'){
        checkStr += '包装类型/';
      }
      if((param.goodsType == null || param.goodsType == '') && this.formFilter.warehouseId == 'OD001'){
        checkStr += '货位类型/';
      }
      return checkStr;
    },
    ok(){
      console.log(this.formFilter.godownEntryType == undefined)
      this.loading = false;
      setTimeout(()=>{this.loading = true},0)
      var checkStr = '';
      if(this.formFilter.godownEntryType == undefined || this.formFilter.godownEntryType == ''){
        checkStr += '入库类型/';
      }
      if(this.formFilter.warehouseId == undefined || this.formFilter.warehouseId == ''){
        checkStr += '仓库/';
      }
      if((this.formFilter.godownPlanId == null || this.formFilter.godownPlanId == '') && this.formFilter.godownEntryType == 'RT02'){
        checkStr += '入库计划单号/';
      }
      if(this.formFilter.godownEntryId == null || this.formFilter.godownEntryId == ''){
        checkStr += '入库单号/';
      }
      if((this.formFilter.backNumber == null || this.formFilter.backNumber == '')){
        checkStr += '回单号/';
      }
      if(this.formFilter.warehouseEntryId == null || this.formFilter.warehouseEntryId == ''){
        checkStr += '进仓编号/';
      }
      if(this.formFilter.customerId == undefined || this.formFilter.customerId == ''){
        checkStr += '客户/';
      }
      if(checkStr != ''){
        iview.Message.error({
          content:'请填写或者选择 '+checkStr +' 中的数据',
          duration:5
        });
        this.inGodownEntryDetail = true;
        return false;
      }
      //普通仓判空
      // if(this.tableColumns.data.length == 0 && this.formFilter.warehouseId == 'OD001'){
      //   this.$Message.error('明细表不能为空');
      //   this.inGodownEntryDetail = true
      //   setTimeout(()=>{this.loading = true},0)
      //   this.loading = false
      //   return
      // }else{
      //     for(var i = 0;i< this.tableColumns.data.length; i++){
      //       var res = this.checkOrderDetail(this.tableColumns.data[i]);
      //       this.tableColumns.data[i].godownEntryId = this.formFilter.godownEntryId;
      //       this.tableColumns.data[i].insertId = sessionStorage.loginStatus;
      //       this.tableColumns.data[i].updateId = sessionStorage.loginStatus;
      //     //godownPlanId
      //     if(res != ''){
      //       iview.Message.error({
      //         content:"第"+i+1+"行"+res+"未填写或者未选择,请完全填写后,再提交",
      //         duration:5
      //       });
      //       return
      //     }
      //   }
        this.formFilter.loginStatus = sessionStorage.loginStatus;
        this.formFilter.updateId = sessionStorage.loginStatus;
        // this.formFilter.godownEntryDetails = this.tableColumns.data
        axios.post(sessionStorage.http+'/updateEntryAndDetails?'+'loginStatus='+sessionStorage.loginStatus,this.formFilter)
        .then((res) =>{
          if(res.data == '1'){
            console.log(res.data)
            iview.Message.success({
              content:'更新成功.',
              duration:5
            });
            document.getElementById('search').click();
            this.inGodownEntryDetail = false;
          }else if(res.data == '0'){
            console.log(res.data)
            iview.Message.error({
              content:'更新失败.',
              duration:5
            });
            this.inGodownEntryDetail = true;
          }
        })
      // }

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
        document.getElementById('deldetailofOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;");
        document.getElementById('deldetailofOrder').removeAttribute("disabled");
      }else{
        document.getElementById('deldetailofOrder').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
        document.getElementById('deldetailofOrder').setAttribute("disabled","disabled");
      }
    },
    //添加一行
    addDetail(){

      var checkStr = '';
      if(this.formFilter.godownEntryType == undefined || this.formFilter.godownEntryType == ''){
        checkStr += '入库类型/';
      }
      if(this.formFilter.warehouseId == undefined || this.formFilter.warehouseId == ''){
        checkStr += '仓库/';
      }
      if((this.formFilter.godownPlanId == null || this.formFilter.godownPlanId == '') && this.formFilter.godownEntryType == 'RT02'){
        checkStr += '入库计划单号/';
      }
      if(this.formFilter.godownEntryId == null || this.formFilter.godownEntryId == ''){
        checkStr += '入库单号/';
      }
      if((this.formFilter.backNumber == null || this.formFilter.backNumber == '')){
        checkStr += '回单号/';
      }
      if(this.formFilter.warehouseEntryId == null || this.formFilter.warehouseEntryId == ''){
        checkStr += '进仓编号/';
      }
      if(this.formFilter.customerId == undefined || this.formFilter.customerId == ''){
        checkStr += '客户/';
      }
      if(checkStr != ''){
        iview.Message.error({
          content:'请填写或者选择 '+checkStr +' 中的数据',
          duration:5
        });
        this.inGodownEntryDetail = true;
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
        var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        return date.substring(0,11);
    },
    initFormatter(){
    }
  },

  created(){

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
      left: -52px;
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
.ideanGodownEntryDetailsOfHS{
  th .ivu-table-cell{
        font-size: 12px !important;
        font-weight: bold;
        color:#333;
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
