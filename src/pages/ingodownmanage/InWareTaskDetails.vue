<template>
  <div class="inwareTaskDetail">
    <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
        <Row>
             <Col span="4">
                <Form-item label="任务类型">

                    <Select v-model="formFilter.orderType" placeholder="请选择" style="width: 160px;" clearable>
                    <!-- <Option value="">-所有部门-</Option> -->
                        <Option value="0">入库</Option>
                        <Option value="1">出库</Option>
                        <Option value="2">移库</Option>
                    <!-- <Option v-for=" item in deptList" :value="item.sectorid" :key="item.sectorid">{{ item.sectorname }}</Option> -->
                    </Select>
                </Form-item>
            </Col>
            <Col span="4">

                <Form-item label="托盘号">
                    <Input v-model="formFilter.palletCode" style="width: 160px;" element-id = 'orderquantity'/>
                </Form-item>
            </Col>


            <Col span="4">
                <Form-item label="仓库" >
                  <Select v-model="formFilter.warehouseId" placeholder="请选择" style="width: 120px;" clearable>
                    <Option v-for=" item in warehouseList" :key="item.warehouseId" :value="item.warehouseId">{{ item.warehouseName }}</Option>
                  </Select>
                </Form-item>
            </Col>


            <Col span="4">
                <Form-item label="库区" >
                  <Select v-model="formFilter.districtId" placeholder="请选择" style="width: 120px;" clearable>
                    <Option v-for=" item in districtList" :key="item.districtId" :value="item.districtId">{{ item.districtName }}</Option>
                  </Select>
                </Form-item>
            </Col>

            <Col span="4">
                <Form-item label="任务状态">
                    <Select v-model="formFilter.status" placeholder="请选择" style="width: 120px;" clearable>
                    <Option value="0">未下发</Option>
                    <Option value="1">WCS接收</Option>
                    <Option value="2">异常</Option>
                    <Option value="3">完成</Option>
                    <Option value="4">暂停</Option>
                    </Select>
                </Form-item>
            </Col>


        </Row>
        <div class="" style="position:relative;">
          <div class="" style="position:absolute;right:0px;top:-54px;z-index:999">
            <Button type="primary" shape="circle" @click="exportcheckreport"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">导&nbsp;&nbsp;出</Button>
          </div>
        </div>
        <Row>
            <Col span='24'>
                <Table :loading="loading"  height='520' stripe border ref="allotTaskTable" :columns="tableTaskDetail.card" :data="tableTaskDetail.data"></Table>
            </Col>
        </Row>
        <br />
        <div class='page'>
          <Page  show-sizer show-elevator show-total :total="this.total"  :current="this.curPage" :page-size="this.pageSize"  :page-size-opts="[10,20,30]"
          @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
        </div>
      <input type="hidden" name="" id="getNewData" @click='checkOrderIdUse'>
    </Form>
  </div>
</template>
<script>
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'



export default {
  components: {
     // FilterBar,
     // List
   },
  created(){

    //获取所有的仓库
    this.getAllWarehouse();

    //获取所有的库区
    this.getAllDistrict();

this.searchtask();
    this.formFilter.loginStatus = sessionStorage.loginStatus;
    axios.get(sessionStorage.http+`/getAllDistrictInfo?loginStatus=${sessionStorage.loginStatus}`)
     .then((res)=>{
       res.data.forEach(item => {
          if (item.isStart == '1') {
            this.districtNameInfo.push(item)
          }
        })
     })
  },
  data(){
    return {
      districtNameInfo:[],
      warehouseList:[], //所有的仓库
      districtList:[], //所有的库区
      taskBtn:true,
      isAutoBatch:false,
      name:'name1',
      vendors:[],
      tableTaskDetail:{
        card:[
          // {title: '序号',key: 'taskid',align: 'center'},
          {title: '序号',key: 'lineNo',width: 75,align: 'center',render:(h,params)=>{
            return h("div",+params.row._index + 1)
          }},
          {title: '任务单号',key: 'taskId',width:180,align: 'center'},
          {title: '入库单号',key: 'inOrderId',width:180,align: 'center'},
          {title: '任务类型',key: 'orderType', width: 160,align: 'center'},
          {title: '仓库', key: 'warehouseName',width:180,align: 'center'},   //新增 -xj
          {title: '库区', key: 'districtName',width:180,align: 'center'},   //新增
          {title: '货位', key: 'endStorageId',width:180,align: 'center'},   //新增
          {title: '托盘号', key: 'palletCode',width:180,align: 'center'},   //新增
          {title: '开始位置', key: 'startStorageId',width:180,align: 'center'},          //新增
          {title: '结束位置', key: 'endStorageId',width:180,align: 'center'},
          {title: '开始时间', key: 'startTime',width:180,align: 'center'},          //新增
          {title: '结束时间', key: 'finishTime',width:180,align: 'center'},
          {title: '任务状态', key: 'status',width:160,align: 'center',render:(h,params)=>{
            let traystatus = '';
            if(params.row.status == '0'){
              traystatus = '未下发';
            }
            if(params.row.status == '1'){
              traystatus = 'WCS接收';
            }
            if(params.row.status == '2'){
              traystatus = '异常';
            }
            if(params.row.status == '3'){
              traystatus = '完成';
            }
            if(params.row.status == '4'){
              traystatus = '暂停';
            }
            // if(params.row.status == '4'){
            //   traystatus = '下发失败';
            // }
            return h('div',traystatus);
          }},
        ],
        data:[]
      },

      // 托盘信息管理
      formTray:{
        currpage:1,
        pagesize:20
      },
      transfer:true,
      //任务类型
      taskList:[
        {
          taskid:'',
          typename:''
        }
      ],
      //客户
      customerList:[
        {
          customerid:'',
          customername:''
        }
      ],
      //供应商
      supplierList:[
        {
          supplierid:'',
          suppliername:''
        }
      ],
      loading:false,
      selects: {incomingNotice:'',godownEntryId:'',status:'',lineNo:'',surplusquantity:''},
      rows:[],
      total:0,
      curPage:1,
      pageSize:20,
      total2:0,
      curPage2:1,
      pageSize2:20,
      formFilter: {
        curPage:1,
        pageSize:20,
      },
      formFilter2: {

      },
      definePageSize:10,
       //申请时间-时间可用范围
       startTimeOption: {},
       endTimeOption: {},
       //托盘时间
       startTimeOptionTray: {},
       endTimeOptionTray: {},
       //完成时间-可用范围
       finishSTimeOption:{},
       finishETimeOption:{}
    }
  },
  methods:{

    //获取所有的仓库
    getAllWarehouse(){
      axios.get(sessionStorage.http+`/getAllWareHouseInfo?loginStatus=${sessionStorage.loginStatus}`)
         .then((res)=>{
           this.warehouseList = res.data;
         })
    },

    //获取所有的库区
    getAllDistrict(){
        axios.get(sessionStorage.http+`/getAllDistrictInfo?loginStatus=${sessionStorage.loginStatus}`)
          .then((res)=>{
            this.districtList = res.data;
          })
    },

    exportcheckreport(){
            let param = "loginStatus="+`${sessionStorage.loginStatus}`+ "&orderType="+this.formFilter.orderType+
            "&ordeId="+this.formFilter.ordeId+
            "&districtId="+this.formFilter.districtId
            window.open(sessionStorage.http+"/exportOutTaskDetail?"+param)
          },
    showdetail(row){
      // this.$refs.InGodownPlanDetailsModal.show(row);
    },

    //格式化后的日期
    //修改时间样式
    changeDate(dateA) {
        var dateee = new Date(dateA);
        // var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        // return date.substring(0,11);
        let y = dateee.getFullYear()
        let m = dateee.getMonth()+1
        let d = dateee.getDate()
        return y + '-' + this.add0(m) + '-' + this.add0(d)
    },

    //将后台传过来的毫秒转成年月日
    add0(m){return m<10?'0'+m:m },
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      return y+'-'+this.add0(m)+'-'+this.add0(d);
    },

    getLocalTime(nS) {
       return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
    },

    //查询任务
    searchtask(){
      // document.getElementById('delOrder').setAttribute("style","background-color:#b4b4b4;width:120px;height:28px;");
      // document.getElementById('delOrder').setAttribute("disabled","disabled");
      axios.post(sessionStorage.http +`/quaryOutTaskDetail?curPage=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res.data)
        this.tableTaskDetail.data = res.data.resultData;
        this.total=res.data.total
      })
    },
checkOrderIdUse(){},
    //查询
    search(){
      document.getElementById('search').click();
    },
    //申请日期
    onStartTimeChange(startTime, type) {
					this.endTimeOption = {
						disabledDate(endTime) {
							return endTime < new Date(startTime)
						}
					}
          // alert(this.formFilter.createdate)
          this.checkOrderIdUse();
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
        this.checkOrderIdUse();
			},
      onStartTimeChange2(startTime, type) {
  					this.finishETimeOption = {
  						disabledDate(endTime) {
  							return endTime < new Date(startTime)
  						}
  					}
            this.getAllVendos();
  				},
  		onEndTimeChange2(endTime, type) {
  				this.finishSTimeOption = {
  					disabledDate(startTime) {
  						return startTime > new Date(endTime)
  					}
  				}
          this.getAllVendos();
  			},
        // //申请日期-托盘管理
      // 只能输入数字-校验入库单号
      checkOrderId(e){
        var value=e.target.value.replace(/[^\w\.\/]/ig,'');
        document.getElementById(e.target.id).value = value;
      },
      handleChangePage (value) {
        // const paths = this.$route.path.split('/');
        this.curPage = value
        this.searchtask();
      },
      handleChangePageSize(value){
        // const paths = this.$route.path.split('/');
        this.pageSize = value
        this.curPage = 1
        this.searchtask();
      },

      //-------------------------------------------------------------------------------------
      handleChangePage2 (value) {
        // const paths = this.$route.path.split('/');
        this.curPage2 = value
        this.getAllVendos();
      },
      handleChangePageSize2(value){
        // const paths = this.$route.path.split('/');
        this.pageSize2 = value
        this.curPage2 = 1
        this.getAllVendos();
      },
      //--------------------------------------------------------------------------------------
      onSelectionChange (rows) {
        this.rows = [];
        console.log(rows)
        rows.forEach((item,index) => {
          this.selects={};
          this.selects.incomingNotice=item.incomingNotice;
          this.selects.godownEntryId=item.godownEntryId;
          this.selects.status=item.status;
          this.selects.lineNo=item.lineNo;
          this.selects.surplusquantity=item.surplusquantity;
          this.rows.push(this.selects);
          })

      },
      showdetail(row){
        console.log(row)
        // this.rows = row;
        // row.surplusquantity=this.surplusquantity;
        // this.$refs.makeTraysModal.show(row);
        if(row.inOrderType=='GPT05'){
          this.$refs.rfMakeTraysmodal.show(row);
        }else if(row.inOrderType=='GPT04'){
          this.$refs.ppmakeTraysModal.show(row);
        }else{
          this.$refs.makeTraysModal.show(row);
        }
      }
  },
    watch: {
    formFilter: {
      deep: true,
      handler() {

        this.searchtask();
      }
    }
  }
}
</script>
<style media="screen">
.ivu-tabs-nav .ivu-tabs-tab-active{
  background-color: white !important;
  font-size: 20px;
  border-radius: 8px;

}
.ivu-tabs-ink-bar{
  background-color: #fff;
}
.ivu-tabs-nav .ivu-tabs-tab{
  font-size: 20px;
  background-color: #f3f3f3;
}
.ivu-tabs-nav-scroll{
  background-color: #f3f3f3;
}
</style>
<style lang='less'>
.inwareTaskDetail{
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
    // .ivu-input-wrapper{
    //   width: 160px;
    //   height: 20px;
    // }
    // .ivu-select{
    //   width: 160px;
    //   height: 20px;
    // }
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
       bottom: 6px;
     }
   }
}

</style>
