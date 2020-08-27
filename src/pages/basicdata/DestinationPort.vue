<template>
    <div class="destinationport">
      <Form :label-width="85" inline style="text-align:left;" id="formFilter">
      <div class="" style="display:flex;justify-content:space-between;">
        <div class="d1">
          <Form-item label="三字代码">
            <Input v-model="code" placeholder="请输入" style="width:160px; margin-right:50px" />
          </Form-item>
          <Form-item label="中文名称">
            <Input v-model="chinesename" placeholder="请输入" style="width:160px; margin-right:50px" />
          </Form-item>
          <Form-item label="英文名称">
            <Input v-model="englishname" placeholder="请输入" style="width:160px; margin-right:50px" />
          </Form-item>
          <Form-item label="国家">
            <Input v-model="country" placeholder="请输入" style="width:160px; margin-right:50px" />
          </Form-item>
          <Form-item label="区域">
            <Input v-model="area" placeholder="请输入" style="width:160px; margin-right:50px" />
          </Form-item>
        </div>

      </div>
        <div id="" style="display:flex;justify-content:space-between;">
              <div class="">
                <Button type="primary" shape="circle" v-if="deleteButtonFlag==false" @click=""
                style="width:120px;height:28px;border-radius:14px;background-color:#fe3838;border:0 none;" icon="md-trash">删除选中项</Button>
                <Button type="primary" shape="circle" disabled v-if="deleteButtonFlag==true"
                style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" icon="md-trash">删除选中项</Button>
              </div>
              <div class="">
                <Button style="width:100px;height:28px;">+ 选择Excel</Button>
                <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;"
                 @click='modal1=true'>新增</Button>
              </div>
        </div>
        <br>
          <Modal class="destinationportmodal" v-model="modal1" :footer-hide="true" draggable scrollable width=700>
            <p slot="header" style="text-align:center">
              <span>目的港信息新增</span>
            </p>
            <span style="margin-right:36px"></span><span style="color:red">*</span>三字代码 <Input   v-model="form1.code" placeholder="请输入" style="width: 160px; margin-right:50px"></Input>
            <span style="color:red">*</span>目的港中文名称 <Input   v-model="form1.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="color:red">*</span>目的港英文名称 <Input   v-model="form1.englishname" placeholder="请输入" style="width: 160px; margin-right:50px"></Input>
            <span style="margin-right:60px"></span><span style="color:red">*</span>国家 <Input   v-model="form1.country" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="margin-right:60px"></span><span style="color:red">*</span>区域 <Input   v-model="form1.area" placeholder="请输入" style="width: 160px"></Input>
            <br><br>
            <footer style="display:flex;justify-content:flex-end;">
              <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;"
               @click='modal1 = false'>提交</Button>
            </footer>
          </Modal>
          <Modal class="destinationportmodal" v-model="modal2" :footer-hide="true" draggable scrollable title="目的港信息编辑" width=700>
            <p slot="header" style="text-align:center">
              <span>目的港信息编辑</span>
            </p>
            <span style="margin-right:36px"></span><span style="color:red">*</span>三字代码 <Input   v-model="form2.code" placeholder="请输入" style="width: 160px; margin-right:50px"></Input>
            <span style="color:red">*</span>目的港中文名称 <Input   v-model="form2.chinesename" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="color:red">*</span>目的港英文名称 <Input   v-model="form2.englishname" placeholder="请输入" style="width: 160px; margin-right:50px"></Input>
            <span style="margin-right:60px"></span><span style="color:red">*</span>国家 <Input   v-model="form2.country" placeholder="请输入" style="width: 160px"></Input><br><br>
            <span style="margin-right:60px"></span><span style="color:red">*</span>区域 <Input   v-model="form2.area" placeholder="请输入" style="width: 160px"></Input>

            <br><br>
            <footer style="display:flex;justify-content:flex-end;">
              <Button type="primary" shape="circle" style="width:100px;height:28px;border-radius:14px;background-color:#5aa5ff;line-height:10px;"
               @click='modal2 = false'>提交</Button>
            </footer>
          </Modal>
        <Modal
            v-model="modal4"
            title="提示"
            @on-ok=""
            @on-cancel="">
            <h2>确认删除？</h2>
        </Modal>
        </Form>
      <div class="d2" >
        <Table height=520 border ref="selection" @on-row-dblclick="updateselect" :columns="columns4" :data="data1" @on-selection-change="selecting"></Table>
        <Page :total="total" show-total @on-change="" @on-page-size-change="" show-elevator show-sizer />
      </div>
    </div>
</template>
<script>
import axios from 'axios'
    export default {
      created(){
      },
        data () {
            return {
              code:'',
              chinesename:'',
              englishname:'',
              country:'',
              area:'',
              deleteButtonFlag:true,
              modal1:false,
              modal2:false,
              modal4:false,
              pagenumber:1,
              pagesize:10,
              total:0,
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                      title: '序号',
                      key: 'linenum',
                      align: 'center',
                      width: 75,
                      render:(h,params)=>{
                        return h("div",+params.row._index + 1+((this.pagenumber-1)*this.pagesize))
                      }
                    },
                    {
                        title: '三字代码',
                        key: 'code'
                    },
                    {
                        title: '目的港中文名称',
                        key: 'chinesename'
                    },
                    {
                        title: '目的港英文名称',
                        key: 'englishname'
                    },
                    {
                        title: '国家',
                        key: 'country'
                    },
                    {
                        title: '区域',
                        key: 'area'
                    },

                ],
                data1: [
                  {
                    code:'AAA',
                    chinesename:'上海',
                    englishname:'Shanghai',
                    country:'中国',
                    area:'亚洲',
                  }
                ],
                data2: [],
                data3: [],
                data4: [],
                form1:{},
                form2:{},
                selects:[],

            }
        },
        methods: {
          selecting(selection){
            if(selection.length>0){
              this.deleteButtonFlag = false
            }else{
              this.deleteButtonFlag = true
            }
            this.selects=selection
          },
          updateselect(res){
              this.form2.code=res.code
              this.form2.chinesename=res.chinesename
              this.form2.englishname=res.englishname
              this.form2.country=res.country
              this.form2.area=res.area
              this.modal2 = true
          },
        }
    }
</script>
<style lang="less">
.destinationportmodal{
      color:#5aa5ff !important;
      font-size: 12px !important;
      font-family:"Microsoft YaHei";
      line-height: 20px;

    .ivu-input{
      border:1px solid #888888;
        vertical-align:text-bottom; margin-bottom:2px; margin-bottom:-2px\9;
    }
}
.destinationport{
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
