<template lang="html">
  <div class="messageManage">
    <Form :label-width="120" v-model.sync="form">
      <Row>
        <Col span="6">
          <FormItem prop="key" :label="$t('common.messageId')">
            <Input v-model.sync="form.key" clearable @on-change="getMeses"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="label" :label="$t('common.label')">
            <Input v-model.sync="form.label" clearable @on-change="getMeses"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="datatype" :label="$t('common.messageType')">
            <Select v-model.sync="form.datatype" clearable filterable @on-change="getMeses">
              <Option v-for="item in mesTypes" :key="item.code" :value="item.code" >{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="spaceBetween">
      <Button v-if="$store.state.controls.M_2_200424133243_delete" :type="deleteBtnFlag?'default':'error'" shape="circle" class="btnForm" @click="deleteConfirm">{{$t('actions.deleteSelected')}}</Button>
      <Button v-if="$store.state.controls.M_2_200424133243_insert" type="primary" shape="circle" @click="showInsert" class="btnForm">{{$t('actions.insert')}}</Button>
    </div>

    <Table stripe border :height="tableHeight" :columns="columns" :data="messages" @on-selection-change="v=>deleteBtnFlag = v.length <= 0" @on-row-dblclick="showUpdate" ref="table"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="total" :current="form.pageNum"
            :page-size="form.pageSize"
            :page-size-opts="[10,20,30]"
            @on-change="changePageNum" @on-page-size-change="changePageSize" style="text-align:center"></Page>
    </div>
    <FormModal @close="(e)=>{this.modal =e;cancel()}" :modal='modal' :width="1000" :title="title" :formData="formData" :submit="submit" :cancel="cancel"></FormModal>
  </div>
</template>

<script>
  import FormModal from "../../components/FormModal.vue"
  export default {
    name:"messageManage",
    components:{
      FormModal
    },
    data() {
      return {
        //类型信息
        mesTypes:[],

        //表单数据
        form:{
          pageSize:10,
          pageNum:1,
        },

        //表格数据
        total:0,
        tableHeight:300,
        columns:[
          {
            title:this.$t('common.select'),
            type:"selection",
            align:"center",
            width:55
          },
          {
            title:this.$t('common.messageId'),
            key:"key",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.label'),
            key:"label",
            width:100,
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.messageType'),
            key:"datatype",
            align:"center",
            width:100,
            tooltip:true,
            render:(h,params)=>{
              return h('div',this.getLabel(this.mesTypes,params.row.datatype))
            }
          },
          {
            title:this.$t('common.contentChinese'),
            key:"cnvalue",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.contentEnglish'),
            key:"envalue",
            align:"center",
            tooltip:true,
          },
          {
            title:this.$t('common.contentJapanese'),
            key:"jpvalue",
            align:"center",
            tooltip:true,
          },
        ],
        messages:[],

        //对话框数据
        modal:false,
        title:this.$t('actions.insertPattern',[this.$t('common.message')]),
        key:{
              title:this.$t('common.messageId'),
              type:"input",
              field:"key",
              value:"",
              props:{
                readonly:true
              },
              col:{
                span:12

              }
            },
        formData:{
          model:{},
          rule:[
            {
              title:this.$t('common.messageId'),
              type:"input",
              field:"key",
              value:"",
              props:{
                readonly:true
              },
              col:{
                span:12
              }
            },
            {
              title:this.$t('common.label'),
              type:"input",
              field:"label",
              value:"",
              col:{
                span:12
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.label')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.messageType'),
              type:"select",
              field:"datatype",
              value:"",
              options:[],
              col:{
                span:12
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.messageType')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.contentChinese'),
              type:"input",
              field:"cnvalue",
              value:"",
              col:{
                span:12
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.contentChinese')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.contentEnglish'),
              type:"input",
              field:"envalue",
              value:"",
              col:{
                span:12
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.contentEnglish')]),trigger:"change"}
              ]
            },
            {
              title:this.$t('common.contentJapanese'),
              type:"input",
              field:"jpvalue",
              value:"",
              col:{
                span:12
              },
              validate:[
                {required:true,message:this.$t('message.empty',[this.$t('common.contentJapanese')]),trigger:"change"}
              ]
            }
          ],
          option:{
            form:{
              labelWidth:140,
            },
            submitBtn:{
              show:false,
            }
          }
        },

        //操作数据
        deleteBtnFlag:true

      }
    },

    created() {
      //获取消息类型
      this._axios("get","sysLanguage/syslanguagedatatype",(data)=>{
        this.mesTypes = data;
        this.formData.model.model().datatype.options = this.arrConvert(this.mesTypes)
      })

      this.getMeses()
    },

    mounted() {
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-140;
    },

    methods: {
      //表格方法
      changePageSize(e){
        this.form.pageSize = e;
        this.getMeses();
      },
      changePageNum(e){
        this.form.pageNum = e;

        this.getMeses();
      },

      //对话框方法
      submit(){
        this.modal = true;
      },

      //操作方法
      getMeses(){
        console.log(this.form)
        this.form.key=this.form.key==''?null:this.form.key;
        this.form.label=this.form.label==''?null:this.form.label;
        this.form.datatype=this.form.datatype==''?null:this.form.datatype;
        this._axios("get","/sysLanguage/sysLanguages",this.form,(data=>{
          this.messages = data.list;
          console.log(data)
          this.total = data.total;
        }))
      },
      deleteConfirm(){
        if(this.deleteBtnFlag){
          // 提示选择要删除的数据
          this.$root.mes('error','w-20200521173305')
        }else{
          //提示是否确认删除
          this.$root.mes('warn','w-20200512154954')
          .then(res => {
              if(res){
                //删除资源信息
                this.delete();
              }else{
                //提示删除失败
                this.getMes('delete',false)
              }
          })
          .catch(err => {console.log(err) })
        }
      },
      delete(){
        var list = this.$refs.table.getSelection();
        console.log(list)
        this.$axios.post(`/sysLanguage/deletesysLanguage`,list).then(res=>{
          // console.log(res)
          if(res){
            this.$root.mes("info","w-20200430131813")
          }else{
            this.$root.mes('error',"w-20200601145237")
          }
        }).catch(err=>{
          console.log(err)
        })
      },
      showInsert(){
        this.title=this.$t('actions.insertPattern',[this.$t('common.message')])
        this.formData.rule.shift();
        this.submit = this.insert;
        this.modal = true;
      },
      insert(){
        var model = this.formData.model.formData();
        console.log(model)

        this.checkValidate2(this.formData.model,()=>{
          this.$axios.get(`sysLanguage/checkrepeat?defaultvalue=${model.cnvalue}`).then(res=>{
            console.log(res)
            if(!res.data){
              this._axios("post","sysLanguage/addsysLanguage",model,(data)=>{
                this.getMeses()
                this.modal = false;
                // console.log(this.formData.model.formData())
                this.formData.rule.unshift(this.key)
              })
            }else{
              this.$root.mes("error","w-20200612145537")  //提示同名消息已经存在
            }
          }).catch(err=>{
            console.log(err)
          })
        })

      },
      showUpdate(e){
        if(!this.$store.state.controls.M_2_200424133243_update) return;
        this.title=this.$t('actions.updatePattern',[this.$t('common.message')])
        for(var i in e){
          this.formData.model.setValue(i,e[i])
        }
        console.log(this.formData.model)
        this.submit = this.update;
        this.modal = true;
      },
      update(){

        var model = this.formData.model.formData()
        console.log(model)
        this.checkValidate2(this.formData.model,()=>{
          this.$axios.post(`/sysLanguage/updatesysLanguage`,model).then(res=>{
            console.log(res)
            if(res.data){
              this.getMeses();
              this.$root.mes("info","w-20200430131709")//提示更新成功
              for(var i in this.formData.rule){
                this.formData.rule[i].value = null;
              }
              this.modal = false;
            }else{
              this.$root.mes("error","w-20200605180340") //提示更新失败
            }

          }).catch(err=>{
            this.$root.mes("error","w-20200605180340") //提示更新失败
            console.log(err)
          })
        })

      },
      cancel(){
        this.modal = false;
        if(this.title == this.$t('actions.insertPattern',[this.$t('common.message')])){
          this.formData.rule.unshift(this.key);
        }
        if(this.title == this.$t('actions.updatePattern',[this.$t('common.message')])){
          for(var i in this.formData.rule){
            this.formData.rule[i].value = null;
          }
        }
      },
    }
  }

</script>

<style lang="less">

</style>
