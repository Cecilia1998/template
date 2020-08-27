<template>
    <div class="tasktype">
      <Form :label-width="120" inline style="text-align:left;" id="formFilter">
      <div class="" style="display:flex;justify-content:space-between;">
        <div class="d1">
          <Form-item label="任务类型名称">
              <Input maxlength=25 @on-change="searchtask" @on-enter="searchtask" v-model="tasktype" placeholder="请输入" style="width:150px; margin-right:10px" />
          </Form-item>
          <Form-item label="任务标识">
            <Select clearable @on-change="searchtask" v-model="taskflag" style="width:150px">
              <Option value="undefined">-所有-</Option>
               <Option v-for="item in data2" :value="item.tasktypename" :key="item.tasktypename">{{ item.tasktypename }}</Option>
             </Select>
          </Form-item>
        </div>
        <div class="">
        </div>
      </div>
        <div id="deleteBtn" style="display:flex;justify-content:space-between;">
            <div class="">
              <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="deletetip"
              style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
              <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
              style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
            </div>
          <div class="">
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='modal2 = true'>新&nbsp;&nbsp;增</Button>
          </div>
        </div>
        <br>
      <Modal class="lyjmodalstyle" v-model="modal2" :mask-closable='false' scrollable :footer-hide="true" width=560 >
        <p slot="header" style="text-align:center">
          <span>任务类型新增</span>
        </p>
        <span style="color:red">*</span>任务类型编号 <Input maxlength=25 @on-blur="test" v-model="form1.taskid"  placeholder="请输入"/>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>任务类型名称 <Input maxlength=25  v-model="form1.typename"  placeholder="请输入"></Input><br><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:red">*</span>任务标识 <Select  v-model="form1.flag">
           <Option v-for="item in data2" :value="item.tasktypeid" :key="item.tasktypename">{{ item.tasktypename }}</Option>
         </Select>
           <br><br>
           <span style="margin-right:53px"></span> <span style="width:40"></span>备注
           <Input maxlength=250 v-model="form1.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>

         <footer style="display:flex;justify-content:flex-end;margin-top:26px;">
           <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;margin-right:32px;"
            @click='addtask'>提&nbsp;&nbsp;交</Button>
         </footer>
      </Modal>
      <Modal class="lyjmodalstyle" v-model="modal3" :mask-closable='false' scrollable :footer-hide="true" width=560  >
        <p slot="header" style="text-align:center">
          <span>任务类型编辑</span>
        </p>
        <span style="color:red">*</span>任务类型编号 <Input maxlength=25 disabled v-model="form2.taskid"  placeholder="请输入"/>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>任务类型名称 <Input maxlength=25  v-model="form2.typename"  placeholder="请输入"></Input><br><br>
        <span style="margin-right:23px"></span><span style="color:red">*</span>任务标识 <Select  v-model="form2.flag">
           <Option v-for="item in data2" :value="item.tasktypeid" :key="item.tasktypename">{{ item.tasktypename }}</Option>
         </Select>
         <br><br><span style="margin-right:52px"></span>备注
         <Input maxlength=250 v-model="form2.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
         <footer style="display:flex;justify-content:flex-end;margin-top:26px;">
           <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;margin-right:32px;"
            @click='updatetask'>提&nbsp;&nbsp;交</Button>
         </footer>
      </Modal>
      <Modal v-model="modal1" width="360" :mask-closable='false'>
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span style="font-size:14px">删除确认</span>
        </p>
        <div style="text-align:center">
          <span style="font-size:14px">确定要删除吗？</span>
        </div>
        <div slot="footer" style="display:flex;justify-content:center;">
          <Button type="error" shape="circle" style="width:120px"  @click="deleteselect">确定删除</Button>
        </div>
      </Modal>
      </Form>
      <div class="tasktypetable">
        <Table stripe  height=520 @on-selection-change="selecting" @on-row-dblclick="updateselect" border ref="selection" :columns="columns4" :data="data1"></Table>
      </div>
        <br>
        <Page class="page" :total="total" show-total @on-change="changepage" @on-page-size-change="changesize" :page-size="pagesize" :page-size-opts="[10,20,30]" show-elevator show-sizer />
    </div>
</template>
<script>
import axios from 'axios'
    export default {
          created(){
            let sparedata = ''
            let sparedata1 = ''
            axios.get(sessionStorage.http+`/findalltask?pagenumber=1&pagesize=20&tasktype=${sparedata}
              &taskflag=${sparedata1}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data.data
              this.data2=a.data.data.data1
              this.total = a.data.length
              this.pagenumber=1,
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
          },
        data () {
            return {
              clickSt:true,
              deleteButtonFlag:true,
              modal3:false,
              modal2:false,
              modal1:false,
              pagesize:20,
              pagenumber:1,
              total:0,
              taskflag:"",
              tasktype:"",
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                      title: '序号',
                      key: 'linenum',
                      align: 'center',
                      width: 75,
                      render:(h,params)=>{
                        return h("div",+params.row._index + 1+((this.pagenumber-1)*this.pagesize))
                      }
                    },

                    {
                        title: '任务类型编号',
                        align: 'center',
                        key: 'tasktypeid'
                    },
                    {
                        title: '任务类型名称',
                        align: 'center',
                        key: 'tasktypename'
                    },
                    {
                        title: '任务标识',
                        align: 'center',
                        key: 'taskflagname'
                    },
                    {
                        title: '任务标识编码',
                        align: 'center',
                        key: 'taskflagid'
                    }
                ],

                data1: [],
                selects:[],
                data2:[],
                form1:{},
                form2:{},
            }
        },
        methods: {
          test(){
            axios.get(sessionStorage.http+`/testtask?taskid=${this.form1.taskid}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              if(!a.data){
                this.$Message.info('该任务类型编号已存在！');
                this.form1.taskid = ""
              }
              console.log('success')
            })
            .catch((b) => {
              console.log('fail')
            })
          },
          changesize(thispagesize){
            this.pagenumber=1,
            this.pagesize=thispagesize,
            axios.get(sessionStorage.http+`/findalltask?pagenumber=${this.pagenumber}&pagesize=${thispagesize}
              &tasktype=${this.tasktype}&taskflag=${this.taskflag}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data.data
              console.log('success')
            })
            .catch((b) => {
              console.log('fail')
            })
          },
          changepage(thispage){
            this.pagenumber=thispage,
            axios.get(sessionStorage.http+`/findalltask?pagenumber=${thispage}&pagesize=${this.pagesize}
              &tasktype=${this.tasktype}&taskflag=${this.taskflag}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data.data
              console.log('success')
            })
            .catch((b) => {
              console.log('fail')
            })
          },
          selecting(selection){
            if(selection.length>0){
              this.deleteButtonFlag = false
            }else{
              this.deleteButtonFlag = true
            }
            this.selects=selection
          },
          deletetip(){
              if(this.selects.length<1){
                this.$Message.info('请选择要删除的数据！');
              }else{
                this.modal1 = true
              }
          },
          searchtask(){
            axios.get(sessionStorage.http+`/findalltask?pagenumber=1&pagesize=${this.pagesize}
              &tasktype=${this.tasktype}&taskflag=${this.taskflag}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data.data
              this.data2=a.data.data.data1
              this.total = a.data.length
              this.pagenumber=1
              console.log('success')
            })
            .catch((b) => {
              console.log('fail')
            })
          },
          addtask(){
            if(!this.clickSt){
              return
            }
            var a = 0;
            for(var p in this.form1){
              if(p!="remark")
                    a++;
            }
            if(a!=3){
              this.$Message.error('带*不可为空');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            if((/^[\u4e00-\u9fa5]+$/).exec(this.form1.taskid)){
              this.form1.taskid='';
              this.$Message.error('任务类型编号不可为中文！');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            if(!(/^[\u4e00-\u9fa5]+$/).exec(this.form1.typename)){
              this.form1.typename='';
              this.$Message.error('任务类型名称必须为中文！');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            axios.post(sessionStorage.http+`/addtask?pagenumber=+${this.pagenumber}&pagesize=${this.pagesize}
              &tasktype=${this.tasktype}&taskflag=${this.taskflag}&loginStatus=${sessionStorage.loginStatus}`,this.form1)
            .then((a) => {
              this.data1=a.data.data.data
              this.data2=a.data.data.data1
              this.total = a.data.length
              this.modal2 = false
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
          },
          deleteselect(){
            axios.post(sessionStorage.http+`/deletetask?pagenumber=${this.pagenumber}&pagesize=${this.pagesize}
              &tasktype=${this.tasktype}&taskflag=${this.taskflag}&loginStatus=${sessionStorage.loginStatus}`,this.selects)
            .then((a) => {
              this.data1=a.data.data.data
              this.data2=a.data.data.data1
              this.total = a.data.length
              this.$Message.info('已删除');
              this.modal1=false;
              this.selects.length=0;
              this.deleteButtonFlag = true
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
            console.log(this.selects)
          },
          updateselect(res){
              this.form2.taskid=res.tasktypeid
              this.form2.typename=res.tasktypename
              this.form2.flag=res.taskflagid
              this.form2.remark=res.remark
              this.modal3=true
          },
          updatetask(){
            if(!this.clickSt){
              return
            }
            if(this.form2.taskid==''||this.form2.typename==''||this.form2.flag==''){
              this.$Message.error('带*不可为空');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            if(!(/^[\u4e00-\u9fa5]+$/).exec(this.form2.typename)){
              this.form2.typename='';
              this.$Message.error('任务类型名称必须为中文！');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            axios.post(sessionStorage.http+`/updatetask?pagenumber=+${this.pagenumber}&pagesize=${this.pagesize}
              &tasktype=${this.tasktype}&taskflag=${this.taskflag}&loginStatus=${sessionStorage.loginStatus}`,this.form2)
            .then((a) => {
              this.data1=a.data.data.data
              this.data2=a.data.data.data1
              this.modal3=false
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
          }
        }
    }
</script>
<style lang="less">
.lyjmodalstyle{
  color:#5aa5ff !important;
  font-size: 12px !important;
  font-family:"Microsoft YaHei";
  line-height: 20px;
    .ivu-select{
      width: 160px !important;
      height: 20px !important;
      vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
    }
    textarea.ivu-input{
      max-width: 1000%;
      width: 414px !important;
    }
    .ivu-input{
      border:1px solid #888888;
      width: 160px !important;
      height: 30px !important;
      line-height: 30px;
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
}
</style>
<style lang="less">
.tasktype{
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
     line-height: 39px;
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
    .page{
     .ivu-select-selection{
       bottom: 6px;
     }
   }
   .tasktypetable{
     .ivu-table td{
     background-color:#fff;
     height: 40px;
     }
     .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
     height: 40px;
     }
   }
}
</style>
