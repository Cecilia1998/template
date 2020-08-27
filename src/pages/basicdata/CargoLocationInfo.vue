<template>
  <div class="cargoLocationInfo">
    <Form :label-width="100" ref="storageForm" v-model="storageForm">
      <Row>
        <Col span="6">
          <FormItem prop="warehouseid" :label="$t('common.warehouse')">
            <Select clearable filterable v-model="storageForm.warehouseid" @on-change="getDistrict(storageForm.warehouseid);getStorages(1)">
              <Option v-for="item in warehouses" :key="item.value" :value="item.value?item.value:-1">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="districtid" :label="$t('common.district')">
            <Select clearable filterable v-model="storageForm.districtid" @on-change="getCargoarea(storageForm.districtid);getStorages(1)">
              <Option v-for="item in districts" :key="item.value" :value="item.value?item.value:-1">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="cargoareaid" :label="$t('common.cargoarea')">
            <Select clearable filterable v-model="storageForm.cargoareaid" @on-change="getStorages(1)">
              <Option v-for="item in cargoareas" :key="item.value" :value="item.value?item.value:-1">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="storageid" :label="$t('common.cargolocaId')">
            <Input v-model="storageForm.storageid" @on-change="getStorages(1)">
            </Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.row')">
            <Row>
              <Col span="11">
                <InputNumber v-model="storageForm.rowf" @on-change="getStorages(1)"></InputNumber>
              </Col>
              <Col span="2" style="text-align: center;">&minus;</Col>
              <Col span="11">
                <InputNumber v-model="storageForm.rows" @on-change="getStorages(1)"></InputNumber>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.col')">
            <Row>
              <Col span="11">
                <InputNumber v-model="storageForm.listf" @on-change="getStorages(1)"></InputNumber>
              </Col>
              <Col span="2" style="text-align: center;">&minus;</Col>
              <Col span="11">
                <InputNumber v-model="storageForm.lists" @on-change="getStorages(1)"></InputNumber>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.layer')">
            <Row>
              <Col span="11">
                <InputNumber v-model="storageForm.layerf" @on-change="getStorages(1)"></InputNumber>
              </Col>
              <Col span="2" style="text-align: center;">&minus;</Col>
              <Col span="11">
                <InputNumber v-model="storageForm.layers" @on-change="getStorages(1)"></InputNumber>
              </Col>
            </Row>
          </FormItem>
        </Col>
        <!-- <Col span="6">
          <FormItem prop="deep" label="深位">
            <Input v-model.sync="storageForm.deep"></Input>
          </FormItem>
        </Col> -->
        <Col span="6">
          <FormItem prop="status" :label="$t('common.status')">
            <Select clearable filterable v-model.sync="storageForm.status" @on-change="getStorages(1)">
              <Option v-for="(item,index) in statuses" :key="index" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="type" :label="$t('common.cargolocaType')">
            <Select clearable filterable v-model.sync="storageForm.type" @on-change="getStorages(1)">
              <Option v-for="(item,index) in locationtypes" :key="index" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8" push="10">
          <Button v-if="$store.state.controls.M_2_200608154417_insert" type="primary" shape="circle" class="btnForm" @click="showInsert">{{$t('actions.insert')}}</Button>
        </Col>
      </Row>
    </Form>

    <Table stripe border :height="tableHeight" :columns="columns" :data="storages" @on-sort-change="sortChange" @on-row-dblclick="showUpdate" ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="storageForm.total" :current="storageForm.pageNum"
            :page-size="storageForm.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePageNum" @on-page-size-change="changePageSize" style="text-align:center"></Page>
    </div>

    <FormModal :modal="insertModal" :width="1200" :title="$t('actions.insertPattern',[$t('common.cargoloca')])" :formData="insertFormData" :submit="insert" :cancel="()=>{insertModal = false}" @close="(e)=>{this.insertModal = e}"></FormModal>
    <FormModal :modal="updateModal" :width="1200" :title="$t('actions.updatePattern',[$t('common.cargoloca')])" :formData="updateFormData" :submit="update" :cancel="()=>{updateModal = false}" @close="(e)=>{this.updateModal = e}"></FormModal>
  </div>
</template>

<script>
import FormModal from "../../components/FormModal"
export default{
  name:"cargoLocationInfo",
  components:{
    FormModal
  },
  data (){
    return {
      //表单信息
      storageForm:{
        pageSize:20,
        pageNum:1,
        total:0
      },

      //系统参数信息
      warehouses:[],
      districts:[],
      cargoareas:[],
      locationtypes:[],
      statuses:[],

      //表格信息
      deleteInfo:[],
      tableHeight:400,
      storages:[], //货位信息
      columns:[
        // {
        //   type:"selection",
        //   title:"选择",
        //   align:"center",
        //   width:55
        // },
        {title: this.$t('common.index'),align:"center",width:75,render:(h,params)=>{
          return h('div',params.index+1+this.storageForm.pageSize*(this.storageForm.pageNum-1))
        }},
        {
          title:this.$t('common.warehouseName'),
          key:"warehousename",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.districtName'),
          key:"districtname",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.cargoareaName'),
          key:"cargoareaname",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.cargolocaId'),
          key:"storageid",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.row'),
          key:"row",
          sortable:'custom',
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.col'),
          key:"list",
          width:100,
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.layer'),
          key:"layer",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.deep'),
          key:"deep",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.cargolocaType'),
          key:"type",
          width:100,
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            return h('div',this.getLabel(this.locationtypes,params.row.type))
          }
        },
        {
          title:this.$t('common.status'),
          key:"status",
          width:100,
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            return h('div',this.getLabel(this.statuses,params.row.status))
          }
        },
        {
          title:this.$t('common.allowedWeight'),
          key:"weight",
          width:100,
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.allowedVol'),
          key:"volume",
          width:100,
          align:"center",
          tooltip:true,
        },
        {
          title:this.$t('common.allowedTrays'),
          key:"containnum",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:this.$t('common.inroad'),
          key:"inroad",
          align:"center",
          width:110,
          tooltip:true,
        },
        {
          title:this.$t('common.outroad'),
          key:"outroad",
          align:"center",
          width:110,
          tooltip:true,
        },
        {
          title:this.$t('common.seq'),
          key:"seq",
          align:"center",
          width:100,
          tooltip:true,
        },
      ],

      //对话框数据
      insertModal:false,
      insertFormData:{
        model:{
        },
        rule:[
          {
            title:this.$t('common.warehouse'),
            type:"Select",
            field:"warehouseid",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
            validate:[
              {required:true,message:this.$t('message.empty',[this.$t('common.warehouse')]),trigger:"change"}
            ],
            on:{
              "on-change":(e)=>{
                console.log(e)
                this._axios("get","storageinfo/district",{warehouseid:e},(data)=>{
                  let arr = this.arrConvert(data)
                  this.insertFormData.model.model()['districtid'].options = arr;
                  this.insertFormData.model.sync("districtid")
                })

              }
            }
          },
          {
            title:this.$t('common.district'),
            type:"Select",
            field:"districtid",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
            validate:[
              {required:true,message:this.$t('message.empty',[this.$t('common.district')]),trigger:"change"}
            ],
            on:{
              "on-change":(e)=>{
                this._axios("get","storageinfo/cargoarea",{districtid:e},(data)=>{
                  let arr=this.arrConvert(data)
                  this.insertFormData.model.model()['cargoareaid'].options = arr;
                  this.insertFormData.model.sync("cargoareaid")
                })

              }
            }
          },
          {
            title:this.$t('common.cargoarea'),
            type:"Select",
            field:"cargoareaid",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
            validate:[
              {required:true,message:this.$t('message.empty',[this.$t('common.cargoarea')]),trigger:"change"}
            ],
          },
          {
            title:this.$t('common.row'),
            type:"InputNumber",
            field:"row",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.col'),
            type:"InputNumber",
            field:"list",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.layer'),
            type:"InputNumber",
            field:"layer",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.deep'),
            type:"InputNumber",
            field:"deep",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.cargolocaType'),
            type:"Select",
            field:"type",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
          },
          {
            title:this.$t('common.status'),
            type:"Select",
            field:"status",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
          },
          {
            title:this.$t('common.allowedWeight'),
            type:"InputNumber",
            field:"weight",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.allowedVol'),
            type:"InputNumber",
            field:"volume",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.allowedTrays'),
            type:"InputNumber",
            field:"containnum",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.inroad'),
            type:"Input",
            field:"inroad",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.outroad'),
            type:"Input",
            field:"outroad",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.seq'),
            type:"InputNumber",
            field:"seq",
            value:null,
            props:{
            },
            col:{
              span:6
            },
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
      updateModal:false,
      updateFormData:{
        model:{

        },
        rule:[
          {
            title:this.$t('common.cargolocaId'),
            type:"Input",
            field:"storageid",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.row'),
            type:"InputNumber",
            field:"row",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.col'),
            type:"InputNumber",
            field:"list",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.layer'),
            type:"InputNumber",
            field:"layer",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.deep'),
            type:"InputNumber",
            field:"deep",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.cargolocaType'),
            type:"Select",
            field:"type",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
          },
          {
            title:this.$t('common.status'),
            type:"Select",
            field:"status",
            value:"",
            props:{
            },
            col:{
              span:6
            },
            options:[],
          },
          {
            title:this.$t('common.allowedWeight'),
            type:"InputNumber",
            field:"weight",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.allowedVol'),
            type:"InputNumber",
            field:"volume",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.allowedTrays'),
            type:"InputNumber",
            field:"containnum",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.inroad'),
            type:"Input",
            field:"inroad",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.outroad'),
            type:"Input",
            field:"outroad",
            value:null,
            props:{
            },
            col:{
              span:6
            },
          },
          {
            title:this.$t('common.seq'),
            type:"InputNumber",
            field:"seq",
            value:null,
            props:{
            },
            col:{
              span:6
            },
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
      }
    }
  },
  created() {
    this.getStorages()
    this.getTypes();


  },
  mounted() {
    this.tableHeight = window.innerHeight-this.$refs.table.$el.offsetTop-140;
  },
  methods:{
    //货区系统参数
    async getTypes(){
      await this._axios("get","ware/wareenum",(res)=>{
        this.warehouses = this.arrConvert(res)
      })

      await this.getType("locationtype",this.locationtypes)
      await this.getType("locationstatustype",this.statuses);
      this.insertFormData.model.model()["warehouseid"].options = this.warehouses
      this.insertFormData.model.sync("warehouseid")
      this.insertFormData.model.model()["type"].options = this.locationtypes
      this.insertFormData.model.model()["status"].options = this.statuses
      this.updateFormData.model.model()["type"].options = this.locationtypes
      this.updateFormData.model.model()["status"].options = this.statuses
    },
    getDistrict(e){ //根据仓库id获取下面的库区
      this.districts=[]
      console.log("仓库id：",e)
      this._axios("get","storageinfo/district",{warehouseid:e},(res)=>{
        if(res.length>0){
          // this.districts = res;
          this.districts = this.arrConvert(res);
           console.log(this.districts)
        }
      })
    },
    getCargoarea(e){ //根据库区id获取下面的货区
      this.cargoareas = [];
      this._axios("get","storageinfo/cargoarea",{districtid:e},(res)=>{
        console.log(res)
        if(res.length>0){
          // this.cargoareas = res;
          this.cargoareas = this.arrConvert(res);
        }
        console.log(this.cargoareas)
      })
    },

    changePageNum(e){
      this.storageForm.pageNum = e;
      this.getStorages();
    },
    changePageSize(e){
      this.storageForm.pageSize = e;
      this.getStorages();
    },
    submit(){
      console.log("对话框数据",this.model)
    },
    cancel(){
      this.modal = false;
      // if(this.title == "更新货位"){
      //   // this.formData.rule.unshift(this.createSelect("warehouseid","仓库",this.warehouses,6,this.getDistrict),
      //   //   this.createSelect("districtid","库区",[],6,this.getCargoarea),
      //   //   this.createSelect("cargoareaid","货区",[],6))
      //   for(var i of this.formData.rule){
      //     i.value = null;
      //   }
      // }
      // if(this.title == '新增货位'){
      //   this.formData.rule.splice(3,0,this.storageid)
      // }
    },
    //操作
    showInsert(){

      this.insertModal = true;
    },
    showUpdate(e){
      if(!this.$store.state.controls.M_2_200608154417_update) return;
      for(let i in e){
        this.updateFormData.model.setValue(i,e[i])
      }
      this.updateModal = true;
    },
    //获取全部货位信息
    getStorages(num){
      if(num) this.storageForm.pageNum = num;
      console.log(this.storageForm)
      this._axios("get","storageinfo/storageinfos",this.storageForm,(res)=>{
        this.storageForm.total = res.total;
        console.log(res.list)
        this.storages = res.list;
      })

    },
    //新增货位
    insert(){
      var insertForm = this.insertFormData.model.formData()
      console.log(insertForm)
      this._axios("post","storageinfo/storageinfoi",insertForm,(data)=>{
        this.getStorages();
        this.modal = false;
      })

    },
    //更新货位
    update(){
      var updateForm = this.insertFormData.model.formData()
      this._axios("put","storageinfo/storageinfou",updteForm,(data)=>{
        this.getStorages()
      })
      this.modal = false;

    },
    sortChange({column,key,order}){
      this.storageForm.orderby = key+" "+order;
      this.getStorages()
    },

  }
}
</script>

<style lang="less">
  .cargoLocationInfo{
    .ivu-input-number{
      width: 98%;
    }
    .ivu-input-number.ivu-input-number-default{
      width: 100%;
    }
  }
</style>
