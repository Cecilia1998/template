<template lang="html">
  <div class="std2">
    <Form ref="formFilter" :model="formFilter" :label-width="90" inline style="text-align:left;">
      <!-- formFilter表示表单名字，第二个formFilter表示数据对象，label-widthi表示样式 -->
          <Form-item label="物料号">
              <Input v-model="formFilter.materielId"  placeholder="请输入" />
          </Form-item>
          <Form-item label="生产地" style="margin-left:40px">
            <Select v-model="formFilter.producerId" placeholder="请选择" clearable>
              <Option v-for=" item in producerList" :key="item.factoryId" :value="item.factoryId">{{ item.factoryName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="供应商" style="margin-left:40px">
            <Select v-model="formFilter.supplierId" placeholder="请选择" clearable>
              <Option v-for=" item in vendorList" :key="item.supplierId" :value="item.supplierId">{{ item.supplierName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="仓库" >
            <Select v-model="formFilter.warehouseId" placeholder="请选择" clearable>
              <Option v-for=" item in warehouseList" :key="item.warehouseId" :value="item.warehouseId">{{ item.warehouseName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="库区" >
            <Select v-model="formFilter.districtId" placeholder="请选择" clearable>
              <Option v-for=" item in districtList" :key="item.districtId" :value="item.districtId">{{ item.districtName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="生产日期" id="product_date">
            <DatePicker :options="options2" v-model="formFilter.startDatePro" @on-change="startDateProChanged" type="date" placeholder="请选择" format="yyyy-MM-dd" class="dateInput" ></DatePicker>-
            <DatePicker :options="options1" v-model="formFilter.endDatePro" @on-change="endDateProChanged" type="date" placeholder="请选择" format="yyyy-MM-dd" class="dateInput" ></DatePicker>
          </Form-item>
          <Form-item label="入库日期" id="product_date">
            <DatePicker :options="options4" v-model="formFilter.startDateIn" @on-change="startDateInChanged" type="date" placeholder="请选择" format="yyyy-MM-dd" class="dateInput" ></DatePicker>-
            <DatePicker :options="options3" v-model="formFilter.endDateIn" @on-change="endDateInChanged" type="date" placeholder="请选择" format="yyyy-MM-dd" class="dateInput" ></DatePicker>
          </Form-item>

    </Form>
    <Row>
      <Col span="24" style="display:flex;justify-content:space-between">
        <div class="" >
        </div>
          <div class="">
            <Button type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='showNewModal'>新&nbsp;&nbsp;增</Button>
          </div>
      </Col>
    </Row>
    <br>
      <Table height=500  border stripe :loading="loading" ref="selection" :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="" ></Table>
    <br />
    <div class="stockGoodsPage">
      <Page :total="total" :current="formFilter.curPage" :page-size="formFilter.pageSize" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center;"></Page>
    </div>


    <Modal class="modal_std2" v-model="modal" width="600px" :styles="{top: '85px'}"  :mask-closable="false" @on-cancel="add_cancel">
      <p slot="header" style="text-align:center">
          <span style="font-size:14px">添加库存信息</span>
      </p>
      <Form ref="insertstorageInfo" :model="newData">
      <Row>
        <Col span="11">
            <Form-item label="物料号" style="margin-left:22px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
              <Input v-model="newData.materielId" placeholder="请输入"/>
            </Form-item>
        </Col>

        <Col span="6">
              <Form-item label="件数" style="margin-left:48px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <Input-number  :min="0" :max="999" v-model="newData.num" style="width: 50px;top:6px" />

              </Form-item>
        </Col>

          <Col span="7">
              <Form-item label="单价(元/吨)" style="margin-left:18px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <Input-number  :min="0" :max="999" v-model="newData.price" style="width: 50px;top:6px" />
              </Form-item>
        </Col>
<!--
                <Col span="5">
              <Form-item label="件数" style="margin-left:5px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <Input-number  :min="0" :max="999" v-model="newData.num" style="width: 60px;top:6px" />
              </Form-item>
        </Col>

          <Col span="5">
              <Form-item label="单价(元/吨)" style="margin-right:10px;position:relative;">
                <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <Input-number  :min="0" :max="999" v-model="newData.price" style="width: 60px;top:6px" />
              </Form-item>
        </Col>

        -->
      </Row>

      <Row>
        <Col span="13">
            <Form-item label="供应商" style="margin-left:20px;position:relative;">
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                <Select v-model="newData.supplierId" placeholder="" @on-change="" placeholder="请选择" style="position:absolute;left:50px;top:5px;">
                  <Option v-for=" item in vendorList" :key="item.supplierId" :value="item.supplierId">{{ item.supplierName }}</Option>
                </Select>
            </Form-item>
        </Col>

        <Col span="11">
            <Form-item label="仓库/库区" style="margin-left:0px;position:relative;" >
              <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font> <!--  @on-change="handleChange" -->
              <Cascader :data="warehouseAndDisList" v-model='selectData' style="width:180px;top:0px;position:absolute;left:65px;top:5px;" change-on-select></Cascader>
            </Form-item>
        </Col>
      </Row>


      <Row>
        <Col span="13">
                <Form-item label="生产日期" style="margin-left:10px;">
                  <DatePicker :options="options2" v-model="newData.produceDate" placeholder="请选择" style="width: 120px" @on-change="getProduceDate"></DatePicker>
                </Form-item>
        </Col>
        <Col span="11">
                  <Form-item label="入库日期" style="margin-left:6px;position:relative;">
                      <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font>
                      <DatePicker :options="options1" v-model="newData.inTime" placeholder="请选择" style="width: 120px" @on-change="getInTime"></DatePicker>
                  </Form-item>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <Form-item label="备注" style="margin-left:34px;position:relative;">
          <!-- <font color="red" class="font" style='position:absolute;left:-5px;top:3px;'>*</font> -->
          <Input v-model="newData.remark" type="textarea" placeholder="请输入" :maxlength="50"  :rows="2" :autosize="{minRows: 1,maxRows: 2}" style="width: 475px" />
          </Form-item>
        </Col>
      </Row>

      </Form>

      <div slot="footer">
        <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="addStd2">提交</Button>
      </div>
    </Modal>
  </div>
</template>


<script>
import axios from 'axios'
import router from '../../router'
import iview from 'view-design'
export default {
  components: {
   },
  data () {
    return {
      vendorList:[], //所有的供应商
      producerList:[], //所有的生产地
      warehouseAndDisList:[], //所有的仓库库区
      warehouseList:[], //所有的仓库
      districtList:[], //所有的库区

      clickSt:true, //重复点击

      selectData:[], //选中的仓库库区

      num4:'',


      //新增弹框的数据
      newData:{
        num:null,
        price:null,
      },


      modal:false, //新增显示
      total:0,
      model13: '',
      loading:false,
      formFilter: {
        curPage:1,
        pageSize:20,
      },

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
                   {
            title: "序号",
            key: "lineNo",
            width: 100,
            align: "center",
            render: (h, params) => {
              return h(
                "div",
                params.row._index +
                  1 +
                  this.formFilter.pageSize * (this.formFilter.curPage - 1)
              );
            }
          },
          {title: '物料号', key: 'materielId',width: 150,align: 'center'},
          {title: '境域', key: 'condition',width: 150,align: 'center'},
          {title: '物料品类', key: 'category',width: 150,align: 'center'},
          {title: '物料名称', key: 'materielName',width: 150,align: 'center'},
          {title: '生产地',key: 'producerName', width:150,align: 'center'},
          {title: '生产日期', key: 'produceDate',width:150,align: 'center'},
          {title: '入库日期',key: 'inTime',width:120,align: 'center'},
          {title: '供应商', key: 'supplierName',width:120,align: 'center'},
          {title: '批次号',key: 'stockBatch',width:130,align: 'center'},
          {title: '件数',key: 'num',width:130,align: 'center'},
          {title: '重量(T)', key: 'weight',width:150, align: 'center'},
          {title: '单价(元/吨)', key: 'price',width:150, align: 'center'},
          {title: '包装规格', key: 'packageStandards',width:150, align: 'center'},
          {title: '包装类型', key: 'packageType',width:150, align: 'center'},

          {title: '仓库', key: 'warehouseName', width:120,align: 'center' },
          {title: '库区', key: 'districtName', width:120,align: 'center' },
          {title: '备注', key: 'remark', width:300,align: 'center' }
         ]
       }
    }
  },
  async created(){

    //获取所有的仓库和库区信息
    await this.getAllWarehouseInfo();

    //获取所有的仓库
    this.getAllWarehouse();

    //获取所有的库区
    this.getAllDistrict();

    //获取所有的供应商
    this.getAllSupplier();
    //生产地
    this.getAllProducer();

    this.queryData()
  },

  methods:{

    queryData(){//查询数据

      axios.post(sessionStorage.http+'/secondStoManage/getStoSelective?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        this.tableColumns.data = res.data.list
        this.total = res.data.total
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

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

    //显示所有的仓库和库区信息
    async getAllWarehouseInfo(){
      await axios.get(sessionStorage.http+`/getWareHouseAndDisInfo?loginStatus=${sessionStorage.loginStatus}`)
      .then((res)=>{
        var json = res.data;

        //请求到的数据
        let list = [];
        for (var i = 0; i < json.length; i++) {
          var children = [];
          for (var j = 0; j < json[i].districtInfoList.length; j++) {
            var child = json[i].districtInfoList[j]; //子级集合
            children.push({
              value: child.districtId, //这里是你的树的子级id
              label: child.districtName //这里是你的树的子级name
            });
          }
          list.push({
            value: json[i].warehouseId, //这里是你的树的第一层的id
            label: json[i].wareHouseName, //这里是你的树的第一层的name
            children: children
          });
        }
        this.warehouseAndDisList = list; //这里获取到我们遍历的树形结构

      })
    },

    //获取所有的供应商
    getAllSupplier(){
      axios.get(sessionStorage.http+`/supplierInfo/getAllSupplier?loginStatus=${sessionStorage.loginStatus}`)
      .then((res)=>{
        this.vendorList = res.data;
      })
    },

    //获取所有的生产地
    getAllProducer(){
      axios.get(sessionStorage.http+`/producerInfo/getAllProducer?loginStatus=${sessionStorage.loginStatus}`)
      .then((res)=>{
        this.producerList = res.data;
      })
    },

    //处理次级联动的数据
    handleChange (value, selectedData) {

console.log("着加纳")
      console.log(this.selectData);

      // if(selectedData.length == 1){
      //   this.newData.warehouseId = selectedData[0].value;
      //   this.newData.districtId = '';
      // }else if(selectedData.length == 2){
      //   this.newData.warehouseId = selectedData[0].value;
      //   this.newData.districtId = selectedData[1].value;
      // }else{
      //   this.newData.warehouseId = 't1'
      //   this.newData.districtId = '';
      // }
    },

    startDateProChanged(startDate) {

      this.options1 = {
        disabledDate(date) {
          return date.valueOf() < new Date(startDate) - 86400000;
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.startDatePro = startDate;


    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
     endDateProChanged(endDate) {

      this.options2 = {
        disabledDate(date) {
          return date.valueOf() > new Date(endDate);
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.endDatePro = endDate;
     },

     startDateInChanged(startDate) {

      this.options3 = {
        disabledDate(date) {
          return date.valueOf() < new Date(startDate) - 86400000;
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.startDateIn = startDate;


    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
     endDateInChanged(endDate) {

      this.options4 = {
        disabledDate(date) {
          return date.valueOf() > new Date(endDate);
        }
      }
      //将选择的时间赋值给参数
      this.formFilter.endDateIn = endDate;
     },


    async showNewModal(){

      this.selectData = [];
      this.warehouseAndDisList = [];

      await this.getAllWarehouseInfo();

      this.newData = {
        num:null,
        price:null,
      };

      this.modal = true;
    },



    addStd2(){
      this.newData.warehouseId = this.selectData[0];
      this.newData.districtId = this.selectData[1];

      console.log(this.newData.warehouseId);
      console.log(this.newData.districtId);

      if(!this.clickSt){
          return
        }

      if(this.newData.materielId==null || this.newData.materielId==""){
        this.$Message.error("物料号不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.num==null || this.newData.num==""){
        this.$Message.error("件数不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.price==null || this.newData.price==""){
        this.$Message.error("单价不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.supplierId==null || this.newData.supplierId==""){
        this.$Message.error("供应商不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.warehouseId==null || this.newData.warehouseId==""){
        this.$Message.error("仓库不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.districtId==null || this.newData.districtId==""){
        this.$Message.error("库区不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      if(this.newData.inTime==null || this.newData.inTime==""){
        this.$Message.error("入库日期不能为空");
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }


      axios.post(sessionStorage.http+`/secondStoManage/addStd2?loginStatus=${sessionStorage.loginStatus}`,this.newData)
      .then((res)=>{
        if(res.data == 1){
          this.$Message.success('库存信息添加成功');
          //删除弹框
          this.modal = false;
          //重新查询页面
          this.queryData();

        }else{
          this.$Message.error(res.data);
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
          return;
        }
      })
    },

    //关于datepicker的方法
    getProduceDate(produceDate) {

      this.options1 = {
        disabledDate(date) {
          return date.valueOf() < new Date(produceDate) - 86400000;
        }
      }
      //将选择的时间赋值给参数
      this.newData.produceDate = produceDate;


    },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
     getInTime(inTime) {

      this.options2 = {
        disabledDate(date) {
          return date.valueOf() > new Date(inTime);
        }
      }
      //将选择的时间赋值给参数
      this.newData.inTime = inTime;
     },



    handleChangePage (value) {
     this.formFilter.curPage = value
     this.queryData()
    },
    handleChangePageSize(value){
      this.formFilter.pageSize = value
      this.queryData()
    },

  },
  watch: {
    formFilter: {
      deep: true,
      handler() {

        this.queryData();
      }
    }
  }
}
</script>
 <style lang="less">

.modal_std2{

  .ivu-cascader-arrow {
    position: absolute;
    top: 50%;
    right: 2px;
    line-height: 1;
    transform: translateY(-50%);
    font-size: 14px;
    color: #808695;
    transition: all .2s ease-in-out;
    margin-right: 16px;
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
      width: 170px;
      height: 20px;
    }
    .ivu-select{
      width: 170px;
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
    .ivu-cascader-rel{
       height: 32px;
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
        right:45px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
}


.std2{
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
       width: 120px;
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
      line-height: 40px;
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
        right:5px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
   .stockGoodsPage{
     .ivu-select-selection{
        bottom: 6px;
      }
   }
}

</style>

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
}
.clear{clear:both;}

.title{
  color: blue;
  text-align: left;
  width: 30%;
}




td{
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
