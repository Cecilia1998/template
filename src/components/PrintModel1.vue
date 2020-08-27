<template>
  <div :id="id" class="printModel1">
    <div style="display: flex;border: solid 1px gray;margin-left: 60px;">
      <div style="flex: 2;border-right:solid 1px gray;font-size: 20px;line-height: 40px;">康弘生物</div>
      <div style="flex: 4;border-right:solid 1px gray;line-height: 40px;">Warehousing Form</div>
      <div style="flex: 3;">
        <Row style="border-bottom: solid 1px gray;">
          <Col span="18" style="border-right: solid 1px gray;">QM 022F05</Col>
          <Col span="6">RV 05</Col>
        </Row>
        <div>PAGE {{index+1}} OF{{total}}</div>
      </div>
    </div>
    <div class="printTitle">
      <p>入库单</p>
      <p>Warehousing Form</p>
    </div>
    <div class="spaceBetween" style="margin: 0 20px;">
      <span>供应商：{{tableData.suppliername}}</span>
      <span>计划部门：</span>
      <span>{{this.tableData.indate?this.tableData.indate.slice(0,4):""}}年<span class="textContent">{{this.tableData.indate?this.tableData.indate.slice(5,7):""}}</span>月<span class="textContent">{{this.tableData.indate?this.tableData.indate.slice(8):""}}</span>日</span>
    </div>
    <div>
      <Table class="printTable" :data="tableData.inwaredetailviewlist?tableData.inwaredetailviewlist:[]" :columns="columns">
      </Table>
      <div class="note">
        备注：编号：包括物料编号、耗材编号、检验物资编号。
      </div>
    </div>
    <Row justify="start" style="margin-top:6px ;padding: 0 20px;">
      <Col style="text-align: left;" span="12">
        <span>采购部经办人：</span>
      </Col>
      <Col style="text-align: left;" span="12"><span>入库人:{{tableData.worker}}</span></Col>
    </Row>
    <div class="textRotate">第一联&nbsp;库管联</div>
  </div>
</template>

<script>
  export default{
    name:"printModel1",
    props:{
      index:Number,
      id:String,
      data:Object,
      total:Number,
      suppliers:Array,
      workers:Array
    },
    data(){
      return{
        tableData:[],
        columns:[
          {
            title:"名称",
            align:"center",
            width:80,
            key:"materialname"
          },
          {
            title:"货号",
            width:80,
            align:"center",
          },
          {
            title:"规格",
            key:"packstandsid",
            align:"center",
            width:80,
            render:(h,params)=>{
              return h("div",this.getLabel(params.row.specs,params.row.packstandsid))
            }
          },
          {
            title:"批号",
            key:"batchno",
            width:80,
            align:"center",
          },
          {
            title:"编号",
            key:"materialid",
            width:80,
            align:"center",
          },
          {
            title:"单位",
            key:"unit",
            width:60,
            align:"center",
          },
          {
            title:"数量",
            align:"center",
            width:60,
            key:"qty",
          },
          {
            title:"单价",
            key:"price",
            width:80,
            align:"center",
          },
          {
            title:"金额",
            key:"",
            width:80,
            align:"center",
          },
          {
            title:"有效期",
            key:"validate",
            width:80,
            align:"center",
          }
        ]
      }
    },
    mounted() {
      this._axios("get","inwareorder/orderdetail",{inwareid:this.data.inwareid},data=>{
        this.tableData = data;
        this.tableData.worker = this.getLabel(this.workers,this.tableData.personid)
        this.tableData.suppliername = this.getLabel(this.suppliers,this.tableData.supplierid)
        this.tableData.inwaredetailviewlist.forEach(item=>{
          //根据物料id获取规格
          item.specs=[];
          this._axios("get","mitem/mitemspecs",{lang:this.$store.state.globalLang,materielid:item.materialid},res=>{
            res.forEach(i=>{
              item.specs.push({label:i.label,value:i.id,key:i.value})
            })
          })
        })
      })

    }
  }
</script>

<style lang="less">
  .printModel1{
    // margin-bottom: 10px;
    text-align: center;
    height: 29.7cm;
    width:21cm;
    margin: 0 auto 10px;
    page-break-after:always;
    position:relative;
    padding-right: 30px;
    overflow: hidden;
    .printTitle{
      font-size: 20px;
      text-align: center;
    }
    .textContent{
      display: inline-block;
      width:20px;
    }
    .ivu-table th{
      background-color: #fff;
    }
    // .ivu-table td, .ivu-table th{
    //   border-bottom: solid 1px gray;
    //   border-right: solid 1px gray;
    //   &:last-child{
    //     border-right: none;
    //   }
    // }

    .textRotate{
      transform: rotate(90deg);
      position: absolute;
      right: -25px;
      top: 200px;
    }
    .printTable{
      .ivu-table{
        font-size: 12px;
        border: solid 1px gray;
        td, th{
          border-bottom: solid 1px gray;
          border-right: solid 1px gray;
          &:last-child{
            border-right: none ;
          }
        }

        tbody tr:last-child td{
          border-bottom: none;
        }
        &:before{
          height: 0;
        }
        .ivu-table-cell{
          padding: 0 5px;
        }
      }
    }
    .note{
      text-align:left;
      padding-left: 20px;
      height: 40px;
      border: solid 1px gray;
      border-top: none;
    }
  }
</style>
