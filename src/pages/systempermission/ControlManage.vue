<template lang="html">
  <div class="controlManage">
    <i-form :label-width="85" style="text-align: left;">
      <Row>
        <i-col span="6">
          <Form-item :label="$t('common.module')">
            <i-select :placeholder="$t('message.todoSelect')" v-model.sync="modelId" clearable @on-change="getMenuEnum">
              <i-option v-for="(opt,i) in modelEnum" :key="i" :value="opt.value?opt.value:-1">{{opt.label}}</i-option>
            </i-select>
          </Form-item>
        </i-col>
        <i-col span="6">
          <Form-item :label="$t('common.menu')">
            <i-select :placeholder="$t('message.todoSelect')" clearable v-model.sync="selectMenuCode" @on-change="getControlInfo">
              <i-option v-for="(opt,i) in menuEnum" :key="i" :value="opt.code?opt.code:-1">{{opt.name}}</i-option>
            </i-select>

            </i-select>
          </Form-item>
        </i-col>
      </Row>
    </i-form>
    <div class="spaceBetween">
      <Button v-if="$store.state.controls.M_2_200418175457_delete" class="btnForm" shape="circle" :type="!deleteButtonFlag?'error':'default'"  @click="deleteConfirm" icon="md-trash">{{$t('actions.deleteSelected')}}</Button>
      <Button v-if="$store.state.controls.M_2_200418175457_insert" class="btnForm" type="primary" shape="circle" @click="addControl">{{$t('actions.insert')}}</Button>
    </div>

    <Table stripe border :height="tableHeight" :columns="tableColumns.card" :data="controlInfos"
           @on-selection-change="onSelectionChange" @on-row-dblclick="showUpdate"
           ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="this.searchModel.total" :current="this.searchModel.pageNum"
            :page-size="this.searchModel.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePagenum" @on-page-size-change="changePagesize" style="text-align:center"></Page>
    </div>


    <Modal :title="$t('actions.insertPattern',[$t('common.control')])" class="modal_cargo" v-model="insertModelCtrl" :mask-closable="false" :width="1200" @on-cancel="insert_cancel">
      <Form ref="insertModel" class="formValidate" :rules="insertValidate" :model="insertModel" :label-width="120">
        <Row>
          <Col span="6">
            <Form-item :label="$t('common.module')">
              <Select v-model="modelId" clearable :placeholder="$t('message.todoSelect')" @on-change="getMenuEnum">
                <Option v-for="item in modelEnum" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">

            <Form-item :label="$t('common.menu')" prop="menuID">
              <Select v-model="insertModel.menuID" clearable @on-change="insetCheck" :placeholder="$t('message.todoSelect')">
                <Option v-for="item in menuEnum" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.typePattern',[$t('common.control')])">
              <Select v-model="insertModel.controltype" clearable :placeholder="$t('message.todoSelect')"
              >
                <Option v-for="item in this.controltype" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.controlId')" prop="controlID">
              <Input v-model="insertModel.controlID" @on-change="insetCheck"/>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Form-item :label="$t('common.typePattern',[$t('common.oper')])">
              <Select v-model="insertModel.lid">
                <Option v-for="item in langs" :key="item.value" :value='item.value'>{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>

          <Col span="6">
            <Form-item :label="$t('common.seq')">
              <Input v-model="insertModel.seq" />
            </Form-item>
          </Col>

          <Col span="6">
            <Form-item :label="$t('common.note')">
              <Input v-model="insertModel.remark" />
            </Form-item>
          </Col>
        </Row>
      </Form>

      <div slot="footer">
        <i-button type="primary" shape='circle' class="btnForm" @click="insert">{{$t('actions.submit')}}</i-button>
      </div>
    </Modal>

    <Modal class="modal_cargo" v-model="updateModelCtrl" :mask-closable="false" width="1200"
           @on-cancel="insert_cancel">
      <p slot="header" style="text-align:center">
        <span style="font-size:14px">{{$t('actions.updatePattern',[$t('common.control')])}}</span>
      </p>
      <Form ref="updatestorageInfo" v-model="updateModel" :label-width="120">
        <Row>
          <Col span="6">
            <Form-item :label="$t('common.menu')">
              <Input v-model="updateModel.menuID" disabled="disabled"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.controlId')">
              <Input v-model="updateModel.controlID" disabled="disabled"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.typePattern',[$t('common.control')])">
              <Select v-model="updateModel.controltype" clearable :placeholder="$t('message.todoSelect')"
              >
                <Option v-for="item in controltype" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.typePattern',[$t('common.oper')])">
              <!-- <Input v-model="updateModel.lid" /> -->
              <Select v-model="updateModel.lid">
                <Option v-for="item in langs" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </Form-item>
          </Col>
        </Row>
        <Row>


          <Col span="6">
            <Form-item :label="$t('common.seq')">
              <Input v-model="updateModel.seq" />
            </Form-item>
          </Col>

          <Col span="6">
            <Form-item :label="$t('common.note')">
              <Input v-model="updateModel.remark" />
            </Form-item>
          </Col>

        </Row>

      </Form>

      <div slot="footer">
        <i-button type="primary" shape='circle' class="btnForm" @click="update">{{$t('actions.submit')}}</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import iview from 'view-design'
  export default {
    components: {},

    data() {
      return {
        tableHeight:300,
        modelEnum: [],
        menuEnum: [],
        selectMenuCode:"-1",
        modelId: null,
        controlInfos: [],
        controltype: [],
        deleteButtonFlag: true,
        deleteInfo:[],

        searchModel: {
          pageNum: 1,
          pageSize: 20,
          menuid: null
        },
        insertModelCtrl: false,
        updateModelCtrl:false,
        insertModel:{
          menuID:null,
          controlID:null,
          remark:null,
          controltype:null,
          lid:null,
          modelname:null,
          seq:0
        },
        insertValidate:{
          menuID:[
            {
              required:true,message:"菜单不可为空",trigger:"change"
            }
          ],
          controlID:[
            {
              required:true,message:"控件编号不可为空",trigger:"change"
            }
          ]
        },
        updateModel:{
          menuID:null,
          controlID:null,
          remark:null,
          controltype:null,
          lid:null,
          modelname:null,
          seq:0
        },

        // inertModelSubmitCtrl:false,
        updateModelSubmitCtrl:true,


        tableColumns: {
          card: [
            {key: 'select', type: 'selection', width: 55, align: 'center'},

            {
              title: this.$t('common.index'), key: 'displayOrder', align: 'center', width: 75, render: (h, params) => {
                return h("div", +params.row._index + 1 + (this.searchModel.pageNum - 1) * this.searchModel.pageSize)
              }
            },
            // {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            //     return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
            // }},
            {
              title: this.$t('common.menu'), key: 'menuID', align: 'center', render: (h,params) => {
                for(let i of this.menuEnum){
                  if(i.code == params.row.menuID){
                    return h('div',i.name)
                  }
                }
              }
            },
            {
              title:this.$t('common.typePattern',[this.$t('common.control')]) ,key: 'controltype', align: 'center', render: (h, param) => {
                return h("div", this.enumConvert(param.row.controltype, this.controltype))
              }
            },
            {title: this.$t('common.controlId'), key: 'controlID', align: 'center'},
            {title: this.$t('common.typePattern',[this.$t('common.oper')]), key: 'lid', align: 'center',render:(h,params)=>{
              return h("div",this.getLabel(this.langs,params.row.lid))
            }},
            {title: this.$t('common.note'), key: 'miaoShu', align: 'center'}
          ],
        },
        langs:[]
      }
    },

    created() {
      this.getTypes();
    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140;
    },

    computed: {
    },

    methods: {

      async getTypes() {
        await this._axios("get","PriControlModel/modelenum",data=>{
          this.modelEnum = this.arrConvert(data)
        })
        await this.getType("controllang",this.langs)

        await this._axios("get","PriControlModel/controltype",data=>{
          this.controltype = this.arrConvert(data);
        })
        // this.$axios.get(`systemparam/paramenum?lang=${this.$store.state.globalLang}&code=controllang`).then(res=>{
        //   console.log("操作类型",res.data)
        //   this.langs = this.arrConvert(res.data);
        // }).catch(err=>{
        //   console.log(err)
        // })

        // this.$axios.get('/PriControlModel/controltype').then(res => {
        //   this.controltype = res.data;
        //   console.log(this.controltype)
        // }).catch(exmsg => {
        //   console.log(exmsg)
        // })

      },

      getMenuEnum() {
        this.$axios.get( `/PriControlModel/modelenum?parentid=${this.modelId}`).then(res => {
          console.log(res)
          this.menuEnum = res.data;
        }).catch(exmsg => {
          console.log(exmsg)
        })


      },

      getControlInfo() {
        this.$axios.get( `/PriControlModel/controls?menuid=${this.selectMenuCode}&pagenum=${this.searchModel.pageNum}&pagesize=${this.searchModel.pageSize}`).then(res => {
          if(res.code === 0){
            console.log(res.data)
            this.controlInfos = res.data.list;
            this.searchModel.pageSize = res.data.pageSize;
            this.searchModel.pageNum = res.data.pageNum;
            this.searchModel.total = res.data.total;
            this.deleteButtonFlag = true;
          }else{
            console.log(res)
          }


        }).catch(exmsg => {
          console.log(exmsg)
        })
      },

      changePagenum(v) {
        this.searchModel.pageNum = v;
        this.getControlInfo()
      },

      insetCheck(){
        this.$axios.post( `/PriControlModel/insertcheck?menuid=${this.insertModel.menuID}&controlid=${this.insertModel.controlID}`).then(res => {
          if(res.data){
            this.$Message.error({
              content:"该id已存在！",
              duration:5
            });
            this.insertModel.controlID=null;
          }

        }).catch(exmsg => {
          console.log(exmsg)
        })
      },


      insert () {
        // console.log(this.insertModel)
        this._axios("post","/PriControlModel/priControlModel",this.insertModel,data=>{
          this.getMes("post",true)
          this.insertModelCtrl = false;
          this.insertModel.controlID = null;
          this.getControlInfo()
        })

      },

      insert_cancel () {
        this.insertModelCtrl = false;
        this.insertModel={
          menuID:null,
            controlID:null,
            remark:null,
            controltype:null,
            lid:null,
            modelname:null,
            seq:0
        }
      },

      addControl () {
        this.insertModelCtrl = true
      },

      changePagesize(v) {
        this.searchModel.pageSize = v;
        this.getControlInfo()
      },

      enumConvert(code, enums) {
        if (enums === null) return null;
        let tmp = enums.find(item => item.code === code);
        return tmp === undefined ? null : tmp.name
      },

      onSelectionChange(row){
        this.deleteInfo = row;

        this.deleteButtonFlag = this.deleteInfo.length>0 ? false : true;
      },

      deleteConfirm(){
       if(this.deleteButtonFlag){
         // 提示选择要删除的数据
         this.$root.mes('warn','w-20200521173305')
       }else{
          this.$root.mes('warn','w-20200512154954')
          .then(res => {
              if(res){
                this.deleteSelection()
              }
          })
          .catch(err => {console.log(err) })
        }
      },
      deleteSelection () {
       // console.log(this.$refs.table.getSelection())
        // const list = this.$refs.table.getSelection();
        var list = this.deleteInfo;
        if(list.find(item=>item.lid==='默认')){
          iview.Message.error({
            content:"默认按钮不允许删除！",
            duration:2
          });
          return;
        }
        if(list.lenth>0){
          iview.Message.error({
            content:"未选择数据！",
            duration:5
          });
          return;
        }
       // return
        this.$axios.post(`/PriControlModel/controls`,list).then(res=>{
          if(res.data){
            iview.Message.info({
              content:"删除成功！",
              duration:5
            });

            this.getControlInfo();

          }
        }).catch(exmsg=>{
          iview.Message.error({
            content:exmsg,
            duration:5
          });
        })
      },

      showUpdate (v) {
        if(!this.$store.state.controls.M_2_200418175457_update)return;
        this.updateModel = v;
        this.updateModelCtrl = true;
      },

      update () {
        if(!this.updateModelSubmitCtrl)
          return;
        this.updateModelSubmitCtrl = false;




        if(this.updateModel.controltype==null||this.updateModel.controltype===""){
          iview.Message.error({
            content:"控件类型不允许为空！",
            duration:5
          });
          this.updateModelSubmitCtrl = true;
          return;
        }
        if(this.updateModel.lid==null||this.updateModel.lid===""){
          iview.Message.error({
            content:"控件语言不允许为空！",
            duration:5
          });
          this.updateModelSubmitCtrl = true;
          return;
        }

        this.$axios.post( `/PriControlModel/updatepriControlModel`,this.updateModel).then(res=>{

          if(res.data){
            iview.Message.info({
              content:"更新成功！",
              duration:5
            });
            this.updateModelSubmitCtrl = true;
            this.updateModelCtrl=false;
            this.getControlInfo()
           // this.insertModel.controlID = null;

          }
        }).catch(exsmes=>{
          iview.Message.error({
            content:exsmes,
            duration:5
          });
          this.updateModelSubmitCtrl = true;


        })

      }

    }
  }

</script>

<style lang="less">
  .modal_cargo{
    position: absolute;
    top: 85px;
  }
</style>
