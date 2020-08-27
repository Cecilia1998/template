<template lang="html">
  <Modal  v-model="add" :loading='loading' width='1500px' :mask-closable='false'>
      <p slot="header" style="text-align:center;font-size:16px">
            <span>入库单明细</span>
      </p>
      <div :class="getIngodownentryaddmodel('ingodownentryaddmodel')">
     <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;" >
        <!-- <Row>
          <Col span="24">
             <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:12px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creater}}</div>
          </Col>
        </Row> -->
        <!-- <div>&nbsp;</div> -->
        <Row>
          <Col span="24">
               <Row type='flex' justify="end">
                 <Col span="5">
                     <Form-item label="入库通知单号" prop="order_id" status-icon >
                       <font color="red" class="font">*</font>
                       <Input v-model="formFilter.ingodownentryid" placeholder="请输入" style="width: 160px;" @on-keyup="checkOrderId" element-id = 'ingodownentryidadd' @on-blur="checkOrderIdUse"  :maxlength='20' />
                     </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="相关单据号">
                     <font color="red" class="font1">*</font>
                     <Select v-model="formFilter.godownentrytype" placeholder="请选择" @on-change="" style="width: 160px;">
                       <Option value="">-所有入库类型-</Option>
                       <Option v-for=" item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="入库单状态">
                     <font color="red" class="font1">*</font>
                     <Select v-model="formFilter.customerid" placeholder="请选择" @on-change="selectCustomer" style="width: 160px;" v-bind:disabled="cusIsAble">
                       <Option value="">-所有状态-</Option>
                         <Option v-for=" item in customerList" :value="item.customerid" :key="item.customerid">{{ item.customername }}</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="预定入库日期">
                     <font color="red" class="font">*</font>
                     <div class='createdate'>
                       <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                     </div>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="实际入库日期">
                     <font color="red" class="font">*</font>
                     <div class='createdate'>
                       <DatePicker v-model="formFilter.createdate" type="date" placeholder="请选择" @on-change='getCreatDate' readonly></DatePicker>
                     </div>
                   </Form-item>
                 </Col>
               </Row>
               <Row type='flex' justify="end">
                 <Col span="5">
                   <Form-item label="采购订单号">
                     <font color="red" class="font3">*</font>
                     <Select v-model="formFilter.sectorname" placeholder="请选择" @on-change="" style="width: 160px" >
                       <Option value="">-所有部门-</Option>
                       <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="移动类型">
                    <font color="red" class="font2">*</font>
                     <Select v-model="formFilter.suppliermanagementid" placeholder="请选择" @on-change="selectSupplier" style="width: 160px" ref="suppliermanagementid" v-bind:disabled="supIsAble">
                       <Option value="">-所有状态-</Option>
                       <Option v-for=" item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="供应商代码">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="供应商描述">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="车间代码">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <!-- <Col span="5">

                 </Col> -->
               </Row>
               <Row type='flex' justify="end">
                 <Col span="5">
                   <Form-item label="车间描述">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="交货人">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="收货部门">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="收货人">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="生产厂家名称">
                     <Input v-model="formFilter.quantity" style="width: 160px;" readonly element-id = 'orderquantity'/>
                   </Form-item>
                 </Col>
               </Row>
               <Row type='flex' justify="end">
                 <!-- <Col span="5">
                   <Form-item label="单据来源">
                     <font color="red" class="font3">*</font>
                     <Select v-model="formFilter.sectorname" placeholder="请选择" @on-change="" style="width: 160px" >
                       <Option value="">-SAP下发-</Option>
                       <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="5">
                   <Form-item label="是否实物入库">
                     <Checkbox v-model="animal1"> </Checkbox>
                   </Form-item>
                 </Col> -->
                 <Col span="5">
                   <Form-item label="备注" style="width: 415px;">
                     <Input v-model="formFilter.quantity" type="textarea"  :rows="2" :autosize="{minRows: 2,maxRows: 3}" placeholder="请输入"/>
                   </Form-item>
                 </Col>
                <Col span="19">

                </Col>
               </Row>
           </Col>
         </Row>
         <Row>
           <Col span="18">
                <Row>
                  <Col span='20'>
                    <Button shape="circle" style="width:120px;height:28px;background-color:#b4b4b4;padding:0px;border-radius:14px;" disabled @click="delConfirm" id='del' icon="md-trash">删除选中项</Button>
                    <Form-item label="新增行数">
                      <InputNumber :max="100" :min="1" v-model="formFilter.num"></InputNumber>
                    </Form-item>
                  </Col>
                </Row>
           </Col>
           <Col span="6" style="text-align:right;">
             <Button shape="circle" type="primary" :class="getBtnClass('btnClass')" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail">增&nbsp;&nbsp;加</Button>
           </Col>
         </Row>
         <Row>
           <Col span="24">
               <Table height="260" ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>
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
             <Button type="error" size="large" style="width:120px;border-radius:14px;font-size:14px"   @click="deleteSelection">确定删除</Button>
           </div>
         </Modal>
     </Form>
   </div>
   <div slot="footer">
     <Button type="primary"  :class="getBtnClass('btnClass')" style="width:120px;height:28px;padding:0px;border-radius:14px;"  @click="ok">提&nbsp;&nbsp;交</Button>
   </div>
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
      needdelrow:[],
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
      isAutoBatch:false,
      formFilter: {
        cur_page:1,
        num:1,
        creater:'尹波',
        isAutoBatch:false
      },
      lDetail:1,
      tableColumns: {
         card: [
           {title: '选择',key: 'select',width:50,type: 'selection',align: 'center'},
           {title: '序号',key: 'lineNo',width:75,align: 'center'},
           {title: '物料/产品号',key: 'conversionRate',width:180,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{
                 style:{
                   fontSize:'16px'
                 },
                   props: {
                          //将单元格的值给Input
                          value:params.row.conversionRate,
                          'element-id':"itemcode_"+this.tableColumns.data[params.index].lineNo
                        },
                  on:{
                       'on-change':(event)=> {
                         // alert(params.row.itemcode)
                         //alert(this.tableColumns.data[params.index]);
                          //值改变时
                          //将渲染后的值重新赋值给单元格值
                        params.row.conversionRate = event.target.value;
                        this.tableColumns.data[params.index] = params.row;
                        //  alert(this.tableColumns.data[params.index].itemcode);

                      },
                      'on-keyup':(e)=>{
                        var value = e.target.value.replace(/[^\d|chun| -_]/g,'');
                        params.row.conversionRate = value;
                        this.tableColumns.data[params.index] = params.row;
                        document.getElementById("itemcode_"+this.tableColumns.data[params.index].lineNo).value = value
                      },
                      'on-blur':(e)=>{
                        axios.post(sessionStorage.http+'/getGood',{order:this.formFilter,orderdetail:[this.tableColumns.data[params.index]]})
                        .then((res) =>{
                          if(res.data != null){
                            params.row.productname = res.data.goodsname;
                            // params.row.suppliermanagementid = res.data.suppliermanagementid;
                            this.tableColumns.data[params.index]  = params.row;
                          }else{
                            iview.Message.error({
                              content:'入库单客户或者供应商,未绑定该商品',
                              duration:5
                            });
                          }

                        })
                      }

                   }
                 }
               )]);
             }},
           {title: '物料/产品描述',key: 'productname',width:140, align: 'center'},
           {title: '厂家批号', key: 'invUomCode',width:120,align: 'center',render:(h,params)=>{
             let options = [];
             options.push(h("Option",{props:{value:'0'}},'个'));
             options.push(h("Option",{props:{value:'1'}},'箱'));
             return h('Select', {
               props:{
                   value: params.row.invUomCode
               },
               style:{
                 width:'80px',
                 'text-algin':'left'
               },
               on:{
                 'on-change':(invUomCode) => {
                   params.row.invUomCode = invUomCode
                   this.tableColumns.data[params._index] = params.row
                 }
               }
             },options)
           }},   //新增
           {title: '库存批号', key: 'batchno',width:180,align: 'center',render: (h, params) => {
             if(this.isAutoBatch == false){
               return h('div',[
                 h('Input',{
                   props:{
                     value:params.row.batchno,
                     'element-id':'batchno_'+this.tableColumns.data[params.index].lineNo
                   },
                   on:{
                        'on-change':(event)=> {
                          // alert(params.row.itemcode)
                          //alert(this.tableColumns.data[params.index]);
                           //值改变时
                           //将渲染后的值重新赋值给单元格值
                           params.row.batchno = event.target.value;
                           this.tableColumns.data[params.index] = params.row;
                         //  alert(this.tableColumns.data[params.index].itemcode);
                       },
                       'on-keyup':(e)=>{
                         this.checkOrderId(e);
                       }
                    }
                   }
                 )]);
               }else{
                  return h('div','批次号后台自动生成.')
               }
             }},          //新增
           {title: 'GMP批号', key: 'quantity',width:210,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{
                  props: {
                        //将单元格的值给Input
                        value:params.row.quantity,
                        'element-id':'quantity_'+this.tableColumns.data[params.index].lineNo
                      },
                   on:{
                        'on-change':(event)=> {

                          // alert(params.row.itemcode)
                          //alert(this.tableColumns.data[params.index]);
                           //值改变时
                           //将渲染后的值重新赋值给单元格值
                           params.row.quantity = event.target.value;
                           this.tableColumns.data[params.index] = params.row;
                         //  alert(this.tableColumns.data[params.index].itemcode);
                         // var res = parseInt(params.row.quantity) < parseInt(params.row.recvquantity);
                         // console.log(params.row.quantity+'入库数量-入库');
                         // console.log(params.row.recvquantity+'接收数量-入库');
                         // console.log(res);
                         if(+params.row.quantity < +params.row.recvquantity){
                           // event.target.value = 0;
                           params.row.recvquantity = '';
                           this.tableColumns.data[params.index] = params.row;
                           document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value = '';
                           this.$Message.error('入库数量不可小于接收数量');
                         }
                         this.countTotal();
                       },
                       'on-keyup':(e)=>{
                         var value=e.target.value.replace(/\D/g,'');
                         params.row.quantity = value;
                         this.tableColumns.data[params.index] = params.row;
                         document.getElementById('quantity_'+this.tableColumns.data[params.index].lineNo).value = value;
                       },
                       'on-focus':()=>{
                         var value=document.getElementById('quantity_'+this.tableColumns.data[params.index].lineNo).value;
                         if(+value == 0){
                           document.getElementById('quantity_'+this.tableColumns.data[params.index].lineNo).value = null;
                         }
                       },
                       'on-blur':()=>{
                         var value=document.getElementById('quantity_'+this.tableColumns.data[params.index].lineNo).value;
                         if(value == ''){
                           document.getElementById('quantity_'+this.tableColumns.data[params.index].lineNo).value = '0';
                         }
                       }
                   }
                 }
               )]);
             }},          //新增
           {title: '质量状态',key: 'recvquantity',width:210,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{
                 props: {
                       //将单元格的值给Input
                       value:params.row.recvquantity,
                       'element-id':'recvquantity_'+this.tableColumns.data[params.index].lineNo
                     },
                 on:{
                      'on-change':(event)=> {
                        //console.log(event.target.value)
                        // alert(params.row.itemcode)
                        //alert(this.tableColumns.data[params.index]);
                         //值改变时
                         //将渲染后的值重新赋值给单元格值
                         params.row.recvquantity = event.target.value;
                         this.tableColumns.data[params.index] = params.row;
                       //  alert(this.tableColumns.data[params.index].itemcode);
                       // var res = parseInt(params.row.quantity) < parseInt(params.row.recvquantity);

                      // console.log(res);

                     },
                     'on-keyup':(e)=>{
                       var value=e.target.value.replace(/\D/g,'');
                       params.row.recvquantity = value;
                       this.tableColumns.data[params.index] = params.row;
                       document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value = value;
                       if(+params.row.quantity < +params.row.recvquantity){
                         // event.target.value = '';
                         params.row.recvquantity = '';
                         this.tableColumns.data[params.index] = params.row;
                         document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value = '';
                         this.$Message.error('入库数量不可小于接收数量');
                       }
                     },
                     'on-focus':()=>{
                       var value=document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value;
                       if(+value == 0){
                         document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value = null;
                       }
                     },
                     'on-blur':()=>{
                       var value=document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value
                       if(value == ''){
                         document.getElementById('recvquantity_'+this.tableColumns.data[params.index].lineNo).value = '0';
                       }
                     }
                  }
                 }
               )]);
             }},
           {title: '生产期日',key: 'duedate',width:180,align: 'center',render: (h, params) => {
             return h('div',[
                       h('DatePicker',{
                          props: {
                               //将单元格的值给Input
                               value:this.tableColumns.data[params.index].duedate,
                               'editable':false,
                               'element-id':'due'+this.tableColumns.data[params.index].lineNo,
                               'options':this.tableColumns.data[params.index].startTimeOption
                             },
                           on:{
                               // 'on-change':(event)=>{
                               //     // console.log(event);
                               //     params.row.duedate = new Date(event).Format("yyyy-MM-dd");
                               //     this.tableColumns.data[params.index] = params.row;
                               //
                               // },
                               'on-change':(event)=>{
                                 // let duedate = new Date(event);
                                 // let currTime = new Date();
                                 // // console.log(duedate.getTime());
                                 // if(duedate.getTime() < currTime.getTime()){
                                 //   //params.row.duedate = undefined;
                                 //
                                 //   params.row.productiondate = null;
                                 //   this.tableColumns.data[params.index].productiondate = null;
                                 //   this.tableColumns.data[params.index] = params.row;
                                 //   this.$Message.error('到期日不可小于当前时间');
                                 //   // console.log(this.tableColumns);
                                 //   return;
                                 // }
                                 // console.log('正确的')
                                 params.row.duedate = new Date(event).Format("yyyy-MM-dd");
                                 this.tableColumns.data[params.index] = params.row;
                               }
                           }
                       })
                   ]);
             }
           },
           {title: '有效期至', key: 'productiondate', width:180,align: 'center',render: (h, params) => {
             return h('div',[
               h('DatePicker',{
                      props: {
                        //将单元格的值给Input
                        value:this.tableColumns.data[params.index].productiondate,
                        editable:false,
                        'element-id':'pru'+this.tableColumns.data[params.index].lineNo,
                        'options':this.tableColumns.data[params.index].endTimeOption

                      },
                     on:{
                       'on-change':(event)=>{

                         params.row.productiondate = event
                         params.row.productiondate = new Date(event).Format("yyyy-MM-dd");
                         this.tableColumns.data[params.index] = params.row;
                       }
                     }
                 })
               ]);
             } },
             {title: '复检日期', key: 'productiondate', width:180,align: 'center',render: (h, params) => {
               return h('div',[
                 h('DatePicker',{
                        props: {
                          //将单元格的值给Input
                          value:this.tableColumns.data[params.index].productiondate,
                          editable:false,
                          'element-id':'pru'+this.tableColumns.data[params.index].lineNo,
                          'options':this.tableColumns.data[params.index].endTimeOption

                        },
                       on:{
                         'on-change':(event)=>{

                           params.row.productiondate = event
                           params.row.productiondate = new Date(event).Format("yyyy-MM-dd");
                           this.tableColumns.data[params.index] = params.row;
                         }
                       }
                   })
                 ]);
               } },
           {title: '交叉污染', key: 'suppliermanagementid',width:120, align: 'center'},
           {title: '数量', key: 'suppliermanagementid',width:120, align: 'center'},
           {title: '件数', key: 'suppliermanagementid',width:120, align: 'center'},
           {title: '包装规格', key: 'suppliermanagementid',width:120, align: 'center'},
           {title: '计量单位', key: 'suppliermanagementid',width:120, align: 'center'},
           {title: '研发物料标识', key: 'suppliermanagementid',width:120, align: 'center'},
           {title: '状态', key: 'remark',width:180, align: 'center' ,render: (h, params) => {
             return h('div',[
               h('Input',{
                 on:{
                      'on-change':(event)=> {
                        // alert(params.row.itemcode)
                        //alert(this.tableColumns.data[params.index]);
                         //值改变时
                         //将渲染后的值重新赋值给单元格值
                         params.row.remark = event.target.value;
                         this.tableColumns.data[params.index] = params.row;
                       //  alert(this.tableColumns.data[params.index].itemcode);
                     }
                  }
                 }
               )]);
             }}
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
    checkOrderId(e){
      var value=e.target.value.replace(/[^\w\.\/]/ig,'');
      document.getElementById(e.target.id).value = value;
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
    show(taskList,customerList,supplierList,deptList,isAutoBatch){
      // console.log(taskList);
      // console.log(customerList);
      //
      // console.log(supplierList);
      //
      // console.log(deptList);
      console.log(isAutoBatch)

      this.isAutoBatch = isAutoBatch;
      this.taskList = taskList;
      this.customerList = customerList;
      this.supplierList = supplierList;
      this.deptList = deptList;

      this.supIsAble = false;
      this.cusIsAble = false;
      this.add = true;
      this.formFilter = {};
      this.formFilter.creater = sessionStorage.opername;
      this.formFilter.num = 1;
      this.tableColumns.data = [];
      this.formFilter.createdate = new Date();
      this.formFilter.quantity = '0';

    },
    // 页面验证
    checkOrderDetail(param){
      //conversionRate  invUomCode batchno quantity recvquantity duedate productiondate
      console.log(param.invUomCode);
      console.log(param.invUomCode == '');
      var checkStr = '';
      if(param.conversionRate == null || param.conversionRate == ''){
        checkStr += '商品编号/';
      }
      if(param.invUomCode == null || param.invUomCode == ''){
        checkStr += '单位/';
      }
      if((param.batchno == null || param.batchno == '') && !this.isAutoBatch){
        checkStr += '批次号/';
      }
      if(param.quantity == null || param.quantity == ''){
        checkStr += '入库数量/';
      }
      if(param.recvquantity == null || param.recvquantity == '' || +param.recvquantity == 0){
        checkStr += '接收数量/';
      }
      if(param.duedate == null || param.duedate == ''){
        checkStr += '到期日/';
      }
      if(param.productiondate == null || param.productiondate == ''){
        checkStr += '生产日期/';
      }
      return checkStr;
    },
    ok(){
      if(this.checkBtn){
        this.checkBtn = false
        setTimeout(() => {
          this.checkBtn = true
        },3000)
        this.loading = false
        setTimeout(()=>{this.loading = true},0)
        if(this.tableColumns.data.length == 0){
          this.$Message.error('明细表不能为空');
          this.add = true
          setTimeout(()=>{this.loading = true},0)
          this.loading = false
          return
        }else{
          // console.log(this.tableColumns.data)
          for(var i = 0;i< this.tableColumns.data.length; i++){
            var res = this.checkOrderDetail(this.tableColumns.data[i]);
            if(res != ''){
              iview.Message.error({
                content:"第"+i+1+"行"+res+"未填写或者未选择,请完全填写后,再提交",
                duration:5
              });
              return
            }
          }
          this.formFilter.loginStatus = sessionStorage.loginStatus;
          this.formFilter.autoBatch = this.isAutoBatch;
          axios.post(sessionStorage.http+'/addOrder?'+'loginStatus='+sessionStorage.loginStatus,{order:this.formFilter,orderdetail:this.tableColumns.data})
          .then((res) =>{
            if(res.message == '2'){
              iview.Message.error({
                content:'用户不存在,不可新增.',
                duration:5
              });
              return;
            }else if(res.message == 'success'){
              console.log(res.data)
              iview.Message.success({
                content:'添加成功.',
                duration:5
              });
              document.getElementById('search').click();
              this.add = false;
            }else if(res.message == '3'){
              iview.Message.error({
                content:'入库单明细为空.',
                duration:5
              });
              return;
            }else{
              iview.Message.error({
                content:'不符合批次号生成规则-'+res.message.split('##')[1]+'为空',
                duration:5
              });
              return;
            }

          })
        }
      }else{
        iview.Message.error({
          content: '请不要重复操作!',
          duration:5
        })
      }
    },
    cancel(){},
    //删除事件
    deleteSelection(){
      for(var i in this.needdelrow){

        console.log('i='+i);
        this.tableColumns.data.remove(this.needdelrow[i].lineNo);
        console.log(this.tableColumns.data)
      }
      this.delete_confirm = false;
      for(var j in this.tableColumns.data){
        this.tableColumns.data[j].lineNo = +j + 1;
      }

      document.getElementById('del').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
      document.getElementById('del').setAttribute("disabled","disabled");

      console.log(this.tableColumns.data)
    },
    //勾选触发事件
    onSelectionChange(row){
      this.needdelrow = row;
      if(this.needdelrow.length > 0){
        document.getElementById('del').setAttribute("style","background-color:#fe3838;width:120px;height:28px;");
        document.getElementById('del').removeAttribute("disabled");
      }else{
        document.getElementById('del').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
        document.getElementById('del').setAttribute("disabled","disabled");
      }
    },
    //添加一行
    addDetail(){
      var checkStr = '';
      if(this.formFilter.ingodownentryid == ''){
        checkStr += '入库单号'+'/ ';
      }
      if(this.formFilter.godownentrytype == undefined){
        checkStr += '入库类型'+'/ ';
      }
      if(this.formFilter.suppliermanagementid == undefined && this.formFilter.customerid == undefined){
        checkStr += '供应商/客户'+'/ ';
      }
      if(this.formFilter.sectorname == undefined){
        checkStr += '部门'+'/';
      }
      if(checkStr != ''){
        iview.Message.error({
          content:'请填写完 '+checkStr +' 中的数据',
          duration:5
        });
        this.add = true;
        return false;
      }
      //console.log(changeDate(this.tableColumns.data));
      console.log(this.formFilter.num);
      this.lDetail = this.tableColumns.data.length;
      if(this.formFilter.num > 0){
        for(var i = 1;i <= this.formFilter.num; i++){

          this.tableColumns.data.push({
             select:false,
             lineNo:this.lDetail + i,
             conversionRate:'',
             productname:'',
             invUomCode:'',
             batchNo:'',
             quantity:'0',
             recvquantity:'0',
             duedate:null,
             productiondate:'',
             suppliermanagementid:'',
             remark:'',
             endTimeOption:this.getEndTime(null,1),
             startTimeOption:this.getStartTime(null,1)
           });
        }
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

}
</style>
