<template lang="html">
  <div class="materialsmanage">
    <Form :label-width="125" v-model="searchModel">
      <Row>
        <Col span="6">
        <FormItem prop="materielid" :label="$t('common.materialId')">
          <Input v-model.sync="searchModel.materielid" @on-change="getMaterials(1)"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="materielname" :label="$t('common.materialName')">
          <Input v-model.sync="searchModel.materielname" @on-change="getMaterials(1)"></Input>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="warehouse" :label="$t('common.defaultWarehouse')">
          <Select v-model.sync="searchModel.warehouse" clearable @on-change="getDistricts;getMaterials(1)">
            <Option v-for="item in warehouses" :key="item.value" :value="item.label">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="district" :label="$t('common.defaultDistrict')">
          <Select v-model.sync="searchModel.district" clearable @on-change="getMaterials(1)">
            <Option v-for="item in districts" :key="item.value" :value="item.label">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="effective" :label="$t('common.whetherEnabled')">
          <Select v-model.sync="searchModel.effective" clearable @on-change="getMaterials(1)">
            <Option v-for="item in effectives" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="checktype" :label="$t('common.checkType')">
          <Select v-model.sync="searchModel.checktype" clearable @on-change="getMaterials(1)">
            <Option v-for="item in checkTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="iscontrolbatch" :label="$t('common.enableBatchno')" @on-change="getMaterials(1)">
          <Select v-model.sync="searchModel.iscontrolbatch" clearable>
            <Option v-for="item in effectives" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="6">
        <FormItem prop="iscontrolview" :label="$t('common.enableValidate')">
          <Select v-model.sync="searchModel.iscontrolview" clearable @on-change="getMaterials(1)">
            <Option v-for="item in effectives" :key="item.value" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
    </Form>

   <Table stripe border :height="tableHeight" row-key="materielid" :columns="columns" :data="materials"
      @on-row-dblclick="showUpdate" ref="table">

      </Table>

    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="pageNum" :page-size="pageSize" :page-size-opts="[10,20,30]"
        @on-change="changePagenum" @on-page-size-change="changePagesize"></Page>
    </div>

    <Modal v-model="specModal" closable :title="$t('actions.editPattern',[$t('common.material')+$t('common.package')])">
      <Form :model="specModel" class="formValidate" ref="specModel" :label-width="100" :rules="specValidate">
        <Row>
          <Col span="12">
            <FormItem :label="$t('common.numPerPack')" prop="specqty">
              <Input v-model="specModel.specqty" number></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('common.packType')" prop="packagetype">
              <Select v-model="specModel.packagetype">
                <Option v-for="item in packageTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('common.package')">
              <Input v-model="spec" readonly></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('common.packSize')" prop="packagesize">
              <Input v-model="specModel.packagesize" ></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="$t('common.whetherEnabled')" prop="effective">
              <Select v-model="specModel.effective">
                <Option v-for="item in effectives" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="flexEnd">
        <Button type="primary" @click="submit">{{$t('actions.submit')}}</Button>
      </div>
    </Modal>
    <FormModal :width="1000" :modal="updateModal" :formData="updateForm" :title="$t('actions.updatePattern',[$t('common.material')])" :submit="update" :cancel="()=>{this.updateModal=false}" @close="(e)=>{this.updateModal = e}">

    </FormModal>
  </div>
</template>

<script>
  import expandRow from '../../components/ExpandRow.vue'
  import ExpandSpec from "../../components/ExpandSpec.vue"
  import FormModal from "../../components/FormModal.vue"

  export default {
    components: {
      ExpandSpec,
      FormModal
    },

    data() {
      return {
        pageSize: 20,
        pageNum: 1,
        total: 0,

        checkTypes: [], //检验类型选项
        effectives:[], //是否……选项
        materielTypes:[], //物料类型
        warehouses:[], //仓库
        districts:[], //库区
        packageTypes:[], //包装类型
        dateunits:[], //日期单位

        tableHeight: 300,

        //物料的值
        materials: [],
        //查询条件
        searchModel: {},

        //物料基本信息的表头
        columns:[{
              key: 'select',
              type: 'selection',
              width: 60,
              align: 'center'
            },
            {title: this.$t('common.index'),align:"center",width:75,render:(h,params)=>{
              return h('div',params.index+1+this.pageSize*(this.pageNum-1))
            }},
            {
              title:this.$t('common.materialId'),
              key:"materielid",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.materialName'),
              key:"materielname",
              align:"center",
              width:100,
            },
            //包装规格
            {
              title:this.$t('common.package'),
              key:"specs",
              type:"expand",
              align:"center",
              width:100,
              render:(h,params)=>{
                if(params.row.specs){
                  return h(ExpandSpec,{
                    props:{
                      data:params.row.specs,
                      packageTypes:this.packageTypes
                    },
                    on:{
                      "updateSpec":(e)=>{
                        this.specModal = true
                        this.specModel = e;
                        this.model = params.row;
                        this.submit=this.updateSpec;
                      },
                      getMateriels:()=>{
                        this.getMaterials()
                      }
                    }
                  })
                }else{
                  return h("div","")
                }
              }

            },
            {
              title:this.$t('common.materialDesc'),
              key:"materieldescribe",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.rememberCode'),
              key:"remenbercode",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.materialType'),
              key:"materieltype",
              align:"center",
              width:100,
              render:(h,params)=>{
                return h("div",this.getLabel(this.materielTypes,params.row.materieltype))
              }
            },
            {
              title:this.$t('common.materialCode'),
              key:"facbatchno",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.whetherEnabled'),
              key:"effective",
              align:"center",
              width:100,
              render:(h,params)=>{
                return h('div',this.getLabel(this.effectives,params.row.effective))
              }
            },
            {
              title:this.$t('common.stockUnit'),
              key:"unit",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.defaultWarehouse'),
              key:"warehouse",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.defaultDistrict'),
              key:"district",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.maxSafetyStock'),
              key:"maxsafetystock",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.minSafetyStock'),
              key:"minsafetystock",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.enableBatchno'),
              key:"iscontrolbatch",
              align:"center",
              width:100,
              render:(h,params)=>{
                return h("div",this.getLabel(this.effectives,params.row.iscontrolbatch))
              }
            },
            {
              title:this.$t('common.checkType'),
              key:"checktype",
              align:"center",
              width:100,
              render:(h,params)=>{
                return h("div",this.getLabel(this.checkTypes,params.row.checktype))
              }
            },
            {
              title:this.$t('common.enableValidate'),
              key:"iscontrolview",
              align:"center",
              width:100,
              render:(h,params)=>{
                return h("div",this.getLabel(this.effectives,params.row.iscontrolview))
              }
            },
            {
              title:this.$t('common.rememberCode'),
              key:"effectivetime",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.recheckDate'),
              key:"rechecktime",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.nearValidate'),
              key:"approacheffectivetime",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.nearRecheck'),
              key:"approachrechecktime",
              align:"center",
              width:100,
            },
            {
              title:this.$t('common.enableSample'),
              key:"issampleout",
              align:"center",
              width:100,
              render:(h,params)=>{
                return h("div",this.getLabel(this.effectives,params.row.issampleout))
              }
            },{
              title:this.$t("common.action"),
              align:"center",
              width:120,
              render:(h,params)=>{
                return h("Button",{
                  props:{
                    type:"primary",
                    size:"small"
                  },
                  on:{
                    "click":(e)=>{
                      // console.log("添加规格")
                      this.specModal = true;
                      this.initSpecModel()
                      this.model = params.row;
                      this.submit = this.insertSpec;
                    }
                  }
                },this.$t("actions.addSpec"))
              }
            }
          ],
        specModal:false,
        //规格对话框的数据
        specModal:false,
        specModel:{
          specqty:null,
          packagetype:null,
          packagesize:null,
          effective:null
        },
        specValidate:{
          specqty:[{required:true,type:"number",message:"单包装数量不可为空",trigger:"change"}],
          packagetype:[{required:true,type:"number",message:"包装类型不可为空",trigger:"change"}],
          effective:[{required:true,type:"number",message:"是否启用不可为空",trigger:"change"}],
        },
        model:{}, //暂存添加规格的物料信息

        //更新物料信息
        updateModal:false,
        updateForm:{
          model:{},
          rule:[
            {
              title:this.$t('common.materialId'),
              type:"input",
              field:"materielid",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.materialName'),
              type:"input",
              field:"materielname",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.materialDesc'),
              type:"input",
              field:"materieldescribe",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.rememberCode'),
              type:"input",
              field:"remenbercode",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.materialType'),
              type:"Select",
              field:"materieltype",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.materialCode'),
              type:"input",
              field:"facbatchno",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.whetherEnabled'),
              type:"Select",
              field:"effective",
              value:"",
              props:{
                disabled:true
              },
              options:[],
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.stockUnit'),
              type:"input",
              field:"unit",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.defaultWarehouse'),
              type:"Select",
              field:"warehouse",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[],
              validate:[
                {required:true,message:"默认存储仓库不可为空",trigger:"change"}
              ],
              on:{
                "on-change":(e)=>{
                  this._axios("get","storageinfo/district",{warehouseid:this.getValue(this.warehouses,e)},(data)=>{
                    this.districts = this.arrConvert(data)
                    let arr=[]
                    this.districts.forEach(item=>{
                      arr.push({label:item.label,value:item.label})
                    })
                    // this.$set(this.updateForm.rule[9],"options",arr)
                    this.setOptions("district",arr)
                  })

                }
              }
            },
            {
              title:this.$t('common.defaultDistrict'),
              type:"Select",
              field:"district",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[],
              validate:[
                {required:true,message:"默认存储库区不可为空",trigger:"change"}
              ],
            },
            {
              title:this.$t('common.maxSafetyStock'),
              type:"InputNumber",
              field:"maxsafetystock",
              value:null,
              props:{
                number:true
              },
              col:{
                span:6
              },
              validate:[
                {type:"number",min:0.01,message:"最大安全库存必须大于0",trigger:"blur"}
              ]
            },
            {
              title:this.$t('common.minSafetyStock'),
              type:"InputNumber",
              field:"minsafetystock",
              value:null,
              props:{
                number:true
              },
              col:{
                span:6
              },
              validate:[
                {type:"number",min:0.01,message:"最小安全库存必须大于0",trigger:"blur"}
              ]
            },
            {
              title:this.$t('common.enableBatchno'),
              type:"Select",
              field:"iscontrolbatch",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.checkType'),
              type:"Select",
              field:"checktype",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              validate:[
                {required:true,type:"number",message:"检验类型不可为空",trigger:"change"}
              ],
              options:[]
            },
            {
              title:this.$t('common.enableSample'),
              type:"Select",
              field:"issampleout",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.enableValidate'),
              type:"Select",
              field:"iscontrolview",
              value:"",
              props:{
                disabled:true
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.validate'),
              type:"Input",
              field:"effectivetime",
              value:"",
              props:{
              },
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.validateUnit'),
              type:"Select",
              field:"effectivetimeunit",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.recheckDate'),
              type:"Input",
              field:"rechecktime",
              value:"",
              props:{
              },
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.recheckDateUnit'),
              type:"Select",
              field:"rechecktimeunit",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.nearValidate'),
              type:"Input",
              field:"approacheffectivetime",
              value:"",
              props:{
              },
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.nearValidateUnit'),
              type:"Select",
              field:"approacheffectivetimeunit",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[]
            },
            {
              title:this.$t('common.nearRecheck'),
              type:"Input",
              field:"approachrechecktime",
              value:"",
              props:{
              },
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.nearRecheckUnit'),
              type:"Select",
              field:"approachrechecktimeunit",
              value:"",
              props:{
              },
              col:{
                span:6
              },
              options:[]
            },


          ],
          option:{
            form:{
              labelWidth:120
            },
            submitBtn:{
              show:false
            }
          }
        },
        updateymd:"",

      }
    },
    computed:{
      spec(){
        return this.specModel.specqty&&this.specModel.packagetype ? `${this.specModel.specqty}${this.model.unit}/${this.getLabel(this.packageTypes,this.specModel.packagetype)}` : "";
      }
    },
    created() {
      this.getTypes();
      //获取全部物料信息
      this.getMaterials(1);

    },
    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 210;
      // this.updateForm.rule[6].options=this.effectives
    },
    methods: {
      submit() {
        // console.log(this.insertModel);
      },
      onSelectionChange(row) {
        this.deleteInfo = row;
        if (this.deleteInfo.length > 0) {
          this.deleteButtonFlag = false
        } else {
          this.deleteButtonFlag = true
        }
      },
      setOptions(field,data){
        this.updateForm.model.model()[field].options = data
        this.updateForm.model.sync(field)
      },
      //获取系统参数的方法
      async getTypes() {
        await this.getType("QCHKType",this.checkTypes);
        await this.getType("actiontype",this.effectives)
        await this.getType("goodstype",this.materielTypes)
        await this._axios("get","ware/wareenum",(data)=>{
          this.warehouses = this.arrConvert(data);
        })
        await this.getType("PakageType",this.packageTypes)
        await this.getType("dateunit",this.dateunits)

        let arr=[]
        this.warehouses.forEach(item=>{
          arr.push({label:item.label,value:item.label})
        })

        this.setOptions("materieltype",this.materielTypes)
        this.setOptions("effective",this.effectives)
        this.setOptions("warehouse",arr)
        this.setOptions("iscontrolbatch",this.effectives)
        this.setOptions("checktype",this.checkTypes)
        this.setOptions("issampleout",this.effectives)
        this.setOptions("iscontrolview",this.effectives)
        this.setOptions("effectivetimeunit",this.dateunits)
        this.setOptions("rechecktimeunit",this.dateunits)
        this.setOptions("approacheffectivetimeunit",this.dateunits)
        this.setOptions("approachrechecktimeunit",this.dateunits)

      },
      //根据仓库id获取其下的库区
      getDistricts(id){

        this._axios("get","storageinfo/district",{warehouseid:id},(data)=>{
          // this.districts = this.arrConvert(data)
          console.log(data)
          this.districts = [];
          data.forEach(item=>{
            this.districts.push({label:item.name,value:item.name})
          })
          this.setOptions("district",this.districts)
          console.log(this.districts)
        })
      },

      //根据条件获取物料信息
      getMaterials(num) {
        this.searchModel.pageSize = this.pageSize;
        this.searchModel.pageNum = num?num:this.pageNum;
        // this.searchModel.lang = this.$store.state.globalLang;
        //获取物料信息
        this._axios("get","mitem/mitems",this.searchModel,(data)=>{
          this.materials = data.list
          this.materials = JSON.parse(JSON.stringify(this.materials).replace(/children/g,"specs"));
          this.total = data.total;
        })
      },

      changePagenum(v) {
        this.pageNum = v;
        this.getMaterials()
      },
      changePagesize(v) {
        this.pageSize = v;
        this.getMaterials()
      },
      showUpdate(e,index){
        if(!this.$store.state.controls.M_2_200508094811_update)return;
        for(let i in e){
          this.updateForm.model.setValue(i,e[i])
        }
        this.updateForm.model.sync("maxsafetystock")
        this.updateForm.model.sync("minsafetystock")
        this.updateModal = true;
        this.updateymd = this.materials[index].updateymd;
        console.log(e)
        console.log(this.getValue(this.warehouses,e.warehouse))
        this.districts = this.getDistricts(this.getValue(this.warehouses,e.warehouse))
      },
      update(){
        let temp = this.updateForm.model.formData()
        temp.updateymd = this.updateymd
        this.checkValidate2(this.updateForm.model,()=>{
          this._axios("put","mitem/mitem",temp,(data)=>{
            this.getMaterials()
            this.updateModal = false;
          })

        })
      },
      initSpecModel(){
        this.specModel={
          specqty:null,
          packagetype:null,
          packagesize:null,
          effective:null
        }
      },
      //添加规格
      insertSpec(){
        this.checkValidate("specModel").then(res=>{
          if(res){
            this.specModel.materielid = this.model.materielid;
            for(let s of this.model.specs){
              if(s.packagetype == this.specModel.packagetype && s.specqty == this.specModel.specqty){
                this.$root.mes("error","w-20200709110431")
                return;
              }
            }
            this._axios("post","mitem/mitemspec",this.specModel,(data)=>{
              this.getMes("post",data)
              if(data){
                this.getMaterials()
                this.specModal = false;
                this.initSpecModel()
              }
            })
          }else{
            this.$root.mes("error","w-20200605135011")
          }
        })
      },
      updateSpec(){
        this._axios("put","mitem/mitemspec",this.specModel,(data)=>{
          this.getMes("put",data)
          this.getMaterials()
          this.specModal = false;
          this.initSpecModel()
        })
      }
    }
  }
</script>

<style lang="less">
  .materialsmanage{
    position: relative;
  }
</style>
