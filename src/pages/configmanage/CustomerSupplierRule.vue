<template lang="html">
  <div class="custOrSup">
    <div class="query">
      <table>
        <tr>
          <!-- <td class="blueYaHei18 width50" align="left"></td> -->
          <td class="blueYaHei18 width50" align="right" >
            新增行数 &nbsp;
          </td>
          <td  align="left" colspan="4">
            <Input v-model="formFilter.addLineCount" class="textInput" @on-keyup="onlyFigure" @on-focus="onlyFigure" @on-blur="onlyFigure"/>
          </td>
        </tr>
        <tr height="10px">

        </tr>
        <tr>
          <td>
            <Button v-show="couldDelet == 'false'" type="primary" shape="circle" disabled style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
            <Button v-show="couldDelet == 'true'"  type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" @click="deleteChooseArr" icon="md-trash">删除选中项</Button>
          </td>
          <td width="80%">

          </td>
          <td>
              <Button type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='addNewLine'>新增</Button>

          </td>
          <td width="10px"></td>
          <td>
            <Button type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='submitToService'>提交</Button>
          </td>

        </tr>
      </table>
    </div>
    <table height="30px">

    </table>

    </Form>
    <div class="custOrSupTable">
      <Table border stripe height=500 :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange" ></Table>
    </div>
    <br />

  </div>
</template>
<script>
    export default {

    }
</script>


  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'
import $ from 'jquery'
export default {
  components: {
   },
  data () {
    return {
      testtest:'',
      http:'http://localhost:9090',
      customers:[],
      suppliers:[],
      outWayArr:[''],
      choosenArr:[],
      couldDelet:'false',
      submitLock:false,
      loading:false,
      formFilter: {
        addLineCount:1,
      },
      custOrSupObj:{
        select:false,
        seqNum:0,
        custOrSup:1,
        custOrSupId:'',
        name:'',
        outWay:1,
        custOrSupMaper:[]
      },
      tableColumns: {
         card: [
           {title: '选择',key: 'choosen',type: 'selection',width:60, align: 'center'},
           {title: '序号',key: 'seqNum',width:80,align: 'center'},
           {title: '客户/供应商',key: 'custOrSup',align: 'center',
             render: (h, params) => {
                  return h('Select', {
                      props:{
                          value: params.row.custOrSup
                      },
                      style:{
                        bottom:"7px",
                      },
                   on: {
                          'on-change':(custOrSup) => {
                            params.row.custOrSup = custOrSup
                            this.tableColumns.data[params.index] = params.row
                          }
                    },
                     },
                   [
                    h('Option',{
                        props: {
                             value: 'customer'
                        }
                     },'客户'),
                      h('Option',{
                          props: {
                              value: 'supplier'
                           }
                       },'供应商')
                 ]);
              },
           },
           {title: '公司名称',key: 'custOrSupId', width: 500,align: 'center',
           render: (h, params) => {
              let options = []
              if(params.row.custOrSup == 'customer'){
                for(let i = 0; i< this.customers.length; i++){
                   let item = this.customers[i]
                   options.push(h('Option',{
                       props: {
                           value: item.id
                        }
                    },item.name))
                }
              }else if (params.row.custOrSup == 'supplier') {
                for(let i = 0; i< this.suppliers.length; i++){
                   let item = this.suppliers[i]
                   options.push(h('Option',{
                       props: {
                           value: item.id
                        }
                    },item.name))
                }

              }
                return h('Select', {
                    props:{
                        value: params.row.custOrSupId,

                    },
                    style:{
                      width:"400px",
                      bottom:"10px",
                    },
                 on: {
                        'on-change':(custOrSupId) => {

                          params.row.custOrSupId = custOrSupId
                          this.tableColumns.data[params.index] = params.row
                          this.getCustOrSupOutWay(this.tableColumns.data[params.index])

                        }
                  },
                   },
                   options
                 );
            },
          },
           {title: '出库方式', key: 'outWay',align: 'center',
           render: (h, params) => {
                return h('Select', {
                  props:{
                    value:this.outWayArr[params.index]
                  },
                  style:{
                    bottom:"7px",
                  },
                 on: {
                        'on-change':(outWay) => {
                          this.outWayArr.push('')
                          this.outWayArr[params.index] = outWay
                          params.row.outWay = outWay
                          this.tableColumns.data[params.index] = params.row
                        }
                  },
                   },
                 [
                  h('Option',{
                      props: {
                           value: '先进先出'
                      }
                   },'先进先出'),
                    h('Option',{
                        props: {
                            value: '先进后出'
                         }
                     },'先进后出')
               ]);
            },
          },

         ],
         data:[
           {
             choosen:true,
             seqNum:1,
             custOrSup:'',
             custOrSupId:'',
             name:'',
             outWay:'',
             index:0,
             loginStatus:'',
           }
         ]

       }

    }
  },
  created(){

    //查询客户id和namemap
    axios.get(sessionStorage.http+'/getCustomerIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
    .then((res) =>{
      this.customers = res.data
    })
    .catch((err) => {
       iview.Message.error({
         content:'网络或服务器错误',
         duration:5
       });
    })

    //查询供应商id和namemap
    axios.get(sessionStorage.http+'/getSupplierIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
    .then((res) =>{
      this.suppliers = res.data

    })
    .catch((err) => {

       iview.Message.error({
         content:'网络或服务器错误',
         duration:5
       });
    })
  },
  computed:{

  },

  methods:{
    onlyFigure(){//新增框只能输入不大于10的数字
      this.formFilter.addLineCount = this.formFilter.addLineCount.replace(/[^\d]/g, "")
      if(this.formFilter.addLineCount > 10){
        this.formFilter.addLineCount = 10
      }
    },

    addNewLine(){//新增行
      for(let i = 0;i < this.formFilter.addLineCount; i++ ){
        let rule = {choosen:false,seqNum:this.tableColumns.data.length + 1,custOrSup:'',custOrSupId:'',name:'',outWay:'',index:this.tableColumns.data.length}
        this.tableColumns.data.push(rule)
        this.outWayArr.push('')
        this.outWayArr[this.tableColumns.data.length] = ''
      }
      this.choosenArr = []
      // $('.ivu-checkbox')[1].click()
    },

    getCustOrSupOutWay(custOrSup){
      //查询客户或供应商的出库方式
      custOrSup.loginStatus = `${sessionStorage.loginStatus}`
      axios.post(sessionStorage.http+"/getCustOrSupOutWay?loginStatus="+`${sessionStorage.loginStatus}`,custOrSup)
      .then((res) =>{
        this.tableColumns.data[res.data.index] = res.data
        this.outWayArr.push('')
        this.outWayArr[res.data.index] = this.tableColumns.data[res.data.index].outWay

      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
     },

     submitToService(){//提交客户供应商规则到后台
       if(this.tableColumns.data.length > 0){
         if(!this.submitLock){
           this.submitLock = true
           axios.post(sessionStorage.http+'/generateCustOrSupRule?loginStatus='+`${sessionStorage.loginStatus}`,this.tableColumns.data)
           .then((res) => {
             setTimeout(()=>{
               this.submitLock = false
             },2000)
             iview.Message.success({
               content:res.message,
               duration:5
             });
           })
           .catch((err) => {
             setTimeout(()=>{
               this.submitLock = false
             },2000)
              iview.Message.error({
                content:'网络或服务器错误',
                duration:5
              });
           })
         }

       }else{
         alert('请先填写规则')
       }
     },

     selectChange(selection,row){//表格选中


     },

     onSelectionChange (rows) {//表格选择发生变化
       if(rows.length > 0){
         this.couldDelet = 'true'
       }else {
         this.couldDelet = 'false'
       }
       this.choosenArr = rows
     },
     deleteChooseArr(){
       for(let i = 0; i < this.choosenArr.length; i++){
         let index = this.choosenArr[i].index - i
         this.tableColumns.data.splice(index,1);
         this.outWayArr.splice(index,1);
       }

       for(let i = 0; i < this.tableColumns.data.length; i++){
         this.tableColumns.data[i].seqNum = i+1
         this.tableColumns.data[i].index = i
       }

     },

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
  .ButtonWhite{
    background-color: #ffffff;
    border: 1px solid #5aa5ff;
    height: 28px;
    font-size: 16px;
    color: #5aa5ff;
    width: 120px;
    line-height: 5px;
  }
  .textInput{
    width: 160px;
    height: 28px;
    color: #333333;
    // border: 1px solid red;
  }
  .textInputShort{
    width: 80px;
    height: 28px;
    color: #333333;
    // border: 1px solid red;
  }
  .dateInput{
    width: 120px;
    height: 28px;
    color: #333333;
  }
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
     // border: 1px solid red;
  }
  .hint{
    text-align: center;
    align:center;
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
    .ivu-table th{
      font-size: 20px ;
      background-color: red !important;
    }
</style>

<style lang="less">
  .custOrSup{
    th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .custOrSupTable {
      .ivu-select-selection{
        bottom:7px;
      }
      .ivu-table-tbody{
        font-size: 12px;
        color:#999;
        font-family:"Microsoft YaHei";
        line-height: 50px;
        vertical-align: middle;
        line-height: 40px;
      }
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
     line-height: 40px;
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
    .ivu-table-cell{
      overflow: inherit;
    }
  }
  .ivu-checkbox-inner{
    width: 12px;
    height: 12px;
  }

</style>
