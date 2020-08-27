<template lang="html">
  <Modal  v-model="inGodownPlan" :loading='loading' width='1200px' :mask-closable='false'>
      <p slot="header" style="text-align:center;font-size:16px">
            <span>入库单-新增</span>
      </p>
      <div class="ideanGodownPlanModal">
     <Form ref="formFilter" :model="formFilter" :label-width="110" inline style="text-align:left;" >
        <Row>
          <Col span="8">
             <div style="text-align:left;"><font style="font-size:16px;" color="#59a6fe">入库单信息</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style="font-size:12px;" color="#59a6fe">创建人&nbsp;&nbsp;</font>{{formFilter.creatorName}}</div>
          </Col>
        </Row>
        <div>&nbsp;</div>

        <Card id="deliveryInfo">
          <p slot="title">单据信息</p>
          <Row>
            <Col span="24">

                 <Row>

                   <Col span="6">
                     <Form-item label="入库单号" >
                       <font color="red" class="font4">*</font>
                       <Input v-model="formFilter.inOrderId" placeholder="请输入" @on-keyup="checkOrderId"  :maxlength='20'/>
                     </Form-item>
                   </Col>

                   <Col span="6">
                       <Form-item label="入库类型">
                         <Select v-model="formFilter.entry" clearable placeholder="请选择">
                           <Option v-for="(item,key) in entranceType" :value="item.id" :key="key">{{ item.name }}</Option>
                         </Select>
                       </Form-item>
                   </Col>

                   <Col span="6">
                     <Form-item label="入库日期" style="position:relative;">
                       <font color="red" class="font2" style='position:absolute;left:-65px;top:3px;'>*</font>
                       <DatePicker v-model="formFilter.inDate" type="date" format="yyyy-MM-dd" :options="options4"  @on-change="changeFormat" placeholder="请选择" style="width: 100px"></DatePicker>
                     </Form-item>
                   </Col>

                   <Col span="6">
                     <Form-item label="是否批量">
                       <Select v-model="formFilter.isBatchIn" clearable placeholder="请选择" >
                         <Option value="P01">是</Option>
                         <Option value="P02">否</Option>
                       </Select>
                     </Form-item>
                   </Col>
                 </Row>

             </Col>
           </Row>
         </Card>

         <div id='godownInfos' >
           <div>&nbsp;</div>
           <Row>
             <Col span="16">
                <Row>
                  <Col span='20'>
                    <Button shape="circle" style="width:120px;height:28px;padding:0px;background-color:white;border-radius:14px;" disabled @click="delConfirmOrder" id='deldetail' icon="md-trash">删除选中项</Button>
                    <Form-item label="新增行数">
                      <InputNumber :max="100" :min="1" v-model="addrows"></InputNumber>
                    </Form-item>
                    &nbsp;&nbsp;
                    <!-- <Upload :action="uploadurl" :format="['xlsx','xls']" :max-size="2048" :data="loginStatus" style="display: inline;" name="uploadFile" size="18" :on-success="handleSuccess">
                      <Button icon="ios-cloud-upload-outline" style="font-size:10px">上传文件</Button>
                    </Upload> -->
                  </Col>
                </Row>
             </Col>
             <Col span="8" style="text-align:right;">
               <Button shape="circle" type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail">增&nbsp;&nbsp;加</Button>
             </Col>
           </Row>
           <Row>
             <Col span="24">
               <div class="Tableclass">
                 <Table height="200" ref="selection" stripe border :columns="tableColumns.card" :data="tableColumns.data" @on-selection-change="onSelectionChange"></Table>
               </div>
             </Col>
           </Row>
         </div>
     </Form>
   </div>
   <Modal v-model="delete_confirm" width="360">
     <p slot="header" style="color:#f60;text-align:center">
       <Icon type="ios-information-circle"></Icon>
       <span>删除确认</span>
     </p>
     <div style="text-align:center">
       <span style="font-size:14px">确定要删除吗？</span>
     </div>

      <div slot="footer" style="text-align:center">
        <Button type="error" size="large" style="width:120px;border-radius:14px;font-size:14px"  @click="deleteSelection">确定删除</Button>
      </div>
   </Modal>
   <div slot="footer">
     <Button type="primary" style="width:120px;height:28px;padding:0px;border-radius:14px;background-color:#5aa5ff;"  @click="ok">提&nbsp;&nbsp;交</Button>
   </div>
  </Modal>

</template>

<script>
import axios from 'axios'
import iview from 'view-design' //
export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {

      entranceType:[{"id":"GPT01","name":"一般入库"},{"id":"GPT02","name":"拼盘入库"}], //入库类型
      defaultstockBatch:new Date(),
      warehouseList:[],
      districtList:[],
      districtMap:{}, //库区Map


      factoryList:[],

      factoryMap:{}, //生产地Map

      entrancelist:[],

      options4: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
                },

      getOptions: {
           disabledDate (date) {
               return date && date.valueOf() < Date.now() - 86400000;
           }
       },
      isDesplay:false,
      testSt:true,
      a:false,
      rows:[],
      vendorNameList:[],

      //上传路径
      uploadurl:sessionStorage.http+'/#',
      loginStatus:{
        loginStatus:sessionStorage.loginStatus
      },
      delete_confirm:false,
      inGodownPlan:false,
      loading:true,
      lDetail:1,
      taskList:[
        {
          taskid:'',
          typename:''
        }
      ],
      customerList:[
        {
          customerid:'',
          customername:''
        }
      ],
      supplierList:[
        {
          supplierid:'',
          suppliername:''
        }
      ],
      deptList:[
        {
          sectorid:'',
          sectorname:''
        }
      ],
      freightStation:[
        {
          id:'',
          name:''
        }
      ],//freightStation destinationPort
      destinationPort:[
        {
          id:'',
          name:''
        }
      ],
      startposition:'A-1-11-1',
      quantity:0,
      backupfield1:0,
      quantitytest:[],
      quantitytest2:[],
      resource:'WMS',
      addrows:1,
      formFilter: {
        inOrderId:'',
        inDate:'',
        inOrderType:'',
        createTime:'',
        creatorId:'',
        creatorName:'',
        isBatchIn:'',
        vendorName:'',
        weight:'',
        num:'',
        status:'GPS01'
      },
      tableColumns: {
         card: [
           {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
           {title: '序号',key: 'lineNo',width: 75,align: 'center',render: (h, params) => {
             return h('div',+params.row._index+1);
             }},
           {title: '入库单明细号',key: 'inOrderDetailId',width:210,align: 'center',render: (h, params) => {
                  return h('div',this.tableColumns.data[params.index].inOrderDetailId)
             }},
             {title: '物料号',key: 'materielId',width:150,align: 'center',

                         render: (h, params) => {

                               return h('Input', {
                                   style:{
                                     width:'120px',
                                     bottom:'6px'
                                   },
                                   props: {
                                   //将单元格的值给Input
                                      value:params.row.materielId,
                                   },
                                   on:{
                                     'on-blur':(e) => {
                                       this.tableColumns.data[params.index].materielId = e.target.value
                                       // console.log(this.tableColumns.data)
                                          axios.get(sessionStorage.http+`/getMaterielInfo?materielId=${e.target.value}`)
                                          .then(res => {
                                            this.tableColumns.data[params.index].remark3 = res.data.remark2;//物料品类
                                            this.tableColumns.data[params.index].materielName = res.data.materielName;//物料名称
                                            this.tableColumns.data[params.index].packageStandards = res.data.packageStandards;//包装规格
                                            this.tableColumns.data[params.index].unit = res.data.unit//计量单位;
                                            //if(this.tableColumns.data[params.index].unit != "件"){
                                              this.tableColumns.data[params.index].partQuantity = 0
                                              this.tableColumns.data[params.index].weight = 0
                                            //}
                                            console.log("hhhaaa" + this.tableColumns.data[params.index].unit)

                                            this.tableColumns.data[params.index].warehouseId = res.data.warehouseId;  //默认仓库id


                                            axios.get(sessionStorage.http+`/getDistrictInfoByWarehouseId?warehouseId=${res.data.warehouseId}&loginStatus=${sessionStorage.loginStatus}`)
                                            .then(res => {
                                              this.$set(this.districtMap,`${params.row.inOrderDetailId}`,res.data.filter(i=>i.isStart == '1'))
                                              // this.districtMap[params.row.inOrderDetailId] = res.data;
                                            })
                                            .catch(res => {
                                            })

                                            this.tableColumns.data[params.index].districtId = res.data.districtId;  //默认库区id

                                            this.tableColumns.data[params.index].effectiveTime = res.data.effectiveTime;
                                            var x = parseInt(res.data.effectiveTime);  //有效期
                                            // params.row.stockWarnDate = this.defaultstockBatch.getFullYear() + '-' + (this.defaultstockBatch.getMonth()+1) + '-' + (this.defaultstockBatch.getDate()+x);
                                            // this.tableColumns.data[params.index].stockWarnDate = this.defaultstockBatch.getFullYear() + '-' + (this.defaultstockBatch.getMonth()+1) + '-' + (this.defaultstockBatch.getDate()+x);

                                            var dateTime=new Date(this.formFilter.inDate);
                                            this.tableColumns.data[params.index].stockWarnDate = this.DateAdd("d ",x,dateTime).Format("yyyy-MM-dd")

                                            // this.tableColumns.data[params.index].price = res.data.price;
                                            // this.tableColumns.data[params.index].packageType = res.data.packageType;

                                          })
                                     }
                                   }
                                 })

                             }
         },
          {title: '物料品类',key: 'remark3',width: 150,align: 'center'},
          {title: '物料名称',key: 'materielName',width: 150,align: 'center'},
          {title: '包装规格',key: 'packageStandards',width: 150,align: 'center'},
          {title: '计量单位',key: 'unit',width: 150,align: 'center'},


          {title: '批量组盘件数',key: 'batckGroupNun',width:150,align: 'center',

                     render: (h, params) => {

                           return h('Input', {
                               style:{
                                 width:'120px',
                                 bottom:'6px',
                               },
                               props: {
                               //将单元格的值给Input
                                  value:params.row.batckGroupNun,
                                  disabled:this.formFilter.isBatchIn=='P01'?false:true
                               },
                               on:{
                                 'on-blur':(e) => {
                                   this.tableColumns.data[params.index].batckGroupNun = e.target.value
                                   // console.log(this.tableColumns.data)
                                 }
                               }
                             })

                         }
          },
           {title: '入库件数',key: 'num',width:150,align: 'center',

                       render: (h, params) => {


                             return h('Input', {
                                 style:{
                                   width:'120px',
                                   bottom:'6px'
                                 },
                                 props: {
                                 //将单元格的值给Input
                                    value:params.row.num,
                                    disabled:this.formFilter.isBatchIn=='P01'?true:false
                                 },
                                 on:{
                                   'on-blur':(e)=>{


                                     //this.formFilter.weight=e.target.value*this.tableColumns.data[params.index].packageStandards
                                     this.tableColumns.data[params.index].num = e.target.value
                                     if(this.tableColumns.data[params.index].unit == "件"){
                                        this.tableColumns.data[params.index].weight = 0
                                     }else{
                                        this.tableColumns.data[params.index].weight = parseFloat(this.tableColumns.data[params.index].packageStandards)*10*parseFloat(e.target.value)/10 + parseFloat(this.tableColumns.data[params.index].partQuantity)
                                       // this.tableColumns.data[params.index].sumPrice = this.tableColumns.data[params.index].weight*this.tableColumns.data[params.index].price
                                     }

                                   }

                                 }
                               })


                        }
            },

            {title: '零件重量',key: 'partQuantity',width: 150,align: 'center',

             render: (h, params) => {
                if(this.tableColumns.data[params.index].unit == "件"){

                  return h('div', 0)

                }else{

                   return h('Input', {
                       style:{
                         width:'80px',
                         bottom:'6px',
                       },
                       props: {
                       //将单元格的值给Input
                          value:params.row.partQuantity,
                       },
                       on:{
                         'on-blur':(e) => {

                            this.tableColumns.data[params.index].partQuantity = e.target.value
                            console.log(e.target.value + "yy" + this.tableColumns.data[params.index].num + "xx" + this.tableColumns.data[params.index].packageStandards)
                            if(this.formFilter.isBatchIn=='P01'){
                              this.tableColumns.data[params.index].weight = 0
                            }else{
                              this.tableColumns.data[params.index].weight = (parseFloat(this.tableColumns.data[params.index].packageStandards)*parseInt(this.tableColumns.data[params.index].num) + parseFloat(e.target.value)).toFixed(2)
                            }

                         }
                       }
                     })

                 }

              },
            },
            {title: '入库重量',key: 'weight',width:120,align: 'center'},

            {title: '单价',key: 'price',width:150,align: 'center',

                        render: (h, params) => {

                              return h('Input', {
                                  style:{
                                    width:'120px',
                                    bottom:'6px',
                                  },
                                  props: {
                                  //将单元格的值给Input
                                     value:params.row.price
                                  },
                                  on:{
                                    'on-blur':(e) => {
                                      this.tableColumns.data[params.index].price = e.target.value
                                      // console.log(this.tableColumns.data)
                                    }
                                  }
                                })

                            }
             },


            {title: '供应商',key: 'vendorCode',width:150,align: 'center',

              render: (h, params) => {
                                  return h('Select',
                                        {style:{
                                          width:'120px',
                                          marginBottom:'11px'
                                        },
                                        props:{
                                          //将单元格的值给Select
                                          value:params.row.vendorCode,
                                        },
                                        on: {
                                          //下拉菜单点击事件-->后台查询商品编号对应的相关信息，添加到table中,此处的event是选中的商品编号 002
                                          'on-change':(event) => {

                                            params.row.vendorCode = event;
                                            this.tableColumns.data[params.index].vendorCode = event;

                                            axios.get(sessionStorage.http+`/producerInfo/getProducerBySupplierId?supplierId=${event}&loginStatus=${sessionStorage.loginStatus}`)
                                            .then(res => {
                                              // this.factoryMap[params.row.inOrderDetailId] = res.data;
                                              this.$set(this.factoryMap,`${params.row.inOrderDetailId}`,res.data)

                                            })
                                            .catch(res => {
                                            })

                                          },
                                        },
                                    },
                                    this.vendorNameList.map(function(type){

                                        return h('Option', {
                                            props: {value: type.supplierId}
                                        }, type.supplierName);
                                    })

                                    );
                                },

            },

            {title: '生产地',key: 'producerCode',width:150,align: 'center',

                render: (h, params) => {
                                    return h('Select',
                                          {style:{
                                            width:'120px',
                                            marginBottom:'11px'
                                          },
                                          props:{
                                            //将单元格的值给Select
                                            value:params.row.producerCode,
                                          },
                                          on: {
                                            'on-change':(e) => {
                                              params.row.producerCode = e;
                                              this.tableColumns.data[params.index].producerCode = e;

                                             },
                                          },
                                      },

                                      this.factoryMap[params.row.inOrderDetailId].map(function(type){

                                          return h('Option', {
                                              props: {value: type.factoryId}
                                          }, type.factoryName);
                                      })

                                      );
                }

            },

             {title: '生产日期',key: 'produceDate',width: 150,align: 'center',

             render: (h, params) => {

                   return h('DatePicker', {
                       style:{
                         width:'150px',
                         'padding-bottom':'12px',
                       },
                       props: {
                       //将单元格的值给Input
                          value:params.row.produceDate,
                       },
                       on:{
                         'on-change':(e) => {

                            this.tableColumns.data[params.index].produceDate = e

                            if(e.trim() != ""){
                              var dateTime=new Date(e);
                              params.row.stockBatch = e;
                              this.tableColumns.data[params.index].stockBatch = e //如果有生产日期，则批次号是生产日期
                            }else{
                              var dateTime=new Date(this.formFilter.inDate);
                              params.row.stockBatch = this.formFilter.inDate;
                              this.tableColumns.data[params.index].stockBatch = this.formFilter.inDate //如果没有生产日期，则批次号是入库日期
                            }

                            var x = parseInt(this.tableColumns.data[params.index].effectiveTime);
                            this.tableColumns.data[params.index].stockWarnDate = this.DateAdd("d ",x,dateTime).Format("yyyy-MM-dd")

                         }
                       }
                     })

                 }

              },
              {title: '库存预警日期',key: 'stockWarnDate',width: 150,align: 'center',

              render: (h, params) => {

                    return h('DatePicker', {
                        style:{
                          width:'150px',
                          'padding-bottom':'12px',
                        },
                        props: {
                        //将单元格的值给Input
                           value:params.row.stockWarnDate,
                        },
                        on:{
                          'on-change':(e) => {
                            params.row.stockWarnDate = e;
                            this.tableColumns.data[params.index].stockWarnDate = e

                          }
                        }
                      })

                  }

               },


               {title: '批次号',key: 'stockBatch',width: 150,align: 'center',

              render: (h, params) => {

                    return h('DatePicker', {
                        style:{
                          width:'150px',
                          'padding-bottom':'12px',
                        },
                        props: {
                        //将单元格的值给Input
                           value:params.row.stockBatch,
                           // options:this.getOptions
                        },
                        on:{
                          'on-change':(e) => {
                            params.row.stockBatch = e;
                            this.tableColumns.data[params.index].stockBatch = e

                          }
                        }
                      })

                  }

               },

              {title: '存储仓库',key: 'warehouseId',width: 150,align: 'center',

                render: (h, params) => {
                                    return h('Select',
                                        {style:{
                                            width:'120px',
                                            marginBottom:'11px'
                                          },
                                          props:{
                                            //将单元格的值给Select
                                            value:params.row.warehouseId,
                                          },
                                          on: {
                                            'on-change':(event) => {

                                            params.row.warehouseId = event;
                                            this.tableColumns.data[params.index].warehouseId = event;

                                              axios.get(sessionStorage.http+`/getDistrictInfoByWarehouseId?warehouseId=${event}&loginStatus=${sessionStorage.loginStatus}`)
                                              .then(res => {

                                                //this.districtList = res.data.filter(i=>i.isStart == '1');

                                                this.$set(this.districtMap,`${params.row.inOrderDetailId}`,res.data.filter(i=>i.isStart == '1'))
                                              })
                                              .catch(res => {
                                              })

                                            },
                                          },
                                        },

                                      this.warehouseList.map(function(type){

                                          return h('Option', {
                                              props: {value: type.warehouseId}
                                          }, type.warehouseName);
                                      })

                                      );
                }

              },
              {title: '存储库区',key: 'districtId',width: 150,align: 'center',

                render: (h, params) => {
                                    return h('Select',
                                          {style:{
                                            width:'120px',
                                            marginBottom:'11px'
                                          },
                                          props:{
                                            //将单元格的值给Select
                                            value:params.row.districtId,
                                          },
                                          on: {
                                            'on-change':(e) => {
                                              params.row.districtId = e;
                                              this.tableColumns.data[params.index].districtId = e;

                                            },

                                          },
                                    },

                                      this.districtMap[params.row.inOrderDetailId].map(function(type){

                                          return h('Option', {
                                              props: {value: type.districtId}
                                          }, type.districtName);
                                      })

                                      );
                }

              },

                 {title: '动检合格证号',key: 'remark5',width:200,align: 'center',

                        render: (h, params) => {

                              return h('Input', {
                                  style:{
                                    width:'170px',
                                    bottom:'6px',
                                  },
                                  props: {
                                  //将单元格的值给Input
                                     value:params.row.remark5
                                  },
                                  on:{
                                    'on-blur':(e) => {
                                      params.row.remark5 = e.target.value;
                                      this.tableColumns.data[params.index].remark5 = e.target.value

                                    }
                                  }
                                })

                            }
             },

           // {title: '预计入库时间', key: 'createdate',width:145,align: 'center',render: (h, params) => {
           //   this.tableColumnsSpecial.godownEntryStatus = 'RS01'
           //   return h('div','申请');
           //     }},
           {title: '质量状态',key: 'qualityStatus',width: 110 ,align: 'center', render: (h, params) => {
                let options = [];
                options.push(h("Option",{props:{value:'Q'}},'精品'));
                options.push(h("Option",{props:{value:'N'}},'优等'));

                return h('Select', {
                  props:{
                      value: params.row.qualityStatus
                  },
                  style:{
                    width:'80px',
                    'text-algin':'left',
                    'margin-bottom':'11px'
                  },
                  on:{
                    'on-change':(qualityStatus) => {
                      params.row.qualityStatus = qualityStatus
                      this.tableColumns.data[params.index].qualityStatus = qualityStatus
                      // console.log()
                    }
                  }
                },options)
              }



             },
            //  {title: '包装类型',key: 'packageType',width: 150,align: 'center',

            //  render: (h, params) => {

            //        return h('Input', {
            //            style:{
            //              width:'80px',
            //              bottom:'6px',
            //            },
            //            props: {
            //            //将单元格的值给Input
            //               value:params.row.packageType,
            //               readonly:'readonly'
            //            },
            //            on:{
            //              'on-blur':(e) => {
            //                this.tableColumns.data[params.index].packageType = e.target.value
            //                // console.log(this.tableColumns.data)
            //              }
            //            }
            //          })

            //      }

            //   },


              //  {title: '总价',key: 'sumPrice',width: 150,align: 'center',

              //  render: (h, params) => {

              //        return h('Input', {
              //            style:{
              //              width:'80px',
              //              bottom:'6px',
              //            },
              //            props: {
              //            //将单元格的值给Input
              //               value:params.row.sumPrice,
              //               readonly:'readonly'
              //            },
              //            on:{
              //              'on-blur':(e) => {
              //                this.tableColumns.data[params.index].sumPrice = e.target.value
              //                // console.log(this.tableColumns.data)
              //              }
              //            }
              //          })

              //      }

              //   },

               {title: '备注',key: 'remark',width:300,align: 'center',

                        render: (h, params) => {

                              return h('Input', {
                                  style:{
                                    width:'270px',
                                    bottom:'6px',
                                  },
                                  props: {
                                  //将单元格的值给Input
                                     value:params.row.remark

                                  },
                                  on:{
                                    'on-blur':(e) => {
                                      params.row.remark = e.target.value
                                      this.tableColumns.data[params.index].remark = e.target.value
                                    }
                                  }
                                })

                            }
             },

            {title: '状态', key: 'status',width: 200,align: 'center',render: (h, params) => {
                   this.tableColumns.data[params.index].status = 'GPS01'
                   return h('div','申请');
                }},

         ],
         data:[
           {
           }
         ]
       },
       tableColumnsSpecial: {
          card: [
            {title: '选择',key: 'select',type: 'selection',width: 50,align: 'center'},
            {title: '序号',key: 'lineNo',width: 75,align: 'center',render: (h, params) => {
              return h('div',+params.row._index+1);
              }},
          {title: '回单号',key: 'godownEntryId',width:210,align: 'center',render: (h, params) => {
               return h('div',this.tableColumnsSpecial.data[params.index].godownEntryId)
           }},
          {title: '入库时间', key: 'createdate',width: 210 ,align: 'center',render: (h, params) => {
             this.tableColumnsSpecial.createdate = new Date().Format("yyyy-MM-dd");
             return h('div',new Date().Format("yyyy-MM-dd"));
            }},
          {title: '货物类型',key: 'backupfield3',width: 210 ,align: 'center', render: (h, params) => {
              params.row.backupfield3 = 'CGT4';
              let options = [];
              options.push(h("Option",{props:{value:'CGT4'}},'空托盘'));
              return h('Select', {
                props:{
                    value: params.row.backupfield3
                },
                style:{
                  width:'80px',
                  'text-algin':'left',
                  'margin-bottom':'11px'
                },
                on:{
                  'on-change':(backupfield3) => {
                    params.row.backupfield3 = backupfield3
                    this.tableColumnsSpecial.data[params.index] = params.row
                  }
                }
              },options)
            }},
            {title: '码垛口',key: 'palletizingYard',width: 210 ,align: 'center',render: (h, params) => {
              let options = [];
              options.push(h("Option",{props:{value:'AT-0-0-3'}},'1号'));
              options.push(h("Option",{props:{value:'AT-0-0-9'}},'2号'));
              options.push(h("Option",{props:{value:'AT-0-0-15'}},'3号'));
              options.push(h("Option",{props:{value:'AT-0-0-21'}},'4号'));
              options.push(h("Option",{props:{value:'AT-0-0-27'}},'5号'));

              return h('Select', {
                props:{
                    value: params.row.palletizingYard
                },
                style:{
                  width:'80px',
                  'text-algin':'left',
                  'margin-bottom':'11px'
                },
                on:{
                  'on-change':(palletizingYard) => {
                    params.row.palletizingYard = palletizingYard
                    this.tableColumnsSpecial.data[params.index] = params.row
                  }
                }
              },options)
            }},   //新增
            {title: '状态',key: 'godownEntryStatus',width: 180 ,align: 'center',render: (h, params) => {
               this.tableColumnsSpecial.godownEntryStatus = 'RS01'
               return h('div','申请');
              }}
          ],
          data:[
            {
            }
          ]
        },
      startTimeOption:{},
      godownTypeOption:[],
      godownType:''

    }
  },
  methods:{

    changeFormat(inDate){
      this.formFilter.inDate=inDate;

      this.tableColumns.data.forEach ((item,index) =>{

        if(item.produceDate != ""){

        }else{
          var dateTime=new Date(this.formFilter.inDate);
          //params.row.stockBatch = this.formFilter.inDate;
          this.tableColumns.data[index].stockBatch = this.formFilter.inDate //如果没有生产日期，则批次号是入库日期
        }

        var x = parseInt(this.tableColumns.data[index].effectiveTime);
        this.tableColumns.data[index].stockWarnDate = this.DateAdd("d ",x,dateTime).Format("yyyy-MM-dd")
      })


    },



    //获取所有的供应商
    getsupplierNameInfo(){
      axios.get(sessionStorage.http+`/supplierInfo/getAllSupplier`)
      .then((result) => {
        this.vendorNameList=result.data
      })
    },

    //获取所有的仓库
    getAllWarehouse(){
      axios.get(sessionStorage.http+`/getAllWareHouseInfo?loginStatus=${sessionStorage.loginStatus}`)
         .then((res)=>{
           this.warehouseList = res.data.filter(i => i.isStart =='1');
         })
    },



     DateAdd(interval,number,date) {

/*
  *   功能:实现VBScript的DateAdd功能.
  *   参数:interval,字符串表达式，表示要添加的时间间隔.
  *   参数:number,数值表达式，表示要添加的时间间隔的个数.
  *   参数:date,时间对象.
  *   返回:新的时间对象.
  *   var   now   =   new   Date();
  *   var   newDate   =   DateAdd( "d ",5,now);
  *---------------   DateAdd(interval,number,date)   -----------------
  */
        switch(interval)
        {
                case   "y "   :   {
                        date.setFullYear(date.getFullYear()+number);
                        return   date;
                        break;
                }
                case   "q "   :   {
                        date.setMonth(date.getMonth()+number*3);
                        return   date;
                        break;
                }
                case   "m "   :   {
                        date.setMonth(date.getMonth()+number);
                        return   date;
                        break;
                }
                case   "w "   :   {
                        date.setDate(date.getDate()+number*7);
                        return   date;
                        break;
                }
                case   "d "   :   {
                        date.setDate(date.getDate()+number);
                        return   date;
                        break;
                }
                case   "h "   :   {
                        date.setHours(date.getHours()+number);
                        return   date;
                        break;
                }
                case   "m "   :   {
                        date.setMinutes(date.getMinutes()+number);
                        return   date;
                        break;
                }
                case   "s "   :   {
                        date.setSeconds(date.getSeconds()+number);
                        return   date;
                        break;
                }
                default   :   {
                        date.setDate(d.getDate()+number);
                        return   date;
                        break;
                }
        }

    },

    chgedata(){

      this.formFilter.inDate = this.formartDate(this.formFilter.inDate)
      // alert(this.formFilter.inDate)
      this.defaultstockBatch = this.formFilter.inDate;
    },

    //修改时间样式
    changeDate(dateA) {
        var dateee = new Date(dateA).toJSON();
        var date = new Date(+new Date(dateee)).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
        return date;
    },

    //去除时间
    getStartTimeFly(startTime){
      return  {
          disabledDate(time) {
            var dateTime=new Date();
            dateTime=dateTime.setDate(dateTime.getDate()-1);
            dateTime=new Date(dateTime);
            return time <= dateTime;
          }
        }
    },
    // async getId(){
    //  const id = await this.getRes();
    //  return id;
    // },
    // getRes(){
    //   return new Promise((resolve,reject)=>{
    //     axios.get(sessionStorage.http+'/autoCreateId?type=RK')
    //      .then((res) =>{
    //        resolve(res);
    //      })
    //   })
    // },
    //获取客户信息
    clearTable(){
      // this.tableColumns.data = [];
      // this.tableColumnsSpecial.data = [];
    },

    //获取航班信息
    getFlightInfo(params){
        axios.post(sessionStorage.http +'/queryFlight',params.row)
        .then((res) =>{
          // console.log(res.data)
          if(res.data == [] || res.data == null){
            this.$Message.error('未查询到航班信息');
            this.formFilter.flightNumber = '';
            return;
          }
          this.tableColumns.data[params.index].navigationDivision = res.data.airlineNumber;
          this.tableColumns.data[params.index].flightTime = res.data.flyingTime;
          this.tableColumns.data[params.index].freightStationSimpleName = res.data.freightStationSimpleName;
          this.tableColumns.data[params.index].freightStation = res.data.freightStationId;

          params.row.navigationDivision = res.data.airlineNumber;
          params.row.flightTime = res.data.flyingTime;
          params.row.freightStationSimpleName = res.data.freightStationSimpleName;
          params.row.freightStation = res.data.freightStationId;
          // this.tableColumns.data[params.index].freightStationSimpleName = "12345";
          // this.tableColumns.data[params.index]movetype = "OD001";
        })
        // this.formFilter.flightTime = '18:00:00';
        // this.formFilter.freightStationSimpleName = '简称';
    },
    compareFightTimeAndNow(event){
      //选择时间
      var flightTime = event.split(':');
      //当前时间
      var dateTime = new Date().Format('hh:mm:ss');
      var nowTime = dateTime.split(':');

      var name = 'flightTime_'+this.tableColumns.data[params.index].lineNo;
      //计算选择时间秒数
      var time = +flightTime[0] * 3600 + +flightTime[1] * 60 + ++flightTime[2];
      //当前时间秒数
      var now = +nowTime[0] * 3600 + +nowTime[1] * 60 + ++nowTime[2]
      if(time < now){
        iview.Message.error({
          content:"选择的时间,不可小于当前时间",
          duration:5
        });
        params.row.flightTime = '';
        this.tableColumns.data[params.index] = params.row;
        return;
      }
      // disabledDate(time) {
      //   var dateTime=new Date();
      //   dateTime = dateTime.setDate(dateTime.getDate()-1)
      //   return time < new Date(dateTime)
      // }
    },
    //  entryInfo documentInfo deliveryInfo godownInfos entryInfoOfSpecial godownInfosSpecial
    async changeContentByPlanType(value){
      // console.log(value)
      //入库信息
      var entryInfo =  document.getElementById('entryInfo');
      //单证信息
      // var documentInfo =  document.getElementById('documentInfo');
      //送货信息
      // var deliveryInfo =  document.getElementById('deliveryInfo');
      //入库单记录
      // var godownInfos =  document.getElementById('godownInfos');
      //特殊商品-入库星系
      var entryInfoOfSpecial =  document.getElementById('entryInfoOfSpecial');
      //特殊商品
      // var godownInfosSpecial =  document.getElementById('godownInfosSpecial');
      this.quantity=0;
      this.formFilter = {incomingNotice:''};
      this.formFilter.num = 1;
      this.formFilter.status = 'GPS01';
      this.formFilter.createdate = new Date().Format('yyyy-MM-dd');
      this.formFilter.movetype = value;
      this.formFilter.creater = sessionStorage.opername;
      // this.formFilter.creater = 'yuy';
      // console.log(this.formFilter)
      this.tableColumns.data = [];
      this.tableColumnsSpecial.data = [];
      if(value == 'GPT01'){
        this.getid();
        this.isDesplay=false;
        this.a=true;
        entryInfo.style.cssText  = 'display:inline-block;width:100%';
        // documentInfo.style.cssText  = 'display:inline-block';
        // deliveryInfo.style.cssText  = 'display:inline-block;width:100%';
        // godownInfos.style.cssText  = 'display:block';
        entryInfoOfSpecial.style.cssText  = 'display:none';
        // godownInfosSpecial.style.cssText  = 'display:none';
        this.godownType = 'RT01';
      }else if(value == 'GPT02'){
        this.getid();
        this.isDesplay=true;
        this.a=false;
        // entryInfo.style.cssText  = 'display:inline-block;width:100%';
        // deliveryInfo.style.cssText  = 'display:inline-block;width:100%';
        // documentInfo.style.cssText  = 'display:none';
        // godownInfos.style.cssText  = 'display:block';
        entryInfoOfSpecial.style.cssText  = 'display:none';
        // godownInfosSpecial.style.cssText  = 'display:none';
        this.godownType = 'RT06';
      }else if(value == 'GPT03'){
        this.isDesplay=false;
        this.a=false;
        this.getid();
        // entryInfo.style.cssText  = 'display:none';
        // documentInfo.style.cssText  = 'display:none';
        // deliveryInfo.style.cssText  = 'display:none';
        // godownInfos.style.cssText  = 'display:none';
        // godownInfosSpecial.style.cssText  = 'display:block';
        entryInfoOfSpecial.style.cssText  = 'display:block';
        // this.godownType = 'RT04';
        // var res = await axios.get(sessionStorage.http+'/autoCreateId?type=WE');
        // this.formFilter.incomingNotice = res.data;
      }else if(value == '1' || value == undefined){
        // this.$refs.movetype.clearSingleSelect();
        // entryInfo.style.cssText  = 'display:none';
        // documentInfo.style.cssText  = 'display:none';
        // deliveryInfo.style.cssText  = 'display:none';
        // godownInfos.style.cssText  = 'display:none';
        // godownInfosSpecial.style.cssText  = 'display:none';
        entryInfoOfSpecial.style.cssText  = 'display:none';
      }
    },
    //去除时间
    getStartTime(){
      this.startTimeOption = {
          disabledDate(time) {
            return time < new Date()
          }
        }
    },
    //检测入库单id是否已使用
    checkGodownId(godown){
      axios.post(sessionStorage.http +'/checkGodownId',godown)
      .then((res) =>{
        // console.log(res.data)
        if(res.data == '0'){
          iview.Message.error({
            content:"入库计划单id已使用",
            duration:5
          });
          this.formFilter.godownPlanId = '';
        }
      })
    },
    //检测进仓编号是否已生成入库计划
    async checkPlanId(e){
        // alert('222222')
      if(this.formFilter.movetype == 'GPT02'){
        if(e.target.value.length > 0){
          this.tableColumns.data=[];
          await axios.get(sessionStorage.http +'/queryDetails?incomingNotice='+e.target.value)
          .then((res) =>{
            console.log(res.data)
            if(res.data!=null){
              this.tableColumns.data=res.data;
              var i=0;
              this.tableColumns.data.forEach((item,index) => {
                i+=+(item.quantity)
                item.actualquantity=0
                item.lineNo=++index;
              })
              this.quantity=+(i.toFixed(3))+0;
            }else{
              this.formFilter.backupfield3='';
              iview.Message.error({
                content:'没有相关可入库的单据',
                duration:5
              });
            }
          })
          .catch((err) => {
            // console.log('2323232323--------')
             iview.Message.error({
               content:err.message,
               duration:5
             });
          })
        }
        return;
      }
      // console.log(e.target.value)
      // if(){
      //
      // }
      // if(e.target.value.length > 0){
      //   var cus = await axios.post(sessionStorage.http +'/queryCustomerid',{incomingNotice:e.target.value})
      //   // .then((res) =>{
      //     // console.log(res.data)
      //     if(cus.data == [] || cus.data == null){
      //       iview.Message.error({
      //         content:"基础信息尚未填写客户信息,请到基础信息中新增",
      //         duration:5
      //       });
      //       // this.formFilter.incomingNotice = '';
      //       this.$set(this.formFilter,'customerId',"");
      //       return;
      //     }
      //     // this.formFilter.customerId = res.data.customerid;
      //     // iview.Message.success({
      //     //   content:"已搜索到客户.",
      //     //   duration:5
      //     // });
      //     // this.formFilter.customerId = cus.data.customerid;
      //     this.$set(this.formFilter,'customerId',cus.data.customerid);
      //     this.$set(this.formFilter,'incomingNotice',e.target.value);
      //
      // }

        // console.log(typeof(this.formFilter.customerId))
        // console.log(this.customerList)
      // })


      // if(this.formFilter.movetype == 'GPT02'){
      //   var res = await axios.post(sessionStorage.http+'/queryDetailByincomingNotice?'+'loginStatus='+sessionStorage.loginStatus+"&incomingNotice="+this.formFilter.incomingNotice)
      //   if(res.data == 0){
      //     iview.Message.error({
      //       content:"该进仓编号不可生成返库入库计划",
      //       duration:5
      //     });
      //     this.formFilter.incomingNotice = '';
      //     return;
      //   }
      //   if(this.formFilter.movetype != 'GPT03'){
      //     this.tableColumns.data = res.data
      //     for(var i = 0;i < this.tableColumns.data.length;i++){
      //        var row = this.tableColumns.data[i];
      //        row.movetype = 'RT06';
      //        row.quantity = '0';
      //        row.volumeTotal = '0';
      //        row.weightTotal = '0';
      //        this.formFilter.movetype = row.movetype;
      //
      //     }
      //   }
      //   return;
      // }
      // var checkincomingNotice = await axios.get(sessionStorage.http +'/checkincomingNotice?incomingNotice='+this.formFilter.incomingNotice,)
      //   // console.log(res.data)
      //   if(checkincomingNotice.data == '0'){
      //     iview.Message.error({
      //       content:"进仓编号已生成计划单",
      //       duration:5
      //     });
      //     this.formFilter.incomingNotice = '';
      //   }

    },
    // 只能输入数字-校验入库单号
    checkOrderId(e){
      var value=e.target.value.replace(/[^\w\.\/]/ig,'');
      document.getElementById(e.target.id).value = value;
    },
    checkNumber(e){
      var value=e.target.value.replace(/\D/g,'');
      document.getElementById(e.target.id).value = value;
    },
    //计算总数
    countTotal(){


    },
    handleSuccess (res, file) {},
    //删除弹框
    delConfirm(){
      this.delete_confirm = true;
    },
    showTable(){
     // console.log(this.tableColumns.data);
    },
    //比较时间
    dueAndPruTime(dueid,proid,params){

    },
    // 客户/供应商,有且只有显示一个
    selectSupplier(){

    },
    selectCustomer(){

      //console.log(this.formFilter.customerid);
    },
    //显示弹框
    show(){

      this.formFilter.inDate = new Date();

      // console.log(godownTypeList)
      // this.freightStation = freightStation
      // this.destinationPort = destinationPort
      // this.godownTypeOption = godownTypeList;
      // console.log(  this.godownTypeOption)
      // this.customerList = customerList;
      // this.taskList = taskList
      this.inGodownPlan = true;
      // this.formFilter = {};
      this.formFilter.entry = 'GPT01';  //默认是一般入库

      this.formFilter.vendorName = '';
      this.formFilter.status = 'GPS01';
      this.formFilter.isBatchIn = 'P02';
      this.formFilter.createTime = new Date().Format("yyyy-MM-dd");
      this.formFilter.inOrderType='GPT01';
      this.formFilter.creatorName = sessionStorage.opername;
      this.formFilter.creatorId = sessionStorage.loginStatus;

      this.tableColumns.data = [];
      this.quantity=0;
      this.backupfield1=0
      this.isDesplay=false;//相关单号是否显示
      // this.formFilter.creater = sessionStorage.name;

      // console.log(this.formFilter.godownPlanId);
      axios.get(sessionStorage.http+'/autoCreateId?type=RK')
      .then(res => {
        console.log(res)
        this.formFilter.inOrderId = res.data
      })
      .catch(res => {
      })

      //获取所有的供应商
      this.getsupplierNameInfo();

      //获取所有的仓库
      this.getAllWarehouse();


      //获取入库口
      axios.get(sessionStorage.http+`/getentrances?loginStatus=${sessionStorage.loginStatus}`)
      .then((result) => {
        this.entrancelist=result.data
      })
      .catch((err)=>{
        iview.Message.error({
          content:err.message,
          duration:5
        });
      })

    },
    // 页面验证
    checkOrderDetail(param){
      //conversionRate  invUomCode batchno quantity recvquantity duedate productiondate
      // console.log('3333333333333333');
      console.log(param);
      // console.log('44444444444444444444444');
      // console.log(param.invUomCode == '');
      var checkStr = '';
      // if(param.distribution == 'AUTO'){
      //   checkStr = '';
      //   return checkStr;
      // }
      //
      if(param.materialNo == null || param.materialNo == ''|| param.materialNo == undefined){
        checkStr += '物料号/';
      }
      if(this.formFilter.movetype == 'GPT01'){
        //如果是空托盘入库，则以下这两项不用检验
      }else{
        if(param.stockBatch == null || param.stockBatch == ''|| param.stockBatch == undefined){
          checkStr += '批次号/';
        }
        if(param.vendorName == null || param.vendorName == ''|| param.vendorName == undefined){
          checkStr += '供应商/';
        }
      }
      if(param.materialDesc == null || param.materialDesc == ''|| param.materialDesc == undefined){
        checkStr += '物料描述/';
      }
      if(param.packitemspec == null || param.packitemspec == ''|| param.packitemspec == undefined){
        checkStr += '包装规格/';
      }
      if(param.shelflife == null || param.shelflife == ''|| param.shelflife == undefined){
        checkStr += '有效期/';
      }
      if(param.recheckdate == null || param.recheckdate == ''|| param.recheckdate == undefined){
        checkStr += '复检期/';
      }
      if(param.quantity == null || param.quantity == ''|| param.quantity == undefined){
        checkStr += '入库数量/';
      }
      if(param.stockNum == null || param.stockNum == ''|| param.stockNum == undefined){
        checkStr += '入库件数/';
      }
      if(param.unit == null || param.unit == ''|| param.unit == undefined){
        checkStr += '计量单位/';
      }
      return checkStr;
    },
    async ok(){

      console.log(this.formFilter);
      console.log(this.tableColumns.data);
      this.loading = false
      setTimeout(()=>{this.loading = true},0)

      if(this.tableColumns.data.length == 0 && this.tableColumnsSpecial.data.length == 0){
        this.$Message.error('明细表不能为空');
        this.inGodownPlan = true;
        setTimeout(()=>{this.loading = true},0)
        this.loading = false
        return
      }else{
        console.log("提交后")

        let distinct = false;

        await axios.post(sessionStorage.http+'/distictList?'+'loginStatus='+sessionStorage.loginStatus,this.tableColumns.data)
        .then((res) =>{
          if(!res.data){
            distinct = true

          }
        })

        if(distinct){
           this.$Message.error('明细的物料号,供应商和批次号不能同时相同');
            this.inGodownPlan = true;
            setTimeout(()=>{this.loading = true},0)
            this.loading = false
            return;
        }

        let x = this.formFilter.isBatchIn

        //如果不是批量入库，需要计算入库单的总入库件数和总入库重量
        if(this.formFilter.isBatchIn == 'P02'){
          var allWeight = 0;
          var allNum = 0;
          this.tableColumns.data.forEach(function (element, index, array){
            allWeight= allWeight + parseFloat(array[index].weight);
            allNum = allNum + parseInt(array[index].num);
            element.isBatchIn = x
          })

          this.formFilter.weight = allWeight;
          this.formFilter.num = allNum;
        }else{
          this.formFilter.weight = '';
          this.formFilter.num = '';
          this.tableColumns.data.forEach(function (element, index, array){
            console.log("11111111111")
            // console.log(this.tableColumns.data)
            element.isBatchIn = x
          })
        }

        axios.post(sessionStorage.http+'/addInOrder?'+'loginStatus='+sessionStorage.loginStatus,this.formFilter)
        .then((res) =>{
          if(res.code == '1'){
            // console.log(res.data)
            // iview.Message.success({
            //   content:'添加成功.',
            //   duration:5
            // });
            document.getElementById('search').click();
            this.inGodownPlan = false;
          }else if(res.code == '0'){
            // console.log(res.data)
            iview.Message.error({
              content:'不可重复添加.',
              duration:5
            });
            this.inGodownPlan = true;
            return;
          }
        })
        .catch((err) => {
           iview.Message.error({
             content:'入库单添加失败',
             duration:5
           });
        })
        this.addOrder(this.tableColumns.data);

      }
    },

    addOrder(entries){
      axios.post(sessionStorage.http+'/addInOrderDetail?'+'loginStatus='+sessionStorage.loginStatus,entries)
      .then((res) =>{
        if(res.code == '1'){
          console.log(res)
          iview.Message.success({
            content:'添加成功.',
            duration:5
          });
          // document.getElementById('search').click();
          // alert(1111)
          this.inGodownPlan = false;
        }else if(res.code == '0'){
          // console.log(res.data)
          iview.Message.error({
            content:'添加失败.',
            duration:5
          });
          this.inGodownPlan = true;
        }
      })
      .catch((err) => {
         iview.Message.error({
           content:'明细添加失败',
           duration:5
         });
      })
    },

    cancel(){},
    //删除弹框
    delConfirmOrder(){
      this.delete_confirm= true;
    },
    //删除事件
    deleteSelection(){
      // for(var i in this.rows){
      //
      //   this.quantity-=(+(this.rows[i].quantity));
      //   this.backupfield1-=(+(this.rows[i].backupfield1));
      //   console.log(this.rows[i]);
      //   this.tableColumns.data.remove(this.rows[i].lineNo);
      //   // console.log(this.tableColumns.data)
      // }
      // console.log('------------------------')
      // console.log(this.rows)
      // console.log('-------------------------')
      this.rows.forEach((item,index) => {
        this.quantity-=(+(this.rows[index].quantity));
        this.backupfield1-=(+(this.rows[index].stockNum));
        this.tableColumns.data.remove(this.rows[index].lineNo);
      })
      this.quantity = +(this.quantity.toFixed(3))+0
      this.delete_confirm = false;
      for(var j in this.tableColumns.data){
        this.tableColumns.data[j].lineNo = +j + 1;
      }

        document.getElementById('deldetail').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
        document.getElementById('deldetail').setAttribute("disabled","disabled");
        document.getElementById('deldetailSpecial').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
        document.getElementById('deldetailSpecial').setAttribute("disabled","disabled");
    },
    //勾选触发事件 Special
    onSelectionChange(row){
      this.rows = row;
      if(this.rows.length > 0){
        document.getElementById('deldetail').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;color:#fff");
        document.getElementById('deldetail').removeAttribute("disabled");
        document.getElementById('deldetailSpecial').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;color:#fff");
        document.getElementById('deldetailSpecial').removeAttribute("disabled");
      }else{
        document.getElementById('deldetail').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
        document.getElementById('deldetail').setAttribute("disabled","disabled");
        document.getElementById('deldetailSpecial').setAttribute("style","width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4");
        document.getElementById('deldetailSpecial').setAttribute("disabled","disabled");
      }
    },
    //添加一行
    async addDetail(){

      var checkStr = '';

      if(this.formFilter.inDate == null || this.formFilter.inDate == '' || this.formFilter.inDate == undefined){
        checkStr += '入库日期'+'/ ';
      }
      // if(this.formFilter.vendorName == null || this.formFilter.vendorName == '' || this.formFilter.vendorName == undefined){
      //   checkStr += '供应商名称'+'/ ';
      // }
      // if(this.formFilter.entry == null || this.formFilter.entry == '' || this.formFilter.entry == undefined){
      //   checkStr += '入库口'+'/ ';
      // }

      if(checkStr != ''){
        iview.Message.error({
          content:'请填写完或者选择 '+checkStr +' 中的数据',
          duration:5
        });
        this.inGodownPlan = true;
        return false;
      }
      //
      // if(this.formFilter.movetype=='GPT02'){
      //   if(this.tableColumns.data.length==0){
      //     iview.Message.error({
      //       content:'此单号没有对应的二次包装明细',
      //       duration:5
      //     });
      //   }else{
      //
      //   }
      //   return;
      // }
      //console.log(changeDate(this.tableColumns.data));
      // console.log(this.formFilter.num);
      // this.lDetail = this.tableColumns.data.length;

      if(this.addrows > 0){
        //this.formFilter.inDate = new Date().Format("yyyy-MM-dd");
        for(var i = 1;i <= this.addrows; i++){
          var id = '';
              var res = await axios.get(sessionStorage.http+'/autoCreateId?type=RD')
              .then((res) =>{
                id = res.data;
              })
              .catch((err) => {})


          this.tableColumns.data.push({
             select:false,
             lineNo:this.lDetail + i,
             inOrderDetailId:id,
             inOrderId:this.formFilter.inOrderId,
             materielId:'',
             materielName:'',
             unit:'',
             packageStandards:'',
             num:'',
             weight:'',
             partQuantity:'',
             batckGroupNun:'',
             vendorName:this.formFilter.vendorName,
             producerCode:''
,            producerName:'',
             produceDate:'',
             stockBatch:this.formFilter.inDate,  //默认批次号是入库日期
             qualityStatus:'',
             stockWarnDate:'',
             isBatchIn:this.formFilter.isBatchIn,
             inDate:this.formFilter.inDate,
             warehouseId:'',
             warehouseName:'',
             districtId:'',
             districtName:'',
             actualNum:0,
             actualWeight:0,
             insertYmd:new Date().Format("yyyy-MM-dd"),
             insertId:'',
             remark1:this.formFilter.inOrderType,
             remark2:this.formFilter.entry,
             price:'',
             sumPrice:''

           });
        }
        console.log(this.tableColumns.data)
      }
    },


    formartDate(date){//日期格式化
      let  Y = date.getFullYear() +''
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '' : date.getMonth() + 1 +'';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + '' : date.getDate() +'';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() +'';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() +'';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()+'';
      // console.log(Y + M + D)
      return Y +"-"+ M+"-"+ D
    },

    initFormatter(){
      Date.prototype.Format = function(fmt) { //
        let o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      }
    },

    },

    // async addDetailSpecial(){
    //   var id = '';
    //   if(this.formFilter.movetype == 'AT001'){
    //   var res = await axios.get(sessionStorage.http+'/autoCreateId?type=BK');
    //   id = res.data;
    //   }
    //   var checkStr = '';
    //   // //入库计划id
    //   // if(this.formFilter.godownPlanId == '' || this.formFilter.godownPlanId == undefined){
    //   //   checkStr += '入库计划单号'+'/ ';
    //   // }
    //   //进仓编号
    //   if(this.formFilter.incomingNotice == '' || this.formFilter.incomingNotice == undefined){
    //     checkStr += '进仓编号'+'/ ';
    //   }
    //   //deliveryType
    //   if(checkStr != ''){
    //     iview.Message.error({
    //       content:'请填写完 '+checkStr +' 中的数据',
    //       duration:5
    //     });
    //     this.inGodownPlan = true;
    //     return false;
    //   }
    //   //console.log(changeDate(this.tableColumns.data));
    //   // console.log(this.formFilter.num);
    //   this.lDetail = this.tableColumnsSpecial.data.length;
    //   if(this.formFilter.num > 0){
    //     for(var i = 1;i <= this.formFilter.num; i++){
    //       this.tableColumnsSpecial.data.push({
    //          select:false,
    //          lineNo:this.lDetail + i,
    //          movetype:this.godownType,
    //          deliveryType:'',
    //          palletizingYard:'',
    //          movetype:'',
    //          godownEntryId:id,
    //          godownEntryStatus : 'RS01',
    //          movetype:this.formFilter.movetype
    //        });
    //     }
    //   }
    // },
    // //得到时间
    // getCreatDate(createdate){
    //   this.formFilter.predictArriveTime = changeDate(createdate);
    //   // console.log(createdate);
    // },
    //

  created(){
    // axios.get(sessionStorage.http+'/autoCreateId?type=RJ')
    // .then((res) =>{
    //   if(res.data != null){
    //     // this.formFilter.godownPlanId = res.data;
    //     this.$set(this.formFilter,'godownPlanId',res.data);
    //   }
    // }),
    Array.prototype.indexOfData = function(val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i].lineNo == val) return i;
        }
        return -1;
    },
    Array.prototype.remove = function(val) {
      var index = this.indexOfData(val);
      if (index > -1) {
      this.splice(index, 1);
      }
    },
    this.initFormatter()

  }
}
</script>


<style lang="less" scoped>
    .font{
      position: absolute;
      left: -70px;
    }
    .font4{
      position: absolute;
      left: -65px;
    }
    .font2{
      position: absolute;
      left: -40px;
    }
    .font3{
      position: absolute;
      left: -55px;
    }
    .font6{
      position: absolute;
      left: -90px;
    }
    .fontdetail{
      position: absolute;
      color:#5aa5ff !important;
      left: -150px;
    }
</style>
<style lang="css">

    .ivu-input-icon{
      position: absolute;
      right:45px;
    }
    .ivu-input-icon-normal+.ivu-input{
      width: 120px;
    }
</style>
<style lang="less">
.ideanGodownPlanModal{
  .Tableclass{
    .ivu-input-wrapper{
      position:relative;
      width: 140px !important;
      padding-right: 32px !important;
    }
    .ivu-input-suffix{
      right:34px;
      top:0px;
    }
  }
  .ivu-table-wrapper{
    overflow: inherit !important;
  }
  // .ivu-select-selection{
  //   bottom: 10px;
  // }
  th .ivu-table-cell{
        font-size: 12px !important;
        font-weight: bold;
        color:#333;
      }
      .ivu-table-cell{
        overflow: inherit;
      }
      .ivu-table-overflow {
        overflow-y: inherit;
      }
      .status{
        .ivu-form-item-content{
          line-height: 43px;
        }
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
      // .ivu-table-overflowY {
      //   overflow-y: scroll;
      // }
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
          right:25px;
      }
     .ivu-input-icon-normal+.ivu-input{
       width: 120px;
     }

     .createdate{
       .ivu-input-icon{
            position: absolute;
            right:45px;
        }
     }

}
</style>
<!-- [
  h('Input',{
      props: {
             //将单元格的值给Input
             value:params.row.godownEntryId,
           },
     style:{
                 'margin-bottom':'11px'
                 },
     on:{
          'on-change':(event)=> {
           params.row.godownEntryId = event.target.value;
           this.tableColumnsSpecial.data[params.index] = params.row;
         },
         'on-keyup':(e)=>{
           var value = e.target.value.replace(/[^\d|chun| -_]/g,'');
           params.row.godownEntryId = value;
           this.tableColumnsSpecial.data[params.index] = params.row;
         },
         'on-blur':(e)=>{
           this.checkGodownId(params);
         }
      }
    }
  )] -->
