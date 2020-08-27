<template>
  <div class="inWareNoticeManage">
    <Form :label-width="120" v-model.sync = "noticeForm">
      <Row>
        <Col span="6">
          <FormItem prop="inwarenoticeid" label="入库通知单号">
            <Input v-model.sync="noticeForm.inwarenoticeid" @on-change="getNotices"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="inwarenoticedetailid" label="入库通知单明细号">
            <Input v-model.sync="noticeForm.inwarenoticedetailid" @on-change="getNotices"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="status" label="状态">
            <Select clearable filterable v-model.sync="noticeForm.status" @on-change="getNotices">
              <Option v-for="item in statuses" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="stockbatch" label="批号">
            <Input clearable filterable v-model.sync="noticeForm.stockbatch" @on-change="getNotices"></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem prop="noticeType" label="入库类型">
            <Select clearable filterable v-model.sync="noticeForm.noticetype" @on-change="getNotices">
              <Option v-for="item in noticeTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
         <FormItem label="数据来源" prop="datasource">
            <Select v-model.sync="noticeForm.datasource" clearable @on-change="getNotices">
              <Option v-for="item in datasources" :value="item.value" :key="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
         <FormItem label="入库日期">
            <DatePicker type="daterange" format="yyyy-MM-dd" v-model.sync="indaterange" @on-change="getNotices" placement="bottom"></DatePicker>
          </FormItem>
        </Col>

      </Row>
    </Form>
    <div class="flexEnd">
      <Button :type="deleteBtnFlag?'default':'primary'" class="btnForm" shape="circle" @click="createInOrder">创建入库单</Button>
      <Button type="primary" class="btnForm" shape="circle" @click="showInsert">新&nbsp;&nbsp;增</Button>
    </div>
    <Table ref="table" :height="tableHeight" border stripe :columns="columns" :data="notices" @on-row-dblclick="showUpdate" @on-selection-change="v=>deleteBtnFlag=v.length==0"></Table>
    <div class="page">
      <Page show-sizer show-elevator show-total :total="noticeForm.total" :current="noticeForm.pagenum" :page-size="noticeForm.pagesize" :page-size-opts="[10,20,30]" @on-change="changePagenum" @on-page-size-change="changePagesize"></Page>
    </div>

    <Modal v-model="modal" :width="1200" :closable="false" :mask-closable="false" scrollable :title="title" >
      <Form :label-width="120" ref="model" :model.sync="model" :rules="formValidate" class="formValidate">
        <Row>
          <Col span="6">
            <FormItem prop="inWareNoticeId" label="入库通知单号">
              <Input v-model.sync="model.inWareNoticeId"></Input>
            </FormItem>
          </Col>
          <Col span="6">
           <FormItem label="入库日期" prop="inDate">
              <DatePicker type="date" format="yyyy-MM-dd" v-model.sync="model.inDate" placement="bottom"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
           <FormItem label="是否批量入库" prop="isBatchIn">
              <Select v-model.sync="model.isBatchIn">
                <Option :value="1">是</Option>
                <Option :value="0">否</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="6">
           <FormItem label="数据来源">
              <Select v-model.sync="model.dataSource" clear>
                <Option v-for="item in datasources" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>

        </Row>
      </Form>

      <Table class="modalTable" :height="300" :columns="modalColumns" :data="details" border stripe></Table>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="submit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default{
  name:"inWareNoticeManage",
  data(){
    var _this = this;
    return {
      //全页面数据
      statuses:[], //入库通知单状态
      noticeTypes:[], //入库通知单类型
      datasources:[], //数据来源
      suppliers:[], //供应商枚举
      qualityStatuses:[], //入库通知单明细质量状态
      isGiftOptions:{
        CN:[
          {label:"是",value:1},
          {label:"否",value:0}
        ],
        EN:[
          {label:"Yes",value:1},
          {label:"No",value:0}
        ],
        JP:[
          {label:"は",value:1},
          {label:"いいえ",value:0}
        ]
      },

      //表单数据
      indaterange:[],
      noticeForm:{
        total:0,
        pagesize:20,
        pagenum:1,


      },
      //表格数据
      tableHeight:400, //表格高度
      columns:[
        {
          type:"selection",
          title:"选择",
          align:"center",
          width:55
        },
        {title: '序号',align:"center",width:70,render:(h,params)=>{
          return h('div',params.index+1+this.noticeForm.pagesize*(this.noticeForm.pagenum-1))
        }},
        {
          title:"入库通知单号",
          key:"inWareNoticeId",
          align:"center"
        },
        {
          title:"入库通知单类型",
          key:"noticeType",
          align:"center",
          render:(h,params)=>{
            let str = this.getLabel(this.noticeTypes,params.row.noticeType);
            return h('div',str?str:"数据有误")
          }
        },
        {
          title:"入库通知单状态",
          key:"status",
          align:"center",
          render:(h,params)=>{
            let str = this.getLabel(this.statuses,params.row.status);
            return h('div',str?str:"数据有误")
          }
        },
        {
          title:"接受日期",
          key:"inDate",
          align:"center"
        },
        {
          title:"是否批量入库",
          key:"isBatchIn",
          align:"center",
          render:(h,params)=>{
            switch(this.$store.state.globalLang){
              case "CN":
                if(params.row.isBatchIn == 1){
                  return h('div',"是")
                }else{
                  return h('div',"否")
                }
                break;
              case "EN":
                if(params.row.isBatchIn == 1){
                  return h('div',"Yes")
                }else{
                  return h('div',"No")
                }
                break;
              case "JP":
                if(params.row.isBatchIn == 1){
                  return h('div',"は")
                }else{
                  return h('div',"いいえ")
                }
                break;
            }
          }
        },
        {
          title:"数据来源",
          key:"datareSource",
          align:"center",
          render:(h,params)=>{
            return h('div',this.getLabel(this.datasources,params.row.dataSource))
          }
        },
      ],
      notices:[], //表格中的数据

      //对话框数据
      modal:false,
      title:"",
      model:{
      },
      details:[{specs:[]}],
      formValidate:{
        ordertype:[
          {required:true,type:"number",message:"出库类型不可为空",trigger:"change"}
        ],
        outdate:[
          {required: true, message: '日期不能为空!', trigger: 'change', pattern: /.+/}
        ]
      },
      inWareNoticeDetailId: {
          title:"入库通知单明细号",
          key:"inWareNoticeDetailId",
          align:"center",
          width:100,
          tooltip:true,
        },
      modalColumns:[
        {
          title:"序号",
          type:"index",
          key:"index",
          width:60,
          align:"center",
        },
        {
          title:"入库通知单明细号",
          key:"inWareNoticeDetailId",
          align:"center",
          width:100,
          tooltip:true,
        },
        {
          title:"供应商",
          key:"supplierCode",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h('Select',{
              props:{
                value:this.details[params.index].supplierCode
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].supplierCode = e;
                }
              }
            },this.suppliers.map(item=>{
              return h('Option',{props:item})
            }))
          }
        },
        {
          title:"批号",
          key:"stockBatch",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h('Input',{
              props:{
                value:this.details[params.index].stockBatch
              },
              on:{
                "input":(e)=>{
                  this.details[params.index].stockBatch = e;
                },
              }
            })
          }
        },
        {
          title:"入库物料",
          key:"materialId",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h('Input',{
              props:{
                value:this.details[params.index].materialId
              },
              on:{
                "input":(e)=>{
                  this.details[params.index].materialId = e;
                },
                "on-blur":(e)=>{
                  this.getSpecs(this.details[params.index].materialId,params.index)
                }
              }
            })
          }
        },
        {
          title:"物料规格",
          key:"packageStandards",
          align:"center",
          width:120,
          tooltip:true,
          // render:(h,params)=>{
          //   if(this.details[params.index].materialId){
          //     return h('Select',{
          //       props:{
          //         value:this.details[params.index].packageStandards,
          //       },
          //       on:{
          //         "on-change":(e)=>{
          //           this.details[params.index].packageStandards = e;
          //         }
          //       }
          //     },this.details[params.index].specs.map(it=>{
          //       return h('Option',{
          //         props:it
          //       })
          //     }))
          //   }else{
          //     return h('div',"暂无数据")
          //   }

          // }
        },
        {
          title:"库区",
          key:"districtId",
          align:"center",
          width:120,
          tooltip:true,
        },
        {
          title:"预计入库数量",
          key:"expectedNum",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h("InputNumber",{
              props:{
                min:1,
                value:this.details[params.index].expectedNum?this.details[params.index].expectedNum:1
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].expectedNum = e;
                }
              }

            })
          }
        },
        {
          title:"预计入库重量",
          key:"expectedWeight",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h("InputNumber",{
              props:{
                min:1,
                value:this.details[params.index].expectedWeight?this.details[params.index].expectedWeight:1
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].expectedWeight = e;
                }
              }

            })
          }
        },
        {
          title:"已建入库单数量",
          key:"finishNum",
          align:"center",
          width:130,
          tooltip:true,
          render:(h,params)=>{
            return h("InputNumber",{
              props:{
                min:1,
                value:this.details[params.index].finishNum?this.details[params.index].finishNum:1
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].finishNum = e;
                }
              }

            })
          }
        },
        {
          title:"已建入库单件数",
          key:"finishWeight",
          align:"center",
          width:130,
          tooltip:true,
          render:(h,params)=>{
            return h("InputNumber",{
              props:{
                min:1,
                value:this.details[params.index].finishWeight?this.details[params.index].finishWeight:1
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].finishWeight = e;
                }
              }

            })
          }
        },
        {
          title:"质量状态",
          key:"qualityStatus",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h('Select',{
              props:{
                value:this.details[params.index].qualityStatus,
              },
              on:{
                "on-change":(e)=>{
                  this.details[params.index].qualityStatus = e;
                }
              }
            },this.qualityStatuses.map(it=>{
              return h('Option',{
                props:it
              })
            }))
          }

        },
        {
          title:"生产日期",
          key:"produceDate",
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h('DatePicker',{
              props:{
                value:this.details[params.index].produceDate,
                format:"yyyy-MM-dd",
                type:"date"
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].produceDate = e;
                }
              }
            })
          }
        },
        {
          title:"有效期",
          key:"inWareNoticeDetailId", //待添加
          align:"center",
          width:120,
          tooltip:true,
          render:(h,params)=>{
            return h('DatePicker',{
              props:{
                value:this.details[params.index].produceDate,
                format:"yyyy-MM-dd",
                type:"date"
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].produceDate = e;
                }
              }
            })
          }
        },
        {
          title:"复检期",
          key:"inWareNoticeDetailId", //待添加
          align:"center",
          width:120,
          tooltip:true
        },
        {
          title:"是否赠品",
          key:"isGift",
          width:100,
          align:"center",
          tooltip:true,
          render:(h,params)=>{
            return h('Select',{
              props:{
                value:this.details[params.index].isGift
              },
              on:{
                'on-change':(e)=>{
                  this.details[params.index].isGift = e;
                }
              }
            },this.isGiftOptions[this.$store.state.globalLang].map(item=>{
              return h('Option',{props:item})
            }))
          }
        },
        {
            title:"操作",
            key:"actions",
            width:100,
            align:"center",
            fixed:"right",
            render:(h,params)=>{
              return h('div',[
                h('Button',{
                  props:{
                    icon:"md-add",
                    type:"primary",
                    size:"small"
                  },
                  style:{
                    marginRight:"5px"
                  },
                  on:{
                    click:()=>{
                      this.details.splice(params.index+1,0,{specs:[]})
                    }
                  }
                }),
                h('Button',{
                  props:{
                    icon:"md-trash",
                    type:"error",
                    size:"small"
                  },
                  on:{
                    click:()=>{
                      if(this.details.length==1){
                        console.log("一个出库单至少有一个明细信息")
                      }else{
                        this.details.splice(params.index,1)
                      }

                    }
                  }
                })
              ])
            }
          },

      ],

      //操作数据
      //删除
      deleteBtnFlag:true, //是否有选中的删除项

    }
  },
  created() {
    this.getTypes()

  },
  mounted() {
    this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop-200;
    this.getNotices(); //获取出库单信息
  },
  methods:{

    //获取系统参数
    async getTypes(){
      await this.getType("instockinformstatus",this.statuses) //状态
      await this.getType('InstockType',this.noticeTypes) //入库类型
      await this.getType("datasource",this.datasources) //数据来源
      await this._axios("get","resourceinfo/supplierenum",(res)=>{
        this.suppliers = this.arrConvert(res)
      })
      await this.getType("quailtytype",this.qualityStatuses) //明细质量状态
    },

    changePagesize(e){
      this.noticeForm.pagesize = e;
      console.log(this.noticeForm)
    },
    changePagenum(e){
      this.noticeForm.pagenum = e;
    },
    submit(){
      console.log("submit")
      this.modal=false;
    },
    cancel(){
      if(this.title == "新增入库通知单"){
        this.modalColumns.splice(1,0,this.inWareNoticeDetailId)
      }
      this.modal = false;
    },
    // 显示新增页面
    showInsert(){
      this.title="新增入库通知单";
      this.modalColumns.splice(1,1)
      this.modal = true;
      this.model = {}
      this.details = [{specs:[]}]
      this.submit = this.insert;
    },
    showUpdate(e){
      this._axios("get","inwarenotice/noticedetailinfo",{inwarenoticeid:e.inWareNoticeId},(res)=>{
        console.log(res)
        this.details = res;
      })

      for(let i of this.details){
        i.specs = [];
        if(i.warehouseId){
          this._axios("get","storageinfo/district",{warehouseid:i.warehouseId},(res)=>{
            console.log(res)
            i.districts = this.arrConvert(res)
          })
        }
      }

      this.model = e;
      this.title = "更新入库通知单"
      this.modal = true;
      this.submit = this.update;
    },

    //查询入库通知单
    getNotices(){
      this.noticeForm.indates = this.indaterange?this.dateFormat(this.indaterange[0],"yyyy-MM-dd"):null;
      this.noticeForm.indatee = this.indaterange?this.dateFormat(this.indaterange[1],"yyyy-MM-dd"):null;
      // this.noticeForm.status = 1;
      console.log(this.noticeForm)
      this._axios("get","inwarenotice/noticeinfo",this.noticeForm,(res)=>{
        this.notices = res.list;
        console.log(res)
        this.noticeForm.total = res.total;
      })

    },
    //插入出库单
    insert(){
      console.log(this.model)

      this.modalColumns.splice(1,0,this.inWareNoticeDetailId)
      this.modal = false;

    },
    update(){
      console.log(this.details)




    },
    createInOrder(){

    },
    // getMaterielName(id,index){
    //   this.$axios.get(`mitem/mitem?materielid=${id}`).then(res=>{
    //     // console.log(res)
    //     if(res.code === 0){
    //       this.getSpecs(id,index)
    //     }else{
    //       console.log("获取物料名称失败",res)
    //     }
    //   }).catch(err=>{
    //     console.log(err)
    //   })
    // },
    getSpecs(id,index){
      //console.log("参数：",id,index)
      return this.$axios.get(`/mitem/mitemspecenum?materielid=${id}`).then(res=>{
        console.log("规格",res)
        if(res.code === 0 && res.data.length>0){
          // this.specenum = res.data;

          // for(let i of res.data){
          //   this.model.children[index].specs.push({label:i.name,value:i.code})
          // }
          this.details[index].specs = this.arrConvert(res.data)
          // this.$set(this.model.children[index],"specs",this.model.children[index].specs)
          // console.log(this.model.children[index].specs)


        }else{
          console.log("暂无规格信息，或请求错误",res)
        }
      }).catch(err=>{
        console.log(err)
      })
    }

  }
}
</script>

<style lang ="less">
  .inWareNoticeManage{
    .ivu-date-picker{
      width: 100%;
    }
   /* .modalTable .ivu-table-cell{
      padding-left: 8px !important;
      padding-right: 8px !important;
    } */
  }

</style>
