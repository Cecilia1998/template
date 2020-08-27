<template lang="html">
  <div class="outStorageSend">
    <Tabs type="card">
      <Tab-pane label="出库单：货位分配">

        <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
          <table>
            <tr>
              <td align="right">出库单信息编辑：</td>
              <td width="6%" align="left"></td>
              <td width="10%" align="right"></td>
              <td width="8%" align="left"></td>
              <td width="10%" align="right"></td>
              <td width="6%" align="left"></td>
              <td width="15%" align="right"></td>
              <td width="5%" align="left"></td>
              <td width="10%" align="right"></td>
              <td align="right">
                <Button type="primary" shape="circle" @click="CreateStorageTray" style="width:100px">返回</Button>
              </td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td width="10%" align="right">出库单号：</td>
              <td width="6%" align="left">{{formFilter.outorderid}}</td>
              <td width="10%" align="right">出库类型：</td>
              <td width="8%" align="left">{{formFilter.ordertypename}}</td>
              <td width="10%" align="right">客户/供应商：</td>
              <td width="6%" align="left">{{formFilter.customername}}</td>
              <td width="15%" align="right">出库总数/已生成托盘数量：</td>
              <td width="5%" align="left">{{formFilter.quantity}}</td>
              <td width="10%" align="right">申请日期:</td>
              <td width="20%" align="left">{{formFilter.placedate}}</td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td width="10%" align="right">创建人：</td>
              <td width="6%" align="left">{{formFilter.creatorname}}</td>
              <td width="10%" align="right">是否生成托盘：</td>
              <td width="8%" align="left">{{formFilter.createOuttaskflag}}</td>
              <td width="10%" align="right">状态：</td>
              <td width="6%" align="left">{{formFilter.orderstatusname}}</td>
              <td width="15%" align="right">备注：</td>
              <td width="5%" align="left">{{formFilter.remark}}</td>
              <td width="10%" align="right"></td>
              <td width="20%" align="left"></td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td>出库单明细信息编辑：</td>
              <td width="6%" align="left"></td>
              <td width="10%" align="right"></td>
              <td width="8%" align="left"></td>
              <td width="10%" align="right"></td>
              <td width="6%" align="left"></td>
              <td width="15%" align="right"></td>
              <td width="5%" align="left"></td>
              <td width="10%" align="right"></td>
              <td align="right">
                <Button type="primary" shape="circle" @click="CreateStorageTray" style="width:100px">生成托盘</Button>
              </td>
            </tr>
          </table>
          <Table :loading="loading" stripe border ref="selection" :columns="outLinetableColumns.card"
          :data="outLinetableColumns.data" @on-selection-change="onSelectionChangeOutOrderLine"
          style="margin-top:20px;"></Table>
        </Form>


        <br/>

        <Form ref="formFilter" :model="formFilter1" :label-width="85" inline style="text-align:left;">
          <Row>
            <i-col span="4">
              <b>库存查询：</b>
            </i-col>
          </Row>
          <Row span="24">
            <Col span="3">
              <Form-item label="批次号：">
                <Input v-model="formFilter1.batchno"  placeholder="请输入" style="width: 160px"/>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="生产日期">
                <td>
                  <DatePicker v-model="formFilter.productStartDate" @on-change="startDateChanged" type="date" placeholder="请选择" class="dateInput"></DatePicker>
                </td>
                <td>--</td>
                <td>
                  <DatePicker v-model="formFilter.productEndDate" @on-change="endDateChanged" type="date" placeholder="请选择" class="dateInput"></DatePicker>
                </td>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="入库日期">
                <td>
                  <DatePicker v-model="formFilter.putinStartDate" @on-change="startDateChanged" type="date" placeholder="请选择" class="dateInput"></DatePicker>
                </td>
                <td>--</td>
                <td>
                  <DatePicker v-model="formFilter.putinEndDate" @on-change="endDateChanged" type="date" placeholder="请选择" class="dateInput"></DatePicker>
                </td>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="出库规则选择:">
                <Radio-group v-model="formFilter1.outrule">
                  <Radio value="先进先出">先进先出</Radio>
                </Radio-group>
              </Form-item>
            </Col>
            <i-col span="2">
              <Button type="primary" shape="circle" @click="SaveSubmit" style="width:100px">提交</Button>
              &nbsp;
            </i-col>
          </Row>
        </Form>
        <Table :loading="loadingStorage" ref="selection" :columns="stroagetableColumns.card"
               :data="stroagetableColumns.data" @on-selection-change="onSelectionChangestorage"
               style="margin-top:20px;"></Table>
      </Tab-pane>
      <Tab-pane label="出库单：出库托盘管理">
        <Table :loading="loadingOutTask" @on-row-dblclick="updateSelection" ref="selection"
               :columns="outTasktableColumns.card" :data="outTasktableColumns.data" style="margin-top:20px;"></Table>
        <br/>

        <Modal v-model="updateOutOrder" width="1300" :styles="{top: '85px'}" :mask-closable="false"
               @on-cancel="update_cancel" @on-ok="on_ok" footer-hide>
          <p slot="header" style="text-align:left">下架确认：出库单明细</p>

          <Form ref="formFilter" :model="tanChuKuangDeForm" :label-width="85" inline style="text-align:left;"
                v-if="wobuxiangqimingzile">
            <div style="text-align:left;"><font color="#59a6fe" size="2px">&nbsp;&nbsp;出库托盘明细</font></div>
            <Row>
              <Col span="1">&nbsp;</Col>
              <Col span="23">
                <Row>
                  <Col span="4">
                    <Form-item label="序号" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.itemCode }}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="商品编号" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.itemCode }}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="商品名称" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.itemName}}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="批次号" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.batchNo}}
                    </Form-item>
                  </Col>
                </Row>
                <Row>
                  <Col span="4">
                    <Form-item label="库存单位" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.invUomCode}}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="预计出库数量" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.reqQuantity}}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="实际出库数量" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.actQuantity}}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="出库完成时间" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.outFinishTime}}
                    </Form-item>
                  </Col>
                  <Col span="4">
                    <Form-item label="状态" prop="order_id" status-icon>
                      {{tanChuKuangDeForm.status}}
                    </Form-item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <p slot="header" style="text-align:left">出库托盘列表：</p>
          <Button shape="circle" style="width:120px;height:28px;background-color:#b4b4b4;font-size:16px;padding:0px" disabled @click="delete_confirm = true" id='delTaskDetail' icon="md-trash">删除选中项</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button type="primary" shape="circle" @click="createTask">生成任务</Button>
          <Table :loading="loadingDetail" ref="selection" :columns="outDetailtableColumns.card"
                 :data="outDetailtableColumns.data" @on-selection-change="onSelectionChange1" style="margin-top:20px;"></Table>
        </Modal>

        <Modal v-model="delete_confirm" width="360">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除确认</span>
          </p>
          <div style="text-align:center">
            <span style="font-size:22px">确定要删除吗？</span>
          </div>
          <div slot="footer">
            <Button type="error" size="large" long @click="deleteSelectionTaskDetail">确定删除</Button>
          </div>
        </Modal>

      </Tab-pane>
      <Tab-pane label="出库单：出库任务管理">
        <Form ref="formFilter" :model="formFilter" :label-width="85" inline style="text-align:left;">
          <Row>
            <Col span="12">

              <Form-item label="波次号">
                <Input v-model="formFilter.ware_No" style="width: 160px"/>
              </Form-item>

            </Col>
            <Col span="8">
              <Form-item label="">
              </Form-item>
            </COL>
            <Col span="4">

              <Button type="primary" shape="circle" icon="ios-search" @click="findAll" id="check" style="width: 100px">
                <font color="white">任务刷新</font></Button>
            </Col>
          </Row>
        </Form>
        <Table :loading="loadingTaskDetail" ref="selection" :columns="taskDetailtableColumns.card"
               :data="taskDetailtableColumns.data" style="margin-top:20px;"></Table>
        <br/>
      </Tab-pane>
    </Tabs>

  </div>
</template>
<script>
  export default {}
</script>

<script>
  import axios from 'axios'
  import iview from 'view-design'

  import qs from 'querystring'
  import router from '../../router'

  export default {
    components: {},
    data() {
      return {
        deleteOutOrderInfo: [],
        delete_confirm: false,
        deleteButtonFlag: true,
        updateOutInfo: {},
        updateOutOrder: false,
        loading: false,
        loadingLine: false,
        loadingStorage: false,
        loadingOutTask: false,
        loadingTaskDetail: false,
        loadingDetail: false,
        total: 0,
        formFilter: {
          cur_page: 1
        },
        formFilter1: {},
        outOrderInfo: [],
        storageInfo: [],
        outtaskInfo: [],
        definePageSize: 10,
        outLinetableColumns: {
          card: [
            {title: '选择', key: 'select', type: 'selection', width: 80, align: 'center', },
            {title: '序号', key: 'lineno', width: 80, align: 'center'},
            {title: '商品编号', key: 'itemcode', align: 'center'},
            {title: '商品名称', key: 'itemname', align: 'center'},
            {title: '单位', key: 'invUomCode', align: 'center'},
            {title: '接收数量', key: 'reqquantity', align: 'center'},   //新增
            {title: '分配数量', key: 'actquantity', align: 'center'},          //新增
            {title: '库区', key: 'districtname', align: 'center'},          //新增
            {title: '货位', key: 'storageid', align: 'center'},          //新增
            {title: '批次号', key: 'batchno', align: 'center'},
            {title: '备注', key: 'remark', align: 'center'},
          ],
          data: [],
        },
        stroagetableColumns: {
          card: [
            {title: '选择', key: 'select', type: 'selection', width: 80, align: 'center'},
            {title: '序号', key: 'lineno', width: 80, align: 'center'},
            {title: '商品编号', key: 'itemcode', align: 'center'},
            {title: '商品名称', key: 'itemname', align: 'center'},
            {title: '库区', key: 'districtname', align: 'center'},
            {title: '货位', key: 'storageid', align: 'center'},   //新增
            {title: 'x', key: 'X', width: 50, align: 'center'},          //新增
            {title: 'y', key: 'Y', width: 50, align: 'center'},          //新增
            {title: 'z', key: 'Z', width: 50, align: 'center'},          //新增
            {title: '批次号', key: 'batchno', width: 200, align: 'center'},          //新增
            {title: '库存单位', key: 'invUomCode', align: 'center'},          //新增
            {title: '可出库数量/剩余数量', key: 'canquantity', align: 'center'},          //新增
            {title: '生产日期', key: 'productiondate', align: 'center'},          //新增
            {title: '到期日', key: 'expirationdate', align: 'center'},          //新增
            {title: '货位状态', key: 'storagestatusname', align: 'center'},          //新增
            {title: '入库时间', key: 'putindate', align: 'center'},
          ],
          data: []
        },
        outTasktableColumns: {
          card: [
            {title: '序号', key: 'lineno', width: 100, align: 'center'},
            {title: '任务编号', key: 'outtaskid',  align: 'center'},
            {title: '出库类型', key: 'outtype', align: 'center'},
            {title: '客户', key: 'customername', align: 'center'},
            {title: '托盘号', key: 'remark1',  align: 'center'},   //新增
            {title: '生成时间', key: 'createtime',  align: 'center'},          //新增
            {title: '实际出库数量', key: 'outquantity', align: 'center'},          //新增
            {title: '状态', key: 'status', align: 'center'},          //新增
          ],
          data: []
        },

        // 这个应该是双击后的弹出
        outDetailtableColumns: {
          card: [
            {title: '选择', key: 'select', type: 'selection', width: 60, align: 'center', },
            {title: '行号', key: 'lineno', width: 100,  align: 'center'},
            {title: '明细编号', key: 'outorderdetailid', width: 200,  align: 'center'},
            {title: '商品编号', key: 'itemcode', width: 90, align: 'center'},
            {title: '商品名称', key: 'itemname', width: 120, align: 'center'},
            {title: '库区', key: 'districtid', width: 120,  align: 'center'},   //新增
            {title: '货位', key: 'storageid', width: 120,  align: 'center'},          //新增
            {title: '批次号', key: 'batchno', width: 120, align: 'center'},          //新增
            {title: '库存托盘号', key: 'trayno', width: 200, align: 'center'},          //新增
            {title: '库存单位', key: 'invUomCode', width: 120,  align: 'center'},          //新增
            {title: '出库数量', key: 'actquantity', width: 120, align: 'center'},          //新增
            {title: '货位状态', key: 'status', width: 120, align: 'center'},          //新增
          ],
          data: []
        },
        taskDetailtableColumns: {
          card: [
            {title: '行号', key: 'lineno', width: 100, align: 'center'},
            {title: '托盘号', key: 'targettrayno', width: 100,  align: 'center'},
            {title: '任务单号', key: 'movetype', width: 100, align: 'center'},
            {title: '原库区', key: 'origdistrictid', width: 90, align: 'center'},
            {title: '原货位', key: 'origstorageid', width: 120, align: 'center'},
            {title: '原货位类型', key: 'origstoragetype', width: 120,  align: 'center'},   //新增
            {title: '目标库区', key: 'targetdistrictid', width: 120,  align: 'center'},          //新增
            {title: '目标货位', key: 'targetstorageid', width: 120, align: 'center'},          //新增
            {title: '目标货位类型', key: 'targetstoragetype', width: 120, align: 'center'},          //新增
            {title: '任务数量', key: 'movequantity', width: 120,  align: 'center'},          //新增
            {title: '批次号', key: 'batchno', width: 120, align: 'center'},          //新增
            {title: '库存托盘', key: 'origtrayno', width: 120, align: 'center'},          //新增
            {title: '生成时间', key: 'insertymd', width: 120, align: 'center'},          //新增
            {title: '状态', key: 'status', width: 120, align: 'center'},          //新增
            {title: '任务类型', key: 'tasktype', width: 120, align: 'center'},          //新增
            {title: '回传标识', key: 'backflag', width: 120, align: 'center'},          //新增
          ],
          data: []
        },
      }
    },
    created() {
      sessionStorage.a = 'a'
      let urlJudge = location.href.indexOf('params') !== -1
      let arr = urlJudge ? location.href.split('params=')[1] : ''
      let newarr = decodeURIComponent(arr)
      this.formFilter = qs.parse(newarr)
      this.query();
    },
    computed: {},
    methods: {
      SaveSubmit() {
        console.log(this.storageInfo)
        console.log(this.outLinetableColumns.data)
        axios.post(sessionStorage.http + `/SaveSubmit?loginStatus=${sessionStorage.loginStatus}`, {
          storageDetailInfos: this.storageInfo,
          outlinesInfos: this.outLinetableColumns.data,
          order: this.formFilter
        })
          .then((res) => {
            console.log(res)
            if (res.code == '-1') {
              this.$Message.error(res.message);
              return;
            } else {
              this.outLinetableColumns.data = res.data.outlinesInfos;
            }
          })
      },
      onSelectionChangeOutOrderLine(row) {
        console.log(row)
        for(let i=0;i<row.size;i++){
          this.outOrderInfo.push(row[i])
        }
        console.log(this.outOrderInfo)
        console.log("1111")
      },
      query() {
        axios.post(sessionStorage.http + `/getOutTaskDetailInit?loginStatus=${sessionStorage.loginStatus}`, this.formFilter)
          .then((res) => {
            // console.log(res)
            if (res.code == '-1') {
              this.$Message.error(res.message);
              return;
            } else {
              console.log(res.data)
              this.outLinetableColumns.data = res.data.outlinesInfos;
              this.outTasktableColumns.data = res.data.tasksInfos;
              this.taskDetailtableColumns.data = res.data.taskDetails;
              this.stroagetableColumns.data = res.data.storageDetailInfos;
            }

          })
      },
      on_ok() {
      },
      update_cancel() {

      },
      onSelectionChange1(rows) {

        this.deleteOutOrderInfo = rows
        if (this.deleteOutOrderInfo.length > 0) {
          document.getElementById('delTaskDetail').setAttribute("style", "background-color:#fe3838;width:120px;height:28px;");
          document.getElementById('delTaskDetail').removeAttribute("disabled");
        } else {
          document.getElementById('delTaskDetail').setAttribute("style", "background-color:#b4b4b4;width:120px;height:28px;");
          document.getElementById('delTaskDetail').setAttribute("disabled", "disabled");
        }
      },
      deleteSelectionTaskDetail() {
        if (this.deleteOutOrderInfo.length == 0) {
          this.delete_confirm = false;
          this.$Message.info('请先勾选需要删除项');
        } else {
          axios.post(sessionStorage.http + `/deleteTaskDetail?loginStatus=${sessionStorage.loginStatus}`, this.deleteOutOrderInfo)
            .then((res) => {
              this.tableColumns.data = res.data.orders.data;
              this.total = res.data.orders.total;
              this.taskList = res.data.taskTypes;
              this.customerList = res.data.customerInfos;
              this.supplierList = res.data.supplierManagements;
              this.delete_confirm = false;
              this.deleteButtonFlag = true;
              this.$Message.success('删除成功');
            })
            .catch((err) => {
              this.$Message.error('删除失败' + err);
            })
        }
      },
      // 这个是双击后更新为 true, 意味着双击后, mdal将会显示
      updateSelection(row) {
        axios.post(sessionStorage.http + `/listTrayDetail?loginStatus=${sessionStorage.loginStatus}`, row)
          .then((res) => {
            console.log('success')
            this.delete_confirm = false;
            this.outDetailtableColumns.data = res.data;
            console.log(res.data);
          })
          .catch((err) => {
            console.log('fail')

            iview.message.error({
              content: err.message,
              duration: 5
            })
          })
        this.updateOutInfo = row
        this.updateOutOrder = true
      },
      handleSubmit() {
        const paths = this.$route.path.split("/")
      },
      exportfile() {

      },
      // 生成出库托盘
      CreateStorageTray() {
        console.log("&&&&&&&&&&&&&&&************************####################@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(this.outOrderInfo);
        axios.post(sessionStorage.http + `/doCreateOutOrderTray?loginStatus=${sessionStorage.loginStatus}`, {
          storageDetailInfos: this.storageInfo,
          outlinesInfos: this.outLinetableColumns.data,
          order: this.formFilter
        })
          .then((res) => {
            console.log('success')

          })
          .catch((err) => {

          })
       // 这里需要有一个重新渲染的操作, 暂时没写

      },
      },
      goback() {

      },

      onSelectionChangestorage(row) {
        this.storageInfo = row
      },
      onSelectionChangeouttask(row) {
        this.outtaskInfo = row
      },

      findAll() {

      },
      click() {
        alert("我最帅!")
      },
      onSelectionChange(rows) {
        this.rows = rows
      },
      handleChangePage(value) {
        const paths = this.$route.path.split('/')
      },
      handleChangePageSize(value) {
        const paths = this.$route.path.split('/')
      },

  }
</script>

<style lang="less">
  .outStorageSend{
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
      line-height: 50px;
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
</style>
