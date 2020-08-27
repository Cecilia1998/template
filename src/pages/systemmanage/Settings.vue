<template>
  <div class="settings">
    <Button @click="change()">提交</Button>
    <Collapse v-model='expand'>
      <Panel v-for="(item,index) in data" :name="index" :key="index" v-if="typeof item == 'object'&&index!='desc' ">
        {{index}}
        <div slot="content">
          <div v-for="(it,i) in item" v-if="typeof it != 'object' " class="content">
            <span>{{i}}</span> <span class="tips">({{data.desc[i]}})：</span>
            <Input  v-model="data[index][i]" v-if="typeof it =='string' "></Input>
            <Input v-model="data[index][i]" number v-if="typeof it =='number' "></Input>
            <Checkbox :label="it" v-if="typeof it == 'boolean'"></Checkbox>
          </div>
        </div>
      </Panel>
    </Collapse>
  </div>
</template>

<script>
  export default{
    name:"settings",
    data(){
      return{
        data:{
        },
        expand:["user","log","outorder","document"]
      }
    },
    created() {
      this.getData()


    },
    methods:{
      getData(){
        this._axios("get","sysconf/confs",data=>{
          this.data = data;
        })
      },
      getParam(data){
        let param = {}
        for(let i in data){
          if(i !="desc"){
            for(let d in data[i]){
              param[i+"."+d]=data[i][d]
            }
          }
        }
        return param;
      },
      change(){
        console.log(this.getParam(this.data))
        this._axios("put","sysconf/conf",this.data,data=>{
          this.getMes("put",data)
        })
      }
    }
  }
</script>

<style lang="less">
  @import '../../assets/styles/common';
  .settings{
    text-align: left;
    width:800px;
    .content{
      // display: flex;
      &:not(:last-of-type){
        margin-bottom: 10px;
      }
      span{
        // flex: 0 0 100px;
      }
      .tips{
        color: #999;
      }
    }
  }
</style>
