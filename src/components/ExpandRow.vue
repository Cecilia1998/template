<template>
  <div class="expandRow">
    <Table :columns="columns" :data="row.children" @on-row-dblclick="showUpdate"></Table>

    <Modal v-model="modal" width="800px" :mask-closable="false" scrollable title="编辑规格信息" ok-text="提交" @on-cancel="modal=false" @on-ok="update">
      <Form ref="specForm" :model="updateModel" :label-width="100" class="formValidate" :rules="updateValidate" >
        <Row>
          <Col :span="8">
            <FormItem label="规格编号" prop="mitemspecid">
              <Input disabled v-model.sync="updateModel.mitemspecid"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="规格名称" prop="specname">
              <Input clearable v-model.sync="updateModel.specname"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="包装类型" prop="packagetype">
              <Select clearable v-model.sync="updateModel.packagetype">
                <Option v-for="item in packageTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="检验类型" prop="checktype">
              <Select clearable type="number" v-model.sync="updateModel.checktype">
                <Option v-for="item in checkTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="管制类型" prop="pipetype">
              <Select clearable v-model.sync="updateModel.pipetype">
                <Option v-for="item in pipeTypes" :key="item.value" :value="item.value">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单价" prop="price">
              <Input clearable v-model.sync="updateModel.price"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="供应商编号" prop="supplierid">
              <Input clearable v-model.sync="updateModel.supplierid"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单包净重" prop="netweight">
              <Input clearable v-model.sync="updateModel.netweight"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单包毛重" prop="grossweight">
              <Input clearable v-model.sync="updateModel.grossweight"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="单包体积" prop="packagevolume">
              <Input clearable v-model.sync="updateModel.packagevolume"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="体积单位" prop="unitvolume">
              <Input clearable v-model.sync="updateModel.unitvolume"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="码垛件数" prop="palletvolume">
              <Input clearable v-model.sync="updateModel.palletvolume"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="每层件数" prop="palletLayervolume">
              <Input clearable v-model.sync="updateModel.palletLayervolume"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="收货上限" prop="reciveMax">
              <Input clearable v-model.sync="updateModel.unitvolume"></Input>
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="收货下限" prop="reciveMin">
              <Input clearable v-model.sync="updateModel.unitvolume"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "expendRow",
    props: {
      row: Object,
      suppliers:Array,
      packageTypes:Array,
      checkTypes:Array,
      pipeTypes:Array,
    },
    data() {
      return {
        columns: [
          {title: '序号',align:"center",width:70,render:(h,params)=>{
            return h('div',params.index+1)
          }},
          {
            title: "规格编号",
            key: "mitemspecid",
            width:85,
            align:"center"
          },
          {
            title: "规格名称",
            key: "specname",
            align:"center"
          },
          {
            title: "包装类型",
            key: "packagetype",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getType(params.row.packagetype,this.packageTypes))
            }
          },
          {
            title: "检验类型",
            key: "checktype",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getType(params.row.checktype,this.checkTypes))
            }
          },
          {
            title:"管制类型",
            key:"pipetype",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getType(params.row.pipetype,this.pipeTypes))
            }
          },
          {
            title: "单价",
            key: "price",
            align:"center"
          },{
            title:"供应商名称",
            key:"suppliername",
            align:"center",
            render:(h,params)=>{
              return h("div",this.getLabel(this.suppliers,params.row.supplierid))
            }
          },{
            title:"单包净重",
            key:"NetWeight",
            align:"center"
          },{
            title:"单包毛重",
            key:"GrossWeight",
            align:"center"
          },{
            title:"单包体积",
            key:"PackageVolume",
            align:"center"
          },{
            title:"体积单位",
            key:"UnitVolume",
            align:"center"
          },
          {
            title:"操作",
            align:"center",
            render:(h,params)=>{
              return h('Button',{
                props:{
                  type:"error",
                  size:"small"
                },
                on:{
                  click:()=>{
                    console.log(params.row)
                    this.$axios.delete(`/mitem/mitemspec`,{data:params.row}).then(res=>{
                      console.log(res)
                      if(res.data){
                        this.$root.mes("info","w-20200430131813"); //提示删除成功
                        this.$emit("update")
                      }
                    }).catch(err=>{
                      console.log(err)
                    })
                  }
                }
              },"删除")
            }
          }



        ],
        modal:false,
        updateModel:{},
        updateValidate:{
          specname:[
            {required:true,message:"规格名称不可为空",trigger:'change'}
          ],
          checktype:[
            {required:true,type:"number",message:"检验类型不可为空",trigger:"change"}
          ],
          packagetype:[
            {required:true,type:"number",message:"检验类型不可为空",trigger:"change"}
          ],
          price:[
            { pattern: /^[0-9]*(.[0-9]{1,2})?$/, message: '货币格式错误', trigger: 'change' }
          ],
          netweight:[
            {pattern:/^\d+(\.\d+)?$/,message:"此项只可为正数",trigger:'change'}
          ],
          grossweight:[
            {pattern:/^\d+(\.\d+)?$/,message:"此项只可为正数",trigger:'change'}
          ],
          packagevolume:[
            {pattern:/^\d+(\.\d+)?$/,message:"此项只可为正数",trigger:'change'}
          ],
          palletlayervolume:[
            { pattern: /^[0-9]*$/, message:"此项只可为正整数", trigger:"change"}
          ],
          palletvolume:[
            { pattern: /^[0-9]*$/, message:"此项只可为正整数", trigger:"change"}
          ]
        }
      }
    },
    methods:{
      getType(id,data){
        if(id==undefined){
          return "暂无";
        }
        for(let d of data){
          if(d.value == id){
            return d.label
          }
        }
      },
      showUpdate(v){
        console.log(v)
        this.modal = true;
        this.updateModel = v;
      },
      update(){
        // console.log(this.updateModel)
        this.checkValidate("specForm").then(result=>{
          if(result){
            this.$axios.put('/mitem/mitemspec',this.updateModel).then(res=>{
              console.log(res)
            
              if(res.data){
                this.$root.mes("info","w-20200430131709")
                this.$emit("update")
              }
            }).catch(err=>{
              console.log(err)
            })
          }else{
            this.$root.mes("error","w-20200605135011")
          }
        })
        
      }
    }
  }
</script>

<style>
</style>
