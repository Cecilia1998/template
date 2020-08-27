<template lang="html">
  <div class="commoditycategory">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="物料编号">
            <Input v-model="searchCommodityCategory.materielId" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item>
          <Form-item label="物料名称" >
            <Input v-model="searchCommodityCategory.materielName" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item>
          <Form-item label="物料类型" >
            <Select v-model="searchCommodityCategory.materielType" clearable placeholder="请选择"
             @on-change="searchCommodityCategoryByCondition">
             <Option value="0">原材料</Option>
             <Option value="1">半成品</Option>
			  <Option value="2">成品</Option>
            </Select>
          </Form-item>


      </div>

      <Row>
          <Col span="24" style="display:flex;justify-content:space-between">
            <div class="" >
              <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="delete_confirm=true"
              style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
              <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
              style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
            </div>
            <div class="">
              <Button type="primary" shape="circle" @click="showaddmodal"
              style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增</Button>
            </div>
          </Col>
      </Row>
    </Form>
      <br>
      <Table stripe border height=520 :columns="tableColumns.card" :data="commodityCategoryShow"
      @on-selection-change="onSelectionChange" @on-row-dblclick="updateSelection"></Table>
      <br>
      <div class="commoditycategoryPage">
        <Page :total="total" show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize"
        @on-change="handleChangePage" @on-page-size-change="handleChangePageSize" style="text-align:center"></Page>
      </div>

      <Modal v-model="delete_confirm" width="360" style="font-size:14px" :mask-closable='false'>
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <span>确定要删除吗？</span>
        </div>
        <div slot="footer" style="display:flex;justify-content:center;">
          <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection">确定删除</Button>
        </div>
      </Modal>

      <Modal class="commoditycategorymodalstyle" v-model="modal_add_commoditycategory" width="1300" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>添加物料信息</span>
          </p>
          <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>物料编号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.materielId" style="width: 160px" placeholder="请输入"/>
                  </td>
				            <td>
                    <span style="color:red">*</span>物料名称&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.materielName" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>物料类型&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityCategory.materielType" style="text-align:left;" placeholder="请选择">
                      <Option value=""></Option>
					                 <Option value="0">原材料</Option>
                           <Option value="1">半成品</Option>
					                 <Option value="2">成品</Option>
                    </Select>
                  </td>
                  <td>
                    规格型号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.standardMode" style="width: 160px" placeholder="请输入"/>
                  </td>

                </tr>
                <tr>

                   <td>
                    <span style="color:red">*</span>库存单位&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.unit" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                   辅助单位&nbsp;
                 </td>
                 <td>
                   <Input v-model="insertCommodityCategory.assistUnit" style="width: 160px" placeholder="请输入"/>
                 </td>
                 <td>
                  换算率&nbsp;
                </td>
                <td>
                    <Input   v-model="insertCommodityCategory.changeRate" style="width: 160px" @on-keyup = "checkchangeRate" element-id="checkchangeRate" placeholder="请输入"/>
                </td>
                  <td>
                    有效期天数&nbsp;
                  </td>
                  <td>
                      <Input  v-model="insertCommodityCategory.effectiveTime" @on-keyup = "checkeffectiveTime" element-id="effectiveTime" style="width: 160px" placeholder="请输入"/>
                  </td>
                </tr>
                  <tr>
				          <td>
                    存储预警天数&nbsp;
                  </td>
                  <td>
                        <Input  v-model="insertCommodityCategory.storeTime" @on-keyup = "checkstoreTime" element-id="storeTime" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td style="width:140px">
                    最大安全库存&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.maxSafetyStock" @on-change="geshihua" id="maxnumber" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td style="width:140px">
                  最小安全库存&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.minSafetyStock"@on-change="geshihua1" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>是否为制管线物料&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityCategory.isPipeline" style="text-align:left;" placeholder="请选择">
                      <Option value=""></Option>
					  <Option value="0">非制管线</Option>
                      <Option value="1">制管线</Option>

                    </Select>
                  </td>

                </tr>
                <tr>

				              <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>是否启用&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityCategory.isStart" style="text-align:left;" placeholder="请选择">
                      <Option value=""></Option>
					  <Option value="0">不启用</Option>
                      <Option value="1">启用</Option>

                    </Select>
                  </td>

              </tr>
          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="save"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
      </Modal>

      <Modal class="commoditycategorymodalstyle" v-model="modal_update_commoditycategory" width="1300" :mask-closable='false' closable>
        <p slot="header" style="text-align:center">
            <span>修改物料信息</span>
        </p>
        <table style="line-height:50px;text-align:right">
          <tr>
              <td>
                <span style="color:red">*</span>物料编号&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.materielId" disabled style="width: 160px" placeholder="请输入"/>
              </td>
                <td>
                <span style="color:red">*</span>物料名称&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.materielName" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>物料类型&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityCategory.materielType" style="text-align:left;" placeholder="请选择">
                  <Option value=""></Option>
				  <Option value="0">原材料</Option>
                  <Option value="1">半成品</Option>
                  <Option value="2">成品</Option>
                </Select>
              </td>
              <td>
                规格型号&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.standardMode" style="width: 160px" placeholder="请输入"/>
              </td>

            </tr>
            <tr>

               <td>
                <span style="color:red">*</span>库存单位&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.unit" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
               辅助单位&nbsp;
             </td>
             <td>
               <Input v-model="updateCommodityCategory.assistUnit" style="width: 160px" placeholder="请输入"/>
             </td>
             <td>
              换算率&nbsp;
            </td>
            <td>
                <Input   v-model="updateCommodityCategory.changeRate" @on-keyup = "checkchangeRate1" element-id="checkchangeRate1" style="width: 160px" placeholder="请输入"/>
            </td>
              <td>
                有效期天数&nbsp;
              </td>
              <td>
                  <Input  v-model="updateCommodityCategory.effectiveTime" @on-keyup = "checkeffectiveTime1" element-id="effectiveTime1" style="width: 160px" placeholder="请输入"/>
              </td>
            </tr>
              <tr>
              <td>
                存储预警天数&nbsp;
              </td>
              <td>
                <Input  v-model="updateCommodityCategory.storeTime" @on-keyup = "checkstoreTime1" element-id="storeTime1" style="width: 160px" placeholder="请输入"/>
              </td>
              <td style="width:140px">
                最大安全库存&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.maxSafetyStock" @on-change="geshihua" id="maxnumber" style="width: 160px" placeholder="请输入"/>
              </td>
              <td style="width:140px">
              最小安全库存&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.minSafetyStock"@on-change="geshihua1" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>是否为制管线物料&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityCategory.isPipeline" style="text-align:left;" placeholder="请选择">
                  <Option value=""></Option>
				  <Option value="0">非制管线</Option>
                  <Option value="1">制管线</Option>

                </Select>
              </td>

            </tr>
            <tr>

                  <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>是否启用&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityCategory.isStart" style="text-align:left;" placeholder="请选择">
                  <Option value=""></Option>
				  <Option value="0">不启用</Option>
                  <Option value="1">启用</Option>

                </Select>
              </td>

          </tr>
            </table>
        <div slot="footer">
          <Button type="primary" shape="circle" @click="update"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import iView from 'view-design'
import Vue from 'vue'
import $ from 'jquery'
import router from '../router'
export default {
  components: {},
  data () {
    return {
      options3: {
                 disabledDate (date) {
                     return date && date.valueOf() < Date.now() - 86400000;
                 }
             },
      clickSt:true,
      total:0,
      pageNum:1,
      pageSize:20,
      definePageSize:10,
      modal_add_commoditycategory:false,
      modal_update_commoditycategory:false,
      delete_confirm:false,
      deleteButtonFlag:true,
      commodityCategory:[],
      goodsCategoryNames:[],
      commodityCategoryShow:[],
      deleteCommodityCategory:[],
      updateCommodityCategory:{},
      insertCommodityCategory:{

      },
      warehouseList:[
        {
          warehouseId:'',
          warehouseName:''
        }
      ],
      districtList:[
        {
          districtId:'',
          districtName:''
        }
      ],
      supplierList:[
        {
          supplierId:'',
          supplierName:''
        }
      ],
      isstop:"0",
      searchCommodityCategory:{},
      formFilter:{
        cur_page:1
      },
      startTimeOption: {},
      endTimeOption: {},
      tableColumns: {
        card: [
          {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum-1)*this.pageSize)
          }},
          {title: '物料编号', key: 'materielId',width: 150, align: 'center'},
		  {title: '物料名称', key: 'materielName',width: 150, align: 'center'},
		  {
               title: '物料类型',
               key: 'materielType',width: 120,
                align: 'center',
              render:(h,params)=>{
                  let isstart = '';
                   if(params.row.materielType == '0'){
                     isstart = '原材料';
                   }else if(params.row.materielType == '2'){
                     isstart = '成品';
                   }else if(params.row.materielType == '1'){
                     isstart = '半成品';
                   }
                   return h('div',isstart);
                 }
           },

           {title: '规格型号', key: 'standardMode',width: 200, align: 'center'},

          {title: '库存单位', key: 'unit', width: 120,align: 'center'},
          {title: '辅助单位', key: 'assistUnit', width: 120,align: 'center'},
		  {title: '换算率', key: 'changeRate', width: 120,align: 'center'},
          {title: '有效期天数', key: 'effectiveTime', width: 200,align: 'center'},
          {title: '存储预警天数', key: 'storeTime', width: 200,align: 'center'},
          {title: '最大安全库存', key: 'maxSafetyStock',width: 150, align: 'center'},
          {title: '最小安全库存', key: 'minSafetyStock', width: 150,align: 'center'},

          {title: '是否为制管线物料', key: 'isPipeline', width: 200,align: 'center',
              render:(h,params)=>{
                  let isstart = '';
                   if(params.row.isPipeline == '0'){
                     isstart = '非制管线';
                   }else if(params.row.isPipeline == '1'){
                     isstart = '制管线';
                   }
                   return h('div',isstart);
                 }},
          {title: '是否启用', key: 'isStart', width: 200,align: 'center',
              render:(h,params)=>{
                  let isstart = '';
                   if(params.row.isStart == '0'){
                     isstart = '不启用';
                   }else if(params.row.isStart == '1'){
                     isstart = '启用';
                   }
                   return h('div',isstart);
                 }},
          ],
      }
    }
  },

  created(){
    axios.post(sessionStorage.http+`/addStorageInfoInit?loginStatus=${sessionStorage.loginStatus}`)
    .then((res) =>{
      console.log(res.data)
      this.supplierList = res.data.supplierManagements
      this.districtList = res.data.districtInfos
      this.warehouseList = res.data.warehouseInfos

    })
    axios.get(sessionStorage.http+`/selectAllCommodityCategory?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      console.log(result)
      this.commodityCategoryShow=result.data.list
      // this.goodsCategoryNames=result.data.data1
      this.total=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },

  computed:{},

  methods:{
    timeformata(){
      return false
    },
    checkchangeRate(m){
      var value=m.target.value.replace(/[^\d.]/g,'');
      this.insertCommodityCategory.changeRate = value;
      document.getElementById('checkchangeRate').value = value;
    },
    checkchangeRate1(v){
      var value=v.target.value.replace(/[^\d.]/g,'');
      this.updateCommodityCategory.changeRate = value;
      document.getElementById('checkchangeRate1').value = value;
    },
	   checkeffectiveTime(e){
          var value=e.target.value.replace(/[^\d]/g,'');
          this.insertCommodityCategory.effectiveTime = value;
          document.getElementById('effectiveTime').value = value;
        },
		checkeffectiveTime1(f){
          var value=f.target.value.replace(/[^\d]/g,'');
          this.updateCommodityCategory.effectiveTime = value;
          document.getElementById('effectiveTime1').value = value;
        },
		 checkstoreTime1(g){
          var value=g.target.value.replace(/[^\d]/g,'');
          this.updateCommodityCategory.storeTime = value;
          document.getElementById('storeTime1').value = value;
        },
		checkstoreTime(h){
          var value=h.target.value.replace(/[^\d]/g,'');
          this.insertCommodityCategory.storeTime = value;
          document.getElementById('storeTime').value = value;
        },
    addItemTypeInit(){
      axios.post(sessionStorage.http+`/addItemTypeInit?loginStatus=${sessionStorage.loginStatus}`,this.insertCommodityCategory)
      .then((res) =>{
        console.log(res.data)
        this.districtList = res.data.districtInfos
      })
    },
    updateItemTypeInit(){
      axios.post(sessionStorage.http+`/addItemTypeInit?loginStatus=${sessionStorage.loginStatus}`,this.updateCommodityCategory)
      .then((res) =>{
        console.log(res.data)
        this.districtList = res.data.districtInfos
      })
    },
    geshihua(){
      var str = /[^\d|.]/g
      setTimeout(()=>{
        this.insertCommodityCategory.maxSafetyStock = this.insertCommodityCategory.maxSafetyStock.replace(str,"")
      },0)

      if(this.insertCommodityCategory.maxSafetyStock.length == 1){
        if(this.insertCommodityCategory.maxSafetyStock == "."){
          this.insertCommodityCategory.maxSafetyStock = "0."
        }
      }
      var index = this.insertCommodityCategory.maxSafetyStock.indexOf(".")
      if(index != -1){
        var end = this.insertCommodityCategory.maxSafetyStock.length
        console.log(this.insertCommodityCategory.maxSafetyStock.substring(index+1,end))
        var array = this.insertCommodityCategory.maxSafetyStock.split(".")
        this.insertCommodityCategory.maxSafetyStock = array[0]+"."+this.insertCommodityCategory.maxSafetyStock.substring(index+1,end).replace(".","")
        if(array[1].length>2){

          setTimeout(()=>{
            this.insertCommodityCategory.maxSafetyStock =  (+this.insertCommodityCategory.maxSafetyStock).toFixed(2)
          },0)
        }
      }
    },
    geshihua1(){
      var str = /[^\d|.]/g
      setTimeout(()=>{
        this.insertCommodityCategory.minSafetyStock = this.insertCommodityCategory.minSafetyStock.replace(str,"")
      },0)

      if(this.insertCommodityCategory.minSafetyStock.length == 1){
        if(this.insertCommodityCategory.minSafetyStock == "."){
          this.insertCommodityCategory.minSafetyStock = "0."
        }
      }
      var index = this.insertCommodityCategory.minSafetyStock.indexOf(".")
      if(index != -1){
        var end = this.insertCommodityCategory.minSafetyStock.length
        console.log(this.insertCommodityCategory.minSafetyStock.substring(index+1,end))
        var array = this.insertCommodityCategory.minSafetyStock.split(".")
        this.insertCommodityCategory.minSafetyStock = array[0]+"."+this.insertCommodityCategory.minSafetyStock.substring(index+1,end).replace(".","")
        if(array[1].length>2){

          setTimeout(()=>{
            this.insertCommodityCategory.minSafetyStock =  (+this.insertCommodityCategory.minSafetyStock).toFixed(2)
          },0)
        }
      }
    },
    geshihua2(){
      var str = /[^\d|.]/g
      setTimeout(()=>{
        this.updateCommodityCategory.maxSafetyStock = this.updateCommodityCategory.maxSafetyStock.replace(str,"")
      },0)

      if(this.updateCommodityCategory.maxSafetyStock.length == 1){
        if(this.updateCommodityCategory.maxSafetyStock == "."){
          this.updateCommodityCategory.maxSafetyStock = "0."
        }
      }
      var index = this.updateCommodityCategory.maxSafetyStock.indexOf(".")
      if(index != -1){
        var end = this.updateCommodityCategory.maxSafetyStock.length
        console.log(this.updateCommodityCategory.maxSafetyStock.substring(index+1,end))
        var array = this.updateCommodityCategory.maxSafetyStock.split(".")
        this.updateCommodityCategory.maxSafetyStock = array[0]+"."+this.updateCommodityCategory.maxSafetyStock.substring(index+1,end).replace(".","")
        if(array[1].length>2){

          setTimeout(()=>{
            this.updateCommodityCategory.maxSafetyStock =  (+this.updateCommodityCategory.maxSafetyStock).toFixed(2)
          },0)
        }
      }
    },
    geshihua3(){
      var str = /[^\d|.]/g
      setTimeout(()=>{
        this.updateCommodityCategory.minSafetyStock = this.updateCommodityCategory.minSafetyStock.replace(str,"")
      },0)

      if(this.updateCommodityCategory.minSafetyStock.length == 1){
        if(this.updateCommodityCategory.minSafetyStock == "."){
          this.updateCommodityCategory.minSafetyStock = "0."
        }
      }
      var index = this.updateCommodityCategory.minSafetyStock.indexOf(".")
      if(index != -1){
        var end = this.updateCommodityCategory.minSafetyStock.length
        console.log(this.updateCommodityCategory.minSafetyStock.substring(index+1,end))
        var array = this.updateCommodityCategory.minSafetyStock.split(".")
        this.updateCommodityCategory.minSafetyStock = array[0]+"."+this.updateCommodityCategory.minSafetyStock.substring(index+1,end).replace(".","")
        if(array[1].length>2){

          setTimeout(()=>{
            this.updateCommodityCategory.minSafetyStock =  (+this.updateCommodityCategory.minSafetyStock).toFixed(2)
          },0)
        }
      }
    },
    showaddmodal(){
      this.insertCommodityCategory = {packageStandards:null,changeRate:null,storeTime:null,effectiveTime:null}
      axios.post(sessionStorage.http+`/addStorageInfoInit?loginStatus=${sessionStorage.loginStatus}`)
      .then((res) =>{
        console.log(res.data)
        this.warehouseList = res.data.warehouseInfos
        // this.supplierList = res.data.supplierManagements
      })
      var myDate = new Date();
      this.insertCommodityCategory.registertime = myDate.toLocaleString('chinese', { hour12: false });
      this.modal_add_commoditycategory=true;
    },
    searchCommodityCategoryByCondition(){
      console.log(this.searchCommodityCategory)
      axios.post(sessionStorage.http+`/getCommodityCategoryByCondition?pageNum=1&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.searchCommodityCategory)
      .then((result) => {
        this.commodityCategoryShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },
    onSelectionChange (row) {
      this.deleteCommodityCategory = row
      if(this.deleteCommodityCategory.length>0){
        this.deleteButtonFlag=false
      }else{
        this.deleteButtonFlag=true
      }
    },
    deleteSelection(){
      for (var i = 0; i < this.deleteCommodityCategory.length; i++) {
        if(this.deleteCommodityCategory[i].isStart=='1'){
          iView.Message.error({
            content:"物料已启用，不可删除",
            duration:1,
          });
          return
        }
      }
      if(this.deleteCommodityCategory.length==0){
        this.delete_confirm = false;
        this.$Message.info('请先勾选需要删除项');
      }

      else{
        axios.post(sessionStorage.http+`/deleteCommodityCategory?pageNum=${this.pageNum}&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`,this.deleteCommodityCategory, this.searchCommodityCategory)
        .then((result) => {
          this.commodityCategoryShow=result.data.list
          this.total=result.data.total
          this.delete_confirm = false;
          this.deleteButtonFlag = true;
          this.$Message.success('删除成功');
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      }
    },

    handleChangePage (value) {
      this.pageNum = value
      axios.post(sessionStorage.http+`/getCommodityCategoryByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityCategory)
      .then((result) => {
        this.commodityCategoryShow=result.data.data.list
        this.total=result.data.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    handleChangePageSize(value){
      this.pageSize = value
      this.pageNum = 1
      axios.post(sessionStorage.http+`/getCommodityCategoryByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.searchCommodityCategory)
      .then((result) => {
        this.commodityCategoryShow=result.data.data.list
        this.total=result.data.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    save () {
      if(!this.clickSt){
        return
      }
      //判空
      if(this.insertCommodityCategory.materielName == undefined ||
      this.insertCommodityCategory.materielType == undefined ||
      this.insertCommodityCategory.materielId == undefined ||
      this.insertCommodityCategory.unit == undefined ||
      this.insertCommodityCategory.isPipeline == undefined ||
      this.insertCommodityCategory.isStart == undefined ||
      this.insertCommodityCategory.materielId == '' ||
      this.insertCommodityCategory.materielName == '' ||
      this.insertCommodityCategory.materielType == '' ||
      this.insertCommodityCategory.unit == ''||
        this.insertCommodityCategory.isStart == ''||
      this.insertCommodityCategory.isPipeline == ''){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
	   if(this.insertCommodityCategory.assistUnit!='' && this.insertCommodityCategory.assistUnit!=null){
		if(this.insertCommodityCategory.changeRate==''||this.insertCommodityCategory.changeRate==undefined){
			 this.$Message.error('辅助单位有值时换算率必须有值');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
	  }
	  }
      if(this.insertCommodityCategory.minSafetyStock > this.insertCommodityCategory.maxSafetyStock ){
        this.$Message.error('最小安全库存不可大于最大安全库存');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      axios.get(sessionStorage.http+`/judComCateRepeat?goodscategoryid=${this.insertCommodityCategory.materielId}`)
        .then((result) => {
          if(result.data=='1'){
            this.$Message.error({
              content:'编号不可重复',
              duration:2
            });
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)
          }else{
            this.insertCommodityCategory.isstop = this.isstop
            axios.post(sessionStorage.http+`/insertCommodityCategory?pageNum=${this.pageNum}&pageSize=${this.pageSize}
              &loginStatus=${sessionStorage.loginStatus}`,this.insertCommodityCategory)
            .then((result) => {
              this.commodityCategoryShow=result.data.list
              this.total=result.data.total
              this.modal_add_commoditycategory = false;
              this.$Message.success('物料信息已添加');
            })
            .catch((err) => {
              console.log('请检查您的网络连接'+err)
            })
          }
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
    },

    updateSelection(res){
      this.updateCommodityCategory=res
      console.log(this.updateCommodityCategory)
      this.modal_update_commoditycategory = true
      axios.post(sessionStorage.http+`/addStorageInfoInit?loginStatus=${sessionStorage.loginStatus}`)
      .then((res) =>{
        console.log(res.data)
        this.warehouseList = res.data.warehouseInfos
        // this.supplierList = res.data.supplierManagements
      })
    },
    update () {
      if(!this.clickSt){
        return
      }
      if(this.updateCommodityCategory.materielName == undefined ||
      this.updateCommodityCategory.materielType == undefined ||
      this.updateCommodityCategory.materielId == undefined ||
      this.updateCommodityCategory.unit == undefined ||
      this.updateCommodityCategory.isPipeline == undefined ||
      this.updateCommodityCategory.isStart == undefined ||
      this.updateCommodityCategory.materielId == '' ||
      this.updateCommodityCategory.materielName == '' ||
      this.updateCommodityCategory.materielType == '' ||
      this.updateCommodityCategory.unit == ''||
        this.updateCommodityCategory.isStart == ''||
      this.updateCommodityCategory.isPipeline == ''){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
	  if(this.updateCommodityCategory.assistUnit!='' && this.updateCommodityCategory.assistUnit!=null){
		if(this.updateCommodityCategory.changeRate==''||this.updateCommodityCategory.changeRate==undefined){
			 this.$Message.error('辅助单位有值时换算率必须有值');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
	  }
	  }
      if(this.updateCommodityCategory.minSafetyStock > this.updateCommodityCategory.maxSafetyStock ){
        this.$Message.error('最小安全库存不可大于最大安全库存');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }
      axios.post(sessionStorage.http+`/updateCommodityCategory?pageNum=${this.pageNum}&pageSize=${this.pageSize}
      &loginStatus=${sessionStorage.loginStatus}`,this.updateCommodityCategory,this.searchCommodityCategory)
      .then((result) => {
        this.commodityCategoryShow=result.data.list
        this.total=result.data.total
        this.updateCommodityCategory = {},
        this.modal_update_commoditycategory = false;
        this.$Message.success('物料信息修改成功');
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    update_cancel () {
      this.updateCommodityCategory = {},
      this.modal_update_commoditycategory = false;
    },

    //登记时间
    onStartTimeChange(startTime, type) {
          this.endTimeOption = {
            disabledDate(endTime) {
              return endTime < new Date(startTime)
            }
          }
          this.searchCommodityCategoryByCondition();
        },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onEndTimeChange() {
        this.startTimeOption = {
          disabledDate() {
            return new Date() < new Date()
          }
        }
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
   .commoditycategorymodalstyle{
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
         width: 455px !important;
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

  //   color:#5aa5ff !important;
  //   font-size: 12px !important;
  //   font-family:"Microsoft YaHei";
  //   line-height: 20px;
  //   .ivu-form .ivu-form-item-label{
  //     color:#5aa5ff !important;
  //     font-size: 12px !important;
  //     font-family:"Microsoft YaHei";
  //     line-height: 20px;
  //   }
  //   .ivu-input-wrapper{
  //     width: 160px;
  //     height: 20px;
  //     vertical-align:baseline;
  //   }
  //   .ivu-select{
  //     width: 160px;
  //     height: 20px;
  //     vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
  //   }
  //   .ivu-tabs-nav .ivu-tabs-tab-active{
  //     background-color: white !important;
  //     font-size: 20px;
  //     border-radius: 8px;
  //   }
  //   .ivu-tabs-ink-bar{
  //     background-color: #fff;
  //   }
  //   .ivu-tabs-nav .ivu-tabs-tab{
  //     font-size: 14px;
  //     background-color: #f3f3f3;
  //   }
  //   .ivu-tabs-nav-scroll{
  //     background-color: #f3f3f3;
  //   }
  //   .ivu-input{
  //     border:1px solid #888888;
  //   }
  //   .ivu-input-number{
  //     width: 160px;
  //     border:1px solid #888888;
  //   }
  //   .ivu-select-selection{
  //     border:1px solid #888888;
  //   }
  //   .ivu-table-overflowY {
  //     overflow-y: scroll;
  //   }
  //  .ivu-table-tbody{
  //    font-size: 12px;
  //    color:#999;
  //    font-family:"Microsoft YaHei";
  //    line-height: 50px;
  //    vertical-align: middle;
  //  }
  //  .ivu-table td{
  //    background-color:#fff;
  //  }
  //  .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
  //    background-color: #f9f9f9;
  //  }
   // .ivu-input-icon{
   //      position: absolute;
   //      right:5px;
   //  }
  //  .ivu-input-icon-normal+.ivu-input{
  //    width: 160px;
  //  }
  }
  .commoditycategory{
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
       line-height: 40px;
       vertical-align: middle;
     }
     .warehouseinfotable{
     .ivu-table td{
       background-color:#fff;
       height: 40px;
     }
     .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
       background-color: #f9f9f9;
        height: 40px;
     }
   }
     .ivu-input-icon{
          position: absolute;
          right:45px;
      }
     .ivu-input-icon-normal+.ivu-input{
       width: 120px;
     }
     .commoditycategoryPage{
       .ivu-select-selection{
         bottom: 6px;
       }
     }
  }
</style>
