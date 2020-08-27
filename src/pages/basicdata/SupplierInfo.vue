<template lang="html">
  <div class="supplierinfo">

  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      total:0,
      pageNum:1,
      pageSize:20,

      tableColumns: {
        card: [
          {title: '选择',key: 'select',type: 'selection', width: 55,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '供应商编号', key: 'supplierId', align: 'center'},
          {title: '供应商名称',key: 'supplierName', align: 'center'},
            {title: '公司地址', key: 'companyAddress', align: 'center' },
              {title: '统一代码', key: 'unifiedCode', align: 'center' },
                {title: '生产许可证编号', key: 'licence', align: 'center' },
                  {title: '联系人',key: 'contacts', align: 'center'},
          {title: '联系电话',key: 'telephone', align: 'center'},


          ],
      }
    }
  },

  created(){
  },

  computed:{},

  methods:{


  },
}

</script>

<style lang="css">
 
</style>