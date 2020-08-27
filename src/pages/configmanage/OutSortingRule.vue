<template lang="html">
  <div class="outSorting">
    <Tabs>
        <TabPane label="出库分拣规则">
          <OutRule/>
        </TabPane>
        <TabPane label="客户/供应商规则">
          <CustomerSupplierRule/>
        </TabPane>
    </Tabs>
  </div>
</template>

<script>
import OutRule from '@/pages/configmanage/OutRule'
import CustomerSupplierRule from '@/pages/configmanage/CustomerSupplierRule'
import axios from 'axios'
import router from '../../router'
// import Http from './Http.vue'
export default {
  components: {
    OutRule,
    CustomerSupplierRule,
   },
  data () {
    return {

    }
  },
  created(){
    // sessionStorage.a = 'a'
    //this.$router.history.current.path为当前网页的路径
  },
  computed:{

  },
  methods:{

  }
}
</script>

<style lang="less">
.outSorting{
  .ivu-tabs-nav .ivu-tabs-tab{
    font-size: 14px;
    background-color: #f3f3f3;
  }
}

</style>

<style lang="less">
  .outSorting{
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
     line-height: 50px;
     vertical-align: middle;
   }
   .ivu-table td{
     background-color:#fff;
   }
   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
   }
   .ivu-input-icon{
        position: absolute;
        right:-5px;
    }
    .ivu-input-icon-normal+.ivu-input{
      width: 180px;
    }
  }
  .ivu-checkbox-inner{
    width: 12px;
    height: 12px;
  }

</style>
