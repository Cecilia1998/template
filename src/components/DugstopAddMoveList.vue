<template lang="html">
  <div class="dugstopAddMoveList">
  <Modal
      :mask-closable='false'
      footer-hide
      v-model="addMoveOrder"
      :loading='loading'
      width='1300px'
      >

      <p slot="header" style="text-align:center;font-size:16px">
            <span>药品停用新增</span>
      </p>
      <div class="dugstopAddMoveList">
     <Form ref="formFilter" :model="formFilter" :label-width="85" :label-height="500" inline style="text-align:left;" >

         <Row>
           <Col span='22' style="text-align:left">
               &nbsp;&nbsp;&nbsp;
               <Button shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" disabled  @click="delConfirmOrder" id='delMoveInfo' icon="md-trash" :disabled='deDis' >删除选中项</Button>
           </Col>
           <Col span='2' style="text-align:left">
             <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="addDugStopOrder">新&nbsp;&nbsp;增</Button>
           </Col>
         </Row>

         <div class="departmenttable">
           <Table stripe ref="addMoveTable" border :data="addMoveTable.dataList" :columns="addMoveTable.columns" height=400 style="margin-top:20px;"  @on-selection-change="onSelectionChange"></Table>
         </div>




          <!-- 删除确认弹框 -->
           <Modal v-model="delete_confirm_Order" width="360">
             <p slot="header" style="color:#f60;text-align:center">
               <Icon type="ios-information-circle"></Icon>
               <span>删除确认</span>
             </p>
             <div style="text-align:center">
               <span style="font-size:14px">确定要删除吗？</span>
             </div>
             <div slot="footer">
               <Button type="error" size="large" shape="circle" style="width:120px;" @click="deleteSelectionOrder">确定删除</Button>
             </div>
           </Modal>



           </Form>
      </div>

     <br>
     <div class="" style="display:flex;justify-content:space-between">
       <div class="">
          &nbsp;
       </div>
       <div >
         <Button type="primary" shape="circle" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="saveMoveOrder">提&nbsp;&nbsp;交</Button>
       </div>
     </div>

  </Modal>
</div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design' //
export default {

  data () {
    return {
      //删除选中项的显示状态
      deDis:true,
        checkDetailsByBatchnoAndItemcodeAndStorageid:{stocknumber:'',loginStatus:sessionStorage.loginStatus}, //批次号和零件号和货位号的选择条件
      //选中行的数据
      rows:[],

      formFilter:{},
      //modal的显示属性
      addMoveOrder:false,
      loading:true,

      //登陆态
      loginStatus:sessionStorage.loginStatus,

      //质检状态集合
      testStatusList:[' ','合格','质检','AAA'],
      //所有的商品编号的集合
      partCodeList:[],
      //所有的库存编号的集合
      stocknumberList:[],
      //所有的货位号的集合
      storageList:[],
      //库区集合
      targetDistrictList:[],

      //新增的一行数据
      newAMoveOrder:{
        itemcode:'',
        itemname:'',
        stocknumber:'',   //批次号
        putindate:'',
        deleteflag:'',

      },

      needdelrow:[],
      delete_confirm:false,
      supIsAble:false,
      cusIsAble:false,


      //所有的商品集合
      itemList:[],

      //删除选项
      delete_confirm_Order:false,


      addMoveTable: {
        //过渡作用，
        dataList:[],
        columns: [
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},

           {title: '物料号',key: 'itemcode',align: 'center'},
           {title: '物料/成品描述',key: 'itemname',align: 'center'},
           {title: '库存批号',key: 'stocknumber',align: 'center',
           render: (h, params) => {
                                 return h('Select',
                                      {style:{
                                        width:'120px',
                                        marginBottom:'11px'
                                       },
                                       props:{
                                         //将单元格的值给Select
                                         value:params.row.stocknumber,
                                       },
                                       on: {
                                         // 'on-change':(event)=> {
                                         //                      this.checkDetailsByBatchnoAndItemcodeAndStorageid.partCode = event.target.value;
                                         //                    },
                                         //下拉菜单点击事件-->后台查询商品编号对应的相关信息，添加到table中,此处的event是选中的商品编号 002
                                         'on-change':(event) => {
                                           console.log("结果")
                                           console.log(event)
                                            this.checkDetailsByBatchnoAndItemcodeAndStorageid.stocknumber = event;
                                            if(this.checkDetailsByBatchnoAndItemcodeAndStorageid.stocknumber!=''){
                                            axios.post(sessionStorage.http+`/getStockForDugStop`,this.checkDetailsByBatchnoAndItemcodeAndStorageid)
                                           .then(res => {
                                             console.log(res)
                                             //定义2个变量，供删除数组使用
                                             var num = 0;
                                             var num2 = 0;
                                              //如果行数据有空，则删除
                                             this.addMoveTable.dataList.forEach((item) => {
                                               if(item.putindate == ''){
                                                 num--;
                                                 num2++;
                                               }
                                             })
                                             this.addMoveTable.dataList.splice(num,num2);


                                             //后台获取的集合每一个对象添加一个extra的属性
                                             res.data.list.forEach((item) => {item.extra = false});

                                             //遍历集合，以正确的字段重新命名
                                             for(var i=0;i<res.data.list.length;i++){

                                               //初始状态为空
                                               res.data.list[i].insertId = this.loginStatus
                                               res.data.list[i].createDate = new Date().Format("yyyy-MM-dd hh:mm:ss")  //申请日期
                                               // res.data[i].warehouseType = res.data[i].warehouseInfo.warehousename
                                               this.addMoveTable.dataList.push(res.data.list[i])
                                             }


                                             if(params.row.itemcode != ''){
                                                 for(var i=0,flag=true,len=this.addMoveTable.dataList.length;i<len;flag ? i++ : i){
                                                     if(this.addMoveTable.dataList[i].stocknumber == params.row.stocknumber){
                                                        this.addMoveTable.dataList.splice(i,1)
                                                        flag=false
                                                     }else{
                                                       flag=true
                                                     }
                                                 }
                                             }

                                             this.checkDetailsByBatchnoAndItemcodeAndStorageid = {stocknumber:'',loginStatus:sessionStorage.loginStatus};
                                             //值改变时
                                             //将渲染后的值重新赋值给单元格值
                                             params.row.stocknumber = event;
                                             //this.addMoveTable.dataList[params.index] = params.row;

                                           })

                                         }



                                         },
                                       },
                                   },
                                   this.stocknumberList.map(function(type){
                                       return h('Option', {
                                           props: {value: type}
                                       }, type);
                                   })

                                   );
                               },},

           {title: '入库日期',key: 'putindate',align: 'center'},
           // {title: '原库区',key: 'origDistrict',width:150,align: 'center'},

         {title: '冻结标志', key: 'deleteflag',width:120,align: 'center', render:(h,params)=>{
             let islabel = '';
             if(params.row.freezingMark == 'X'){
               islabel = '冻结';
             }else{
               islabel = '可用';
             }
             return h('div',freezingMark);
           }},
         ]



       },
       tempArray:[]

    }
  },


  methods:{

    //提交按钮触发事件，将满足要求的移库数据新增到数据表中
    saveMoveOrder(){

        axios.post('http://localhost:8088/dug/addDugStopOrder',{loginStatus:this.loginStatus,dugStopList:this.addMoveTable.dataList})
        .then((res) =>{

          if(res.message == "0"){
            iview.Message.error({
              content:"未输入有效数据",
              duration:5
            });

          }else{
            iview.Message.error({
              content:res.message,
              duration:5
            });
          }
            this.delete_confirm_Order = false;
        })
        .catch((err) => {
           iview.Message.error({
             content:err.message,
             duration:5
           });
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



    //比较时间
    dueAndPruTime(dueid,proid,params){
      let dueTime = new Date(document.getElementById(dueid).value);
      let proTime = new Date(document.getElementById(proid).value);


      if(dueTime.getTime() < proTime.getTime()){

        document.getElementById(dueid).value = null;

        this.$Message.error('到期日不可小于当前时间');

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

      if(this.formFilter.customerid != undefined){
        this.supIsAble = true;
      }else{
        this.supIsAble = false;
      }

    },
    //显示弹框,类似于created方法

    show(){
      //弹窗显示
      this.addMoveOrder = true;
      this.loading = false;

      // table表格的默认数据
      this.addMoveTable.dataList = [
        {
          itemcode:'',
          itemname:'',
          stocknumber:'',   //批次号
          putindate:'',
          deleteflag:'',
        }
      ];



      //获取所有的商品编号，传给partCode字段的select列表中
      axios.get(sessionStorage.http+`/move/getUsableItemCodeSet?loginStatus=${sessionStorage.loginStatus}`)
      .then(res => {
        this.partCodeList = res.data
      })
      .catch(res => {
      })

      axios.get(sessionStorage.http+`/move/getUsableStockNumberSet?loginStatus=${sessionStorage.loginStatus}`)
      .then(res => {

        this.stocknumberList = res.data
      })
      .catch(res => {
      })

    },

    //提交按钮触发事件，将所有符合规则的移库信息提交到数据库
    ok(){
      this.loading = false
      setTimeout(()=>{this.loading = true},0)

      axios.post(sessionStorage.http+'/move/addMoveOrder',{LoginStatus:this.loginStatus,moveOrderList:this.addMoveTable.dataList})

      .then((res) =>{

        this.addMoveOrder=false

        //document.getElementById('getNewData').click()
      })
      .catch((err) => {

        this.addMoveOrder = true
        setTimeout(()=>{this.loading = true},0)
        this.loading = false
        return


         iview.Message.error({

           content:err.message,
           duration:5
         });
      })


    },



    //select事件更改选中行格式，删除选中项变为abled,每次选中按钮都会触发
    onSelectionChange (rows) {

      this.rows = rows;

      // for(var i=0;i<this.rows.length;i++){
      //   this.rows[i].extra = !this.rows[i].extra
      // }


      if(this.rows.length > 0){
        this.deDis = false
        document.getElementById('delMoveInfo').setAttribute("style","background-color:#fe3838;width:120px;height:28px;color:white");
      }else{
        document.getElementById('delMoveInfo').setAttribute("style","background-color:white;width:120px;height:28px;");
        this.deDis = true
      }
    },

    //删除事件
    deleteSelectionOrder(){

          for(var i=0;i<=this.addMoveTable.dataList.length;i++){
            for(var j=0;j<this.rows.length;j++){
              if(JSON.stringify(this.addMoveTable.dataList[i]) == JSON.stringify(this.rows[j])){

                this.addMoveTable.dataList[i].extra = true;
              }
            }
          }


      for(var i=0,flag=true,len=this.addMoveTable.dataList.length;i<len;flag ? i++ : i){
          if(this.addMoveTable.dataList[i] && this.addMoveTable.dataList[i].extra == true){
             this.addMoveTable.dataList.splice(i,1)
             flag=false
          }else{
            flag=true
          }
      }

      this.delete_confirm_Order = false;

      //重新定义"删除选中项"的按钮的格式
      document.getElementById('delMoveInfo').setAttribute("style","background-color:white;width:120px;height:28px;");
      this.deDis = true

    },
    //删除弹框
    delConfirmOrder(){
      this.delete_confirm_Order = true;
    },



    //点击新增在table中新增一行数据
    addDugStopOrder(){

      document.getElementById('delMoveInfo').setAttribute("style","background-color:white;width:120px;height:28px;");
      this.deDis = true;
      this.addMoveTable.dataList.push(this.newAMoveOrder);
    },




    //得到时间
    getCreatDate(createdate){
      this.formFilter.createdate = changeDate(createdate);

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

</style>
<style lang="less">
.dugstopAddMoveList{
  .ivu-table-cell{
    overflow: inherit;
  }
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
