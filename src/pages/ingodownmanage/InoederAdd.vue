<template lang="html">
  <div class="add">
     <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;" >
        <div style="text-align:left;"><font color="#59a6fe" size="2px">&nbsp;&nbsp;入库单管理:入库单明细编辑</font></div>
        <div>&nbsp;</div>
        <Row>
          <Col span="24">
             <div style="text-align:left;padding-left:5px"><font size="2px">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;创建人:{{creater}}</div>
          </Col>
        </Row>
        <div>&nbsp;</div>
        <Row>
          <Col span="1">&nbsp;</Col>
          <Col span="23">
               <Row>
                 <Col span="4">
                     <Form-item label="入库单号:" prop="order_id" status-icon >
                       <font color="red" class="font">*</font>
                       <Input v-model="formFilter.order_id" placeholder="请输入入库单号" style="width: 117px;"/>
                     </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="入库类型:">
                     <font color="red" class="font1">*</font>
                     <Select v-model="formFilter.order_type" placeholder="请选择" @on-change="" style="width: 117px;">
                       <Option value="">-所有状态-</Option>
                       <Option value="1">一般入库</Option>
                       <Option value="2">临时入库</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="客户:">
                     <font color="red" class="font3">*</font>
                     <Select v-model="formFilter.order_customer" placeholder="请选择" @on-change="" style="width: 117px">
                       <Option value="">-所有状态-</Option>
                       <Option value="1">上海速锐</Option>
                       <Option value="2">佛山华涛</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="供应商:">
                    <font color="red" class="font2">*</font>
                     <Select v-model="formFilter.order_customer" placeholder="请选择" @on-change="" style="width: 117px">
                       <Option value="">-所有状态-</Option>
                       <Option value="1">上海速锐</Option>
                       <Option value="2">佛山华涛</Option>
                     </Select>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="部门:">
                     <font color="red" class="font3">*</font>
                     <Select v-model="formFilter.order_customer" placeholder="请选择" @on-change="" style="width: 117px">
                       <Option value="">-所有状态-</Option>
                       <Option value="1">开发一部</Option>
                       <Option value="2">财务部</Option>
                     </Select>
                   </Form-item>
                 </Col>
               </Row>
               <Row>
                 <Col span="4">
                   <Form-item label="申请日期:">
                     <font color="red" class="font">*</font>
                         <DatePicker v-model="formFilter.createtime" type="date" placeholder="请选择" style="width: 117px"></DatePicker>
                   </Form-item>
                 </Col>
                 <Col span="4">
                   <Form-item label="入库总数:">
                     <Input v-model="formFilter.quantity" style="width: 117px;"/>
                   </Form-item>
                 </Col>
                 <Col span="12">
                   <Form-item label="备注:" style="width: 100%;">
                     <Input v-model="formFilter.remark"/>
                   </Form-item>
                 </Col>
               </Row>
           </Col>
         </Row>
         <Row>
           <Col span="5">
              <div style="text-align:left;padding-left:68px">
                <Form-item label="新增行数:">
                  <font size="2px" class="fontdetail">入库单明细</font>
                  <Input v-model="formFilter.num" style="width: 50px;"/>
                </Form-item>
              </div>
           </Col>
           <Col span="6">
             <Button  shape="circle">增加</Button>
             <Button  shape="circle">提交</Button>
             <Button type="primary" shape="circle" to="/ingodownmanage/inordermanage">返回</Button>
           </Col>
         </Row>
         <Row>
           <Col span="24">
               <Table :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>
           </Col>
         </Row>
     </Form>
  </div>
</template>

<script>
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {
      formFilter: {
        cur_page:1
      },
      creater:'尹波',
      tableColumns: {
         card: [
           {title: '选择',key: 'select',width:50,type: 'selection',align: 'center'},
           {title: '序号',key: 'lineNo',width:75,align: 'center'},
           {title: '商品编号',key: 'itemcode',width:140,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             }},
           {title: '商品名称',key: 'itemname', align: 'center'},
           {title: '单位', key: 'unit',align: 'center'},   //新增
           {title: '批次号', key: 'batchNo',width:140,align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             }},          //新增
           {title: '入库数量', key: 'quantity',align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             }},          //新增
           {title: '接收数量',key: 'receive_quantity',align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             }},
           {title: '到期日',key: 'duedate',align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             }},
           {title: '生产日期', key: 'productiondate', align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             } },
           {title: '供应商', key: 'supplier', align: 'center',render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             } },
           {title: '备注', key: 'remark', align: 'center' ,render: (h, params) => {
             return h('div',[
               h('Input',{

                 }
               )]);
             }},
           {title: '操作', key: 'action',fixed: 'right',align: 'center', width: 120,
             render: (h, params) => {
               const permissions = params.row.permissions
               const lea_status = params.row.status
               let buttons = []
               if (true) {
                 buttons.push(h('Button', {
                   props: {
                     type: 'info',
                     size: 'small'
                   },
                   style: {
                     marginRight: '5px'
                   },
                   on: {
                     click: () => {
                       this.handleApplyLeavecase(params.row.collection_id)
                     }
                   }
                 }, '删除'))
               }
               return h('div', buttons)
             }
           }
         ],
         data:[
           {
             select:false,
             lineNo:1,
             itemcode:'',
             itemname:'',
             unit:'个',
             batchNo:'',
             quantity:'',
             receive_quantity:'',
             duedate:'',
             productiondate:'',
             supplier:'',
             remark:''

           }
         ]

       }
    }
  },
  methods:{

  }
}
</script>

<style lang="css">
</style>
<style lang="less" scoped>
    .font{
      position: absolute;
      left: -75px;
    }
    .font1{
      position: absolute;
      left: -70px;
    }
    .font2{
      position: absolute;
      left: -60px;
    }
    .font3{
      position: absolute;
      left: -50px;
    }
    .fontdetail{
      position: absolute;
      left: -150px;
    }
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
