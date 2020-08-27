<template lang="html">
  <Modal v-model="detailTray" width='1200px'>

    <p slot="header" style="text-align:center;font-size:16px"><span>托盘记录查询</span></p>
    <div class="allotstoragedetailmodel">
      <Form ref="trayInfo" :model="trayInfo" :label-width="85" inline style="text-align:left;" >
        <div>&nbsp;</div>
        <Row>
          <Col span="24">
            <div style="text-align:left;"><font style="text-align:left;font-size:16px" color="#59a6fe">托盘记录信息</font></div>
          </Col>
        </Row>
        <div>&nbsp;</div>
        <Row>
          <Col span="1">&nbsp;</Col>
          <Col span="23">
            <Row>
              <Col span="4">
                <Form-item label="托盘号:" prop="order_id" status-icon >
                  <label style="font-size:12px">{{trayInfo.palletCode}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="仓库:">
                  <label style="font-size:12px">{{trayInfo.warehouseName}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="库区:">
                  <label style="font-size:12px">{{trayInfo.districtName}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="货位:">
                  <label style="font-size:12px">{{trayInfo.storageId}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="X(层):">
                  <label style="font-size:12px">{{trayInfo.list}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="Y(排):">
                  <label style="font-size:12px">{{trayInfo.row}}</label>
                </Form-item>
              </Col>

            </Row>
            <Row>
              <Col span="4">
                <Form-item label="Z(列):">
                  <label style="font-size:12px">{{trayInfo.layer}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="Z(列):">
                  <label style="font-size:12px">{{trayInfo.deep}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="件数:" style="width: 100%;">
                  <label style="font-size:12px">{{trayInfo.totalNum}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="重量:" style="width: 100%;">
                  <label style="font-size:12px">{{trayInfo.totalWeight}}</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="分配方式:" style="width: 100%;">
                  <label  v-if="trayInfo.allotType == 'HAND'">手动</label>
                  <label  v-if="trayInfo.allotType == 'AUTO'">自动</label>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="状态:" style="width: 100%;">
                  <label  v-if="trayInfo.status == '0'">组盘中</label>
                  <label  v-if="trayInfo.status == '1'">组盘完成</label>
                </Form-item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span="4">
            <font style="font-size:16px" color="#59a6fe" >托盘明细:</font>
          </Col>
          <Col span="6">
            <!-- <Button shape="circle" style="width:120px;height:28px;background-color:#b4b4b4" disabled @click="" id='createtray'><font style="size:24px">生成托盘</font></Button> -->
          </Col>
        </Row>
        <br>
        <Row>
          <Col span="24">
            <Table  ref="selection" stripe border :columns="trayDetailTable.card" :data="trayDetailTable.data"></Table>
          </Col>
        </Row>
      </Form>
      </div>
      <div slot="footer">
          <i-button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="back">返&nbsp;&nbsp;回</i-button>
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
      //生成托盘的数据
      needdelrow:[],
      delete_confirm:false,
      detailTray:false,
      loading:false,
      trayInfo:{

      },
      trayDetailTable:{
        card:[
            {title: '编号',key: 'lineNo',width:75,align: 'center',render: (h, params) => {
              return h('div',+params.row._index+1);
              }},
            {title: '物料编号',key: 'materielId',width:130,align: 'center'},
            {title: '物料名称',key: 'materielName',width:130,align: 'center'},
            {title: '仓库编号',key: 'warehouseId',width:100,align: 'center'},
            {title: '仓库名称',key: 'warehouseName',width:100,align: 'center'},
            {title: '库区标号',key: 'districtId',width:100,align: 'center'},
            {title: '库区名称',key: 'districtName',width:180,align: 'center'},
            {title: '货位编号',key: 'storageId',width:100,align: 'center'},
            {title: '托盘号',key: 'palletCode',width:100,align: 'center'},
            {title: '数量',key: 'num',width:100,align: 'center'},
            {title: '重量',key: 'weight',width:100,align: 'center'},
            {title: '零件数量',key: 'partWeight',width:100,align: 'center'},
            {title: '包装规格',key: 'packageStandards',width:210,align: 'center'},
            {title: '单位',key: 'unit',width:100,align: 'center'},

            {title: '库区批号',key: 'checkBatch',width:120,align: 'center'},
            {title: '是否生成托盘',key: 'remark1',width:240,align: 'center',render:(h,params)=>{
              let text = '';
              if(params.row.iscreate == '0'){
                text= '组盘中'
              }
              else{
                text= '组盘完成'
              }
              return h('div',text)
            }},

        ],
        data:[]
      }
    }
},
methods:{
  //返回
  back () {
      this.detailTray = false;
  },
  showTable(){
    console.log(this.trayDetailTable.data);
  },
  //显示弹框
  show(row){
    console.log(row);
    this.detailTray = true;
    this.trayInfo = row;
    //查询入库单明细
    row.loginStatus = sessionStorage.loginStatus;
    axios.post(sessionStorage.http+`/getVendorDetaiByTrayId?loginStatus=${sessionStorage.loginStatus}`,row)
    .then((res) =>{
      console.log(res);
      for(var i = 1;i <= res.data.length; i++){
        res.data[i-1].lineNo = i;
      }
      this.trayDetailTable.data = res.data;
    })
    .catch((err) => {
      iview.Message.error({
        content:err.message,
        duration:5
      });
    })

  },
  ok(){

  },
  cancel(){},


},

created(){
  }
  // this.initFormatter()
}
</script>

<style lang="less">
.allotstoragedetailmodel{
  .ivu-form-item-content{
    line-height: 43px;
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
