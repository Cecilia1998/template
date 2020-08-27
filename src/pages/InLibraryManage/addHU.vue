<template lang="html">
  <Modal class="addhuid"
      v-model="add"
      :mask-closable='false'
      :loading='loading'
      footer-hide
      width='45%'
      ok-text=''
      cancel-text=''>

      <p slot="header" style="text-align:center;font-size:18px">
            <span>新增HU数据</span>
      </p>


    <br>

    <div class="" style="display:flex;justify-content:space-between">
          <div class="">
            <Button shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:white;color:#b4b4b4" :disabled='deDis' @click="delConfirmOrder" id='delOrderInAdd' icon="md-trash">删除选中项</Button>
            <!-- <Button   type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='exportExcel'>导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</Button>
            &nbsp;
            <Upload :action="uploadurl" :format="['xlsx','xls']" :max-size="10240" :data="loginStatus" style="display: inline;" name="uploadFile" size="18" :on-success="handleSuccess" :before-upload="beforeUpload" :on-exceeded-size="fileExceded" :on-format-error="notFormat">
              <Button  icon="ios-cloud-upload-outline"  style="font-size:10px">上传文件</Button>
            </Upload> -->
          </div>
          <div class="">
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="addDetail">新增明细</Button>
            <Button type="primary" shape="circle" style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click="saveHuDataList">提&nbsp;&nbsp;交</Button>
          </div>
    </div>


    <div class="departmenttable">
      <Table id='tableId' height=400  border stripe :loading="loading" ref="selection" style="margin-top:20px;" :columns="tableColumnsAdd.card" :data="tableColumnsAdd.data" @on-selection-change="onSelectionChange" ></Table>
    </div>


    <br />
    <!-- 删除确认弹框 -->
     <Modal v-model="delete_confirm_Order" width="360">
         <p slot="header" style="color:#f60;text-align:center">
           <Icon type="ios-information-circle"></Icon>
           <span>删除确认</span>
         </p>
         <div style="text-align:center">
           <span style="font-size:14px">确定要删除吗？</span>
         </div>


         <div slot="footer">
           <Button type="error" size="large" shape="circle" style="width:120px;" @click="deleteSelectionOrder">确定删除</Button>
         </div>
     </Modal>


  </Modal>
</template>


<script>
import axios from 'axios'
import iview from 'view-design'

export default {
  components: {
     // FilterBar,
     // List
   },
  data () {
    return {




      date:'',//盘库的申请时间

      deDis:true,  //删除弹框默认不可用
      rows:[], //选中行数据
      loading1:false,
      batchnodisabled:false,  //表格样式
      itemdisabled:false,   //表格样式
      delete_confirm_Order:false, //删除弹框默认为false

      //新打开弹框时，给定一行数据
      originData:[{
        huid:'',  //huid号
        partcode:'', //零件号
        partname:'', //零件名称
        recvquantity:''  //数量
      }],

      delete_confirm:false,//删除提示
      lockDisable:false,//锁库不可用
      checkDetails:[],
      searchIndex:0,//当前查询库存的表格行
      detailRows:[],//选择的明细行
      add:false,//用于控制是否显示本弹窗
      loading:false,
      lastDistrictID:'',//选择的上一个库区id
      couldDelet:'false',
      submitLock:false,

      districtAllOptions: [],
      districtLoading: false,
      districtOptions: [],
      districtTransition:'',



      total:0,
      stockList:[],

      //所有需要盘库的数据
      dataNotPage:[],

      formFilter: {
        // 分页信息
        pagetotal:1,
        curPage:1,
        pageSize:20,


        applyDate:new Date(),
        locktype:'LD01',
        partcode:'',

        loginStatus:`${localStorage.loginStatus}`


      },

      tableColumnsAdd: {
         data:[],

         card: [
           {title: '选择',key: 'select',type: 'selection',align: 'center'},
           {title: '序号',key: 'rowid',width: 80,align: 'center',
               render: (h, params) => {
                 return h('div', params.row._index + 1 + this.formFilter.pageSize *(this.formFilter.curPage-1) )
               }
           },
           {title: 'HU号',key: 'huid',width:160,align: 'center',
               render: (h, params) => {
                    return h('Input', {
                         props: {
                         //将单元格的值给Input
                            value:params.row.huid,
                         },
                         style:{
                           width:'120px',
                         },
                         on:{
                              'on-change':(event) =>  {
                                 //值改变时
                                 console.log("huid数据改变")
                                 console.log(event)
                                 //将渲染后的值重新赋值给单元格值
                                 params.row.huid = event.target.value;
                                 this.tableColumnsAdd.data[params.index] = params.row;
                             }
                          }
                    })
               }
         },
         {title: '零件号',key: 'partcode',width:160,align: 'center',
             render: (h, params) => {
                  return h('Input', {
                       props: {
                       //将单元格的值给Input
                          value:params.row.partcode,
                       },
                       style:{
                         width:'120px',
                       },
                       on:{
                           //  'on-change':(event) =>  {
                           //     //值改变时
                           //     //将渲染后的值重新赋值给单元格值
                           //     params.row.partcode = event.target.value;
                           //     this.tableColumnsAdd.data[params.index] = params.row;
                           // },
                           //失去焦点事件，通过输入的零件号获取对应的零件名称和数量，插入数据
                           'on-blur':(event)=>{
                             //调用查询目标托盘号的方法   event.target.value为input框中最终的值
                             axios.get(localStorage.http+`/getCommodityCategoryById?goodsCategoryId=${event.target.value}&loginStatus=${localStorage.loginStatus}`)
                             .then((res) =>{
                               console.log("ressss")
                               //将获取到的托盘号赋值给对应行的字段
                                  params.row.partname = res.data.goodscategoryname;
                                  params.row.partcode = event.target.value;
                                  this.tableColumnsAdd.data[params.index] = params.row;
                                  console.log("xxx");
                                  console.log(this.tableColumnsAdd)
                             })
                             .catch((err) => {
                             })
                           }
                        }
                  })
             }
       },
          {title: '零件名称', key: 'partname',width: 200,align: 'center'},
          {title: '数量',key: 'recvquantity',width:160,align: 'center',
              render: (h, params) => {
                   return h('Input', {
                        props: {
                        //将单元格的值给Input
                           value:params.row.recvquantity,
                        },
                        style:{
                          width:'120px',
                        },
                        on:{
                             'on-change':(event) =>  {
                                //值改变时
                                console.log(event)
                                //将渲染后的值重新赋值给单元格值
                                params.row.recvquantity = event.target.value;
                                this.tableColumnsAdd.data[params.index] = params.row;
                            }
                         }
                   })
              }
        },

         ]

       }

    }
  },
  created(){        //渲染成功之后的专改
    // this.getAllDistrict()
    // this.getAllCustomer()
  },
  watch: {
    formFilter: {
      deep: true,
      handler() {
        console.log(this.formFilter)
        // this.queryData();
      }
    }
  },

  methods:{

    show(){//显示本弹窗
      //不管三七二十一，先添加一行空数据
    //  this.tableColumnsAdd.data = [];
    // table表格的默认数据
    this.tableColumnsAdd.data = [
      {
        huid:'',   //huid号
        partname: '',  //零件名称
        partcode:'',   //零件号
        recvquantity:'',   //数量
        extra:false   //删除标识
      }
    ]


      //作为盘库的申请时间
      this.getTime();
      document.getElementById('delOrderInAdd').setAttribute("style","background-color:white;width:120px;height:28px;");
      this.deDis = true

      this.add = true;

    },
    //获取当前时间
    getTime(){

      let createDate = new Date();
      let year = createDate.getFullYear();
      let month = createDate.getMonth() + 1 < 10 ? '0' + (createDate.getMonth() + 1) : createDate.getMonth() + 1;
      let day = createDate.getDate() < 10 ? '0' + createDate.getDate() : createDate.getDate() ;
      let hour = createDate.getHours() < 10 ? '0' + createDate.getHours() : createDate.getHours();
      let min = createDate.getMinutes()  < 10 ? '0' + createDate.getMinutes() : createDate.getMinutes();
      let sec = createDate.getSeconds() < 10 ? '0' + createDate.getSeconds() : createDate.getSeconds();
    this.date = year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;


    },

    ok(){

      this.loading = false;
    },
    cancel(){
      this.loading = false;
    },

    //删除事件 -xj
    deleteSelectionOrder(){
      console.log("manman wan ")
      console.log(this.dataNotPage)
      console.log(this.rows)


          for(var i=0;i<this.tableColumnsAdd.data.length;i++){
            for(var j=0;j<this.rows.length;j++){
              //if(JSON.stringify(this.addMoveTable.dataList[i]) == JSON.stringify(this.rows[j])){
              if(this.tableColumnsAdd.data[i].huid == this.rows[j].huid){

                  this.tableColumnsAdd.data[i].extra = true;
              }
            }
          }



          console.log(this.tableColumnsAdd.data.length);
      for(var i=0,flag=true,len=this.tableColumnsAdd.data.length;i<len;flag ? i++ : i){

          if(this.tableColumnsAdd.data[i] && this.tableColumnsAdd.data[i].extra == true){
             this.tableColumnsAdd.data.splice(i,1)
             flag=false
          }else{
            flag=true
          }
      }

      console.log(this.tableColumnsAdd.data.length);

      //当数据被清空，重置表格中batchno和partcode的表现形式
      // if(this.dataNotPage.length == 0){
      //   this.batchnodisabled = false
      //   this.itemdisabled = false
      // }

      //重新计算this.formFilter.pagetotal的值
    //  this.formFilter.pagetotal = this.dataNotPage.length;
      //重新显示对应的数据
    //  this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)


      this.delete_confirm_Order = false;

      //重新定义"删除选中项"的按钮的格式
      document.getElementById('delOrderInAdd').setAttribute("style","background-color:white;width:120px;height:28px;");
      this.deDis = true

    },


    //删除弹框 -xj
    delConfirmOrder(){
      this.delete_confirm_Order = true;
    },

    //提交盘库info
    saveHuDataList(){
      if(!this.submitLock){
        this.submitLock = true

        //需要提交的数据的数据校验
        for(var i = 0; i < this.tableColumnsAdd.data.length; i++){
          var data = this.tableColumnsAdd.data[i];
          if(data.huid.trim() == '' || data.partcode.trim() == '' || data.partname.trim() == '' || data.recvquantity.trim() == ''){
            iview.Message.success({
              content:'序号为' + (data._index+1) + '数据不完整，请校验数据',
              duration:5
            });
            setTimeout(() =>{
              this.submitLock = false
            },2000)
            return true;
          }
        }



        axios.post(localStorage.http+'/saveNewigd?loginStatus='+`${localStorage.loginStatus}`,this.tableColumnsAdd.data)
        .then((res) =>{
          console.log("laile ")
          iview.Message.success({
            content:'提交数据成功,可在入库单' + res.data + '中查看',
            duration:5
          });
          //提交数据后关闭弹框
          this.add = false;
          setTimeout(() =>{
            this.submitLock = false
          },2000)

        })
        .catch((err) => {
           // iview.Message.error({
           //   content:'网络或服务器错误',
           //   duration:5
           // });
           setTimeout(()=>{
             this.submitLock = false
           },2000)
        })
      }
    },

    deleteDetail(){//删除选中的行
      this.delete_confirm = false
      for(let i = this.detailRows.length - 1; i >= 0 ; i--){
        console.log(this.detailRows[i].checkdetailid)
        this.tableColumnsAdd.data.splice(this.detailRows[i].checkdetailid,1);
      }
      this.couldDelet = 'false'
    },
    //select事件更改选中行格式，删除选中项变为abled,每次选中按钮都会触发 -xj
    onSelectionChange (rows) {

      this.rows = rows;

      if(this.rows.length > 0){
        this.deDis = false
        document.getElementById('delOrderInAdd').setAttribute("style","background-color:#fe3838;width:120px;height:28px;color:white");
      }else{
        document.getElementById('delOrderInAdd').setAttribute("style","background-color:white;width:120px;height:28px;");
        this.deDis = true
      }
    },
    remarkChange(){//备注表头改变
      if(this.formFilter.remark.length > 50){
        this.formFilter.remark = this.formFilter.remark.substr(0,50)
      }
    },
    detailRemarkChange(value,index){
      if(value.length > 50){
        this.tableColumnsAdd.data[index].remark = value.substr(0,50)
      }else {
        this.tableColumnsAdd.data[index].remark = value
      }
    },
    noValueFilter(){//必填值过滤
      if (this.formFilter.districtid=='' || this.formFilter.districtid== undefined) {
        alert('库区不能为空')
        return true
      }else if (this.formFilter.customerid=='' || this.formFilter.customerid== undefined) {
        alert('客户不能为空')
        return true
      }else if (this.formFilter.checktype=='' || this.formFilter.checktype== undefined) {
        alert('盘库类型不能为空')
        return true
      }
      return false
    },
    addDetail(){//新增盘点明细
      console.log("新增数据之前的数据")
      console.log(this.tableColumnsAdd.data)
      //this.noValueFilter()
      let detail = {select:false,huid:'',partcode:'',partname:'',recvquantity:'',extra:false}
     this.tableColumnsAdd.data.push(detail)
      //this.detailRows = []
    },


    // takeStockGoods(){//查询指定零件的库存
    //   axios.post(localStorage.http+'/takeStockGoods?loginStatus='+`${localStorage.loginStatus}`,this.formFilter)
    //   .then((res) =>{
    //     //console.log(res)
    //     if (res.data.length > 0) {
    //       this.checkDetails = res.data
    //       this.addResultDetail()
    //     }else {
    //       iview.Message.success({
    //         content:'选定客户在该库区无此商品',
    //         duration:5,
    //         onClose:function(){
    //
    //         }
    //       })
    //     }
    //
    //   })
    //   .catch((err) => {
    //      iview.Message.error({
    //        content:'网络或服务器错误',
    //        duration:5
    //      });
    //   })
    // },


    getAllStockCheck(){//获取全盘盘点数据
      axios.post(localStorage.http+'/getAllStockCheckNotPage?loginStatus='+`${localStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        console.log(res.data)
        //console.log(res)
        if (res.data.length > 0) {
          //将查询到的数据添加到this.dataNotPage,在提交的时候使用
          this.dataNotPage = res.data;
          this.tableColumnsAdd.data = res.data
          this.formFilter.pagetotal = res.data.length
          // this.allCheckDetail = res.data
          // this.formFilter.curPage = 1
          // this.total = this.allCheckDetail.length
          // this.trimRowid()
          // this.trimPage()
          // this.hasSelected = 'false'
        }else {
          iview.Message.error({
            content:'无库存',
            duration:5,
            onClose:function(){

            }
          })
        }

      })
      .catch((err) => {
         // iview.Message.error({
         //   content:'网络或服务器错误',
         //   duration:5
         // });
      })
    },

    // 翻页事件-xj
     handleChangePage (value) {
       this.formFilter.curPage = value;
       if(this.formFilter.checktype == 'CD02'){
         this.getAllStockCheck();
       }else{
         this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
       }

       // console.log(value)
     },

     //改变每页大小事件-xj
     handleChangePageSize(value){
       this.formFilter.pageSize = value;
       console.log(this.formFilter.checktype)
       //如果是全盘的话
       if(this.formFilter.checktype == 'CD02'){
         this.getAllStockCheck();
       }else{
         this.tableColumnsAdd.data = this.dataNotPage.slice((this.formFilter.curPage-1)*this.formFilter.pageSize,this.formFilter.curPage*this.formFilter.pageSize)
       }
     },

    addResultDetail(){//将商品库存显示到表格
     this.tableColumnsAdd.data.splice(this.searchIndex,1)
      for (var i = 0; i < this.checkDetails.length; i++) {
        this.tableColumnsAdd.data.splice(this.searchIndex,0,this.checkDetails[i])
      }
      for (var i = 0; i < this.tableColumnsAdd.data.length; i++) {
        this.tableColumnsAdd.data[i].checkdetailid = i
      }
    },


    changeToIdNameOptions(origin,target){//将id-name对象数组转为id-name选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].name,value:origin[i].id}
        target.push(option)
      }
    },

    changeToIdOptions(origin,target){//将id-name对象数组转为id-id选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].id,value:origin[i].id}
        target.push(option)
      }
    },
    changeToNameOptions(origin,target){//将id-name对象数组转为name-name选择项数组
      for(let i = 0; i < origin.length; i++){
        let option = {label:origin[i].name,value:origin[i].name}
        target.push(option)
      }
    },



    changeDistrict(query){
      if(query != true && query != false){
        this.districtTransition = query//将筛选条件用过渡对象记录
      }
    },


    queryWareHouse(){//查询仓库
      console.log(213)
      axios.post(localStorage.http+'/queryWareHouse?loginStatus='+`${localStorage.loginStatus}`,this.formFilter)
      .then((res) =>{
        this.formFilter.warehouseName = '1'
        this.formFilter.warehouseName = res.data
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },
    districtOpenClose(open){//库区下拉框打开或关闭
      if(open){
        if(this.formFilter.districtid == ' '){
          this.formFilter.districtid = undefined
        }
        this.districtOptions = this.districtAllOptions
      }else{
        console.log(this.lastDistrictID)
        console.log(this.districtTransition)
        console.log(123455)
        let contain = false//默认下拉框选择项不包含筛选条件
        for (var i = 0; i < this.districtOptions.length; i++) {
            let option = this.districtOptions[i]

            if(option.label == this.districtTransition){//下拉框选择项包含筛选条件
                console.log(this.lastDistrictID)
                  console.log(this.districtTransition)
                  console.log(this.lastDistrictID == '')
              contain = true
              if(this.lastDistrictID == ''){
                this.lastDistrictID = option.value
                this.formFilter.districtid = option.value
                this.queryWareHouse()

              }else {
                if (confirm('更改库区则已存在的盘点明细将被删除，确认修改？')) {
                  this.lastDistrictID = option.value
                  this.formFilter.districtid = option.value
                  this.tableColumnsAdd.data = []
                  this.queryWareHouse()
                }else {
                  this.formFilter.districtid = this.lastDistrictID
                }
              }

            }
         }
         this.queryWareHouse()
         if(!contain && this.districtTransition != ''){
           this.districtOptions = []
           let option = {label:"",value:' '}
           this.districtOptions.push(option)
           this.formFilter.districtid = option.value
         }
      }
    },
    //客户
    getAllCustomer(){
      axios.get(localStorage.http+'/getAllCustomerIdNameMap?loginStatus='+`${localStorage.loginStatus}`)
      .then((res) =>{
        this.customerList = res.data
        this.changeToIdNameOptions(this.customerList,this.customerAllOptions)
      })
      .catch((err) => {
         iview.Message.error({
           content:'网络或服务器错误',
           duration:5
         });
      })
    },

    getCustomer (query) {
        if (query !== '') {
            this.customerLoading = true;
            //console.log(this.districtList)
            setTimeout(() => {
                this.customerLoading = false;
               this.customerOptions = this.customerAllOptions.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
            }, 100);
        } else {
            this.customerOptions = this.customerAllOptions;
        }
    },

    changeCustomer(query){
      if(query != true && query != false){
        this.customerTransition = query
      }
    },

    customerOpenClose(open){
      if(open){
        if(this.formFilter.customerid == ' '){
          this.formFilter.customerid = undefined
        }
        this.customerOptions = this.customerAllOptions
      }else{
        let contain = false
        for (var i = 0; i < this.customerOptions.length; i++) {
            let option = this.customerOptions[i]
            if(option.label == this.customerTransition){
              this.formFilter.customerid = option.value
              contain = true
            }
         }
         if(!contain && this.customerTransition != ''){
           this.customerOptions = []
           let option = {label:"",value:' '}
           this.customerOptions.push(option)
           this.formFilter.customerid = option.value
         }
      }
    }



  }
}
</script>

<style lang="less" scoped>
.width50{
  width: 150px;
}
.clear{clear:both;}

.title{
  color: blue;
  text-align: left;
  width: 30%;
}
.fontRed{
  color: red;
}
.fontBlue{
  color: blue;
}
.font15{
  font-size: 15px;
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
  font-size: 12px;
}
.blueYaHei18{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.blueYaHei20{
  color: #5aa5ff;
  font-family: Microsoft YaHei;
  font-size: 20px;
}
.redYaHei18{
  color: #fe3838;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.ButtonBlue{
  background-color: #5aa5ff;
  height: 28px;
  font-size: 16px;
  color: #ffffff;
  width: 120px;
  line-height: 5px;
}
.ButtonGrey{
  background-color: #cccccc;
  border-color:#cccccc;
  height: 28px;
  font-size: 16px;
  color: #ffffff;
  width: 120px;
  line-height: 5px;
}
.textInput{
  width: 160px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
.inputPopLable{
  width: 100px;
  text-align: right;
}
.textLongInput{
  width: 1000px;
  height: 28px;
  color: #333333;
  // border: 1px solid red;
}
// .dateInput{
//   width: 120px;
//   height: 28px;
//   color: #333333;
// }
.clear{clear:both;}

.title{
  /* border: 1px solid red; */
  /* float: left; */
  /* font-size: 15px; */
  color: blue;
  text-align: left;
  width: 30%;
}
.blackLabel{
  display: inline-block;
  text-align: right;
  font-family: Microsoft YaHei;
  font-size: 12px;
}
.outBox{
  display: inline-block;
  line-height: 40px;
  // width: 240px;
}
.blank{
  display: inline-block;
  width: 25px;
}


.hint{
  text-align: center;
}
  #overdue_day input,#product_date input{
  display: inline-block;
  width: 100px;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
</style>

<style lang="less">
    .addhuid{
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
       .departmenttable{
           .ivu-table td{
             background-color:#fff;
             height: 40px;
           }
           .ivu-table-stripe .ivu-table-body tr:nth-child(2n) td, .ivu-table-stripe .ivu-table-fixed-body tr:nth-child(2n) td{
             background-color: #f9f9f9;
             height: 40px;
           }
       }
       .ivu-input-wrapper{
          width: 120px;
          height: 20px;

       }
       .ivu-select{
         width: 160px;
         height: 20px;
       }
       // .textOutput{
       //    display: inline-block;
       //    width: 140px;
       //  }
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
         bottom: 6px;
       }
       .ivu-select-selection{
         border:1px solid #888888;
         bottom:7px !important;
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

           bottom: -6px;
       }
      .ivu-input-icon-normal+.ivu-input{
        width: 120px;
      }
      .ivu-table-cell{
        overflow: inherit;
      }
     #tableDetailId .ivu-select{
        width: 60px !important;
      }
      .detailTakeStockPage{
        .ivu-select-selection{
           bottom: 6px;
         }
      }
    }
 </style>
