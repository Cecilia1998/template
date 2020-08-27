<template lang="html">
  <div class="addOrder">
  <Modal v-model="addout" title="仓库信息详情" okText="确定" cancel-text='取消' @on-ok="submit" @on-cancel="cancel" :loading="loading" width='1300px' style="height:500px;">
    <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
      <div style="text-align:left;"><font color="#59a6fe" size="2px">&nbsp;&nbsp;出库单管理:出库单明细编辑</font></div>
      <div>&nbsp;</div>
      <Row>
        <i-col span="5">
          <Form-item label="出库单号" class="formitem">
            <font color="red" class="font4">*</font>
            <Input v-model="formFilter.outorderid" style="width:140px" @on-keyup="checkOrderId" element-id='outorderid'/>
          </Form-item>
        </i-col>
        <i-col span="4">
          <Form-item label="出库类型" class="formitem">
            <font color="red" class="font4">*</font>
            <Select v-model="formFilter.ordertype" placeholder="请选择" @on-change="" style="width:140px">
              <Option value="">-所有出库类型-</Option>
              <Option v-for="item in taskList" :value="item.taskid" :key="item.taskid">{{ item.typename }}</Option>
            </Select>
          </Form-item>
        </i-col>
        <i-col span="5">
          <Form-item label="客户" class="formitem">
            <font color="red" class="font2">*</font>
            <Select v-model="formFilter.customerid" placeholder="请选择" @on-change="selectCustomer" v-bind:disabled="cusIsAble" style="width:140px">
              <Option value="">-所有客户-</Option>
              <Option v-for=" item in customerList" :value="item.customerid" :key="item.customerid">{{ item.customername }}</Option>
            </Select>
          </Form-item>
        </i-col>
        <i-col span="5">
          <Form-item label="供应商" class="formitem">
            <font color="red" class="font3">*</font>
            <Select v-model="formFilter.suppliermanagementid" placeholder="请选择" @on-change="selectSupplier" v-bind:disabled="supIsAble" style="width:140px">
              <Option value="">-所有供应商-</Option>
              <Option v-for="item in supplierList" :value="item.supplierid" :key="item.supplierid">{{ item.suppliername }}</Option>

            </Select>
          </Form-item>
        </i-col>
        <i-col span="5">
          <Form-item label="出库总数" class="formitem">
            <font color="red" class="font4">*</font>
            <Input v-model="formFilter.quantity" style="width:140px" readonly element-id="reqquantity"/>
          </Form-item>
        </i-col>
      </Row>
      <Row>
        <i-col span="5">
          <Form-item label="创建人" class="formitem">
            <font color="red" class="font3">*</font>
            <Input v-model="formFilter.creatorid" style="width:140px" disabled/>
          </Form-item>
        </i-col>
        <i-col span="4">
          <Form-item label="创建时间" class="formitem">
            <font color="red" class="font4">*</font>
            <Date-picker type="date" placement="bottom-end" style="width:140px" @on-change='getCreatDate' readonly v-model="formFilter.placedate"></Date-picker>
          </Form-item>
        </i-col>
        <i-col span="5">
          <Form-item label="状态" class="formitem">
            <font color="red" class="font2">*</font>
            <Input v-model="formFilter.orderstatus" disabled style="width:140px"/>
          </Form-item>
        </i-col>
        <i-col span="5">
          <Form-item label="出库申请部门" class="formitem">
            <Select v-model="formFilter.department" placeholder="请选择" @on-change="" style="width: 140px">
              <Option value="">-所有部门-</Option>
              <Option v-for=" item in deptList" :value="item.sectorname" :key="item.sectorname">{{ item.sectorname }}</Option>
            </Select>
          </Form-item>
        </i-col>
        <i-col span="5">
          <Form-item label="备注" class="formitem">
            <Input v-model="formFilter.remark" style="width:140px"/>
          </Form-item>
        </i-col>
      </Row>
      <Row>
        <i-col span="21">
          <Form-item label="新增行数" class="formitem">
            <font color="red" class="font4">*</font>
            <Input-number style="width:140px" v-model="formFilter.addNo" :max="10" :min="1" :value="1"></Input-number>
          </Form-item>
        </i-col>
        <Col span="3">
          &nbsp;&nbsp;&nbsp;
          <Button shape="circle" @click="addDetail" type="primary" style="width:100px"><font color="white">新增</font></Button>
        </Col>
      </Row>
      <Row>
        <Button v-if="deleteButtonFlag2==true" disabled shape="circle" @click="delete_confirm2=true" style="width:100px"><font color="grey">删除选中项</font></Button>
        <Button v-if="deleteButtonFlag2==false" shape="circle" @click="delete_confirm2=true" style="width:100px"><font color="red">删除选中项</font></Button>
      </Row>
    </Form>
    <Table :loading="loadingTable" style="margin-top:20px;" ref="selection" :columns="tableColumnsAdd.card" :data="tableColumnsAdd.data" @on-selection-change="onSelectionChangeOutOrderLine1">
    </Table>

    <br/>
    <Modal v-model="delete_confirm2" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span style="font-size:22px">确定要删除吗？</span>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteSelectionLine">确定删除</Button>
      </div>
    </Modal>

  </Modal>
  </div>
</template>

<script>
  export default {}
</script>


<script>
  import axios from 'axios'
  import iview from 'view-design'
  import router from '../router'
  // import FilterBar from '@/components/FilterBar'
  // import List from '@/components/List'
  // import {mapActions, mapGetters} from 'vuex'
  export default {
    components: {
      // FilterBar,
      // List
    },
    data() {
      return {
        taskList: [
          {
            taskid: '',
            typename: ''
          }
        ],
        deleteOutOrderInfo2: [],
        deleteButtonFlag2: true,
        delete_confirm2: false,
        customerList: [
          {
            customerid: '',
            customername: ''
          }
        ],
        supplierList: [
          {
            supplierid: '',
            suppliername: ''
          }
        ],
        deptList: [
          {
            sectorid: '',
            sectorname: ''
          }
        ],
        order: {
          // order:formFilter,
          // orderdetail:tableColumns.data
        },
        cusIsAble: false,
        supIsAble: false,
        loading: true,
        loadingTable: false,
        // total:0,
        addout: false,
        formFilter: {
          // cur_page:1
        },
        lDetail: 1,
        // definePageSize:10,
        tableColumnsAdd: {
          card: [
            {title: '选择', key: 'select', type: 'selection', width: 60, align: 'center', fixed: 'left'},
            {title: '序号', key: 'lineno', width: 100, fixed: 'left', align: 'center'},
            {
              title: '商品编号', key: 'itemcode', width: 200, align: 'center', render: (h, params) => {
                return h('div', [
                  h('Input', {
                      props: {
                        //将单元格的值给Input
                        value: params.row.itemcode,
                        'element-id': "itemcode_" + this.tableColumnsAdd.data[params.index].lineno
                      },
                      on: {
                        'on-change': (event) => {
                          //值改变时
                          //将渲染后的值重新赋值给单元格值
                          // .value 对应上面传值的value
                          params.row.itemcode = event.target.value;
                          this.tableColumnsAdd.data[params.index] = params.row;
                        },
                        'on-blur': (e) => {
                          if(this.tableColumnsAdd.data[params.index].itemcode != ""){
                          axios.post(sessionStorage.http + '/getGoodOfCSC', {order: this.formFilter, lineList: [this.tableColumnsAdd.data[params.index]]})
                            .then((res) => {
                              console.log(res.data)
                              if (res.data != null) {
                                params.row.itemname = res.data.goodsname;
                                this.tableColumnsAdd.data[params.index] = params.row;
                              } else {
                                iview.Message.error({
                                  content: '入库单客户或者供应商,未绑定该商品',
                                  duration: 5
                                });
                              }
                            })
                            .catch((err) => {
                              iview.Message.error({
                                content: err.message,
                                duration: 5
                              });
                            })
                        }}
                      }
                    }
                  )]);
              }
            },
            {title: '商品名称', key: 'itemname', width: 200, align: 'center'},
            {
              title: '单位', key: 'invUomCode', width: 200, align: 'center', render: (h, params) => {
                return h('div', [
                  h('Input', {
                      props: {
                        //将单元格的值给Input
                        value: params.row.invUomCode,
                      },
                      on: {
                        'on-change': (event) => {
                          // alert(params.row.itemcode)
                          //alert(this.tableColumns.data[params.index]);
                          //值改变时
                          //将渲染后的值重新赋值给单元格值
                          params.row.invUomCode = event.target.value;
                          this.tableColumnsAdd.data[params.index] = params.row;
                          //  alert(this.tableColumns.data[params.index].itemcode);
                        }
                      }
                    }
                  )]);
              }
            },   //新增
            {
              title: '出库数量', key: 'reqquantity', width: 200, align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Input', {
                      props: {
                        value: params.row.reqquantity,
                        'element-id': 'quantity_' + this.tableColumnsAdd.data[params.index].lineno
                      },
                      on: {
                        'on-change': (event) => {
                          params.row.reqquantity = event.target.value;
                          this.tableColumnsAdd.data[params.index] = params.row;
                          this.countTotal();
                        },
                        'on-keyup': (e) => {
                          var value = e.target.value.replace(/\D/g, '');
                          params.row.reqquantity = value;
                          this.tableColumnsAdd.data[params.index] = params.row;
                          document.getElementById('quantity_' + this.tableColumnsAdd.data[params.index].lineno).value = value;
                        }

                      }

                    }
                  )]);
              }
            },          //新增
            {
              title: '备注', key: 'remark', width: 300, align: 'center', render: (h, params) => {
                return h('div', [
                  h('Input', {
                      props: {
                        value: params.row.remark,
                      },
                      on: {
                        'on-change': (event) => {
                          params.row.remark = event.target.value;
                          this.tableColumns.data[params.index] = params.row;
                        }
                      }
                    }
                  )]);
              }
            },          //新增
          ],
          // 不要给默认值
          data: []
        }

      }
    },
    created() {
      Array.prototype.indexOfData = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i].lineno == val) return i;
        }
        return -1;
      },
        Array.prototype.remove = function (val) {
          var index = this.indexOfData(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        },
        this.initFormatter(),
        // console.log(sessionStorage)
        //this.$router.history.current.path为当前网页的路径
        //查询供应商
        axios.post( '/getOutnOrderLineInit')
          .then((res) => {
            // console.log(res)
            this.taskList = res.taskTypes;
            this.customerList = res.customerInfos;
            this.supplierList = res.supplierManagements;
            this.deptList = res.department;
          })
          .catch((err) => {
            iview.Message.error({
              content: err.message,
              duration: 5
            });
          })
    },

    computed: {},
    methods: {
      //得到时间
      getCreatDate(placedate) {
        this.formFilter.placedate = changeDate(placedate);
        // console.log(createdate);
      },
      // 修改时间样式
      changeDate(dateA) {
        var dateee = new Date(dateA).toJSON();
        var date = new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return date;
      },
      show() {
        console.log('可以了')
        this.supIsAble = false;
        this.cusIsAble = false;
        // this.formFilter = {};
        this.formFilter.creatorid = '王星';
        this.formFilter.orderstatus = '申请';
        this.formFilter.addNo = 1;
        this.formFilter.placedate = new Date();
        this.addout = true
      },
      // 客户/供应商,有且只有显示一个
      selectSupplier() {
        if (this.formFilter.suppliermanagementid != undefined) {
          this.cusIsAble = true;
        } else {
          this.cusIsAble = false;
        }
      },
      // 只能输入数字-校验入库单号
      checkOrderId(e) {
        var value = e.target.value.replace(/[^\w\.\/]/ig, '');
        document.getElementById(e.target.id).value = value;
      },
      deleteSelectionLine() {
        if (this.deleteOutOrderInfo2.length == 0) {
          this.delete_confirm2 = false;
          this.$Message.info('请先勾选需要删除项');
        } else {
          console.log(this.tableColumnsAdd.data)
          console.log(this.deleteOutOrderInfo2)
          for (var i in this.deleteOutOrderInfo2) {
            // console.log('i='+i);
            this.tableColumnsAdd.data.remove(this.deleteOutOrderInfo2[i].lineno);
            // console.log(this.tableColumnsAdd.data)
          }
          console.log(this.tableColumnsAdd.data)
          this.delete_confirm2 = false;
          this.deleteButtonFlag2 = true;
          for (var j in this.tableColumnsAdd.data) {
            this.tableColumnsAdd.data[j].lineno = +j + 1;
          }
          this.$Message.success('删除成功');
        }
      },
      onSelectionChangeOutOrderLine1(row1) {
        this.deleteOutOrderInfo2 = row1
        console.log(this.deleteOutOrderInfo2.length)
        if (this.deleteOutOrderInfo2.length > 0) {
          this.deleteButtonFlag2 = false
        } else {
          this.deleteButtonFlag2 = true
        }
        console.log(this.deleteOutOrderInfo2)
      },
      initFormatter() {
        Date.prototype.Format = function (fmt) { //
          let o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
          };
          if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        }
      },
      selectCustomer() {
        //console.log(this.formFilter.customerid);
        if (this.formFilter.customerid != undefined) {
          this.supIsAble = true;
        } else {
          this.supIsAble = false;
        }
        // if(this.formFilter.customerid != undefined&&this.params.row.itemcode!=undefined){
        //   axios.post('http://localhost:8088/addOutOrder',{order:this.formFilter,lineList:this.tableColumnsAdd.data})
        // }
        //console.log(this.formFilter.customerid);
      },
      submit() {
        this.loading = false
        setTimeout(() => {
          this.loading = true
        }, 0)
        for (var i in this.tableColumnsAdd.data) {
          if (this.tableColumnsAdd.data[i].itemname == "") {
            this.addout = true
            setTimeout(() => {
              this.loading = true
            }, 0)
            this.loading = false
            this.$Message.error('商品名称不能为空');
            return
          }
        }
        console.log(this.tableColumnsAdd.data)
        axios.post(sessionStorage.http + '/addOutOrder', {order: this.formFilter, lineList: this.tableColumnsAdd.data})
          .then((res) => {
            console.log(res.data)
            this.$Message.success('新增成功');
            document.getElementById('getNewData').click();
            this.formFilter = []
            this.tableColumnsAdd.data=[]
          })
          .catch((err) => {
            iview.Message.error({
              content: err.message,
              duration: 5
            });
          })
        this.addout = false
      },
      countTotal() {
        var total = 0;
        for (var j in this.tableColumnsAdd.data) {
          if (this.tableColumnsAdd.data[j].reqquantity != undefined) {
            total += +this.tableColumnsAdd.data[j].reqquantity;
          }
        }
        this.formFilter.quantity = total;
        document.getElementById('reqquantity').value = total;
        console.log(total)
        console.log(this.formFilter.quantity)
      },
      addDetail() {
        var checkStr = '';
        if (this.formFilter.outorderid == '') {
          checkStr += '出库单号' + '/ ';
        }
        if (this.formFilter.ordertype == undefined) {
          checkStr += '出库类型' + '/ ';
        }
        if (this.formFilter.suppliermanagementid == undefined && this.formFilter.customerid == undefined) {
          checkStr += '供应商/客户' + '/ ';
        }
        if (this.formFilter.department == undefined) {
          checkStr += '部门' + '/';
        }
        if (checkStr != '') {
          iview.Message.error({
            content: '请填写完 ' + checkStr + ' 中的数据',
            duration: 5
          });
          return false;
        }
        console.log(this.tableColumnsAdd.data);
        console.log(this.formFilter.addNo);
        this.lDetail = this.tableColumnsAdd.data.length;
        if (this.formFilter.addNo > 0) {
          for (var i = 1; i <= this.formFilter.addNo; i++) {
            this.tableColumnsAdd.data.push({
                select: true,
                lineno: this.lDetail + i,
                itemcode: '',
                itemname: '',
                invUomCode: '个',
                reqquantity: '',
                remark: ''
              }
            );
          }
        }
      },
      click() {
      },
      cancel() {
      },
      handleSubmit() {
        const paths = this.$route.path.split("/")
      },
      exportfile() {

      },

      onSelectionChange(rows) {
        this.rows = rows
      }
    }
  }
</script>

<style lang="less" scoped>
  #overdue_day input, #product_date input {
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

  .ivu-form .ivu-form-item-label:before {
    content: '******************************';
  }

  .spantest:before {
    content: '******************************';

  }

  .formitem {
    position: relative;
  }

  .font3 {
    position: absolute;
    left: -57px;
    top: 2px
  }

  .font2 {
    position: absolute;
    left: -45px;
    top: 2px
  }

  .font4 {
    position: absolute;
    left: -70px;
    top: 2px
  }

  .font6 {
    position: absolute;
    left: -93px;
    top: 2px
  }
</style>
