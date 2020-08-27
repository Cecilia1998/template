<template lang="html">
  <Modal v-model="storagelist" width='1400px' :loading='loading'>
      <p slot="header" style="text-align:left;font-size:16px"><span>匹配货位</span></p>
      <div class='storagelistmodel'>
      <Table  ref="selection" stripe border :columns="storagelistTable.card" :data="storagelistTable.data" @on-selection-change="neederow"></Table>
      </div>
      <div slot="footer" style="text-align:right;">
        <i-button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;padding:0"  @click="allot">确认分配</i-button>
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
      storagelist:false,
      loading:false,
      trayInfo:{

      },
      storagelistTable:{
        card:[
            {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center',fixed: 'left'},
            {title: '编号',key: 'lineNo',width:75,align: 'center'},
            {title: '库区',key: 'districtname',width:180,align: 'center'},
            {title: '货位号',key: 'storageid',width:125,align: 'center'},
            {title: '托盘号',key: 'barcode',width:125,align: 'center'},
            {title: 'X(层)',key: 'list',width:100,align: 'center'},
            {title: 'Y(排)',key: 'row',width:100,align: 'center'},
            {title: 'Z(列)',key: 'layer',width:100,align: 'center'},
            {title: '货位类型',key: 'type',width:180,align: 'center'},
            {title: '货位状态',key: 'typeName',width:180,align: 'center'},
            {title: '客户/供应商',key: 'storageHolder',width:210,align: 'center'},
            {title: '上限',key: 'upwarning',width:75,align: 'center'},
            {title: '下限',key: 'downwarning',width:75,align: 'center'}

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
      if(this.needdelrow.length > 1 ){
        this.$Message.error('只允许选择一个货位');
        setTimeout(()=>{this.loading = true},0);
        this.storagelist = true;
        this.loading = false;
        return
      }else if(this.needdelrow.length < 1){

        this.$Message.error('请勾选一个货位,进行分配.');
        setTimeout(()=>{this.loading = true},0);
        this.storagelist = true;
        this.loading = false;

      }else{
        //setStorageForVendor
        //console.log(this.needdelrow[0])
        this.trayrow.loginStatus = sessionStorage.loginStatus;
        axios.post(sessionStorage.http+`/setStorageForVendor?loginStatus=${sessionStorage.loginStatus}`,{vendor:this.trayrow,storageInfo:this.needdelrow[0]})
        .then((res) =>{
          //console.log(res);
          if(res.message == '1'){
            this.storagelist = false;
            this.$Message.success('分配成功.');
            document.getElementById('searchtray').click();
          }
          if(res.message == '0'){
            this.$Message.error('分配失败.');
            setTimeout(()=>{this.loading = true},0);
            this.storagelist = true;
            this.loading = false;
          }
          if(res.message == '-1'){
            this.$Message.error('用户未登录.');
            setTimeout(()=>{this.loading = true},0);
            this.storagelist = true;
            this.loading = false;
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
  //返回
  back () {
      this.storagelist = false;
  },
  showTable(){
    console.log(this.storagelistTable.data);
  },
  //显示弹框
  show(row,vendorData){
    console.log(vendorData);
    this.trayrow = row;
    // this.needdelrow = row;
    this.storagelist = true;
    //查询入库单明细
    axios.post(sessionStorage.http+`/searchStorage?loginStatus=${sessionStorage.loginStatus}`,row)
    .then((res) =>{
     console.log(res);
      if(res.data != null){
        var storages = [];
        for(var i = 1;i <= res.data.length; i++){
          // res.data[i-1].lineNo = i;
          let flag = true;
          for(var j = 0;vendorData != null && j < vendorData.length; j++){
            if(vendorData[j].storageid == res.data[i-1].storageid){
              flag = false;
              break;
            }
          }
          if(flag){
            storages.push(res.data[i-1])
          }
        }
        for(var i = 1;i <= storages.length; i++){
          storages[i-1].lineNo = i;
        }
        if(storages　!= null && storages.length == 0){
          this.$Message.error('客户/供应商尚未分配货位或者货位已使用完毕');
        }else{
          this.storagelistTable.data = storages;
        }
      }

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
.storagelistmodel{
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
