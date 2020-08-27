<template lang="html">
  <div class="itemtypeall">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="商品编号">
            <Input v-model="searchItemType.goodsid" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="商品名称" >
            <Input v-model="searchItemType.goodsname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="商品种类名称" >
            <Input v-model="searchItemType.goodscategoryname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="大分类名称" >
            <Input v-model="searchItemType.largeclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="中分类名称" >
            <Input v-model="searchItemType.middleclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="小分类名称">
            <Input v-model="searchItemType.littleclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="细分类名称" >
            <Input v-model="searchItemType.fineclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="是否启用" >
            <Select v-model="searchItemType.isstart" clearable @on-change="searchItemTypeByCondition" placeholder="请选择">
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </Form-item>
          <Form-item label="登记时间" >
            <tr>
              <td>
                <DatePicker v-model="searchItemType.startdate" type="date" placeholder="请选择"
                @on-change="onStartTimeChange" style="width: 120px" :options="startTimeOption"
                :editable="false"></DatePicker>
              </td>
              <!-- <td>
                <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/>
              </td> -->
              -
              <td>
                <DatePicker v-model="searchItemType.enddate" style="width: 120px" type="date" placeholder="请选择"
                @on-change="onEndTimeChange" :options="endTimeOption"
                :editable="false"></DatePicker>
              </td>
            </tr>
          </Form-item>
      </div>
    </Form>
    <Row>
      <Col span="24" style="display:flex;justify-content:space-between">
        <div class="" >
          <!-- <Button type="primary" shape="circle" disabled v-if="updateButtonFlag==true"
          style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4">提交</Button> -->
        </div>
        <div>
          <Button type="primary" shape="circle" @click="update"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">提&nbsp;&nbsp;交</Button>
        </div>
      </Col>
    </Row>
    <br>
    <Table stripe border height=520 :columns="tableColumns.card" :data="itemTypeShow"></Table>
    <br>
    <div class="page">
      <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize"
      @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
    </div>
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
      delete_confirm:false,
      // updateButtonFlag:true,
      // isRepeat:{},
      isRepeatFlag:false,
      itemTypeShow:[],
      updateItemType:[],
      suppliernames:[],
      customernames:[],
      packtypes:[],
      searchItemType:{},
      startTimeOption: {},
      endTimeOption: {},
      tableColumns: {
        card: [
          // {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '商品编号', key: 'goodsid', align: 'center'},
          {title: '商品名称',key: 'goodsname', align: 'center'},
          {title: '商品种类名称',key: 'goodscategoryname', align: 'center'},
          {title: '大分类名称', key: 'largeclassificationname', align: 'center' },
          {title: '中分类名称', key: 'middleclassificationname', align: 'center'},
          {title: '小分类名称', key: 'littleclassificationname', align: 'center'},
          {title: '细分类名称', key: 'fineclassificationname', align: 'center'},
          {title: '供应商名称',key: 'suppliername',width: 150,align: 'center', render: (h, params) => {
            let options = []
            for(let i = 0; i< this.suppliernames.length; i++){
               let item = this.suppliernames[i]
               options.push(h('Option',{
                   props: {
                       value: item.supplierid
                    }
                },item.suppliername))
            }

            if(params.row.customerid == undefined){
              params.row.extra = false
            }else{
              params.row.extra = true
            }

            return h('Select', {
                props:{
                    value: this.itemTypeShow[params.row._index].supplierid,
                    'disabled':params.row.extra,
                    'clearable':true
                },
                style:{
                  width:'120px',
                  'padding-top':"0",
                },
             on: {
                'on-change':(supplierid) => {
                  params.row.supplierid = supplierid
                  this.itemTypeShow[params.row._index] = params.row
                  // this.isRepeat = params.row
                  // this.judRepeat()
                  // if(this.isRepeatFlag){
                  //   iview.Message.error('该商品已绑定此供应商,不可重复提交')
                    // this.itemTypeShow[params.row._index] = null
                  // }else{
                    if(this.updateItemType.length > 0){
                      for(let i = 0; i<this.updateItemType.length;i++){
                        let item = this.updateItemType[i]
                        if(item.goodsid == params.row.goodsid){
                          this.updateItemType.splice(i,1)
                        }
                      }
                    }
                    this.updateItemType.push(params.row)
                  // }
                },
                'on-clear':() =>{
                    params.row.extra1 = false
                    // this.judRepeat()
                },
              },
            },options);},
          },
          {title: '客户名称',key: 'customername',width: 150,align: 'center', render: (h, params) => {
            let options = []
            for(let i = 0; i< this.customernames.length; i++){
               let item = this.customernames[i]
               options.push(h('Option',{
                   props: {
                       value: item.customerid
                    }
                },item.customername))
            }

            if(params.row.supplierid == undefined){
              params.row.extra1 = false
            }else{
              params.row.extra1 = true
            }

            return h('Select', {
                props:{
                    value: this.itemTypeShow[params.row._index].customerid,
                    'disabled':params.row.extra1,
                    'clearable':true
                },
                style:{
                  width:'120px'
                },
             on: {
                'on-change':(customerid) => {
                  //alert(Boolean(this.itemTypeShow[params.row._index].supplierid))
                  params.row.extra = true
                  params.row.customerid = customerid
                  this.itemTypeShow[params.row._index] = params.row
                  // this.isRepeat = params.row
                  // this.judRepeat()
                  // if(this.isRepeatFlag){
                  //   iview.Message.error('该商品已绑定此客户,不可重复提交')
                    // this.itemTypeShow[params.row._index] = null
                  // }else{
                    if(this.updateItemType.length > 0){
                      for(let i = 0; i<this.updateItemType.length;i++){
                        let item = this.updateItemType[i]
                        if(item.goodsid == params.row.goodsid){
                          this.updateItemType.splice(i,1)
                        }
                      }
                    }
                    this.updateItemType.push(params.row)
                    // console.log(this.updateItemType)
                  // }
                  this.getpacktypes(customerid)
                  // params.row.packtype
                },
                'on-clear':() =>{
                    params.row.extra = false
                    // this.judRepeat()
                }
              },
            },options);},
          },
          // {title: '包装规格',key: 'packtype',width: 150,align: 'center', render: (h, params) => {
          //   let options = []
          //   for(let i = 0; i < this.packtypes.length; i++){
          //      let item = this.packtypes[i]
          //      options.push(h('Option',{
          //          props: {
          //              value: item.packtype
          //           }
          //       },item.packtype))
          //   }
          //
          //   if(params.row.supplierid == undefined){
          //     params.row.extra1 = false
          //   }else{
          //     params.row.extra1 = true
          //   }
          //
          //   return h('Select', {
          //       props:{
          //           value: this.itemTypeShow[params.row._index].packtype,
          //           'disabled':params.row.extra1,
          //           'clearable':true
          //       },
          //       style:{
          //         width:'120px'
          //       },
          //    on: {
          //       'on-change':(packtype) => {
          //         //alert(Boolean(this.itemTypeShow[params.row._index].supplierid))
          //         params.row.extra = true
          //         params.row.packtype = packtype
          //         this.itemTypeShow[params.row._index] = params.row
          //         // this.isRepeat = params.row
          //         // this.judRepeat()
          //         // if(this.isRepeatFlag){
          //         //   iview.Message.error('该商品已绑定此客户,不可重复提交')
          //           // this.itemTypeShow[params.row._index] = null
          //         // }else{
          //           if(this.updateItemType.length > 0){
          //             for(let i = 0; i<this.updateItemType.length;i++){
          //               let item = this.updateItemType[i]
          //               if(item.goodsid == params.row.goodsid){
          //                 this.updateItemType.splice(i,1)
          //               }
          //             }
          //           }
          //           this.updateItemType.push(params.row)
          //           // console.log(this.updateItemType)
          //         // }
          //         // this.getpacktypes(customerid)
          //         // params.row.packtype
          //       },
          //       'on-clear':() =>{
          //           params.row.extra = false
          //           // this.judRepeat()
          //       }
          //     },
          //   },options);},
          // },
          {title: '是否启用', key: 'isstart', align: 'center', render:(h,params)=>{
            let isstart = '';
            if(params.row.isstart == '1'){
              isstart = '是';
            }else{
              isstart = '否';
            }
            return h('div',isstart);
          }},
          {title: '登记时间', key: 'registertime', align: 'center'}
        ],
      }
    }
  },

  created(){
    axios.get(sessionStorage.http+`/getItemTypeAll?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      this.itemTypeShow=result.data.list
      this.itemTypeShow.forEach((item) => {item.extra = item.supplierid==null?true:false});
      this.itemTypeShow.forEach((item) => {item.extra1 = item.customerid==null?true:false});

      // this.itemTypeShow.forEach((item) => {item.extra2 = item.supplierid==null?true:false});

      this.total=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    }),

    axios.get(sessionStorage.http+`/getScp?loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      this.suppliernames=result.data.data
      this.customernames=result.data.data1
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })

    // axios.get(sessionStorage.http+`/getPacktypes?loginStatus=${sessionStorage.loginStatus}`)
    // .then((result) => {
    //   console.log(result)
    //   this.packtypes=result.data
    // })
    // .catch((err) => {
    //   console.log('请检查您的网络连接'+err)
    // })
  },

  computed:{},

  methods:{
    // judRepeat(){
    //   axios.post(sessionStorage.http+`/judRepeat`,this.isRepeat)
    //     .then((result) => {
    //       if(result.data==0){
    //         this.isRepeatFlag = true
    //       }
    //       if(result.data==1){
    //         this.isRepeatFlag = false
    //       }
    //     })
    // },

    searchItemTypeByCondition(){
      axios.post(sessionStorage.http+`/getItemTypeByConditions?pageNum=1&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.searchItemType)
        .then((result) => {
          this.itemTypeShow=result.data.list
          this.itemTypeShow.forEach((item) => {item.extra = item.supplierid==null?true:false});
          this.itemTypeShow.forEach((item) => {item.extra1 = item.customerid==null?true:false});
          this.total=result.data.total
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
    },

    getpacktypes(customerid){
      axios.get(sessionStorage.http+`/getPacktypes?customerid=${customerid}&loginStatus=${sessionStorage.loginStatus}`)
      .then((result) => {
        // console.log(result)
        this.packtypes=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err.message)
      })
    },

    // onSelectionChange (row) {
    //   this.updateItemType = row
    //   if(this.updateItemType.length>0){
    //     this.updateButtonFlag = false
    //   }else{
    //     this.updateButtonFlag = true
    //   }
    // },

    handleChangePage (value) {
      this.pageNum = value
      axios.post(sessionStorage.http+`/getItemTypeByConditions?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchItemType)
      .then((result) => {
        this.itemTypeShow=result.data.list
        this.itemTypeShow.forEach((item) => {item.extra = item.supplierid==null?true:false});
        this.itemTypeShow.forEach((item) => {item.extra1 = item.customerid==null?true:false});
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    handleChangePageSize(value){
      this.pageSize = value
      this.pageNum = 1
      axios.post(sessionStorage.http+`/getItemTypeByConditions?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchItemType)
      .then((result) => {
        this.itemTypeShow=result.data.list
        this.itemTypeShow.forEach((item) => {item.extra = item.supplierid==null?true:false});
        this.itemTypeShow.forEach((item) => {item.extra1 = item.customerid==null?true:false});
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    update () {
      if(!this.clickSt){
        return
      }
      if(this.updateItemType.length == 0){
        iview.Message.error('没有需要提交修改的商品信息')
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return
      }else{
        axios.post(sessionStorage.http+`/updateItemTypeAll?pageNum=${this.pageNum}&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`,this.updateItemType)
        .then((result) => {
          this.itemTypeShow=result.data.list
          this.itemTypeShow.forEach((item) => {item.extra = item.supplierid==null?true:false});
          this.itemTypeShow.forEach((item) => {item.extra1 = item.customerid==null?true:false});
          this.total=result.data.total
          this.$Message.success('供应商信息修改成功');
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      }
    },

    //登记时间
    onStartTimeChange(startTime, type) {
          this.endTimeOption = {
            disabledDate(endTime) {
              return endTime < new Date(startTime)
            }
          }
          this.searchItemTypeByCondition();
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
        this.searchItemTypeByCondition();
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
  .itemtypeall{
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
   .ivu-table-cell{
     padding-left: 18px;
     padding-right: 18px;
     overflow: inherit;
   }
   .page{
     .ivu-select-selection{
       bottom: 6px
     }
   }
  }
</style>
