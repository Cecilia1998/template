<template lang="html">
  <div class="login">
    <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <Form-item label="库区">
        <Select v-model="formFilter.first_result" placeholder="请选择" @on-change="" style="width: 100px;border:1px solid #8390f1;border-radius:4px;">
          <Option value="">-所有状态-</Option>
          <Option value="1">接通</Option>
          <Option value="2">未接通</Option>
        </Select>
      </Form-item>
      <Form-item label="货位号">
        <Input v-model="formFilter.order_id" style="border:1px solid #8390f1;border-radius:4px;"/>
      </Form-item>
      <Form-item label="托盘号">
        <Input v-model="formFilter.order_id" style="border:1px solid #8390f1;border-radius:4px;"/>
      </Form-item>
      <Form-item label="商品编号">
        <Input v-model="formFilter.order_id" style="border:1px solid #8390f1;border-radius:4px;"/>
      </Form-item>
      <Form-item label="商品名称">
        <Input v-model="formFilter.order_id" style="border:1px solid #8390f1;border-radius:4px;"/>
      </Form-item>
      <Form-item label="客户">
        <Select v-model="formFilter.first_result" placeholder="请选择" @on-change="" style="width: 100px;border:1px solid #8390f1;border-radius:4px;">
          <Option value="">-所有状态-</Option>
          <Option value="1">接通</Option>
          <Option value="2">未接通</Option>
        </Select>
      </Form-item>
      <Form-item label="批次号">
        <Select v-model="formFilter.current_overdue_group" placeholder="请选择组" style="width: 100px;border:1px solid #8390f1;border-radius:4px;">
          <Option value="">-所有分组-</Option>
          <Option value="11">S0</Option>
          <Option value="1">S1</Option>
          <Option value="2">S2</Option>
        </Select>
      </Form-item>
      <Form-item label="逾期天数" id='overdue_day'>
        <input v-model="formFilter.overdue_day_start" style="border:1px solid #8390f1;border-radius:4px;"/> -- <input v-model="formFilter.overdue_day_end" style="border:1px solid #8390f1;border-radius:4px;"/>
      </Form-item>
      <Form-item label="生产日期" id="product_date">
        <input v-model="formFilter.overdue_day_start" style="border:1px solid #8390f1;border-radius:4px;"/> -- <input v-model="formFilter.overdue_day_end" style="border:1px solid #8390f1;border-radius:4px;"/>
      </Form-item>
      <Form-item label="到期日">
        <Select v-model="formFilter.status" placeholder="请选择状态" style="border:1px solid #8390f1;border-radius:4px;">
          <Option value="0">-所有状态-</Option>
          <Option value="1">待催收</Option>
          <Option value="10">催收中</Option>
          <Option value="20">承诺还款</Option>
          <Option value="30">催收成功</Option>
          <Option value="60">停催</Option>
        </Select>
      </Form-item>
      <Form-item label="留案状态">
        <Select v-model="formFilter.kept_status" placeholder="请选择状态" style="width: 100px;border:1px solid #8390f1;border-radius:4px;">
          <Option value="-1">-所有状态-</Option>
          <Option value="0">待审批</Option>
          <Option value="1">审批通过</Option>
          <Option value="2">审批驳回</Option>
        </Select>
      </Form-item>
      <Form-item label="还款时间">
        <Date-picker type="daterange" placement="bottom-end" v-model="formFilter.payback_date" style="border:1px solid #8390f1;border-radius:4px;"></Date-picker>
      </Form-item>
      <Form-item label="最后催收时间" style="margin-left:20px;">
        <Date-picker type="daterange" placement="bottom-end" v-model="formFilter.cui_date" style="border:1px solid #8390f1;border-radius:4px;"></Date-picker>
      </Form-item>

      <Form-item label="派单时间">
        <Date-picker type="daterange" placement="bottom-end" v-model="formFilter.dispatch_date" style="border:1px solid #8390f1;border-radius:4px;"></Date-picker>
      </Form-item>
      <Button type="primary" @click="handleSubmit" id="check">查询</Button>
      <Button type="primary" @click="exportfile">导出</Button>
    </Form>
    <Table :loading="loading" @on-row-dblclick='onDoubleClick' ref="selection" :columns="tableColumns.card" :data="tabledata" @on-selection-change=""></Table>
    <br />
    <Page :total="total" :current="formFilter.cur_page" :page-size="definePageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,50,100,200,300]" @on-change="" @on-page-size-change="" style="text-align:left"></Page>
    <!-- <ul id="vfor">
    	<template v-for="(a,b,c) in names">
    		<li>{{c}}</li>
    	</template>
    </ul> -->
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
// import FilterBar from '@/components/FilterBar'
// import List from '@/components/List'
// import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      loading:false,
      total:0,
      formFilter: {
      },
      tabledata:[
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
        {order_id:'',user_name:'',mobile:''},
      ],
      names:[
  			{name:'estar'},
  			{name:'TingPing'},
  			{name:'LiangXing'},
      ],
      definePageSize:10,
      tableColumns: {
         card: [
           {title: '订单号',key: 'order_id',align: 'center'},
           {title: '姓名',key: 'user_name',align: 'center'},
           {title: '手机号',key: 'mobile',align: 'center'},
         ],
       }

    }
  },
  created(){        //渲染成功之后的专改
  },

  computed:{

  },
  methods:{
    handleSubmit () {
      alert('trest')
       // const paths = this.$route.path.split("/")
     },
     exportfile(){

     },
     onDoubleClick(value){
       console.log(value)
     }
  }
}
</script>

<style lang="less" scoped>
    #overdue_day input,#product_date input{
    display: inline-block;
    width: 100px;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
</style>
