<template lang="html">
  <div class="commoditycategory">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="物料号">
            <Input v-model="searchCommodityCategory.materielId" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item>
          <Form-item label="物料品类">
            <Input v-model="searchCommodityCategory.remark2" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item>
          <Form-item label="物料名称" >
            <Input v-model="searchCommodityCategory.materielName" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item>

          <!-- <Form-item label="物料描述" >
            <Input v-model="searchCommodityCategory.materielDescribe" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item> -->
          <!-- <Form-item label="供应商" >
            <Select v-model="searchCommodityCategory.supplier" @on-change="searchCommodityCategoryByCondition" placeholder="请选择" style="width: 160px;text-align:left">
              <Option value="">-所有仓库-</Option>
              <Option v-for=" item in supplierList" :value="item.supplierId" :key="item.supplierId">{{ item.supplierName }}</Option>
            </Select>
          </Form-item> -->
          <!-- <Form-item label="客户" >
            <Input v-model="searchCommodityCategory.remark3" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item> -->

          <!-- <Form-item label="物料类型" >
            <Select v-model="searchCommodityCategory.materielType" clearable placeholder="请选择"
             @on-change="searchCommodityCategoryByCondition">
             <Option value="0">成品</Option>
             <Option value="1">原料</Option>
             <Option value="2">半成品</Option>
            </Select>
          </Form-item> -->

          <Form-item label="包装规格" >
            <Input v-model="searchCommodityCategory.packageStandards" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/>
          </Form-item>
          <Form-item label="默认存储仓库" >
            <!-- <Input v-model="searchCommodityCategory.warehouseName" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/> -->
            <Select v-model="searchCommodityCategory.warehouseId" @on-change="searchCommodityCategoryByCondition" placeholder="请选择" style="width: 160px;text-align:left">
              <Option value="">-所有仓库-</Option>
              <Option v-for=" item in warehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
            </Select>
          </Form-item>
          <Form-item label="默认存储库区" >
            <!-- <Input v-model="searchCommodityCategory.districtName" @on-change="searchCommodityCategoryByCondition"
            placeholder="请输入"/> -->
            <Select v-model="searchCommodityCategory.districtId" @on-change="searchCommodityCategoryByCondition" placeholder="请选择" style="width: 160px;text-align:left">
              <Option value="">-所有库区-</Option>
              <Option v-for=" item in districtList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
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

      <Modal class="commoditycategorymodalstyle" v-model="modal_add_commoditycategory" width="1350" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>添加物料信息</span>
          </p>
          <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>物料号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.materielId" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>境域&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityCategory.remark1" style="text-align:left;" placeholder="请选择">
                      <Option value="0">国产</Option>
                      <Option value="1">进口</Option>
                    </Select>
                  </td>
                  <td>
                    <span style="color:red">*</span>物料品类&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.remark2" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="color:red">*</span>物料名称&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.materielName" style="width: 160px" placeholder="请输入"/>
                  </td>
                </tr>
                <tr>
                  <!-- <td>
                    <span style="color:red">*</span>物料描述&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.materielDescribe" style="width: 160px" placeholder="请输入"/>
                  </td> -->
                  <!-- <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>物料类型&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityCategory.materielType" style="text-align:left;" placeholder="请选择">
                      <Option value="0">成品</Option>
                      <Option value="1">原料</Option>
                      <Option value="2">半成品</Option>
                    </Select>
                  </td> -->

                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>包装规格&nbsp;
                  </td>
                  <td>
                      <Input-number :step="0.10" :min="0"  v-model="insertCommodityCategory.packageStandards" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>计量单位&nbsp;
                  </td>
                  <td>
                      <Select v-model="insertCommodityCategory.unit" style="text-align:left;" placeholder="请选择">
                        <Option value="G">G</Option>
                        <Option value="KG">KG</Option>
                        <Option value="T">T</Option>
                        <Option value="件">件</Option>
                      </Select>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>包装类型&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityCategory.packageType" style="text-align:left;" placeholder="请选择">
                      <Option value="0">箱</Option>
                      <Option value="1">袋</Option>
                      <Option value="2">桶</Option>
                    </Select>
                  </td>
                  <!-- <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>供应商&nbsp;
                  </td>
                  <td>
                      <Select v-model="insertCommodityCategory.supplier"  placeholder="请选择" style="width: 160px;text-align:left">
                        <Option value="">-所有仓库-</Option>
                        <Option v-for=" item in supplierList" :value="item.supplierId" :key="item.supplierId">{{ item.supplierName }}</Option>
                      </Select>
                  </td> -->
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>保质期（天）&nbsp;
                  </td>
                  <td>
                      <Input v-model="insertCommodityCategory.effectiveTime" style="width: 160px" placeholder="请输入"/>
                  </td>
                </tr>
                  <tr>
                  <td style="width:140px">
                    <span style="display:inline-block;color:red;margin-left:40px;">*</span>最大安全库存(T)&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.maxSafetyStock" @on-change="geshihua" id="maxnumber" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td style="width:140px">
                    <span style="display:inline-block;color:red;margin-left:40px;">*</span>最小安全库存(T)&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityCategory.minSafetyStock"@on-change="geshihua1" style="width: 160px" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>默认存储仓库&nbsp;
                  </td>
                  <td>
                      <Select v-model="insertCommodityCategory.warehouseId" @on-change="addItemTypeInit" placeholder="请选择" style="width: 160px;text-align:left">
                        <Option v-for=" item in warehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
                      </Select>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>默认存储库区&nbsp;
                  </td>
                  <td>
                      <Select v-model="insertCommodityCategory.districtId"  placeholder="请选择" style="width: 160px;text-align:left">
                        <Option v-for=" item in insertDistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
                      </Select>
                  </td>
                </tr>
                <tr>
                  <!-- <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>客户&nbsp;
                  </td>
                  <td>
                      <Input v-model="insertCommodityCategory.remark3" style="width: 160px" placeholder="请输入"/>
                  </td> -->

                <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityCategory.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
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
                <span style="color:red">*</span>物料号&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.materielId" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>境域&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityCategory.remark1" style="text-align:left;" placeholder="请选择">
                  <Option value="0">国产</Option>
                  <Option value="1">进口</Option>
                </Select>
              </td>
              <td>
                <span style="color:red">*</span>物料品类&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.remark2" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
                <span style="color:red">*</span>物料名称&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.materielName" style="width: 160px" placeholder="请输入"/>
              </td>
            </tr>
            <tr>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>包装规格&nbsp;
              </td>
              <td>
                  <Input-number :step="0.10" :min="0" v-model="updateCommodityCategory.packageStandards" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>计量单位&nbsp;
              </td>
              <td>
                  <Select v-model="updateCommodityCategory.unit" style="text-align:left;" placeholder="请选择">
                    <Option value="G">G</Option>
                    <Option value="KG">KG</Option>
                    <Option value="T">T</Option>
                    <Option value="件">件</Option>
                  </Select>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>包装类型&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityCategory.packageType" style="text-align:left;" placeholder="请选择">
                  <Option value="0">箱</Option>
                  <Option value="1">袋</Option>
                  <Option value="2">桶</Option>
                </Select>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>保质期（天）&nbsp;
              </td>
              <td>
                  <Input v-model="updateCommodityCategory.effectiveTime" style="width: 160px" placeholder="请输入"/>
              </td>
            </tr>
              <tr>

              <td style="width:140px">
                <span style="display:inline-block;color:red;margin-left:40px;">*</span>最大安全库存(T)&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.maxSafetyStock" @on-change="geshihua2" id="maxnumber" style="width: 160px" placeholder="请输入"/>
              </td>
              <td style="width:140px">
                <span style="display:inline-block;color:red;margin-left:40px;">*</span>最小安全库存(T)&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityCategory.minSafetyStock"@on-change="geshihua3" style="width: 160px" placeholder="请输入"/>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>默认存储仓库&nbsp;
              </td>
              <td>
                  <Select v-model="updateCommodityCategory.warehouseId" @on-change="updateItemTypeInit" placeholder="请选择" style="width: 160px;text-align:left">
                    <Option value="">-所有仓库-</Option>
                    <Option v-for=" item in warehouseList" :value="item.warehouseId" :key="item.warehouseId">{{ item.warehouseName }}</Option>
                  </Select>
              </td>
              <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>默认存储库区&nbsp;
              </td>
              <td>
                  <Select v-model="updateCommodityCategory.districtId"  placeholder="请选择" style="width: 160px;text-align:left">
                    <Option value="">-所有库区-</Option>
                    <Option v-for=" item in updateDistrictList" :value="item.districtId" :key="item.districtId">{{ item.districtName }}</Option>
                  </Select>
              </td>
            </tr>
            <tr>
              <!-- <td>
                <span style="display:inline-block;color:red;margin-left:50px;">*</span>客户&nbsp;
              </td>
              <td>
                  <Input v-model="updateCommodityCategory.remark3" style="width: 160px" placeholder="请输入"/>
              </td> -->

            <td style="display:inline-block;margin-bottom:12px;">
              备注&nbsp;
            </td>
            <td>
              <Input v-model="updateCommodityCategory.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
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
import Vue from 'vue'
import $ from 'jquery'
import router from '../../router'
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
      updateDistrictList:[],
      insertDistrictList:[],
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
          {title: '物料号', key: 'materielId',width: 150, align: 'center'},
          {title: '境域', key: 'remark1',width: 100, align: 'center',
         render:(h,params)=>{
             let isstart = '';
             if(params.row.remark1 == '0'){
               isstart = '国产';
             }else if(params.row.remark1 == '1'){
               isstart = '进口';
             }
             return h('div',isstart);
           }},
           {title: '物料品类', key: 'remark2',width: 100, align: 'center'},
          {title: '物料名称', key: 'materielName',width: 150, align: 'center'},
          // {
          //     title: '物料类型',
          //     key: 'materielType',width: 100,
          //      align: 'center',
          //     render:(h,params)=>{
          //         let isstart = '';
          //         if(params.row.materielType == '1'){
          //           isstart = '原料';
          //         }else if(params.row.materielType == '0'){
          //           isstart = '成品';
          //         }else{
          //           isstart = '半成品';
          //         }
          //         return h('div',isstart);
          //       }
          // },
          {
              title: '包装规格',
              key: 'packageStandards',width: 100,
             align: 'center',
          },
          {title: '计量单位', key: 'unit', width: 100,align: 'center'},
            {title: '包装类型', key: 'packageType',width: 150, align: 'center',
           render:(h,params)=>{
               let packageType = '';
               if(params.row.packageType == '0'){
                 packageType = '箱';
               }else if(params.row.packageType == '1'){
                 packageType = '袋';
               }else{
                 packageType = '桶';
               }
               return h('div',packageType);
             }},
              {title: '保质期(天)', key: 'effectiveTime', width: 100,align: 'center'},
                // {title: '供应商', key: 'supplier',width: 150, align: 'center'},
                  // {title: '客户', key: 'remark3',width: 150, align: 'center'},
          {title: '最大安全库存（T）', key: 'maxSafetyStock',width: 150, align: 'center'},
          {title: '最小安全库存(T)', key: 'minSafetyStock', width: 150,align: 'center'},
          {title: '默认存储仓库', key: 'warehouseName', width: 150,align: 'center', render:(h,params)=>{
              let redjsh = this.warehouseList.find(item=>{
                return item.warehouseId==params.row.warehouseId
              }).warehouseName
                return h('div',redjsh);
            }},
            {title: '默认存储库区', key: 'districtName',width: 150, align: 'center', render:(h,params)=>{
                let redjsh = this.districtList.find(item=>{
                  return item.districtId==params.row.districtId
                }).districtName
                  return h('div',redjsh);
              }},
              {title: '备注', key: 'remark',width: 150, align: 'center'},
          // {
          //     title: '删除标记',
          //     key: 'isdelete',
          //      align: 'center',
          //     render:(h,params)=>{
          //       let isstart = '';
          //       if(params.row.isdelete == '1'){
          //         isstart = '是';
          //       }else{
          //         isstart = '否';
          //       }
          //       return h('div',isstart);
          //     }
          // },


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
      this.updateDistrictList = res.data.districtInfos
      this.insertDistrictList = res.data.districtInfos
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
    addItemTypeInit(){
      this.insertDistrictList = []
      this.districtList.forEach(item => {
         if (item.warehouseId == this.insertCommodityCategory.warehouseId) {
           if (item.isStart == '1') {
              this.insertDistrictList.push(item)
           }
         }
       })
    },
    updateItemTypeInit(){
      this.updateDistrictList = []
      this.districtList.forEach(item => {
         if (item.warehouseId == this.updateCommodityCategory.warehouseId) {
           if (item.isStart == '1') {
              this.updateDistrictList.push(item)
           }
         }
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
      this.insertCommodityCategory = {packageStandards:null}
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
      if(this.deleteCommodityCategory.length==0){
        this.delete_confirm = false;
        this.$Message.info('请先勾选需要删除项');
      }else{
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
      if(this.insertCommodityCategory.maxSafetyStock == undefined ||
      this.insertCommodityCategory.minSafetyStock == undefined ||
      this.insertCommodityCategory.materielId == undefined ||
      this.insertCommodityCategory.effectiveTime == undefined ||
      this.insertCommodityCategory.packageStandards == undefined ||
      this.insertCommodityCategory.materielId == '' ||
      this.insertCommodityCategory.packageStandards == '' ||
      this.insertCommodityCategory.minSafetyStock == '' ||
      this.insertCommodityCategory.maxSafetyStock == ''||
      this.insertCommodityCategory.effectiveTime == ''){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
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
              duration:5
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
      this.updateDistrictList = []
      this.districtList.forEach(item => {
         if (item.warehouseId == this.updateCommodityCategory.warehouseId) {
           if (item.isStart == '1') {
              this.updateDistrictList.push(item)
           }
         }
       })
    },
    update () {
      if(!this.clickSt){
        return
      }
      if(this.updateCommodityCategory.maxSafetyStock == undefined ||
      this.updateCommodityCategory.minSafetyStock == undefined ||
      this.updateCommodityCategory.materielId == undefined ||
      this.updateCommodityCategory.effectiveTime == undefined ||
      this.updateCommodityCategory.packageStandards == undefined ||
      this.updateCommodityCategory.materielId == '' ||
      this.updateCommodityCategory.packageStandards == '' ||
      this.updateCommodityCategory.minSafetyStock == '' ||
      this.updateCommodityCategory.effectiveTime == '' ||
      this.updateCommodityCategory.maxSafetyStock == ''){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
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
