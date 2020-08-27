<template lang="html">
  <div class="roleUser">
      <!-- :model="userInfo"表单对象 在下面绑定数据 -->
    <i-form style="text-align:left;" :label-width="85">
      <Row>
        <i-col span="6">
          <Form-item :label="$t('common.role')">
            <Select clearable filterable :placeholder="$t('message.todoSelect')" v-model="selectedRoleId" @on-change="getUsersByRoleId">
              <i-option v-for="sector in roles"  :key="sector.roleid" :value="sector.roleid">{{sector.rolename}}</i-option>
            </Select >
          </Form-item>
        </i-col>
      </Row>
    </i-form>
    <div class="spaceBetween">
      <div class="role">
        <span>{{rolename}}</span><span>{{$t('message.tipUserList')}}</span>
      </div>
      <div v-if="$store.state.controls.M_2_200421112236_update">
        <Radio-group v-model.sync="selected" @on-change="selectAll">
            <Radio :label="$t('actions.all')"></Radio>
            <Radio :label="$t('actions.reset')"></Radio>
        </Radio-group>

        <i-button class="btnForm" :disabled="!selectedRoleId" type="primary" shape="circle" @click='saveRole'>{{$t('actions.roleAssign')}}</i-button>
      </div>
    </div>
    <Checkbox-group v-model="selectedUsers" class="checkArea">
      <Row>
        <Col span="6" v-for="(item,index) in users" :key="index">
          <Checkbox  :label="item.operatorid">{{item.name}}</Checkbox>
        </Col>
      </Row>

    </Checkbox-group>

  </div>
</template>

<script>
import iview from 'view-design'
export default {

  data () {
    return {
      tempValue:[],//临时数据，存放所选用户的角色值
      selectedUsers: [],//选中的复选框的值
      selected: '',//全选还是复位
      users:[],//全部用户
      roles:[],//所有角色
      selectedRoleId:"",
    }
  },
  created(){
    this.rolename=this.$i18n.t("common.role")
    this.$axios.get(`/getAllUser`)
    .then((result) => {
      this.users=result.data
    })
    .catch((err)=>{
      iview.Message.error({
        content:err.message,
        duration:5
      });
    })
    // this.rolename="",
    this.$axios.get(`/getAllRole`)
    .then((result) => {
      this.roles=result.data
    })
    .catch((err) => {
      console.log(err)
    })

  },

  computed:{
    selectedRoleName(){
      for(let role of this.roles){
        if(role.roleid == this.selectedRoleId){
          this.selectedRoleName = role.rolename
        }
      }
    }
  },
  methods:{
    getUsersByRoleId(){

      this.rolename=this.$i18n.t("common.role")
      for(let item of this.roles) {
        if(item.roleid==this.roleid){
          this.rolename=item.rolename
        }
      }

      this._axios("get","getAllUserByroleId",{roleid:this.selectedRoleId},data=>{
        this.selectedUsers = data;
      })
      // this.$axios.get(`/`)
      // .then((result) => {
      //   if(result.code === 0)

      // })
      // .catch((err) => {
      //   iview.Message.error({
      //     content:err.message,
      //     duration:5
      //   });
      // })
    },

    getUserName(){
      this.$axios.get(`/getAllUserRole?operatorid=${this.operatorid}`)
      .then((result) => {
        this.selectedUsers=result.data
        this.tempValue=result.data
      })
      .catch((err) => {
        iview.Message.error({
          content:err.message,
          duration:5
        });
      })
    },

    selectAll(){
      if(this.selected=='全选'){
        this.selectedUsers=[]
        for(let item of this.users) {
          this.selectedUsers.push(item.operatorid)
        }
      }else{
        this.selectedUsers=this.tempValue
      }
    },

    saveRole(){
      if(this.selectedRoleId == ''){
        this.$root.mes("error","") //提示请先选择角色
        return;
      }
      console.log(this.selectedRoleId)
      this.$axios.post(`/saveRoleUser?roleid=${this.selectedRoleId}`,this.selectedUsers)
      .then((result) => {
        this.roleid=''
        this.rolename=this.$i18n.t("common.role")
        if(result.code==0){
          this.$Message.success('添加成功');
        }else{
          this.$Message.error('添加失败');
        }

      })
      .catch((err) => {
        console.log(err)
      })
    },
  }
}

</script>

<style lang="less">
  .roleUser{
    // .ivu-checkbox-default{
    //   margin: 10px 0;
    //   margin-right: 10px;
    //   text-align: left;
    // }
    .checkArea{
      text-align: left;
    }
  }
  .role{
    font-size: medium;
    line-height: 28px;
    margin-bottom: 15px;
    span:first-child{
      color: blue;
    }
  }
</style>
