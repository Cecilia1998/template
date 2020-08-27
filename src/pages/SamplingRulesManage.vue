<template>
  <div class="samplingRulesManage">
    <div class="flexStart btns">
      <!-- <Button class="btnForm" shape="circle" @click="locked = !locked" type="primary">{{locked?"解锁":"锁定"}}</Button> -->
      <Button v-if="$store.state.controls.M_2_200605155309_update" class="btnForm" shape="circle" @click="update" type="primary">{{locked?$t('actions.update'):$t('actions.save')}}</Button>
    </div>
    <Form class="form formValidate" ref="sampling" :model="sampling" :label-width="150" :rules="samplingValidate">
      <Row>
        <Col span="12">
          <FormItem :label="$t('common.sampleMax')" prop="chkqtymin">
            <Input :readonly="locked" number v-model.sync="sampling.chkqtymin"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('common.sampleMaxRelationship')" prop="chkqtyminfor">
            <Input :readonly="locked" v-model.sync="sampling.chkqtyminfor"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('common.sampleMin')" prop="chkqtymax">
            <Input :readonly="locked" number v-model.sync="sampling.chkqtymax"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('common.sampleMinRelationship')" prop="chkqtymaxfor">
            <Input :readonly="locked" v-model.sync="sampling.chkqtymaxfor"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('common.sampleQuantity')" prop="chkqty">
            <Input :readonly="locked" number v-model.sync="sampling.chkqty"></Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem :label="$t('common.sampleRule')" prop="chkselrule">
            <Input :readonly="locked" v-model.sync="sampling.chkselrule"></Input>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
  export default{
    name:"samplingRulesManage",
    data(){
      return {
        locked:true,
        sampling:{

        },
        samplingValidate:{
          chkqtymin:[
            { required:true,type:"number", message:"请输入取样数量下限", trigger:"change"},
            {min:0,type:"number",message:"请输入非负数字",trigger:"change"},
          ],
          chkqtyminfor:[
            { required:true, message:"请输入取样数量下限关系式", trigger:"change"},
          ],
          chkqtymax:[
            { required:true,type:"number",message:"请输入取样数量上限", trigger:"change"},
            {min:0,type:"number",message:"请输入非负数字",trigger:"change"},
          ],
          chkqtymaxfor:[
            { required:true, message:"请输入取样数量上限关系式", trigger:"change"},
          ],
          chkqty:[
            { required:true,type:"number", message:"请输入取样数量上限", trigger:"change"},
            {min:0,type:"number",message:"请输入非负数字",trigger:"change"},
          ],
          chkselrule:[
            { required:true, message:"请输入取样数量下限", trigger:"change"}
          ]
        }
      }
    },
    created() {
      this.$axios.get("/productchkruleinfo/productchkruleinfo").then(res=>{
        // console.log(res)
        if(res.data){
          this.sampling = res.data;
          // console.log(this.sampling)
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      update(){
        if(this.locked){
          this.locked = false;
        }else{
          this.checkValidate("sampling").then(result=>{
            if(result){
              // console.log(this.sampling)
              this.$axios.put("/productchkruleinfo/productchkruleinfo",this.sampling).then(res=>{
                // console.log(res)
                if(res.data){
                  this.locked = true;
                  this.$root.mes("info","w-20200430131709") //提示“更新成功”
                }else{
                  this.$root.mes("error","w-20200605180340") //提示“更新失败”
                }
              }).catch(err=>{
                console.log(err)
              })
            }else{
              this.$root.mes("error","w-20200605135011")
            }
          })
        }

      }
    }
  }
</script>

<style lang="less">
  .form{
    width: 80%;
  }
  .btns{
    button{
      margin-right: 10px;
    }
    margin:10px auto;
  }
</style>
