<template lang="html">
  <div class="commodityclassification">
    <Form :label-width="120" inline style="text-align:left;">
      <Tabs :value="0"  @on-click="getCcByTabPane">
        <TabPane label="大分类管理" name="0">
          <div class="bigClassification">
            <div>
                <Form-item label="是否启用">
                  <Select v-model="searchCommodityClassification0.isstart" clearable placeholder="请选择"
                  @on-change="searchCommodityClassificationByCondition0">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </Form-item>
                <Form-item label="登记时间" >
                  <tr>
                    <td>
                      <DatePicker v-model="searchCommodityClassification0.startdate" type="date" placeholder="请选择"
                      @on-change="onStartTimeChange0" :options="startTimeOption0" :editable="false" style="width: 120px"></DatePicker>
                    </td>
                    <!-- <td>
                      <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/>
                    </td> -->
                    -
                    <td>
                      <DatePicker v-model="searchCommodityClassification0.enddate" type="date" placeholder="请选择"
                      @on-change="onEndTimeChange0" :options="endTimeOption0"
                      :editable="false" style="width: 120px"></DatePicker>
                    </td>
                  </tr>
                </Form-item>
            </div>

            <Row>
              <Col span="24" style="display:flex;justify-content:space-between">
                <div class="" >
                  <Button type="primary" shape="circle" v-if="deleteButtonFlag0==false" @click="deleteconfirm0=true"
                  style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
                  <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag0==true"
                  style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
                </div>
                <div class="">
                  <Button type="primary" shape="circle" @click="showaddmodal0"
                  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增</Button>
                </div>
              </Col>
            </Row>

            <br>

            <Table stripe border height=520 :columns="tableColumns.card0" :data="commodityClassificationShow0"
            @on-selection-change="onSelectionChange0"  @on-row-dblclick="updateSelection"></Table>
            <br>
            <div class="page">
              <Page show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize0" :total="total0"
              @on-change="handleChangePage0" @on-page-size-change="handleChangePageSize0" style="text-align:center"></Page>
            </div>
          </div>
        </TabPane>

        <TabPane label="中分类管理" name="1">
          <div class="middleClassification">
            <div>
              <Form-item label="大分类名称">
                <Select v-model="searchCommodityClassification1.largeclassificationname" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition1" @on-open-change="getAllCC0">
                  <Option value="">-所有-</Option>
                  <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                  {{item.largeclassificationname}}</Option>
                </Select>
              </Form-item>

              <Form-item label="是否启用" >
                <Select v-model="searchCommodityClassification1.isstart" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition1">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </Form-item>

              <Form-item label="登记时间" >
                <tr>
                  <td>
                    <DatePicker v-model="searchCommodityClassification1.startdate" type="date" placeholder="请选择"
                    @on-change="onStartTimeChange1" :options="startTimeOption1" :editable="false" style="width: 120px"></DatePicker>
                  </td>
                  <!-- <td>
                    <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/>
                  </td> -->
                  -
                  <td>
                    <DatePicker v-model="searchCommodityClassification1.enddate" type="date" placeholder="请选择"
                    @on-change="onEndTimeChange1" :options="endTimeOption1"
                    :editable="false" style="width: 120px"></DatePicker>
                  </td>
                </tr>
              </Form-item>
            </div>

            <Row>
              <Col span="24" style="display:flex;justify-content:space-between">
                <div class="" >
                  <Button type="primary" shape="circle" v-if="deleteButtonFlag1==false" @click="deleteconfirm1=true"
                  style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
                  <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag1==true"
                  style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
                </div>
                <div class="">
                  <Button type="primary" shape="circle" @click="showaddmodal1"
                  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增</Button>
                </div>
              </Col>
            </Row>

            <br>

            <Table stripe border height=520 :columns="tableColumns.card1" :data="commodityClassificationShow1"
            @on-selection-change="onSelectionChange1"  @on-row-dblclick="updateSelection"></Table>
            <br>
            <div class="page">
              <Page show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize1" :total="total1"
              @on-change="handleChangePage1" @on-page-size-change="handleChangePageSize1" style="text-align:center"></Page>
            </div>
          </div>
        </TabPane>

        <TabPane label="小分类管理" name="2">
          <div class="smallClassification">
            <div>
              <Form-item label="大分类名称">
                <Select v-model="searchCommodityClassification2.largeclassificationname" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition2" @on-open-change="getAllCC0">
                  <Option value="">-所有-</Option>
                  <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                  {{item.largeclassificationname}}</Option>
                </Select>
              </Form-item>
              <Form-item label="中分类名称"  >
                <Select v-model="searchCommodityClassification2.middleclassificationname" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition2" @on-open-change="getAllCC1">
                  <Option value="">-所有-</Option>
                  <Option v-for="(item,key) in allcc1" :key="key" :value="item.middleclassificationname">
                  {{item.middleclassificationname}}</Option>
                </Select>
              </Form-item>
              <Form-item label="是否启用" >
                <Select v-model="searchCommodityClassification2.isstart" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition2" style="text-align:left;">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </Form-item>
              <Form-item label="登记时间" >
                <tr>
                  <td>
                    <DatePicker v-model="searchCommodityClassification2.startdate" type="date" placeholder="请选择"
                    @on-change="onStartTimeChange2" :options="startTimeOption2" :editable="false" style="width: 120px"></DatePicker>
                  </td>
                  <!-- <td>
                    <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/>
                  </td> -->
                  -
                  <td>
                    <DatePicker v-model="searchCommodityClassification2.enddate" type="date" placeholder="请选择"
                    @on-change="onEndTimeChange2" :options="endTimeOption2"
                    :editable="false" style="width: 120px"></DatePicker>
                  </td>
                </tr>
              </Form-item>
            </div>

            <Row>
              <Col span="24" style="display:flex;justify-content:space-between">
                <div class="" >
                  <Button type="primary" shape="circle" v-if="deleteButtonFlag2==false" @click="deleteconfirm2=true"
                  style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
                  <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag2==true"
                  style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
                </div>
                <div class="">
                  <Button type="primary" shape="circle" @click="showaddmodal2"
                  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增</Button>
                </div>
              </Col>
            </Row>

            <br>

            <Table stripe border height=520 :columns="tableColumns.card2" :data="commodityClassificationShow2"
            @on-selection-change="onSelectionChange2" @on-row-dblclick="updateSelection"></Table>
            <br>
            <div class="page">
              <Page show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize2" :total="total2"
              @on-change="handleChangePage2" @on-page-size-change="handleChangePageSize2" style="text-align:center"></Page>
            </div>
          </div>
        </TabPane>

        <TabPane label="细分类管理" name="3">
          <div class="fineClassification">
            <div>
              <Form-item label="大分类名称">
                <Select v-model="searchCommodityClassification3.largeclassificationname" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition3" @on-open-change="getAllCC0">
                  <Option value="">-所有-</Option>
                  <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                    {{item.largeclassificationname}}</Option>
                </Select>
              </Form-item>

              <Form-item label="中分类名称" >
                <Select v-model="searchCommodityClassification3.middleclassificationname" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition3" @on-open-change="getAllCC1">
                  <Option value="">-所有-</Option>
                  <Option v-for="(item,key) in allcc1" :key="key" :value="item.middleclassificationname">
                  {{item.middleclassificationname}}</Option>
                </Select>
              </Form-item>

              <Form-item label="小分类名称" >
                <Select v-model="searchCommodityClassification3.smallclassificationname" clearable placeholder="请选择"
                @on-change="searchCommodityClassificationByCondition3" @on-open-change="getAllCC2">
                  <Option value="">-所有-</Option>
                  <Option v-for="(item,key) in allcc2" :key="key" :value="item.littleclassificationname">
                    {{item.littleclassificationname}}</Option>
                </Select>
              </Form-item>

              <Form-item label="是否启用" >
                <Select v-model="searchCommodityClassification3.isstart" clearable placeholder="请选择"
                 @on-change="searchCommodityClassificationByCondition3" style="text-align:left;">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </Form-item>

              <Form-item label="登记时间">
                <tr>
                  <td>
                    <DatePicker v-model="searchCommodityClassification3.startdate" type="date" placeholder="请选择"
                    @on-change="onStartTimeChange3" :options="startTimeOption3" :editable="false" style="width: 120px"></DatePicker>
                  </td>
                  <!-- <td>
                    <span style="display:inline-block;width:20px;border-top:1px solid #888;margin:0 5px;"/>
                  </td> -->
                  -
                  <td>
                    <DatePicker v-model="searchCommodityClassification3.enddate" type="date" placeholder="请选择"
                    @on-change="onEndTimeChange3" :options="endTimeOption3"
                    :editable="false" style="width: 120px"></DatePicker>
                  </td>
                </tr>
              </Form-item>
            </div>

            <Row>
              <Col span="24" style="display:flex;justify-content:space-between">
                <div class="" >
                  <Button type="primary" shape="circle" v-if="deleteButtonFlag3==false" @click="deleteconfirm3=true"
                  style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
                  <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag3==true"
                  style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
                </div>
                <div class="">
                  <Button type="primary" shape="circle" @click="showaddmodal3"
                  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;">新&nbsp;&nbsp;增</Button>
                </div>
              </Col>
            </Row>

            <br>

            <Table stripe border height=520 :columns="tableColumns.card3" :data="commodityClassificationShow3"
            @on-selection-change="onSelectionChange3" @on-row-dblclick="updateSelection"></Table>
            <br>
            <div class="page">
              <Page show-elevator show-sizer show-total :page-size-opts="[10,20,30]" :page-size="pageSize3" :total="total3"
              @on-change="handleChangePage3" @on-page-size-change="handleChangePageSize3" style="text-align:center"></Page>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </Form>
    <!-- 删除确认 -->
    <Modal v-model="deleteconfirm0" width="360" style="font-size:14px" :mask-closable='false'>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span>该大分类下的所有其他分类都将删除，确实要删除吗?</span>
      </div>
      <div slot="footer" style="display:flex;justify-content:center;">
        <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection0">确定删除</Button>
      </div>
    </Modal>
    <!-- 删除确认 -->
    <Modal v-model="deleteconfirm1" width="360" style="font-size:14px" :mask-closable='false'>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span>该中分类下的所有其他分类都将删除，确实要删除吗?</span>
      </div>
      <div slot="footer" style="display:flex;justify-content:center;">
        <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection1">确定删除</Button>
      </div>
    </Modal>
    <!-- 删除确认 -->
    <Modal v-model="deleteconfirm2" width="360" style="font-size:14px" :mask-closable='false'>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span>该小分类下的所有其他分类都将删除，确实要删除吗?</span>
      </div>
      <div slot="footer" style="display:flex;justify-content:center;">
        <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection2">确定删除</Button>
      </div>
    </Modal>
    <!-- 删除确认 -->
    <Modal v-model="deleteconfirm3" width="360" style="font-size:14px" :mask-closable='false'>
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <span>确定要删除吗？</span>
      </div>
      <div slot="footer" style="display:flex;justify-content:center;">
        <Button type="error" style="width:120px;" shape="circle" @click="deleteSelection3">确定删除</Button>
      </div>
    </Modal>
    <!-- 大分类新增 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_add_commodityclassification0" width="600" :mask-closable='false' closable>
            <p slot="header" style="text-align:center">
                <span>添加商品大分类</span>
            </p>
            <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>大分类编号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityClassification.largeclassificationid" placeholder="请输入"/>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:60px;">*</span>大分类名称&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityClassification.largeclassificationname" placeholder="请输入"/>
                  </td>
              </tr>

              <tr>
                <td>
                  <span style="color:red">*</span>登记时间&nbsp;
                </td>
                <td>
                  <DatePicker v-model="insertCommodityClassification.registertime" type="datetime" placeholder="请选择"
                  style="color: black;text-align:right;"></DatePicker>
                </td>
                <td>
                  <span style="color:red">*</span>是否启用&nbsp;
                </td>
                <td>
                  <Select v-model="insertCommodityClassification.isstart" style="color: black;text-align:left;" placeholder="请选择">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
                </td>
              </tr>
          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="insert0"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
    </Modal>
    <!-- 中分类新增 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_add_commodityclassification1" width="600" :mask-closable='false' closable>
            <p slot="header" style="text-align:center">
                <span>添加商品中分类</span>
            </p>
            <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>大分类名称&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityClassification.largeclassificationname" placeholder="请选择"
                    style="text-align:left;" @on-open-change="getAllCC0">
                      <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                      {{item.largeclassificationname}}</Option>
                    </Select>
                  </td>
                  <td>
                    <span style="display:inline-block;color:red;margin-left:60px;">*</span>中分类编号&nbsp;
                  </td>
                  <td>
                    <Input v-model="insertCommodityClassification.middleclassificationid"/>
                  </td>
              </tr>

              <tr>
                <td>
                  <span style="color:red">*</span>中分类名称&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.middleclassificationname"
                  style="text-align:center;"/>
                </td>
                <td>
                  <span style="color:red;">*</span>登记时间&nbsp;
                </td>
                <td>
                  <DatePicker v-model="insertCommodityClassification.registertime" type="datetime" placeholder="请选择"
                  style="color: black;text-align:right;"></DatePicker>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red">*</span>是否启用&nbsp;
                </td>
                <td>
                  <Select v-model="insertCommodityClassification.isstart" style="text-align:left;">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </td>
                <!-- <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.remark" placeholder="请输入"/>
                </td> -->
              </tr>
              <tr>
                <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
                </td>
              </tr>
          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="insert1"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
    </Modal>
    <!-- 小分类新增 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_add_commodityclassification2" width="600" :mask-closable='false' closable>
            <p slot="header" style="text-align:center">
                <span>添加商品小分类</span>
            </p>
            <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>大分类名称&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityClassification.largeclassificationname" placeholder="请选择"
                    style="text-align:left;" @on-open-change="getAllCC0" @on-change="getMbyL">
                      <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                      {{item.largeclassificationname}}</Option>
                    </Select>
                  </td>
                  <td>
                    <span style="color:red;margin-left:60px">*</span>中分类名称&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityClassification.middleclassificationname" placeholder="请选择"
                    style="text-align:left;display:inline-block;">
                      <Option v-for="(item,key) in allmcc" :key="key" :value="item.middleclassificationname">
                      {{item.middleclassificationname}}</Option>
                    </Select>
                  </td>
              </tr>

              <tr>
                <td>
                  <span style="color:red">*</span>小分类编号&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.littleclassificationid" placeholder="请输入"/>
                </td>
                <td>
                  <span style="color:red;margin-left:60px;">*</span>小分类名称&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.littleclassificationname" placeholder="请输入" />
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red">*</span>登记时间&nbsp;
                </td>
                <td>
                  <DatePicker v-model="insertCommodityClassification.registertime" type="datetime" placeholder="请选择"
                  style="color: black;text-align:right;"></DatePicker>
                </td>
                <td>
                  <span style="color:red">*</span>是否启用&nbsp;
                </td>
                <td>
                  <Select v-model="insertCommodityClassification.isstart" style="text-align:left;" placeholder="请选择">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
                </td>
              </tr>
          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="insert2"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
    </Modal>
    <!-- 细分类新增 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_add_commodityclassification3" width="600" :mask-closable='false' closable>
            <p slot="header" style="text-align:center">
                <span>添加商品细分类</span>
            </p>
            <table style="line-height:50px;text-align:right">
              <tr>
                  <td>
                    <span style="color:red">*</span>大分类名称&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityClassification.largeclassificationname" placeholder="请选择"
                    style="text-align:left;" @on-open-change="getAllCC0" @on-change="getMbyL">
                      <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                      {{item.largeclassificationname}}</Option>
                    </Select>
                  </td>
                  <td>
                    <span style="color:red;margin-left:60px">*</span>中分类名称&nbsp;
                  </td>
                  <td>
                    <Select v-model="insertCommodityClassification.middleclassificationname" placeholder="请选择"
                    style="text-align:left;" @on-change="getLbyM">
                      <Option v-for="(item,key) in allmcc" :key="key" :value="item.middleclassificationname">
                      {{item.middleclassificationname}}</Option>
                    </Select>
                  </td>
              </tr>

              <tr>
                <td>
                  <span style="color:red">*</span>小分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="insertCommodityClassification.littleclassificationname" placeholder="请选择"
                  style="text-align:left;">
                    <Option v-for="(item,key) in alllcc" :key="key" :value="item.littleclassificationname">
                    {{item.littleclassificationname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="color:red">*</span>细分类编号&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.fineclassificationid" placeholder="请输入" />
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red">*</span>细分类名称&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.fineclassificationname" placeholder="请输入" />
                </td>
                <td>
                  <span style="color:red">*</span>登记时间&nbsp;
                </td>
                <td>
                  <DatePicker v-model="insertCommodityClassification.registertime" type="datetime" placeholder="请选择"
                  style="color: black;text-align:right;"></DatePicker>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red">*</span>是否启用&nbsp;
                </td>
                <td>
                  <Select v-model="insertCommodityClassification.isstart" style="text-align:left" placeholder="请输入">
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </td>
                <!-- <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.remark" placeholder="请输入"/>
                </td> -->
              </tr>
              <tr>
                <td style="display:inline-block;margin-bottom:12px;">
                  备注&nbsp;
                </td>
                <td>
                  <Input v-model="insertCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
                </td>
              </tr>
          </table>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="insert3"
            style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
          </div>
    </Modal>

    <!-- 大分类编辑 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_update_commodityclassification0" width="600" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>修改商品大分类</span>
          </p>
          <table style="line-height:50px;text-align:right">
            <tr>
                <td>
                  <span style="color:red">*</span>大分类编号&nbsp;
                </td>
                <td>
                  <Input v-model="updateCommodityClassification.largeclassificationid" placeholder="请输入" disabled/>
                </td>
                <td>
                  <span style="display:inline-block;color:red;margin-left:60px;">*</span>大分类名称&nbsp;
                </td>
                <td>
                  <Input v-model="updateCommodityClassification.largeclassificationname" placeholder="请输入" />
                </td>
            </tr>

            <tr>
              <td>
                <span style="color:red">*</span>登记时间&nbsp;
              </td>
              <td>
                <DatePicker v-model="updateCommodityClassification.registertime" type="datetime" placeholder="请选择"
                style="color: black;text-align:right;"></DatePicker>
              </td>
              <td>
                <span style="color:red">*</span>是否启用&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityClassification.isstart" style="color: black;text-align:left;" placeholder="请选择">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td style="display:inline-block;margin-bottom:12px;">
                备注&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
              </td>
            </tr>
        </table>
        <div slot="footer">
          <Button type="primary" shape="circle" @click="update0"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
        </div>
    </Modal>
    <!-- 中分类编辑 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_update_commodityclassification1" width="600" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>修改商品中分类</span>
          </p>
          <table style="line-height:50px;text-align:right">
            <tr>
                <td>
                  <span style="color:red">*</span>大分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="updateCommodityClassification.largeclassificationname" placeholder="请选择"
                  style="text-align:left;" @on-open-change="getAllCC0">
                    <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                    {{item.largeclassificationname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="display:inline-block;color:red;margin-left:60px;">*</span>中分类编号&nbsp;
                </td>
                <td>
                  <Input v-model="updateCommodityClassification.middleclassificationid" placeholder="请选择" disabled/>
                </td>
            </tr>

            <tr>
              <td>
                <span style="color:red">*</span>中分类名称&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.middleclassificationname" placeholder="请输入"/>
              </td>
              <td>
                <span style="color:red;">*</span>登记时间&nbsp;
              </td>
              <td>
                <DatePicker v-model="updateCommodityClassification.registertime" type="datetime" placeholder="请选择"
                style="color: black;text-align:right;"></DatePicker>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color:red">*</span>是否启用&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityClassification.isstart" style="text-align:left;" placeholder="请选择">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td style="display:inline-block;margin-bottom:12px;">
                备注&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
              </td>
            </tr>
        </table>
        <div slot="footer">
          <Button type="primary" shape="circle" @click="update1"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
        </div>
    </Modal>
    <!-- 小分类编辑 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_update_commodityclassification2" width="600" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>修改商品小分类</span>
          </p>
          <table style="line-height:50px;text-align:right">
            <tr>
                <td>
                  <span style="color:red">*</span>大分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="updateCommodityClassification.largeclassificationname" placeholder="请选择"
                  style="text-align:left;" @on-open-change="getAllCC0" @on-change="getMbyLu">
                    <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                    {{item.largeclassificationname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="color:red;margin-left:60px">*</span>中分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="updateCommodityClassification.middleclassificationname" placeholder="请选择"
                  style="text-align:left;display:inline-block;color:black;">
                    <Option v-for="(item,key) in allmcc" :key="key" :value="item.middleclassificationname">
                    {{item.middleclassificationname}}</Option>
                  </Select>
                </td>
            </tr>

            <tr>
              <td>
                <span style="color:red">*</span>小分类编号&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.littleclassificationid" placeholder="请输入" disabled/>
              </td>
              <td>
                <span style="color:red;margin-left:60px;">*</span>小分类名称&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.littleclassificationname" placeholder="请输入" />
              </td>
            </tr>
            <tr>
              <td>
                <span style="color:red">*</span>登记时间&nbsp;
              </td>
              <td>
                <DatePicker v-model="updateCommodityClassification.registertime" type="datetime" placeholder="请选择"
                style="color: black;text-align:right;"></DatePicker>
              </td>
              <td>
                <span style="color:red">*</span>是否启用&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityClassification.isstart" style="text-align:left;" placeholder="请选择">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td style="display:inline-block;margin-bottom:12px;">
                备注&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
              </td>
            </tr>
        </table>
        <div slot="footer">
          <Button type="primary" shape="circle" @click="update2"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
        </div>
    </Modal>
    <!-- 细分类编辑 -->
    <Modal class="commodityclassificationmodalstyle" v-model="modal_update_commodityclassification3" width="600" :mask-closable='false' closable>
          <p slot="header" style="text-align:center">
              <span>修改商品细分类</span>
          </p>
          <table style="line-height:50px;text-align:right">
            <tr>
                <td>
                  <span style="color:red">*</span>大分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="updateCommodityClassification.largeclassificationname" placeholder="请选择"
                  style="text-align:left;" @on-open-change="getAllCC0">
                    <Option v-for="(item,key) in allcc0" :key="key" :value="item.largeclassificationname">
                    {{item.largeclassificationname}}</Option>
                  </Select>
                </td>
                <td>
                  <span style="color:red;margin-left:60px">*</span>中分类名称&nbsp;
                </td>
                <td>
                  <Select v-model="updateCommodityClassification.middleclassificationname" placeholder="请选择"
                  style="text-align:left;" @on-change="getLbyMu">
                    <Option v-for="(item,key) in allmcc" :key="key" :value="item.middleclassificationname">
                    {{item.middleclassificationname}}</Option>
                  </Select>
                </td>
            </tr>

            <tr>
              <td>
                <span style="color:red">*</span>小分类名称&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityClassification.littleclassificationname" placeholder="请选择"
                style="text-align:left;">
                  <Option v-for="(item,key) in alllcc" :key="key" :value="item.littleclassificationname">
                  {{item.littleclassificationname}}</Option>
                </Select>
              </td>
              <td>
                <span style="color:red">*</span>细分类编号&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.fineclassificationid" placeholder="请输入" disabled/>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color:red">*</span>细分类名称&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.fineclassificationname" placeholder="请输入" />
              </td>
              <td>
                <span style="color:red">*</span>登记时间&nbsp;
              </td>
              <td>
                <DatePicker v-model="updateCommodityClassification.registertime" type="datetime" placeholder="请选择"
                style="color: black;text-align:right;"></DatePicker>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color:red">*</span>是否启用&nbsp;
              </td>
              <td>
                <Select v-model="updateCommodityClassification.isstart" style="text-align:left" placeholder="请选择">
                  <Option value="1">是</Option>
                  <Option value="0">否</Option>
                </Select>
              </td>
            </tr>
            <tr>
              <td style="display:inline-block;margin-bottom:12px;">
                备注&nbsp;
              </td>
              <td>
                <Input v-model="updateCommodityClassification.remark" type="textarea" placeholder="请输入" :rows="2" :autosize="{minRows: 2,maxRows: 3}"/>
              </td>
            </tr>
        </table>
        <div slot="footer">
          <Button type="primary" shape="circle" @click="update3"
          style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px">提&nbsp;&nbsp;交</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import router from '../../router'
export default {
  components: {},
  data () {
    return {
      clickSt:true,
      itemType:{},
      total0:0, pageNum0:1, pageSize0:20,total1:0, pageNum1:1, pageSize1:20,total2:0, pageNum2:1, pageSize2:20,total3:0, pageNum3:1, pageSize3:20,
      searchCommodityClassification0:{},//大分类查询条件
      searchCommodityClassification1:{},//中分类查询条件
      searchCommodityClassification2:{},//小分类查询条件
      searchCommodityClassification3:{},//细分类查询条件
      commodityClassification0:[],//大分类查询到的数据
      commodityClassificationShow0:[],//大分类需要显示的数据
      commodityClassification1:[],//中分类查询到的数据
      commodityClassificationShow1:[],//中分类需要显示的数据
      commodityClassification2:[],//小分类查询到的数据
      commodityClassificationShow2:[],//小分类需要显示的数据
      commodityClassification3:[],//细分类查询到的数据
      commodityClassificationShow3:[],//细分类需要显示的数据
      deleteCommodityClassification:[],//需要删除的
      deleteButtonFlag0:true,//删除所选按钮
      deleteButtonFlag1:true,//删除所选按钮
      deleteButtonFlag2:true,//删除所选按钮
      deleteButtonFlag3:true,//删除所选按钮
      deleteconfirm0:false, deleteconfirm1:false, deleteconfirm2:false, deleteconfirm3:false,//分类删除确认框
      formFilter0:{cur_page:1}, formFilter1:{cur_page:1}, formFilter2:{cur_page:1}, formFilter3:{cur_page:1}, //分页控件：当前页码
      definePageSize0:10, definePageSize1:10, definePageSize2:10, definePageSize3:10,
      modal_add_commodityclassification0:false,//新增对话框
      modal_update_commodityclassification0:false,//更新对话框
      modal_add_commodityclassification1:false,//新增对话框
      modal_update_commodityclassification1:false,//更新对话框
      modal_add_commodityclassification2:false,//新增对话框
      modal_update_commodityclassification2:false,//更新对话框
      modal_add_commodityclassification3:false,//新增对话框
      modal_update_commodityclassification3:false,//更新对话框
      updateCommodityClassification:{},//更新编辑对象
      insertCommodityClassification:{
        littleclassificationname:''
      },//新增对象
      startSearchCommodityClassification0:{identification:"0"},//大分类查询条件对象
      startSearchCommodityClassification1:{identification:"1"},//中分类查询条件对象
      startSearchCommodityClassification2:{identification:"2"},//小分类查询条件对象
      startSearchCommodityClassification3:{identification:"3"},//细分类查询条件对象
      commodityClassifications0:[],//大分类名称查询条件下拉框
      commodityClassifications1:[],//小分类管理页面中分类查询条件下拉框
      commodityClassifications2:[],//小分类管理页面中分类查询条件下拉框
      allcc0:[],//所有大分类信息
      allcc1:[],//所有中分类信息
      allcc2:[],//所有小分类信息
      allmcc:[],//根据大分类信息查到的属于大分类的中分类信息
      alllcc:[],//根据中分类信息查到的属于中分类的小分类信息
      searchCcModel:{},
      startTimeOption0: {},
      endTimeOption0: {},
      startTimeOption1: {},
      endTimeOption1: {},
      startTimeOption2: {},
      endTimeOption2: {},
      startTimeOption3: {},
      endTimeOption3: {},

      tableColumns: {
        card0: [
          {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
          {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
            return h("div",+params.row._index + 1 + (this.pageNum0-1)*this.pageSize0)
          }},
          {title: '大分类编号', key: 'largeclassificationid', align: 'center'},
          {title: '大分类名称',key: 'largeclassificationname', align: 'center'},
          {title: '是否启用', key: 'isstart', align: 'center',render:(h,params)=>{
            let isstart = '';
            if(params.row.isstart == '1'){
              isstart = '是';
            }else{
              isstart = '否';
            }
            return h('div',isstart);
          }},
          {title: '登记时间', key: 'registertime', align: 'center'}
        ],//大分类数据显示
        card1: [
            {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
            {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
              return h("div",+params.row._index + 1 + (this.pageNum1-1)*this.pageSize1)
            }},
            {title: '大分类编号', key: 'largeclassificationid', align: 'center'},
            {title: '大分类名称',key: 'largeclassificationname', align: 'center'},
            {title: '中分类编号', key: 'middleclassificationid', align: 'center'},
            {title: '中分类名称',key: 'middleclassificationname', align: 'center'},
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
        ],//中分类数据显示
        card2: [
            {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
            {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
              return h("div",+params.row._index + 1 + (this.pageNum2-1)*this.pageSize2)
            }},
            {title: '大分类编号', key: 'largeclassificationid', align: 'center'},
            {title: '大分类名称',key: 'largeclassificationname', align: 'center'},
            {title: '中分类编号', key: 'middleclassificationid', align: 'center'},
            {title: '中分类名称',key: 'middleclassificationname', align: 'center'},
            {title: '小分类编号', key: 'littleclassificationid', align: 'center'},
            {title: '小分类名称',key: 'littleclassificationname', align: 'center'},
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
        ],//小分类数据显示
        card3: [
            {title: '选择',key: 'select',type: 'selection', width: 50,align: 'center'},
            {title: '序号',key: 'linenum', align: 'center', width: 75,render:(h,params)=>{
              return h("div",+params.row._index + 1 + (this.pageNum3-1)*this.pageSize3)
            }},
            {title: '大分类编号', key: 'largeclassificationid', align: 'center'},
            {title: '大分类名称',key: 'largeclassificationname', align: 'center'},
            {title: '中分类编号', key: 'middleclassificationid', align: 'center'},
            {title: '中分类名称',key: 'middleclassificationname', align: 'center'},
            {title: '小分类编号', key: 'littleclassificationid', align: 'center'},
            {title: '小分类名称',key: 'littleclassificationname', align: 'center'},
            {title: '细分类编号', key: 'fineclassificationid', align: 'center'},
            {title: '细分类名称',key: 'fineclassificationname', align: 'center'},
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
        ]//细分类数据显示
      }
    }
  },

  created(){
    //得到所有大分类信息
    axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
      this.startSearchCommodityClassification0)
    .then((result) => {
      this.allcc0=result.data
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    }),
    //得到所有中分类信息
    axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
      this.startSearchCommodityClassification1)
    .then((result) => {
      this.allcc1=result.data
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    }),
    //得到所有小分类信息
    axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
      this.startSearchCommodityClassification2)
    .then((result) => {
      this.allcc2=result.data
    })
    .catch((err) => {
      cconsole.log('请检查您的网络连接'+err)
    }),
    // getAllCC1(),
    // getAllCC2(),
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,
    this.startSearchCommodityClassification0)
    .then((result) => {
      this.commodityClassificationShow0=result.data.list
      this.total0=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    }),

    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,
      this.startSearchCommodityClassification1)
    .then((result) => {
      this.commodityClassificationShow1=result.data.list
      this.total1=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    }),

    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,
      this.startSearchCommodityClassification2)
    .then((result) => {
      this.commodityClassificationShow2=result.data.list
      this.total2=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    }),

    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=20&loginStatus=${sessionStorage.loginStatus}`,
      this.startSearchCommodityClassification3)
    .then((result) => {
      this.commodityClassificationShow3=result.data.list
      this.total3=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })

  },

  computed:{},

  methods:{
    getCcByTabPane(res){
      if(res == '0'){
        this.searchCcModel = {}
        this.searchCcModel.identification = "0"
        axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
          this.searchCcModel)
        .then((result) => {
          this.allcc0=result.data
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      }
      if(res == '1'){
        this.searchCcModel = {}
        this.searchCcModel.identification = "0"
        axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
          this.searchCcModel)
        .then((result) => {
          this.allcc0=result.data
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })

        this.searchCcModel = {}
        this.searchCcModel.identification = "1"
        axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
          this.searchCcModel)
        .then((result) => {
          this.allcc1=result.data
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      }

      if(res == '2' || res == '3'){
        this.searchCcModel = {}
        this.searchCcModel.identification = "0"
        axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
          this.searchCcModel)
        .then((result) => {
          this.allcc0=result.data
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })

        this.searchCcModel = {}
        this.searchCcModel.identification = "1"
        axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
          this.searchCcModel)
        .then((result) => {
          this.allcc1=result.data
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })

        this.searchCcModel = {}
        this.searchCcModel.identification = "2"
        axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
          this.searchCcModel)
        .then((result) => {
          this.allcc2=result.data
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      }

    },
    // clearM(){
    //   this.insertCommodityClassification.middleclassificationname = null
    //   this.updateCommodityClassification.middleclassificationname = null
    // },
    // clearML(){
    //   this.insertCommodityClassification.middleclassificationname = null
    //   this.insertCommodityClassification.littleclassificationname = null
    //   this.updateCommodityClassification.middleclassificationname = null
    //   this.updateCommodityClassification.littleclassificationname = null
    // },
    // clearL(){
    //   this.insertCommodityClassification.littleclassificationname = null
    //   this.updateCommodityClassification.littleclassificationname = null
    // },
    showaddmodal0(){
      this.insertCommodityClassification = {isstart:"0"};
      var myDate = new Date();
      this.insertCommodityClassification.registertime = myDate.toLocaleString('chinese', { hour12: false });
      this.modal_add_commodityclassification0=true
    },
    showaddmodal1(){
      this.insertCommodityClassification = {};
      this.insertCommodityClassification = {isstart:"0"};
      var myDate = new Date();
      this.insertCommodityClassification.registertime = myDate.toLocaleString('chinese', { hour12: false });
      this.modal_add_commodityclassification1=true
    },
    showaddmodal2(){
      this.insertCommodityClassification = {};
      this.insertCommodityClassification = {isstart:"0"};
      var myDate = new Date();
      this.insertCommodityClassification.registertime = myDate.toLocaleString('chinese', { hour12: false });
      this.modal_add_commodityclassification2=true
    },
    showaddmodal3(){
      this.insertCommodityClassification = {};
      this.insertCommodityClassification = {isstart:"0"};
      var myDate = new Date();
      this.insertCommodityClassification.registertime = myDate.toLocaleString('chinese', { hour12: false });
      this.modal_add_commodityclassification3=true
    },

    //得到所有大分类信息
    getAllCC0(){
      this.searchCcModel = {}
      this.searchCcModel.identification = "0"
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.allcc0=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    //得到所有中分类信息
    getAllCC1(){
      this.searchCcModel = {}
      this.searchCcModel.identification = "1"
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.allcc1=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    //得到所有小分类信息
    getAllCC2(){
      this.searchCcModel = {}
      this.searchCcModel.identification = "2"
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.allcc2=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    //根据大分类得到属于大分类的中分类 新增
    getMbyL(){
      this.searchCcModel = {}
      this.searchCcModel.identification = "1"
      this.searchCcModel.largeclassificationname = this.insertCommodityClassification.largeclassificationname
      this.insertCommodityClassification.middleclassificationname = ""
      this.insertCommodityClassification.littleclassificationname = ""
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.allmcc=result.data
        this.alllcc=[]
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    //根据大分类得到属于大分类的中分类 编辑
    getMbyLu(){
      this.searchCcModel = {}
      this.searchCcModel.identification = "1"
      this.searchCcModel.largeclassificationname = this.updateCommodityClassification.largeclassificationname
      this.updateCommodityClassification.middleclassificationname = ''
      this.updateCommodityClassification.littleclassificationname = ''
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.allmcc=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    //根据中分类得到属于中分类的小分类 新增
    getLbyM(){
      this.searchCcModel = {};
      this.searchCcModel.identification = "2";
      this.searchCcModel.middleclassificationname = this.insertCommodityClassification.middleclassificationname;
      if(typeof(this.searchCcModel.middleclassificationname) == "undefined"){
        this.searchCcModel.middleclassificationname = "不可能存在的中分类名称"
      }
      delete this.insertCommodityClassification.littleclassificationname
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.alllcc=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

    //根据中分类得到属于中分类的小分类 编辑
    getLbyMu(){
      this.searchCcModel = {}
      this.searchCcModel.identification = "2"
      this.searchCcModel.middleclassificationname = this.updateCommodityClassification.middleclassificationname
      if(typeof(this.searchCcModel.middleclassificationname) == "undefined"){
        this.searchCcModel.middleclassificationname = "不可能存在的中分类名称"
      }
      delete this.updateCommodityClassification.littleclassificationname
      axios.post(sessionStorage.http+`/selectCcByIdentification?loginStatus=${sessionStorage.loginStatus}`,
        this.searchCcModel)
      .then((result) => {
        this.alllcc=result.data
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

  // 大分类查询
  searchCommodityClassificationByCondition0(){
      this.searchCommodityClassification0.identification = "0"
      axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=${this.pageSize0}
        &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification0)
      .then((result) => {
        this.commodityClassificationShow0=result.data.list
        this.total0=result.data.total
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },
  // 中分类查询
  searchCommodityClassificationByCondition1(){
    this.searchCommodityClassification1.identification = "1"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=${this.pageSize1}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification1)
    .then((result) => {
      this.commodityClassificationShow1=result.data.list
      this.total1=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 小分类查询
  searchCommodityClassificationByCondition2(){
    this.searchCommodityClassification2.identification = "2"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=${this.pageSize2}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification2)
    .then((result) => {
      this.commodityClassificationShow2=result.data.list
      this.total2=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 细分类查询
  searchCommodityClassificationByCondition3(){
    this.searchCommodityClassification3.identification = "3"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=1&pageSize=${this.pageSize2}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification3)
    .then((result) => {
      this.commodityClassificationShow3=result.data.list
      this.total3=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 得到需要删除项
  onSelectionChange0 (row) {
      this.deleteCommodityClassification0 = row
      if(this.deleteCommodityClassification0.length>0){
        this.deleteButtonFlag0=false
      }else{
        this.deleteButtonFlag0=true
      }
    },
  // 得到需要删除项
  onSelectionChange1 (row) {
      this.deleteCommodityClassification1 = row
      if(this.deleteCommodityClassification1.length>0){
        this.deleteButtonFlag1=false
      }else{
        this.deleteButtonFlag1=true
      }
    },
  // 得到需要删除项
  onSelectionChange2 (row) {
      this.deleteCommodityClassification2 = row
      if(this.deleteCommodityClassification2.length>0){
        this.deleteButtonFlag2=false
      }else{
        this.deleteButtonFlag2=true
      }
    },
  // 得到需要删除项
  onSelectionChange3 (row) {
        this.deleteCommodityClassification3 = row
        if(this.deleteCommodityClassification3.length>0){
          this.deleteButtonFlag3=false
        }else{
          this.deleteButtonFlag3=true
        }
      },
  // 大分类删除
  deleteSelection0(){
    if(this.deleteCommodityClassification0.length==0){
        this.deleteconfirm0 = false;
        this.$Message.info('请先勾选需要删除项');
        return;
    }
    var flag=false;
    for(var i in this.deleteCommodityClassification0){
      if(this.deleteCommodityClassification0[i].isstart=='1'){
        flag=true;
      }
    }
    if(flag){
      this.deleteconfirm0 = false;
      this.$Message.error({
        content:'勾选项中包含已启用的，已启用的不可删除',
        duration:5
      });
      return;
    }
    axios.post(sessionStorage.http+`/deleteCommodityClassification?pageNum=${this.pageNum0}&pageSize=${this.pageSize0}
      &loginStatus=${sessionStorage.loginStatus}`, this.deleteCommodityClassification0)
    .then((result) => {
      this.commodityClassificationShow0=result.data.list
      this.total0=result.data.total
      this.deleteconfirm0 = false;
      this.deleteButtonFlag0 = true;
      this.searchCommodityClassification0 = {};
      this.$Message.success('删除成功');
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 中分类删除
  deleteSelection1(){
      if(this.deleteCommodityClassification1.length==0){
        this.deleteconfirm1 = false;
        this.$Message.info('请先勾选需要删除项');
        return;
      }
      var flag=false;
      for(var i in this.deleteCommodityClassification1){
        if(this.deleteCommodityClassification1[i].isstart=='1'){
          flag=true;
        }
      }
      if(flag){
        this.deleteconfirm1 = false;
        this.$Message.error({
          content:'勾选项中包含已启用的，已启用的不可删除',
          duration:5
        });
        return;
      }
      axios.post(sessionStorage.http+`/deleteCommodityClassification?pageNum=${this.pageNum1}&pageSize=${this.pageSize1}
        &loginStatus=${sessionStorage.loginStatus}`,this.deleteCommodityClassification1)
      .then((result) => {
        this.commodityClassificationShow1=result.data.list
        this.total1=result.data.total
        this.deleteconfirm1 = false;
        this.deleteButtonFlag1 = true;
        this.searchCommodityClassification1 = {};
        this.$Message.success('删除成功');
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
  },
  // 小分类删除
  deleteSelection2(){
    if(this.deleteCommodityClassification2.length==0){
      this.deleteconfirm2 = false;
      this.$Message.info('请先勾选需要删除项');
      return;
    }
    var flag=false;
    for(var i in this.deleteCommodityClassification2){
      if(this.deleteCommodityClassification2[i].isstart=='1'){
        flag=true;
      }
    }
    if(flag){
      this.deleteconfirm2 = false;
      this.$Message.error({
        content:'勾选项中包含已启用的，已启用的不可删除',
        duration:5
      });
      return;
    }
    axios.post(sessionStorage.http+`/deleteCommodityClassification?pageNum=${this.pageNum2}&pageSize=${this.pageSize2}
      &loginStatus=${sessionStorage.loginStatus}`, this.deleteCommodityClassification2)
    .then((result) => {
      this.commodityClassificationShow2=result.data.list
      this.total2=result.data.total
      this.deleteconfirm2 = false;
      this.deleteButtonFlag2 = true;
      this.searchCommodityClassification2 = {};
      this.$Message.success('删除成功');
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 细分类删除
  deleteSelection3(){
    if(this.deleteCommodityClassification3.length==0){
      this.deleteconfirm3 = false;
      this.$Message.info('请先勾选需要删除项');
      return;
    }
    var flag=false;
    for(var i in this.deleteCommodityClassification3){
      if(this.deleteCommodityClassification3[i].isstart=='1'){
        flag=true;
      }
    }
    if(flag){
      this.deleteconfirm3 = false;
      this.$Message.error({
        content:'勾选项中包含已启用的，已启用的不可删除',
        duration:5
      });
      return;
    }
    axios.post(sessionStorage.http+`/deleteCommodityClassification?pageNum=${this.pageNum3}&pageSize=${this.pageSize3}
      &loginStatus=${sessionStorage.loginStatus}`, this.deleteCommodityClassification3)
    .then((result) => {
      this.commodityClassificationShow3=result.data.list
      this.total3=result.data.total
      this.deleteconfirm3 = false;
      this.deleteButtonFlag3 = true;
      this.searchCommodityClassification3 = {};
      this.$Message.success('删除成功');
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 得到需要更新项
  updateSelection(res){
      this.getAllCC0();
      this.getAllCC1();
      this.getAllCC2();
      this.getMbyL();
      this.getMbyLu();
      this.getLbyM();
      this.getLbyMu();
      this.updateCommodityClassification=res
      if(this.updateCommodityClassification.identification == "0"){
        this.modal_update_commodityclassification0 = true
      }
      if(this.updateCommodityClassification.identification == "1"){
        this.modal_update_commodityclassification1 = true
      }
      if(this.updateCommodityClassification.identification == "2"){
        this.modal_update_commodityclassification2 = true
      }
      if(this.updateCommodityClassification.identification == "3"){
        this.modal_update_commodityclassification3 = true
      }
    },
  // 大分类更新
  update0 () {
    if(!this.clickSt){
      return
    }
    if(this.updateCommodityClassification.largeclassificationid == '' || this.updateCommodityClassification.largeclassificationname == '' ||
      this.updateCommodityClassification.registertime == '' || this.updateCommodityClassification.largeclassificationid == undefined ||
      this.updateCommodityClassification.largeclassificationname == undefined || this.updateCommodityClassification.registertime == undefined){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
    }
    this.itemType.largeclassificationname = this.updateCommodityClassification.largeclassificationname
    axios.post(sessionStorage.http+`/judComClassIsUsed`,this.itemType)
      .then((result) => {
        if(result.data && this.updateCommodityClassification.isstart == '0'){
          this.$Message.error({
            content:'该商品大分类已被商品使用，不可禁用！',
            duration:5
          });
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
        }else{
          this.updateCommodityClassification.registertime = this.updateCommodityClassification.registertime.getTime()+''
          axios.post(sessionStorage.http+`/updateCommodityClassification?pageNum=${this.pageNum0}&pageSize=${this.pageSize0}
            &loginStatus=${sessionStorage.loginStatus}&registertime=${this.updateCommodityClassification.registertime}`,
            this.updateCommodityClassification)
          .then((result) => {
            this.commodityClassificationShow0=result.data.list
            this.total0=result.data.total
            this.modal_update_commodityclassification0 = false,
            // this.updateCommodityClassification = {},
            this.$Message.success('商品种类修改成功');
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
  // 中分类更新
  update1 () {
    if(!this.clickSt){
      return
    }
      if(this.updateCommodityClassification.largeclassificationname == '' ||
        this.updateCommodityClassification.middleclassificationid == '' ||
        this.updateCommodityClassification.middleclassificationname == '' ||
        this.updateCommodityClassification.registertime == '' ||
        this.updateCommodityClassification.largeclassificationname == undefined ||
        this.updateCommodityClassification.middleclassificationid == undefined ||
        this.updateCommodityClassification.middleclassificationname == undefined ||
        this.updateCommodityClassification.registertime == undefined){
          this.$Message.error('带*的不能为空');
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
          return;
        }
        for (var index in this.allcc0) {
          if (this.updateCommodityClassification.largeclassificationname == this.allcc0[index].largeclassificationname) {
            this.updateCommodityClassification.largeclassificationid = this.allcc0[index].largeclassificationid
          }
        }
        this.updateCommodityClassification.registertime = this.updateCommodityClassification.registertime.getTime()+''
        axios.post(sessionStorage.http+`/updateCommodityClassification?pageNum=${this.pageNum1}&pageSize=${this.pageSize1}
          &loginStatus=${sessionStorage.loginStatus}`, this.updateCommodityClassification)
        .then((result) => {
          if(result.data==null){
            this.modal_update_commodityclassification1 = false,
            this.$Message.error({
              content:'该商品中分类已被商品使用，不可禁用！',
              duration:5
            });
          }else{
            this.commodityClassificationShow1=result.data.list
            this.total1=result.data.total
            this.modal_update_commodityclassification1 = false,
            this.updateCommodityClassification = {},
            this.$Message.success('商品种类修改成功');
          }
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      },
  // 小分类更新
  update2 () {
    if(!this.clickSt){
      return
    }
      if(this.updateCommodityClassification.largeclassificationname == '' ||
        this.updateCommodityClassification.middleclassificationname == '' ||
        this.updateCommodityClassification.littleclassificationid == '' ||
        this.updateCommodityClassification.littleclassificationname == '' ||
        this.updateCommodityClassification.registertime == '' ||
        this.updateCommodityClassification.largeclassificationname == undefined ||
        this.updateCommodityClassification.middleclassificationname == undefined ||
        this.updateCommodityClassification.littleclassificationid == undefined ||
        this.updateCommodityClassification.littleclassificationname == undefined ||
        this.updateCommodityClassification.registertime == undefined){
          this.$Message.error('带*的不能为空');
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
          return;
        }
        for (var index in this.allcc0) {
          if (this.updateCommodityClassification.largeclassificationname == this.allcc0[index].largeclassificationname) {
            this.updateCommodityClassification.largeclassificationid = this.allcc0[index].largeclassificationid
          }
        }
        for (var index in this.allcc1) {
          if (this.updateCommodityClassification.middleclassificationname == this.allcc1[index].middleclassificationname) {
            this.updateCommodityClassification.middleclassificationid = this.allcc1[index].middleclassificationid
          }
        }
        this.updateCommodityClassification.registertime = this.updateCommodityClassification.registertime.getTime()+''
        axios.post(sessionStorage.http+`/updateCommodityClassification?pageNum=${this.pageNum2}&pageSize=${this.pageSize2}
          &loginStatus=${sessionStorage.loginStatus}`, this.updateCommodityClassification)
        .then((result) => {
          if(result.data==null){
            this.modal_update_commodityclassification2 = false,
            this.$Message.error({
              content:'该商品小分类已被商品使用，不可禁用！',
              duration:5
            });
          }else{
            this.commodityClassificationShow2=result.data.list
            this.total2=result.data.total
            this.modal_update_commodityclassification2 = false,
            this.updateCommodityClassification = {},
            this.$Message.success('商品种类修改成功');
          }
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },
  // 细分类更新
  update3 () {
    if(!this.clickSt){
      return
    }
      if(this.updateCommodityClassification.largeclassificationname == '' ||
        this.updateCommodityClassification.middleclassificationname == '' ||
        this.updateCommodityClassification.littleclassificationname == '' ||
        this.updateCommodityClassification.fineclassificationid == '' ||
        this.updateCommodityClassification.fineclassificationname == '' ||
        this.updateCommodityClassification.registertime == '' ||
        this.updateCommodityClassification.largeclassificationname == undefined ||
        this.updateCommodityClassification.middleclassificationname == undefined ||
        this.updateCommodityClassification.littleclassificationname == undefined ||
        this.updateCommodityClassification.fineclassificationid == undefined ||
        this.updateCommodityClassification.fineclassificationname == undefined ||
        this.updateCommodityClassification.registertime == undefined){
          this.$Message.error('带*的不能为空');
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
          return;
        }
        for (var index in this.allcc0) {
          if (this.updateCommodityClassification.largeclassificationname == this.allcc0[index].largeclassificationname) {
            this.updateCommodityClassification.largeclassificationid = this.allcc0[index].largeclassificationid
          }
        }
        for (var index in this.allcc1) {
          if (this.updateCommodityClassification.middleclassificationname == this.allcc1[index].middleclassificationname) {
            this.updateCommodityClassification.middleclassificationid = this.allcc1[index].middleclassificationid
          }
        }
        for (var index in this.allcc2) {
          if (this.updateCommodityClassification.littleclassificationname == this.allcc2[index].littleclassificationname) {
            this.updateCommodityClassification.littleclassificationid = this.allcc2[index].littleclassificationid
          }
        }
        this.updateCommodityClassification.registertime = this.updateCommodityClassification.registertime.getTime()+''
        axios.post(sessionStorage.http+`/updateCommodityClassification?pageNum=${this.pageNum3}&pageSize=${this.pageSize3}
          &loginStatus=${sessionStorage.loginStatus}`, this.updateCommodityClassification)
        .then((result) => {
          if(result.data==null){
            this.modal_update_commodityclassification3 = false,
            this.$Message.error({
              content:'该商品细分类已被商品使用，不可禁用！',
              duration:5
            });
          }else{
            this.commodityClassificationShow3=result.data.list
            this.total3=result.data.total
            this.modal_update_commodityclassification3 = false,
            this.updateCommodityClassification = {},
            this.$Message.success('商品种类修改成功');
          }
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      },
  // 取消更新
  // update_cancel () {
  //     this.updateCommodityClassification = {}
  //     this.modal_update_commodityclassification0 = false
  //     this.modal_update_commodityclassification1 = false
  //     this.modal_update_commodityclassification2 = false
  //     this.modal_update_commodityclassification3 = false
  //   },
  // 大分类新增
  insert0 () {
    if(!this.clickSt){
      return
    }
      if(this.insertCommodityClassification.largeclassificationid == '' ||
      this.insertCommodityClassification.largeclassificationname == '' ||
      this.insertCommodityClassification.registertime == '' ||
      this.insertCommodityClassification.largeclassificationid == undefined ||
      this.insertCommodityClassification.largeclassificationname == undefined ||
      this.insertCommodityClassification.registertime == undefined ){
          this.$Message.error('带*的不能为空');
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
          return;
        }

        axios.get(sessionStorage.http+`/judComClassRepeat0?largeclassificationid=${this.insertCommodityClassification.largeclassificationid}`)
          .then((result) => {
            if(result.data=='1'){
              this.$Message.error({
                content:'商品大分类编号不可重复',
                duration:5
              });
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)}
            else{
              this.insertCommodityClassification.registertime = this.insertCommodityClassification.registertime.getTime()+''
              this.insertCommodityClassification.identification = "0"
              axios.post(sessionStorage.http+`/insertCommodityClassification?pageNum=${this.pageNum0}&pageSize=${this.pageSize0}
                &loginStatus=${sessionStorage.loginStatus}`, this.insertCommodityClassification)
              .then((result) => {
                this.commodityClassificationShow0=result.data.list
                this.total0=result.data.total
                this.insertCommodityClassification = {isstart:"是"},
                this.modal_add_commodityclassification0 = false;
                this.$Message.success('商品大种类已添加');
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
  // 中分类新增
  insert1 () {
    if(!this.clickSt){
      return
    }
    if(this.insertCommodityClassification.largeclassificationname == '' || this.insertCommodityClassification.middleclassificationid == '' ||
    this.insertCommodityClassification.middleclassificationname == '' || this.insertCommodityClassification.registertime == '' ||
    this.insertCommodityClassification.largeclassificationname == undefined || this.insertCommodityClassification.middleclassificationid == undefined ||
    this.insertCommodityClassification.middleclassificationname == undefined || this.insertCommodityClassification.registertime == undefined){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
      }

    axios.get(sessionStorage.http+`/judComClassRepeat1?middleclassificationid=${this.insertCommodityClassification.middleclassificationid}`)
      .then((result) => {
        if(result.data=='1'){
          this.$Message.error({
            content:'商品中分类编号不可重复',
            duration:5
          });
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)}
        else{
          for (var index in this.allcc0) {
            if (this.insertCommodityClassification.largeclassificationname == this.allcc0[index].largeclassificationname) {
              this.insertCommodityClassification.largeclassificationid = this.allcc0[index].largeclassificationid
            }
          }
          this.insertCommodityClassification.registertime = this.insertCommodityClassification.registertime.getTime()+''
          this.insertCommodityClassification.identification = "1"
          axios.post(sessionStorage.http+`/insertCommodityClassification?pageNum=${this.pageNum1}&pageSize=${this.pageSize1}
            &loginStatus=${sessionStorage.loginStatus}`, this.insertCommodityClassification)
          .then((result) => {
            this.commodityClassificationShow1=result.data.list
            this.total1=result.data.total
            this.modal_add_commodityclassification1 = false;
            this.$Message.success('商品种类已添加');
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
  // 小分类新增
  insert2 () {
    if(!this.clickSt){
      return
    }
      if(this.insertCommodityClassification.largeclassificationname == '' ||
      this.insertCommodityClassification.middleclassificationname == '' ||
      this.insertCommodityClassification.littleclassificationid == '' ||
      this.insertCommodityClassification.littleclassificationname == '' ||
      this.insertCommodityClassification.registertime == '' ||
      this.insertCommodityClassification.largeclassificationname == undefined ||
      this.insertCommodityClassification.middleclassificationname == undefined ||
      this.insertCommodityClassification.littleclassificationid == undefined ||
      this.insertCommodityClassification.littleclassificationname == undefined ||
      this.insertCommodityClassification.registertime == undefined){
          this.$Message.error('带*的不能为空');
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)
          return;
      }

      axios.get(sessionStorage.http+`/judComClassRepeat2?littleclassificationid=${this.insertCommodityClassification.littleclassificationid}`)
        .then((result) => {
          if(result.data=='1'){
            this.$Message.error({
              content:'商品小分类编号不可重复',
              duration:5
            });
            this.clickSt = false
            setTimeout(() => {
              this.clickSt = true
            },2000)}
          else{
            for (var index in this.allcc0) {
              if (this.insertCommodityClassification.largeclassificationname == this.allcc0[index].largeclassificationname) {
                this.insertCommodityClassification.largeclassificationid = this.allcc0[index].largeclassificationid
              }
            }
            for (var index in this.allcc1) {
              if (this.insertCommodityClassification.middleclassificationname == this.allcc1[index].middleclassificationname) {
                this.insertCommodityClassification.middleclassificationid = this.allcc1[index].middleclassificationid
              }
            }
            this.insertCommodityClassification.registertime = this.insertCommodityClassification.registertime.getTime()+''
            this.insertCommodityClassification.identification = "2"
            axios.post(sessionStorage.http+`/insertCommodityClassification?pageNum=${this.pageNum2}&pageSize=${this.pageSize2}
              &loginStatus=${sessionStorage.loginStatus}`, this.insertCommodityClassification)
            .then((result) => {
              this.commodityClassificationShow2=result.data.list
              this.total2=result.data.total
              this.modal_add_commodityclassification2 = false;
              this.$Message.success('商品种类已添加');
            })
            .catch((err) => {
              console.log('请检查您的网络连接'+err.message)
            })
          }
        })
        .catch((err) => {
          console.log('请检查您的网络连接'+err)
        })
      },
  // 细分类新增
  insert3 () {
    if(!this.clickSt){
      return
    }
    if(this.insertCommodityClassification.largeclassificationname == '' ||
    this.insertCommodityClassification.middleclassificationname == '' ||
    this.insertCommodityClassification.littleclassificationname == '' ||
    this.insertCommodityClassification.fineclassificationid == '' ||
    this.insertCommodityClassification.fineclassificationname == '' ||
    this.insertCommodityClassification.registertime == '' ||
    this.insertCommodityClassification.largeclassificationname == undefined ||
    this.insertCommodityClassification.middleclassificationname == undefined ||
    this.insertCommodityClassification.littleclassificationname == undefined ||
    this.insertCommodityClassification.fineclassificationid == undefined ||
    this.insertCommodityClassification.fineclassificationname == undefined ||
    this.insertCommodityClassification.registertime == undefined){
        this.$Message.error('带*的不能为空');
        this.clickSt = false
        setTimeout(() => {
          this.clickSt = true
        },2000)
        return;
    }

    axios.get(sessionStorage.http+`/judComClassRepeat3?fineclassificationid=${this.insertCommodityClassification.fineclassificationid}`)
      .then((result) => {
        if(result.data=='1'){
          this.$Message.error({
            content:'商品细分类编号不可重复',
            duration:5
          });
          this.clickSt = false
          setTimeout(() => {
            this.clickSt = true
          },2000)}
        else{
          for (var index in this.allcc0) {
            if (this.insertCommodityClassification.largeclassificationname == this.allcc0[index].largeclassificationname) {
              this.insertCommodityClassification.largeclassificationid = this.allcc0[index].largeclassificationid
            }
          }
          for (var index in this.allcc1) {
            if (this.insertCommodityClassification.middleclassificationname == this.allcc1[index].middleclassificationname) {
              this.insertCommodityClassification.middleclassificationid = this.allcc1[index].middleclassificationid
            }
          }
          for (var index in this.allcc2) {
            if (this.insertCommodityClassification.littleclassificationname == this.allcc2[index].littleclassificationname) {
              this.insertCommodityClassification.littleclassificationid = this.allcc2[index].littleclassificationid
            }
          }
          this.insertCommodityClassification.registertime = this.insertCommodityClassification.registertime.getTime()+''
          this.insertCommodityClassification.identification = "3"
          axios.post(sessionStorage.http+`/insertCommodityClassification?pageNum=${this.pageNum3}&pageSize=${this.pageSize3}
            &loginStatus=${sessionStorage.loginStatus}`, this.insertCommodityClassification)
          .then((result) => {
            this.commodityClassificationShow3=result.data.list
            this.total3=result.data.total
            this.insertCommodityClassification = {isstart:"是"},
            this.modal_add_commodityclassification3 = false;
            this.$Message.success('商品种类已添加');
          })
          .catch((err) => {
            console.log('请检查您的网络连接'+err.message)
          })
        }
      })
      .catch((err) => {
        console.log('请检查您的网络连接'+err)
      })
    },

  // 取消新增
  // insert_cancel () {
  //     this.insertCommodityClassification = {isstart:"是"}
  //     this.modal_add_commodityclassification0 = false
  //     this.modal_add_commodityclassification1 = false
  //     this.modal_add_commodityclassification2 = false
  //     this.modal_add_commodityclassification3 = false
  //   },
  // 大分类分页
  handleChangePage0 (value) {
    this.pageNum0 = value
    this.searchCommodityClassification0.identification = "0"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum0}&pageSize=${this.pageSize0}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification0)
    .then((result) => {
      this.commodityClassificationShow0=result.data.list
      this.total0=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 中分类分页
  handleChangePage1 (value) {
    this.pageNum1 = value
    this.searchCommodityClassification1.identification = "1"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum1}&pageSize=${this.pageSize1}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification1)
    .then((result) => {
      this.commodityClassificationShow1=result.data.list
      this.total1=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 小分类分页
  handleChangePage2 (value) {
    this.pageNum2 = value
    this.searchCommodityClassification2.identification = "2"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum2}&pageSize=${this.pageSize2}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification2)
    .then((result) => {
      this.commodityClassificationShow2=result.data.list
      this.total2=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 细分类分页
  handleChangePage3 (value) {
    this.pageNum3 = value
    this.searchCommodityClassification3.identification = "3"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum3}&pageSize=${this.pageSize3}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification3)
    .then((result) => {
      this.commodityClassificationShow3=result.data.list
      this.total3=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 大分类每页显示
  handleChangePageSize0 (value){
    this.pageNum0 = 1
    this.pageSize0 = value
    this.searchCommodityClassification0.identification = "0"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum0}&pageSize=${this.pageSize0}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification0)
    .then((result) => {
      this.commodityClassificationShow0=result.data.list
      this.total0=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 中分类每页显示
  handleChangePageSize1 (value){
    this.pageNum1 = 1
    this.pageSize1 = value
    this.searchCommodityClassification1.identification = "1"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum1}&pageSize=${this.pageSize1}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification1)
    .then((result) => {
      this.commodityClassificationShow1=result.data.list
      this.total1=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 小分类每页显示
  handleChangePageSize2 (value){
    this.pageNum2 = 1
    this.pageSize2 = value
    this.searchCommodityClassification2.identification = "2"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum2}&pageSize=${this.pageSize2}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification2)
    .then((result) => {
      this.commodityClassificationShow2=result.data.list
      this.total2=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },
  // 细分类每页显示
  handleChangePageSize3 (value){
    this.pageNum3 = 1
    this.pageSize3 = value
    this.searchCommodityClassification3.identification = "3"
    axios.post(sessionStorage.http+`/getCommodityClassificationByCondition?pageNum=${this.pageNum3}&pageSize=${this.pageSize3}
      &loginStatus=${sessionStorage.loginStatus}`, this.searchCommodityClassification3)
    .then((result) => {
      this.commodityClassificationShow3=result.data.list
      this.total3=result.data.total
    })
    .catch((err) => {
      console.log('请检查您的网络连接'+err)
    })
  },

    //登记时间
    onStartTimeChange0(startTime, type) {
          this.endTimeOption0 = {
            disabledDate(endTime) {
              return endTime < new Date(startTime)
            }
          }
          this.searchCommodityClassificationByCondition0();
        },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} date 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onEndTimeChange0(endTime, type) {
        this.startTimeOption0 = {
          disabledDate(startTime) {
            return startTime > new Date(endTime)
          }
        }
        this.searchCommodityClassificationByCondition0();
      },

      //登记时间
      onStartTimeChange1(startTime, type) {
            this.endTimeOption1 = {
              disabledDate(endTime) {
                return endTime < new Date(startTime)
              }
            }
            this.searchCommodityClassificationByCondition1();
          },
        /**
         * 结束时间发生变化时触发,设置开始时间不可选择的日期
         * 开始时间小于等于结束时间,且小于等于当前时间
         * @param {string} date 格式化后的日期
         * @param {string} type 当前的日期类型
         */
        onEndTimeChange1(endTime, type) {
          this.startTimeOption1 = {
            disabledDate(startTime) {
              return startTime > new Date(endTime)
            }
          }
          this.searchCommodityClassificationByCondition1();
        },

        //登记时间
        onStartTimeChange2(startTime, type) {
              this.endTimeOption2 = {
                disabledDate(endTime) {
                  return endTime < new Date(startTime)
                }
              }
              this.searchCommodityClassificationByCondition2();
            },
          /**
           * 结束时间发生变化时触发,设置开始时间不可选择的日期
           * 开始时间小于等于结束时间,且小于等于当前时间
           * @param {string} date 格式化后的日期
           * @param {string} type 当前的日期类型
           */
          onEndTimeChange2(endTime, type) {
            this.startTimeOption2 = {
              disabledDate(startTime) {
                return startTime > new Date(endTime)
              }
            }
            this.searchCommodityClassificationByCondition2();
          },

          //登记时间
          onStartTimeChange3(startTime, type) {
                this.endTimeOption3 = {
                  disabledDate(endTime) {
                    return endTime < new Date(startTime)
                  }
                }
                this.searchCommodityClassificationByCondition3();
              },
            /**
             * 结束时间发生变化时触发,设置开始时间不可选择的日期
             * 开始时间小于等于结束时间,且小于等于当前时间
             * @param {string} date 格式化后的日期
             * @param {string} type 当前的日期类型
             */
            onEndTimeChange3(endTime, type) {
              this.startTimeOption3 = {
                disabledDate(startTime) {
                  return startTime > new Date(endTime)
                }
              }
              this.searchCommodityClassificationByCondition3();
            },

  }
}

</script>

<style lang="css">
  .ivu-table-overflowX{
    overflow-x: hidden;
  }
</style>

<style lang="less">
  .commodityclassificationmodalstyle{

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
   //   vertical-align: middle;
   // }
   // .ivu-table td{
   //   background-color:#fff;
   //   height: 40px;
   // }
   // .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
   //   background-color: #f9f9f9;
   //   height: 40px;
   // }
   // .ivu-input-icon{
   //      position: absolute;
   //      right:5px;
   //  }
   // .ivu-input-icon-normal+.ivu-input{
   //   width: 160px;
   // }
  }
  .commodityclassification{
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
