<!-- 电话催收组件 -->
<template>
  <Modal v-model="modal" title="仓库信息详情" okText="确定" cancel-text='取消' @on-ok="submit" @on-cancel="cancel" width='800px' style="height:500px;">
    <Form ref="formFilter" :model="formFilter" :label-width="60" inline style="text-align:left;">
     <Form-item label="仓库编号">
       <Input v-model="formFilter.warehouseid"/>
     </Form-item>
     <Form-item label="仓库名称">
       <Input v-model="formFilter.warehousename"/>
     </Form-item>
     <Form-item label="建筑面积">
       <Input v-model="formFilter.area"/>
     </Form-item>
     <Form-item label="所在楼层">
       <Input v-model="formFilter.floor"/>
     </Form-item>
     <Form-item label="显示顺序" id='overdue_day'>
       <Input v-model="formFilter.seq"/>
     </Form-item>
     <Form-item label="货位数量" id="product_date">
       <Input v-model="formFilter.storagenum"/>
     </Form-item>
     <Form-item label="仓库储量">
       <Input v-model="formFilter.reserves"/>
     </Form-item>
     <Form-item label="预警储量" >
       <Input v-model="formFilter.warningreserves"/>
     </Form-item>
     <Form-item label="是否启用">
       <Select v-model="formFilter.isstart" placeholder="请选择状态" style="width: 165px">
         <Option value=""></Option>
         <Option value="1">是</Option>
         <Option value="0">否</Option>
       </Select>
     </Form-item>
     <Form-item label="备注">
       <Input v-model="formFilter.remark"/>
     </Form-item>
   </Form>
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
       form:{
       },
       formFilter: {
       },
       modal: false,
       loading: true,
     }
   },
   computed: {
     // ...mapGetters('importcase', ['addbatchData','sponerData']),
   },
   methods: {
     // ...mapActions('importcase', ['addBatch_gettempsele','addBatch','getBatchList','getSponer']),
     show () {
       this.modal = true
     },
     submit () {
       axios.post(`http://192.168.0.118:8088/insert`,this.formFilter)
        // const paths = this.$route.path.split("/")
        .then((res)=>{
          modal:false,
          this.formFilter.warehouseid='',
          this.formFilter.warehousename='',
          this.formFilter.area='',
          this.formFilter.floor='',
          this.formFilter.seq='',
          this.formFilter.storagenum='',
          this.formFilter.reserves='',
          this.formFilter.warningreserves='',
          this.formFilter.remark='',
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
      }).catch((err)=>{
          iview.Message.error({
            content:err.message,
            duration:5
          });
        })
     },
     cancel(){
     },
   }
 }
</script>
<style lang="less" scoped>

</style>
