<template lang="html">
  <div class="modemanagement">
    <Form :label-width="120" inline style="text-align:left;">

    </Form>
      <Row>
          <Col span="24" style="display:flex;justify-content:space-between">
            <div class="">
              </div>
            <div class="">
              <Button type="primary" shape="circle" @click="update"
              style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">提&nbsp;&nbsp;交</Button>
            </div>
          </Col>
      </Row>

      <br>

      <Table stripe border height=520 :columns="tableColumns.card" :data="modemanagementShow" @on-selection-change="updateSelection"
      ></Table>
      <br>
      <!-- <div class="page">
        <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize"
        @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
      </div> -->






  </div>
</template>

<script>
import axios from 'axios'
import iview from 'view-design'
import $ from 'jquery'
import router from '../../router'
export default {
  components: {},
  data () {
    return {
      clickSt:true,
      total:0,
      pageNum:1,
      pageSize:20,

      modemanagement:[],
      supplierNameInfo:[],
      modemanagementShow:[
        {
          entranceId:'1',
          workType:''
        },{
          entranceId:'2',
          workType:''
        }

      ],
      deletemodemanagement:[],
      updatemodemanagement:[
        // {
        //   entranceId:null,
        //   workType:null
        // }
      ],
      insertmodemanagement:{},
      searchmodemanagement:{},
      startTimeOption: {},
      endTimeOption: {},
      tableColumns: {
        card: [
          {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '出入口编号', key: 'entranceId', align: 'center'},
          {title: '工作模式',key: 'workType', align: 'center',
                                  render:(h,params) => {
                                    return h('Select',{
                                      props: {
                                            //将单元格的值给Input
                                            value:params.row.workType,
                                          },
                                        on:{
                                            'on-change':(v)=>{
                                              console.log(this.modemanagementShow)
                                              // console.log(params)
                                              // console.log(v.target)
                                              this.$set(this.modemanagementShow[params.row._index],'workType',v)

                                              // this.updatemodemanagement[params.row._index].workType = v
                                                // params.row.workType = props.value
                                            }
                                        }
                                    }, [
                                        h('Option', {
                                            props: {
                                                value: '0',
                                                label: '入库口'
                                            }
                                        }),
                                        h('Option', {
                                            props: {
                                                value: '1',
                                                label: '出库口'
                                            }
                                        })
                                    ]);
                        }},
          ],
      }
    }
  },

  created(){
    axios.get(sessionStorage.http+`/getmodemanagement?loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      console.log(result.data.list)
      this.modemanagementShow=result.data
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },

  computed:{},

  methods:{

    showaddmodal(){
      this.insertmodemanagement = {};
      this.modal_add_modemanagement=true
    },


    // onSelectionChange (row) {
    //   this.updatemodemanagement = row
    //   if(this.updatemodemanagement.length>0){
    //     iview.Message.error({
    //       content:"请选择一行数据",
    //       duration:5
    //     })
    //     this.clickSt=false,
    //     setTimeout(() => {
    //       this.clickSt=true
    //     },2000)
    //     return
    //   }
    // },
query(){
  axios.get(sessionStorage.http+`/getmodemanagement?loginStatus=${sessionStorage.loginStatus}`)
  .then((result) => {
    console.log(result.data.list)
    this.modemanagementShow=result.data
  })
  .catch((err) => {
    console.log('请检查您的网络连接'+err)
  })
},
    updateSelection(res){
      this.updatemodemanagement=res
    },
    update () {
      if(!this.clickSt){
        return
      }
      console.log(this.updatemodemanagement.length);
      if(this.updatemodemanagement.length==0){
        iview.Message.error({
          content:"请选择一行数据",
          duration:5
        })
        this.clickSt=false,
        setTimeout(() => {
          this.clickSt=true
        },2000)
        return
      }
console.log(this.modemanagementShow)
      axios.post(sessionStorage.http+`/updatemodemanagement?
        loginStatus=${sessionStorage.loginStatus}`,this.updatemodemanagement,this.searchmodemanagement)
      .then((result) => {
        this.modemanagementShow=result.data.list
        this.$Message.success('库口修改成功');
        this.query();
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },
    //登记时间
    onStartTimeChange(startTime, type) {
      this.endTimeOption = {
        disabledDate(endTime) {
          return endTime < new Date(startTime)
        }
      }
      this.searchmodemanagementByCondition();
    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onEndTimeChange(endTime, type) {
        this.startTimeOption = {
          disabledDate(startTime) {
            return startTime > new Date(endTime)
          }
        }
        this.searchmodemanagementByCondition();
      }

  },
}

</script>

<style lang="css">
  .ivu-table-overflowX{
    overflow-x: hidden;
  }
</style>

<style lang="less">
  .modemanagementmodalstyle{

    color:#5aa5ff !important;
    font-size: 12px !important;
    font-family:"Microsoft YaHei";
    line-height: 20px;
      .ivu-select{
        width: 160px !important;
        height: 20px !important;
        vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
      }
      textarea.ivu-input{
        max-width: 1000%;
        width: 444px !important;
      }
      .ivu-input{
        border:1px solid #888888;
        width: 160px !important;
        height: 30px !important;
        line-height: 30px;
      }
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
        .ivu-input-number-input{
          border:1px solid #888888;
          outline: 0 none !important;
        }
        .ivu-input-number{
          border:0 none;
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
         line-height: 40px;
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
             right:5px;
         }

   //  color:#5aa5ff !important;
   //  font-size: 12px !important;
   //  font-family:"Microsoft YaHei";
   //  line-height: 20px;
   //  .ivu-form .ivu-form-item-label{
   //    color:#5aa5ff !important;
   //    font-size: 12px !important;
   //    font-family:"Microsoft YaHei";
   //    line-height: 20px;
   //  }
   //  .ivu-input-wrapper{
   //    width: 160px;
   //    height: 20px;
   //    vertical-align:baseline;
   //  }
   //  textarea.ivu-input{
   //    max-width: 1000%;
   //    width: 443px;
   //  }
   //  .ivu-select{
   //    width: 160px;
   //    height: 20px;
   //    vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
   //  }
   //  .ivu-tabs-nav .ivu-tabs-tab-active{
   //    background-color: white !important;
   //    font-size: 20px;
   //    border-radius: 8px;
   //  }
   //  .ivu-tabs-ink-bar{
   //    background-color: #fff;
   //  }
   //  .ivu-tabs-nav .ivu-tabs-tab{
   //    font-size: 14px;
   //    background-color: #f3f3f3;
   //  }
   //  .ivu-tabs-nav-scroll{
   //    background-color: #f3f3f3;
   //  }
   //  .ivu-input{
   //    border:1px solid #888888;
   //  }
   //  .ivu-input-number{
   //    width: 160px;
   //    border:1px solid #888888;
   //  }
   //  .ivu-select-selection{
   //    border:1px solid #888888;
   //  }
   //  .ivu-table-overflowY {
   //    overflow-y: scroll;
   //  }
   // .ivu-table-tbody{
   //   font-size: 12px;
   //   color:#999;
   //   font-family:"Microsoft YaHei";
   //   line-height: 50px;
   //   vertical-align: middle;
   // }
   // .ivu-table td{
   //   background-color:#fff;
   // }
   // .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
   //   background-color: #f9f9f9;
   // }
   // .ivu-input-icon{
   //      position: absolute;
   //      right:5px;
   //  }
   // .ivu-input-icon-normal+.ivu-input{
   //   width: 160px;
   // }
  }
  .modemanagement{
    th .ivu-table-cell{
      font-size: 12px !important;
      font-weight: bold;
      color:#333;
    }
    .ivu-table-tbody{
      line-height: 16px !important;
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
      // height: 20px;
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
     height: 40px;
   }
   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
     height: 40px;
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
       bottom: 6px
     }
   }
  }
</style>
