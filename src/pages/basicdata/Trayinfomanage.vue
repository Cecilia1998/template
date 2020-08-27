<template>
    <div class="trayinfomation">
      <Form :label-width="85" inline style="text-align:left;" id="formFilter">
        <div class="" style="display:flex;justify-content:space-between;">
          <div class="d1">
            <Form-item label="托盘号">
              <Input :maxlength="25" @on-change="searchtray" v-model="trayid" placeholder="请输入" />
            </Form-item>
            <Form-item label="仓库">
                <Select v-model="ware" placeholder="请选择" @on-change="searchtray" style="width: 150px">
                  <Option value="">-所有仓库-</Option>
                  <Option v-for=" item in warehouseList" :value="item.warehouseid" :key="item.warehouseid">{{ item.warehousename }}</Option>
                </Select>
            </Form-item>
          </div>
          <div class="">
          </div>
        </div>
          <div id="deleteBtn" style="display:flex;justify-content:space-between;">
            <div class="">
              <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click="deletetip"
              style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
              <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
              style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
              <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;"
                      @click='exporttray'>打&nbsp;&nbsp;印</Button>
              <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4"
                      @click='exporttray'>打&nbsp;&nbsp;印</Button>
            </div>
            <div class="">
              <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='addbutton'>新&nbsp;&nbsp;增</Button>
            </div>
          </div>
          <br>
        <form :model="form1">
          <Modal class="trayinfomodalstyle" v-model="modal1" :footer-hide='true' :mask-closable='false' scrollable title="托盘信息新增">
              <span style="color:red">*</span>托盘编号 <Input :maxlength="25" v-model="form1.trayid" size="small" placeholder="请输入" />&nbsp;&nbsp;&nbsp;
              <span style="color:red">*</span>使用状态 <Select  v-model="form1.status" >
                 <Option v-for="item in data5" :value="item.title" :key="item.title">{{ item.name }}</Option>
               </Select><br><br>
               <span style="color:red;margin-left:24px">*</span>仓库
                 <Select v-model="form1.warehouseId" placeholder="请选择" >
                   <Option value="">-所有仓库-</Option>
                   <Option v-for=" item in warehouseList" :value="item.warehouseid" :key="item.warehouseid">{{ item.warehousename }}</Option>
                 </Select>
            <br><br><br>
            <footer style="display:flex;justify-content:flex-end;">
              <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;"
               @click='newtray'>提&nbsp;&nbsp;交</Button>
            </footer>
          </Modal>
        </form>
        <Modal v-model="modal4" width="360" :mask-closable='false'>
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span style="font-size:14px">删除确认</span>
          </p>
          <div style="text-align:center">
            <span style="font-size:14px">确定要删除吗？</span>
          </div>
          <div slot="footer" style="display:flex;justify-content:center;">
            <Button type="error" shape="circle" style="width:120px"  @click="deleteselect">确定删除</Button>
          </div>
        </Modal>
      </form>
      <div class="trayinfomanagetable">
        <Table stripe height=520 @on-selection-change="selecting" border ref="selection" :columns="columns4" :data="data1"></Table>
      </div>
        <br>
        <Page class="page" :total="total" show-total @on-change="changepage" @on-page-size-change="changesize" show-elevator :page-size="pagesize" :page-size-opts="[10,20,30]" show-sizer />
    </div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
        let sparedata = ''
        axios.get(sessionStorage.http+`/findalltrayinfo?pagenumber=1&pagesize=20&trayid=${sparedata}&ware=${sparedata}&loginStatus=${sessionStorage.loginStatus}`)
        .then((a) => {
          console.log(a.data.data)
          this.data1=a.data.data
          this.total = a.data.length
          this.pagenumber=1,
          console.log('success')
        })
        .catch((b) => {
          console.log(b)
        })
        axios.get(sessionStorage.http+`/findwarehouseisstart?loginStatus=${sessionStorage.loginStatus}`)
        .then((a) => {
          this.warehouseList=a.data
          console.log('success')
        })
        .catch((b) => {
          console.log(b)
        })
      },
        data () {
            return {
              warehouseList:[],
              clickSt:true,
              deleteButtonFlag:true,
              modal1:false,
              modal4:false,
              pagenumber:1,
              pagesize:20,
              trayid:"",
              ware:"",
              total:0,
                columns4: [
                    {type: 'selection',width: 60,align: 'center'},
                    {title: '序号',key: 'linenum',align: 'center', width: 75,
                      render:(h,params)=>{
                        return h("div",+params.row._index + 1+((this.pagenumber-1)*this.pagesize))
                      }
                    },
                    {title: '仓库编号',key: 'warehouseId',align: 'center',},
                    {title: '仓库名称',key: 'warehousename',align: 'center',},
                    {title: '托盘号', key: 'trayid',align: 'center',},
                    {
                        title: '是否打印',
                        key: 'isprint',
                        render:(h,params)=>{
                          let isstart = '';
                          if(params.row.isPrint == '1'){
                            isstart = '是';
                          }else{
                            isstart = '否';
                          }
                          return h('div',isstart);
                        }
                    },
                    {title: '状态',key: 'status',width: 100,align: 'center',},
                    {title: '创建时间',key: 'createdate',align: 'center',},
                    {title: '操作',key: 'action',width: 100,align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('a', {
                                    on: {
                                        click: () => {
                                            axios.post(sessionStorage.http+`/changestatus?pagenumber=${this.pagenumber}
                                              &pagesize=${this.pagesize}&trayid=${this.trayid}&ware=${this.ware}&loginStatus=${sessionStorage.loginStatus}`,params.row)
                                            .then((a) => {
                                              this.data1=a.data.data
                                              console.log('success')
                                            })
                                            .catch((b) => {
                                              console.log('fail')
                                            })
                                        }
                                    }
                                }, params.row.opposestatus)
                            ]);
                        }
                    }
                ],
                data1: [],
                form1:{
                  trayid:"",
                  status:"",
                  createdate:"",
                  warehouseId:"",
                },
                selects:[],
                data5:[
                  {
                  title:"TPS1",
                  name:"使用中",
                },
                {
                  title:"TPS0",
                  name:"空闲",
                }
              ]
            }
        },
        methods: {
          searchtray(){
            console.log(this.ware)
            axios.get(sessionStorage.http+`/findalltrayinfo?trayid=${this.trayid}&ware=${this.ware}
              &pagenumber=1&pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`)
            .then((a) => {
              this.data1=a.data.data
              this.total = a.data.length
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
            console.log(this.selects)
          },
          deleteselect(){
            for (var variable in this.selects) {
              if (this.selects[variable].status=='启用') {
                this.$Message.error('所选项中包含使用中的托盘，不可删除！');
                this.modal4 = false;
                return;
              }
            }

            axios.post(sessionStorage.http+`/deldetray?trayid=${this.trayid}&ware=${this.ware}
              &pagenumber=${this.pagenumber}&pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`,this.selects)
            .then((a) => {
              this.data1=a.data.data
              this.total = a.data.length
              this.$Message.info('已删除');
              this.modal4 = false;
              this.deleteButtonFlag = true;
              this.selects.length=0;
              console.log('success')
            })
            .catch((b) => {
              console.log(b)
            })
          },
          deletetip(){
            if(this.selects.length<1){
              this.$Message.info('请选择要删除的数据！');
            }else{
              this.modal4 = true
            }
          },
          cancel () {
              this.$Message.info('已取消');
          },
          selecting(selection){
            if(selection.length>0){
              this.deleteButtonFlag = false
            }else{
              this.deleteButtonFlag = true
            }
            this.selects=selection
          },
          addbutton(){
            this.form1 = {}
            var myDate = new Date();
            this.form1.createdate=myDate.toLocaleString();
            this.modal1 = true;
          },
          exporttray(){
            let trayid = []
            this.selects.forEach(v => {
              trayid.push(v.trayid)
            })
            // console.log(trayid.join(','))
            let param = `${sessionStorage.loginStatus},`+trayid.join(',')
            window.open(sessionStorage.http+`/exporttray?`+param)
            setTimeout(()=>{
              this.searchtray()
            },500)
          },
          newtray(){
            console.log(this.form1)
            if(!this.clickSt){
              return
            }
            if(this.form1.trayid==""||this.form1.status==""||this.form1.warehouseId==""||
          this.form1.trayid==undefined||this.form1.status==undefined||this.form1.warehouseId==undefined){
              this.$Message.error('带*不可为空');
              this.clickSt = false
              setTimeout(() => {
                this.clickSt = true
              },2000)
              return;
            }
            var myDate = new Date();
            this.form1.createdate = myDate.getTime();
            axios.post(sessionStorage.http+`/trayTest?trayid=${this.trayid}&pagenumber=${this.pagenumber}
              &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`,this.form1)
            .then((a) => {
              if(a.data){
                axios.post(sessionStorage.http+`/newtray?trayid=${this.trayid}&ware=${this.ware}&pagenumber=${this.pagenumber}
                  &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`,this.form1)
                .then((a) => {
                  this.data1=a.data.data
                  this.total = a.data.length
                  this.modal1 = false
                  console.log('success')
                })
                .catch((b) => {
                })
              }else{
                this.form1.trayid="";
                this.modal1 = true
                this.$Message.error('此托盘号已存在！');
              }
            })
            .catch((b) => {
            })
          },
            changepage (pagenumber) {
              this.pagenumber = pagenumber
              axios.get(sessionStorage.http+`/changetrayinfopage?trayid=${this.trayid}&ware=${this.ware}&pagenumber=${pagenumber}
                &pagesize=${this.pagesize}&loginStatus=${sessionStorage.loginStatus}`)
              .then((a) => {
                this.data1=a.data.data
                this.total = a.data.length
                console.log('success')
              })
              .catch((b) => {
                console.log(b)
              })
            },
            changesize (pagesize) {
              this.pagesize = pagesize
              axios.get(sessionStorage.http+`/changetrayinfopage?trayid=${this.trayid}&ware=${this.ware}
                &pagenumber=${this.pagenumber}&pagesize=${pagesize}&loginStatus=${sessionStorage.loginStatus}`)
              .then((a) => {
                this.data1=a.data.data
                this.total = a.data.length
                console.log('success')
              })
              .catch((b) => {
                console.log(b)
              })
            },
        }
    }
</script>
<style lang="less">
.trayinfomodalstyle{
  color:#5aa5ff !important;
  font-size: 12px !important;
  font-family:"Microsoft YaHei";
  line-height: 20px !important;
  .ivu-select{
    width: 160px !important;
    height: 20px !important;
    vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
  }
  .ivu-modal-header{
    text-align: center;
  }
  .ivu-input-wrapper{
    width: 160px;
    height: 20px;
    line-height: 30px;
    vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
  }
  .ivu-input{
    border:1px solid #888888;
    width: 160px !important;
    height: 30px !important;
    line-height: 30px;
  }
  .ivu-select-selection{
    border:1px solid #888888;
    width: 160px !important;
    height: 30px !important;
  }
}
.trayinfomation{
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
   vertical-align: middle;
   line-height: 39px;
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
       bottom: 6px;
     }
   }
   .trayinfomanagetable{
     .ivu-table td{
     background-color:#fff;
     height: 40px;
     }
     .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
     height: 40px;
     }
   }
}
</style>
