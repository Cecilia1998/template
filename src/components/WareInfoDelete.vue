<!-- 电话催收组件 -->
<template>
  <Modal v-model="delete_confirm" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>删除确认</span>
    </p>
    <div style="text-align:center">
      <span style="font-size:22px">确定要删除吗？</span>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long  @click="deleteSelection">确定删除</Button>
    </div>
  </Modal>
</template>
<script>
import axios from 'axios'
import iview from 'view-design'

 // import {mapGetters,mapActions} from 'vuex'
 // import {get, post} from '../Util'
 export default {
   created(){

   },
   data () {
     return {
       deleteWareInfo:[],
       form:{
       },
       formFilter: {
       },
       delete_confirm: false,
       loading: true,
     }
   },
   computed: {
     // ...mapGetters('importcase', ['addbatchData','sponerData']),
   },
   methods: {
     // ...mapActions('importcase', ['addBatch_gettempsele','addBatch','getBatchList','getSponer']),
     show (a) {
       this.delete_confirm = true
       console.log(a)
       this.deleteWareInfo = a
     },

     deleteSelection(){

         axios.post('http://192.168.0.118:8088/deleteWareInfo',this.deleteWareInfo)
         .then((ref) => {
           // console.log(userInfob.data)
           this.deleteWareInfo=ref
           this.delete_confirm = false;
           this.deleteButtonFlag=true;
           this.$Message.success('删除成功');
           axios.get(`http://192.168.0.118:8088/getAllWareHouseInfo`).then(
             (res)=>{
               this.data6 = res
               console.log(res.data)
             }
           ).catch((err)=>{
             iview.Message.error({
               content:err.message,
               duration:5
             })
         })
         })
         .catch((err) => {
           this.$Message.error('删除失败'+err);
         })

     },
     cancel(){
     },
   }
 }
</script>
<style lang="less" scoped>

</style>
