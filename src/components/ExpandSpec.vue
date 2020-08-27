<template>
  <div class="expandSpec">
    <Table :columns="columns" border stripe :data="data" ref="expandSpec" @on-row-dblclick="update">
    </Table>
  </div>
</template>

<script>
  export default{
    name:"expandSpec",
    props:{
      data:Array,
      packageTypes:Array
    },
    data(){
      return{
        columns:[
          {
            title:"序号",
            type:"index",
            width:60,
            align:"center",
          },
          {
            title:"规格编号",
            key:"mitemspecid",
            align:"center",
            width:150
          },
          {
            title:"单规格数量",
            key:"specqty",
            align:"center",
          },
          {
            title:"包装类型",
            key:"packagetype",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.packageTypes,params.row.packagetype))
            }
          },
          {
            title:"包装尺寸",
            key:"packagesize",
            align:"center",
          },
          {
            title:"操作",
            align:"center",
            render:(h,params)=>{
              return h("Button",{
                props:{
                  type:"error",
                  size:"small"
                },
                on:{
                  "click":(e)=>{
                    this.deleteConfirm(params.row)
                  }
                }
              },"删除")
            }
          }
        ]
      }
    },
    methods:{
      deleteConfirm(e){
        this.$root.mes('warn','w-20200512154954')
        .then(res => {
            if(res){
             this._axios("delete","mitem/mitemspec",e,data=>{
               this.$emit("getMateriels")
             })
            }
        })
        .catch(err => {console.log(err) })
      },
      update(e){
        this.$emit("updateSpec",e)
      }
    }
  }
</script>

<style>
  .expandSpec{
    width:700px !important;
  }
</style>
