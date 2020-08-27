<template lang="html">
  <div class="roleManage">
      <Form :label-width="85" style="text-align:left;">
        <Row>
          <Col span="6">
            <FormItem :label="$t('common.role')">
              <Select v-model="model.roleid" clearable :placeholder="$t('message.todoSelect')"
              @on-change="getData(1)">
                <Option v-for="(item,key) in roleNamelist" :value="item.roleId" :key="key">{{ item.roleName }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="spaceBetween">
        <div>
          <Button v-if="this.$store.state.controls.M_2_200421112115_delete" :type="deleteButtonFlag?'default':'error'" shape="circle" class="btnForm" @click="deleteConfirm" icon="md-trash">{{$t('actions.deleteSelected')}}</Button>
        </div>
        <div>
          <Button type="primary" v-if="this.$store.state.controls.M_2_200421112115_insert" shape="circle" class="btnForm" @click="toadd">{{$t('actions.insert')}}</Button>
        </div>
      </div>
      <Table stripe border :height="tableHeight" ref="table" :columns="tableColumns.card" :data="rolelist"
      @on-selection-change="onSelectionChange" @on-row-dblclick="updateSelection"></Table>
      <div class="page">
          <Page  show-sizer show-elevator show-total :total="total"  :current="model.pageNum" :page-size="model.pageSize"  :page-size-opts="[10,20,30]"
          @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
      </div>

    <Modal class="rolemodalstyle" v-model="modal_add_user" :width="600" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>{{$t('actions.insertPattern',[$t('common.role')])}}</span>
          </p>
          <Form class="roleAdd" v-model="insertUserInfo" :label-width="120">
            <Row>
              <Col span="12">
                <FormItem :label="$t('common.roleName')">
                  <Input v-model="insertUserInfo.roleName" :placeholder="$t('message.todoInput')"/>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem :label="$t('common.seq')">
                  <InputNumber :max="100" :min="1" v-model="insertUserInfo.displayOrder" :placeholder="$t('message.todoInput')"></InputNumber>
                </FormItem>
              </Col>
              <Col span="24">
                <FormItem :label="$t('common.roleDesc')">
                  <Input v-model="insertUserInfo.miaoShu" type="textarea"  :rows="2" :autosize="{minRows: 2,maxRows: 3}" :placeholder="$t('message.todoInput')" />
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer">
            <Button type="primary" @click="save" >{{$t('actions.submit')}}</Button>
            <!-- <Button type="primary" @click="save">提交</Button> -->
          </div>
    </Modal>

    <Modal class="rolemodalstyle" :width="600" v-model="modal_update_user" :mask-closable='false' closable>
        <p slot="header" style="text-align:center">
            <span>{{$t('actions.updatePattern',[$t('common.role')])}}</span>
        </p>
        <Form v-model='updateUserInfo' :label-width="120">
          <Row>
            <Col span="12">
              <FormItem :label="$t('common.roleName')">
                <Input v-model="updateUserInfo.roleName" :placeholder="$t('message.todoInput')"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem :label="$t('common.seq')">
                <InputNumber :max="100" :min="1" v-model="updateUserInfo.displayOrder" :placeholder="$t('message.todoInput')"></InputNumber>
              </FormItem>
            </Col>
            <Col span="24">
              <FormItem :label="$t('common.roleDesc')">
                <Input type="textarea"  :rows="2" :autosize="{minRows: 2,maxRows: 3}" v-model="updateUserInfo.miaoShu" :placeholder="$t('message.todoInput')"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>

        <div slot="footer">
          <Button type="primary" @click="update" >{{$t('actions.submit')}}</Button>
        </div>
    </Modal>

  </div>
</template>

<script>
import iview from 'view-design'
export default {
  components: {},

  data () {
    return {
      clickSt:'',
      // roleId:"/",
      total:0,
      model:{
        pageNum:1,
        pageSize:20,
        roleid:""
      },
      tableHeight:300, //表格的高度
      modal_add_user:false,
      modal_update_user:false,
      delete_confirm:false,
      deleteButtonFlag:true,
      userInfo:[],
      userInfoShow:[],
      deleteUserInfo:[],
      updateUserInfo:{ sectorid:''},
      insertUserInfo:{roleName:'',displayOrder:1,miaoShu:''},
      searchUserInfo:{},
      roleNamelist:[],
      rolelist:[],
      clickSt:true,
      tableColumns: {
        card: [
          {key: 'select',type: 'selection', width: 55,align: 'center'},

          {title: this.$t('common.index'),key: 'displayOrder', align: 'center',width: 75},
          // {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
          //     return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          // }},
          {title: this.$t('common.roleName'),key: 'roleName', align: 'center'},
          // {title: '密码',key: 'password', align: 'center', render: (h, params) => {
          //   return h('div',[
          //     h('Input',{
          //       props: {
          //         type:'password'
          //        }
          //      }
          //     )]);
          //   }},
          // {title: '显示顺序',key: 'displayOrder', align: 'center'},
          {title: this.$t('common.roleDesc'),key: 'miaoShu', align: 'center'}
          // {title: '性别',key: 'gender', align: 'center', width: 75,render:(h,params)=>{
          //   let gender = '';
          //   if(params.row.gender == '1' || params.row.gender == '男'){
          //     gender = '男';
          //   }else{
          //     gender = '女';
          //   }
          //   return h('div',gender);
          // }},
          // {title: '职位', key: 'zhiwei',align: 'center' },
          // {title: '所属部门', key: 'sectorname', align: 'center'},
          // {title: '邮箱', key: 'emaill', align: 'center'}
          ],
        }
    }
  },

  created(){
//查询下拉列表中的角色名称
    this.$axios.get("user/userinforlist").then(res=>{
      if(res.code === 0){
        this.roleNamelist = res.data;
      }
    })
    this.getData(1)
  },

  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 140;
  },

  methods:{
    getData(pagenum){
      if(pagenum) this.model.pageNum = pagenum
      this.$axios.get("user/selectRoleByCondition",{params:this.model}).then(res=>{
        if(res.list){
          this.rolelist = res.list;
          this.total = res.total;
        }
      }).catch(err=>{console.log(err)})

    },
    onSelectionChange (rows) {
      if(rows.some(item=>item.roleName == "admin")){
        //提示管理员不可删除
        console.log("管理员账号不可删除")
      }else{
        this.deleteUserInfo = rows;
        this.deleteButtonFlag = !this.deleteUserInfo.length>0;
      }

    },
    deleteConfirm(){
      if(this.deleteUserInfo.length>0){
        this.$root.mes("warn","w-20200512154954").then(res=>{  //提示是否确定删除
          if(res){
            this.deleteSelection()
          }
        })
      }else{
        this.$root.mes("error","w-20200521173305") //提示没有选中数据
      }
    },
    deleteSelection(){
      this.$axios.post(`/user/deleteRoles?roleid=${this.model.roleId}&pageNum=1&pageSize=${this.model.pageSize}`,this.deleteUserInfo)
        .then((result) => {
          this.rolelist=result.list
          this.total=result.total
          this.roleNamelist=result.list
          this.deleteUserInfo=[]
          this.delete_confirm = false;
          this.deleteButtonFlag = true;
          this.$Message.success('删除成功');

        })
        .catch((err) => {
          console.log(err)
        })
    },

    handleChangePage (value) {
      this.model.pageNum = value;
      this.getData()
    },

    handleChangePageSize(value){
      this.model.pageSize = value;
      this.getData()
    },

    toadd(){
      this.modal_add_user=true
      this.insertUserInfo.roleName=''
      this.insertUserInfo.displayOrder=1
      this.insertUserInfo.miaoShu=''
    },

    save () {
      this.$axios.post(`/user/checkRoleIsExist`,this.insertUserInfo)
      .then((result) => {
            if(result.data){
              this.$axios.post(`/user/saveRoles?roleid=${this.model.roleId}&pageNum=1&pageSize=${this.model.pageSize}`,this.insertUserInfo)
                  .then((result) => {
                    console.log(result)
                    this.rolelist=result.data.list
                    this.total=result.data.total
                    this.roleNamelist=result.data.list
                    this.insertUserInfo.roleName=''
                    this.insertUserInfo.displayOrder=1
                    this.insertUserInfo.miaoShu=''
                    this.modal_add_user = false;
                    this.$Message.success('角色添加成功');
                  })
                  .catch((err) => {
                    this.$Message.error("角色添加失败");
                    this.modal_add_user = false;

                  })
            }else{
              this.$Message.error('此角色名称已存在！');
            }

        })
      .catch((err) => {
        console.log(err)
      })
    },
    updateSelection(res){
      if(this.$store.state.controls.M_2_200421112115_update){
        if(res.roleName=='admin'){
          this.modal_update_user = false
        }else{
          this.updateUserInfo=res
          this.modal_update_user = true
        }
      }
    },

    update () {
      if(!this.clickSt){
        return
      }
      if(this.updateUserInfo.roleName ==''||this.updateUserInfo.displayOrder==null ){
        this.$Message.error('带*不可为空');
        this.clickSt=false
        setTimeout(()=>{
          this.clickSt=true
        },2000)
        return;
      }
      this.$axios.post(`/user/selectRoleIsExistForUpdate`,this.updateUserInfo)
        .then((result) => {
              if(result.data){
                this.$axios.post(`/user/updateRole?roleid=${this.model.roleId}&pageNum=1&pageSize=${this.model.pageSize}`,this.updateUserInfo)
                .then((result) => {
                  console.log(result,"失败了")
                  if(result.code === 0){
                    this.rolelist=result.data.list
                    this.total=result.data.total
                    this.roleNamelist=result.data.list
                    this.updateUserInfo = {},
                    this.modal_update_user = false;
                    this.$Message.success('角色信息修改成功');
                  }
                })
                .catch((err) => {
                  this.$Message.error('角色信息修改失败');
                  this.updateUserInfo = {},
                  this.modal_update_user = false;
                  iview.Message.error({
                    content:err.message,
                    duration:5
                  });
                })
              }else{
                this.$Message.error('此角色名称已存在！');
                this.clickSt=false
                setTimeout(()=>{
                  this.clickSt=true
                },2000)
              }

          })
        .catch((err) => {
          console.log(err)
        })
      // axios.post(sessionStorage.http+`/user/updateRole?pageNum=${this.pageNum}&pageSize=${this.pageSize}
      //   &loginStatus=${sessionStorage.loginStatus}`,this.updateUserInfo)
      // .then((result) => {
      //   this.rolelist=result.data.list
      //   if(result.data.total>1){
      //     this.total=result.data.total-1
      //   }else{
      //     this.total=result.data.total
      //   }
      //   this.roleNamelist=result.data.list
      //   this.updateUserInfo = {},
      //   this.modal_update_user = false;
      //   this.$Message.success('用户信息修改成功');
      // })
      // .catch((err) => {
      //   this.$Message.error('用户信息修改失败');
      //   this.updateUserInfo = {},
      //   this.modal_update_user = false;
      //   iview.Message.error({
      //     content:err.message,
      //     duration:5
      //   });
      // })
    },

    // update_cancel () {
    //     this.updateUserInfo = {},
    //     this.modal_update_user = false;
    // },
  }
}

</script>

<style lang="css">
  .ivu-table-overflowX{
    overflow-x: hidden;
  }
</style>

<style lang="less">
@import '../../assets/styles/common';
  .rolemodalstyle{
      color:#5aa5ff !important;
      font-size: 12px !important;
      font-family:"Microsoft YaHei";
      line-height: 20px !important;
    .roleAdd{
      padding: 0 10px;
    }
  }

</style>
