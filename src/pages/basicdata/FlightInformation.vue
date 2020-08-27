<template>
    <div class="flightinformation">
      <Form :label-width="85" inline style="text-align:left;" id="formFilter">
      <div class="" style="display:flex;justify-content:space-between;">
        <div class="d1">
          <Form-item label="航司编号">
            <Select clearable @on-change="" v-model="customerid" style="width:150px">
               <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
             </Select>
          </Form-item>
          <Form-item label="航班号">
            <Input @on-change="" v-model="customerid" placeholder="请输入" style="width:150px" />
          </Form-item>
          <Form-item label="货站名称">
            <Select clearable @on-change="" v-model="customerid" style="width:150px">
               <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
             </Select>
          </Form-item>
        </div>

      </div>
        <div id="deleteBtn" style="display:flex;justify-content:space-between;">
              <div class="">
                <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click=""
                style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
                <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
                style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
              </div>
              <div class="" style="display:flex;justify-content:space-between;">
                <Upload @on-progress='uploadfile'
                    multiple
                    action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline" style="width:100px;height:28px;">上传</Button>
                </Upload>&nbsp;
                <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='modal1 = true'>新增</Button>
              </div>
        </div>
        <br>
          <Modal class="flightinformationmodal" v-model="modal1" :footer-hide="true" draggable scrollable  width=750>
            <p slot="header" style="text-align:left">
              <span>航班信息编辑</span>
            </p>
            <span style="margin-right:105px"></span><span style="color:red">*</span>货站
            <Select clearable @on-change="" v-model="customerid" style="width: 160px; margin-right:122px">
               <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
             </Select>
            <span style="color:red">*</span>目的港 <Input   v-model="form1.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="margin-right:93px"></span><span style="color:red">*</span>航班号 <Input   v-model="form1.englishname" placeholder="请输入" style="width: 160px; margin-right:110px"></Input>
            </span><span style="color:red">*</span>航司编号
            <Select clearable @on-change="" v-model="customerid" style="width: 160px">
               <Option v-for="item in data2" :value="item.customerid" :key="item.customername">{{ item.customername }}</Option>
             </Select><br><br>
            <span style="margin-right:82px"></span><span style="color:red">*</span>起飞时间 <Input   v-model="form1.area" placeholder="请输入" style="width: 160px; margin-right:110px"></Input>
            <span style="color:red">*</span>截止时间 <Input   v-model="form1.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="color:red">*</span>每立方米耗损时间(小时) <Input   v-model="form1.area" placeholder="请输入" style="width: 160px; margin-right:135px"></Input>
            <span style="color:red">*</span>备注 <Input   v-model="form1.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>

            <p  style="text-align:left;font-size: 15px;font-weight: bold;color:#234163">
              <span>等待时间：</span>
            </p>
            <br>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期一(小时) <Input   v-model="form1.code" placeholder="请输入" style="width: 160px; margin-right:30px"></Input>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期二(小时) <Input   v-model="form1.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期三(小时) <Input   v-model="form1.englishname" placeholder="请输入" style="width: 160px; margin-right:30px"></Input>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期四(小时) <Input   v-model="form1.country" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期五(小时) <Input   v-model="form1.area" placeholder="请输入" style="width: 160px; margin-right:30px"></Input>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期六(小时) <Input   v-model="form1.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="margin-right:60px"></span><span style="color:red">*</span>星期日(小时) <Input   v-model="form1.area" placeholder="请输入" style="width: 160px"></Input>
            <br>
            <footer style="display:flex;justify-content:flex-end;">
              <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;"
               @click='modal1 = false'>提&nbsp;&nbsp;交</Button>
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
               @click=''>提交</Button>
            </footer>
          </Modal>
        <Modal
            v-model="modal4"
            title="提示"
            @on-ok=""
            @on-cancel="">
            <h2>确认删除？</h2>
        </Modal>
        </Form>
      <div class="d2" >
        <Table height=520 @on-selection-change=""  @on-row-dblclick="" border ref="selection" :columns="columns4" :data="data1"></Table>
        <Page :total="total" show-total @on-change="" @on-page-size-change="" show-elevator show-sizer />
      </div>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
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
                        title: '序号',
                        key: 'seq',
                        align: 'center',
                    },
                    {
                        title: '货站简称',
                        key: 'customerid'
                    },
                    {
                        width: 120,
                        title: '目的港三字码',
                        key: 'customername'
                    },
                    {
                        title: '航司编码',
                        key: 'customerphone'
                    },
                    {
                        title: '航司',
                        key: 'customeraddress'
                    },
                    {
                        title: '航班号',
                        key: 'customerphone'
                    },
                    {
                        title: '起飞时间',
                        key: 'length'
                    },
                    {
                        width: 150,
                        title: '等待时间(小时))',
                        key: 'width'
                    },
                    {
                        title: '截止时间',
                        key: 'height'
                    },
                    {
                        width: 190,
                        title: '每立方米耗损时间(小时)',
                        key: 'capacity'
                    },
                    {
                        title: '备注',
                        key: 'unitname'
                    },

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
                data5:[]
            }
        },
        methods: {
          uploadfile(a,b,c){
            console.log(a+b+c)
          },
        }
    }
</script>
<style lang="less">
.flightinformationmodal{
      color:#5aa5ff !important;
      font-size: 12px !important;
      font-family:"Microsoft YaHei";
      line-height: 20px;

}
.flightinformation{
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
