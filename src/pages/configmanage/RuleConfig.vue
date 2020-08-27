<template lang="html">
  <div class="ruleConfig">
    <Form ref="formFilter" :model="formFilter" :label-width="95" inline style="text-align:left;">

      <table>
        <tr>
          <Form-item label="规则分类">
            <Select v-model="formFilter.ruleType" clearable placeholder="请选择" @on-change="ruleTypeChange" class="textInput"  >
              <Option class="font15" value="">-所有规则-</Option>
              <Option value="1">批次规则</Option>
              <Option value="2">波次规则</Option>
              <Option value="3">拆单规则</Option>
              <Option value="4">合单规则</Option>
              <Option value="5">入库分拣规则</Option>
              <Option value="6">出库分拣规则</Option>
            </Select>
          </Form-item>
          <Form-item label="生成时间">
            <DatePicker v-model="formFilter.startDate" @on-change="startDateChanged" type="date" placeholder="起始日期" class="dateInput" ></DatePicker>-<DatePicker v-model="formFilter.endDate" @on-change="endDateChanged"  type="date" placeholder="结束日期" class="dateInput" ></DatePicker>
          </Form-item>
          <Form-item label="制定人">
            <Input v-model="formFilter.generatePeople" placeholder="请输入" />
          </Form-item>
        </tr>
      </table>


    </Form>
    <Table border stripe height=450 :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" @on-row-dblclick	= "showDetail"></Table>

    <br />
    <div class="rulePage">
        <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>

    <Modal v-model="ruleSeq" title="规则执行顺序" @on-ok="ok" @on-cancel="cancel">
      <table v-for="(item,key,index) in recordDetail" width="100%">
        <tr >
          <td width="10%"></td>
          <td align="right" class="font15" width="7%" >
            <!-- <Icon type="ios-close-circle-outline" @click=""/></td> -->
          <td align="right" class="font15" width="3%">
            {{key+1}}.</td>
          <td  align="left" class="font15" width="60%">
            {{item.ruleModle.ruleName}}：{{item.ruleModle.ruleExplain}}
          </td>
        </tr>
      </table>
    </Modal>
  </div>
</template>
<script>
    export default {

    }
</script>


  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
export default {
  components: {
   },
  data () {
    return {
      http:'http://localhost:9090',
      recordDetail:[],
      forData:{},
      submitLock:false,

      taskList:[
        {
          taskid:'',
          typename:''
        }
      ],
      loading:false,
      total:0,
      formFilter: {
        curPage:1,
        pageSize:20,
        loginStatus:`${sessionStorage.loginStatus}`,
        startDateStr:null,
        endDateStr:null,
      },
      ruleSeq:false,
      definePageSize:10,
      tableColumns: {
         card: [
            // {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
            {title: '序号',key: 'seqNum',width: 80,align: 'center'},
           {title: '规则分类',key: 'ruleType', width: 140,align: 'center'},
           {title: '规则说明',key: 'ruleExplain',width: 250, align: 'center'},
           {title: '生成时间', key: 'generateTime',width:250,align: 'center'},
           {title: '指定范围起始日期', key: 'appointStartDate', width: 200,align: 'center'},
           {title: '指定范围结束日期', key: 'appointEndDate', width: 200,align: 'center'},
           {title: '指定最后日期',key: 'appointLastDate',width: 200,align: 'center'},
           {title: '创建人',key: 'generatePeople',width: 140,align: 'center'},
           {title: '是否启用', key: 'isUsng', width: 120,align: 'center' },
           {title: '操作', key: 'action',align: 'center', width: 100,
             render: (h, params) => {
               let buttons = []
               if(params.row.isUsng=='否'){
                 buttons.push(h('a', {
                   props: {
                     type: 'info',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.startUsing(params);
                     }
                   }
                 }, '启用'))
               }
               if(params.row.isUsng!='否'){
                 buttons.push(h('a', {
                   props: {
                     type: 'info',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.notUse(params);
                     }
                   }
                 }, '禁用'))
               }
               // if (true) {
               //   buttons.push(h('a', {
               //     props: {
               //       type: 'info',
               //       size: 'small'
               //     },
               //     style: {
               //       marginRight: '5px'
               //     },
               //     on: {
               //       click: () => {
               //         this.showDetail(params);
               //       }
               //     }
               //   }, '执行顺序'))
               // }
               return h('div', buttons)
             }
           }
         ],
         data:[
           {
             select:false,
             seqNum:'',
             ruleType:'',
             ruleExplain:'',
             generateTime:'',
             appointStartDate:'',
             appointEndDate:'',
             appointLastDate:'',
             generatePeople:'',
             isUsng:'',

           }
         ]

       }

    }
  },
  created(){
    //sessionStorage.a = 'a'
    //this.$router.history.current.path为当前网页的路径

    //默认查询所有规则记录
    // let url = sessionStorage.http+"/getRuleRecord"
      this.connectService()
  },
  computed:{

  },

  methods:{

    ruleTypeChange(){
      //console.log(this.formFilter.ruleType)
      this.queryData()
    },
    startDateChanged(){
      if(this.formFilter.startDate != ''){
        this.formFilter.startDateStr = this.formartDate(this.formFilter.startDate)
      }else {
        this.formFilter.startDateStr = undefined
      }
      if(this.formFilter.startDate != '' && this.formFilter.endDate != ''){
        if(this.formartDate(this.formFilter.startDate) > this.formartDate(this.formFilter.endDate)){
          alert("起始日期不能大于结束日期")
                this.formFilter.startDate = undefined
                this.formFilter.startDateStr = undefined
        }
      }
      if(this.formFilter.startDateStr != null && this.formFilter.startDateStr != undefined){
        this.queryData()
      }
    },
    endDateChanged(){
      if(this.formFilter.endDate != ''){
        this.formFilter.endDateStr = this.formartDate(this.formFilter.endDate)
      }else {
        this.formFilter.endDateStr = undefined
      }
      if(this.formFilter.startDate != '' && this.formFilter.endDate != ''){
        if(this.formartDate(this.formFilter.startDate) > this.formartDate(this.formFilter.endDate)){
          alert("结束日期不能小于起始日期")
               this.formFilter.endDate = undefined
        }
      }
      if(this.formFilter.endDateStr != null && this.formFilter.endDateStr != undefined){
        this.queryData()
      }
    },
    formartDate(date){//日期格式化
      let  Y = date.getFullYear() + '-'
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D
    },
    filterParamer(){
      if(this.formFilter.ruleType == undefined){
        this.formFilter.ruleType = ''
      }
      if(this.formFilter.startDate == undefined){
        this.formFilter.startDate = ''
      }
      if(this.formFilter.endDate == undefined){
        this.formFilter.endDate = ''
      }
      if(this.formFilter.generatePeople == undefined){
        this.formFilter.generatePeople = ''
      }
      if(this.formFilter.curPage == undefined){
        this.formFilter.curPage == 1
      }
      if(this.formFilter.pageSize == undefined){
        this.formFilter.pageSize == 10
      }
    },

    connectService(){
      let url = sessionStorage.http+`/getRuleRecord?&loginStatus=${sessionStorage.loginStatus}`
      axios.post(url,this.formFilter)
      .then((res) =>{
        this.tableColumns.data = res.data.resultData
        this.total = res.data.total
      })
      .catch((err) => {
        this.formFilter.startDate=''
        this.formFilter.endDate=''
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    queryData(){
      this.connectService()
    },
    startUsing(parame){
      let url = sessionStorage.http+"/startUsingRuleRecord?ruleRecordId="+parame.row.ruleRecordId+"&loginStatus="+`${sessionStorage.loginStatus}`
      axios.get(url)
      .then((res) =>{
        iview.Message.success({
          content:res.message,
          duration:5
        });
        this.connectService()
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    notUse(parame){
      let url = sessionStorage.http+"/notUseRuleRecord?ruleRecordId="+parame.row.ruleRecordId+"&loginStatus="+`${sessionStorage.loginStatus}`
      axios.get(url)
      .then((res) =>{
        iview.Message.success({
          content:res.message,
          duration:5
        });
        this.connectService()

      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    handleSubmit () {
       const paths = this.$route.path.split("/");
       alert(paths);
     },
     exportfile(){

     },
     onSelectionChange (rows) {
       this.rows = rows
     },
     handleChangePage (value) {
      this.formFilter.curPage = value
      //  let url = sessionStorage.http+"/getRuleRecord"
        this.connectService()
       // const paths = this.$route.path.split('/')
     },
     handleChangePageSize(value){
       this.formFilter.pageSize = value
       // const paths = this.$route.path.split('/')
     },
     showDetail(row){
       //alert(params.row.ruleRecordId);
       let url = sessionStorage.http+"/getRuleRecordDetail?ruleRecordId="+row.ruleRecordId+"&loginStatus="+`${sessionStorage.loginStatus}`
       axios.get(url)
       .then((res) =>{
         this.recordDetail = res.data
         this.ruleSeq = true;
       })
       .catch((err) => {
          iview.Message.error({
            content:'网络或服务器错误',
            duration:5
          });
       })
       //this.ruleSeq = true;
     },
     connectGetService(url){
       axios.get(url)
       .then((res) =>{
         this.recordDetail = res.data.data
         this.total = res.total

       })
       .catch((err) => {
         this.formFilter.startDate=''
         this.formFilter.endDate=''
          iview.Message.error({
            content:'网络或服务器错误',
            duration:5
          });
       })
     },
     ok(){
       //alert('ok');
     },
     cancel(){
       //alert('cancel');
     },
     allOrder(){
       axios.post('http://192.168.1.243:8088/getAllOrder',this.formFilter)
       .then((res) =>{
         this.tableColumns.data = res

       })
       .catch((err) => {
          iview.Message.error({
            content:err.message,
            duration:5
          });

       })
     }

  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        console.log(this.formFilter)
        this.queryData();
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .width50{
    width: 150px;
  }
  .clear{clear:both;}

  .title{
    color: blue;
    text-align: left;
    width: 30%;
  }
  .fontRed{
    color: red;
  }
  .fontBlue{
    color: blue;
  }
  .font15{
    font-size: 15px;
  }
  .yaHei18{
      font-size: 18px;
    }
  .font20{
      font-size: 20px;
    }
  .backBlue{
    background-color: #5aa5ff;
  }
  .yaHeiStrong18{
    font-family: Microsoft YaHei;
    font-size: 18px;
    font-weight: bold;
  }
  .yaHei18{
    font-family: Microsoft YaHei;
    font-size: 18px;
  }
  .blueYaHei18{
    color: #5aa5ff;
    font-family: Microsoft YaHei;
    font-size: 18px;
  }
  .blueYaHei20{
    color: #5aa5ff;
    font-family: Microsoft YaHei;
    font-size: 20px;
  }
  .redYaHei18{
    color: #fe3838;
    font-family: Microsoft YaHei;
    font-size: 18px;
  }
  .ButtonBlue{
    background-color: #5aa5ff;
    height: 28px;
    font-size: 16px;
    color: #ffffff;
    width: 120px;
    line-height: 5px;
  }
  .textInput{
    width: 160px;
    height: 28px;
    color: #333333;
    // border: 1px solid red;
  }
  .dateInput{
    width: 120px;
    height: 28px;
    color: #333333;
  }
  .clear{clear:both;}

  .title{
    /* border: 1px solid red; */
    /* float: left; */
    /* font-size: 15px; */
    color: blue;
    text-align: left;
    width: 30%;
  }




  td{
    /* border: 1px solid red; */
  }
  .hint{
    text-align: center;
    align:center;
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

<style lang="less">
    .ruleConfig{
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
          width: 120px;
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
         width: 160px;
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
         line-height: 40px;
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
           right:5px;
       }
      .ivu-input-icon-normal+.ivu-input{
        width: 120px;
      }
      .rulePage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
</style>
