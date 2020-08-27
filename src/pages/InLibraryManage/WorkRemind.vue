<template lang="html">
  <div :class="getCommons('workRemind')">

    <div id="deleteBtn" style="display:flex;justify-content:space-between;">
      <div class="">
        <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
            <Form-item label="工作类别" >
              <!-- v-model中为该控件代表的model的字段值，需要绑定model的某一字段，否则model中取不到该字段值@on-change="getAllMenuByroleId" -->
              <Select v-model="formFilter.remind" clearable placeholder="请选择">
                <Option v-for="item in workTypeList"  :key="item.taskId" :value="item.taskId">{{item.typeName}}</Option>
              </Select>
            </Form-item>
        </Form>
      </div>

      <div class="">
        <Button type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='modal = true'>新&nbsp;&nbsp;增</Button>
      </div>
    </div>

    <div class="">
     <Table height="650"  stripe border :columns="tableColumns.card" :data="tableColumns.data"  @on-row-dblclick="updateSelection"></Table>
    </div>


    <div class="page">
      &nbsp;
      <Page  show-sizer show-elevator show-total :total="total"  :current="formFilter.curPage" :page-size="formFilter.pageSize"  :page-size-opts="[10,20,30]"  @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
    </div>


    <Modal class="modal_remind" v-model="modal" width="800px" :styles="{top: '85px'}"  :mask-closable="false" @on-cancel="add_cancel">
      <p slot="header" style="text-align:center">
          <span style="font-size:14px">添加工作提醒</span>
      </p>
      <Form ref="insertstorageInfo" :model="newData">
      <Row>
        <Col span="8">
            <Form-item label="工作类别" style="margin-left:34px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
              <Select v-model="newData.remind" placeholder="请选择" @on-change="" style="width: 120px">
                <Option v-for=" item in workTypeList" :key="item.taskId" :value="item.taskId">{{ item.typeName }}</Option>
              </Select>
            </Form-item>
        </Col>

        <Col span="8">
              <Form-item label="提醒开始日期" style="margin-left:0px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <DatePicker type="date" v-model="newData.startDate" placeholder="请选择" style="width: 120px"></DatePicker>
              </Form-item>
        </Col>

        <Col span="8">
            <Form-item label="有效周期/单位" style="margin-left:0px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <InputNumber :max="999" :min="1" v-model="newData.period" style="width: 60px;top:6px"></InputNumber>
                <Select v-model="newData.unit" placeholder="" @on-change="" style="width: 60px;position:absolute:left:0px;top:0px;">
                  <Option v-for=" item in unit" :key="item.unitId" :value="item.unitId">{{ item.unitName }}</Option>
                </Select>
            </Form-item>
          </Form-item>
        </Col>
        <!-- <Col span="5">

        </Col> -->
      </Row>
      <Row>

        <Col span="8">
                <Form-item label="提醒开始时间" style="margin-left:10px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                  <TimePicker format="HH:mm" v-model="newData.startTimeOri" placeholder="请选择" style="width: 120px"></TimePicker>
                </Form-item>
        </Col>
        <Col span="8">
                  <Form-item label="提醒结束时间" style="margin-left:0px;position:relative;">
                      <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                      <TimePicker format="HH:mm" v-model="newData.endTimeOri" placeholder="请选择" style="width: 120px"></TimePicker>
                  </Form-item>
        </Col>

        </Row>

        <Row>
            <Col span="24">
              <Form-item label=" 提醒报文" style="margin-left:34px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
              <Input v-model="newData.warnMessage" type="textarea" placeholder="请输入" :maxlength="50"  :rows="2" :autosize="{minRows: 2,maxRows: 3}" style="width: 368px" />
              </Form-item>
            </Col>

      </Row>
      </Form>

      <div slot="footer">
        <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="addWorkRemind">提交</Button>
      </div>
    </Modal>

    <Modal class="modal_remind" v-model="updateModal" width="800px" :styles="{top: '85px'}"  :mask-closable="false" @on-cancel="add_cancel">
      <p slot="header" style="text-align:center">
          <span style="font-size:14px">修改工作提醒</span>
      </p>
      <Form ref="insertstorageInfo" :model="updateData">
      <Row>
        <Col span="8">
            <Form-item label="工作类别" style="margin-left:34px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
              <Select v-model="updateData.remind" disabled  placeholder="请选择" @on-change="" style="width: 120px">
                <Option v-for=" item in workTypeList" :key="item.taskId" :value="item.taskId">{{ item.typeName }}</Option>
              </Select>
            </Form-item>
        </Col>

        <Col span="8">
              <Form-item label="提醒开始日期" style="margin-left:0px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <DatePicker type="date" v-model="updateData.startDate" placeholder="请选择" style="width: 120px"></DatePicker>
              </Form-item>
        </Col>

        <Col span="8">
            <Form-item label="有效周期/单位" style="margin-left:0px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <InputNumber  :min="1" :max="999" v-model="updateData.period" style="width: 60px;top:6px"></InputNumber>
                <Select v-model="updateData.unit" placeholder="" @on-change="" style="width: 60px;position:absolute:left:0px;top:0px;">
                  <Option v-for=" item in unit" :key="item.unitId" :value="item.unitId">{{ item.unitName }}</Option>
                </Select>
            </Form-item>
          </Form-item>
        </Col>
        <!-- <Col span="5">

        </Col> -->
      </Row>
      <Row>

        <Col span="8">
                <Form-item label="提醒开始时间" style="margin-left:10px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                  <TimePicker format="HH:mm" v-model="updateData.startTimeOri" placeholder="请选择" style="width: 120px"></TimePicker>
                </Form-item>
        </Col>
        <Col span="8">
                  <Form-item label="提醒结束时间" style="margin-left:0px;position:relative;">
                      <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                      <TimePicker format="HH:mm" v-model="updateData.endTimeOri" placeholder="请选择" style="width: 120px"></TimePicker>
                  </Form-item>
        </Col>

        </Row>

        <Row>
            <Col span="24">
              <Form-item label=" 提醒报文" style="margin-left:34px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
              <Input v-model="updateData.warnMessage" type="textarea" placeholder="请输入" :maxlength="50"  :rows="2" :autosize="{minRows: 2,maxRows: 3}" style="width: 368px" />
              </Form-item>
            </Col>

      </Row>
      </Form>

      <div slot="footer">
        <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="updateWorkRemind">保存</Button>
      </div>
    </Modal>


  </div>
</template>

<script>
import axios from "axios";
import iview from 'view-design';
import router from "../../router";
import { getTitles, getButtons } from "../../Util";

export default {
  components: {
  },
  data() {
    return {
      insertstorageInfo:{},
      //登陆态
      loginStatus: localStorage.loginStatus,

      //工作类别集合
      workTypeList:[
        {
          taskId:'',
          typeName:''
        }
      ],


      modal:false, //新增弹框
      updateModal:false, //更新弹框

      clickSt:true, //重复点击

      //新增弹框的数据
      newData:{
        period:null,
      },

      //更新弹框的数据
      updateData:{
        keyId:'',
        remind:'',
        startDate:'',
        period:null,
        unit:'',
        startTimeOri:'',
        endTimeOri:'',
        warnMessage:''
      },


      form1:{
        remark:""
      },

      unit:[
        {unitId:'UNIT1',unitName:'天'},
        {unitId:'UNIT2',unitName:'周'},
        {unitId:'UNIT3',unitName:'月'},
        {unitId:'UNIT4',unitName:'年'}
      ],

      //过滤信息
      formFilter: {
        remind: "", //任务类型
        checkstatus: "",
        // 分页信息
        curPage: 1,
        pageSize: 20
      },

      //重复点击使用
      confirmBtn: true,

      confirm_Order: false,
      confirmstatus1: "",
      confirmstatus2: "",
      confirmlist: [],

      taskList: [
        {
          taskid: "",
          typename: ""
        }
      ],

      loading: false,
      total: 0,


      tableColumns: {
        card: [
          {
            title: "序号",
            key: "lineNo",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row._index +
                  1 +
                  this.formFilter.pageSize * (this.formFilter.curPage - 1)
              );
            }
          },
          { title: "单号", key: "keyId", width: 200, align: "center"},
          { title: "工作类别", key: "remark3", width: 200, align: "center"},
          { title: "提醒开始时间", key: "startTime", width: 200, align: "center" },
          { title: "提醒结束时间", key: "endTime", width: 200, align: "center" },
          { title: "提醒开始日期", key: "startDate", width: 200, align: "center" },
          { title: "有效周期", key: "period", width: 100, align: "center" },
          { title: "提醒报文", key: "warnMessage", align: "center" },
        ],
        data: []
      }
    };
  },
  created() {
    this.getTaskTypeList('TT14');
    this.queryData();
  },

  methods: {
    //获取工作类别集合
    getTaskTypeList(flag){
      axios
      .get(
        localStorage.http +
          `/taskType/getTaskTypeList?flag=${flag}&loginStatus=${localStorage.loginStatus}`
       )
      .then(res => {
        this.workTypeList = res.data;
      });

    },

    //新增工作提醒
    addWorkRemind(){

      if(!this.clickSt){
          return
        }

      if(this.newData.remind==null || this.newData.remind==""){
        this.$Message.error("工作类别不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.startDate==null || this.newData.startDate==""){
        this.$Message.error("提醒开始日期不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.period==null || this.newData.period==""){
        this.$Message.error("有效周期不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      if(this.newData.unit==null || this.newData.unit==""){
        this.$Message.error("单位不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.startTimeOri==null || this.newData.startTimeOri==""){
        this.$Message.error("提醒开始时间不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      if(this.newData.endTimeOri==null || this.newData.endTimeOri==""){
        this.$Message.error("提醒结束时间不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }


      if(this.newData.endTimeOri <= this.newData.startTimeOri){
        this.$Message.error("提醒结束时间不能小于开始时间");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.warnMessage==null || this.newData.warnMessage==""){
        this.$Message.error("提醒报文不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      this.newData.startTime = this.newData.startDate.getFullYear() + '-' + (this.newData.startDate.getMonth()+1) + '-' + this.newData.startDate.getDate() + ' '+ this.newData.startTimeOri;
      this.newData.endTime = this.newData.startDate.getFullYear() + '-' + (this.newData.startDate.getMonth()+1) + '-' + this.newData.startDate.getDate() + ' '+ this.newData.endTimeOri;

      axios.post(localStorage.http+`/workRemind/insertWorkRemind?loginStatus=${sessionStorage.loginStatus}`,this.newData)
       .then((res)=>{
          if(res.Data == '1'){
            this.$Message.success('工作提醒信息新增成功');
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)
            return;
          }

      }),

      //新增数据清空
      this.newData = {period:null};

      //关闭弹框
      this.modal = false;

      //重新查询主页面数据
      this.queryData();

    },

    //双击显示数据
   async updateSelection(res){


      //通过主键查询对应的数据信息
      let item = await this.queryDataById(res.keyId);


      //处理数据
      this.updateData.keyId = item.keyId
      this.updateData.remind = item.remind
      this.updateData.startDate = item.startTime.substr(0,10),
      this.updateData.period = + item.period
      this.updateData.unit = item.unit
      this.updateData.startTimeOri = item.startTime.substr(11,5),
      this.updateData.endTimeOri = item.endTime.substr(11,5),
      this.updateData.warnMessage = item.warnMessage

      //显示更新弹框
      this.updateModal = true;
    },

    //更新工作提醒
    updateWorkRemind(){
      if(!this.clickSt){
        return
      }

      if(this.updateData.remind==null || this.updateData.remind==""){
        this.$Message.error("工作类别不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.updateData.startDate==null || this.updateData.startDate==""){
        this.$Message.error("提醒开始日期不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.updateData.period==null || this.updateData.period==""){
        this.$Message.error("有效周期不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      if(this.updateData.unit==null || this.updateData.unit==""){
        this.$Message.error("单位不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.updateData.startTimeOri==null || this.updateData.startTimeOri==""){
        this.$Message.error("提醒开始时间不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      if(this.updateData.endTimeOri==null || this.updateData.endTimeOri==""){
        this.$Message.error("提醒结束时间不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }


      console.log()

      if(this.updateData.warnMessage==null || this.updateData.warnMessage==""){
        this.$Message.error("提醒报文不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }



      this.updateData.startTime = this.updateData.startDate.getFullYear() + '-' + (this.updateData.startDate.getMonth()+1) + '-' + this.updateData.startDate.getDate() + ' '+ this.updateData.startTimeOri;
      this.updateData.endTime = this.updateData.startDate.getFullYear() + '-' + (this.updateData.startDate.getMonth()+1) + '-' + this.updateData.startDate.getDate() + ' '+ this.updateData.endTimeOri;

      axios.post(localStorage.http+`/workRemind/updateWorkRemind?loginStatus=${sessionStorage.loginStatus}`,this.updateData)
       .then((res)=>{
          if(res.data == 1){
            this.$Message.success('工作提醒信息更新成功');

            //更改数据清空
            this.updateData = {period:null};

            //关闭弹框
            this.updateModal = false;

            //重新查询主页面数据
            this.queryData();
            return;
          }else{
            this.$Message.error('工作提醒信息更新失败');
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)
          }


     })
    },

    add_cancel () {

    },

    getCommons(a) {
      return getTitles(a);
    },

    getBtnClass(a) {
      return getButtons(a);
    },

    queryData() {
      axios
        .post(
          localStorage.http +
            `/workRemind/getWorkRemindList?loginStatus=${localStorage.loginStatus}`,
          this.formFilter
        )
        .then(res => {
          this.tableColumns.data = res.data.list;
          //this.total = res.data.total;
          //处理数据
          this.tableColumns.data.forEach((item) => {
            item.startDate = item.startTime.substr(0,10),
            item.startTime = item.startTime.substr(11,5),
            item.endTime = item.endTime.substr(11,5),
            item.period = item.period + item.remark4
          })
          this.total = res.data.total
        });
    },

    async queryDataById(id) {
      let result = await axios
        .get(
          localStorage.http +
            `/workRemind/getWorkRemindById?loginStatus=${localStorage.loginStatus}&id=${id}`
        )
        return result.data;
    },

    // 只能输入数字-校验入库单号
    checkOrderId(e) {
      var value = e.target.value.replace(/[^\w\.\/]/gi, "");
      document.getElementById(e.target.id).value = value;
    },
    // 翻页事件 -xj
    handleChangePage(value) {
      this.formFilter.curPage = value;
    },

    //改变每页大小事件 -xj
    handleChangePageSize(value) {
      this.formFilter.pageSize = value;
    },


  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        this.queryData();
      }
    }
  }
};
</script>

<style  lang='less'>

.modal_remind{
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
      // width: 160px;
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
    .ivu-input-number-input{
      border:1px solid #888888;
      outline: 0 none !important;
    }
    .ivu-input-number{
      border:0 none;
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
   .ivu-table td{
     background-color:#fff;
   }
   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
   }
   .ivu-input-icon{
        position: absolute;
        right:45px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
}



.workRemind {
  th .ivu-table-cell {
    font-size: 14px !important;
    font-weight: bold;
    color: #333;
  }
  .ivu-form .ivu-form-item-label {
    color: #5aa5ff !important;
    font-size: 12px !important;
    font-family: "Microsoft YaHei";
    line-height: 20px;
  }
  .ivu-input-wrapper {
    width: 160px;
    height: 20px;
  }
  .ivu-select {
    width: 120px;
    height: 20px;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    background-color: white !important;
    font-size: 20px;
    border-radius: 8px;
  }
  .ivu-tabs-ink-bar {
    background-color: #fff;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    font-size: 14px;
    background-color: #f3f3f3;
  }
  .ivu-tabs-nav-scroll {
    background-color: #f3f3f3;
  }
  .ivu-input {
    border: 1px solid #888888;
  }
  .ivu-select-selection {
    border: 1px solid #888888;
  }
  .ivu-table-overflowY {
    overflow-y: scroll;
  }
  .ivu-table td{
     background-color:#fff;
     height: 40px;
   }
  .ivu-table-tbody {
    font-size: 12px;
    color: #999;
    font-family: "Microsoft YaHei";
    vertical-align: middle;
  }
  .inordermanageTable {
    .ivu-table td {
      background-color: #fff;
      height: 40px;
    }
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td,
    .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
      background-color: #f9f9f9;
      height: 40px;
    }
  }
  .ivu-input-icon {
    position: absolute;
    right: 45px;
  }
  .ivu-input-icon-normal + .ivu-input {
    width: 120px;
  }

  .page {
    .ivu-select-selection {
      bottom: 6px;
    }
  }
}
</style>
