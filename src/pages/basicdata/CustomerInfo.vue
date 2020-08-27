<template>
    <div class="customer">
     <Form :label-width="85" inline style="text-align:left;" id="formFilter">
      <div class="" style="display:flex;justify-content:space-between;">
        <div class="d1">
          <Form-item label="客户编号">
            <Input maxlength=25 @on-change="searchcustomer" v-model="customerid" placeholder="请输入" style="width:150px; margin-right:50px" />
          </Form-item>
          <Form-item label="客户名称">
            <Input maxlength=25 @on-change="searchcustomer" v-model="customername" placeholder="请输入" style="width:150px; margin-right:50px" />
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
      <Modal class="lyjcusmodalstyle" v-model="modal2" :footer-hide='true' :mask-closable='false' scrollable  width=740>
        <p slot="header" style="text-align:center">
          <span>客户信息新增</span>
        </p>
        <span style="color:red">*</span>客户编号 <Input maxlength=25 v-model="form1.customerid"  placeholder="请输入" />&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>客户名称 <Input maxlength=25  v-model="form1.customername"  placeholder="请输入" ></Input>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>客户电话 <Input maxlength=25  v-model="form1.customerphone"  placeholder="请输入" /><br><br>
        <span style="color:red">*</span>客户地址 <Input maxlength=25  v-model="form1.customeraddress"  placeholder="请输入"></Input>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>所属地区 <Select  v-model="form1.remark1" >
           <Option v-for="item in areas" :value="item.title" :key="item.title">{{ item.name }}</Option>
         </Select>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>显示顺序 <InputNumber  v-model="form1.seq"  placeholder="请输入" :min="1"></InputNumber><br><br>
        <span style="margin-right:12px"></span><span style="color:red">*</span>三字码 <Input maxlength=25  v-model="form1.remark2"  placeholder="请输入"></Input><br><br>
        <span style="margin-right:28px"></span>备注
        <Input maxlength=250 v-model="form1.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
        <br><br>
        <footer style="display:flex;justify-content:flex-end;">
          <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;margin-right:32px;"
           @click='addcustomer'>提&nbsp;&nbsp;交</Button>
        </footer>
      </Modal>
      <Modal class="lyjcusmodalstyle" v-model="modal3" :footer-hide='true' :mask-closable='false' scrollable width=740>
        <p slot="header" style="text-align:center">
          <span>客户信息编辑</span>
        </p>
        <span style="color:red">*</span>客户编号 <Input maxlength=25 disabled v-model="form2.customerid"  placeholder="请输入"/>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>客户名称 <Input maxlength=25  v-model="form2.customername"  placeholder="请输入"></Input>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>客户电话 <Input maxlength=25  v-model="form2.customerphone"  placeholder="请输入"/><br><br>
        <span style="color:red">*</span>客户地址 <Input maxlength=25  v-model="form2.customeraddress"  placeholder="请输入"></Input>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>所属地区 <Select  v-model="form2.remark1" >
           <Option v-for="item in areas" :value="item.title" :key="item.title">{{ item.name }}</Option>
         </Select>&nbsp;&nbsp;&nbsp;
        <span style="color:red">*</span>显示顺序 <InputNumber  v-model="form2.seq" placeholder="请输入" :min="1"></InputNumber><br><br>
        <span style="margin-right:12px"></span><span style="color:red">*</span>三字码 <Input maxlength=25  v-model="form2.remark2"  placeholder="请输入"></Input><br><br>
        <span style="margin-right:28px"></span>备注
        <Input maxlength=250 v-model="form2.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
        <br><br>
        <footer style="display:flex;justify-content:flex-end;">
          <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;margin-right:32px;"
           @click='updatecustomer'>提&nbsp;&nbsp;交</Button>
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
      </form>
      <div class="customerinfotable">
        <Table stripe  height=520 @on-selection-change="selecting" @on-row-dblclick="updateselect"
                border ref="selection" :columns="columns4" :data="data1"></Table>
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
            axios.get(sessionStorage.http+`/findallCustomer?pagenumber=1&pagesize=20&customerid=${sparedata}&customername=${sparedata1}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data
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
              customerid:"",
              customername:"",
              areas:[
                {
                  title:'0',
                  name:'华东地区',
                },
                {
                  title:'1',
                  name:'华南地区',
                },
                {
                  title:'2',
                  name:'华中地区',
                },
                {
                  title:'3',
                  name:'华北地区',
                },
                {
                  title:'4',
                  name:'西北地区',
                },
                {
                  title:'5',
                  name:'西南地区',
                },
                {
                  title:'6',
                  name:'东北地区',
                },
                {
                  title:'7',
                  name:'台港澳地区',
                },
              ],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        width: 75,
                        title: '序号',
                        key: 'seq',
                        align: 'center',
                    },
                    {
                        title: '客户编号',
                        align: 'center',
                        key: 'customerid'
                    },
                    {
                        title: '客户名称',
                        align: 'center',
                        key: 'customername'
                    },
                    {
                        title: '三字码',
                        align: 'center',
                        key: 'remark2'
                    },
                    {
                        title: '客户电话',
                        align: 'center',
                        key: 'customerphone'
                    },
                    {
                        title: '客户地址',
                        key: 'customeraddress'
                    }
                ],
                data1: [],
                selects:[],
                form1:{
                  seq:null
                },
                form2:{},
            }
        },
        methods: {
          changesize(thispagesize){
            this.pagenumber=1,
            this.pagesize=thispagesize,
            axios.get(sessionStorage.http+`/findallCustomer?pagenumber=${this.pagenumber}&pagesize=${thispagesize}
              &customerid=${this.customerid}&customername=${this.customername}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data
              console.log('success')
            })
            .catch((b) => {
              console.log('fail')
            })
          },
          changepage(thispage){
            this.pagenumber=thispage,
            axios.get(sessionStorage.http+`/findallCustomer?pagenumber=${thispage}&pagesize=${this.pagesize}
              &customerid=${this.customerid}&customername=${this.customername}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data
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
          searchcustomer(){
            axios.get(sessionStorage.http+`/findallCustomer?pagenumber=1&pagesize=10
              &customerid=${this.customerid}&customername=${this.customername}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data
              this.total = a.data.length
              this.pagenumber=1,
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
          },
          addcustomer(){
            if(!this.clickSt){
              return
            }
            if(this.form1.customerid==''|| this.form1.customername==''|| this.form1.customerphone=='' || this.form1.customeraddress==''||
                this.form1.seq==''|| this.form1.remark1=='' || this.form1.remark2=='' || this.form1.customerid== undefined || this.form1.customername==undefined ||
                this.form1.customerphone==undefined || this.form1.customeraddress==undefined ||
                    this.form1.seq==undefined || this.form1.remark1==undefined || this.form1.remark2==undefined){
              this.$Message.error('带*不可为空');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }

            axios.post(sessionStorage.http+`/testCustomer?loginStatus=${sessionStorage.loginStatus}`,this.form1)
            .then((a) => {
                console.log(a)
              if (a.data) {
                axios.post(sessionStorage.http+`/addCustomer?pagenumber=+${this.pagenumber}&pagesize=${this.pagesize}
                  &customerid=${this.customerid}&customername=${this.customername}&loginStatus=${sessionStorage.loginStatus}`,this.form1)
                .then((a) => {
                  this.data1=a.data.data
                  this.total = a.data.length
                  this.modal2 = false
                  console.log('success')
                })
                .catch((b) => {
                  console.log(b)
                })
              }else {
                this.$Message.error('该客户编号已存在！');
              }
            })
            .catch((b) => {
              console.log(b)
            })

          },
          deleteselect(){
            axios.post(sessionStorage.http+`/deleteCustomer?pagenumber=${this.pagenumber}&pagesize=${this.pagesize}
                &customerid=${this.customerid}&customername=${this.customername}&loginStatus=${sessionStorage.loginStatus}`,this.selects)
            .then((a) => {
              this.data1=a.data.data
              this.total = a.data.length
              this.$Message.info('已删除');
              this.selects.length=0;
              this.modal1 = false;
              this.deleteButtonFlag = true;
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
            console.log(this.selects)
          },
          updateselect(res){
              this.form2.customerid=res.customerid
              this.form2.customername=res.customername
              this.form2.customerphone=res.customerphone
              this.form2.customeraddress=res.customeraddress
              this.form2.seq=res.seq
              this.form2.remark1=res.remark1
              this.modal3=true
          },
          updatecustomer(){
            if(!this.clickSt){
              return
            }
            if(this.form2.customerid==''||this.form2.customername==''||this.form2.customerphone==''||this.form2.customeraddress==''||
                this.form2.seq==''||this.form2.remark1=='' ||this.form2.remark2==''){
              this.$Message.error('带*不可为空');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            axios.post(sessionStorage.http+`/updateCustomer?pagenumber=+${this.pagenumber}&pagesize=${this.pagesize}
              &customerid=${this.customerid}&customername=${this.customername}&loginStatus=${sessionStorage.loginStatus}`,this.form2)
            .then((a) => {
              this.data1=a.data.data
              this.total = a.data.length
              this.modal3 = false
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
          },
          cancel(){},
        }
    }
</script>
<style lang="less">
.lyjcusmodalstyle{
  // color:#5aa5ff !important;
  // font-size: 12px !important;
  // font-family:"Microsoft YaHei";
  // line-height: 20px;
  // .ivu-select{
  //   width: 160px !important;
  //   height: 20px !important;
  //   vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
  // }
  // .ivu-input-number{
  //   width: 160px !important;
  //   height: 32px !important;
  // }
  // .ivu-input-wrapper:not(.textarea){
  //   width: 160px;
  //   height: 20px;
  //   line-height: 30px;
  //   vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
  // }
  // .ivu-input:not(.textarea){
  //   border:1px solid #888888;
  //   width: 160px !important;
  //   height: 30px !important;
  //   line-height: 30px;
  // }

  color:#5aa5ff !important;
  font-size: 12px !important;
  font-family:"Microsoft YaHei";
  line-height: 20px;
    .ivu-select{
      width: 160px !important;
      height: 20px !important;
      vertical-align:text-bottom; margin-bottom:2px;
    }
    textarea.ivu-input{
      max-width: 1000%;
      width: 620px !important;
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
        width: 160px;
        outline: 0 none !important;
      }
      .ivu-input-number{
        width: 160px;
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
.customer{
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
   .customerinfotable{
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
