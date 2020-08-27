<template lang="html">
  <div class="UserRole">
      <!-- :model="userInfo"表单对象 在下面绑定数据 -->
    <i-form style="text-align:left;" :label-width="85">
      <Row>
        <i-col span="6">
          <Form-item :label="$t('common.depart')">
            <i-select :placeholder="$t('message.todoSelect')" filterable clearable v-model="sectorPartId" @on-change="getAllUser">
              <i-option v-for="sector in partItems"  :key="sector.sectorid" :value="sector.sectorid">{{sector.sectorname}}</i-option>
            </i-select>
          </Form-item>
        </i-col>
        <i-col span="6">
          <Form-item :label="$t('common.user')">
            <i-select :placeholder="$t('message.todoSelect')" filterable clearable v-model="operatorid" @on-change="getUserName">
              <i-option v-for="sector in users"  :key="sector.operatorid" :value="sector.operatorid">{{sector.name}}</i-option>
            </i-select>
          </Form-item>
        </i-col>
      </Row>
    </i-form>
    <div class="spaceBetween">
      <div class="username">
        <!-- <font size="3px" color="blue">{{username}}</font><font size="3px">的角色列表：</font> -->
        <span>{{username}}</span><span>{{$t('message.tipRoleList')}}</span>
      </div>
      <div v-if="$store.state.controls.M_2_200421112208_update">
        <Radio-group v-model.sync="selected" @on-change="selectAll">
            <Radio :label="$t('actions.all')"></Radio>
            <Radio :label="$t('actions.reset')"></Radio>
        </Radio-group>

        <i-button class="btnForm" :disabled="!operatorid" type="primary" shape="circle" @click='saveRole'>{{$t('actions.roleAssign')}}</i-button>
      </div>
    </div>
    <CheckboxGroup v-model="selectedRoles" class="checkArea">
      <Row>
        <Col span="6" v-for="(item,index) in roles" :key="index">
          <Checkbox :label="item.roleid">{{item.rolename}}</Checkbox>
        </Col>
      </Row>

    </CheckboxGroup>


  </div>
</template>

<script>
import iview from 'view-design'
export default {

  data () {
    return {
      clickSt:true,
      tempValue:[],//临时数据，存放所选用户的角色值
      selectedRoles: [],//选中的复选框的值
      selected: '',//全选和全不选的值

      sectorPartId:"",//所选的部门
      partItems:[],//部门
      users:[],//部门下的所有用户
      operatorid:"",//所选的用户的值
      roles:[],//所有可选的角色值
      username:""  //角色名称
    }
  },
  created(){
    this.username=this.$t('common.user')
    //获取所有部门
    this.$axios.get(`/getAllPart`)
    .then((result) => {
      this.partItems=result.data
    })
    .catch((err)=>{
      iview.Message.error({
        content:err.message,
        duration:5
      });
    })

    //获取角色列表
    this.$axios.get(`/getAllRole`)
    .then((result) => {
      this.roles=result.data
    })
    .catch((err) => {
      console.log(err)
    })

  },

  computed:{

  },
  methods:{
    //获取部门中的所有用户
    getAllUser(){
      this.$axios.get(`/getAllUser?sectorid=${this.sectorPartId}`)
      .then((result) => {
        // console.log(userInfob.data)
        this.users=result.data
      })
      .catch((err) => {
        iview.Message.error({
          content:err.message,
          duration:5
        });
      })
    },
    //根据选取用户的id，获取用户名
    getUserName(){
      if(this.operatorid==undefined){
        this.username=this.$t('common.user')
      }
      for(let item of this.users) {
        if(item.operatorid==this.operatorid){
          this.username=item.name
        }
      }

      //根据用户id获取用户当前角色
      this._axios("get","getAllUserRole",{operatorid1:this.operatorid},data=>{
        this.selectedRoles=data
        this.tempValue=data
      })
    },

    selectAll(){
      if(this.selected=='全选'){
        this.selectedRoles=[]
        for(let item of this.roles) {
          this.selectedRoles.push(item.roleid)
        }
      }else{
        this.selectedRoles=this.tempValue
      }
    },
    initData(){
      this.operatorid = ""
      this.sectorPartId=""
      this.selected = null;
      this.selectedRoles=[]
      this.username="用户"
    },
    saveRole(){
      this.$axios.post(`/saveRole?operatorid1=${this.operatorid}`,this.selectedRoles)
      .then((result) => {
        if(result.code==0){
          this.selectedRoles=[]
          this.operatorid = ""
          this.usrename="用户"
          this.sectorPartId=""
          this.selected=''
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

<style lang="css">
.ivu-table-overflowX{
  overflow-x: hidden;
}
</style>
<style lang="less">
  .UserRole,.roleUser{
    .checkArea{
      width:1200px;
      text-align: left;
    }
  }
  .UserRole{
    text-align: left;
    .username{
      font-size: medium;
      line-height: 28px;
      margin-bottom: 15px;
      span:first-child{
        color: blue;
      }
    }
   //  th .ivu-table-cell{
   //    font-size: 12px !important;
   //    font-weight: bold;
   //    color:#333;
   //  }
   //  .ivu-form .ivu-form-item-label{
   //    color: #5AA5FF;
   //  }

   //  .ivu-tabs-nav .ivu-tabs-tab-active{
   //    background-color: white !important;
   //    font-size: 20px;
   //    border-radius: 8px;
   //  }
   //  .ivu-tabs-ink-bar{
   //    background-color: #fff;
   //  }
   //  .ivu-tabs-nav .ivu-tabs-tab{
   //    font-size: 14px;
   //    background-color: #f3f3f3;
   //  }
   //  .ivu-tabs-nav-scroll{
   //    background-color: #f3f3f3;
   //  }
   //  .ivu-input{
   //    border:1px solid #888888;
   //  }
   //  .ivu-select-selection{
   //    border:1px solid #888888;
   //  }
   //  .ivu-table-overflowY {
   //    overflow-y: scroll;
   //  }
   // .ivu-table-tbody{
   //   font-size: 12px;
   //   color:#999;
   //   font-family:"Microsoft YaHei";
   //   line-height: 50px;
   //   vertical-align: middle;
   // }
   // .ivu-table td{
   //   background-color:#fff;
   // }
   // .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
   //   background-color: #f9f9f9;
   // }
   // .ivu-input-icon{
   //      position: absolute;
   //      right:45px;
   //  }
   // .ivu-input-icon-normal+.ivu-input{
   //   width: 120px;
   // }
  }
</style>
