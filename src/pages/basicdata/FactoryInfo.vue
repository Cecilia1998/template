<template lang="html">
  <div class="factoryInfo">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="供应商编号">
            <Input v-model="searchfactoryInfo.supplierlId" @on-change="searchfactoryInfoByCondition"
            placeholder="请输入"/>
          </Form-item>
          <!-- <Form-item label="供应商简称">
            <Input v-model="searchfactoryInfo.suppliersimplename" @on-change="searchfactoryInfoByCondition"
            placeholder="请输入"/>
          </Form-item> -->
          <Form-item label="生产地编号" >
            <Input v-model="searchfactoryInfo.factoryId" @on-change="searchfactoryInfoByCondition"
            placeholder="请输入"/>
          </Form-item>
          <!-- <Form-item label="供应商类型" >
            <Select v-model="searchfactoryInfo.type" @on-change="searchfactoryInfoByCondition"  clearable placeholder="请选择" style="width: 150px;top:5px">
              <Option value="0">供应商</Option>
              <Option value="1">工厂</Option>
              <Option value="2">车间</Option>
              <Option value="3">运输方</Option>
              <Option value="4">收货方</Option>
              <Option value="5">生产商</Option>
            </Select>
          </Form-item> -->
      </div>
    </Form>
      <Row>
          <Col span="24" style="display:flex;justify-content:space-between">
            <div class="" >
              <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="delete_confirm=true"
              style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
              <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
              style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
            </div>
            <div class="">
              <Button type="primary" shape="circle" @click="showaddmodal"
              style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增</Button>
            </div>
          </Col>
      </Row>

      <br>

      <Table stripe border height=520 :columns="tableColumns.card" :data="factoryInfoShow" @on-selection-change="onSelectionChange"
      @on-row-dblclick="updateSelection"></Table>
      <br>
      <div class="page">
        <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize"
        @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
      </div>

      <Modal v-model="delete_confirm" width="360" style="font-size:14px" :mask-closable='false'>
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <span>确定要删除吗？</span>
        </div>
        <div slot="footer" style="display:flex;justify-content:center;">
          <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection">确定删除</Button>
        </div>
      </Modal>

      <Modal class="factoryInfomodalstyle" v-model="modal_add_factoryInfo" width="900" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>添加生产地</span>
          </p>

          <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>生产地编号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertfactoryInfo.factoryId" placeholder="请输入" style="width: 160px"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>生产地名称&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertfactoryInfo.factoryName" placeholder="请输入" style="width: 160px"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>供应商编号&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertfactoryInfo.supplierlId" clearable placeholder="请选择"
                   style="text-align:left;" @on-open-change="getsupplierNameInfo">
                      <Option v-for="(supplierNameinfo,key) in supplierNameInfo" :key="key" :value="supplierNameinfo.supplierId">
                      {{supplierNameinfo.supplierId}}</Option>
                    </Select>
                  </td>
              </tr>


          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="save"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
      </Modal>

      <Modal class="factoryInfomodalstyle" v-model="modal_update_factoryInfo" width="900" :mask-closable='false' closable>
        <p slot="header" style="text-align:center">
            <span>修改生产地信息</span>
        </p>
        <table style="line-height:50px;text-align:right">
          <tr>
              <td>
                <span style="color:red">*</span>生产地编号&nbsp;
              </td>
              <td>
                <Input v-model="updatefactoryInfo.factoryId" disabled  placeholder="请输入" style="width: 160px"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>生产地名称&nbsp;
              </td>
              <td>
                <Input v-model="updatefactoryInfo.factoryName" placeholder="请输入" style="width: 160px"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>供应商编号&nbsp;
              </td>
              <td>
                <Select v-model="updatefactoryInfo.supplierlId" clearable placeholder="请选择"
               style="text-align:left;" >
                  <Option v-for="(suppilernameinfo,key) in supplierNameInfo" :key="key" :value="suppilernameinfo.supplierId">
                  {{suppilernameinfo.supplierId}}</Option>
                </Select>
              </td>
          </tr>
        </table>
        <div slot="footer">
          <Button type="primary" shape="circle" @click="update"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import $ from 'jquery'
import router from '../../router'
export default {
  components: {},
  data () {
    return {
      clickSt:true,
      total:0,
      pageNum:1,
      pageSize:20,
      modal_add_factoryInfo:false,
      modal_update_factoryInfo:false,
      delete_confirm:false,
      deleteButtonFlag:true,
      factoryInfo:[],
      supplierNameInfo:[
        {supplierlId:''}
      ],
      factoryInfoShow:[],
      deletefactoryInfo:[],
      updatefactoryInfo:{},
      insertfactoryInfo:{},
      searchfactoryInfo:{},
      startTimeOption: {},
      supplierList:[
        {
          supplierId:'',
          supplierName:''
        }
      ],
      endTimeOption: {},
      tableColumns: {
        card: [
          {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '生产地编号', key: 'factoryId', align: 'center'},
          {title: '生产地名称',key: 'factoryName', align: 'center'},
          {title: '供应商编号', key: 'supplierlId', align: 'center' },
          {title: '供应商名称', key: 'supplierName', align: 'center' },
          ],
      }
    }
  },

  created(){
    axios.get(sessionStorage.http+`/getFactoryInfo?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      console.log(result.data.list)
      this.factoryInfoShow=result.data.list
      this.total=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
    this.getsupplierNameInfo();
  },

  computed:{},

  methods:{
    getsupplierNameInfo(){
      axios.get(sessionStorage.http+`/getSupplierNameInfo`)
      .then((result) => {
        this.supplierNameInfo=result.data
        console.log("hhhhhh")
        console.log(this.supplierNameInfo)
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },
    showaddmodal(){
      this.insertfactoryInfo = {};
      this.modal_add_factoryInfo=true;
      this.getsupplierNameInfo()
    },
    searchfactoryInfoByCondition(){
        axios.post(sessionStorage.http+`/getFactoryInfoByCondition?pageNum=1&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`,this.searchfactoryInfo)
        .then((result) => {
          console.log(result)
          if(result.data!=null){
            this.factoryInfoShow=result.data.list
            this.total=result.data.total
          }else{
            this.factoryInfoShow=[]
            this.total=0
          }

        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
    },

    onSelectionChange (row) {
      this.deletefactoryInfo = row
      if(this.deletefactoryInfo.length>0){
        this.deleteButtonFlag=false
      }else{
        this.deleteButtonFlag=true
      }
    },

    deleteSelection(){
      if(this.deletefactoryInfo.length==0){
        this.delete_confirm = false;
        this.$Message.info('请先勾选需要删除项');
      }else{
        axios.post(sessionStorage.http+`/deleteFactoryInfo?pageNum=${this.pageNum}&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`, this.deletefactoryInfo,this.searchfactoryInfo)
        .then((result) => {
          this.factoryInfoShow=result.data.list
          this.total=result.data.total
          this.delete_confirm = false;
          this.deleteButtonFlag = true;
          this.$Message.success('删除成功');
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      }
    },

    handleChangePage (value) {
      this.pageNum = value
      axios.post(sessionStorage.http+`/getFactoryInfoByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchfactoryInfo)
      .then((result) => {
        this.factoryInfoShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    handleChangePageSize(value){
      this.pageSize = value
      this.pageNum = 1
      axios.post(sessionStorage.http+`/getFactoryInfoByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchfactoryInfo)
      .then((result) => {
        this.factoryInfoShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    save () {
      // if(!this.clickSt){
      //   return
      // }
      if(this.insertfactoryInfo.factoryId == undefined || this.insertfactoryInfo.factoryName == undefined ||
       this.insertfactoryInfo.factoryId == '' ||
      this.insertfactoryInfo.factoryName == '' ){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      axios.get(sessionStorage.http+`/judFactoryRepeat?factoryId=${this.insertfactoryInfo.factoryId}`)
        .then((result) => {
          if(result.data=='1'){
            this.$Message.error({
              content:'生产地编号不可重复',
              duration:5
            });
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)
          }else{
            axios.post(sessionStorage.http+`/insertFactoryInfo?pageNum=${this.pageNum}&pageSize=${this.pageSize}
              &loginStatus=${sessionStorage.loginStatus}`,this.insertfactoryInfo,this.searchfactoryInfo)
            .then((result) => {
              this.factoryInfoShow=result.data.list
              this.total=result.data.total
              this.modal_add_factoryInfo = false;
              this.$Message.success('生产地信息已添加');
            })
            .catch((err) => {
              console.log('请检查您的网络连接'+err)
            })
          }
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
    },

    updateSelection(res){
      this.updatefactoryInfo=res
      this.modal_update_factoryInfo = true
    },
    update () {
      if(!this.clickSt){
        return
      }
      if(this.updatefactoryInfo.factoryId == "" ||
      this.updatefactoryInfo.factoryName == "" ||
      this.updatefactoryInfo.factoryId == undefined ||
      this.updatefactoryInfo.factoryName == undefined
    ){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      axios.post(sessionStorage.http+`/updateFactoryInfo?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.updatefactoryInfo)
      .then((result) => {
        this.factoryInfoShow=result.data.list
        this.total=result.data.total
        this.modal_update_factoryInfo = false;
        this.$Message.success('生产地信息修改成功');
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },
    //登记时间
    onStartTimeChange(startTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime)
        }
      }
      this.searchfactoryInfoByCondition();
    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onEndTimeChange(endTime, type) {
        this.startTimeOption = {
          disabledDate(startTime) {
            return startTime > new Date(endTime)
          }
        }
        this.searchfactoryInfoByCondition();
      }

  },
}

</script>

<style lang="css">
  .ivu-table-overflowX{
    overflow-x: hidden;
  }
</style>

<style lang="less">
  .factoryInfomodalstyle{

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
        width: 444px !important;
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
             right:5px;
         }

   //  color:#5aa5ff !important;
   //  font-size: 12px !important;
   //  font-family:"Microsoft YaHei";
   //  line-height: 20px;
   //  .ivu-form .ivu-form-item-label{
   //    color:#5aa5ff !important;
   //    font-size: 12px !important;
   //    font-family:"Microsoft YaHei";
   //    line-height: 20px;
   //  }
   //  .ivu-input-wrapper{
   //    width: 160px;
   //    height: 20px;
   //    vertical-align:baseline;
   //  }
   //  textarea.ivu-input{
   //    max-width: 1000%;
   //    width: 443px;
   //  }
   //  .ivu-select{
   //    width: 160px;
   //    height: 20px;
   //    vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
   //  }
   //  .ivu-tabs-nav .ivu-tabs-tab-active{
   //    background-color: white !important;
   //    font-size: 20px;
   //    border-radius: 8px;
   //  }
   //  .ivu-tabs-ink-bar{
   //    background-color: #fff;
   //  }
   //  .ivu-tabs-nav .ivu-tabs-tab{
   //    font-size: 14px;
   //    background-color: #f3f3f3;
   //  }
   //  .ivu-tabs-nav-scroll{
   //    background-color: #f3f3f3;
   //  }
   //  .ivu-input{
   //    border:1px solid #888888;
   //  }
   //  .ivu-input-number{
   //    width: 160px;
   //    border:1px solid #888888;
   //  }
   //  .ivu-select-selection{
   //    border:1px solid #888888;
   //  }
   //  .ivu-table-overflowY {
   //    overflow-y: scroll;
   //  }
   // .ivu-table-tbody{
   //   font-size: 12px;
   //   color:#999;
   //   font-family:"Microsoft YaHei";
   //   line-height: 50px;
   //   vertical-align: middle;
   // }
   // .ivu-table td{
   //   background-color:#fff;
   // }
   // .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
   //   background-color: #f9f9f9;
   // }
   // .ivu-input-icon{
   //      position: absolute;
   //      right:5px;
   //  }
   // .ivu-input-icon-normal+.ivu-input{
   //   width: 160px;
   // }
  }
  .factoryInfo{
    th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-table-tbody{
      line-height: 16px !important;
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
   .page{
     .ivu-select-selection{
       bottom: 6px
     }
   }
  }
</style>
