<template lang="html">
  <div class="resourceManage">
    <Form ref="resForm" v-model.sync="resForm" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem prop="rid" :label="$t('common.resourceId')">
            <Input clearable v-model.sync="resForm.rid" @on-change="getRes(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">     <!-- 之后要修改为可判断系统语言的形式-->
          <FormItem prop="name" :label="$t('common.resourceName')">
            <Input clearable v-model.sync="resForm.name" @on-change="getRes(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="rtype" :label="$t('common.resourceType')">
            <Select clearable v-model.sync="resForm.rtype" @on-change="getRes(1)">
              <Option v-for="item in resTypes" :key="item.value" :value = "item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="effective" :label="$t('common.effective')">
            <Select clearable v-model.sync="resForm.effective" @on-change="getRes(1)">
              <Option v-for="item in effectiveEnum" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>

      </Row>
    </Form>
    <div class="spaceBetween">
      <div>
         <Button v-if="$store.state.controls.M_2_200509103942_delete" class="btnForm" :type="deleteButtonFlag?'default':'error'" shape="circle" @click="deleteconfirm" icon="md-trash">{{$t('actions.deleteSelected')}}
        </Button>
      </div>
      <div>
        <Button v-if="$store.state.controls.M_2_200509103942_insert" type="primary" shape="circle" class="btnForm" @click="showInsert">{{$t('actions.insert')}}</Button>
      </div>
    </div>
    <Table stripe border :height="tableHeight" :columns="columns" :data="resources"
      @on-selection-change="onSelectionChange" @on-row-dblclick="showUpdate"
      ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="resForm.total" :current="resForm.pagenum"
            :page-size="resForm.pagesize"
            :page-size-opts="[10,20,30]"
            @on-change="changePageNum" @on-page-size-change="changePageSize" style="text-align:center"></Page>
    </div>

    <FormModal :title="title" :modal="modal" :formData="formData" :submit="submit" :cancel="cancel" @close="(e)=>{this.modal=e}"></FormModal>
  </div>
</template>

<script>
import FormModal from "../../components/FormModal"
export default {
  components: {
    FormModal
  },

  data() {
    return {
      tableHeight:300,

      resForm:{
        pagesize:20,
        pagenum:1,
        total:0,
      },

      effectiveEnum:[],
      resTypes:[],
      datasources:[],

      deleteButtonFlag:true,
      delete_confirm: false,
      deleteInfo:[],
      //表单对话框的信息
      title:"默认标题",
      modal:false,
      rid:{
            title:this.$t('common.resourceId'),
            type:"input",
            value:"",
            field:"rid",
            col:{
              span:12
            },
            props:{
              readonly:true
            }
          },
      formData:{
        model:{},
        rule:[
          {
            title:this.$t('common.resourceChineseName'),
            type:"input",
            value:"",
            field:"cnname",
            col:{
              span:12
            },
            validate:[
              {required:true, message:this.$t('message.empty',[this.$t('common.resourceName')]),trigger:"change"},
              {pattern:/\S+/,message:this.$t('message.emptyStr',[this.$t('common.resourceName')]),trigger:"change"}
            ]
          },
          {
            title:this.$t('common.resourceEnglishName'),
            type:"input",
            value:"",
            field:"enname",
            col:{
              span:12
            },
            validate:[
              {required:true, message:this.$t('message.empty',[this.$t('common.resourceName')]),trigger:"change"},
              {pattern:/\S+/,message:this.$t('message.emptyStr',[this.$t('common.resourceName')]),trigger:"change"}
            ]
          },
          {
            title:this.$t('common.resourceJapaneseName'),
            type:"input",
            value:"",
            field:"jpname",
            col:{
              span:12
            },
            validate:[
              {required:true, message:this.$t('message.empty',[this.$t('common.resourceName')]),trigger:"change"},
              {pattern:/^\S+/,message:this.$t('message.emptyStr',[this.$t('common.resourceName')]),trigger:"change"}
            ]
          },
          {
            title:this.$t('common.resourceType'),
            type:"select",
            value:"",
            field:"rtype",
            col:{
              span:12
            },
            options:[],
            props:{
              number:true
            },
            validate:[
              {required:true,type:"number",message:this.$t('message.empty',[this.$t('common.resourceType')]),trigger:"change"}
            ]
          },
          {
            title:this.$t('common.companyAddr'),
            type:"input",
            value:"",
            field:"companyaddress",
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.deliveryAddr'),
            type:"input",
            value:"",
            field:"rsaddress",
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.unicode'),
            type:"input",
            value:"",
            field:"unifiedcode",
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.license'),
            type:"input",
            value:"",
            field:"license",
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.contact'),
            type:"input",
            value:"",
            field:"contacts",
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.phone'),
            type:"input",
            value:"",
            field:"telephone",
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.effective'),
            type:"select",
            value:0,
            field:"effective",
            options:[],
            col:{
              span:12
            },
            props:{
              number:true,
            },
            validate:[
              {required:true,type:"number",message:this.$t('message.empty',[this.$t('common.effective')]),trigger:"change"}
            ]
          },
        ],
        option:{
          form:{
            labelWidth:100,
          },
          submitBtn:{
            show:false,
          }
        }
      },
      //表单对话框的信息

      columns:[
        {
          key: 'select',
          type: 'selection',
          width: 55,
          align: 'center'
        },
        {title: this.$t('common.index'),align:"center",width:75,render:(h,params)=>{
          return h('div',params.index+1+this.resForm.pagesize*(this.resForm.pagenum-1))
        }},
        {
          title:this.$t('common.resourceId'),
          key:"rid",
          align:"center",
          tooltip:true
        },
        {
          title:this.$t('common.resourceName'),
          // key:"rname",
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            switch(this.$store.state.globalLang){
              case "CN":
                return h('div',params.row.cnname)
              case "EN":
                return h('div',params.row.enname)
              case "JP":
                return h('div',params.row.jpname)
            }
          }
        },
        {
          title:this.$t('common.resourceType'),
          key:"rtype",
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            for(let i of this.resTypes){
              if(i.value == params.row.rtype){
                return h('div',i.label)
              }
            }
          }
        },
        {
          title:this.$t('common.companyAddr'),
          key:"companyaddress",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.deliveryAddr'),
          key:"rsaddress",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.unicode'),
          key:"unifiedcode",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.license'),
          key:"licence",
          align:"center",
          width:125,
          tooltip:true,
        },
        {
          title:this.$t('common.contact'),
          key:"contacts",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.phone'),
          key:"telephone",
          width:115,
          tooltip:true,
          align:"center"
        },
        {
          title:this.$t('common.effective'),
          key:"effective",
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            return h('div',params.row.effective===0?"失效":"有效")
          }
        },
        {
          title:this.$t('common.datasource'),
          key:"datasource",
          align:"center",
          tooltip:true,
        }
      ],
      resources:[], //资源信息
    }
  },

  computed:{
    formModel(){
      var model={}
      for(let i of this.formData.rule){
        if(typeof i.value == "String"){
          model[i.field] = i.value.trim();
        }else{
          model[i.field] = i.value;
        }

      }
      model.datasource = "WMS";
      return model;
    }
  },

  created() {
    this.getTypes();
    this.getRes();
  },

  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;

  },
  methods: {
    async getTypes(){
      await this.getType("resourcestype",this.resTypes)
      await this.getType("actionflg",this.effectiveEnum)
      this.formData.model.model()["effective"].options = this.effectiveEnum;
      this.formData.model.model()["rtype"].options = this.resTypes;
    },

    deleteconfirm(){
      if(this.deleteButtonFlag){
        // 提示选择要删除的数据
        this.$root.mes('error','w-20200521173305')
      }else{
        this.$root.mes('warn','w-20200512154954')
        .then(res => {
            if(res){
              //删除资源信息
              this.delete();
            }
        })
        .catch(err => {console.log(err) })
      }
    },
    clearFormData(){
      for(let i of this.formData.rule){
        i.value = null;
      }
      this.formData.model.model()["effective"].value = 0;
    },
    showInsert(){
      this.modal = true;
      this.title = this.$t('actions.insertPattern',[this.$t('common.resource')])
      // switch(this.$store.state.globalLang){
      //   case "CN":
      //   this.title = "新增资源"
      //   break;
      //   case "EN":
      //   this.title = "Insert Resource"
      //   break;
      //   case "JP":
      //   this.title = "資源を増やす"
      //   break;
      // }
      this.clearFormData();
      this.submit = this.insert;
    },
    showUpdate(e){
      // console.log(e)
      if(!this.$store.state.controls.M_2_200509103942_update) return;
      this.modal = true;
      this.title = this.$t('actions.updatePattern',[this.$t('common.resource')])
      // switch(this.$store.state.globalLang){
      //   case "CN":
      //   this.title = "更新资源"
      //   break;
      //   case "EN":
      //   this.title = "Update Resource"
      //   break;
      //   case "JP":
      //   this.title = "資源を更新する"
      //   break;
      // }
      this.submit = this.update;
      this.formData.rule.unshift(this.rid);
      //把当前行的信息赋值给对话框中的表单
      for(let i of this.formData.rule){
        i.value = e[i.field]
      }
    },
    changePageNum(e){
      this.resForm.pagenum = e;
      this.getRes();
    },
    changePageSize(e){
      this.resForm.pagesize = e;
      this.getRes();
    },
    onSelectionChange(row) {
      this.deleteInfo = row;
      if (this.deleteInfo.length > 0) {
        this.deleteButtonFlag = false
      } else {
        this.deleteButtonFlag = true
      }
    },
    //根据信息查询资源信息
    getRes(num){
      switch(this.$store.state.globalLang){
        case "CN":
          this.resForm.cnname = this.resForm.name;
          break;
        case "EN":
          this.resForm.enname = this.resForm.name;
          break;
        case "JP":
          this.resForm.jpname = this.resForm.name;
          break;

      }
      console.log(this.resForm)
      if(num) this.resForm.pagenum = num;
      this._axios("get","resourceinfo/pageinfo",this.resForm,(data)=>{
        this.resForm.total = data.total;
        this.resources = data.list;
      })
    },
    insert(){
      console.log(this.formModel)
      this.checkValidate2(this.formData.model,()=>{
        this._axios("post","resourceinfo/info",this.formModel,()=>{
          this.$root.mes("info","w-20200430131600")
          this.getRes()
          this.modal = false;
        })
      })
    },
    update(){
      this.checkValidate2(this.formData.model,()=>{
        this._axios("put","/resourceinfo/info",this.formModel,(data)=>{
          this.modal = false;
          this.getRes();
          this.formData.rule.shift();
        })
      })
    },
    delete(){
      this._axios("delete","resourceinfo/listinfo",this.deleteInfo,()=>{this.getRes()})
    },
    submit(){
      console.log("提交")
    },
    cancel(){
      if(this.title == this.$t('actions.updatePattern',[this.$t('common.resource')])){
        this.formData.rule.shift();
      }
      this.modal = false;
    }

  }
}

</script>

<style lang="less">

</style>
