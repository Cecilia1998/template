<template lang="html">
  <Modal v-model="TaskDetail" :loading='loading' width='1400px' footer-hide :mask-closable='false' >
    <p slot="header" style="text-align:center;font-size:16px">
          <span>质量变更详情</span>
    </p>
    <table  height="100px">
      <tr>
        <td >
          <span class="outBox">
            <span class="blank">&nbsp;&nbsp;</span>
            <span class="redLabel">通知单号</span>
            <span class="textOutput">
              <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
            </span>
          </span>
          <span class="outBox">
            <span class="blank">&nbsp;&nbsp;</span>
            <span class="redLabel">变更凭证号</span>
            <span class="textOutput">
              <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
            </span>
          </span>

        <span class="outBox">
          <!-- <span class="blank">&nbsp;</span> -->
          <span class="redLabel">移动类型</span>
          <span class="textOutput">
            <Select  placeholder="请选择" v-model="formFilter.checktype"

              class="textLongInput"  style="width: 100px;text-align:left;">
              <Option value="Z43">周期养护</Option>
              <Option value="321">检验放行</Option>
              <Option value="343">特批放行</Option>
            </Select>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">检验人</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">变更人</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <!-- <span class="blank">&nbsp;</span> -->
          <span class="redLabel">变更类型</span>
          <span class="textOutput">
            <Select  placeholder="请选择" v-model="formFilter.checktype"

              class="textLongInput"  style="width: 100px;text-align:left;">
              <Option value="1">检验放行</Option>
              <Option value="2">复检</Option>
              <Option value="3">特批放行</Option>
              <Option value="4">物料锁定</Option>
            </Select>
          </span>
        </span>
        <span class="outBox">
          <!-- <span class="blank">&nbsp;</span> -->
          <span class="redLabel">变更方式</span>
          <span class="textOutput">
            <Select  placeholder="请选择" v-model="formFilter.checktype"

              class="textLongInput"  style="width: 100px;text-align:left;">
              <Option value="1">批次部分变更</Option>
              <Option value="2">整批变更</Option>
              <Option value="3">所有物料</Option>
            </Select>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">变更日期</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
      </td>
    </tr>
    <tr>
      <td>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">判定日期</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">在库批号</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">供应商批号</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">供应商/车间</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">物料/产品号</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">物料/产品描述</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">检验批号</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:100px"/>
          </span>
        </span>
      </td>
     <!-- <br>
      <td>
        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">申请时间</span>
          <span class="textOutput" v-model="formFilter.remark" >{{this.date}}</span>
        </span>

        <span class="outBox">
          <span class="blank">&nbsp;&nbsp;</span>
          <span class="redLabel">备&nbsp;注</span>
          <span class="textOutput">
            <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textInput" style="width:300px"/>
          </span>
        </span>
      </td> -->
    </tr>
  </table>


  <br>
    <div class="moveTaskDetail">
     <Form ref="formFilter" :model="formFilter" :label-width="85" :label-height="500" inline style="text-align:left;" >
       <div class="departmenttable">
        <Table stripe ref="addMoveTable" border :data="addMoveTable.dataList" :columns="addMoveTable.columns" height=400 style="margin-top:20px;"></Table>
      </div>
     </Form>
       &nbsp;
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
      formFilter:{},
      //默认情况下弹框不显示
      TaskDetail:false,
      loading:true,

      id:'',

      //选中行任务信息
      rowInfo:'',

      row:'',
      needdelrow:[],
      delete_confirm:false,
      supIsAble:false,
      cusIsAble:false,


      //所有的商品集合
      itemList:[

      ],




      lDetail:1,


      //新增移库相关信息，前端整行数据
      dataLists: [],

      //货位号和托盘号一一对应的集合
      torageIdAndTraNoList:[],

      //删除选项
      delete_confirm_Order:false,

      addMoveTable: {
         columns: [
           {title: '序号',key: 'seqNum',width: 75,align: 'center',
                         render: (h, params) => {
                           params.row.seqNum = params.index + 1
                            return h('div',params.row.seqNum)
                         }
           },
           {title: '变更凭证号',key: 'moveType',width: 180,align: 'center'},
           {title: '变更凭证行号',key: 'taskId',width:200,align: 'center'},
           {title: '物料号',key: 'origStorageId',width:150,align: 'center'},
           {title: '物料名称',key: 'origStorageType',width:150,align: 'center'},

           {title: '库存批号',key: 'targetStorageId',width:150,align: 'center'},
           {title: '检验批号',key: 'targetStorageType',width:150,align: 'center'},

           {title: '原质量状态',key: 'moveQuantity',width:150,align: 'center'},


           {title: '新质量状态',key: 'remark',width:150,align: 'right'},
           {title: '变更数量',key: 'status',width:150,align: 'center'},
           {title: '计量单位',key: 'status',width:150,align: 'center'},
          {title: '变更后到期日',key: 'status',width:150,align: 'center'},
          {title: '变更后复检期',key: 'status',width:150,align: 'center'},
         ],
         dataList:[]

       },


    }
  },


  methods:{

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


    //显示弹框,类似于created方法,参数为双击选中行的移库单号
    show(moveOrderId){

      //双击事件打开弹框
      this.TaskDetail = true;

      this.id = moveOrderId;

      this.supIsAble = false;
      this.cusIsAble = false;

      this.formFilter = {};

      this.formFilter.createdate = new Date();
      this.formFilter.quantity = '0';




      //加载页面时获取移库单号对应的任务详情  ?loginStatus=${sessionStorage.loginStatus}
      axios.get(sessionStorage.http+`/move/getTaskDetailByMoveOrderId?moveOrderId=${this.id}&loginStatus=${sessionStorage.loginStatus}`)
      .then(res => {

        this.addMoveTable.dataList = res.data
      })
      .catch(res => {

      })

    },


    //删除弹框
    delConfirmOrder(){
      this.delete_confirm_Order = true;
    },

    //勾选触发事件
    onSelectionChange (rows) {
      this.rows = rows;
      if(this.rows.length > 0){
        document.getElementById('delOrder').setAttribute("style","background-color:#fe3838;width:120px;height:28px;");
        document.getElementById('delOrder').removeAttribute("disabled");
      }else{
        document.getElementById('delOrder').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
        document.getElementById('delOrder').setAttribute("disabled","disabled");
      }
    },


  },


}
</script>

<style lang="less">
.moveTaskDetail{
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
     .ivu-input-icon-normal+.ivu-input{
       width: 120px;
     }
}
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
