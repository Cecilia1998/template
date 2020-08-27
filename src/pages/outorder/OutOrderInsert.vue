<template>
  <div class="outOrderInsert">
    <div class="orderHeader">
      <Form class="formValidate" :model="model" ref="model" :label-width="70" :rules="modelValidate">
        <Row>
          <Col span="6">
            <FormItem :label="$t('common.outDate')" prop="outdate">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" v-model="model.outdate"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.priority')" prop="priority">
              <Input v-model="model.priority"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.note')" prop="remark">
              <Input v-model="model.remark"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.depart')">
              <Select v-model="depart" @on-change="getWorkers">
                <Option v-for="item in departs" :key="item.value" :value="item.value?item.value:-1">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem :label="$t('common.worker')" prop="workshop">
              <Select v-model="model.workshop">
                <Option v-for="item in workers" :key="item.value" :value="item.value?item.value:-1">{{item.label}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6" push="12">
            <Button type="primary" shape="circle" class="btnForm" @click="insert">{{$t('actions.submit')}}</Button>
          </Col>
        </Row>

      </Form>
    </div>
    <div class="filter">
      <div class="spaceBetween">
        <div class="form-item flex">
          <div class="form-item-label">{{$t('common.materialId')}}</div>
          <div><Input search v-model="materielid" @on-search="getStocks"></Input></div>
        </div>
        <div>
          <Button type="primary" shape="circle" class="btnForm" @click="addStocks">{{$t('actions.insert')}}</Button>
          <div class="toggle" @click="isShow=!isShow">
            <Icon :type="isShow?'ios-arrow-up':'ios-arrow-down'"></Icon>{{isShow?this.$t('actions.fold'):this.$t('actions.unfold')}}
          </div>
        </div>

      </div>
      <Table ref="stockTable" :max-height="400" v-show="isShow" :columns="stockColumns" :data="stocks" border stripe @on-row-dblclick="addStocks"></Table>
    </div>
    <div class="main">
      <Table border stripe :columns="orderColumns" :data="model.children" >

      </Table>
    </div>
  </div>
</template>

<script>
  export default{
    name:"outOrderInsert",
    components:{

    },
    data(){
      return{
        //系统参数
        departs:[],
        workers:[],

        //表单信息
        model:{
          priority:0,
          workshop:'',
          children:[]
        },
        modelValidate:{
          workshop:[{required:true,message:this.$t('message.emptyStorageStaff'),trigger:"change"}]
        },
        depart:null,

        //筛选信息
        materielid:null,
        // materielid:"22293227679744",
        isShow:true,
        stockColumns:[
          {
            type:"selection",
            align:"center",
            width:"65"
          },
          {
            title:this.$t('common.index'),
            type:"index",
            key:"index",
            align:"center",
            width:"100"
          },
          {
            title:this.$t('common.materialName'),
            key:"materielname",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.unit'),
            key:"unit",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.package'),
            key:"specqty",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.batch'),
            key:"batchno",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.num'),
            key:"qty",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.warehouse'),
            key:"warehousename",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.district'),
            key:"districtname",
            align:"center",
            tooltip:true
          },
        ],
        stocks:[],

        //添加的库存的信息
        orderColumns:[
          {
            title:this.$t('common.index'),
            type:"index",
            align:"center",
            width:100,
          },
          {
            title:this.$t('common.materialId'),
            key:"materielid",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.materialName'),
            key:"materielname",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.unit'),
            key:"unit",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.package'),
            key:"specqty",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.batch'),
            key:"batchno",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.num'),
            key:"qty",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.warehouse'),
            key:"warehousename",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.district'),
            key:"districtname",
            align:"center",
            tooltip:true
          },
          {
            title:this.$t('common.outNum'),
            key:"num",
            align:"center",
            tooltip:true,
            render:(h,params)=>{
              return h('InputNumber',{
                props:{
                  min:0,
                  value:this.model.children[params.index].num?this.model.children[params.index].num:0
                },
                on:{
                  "on-change":(e)=>{
                    this.$set(this.model.children[params.index],"num",e)
                  }
                }
              })
            }
          },
          {
            title:this.$t('actions.delete'),
            align:"center",
            render:(h,params)=>{
              return h('Button',{
                props:{
                  type:"error",
                },
                on:{
                  "click":(e)=>{
                    this.model.children.splice(params.index,1)
                  }
                }
              },this.$t('actions.delete'))
            }
          }
        ]
      }
    },
    mounted() {
      this.getTypes()
    },
    methods:{
      //获取下拉选项信息
      async getTypes(){
        await this._axios("get","dept/deptenum",(data)=>{
          // console.log(data)
          this.departs = this.arrConvert(data)
        })
      },
      //重置/初始化页面数据
      initData(){
        this.model={workshop:null,priority:0,children:[]}
        this.materielid = ''
        this.depart=""
        this.departs = []
        this.workers=[]
      },
      //根据部门id获取人员
      getWorkers(){
        this.model.workshop = undefined;
        this._axios("get","user/usersbydept",{sectorid:this.depart},(data)=>{
          data.forEach(item=>{
            this.workers.push({label:item.name,value:item.operatorid})
            // console.log(this.workers)
          })
        })
      },

      //根据物料id查看库存信息
      getStocks(){
        // console.log(this.materielid)
        this.isShow = true;
        this._axios("get","stock/stockbyitem",{materielid:this.materielid,pageSize:0,pageNum:0},(data)=>{
          this.stocks = data.list;
          for(let s of this.stocks){
            s.num = 0;
          }
        })
      },
      //添加库存到提交的数据中
      addStocks(e){
        if(e&&e.key){
          if(this.model.children.some(item=>{return item.key == e.key})){
            this.$root.mes("error","w-20200612145537")
          }else{
            e.num = 0;
            this.model.children.push(e)
          }
        }else{
          var list = this.$refs.stockTable.getSelection();
          if(list.length>0){
            list.forEach(l=>{
              if(this.model.children.some(item=>{
                return item.key == l.key
              })){
                this.$root.mes("error","w-20200612145537")
              }else{
                l.num = 0;
                this.model.children.push(l)
              }
            })
          }

        }

      },
      insert(){
        this.model.ordertype=7;
        this.checkValidate("model").then(res=>{
          if(res){
            if(this.model.children.length == 0){
              this.$root.mes("error","w-20200706173424") //提示 每个出库单必须有至少一条库存
            }else if(this.model.children.some(item=>{return item.num < 0})){
              this.$root.mes("error","w-20200706172835") //提示 库存数量必须大于0
            }else if(this.model.children.some(item=>{return item.num > item.qty})){
              this.$root.mes("error","w-20200706173131") //提示 出库数量不可大于库存数量
            }else{
              this._axios("post","outorder/outorder",this.model,(data)=>{
                // console.log(data)
                this.initData();
              })
            }
          }
        })

      }

    }
  }
</script>

<style lang="less">
  @import '../../assets/styles/common';
  .ivu-date-picker{
    width: 100%;
  }

  .outOrderInsert{
    .filter{
      margin: 10px 0;
      padding: 10px;
      box-shadow: 0 0 5px lightgray;
      border-radius: 4px;
      .btnForm{
        margin-right: 20px;
      }
    }
    .toggle{
      display: inline-block;
    }
  }
</style>
