<template lang="html">
  <div class="usermanage">
    <Form :label-width="85" inline style="text-align:left;">
      <div>
        <Form-item label="模块">
          <Select filterable v-model="searchModel.code" clearable placeholder="请选择"
                  @on-change="getInfos(1)" ::filterable="true">
            <Option v-for="(item,index) in modelEnum" :value="item.code?item.code:-1" :key="index">{{ item.name }}</Option>
          </Select>
        </Form-item>
      </div>
    </Form>
    <div class="spaceBetween">
      <Button :type="deleteButtonFlag?'default':'error'" shape="circle" class="btnForm" icon="md-trash" @click="deleteConfirm">删除选中项</Button>
      <Button type="primary" shape="circle" @click="addControl" class="btnForm">新&nbsp;&nbsp;增
      </Button>
    </div>

    <Table stripe border :max-height="tableHeight" :columns="tableColumns.card" :data="infos"
           @on-selection-change="v=>this.deleteButtonFlag = v.length <= 0" @on-row-dblclick="showUpdate"
           ref="table"></Table>
    <br>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="this.searchModel.total" :current="this.searchModel.pageNum"
            :page-size="this.searchModel.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePagenum" @on-page-size-change="changePagesize" style="text-align:center"></Page>
    </div>


   <!-- <Modal v-model="delete_confirm" width="360" style="font-size:14px">
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
 -->
    <Modal class="modal_cargo" title="新增参数" v-model="insertModelCtrl" :width="1000" :styles="{top: '85px'}" :mask-closable="false"
           @on-cancel="insert_cancel">
      <Form :model="insertModel" :label-width="100">
        <Row>
          <Col span="6">
            <Form-item label="模块">
              <Select v-model="insertModel.codeid" clearable placeholder="请选择" :filterable="true">
                <Option v-for="(item,index) in modelEnum" :value="item.code?item.code:-1" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">

            <Form-item label="参数值">
              <Input v-model="insertModel.codevalue"  @blur.native.capture="insetCheck" />
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="中文名称">
              <Input v-model="insertModel.chname"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="英文名称">
              <Input v-model="insertModel.enname"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="日文名称">
              <Input v-model="insertModel.jpname"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="备注">
              <Input v-model="insertModel.remark"/>
            </Form-item>
          </Col>



        </Row>

      </Form>

      <div slot="footer">
        <Button type="primary" shape="circle"
                style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="insert">提交
        </Button>
      </div>
    </Modal>

    <Modal class="modal_cargo" v-model="updateModelCtrl" :width="1000" :styles="{top: '85px'}" :mask-closable="false"
           @on-cancel="insert_cancel">
      <p slot="header" style="text-align:center">
        <span style="font-size:14px">修改系统参数</span>
      </p>

      <Form ref="updatestorageInfo" :model="updateModel" :label-width="100">
        <Row>
          <Col span="6">
            <Form-item label="模块编号" >
              <Input v-model="updateModel.codeid"  disabled="disabled"   />
            </Form-item>
          </Col>
          <Col span="6">

            <Form-item label="参数值" >
              <Input v-model="updateModel.codevalue" :disabled="updateModel.codeid==='9527'"  />
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="中文名称" >
              <Input v-model="updateModel.chname" />
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="英文名称" >
              <Input v-model="updateModel.enname" />
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Form-item label="日文名称" >
              <Input v-model="updateModel.jpname" />
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="备注" >
              <Input v-model="updateModel.remark" />
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="有效标志" >
              <Select v-model="updateModel.actionflg" clearable placeholder="请选择">
                <Option v-for="(item,index) in activeEnum" :value="item.code?item.code:-1" :key="index">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>


        </Row>

      </Form>
      <div slot="footer">
        <Button type="primary" shape="circle"
                style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="update">提交
        </Button>
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

    data() {
      return {
        modelEnum: [],
        activeEnum:[],
        searchModel: {
          pageNum: 1,
          pageSize: 20,
          code: null
        },
        tableHeight:300,

        infos: [],
        insertModelCtrl: false,

        updateModelCtrl: false,
        deleteButtonFlag: true,
        insertModel: {
          codeid: null,
          codevalue: null,
          chname: null,
          enname: null,
          jpname: null,
          remark: null
        },
        updateModel: {
          codeid: null,
          codevalue: null,
          chname: null,
          enname: null,
          jpname: null,
          remark: null
        },

        inertModelSubmitCtrl: true,
        updateModelSubmitCtrl: true,

        tableColumns: {
          card: [
            {title: '选择', key: 'select', type: 'selection', width: 55, align: 'center'},
            {
              title: '序号', key: 'displayOrder', align: 'center', width: 75, render: (h, params) => {
                return h("div", +params.row._index + 1 + (this.searchModel.pageNum - 1) * this.searchModel.pageSize)
              }
            },
            {title: '模块编号', key: 'codeid', align: 'center'},
            /*{title: '父菜单id', key: 'parentsid', align: 'center'},*/
            {title: '参数值', key: 'codevalue', align: 'center'},
            {title: '中文名称', key: 'chname', align: 'center'},
            {title: '英文名称', key: 'enname', align: 'center'},
            {title: '日文名称', key: 'jpname', align: 'center'},
            {title: '有效标志', key: 'actionflg', align: 'center',render:(h,p)=>h("span",this.getLabel(this.activeEnum,p.row.actionflg))}

          ],
        }
      }
    },

    created() {
      this.init();
    },

    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180;
    },

    methods: {

      init() {
        axios.get('/systemparam/paramenum?lang=' + this.$store.state.globalLang).then(res => {
          this.modelEnum = res.data;
          axios.get(`/systemparam/paramenum?lang=${this.$store.state.globalLang}&code=actionflg`).then(res => {
            this.activeEnum = res.data;
          }).catch(exmsg => {
          });
        }).catch(exmsg => {
        });

        this.getInfos();
      },

      getInfos(v) {
        if (v !== undefined) this.searchModel.pageNum = v;
        axios.get(`/systemparam/sysparams`, {
          params: this.searchModel
        }).then(res => {
          this.infos = res.data.list;
          this.searchModel.total = res.data.total;
          this.deleteButtonFlag = true;
        }).catch(exmsg => {
          console.log(exmsg)
        })
      },

      changePagenum(v) {
        this.searchModel.pageNum = v;
        this.getInfos()
      },

      insetCheck() {
        axios.get(`/systemparam/insetcheck?codeid=${this.insertModel.codeid}&codevalue=${this.insertModel.codevalue}`).then(res => {
          if (res.data) {
            iview.Message.error({
              content: "该值已存在！",
              duration: 2
            });
            this.insertModel.codevalue = null;
          }

        }).catch(exmsg => {
          console.log(exmsg)
        })

        //insertModel.controlID
      },


      insert() {
        if (!this.inertModelSubmitCtrl)
          return;
        this.inertModelSubmitCtrl = false;

        if (this.insertModel.codeid == null || this.insertModel.codeid === "") {
          iview.Message.error({
            content: "模块不能为空！",
            duration: 2
          });
          this.inertModelSubmitCtrl = true;
          return;
        }

        if (this.insertModel.codevalue == null || this.insertModel.codevalue === "") {
          iview.Message.error({
            content: "参数值不允许为空！",
            duration: 2
          });
          this.inertModelSubmitCtrl = true;
          return;
        }



        axios.post(`/systemparam/addparam`, this.insertModel).then(res => {

          if (res.data) {
            iview.Message.info({
              content: "新增成功！",
              duration: 2
            });
            this.inertModelSubmitCtrl = true;
            this.insertModelCtrl = false;
            //this.insertModel.controlID = null;
            this.init()
          }
        }).catch(exsmes => {
          this.inertModelSubmitCtrl = true;
        })
      },

      insert_cancel() {
        this.insertModelCtrl = false;
      },

      addControl() {
        this.insertModelCtrl = true
      },

      changePagesize(v) {
        this.searchModel.pageSize = v;
        this.getInfos()
      },

      enumConvert(code, enums) {
        if (enums === null) return null;
        let tmp = enums.find(item => item.code == code);
        return tmp === undefined ? null : tmp.name
      },
      deleteConfirm(){
        if(this.deleteButtonFlag){
          // 提示选择要删除的数据
          this.$root.mes('error','w-20200521173305')
        }else{
          this.$root.mes('warn','w-20200512154954')
          .then(res => {
              if(res){

                //删除资源信息
                this.deleteSelection();
              }else{
                //提示删除失败
              }
          })
          .catch(err => {console.log(err) })
          }
      },
      deleteSelection() {
        const list = this.$refs.table.getSelection();
       let  tmp = list.find(item => item.codevalue === '9527')
        if (tmp !== undefined) {
          iview.Message.error({
            content: "模块不允许删除！",
            duration: 2
          });
          this.delete_confirm = false;
          return;
        }

        axios.post(`/systemparam/deleteparam`, list).then(res => {
          if (res.data) {
            iview.Message.info({
              content: "删除成功！",
              duration: 2
            });
            this.init();
            this.delete_confirm = false;
          }
        }).catch(exmsg => {
          this.delete_confirm = false;
        })
      },

      showUpdate(v) {
        this.updateModel = v;
        this.updateModelCtrl = true;
      },

      update() {
        if (!this.updateModelSubmitCtrl)
          return;
        this.updateModelSubmitCtrl = false;


        if (this.updateModel.codevalue == null || this.updateModel.codevalue === "") {
          iview.Message.error({
            content: "参数值不能为空！",
            duration: 2
          });
          this.updateModelSubmitCtrl = true;
          return;
        }


        axios.post(`/systemparam/updateparam`, this.updateModel).then(res => {

          if (res.data) {
            iview.Message.info({
              content: "更新成功！",
              duration: 2
            });
          }
          this.updateModelSubmitCtrl = true;
          this.updateModelCtrl = false;
          this.init()
        }).catch(exsmes => {
          this.updateModelSubmitCtrl = true;
        })

      }

    }
  }

</script>

<style lang="css" scoped>
  .ivu-table-overflowX {
    overflow-x: hidden;
  }
</style>

<style lang="less">


  .usermanage {
    th .ivu-table-cell {
      font-size: 12px !important;
      font-weight: bold;
      color: #333;
    }
    .ivu-table-tbody {
      line-height: 16px !important;
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
      width: 160px;
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
    .ivu-table-tbody {
      font-size: 12px;
      color: #999;
      font-family: "Microsoft YaHei";
      vertical-align: middle;
    }
    .ivu-table td {
      background-color: #fff;
      height: 40px;
    }
    .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td {
      background-color: #f9f9f9;
      height: 40px;
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
        bottom: 6px
      }
    }
  }
</style>
