<template>
  <div class="menuManage">
    <Form ref="form" v-model.sync="form" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem prop="parentsid" :label="$t('common.parentModule')">
            <!-- <Input clearable v-model.sync="form.warehouseId" @on-change="getMenus"></Input> -->
            <Select clearable v-model.sync = "form.parentsid" @on-change="getMenus">
              <Option v-for="item in modules" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="menulevel" :label="$t('common.menuLevel')">
            <Select clearable v-model.sync="form.menulevel" @on-change="getMenus">
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="pagetype" :label="$t('common.menuType')"
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="menulabel" :label="$t('common.menuName')">
            <Input clearable v-model.sync="form.menulabel" @on-change="getMenus"></Input>
          </FormItem>
        </Col>


      </Row>
    </Form>
    <div class="spaceBetween">
      <div>
         <Button v-if="$store.state.controls.M_2_200418175405_delete" class="btnForm" :type="deleteButtonFlag?'default':'error'" shape="circle" @click="deleteConfirm" icon="md-trash">{{$t('actions.deleteSelected')}}
        </Button>
      </div>
      <div>
        <Button v-if="$store.state.controls.M_2_200418175405_insert" type="primary" shape="circle" class="btnForm" @click="showInsert">{{$t('actions.insert')}}</Button>
      </div>
    </div>
    <Table stripe border :height="tableHeight" :columns="columns" :data="menus"
      @on-selection-change="v=>deleteButtonFlag=v.length<=0" @on-row-dblclick="showUpdate"
      ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="form.total" :current="form.pageNum"
            :page-size="form.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePageNum" @on-page-size-change="changePageSize" style="text-align:center"></Page>
    </div>

    <FormModal @close="(e)=>{this.modal =e}" :title="title" :width="1200" :modal="modal" :formData="formData" :submit="submit" :cancel="cancel"></FormModal>
  </div>
</template>

<script>
import FormModal from "../../components/FormModal"
  export default{
    name:"menuManage",
    components:{
      FormModal
    },
    data(){
      return{
        //表单数据
        form:{
          pageSize:20,
          pageNum:1,
          total:0
        },

        //参数数据
        modules:[],
        pageTypes:[],

        //操作数据
        deleteButtonFlag:true,

        //表格数据
        tableHeight:300,
        menus:[],
        columns:[
          {title: this.$t('common.select'),key: 'select',type: 'selection', width: 55,align: 'center',tooltip:true},
          {title: this.$t('common.index'),align:"center",width:75 ,tooltip:true,render:(h,params)=>{
            return h('div',params.index+1+this.form.pageSize*(this.form.pageNum-1))
          }},
          {title: this.$t('common.menuId'), key: 'menuid', align: 'center' ,tooltip:true},
          /*{title: '父菜单id', key: 'parentsid', align: 'center'},*/
          {title: this.$t('common.menuChineseName'), key: 'menulabel', align: 'center' ,tooltip:true},
          {title: this.$t('common.menuJapaneseName'), key: 'inputkey', align: 'center' ,tooltip:true},
          {title: this.$t('common.menuEnglishName'), key: 'inputvalue', align: 'center' ,tooltip:true},
          {title: this.$t('common.menuRoute'), key: 'menuaction', align: 'center' ,tooltip:true},
          {title: this.$t('common.menuPath'), key: 'relativepath', align: 'center' ,tooltip:true},
          {title: this.$t('common.menuIcon'), key: 'menuview', align: 'center' ,tooltip:true},
          {title: this.$t('common.seq'), key: 'displayorder', align: 'center' ,tooltip:true},
          {
            title: this.$t('common.isLeafMenu'), key: 'isleaf', align: 'center' ,tooltip:true, width: 75, render: (h, params) => {
              return h('div',params.row.isLeaf === 1?this.$t('common.yes'):this.$t('common.no'))
              // switch(this.$store.state.globalLang){
              //   case "CN":
              //     return h("div",params.row.isleaf=='1'?'是':'否')
              //   case "EN":
              //     return h("div",params.row.isleaf=='1'?'Yes':'No')
              //   case "JP":
              //     return h("div",params.row.isleaf=='1'?'は':'いいえ')
              // }

            }
          },
          {title: this.$t('common.menuLevel'), key: 'menulevel', align: 'center' ,tooltip:true},
          {title:this.$t('common.menuType'),key:"pagetype",align:"center" ,tooltip:true,render:(h,params)=>{
            return h('div',this.getLabel(this.pageTypes,params.row.pagetype))
          }}
        ],

        //对话框数据
        title:"新增菜单",
        modal:false,
        model:{},

        formData:{
          model:{},
          rule:[
            {
              title:this.$t('common.menuChineseName'),
              type:"input",
              field:"menulabel",
              value:"",
              col:{
                span:6
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.menuChineseName')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.menuJapaneseName'),
              type:"input",
              field:"inputkey",
              value:"",
              col:{
                span:6
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.menuJapaneseName')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.menuEnglishName'),
              type:"input",
              field:"inputvalue",
              value:"",
              col:{
                span:6
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.menuJapaneseName')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.parentId'),
              type:"input",
              field:"parentsid",
              value:"",
              col:{
                span:6
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.parentId')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.menuRoute'),
              type:"input",
              field:"menuaction",
              value:'',
              col:{
                span:6
              },
              // validate:[
              //   {required:true,message:"菜单路由不可为空",trigger:"change"}
              // ]
            },
            {
              title:this.$t('common.menuPath'),
              type:"input",
              field:"relativepath",
              value:'',
              col:{
                span:6
              },
              // validate:[
              //   {required:true,message:"菜单路径不可为空",trigger:"change"}
              // ]
            },
            {
              title:this.$t('common.menuIcon'),
              type:"input",
              field:"menuview",
              value:'',
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.seq'),
              type:"input",
              field:"displayorder",
              value:'',
              props:{
                number:true
              },
              col:{
                span:6
              },
              validate:[
                {required:true,type:"number",message:this.$t('message.empty',[this.$t('common.seq')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.isLeafMenu'),
              type:"select",
              field:"isleaf",
              value:null,
              options:[
                {value:"1",label:this.$t('common.yes')},
                {value:"0",label:this.$t('common.no')}
              ],
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.menuLevel'),
              type:"input",
              field:"menulevel",
              value:'',
              col:{
                span:6
              },
              options:[
                {value:1,label:"1"},
                {value:2,label:"2"},
                {value:3,label:"3"},
              ],
            },
            {
              title:this.$t('common.menuType'),
              type:"select",
              field:"pagetype",
              value:'',
              col:{
                span:6
              },
              options:[
                {value:1,label:"B/S"},
                {value:2,label:"PDA"}
              ]
            },

          ],
          option:{
            form:{
              labelWidth:125,
            },
            submitBtn:{
              show:false,
            }
          },
        }
      }
    },
    async created(){
      await this.getTypes();
      await this.getMenus();
    },
    mounted(){
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140;
    },
    methods:{

      async getTypes(){
        //获取模块枚举
        await this.$axios.get( '/PriControlModel/modelenum').then(res => {
          this.modules = this.arrConvert(res.data);
        }).catch(exmsg => {
          console.log(exmsg)
        });

        await this.getType("menutype",this.pageTypes)
      },
      //创建一个form-create的select组件
      createSelect(field,title,options){
        var span = 6;
        var func = new Function();
        var props = {};
        var validate = [];
        for(var i=3;i<arguments.length;i++){
          if(Array.isArray(arguments[i])){
            validate = arguments[i];
          }else{
            switch(typeof arguments[i]){
              case "number":
              span = arguments[i];
              break;
              case "function":
              func = arguments[i];
              break;
              case "object":
              props = arguments[i];
              break;
            }
          }
        }
        return {
          type:"select",
          field:field,
          title:title,
          value:null,
          options:options,
          col:{
            span:span
          },
          props:props,
          validate:validate,
          event:{
            change:(e)=>{func(e)}
          }
        }
      },

      //根据条件查询库区数据
      getMenus(){
        // console.log(this.form)
        this._axios("get","PriMenuModel/menus",this.form,(data)=>{
          this.menus = data.list;
          // console.log(this.menus)
          this.form.total = data.total
        })
      },

    //表格方法
      //删除验证
      deleteConfirm(){
        if(this.deleteButtonFlag){
          // 提示选择要删除的数据
          this.$root.mes('error','w-20200521173305')
        }else{
          this.$root.mes('warn','w-20200512154954')
          .then(res => {
              if(res){
                //删除信息
                this.delete();
              }
          })
          .catch(err => {console.log(err) })
        }
      },
      changePageNum(e){
        this.form.pageNum = e;
        this.getMenus();
      },
      changePageSize(e){
        this.form.pageSize = e;
        this.getMenus();
      },
    //对话框方法
      //对话框提交默认方法
      submit(){
        // console.log("submit")
        this.modal = false;
      },
      //对话框默认取消方法
      cancel(){
        this.modal = false;
      },
      //打开新增仓库的对话框
      showInsert(){
        this.title = this.$t('actions.insertPattern',[this.$t('common.menu')])
        this.submit = this.insert;
        this.formData.model.resetFields();
        this.modal = true;
      },
      //打开更新仓库的对话框
      showUpdate(e){
        if(this.$store.state.controls.M_2_200418175405_update){
          for(var i in e){
            this.formData.model.setValue(i,e[i])
          }
          this.model = e;
          // console.log(this.formData.rule)
          this.title = this.$t('actions.updatePattern',[this.$t('common.menu')]);
          this.submit = this.update;
          this.modal = true;
        }

      },


    //操作方法
      //新增
      insert(){
        this.checkValidate2(this.formData.model,()=>{
          var model = this.formData.model.formData()
          // console.log(model)
          this._axios("post","PriMenuModel/menu",model,(data)=>{
            if(data ===1){
              this.getMes("post",true)
              this.getMenus();
              this.modal = false;
            }else{
              this.getMes("post",false)
            }

          })
        })

      },
      //更新
      update(){
        this.checkValidate2(this.formData.model,()=>{
          for(var i of this.formData.rule){
            this.model[i.field] = i.value
          }
          // console.log(this.model)
          this._axios("put","PriMenuModel/menu",this.model,(data)=>{
            if(data===1){
              this.getMes('put',true)
              this.getMenus();
              this.modal = false;
            }else{
              this.getMes("put",false)
            }
          })
        })
      },
      //删除
      delete(){
        this._axios("delete","PriMenuModel/menu",this.$refs.table.getSelection(),(data)=>{
          this.getMenus()
          this.deleteButtonFlag = true;
        })
      }

    }
  }
</script>

<style lang="less">

</style>



<!-- <template lang="html">
  <div class="usermanage">
    <Form :label-width="85" inline style="text-align:left;">
      <div>
        <Form-item label="模块">
          <Select v-model="searchModel.parentsid" clearable placeholder="请选择"
                  @on-change="getMenu(1)">
            <Option v-for="item in modelEnum" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="菜单级别">
          <Select v-model="searchModel.menulevel" clearable placeholder="请选择"
                  @on-change="getMenu(1)">
            <Option value="1">一级菜单</Option>
            <Option value="2">二级菜单</Option>
            <Option value="3">三级菜单</Option>
          </Select>
        </Form-item>
        <Form-item label="菜单名称">
          <Input v-model="searchModel.menulabel" @blur.native.capture="getMenu(1)" style="width: 150px"/>
        </Form-item>
      </div>
    </Form>
    <Row>
      <Col span="24" style="display:flex;justify-content:space-between">
        <div class="">
           <Button type="primary" shape="circle" v-if="!deleteButtonFlag" @click="deleteconfirm"
                  style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;"
                  icon="md-trash">删除选中项
          </Button>


          <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag"
                  style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4"
                  icon="md-trash">删除选中项
          </Button>
        </div>
        <div class="">
          <Button type="primary" shape="circle" @click="addControl"
                  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增
          </Button>
        </div>
      </Col>
    </Row>

    <br>
    <Table stripe border :height="tableHeight" :columns="tableColumns" :data="menus"
           @on-selection-change="v=>this.deleteButtonFlag = v.length <= 0" @on-row-dblclick="showUpdate"
           ref="table"></Table>
    <br>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="this.searchModel.total" :current="this.searchModel.pageNum"
            :page-size="this.searchModel.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePagenum" @on-page-size-change="changePagesize" style="text-align:center"></Page>
    </div>



    <Modal v-model="delete_confirm" width="360" style="font-size:14px">
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

    <Modal class="modal_cargo" v-model="insertModelCtrl" width="800px" :styles="{top: '85px'}" :mask-closable="false"
           @on-cancel="insert_cancel">
      <p slot="header" style="text-align:center">
        <span style="font-size:14px">新增菜单</span>
      </p>
      <Form  :model="insertModel">
        <Row>
          <Col span="6">
            <Form-item label="菜单中文名称" style="margin-left:35px">
              <Input v-model="insertModel.menulabel" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单英文名称" style="margin-left:35px">
              <Input v-model="insertModel.inputkey" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单日文名称" style="margin-left:35px">
              <Input v-model="insertModel.inputvalue" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">

            <Form-item label="菜单路由" style="margin-left:35px">
              <Input v-model="insertModel.menuaction" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="页面路径" style="margin-left:35px">
              <Input v-model="insertModel.relativepath" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单图标" style="margin-left:35px">
              <Input v-model="insertModel.menuview" style="width: 150px"/>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Form-item label="菜单级别" style="margin-left:35px">
              <Select v-model="insertModel.menulevel" clearable placeholder="请选择">
                <Option value="1">一级菜单</Option>
                <Option value="2">二级菜单</Option>
                <Option value="3">三级菜单</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="是否叶子菜单" style="margin-left:35px">
              <Select v-model="insertModel.isleaf" clearable placeholder="请选择">
                <Option value="1" selected="true">是</Option>
                <Option value="0">否</Option>
              </Select>
            </Form-item>
          </Col>

          <Col span="6">
            <Form-item label="菜单显示顺序" style="margin-left:35px">
              <Input v-model="insertModel.displayorder" style="width: 150px"/>
            </Form-item>
          </Col>

          <Col span="6">
            <Form-item label="父菜单id" style="margin-left:35px">
              <Input v-model="insertModel.parentsid" style="width: 150px"/>
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

    <Modal class="modal_cargo" v-model="updateModelCtrl" width="800px" :styles="{top: '85px'}" :mask-closable="false"
           @on-cancel="insert_cancel">
      <p slot="header" style="text-align:center">
        <span style="font-size:14px">修改菜单</span>
      </p>

      <Form ref="updatestorageInfo" :model="updateModel">
        <Row>
          <Col span="6">
            <Form-item label="菜单中文名称">
              <Input v-model="updateModel.menulabel" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单日文名称">
              <Input v-model="updateModel.inputkey" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单英文名称">
              <Input v-model="updateModel.inputvalue" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">

            <Form-item label="菜单路由">
              <Input v-model="updateModel.menuaction" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="页面路径">
              <Input v-model="updateModel.relativepath" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单图标">
              <Input v-model="updateModel.menuview" style="width: 150px"/>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Form-item label="菜单级别">

                <Input v-model="updateModel.menulevel" disabled="disabled" style="width: 150px"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="是否叶子菜单">
              <Select v-model="updateModel.isleaf" clearable placeholder="请选择">
                <Option value="1" selected="true">是</Option>
                <Option value="0">否</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="菜单显示顺序">
              <Input v-model="updateModel.displayorder" style="width: 150px"/>
            </Form-item>
          </Col>

          <Col span="6">
            <Form-item label="父菜单id">
              <Input v-model="updateModel.parentsid" style="width: 150px"/>
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
  import iview from 'iview'
  import $ from 'jquery'
  import router from '../../router'

  export default {
    components: {
    },

    data() {
      return {
        modelEnum: [],
        tableHeight:300,
        searchModel: {
          pageNum: 1,
          pageSize: 20,
          menuname: null,
          parentsid: null,
          menulevel: null
        },

        menus: [],
        insertModelCtrl: false,

        updateModelCtrl: false,
        deleteButtonFlag:true,
        insertModel: {
          menuaction: null,
          menulabel: null,
          relativepath: null,
          menuview: null,
          menulevel: null,
          parentsid: null,
          displayorder: null,
          isleaf:null
        },
        updateModel: {
          menuaction: null,
          menulabel: null,
          relativepath: null,
          menuview: null,
          menulevel: null,
          parentsid: null,
          displayorder: null
        },

        inertModelSubmitCtrl: true,
        updateModelSubmitCtrl: true,
        delete_confirm: false,

        tableColumns: [
            {title: '选择', key: 'select', type: 'selection', width: 55, align: 'center'},
            {
              title: '序号', key: 'displayOrder', align: 'center', width: 65, render: (h, params) => {
                return h("div", +params.row._index + 1 + (this.searchModel.pageNum - 1) * this.searchModel.pageSize)
              }
            },
            {title: '菜单id', key: 'menuid', align: 'center'},
            /*{title: '父菜单id', key: 'parentsid', align: 'center'},*/
            {title: '菜单中文名称', key: 'menulabel', align: 'center'},
            {title: '菜单日文名称', key: 'inputkey', align: 'center'},
            {title: '菜单英文名称', key: 'inputvalue', align: 'center'},
            {title: '菜单路由', key: 'menuaction', align: 'center'},
            {title: '实体路径', key: 'relativepath', align: 'center'},
            {title: '菜单图标', key: 'menuview', align: 'center'},
            {title: '显示顺序', key: 'displayorder', align: 'center'},
            {
              title: '是否叶子菜单', key: 'isleaf', align: 'center', width: 75, render: (h, params) => {
                return h("div", +params.row.isleaf=='1'?'是':'否')
              }
            },
            {title: '菜单级别', key: 'menulevel', align: 'center'}
          ],
      }
    },

    created() {
      this.init();
      // axios.get('/sysLanguage/sysLanguages')
      // .then(res => {
      //     console.log(res);
      // })
      // .catch(err => {
      //     console.log(err);
      // })

      // axios.get('/sysLanguage/syslanguagedatatype')
      // .then(res => {
      //     console.log(res);
      // })
      // .catch(err => {
      //     console.log(err);
      // })

    },

    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 225;
    },

    methods: {
      deleteconfirm(){
          this.$root.mes('warn','w-20200512154954')
          .then(res => {
              if(res){
                this.deleteSelection()
              }
          })
          .catch(err => { })
      },
      init() {
        axios.get( '/PriControlModel/modelenum').then(res => {
          //console.log(res.data)
          this.modelEnum = res.data;

        }).catch(exmsg => {
          console.log(exmsg)
        });

        axios.get( '/PriControlModel/controltype').then(res => {
          this.controltype = res.data;

        }).catch(exmsg => {
          console.log(exmsg)
        })
        this.getMenu();
      },

      getMenu(v) {
        //this.searchModel.pageNum=1;
        if (v !== undefined) this.searchModel.pageNum = v;
        axios.get(`/PriMenuModel/menus`, {
          params: this.searchModel
        }).then(res => {
          this.menus = res.data.list;
          //this.searchModel.pageSize = res.data.pageSize;
          //this.searchModel.pageNum = res.data.pageNum;
          this.searchModel.total = res.data.total;
          this.deleteButtonFlag = true;

        }).catch(exmsg => {
          console.log(exmsg)
        })
      },

      changePagenum(v) {
        this.searchModel.pageNum = v;
        this.getMenu()
      },

      insetCheck() {
        axios.post( `/PriControlModel/insertcheck?menuid=${this.insertModel.menuID}&controlid=${this.insertModel.controlID}`).then(res => {
          if (res.data) {
            iview.Message.error({
              content: "该id已存在！",
              duration: 2
            });
            this.insertModel.controlID = null;
          }

        }).catch(exmsg => {
          console.log(exmsg)
        })

        //insertModel.controlID
      },


      insert() {
        // if (!this.inertModelSubmitCtrl)
        //   return;
        // this.inertModelSubmitCtrl = false;

        // if (this.insertModel.menulabel == null || this.insertModel.menulabel === "") {
        //   iview.Message.error({
        //     content: "菜单名称不能为空！",
        //     duration: 2
        //   });
        //   this.inertModelSubmitCtrl = true;
        //   return;
        // }

        // if (this.insertModel.menulevel == null || this.insertModel.menulevel === "") {
        //   iview.Message.error({
        //     content: "菜单级别不允许为空！",
        //     duration: 2
        //   });
        //   this.inertModelSubmitCtrl = true;
        //   return;
        // }
        // if (this.insertModel.parentsid == null || this.insertModel.parentsid === "") {
        //   this.insertModel.parentsid="0";
        // }

        console.log("新增菜单")


        axios.post( `/PriMenuModel/menu`, this.insertModel).then(res => {

          if (res.data) {
            iview.Message.info({
              content: "新增成功！",
              duration: 2
            });
            this.inertModelSubmitCtrl = true;
            this.insertModel.controlID = null;
            this.getMenu(1)
          }
        }).catch(exsmes => {
          iview.Message.error({
            content: exsmes,
            duration: 2
          });
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
        this.getMenu()
      },

      enumConvert(code, enums) {
        if (enums === null) return null;
        let tmp = enums.find(item => item.code === code);
        return tmp === undefined ? null : tmp.name
      },

      deleteSelection() {
        // console.log(this.$refs.table.getSelection())
        const list = this.$refs.table.getSelection();
        let tmp = list.find(item=>item.menulevel===1)
        if(tmp!==undefined){
          iview.Message.error({
            content: "模块菜单不允许删除！",
            duration: 2
          });
          this.delete_confirm = false;
          return;
        }
        // tmp = list.find(item=>item.parentsid==='M-1-200418164743')
        // if(tmp!==undefined){
        //   iview.Message.error({
        //     content: "系统菜单不允许删除！",
        //     duration: 2
        //   });
        //   this.delete_confirm = false;
        //   return;
        // }
        if (list.lenth > 0) {
          iview.Message.error({
            content: "未选择数据！",
            duration: 2
          });
          this.delete_confirm = false;
          return;
        }
        axios.post( `/PriMenuModel/deletemenu`, list).then(res => {
          if (res.data) {
            iview.Message.info({
              content: "删除成功！",
              duration: 2
            });

            this.getMenu(1);
            this.delete_confirm = false;

          }
        }).catch(exmsg => {
          iview.Message.error({
            content: exmsg,
            duration: 2
          });
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


        if (this.updateModel.menulabel == null || this.updateModel.menulabel === "") {
          iview.Message.error({
            content: "菜单名称不能为空！",
            duration: 2
          });
          this.updateModelSubmitCtrl = true;
          return;
        }


        axios.post( `/PriMenuModel/updatemenu`, this.updateModel).then(res => {

          if (res.data) {
            iview.Message.info({
              content: "更新成功！",
              duration: 2
            });
            this.updateModelSubmitCtrl = true;
            this.updateModelCtrl = false;
            this.getMenu(1)
            // this.insertModel.controlID = null;

          }
        }).catch(exsmes => {
          iview.Message.error({
            content: exsmes,
            duration: 2
          });
          this.updateModelSubmitCtrl = true;


        })

      }

    }
  }

</script>

<style lang="css">
  .ivu-table-overflowX {
    overflow-x: hidden;
  }
</style>

<style lang="less">
  .rolemodalstyle {

    color: #5aa5ff !important;
    font-size: 12px !important;
    font-family: "Microsoft YaHei";
    line-height: 20px !important;

    .ivu-input-number {
      width: 160px !important;
      height: 32px !important;
      border: 1px solid #888888;
    }

    .ivu-input {
      border: 1px solid #888888;
    }

  }

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
 -->
