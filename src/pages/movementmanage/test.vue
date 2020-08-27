<template lang="html">
  <Modal
      v-model="add"
      :loading='loading'
      title="移库单明细"
      @on-ok="ok"
      @on-cancel="cancel" width='1400px'
      ok-text='提交'
      cancel-text='关闭'>
     <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;" >

        <div style="text-align:left;"><font color="#59a6fe" size="2px">&nbsp;&nbsp;移库单管理:移库单明细编辑</font></div>
        <div>&nbsp;</div>

        <Row>
          <Col span="24">
             <div style="text-align:left;padding-left:5px"><font size="2px">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建人:{{formFilter.creater}}</div>
          </Col>
        </Row>
        <div>&nbsp;</div>

        <Row>
           <Row>
             <Col span="4">
                 <Form-item label="商品编号:" prop="targetDistrict">
                   <Select v-model="formFilter.goodsid" placeholder="请选择商品编号" @on-change="selectGoodsid" style="width: 117px">
                     <!-- 后台接口遍历获取所有存在的商品编号 -->
                      <Option v-for=" item in itemList" :value="item.goodsid" :key="item.goodsid">{{ item.goodsid }}</Option>
                   </Select>
                 </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="商品名称:">
                 <span>{{ getItemName(formFilter.goodsid) }}</span>
               </Form-item>
             </Col>
           </Row>
             <Row>
             <Col span="4">
               <Form-item label="货位号:">
                 <font color="red" class="font1">*</font>
                 <Select v-model="formFilter.storageId" placeholder="请选择" @on-change="selectstorageId" style="width: 117px;">
                   <!-- 通过商品编号生成所有可选的原货位号 -->
                   <Option v-for=" storageId in storageIdSet" :value="storageId" :key="storageId">{{ storageId }}</Option>
                 </Select>
               </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="批次号:">
                 <span>{{1111111111111}}</span>
               </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="入库日期:">
                 <span>{{1111111111111}}</span>
               </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="原库区:">
                 <span>{{1111111111111}}</span>
               </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="原托盘号:">
                 <span>{{1111111111111}}</span>
               </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="原托盘号:">
                 <span>{{1111111111111}}</span>
               </Form-item>
             </Col>

           </Row>

           <Row>
             <Col span="4">
               <Form-item label="质检状态:">
                 <font color="red" class="font1">*</font>
                 <Select v-model="formFilter.godownentrytype" placeholder="请选择" @on-change="" style="width: 117px;">
                   <!-- 通过商品编号生成所有可选的原货位号 -->
                   <Option v-for=" item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
                 </Select>
               </Form-item>
             </Col>
             <Col span="4">
               <Form-item label="目标货位号:">
                 <font color="red" class="font1">*</font>
                 <Select v-model="formFilter.godownentrytype" placeholder="请选择" @on-change="" style="width: 117px;">
                   <!-- 通过商品编号生成所有可选的原货位号 -->
                   <Option v-for=" item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
                 </Select>
               </Form-item>
             </Col>
             <Col span="12">
               <Form-item label="备注:" style="width: 100%;">
                 <Input v-model="formFilter.remark"/>
               </Form-item>
             </Col>
           </Row>

         </Row>

         <Row>
           <Col span="6">

             <Button shape="circle" style="width:120px;height:28px" @click="addDetail">增加</Button>
             <Button shape="circle" style="width:120px;height:28px;background-color:#b4b4b4" disabled @click="delConfirm" id='del' icon="md-trash">删除勾选</Button>
           </Col>
         </Row>

                  <div>&nbsp;</div>
        <Table  ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>



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
     </Form>
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

      needdelrow:[],
      delete_confirm:false,
      supIsAble:false,
      cusIsAble:false,
      add:false,
      loading:true,
      //所有的商品集合
      itemList:[

      ],
      //货位号集合
      storageIdSet:[],

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
        goodsid:'',
        goodsname:'',
        cur_page:1,
        num:1,
        creater:'尹波'
      },
      lDetail:1,
      tableColumns: {
         card: [
           {title: '选择',key: 'select',width:50,type: 'selection',align: 'center'},
           {title: '序号',key: 'lineNo',width:75,align: 'center'},
           {title: '商品编号',key: 'conversionRate',width:140,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{
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
                          console.log(res.data)
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
                        .catch((err) => {
                           iview.Message.error({
                             content:err.message,
                             duration:5
                           });
                        })
                      }

                   }
                 }
               )]);
             }},
           {title: '商品名称',key: 'productname',width:105, align: 'center'},
           {title: '单位', key: 'invUomCode',width:50,align: 'center'},   //新增
           {title: '批次号', key: 'batchno',width:125,align: 'center',render: (h, params) => {
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
             }},          //新增
           {title: '入库数量', key: 'quantity',width:90,align: 'center',render: (h, params) => {
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
                         var res = parseInt(params.row.quantity) < parseInt(params.row.recvquantity);
                         // console.log(params.row.quantity+'入库数量-入库');
                         // console.log(params.row.recvquantity+'接收数量-入库');
                         // console.log(res);
                         if(+params.row.quantity < +params.row.recvquantity){
                           event.target.value = 0;
                           params.row.recvquantity = 0;
                           this.tableColumns.data[params.index] = params.row;
                           this.$Message.error('入库数量不可小于接收数量');
                         }
                         this.countTotal();
                       },
                       'on-keyup':(e)=>{
                         var value=e.target.value.replace(/\D/g,'');
                         params.row.quantity = value;
                         this.tableColumns.data[params.index] = params.row;
                         document.getElementById('quantity_'+this.tableColumns.data[params.index].lineNo).value = value;
                       }
                   }
                 }
               )]);
             }},          //新增
           {title: '接收数量',key: 'recvquantity',width:90,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{
                 props: {
                       //将单元格的值给Input
                       value:params.row.recvquantity,
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
                       var res = parseInt(params.row.quantity) < parseInt(params.row.recvquantity);

                      // console.log(res);
                       if(+params.row.quantity < +params.row.recvquantity){
                         event.target.value = 0;
                         params.row.recvquantity = 0;
                         this.tableColumns.data[params.index] = params.row;
                         this.$Message.error('入库数量不可小于接收数量');
                       }
                     }
                  }
                 }
               )]);
             }},
           {title: '到期日',key: 'duedate',width:140,align: 'center',render: (h, params) => {
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
                                 let duedate = new Date(event);
                                 let currTime = new Date();
                                 // console.log(duedate.getTime());
                                 if(duedate.getTime() < currTime.getTime()){
                                   //params.row.duedate = undefined;

                                   params.row.productiondate = null;
                                   this.tableColumns.data[params.index].productiondate = null;
                                   this.tableColumns.data[params.index] = params.row;
                                   this.$Message.error('到期日不可小于当前时间');
                                   // console.log(this.tableColumns);
                                   return;
                                 }
                                 console.log('正确的')
                                 params.row.duedate = new Date(event).Format("yyyy-MM-dd");
                                 this.tableColumns.data[params.index] = params.row;


                               }
                           }
                       })
                   ]);
             }
           },
           {title: '生产日期', key: 'productiondate', width:140,align: 'center',render: (h, params) => {
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
                         // console.log(event)
                         // // console.log(this.tableColumns.data[params.index]);
                         // let duedate = new Date(event);
                         // let currTime = new Date();
                         // // console.log(duedate.getTime());
                         // if(duedate.getTime() > currTime.getTime()){
                         //   //params.row.duedate = undefined;
                         //
                         //   params.row.productiondate = null;
                         //   this.tableColumns.data[params.index].productiondate = null;
                         //   // this.tableColumns.data[params.index] = params.row;
                         //   this.tableColumns.data[params.index] = params.row;
                         //   this.$Message.error('生产日期不可大于当前时间');
                         //   // console.log(this.tableColumns);
                         //   return;
                         // }
                         console.log('正确的')
                         params.row.productiondate = new Date(event).Format("yyyy-MM-dd");
                         this.tableColumns.data[params.index] = params.row;
                       }
                     }
                 })
               ]);
             } },
           {title: '供应商', key: 'suppliermanagementid', align: 'center'},
           {title: '备注', key: 'remark', align: 'center' ,render: (h, params) => {
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
  computed:{

  },
  methods:{
    getItemName(id){
      let newdata = this.itemList.filter((item) => {
        return item.goodsid == id
      })
      return newdata[0] ? newdata[0].goodsname : ''
      // console.log(newdata[0])
    },

    //当选择goodsid后，显示对象的goodsname(双向绑定)，以及在原货位号的下拉列表中显示所有存在该商品的货位号以供选择
    selectGoodsid(){
      console.log(this.itemList)
        axios.get(`http://localhost:8088/move/getStorageIdByGoodsid/goodsid=${this.formFilter.goodsid}`)
        .then(res => {
          console.log(res)
          this.storageIdSet = res.data

          // this.datalist = res.data.list
          // this.formFilter.pagetotal = res.data.total
        })
        .catch(res => {
        })

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
      for(var j in this.tableColumns.data){
        if(this.tableColumns.data[j].quantity != undefined && this.tableColumns.data[j].quantity != NaN){
          total += +this.tableColumns.data[j].quantity;
        }
      }
      this.formFilter.quantity = total;
      document.getElementById('orderquantity').value = total;
      console.log(total)
      console.log(this.formFilter.quantity)

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
      if(this.formFilter.suppliermanagementid != undefined){
        this.cusIsAble = true;
      }else{
        this.cusIsAble = false;
      }
    },
    selectCustomer(){
      //console.log(this.formFilter.customerid);
      if(this.formFilter.customerid != undefined){
        this.supIsAble = true;
      }else{
        this.supIsAble = false;
      }
      //console.log(this.formFilter.customerid);
    },
    //显示弹框,类似于created方法
    show(){
      this.supIsAble = false;
      this.cusIsAble = false;
      this.add = true;
      this.formFilter = {};
      this.formFilter.creater = '尹波';
      this.formFilter.num = 1;
      this.tableColumns.data = [];
      this.formFilter.createdate = new Date();
      this.formFilter.quantity = '0';

      //加载页面时获取商品id传递给页面
      axios.get('http://localhost:8088/move/getAllItems')
      .then(res => {

        this.itemList = res.data

        // this.datalist = res.data.list
        // this.formFilter.pagetotal = res.data.total
      })
      .catch(res => {
      })
    },
    ok(){
      this.loading = false
      setTimeout(()=>{this.loading = true},0)
      if(this.tableColumns.data.length == 0){
        this.$Message.error('明细表不能为空');
        this.add = true
        setTimeout(()=>{this.loading = true},0)
        this.loading = false
        return
      }else{
        axios.post(sessionStorage.http+'/addOrder',{order:this.formFilter,orderdetail:this.tableColumns.data})
        .then((res) =>{
          console.log(res.data)

        })
        .catch((err) => {
           iview.Message.error({
             content:err.message,
             duration:5
           });
        })
        console.log(this.tableColumns.data)
        this.add = false;
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
             invUomCode:'个',
             batchNo:'',
             quantity:0,
             recvquantity:0,
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
    // //默认查询所有入库单
    // // 查询任务类型
    // //查询客户
    // //查询供应商
    // axios.post(sessionStorage.http +'/getInOrderDetailInit')
    // .then((res) =>{
    //   // console.l/og(res)
    //   this.taskList = res.data.taskTypes;
    //   this.customerList = res.data.customerInfos;
    //   this.supplierList = res.data.supplierManagements;
    //   this.deptList = res.data.department;
    //
    // })
    // .catch((err) => {
    //    iview.Message.error({
    //      content:err.message,
    //      duration:5
    //    });
    // })
  }
}
</script>

<style lang="css">
</style>
<style lang="less" scoped>
    .font{
      position: absolute;
      left: -75px;
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
      left: -50px;
    }
    .fontdetail{
      position: absolute;
      left: -150px;
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
