<template lang="html">
  <div class="StorageImg">
    <div class="" style="display:flex;justify-content:space-between">
      <div class="">

        <Form ref=""  :label-width="85" inline style="text-align:left;">

            <Form-item label="仓库/库区"  >
              <Cascader :data="warehouseAndDisList" style="margin-top:8px;" @on-change="handleChange" change-on-select></Cascader>
            </Form-item>

            <Form-item label="层数" >
              <Select v-model="current.layer" placeholder="请选择" style="width:60px" @on-change="changeLayer">
                <Option v-for="item in layerList"  :key="item" :value="item">{{item}}</Option>
              </Select>
            </Form-item>
        </Form>
      </div>

      <div class="">

        <!-- 货位类型：0-货位；1-坡道；2-入库口；3-出库口；4-提升机；5-空白；6-充电桩 ；7-输送线； 8-墙 -->
        <!-- 状态：0-禁用；1-无货；2-有货；3-标记入库；4-标记出库；5-入库中；6-出库中；7-移库中；8-标记盘库; 9-锁定 -->

        <table border="value">
          <tr >
            <!-- <td class="wallImg" width='80px' height='40px'>
              禁止
            </td> -->
            <td class="stoImg" width='80px' height='40px'>
              货位
            </td>
            <td class="roadImg" width='80px' height='40px'>
              通道
            </td>
            <td class="entryImg" width='80px' height='40px'>
              入库口
            </td>
            <td class="exitImg" width='80px' height='40px'>
              出库口
            </td>
            <td class="liftImg" width='80px' height='40px'>
              提升机
            </td>
            <td class="chargeImg" width='80px' height='40px'>
              充电桩
            </td>

            <!-- <td class="fullImg" width='80px' height='40px'>
              有货
            </td> -->
            <td class="conveyorImg" width='80px' height='40px'>
              输送线
            </td>
            <td class="wallImg" width='80px' height='40px'>
              墙
            </td>

            <!-- <td class="disabledImg" width='80px' height='40px'>
              禁用
            </td> -->
          </tr>
        </table>
      </div>



      <!-- <div class="">
        <Upload :action="uploadurl" :format="['xlsx','xls']" :max-size="2048" style="display: inline" :data="uploadDate" name="uploadFile" :on-format-error="handleformaterror" :on-success="handleSuccess" :show-upload-list="false" :on-exceeded-size="hansleFilesize" >
          <Button icon="ios-cloud-upload-outline">上传Excel货位图</Button>
        </Upload>
      </div> -->
  </div>

    <!-- <Tabs type="card"  class="font18"  @on-click='tabClick'>
        <TabPane :label="`第${item+1}层`" v-for='(item,index) in layerDate' :name="`${item}`" :key='item'>


        </TabPane>
    </Tabs> -->
    <div class="tableWrap" :style='`width:${wrapWidth()}`'>
      <table border="value">
        <tr v-for='(item, index) in storageDate'>
          <td v-for='(it,idx) in item' :title=stoDetail :class="gettableTd(it)" width='100px' height='50px' @mouseover='tableClick(it)' :key='idx' style="font-weight:bold">
            {{it.storageId}}
            <!-- <br/> -->
            <!-- {{it.remark}} -->
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
// import JoinOrderRule from '@/pages/configmanage/JoinOrderRule'
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'

// import Http from './Http.vue'
export default {
  components: {
    // JoinOrderRule,

   },
  data () {
    return {
      warehouseAndDisList:[{
        value:'rbh',label:'rbj'
      }],
      value1:[],
        uploadurl:sessionStorage.http+`/uploadStorageImg?loginStatus=${sessionStorage.loginStatus}`,
        uploadDate:{},
      testdata:[
        [
          {name:'sdf'},
          {name:'etg'},
          {name:'et'}
        ],
        [{name:'sdf'},
          {name:'etg'},
          {name:'et'}
        ],
        [{name:'sdf'},
          {name:'etg'},
          {name:'et'}
        ]
      ],
      layerDate:[],
      storageDate:[[]], //数据

      wareHouseIdList:[], //所有的仓库
      districtIdList:[], //所有的库区
      layerList:[1,2,3,4], //所有的层数

      current:{
        wareHouseId:'', //当前仓库id
        districtId:'', //当前库区
        layer:1, //当前层数
      },

      texttext:'',

      stoDetail:'',

      testtest:true,
      chooseRuleList:[],
      generateRuleList:[],
      dateRange:[],
      lastDate:'',
      formFilter: { //配合库存管理，其实只有货位号
        storageId:''
      },

    }
  },



  async created(){
    //获取所有的仓库和库区信息
    await this.getAllWarehouseInfo();





    //this.getStorageLayers()
    //this.getStorageImg()
    // sessionStorage.a = 'a'
    //this.$router.history.current.path为当前网页的路径
    //设置默认值
    this.current.wareHouseId = 't1';
    this.current.layer = 1;
    this.getStorageInfoList(this.current.wareHouseId,this.current.districtId,this.current.layer)
  },

  methods:{
    //鼠标点击事件 显示对应的货位和库存信息
    tableClick(a){

      this.stoDetail = '';
      //如果类型是货位，去查询相关的库存
      if(a.type == '0'){
        this.formFilter.storageId = a.storageId;
        this.stoDetail+= '货位状态:' + a.status  + '\n'
        this.queryData(); //查询货位相关的库存数据
      }else{
        this.stoDetail+= '货位类型:' + a.remark1  + '\n'
      }
    },

    queryData(){//查询数据 无库存信息
      axios.post(sessionStorage.http+'/getStockStorage?loginStatus='+`${sessionStorage.loginStatus}`,this.formFilter)
      .then((res) =>{



        if(res.data.data.length > 0){
          res.data.data.forEach((i,index) => {

            this.stoDetail+=
            (index+1 + '.物料号:'  + i.materielId  + '\n'
            + '  物料名称:' + i.materielName + '\n'
            + '  件数:' + i.num + '\n'
            + '  托盘号:' + i.palletCode + '\n'
            + '  库存批号:' + i.stockBatch + '\n' )
          });
        }else{
          this.stoDetail+= '无库存';
        }

      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    //显示所有的仓库和库区信息
    async getAllWarehouseInfo(){
      await axios.get(sessionStorage.http+`/getWareHouseAndDisInfo?loginStatus=${sessionStorage.loginStatus}`)
      .then((res)=>{
        var json = res.data;

        //请求到的数据
        let list = [];
        for (var i = 0; i < json.length; i++) {
          var children = [];
          for (var j = 0; j < json[i].districtInfoList.length; j++) {
            var child = json[i].districtInfoList[j]; //子级集合
            children.push({
              value: child.districtId, //这里是你的树的子级id
              label: child.districtName //这里是你的树的子级name
            });
          }
          list.push({
            value: json[i].warehouseId, //这里是你的树的第一层的id
            label: json[i].wareHouseName, //这里是你的树的第一层的name
            children: children
          });
        }
        this.warehouseAndDisList = list; //这里获取到我们遍历的树形结构

      })
    },


    //处理次级联动的数据
    handleChange (value, selectedData) {

        if(selectedData.length == 1){
          this.current.wareHouseId = selectedData[0].value;
          this.current.districtId = '';
        }else if(selectedData.length == 2){
          this.current.wareHouseId = selectedData[0].value;
          this.current.districtId = selectedData[1].value;
        }else{
          this.current.wareHouseId = 't1'
          this.current.districtId = '';
        }
        this.getStorageInfoList(this.current.wareHouseId,this.current.districtId,this.current.layer);
    },

    //换层
    changeLayer(){
      console.log("sssss")
      console.log(this.current.layer)
      this.getStorageInfoList(this.current.wareHouseId,this.current.districtId,this.current.layer);
    },


    handleformaterror(res, file){
      this.$Message.error('文件格式错误，只能选取excel文件');
    },
    hansleFilesize(res, file){
      this.$Message.error('文件过大，不要超过2048kb');
    },
    handleSuccess(res, file, files){
      console.log(res)
      if(res.data == true){
        this.$Message.success(res.message);
        if(files.length > 1){
          files.splice(0,files.length-1)
        }
      }else if(res.data == false){
        this.$Message.error(res.message);
        files.splice(files.length-1,1)
      }
    },


    // 货位类型：0-货位；1-坡道；2-入库口；3-出库口；4-提升机；5-空白；6-充电桩 ；7-输送线； 8-墙
    // 状态：0-禁用；1-无货；2-有货；3-标记入库；4-标记出库；5-入库中；6-出库中；7-移库中；8-标记盘库; 9-锁定
    gettableTd(storage){
      if(storage.type.indexOf('0') > -1 ){
        return 'stoImg'
      }else if(storage.type.indexOf('1') > -1 ){
        return 'roadImg'
      }else if(storage.type.indexOf('2') > -1 ){
        return 'entryImg'
      }else if(storage.type.indexOf('3') > -1 ){
        return 'exitImg'
      }else if(storage.type.indexOf('4') > -1 ){
        return 'liftImg'
      }else if(storage.type.indexOf('6') > -1 ){
        return 'chargeImg'
      }else if(storage.type.indexOf('7') > -1 ){
        return 'conveyorImg'
      }else if(storage.type.indexOf('8') > -1 ){
        return 'wallImg'
      }


      return 'tableTd'
      // console.log(storage)
      // return 'tableTd'
    },
    wrapWidth(){
      // console.log(`${this.storageDate[0].length*80}px`)
      return `${this.storageDate[0].length*80}px`
    },
    tabClick(layer){
      //this.getStorageInfoList(layer)
    },

    getStorageLayers(){
      axios.post(sessionStorage.http+`/getStorageLayers?loginStatus=${sessionStorage.loginStatus}`,"")
       .then((res)=>{
         console.log(res.data)
         this.layerDate = res.data
         let layer = res.data[0]
         this.getStorageInfoList(layer)
       })
       .catch((err)=>{
         iview.Message.error({
           content:err.message,
           duration:5
         });
       })
    },

    getStorageInfoList(wareHouseId,districtId,layer){
      axios.get(sessionStorage.http+`/storageInfo/getStorageInfoList?loginStatus=${sessionStorage.loginStatus}&wareHouseId=`+ wareHouseId + `&districtId=` + districtId + `&layer=`+layer)
       .then((res)=>{

         this.storageDate = res.data
       })
       .catch((err)=>{
         iview.Message.error({
           content:err.message,
           duration:5
         });
       })
    },

    getStorageImg(){
      axios.post(sessionStorage.http+`/createStorageImg?loginStatus=${sessionStorage.loginStatus}`,"")
       .then((res)=>{
         // console.log(res)
//
         // console.log(res.data)
         // this.layerDate = res.data
         // console.log(Object.keys(res.data).length)
         // console.log(res.data[0])
         // console.log(Object.keys(res.data[0]).length)
          // console.log(res.data[0][0])
       })
       .catch((err)=>{
         iview.Message.error({
           content:err.message,
           duration:5
         });
       })
    },

    Onselect(name){

      this.$router.push(name)
    },
    loginOut(){
      this.$router.push('/login')
    }
  },
  // watch: {
  //   current: {
  //     deep: true,
  //     handler() {
  //       console.log(this.texttext)
  //       this.getStorageInfoList(this.current.wareHouseId,this.current.districtId,this.current.layer);
  //     }
  //   }
  // }
}
</script>

<style lang="less">
table{
  td{
    cursor: pointer;
  }
}
.StorageImg{

  .ivu-cascader-arrow {
      position: absolute;
      top: 50%;
      right: 8px;
      line-height: 1;
      transform: translateY(-50%);
      font-size: 14px;
      color: #808695;
      transition: all .2s ease-in-out;
      margin-top: 6px;
      margin-right: -20px
  }
  .ivu-cascader .ivu-input {
    padding-right: 24px;
    display: block;
    cursor: pointer;
    width: 180px;
}


  // .ivu-tabs{
  //   overflow: inherit;
  // }
  //   .ivu-tabs .ivu-tabs-tabpane{
  //     width: auto;
  //   }
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
    .ivu-input-number-input{
      border:1px solid #888888;
      outline: 0 none !important;
    }
    .ivu-input-number{
      border:0 none;
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
   .storageInfotable{
   .ivu-table td{
     background-color:#fff;
     height: 40px;
   }
   .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
     background-color: #f9f9f9;
     height: 40px;
   }
 }
   .ivu-input-icon{
        position: absolute;
        right:45px;
    }
   .ivu-input-icon-normal+.ivu-input{
     width: 120px;
   }
   .storagePage{
     .ivu-select-selection{
       bottom: 6px;
     }
   }
    .tableWrap{
      overflow: auto !important;
      // width:2000px;
    }
    .tableTd{
       background:url('../../assets/img/user.png') center center;
       color:black;
       background-size: 100%;
    }
    .stoImg{
       background:url('../../assets/img/empty.png') center center;
       color:black;
       background-size: 100%;
    }
    .fullImg{
       background:url('../../assets/img/full.png') center center;
       color:black;
       background-size: 100%;
    }
    .conveyorImg{
       background:url('../../assets/img/lock.png') center center;
       color:black;
       background-size: 100%;
    }
    .roadImg{
       background:url('../../assets/img/road.png') center center;
       color:black;
       background-size: 100%;
    }
    .disabledImg{
       background:url('../../assets/img/disabled.png') center center;
       color:black;
       background-size: 100%;
       -moz-background-size:100% 100%;
    }
    .liftImg{
       background:url('../../assets/img/lift.png') center center;
       color:black;
       background-size: 100%;
    }
    .exitImg{
       background:url('../../assets/img/exit.png') center center;
       color:black;
       background-size: 100%;
    }
    .entryImg{
       background:url('../../assets/img/entry.png') center center;
       color:black;
       background-size: 100%;
    }
    .chargeImg{
       background:url('../../assets/img/charge.png') center center;
       color:black;
       background-size: 100%;
    }
    .font15{
      font-size: 15px;
    }
    .yaHei18{
        font-size: 18px;
      }
    .font20{
        font-size: 20px;
      }
    .backBlue{
      background-color: #5aa5ff;
    }
    .yaHeiStrong18{
      font-family: Microsoft YaHei;
      font-size: 18px;
      font-weight: bold;
    }
    .yaHei18{
      font-family: Microsoft YaHei;
      font-size: 18px;
    }
    .blueYaHei18{
      color: #5aa5ff;
      font-family: Microsoft YaHei;
      font-size: 18px;
    }
    .blueYaHei20{
      color: #5aa5ff;
      font-family: Microsoft YaHei;
      font-size: 20px;
    }
    .redYaHei18{
      color: #fe3838;
      font-family: Microsoft YaHei;
      font-size: 18px;
    }
    .ButtonBlue{
      background-color: #5aa5ff;
      height: 28px;
      font-size: 16px;
      color: #ffffff;
      width: 120px;
      line-height: 12px;
    }
    .chooseRule{
      overflow-y:scroll;
      float: left;
      width: 70%;
      height: 500px;
    }
    .ruleList{
      float: left;
      width: 30%;
      height: 500px;
    }
    .ruletitle{
      /* overflow: hidden; */
      border: 1px solid red;
    }
    .clear{clear:both;}

    .title{
      /* border: 1px solid red; */
      /* float: left; */
      /* font-size: 15px; */
      color: blue;
      text-align: left;
      width: 30%;
    }

    .autoOrHand{
      /* float: left; */
      width: 40%;
    }

    .fontRed{
      color: red;
    }
    .fontBlue{
      color: #5aa5ff;
      /* color: blue; */
    }
    .fontWhite{
      color: #ffffff;
      /* color: blue; */
    }

    .hint{
      text-align: center;

    }
}

</style>
