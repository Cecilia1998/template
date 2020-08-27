<template lang="html">
  <div class="cargoAreaManage">
    <Form v-model.sync="cargoForm" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem prop="remark1" :label="$t('common.warehouseName')">
            <Select clearable v-model.sync="cargoForm.remark1" @on-change="getDists(cargoForm.remark1)">
              <Option v-for="item in warehouses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="remark" :label="$t('common.districtName')">
            <Select clearable v-model.sync="cargoForm.districtid" @on-change="getCargos(1)">
              <Option v-for="item in dists" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="cargoareaid" :label="$t('common.cargoareaId')">
            <Input clearable v-model.sync="cargoForm.cargoareaid"  @on-change="getCargos(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="cargoareaname" :label="$t('common.cargoareaName')">
            <Input clearable v-model.sync="cargoForm.cargoareaname"  @on-change="getCargos(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="cargoareatype" :label="$t('common.cargoareaType')">
            <Select clearable v-model.sync="cargoForm.cargoareatype"  @on-change="getCargos(1)">
              <Option v-for="item in cargoareaTypes" :key="item.value" :value = "item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="isstart" :label="$t('common.effective')">
            <Select clearable v-model.sync="cargoForm.isstart"  @on-change="getCargos(1)">
              <Option v-for="item in isstartTypes" :key="item.value" :value = "item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="seq" :label="$t('common.seq')"  @on-change="getCargos(1)">
            <Input clearable v-model.sync="cargoForm.seq"></Input>
          </FormItem>
        </Col>

      </Row>
    </Form>
    <div class="spaceBetween">
      <div>
         <Button v-if="$store.state.controls.M_2_200608141947_delete" class="btnForm" :type="deleteButtonFlag?'default':'error'" shape="circle" @click="deleteconfirm" icon="md-trash">{{$t('actions.deleteSelected')}}
        </Button>
      </div>
      <div>
        <Button v-if="$store.state.controls.M_2_200608141947_insert" type="primary" shape="circle" class="btnForm" @click="showInsert">{{$t('actions.insert')}}</Button>
      </div>
    </div>
    <Table stripe border :height="tableHeight" :columns="columns" :data="cargos"
      @on-selection-change="onSelectionChange" @on-row-dblclick="showUpdate"
      ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="cargoForm.total" :current="cargoForm.pagenum"
            :page-size="cargoForm.pagesize"
            :page-size-opts="[10,20,30]"
            @on-change="changePageNum" @on-page-size-change="changePageSize" style="text-align:center"></Page>
    </div>

    <FormModal :title="title" :modal="modal" :formData="formData" @close="(e)=>{this.modal =e}" :submit="submit" :cancel="cancel"></FormModal>
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

      cargoForm:{
        pagesize:20,
        pagenum:1,
        total:0,
      },

      isstartTypes:[], //是否启用的信息
      cargoareaTypes:[], //货区类型的信息
      dists:[], //全部库区的集合
      warehouses:[], //全部仓库的集合

      deleteButtonFlag:true,
      delete_confirm: false,
      deleteInfo:[],
      //表单对话框的信息
      title:"默认标题",
      modal:false,
      cargoareaid:{
            title:this.$t('common.cargoareaId'),
            type:"input",
            value:"",
            field:"cargoareaid",
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
            title:this.$t('common.warehouseName'),
            type:"select",
            value:"",
            field:"remark2",
            options:[],
            col:{
              span:12
            },
            event:{
              change:this.warehouseChange
            }
          },
          {
            title:this.$t('common.districtName'),
            type:"select",
            value:"",
            field:"districtid",
            options:[],
            validate:[
              {required:true,message:this.$t('message.empty',[this.$t('common.districtName')]),trigger:"change"}
            ],
            col:{
              span:12
            },
          },
          {
            title:this.$t('common.cargoareaId'),
            type:"input",
            value:"",
            field:"cargoareaid",
            col:{
              span:12
            },
            props:{
              readonly:true
            }
          },
          {
            title:this.$t('common.cargoareaName'),
            type:"input",
            value:"",
            field:"cargoareaname",
            col:{
              span:12
            },
            validate:[
              {required:true, message:this.$t('message.empty',[this.$t('common.cargoareaName')]),trigger:"change"},
              {pattern:/\S+/,message:this.$t('message.emptyStr',[this.$t('common.cargoareaName')]),trigger:"change"}
            ]
          },
          {
            title:this.$t('common.cargoareaType'),
            type:"select",
            value:"",
            field:"cargoareatype",
            col:{
              span:12
            },
            props:{
              number:true,
            },
            validate:[
              {required:true,type:"number",message:this.$t('message.empty',[this.$t('common.cargoareaType')]),trigger:"change"}
            ],
            options:[],
          },
          {
            title:this.$t('common.effective'),
            type:"select",
            value:"",
            field:"isstart",
            col:{
              span:12
            },
            options:[]
          },
          {
            title:this.$t('common.seq'),
            type:"input",
            value:"",
            field:"seq",
            col:{
              span:12
            },
            props:{
              number:true
            },
            validate:[
              {pattern:/^\d*$/,message:"只可输入正整数数字",trigger:"change"}
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

      //表格信息
      columns:[
        {
          key: 'select',
          type: 'selection',
          width: 55,
          align: 'center'
        },
        {
          title: this.$t('common.index'),
          key: 'index',
          align: 'center',
          render:(h,params)=>{
            return h('div',params.index+1+this.cargoForm.pagesize*(this.cargoForm.pagenum-1))
          }
        },
        {
          title:this.$t('common.warehouseName'),
          key:"remark1",
          align:"center",
          tooltip:true
        },
        {
          title:this.$t('common.districtName'),
          key:"remark",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.cargoareaId'),
          key:"cargoareaid",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.cargoareaName'),
          key:"cargoareaname",
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.cargoareaType'),
          key:"cargoareatype",
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            for(let i of this.cargoareaTypes){
              if(i.value == params.row.cargoareatype){
                return h('div',i.label)
              }
            }
          }
        },
        {
          title:this.$t('common.effective'),
          key:"isstart",
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            for(let i of this.isstartTypes){
              if(i.value == params.row.isstart){
                return h('div',i.label)
              }
            }
          }
        },
        {
          title:this.$t('common.seq'),
          key:"seq",
          align:"center",
          tooltip:true,
        },
      ],
      cargos:[], //资源信息
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
      return model;
    }
  },

  created() {
    this.getTypes();
  },

  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140;
    this.getCargos();
  },
  methods: {
    transferType(orign,des){
      for(let i of orign){
        des.push({label:i.name,value:i.code})
      }
    },
    getDists(code){
      this.dists = [];
      this._axios("get","storageinfo/district",{warehouseid:code},data=>{
        this.dists = this.arrConvert(data)
        this.formData.model.model()["districtid"].options = this.dists;
      })
      // this.$axios.get(`/dist/distenum?code=${code}`).then(res=>{
      //   // console.log(res)
      //   this.transferType(res.data,this.dists)
      //   this.formData.model.model()["districtid"].options = this.dists;
      // }).catch(err=>{
      //   console.log(err)
      // })
    },
    async getTypes(){
      await this.getType("warehouseareatype",this.cargoareaTypes);
      this.formData.model.model()["cargoareatype"].options = this.cargoareaTypes;
      await this.getType("actionflg",this.isstartTypes);
      this.formData.model.model()["isstart"].options = this.isstartTypes;
      await this.$axios.get("/ware/wareenum").then(res=>{
        // console.log("仓库枚举：",res)
        if(res.code === 0){
          // for(let i of res.data){
          //   this.warehouses.push({label:i.name,value:i.code})
          // }
          this.transferType(res.data,this.warehouses)
          this.formData.model.model()["remark2"].options = this.warehouses;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    warehouseChange(e){
      // console.log(e)
      this.getDists(e)
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
            }else{
              //提示删除失败
            }
        })
        .catch(err => {console.log(err) })
      }
    },
    clearFormData(){
      for(let i of this.formData.rule){
        i.value = null;
      }
    },
    showInsert(){

      // this.title = "新增货区";
      // switch(this.$store.state.globalLang){
      //   case "CN":
      //   this.title = "新增货区"
      //   break;
      //   case "EN":
      //   this.title = "Insert Cargo Area"
      //   break;
      //   case "JP":
      //   this.title = "貨物区を増やす"
      //   break;
      // }
      this.title = this.$t("actions.insertPattern",[this.$t("common.cargoarea")])
      this.clearFormData();
      this.formData.rule.splice(2,1);
      this.submit = this.insert;
      this.modal = true;
    },
    showUpdate(e){
      if(!this.$store.state.controls.M_2_200608141947_update) return;
      console.log(e)
      this.modal = true;
      this.title = this.$t("actions.updatePattern",[this.$t("common.cargoarea")])
      // switch(this.$store.state.globalLang){
      //   case "CN":
      //   this.title = "更新货区"
      //   break;
      //   case "EN":
      //   this.title = "Update Cargo Area"
      //   break;
      //   case "JP":
      //   this.title = "更新貨物区"
      //   break;
      // }
      this.submit = this.update;
      // this.formData.rule.unshift(this.rid);
      //把当前行的信息赋值给对话框中的表单
      for(let i of this.formData.rule){
        i.value = e[i.field]
      }
    },
    changePageNum(e){
      this.cargoForm.pagenum = e;
      this.getCargos();
    },
    changePageSize(e){
      this.cargoForm.pagesize = e;
      this.getCargos();
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
    getCargos(num){
      if(num) this.cargoForm.pagenum = num;
      this.$axios.get("/cargoareainfo/pageinfo",{params:this.cargoForm}).then(res=>{
        if(res.code === 0){
          this.cargoForm.total = res.data.total;
          this.cargos = res.data.list;
        }else{
          this.$root.mes("error","w-20200608125910") //提示用户查询失败
          console.log(res.message);
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    insert(){
      console.log(this.formModel)
      this.checkValidate2(this.formData.model,()=>{
        this.$axios.post('/cargoareainfo/info',this.formModel).then(res=>{
          console.log(res)
          if(res.code === 0){
            this.$root.mes("info","w-20200430131600") //提示用户新增成功
            this.getCargos();
            this.modal = false;
            this.formData.rule.splice(2,0,this.cargoareaid)
          }else{
            this.$root.mes("error","w-20200608125822") //新增失败
          }
          this.getCargos();
        }).catch(err=>{
          console.log(err)
        })
      })

    },
    update(){
      this.checkValidate2(this.formData.model,()=>{
        this.$axios.put('/cargoareainfo/info',this.formModel).then(res=>{
          // console.log(res)
          if(res.message == "success"){
            this.$root.mes("info","w-20200430131709"); //提示更新成功
            this.modal = false;
            this.getCargos();
          }else{
            this.$root.mes("error","w-20200605180340") //提示用户更新失败
          }
        }).catch(err=>{
          console.log(err)
        })
      })

    },
    delete(){
      this.$axios.delete('/cargoareainfo/listinfo',{data:this.deleteInfo}).then(res=>{
        // console.log(res)
        if(res.code === 0){
          this.$root.mes("info","w-20200430131813")  //提示删除成功
        }else{
          this.$root.mes("error","w-20200601145237") //提示删除失败
        }
        this.getCargos();
      }).catch(err=>{
        console.log(err)
      })
    },
    submit(){
      console.log("提交")
    },
    cancel(){
      this.modal = false;
      if(this.title == this.$t("actions.insertPattern",[this.$t("common.cargoarea")])){
        this.formData.rule.splice(2,0,this.cargoareaid)
      }
    }

  }
}

</script>

<style lang="less">

</style>
