<template lang="html">
  <Modal v-model="orderForZANCUN" width='1400px' :loading='loading'>
      <p slot="header" style="text-align:left;font-size:16px"><span>暂存入库单</span></p>
      <div class='orderForZANCUN'>
        <Row>

          <Col span='24' style='text-align:right'>
            <Button shape="circle" @click="allot" type="primary"  style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;">出库</Button>
          </Col>

        </Row>
        <br/>
      <Table  ref="selection" stripe border :columns="orderForZANCUNTable.card" :data="orderForZANCUNTable.data" @on-selection-change="neederow"></Table>
      </div>
      <div slot="footer" style="text-align:right;">
        <!-- <i-button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;padding:0"  @click="allot">确认分配</i-button> -->
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
      orderForZANCUN:false,
      loading:false,
      trayInfo:{

      },
      orderForZANCUNTable:{
        card: [
          {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
          {title: '序号',key: 'lineNo',width: 100,align: 'center',render:(h,params)=>{
            return h("div",+params.row._index + 1)
          }},
          {title: '入库单号',key: 'incomingNotice',width:200,align: 'center'},
          {title: '移动类型',key: 'movetype', width: 200,align: 'center',render: (h, params) => {
            if(params.row.movetype=='GPT01'){
              // alert('2222222')
              return h('span','空托盘入库');
            }else if(params.row.movetype=='GPT02'){
              return h('span','二次包装入库');
            }else if(params.row.movetype=='GPT03'){
              return h('span','其他入库');
            }else if(params.row.movetype=='GPT04'){
              return h('span','拼盘入库');
            }else if(params.row.movetype=='GPT05'){
              return h('span','贴签证入库');
            }else if(params.row.movetype=='GPT06'){
              return h('span','采购入库');
            }else if(params.row.movetype=='GPT07'){
              return h('span','车间退库入库');
            }else if(params.row.movetype=='GPT08'){
              return h('span','车间停产退库入库');
            }else if(params.row.movetype=='GPT09'){
              return h('span','车间异常退库入库');
            }else if(params.row.movetype=='GPT010'){
              return h('span','生产入库');
            }else if(params.row.movetype=='GPT011'){
              return h('span','销售退货入库');
            }else if(params.row.movetype=='GPT012'){
              return h('span','转标准入库');
            }else if(params.row.movetype=='GPT013'){
              return h('span','暂存入库');
            }

            // console.log(params)
            // return h('div',+);
            }},
          {title: '预计入库日期', key: 'createdate',width:200,align: 'center'},   //新增
          {title: '预计入库总数量',key: 'quantity',width: 200 ,align: 'center'},
          {title: '预计入库总件数',key: 'backupfield1',width: 200 ,align: 'center'},
          {title: '单据来源',key: 'resource',width: 200 ,align: 'center'},
          {title: '创建人',key: 'creater',width: 160 ,align: 'center'},
          {title: '状态', key: 'status',width: 160,align: 'center',render: (h, params) => {
            if(params.row.status=='GPS01'){
              return h('span','申请');
            }else if(params.row.status=='GPS02'){
              return h('span','接收');
            }else if(params.row.status=='GPS03'){
              return h('span','入库中');
            }else if(params.row.status=='GPS04'){
              return h('span','入库完成');
            }

            } }
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
    if(this.needdelrow.length <= 0){
      this.$Message.success('请勾选明细.');
      return
    }
    axios.post(sessionStorage.http+'/outOrder/startTaskForZANCUN?loginStatus='+`${sessionStorage.loginStatus}`,this.needdelrow)
    .then((res) =>{
      // console.log(res)
      // this.orderForZANCUNTable.data = res.data
      if(res.message == 'success'){
        console.log()
        this.$Message.success('出库成功.');
        this.orderForZANCUN = false;
        return
      }
      this.$Message.error(res.message);
      // console.log(this.orderForZANCUNTable.data);
      // console.log(res);
    })
    // if(this.checkBtn){
    //   this.checkBtn = false
    //   setTimeout(() => {
    //     this.checkBtn = true
    //   },3000)
    //   this.loading = false;
    //   setTimeout(()=>{this.loading = true},0);
    //   if(this.needdelrow.length > 1 ){
    //     this.$Message.error('只允许选择一个货位');
    //     setTimeout(()=>{this.loading = true},0);
    //     this.orderForZANCUN = true;
    //     this.loading = false;
    //     return
    //   }else if(this.needdelrow.length < 1){
    //
    //     this.$Message.error('请勾选一个货位,进行分配.');
    //     setTimeout(()=>{this.loading = true},0);
    //     this.orderForZANCUN = true;
    //     this.loading = false;
    //
    //   }else{
    //     //setStorageForVendor
    //     //console.log(this.needdelrow[0])
    //     this.trayrow.loginStatus = sessionStorage.loginStatus;
    //     axios.post(sessionStorage.http+`/setStorageForVendor?loginStatus=${sessionStorage.loginStatus}`,{vendor:this.trayrow,storageInfo:this.needdelrow[0]})
    //     .then((res) =>{
    //       //console.log(res);
    //       if(res.message == '1'){
    //         this.orderForZANCUN = false;
    //         this.$Message.success('分配成功.');
    //         document.getElementById('searchtray').click();
    //       }
    //       if(res.message == '0'){
    //         this.$Message.error('分配失败.');
    //         setTimeout(()=>{this.loading = true},0);
    //         this.orderForZANCUN = true;
    //         this.loading = false;
    //       }
    //       if(res.message == '-1'){
    //         this.$Message.error('用户未登录.');
    //         setTimeout(()=>{this.loading = true},0);
    //         this.orderForZANCUN = true;
    //         this.loading = false;
    //       }
    //     })
    //   }
    // }else{
    //   iview.Message.error({
    //     content: '请不要重复操作!',
    //     duration:5
    //   })
    // }
  },
  //返回
  back () {
      this.orderForZANCUN = false;
  },
  showTable(){
    console.log(this.orderForZANCUNTable.data);
  },
  //显示弹框
  show(){
    this.needdelrow = []
    // console.log(vendorData);
    // this.trayrow = row;
    // this.needdelrow = row;

    //查询入库单明细
    axios.post(sessionStorage.http+'/outOrder/queryZANCUN?loginStatus='+`${sessionStorage.loginStatus}`)
    .then((res) =>{
      // console.log(res)
      this.orderForZANCUNTable.data = res.data
      // console.log(this.orderForZANCUNTable.data);
      // console.log(res);
    })
    this.orderForZANCUN = true;
  },
  cancel(){}
},

created(){
  }
  // this.initFormatter()
}
</script>

<style lang="less">
.orderForZANCUN{
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
      // .ivu-table-overflowY {
      //   overflow-y: scroll;
      // }
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
