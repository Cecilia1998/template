<template lang="html">
  <Modal class="addTakeStock"
      v-model="add"
      :mask-closable='false'
      :loading='loading'
      footer-hide
      width='62%'
      ok-text=''
      @on-cancel='cleardata'
      cancel-text=''>

      <p slot="header" style="text-align:center;font-size:18px">
            <span>新增盘点登记</span>
      </p>


      <table  height="20px">
        <tr>
          <td align="left">

          <span class="outBox">
            <!-- <span class="blank">&nbsp;</span> -->
            <span class="redLabel">盘库类型</span>
            <span class="textOutput">
              <Select  placeholder="请选择" v-model="formFilter.checktype"
                filterable
                remote
                :remote-method="selectCheckType"
                :loading="loading1"
                class="textLongInput"  style="width: 100px;text-align:left;">
                <Option value="CD01">临时盘</Option>
                <Option value="CD02">全盘</Option>
              </Select>
            </span>
          </span>
        </td>

        <td>
          <span class="outBox">
            <span class="blank">&nbsp;&nbsp;</span>
            <span class="redLabel">申请时间</span>
            <span class="textOutput">{{this.date}}</span>
          </span>

          <span class="outBox">
            <span class="blank">&nbsp;&nbsp;</span>
            <span class="redLabel">备&nbsp;注</span>
            <span class="textOutput">
              <Input v-model="formFilter.remark"  @on-blur="remarkChange" class="textLongInput" style="width:300px"/>
            </span>
          </span>
        </td>
      </tr>
    </table>


    <br>

    <div class="" style="display:flex;justify-content:space-between">
          <div class="">
            <Button shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" :disabled='deDis' @click="delConfirmOrder" id='delOrderInAdd' icon="md-trash">删除选中项</Button>
            <!-- <Button   type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='exportExcel'>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</Button>
            &nbsp;
            <Upload :action="uploadurl" :format="['xlsx','xls']" :max-size="10240" :data="loginStatus" style="display: inline;" name="uploadFile" size="18" :on-success="handleSuccess" :before-upload="beforeUpload" :on-exceeded-size="fileExceded" :on-format-error="notFormat">
              <Button  icon="ios-cloud-upload-outline"  style="font-size:10px">上传文件</Button>
            </Upload> -->
          </div>
          <div class="">
            <Button v-show="formFilter.checktype == 'CD01'" type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail">新增明细</Button>
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="saveNewCheckOrder">提&nbsp;&nbsp;交</Button>
          </div>
    </div>


    <div class="departmenttable">
      <Table id='tableId' height=400  border stripe :loading="loading" ref="selection" style="margin-top:20px;" :columns="tableColumnsAdd.card" :data="tableColumnsAdd.data" @on-selection-change="onSelectionChange" ></Table>
    </div>

    <div class="page">
        &nbsp;
        <Page :total="formFilter.pagetotal" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>

    <br />
    <!-- 删除确认弹框 -->
     <Modal v-model="delete_confirm_Order" width="360">
         <p slot="header" style="color:#f60;text-align:center">
           <Icon type="ios-information-circle"></Icon>
           <span>删除确认</span>
         </p>
         <div style="text-align:center">
           <span style="font-size:14px">确定要删除吗？</span>
         </div>


         <div slot="footer">
           <Button type="error" size="large" shape="circle" style="width:120px;" @click="deleteSelectionOrder">确定删除</Button>
         </div>
     </Modal>


  </Modal>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'
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
      date:'',//盘库的申请时间
      checkDetailsByBatchnoAndItemcode:{stocknumber:'',trayno:''}, //批次号和托盘号的选择条件
      deDis:true,  //删除弹框默认不可用
      rows:[], //选中行数据

      loading1:false,

      batchnodisabled:false,  //表格样式
      itemdisabled:false,   //表格样式


      delete_confirm_Order:false, //删除弹框默认为false

      //当选择"临时盘"时，给定一行数据
      originData:[{
        batchno:'', //批次号
        itemcode:'', //零件号
        islock:'是'
      }],



      delete_confirm:false,//删除提示
      lockDisable:false,//锁库不可用
      checkDetails:[],
      searchIndex:0,//当前查询库存的表格行
      detailRows:[],//选择的明细行
      add:false,//用于控制是否显示本弹窗
      loading:false,
      lastDistrictID:'',//选择的上一个库区id
      couldDelet:'false',
      submitLock:false,

      districtAllOptions: [],
      districtLoading: false,
      districtOptions: [],
      districtTransition:'',

      //客户
      customerList:[],
      customerAllOptions: [],
      customerLoading: false,
      customerOptions: [],
      customerTransition:'',

      total:0,
      stockList:[],

      //所有需要盘库的数据
      dataNotPage:[],

      formFilter: {
        // 分页信息
        pagetotal:1,
        curPage:1,
        pageSize:20,


        applyDate:new Date(),
        locktype:'LD01',
        itemcode:'',

        loginStatus:`${sessionStorage.loginStatus}`,
        checktype:'' //盘库类型

      },
      tableColumnsAdd: {
        data:[],

         // card: [
         //   {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
         //  {title: '货位号',key: 'storageid',width: 200,align: 'center', render: (h, params) => {
         //     return h('div',[
         //       h('Input',{
         //         props: {
         //             //将单元格的值给Input
         //             'search':true,
         //             'value':params.row.itemcode,
         //             'element-id':"itemcode_"+params.row._index
         //             },
         //          style: {
         //            width:"160px",
         //            bottom:"7px",
         //          },
         //       on:{
         //            'on-change':(event)=> {
         //              console.log(this.tableColumnsAdd.data[params.row._index].itemcode)
         //           },
         //           'on-search':(value)=> {
         //             this.formFilter.itemcode = value
         //             let noValue = this.noValueFilter()
         //             this.searchIndex = params.row._index
         //             if(!noValue && value != ''){
         //               this.takeStockGoods()
         //             }
         //          },
         //           'on-keyup':(value)=> {
         //
         //          },
         //           'on-blur':(event)=>{
         //
         //           }
         //         }
         //         }
         //       )]);
         //     }},
         //  {title: '批次号',key: 'itemcode',width: 200,align: 'center', render: (h, params) => {
         //     return h('div',[
         //       h('Input',{
         //         props: {
         //             //将单元格的值给Input
         //             'search':true,
         //             'value':params.row.itemcode,
         //             'element-id':"itemcode_"+params.row._index
         //             },
         //          style: {
         //            width:"160px",
         //            bottom:"7px",
         //          },
         //       on:{
         //            'on-change':(event)=> {
         //              console.log(this.tableColumnsAdd.data[params.row._index].itemcode)
         //           },
         //           'on-search':(value)=> {
         //             this.formFilter.itemcode = value
         //             let noValue = this.noValueFilter()
         //             this.searchIndex = params.row._index
         //             if(!noValue && value != ''){
         //               this.takeStockGoods()
         //             }
         //          },
         //           'on-keyup':(value)=> {
         //
         //          },
         //           'on-blur':(event)=>{
         //
         //           }
         //         }
         //         }
         //       )]);
         //     }},
         //       {title: '托盘号',key: 'rowid',width: 200,align: 'center'},
         //     {title: '物料号', key: 'itemname',width: 200,align: 'center'},
         //     {title: '物料/产品描述',key: 'rowid',width: 150,align: 'center'},
         //     {title: '库存批号',key: 'rowid',width: 200,align: 'center'},
         //     {title: '检验批号',key: 'rowid',width: 200,align: 'center'},
         //     {title: '质量状态',key: 'rowid',width: 120,align: 'center'},
         //     {title: '包装规格',key: 'rowid',width: 150,align: 'center'},
         //     {title: '计量单位',key: 'rowid',width: 120,align: 'center'},
         //     {title: '是否贴标',key: 'rowid',width: 120,align: 'center'},
         //     {title: '在库数量',key: 'originquantity',width:150,align: 'center'},
         //  {title: '盘点数量',key: 'checkquantity',width: 90, align: 'center', render: (h, params) => {
         //     return h('div',[
         //       h('InputNumber',{
         //         props: {
         //             //将单元格的值给Input
         //             'v-model':params.row.checkquantity,
         //             'value':params.row.checkquantity,
         //             'min':0,
         //             },
         //        style: {
         //          width:"60px",
         //        },
         //       on:{
         //            'on-change':(value)=> {
         //              params.row.checkquantity = value
         //
         //              params.row.checkquantity = value
         //              params.row.differquantity = value - params.row.originquantity
         //              this.tableColumnsAdd.data[params.row._index] = params.row
         //           },
         //           'on-blur':()=>{
         //
         //             if(params.row.checkquantity != null && params.row.disqualifiedquantity != null && params.row.checkquantity < params.row.disqualifiedquantity){
         //
         //               setTimeout(()=>{
         //                  params.row.checkquantity = null
         //                  params.row.differquantity = null
         //                  this.tableColumnsAdd.data[params.index] = params.row
         //                  alert('盘点数量不能小于不合格数量')
         //              },50)
         //
         //             }
         //           }
         //         }
         //         }
         //       )]);
         //     }},
         //
         //  {title: '差异数量',key: 'differquantity', width: 90,align: 'center'},
         //
         //  // {title: '不合格数量',key: 'disqualifiedquantity',width:100,align: 'center', render: (h, params) => {
         //  //    return h('div',[
         //  //      h('InputNumber',{
         //  //        props: {
         //  //            //将单元格的值给Input
         //  //            'v-model':params.row.itemcode,
         //  //            'min':0,
         //  //            'value':params.row.disqualifiedquantity,
         //  //            },
         //  //      style: {
         //  //        width:"60px",
         //  //      },
         //  //      on:{
         //  //           'on-change':(value)=> {
         //  //             if((params.row.originquantity != null &&value > params.row.originquantity) || (params.row.checkquantity != null && value > params.row.checkquantity)){
         //  //               console.log(params.row.checkquantity)
         //  //               params.row.disqualifiedquantity = null
         //  //               alert('不合格数量不能大于库存数量和盘点数量')
         //  //             }else {
         //  //               params.row.disqualifiedquantity = value
         //  //             }
         //  //              this.tableColumnsAdd.data[params.row._index] = params.row
         //  //
         //  //          },
         //  //
         //  //        }
         //  //        }
         //  //      )]);
         //  //    }},
         //
         //  // {title: '盘点开始时间',key: 'checkstarttime',width:150,align: 'center'},
         //  // {title: '盘点结束时间', key: 'checkendtime',width:150, align: 'center' },
         //  // {title: '托盘号',key: 'trayno',width:110,align: 'center'},
         //  {title: '是否锁库',key: 'islock',width:110,align: 'center' ,
         //  render: (h, params) => {
         //    if(this.formFilter.checktype == 'CD01' || this.formFilter.checktype == 'CD05'){
         //      return h('span',{},'否')
         //    }
         //        return h('Select', {
         //          props:{
         //            'value':this.tableColumnsAdd.data[params.index].islock,
         //            class:'lockSelection'
         //          },
         //          style: {
         //            bottom:"7px",
         //          },
         //         on: {
         //                'on-change':(isLock) => {
         //                  this.tableColumnsAdd.data[params.index].islock = isLock
         //                  console.log(isLock)
         //                    console.log(this.tableColumnsAdd.data[params.index].islock)
         //                }
         //          },
         //           },
         //         [
         //          h('Option',{
         //              props: {
         //                   value: '0',
         //                   class:'lockSelection'
         //              }
         //           },'否'),
         //            h('Option',{
         //                props: {
         //                    value: '1',
         //                    class:'lockSelection'
         //                 }
         //             },'是')
         //       ]);
         //    },
         //  },
         //
         //  {title: '备注',key: 'remark',width:200,align: 'center', render: (h, params) => {
         //     return h('div',[
         //       h('Input',{
         //         props: {
         //             //将单元格的值给Input
         //             'v-model':params.row.itemcode,
         //             'element-id':"itemcode_"+this.tableColumnsAdd.data[params.index].checkdetailid
         //             },
         //             style: {
         //               bottom:"7px",
         //             },
         //       on:{
         //            'on-change':(event)=> {
         //              this.detailRemarkChange(event.target.value,params.row._index)
         //
         //           },
         //           'on-blur':(e)=>{
         //
         //           }
         //         }
         //         }
         //       )]);
         //     }},
         //
         //  // {title: '操作', key: 'action',align: 'center', width: 100,
         //  //   render: (h, params) => {
         //  //     const permissions = params.row.permissions
         //  //     const lea_status = params.row.status
         //  //     let buttons = []
         //  //
         //  //     if (true) {
         //  //       buttons.push(h('span', {
         //  //         props: {
         //  //           color:'red'
         //  //
         //  //         },
         //  //         style: {
         //  //           marginRight: '5px',
         //  //           color:'#cccccc'
         //  //         },
         //  //         on: {
         //  //           click: () => {
         //  //             this.showDetail(params);
         //  //           }
         //  //         }
         //  //       }, '盘点结束'))
         //  //     }
         //  //     return h('div', buttons)
         //  //   }
         //  // }
         // ]

         card: [
             {title: '选择',key: 'select',type: 'selection',width: 60,align: 'center'},
             {title: '序号',key: 'rowid',width: 80,align: 'center',
                 render: (h, params) => {
                   return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
                 }
             },
             {title: '批次号',key: 'stocknumber',width: 200,align: 'center', render: (h, params) => {
               //如果选中的盘库类型为'临时盘'
               if(this.formFilter.checktype == 'CD01'){
                   return  h('Input',{
                      props: {
                         //将单元格的值给Input
                         'search':true,
                         'value':params.row.stocknumber,
                         'disabled':this.batchnodisabled
                      },
                      style: {
                        width:"160px",
                      },
                   on:{
                        'on-change':(event)=> {
                          this.checkDetailsByBatchnoAndItemcode.stocknumber = event.target.value;
                        },
                      //  'on-search':(value)=> {
                      //    this.formFilter.itemcode = value
                      //    let noValue = this.noValueFilter()
                      //    this.searchIndex = params.row._index
                      //    if(!noValue && value != ''){
                      //      this.takeStockGoods()
                      //    }
                      // },
                      'on-search':(event)=> {
                            //event == 003
                            if(this.checkDetailsByBatchnoAndItemcode.stocknumber != ''){
                              axios.post(sessionStorage.http+`/takeStockGoods?loginStatus=${sessionStorage.loginStatus}`,this.checkDetailsByBatchnoAndItemcode)
                              .then(res => {
                                    console.log(res)
                                    //定义2个变量，供删除数组使用
                                    var num = 0;
                                    var num2 = 0;
                                     //如果行数据有空，则删除   originquantity -> 库存数量
                                    this.dataNotPage.forEach((item) => {
                                      if(item.originquantity == '' || item.originquantity == null){
                                        num--;
                                        num2++;
                                      }
                                    })

                                    this.dataNotPage.splice(num,num2);


                                    //后台获取的集合每一个对象添加一个extra的属性,如果extra为true，则在删除事件中删除
                                    res.data.forEach((item) => {item.extra = false});
                                    if(this.checkDetailsByBatchnoAndItemcode.trayno == ''){
                                      this.itemdisabled = true;
                                    }

                                    if(res.data.length != 0){
                                      //遍历集合，以正确的字段重新命名
                                      for(var i=0;i<res.data.length;i++){

                                        //初始状态为空
                                        // res.data[i].insertId = this.loginStatus
                                        //
                                        // res.data[i].warehouseType = res.data[i].warehouseInfo.warehousename
                                        // res.data[i].targetDistrict = res.data[i].origDistrict
                                        // res.data[i].moveType = '库内移库'
                                        this.dataNotPage.push(res.data[i])
                                      }
                                      console.log("这里是什么")
                                      console.log(this.dataNotPage)


                                      if(params.row.stocknumber != ''){

                                          for(var i=0,flag=true,len=this.dataNotPage.length;i<len;flag ? i++ : i){
                                              if(this.dataNotPage[i].stocknumber == params.row.stocknumber){
                                                this.dataNotPage.splice(i,1)
                                                 flag=false
                                                 len--;
                                              }else{
                                                flag=true
                                              }
                                          }
                                      }
                                    }else{
                                      iview.Message.error({
                                        content:"未查询到相关数据",
                                        duration:5,
                                      });
                                    }
                                    console.log("数据的长度" + this.dataNotPage.length)
                                    //分页显示
                                    this.formFilter.pagetotal = this.dataNotPage.length;
                                    this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
                                    console.log("aaaa")
                                    console.log(this.tableColumnsAdd.data)
                                    //值改变时
                                    //将渲染后的值重新赋值给单元格值
                                    params.row.stocknumber = event;
                                    //this.addMoveTable.dataList[params.index] = params.row;
                                    //重置this.rows的值
                                    this.rows=[];
                                    //搜索结束后搜索条件重置
                                    this.checkDetailsByBatchnoAndItemcode.stocknumber = '';
                                    this.checkDetailsByBatchnoAndItemcode.trayno = '';

                                  })
                            }







                          }
                     }

                 })
               }
               if(this.formFilter.checktype == 'CD02'){
                 return h('div', params.row.stocknumber)
               }

                }},

               {title: '托盘号',key: 'trayno',width: 200,align: 'center', render: (h, params) => {
                 //如果选中的盘库类型为'临时盘'
                 if(this.formFilter.checktype == 'CD01'){
                     return  h('Input',{
                        props: {
                           //将单元格的值给Input
                           'search':true,
                           'value':params.row.trayno,
                           'disabled':this.itemdisabled
                        },
                        style: {
                          width:"160px",
                        },
                     on:{
                          'on-change':(event)=> {
                            this.checkDetailsByBatchnoAndItemcode.trayno = event.target.value;

                          },
                        //  'on-search':(value)=> {
                        //    this.formFilter.itemcode = value
                        //    let noValue = this.noValueFilter()
                        //    this.searchIndex = params.row._index
                        //    if(!noValue && value != ''){
                        //      this.takeStockGoods()
                        //    }
                        // },
                        'on-search':(event)=> {
                          // this.formFilter.itemcode = event.target._value;
                              // event == 003
                              this.checkDetailsByBatchnoAndItemcode.trayno = event;
                              if(this.checkDetailsByBatchnoAndItemcode.trayno != ''){
                                axios.post(sessionStorage.http+`/takeStockGoods?loginStatus=${sessionStorage.loginStatus}`,this.checkDetailsByBatchnoAndItemcode)
                                .then(res => {
                                      //定义2个变量，供删除数组使用
                                      var num = 0;
                                      var num2 = 0;
                                       //如果行数据有空，则删除
                                      this.tableColumnsAdd.data.forEach((item) => {
                                        if(item.originquantity == '' || item.originquantity == null){
                                          num--;
                                          num2++;
                                        }
                                      })

                                      this.tableColumnsAdd.data.splice(num,num2);


                                      //后台获取的集合每一个对象添加一个extra的属性,如果extra为true，则在删除事件中删除
                                      res.data.forEach((item) => {item.extra = false});
                                      if(this.checkDetailsByBatchnoAndItemcode.stocknumber == ''){
                                        this.batchnodisabled = true;
                                      }

                                      if(res.data.length != 0){
                                        //遍历集合，以正确的字段重新命名
                                        for(var i=0;i<res.data.length;i++){

                                          //初始状态为空
                                          // res.data[i].insertId = this.loginStatus
                                          //
                                          // res.data[i].warehouseType = res.data[i].warehouseInfo.warehousename
                                          // res.data[i].targetDistrict = res.data[i].origDistrict
                                          // res.data[i].moveType = '库内移库'
                                          this.tableColumnsAdd.data.push(res.data[i])
                                        }


                                        if(params.row.trayno != ''){

                                            for(var i=0,flag=true,len=this.tableColumnsAdd.data.length;i<len;flag ? i++ : i){
                                                if(this.tableColumnsAdd.data[i].trayno == params.row.trayno){
                                                  this.tableColumnsAdd.data.splice(i,1)
                                                   flag=false
                                                   len--;
                                                }else{
                                                  flag=true
                                                }
                                            }
                                        }
                                      }else{
                                        iview.Message.error({
                                          content:"未查询到相关数据",
                                          duration:5,
                                        });
                                      }

                                      //分页显示
                                      this.formFilter.pagetotal = this.tableColumnsAdd.data.length;


                                      //值改变时
                                      //将渲染后的值重新赋值给单元格值
                                      params.row.trayno = event;
                                      //this.addMoveTable.dataList[params.index] = params.row;
                                      //重置this.rows的值
                                      this.rows=[];
                                      //搜索结束后搜索条件重置
                                      this.checkDetailsByBatchnoAndItemcode.stocknumber = '';
                                      this.checkDetailsByBatchnoAndItemcode.trayno = '';

                                    })
                              }





                            }
                       }

                   })
                 }


                 if(this.formFilter.checktype == 'CD02'){
                   return h('div', params.row.trayno)
                 }

                  }},
                  {title: '物料/成品号', key: 'itemcode',width: 200,align: 'center'},

            {title: '物料/成品描述', key: 'itemname',width: 200,align: 'center'},
            {title: '货位',key: 'storageid',width: 120,align: 'center'},
            {title: '库存数量',key: 'originquantity',width:90,align: 'center'},
            {title: '件数',key: 'originpieces',width:90,align: 'center'},
            {title: '包装规格',key: 'unit',width:90,align: 'center'},
            {title: '计量单位',key: 'standby4',width:90,align: 'center'},
            {title: '检验批号',key: 'checknumber',width: 200,align: 'center'},
            {title: '质量状态',key: 'qualitystate',width: 120,align: 'center',
            render:(h,params)=>{
              let qualitystate = '';
              if(params.row.qualitystate == 'Q'){
                qualitystate = '待检';
              }else if(params.row.qualitystate == 'N'){
                qualitystate = '非限制';
              }else {
                 qualitystate = '冻结';
              }
              return h('div',qualitystate);
            }},
            {title: '是否贴标',key: 'islabel',width: 120,align: 'center',
            render:(h,params)=>{
              let islabel = '';
              if(params.row.islabel == '1'){
                islabel = '是';
              }else {
                islabel = '否';
              }
              return h('div',islabel);
            }},
            {title: '是否锁库',key: 'islock',width: 120,align: 'center',
              render: (h, params) => {
                return h('div', '是' )
              }
            },


           ]

         }

      }
    },
    created(){        //渲染成功之后的专改
      // this.getAllDistrict()
      // this.getAllCustomer()
    },
    watch: {
      formFilter: {
        deep: true,
        handler() {
          console.log(this.formFilter)
          this.queryData();
        }
      }
    },

    methods:{

      show(){//显示本弹窗
        //作为盘库的申请时间
        this.getTime();
        //新增弹窗时盘库类型未定义 table数据为空
        this.formFilter.checkType = undefined;
        this.tableColumnsAdd.data = [];

        this.add = true;
        //this.formFilter.districtid = undefined
        //this.formFilter.warehouseName = undefined
        this.formFilter.customerid = undefined
        this.formFilter.checktype = undefined
        // this.tableColumnsAdd.data = []
        this.addDetail()
        this.lastDistrictID = ''
        //this.formFilter.districtid = undefined
        //this.districtTransition = ''
        //this.loading = false;
      },
      cleardata(){
        console.log("shfkjdslkfjdslfjwoe")
        this.add=false,
        this.dataNotPage = []
        // this.formFilter = {}

      },
      //获取当前时间
       getTime(){

         let createDate = new Date();
         let year = createDate.getFullYear();
         let month = createDate.getMonth() + 1 < 10 ? '0' + (createDate.getMonth() + 1) : createDate.getMonth() + 1;
         let day = createDate.getDate() < 10 ? '0' + createDate.getDate() : createDate.getDate() ;
         let hour = createDate.getHours() < 10 ? '0' + createDate.getHours() : createDate.getHours();
         let min = createDate.getMinutes()  < 10 ? '0' + createDate.getMinutes() : createDate.getMinutes();
         let sec = createDate.getSeconds() < 10 ? '0' + createDate.getSeconds() : createDate.getSeconds();
       this.date = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;

      },
      //当选定盘库类型
      selectCheckType(checkType){

        if(checkType == '临时盘'){
          this.tableColumnsAdd.data = this.originData;
        }
        if(checkType == '全盘'){
          this.tableColumnsAdd.data = [];
          this.getAllStockCheck();
        }
      },
      //
      ok(){

        this.loading = false;
      },
      cancel(){
        this.loading = false;
      },

      //删除事件 -xj
      deleteSelectionOrder(){
            for(var i=0;i<this.dataNotPage.length;i++){
              for(var j=0;j<this.rows.length;j++){
                //if(JSON.stringify(this.addMoveTable.dataList[i]) == JSON.stringify(this.rows[j])){
                if(this.dataNotPage[i].batchno == this.rows[j].batchno &&
                  this.dataNotPage[i].itemcode == this.rows[j].itemcode &&
                  this.dataNotPage[i].storageid == this.rows[j].storageid ){

                    this.dataNotPage[i].extra = true;
                }
              }
            }




        for(var i=0,flag=true,len=this.dataNotPage.length;i<len;flag ? i++ : i){

            if(this.dataNotPage[i] && this.dataNotPage[i].extra == true){
               this.dataNotPage.splice(i,1)
               flag=false
            }else{
              flag=true
            }
        }

        //当数据被清空，重置表格中batchno和itemcode的表现形式
        if(this.dataNotPage.length == 0){
          this.batchnodisabled = false
          this.itemdisabled = false
        }
        //重新计算this.formFilter.pagetotal的值
        this.formFilter.pagetotal = this.dataNotPage.length;
        //重新显示对应的数据
        this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)


        this.delete_confirm_Order = false;

        //重新定义"删除选中项"的按钮的格式
        document.getElementById('delOrderInAdd').setAttribute("style","background-color:white;width:120px;height:28px;");
        this.deDis = true

      },


      //删除弹框 -xj
      delConfirmOrder(){
        this.delete_confirm_Order = true;
      },

      //提交盘库info
      saveNewCheckOrder(){
        if(!this.submitLock){
          this.submitLock = true
          let checkOrderPack = {loginStatus:`${sessionStorage.loginStatus}`,checkOrder:this.formFilter,checkDetailOrders:this.tableColumnsAdd.data}
          axios.post(sessionStorage.http+'/saveNewCheckOrder?loginStatus='+`${sessionStorage.loginStatus}`,checkOrderPack)
          .then((res) =>{
            setTimeout(() =>{
              this.submitLock = false
            },2000)
  console.log("戈萨的")
            console.log(res)
            //this.showDetail()
            if(res.data == null){
                iview.Message.error({
                  content:res.message,
                  duration:5,
                  onClose:function(){

                  }
                })
              }else {

                // document.getElementById("showCheckId").value = res.data
                //更新主页面的盘库信息
                document.getElementById("reBtn").click()
                this.add = false;
                this.dataNotPage = []
                iview.Message.success({
                  content:res.message,
                  duration:5,
                  onClose:function(){

                  }
                })
              }
          })
          .catch((err) => {
             // iview.Message.error({
             //   content:'网络或服务器错误',
             //   duration:5
             // });
             setTimeout(()=>{
               this.submitLock = false
             },2000)
          })
        }
      },

      deleteDetail(){//删除选中的行
        this.delete_confirm = false
        for(let i = this.detailRows.length - 1; i >= 0 ; i--){
          console.log(this.detailRows[i].checkdetailid)
          this.tableColumnsAdd.data.splice(this.detailRows[i].checkdetailid,1);
        }
        this.couldDelet = 'false'
      },
      //select事件更改选中行格式，删除选中项变为abled,每次选中按钮都会触发 -xj
      onSelectionChange (rows) {

        this.rows = rows;

        if(this.rows.length > 0){
          this.deDis = false
          document.getElementById('delOrderInAdd').setAttribute("style","background-color:#fe3838;width:120px;height:28px;color:white");
        }else{
          document.getElementById('delOrderInAdd').setAttribute("style","background-color:white;width:120px;height:28px;");
          this.deDis = true
        }
      },
      remarkChange(){//备注表头改变
        if(this.formFilter.remark.length > 50){
          this.formFilter.remark = this.formFilter.remark.substr(0,50)
        }
      },
      detailRemarkChange(value,index){
        if(value.length > 50){
          this.tableColumnsAdd.data[index].remark = value.substr(0,50)
        }else {
          this.tableColumnsAdd.data[index].remark = value
        }
      },
      noValueFilter(){//必填值过滤
        if (this.formFilter.districtid=='' || this.formFilter.districtid== undefined) {
          alert('库区不能为空')
          return true
        }else if (this.formFilter.customerid=='' || this.formFilter.customerid== undefined) {
          alert('客户不能为空')
          return true
        }else if (this.formFilter.checktype=='' || this.formFilter.checktype== undefined) {
          alert('盘库类型不能为空')
          return true
        }
        return false
      },
      addDetail(){//新增盘点明细
        //this.noValueFilter()
        let detail = {select:false,stocknumber:'',itemcode:'',itemname:'',storageid:'',originquantity:'',unit:'',checknumber:'',qualitystate:'',islabel:'',checkquantity:null,differquantity:'',disqualifiedquantity:null,checkstarttime:'',checkendtime:'',trayno:'',islock:'0', remark:'',checkdetailid:this.tableColumnsAdd.data.length}
        this.tableColumnsAdd.data.push(detail)
        this.detailRows = []
      },

      // takeStockGoods(){//查询指定零件的库存
      //   axios.post(sessionStorage.http+'/takeStockGoods?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      //   .then((res) =>{
      //     //console.log(res)
      //     if (res.data.length > 0) {
      //       this.checkDetails = res.data
      //       this.addResultDetail()
      //     }else {
      //       iview.Message.success({
      //         content:'选定客户在该库区无此商品',
      //         duration:5,
      //         onClose:function(){
      //
      //         }
      //       })
      //     }
      //
      //   })
      //   .catch((err) => {
      //      iview.Message.error({
      //        content:'网络或服务器错误',
      //        duration:5
      //      });
      //   })
      // },


      getAllStockCheck(){//获取全盘盘点数据
        axios.post(sessionStorage.http+'/getAllStockCheck?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
        .then((res) =>{
          console.log(res.data)
          //console.log(res)
          if (res.data.list.length > 0) {
  this.tableColumnsAdd.data = res.data.list
  this.formFilter.pagetotal = res.data.total
            // this.allCheckDetail = res.data
            // this.formFilter.curPage = 1
            // this.total = this.allCheckDetail.length
            // this.trimRowid()
            // this.trimPage()
            // this.hasSelected = 'false'
          }else {
            iview.Message.error({
              content:'无库存',
              duration:5,
              onClose:function(){

              }
            })
          }

        })
        .catch((err) => {
           iview.Message.error({
             content:'网络或服务器错误',
             duration:5
           });
        })
      },

      // 翻页事件-xj
       handleChangePage (value) {
         this.formFilter.curPage = value;
         if(this.formFilter.checktype == 'CD02'){
           this.getAllStockCheck();
         }else{
           this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
         }

         // console.log(value)
       },

       //改变每页大小事件-xj
       handleChangePageSize(value){
         this.formFilter.pageSize = value;
         console.log(this.formFilter.checktype)
         if(this.formFilter.checktype == 'CD02'){
           this.getAllStockCheck();
         }else{
           this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
         }
       },

      addResultDetail(){//将商品库存显示到表格
       this.tableColumnsAdd.data.splice(this.searchIndex,1)
        for (var i = 0; i < this.checkDetails.length; i++) {
          this.tableColumnsAdd.data.splice(this.searchIndex,0,this.checkDetails[i])
        }
        for (var i = 0; i < this.tableColumnsAdd.data.length; i++) {
          this.tableColumnsAdd.data[i].checkdetailid = i
        }
      },


      changeToIdNameOptions(origin,target){//将id-name对象数组转为id-name选择项数组
        for(let i = 0; i < origin.length; i++){
          let option = {label:origin[i].name,value:origin[i].id}
          target.push(option)
        }
      },

      changeToIdOptions(origin,target){//将id-name对象数组转为id-id选择项数组
        for(let i = 0; i < origin.length; i++){
          let option = {label:origin[i].id,value:origin[i].id}
          target.push(option)
        }
      },
      changeToNameOptions(origin,target){//将id-name对象数组转为name-name选择项数组
        for(let i = 0; i < origin.length; i++){
          let option = {label:origin[i].name,value:origin[i].name}
          target.push(option)
        }
      },



      changeDistrict(query){
        if(query != true && query != false){
          this.districtTransition = query//将筛选条件用过渡对象记录
        }
      },


      queryWareHouse(){//查询仓库
        console.log(213)
        axios.post(sessionStorage.http+'/queryWareHouse?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
        .then((res) =>{
          this.formFilter.warehouseName = '1'
          this.formFilter.warehouseName = res.data
        })
        .catch((err) => {
           iview.Message.error({
             content:'网络或服务器错误',
             duration:5
           });
        })
      },
      districtOpenClose(open){//库区下拉框打开或关闭
        if(open){
          if(this.formFilter.districtid == ' '){
            this.formFilter.districtid = undefined
          }
          this.districtOptions = this.districtAllOptions
        }else{
          console.log(this.lastDistrictID)
          console.log(this.districtTransition)
          console.log(123455)
          let contain = false//默认下拉框选择项不包含筛选条件
          for (var i = 0; i < this.districtOptions.length; i++) {
              let option = this.districtOptions[i]

              if(option.label == this.districtTransition){//下拉框选择项包含筛选条件
                  console.log(this.lastDistrictID)
                    console.log(this.districtTransition)
                    console.log(this.lastDistrictID == '')
                contain = true
                if(this.lastDistrictID == ''){
                  this.lastDistrictID = option.value
                  this.formFilter.districtid = option.value
                  this.queryWareHouse()

                }else {
                  if (confirm('更改库区则已存在的盘点明细将被删除，确认修改？')) {
                    this.lastDistrictID = option.value
                    this.formFilter.districtid = option.value
                    this.tableColumnsAdd.data = []
                    this.queryWareHouse()
                  }else {
                    this.formFilter.districtid = this.lastDistrictID
                  }
                }

              }
           }
           this.queryWareHouse()
           if(!contain && this.districtTransition != ''){
             this.districtOptions = []
             let option = {label:"",value:' '}
             this.districtOptions.push(option)
             this.formFilter.districtid = option.value
           }
        }
      },
      //客户
      getAllCustomer(){
        axios.get(sessionStorage.http+'/getAllCustomerIdNameMap?loginStatus='+`${sessionStorage.loginStatus}`)
        .then((res) =>{
          this.customerList = res.data
          this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
        })
        .catch((err) => {
           iview.Message.error({
             content:'网络或服务器错误',
             duration:5
           });
        })
      },

      getCustomer (query) {
          if (query !== '') {
              this.customerLoading = true;
              //console.log(this.districtList)
              setTimeout(() => {
                  this.customerLoading = false;
                 this.customerOptions = this.customerAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
              }, 100);
          } else {
              this.customerOptions = this.customerAllOptions;
          }
      },

      changeCustomer(query){
        if(query != true && query != false){
          this.customerTransition = query
        }
      },

      customerOpenClose(open){
        if(open){
          if(this.formFilter.customerid == ' '){
            this.formFilter.customerid = undefined
          }
          this.customerOptions = this.customerAllOptions
        }else{
          let contain = false
          for (var i = 0; i < this.customerOptions.length; i++) {
              let option = this.customerOptions[i]
              if(option.label == this.customerTransition){
                this.formFilter.customerid = option.value
                contain = true
              }
           }
           if(!contain && this.customerTransition != ''){
             this.customerOptions = []
             let option = {label:"",value:' '}
             this.customerOptions.push(option)
             this.formFilter.customerid = option.value
           }
        }
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
    font-size: 12px;
  }
  .blueYaHei18{
    color: #5aa5ff;
    font-family: Microsoft YaHei;
    font-size: 12px;
  }
  .blueYaHei20{
    color: #5aa5ff;
    font-family: Microsoft YaHei;
    font-size: 20px;
  }
  .redYaHei18{
    color: #fe3838;
    font-family: Microsoft YaHei;
    font-size: 12px;
  }
  .ButtonBlue{
    background-color: #5aa5ff;
    height: 28px;
    font-size: 16px;
    color: #ffffff;
    width: 120px;
    line-height: 5px;
  }
  .ButtonGrey{
    background-color: #cccccc;
    border-color:#cccccc;
    height: 28px;
    font-size: 16px;
    color: #ffffff;
    width: 120px;
    line-height: 5px;
  }
  .textInput{
    width: 160px;
    height: 28px;
    color: #333333;
    // border: 1px solid red;
  }
  .inputPopLable{
    width: 100px;
    align:right;
    text-align: right;
  }
  .textLongInput{
    width: 1000px;
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
  .blackLabel{
    display: inline-block;
    text-align: right;
    font-family: Microsoft YaHei;
    font-size: 12px;
  }
  .outBox{
    display: inline-block;
    line-height: 40px;
    // width: 240px;
  }
  .blank{
    display: inline-block;
    width: 25px;
  }
  span{
    // border: 1px solid red;
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
  </style>

  <style lang="less">
      .addTakeStock{
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
         .departmenttable{
             .ivu-table td{
               background-color:#fff;
               height: 40px;
             }
             .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
               background-color: #f9f9f9;
               height: 40px;
             }
         }
         .ivu-input-wrapper{
            width: 120px;
            height: 20px;

         }
         .ivu-select{
           width: 160px;
           height: 20px;
         }
         // .textOutput{
         //    display: inline-block;
         //    width: 140px;
         //  }
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
           bottom: 6px;
         }
         .ivu-select-selection{
           border:1px solid #888888;
           bottom:7px !important;
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

             bottom: -6px;
         }
        .ivu-input-icon-normal+.ivu-input{
          width: 120px;
        }
        .ivu-table-cell{
          overflow: inherit;
        }
       #tableDetailId .ivu-select{
          width: 60px !important;
        }
        .detailTakeStockPage{
          .ivu-select-selection{
             bottom: 6px;
           }
        }
      }
   </style>
