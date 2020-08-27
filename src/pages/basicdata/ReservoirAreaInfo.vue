<template>
  <div class="reservoirAreaInfo">
    <Form ref="form" v-model.sync="form" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem prop="warehouseId" :label="$t('common.warehouseName')">
            <!-- <Input clearable v-model.sync="form.warehouseId" @on-change="getDistricts"></Input> -->
            <Select clearable v-model.sync = "form.warehouseId" @on-change="getDistricts(1)">
              <Option v-for="item in warehouses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="districtId" :label="$t('common.districtId')">
            <Input clearable v-model.sync="form.districtId" @on-change="getDistricts(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="districtName" :label="$t('common.districtName')">
            <Input clearable v-model.sync="form.districtName" @on-change="getDistricts(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="isStart" :label="$t('common.effective')">
            <Select clearable v-model.sync="form.isStart" @on-change="getDistricts(1)">
              <Option v-for="item in isStarts" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="spaceBetween">
      <div>
         <Button v-if="$store.state.controls.M_2_200511093935_delete" class="btnForm" :type="deleteButtonFlag?'default':'error'" shape="circle" @click="deleteConfirm" icon="md-trash">{{$t('actions.deleteSelected')}}
        </Button>
      </div>
      <div>
        <Button v-if="$store.state.controls.M_2_200511093935_insert" type="primary" shape="circle" class="btnForm" @click="showInsert">{{$t('actions.insert')}}</Button>
      </div>
    </div>
    <Table stripe border :height="tableHeight" :columns="columns" :data="districts"
      @on-selection-change="v=>deleteButtonFlag=v.length<=0" @on-row-dblclick="showUpdate"
      ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="form.total" :current="form.pageNum"
            :page-size="form.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePageNum" @on-page-size-change="changePageSize" style="text-align:center"></Page>
    </div>

    <FormModal :title="title" :width="1000" :modal="modal" :formData="formData" :submit="submit" :cancel="cancel" @close="(e)=>{this.modal =e}"></FormModal>
  </div>
</template>

<script>
import FormModal from "../../components/FormModal"
  export default{
    name:"reservoirAreaInfo",
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
        isStarts:[],
        warehouses:[],

        //操作数据
        deleteButtonFlag:true,

        //表格数据
        tableHeight:300,
        districts:[],
        columns:[
          {key: 'select',type: 'selection', width: 55,align: 'center'},
          {title: this.$t('common.index'),align:"center",width:75,render:(h,params)=>{
            return h('div',params.index+1+this.form.pageSize*(this.form.pageNum-1))
          }},
          {title: this.$t('common.districtId'), key: 'districtId',width: 200,align: 'center'},
          {title: this.$t('common.districtName'), key: 'districtName', align: 'center'},
          {title: this.$t('common.superiorWareId'), key: 'warehouseId',width: 200,align: 'center'},
          {title: this.$t('common.warehouseName'), key: 'warehouseName', align: 'center'},
          {title: this.$t('common.districtType'), key: 'remark2',width: 120,align: 'center' },
          {title:this.$t('common.locaNum'), key: 'storageNum',width: 120, align: 'center'},
          {title:this.$t('common.effective'), key: 'isStart', width: 120,align: 'center',
          render:(h,params)=>{
            return h('div',this.getLabel(this.isStarts,params.row.isStart))
          }},
        ],

        //对话框数据
        title:this.$t("actions.insertPattern",[this.$t("common.district")]),
        modal:false,
        model:{},
        districtid:{
              title:this.$t('common.districtId'),
              type:"input",
              field:"districtId",
              value:"",
              col:{
                span:6
              },
              props:{
                readonly:true
              }
            },
        formData:{
          model:{},
          rule:[
            // {
            //   title:"仓库名称",
            //   type:"select",
            //   field:"warehouseId",
            //   value:"",
            //   col:{
            //     span:6
            //   },
            //   options:[],
            //   validate:[
            //     {required:true,message:"仓库名称不可为空",trigger:"change"}
            //   ]
            // },
            {
              title:this.$t('common.districtId'),
              type:"input",
              field:"districtId",
              value:"",
              col:{
                span:6
              },
              props:{
                readonly:true
              }
            },
            {
              title:this.$t('common.districtName'),
              type:"input",
              field:"districtName",
              value:"",
              col:{
                span:6
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t("common.districtName")]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.districtType'),
              type:"input",
              field:"remark2",
              value:'',
              col:{
                span:6
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.districtType')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.square'),
              type:"InputNumber",
              field:"area",
              value:0,
              col:{
                span:6
              },
              validate:[
                {type:"number",min:0,max:99999,message:this.$t("message.numberRange",[0,99999]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.locaNum'),
              type:"InputNumber",
              field:"storageNum",
              value:0,
              col:{
                span:6
              },
              validate:[
                {type:"number",min:0,max:999999,message:this.$t("message.numberRange",[0,99999]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.effective'),
              type:"select",
              field:"isStart",
              value:1,
              options:[],
              col:{
                span:6
              },
            },
            {
              title:this.$t('common.note'),
              type:"input",
              field:"remark",
              value:"",
              props:{
                type:"textarea",
              },
              col:{
                span:18
              }
            },
          ],
          option:{
            form:{
              labelWidth:80,
            },
            submitBtn:{
              show:false,
            }
          },
        }
      }
    },
    created(){
      this.getDistricts();
      this.getTypes();
    },
    mounted(){
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140;
    },
    methods:{

      async getTypes(){
        await this.getType("actionflg",this.isStarts)
        this.formData.model.model()["isStart"].options = this.isStarts;

        await this._axios("get","ware/wareenum",(res)=>{
          this.warehouses = this.arrConvert(res);
          // this.formData.model.model()["warehouseId"].options = this.warehouses;
          this.formData.rule.unshift(this.createSelect("warehouseId",this.$t('common.superiorWare'),this.warehouses,[{required:true,message:this.$t("message.empty",[this.$t('common.superiorWare')]),trigger:"change"}]))
        })
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
      getDistricts(num){
        if(num) this.form.pageNum = num;
        this._axios("get","dist/district",this.form,(res)=>{
          // console.log(data)
          this.districts = res.list;
          this.form.total = res.total;
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
        this.getDistricts();
      },
      changePageSize(e){
        this.form.pageSize = e;
        this.getDistricts();
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
        if(this.title == this.$t("actions.insertPattern",[this.$t("common.district")])){
          this.formData.rule.splice(1,0,this.districtid)
        }
      },
      //打开新增库区的对话框
      showInsert(){
        this.title = this.$t("actions.insertPattern",[this.$t("common.district")])
        this.submit = this.insert;
        this.formData.model.resetFields(); //重置表单数据
        this.formData.rule.splice(1,1);
        this.modal = true;
      },
      //打开更新库区的对话框
      showUpdate(e){
        if(!this.$store.state.controls.M_2_200511093935_update) return;
        for(var i in e){
          this.formData.model.setValue(i,e[i])
        }
        this.model = e;
        // console.log(this.formData.rule)
        this.title = this.$t("actions.updatePattern",[this.$t("common.district")]);
        this.submit = this.update;
        this.modal = true;
      },


    //操作方法
      //新增
      insert(){
        this.checkValidate2(this.formData.model,()=>{
          var model = this.formData.model.formData()
          // console.log(model)
          this._axios("post","dist/district",model,(data)=>{
            this.formData.rule.splice(1,0,this.districtid)
            // this.formData.rule.unshift(this.warehouseid);
            this.getDistricts();
            this.modal = false;
          })
        })

      },
      //更新
      update(){
        this.checkValidate2(this.formData.model,()=>{
          for(var i of this.formData.rule){
            this.model[i.field] = i.value
          }
          console.log(this.model)
          this._axios("put","dist/district",this.model,(data)=>{
            this.getDistricts();
            this.modal = false;
          })
        })
      },
      //删除
      delete(){
        this._axios("delete","dist/district",this.$refs.table.getSelection(),(data)=>{
          this.getDistricts()
        })
      }

    }
  }
</script>

<style lang="less">

</style>
