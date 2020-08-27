<template>
   <div class="packtype">
       <Form :label-width="85" inline style="text-align:left;" id="formFilter">
          <div class="" style="display:flex;justify-content:space-between;">
          <div class="d1">
            <Form-item label="客户">
                <Select clearable @on-change="searchpack" v-model="customerid" style="width:150px">
                 <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
               </Select>
            </Form-item>
          </div>
          <div class="">
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='addbutton'>新增</Button>
          </div>
          </div>
          <div id="deleteBtn">
              <div class="">
                <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="deletetip"
                style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;">删除选中项</Button>
                <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
                style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4">删除选中项</Button>
              </div>
              <div class="">
              </div>
          </div>
          <br>

         <Modal v-model="modal1" :footer-hide=true draggable scrollable title="包装信息新增"  width=1000>
            <span style="color:red">*</span>客户名称：<Select class="new" v-model="form1.customerid" style="width:150px">
               <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
             </Select>
            <span style="color:red">*</span>包装类型：<Select class="new" v-model="form1.packtasktypeid" style="width:200px">
               <Option v-for="item in data3" :value="item.taskid" :key="item.typename">{{ item.typename }}</Option>
             </Select>
            <span style="color:red;margin-left:15px">*</span>长/cm：
            <InputNumber class="new" :min="0" v-model="form1.length" placeholder="点击输入" style="width: 100px;margin-right:50px"></InputNumber>
            <span style="color:red;margin-left:15px">*</span>宽/cm：
            <InputNumber class="new" :min="0" v-model="form1.width" placeholder="点击输入" style="width: 100px"></InputNumber>
            <br><br>
            <span style="color:red;margin-left:25px">*</span>单位：<Select class="new" v-model="form1.unit" style="width:150px">
               <Option v-for="item in data4" :value="item.taskid" :key="item.typename">{{ item.typename }}</Option>
             </Select>
            <span style="color:red">*</span>登记时间：
            <Input  disabled v-model="form1.registerdate" placeholder="点击输入" style="width: 200px"></Input>
            <span style="color:red;margin-left:15px">*</span>高/cm：
            <InputNumber class="new" :min="0" v-model="form1.height" placeholder="点击输入" style="width: 100px;margin-right:50px"></InputNumber>
            <span style="color:red;margin-left:24px">*</span>容积：
            <InputNumber class="new" :min="0" v-model="form1.capacity" placeholder="点击输入" style="width: 100px"></InputNumber>
            <br><br>
            备注： <Input v-model="form1.remark" type="textarea" :autosize="true" placeholder="点击输入" />
            <br><br>
            <footer style="display:flex;justify-content:flex-end;">
              <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;"
               @click='newpack'>提交</Button>
            </footer>
         </Modal>

            <Modal v-model="modal2" :footer-hide=true draggable scrollable title="包装信息编辑" width=1000>
                <span style="color:red">*</span>客户名称：<Select class="new" v-model="form2.customerid" style="width:150px">
                   <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
                 </Select>
                <span style="color:red">*</span>包装类型：<Select class="new" v-model="form2.packtasktypeid" style="width:200px">
                   <Option v-for="item in data3" :value="item.taskid" :key="item.typename">{{ item.typename }}</Option>
                 </Select>
                <span style="color:red;margin-left:15px">*</span>长/cm：
                <InputNumber class="new" :min="0" v-model="form2.length" placeholder="点击输入" style="width: 100px;margin-right:50px"></InputNumber>
                <span style="color:red;margin-left:15px">*</span>宽/cm：
                <InputNumber class="new" :min="0" v-model="form2.width" placeholder="点击输入" style="width: 100px"></InputNumber>
                <br><br>
                <span style="color:red;margin-left:25px">*</span>单位：<Select class="new" v-model="form2.unit" style="width:150px">
                   <Option v-for="item in data4" :value="item.taskid" :key="item.typename">{{ item.typename }}</Option>
                 </Select>
                <span style="color:red">*</span>登记时间：
                <Input  disabled v-model="form2.registerdate" placeholder="点击输入" style="width: 200px"></Input>
                <span style="color:red;margin-left:15px">*</span>高/cm：
                <InputNumber class="new" :min="0" v-model="form2.height" placeholder="点击输入" style="width: 100px;margin-right:50px"></InputNumber>
                <span style="color:red;margin-left:24px">*</span>容积：
                <InputNumber class="new" :min="0" v-model="form2.capacity" placeholder="点击输入" style="width: 100px"></InputNumber>
                <br><br>
                备注： <Input v-model="form2.remark" type="textarea" :autosize="true" placeholder="点击输入" />
                <br><br>
                <footer style="display:flex;justify-content:flex-end;">
                  <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;"
                   @click='updatepack'>提交</Button>
                </footer>
            </Modal>
            <Modal
                v-model="modal4"
                title="提示"
                @on-ok="deleteselect"
                @on-cancel="cancel">
                <h2>确认删除？</h2>
            </Modal>
      </Form>
        <Table height=520 @on-selection-change="selecting"  @on-row-dblclick="updateselect" border ref="selection" :columns="columns4" :data="data1"></Table>
        <Page :total="total" size="small" show-total @on-change="changepage" @on-page-size-change="changesize" show-elevator show-sizer />
    </div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
        console.log("test")
        let sparedata = ''
        axios.get(sessionStorage.http+`/findallpacktype?pagenumber=1&pagesize=10&customerid=${sparedata}&loginStatus=${sessionStorage.loginStatus}`)
        .then((a) => {
          this.data1=a.data.data.data
          this.data2=a.data.data.data1
          this.data3=a.data.data.data2
          this.data4=a.data.data.data3
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
              deleteButtonFlag:true,
              modal1:false,
              modal2:false,
              modal4:false,
              pagenumber:1,
              pagesize:10,
              customername:"",
              customerid:"",
              total:0,
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        width: 80,
                        title: '行号',
                        key: 'linenumber',
                        align: 'center',
                    },
                    {
                        title: '客户名称',
                        key: 'customername'
                    },
                    {
                        title: '包装类型',
                        key: 'packtypename'
                    },
                    {
                        title: '长/cm',
                        key: 'length'
                    },
                    {
                        title: '宽/cm',
                        key: 'width'
                    },
                    {
                        title: '高/cm',
                        key: 'height'
                    },
                    {
                        title: '容积',
                        key: 'capacity'
                    },
                    {
                        title: '单位',
                        key: 'unitname'
                    },
                    {
                        title: '登记时间',
                        key: 'registerdate',
                        width:200,
                    },
                    {
                        title: '备注',
                        key: 'remark'
                    },
                    {
                        title: '是否启用',
                        key: 'isusing',
                        render:(h,params)=>{
                                            let isstart = '';
                                            if(params.row.isusing == '1'){
                                              isstart = '启用中';
                                            }else{
                                              isstart = '已禁用';
                                            }
                                            return h('div',isstart);
                                          }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            console.log(params.row.packtypeid)
                                            axios.post(sessionStorage.http+`/changepackstatus?pagenumber=${this.pagenumber}&pagesize=${this.pagesize}
                                              &customerid=${this.customerid}&packtypeid=${params.row.packtypeid}&loginStatus=${sessionStorage.loginStatus}`)
                                            .then((a) => {
                                              this.data1=a.data.data.data
                                              console.log('success')
                                            })
                                            .catch((b) => {
                                              console.log('fail')
                                            })
                                        }
                                    }
                                }, params.row.oppoisusing)
                            ]);
                        }
                    }
                ],
                data1: [],
                data2: [],
                data3: [],
                data4: [],
                form1: {
                  capacity:0,
                  length:0,
                  width:0,
                  height:0,
                },
                form2:{},
                selects:[],
                data5:[
                  {
                  title:"TPS1",

                },
                {
                  title:"TPS0",
                }
              ]
            }
        },
        methods: {
          searchpack(){
            console.log(typeof(this.customerid))
            axios.get(sessionStorage.http+`/findallpacktype?customerid=${this.customerid}&pagenumber=1
              &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data.data
              this.total = a.data.length
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
            console.log(this.selects)
          },
          deleteselect(){
            axios.post(sessionStorage.http+`/deldepack?customerid=${this.customerid}&pagenumber=${this.pagenumber}
              &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`,this.selects)
            .then((a) => {
              this.data1=a.data.data.data
              this.total = a.data.length
              this.$Message.info('已删除');
              this.selects.length=0;
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
            console.log(this.selects)
          },
          deletetip(){
            if(this.selects.length<1){
              this.$Message.info('请选择要删除的数据！');
            }else{
              this.modal4 = true
            }
          },
          cancel () {
              this.$Message.info('已取消');
          },

          selecting(selection){
            if(selection.length>0){
              this.deleteButtonFlag = false
            }else{
              this.deleteButtonFlag = true
            }
            this.selects=selection
          },
          addbutton(){
            var myDate = new Date();
            this.form1.registerdate=myDate.toLocaleString();
            this.modal1 = true;
          },
          newpack(){
            var a = 0;
              for(var p in this.form1){
                  if(p!="remark"){
                    a++;
                  }
              }
              if(a!=8){
                this.$Message.error('带*不可为空');
                return;
              }
            var myDate = new Date();
            this.form1.registerdate = myDate.getTime();
            axios.post(sessionStorage.http+`/newpack?customerid=${this.customerid}
              &pagenumber=${this.pagenumber}&pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`,this.form1)
            .then((a) => {
              this.data1=a.data.data.data
              this.total = a.data.length
              this.modal1 = false
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })

          },
            changepage (pagenumber) {
              this.pagenumber = pagenumber
              axios.get(sessionStorage.http+`/findallpacktype?customerid=${this.customerid}&pagenumber=${pagenumber}
                &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`)
              .then((a) => {
                this.data1=a.data.data.data
                this.total = a.data.length
                console.log('success')
              })
              .catch((b) => {
                console.log(b)
              })
            },
            changesize (pagesize) {
              this.pagesize = pagesize
              axios.get(sessionStorage.http+`/findallpacktype?customerid=${this.customerid}&pagenumber=${this.pagenumber}
                &pagesize=${pagesize}&loginStatus=${sessionStorage.loginStatus}`)
              .then((a) => {
                this.data1=a.data.data.data
                this.total = a.data.length
                console.log('success')
              })
              .catch((b) => {
                console.log(b)
              })
            },
            updateselect(row){
              if(row.isusing=="1"){
                this.$Message.info('此包装类型在使用中,不可编辑！');
                return;
              }
              this.form2.packtypeid = row.packtypeid
              this.form2.customerid = row.customerid
              this.form2.packtasktypeid = row.packtasktypeid
              this.form2.length =+row.length
              this.form2.width =+row.width
              this.form2.unit =row.unit
              this.form2.registerdate =row.registerdate
              this.form2.height =+row.height
              this.form2.capacity =+row.capacity
              this.form2.remark = row.remark
              this.modal2 = true
            },
            updatepack(){
              this.form2.registerdate = null
              axios.post(sessionStorage.http+`/updatepack?customerid=${this.customerid}&pagenumber=${this.pagenumber}
                &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`,this.form2)
              .then((a) => {
                console.log(a)
                this.data1=a.data.data.data
                this.modal2 = false
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
.packtype{
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
    line-height: 50px;
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
</style>
