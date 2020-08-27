<template>
  <div class="wareHouseInfo">
    <Form ref="form" v-model.sync="form" :label-width="120">
      <Row>
        <Col span="6">
          <FormItem prop="warehouseId" :label="$t('common.warehouseId')">
            <Input clearable v-model.sync="form.warehouseId" @on-change="getWare(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="warehouseName" :label="$t('common.warehouseName')">
            <Input clearable v-model.sync="form.warehouseName" @on-change="getWare(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="remark1" :label="$t('common.storageType')">
            <Input clearable v-model.sync="form.remark1" @on-change="getWare(1)"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="isStart" :label="$t('common.effective')">
            <Select clearable v-model.sync="form.isStart" @on-change="getWare(1)">
              <Option v-for="item in isStarts" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="spaceBetween">
      <div>
         <Button v-if="$store.state.controls.M_2_200511093707_delete" class="btnForm" :type="deleteButtonFlag?'default':'error'" shape="circle" @click="deleteConfirm" icon="md-trash">{{$t('actions.deleteSelected')}}
        </Button>
      </div>
      <div>
        <Button v-if="$store.state.controls.M_2_200511093707_insert" type="primary" shape="circle" class="btnForm" @click="showInsert">{{$t('actions.insert')}}</Button>
      </div>
    </div>
    <Table stripe border :height="tableHeight" :columns="columns" :data="warehouses"
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
    name:"wareHouseInfo",
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

        //操作数据
        deleteButtonFlag:true,

        //表格数据
        tableHeight:300,
        warehouses:[],
        columns:[
          {key: 'select',type: 'selection', width: 55,align: 'center'},
          {title: this.$t('common.index'),align:"center",width:70,render:(h,params)=>{
            return h('div',params.index+1+this.form.pageSize*(this.form.pageNum-1))
          }},
          {title: this.$t('common.warehouseId'), key: 'warehouseId',width: 200,align: 'center'},
          {title: this.$t('common.warehouseName'), key: 'warehouseName', align: 'center'},
          {title: this.$t('common.square'),key: 'area',width: 180, align: 'center'},
          {title: this.$t('common.storageType'), key: 'remark1',width: 120,align: 'center' },
          {title: this.$t('common.warnStock'), key: 'warningReserves',width: 120,align: 'center' },
          {title: this.$t('common.locaNum'), key: 'storageNum',width: 120, align: 'center'},
          {title: this.$t('common.effective'), key: 'isStart', width: 120,align: 'center',
          render:(h,params)=>{
            return h('div',this.getLabel(this.isStarts,params.row.isStart))
          }},
        ],

        //对话框数据
        title:this.$t("actions.insertPattern",[this.$t('common.warehouse')]),
        modal:false,
        warehouseid:{
              title:this.$t('common.warehouseId'),
              type:"input",
              field:"warehouseId",
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
            {
              title:this.$t('common.warehouseId'),
              type:"input",
              field:"warehouseId",
              value:"",
              col:{
                span:6
              },
              props:{
                readonly:true
              }
            },
            {
              title:this.$t('common.warehouseName'),
              type:"input",
              field:"warehouseName",
              value:"",
              col:{
                span:6
              },
              props:{
                maxlength:15
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.warehouseName')]),trigger:"change"}
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
                {type:"number",min:0,max:99999,message:"请输入0-99999的数字",trigger:"change"}
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
              props:{
                min:0,
                max:999999
              }
            },
            {
              title:this.$t('common.warnStock'),
              type:"InputNumber",
              field:"warningReserves",
              value:0,
              col:{
                span:6
              },
              props:{
                min:0,
                max:99999
              }
            },
            {
              title:this.$t('common.storageType'),
              type:"input",
              field:"remark1",
              value:"",
              col:{
                span:6
              }
            },
            {
              title:this.$t('common.effective'),
              type:"select",
              field:"isStart",
              value:1,
              options:[],
              col:{
                span:6
              }
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
      this.getWare();
      this.getTypes();
    },
    mounted(){
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140;
    },
    methods:{

      async getTypes(){
        await this.getType("actionflg",this.isStarts)
        this.formData.model.model()["isStart"].options = this.isStarts;
      },

      //根据条件查询仓库数据
      getWare(num){
        if(num) this.form.pageNum = num;
        console.log(this.form)
        this._axios("get","ware/wareinfos",this.form,(res)=>{
          console.log(res)
          this.warehouses = res.list;
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
        this.getWare();
      },
      changePageSize(e){
        this.form.pageSize = e;
        this.getWare();
      },
    //对话框方法
      //对话框提交默认方法
      submit(){
        console.log("submit")
        this.modal = false;
      },
      //对话框默认取消方法
      cancel(){
        this.modal = false;
        if(this.title == this.$t('actions.insertPattern',[this.$t("common.warehouse")])){
          this.formData.rule.unshift(this.warehouseid);
        }
      },
      //打开新增仓库的对话框
      showInsert(){
        this.title = this.$t('actions.insertPattern',[this.$t("common.warehouse")])
        this.submit = this.insert;
        this.formData.model.resetFields(); //重置表单数据
        this.formData.rule.shift();
        this.modal = true;
      },
      //打开更新仓库的对话框
      showUpdate(e){
        if(!this.$store.state.controls.M_2_200511093707_update) return;
        for(var i in e){
          this.formData.model.setValue(i,e[i])
        }
        this.title = this.$t('actions.updatePattern',[this.$t("common.warehouse")]);
        this.submit = this.update;
        this.modal = true;
      },


    //操作方法
      //新增
      insert(){
        this.checkValidate2(this.formData.model,()=>{
          var model = this.formData.model.formData()
          console.log(model)
          this._axios("post","ware/wareinfo",model,(data)=>{
            this.formData.rule.unshift(this.warehouseid);
            this.getWare();
            this.modal = false;
          })
        })

      },
      //更新
      update(){
        this.checkValidate2(this.formData.model,()=>{
          this._axios("put","ware/wareinfo",this.formData.model.formData(),(data)=>{
            this.getWare();
            this.modal = false;
          })
        })
      },
      //删除
      delete(){
        this._axios("delete","ware/wareinfo",this.$refs.table.getSelection(),(data)=>{
          this.getWare()
        })
      }

    }
  }
</script>

<style lang="less">

</style>
