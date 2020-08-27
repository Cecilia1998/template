<template lang="html">
  <div class="itemtype">
    <Form :label-width="120" inline style="text-align:left;">
      <div>
          <Form-item label="商品编号">
            <Input v-model="searchItemType.goodsid" @on-change="searchItemTypeByCondition" placeholder="请输入" />
          </Form-item>
          <Form-item label="商品名称" >
            <Input v-model="searchItemType.goodsname" @on-change="searchItemTypeByCondition" placeholder="请输入" />
          </Form-item>
          <Form-item label="商品种类名称" >
            <Input v-model="searchItemType.goodscategoryname" @on-change="searchItemTypeByCondition" placeholder="请输入" />
          </Form-item>
          <Form-item label="大分类名称" >
            <Input v-model="searchItemType.largeclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入" />
          </Form-item>
          <Form-item label="中分类名称" >
            <Input v-model="searchItemType.middleclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入" />
          </Form-item>
          <Form-item label="小分类名称">
            <Input v-model="searchItemType.littleclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="细分类名称" >
            <Input v-model="searchItemType.fineclassificationname" @on-change="searchItemTypeByCondition" placeholder="请输入"/>
          </Form-item>
          <Form-item label="是否启用" >
            <Select v-model="searchItemType.isstart" clearable @on-change="searchItemTypeByCondition" placeholder="请选择"
            style="text-align:left;">
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
                @on-change="onEndTimeChange" :options="endTimeOption" :editable="false"></DatePicker>
              </td>
            </tr>
          </Form-item>
      </div>
    </Form>
    <Row>
      <Col span="24" style="display:flex;justify-content:space-between">
        <div class="" >
          <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="delete_confirm=true"
          style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
          <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
          style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
        </div>
        <div class="">
          <Button type="primary" shape="circle" @click="update"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">提&nbsp;&nbsp;交</Button>

          <Button type="primary" shape="circle" @click="showaddmodal"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;margin-left:6.66px">新&nbsp;&nbsp;增</Button>
        </div>
      </Col>
    </Row>

    <br>

    <Table stripe border height=520 :columns="tableColumns.card" :data="itemTypeShow" @on-selection-change="onSelectionChange"></Table>
    <br>
    <div class="page">
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

    <Modal class="itemtypemodalstyle" v-model="modal_add_itemtype" width="600" :mask-closable='false' closable>
        <p slot="header" style="text-align:center">
            <span>添加商品明细</span>
        </p>
        <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>商品编号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertItemType.goodsid" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:50px;">*</span>商品名称&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertItemType.goodsname"  placeholder="请输入" />
                  </td>
              </tr>

              <tr>
                <td>
                  <span style="color:red">*</span>商品种类名称&nbsp;
                </td>
                <td>
                  <Select v-model="insertItemType.goodscategoryname" clearable placeholder="请选择"
                  style="text-align:left;">
                    <Option v-for="(goodscategoryname,key) in goodsCategoryName" :key="key" :value="goodscategoryname.goodscategoryname">
                    {{goodscategoryname.goodscategoryname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="display:inline-block;color:red;margin-left:50px;">*</span>是否启用&nbsp;
                </td>
                <td>
                  <Select v-model="insertItemType.isstart" @on-change="searchItemTypeByCondition"
                  style="text-align:left;">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red">*</span>大分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="insertItemType.largeclassificationname" clearable placeholder="请选择"
                  style="text-align:left;" @on-change="getMiddleCommodityClassification" @on-clear="clearAll">
                    <Option v-for="(largeclassificationname,key) in largeClassificationName" :key="key"
                    :value="largeclassificationname.largeclassificationname">{{largeclassificationname.largeclassificationname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="display:inline-block;color:red;margin-left:50px;">*</span>中分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="insertItemType.middleclassificationname" clearable placeholder="请选择"
                  style="text-align:left;" @on-change="getLittleCommodityClassification" @on-clear="clear23">
                    <Option v-for="(middleclassificationname,key) in middleClassificationName" :key="key"
                    :value="middleclassificationname.middleclassificationname">{{middleclassificationname.middleclassificationname}}</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red">*</span>小分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="insertItemType.littleclassificationname" clearable placeholder="请选择"
                  style="text-align:left;" @on-change="getFineCommodityClassification" @on-clear="clear3">
                    <Option v-for="(littleclassificationname,key) in littleClassificationName" :key="key"
                    :value="littleclassificationname.littleclassificationname">{{littleclassificationname.littleclassificationname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="display:inline-block;color:red;margin-left:50px;">*</span>细分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="insertItemType.fineclassificationname" clearable placeholder="请选择"
                  style="text-align:left;width: 160px;">
                    <Option v-for="(fineclassificationname,key) in fineClassificationName" :key="key"
                    :value="fineclassificationname.fineclassificationname">{{fineclassificationname.fineclassificationname}}</Option>
                  </Select>
                </td>
              </tr>
              <tr>
               <td>
                 <span style="color:red">*</span>库存上限&nbsp;
               </td>
               <td>
                 <InputNumber :max="100000000" :min="1" v-model="insertItemType.remark1"></InputNumber>
               </td>
               <td>
                 <span style="display:inline-block;color:red;margin-left:50px;">*</span>库存下限&nbsp;
               </td>
               <td>
                 <InputNumber :max="100000000" :min="0" v-model="insertItemType.remark2"></InputNumber>
               </td>
             </tr>
             <tr>
               <td>
                 <span style="color:red">*</span>登记时间&nbsp;
               </td>
               <td>
                 <DatePicker v-model="insertItemType.registertime" type="datetime" placeholder="请选择"
                 style="color: black;text-align:right;"></DatePicker>
               </td>
               <!-- <td>
                 备注&nbsp;
               </td>
               <td>
                 <Input v-model="insertItemType.remark" placeholder="请输入" />
               </td> -->
             </tr>
             <tr>
               <td style="display:inline-block;margin-bottom:12px;">
                 备注&nbsp;
               </td>
               <td>
                 <Input v-model="insertItemType.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
               </td>
             </tr>
          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="save"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
    </Modal>

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
      modal_add_itemtype:false,
      delete_confirm:false,
      deleteButtonFlag:true,
      itemType:[],
      goodsCategoryName:[],
      largeClassificationName:[],
      middleClassificationName:[],
      littleClassificationName:[],
      fineClassificationName:[],
      itemTypeShow:[],
      deleteItemType:[],
      startTimeOption: {},
      endTimeOption: {},
      insertItemType:{isstart:'0'},
      searchItemType:{},
      searchModel:{identification:'0'},
      tableColumns: {
        card: [
          {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
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
          // {title: '规格', key: 'capacity', align: 'center'},
          {title: '库存上限',key: 'remark1',width: 150,align: 'center', render: (h, params) => {
             return h('div',[
               h('InputNumber',{
                 props: {
                    'value':+this.itemTypeShow[params.row._index].remark1,
                    'max':100000000,
                    'min':1
                   },
               on:{
                  'on-change':(event)=> {
                    params.row.remark1 = event
                    this.itemTypeShow[params.row._index] = params.row
                   }
                 }
                }
               )]);
             }},
          {title: '库存下限',key: 'remark2',width: 150,align: 'center', render: (h, params) => {
              return h('div',[
                h('InputNumber',{
                  props: {
                     'value':+this.itemTypeShow[params.row._index].remark2,
                     'min':0,
                     'max':100000000
                    },
                on:{
                   'on-change':(event)=> {
                     params.row.remark2 = event
                     this.itemTypeShow[params.row._index] = params.row
                    }
                  }
                 }
              )]);
          }}
        ],
      }
    }
  },

  created(){
    axios.get(sessionStorage.http+`/getAllItemType?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`)
    .then((result) => {
      this.itemTypeShow=result.data.data.list
      this.goodsCategoryName=result.data.data1
      this.total=result.data.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })

    axios.post(sessionStorage.http+`/getCommodityClassification?loginStatus=${sessionStorage.loginStatus}`,this.searchModel)
    .then((result) => {
      this.largeClassificationName=result.data
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },

  computed:{},

  methods:{
    showaddmodal(){
      this.insertItemType={isstart:'0'};
      var myDate = new Date();
      this.insertItemType.registertime = myDate.toLocaleString('chinese', { hour12: false });
      this.modal_add_itemtype=true;
    },
    searchItemTypeByCondition(){
      axios.post(sessionStorage.http+`/getItemTypeByCondition?pageNum=1&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.searchItemType)
        .then((result) => {
          this.itemTypeShow=result.data.list
          this.total=result.data.total
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
    },

    getMiddleCommodityClassification(){
      this.searchModel.identification = '1',
      this.searchModel.largeclassificationname = this.insertItemType.largeclassificationname,
      axios.post(sessionStorage.http+`/getCommodityClassification?loginStatus=${sessionStorage.loginStatus}`,this.searchModel)
      .then((result) => {
        this.middleClassificationName=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    getLittleCommodityClassification(){
      this.searchModel.identification = '2',
      this.searchModel.middleclassificationname = this.insertItemType.middleclassificationname,
      axios.post(sessionStorage.http+`/getCommodityClassification?loginStatus=${sessionStorage.loginStatus}`,this.searchModel)
      .then((result) => {
        this.littleClassificationName=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    getFineCommodityClassification(){
      this.searchModel.identification = '3',
      this.searchModel.littleclassificationname = this.insertItemType.littleclassificationname,
      axios.post(sessionStorage.http+`/getCommodityClassification?loginStatus=${sessionStorage.loginStatus}`,this.searchModel)
      .then((result) => {
        this.fineClassificationName=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    clearAll(){
      this.middleClassificationName = [],
      this.littleClassificationName = [],
      this.fineClassificationName = [],
      this.insertItemType.middleclassificationname = '',
      this.insertItemType.littleclassificationname = '',
      this.insertItemType.fineclassificationname = ''
    },

    clear23(){
      this.littleClassificationName = [],
      this.fineClassificationName = [],
      this.insertItemType.littleclassificationname = '',
      this.insertItemType.fineclassificationname = ''
    },

    clear3(){
      this.fineClassificationName = [],
      this.insertItemType.fineclassificationname = ''
    },

    onSelectionChange (row) {
      if(row.length > 0){
        this.deleteItemType = row
        this.deleteButtonFlag = false
      }else {
        this.deleteItemType = []
        this.deleteButtonFlag = true
      }
    },

    deleteSelection(){
      if(this.deleteItemType.length==0){
        this.delete_confirm = false;
        this.$Message.info('请先勾选需要删除项');
      }else{
        axios.post(sessionStorage.http+`/deleteItemType?pageNum=${this.pageNum}&pageSize=${this.pageSize}
          &loginStatus=${sessionStorage.loginStatus}`,this.deleteItemType,this.searchItemType)
        .then((result) => {
          this.itemTypeShow=result.data.list
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
      axios.post(sessionStorage.http+`/getItemTypeByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchItemType)
      .then((result) => {
        this.itemTypeShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    handleChangePageSize(value){
      this.pageSize = value
      this.pageNum = 1
      axios.post(sessionStorage.http+`/getItemTypeByCondition?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.searchItemType)
      .then((result) => {
        this.itemTypeShow=result.data.list
        this.total=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    // id_veri(){
    //   if(this.insertItemType.supplierid == undefined){
    //     this.$Message.error('供应商编号不能为空');
    //     return;
    //   }
    //   for(var i = 0;i < this.itemType.length;i++){
    //     if(this.supplierNameInfo[i].supplierid == this.insertItemType.supplierid){
    //       this.$Message.error('id重复，请换个id试一哈');
    //       return;
    //     }
    //   }
    // },

    save () {
      if(!this.clickSt){
        return
      }
      if(this.insertItemType.goodsid == undefined || this.insertItemType.goodsname == undefined ||
      this.insertItemType.goodscategoryname == undefined || this.insertItemType.largeclassificationname == undefined ||
      this.insertItemType.middleclassificationname == undefined || this.insertItemType.littleclassificationname == undefined ||
      this.insertItemType.fineclassificationname == undefined || this.insertItemType.registertime == undefined ||
      this.insertItemType.remark1 == undefined || this.insertItemType.goodsid == '' ||
      this.insertItemType.goodsname == '' || this.insertItemType.goodscategoryname == '' ||
      this.insertItemType.largeclassificationname == '' || this.insertItemType.middleclassificationname == '' ||
      this.insertItemType.littleclassificationname == '' || this.insertItemType.fineclassificationname == '' ||
      this.insertItemType.registertime == '' || this.insertItemType.remark1 == ''){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

      axios.get(sessionStorage.http+`/judItemTypeRepeat?goodsid=${this.insertItemType.goodsid}`)
        .then((result) => {
          if(result.data=='1'){
            this.$Message.error({
              content:'商品编号不可重复',
              duration:5
            });
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)
          }else{
            // let ls = JSON.parse(JSON.stringify(this.insertItemType.registertime))
            // console.log(ls)
            this.insertItemType.registertime = this.insertItemType.registertime.getTime()+'';
            axios.post(sessionStorage.http+`/insertItemType?pageNum=${this.pageNum}&pageSize=${this.pageSize}
              &loginStatus=${sessionStorage.loginStatus}`,this.insertItemType)
            .then((result) => {
              this.itemTypeShow=result.data.list
              this.total=result.data.total
              this.modal_add_itemtype = false;
              this.$Message.success('供应商信息已添加');
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

    update () {
      axios.post(sessionStorage.http+`/updateItemType?pageNum=${this.pageNum}&pageSize=${this.pageSize}
        &loginStatus=${sessionStorage.loginStatus}`,this.itemTypeShow)
      .then((result) => {
        this.itemTypeShow=result.data.list
        this.total=result.data.total
        this.$Message.success('供应商信息修改成功');
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
  .itemtypemodalstyle{

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
        width: 445px !important;
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
          width: 160px;
          border:0 none;
        }
        // .ivu-input-number{
        //   border:0 none;
        // }
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
    // .ivu-input-number{
    //   width: 160px;
    //   border:1px solid #888888;
    // }
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
  .itemtype{
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
   .page{
     .ivu-select-selection{
       bottom: 6px
     }
   }
  }
</style>
