<template lang="html">
  <Modal v-model="labelModel" width='800px' :loading='loading' :footer-hide = '!isConfirm'>
      <p slot="header" style="text-align:left;font-size:16px"><span>标签信息录入</span></p>
      <div class='labelInfoModel'>
      <Table  ref="selection" stripe border :columns="labelInfoTable.card" :data="labelInfoTable.data"></Table>
      </div>
      <div slot="footer" style="text-align:right;">
        <i-button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;padding:0"  @click="allot" >确认</i-button>
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
      //重复点击使用
      checkBtn:true,
      storage:{},
      //托盘信息
      trayrow:{},
      //生成托盘的数据
      needdelrow:[],
      labelModel:false,
      loading:false,
      trayInfo:{

      },
      isConfirm:true,
      outOrder:{},
      labelInfoTable:{
        card:[
            // {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center',fixed: 'left'},
            {title: '标签种类',key: 'labelKind',width:120,align: 'center', render: (h, params) => {
              if(this.outOrder.standby4 == '2' && params.row.labelKind == '0'){
                return  h('span','不合格')
              }
              if(this.outOrder.standby4 == '2' && params.row.labelKind == '1'){
                return  h('span','合格')
              }
              let options = [];
              options.push(h("Option",{props:{value:'0'}},'不合格'));
              options.push(h("Option",{props:{value:'1'}},'合格'));
              return h('Select', {
                props:{
                    value: params.row.labelKind
                },
                style:{
                  width:'80px',
                  'margin-bottom':'12px',
                },
                on:{
                  'on-change':(labelKind) => {
                    params.row.labelKind = labelKind
                    this.labelInfoTable.data[params.index] = params.row
                  }
                }
              },options)
            }},
            {title: '标签张数',key: 'labelQuantity',width:180,align: 'center', render: (h, params) => {
                  if(this.outOrder.standby4 == '2'){
                    return  h('span',params.row.labelQuantity)
                  }
                   return h('InputNumber', {
                       props: {
                       //将单元格的值给Input
                          value:params.row.labelQuantity,
                          'min':0,
                       },
                       style: {
                         width:"60px",
                       },
                       on:{
                         'on-change':(value)=> {
                           if (value > params.row.itemQuantity) {
                             this.$Message.error("标签数大于物料数量")
                               params.row.labelQuantity = params.row.itemQuantity
                               this.labelInfoTable.data[params.index] = params.row
                              return
                           }
                            params.row.labelQuantity = value
                            this.labelInfoTable.data[params._index] = params.row
                         }
                       }
                     })

                 }},
            {title: '物料编号',key: 'itemCode',width:125,align: 'center'},
            {title: '物料数量',key: 'itemQuantity',width:125,align: 'center'},
            {title: '库存批号',key: 'stockBatch',width:240,align: 'center'}
        ],
        data:[]
      }
    }
},
methods:{
  neederow(row){
    this.needdelrow = row;
  },
  //确认分配
  //参数:needdelrow,storage
  allot(){
    if(this.checkBtn){
      this.checkBtn = false
      setTimeout(() => {
        this.checkBtn = true
      },3000)
      this.loading = false;
      setTimeout(()=>{this.loading = true},0);
      for(var i = 0 ;  this.labelInfoTable.data.length > i;i++){
        var label =  this.labelInfoTable.data[i]
        if((label.labelKind == null || label.labelKin == '') || (label.labelQuantity == 0)){
          this.$Message.error('请填写好第'+(i+1)+"行数据");
          return
        }
      }
      //setStorageForVendor
      //console.log(this.needdelrow[0])
      this.trayrow.loginStatus = sessionStorage.loginStatus;
      axios.post(sessionStorage.http+`/outOrder/saveLabelInfo?loginStatus=${sessionStorage.loginStatus}`,this.labelInfoTable.data)
      .then((res) =>{
        //console.log(res);
        if(res.data == true){
          this.$Message.success(res.message);
          document.getElementById('queryOutOrder').click();
          this.labelModel = false
        }else{
          this.$Message.success(res.message);
        }
      })

    }else{
      iview.Message.error({
        content: '请不要重复操作!',
        duration:5
      })
    }
  },
  //返回
  back () {
      this.labelModel = false;
  },
  showTable(){
    console.log(this.labelInfoTable.data);
  },
  //显示弹框
  show(outOrder){
    // this.needdelrow = row;
    this.outOrder = outOrder
    if(outOrder.standby4 == "1"){
        this.isConfirm = false
    }
    if(outOrder.standby4 == "0"){
        this.isConfirm = true
    }
    //查询入库单明细
    axios.post(sessionStorage.http+`/outOrder/queryOutDetailLabel?loginStatus=${sessionStorage.loginStatus}`,outOrder)
    .then((res) =>{
      if(res.data == false){
        this.$Message.error(res.message);
        this.labelModel = false;
        return
      }
      this.labelModel = true;

      this.labelInfoTable.data = res.data
    })

  },
  cancel(){}
},

created(){
  }
  // this.initFormatter()
}
</script>

<style lang="less">
.labelInfoModel{
  th .ivu-table-cell{
        font-size: 12px !important;
        font-weight: bold;
        color:#333;
      }
      .ivu-table-wrapper{
        overflow: inherit !important;
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
}
</style>
<style lang="less" scoped>
</style>
