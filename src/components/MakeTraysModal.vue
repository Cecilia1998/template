<template lang="html">
  <Modal  v-model="add" :loading='loading' width='1500px' :mask-closable='false' class="makeTraysModal">
      <p slot="header" style="text-align:center;font-size:16px">
            <span>PC组盘登记</span>
      </p>
      <div :class="getIngodownentryaddmodel('ingodownentryaddmodel')">
     <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;" >
        <!-- <Row>
          <Col span="24">
             <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:12px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creater}}</div>
          </Col>
        </Row> -->
        <!-- <div>&nbsp;</div> -->
        <Card>
          <p slot="title">组盘信息</p>
        <Row>
          <Col span="24">
               <Row type='flex' justify="end">
                 <Col span="5">
                   <div class="status">
                     <Form-item label="入库单号">
                       <label>{{formFilter.inOrderId}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="入库单明细号">
                       <label>{{formFilter.inOrderDetailId}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="物料号">
                       <label>{{formFilter.materielId}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="批次号">
                       <label>{{formFilter.stockBatch}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="4">
                   <div class="status">
                     <Form-item label="入库类型">
                       <!-- <label>{{formFilter.movetype}}</label> -->
                       <label  v-if="this.formFilter.remark1 == 'GPT01'">一般入库</label>
                       <label  v-if="this.formFilter.remark1 == 'GPT02'">拼盘入库</label>
                     </Form-item>
                   </div>
                 </Col>
               </Row>
               <Row type='flex' justify="end">

                 <Col span="5">
                   <div class="status">
                     <Form-item label="预定入库日期">
                       <label>{{formFilter.inDate}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="质量状态">
                       <!-- <label>{{formFilter.qualityStatus}}</label> -->
                       <label  v-if="this.formFilter.qualityStatus == 'Q'">精品</label>
                       <label  v-if="this.formFilter.qualityStatus == 'N'">优等</label>

                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="供应商">
                       <label>{{formFilter.vendorName}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="包装规格">
                       <label>{{formFilter.packageStandards}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="4">
                   <div class="status">
                     <Form-item label="计量单位">
                       <label>{{formFilter.unit}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <!-- <Col span="5">

                 </Col> -->
               </Row>
               <Row type='flex' justify="end">
                 <Col span="5">
                   <div class="status">
                     <Form-item label="预计入库重量">
                       <label>{{formFilter.weight}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="预计入库件数">
                       <label>{{formFilter.num}}</label>
                       <!-- <label>yuy</label> -->
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="仓库名称">
                       <label>{{formFilter.warehouseName}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="库区名称">
                       <label>{{formFilter.districtName}}</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="4">
                   <div class="status">
                     <Form-item label="组盘人">
                       <label>{{formFilter.creater}}</label>
                       <!-- <label>yuy</label> -->
                     </Form-item>
                   </div>
                 </Col>
               </Row>

               <Row>

                 <Col span="5">
                   <div class="status">
                     <Form-item label="是否批量">
                       <!-- <label>{{formFilter.isBatchIn}}</label> -->
                       <label  v-if="this.formFilter.isBatchIn == 'P01'">是</label>
                       <label  v-if="this.formFilter.isBatchIn == 'P02'">否</label>
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="5">
                   <div class="status">
                     <Form-item label="批量组盘件数">
                       <label>{{formFilter.batckGroupNun}}</label>
                       <!-- <label>yuy</label> -->
                     </Form-item>
                   </div>
                 </Col>
                 <Col span="4">
                   <!-- <div class="status">
                     <Form-item label="组盘人">
                       <label>{{formFilter.creater}}</label>
                       <label>yuy</label>
                     </Form-item>
                   </div> -->
                 </Col>
               </Row>


           </Col>
         </Row>
         </Card>
         <br/>
         <Card>
                <p slot="title">组盘登记</p>
                <Row>
                  <Col span="5">
                    <Form-item label="货位分配方式">
                      <!-- <font color="red" class="font3">*</font> -->
                      <Select v-model="formFilter2.allotType" placeholder="请选择" @on-change="onChange" style="width: 160px" >
                        <Option value="AUTO">自动分配</Option>
                        <Option value="HAND">手动分配</Option>
                        <!-- <Option value="NOTIN">实物不入库</Option> -->
                        <!-- <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option> -->
                      </Select>
                    </Form-item>
                  </Col>
                  <Col span="5">
                    <Form-item label="托盘码">
                      <Input v-model="formFilter2.palletCode" style="width: 160px;" />
                    </Form-item>
                  </Col>
                  <Col span="5">
                    <Form-item label="绑盘件数">
                      <Input v-model="formFilter2.num" @on-blur="checkNumber1" style="width: 160px;" />
                    </Form-item>
                  </Col>
                  <Col span="5">
                    <Form-item label="绑盘重量">
                      <Input v-model="formFilter2.weight" @on-blur="checkNumber2" style="width: 160px;" :readonly='weightReadonly'/>
                      <!-- <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/> -->
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="是否零散">
                      <Checkbox v-model="formFilter2.isScattered"> </Checkbox>
                    </Form-item>
                  </Col>
                </Row>
            </Card>
     </Form>
   </div>
   <div slot="footer">
     <!-- <Button type="primary"  :class="getBtnClass('btnClass')" style="width:120px;height:28px;padding:0px;border-radius:14px;"  @click="ok">继续组盘</Button> -->
      <!-- <Button shape="circle" type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="">实物不入库</Button> -->
     <Button shape="circle" type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail">绑盘完成</Button>
     <!-- <Button shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;" disabled @click="delConfirmOrder" id='deldetail' icon="md-trash">取消组盘</Button> -->
     <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="deleteSelection"
     style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" >取消绑盘</Button>
     <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
     style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" >取消绑盘</Button>
     <!-- <Button type="primary"  :class="getBtnClass('btnClass')" style="width:120px;height:28px;padding:0px;border-radius:14px;"  @click="ok">取消组盘</Button> -->
     <Button type="primary"  :class="getBtnClass('btnClass')" style="width:120px;height:28px;padding:0px;border-radius:14px;"  @click="ok">码盘完成</Button>
   </div>
   <Row>
     <Col span="24">
         <Table height="200" ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>
     </Col>
   </Row>
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
   <Modal v-model="modal3" footer-hide width='1600'>
        <!-- <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p> -->
        <table border="value">
          <tr >
            <td class="emptyImg" width='40px' height='40px'>
              空货位
            </td>
            <td class="fullImg" width='40px' height='40px'>
              有货
            </td>
            <td class="lockImg" width='40px' height='40px'>
              锁定
            </td>
            <td class="roadImg" width='40px' height='40px'>
              通道
            </td>
            <td class="disabledImg" width='40px' height='40px'>
              禁用
            </td>
            <td class="liftImg" width='40px' height='40px'>
              提升机
            </td>
            <td class="chargeImg" width='40px' height='40px'>
              充电桩
            </td>
            <td class="exitImg" width='40px' height='40px'>
              出库口
            </td>
            <td class="entryImg" width='40px' height='40px'>
              入库口
            </td>
          </tr>
        </table>
        <Tabs type="card"  class="font18"  @on-click='tabClick'>
            <TabPane :label="`第${index+1}层`" v-for='(item,index) in layerDate' :name="`${item}`" :key='item'>
            </TabPane>
        </Tabs>
        <table border="value">
          <tr v-for='(item, index) in storageDate'>
            <td v-for='(it,idx) in item' :class="gettableTd(it)" width='50px' height='50px' @click='tableClick(it)' :key='idx' style="font-weight:bold">
              {{it.storageid}}
              <!-- <br/> -->
              <!-- {{it.remark}} -->
            </td>
          </tr>
        </table>
    </Modal>
  </Modal>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import { getTitles, getButtons } from '../Util'
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      weightReadonly:false,
      layerDate:[1,2,3],
      middValue:{storageid:'请选择'},
      storageDate:[[]],
      modal3:false,
      newoptions:'',
      readStatus:true,
      deleteButtonFlag:true,
      needdelrow:[],
      storageIdList:[],
      checkList:[],
      // lastStorageId:'',
      //重复点击使用
      checkBtn:true,
      delete_confirm:false,
      supIsAble:false,
      cusIsAble:false,
      add:false,
      loading:true,
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
      // isAutoBatch:false,
      formFilter: {
        // cur_page:1,
        num:1,
        creater:'',
        insertYmd:false
      },
      formFilter2: {
        allotType:'',
        palletCode:'',
        num:'',
        weight:'',
        isScattered:'',
      },
      formFilter3: {
        trayId:'',
        palletCode:'',
        warehouseId:'',
        warehouseName:'',
        districtId:'',
        districtName:'',
        totalNum:'',
        totalWeight:'',
        allotType:'',
        status:'',
        trayTime:'',
        insertYmd:'',
        insertId:''
      },
      lDetail:1,
      tableColumns: {
         card: [
           {title: '选择',key: 'select',width:60,type: 'selection',align: 'center'},
           {title: '序号',key: 'lineNo',width:100,align: 'center'},
           {title: '组盘单号',key: 'trayId',width:260,align: 'center'},
           {title: '组盘明细号',key: 'trayDetailId',width:260,align: 'center'},
           {title: '托盘号',key: 'palletCode',width:260,align: 'center'},
           {title: '件数',key: 'num',width:260,align: 'center'},
           {title: '重量',key: 'weight',width:260,align: 'center'}


         ],
         data:[]

       },
       tempArray:[]

    }
  },
  watch:{
    tempArray:function(val){
      this.tableColumns.data = val;
    }

  },
  methods:{

    tableClick(a){
      // console.log(a)
      this.middValue = a
      // this.newoptions = [a,{storageId:'请选择'}]
      this.tableColumns.data[this.newoptions].storageId=this.middValue.storageid;
      this.modal3 = false
    },

    tabClick(layer){
      console.log(layer)
      axios.post(sessionStorage.http+'/getLayerStorages?loginStatus=181211153639746&layer='+layer,"")
       .then((res)=>{
         this.storageDate = res.data
       })
       .catch((err)=>{
         iview.Message.error({
           content:err.message,
           duration:5
         });
       })
    },

    gettableTd(storage){
      if(storage.remark.indexOf('空货位') > -1 ){
        return 'emptyImg'
      }else if(storage.remark.indexOf('正常') > -1 || storage.remark.indexOf('库存') > -1 ){
        return 'fullImg'
      }else if(storage.remark.indexOf('锁定') > -1 || storage.remark.indexOf('标记') > -1 ){
        return 'lockImg'
      }else if(storage.remark.indexOf('提升') > -1 ){
        return 'liftImg'
      }else if(storage.remark.indexOf('通道') > -1 ){
        return 'roadImg'
      }else if(storage.remark.indexOf('出库口') > -1 ){
        return 'exitImg'
      }else if(storage.remark.indexOf('入库口') > -1 ){
        return 'entryImg'
      }else if(storage.remark.indexOf('充电') > -1 ){
        return 'chargeImg'
      }else if(storage.remark.indexOf('禁用') > -1 ){
        return 'disabledImg'
      }
      return 'tableTd'
    },

    getIngodownentryaddmodel(a){
      return getTitles(a)
    },
    getBtnClass(a){
      return getButtons(a)
    },

    //去除时间
    getStartTime(startTime,type){
      if(type == 1){
        return  {
            disabledDate(time) {
              return time < new Date();
            }
          }
      }else{
        return  {
            disabledDate(time) {
              return time < new Date(startTime)
            }
          }
        }
    },
    getEndTime(startTime,type){
      if(type == 1){
        return  {
            disabledDate(time) {
              return time > new Date();
            }
          }
      }else{
        return  {
            disabledDate(time) {
              return time < new Date(startTime)
            }
          }
        }
    },
    //检测入库单id是否已使用
    checkOrderIdUse(){
      axios.post(sessionStorage.http +'/checkOrderId',this.formFilter)
      .then((res) =>{
        // console.log(res.data)
        if(res.message == 'fail'){
          this.$Message.error('入库单号已使用');
          this.formFilter.ingodownentryid = '';
        }

      })
      .catch((err) => {
         iview.Message.error({
           content:err.message,
           duration:5
         });
      })
    },
    // 只能输入数字-校验入库单号
    // checkOrderId(e){
    //   // var value=e.target.value.replace(/[^\w\.\/]/ig,'');
    //   // document.getElementById(e.target.id).value = value;
    //   var value=e.target.value.replace(/[^\w\.\/]/ig,'');
    //   this.formFilter.trayNumber=value;
    // },

    checkNumber1(e){
      var numReg =/^[0-9]+([.]{1}[0-9]+){0,1}$/
      var numRe = new RegExp(numReg)
      if (!numRe.test(e.target.value)) {
        e.target.value='';
      }
      // alert('1')
      this.formFilter2.num=e.target.value;
      // alert('2')
      this.formFilter2.weight=this.formFilter2.num*this.formFilter.packageStandards
      // alert('3')

      if(this.formFilter.unit == '件'){
        this.formFilter2.weight = 0
      }

    },

    checkNumber2(e){
      var v=e.target.value.replace(/\D/g,'');
      e.target.value=v;
      // alert(e.target.value)
     var  f=e.target.value.replace(/\s*/g,"")
      if(f == null || f == ''|| f == undefined|| f < 0){
        // alert(33333333333333)
        e.target.value='';
      }
      if(+e.target.value> (+this.formFilter.predictQuantity)){
         e.target.value='';
         this.$Message.error('件数应小于数量');
      }
      // this.formFilter.districtId=e.target.value
    },
    //计算总数
    countTotal(){
      var total = 0;
      for(var j = 0 ; this.tableColumns.data.length > j ; j++){
        if(this.tableColumns.data[j].quantity != undefined && this.tableColumns.data[j].quantity != NaN){
          total += +this.tableColumns.data[j].quantity;
        }
      }
      this.formFilter.quantity = total;
      document.getElementById('orderquantity').value = total;

    },
    delConfirmOrder(){
      this.delete_confirm= true;
    },
    //删除弹框
    delConfirm(){
      this.delete_confirm = true;
    },
    showTable(){
     console.log(this.tableColumns.data);
    },
    //比较时间
    dueAndPruTime(dueid,proid,params){
      let dueTime = new Date(document.getElementById(dueid).value);
      let proTime = new Date(document.getElementById(proid).value);

      // console.log(dueTime);
      if(dueTime.getTime() < proTime.getTime()){
          //params.row.duedate = undefined;
        document.getElementById(dueid).value = null;
        // this.tableColumns.data[params.index].duedate = null;
        this.$Message.error('到期日不可小于当前时间');
        // console.log(this.tableColumns);
        return false;
      }
    },
    // 客户/供应商,有且只有显示一个
    selectSupplier(){
      // console.log(this.formFilter.suppliermanagementid)
      if(this.formFilter.suppliermanagementid != undefined && this.formFilter.suppliermanagementid != ''){
        this.cusIsAble = true;
        this.formFilter.customerid = null;
      }else{
        this.cusIsAble = false;
        this.tableColumns.data = [];
      }
    },
    selectCustomer(){
      // console.log(this.formFilter.customerid);
      if(this.formFilter.customerid != undefined && this.formFilter.customerid != ''){
        this.supIsAble = true;
        this.formFilter.suppliermanagementid = null;
      }else{
        this.supIsAble = false;
        this.tableColumns.data = [];
      }
      //console.log(this.formFilter.customerid);
    },
    //显示弹框
    show(row){
      console.log(row);
      this.formFilter=row;
      this.tableColumns.data=[];
      // console.log(taskList);
      // console.log(customerList);
      //
      // console.log(supplierList);
      //
      // console.log(deptList);
      // console.log(isAutoBatch)
      //
      // this.isAutoBatch = isAutoBatch;
      // this.taskList = taskList;
      // this.customerList = customerList;
      // this.supplierList = supplierList;
      // this.deptList = deptList;
      //
      // this.supIsAble = false;
      // this.cusIsAble = false;
      this.checkList=[];
      this.add = true;
      this.formFilter2.allotType= '';
      this.formFilter2.palletCode = '';
      this.formFilter2.num = '';
      this.formFilter2.weight = '';
      this.formFilter2.isScattered = '';
      this.formFilter.creater = sessionStorage.opername;

      if(this.formFilter.isBatchIn == 'P01'){
        this.formFilter2.num=this.formFilter.batckGroupNun
        this.formFilter2.weight=this.formFilter2.num*this.formFilter.packageStandards
      }

      if(this.formFilter.movetype == 'GPT04'){
        this.formFilter.predictQuantity = this.formFilter.quantity;
        // this.formFilter.districtId = this.formFilter.stockNum
      }
      this.weightReadonly = false
      if(this.formFilter.unit == '件'){
        this.formFilter2.weight = 0
        this.weightReadonly = true
      }

      // this.formFilter.num = 1;
      // this.tableColumns.data = [];
      // this.formFilter.createdate = new Date();
      // this.formFilter.quantity = '0';
      //获取所有的商品编号，传给partCode字段的select列表中

//查询所有组盘未完成的托盘明细
      axios.get(sessionStorage.http+`/showGroupTrayDetail?inOrderDetailId=${row.inOrderDetailId}`)
      .then(res => {
        let i=0;
        this.tableColumns.data = res.data
        for(let item of this.tableColumns.data) {
          // if(item.backupfield2=='AUTO'){
          //   item.readStatus=true;
          //   item.lineNo=++i;
          // }else if(item.backupfield2=='HAND'){
          //   item.readStatus=false;
          //   item.lineNo=++i;
          // }else if(item.backupfield2=='NOTIN'){
          //   item.readStatus=true;
          //   item.lineNo=++i;
          // }
          item.lineNo=++i;
          item.lastIdList=[]
        }
      })
      .catch(res => {
      })

      //查询所有可用于手动分配的货位
      // axios.post(sessionStorage.http+`/handGetStorageId?loginStatus=${sessionStorage.loginStatus}`)
      // .then(res => {
      //   this.storageIdList = res.data
      // })
      // .catch(res => {
      // })

    },


    flushMethod(param){
      //查询所有组盘未完成的托盘明细
            axios.get(sessionStorage.http+`/showGroupVendor?godownEntryDetailId=`+param)
            .then(res => {
              let i=0;
              this.tableColumns.data = res.data
              for(let item of this.tableColumns.data) {
                if(item.backupfield2=='AUTO'){
                  item.readStatus=true;
                  item.lineNo=++i;
                }else if(item.backupfield2=='HAND'){
                  item.readStatus=false;
                  item.lineNo=++i;
                }else if(item.backupfield2=='NOTIN'){
                  item.readStatus=true;
                  item.lineNo=++i;
                }
                item.lastIdList=[]
              }
            })
            .catch(res => {
            })

            //查询所有可用于手动分配的货位
            // axios.post(sessionStorage.http+`/handGetStorageId?loginStatus=${sessionStorage.loginStatus}`)
            // .then(res => {
            //   this.storageIdList = res.data
            // })
            // .catch(res => {
            // })
    },

    // 页面验证
    checkOrderDetail(param){
      //conversionRate  invUomCode batchno quantity recvquantity duedate productiondate
      // console.log('3333333333333333');
      console.log(param);
      // console.log('44444444444444444444444');
      // console.log(param.invUomCode == '');
      var checkStr = '';
      // if(param.distribution == 'AUTO'){
      //   checkStr = '';
      //   return checkStr;
      // }
      if(param.backupfield2 == 'HAND'){
        if(param.storageId == null || param.storageId == ''|| param.storageId == undefined){
          checkStr += '货位号/';
        }
      }
      // if((param.batchno == null || param.batchno == '') && !this.isAutoBatch){
      //   checkStr += '批次号/';
      // }
      // if(param.quantity == null || param.quantity == ''){
      //   checkStr += '入库数量/';
      // }
      // if(param.recvquantity == null || param.recvquantity == '' || +param.recvquantity == 0){
      //   checkStr += '接收数量/';
      // }
      // if(param.duedate == null || param.duedate == ''){
      //   checkStr += '到期日/';
      // }
      // if(param.productiondate == null || param.productiondate == ''){
      //   checkStr += '生产日期/';
      // }
      return checkStr;
    },

    //添加一行
    async addDetail(){

      // if(this.formFilter.remark3=='1'){
      //   iview.Message.error({
      //     content:'此单据已冻结，不可入库',
      //     duration:5
      //   });
      //   this.add = true;
      //   return false;
      // }


      if(this.formFilter.status=='GPS01'){
        iview.Message.error({
          content:'此单据暂未接收，不可入库',
          duration:5
        });
        this.add = true;
        return false;
      }

      if(this.formFilter.status == 'GPS04'){
        iview.Message.error({
          content:'此单据已组盘完成，不可重复组盘',
          duration:5
        });
        this.add = true;
        return false;
      }
      // if(this.formFilter.status=='GPS04'){
      //   iview.Message.error({
      //     content:'此单据已码盘完成，不可入库',
      //     duration:5
      //   });
      //   this.add = true;
      //   return false;
      // }


      var checkStr = '';

      // var mes='';
      // if(this.formFilter.surplusquantity == 0){
      //   mes += '剩余数量为0，不可再组盘'+'/ ';
      // }
      // if(mes != ''){
      //   iview.Message.error({
      //     content:mes,
      //     duration:5
      //   });
      //   this.add = true;
      //   return false;
      // }

      // //入库计划id
      if(this.formFilter2.allotType == '' || this.formFilter2.allotType == undefined){
        checkStr += '分配方式'+'/ ';
      }
      if(this.formFilter2.palletCode == '' || this.formFilter2.palletCode == undefined){
          checkStr += '托盘码'+'/ ';
        }
      if((this.formFilter2.num == '' || this.formFilter2.num == undefined) && this.formFilter2.isScattered == false){
        checkStr += '绑盘件数'+'/ ';
      }
      if((this.formFilter2.weight == '' || this.formFilter2.weight == undefined) && this.formFilter.unit != '件' && this.formFilter2.isScattered == false){
        console.log(this.formFilter2.weight)
        checkStr += '绑盘重量'+'/ ';
      }
      // console.log(this.formFilter2.weight)
      if(checkStr != ''){
        iview.Message.error({
          content:'请填写完或者选择 '+checkStr +' 中的数据',
          duration:5
        });
        this.add = true;
        return false;
      }

      var trayId = '';
      var getId = await axios.get(sessionStorage.http+'/getTrayId?palletCode='+this.formFilter2.palletCode);
      // console.log(getId)
      if(getId.data!=null){
        trayId = getId.data.trayId;
        var tray = getId.data
        var weight = this.formFilter2.weight
        if(this.formFilter2.isScattered == true){
          weight =  +this.formFilter2.weight + +this.formFilter.partQuantity
        }
        tray.totalNum = +tray.totalNum + +this.formFilter2.num;
        tray.totalWeight= +tray.totalWeight + weight;
        await axios.post(sessionStorage.http+'/updateGroupTray?'+'loginStatus='+sessionStorage.loginStatus,tray)
      }else{
        var res = await axios.get(sessionStorage.http+'/autoCreateId?type=TP');
        var weight = this.formFilter2.weight
        if(this.formFilter2.isScattered == true){
          weight =  +this.formFilter2.weight + +this.formFilter.partQuantity
        }
        trayId = res.data;
        this.formFilter3.trayId=trayId;
        this.formFilter3.palletCode=this.formFilter2.palletCode;
        this.formFilter3.warehouseId=this.formFilter.warehouseId;
        this.formFilter3.warehouseName=this.formFilter.warehouseName;
        this.formFilter3.districtId=this.formFilter.districtId;
        this.formFilter3.districtName=this.formFilter.districtName;
        this.formFilter3.totalNum=this.formFilter2.num;
        this.formFilter3.totalWeight=weight;
        this.formFilter3.allotType=this.formFilter2.allotType;
        this.formFilter3.status='0';
        this.formFilter3.trayTime='';
        this.formFilter3.insertYmd='';
        this.formFilter3.insertId='';

        axios.post(sessionStorage.http+'/saveGroupTray?'+'loginStatus='+sessionStorage.loginStatus,this.formFilter3).then(() => {
          // document.querySelector('#getNewData').click()
        })
      }

      // console.log(trayId)
      // if(this.formFilter.surplusquantity-this.formFilter.predictQuantity<0){
      //   iview.Message.error({
      //     content:'绑盘件数不可大于剩余数量',
      //     duration:5
      //   });
      //   this.add = true;
      //   return false;
      // }

      // if(this.formFilter.distribution=='NOTIN'){
      //   this.notInStorage();
      //   return;
      // }
      //
      // if(this.formFilter.movetype == 'GPT04'){
      //   this.GPT04InStorage();
      //   return;
      // }

      //console.log(changeDate(this.tableColumns.data));
      // console.log(this.formFilter.num);
      this.lDetail = this.tableColumns.data.length;
      let num=1;

        for(var i = 1;i <=num; i++){
          var id = '';
          var storageid = '';
            // alert('checkStr--'+this.formFilter.movetype);
              var res = await axios.get(sessionStorage.http+'/autoCreateId?type=TD');
              id = res.data;

              // id =123;
// if(this.formFilter.distribution=='AUTO'){
          // var resu = await axios.get(sessionStorage.http+'/getStorage?storageId=A-11-1-1');
          // storageid=resu.data.storageid;
          // console.log(resu.data.storageid)

          var weight = this.formFilter2.weight
          var partQuantity  = ''
          if(this.formFilter2.isScattered == true){
            weight =  +this.formFilter2.weight + +this.formFilter.partQuantity
            partQuantity = this.formFilter.partQuantity
          }
          this.tableColumns.data.push({
             select:false,
             lineNo:this.lDetail + i,
             trayDetailId:id,
             trayId:trayId,
             inOrderId:this.formFilter.inOrderId,
             inOrderDetailId:this.formFilter.inOrderDetailId,
             materielId:this.formFilter.materielId,
             materielName:this.formFilter.materielName,
             unit:this.formFilter.unit,
             packageStandards:this.formFilter.packageStandards,
             warehouseId:this.formFilter.warehouseId,
             warehouseName:this.formFilter.warehouseName,
             districtId:this.formFilter.districtId,
             districtName:this.formFilter.districtName,
             storageId:'',
             palletCode:this.formFilter2.palletCode,
             num:this.formFilter2.num,
             weight:weight,
             partWeight:partQuantity,
             vendorName:this.formFilter.vendorName,
             producerName:this.formFilter.producerName,
             stockBatch:this.formFilter.stockBatch,
             qualityStatus:this.formFilter.qualityStatus,
             stockWarnDate:this.formFilter.stockWarnDate,
             inTime:this.formFilter.inDate,
             produceDate:this.formFilter.produceDate,
             insertYmd:this.formFilter.insertYmd,
             insertId:this.formFilter.insertId,
             packageType:this.formFilter.packageType,
             price:this.formFilter.price,
             sumPrice:this.formFilter.sumPrice,
             remark1:'0',
             remark2:this.formFilter2.allotType,
             remark5:this.formFilter.remark2,
             isScattered:this.formFilter2.isScattered


             // backupfield2:this.formFilter.distribution,//分配方式
             // backupfield3:this.formFilter.startposition,//入库口位置
             // readStatus:this.readStatus,
             // // surfacePackageTypeSelect:false,
             // godownEntryDetailId:this.formFilter.godownEntryId,//入库单明细号
             // trayId:id,//托盘明细号
             // godownEntryId:this.formFilter.materialNo,//物料号
             // warehouseId:this.formFilter.stockBatch,//批次号
             // trayNumber:this.formFilter.trayNumber,//托盘号
             // storageId:'',
             // predictQuantity:this.formFilter.predictQuantity,//绑盘数量
             // districtId:this.formFilter.districtId,//绑盘件数
             // backupfield1:this.formFilter.unit,   //计量单位
             // updateId:this.formFilter.packitemspec,//包装规格
             // backupfield4:0,//贴签数
             // backupfield5:0,//合格数
             // updateYmd:0,//不合格数
             // remark:this.formFilter.creater,//组盘人
             // insertYmd:this.formFilter.insertYmd?'1':'0',//是否零散
             // vendorStatus:'zpzh',
             // lastIdList:[],
             // groupVendorDate:new Date().Format("yyyy-MM-dd")
             // startposition:this.startposition,
             // resource:this.resource,
             // qualityStatus:'0',
             // createdate:this.formFilter.createdate,
             // unit:'1'
           });
           // console.log(i)
           console.log(this.lDetail)
           console.log(this.tableColumns.data[this.lDetail])
           axios.post(sessionStorage.http+'/saveGroupTrayDetail?'+'loginStatus='+sessionStorage.loginStatus,this.tableColumns.data[this.lDetail]).then(() => {
             document.querySelector('#getNewData').click()
           })

           let a = +(this.formFilter.surplusquantity)-(+(this.formFilter2.weight))
           this.formFilter.surplusquantity= +(a.toFixed(3))+0;
           this.formFilter2.palletCode='';
           this.formFilter2.num='';
           this.formFilter2.weight='';
         // }else{
         //   this.tableColumns.data.push({
         //     select:false,
         //     lineNo:this.lDetail + i,
         //     distribution:'HAND',
         //     readStatus:this.readStatus,
         //     // surfacePackageTypeSelect:false,
         //     godownEntryDetailId:this.formFilter.godownEntryId,//入库单明细号
         //     trayId:id,//托盘明细号
         //     godownEntryId:this.formFilter.materialNo,//物料号
         //     warehouseId:this.formFilter.stockBatch,//批次号
         //     trayNumber:this.formFilter.trayNumber,//托盘号
         //     // storageId:storageid,
         //     predictQuantity:this.formFilter.predictQuantity,//绑盘数量
         //     districtId:this.formFilter.districtId,//绑盘件数
         //     backupfield1:this.formFilter.unit,   //计量单位
         //     remark:'yuy'
         //     // startposition:this.startposition,
         //     // resource:this.resource,
         //     // qualityStatus:'0',
         //     // createdate:this.formFilter.createdate,
         //     // unit:'1''
         //
         //    });
         //    console.log(this.tableColumns.data[0])
         //
         // }

        }
        if(this.formFilter.isBatchIn == 'P01'){
          this.formFilter2.num=this.formFilter.batckGroupNun
          this.formFilter2.weight=this.formFilter2.num*this.formFilter.packageStandards
        }
        if(this.formFilter.unit == '件'){
          this.formFilter2.weight = 0
        }
    },

    //拼盘入库GPT04
    async GPT04InStorage(){

      //console.log(changeDate(this.tableColumns.data));
      // console.log(this.formFilter.num);
      this.lDetail = this.tableColumns.data.length;
      let num=1;

        for(var i = 1;i <=num; i++){
          var id = '';
          var storageid = '';
            // alert('checkStr--'+this.formFilter.movetype);
              var res = await axios.get(sessionStorage.http+'/autoCreateId?type=TD');
              id = res.data;

              // id =123;
    // if(this.formFilter.distribution=='AUTO'){
          // var resu = await axios.get(sessionStorage.http+'/getStorage?storageId=A-11-1-1');
          // storageid=resu.data.storageid;
          // console.log(resu.data.storageid)

          this.tableColumns.data.push({
             select:false,
             lineNo:this.lDetail + i,
             backupfield2:this.formFilter.distribution,//分配方式
             backupfield3:this.formFilter.startposition,//入库口位置
             readStatus:this.readStatus,
             // surfacePackageTypeSelect:false,
             godownEntryDetailId:this.formFilter.godownEntryId,//入库单明细号
             trayId:id,//托盘明细号
             godownEntryId:this.formFilter.materialNo,//物料号
             warehouseId:this.formFilter.stockBatch,//批次号
             trayNumber:this.formFilter.trayNumber,//托盘号
             storageId:'',
             predictQuantity:this.formFilter.surplusquantity,//绑盘数量
             districtId:this.formFilter.districtId,//绑盘件数
             backupfield1:this.formFilter.unit,   //计量单位
             updateId:this.formFilter.packitemspec,//包装规格
             remark:this.formFilter.creater,//组盘人
             insertYmd:this.formFilter.insertYmd?'1':'0',//是否零散
             vendorStatus:'zpzh',
             lastIdList:[],
             groupVendorDate:new Date().Format("yyyy-MM-dd")
             // startposition:this.startposition,
             // resource:this.resource,
             // qualityStatus:'0',
             // createdate:this.formFilter.createdate,
             // unit:'1'
           });
           // console.log(i)
           console.log(this.lDetail)
           console.log(this.tableColumns.data[this.lDetail])
           axios.post(sessionStorage.http+'/saveGroupVendor?'+'loginStatus='+sessionStorage.loginStatus,this.tableColumns.data[this.lDetail]).then(() => {
             document.querySelector('#getNewData').click()
           })

           this.formFilter.surplusquantity=0;
           this.formFilter.trayNumber='';
           this.formFilter.predictQuantity='';
           this.formFilter.districtId='';

        }
    },

    //实物不入库
    async notInStorage(){

      var checkStr = '';

      // var mes='';
      // if(this.formFilter.surplusquantity == 0){
      //   mes += '剩余数量为0，不可再组盘'+'/ ';
      // }
      // if(mes != ''){
      //   iview.Message.error({
      //     content:mes,
      //     duration:5
      //   });
      //   this.add = true;
      //   return false;
      // }


      //console.log(changeDate(this.tableColumns.data));
      // console.log(this.formFilter.num);
      this.lDetail = this.tableColumns.data.length;
      let num=1;

        for(var i = 1;i <=num; i++){
          var id = '';
          var storageid = '';
            // alert('checkStr--'+this.formFilter.movetype);
              var res = await axios.get(sessionStorage.http+'/autoCreateId?type=TD');
              id = res.data;

              // id =123;
    // if(this.formFilter.distribution=='AUTO'){
          // var resu = await axios.get(sessionStorage.http+'/getStorage?storageId=A-11-1-1');
          // storageid=resu.data.storageid;
          // console.log(resu.data.storageid)

          this.tableColumns.data.push({
             select:false,
             lineNo:this.lDetail + i,
             backupfield2:this.formFilter.distribution,//分配方式
             // backupfield3:this.formFilter.startposition,//入库口位置
             readStatus:this.readStatus,
             // surfacePackageTypeSelect:false,
             godownEntryDetailId:this.formFilter.godownEntryId,//入库单明细号
             trayId:id,//托盘明细号
             godownEntryId:this.formFilter.materialNo,//物料号
             warehouseId:this.formFilter.stockBatch,//批次号
             trayNumber:'TP123456',//托盘号
             storageId:'A-B-C-D',
             predictQuantity:this.formFilter.surplusquantity,//绑盘数量
             districtId:this.formFilter.districtId,//绑盘件数
             backupfield1:this.formFilter.unit,   //计量单位
             updateId:this.formFilter.packitemspec,//包装规格
             backupfield4:0,//贴签数
             backupfield5:0,//合格数
             updateYmd:0,//不合格数
             remark:this.formFilter.creater,//组盘人
             vendorStatus:'zpzh',
             lastIdList:[],
             groupVendorDate:new Date().Format("yyyy-MM-dd")
             // startposition:this.startposition,
             // resource:this.resource,
             // qualityStatus:'0',
             // createdate:this.formFilter.createdate,
             // unit:'1'
           });
           // console.log(i)
           console.log(this.lDetail)
           console.log(this.tableColumns.data[this.lDetail])
           axios.post(sessionStorage.http+'/saveGroupVendor?'+'loginStatus='+sessionStorage.loginStatus,this.tableColumns.data[this.lDetail]).then(() => {
             document.querySelector('#getNewData').click()
           })

           // this.formFilter.surplusquantity=0;
           // let a = +(this.formFilter.surplusquantity)-(+(this.formFilter.predictQuantity))
           // this.formFilter.surplusquantity= +(a.toFixed(3))+0;
           this.formFilter.surplusquantity=0;
           this.formFilter.trayNumber='';
           this.formFilter.predictQuantity='';
           this.formFilter.districtId='';

        }
    },


    ok(){
      let k='';
      if(this.checkBtn){
        this.checkBtn = false
        setTimeout(() => {
          this.checkBtn = true
        },3000)
        this.loading = false
        setTimeout(()=>{this.loading = true},0)

        // if(this.formFilter.remark3=='1'){
        //   this.$Message.error('此单据已冻结，不可入库');
        //   this.add = true
        //   setTimeout(()=>{this.loading = true},0)
        //   this.loading = false
        //   return
        // }

        if(this.tableColumns.data.length == 0){
          this.$Message.error('明细表不能为空');
          this.add = true
          setTimeout(()=>{this.loading = true},0)
          this.loading = false
          return
        }else{
          // console.log(this.tableColumns.data)
          // for(var i = 0;i< this.tableColumns.data.length; i++){
          //   var res = this.checkOrderDetail(this.tableColumns.data[i]);
          //   if(res != ''){
          //     iview.Message.error({
          //       content:"第"+(i+1)+"行  "+res+"  未填写或重复,请完全填写后,再提交",
          //       duration:5
          //     });
          //     return
          //   }
          this.taskAssignment();

          }

      }
    },

taskAssignment(){
  axios.post(sessionStorage.http+'/changeDetailStatus?'+'loginStatus='+sessionStorage.loginStatus,this.tableColumns.data)
  .then((res) =>{
    if(res.code == 'faild'){
      iview.Message.error({
        content:res.message,
        duration:5
      });
      this.add = true;
      this.flushMethod(this.formFilter.godownEntryId)
      // return;
    }else if(res.code == '1'){
      console.log(res.data)
      iview.Message.success({
        content:'添加成功.',
        duration:5
      });
      // document.getElementById('search').click();
      document.getElementById('getNewData').click()
      this.add = false;
    }else if(res.code == '0'){
      iview.Message.error({
        content:'所选择库区不存在货位,请为所选在库区分配货位!',
        duration:5
      });
    }
    // else if(res.message == '3'){
    //   iview.Message.error({
    //     content:'入库单明细为空.',
    //     duration:5
    //   });
    //   return;
    // }else{
    //   iview.Message.error({
    //     content:'不符合批次号生成规则-'+res.message.split('##')[1]+'为空',
    //     duration:5
    //   });
    //   return;
    // }

  })
},

    cancel(){},
    //删除事件
    deleteSelection(){
      var s=0;
      // for(var i in this.needdelrow){
      //   s+= +(this.needdelrow[i].predictQuantity)
      //   // console.log('i='+i);
      //   this.tableColumns.data.remove(this.needdelrow[i].lineNo);
      //   // console.log(this.tableColumns.data)
      // }
      this.needdelrow.forEach((item,index) => {
        s += +(this.needdelrow[index].predictQuantity)
        this.tableColumns.data.remove(this.needdelrow[index].lineNo);
      })
      // alert(s)
      // console.log(this.needdelrow)
      this.formFilter.surplusquantity= +((+(this.formFilter.surplusquantity)+(+s)).toFixed(3))+0;
      this.deleteButtonFlag=true
      this.delete_confirm = false;
      for(var j in this.tableColumns.data){
        this.tableColumns.data[j].lineNo = +j + 1;
      }

      axios.post(sessionStorage.http+'/deleteSelection?'+'loginStatus='+sessionStorage.loginStatus,this.needdelrow)
      .then(res => {
        if(res.code=='1'){
          document.querySelector('#getNewData').click();
          iview.Message.success({
            content:'取消组盘成功',
            duration:5
          });
        }else{

          iview.Message.error({
            content:'取消组盘失败',
            duration:5
          });
        }
      })
      .catch(res => {
      })
      // document.getElementById('del').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
      // document.getElementById('del').setAttribute("disabled","disabled");

      // console.log(this.tableColumns.data)
    },
    //分配方式
    onChange(){
      if(this.formFilter.distribution == 'AUTO'){
        this.readStatus = true
      }else if(this.formFilter.distribution == 'HAND'){
        this.readStatus = false
      }else if(this.formFilter.distribution == 'NOTIN'){
        this.formFilter.trayNumber = 'TP123456'
        this.formFilter.predictQuantity=this.formFilter.surplusquantity;
        this.readStatus = true
      }
    },
    //勾选触发事件
    onSelectionChange(row){
      this.needdelrow = row;
      if(this.needdelrow.length > 0){
        this.deleteButtonFlag=false
        // document.getElementById('del').setAttribute("style","background-color:#fe3838;width:120px;height:28px;");
        // document.getElementById('del').removeAttribute("disabled");
      }else{
        this.deleteButtonFlag=true
        // document.getElementById('del').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
        // document.getElementById('del').setAttribute("disabled","disabled");
      }
    },

    //得到时间
    getCreatDate(createdate){
      this.formFilter.createdate = changeDate(createdate);
      // console.log(createdate);
    },
    //修改时间样式
    changeDate(dateA) {
        var dateee = new Date(dateA).toJSON();
        var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
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

    this.initFormatter()


  }
}
}
</script>


<style lang="less" scoped>
.tableTd{
   background:url('../assets/img/user.png') center center;
   color:black;
   background-size: 100%;
}
.emptyImg{
   background:url('../assets/img/empty.png') center center;
   color:black;
   background-size: 100%;
}
.fullImg{
   background:url('../assets/img/full.png') center center;
   color:black;
   background-size: 100%;
}
.lockImg{
   background:url('../assets/img/lock.png') center center;
   color:black;
   background-size: 100%;
}
.roadImg{
   background:url('../assets/img/road.png') center center;
   color:black;
   background-size: 100%;
}
.disabledImg{
   background:url('../assets/img/disabled.png') center center;
   color:black;
   background-size: 100%;
   -moz-background-size:100% 100%;
}
.liftImg{
   background:url('../assets/img/lift.png') center center;
   color:black;
   background-size: 100%;
}
.exitImg{
   background:url('../assets/img/exit.png') center center;
   color:black;
   background-size: 100%;
}
.entryImg{
   background:url('../assets/img/entry.png') center center;
   color:black;
   background-size: 100%;
}
.chargeImg{
   background:url('../assets/img/charge.png') center center;
   color:black;
   background-size: 100%;
}


    .font{
      position: absolute;
      left: -70px;
    }
    .makeTraysModal{
      .ivu-table-wrapper{
        overflow:inherit !important;
      }
    }

    .font1{
      position: absolute;
      left: -70px;
    }
    .font2{
      position: absolute;
      left: -60px;
    }
    .font3{
      position: absolute;
      left: -40px;
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
// 从这儿开始
.btnClass_blue{
  background-color: rgb(85,167,253) !important;
  border-color: rgb(85,167,253) !important;
}
.btnClass_yellow{
  background-color: rgb(233,156,45) !important;
  border-color: rgb(233,156,45) !important;
}
.btnClass_purple{
  background-color: rgb(75,72,237) !important;
  border-color: rgb(75,72,237) !important;
}
.btnClass_pink{
  background-color: rgb(250,83,189) !important;
  border-color: rgb(250,83,189) !important;
}
.btnClass_red{
  background-color: rgb(253,97,99) !important;
  border-color: rgb(253,97,99) !important;
}
// 到这儿结束


// 从这儿开始
.ingodownentryaddmodel_blue{
  .ivu-form .ivu-form-item-label{
    color:rgb(85,167,253) !important;
  }
  .ivu-modal-header p, .ivu-modal-header-inner{
    color:rgb(85,167,253) !important;
  }
}
.ingodownentryaddmodel_yellow{
  .ivu-form .ivu-form-item-label{
    color:rgb(233,156,45) !important;
  }
  .ivu-modal-header p, .ivu-modal-header-inner{
    color:rgb(233,156,45) !important;
  }
}
.ingodownentryaddmodel_purple{
  .ivu-form .ivu-form-item-label{
    color:rgb(75,72,237) !important;
  }
  .ivu-modal-header p, .ivu-modal-header-inner{
    color:rgb(75,72,237) !important;
  }
}
.ingodownentryaddmodel_pink{
  .ivu-form .ivu-form-item-label{
    color:rgb(250,83,189) !important;
  }
  .ivu-modal-header p, .ivu-modal-header-inner{
    color:rgb(250,83,189) !important;
  }
}
.ingodownentryaddmodel_red{
  .ivu-form .ivu-form-item-label{
    color:rgb(253,97,99) !important;
  }
  .ivu-modal-header p, .ivu-modal-header-inner{
    color:rgb(253,97,99) !important;
  }
}



.ingodownentryaddmodel{
  th .ivu-table-cell{
        font-size: 12px !important;
        font-weight: bold;
        color:#333;
      }



      .ivu-form .ivu-form-item-label{
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

     .status{
       .ivu-form-item-content{
         line-height: 43px;
       }
     }
}
</style>
