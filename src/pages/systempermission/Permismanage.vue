<template lang="html">
  <div class="permismanage">
    <Form ref="searchUserInfo" :label-width="75" style="text-align:left;">
      <Row>
        <Col span="4">
          <Form-item :label="$t('common.role')" >

            <Select v-model="selectRoleId" filterable clearable :placeholder="$t('message.todoSelect')" @on-change="getAllMenuByroleId">
              <Option v-for="sector in roles"  :key="sector.roleId" :value="sector.roleId?sector.roleId:-1">{{sector.roleName}}</Option>
            </Select>
          </Form-item>
        </Col>
      </Row>
    </Form>
    <Row>
      <Col span="4">
        <div class="role"><span>{{selectRoleName}}</span>{{$t('message.tipPermission')}}：</div>
      </Col>
      <Col span="4"  v-if="$store.state.controls.M_2_200421112304_update">
        <Button type="primary" shape="circle" class="btnForm" @click="saveRole">{{$t('actions.rightAssign')}}</Button>
      </Col>
    </Row>
    <div>
      <Tree :data="menus" show-checkbox   ref="tree"></Tree>
    </div>
  </div>
</template>

<script>
import iview from 'view-design'
export default {
  components: {

   },
  data () {
    return {
      roles : [{
        roleId:null,
        roleName:null
      }],

      // types:[], //控件语言类型

      menus : [],
      selectRoleId:''
    }
  },
   created(){
      this.getMenus();

      this.getRoles();


  },
  computed:{
    selectRoleName(){
      for(let role of this.roles){
        if(role.roleId == this.selectRoleId){
          return role.roleName
        }
      }
      return this.$t('common.user')
    }
  },
  methods:{
    // setKey(arr){
    //   for(var i of arr){
    //     if(!i.children && typeof parseInt(i.title) == "number"){
    //       if(typeof parseInt(i.title) == "number"){
    //         i.title = this.getLabel(this.types,i.title);
    //       }else{
    //         i.title = i.title;
    //       }

    //     }else{
    //       this.setKey(i.children)
    //     }
    //   }
    // },
    async getMenus () {


      this._axios("get","getAllMenu",{lang:this.$store.state.globalLang},(data)=>{
        this.menus = data;
      })
    },


    getRoles () {
      this.$axios.get(`/user/userinforlist`)
        .then((result) => {
          this.roles = result.data;
        })
        .catch((err)=>{
        })
    },

    getAllMenuByroleId () {
      this.menus.forEach(item=>{
       item.checked = false;
        item.children.forEach(it=>{
          it.checked = false;
          it.children.forEach(i=>{
            i.checked = false;
          })
        })
      })
      this.$axios.get(`/getAllMenuByroleId?roleid=${this.selectRoleId}`)
        .then((result) => {
         this.menus.forEach(item=>{
            item.children.forEach(it=>{
              it.children.forEach(tmp=>{
                if(result.data.find(i=>i.controlID===tmp.value&&i.menuID===tmp.parentVal)!==undefined)tmp.checked = true;
              })
            })
          })
         // this.menus.forEach(it=>it.checked = true)
        })
        .catch((err)=>{

        })



    },

    saveRole () {
      console.log(this.selectRoleId)
      if(!this.selectRoleId || this.selectRoleId===undefined){
        iview.Message.error({
          content:"未选择角色",
          duration:5
        });
        return;
      }else{
        const slectMenu = this.$refs.tree.getCheckedNodes();
        //console.log(slectMenu)
        const params = slectMenu.filter(item=>item.level===2).map(item=>{return{
          'menuID':item.parentVal,
          'controlID' : item.value
        }});
        //console.log(params)
        //return
        this.$axios.post(`/saveAthority?roleid=${this.selectRoleId}`,params).then(res=>{
          if(res.code===0){
            iview.Message.info({
              content:"角色分配成功",
              duration:5
            });
            this.getAllMenuByroleId ()
          }


        }).catch(err=>{
          iview.Message.error({
            content:err.message,
            duration:5
          });
        })
      }


    }



  }
}

</script>

<style lang="less" scoped>
  .permismanage{
    text-align: left;
    .role{
      font-size: medium;
      span{
        color: blue;
      }
    }
  }
    .ivu-menu-light{
      background-color:rgb(238,247,255)
    }
    .addrole{
      display: inline-block;
      width: 150px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background:white;
      border-radius: 15px;
      color: rgb(90,165,255);
      border: 1px solid rgb(90,165,255);
      font-size: 16px;
      margin-right: 10px;
    }
    .editinfo{
      color: #5aa5ff;
      font-size: 20px;
    }
    .ivu-table-overflowX{
      overflow-x: hidden;
    }
    .ivu-radio-wrapper{
      padding-top: 16px !important;
    }

</style>
