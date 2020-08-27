<template lang="html">
  <div class="usermanage">
      <Form :label-width="85" style="text-align:left;">
        <Row>
          <Col span="6">
            <Form-item :label="$t('common.depart')">
              <Select filterable v-model.sync="searchUserInfo.sectorid" clearable :placeholder="$t('message.todoInput')"
              @on-change="getUser(1)">
                <Option v-for="(item,index) in sectorinfolist" :key="index" :value="item.code?item.code:'-1'">{{item.name}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.username')" >
              <Input v-model.sync="searchUserInfo.username" @on-change="getUser(1)" :placeholder="$t('message.todoInput')"/>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item :label="$t('common.job')" >
              <Input v-model.sync="searchUserInfo.zhiwei" :placeholder="$t('message.todoInput')" @on-change="getUser(1)"/>
            </Form-item>
          </Col>
        </Row>
      </Form>

      <div class="spaceBetween">
        <div>
           <Button v-if="this.$store.state.controls.M_2_200421111959_delete" class="btnForm" :type="deleteButtonFlag?'default':'error'"  shape="circle"  @click="deleteConfirm"
                  icon="md-trash">{{$t('actions.deleteSelected')}}
          </Button>
        </div>
        <div>
          <Button v-if="this.$store.state.controls.M_2_200421111959_insert" class="btnForm" shape="circle" type="primary" @click="showModal()">{{$t('actions.insert')}}</Button>
        </div>
      </div>

      <Table stripe border ref="table" :height="tableHeight" :columns="tableColumns.card" :data="userInfoShow"
      @on-selection-change="onSelectionChange" @on-row-dblclick="updateSelection"></Table>
      <div class="page">
        <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage"
         @on-page-size-change="handleChangePageSize" :page-size="pageSize" style="text-align:center"></Page>
      </div>

    <Modal :width='600' v-model="modal_update_user" :mask-closable='false' closable>
        <p slot="header" style="text-align:center">
            <span>{{$t('actions.updatePattern',[this.$t('common.user')])}}</span>
        </p>

        <Form :model="updateUserInfo" class="formValidate" ref="updateUserInfo" :rules="updateValidate" :label-width="100">
          <Row>
            <Col span="12">
              <FormItem :label="$t('common.depart')" prop="sectorid">
                <Select v-model.sync="updateUserInfo.sectorid" filterable :placeholder="$t('message.todoInput')">
                  <Option v-for="item in sectorinfolist" :key="item.code" :value="item.code">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.job')" prop="zhiwei">
                <Input v-model.sync="updateUserInfo.zhiwei" :placeholder="$t('message.todoInput')"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.username')" prop="opername">
                <Input v-model.sync="updateUserInfo.opername" disabled :placeholder="$t('message.todoInput')"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.name')" prop="name">
                <Input v-model.sync="updateUserInfo.name" :placeholder="$t('message.todoInput')"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.email')" prop="emaill">
                <Input v-model.sync="updateUserInfo.emaill" type="email" :placeholder="$t('message.todoInput')"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.whetherEnabled')" prop="status">
                <RadioGroup v-model.sync="updateUserInfo.status">
                  <Radio :label="1">{{$t("common.yes")}}</Radio>
                  <Radio :label="0">{{$t("common.no")}}</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.gender')" prop="gender">
                <RadioGroup v-model.sync="updateUserInfo.gender">
                  <Radio label="1">{{$t("common.male")}}</Radio>
                  <Radio label="0">{{$t("common.female")}}</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <div slot="footer">
          <Button type="primary" @click="resetPwd">{{$t("resetPassword.resetPwd")}}</Button>
          <Button type="primary" @click="update">{{$t("actions.submit")}}</Button>
        </div>
    </Modal>

    <FormModal @close="(e)=>{this.modal =e}" :modal="modal" :formData="formData" :title="title" :submit="submit" :cancel="cancel"></FormModal>

  </div>
</template>

<script>
  import FormModal from '../../components/FormModal'
export default {
  components: {FormModal},

  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:20,
      tableHeight:300,
      // modal_add_user:false,
      modal_update_user:false,

      // 表单对话框数据
      modal:false,
      formData:{
        model:{},
        rule:[

        ],
        option:{
          form:{
            // labelWidth:,
          },
          submitBtn:{
            show:false,
          }
        }
      },
      title:"",

      ruleAdd:[
        {
          type:"Select",
          title:this.$t("common.depart"),
          field:"sectorid",
          value:"",
          options:[
          ],
          col:{
            span:12
          },
          props:{
            clearable:true,
            filterable:true
          }
        },
        {
          type:"input",
          title:this.$t("common.job"),
          field:"zhiwei",
          value:"",
          col:{
            span:12
          },
          props:{
            clearable:true
          }
        },
        {
          type:"input",
          title:this.$t("common.username"),
          field:"opername",
          value:"",
          col:{
            span:12
          },
          props:{
            clearable:true
          },
          validate:[
            {required:true,message:this.$t('message.empty',[this.$t("common.username")]),trigger:'change'},
            {pattern:/^[A-Za-z0-9]+$/,message:this.$t("message.patternUsername"),trigger:'change'}
          ]
        },
        {
          type:"input",
          title:this.$t("common.name"),
          field:"name",
          value:"",
          col:{
            span:12
          },
          props:{
            clearable:true
          },
          validate:[
            {required:true,message:this.$t('message.empty',[this.$t("common.name")]),trigger:'change'},
          ]
        },
        {
          type:"input",
          title:this.$t("common.email"),
          field:"emaill",
          value:"",
          col:{
            span:12
          },
          props:{
            type:"email",
            clearable:true
          },
          validate:[
            {required:true,message:this.$t('message.empty',[this.$t("common.email")]),trigger:'change'},
            {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,message:this.$t('message.pattern',[this.$t("common.email")]),trigger:"change"}
          ]
        },
        {
          type:"radio",
          title:this.$t("common.gender"),
          field:"gender",
          value:this.$t("common.female"),
          col:{
            span:12
          },
          options:[
            {value:"男",label:this.$t("common.male")},
            {value:"女",label:this.$t("common.female")}
          ]
        },
      ],

      updateValidate:{
        name:[
          {required:true,message:this.$t('message.empty',[this.$t("common.name")]),trigger:"change"}
        ],
        emaill:[
          {required:true,message:this.$t('message.empty',[this.$t("common.email")]),trigger:"change"},
          {pattern:/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,message:this.$t('message.pattern',[this.$t("common.email")]),trigger:'blur'}
        ]
      },

      deleteButtonFlag:true,
      clickSt:true,
      userInfo:[],
      userInfoShow:[],
      deleteUserInfo:[],
      updateUserInfo:{ sectorid:''},
      insertUserInfo:{ },
      searchUserInfo:{},
      sectorinfolist:[],
      tableColumns: {
        card: [
          {title: this.$t('common.select'),key: 'select',type: 'selection',width:55,align: 'center'},
          {title: this.$t('common.index'),key: 'linenum', align: 'center',render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: this.$t('common.username'),key: 'opername',align: 'center'},
          {title: this.$t('common.name'),key: 'name', align: 'center'},
          {title: this.$t('common.gender'),key: 'gender', align: 'center',render:(h,params)=>{
            var gender = params.row.gender;
            return h('div',params.row.gender == 1?this.$t("common.male"):this.$t('common.female'))
          }},
          {title: this.$t('common.job'), key: 'zhiwei',align: 'center' },
          {title: this.$t('common.depart'), key: 'sectorname', align: 'center'},
          {title: this.$t('common.email'), key: 'emaill', align: 'center'},
          {title: this.$t('common.whetherEnabled'), key: 'status', align: 'center',render:(h,params)=>{
            return h('div',params.row.status==1?this.$t('common.yes'):this.$t("common.no"))
          }}
          ],
        }
    }
  },
  computed:{

  },

  created(){
    // console.log(this.$store.state.controls.M_2_200421111959_delete)
    //获取所有部门
    this.$axios.get(`/dept/deptenum`)
      .then((res) => {
        // this.sectorinfolist=departInfob.data.data
        // console.log(res)

        if(res.data!=null){
          // console.log(res.data)
          this.sectorinfolist = res.data;
          // this.ruleAdd[0].options = this.sectorinfolist;
          for(let s of this.sectorinfolist){
            this.ruleAdd[0].options.push({"label":s.name,"value":s.code})
          }
        }
      })
      .catch((err)=>{
        console.log(err)
    })

    this.getUser();
  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop -140;
  },

  methods:{
    submit(){
      console.log("e");
    },
    cancel(){
      this.modal = false;
    },
    //显示对话框
    showModal(){
      this.modal = true;
      this.title = this.$t("actions.insertPattern",[this.$t('common.user')]);
      this.formData.rule = this.ruleAdd;
      this.submit = this.addUser;
    },
    deleteConfirm(){
      if(this.deleteUserInfo.length==0){
        this.$root.mes("error","w-20200521173305")
        return;
      }else{
        this.$root.mes("warn","w-20200512154954").then(res=>{
          if(res){
            this.deleteSelection()
          }
        }).catch(err=>{
          console.log(err)
        })
      }

    },
    //根据条件查询员工信息
    getUser(pagenum){

      this.searchUserInfo.pageSize = this.pageSize;
      this.searchUserInfo.pageNum = this.pageNum;
      if(pagenum) this.searchUserInfo.pageNum = pagenum;

      this.$axios.get('/user/users',{
        params:this.searchUserInfo
      }).then(res=>{
        // console.log(res)
        if(res.data){
          this.userInfoShow = res.data.list;
          this.total = res.data.total;
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //选中项检查
    onSelectionChange (row) {
      this.deleteUserInfo = row;
      if(this.deleteUserInfo.length>0){
        this.deleteButtonFlag=false
      }else{
        this.deleteButtonFlag=true
      }
    },
    //删除选中项
    deleteSelection(){
      if(this.deleteUserInfo.filter(item => item.status == 1).length > 0){
        this.$Message.info('不可删除启用状态的用户');
        return;
      }
      console.log(this.deleteUserInfo)
      this.$axios.delete('/user/user',{data:this.deleteUserInfo}).then(res=>{
        if(res.data){
          this.getUser();
          this.deleteButtonFlag = true;
          this.$root.mes("info","w-20200430131813")

        }else{
          this.$root.mes("error","w-20200601145237")
        }
      }).catch(err=>{
        console.log(err)
      })

    },
    //修改页码的返回结果
    handleChangePage (value) {
      this.pageNum = value
      this.getUser()
    },
    //修改每页数据条数的处理结果
    handleChangePageSize(value){
      this.pageSize = value
      this.pageNum = 1
      this.getUser()
    },

    // //检查用户输入的数据
    checkForm(username,name,email){
      var regUsername = /^[A-Za-z0-9]+$/;
      var regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      //判断必填项是否全部填写
      if(!username || !name || !email){
        return false;
      }else if(!regUsername.test(username)){ //判断有内容要求的项是否填写正确
        return false;
      }else if(!regEmail.test(email)){
        return false;
      }
      return true;
    },

    //添加用户
    addUser() {
      for(let item of this.ruleAdd){
        this.insertUserInfo[item.field]=item.value;
      }

      //检查输入的信息是否有错
      this.checkValidate2(this.formData.model,()=>{
        this.$axios.post('/user/user',this.insertUserInfo)
        .then((result) => {
          this.getUser();
          this.modal = false; //关闭对话框
          // 清空表单中的内容
          this.insertUserInfo={}
          for(let item of this.ruleAdd){
            item.value = null;
          }
          this.formData.rule = []
          //清空表单中的内容
          this.$Message.success('用户已添加');
        })
        .catch((err) => {
          console.log(err)
        })
      })



    },

    updateSelection(res){
      if(this.$store.state.controls.M_2_200421111959_update){
        this.updateUserInfo=res;
        // console.log(this.updateUserInfo)
        this.updateUserInfo.password='';
        this.modal_update_user = true
      }else{
        console.log("您没有该项权限")
      }

    },
    update () {
      // if(!this.clickSt){
      //   return
      // }

      this.checkValidate("updateUserInfo").then(res=>{
        if(res){
          this.$axios.put('/user/user',this.updateUserInfo).then(res=>{
            if(res.data===true){
              this.$root.mes("info","w-20200430131709")
              this.getUser()
              this.modal_update_user = false;
            }
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$root.mes("error","w-20200605135011")
        }
      }).catch(err=>{
        console.log(err)
      })
      // this.$axios.post(`/updateUser?pageNum=${this.pageNum}&pageSize=${this.pageSize}
      //   `,this.updateUserInfo, this.searchUserInfo)
      // this.$axios.post(`/updateUser`,{
      //   pageNum:this.pageNum,
      //   pageSize:this.pageSize,

      // })
      // .then((result) => {
      //   console.log(result)
      //   this.userInfoShow=result.data.list
      //   this.total=result.data.total
      //   this.updateUserInfo = {},
      //   this.modal_update_user = false;
      //   this.$Message.success('用户信息修改成功');
      // })
      // .catch((err) => {
      //   this.updateUserInfo = {},
      //   this.modal_update_user = false;
      //   console.log('请检查您的网络连接'+err)
      // })
    },
    resetPwd(){
      this.$axios.post('/restpassword'
        ,this.updateUserInfo, this.searchUserInfo)
        .then((result) => {
          /*this.userInfoShow=result.data.list
          this.total=result.data.total
          this.updateUserInfo = {},
            this.modal_update_user = false;*/
          this.$Message.success('密码重置成功');
        })
        .catch((err) => {
          //this.updateUserInfo = {},
           // this.modal_update_user = false;
          console.log('请检查您的网络连接'+err)
        })
    }
  }
}

</script>

<style lang="less">
  // .usermanage{
  //   th .ivu-table-cell{
  //     font-size: 12px !important;
  //     font-weight: bold;
  //     color:#333;
  //   }
  //   .ivu-table-tbody{
  //     line-height: 16px !important;
  //   }
  //   .ivu-form .ivu-form-item-label{
  //     color:#5aa5ff !important;
  //     font-size: 12px !important;
  //     font-family:"Microsoft YaHei";
  //     line-height: 20px;
  //   }
  //   // .ivu-input-wrapper{
  //   //   width: 160px;
  //   //   height: 20px;
  //   // }
  //   // .ivu-select{
  //   //   width: 160px;
  //   //   height: 20px;
  //   // }
  //   .ivu-tabs-nav .ivu-tabs-tab-active{
  //     background-color: white !important;
  //     font-size: 20px;
  //     border-radius: 8px;
  //   }
  //   .ivu-tabs-ink-bar{
  //     background-color: #fff;
  //   }
  //   .ivu-tabs-nav .ivu-tabs-tab{
  //     font-size: 14px;
  //     background-color: #f3f3f3;
  //   }
  //   .ivu-tabs-nav-scroll{
  //     background-color: #f3f3f3;
  //   }
  //   // .ivu-input{
  //   //   border:1px solid #888888;
  //   // }
  //   // .ivu-select-selection{
  //   //   border:1px solid #888888;
  //   // }
  //   .ivu-table-overflowY {
  //     overflow-y: scroll;
  //   }
  //  .ivu-table-tbody{
  //    font-size: 12px;
  //    // color:#999;
  //    font-family:"Microsoft YaHei";
  //    vertical-align: middle;
  //  }
  //  .ivu-table td{
  //    background-color:#fff;
  //    height: 40px;
  //  }
  //  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
  //    background-color: #f9f9f9;
  //    height: 40px;
  //  }
  //  .ivu-input-icon{
  //       position: absolute;
  //       right:45px;
  //   }
  //  // .ivu-input-icon-normal+.ivu-input{
  //  //   width: 120px;
  //  // }
  //  .page{
  //    .ivu-select-selection{
  //      bottom: 6px
  //    }
  //  }
 // }
</style>
