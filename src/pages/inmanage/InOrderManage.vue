<template>
  <div class="inOrdreManage">
    <Form class="formFilter" v-model="formFilter" :label-width='130'>
      <Row>
        <Col span="6">
          <FormItem :label="$t('common.purchaseOrderId')">
            <Input v-model="formFilter.inwarenoticeid" @on-change="e=>{this.formFilter.pagenum=1;this.getData()}"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.supplier')">
            <Select v-model="formFilter.supplier" clearable @on-change="e=>{this.formFilter.pagenum=1;this.getData()}">
              <Option v-for="item in suppliers" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.status')">
            <Select v-model="formFilter.status" clearable @on-change="e=>{this.formFilter.pagenum=1;this.getData()}">
              <Option v-for="item in statuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem :label="$t('common.inorderType')">
            <Select v-model="formFilter.inwaretype" clearable @on-change="e=>{this.formFilter.pagenum=1;this.getData()}">
              <Option v-for="item in inwaretypes" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem :label="$t('common.inDate')">
            <Row>
              <Col span="11">
                <DatePicker type="date" format="yyyy-MM-dd" @on-change="e=>{this.formFilter.pagenum=1;this.getData()}" v-model="formFilter.indates" :options="startTime"></DatePicker>
              </Col>
              <Col span="2"><span>-</span></Col>
              <Col span="11">
                <DatePicker type="date" format="yyyy-MM-dd" @on-change="e=>{this.formFilter.pagenum=1;this.getData()}" v-model="formFilter.indatee" :options="endTime"></DatePicker>
              </Col>
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div class="spaceBetween">
      <div>
        <!-- <Button :type="isSelected?'error':'default'" class="btnForm" shape="circle" icon="md-trash">删除选中项</Button> -->
      </div>
      <div>
        <Button class="btnForm" shape="circle" type="primary" v-if="$store.state.controls.M_2_200710103207_insert" @click="showInsert">{{$t('actions.insert')}}</Button>
        <Button :type="isSelected?'primary':'default'" v-if="$store.state.controls.M_2_200710103207_confirm" class="btnForm" shape="circle" @click="confirm">{{$t('actions.confirm')}}</Button>
        <Button :type="isSelected?'primary':'default'" class="btnForm" v-if="$store.state.controls.M_2_200710103207_print" shape="circle" @click="showPrint">{{$t('actions.print')}}</Button>
      </div>
    </div>

    <Table class="table" :height="tableHeight" ref="table" border stripe :columns="columns" :data="tableData" @on-selection-change="(e)=>{isSelected = e.length>0}" @on-row-dblclick="showUpdate"></Table>

    <div class="page">
      <Page show-elevator show-sizer show-total :total="total" :current="formFilter.pagenum" :page-size="formFilter.pagesize" :page-size-opts="[10,20,30]" @on-change="e=>{this.formFilter.pagenum = e;this.getData()}" @on-page-size-change="e=>{this.formFilter.pagesize=e;this.formFilter.pagenum=1;this.getData()}"></Page>
    </div>

    <Modal v-model="modal" :title="$t('actions.editPattern',[$t('common.inorder')])" @on-visible-change="close" :width="1200" :footer-hide="true" >
      <Form v-model="modalForm" ref="modalForm" :disabled="!isInput" :label-width="100">
        <Row>
          <Col span="6" v-show="isUpdate">
            <FormItem :label="$t('common.inorderId')">
              <Input v-model="modalForm.inwareid" ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.inorderType')">
              <Select clearable v-model="modalForm.inwaretype">
                <Option v-for="item in inwaretypes" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.inDate')">
              <DatePicker v-model="modalForm.indate" format="yyyy-MM-dd" type="date"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.supplier')">
              <Select clearable v-model="modalForm.supplierid" >
                <Option v-for="(item,index) in suppliers" :key='index' :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.inDepart')">
              <Select clearable v-model="modalForm.inwaredepart" >
                <Option v-for="item in departs" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.inWorker')">
              <Select clearable ref="worker" v-model="modalForm.personid">
                <Option v-for="item in workers.filter(item=>{return item.deptid == modalForm.inwaredepart})" :label-in-value="true" @on-change="(value)=>{console.log(value)}" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.note')">
              <Input v-model="modalForm.remark" ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div class="spaceBetween" v-if="$store.state.controls.M_2_200710103207_update">
        <div>
          <Button icon="md-trash" v-show="isInput" :type="isModalSelected ? 'error': 'default'" shape="circle" class="btnForm" @click="deleteDetails">{{$t('actions.deleteSelected')}}</Button>
        </div>
        <div>
          <Button :type="isModalSelected ? 'primary': 'default'" v-if='$store.state.controls.M_2_200710103207_initialTest' v-show="!isInput"  class="btnForm" shape="circle" @click="initialTest">{{$t('actions.initialTest')}}</Button>
          <Button :type="isModalSelected ? 'primary': 'default'" v-show="isInput"  class="btnForm" shape="circle" @click="addRows">{{$t('actions.addRow')}}</Button>
          <Button type="primary" shape="circle" v-show="isInput" class="btnForm" @click="submit">{{$t('actions.submit')}}</Button>
        </div>
      </div>
      <Table ref="modalTable" :height="400" :columns="modalColumns" :data="modalData" border stripe @on-selection-change="e=>{isModalSelected = e.length>0}">
      </Table>

    </Modal>
    <Modal v-model="printModal" :footer-hide="true" title="入库单打印" :width="1000">
      <div class="flexEnd">
        <Button type="primary" v-print="'#print'">打印</Button>
      </div>
      <div id="print" class="printContainer">
        <PrintModel1 v-for="(item,index) in this.printData" :key="index" :suppliers="suppliers" :workers="workers" :index="index" :total="printData.length" :data="item" :id="'printtest'+index"></PrintModel1>
      </div>

    </Modal>
    <!-- 初验记录 -->
    <Modal v-model="initialTestModal" :width="1200" title="初验登记">
      <Form ref="initialTestModel" :model="initialTestModel" class="formValidate" :rules="initialValidate" :label-width="140">
        <Row>
          <Col span="6">
            <FormItem label="原辅料名称" prop="mitemname">
              <Input v-model="initialTestModel.mitemname"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="原辅料外包装名称" prop="mitemspecname">
              <Input v-model="initialTestModel.mitemspecname"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="交货单原辅料名称" prop="sourcemitemname">
              <Input v-model="initialTestModel.sourcemitemname"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="货号" prop="mitemid">
              <Input v-model="initialTestModel.mitemid"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="级别" prop="mitemgradle">
              <Input v-model="initialTestModel.mitemgradle"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="到货日期" prop="deliverydte">
              <DatePicker v-model="initialTestModel.deliverydte"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="最大包装规格" prop="maxmitemspec">
              <Input v-model="initialTestModel.maxmitemspec"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="最小包装规格" prop="minmitemspec">
              <Input v-model="initialTestModel.minmitemspec"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="厂家批号" prop="producercode">
              <Input v-model="initialTestModel.producercode"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="本厂批号" prop="batchno">
              <Input v-model="initialTestModel.batchno"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="件数" prop="num">
              <Input number v-model="initialTestModel.num"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="接收总量" prop="receiveqty">
              <Input number v-model="initialTestModel.receiveqty"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="有效期至" prop="validatedate">
              <DatePicker v-model="initialTestModel.validatedate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="生产厂家" prop="producercode">
              <Input v-model="initialTestModel.producercode"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="经销商" prop="dealer">
              <Input v-model="initialTestModel.dealer"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="是否合格供应商" prop="suppisqualified">
              <Select v-model="initialTestModel.suppisqualified">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="票物是否相符" prop="iscomplete">
              <Select v-model="initialTestModel.iscomplete">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="包装是否完好" prop="packingisok">
              <Select v-model="initialTestModel.packingisok">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="检验报告是否合格" prop="checkisok">
              <Select v-model="initialTestModel.checkisok">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="运输是否合格" prop="transportisok">
              <Select v-model="initialTestModel.transportisok">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="冷藏是否合格" prop="freezingisok">
              <Select v-model="initialTestModel.freezingisok">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="冷冻是否合格" prop="coldisok">
              <Select v-model="initialTestModel.coldisok">
                <Option v-for="item in testType" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="入库完成时间" prop="warefinishdate">
              <DatePicker v-model="initialTestModel.warefinishdate"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="record(0)">不接收</Button>
        <Button type="primary" @click="record(1)">接收</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import PrintModel1 from "../../components/PrintModel1.vue"
  export default{
    name:"inOrderManage",
    components:{
      PrintModel1
    },

    data(){
      return {
        //初验信息
        initialTestModal:false,
        initialTestModel:{
          iqcid:null,
          inwaredetailid:null,
          mitemname:null,
          mitemid:null,
          deliverydate:null,
          num:null,
          receiveqty:null,
          suppisqualified:null,
          iscomplete:null,
          packingisok:null,
          checkisok:null,
          transportisok:null,
          coldisok:null,
          freezingisok:null,
          warefinishdate:null,

        },
        initialValidate:{
          iqcid:[
            {required:true,trigger:'change',message:"不可为空"}
          ],
          inwaredetailid:[
            {required:true,trigger:'change',message:"不可为空"}
          ],
          mitemname:[
            {required:true,trigger:'change',message:"不可为空"}
          ],
          mitemid:[
            {required:true,trigger:'change',message:"不可为空"}
          ],
          deliverydate:[
            {required:true,trigger:'change',message:"不可为空"}
          ],
          num:[
            {required:true,type:"number",trigger:'change',message:"不可为空"}
          ],
          receiveqty:[
            {required:true,type:"number",trigger:'change',message:"不可为空"}
          ],
          suppisqualified:[
            {required:true, type:"number",trigger:'change',message:"不可为空"}
          ],
          iscomplete:[
            {required:true, type:"number",trigger:'change',message:"不可为空"}
          ],
          packingisok:[
            {required:true, type:"number",trigger:'change',message:"不可为空"}
          ],
          checkisok:[
            {required:true, type:"number",trigger:'change',message:"不可为空"}
          ],
          transportisok:[
            {required:true, type:"number",trigger:'change',message:"不可为空"}
          ],
          coldisok:[
            {required:true,type:"number",trigger:'change',message:"不可为空"}
          ],
          freezingisok:[
            {required:true,type:"number",trigger:'change',message:"不可为空"}
          ],
          warefinishdate:[
            {required:true,trigger:'change',message:"不可为空"}
          ],

        },

        //打印数据
        printData:[],
        printDataShow:{},
        printModal:false,

        //选项数据，页面整体数据
        suppliers:[], //供应商
        statuses:[], //入库单状态选项
        inwaretypes:[], //入库单类型选项
        departs:[], //部门枚举
        workers:[], //部门员工
        checktypes:[], //检验类型
        warehouses:[], //仓库
        districts:[], //库区
        inways:[], //入库方式
        producers:[], //生产商
        indetailtypes:[], //入库单明细状态

        //筛选表单
        formFilter:{
          pagesize:20,
          pagenum:1
        },
        //给日期选择器添加范围判定
        startTime:{
          disabledDate:(function(date){
            return this.formFilter.indatee && date>this.formFilter.indatee;
          }).bind(this)
        },
        endTime:{
          disabledDate:(function(date){
            return this.formFilter.indates && date<this.formFilter.indates;
          }).bind(this)
        },
        //

        //表格数据
        tableHeight:300,
        total:0,
        isSelected:false, //表格中是否有选中项
        columns:[
          {
            type:"selection",
            align:"center",
            width:55,
          },
          {
            title:this.$t('common.index'),
            align:"center",
            width:75,
            render:(h,params)=>{
              return h("div",params.index+1 + this.formFilter.pagesize*(this.formFilter.pagenum-1))
            }
          },
          {
            title:this.$t('common.inorderId'),
            key:"inwareid",
            align:"center",

          },
          {
            title:this.$t('common.inorderType'),
            key:"inwaretype",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.inwaretypes,params.row.inwaretype))
            }

          },
          {
            title:this.$t('common.purchaseOrderId'),
            key:"inwarenoticeid",
            align:"center",

          },
          {
            title:this.$t('common.supplier'),
            key:"supplierid",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.suppliers,params.row.supplierid))
            }
          },
          {
            title:this.$t('common.inDepart'),
            key:"inwaredepart",
            align:"center",
            render:(h,params)=>{
              return h('div',this.getLabel(this.departs,params.row.inwaredepart))
            }
          },
          {
            title:this.$t('common.inWorker'),
            key:"personid",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.workers,params.row.personid))
            }
          },
          {
            title:this.$t('common.inDate'),
            key:"indate",
            align:"center",

          },
          {
            title:this.$t('common.status'),
            key:"status",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.statuses,params.row.status))
            }

          },
          {
            title:this.$t('common.note'),
            key:"remark",
            align:"center",

          },
        ],
        tableData:[],

        //对话框数据
        modal:false,
        modalForm:{

        },
        isInput:true, //入库单状态为新建时，表格中的数据才可以编辑
        isUpdate:true, //新建入库单时，不输入入库单号
        isModalSelected:false,
        specs:[],
        modalColumns:[
          {
            type:"selection",
            width:55,
            align:"center",
          },
          {
            title:this.$t('common.index'),
            width:70,
            align:"center",
            render:(h,params)=>{
              return h("div",params.index+1)
            }
          },
          {
            title:this.$t('common.materialId'),
            key:"materialid",
            align:"center",
            tooltip:true,
            width:180,
            render:(h,params)=>{
              if(this.isInput){
                return h("Select",{
                  props:{
                    value:this.modalData[params.index].materialid,
                    filterable:true
                  },
                  on:{
                    "on-change":e=>{
                      params.row.materialid = e;
                      this._axios("get","mitem/mitems",{pageSize:0,pageNum:0,materielid:e},data=>{
                        if(data.list && data.list.length>0){
                          let res = data.list[0];
                          // console.log("物料信息：",res)
                          params.row.unit = res.unit; //物料的库存单位
                          params.row.materialname = res.materielname;
                          params.row.iscontrolview = res.iscontrolview;
                          params.row.materialids = [{label:res.materielid,value:res.materielid}]
                          params.row.warehouseid = this.getValue(this.warehouses,res.warehouse);
                          params.row.warehousename = res.warehouse;
                          params.row.districtname = res.district;
                          params.row.effectivetime = res.effectivetime;
                          params.row.effectivetimeunit = res.effectivetimeunit;
                          params.row.rechecktime = res.rechecktime;
                          params.row.rechecktimeunit = res.rechecktimeunit;
                          params.row.checktype = res.checktype;
                          // 根据warehouseid获取库区
                          this._axios("get","storageinfo/district",{warehouseid:params.row.warehouseid},districts=>{
                            params.row.districts = this.arrConvert(districts)
                            params.row.districtid = this.getValue(params.row.districts,params.row.districtname)
                            //根据物料id获取规格
                            params.row.specs=[];
                            this._axios("get","mitem/mitemspecs",{lang:this.$store.state.globalLang,materielid:e},data=>{
                              // params.row.specs = data;
                              data.forEach(item=>{
                                params.row.specs.push({label:item.label,value:item.id,key:item.value})
                              })
                            })
                          })
                        }
                      })
                      let temp = params.row;
                      this.modalData.splice(params.index,1,params.row)
                      console.log(this.modalData)
                    },
                    "on-query-change":e=>{
                      //根据物料id查物料信息

                      // let temp = params.row;
                      // this.modalData.splice(params.index,1,params.row)
                    },

                  }
                },params.row.materialids.map(item=>{
                  return h("Option",{props:item})
                }))
              }else{
                return h("div",params.row.materialid)
              }
            }
          },
          {
            title:this.$t('common.materialName'),
            key:"materialname",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("Input",{
                  props:{
                    value:params.row.materialname
                  },
                  on:{
                    "input":e=>{
                      params.row.materialname = e;

                    },
                    "on-blur":e=>{
                      params.row.materialids=[]
                      this._axios("get","mitem/mitems", {pageSize:0,pageNum:0,materielname:params.row.materialname},data=>{
                        // console.log("根据名称获得的数据：",data.list)
                        data.list.forEach(item=>{
                          params.row.materialids.push({label:item.materielid,value:item.materielid})
                        })

                      })
                      let temp = params.row
                      this.modalData.splice(params.index,1,params.row)
                    }
                  }
                })
              }else{
                return h("div",params.row.materialname)
              }
            }
          },
          {
            title:this.$t('common.package'),
            key:"packstandsid",
            align:"center",
            slot:"packstandsid",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h('Select',{
                  props:{
                    value:params.row.packstandsid,
                    clearable:true,
                  },
                  on:{
                    "on-change":e=>{
                      this.$set(this.modalData[params.index],"packstandsid",e)
                    }
                  }
                },params.row.specs.map(item=>{
                  return h("Option",{props:item})
                }))
              }else{
                return h('div',params.row.packstandsid?this.getLabel(params.row.specs,params.row.packstandsid):'')
              }
            }
          },
          {
            title:this.$t('common.status'),
            key:"status",
            tooltip:true,
            align:"center",
            width:80,
            render:(h,params)=>{
              return h('div',this.getLabel(this.indetailtypes,params.row.status))
            }
          },
          {
            title:this.$t('common.inQuantity'),
            key:"receivenum",
            align:"right",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("Input",{
                  props:{
                    value:params.row.receivenum,
                    number:true,
                  },
                  on:{
                    "input":e=>{
                      console.log(e)
                      if(!/^\d+$/.test(e)||e == 0){
                        this.$root.mes("error","w-20200826155037") //提示必须是大于0的正整数
                        this.$set(this.modalData[params.index],"receivenum",0)
                      }else if(e > 1000){
                        this.$root.mes("error","w-20200824131041") //提示单次入库件数不可大于1000
                        this.$set(this.modalData[params.index],"receivenum",1000)
                      }else{
                        this.$set(this.modalData[params.index],"receivenum",e)
                      }


                    }
                  }
                })
              }else{
                return h("div",params.row.receivenum)
              }
            }
          },
          {
            title:this.$t('common.partQuantity'),
            key:"partweight",
            align:"right",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("Input",{
                props:{
                  value:params.row.partweight,
                  number:true,
                },
                on:{
                  "input":e=>{
                    var limit = parseInt(this.getLabel(params.row.specs,params.row.packstandsid))
                    if(isNaN(limit)){
                      this.$root.mes("error","w-20200826154942") //提示请先选择物料和规格
                    }else if(!/^\d*$/.test(e)){
                      this.$root.mes("error","w-20200826155037") //提示必须是大于等于0的正整数
                      this.$set(this.modalData[params.index],"partweight",0)
                    }else if(e >= limit){
                      this.$root.mes("error","w-20200826155129") //提示零件件数必须小于规格
                      this.$set(this.modalData[params.index],"partweight",0)
                    }else{
                      this.$set(this.modalData[params.index],"partweight",e)
                    }

                  }
                }
              })
              }else{
                return h('div',params.row.partweight)
              }
            }
          },
          {
            title:this.$t('common.inWeight'),
            key:"receiveweight",
            align:"right",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                if(params.row.receivenum){
                  if(params.row.packstandsid){ //有规格数据
                    let spec=0;
                    params.row.specs.forEach(item=>{
                      if(item.value == params.row.packstandsid){
                        spec = item.key;
                        return;
                      }
                    })

                    params.row.partweight = params.row.partweight?params.row.partweight:0;
                    // console.log("规格",spec,"件数",params.row.receivenum,"散件",params.row.partweight)
                    this.$set(this.modalData[params.index],"receiveweight", params.row.partweight?(params.row.receivenum-1)*spec+params.row.partweight:params.row.receivenum*spec+params.row.partweight)
                    // params.row.sreceiveweight =params.row.partweight?(params.row.receivenum-1)*spec+params.row.partweight:params.row.receivenum*spec+params.row.partweight;
                    return h("div",`${params.row.receiveweight}${params.row.unit}`)
                  }else{
                    this.$set(this.modalData[params.index],"receiveweight",this.modalData[params.index].receivenum)
                    return h('div',`${params.row.receiveweight}${params.row.unit}`)
                  }
                }
              }else{
                return h('div',params.row.receiveweight)
              }
            }
          },
          {
            title:this.$t('common.producer'),
            key:"producerid",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("Select",{
                props:{
                  value:params.row.producerid
                },
                on:{
                  "on-change":e=>{
                    this.$set(this.modalData[params.index],"producerid",e)
                  }
                }
              },this.producers.map(item=>{return h('Option',{props:item})}))
              }else{
                return h('div',this.getLabel(this.producers,params.row.producerid))
              }

            }
          },
          {
            title:this.$t('common.originalBatchno'),
            key:"originbatchno",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("Input",{
                props:{
                  value:params.row.originbatchno
                },
                on:{
                  "input":e=>{
                    this.$set(this.modalData[params.index],"originbatchno",e)
                  }
                }
              })
              }else{
                return h('div',params.row.originbatchno)
              }

            }
          },
          {
            title:this.$t('common.batchno'),
            key:"batchno",
            align:"center",
            tooltip:true,
            width:150,
          },
          {
            title:this.$t('common.produceDate'),
            key:"producedate",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("DatePicker",{
                  props:{
                    type:"date",
                    format:"yyyy-MM-dd",
                    value:params.row.producedate,
                    options:{
                      disabledDate (date) {
                          return date && date>new Date();
                      }
                    }
                  },
                  on:{
                    "on-change":e=>{
                      this.$set(this.modalData[params.index],"producedate",this.dateFormat(e,"yyyy-MM-dd"))
                      if(params.row.iscontrolview === 1){
                        let date = new Date(e)
                        let recheckDate = new Date(e);
                        switch(params.row.effectivetimeunit){
                          case 3:
                          date = date.setFullYear(date.getFullYear()+params.row.effectivetime)
                          break;
                          case 2:
                          date = date.setMonth(date.getMonth()+params.row.effectivetime)
                          break;
                          case 1:
                          date = date.setDate(date.getDate()+params.row.effectivetime)
                          break;
                        }
                        switch(params.row.rechecktimeunit){
                          case 3:
                          recheckDate = recheckDate.setFullYear(recheckDate.getFullYear()+params.row.rechecktime)
                          break;
                          case 2:
                          recheckDate = recheckDate.setMonth(recheckDate.getMonth()+params.row.rechecktime)
                          break;
                          case 1:
                          recheckDate = recheckDate.setDate(recheckDate.getDate()+params.row.rechecktime)
                          break;
                        }
                        this.$set(this.modalData[params.index],"validate",this.dateFormat(date,"yyyy-MM-dd"))
                        this.$set(this.modalData[params.index],"reviewdate",this.dateFormat(recheckDate,"yyyy-MM-dd"))
                      }
                    }
                  }
                })
              }else{
                return h('div',params.row.producedate)
              }

            }
          },
          {
            title:this.$t('common.validate'),
            key:"validate",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput&&params.row.iscontrolview === 1 ){
                return h("DatePicker",{
                  props:{
                    type:"date",
                    format:"yyyy-MM-dd",
                    value:params.row.validate
                  },
                  on:{
                    "on-change":e=>{
                      let date = new Date(e)
                      let recheckDate = new Date(e);
                      switch(params.row.effectivetimeunit){
                        case 3:
                        date = date.setFullYear(date.getFullYear()+params.row.effectivetime)
                        break;
                        case 2:
                        date = date.setMonth(date.getMonth()+params.row.effectivetime)
                        break;
                        case 1:
                        date = date.setDate(date.getDate()+params.row.effectivetime)
                        break;
                      }
                      switch(params.row.rechecktimeunit){
                        case 3:
                        recheckDate = recheckDate.setFullYear(recheckDate.getFullYear()+params.row.rechecktime)
                        break;
                        case 2:
                        recheckDate = recheckDate.setMonth(recheckDate.getMonth()+params.row.rechecktime)
                        break;
                        case 1:
                        recheckDate = recheckDate.setDate(recheckDate.getDate()+params.row.rechecktime)
                        break;
                      }
                      this.$set(this.modalData[params.index],"validate",this.dateFormat(date,"yyyy-MM-dd"))
                      this.$set(this.modalData[params.index],"reviewdate",this.dateFormat(recheckDate,"yyyy-MM-dd"))
                    }
                  }
                })
              }else{
                return h('div',params.row.validate)
              }
            }
          },
          {
            title:this.$t('common.recheckDate'),
            key:"reviewdate",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput&&params.row.iscontrolview === 1){
                return h("DatePicker",{
                  props:{
                    type:"date",
                    format:"yyyy-MM-dd",
                    value:params.row.reviewdate
                  },
                  on:{
                    "on-change":e=>{
                      this.$set(this.modalData[params.index],"reviewdate",this.dateFormat(e,"yyyy-MM-dd"))
                    }
                  }
                })
              }else{
                return h('div',params.row.reviewdate)
              }

            }
          },
          {
            title:this.$t('common.checkType'),
            key:"checktype",
            align:"center",
            tooltip:true,
            width:150,
            render:(h,params)=>{
              if(this.isInput){
                return h("Select",{
                  props:{
                    value:params.row.checktype
                  },
                  on:{
                    "on-change":e=>{
                      this.$set(this.modalData[params.index],"checktype",e)
                    }
                  }
                },this.checktypes.map(item=>{
                  return h("Option",{props:item})
                }))
              }else{
                return h('div',params.row.checktype ? this.getLabel(this.checktypes,params.row.checktype) : '')
              }

            }
          },
          {
            title:this.$t('common.defaultWarehouse'),
            key:"warehouseid",
            align:"center",
            tooltip:true,
            width:160,
            render:(h,params)=>{
              if(this.isInput){
                return h("Select",{
                  props:{
                    value:params.row.warehouseid,
                  },
                  on:{
                    "on-change":e=>{
                      // console.log(e)
                      params.row.warehouseid = e;
                      params.row.warehousename = this.getLabel(this.warehouses,e)
                      this._axios("get","storageinfo/district",{warehouseid:e},data=>{
                        params.row.districts = this.arrConvert(data);
                      })
                      let temp = params.row;
                      this.modalData.splice(params.index,1,temp)
                    }
                  }
                },this.warehouses.map(item=>{
                  return h("Option",{
                    props:item
                  })
                }))
              }else{
                return h('div',params.row.warehousename)
              }

            }
          },
          {
            title:this.$t('common.defaultDistrict'),
            key:"districtid",
            align:"center",
            tooltip:true,
            width:180,
            render:(h,params)=>{
              if(this.isInput){
                return h("Select",{
                  props:{
                    value:params.row.districtid,
                  },
                  on:{
                    "on-change":e=>{
                      this.modalData[params.index].districtid = e
                      this.modalData[params.index].districtname = this.getLabel(params.row.districts,e)
                    }
                  }

                },params.row.districts.map(item=>{
                  return h("Option",{
                    props:item
                  })
                }))
              }else{
                return h('div',params.row.districtname)
              }

            }
          },
          {
            title:this.$t('common.inWay'),
            key:"receiveway",
            align:"center",
            tooltip:true,
            width:180,
            render:(h,params)=>{
              if(this.isInput){
                return h("Select",{
                  props:{
                    value:params.row.receiveway
                  },
                  on:{
                    "on-change":e=>{
                      this.$set(this.modalData[params.index],"receiveway",e)
                    }
                  }

                },this.inways.map(item=>{
                  return h("Option",{
                    props:item
                  })
                }))
              }else{
                return h('div',params.row.receiveway!=null||params.row.receiveway!=undefined ? this.getLabel(this.inways,params.row.receiveway) : '')
              }

            }
          }

        ],
        modalData:[

        ],
        tempDetail:[],
        testType:[
          {value:1,label:this.$t('common.yes')},
          {value:0,label:this.$t('common.no')}
        ]

      }
    },
    // created() {
    //   this.getTypes()
    // },
    mounted() {
      this.getTypes();
      this.getData();
      this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop -140;
    },
    methods:{
      async getTypes(){
        await this.getType("instockinformstatus",this.statuses) //入库单状态
        await this.getType("InstockType",this.inwaretypes) //入库单类型
        await this.getType("QCHKType",this.checktypes) //检验类型
        await this._axios("get","dept/deptenum",data=>{
          this.departs = this.arrConvert(data) //部门
        })
        await this._axios("get","user/userenum",data=>{
          this.workers = data; //员工
        })
        await this._axios("get","resourceinfo/supplierenum",(data)=>{
          this.suppliers = this.arrConvert(data) //供应商
        })
        await this._axios("get","ware/wareenum",data=>{
          this.warehouses = this.arrConvert(data) //仓库
        })
        await this.getType("inways",this.inways)  //入库方式
        await this._axios("get","resourceinfo/resourcesenum",{lang:this.$store.state.globalLang,rtype:6},data=>{
          this.producers=this.arrConvert(data)
        })
        await this.getType("instockdetailstatus",this.indetailtypes)

      },
      //获取表格数据
      getData(){
        this.formFilter.indates = this.dateFormat(this.formFilter.indates,"yyyy-MM-dd")
        this.formFilter.indatee = this.dateFormat(this.formFilter.indatee,"yyyy-MM-dd")
        this._axios("get","inwareorder/orderinfo",this.formFilter,(data)=>{
          this.tableData = data.list;
          // console.log(this.tableData)
          this.total = data.total;
        })
      },
      confirm(){
        if(!this.isSelected){
          this.$root.mes("error","w-20200521173305")
        }else{
          this.$root.mes("warn","w-20200713155744").then(res=>{ //提示是否确认完成
            if(res){
              //确认
              let list = this.$refs.table.getSelection()
              let mes="第";
              let arr=[]
              list.forEach((item,index)=>{
                if(item.status >0){
                  mes+=(index+1)+"、";
                }
              })
              if(mes.length>1){
                this.$Message.error(mes.substring(0,mes.length-1)+"条数据已确认，请不要重复提交")
                // alert(mes+"条数据已确认，请不要重复提交")

              }else{
                this._axios("put","inwareorder/orderinfolist",list,data=>{
                  this.getMes("put",data)
                  if(data){
                    this.getData()
                  }
                })
              }

            }
          })
        }


      },
      showInsert(){
        this.isUpdate = false;
        this.isInput = true;
        this.modalForm = {}
        this.modalForm.indate = new Date();
        this.modalData = [{districts:[],materialids:[],specs:[]}]
        this.modal = true;
      },
      showUpdate(e){
        if(!this.$store.state.controls.M_2_200710103207_update) {
          this.isInput = false;
        }else{
          this.isInput = e.status === 0;
        }
        this.isUpdate = true;
        this.getWorkers(e.inwaredepart)
        this._axios("get","inwareorder/orderdetail",{inwareid:e.inwareid},data=>{
          this.modalForm = data;
          this.modalData = data.inwaredetailviewlist
          console.log("表格数据：",this.modalData)
          this.tempDetail = JSON.parse(JSON.stringify(data.inwaredetailviewlist)); //临时存储数据
          this.modalData.forEach(async (item,index)=>{
            item.specs=[];
            item.districts=[];
            item.materialids=[{label:item.materialid,value:item.materialid}];

            //根据物料id获取规格
            await this._axios("get","mitem/mitemspecs",{lang:this.$store.state.globalLang,materielid:item.materialid},data=>{
              // console.log(data)
              data.forEach(i=>{
                item.specs.push({label:i.label,value:i.id,key:i.value})
              })
            })
            //根据warehouseid获取库区
            await this._axios("get","storageinfo/district",{warehouseid:item.warehouseid},disticts=>{
              item.districts = this.arrConvert(disticts)
            })
            let temp = item;
            this.modalData.splice(index,1,temp)
          })
          this.modal = true;
        })
        // this.isInput = false;

      },

      //根据部门id获取部门员工
      getWorkers(id){
        this.$refs.worker.clearSingleSelect();

      },
      getDistricts(id){
        this.districts=[]
        this._axios("get","storageinfo/district",{warehouseid:id},data=>{
          this.districts  = this.arrConvert(data)
        })
      },
      submit(){
        this.modalForm.indate = this.dateFormat(this.modalForm.indate,'yyyy-MM-dd')
        this.modalForm.inwaredetailviewlist = this.modalData;
        if(this.isUpdate){
          this._axios("post","inwareorder/orderinfodetail",this.modalForm,data=>{
            this.getMes("put",data)
            if(data){
              this.modal = false;
              this.modalData = [];
              this.getData();
            }
          })
        }else{
          this._axios("post","inwareorder/orderinfo",this.modalForm,data=>{
             this.getMes("post",data)
            if(data){
              this.modal = false;
              this.modalData = [];
              this.getData();
            }
          })
        }

      },
      close(e){ //直接点击右上角x关闭对话框时，清空表格数据
        if(!e){
          this.modalData =[]
        }
      },
      addRows(){
        if(this.isModalSelected){
          // this.modalData.push(this.$refs.modalTable.getSelection())
          this.$refs.modalTable.getSelection().forEach(item=>{
            this.modalData.push(item)
          })
          this.isModalSelected = false;
        }else{
          this.modalData.push({districts:[],materialids:[],specs:[]})
        }
      },
      //判断两个对象是否相同
      compareObj(obj1,obj2){
        for(let i in obj1){
          if(JSON.stringify(obj1[i]) !=JSON.stringify( obj2[i])){
            // console.log(i,obj1[i])
            // console.log(i,obj2[i])
            return false;
          }
        }
        return true;
      },
      //判断一个对象是否在一个对象数组中
      compareArrObj(arr,obj1){
        for(let d of arr){
          if(this.compareObj(d,obj1)){
            return true;
          }
        }
        return false;
      },
      getIndex(arr,item){
        for(let i=0;i<arr.length;i++){
          if(this.compareObj(arr[i],item)){
            return i;
          }
        }
        return -1;
      },
      //删除选中的入库单明细
      deleteDetails(){
        if(!this.isModalSelected){
          // 提示选择操作数据
          this.$root.mes('error','w-20200521173305')
        }else{
          //是否确认
          this.$root.mes('warn','w-20200512154954') //提示是否确定删除
          .then(res => {
            if(res){
              let arr=[]
                let list = this.$refs.modalTable.getSelection();
                // console.log(this.compareArrObj(this.modalData,list[0]))
                // console.log(this.compareArrObj(this.tempDetail,list[0]))

                list.forEach((item,index)=>{
                  if(this.compareArrObj(this.tempDetail,list[0])){
                    if(this.getIndex(this.modalData,item)>this.tempDetail.length-1){
                      this.modalData.splice(index,1)
                    }else{
                      arr.push(item)
                    }

                  }else{
                    this.modalData.splice(this.getIndex(this.modalData,item),1)
                  }
                })
                // console.log(arr)
                if(arr.length>0){
                  this._axios("delete","inwareorder/orderinfodetail",arr,data=>{
                    if(data){
                      this.isModalSelected = false;
                    }
                  })
                }else{
                  this.isModalSelected = false;
                }

             }
          })
          .catch(err => {console.log(err) })
        }
      },
      showPrint(){
        var list = this.$refs.table.getSelection();
        if(list.length>0){
          if(list.length>1){
            //提示一次只能打印一张
            this.$root.mes("error","w-20200819180405")
          }else{
            this.printData = this.$refs.table.getSelection()
            this.printModal = true;
          }
        }else{
          this.$root.mes("error","w-20200521173305")
        }
      },
      //初验
      initialTest(){
        var list = this.$refs.modalTable.getSelection()
        if(list.length>0){
          if(list.length===1){
            // this.initialTestModel = list[0];
            // this.initialTestModal = true;
            this._axios("get","iqc/init",{inwaredetailid:list[0].inwaredetailid},data=>{
              // console.log(data)
              if(data){
                this.initialTestModal = true;
                this.initialTestModel = data;
              }
            })

          }else{
            this.$root.mes("error","") //提示入库明细请依次初验
          }
        }else{
          this.$root.mes("error","w-20200521173305") //提示选择数据
        }
      },
      record(res){
        this.initialTestModel.warefinishdate = this.dateFormat(this.initialTestModel.warefinishdate)
        this.initialTestModel.deliverydate = this.dateFormat(this.initialTestModel.deliverydate)
        this.initialTestModel.validatedate = this.dateFormat(this.initialTestModel.validatedate)
        this.initialTestModel.iqcresult =res;
        // console.log(this.initialTestModel)
        this._axios("put","iqc/firstcheck",this.initialTestModel,data=>{
          if(data){
            // this.$root.mes("info","") //提示初验成功
            this.$Message.success("初验成功")
            this.initialTestModal = false;
          }
        })

      }



    }
  }
</script>

<style lang="less">
@import '../../assets/styles/common';
.inOrdreManage{
  // height: 800px;
  // overflow-y: hidden;
  // .printContainer{
  //   height: 1000px;
  //   overflow: hidden;
  // }
}
</style>
