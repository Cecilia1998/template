<template>
    <div class="vehicletypemanage">
      <Form :label-width="85" inline style="text-align:left;" id="formFilter">
      <div class="" style="display:flex;justify-content:space-between;">
        <div class="d1">
          <Form-item label="车辆类型">
            <Input v-model="vehicletype" placeholder="请输入" style="width:150px; margin-right:50px" />
          </Form-item>
          <Form-item label="载货量">
            <Input v-model="freightvolume" placeholder="请输入" style="width:150px; margin-right:50px" />
          </Form-item>
        </div>

      </div>
        <div id="" style="display:flex;justify-content:space-between;">
              <div class="">
                <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click=""
                style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;">删除选中项</Button>
                <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
                style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4">删除选中项</Button>
              </div>
              <div class="">
                <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="modal_add_vehicle=true">新&nbsp;&nbsp;增</Button>
              </div>
        </div>
        <br>
        <Modal class="modal_vehicle" v-model="modal_add_vehicle" width="700" :styles="{top: '85px'}" :mask-closable="false" @on-cancel="add_cancel">
          <p slot="header" style="text-align:center">
              <span style="font-size:20px">添加车辆类型</span>
          </p>
          <Form ref="insertvehicleInfo" :model="insertvehicleInfo">
            <Row>
              <Col span="12">
                <!-- <span style="color:red">*</span> -->
                <Form-item label="车辆类型"style="margin-left:10px" >
                    <font color="red" class="font">*</font>
                  <Input v-model="insertvehicleInfo.vehicletype" placeholder="请输入" style="width: 160px" @on-keyup="checkWareId" element-id="wareid"/>
                  </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="载货量（托盘数）"style="margin-left:-15px" >
                <font color="red" class="font">*</font>
                  <Input v-model="insertvehicleInfo.freightvolume" placeholder="请输入" style="width: 160px" />
                   </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label=" 内长" style="margin-left:35px">
                  <font color="red" class="font">*</font>
                  <Input-number  :min="0" v-model="innerlength" style="width: 160px" />
                  </Form-item>
              </Col>

              <Col span="12">
                <Form-item label=" 内宽"style="margin-left:55px">
                  <font color="red" class="font">*</font>
                  <Input-number  :min="0" v-model="innerwidth" style="width: 160px" />
                  </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label=" 内高"style="margin-left:30px">
                  <font color="red" class="font">*</font>
                  <Input-number  :min="0"  v-model="internalheight" style="width: 160px" />
                  </Form-item>
              </Col>
            </Row>
          </Form>
          <div slot="footer">
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="save">提交</Button>
            <!-- <Button type="primary" shape="circle"  @click="add_cancel">返回</Button> -->
          </div>
      </Modal>

      <Modal v-model="delete_confirm" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <span style="font-size:22px">确定要删除吗？</span>
        </div>
        <div slot="footer">
          <Button type="error" long  @click="deleteSelection">确定删除</Button>
        </div>
      </Modal>
        </Form>
      <div class="d2" >
        <Table height=520 border ref="selection" :columns="columns4" :data="data1"></Table>
        <Page :total="total" size="small" show-total @on-change="" @on-page-size-change="" show-elevator show-sizer />
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
              test1:'',
              test2:'',
              test3:'',
              test4:'',
              test5:'',
              deleteButtonFlag:true,
              modal_add_vehicle:false,
              delete_confirm:false,
              pagenumber:1,
              pagesize:10,
              total:0,
              innerlength:null,
              innerwidth:null,
              internalheight:null,
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
                        title: '车辆类型',
                        key: 'vehicletype'
                    },
                    {
                        title: '内长（米）',
                        key: 'innerlength'
                    },
                    {
                        title: '内宽（米）',
                        key: 'innerwidth'
                    },
                    {
                        title: '内高（米）',
                        key: 'internalheight'
                    },
                    {
                        title: '载货量',
                        key: 'freightvolume'
                    },

                ],
                data1: [],
                data2: [],
                data3: [],
                data4: [],
                insertvehicleInfo:{},
                form2:{},
                selects:[],

            }
        },
        methods: {}
    }
</script>
<style lang="less">
.modal_vehicle{
  th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .font{
      position: absolute;
      left: -5px;
      top:8px !important;
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
.vehicletypemanage{
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
