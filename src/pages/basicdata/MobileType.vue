<template>
    <div class="mobiletypemanage">
      <Form :label-width="85" inline style="text-align:left;" id="formFilter">
      <div class="" style="display:flex;justify-content:space-between;">
        <div class="d1">
          <Form-item label="传输方式">
            <Input v-model="searchmobileInfo.transmissionmode" placeholder="请输入" @on-change="searchMobileTypeByCondition" style="width:150px; margin-right:50px" />
          </Form-item>
          <Form-item label="接口实际回传">
            <Input v-model="searchmobileInfo.interfacear" placeholder="请输入" @on-change="searchMobileTypeByCondition" style="width:150px; margin-right:50px" />
          </Form-item>
          <Form-item label="过账系统">
            <Input v-model="searchmobileInfo.postingsystem" placeholder="请输入" @on-change="searchMobileTypeByCondition" style="width:150px; margin-right:50px" />
          </Form-item>
        </div>

      </div>
        <div id="" style="display:flex;justify-content:space-between;">
              <div class="">
                <Button v-if="deleteButtonFlag==true" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4"
                 type="error" disabled  @click="delete_confirm = true" icon="md-trash">删除选中项</Button>
                <Button v-if="deleteButtonFlag==false"  style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;"
                 type="error" @click="delete_confirm = true" icon="md-trash">删除选中项</Button>
              </div>
              <div class="">
                <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="modal_add_mobile=true">新&nbsp;&nbsp;增</Button>
              </div>
        </div>
        <br>
        <Modal class="modal_mobile" v-model="modal_add_mobile" width="700" :styles="{top: '85px'}" :mask-closable="false" @on-cancel="add_cancel">
          <p slot="header" style="text-align:center">
              <span style="font-size:20px">添加移动类型</span>
          </p>
          <Form ref="insertmobileInfo" :model="insertmobileInfo">
            <Row>
              <Col span="12">
                <!-- <span style="color:red">*</span> -->
                <Form-item label="移动类型编号"style="margin-left:10px" >
                    <font color="red" class="font">*</font>
                  <Input v-model="insertmobileInfo.mobileno" placeholder="请输入" style="width: 160px" @on-keyup="checkWareId" element-id="wareid"/>
                  </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="移动类型描述"style="margin-left:30px" >
                <font color="red" class="font">*</font>
                  <Input v-model="insertmobileInfo.mobiledescription" placeholder="请输入" style="width: 160px" />
                   </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label=" 过账系统" style="margin-left:35px">
                  <font color="red" class="font">*</font>
                  <Input   v-model="insertmobileInfo.postingsystem" style="width: 160px" />
                  </Form-item>
              </Col>

              <Col span="12">
                <Form-item label=" 传输方式"style="margin-left:55px">
                  <font color="red" class="font">*</font>
                  <Input   v-model="insertmobileInfo.transmissionmode" style="width: 160px" />
                  </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form-item label=" 对应接口"style="margin-left:35px">
                  <font color="red" class="font">*</font>
                  <Input   v-model="insertmobileInfo.correspondinginterface" style="width: 160px" />
                  </Form-item>
              </Col>
              <Col span="12">
                <Form-item label=" 接口实际回传"style="margin-left:30px">
                  <font color="red" class="font">*</font>
                  <Input   v-model="insertmobileInfo.interfacear" style="width: 160px" />
                  </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Form-item label=" 备注"style="margin-left:60px">
                  <font color="red" class="font">*</font>
                  <Input  type="textarea" v-model="insertmobileInfo.remark" :rows="2" style="width: 510px" />
                  </Form-item>
              </Col>
            </Row>
          </Form>
          <div slot="footer">
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="save">提交</Button>
            <!-- <Button type="primary" shape="circle"  @click="add_cancel">返回</Button> -->
          </div>
      </Modal>
      <Modal class="modal_mobile" v-model="modal_update_mobile" width="700" :styles="{top: '85px'}" :mask-closable="false" @on-cancel="update_cancel">
        <p slot="header" style="text-align:center">
            <span style="font-size:20px">编辑移动类型</span>
        </p>
        <Form ref="updatetmobileInfo" :model="updatemobileInfo">
          <Row>
            <Col span="12">
              <!-- <span style="color:red">*</span> -->
              <Form-item label="移动类型编号"style="margin-left:10px" >
                  <font color="red" class="font">*</font>
                <Input v-model="updatemobileInfo.mobileno" placeholder="请输入" style="width: 160px" @on-keyup="checkWareId" element-id="wareid"/>
                </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="移动类型描述"style="margin-left:30px" >
              <font color="red" class="font">*</font>
                <Input v-model="updatemobileInfo.mobiledescription" placeholder="请输入" style="width: 160px" />
                 </Form-item>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <Form-item label=" 过账系统" style="margin-left:35px">
                <font color="red" class="font">*</font>
                <Input   v-model="updatemobileInfo.postingsystem" style="width: 160px" />
                </Form-item>
            </Col>

            <Col span="12">
              <Form-item label=" 传输方式"style="margin-left:55px">
                <font color="red" class="font">*</font>
                <Input   v-model="updatemobileInfo.transmissionmode" style="width: 160px" />
                </Form-item>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <Form-item label=" 对应接口"style="margin-left:35px">
                <font color="red" class="font">*</font>
                <Input   v-model="updatemobileInfo.correspondinginterface" style="width: 160px" />
                </Form-item>
            </Col>
            <Col span="12">
              <Form-item label=" 接口实际回传"style="margin-left:30px">
                <font color="red" class="font">*</font>
                <Input   v-model="updatemobileInfo.interfacear" style="width: 160px" />
                </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Form-item label=" 备注"style="margin-left:60px">
                <font color="red" class="font">*</font>
                <Input  type="textarea" v-model="updatemobileInfo.remark" :rows="2" style="width: 510px" />
                </Form-item>
            </Col>
          </Row>
        </Form>
        <div slot="footer">
          <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="update">提交</Button>
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
      <div class="mobilenoInfotable" >
        <Table height=520 border ref="selection" :columns="columns4" :data="mobiletypeInfo"
        @on-selection-change="onSelectionChange" @on-row-dblclick="updateSelection"></Table><br>
      </div>
      <div class="mobilenoInfoPage">
        <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage"
              @on-page-size-change="handleChangePageSize" :page-size="pageSize" style="text-align:center"></Page>
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
            mobiletypeInfo:[],
              deleteButtonFlag:true,
              modal_add_mobile:false,
               modal_update_mobile:false,
              delete_confirm:false,
              total:0, pageNum:1, pageSize:20,

                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    { title: '序号', key: 'linenum', align: 'center', width: 75, render:(h,params)=>{
                         return h("div",+params.row._index + 1+((this.pageNum-1)*this.pageSize))
                       }
                     },
                    {
                        title: '移动类型编号',key: 'mobileno' , align:'center' },
                    {
                        title: '移动类型描述',  key: 'mobiledescription' , align:'center' },
                    {
                        title: '过账系统',  key: 'postingsystem', align:'center'},
                    {
                        title: '传输方式',  key: 'transmissionmode', align:'center'},
                    {
                        title: '对应接口',key: 'correspondinginterface', align:'center'},
                    {
                        title: '接口实际回传',  key: 'interfacear', align:'center'},
                    {
                        title: '备注',  key: 'remark', align:'center'},

                ],
                clickSt:true, deletemobileInfo:[], updatemobileInfo:{},
                searchmobileInfo:{},
                insertmobileInfo:{},
                form2:{},
                selects:[],

            }
        },
        created(){
        axios.get(sessionStorage.http+`/selectAllMobileType?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`)
        .then((res) => {
          this.mobiletypeInfo=res.data.list
          this.total=res.data.total
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      },
        methods: {
          checkWareId(){},

          updateSelection(res){
           this.updatemobileInfo=res
           this.modal_update_mobile = true
         },
         searchMobileTypeByCondition(){
          axios.post(sessionStorage.http+`/selectMobileTypeByCondition?pageNum=1&pageSize=${this.pageSize}
            &loginStatus=${sessionStorage.loginStatus}`,this.searchmobileInfo)
          .then((res) => {
            this.mobiletypeInfo=res.data.list
            this.total=res.data.total
          })
          .catch((err) => {
            console.log('请检查您的网络连接'+err)
          })
        },
        onSelectionChange (row) {
          this.deletemobileInfo = row
          if(this.deletemobileInfo.length>0){
            this.deleteButtonFlag=false
          }else{
            this.deleteButtonFlag=true
          }
        },
        deleteSelection(){
           if(this.deletemobileInfo.length==0){
             this.delete_confirm = false;
             this.$Message.info('请先勾选需要删除项');
           }else{
             axios.post(sessionStorage.http+`/deleteMobileTypes?pageNum=${this.pageNum}&pageSize=${this.pageSize}&loginStatus=${sessionStorage.loginStatus}`,
               this.deletemobileInfo)
             .then((res) => {
               this.mobiletypeInfo=res.data.list
               this.total=res.data.total
               this.delete_confirm = false;
               this.deleteButtonFlag = true;
               this.$Message.success('删除成功');
             })
             .catch((err) => {
               console.log('请检查您的网络连接'+err)
             })
           }
         },
         add_cancel () {
            this.insertmobileInfo={},
              this.modal_add_mobile= false;
          },
          update_cancel () {
            this.updatemobileInfo={},
            this.modal_update_mobile = false;
          },
          handleChangePage (value) {
           this.pageNum = value
           axios.post(sessionStorage.http+`/selectMobileTypeByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
             &loginStatus=${sessionStorage.loginStatus}`,this.searchmobileInfo)
           .then((res) => {
             this.mobiletypeInfo=res.data.list
             this.total=res.data.total
           })
           .catch((err) => {
             console.log('请检查您的网络连接'+err)
           })
         },
         handleChangePageSize(value){
          this.pageSize = value
          this.pageNum = 1
          axios.post(sessionStorage.http+`/selectMobileTypeByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
            &loginStatus=${sessionStorage.loginStatus}`,this.searchmobileInfo)
          .then((res) => {
            this.mobiletypeInfo=res.data.list
            this.total=res.data.total
          })
          .catch((err) => {
            console.log('请检查您的网络连接'+err)
          })
        },
        save () {
          if(!this.clickSt){
            return
          }
          if(this.insertmobileInfo.mobileno == undefined || this.insertmobileInfo.mobiledescription == undefined ||
          this.insertmobileInfo.postingsystem == undefined || this.insertmobileInfo.transmissionmode == undefined
          || this.insertmobileInfo.correspondinginterface == undefined || this.insertmobileInfo.interfacear == undefined
           ||
          this.insertmobileInfo.mobileno == '' || this.insertmobileInfo.mobiledescription == '' ||
          this.insertmobileInfo.postingsystem == '' || this.insertmobileInfo.transmissionmode == '' ||
          this.insertmobileInfo.correspondinginterface == '' || this.insertmobileInfo.interfacear == '' ){
            this.$Message.error('带*不可为空');
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)
            return;
          }

          axios.post(sessionStorage.http+`/insertMobileType?pageNum=${this.pageNum}&pageSize=${this.pageSize}
            &loginStatus=${sessionStorage.loginStatus}`,this.insertmobileInfo)
          .then((res) => {
            this.mobiletypeInfo=res.data.list
            this.total=res.data.total
            this.modal_add_mobile = false;
            this.$Message.success('移动类型已添加');
          })
          .catch((err) => {
            this.modal_add_mobile = false;
            console.log('请检查您的网络连接'+err)
          })
        },
        update () {
             if(!this.clickSt){
               return
             }
             if(this.updatemobileInfo.mobileno == undefined || this.updatemobileInfo.mobiledescription == undefined ||
             this.updatemobileInfo.postingsystem == undefined || this.updatemobileInfo.transmissionmode == undefined
             || this.updatemobileInfo.correspondinginterface == undefined || this.updatemobileInfo.interfacear == undefined||
             this.updatemobileInfo.mobileno == '' || this.updatemobileInfo.mobiledescription == '' ||
             this.updatemobileInfo.postingsystem == '' || this.updatemobileInfo.transmissionmode == '' ||
             this.updatemobileInfo.correspondinginterface == '' || this.updatemobileInfo.interfacear == '' ){
               this.$Message.error('带*不可为空');
               this.clickSt = false
               setTimeout(() => {
                 this.clickSt = true
               },2000)
               return;
             }

             axios.post(sessionStorage.http+`/updateMobileType?pageNum=${this.pageNum}&pageSize=${this.pageSize}
               &loginStatus=${sessionStorage.loginStatus}`,this.updatemobileInfo)
             .then((res) => {
               this.mobiletypeInfo=res.data.list
               this.total=res.data.total
               this.modal_update_mobile = false;
               this.$Message.success('移动类型信息已修改');
             })
             .catch((err) => {
               this.modal_update_mobile = false;
               console.log('请检查您的网络连接'+err)
             })
         },
        }
    }
</script>
<style lang="less">
.modal_mobile{
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
.mobiletypemanage{
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
    .mobileInfotable{
      .ivu-table td{
        background-color:#fff;
        height: 40px;
      }
      .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
        background-color: #f9f9f9;
         height: 40px;
      }
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
    .mobileInfoPage{
    .ivu-select-selection{
      bottom: 6px;
    }
  }
}

</style>
