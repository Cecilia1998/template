<template lang="html">
  <div class="login">
    <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;" id="formFilter">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
      <Tabs value="name1">
          <TabPane label="入库单:单据管理" name="name1">1111111111111</TabPane>
          <TabPane label="入库单:拆单/合单" name="name2">222222222222</TabPane>
      </Tabs>
      <br>
      <tr>
        <td>
          <Form-item label="仓库名称">
            <Input v-model="formFilter.warehousename"/>
          </Form-item>
          <Form-item label="库区">
            <Select v-model="formFilter.districtId" @on-change='onChange'>
              <Option value="">测试样本</Option>
              <Option v-for='(item,index) in newdatalisttest' :value='item.name' :key='item.index'>{{item.id}}</Option>
            </Select>
          </Form-item>
          <!-- {{formFilter.districtId}} -->
          <Form-item label="生产日期" id='overdue_day'>
            <td>
              <DatePicker v-model="formFilter.startDateProduct" type="date" placeholder="起始日期" class="dateInput" ></DatePicker>
            </td>
            <td> <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/></td>
            <td>
              <DatePicker v-model="formFilter.endDateProduct" type="date" placeholder="结束日期" class="dateInput" ></DatePicker>
            </td>
          </Form-item>
          <!-- <CheckboxGroup v-model="fruit" @on-change='onCheck'>
              <Checkbox :label="formFilter.districtId"></Checkbox>
          </CheckboxGroup>
          <Select v-model="formFilter.districtId" @on-change='onChange'>
            <Option v-for='(item,index) in newdatalisttest' :value='item.name' :key='item.index'>{{item.name}}</Option>
          </Select> -->
        </td>
      </tr>
      <Form-item label="">
      </Form-item>
      <tr>
        <td width="92%"></td>
        <td width="10%" align="right">
        </td>
      </tr>
        <Button type="primary" shape="circle" icon="ios-search" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='changedatalist'>查询</Button>
        <Button type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4">删除选中项</Button>
        <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;">删除选中项</Button>
        <Button type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:#e3838;">盘点开始</Button>
    </Form>
    <br>
    <Table stripe height=520 :loading="loading" ref="selection" :columns="tableColumns.card" :data="getdatalist"></Table>
    <br />
    <div class="page">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30,50]"  style="text-align:center;"></Page>
    </div>
  </div>
</template>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
export default {
  components: {
   },
  data () {
    return {
      //库区
      columnsTable:[
        {a:'111',b:'111'},
        {a:'222',b:'222'},
        {a:'333',b:'333'},
      ],
      fruit: [],
      single:'',
      newdatalisttest:[
        {id:1,name:'苹果1'},
        {id:2,name:'苹果2'}
      ],
      testvalue:0,
      total:0,
      loading:false,
      dataliststatus:true,
     list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut'],

      formFilter: {

      },
      tabledata:[

      ],
      names:[
  			{name:'estar'},
  			{name:'TingPing'},
  			{name:'LiangXing'},
      ],
      definePageSize:10,
      tableColumns: {
        data:[
        ],
         card: [
          {title: '序号',key: 'keyid',align: 'center'},
          {title: '出库数量',key: 'outquantity',sortable: true,align: 'center'},
          {title: '可出库数量',key: 'canquantity',sortable: true,align: 'center'},
          {title: '到期日', key: 'expirationdate', align: 'center',


              // render: (h, params) => {
              //   return h('Select', {
              //         on: {
              //           'on-change':(event) => {
              //             console.log(event)
              //           }
              //         },
              //     },
              //     this.columnsTable.map(function(type){
              //         return h('Option', {
              //             props: {value: type.a}
              //         }, type.b);
              //     })
              //     );
              // },


            }
         ]
       },
       datalist:[
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444',},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
         {keyid:'111',outquantity:'222',canquantity:'333',expirationdate:'444'},
       ],
       datalisttest:[]
    }
  },
  created(){        //渲染成功之后的专改
  },
  updated(){

  },
  watch:{
    testvalue(newval,oldval){
      console.log(newval,oldval)
    }
  },
  computed:{
    getdatalist(){
      return this.dataliststatus ? this.datalist : this.datalisttest
    }

  },
  methods:{
      onCheck(value){
        console.log(value)
      },
      onChange(value){
        console.log(value)
      },
      changedatalist(){
        this.testvalue = Math.random()
        console.log(this.testvalue)
        this.dataliststatus = !this.dataliststatus
      }
  }
}
</script>

<style lang="less" scoped>

  .width50{
    width: 150px;
  }
  .clear{clear:both;}

  .title{
    color: blue;
    text-align: left;
    width: 30%;
  }
  .fontRed{
    color: red;
  }
  .fontBlue{
    color: blue;
  }
  .font15{
    font-size: 15px;
  }
  .yaHei18{
      font-size: 18px;
    }
  .font20{
      font-size: 20px;
    }
  .backBlue{
    background-color: #5aa5ff;
  }
  .yaHeiStrong18{
    font-family: Microsoft YaHei;
    font-size: 18px;
    font-weight: bold;
  }
  .yaHei18{
    font-family: Microsoft YaHei;
    font-size: 18px;
  }
  .blueYaHei18{
    color: #5aa5ff;
    font-family: Microsoft YaHei;
    font-size: 18px;
  }
  .blueYaHei20{
    color: #5aa5ff;
    font-family: Microsoft YaHei;
    font-size: 20px;
  }
  .redYaHei18{
    color: #fe3838;
    font-family: Microsoft YaHei;
    font-size: 18px;
  }
  .ButtonBlue{
    background-color: #5aa5ff;
    height: 28px;
    font-size: 16px;
    color: #ffffff;
    width: 120px;
    line-height: 5px;
  }
  .textInput{
    width: 180px;
    height: 28px;
    color: #333333;
    // border: 1px solid red;
  }
  // .dateInput{
  //   width: 120px;
  //   height: 28px;
  //   color: #333333;
  // }
  .clear{clear:both;}

  .title{
    /* border: 1px solid red; */
    /* float: left; */
    /* font-size: 15px; */
    color: blue;
    text-align: left;
    width: 30%;
  }




  td{
    /* border: 1px solid red; */
  }
  .hint{
    text-align: center;
    align:center;
  }
    .ivu-form-item{
      margin-bottom: 20px;
    }
    button{
      margin-right: 20px;
    }
</style>
<style lang="less">
  .login{
    th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-form .ivu-form-item-label{
      color:#5aa5ff !important;
      font-size: 12px !important;
      font-family:"Microsoft YaHei";
      line-height: 20px;
    }
    .ivu-input-wrapper{
      width: 160px;
      height: 20px;
    }
    .ivu-select{
      width: 160px;
      height: 20px;
    }
    .ivu-tabs-nav .ivu-tabs-tab-active{
      background-color: white !important;
      font-size: 20px;
      border-radius: 8px;

    }
    .ivu-tabs-ink-bar{
      background-color: #fff;
    }
    .ivu-tabs-nav .ivu-tabs-tab{
      font-size: 14px;
      background-color: #f3f3f3;
    }
    .ivu-tabs-nav-scroll{
      background-color: #f3f3f3;
    }
    .ivu-input{
      border:1px solid #888888;
    }
    .ivu-select-selection{
      border:1px solid #888888;
    }
    .ivu-table-overflowY {
      overflow-y: scroll;
    }
   .ivu-table-tbody{
     font-size: 12px;
     color:#999;
     font-family:"Microsoft YaHei";
     vertical-align: middle;
   }
   .ivu-table td{
     background-color:#fff;
     height: 40px !important;
   }
   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
     height: 40px !important;
   }
   .ivu-input-icon{
        position: absolute;
        right:45px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }

   .page{
     .ivu-select-selection{
       bottom: 6px;
     }
   }
  }

</style>
