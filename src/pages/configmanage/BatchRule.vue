<template lang="html">
  <div class="batch">
    <div class="chooseRule">
      <table>
        <tr height="40px">
          <!-- <td class="blueYaHei20">批次规则</td> -->
          <td width="78%"></td>
          <td>
            <RadioGroup  v-model="formFilter.autoOrHand" @on-change="autoHand">
              <Radio class="yaHeiStrong18" label="hand">手动</Radio>
              <Radio class="yaHeiStrong18" label="auto">自动</Radio>
            </RadioGroup>
          </td>
        </tr>
      </table>
      <table>
        <tr height="40px">
          <td width="10%"></td>
          <td class="redYaHei18" align="center">
            申请日期规则和生产日期规则只能二选一；选择指定日期范围和最后期限时日期不能为空；
            供应商规则和客户规则只能二选一
          </td>
        </tr>
      </table>
      <table>
        <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">生产日期</td>
          <td width="2%"></td>
          <td align="left">
            <Checkbox class="yaHei18" v-model="formFilter.productDateAppoint"  :disabled='productDateAppoint_disabled' @on-change="productDateAppointChange">指定日期</Checkbox>
          </td>
          <td align="left">
            <Checkbox class="yaHei18" v-model="formFilter.productDateRange" :disabled='productDateRange_disabled' @on-change="productDateRangeChange">指定日期范围</Checkbox>

          </td>
          <td width="20%" align="left">
            <Row>
              <Col span="12">
                  <DatePicker v-model="formFilter.productDateRangeDate" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 180px" id="testdate"></DatePicker>
              </Col>
          </Row>
          </td>
          <td  width="20%" align="center">
            <Checkbox class="yaHei18" v-model="formFilter.productDateLast"  :disabled='productDateLast_disabled' @on-change="productDateLastChange">小于最后期限</Checkbox>
          </td>
          <td align="left">
            <Col span="12">
                <DatePicker v-model="formFilter.productDateLastDate"  type="date" placeholder="请选择" style="width: 180px"></DatePicker>
            </Col>
          </td>
        </tr>
        <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">申请日期</td>
          <td width="2%"></td>
          <td align="left">
            <Checkbox class="yaHei18"  v-model="formFilter.applyDateAppoint"   width="10%" :disabled='applyDateAppoint_disabled' @on-change="applyDateAppointChange">指定日期</Checkbox>
          </td align="left">
          <td align="left">
            <Checkbox class="yaHei18"  v-model="formFilter.applyDateRange"  :disabled='applyDateRange_disabled' @on-change="applyDateRangeChange">指定日期范围</Checkbox>

          </td>
          <td width="20%" align="left">
            <Row>
              <Col span="12">
                  <DatePicker v-model="formFilter.applyDateRangeDate" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 180px"></DatePicker>
              </Col>
          </Row>
          </td>
          <td  width="20%" align="center">
            <Checkbox class="yaHei18"  v-model="formFilter.applyDateLast"  width="10%" :disabled='applyDateLast_disabled' @on-change="applyDateLastChange">小于最后期限</Checkbox>
          </td>
          <td align="left">
            <Col span="12">
                <DatePicker v-model="formFilter.applyDateLastDate"  type="date" placeholder="请选择" style="width: 180px"></DatePicker>
            </Col>
          </td>
        </tr>
        <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">商品种类</td>
            <td width="2%"></td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.goodKind"   :disabled='goodKind_disabled' @on-change="goodKindChange">商品种类</Checkbox>
          </td>
        </tr>
        <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">商品分类</td>
            <td width="2%"></td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.bigClassify"  :disabled='bigClassify_disabled' @on-change="bigClassifyChange">大分类</Checkbox>
          </td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.middleClassify"   :disabled='middleClassify_disabled' @on-change="middleClassifyChange">中分类</Checkbox>
          </td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.littleClassify"   :disabled='littleClassify_disabled' @on-change="littleClassifyChange">小分类</Checkbox>
          </td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.fineClassify"   :disabled='fineClassify_disabled' @on-change="fineClassifyChange">细分类</Checkbox>
          </td>
        </tr>
        <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">供应商</td>
            <td width="2%"></td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.supplierName"   :disabled='supplierName_disabled' @on-change="supplierNameChange">供应商名称</Checkbox>
          </td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.supplierRegion"   :disabled='supplierRegion_disabled' @on-change="supplierRegionChange">供应商所属地区</Checkbox>
          </td>

        </tr>
        <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">客户</td>
            <td width="2%"></td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.customerName"   :disabled='customerName_disabled' @on-change="customerNameChange">客户名称</Checkbox>
          </td>
          <td align="left">
            <Checkbox  class="yaHei18" v-model="formFilter.customerRegion"   :disabled='customerRegion_disabled' @on-change="customerRegionChange">客户所属地区</Checkbox>
          </td>

        </tr>
      </table>

    </div>
    <div class="ruleList" width="30%" >
      <table>
        <tr height="40px">
          <td width="10%"></td>
          <td class="blueYaHei18" width="30%">批次规则顺序</td>
          <td width="40%"></td>
        </tr>
      </table>
      <table v-for="(item,key,index) in chooseRuleList" width="100%">
        <tr >
          <td width="10%"></td>
          <td align="right" class="yaHei18" width="7%" >
            <Icon type="ios-close-circle-outline" @click="deleteRule(key)"/></td>
          <td align="right" class="yaHei18" width="3%">
            {{key+1}}.</td>
          <td  align="left" class="yaHei18" width="60%">
            {{item.ruleName}}：{{item.ruleExplain}}
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <td width="55%"></td>
          <td  align="right">
            <Button type="primary" shape="circle"  style="width:120px;height:28px;border-radius:14px;background-color:#5aa5ff;" @click='generateRuleRecord'>生成规则</Button>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
import JoinOrderRule from '@/pages/configmanage/JoinOrderRule'
import axios from 'axios'
import iview from 'view-design'
import router from '../../router'
import $ from 'jquery'
// import Http from './Http.vue'
export default {
  components: {
    JoinOrderRule,
   },
  data () {
    return {
      http:'http://localhost:9090',
      testtest:true,
      chooseRuleList:[],
      generateRuleList:[],
      dateRange:[],
      submitLock:false,
      lastDate:'',
       formFilter: {
         cur_page:1,
         autoOrHand:'hand',
         productDate_appoint:false,
         productDate_range:false,
         productDate_last:false,
         applyDate_appoint:false,
         applyDate_range:false,
         applyDate_last:false,
       },
       productDateAppoint_disabled:true,
       productDateRange_disabled:true,
       productDateLast_disabled:true,
       applyDateAppoint_disabled:true,
       applyDateRange_disabled:true,
       applyDateLast_disabled:true,
       goodKind_disabled:true,
       bigClassify_disabled:true,
       middleClassify_disabled:true,
       littleClassify_disabled:true,
       fineClassify_disabled:true,
       supplierName_disabled:true,
       supplierRegion_disabled:true,
       customerName_disabled:true,
       customerRegion_disabled:true,
    }
  },
  created(){
    // sessionStorage.a = 'a'
    //this.$router.history.current.path为当前网页的路径
  },
  computed:{

  },
  methods:{
    test(){

    },
    generateRule(url){
      if(!this.submitLock){
        this.submitLock = true
        axios.get(url).then((res) => {
          setTimeout(()=>{
            this.submitLock = false
          },2000)
          this.generateRuleList = []
          this.lastDate = ''
          iview.Message.success({
            content:res.message,
            duration:5,
            onClose:function(){

            }
          })
        }).catch((err) =>{
          setTimeout(()=>{
            this.submitLock = false
          },2000)
          this.generateRuleList = []
          this.lastDate = ''
          iview.Message.error({
            content:'网络或服务器异常',
            duration:5,
          })
        })
      }

    },
    formartDate(date){
      let  Y = date.getFullYear() + '-'
      let  M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
      let  D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
      let  h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
      let  m = date.getMinutes()  < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
      let  s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D
    },
    generateRuleRecord(){
      if(this.chooseRuleList.length > 0){
        let productRange = false
        let productLast = false
        let applyRange = false
        let applyLast = false
        let pass = true
        this.chooseRuleList.forEach((item)=>{
          if((item.ruleCode=='scrq-zdrqfw' && this.formFilter.productDateRangeDate == ',') || (item.ruleCode=='sqrq-zdrqfw' && this.formFilter.applyDateRangeDate == ',')){
            alert("选择指定日期范围规则时日期范围不能为空")
            this.generateRuleList = []
            pass = false
            return
          }else if ((item.ruleCode=='scrq-xyzhqx' && this.formFilter.productDateLastDate == '') || (item.ruleCode=='sqrq-xyzhqx' && this.formFilter.applyDateLastDate == '')) {
            alert("选择小于最后期限规则时最后日期不能为空")
            this.generateRuleList = []
            pass = false
            return
          }else{
            let rule = item.ruleCode
            this.generateRuleList.push(rule)
          }
          if(item.ruleCode=='scrq-zdrqfw'){
            productRange = true
          }else if (item.ruleCode=='sqrq-zdrqfw') {
            applyRange = true
          }else if (item.ruleCode=='scrq-xyzhqx') {
              productLast = true
          }else if (item.ruleCode=='sqrq-xyzhqx') {
              applyLast = true
          }
        })
        if(pass){
          if(productRange){
            this.formFilter.productDateRangeDate.forEach((date) =>{
              this.dateRange.push(this.formartDate(date))
            })
             let url = sessionStorage.http+"/generateRuleRange?recordType=1&rules="+this.generateRuleList+"&range="+this.dateRange+"&loginStatus="+`${sessionStorage.loginStatus}`
            //let url = sessionStorage.http+"/user/save_users"
             this.generateRule(url)
          }else if (applyRange) {
            this.formFilter.applyDateRangeDate.forEach((date) =>{
              this.dateRange.push(this.formartDate(date))
            })
             let url = sessionStorage.http+"/generateRuleRange?recordType=1&rules="+this.generateRuleList+"&range="+this.dateRange+"&loginStatus="+`${sessionStorage.loginStatus}`
             this.generateRule(url)
          }else if (productLast) {
            this.lastDate = this.formartDate(this.formFilter.productDateLastDate)
            let url = sessionStorage.http+"/generateRuleLast?recordType=1&rules="+this.generateRuleList+"&last="+ this.lastDate+"&loginStatus="+`${sessionStorage.loginStatus}`
            this.generateRule(url)
          }else if (applyLast) {
            this.lastDate = this.formartDate(this.formFilter.applyDateLastDate)
            let url = sessionStorage.http+"/generateRuleLast?recordType=1&rules="+this.generateRuleList+"&last="+this.lastDate+"&loginStatus="+`${sessionStorage.loginStatus}`
            this.generateRule(url)
          }else{
            let url = sessionStorage.http+"/generateRule?recordType=1&rules="+this.generateRuleList+"&loginStatus="+`${sessionStorage.loginStatus}`
            this.generateRule(url)
          }
        }
      }else{
        alert("请先选择规则")
      }
    },

    autoHand(){
      if(this.formFilter.autoOrHand=='hand'){
        this.productDateAppoint_disabled=true
        this.productDateRange_disabled=true
        this.productDateLast_disabled=true
        this.applyDateAppoint_disabled=true
        this.applyDateRange_disabled=true
        this.applyDateLast_disabled=true
        this.goodKind_disabled=true
        this.bigClassify_disabled=true
        this.middleClassify_disabled=true
        this.littleClassify_disabled=true
        this.fineClassify_disabled=true
        this.supplierName_disabled=true
        this.supplierRegion_disabled=true
        this.customerName_disabled=true
        this.customerRegion_disabled=true
      }
      else{
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
        this.goodKind_disabled=false
        this.bigClassify_disabled=false
        this.middleClassify_disabled=false
        this.littleClassify_disabled=false
        this.fineClassify_disabled=false
        this.supplierName_disabled=false
        this.supplierRegion_disabled=false
        this.customerName_disabled=false
        this.customerRegion_disabled=false
      }
    },
    Onchange(){

    },
    deleteRule(key){ //从列表中删除规则
      let rule = this.chooseRuleList[key]
      if (rule.ruleExplainEng == 'productDateAppoint') {
        this.formFilter.productDateAppoint = false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }else if (rule.ruleExplainEng == 'productDateRange') {
        this.formFilter.productDateRange = false
        this.productDateAppoint_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }else if (rule.ruleExplainEng == 'productDateLast') {
        this.formFilter.productDateLast = false
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }else if (rule.ruleExplainEng == 'applyDateAppoint') {
        this.formFilter.applyDateAppoint = false
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }else if (rule.ruleExplainEng == 'applyDateRange') {
        this.formFilter.applyDateRange = false
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateLast_disabled=false
      }else if (rule.ruleExplainEng == 'applyDateLast') {
        this.formFilter.applyDateLast = false
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
      }else if (rule.ruleExplainEng == 'goodKind') {
        this.formFilter.goodKind = false

      }else if (rule.ruleExplainEng == 'bigClassify') {
        this.formFilter.bigClassify = false

      }else if (rule.ruleExplainEng == 'middleClassify') {
        this.formFilter.middleClassify = false

      }else if (rule.ruleExplainEng == 'littleClassify') {
        this.formFilter.littleClassify = false

      }else if (rule.ruleExplainEng == 'fineClassify') {
        this.formFilter.fineClassify = false

      }else if (rule.ruleExplainEng == 'supplierName') {
        this.formFilter.supplierName = false
        this.supplierRegion_disabled=false
        this.customerName_disabled=false
        this.customerRegion_disabled=false
      }else if (rule.ruleExplainEng == 'supplierRegion') {
        this.formFilter.supplierRegion = false
        this.supplierName_disabled=false
        this.customerName_disabled=false
        this.customerRegion_disabled=false
      }else if (rule.ruleExplainEng == 'customerName') {
        this.formFilter.customerName = false
        this.supplierRegion_disabled=false
        this.supplierName_disabled=false
        this.customerRegion_disabled=false
      }else if (rule.ruleExplainEng == 'customerRegion') {
        this.formFilter.customerRegion = false
        this.supplierName_disabled=false
        this.customerName_disabled=false
        this.supplierRegion_disabled=false
      }
        this.chooseRuleList.splice(key, 1);
    },

    removeChoose(rule){//删除不再选择的规则
      if(this.chooseRuleList.length > 0){
        var index = -1
        for (var i = 0; i < this.chooseRuleList.length; i++) {
            let item = this.chooseRuleList[i]
            if(item.ruleExplainEng==rule.ruleExplainEng){
              index = i
              break
            }
        }
        this.chooseRuleList.splice(index,1)
      }
    },
    productDateAppointChange(){
      let rule = {ruleCode:"scrq-zdrq",rejectRule:"applyDate",ruleNameEng:"productDate",ruleExplainEng:"productDateAppoint",ruleName:"生产日期",ruleExplain:"指定日期"}
      if(this.formFilter.productDateAppoint){
        this.productDateRange_disabled=true
        this.productDateLast_disabled=true
        this.applyDateAppoint_disabled=true
        this.applyDateRange_disabled=true
        this.applyDateLast_disabled=true
        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择申请日期规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }
    },
    productDateRangeChange(){
      let rule = {ruleCode:"scrq-zdrqfw",rejectRule:"applyDate",ruleNameEng:"productDate",ruleExplainEng:"productDateRange",ruleName:"生产日期",ruleExplain:"指定日期范围"}
      if(this.formFilter.productDateRange){
        this.productDateAppoint_disabled=true
        this.productDateLast_disabled=true
        this.applyDateAppoint_disabled=true
        this.applyDateRange_disabled=true
        this.applyDateLast_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择申请日期规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }

      }else{
        this.removeChoose(rule)
        this.productDateAppoint_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }
    },
    productDateLastChange(){
      let rule = {ruleCode:"scrq-xyzhqx",rejectRule:"applyDate",ruleNameEng:"productDate",ruleExplainEng:"productDateLast",ruleName:"生产日期",ruleExplain:"小于最后期限"}
      if(this.formFilter.productDateLast){
        this.productDateAppoint_disabled=true
        this.productDateRange_disabled=true
        this.applyDateAppoint_disabled=true
        this.applyDateRange_disabled=true
        this.applyDateLast_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择申请日期规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }
    },
    applyDateAppointChange(){
      let rule = {ruleCode:"sqrq-zdrq",rejectRule:"productDate",ruleNameEng:"applyDate",ruleExplainEng:"applyDateAppoint",ruleName:"申请日期",ruleExplain:"指定日期"}
      if(this.formFilter.applyDateAppoint){
        this.productDateAppoint_disabled=true
        this.productDateRange_disabled=true
        this.productDateLast_disabled=true
        this.applyDateRange_disabled=true
        this.applyDateLast_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择生产日期规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateRange_disabled=false
        this.applyDateLast_disabled=false
      }
    },
    applyDateRangeChange(){
      let rule = {ruleCode:"sqrq-zdrqfw",rejectRule:"productDate",ruleNameEng:"applyDate",ruleExplainEng:"applyDateRange",ruleName:"申请日期",ruleExplain:"指定日期范围"}
      if(this.formFilter.applyDateRange){
        this.productDateAppoint_disabled=true
        this.productDateRange_disabled=true
        this.productDateLast_disabled=true
        this.applyDateAppoint_disabled=true
        this.applyDateLast_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择生产日期规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateLast_disabled=false
      }
    },
    applyDateLastChange(){
      let rule = {ruleCode:"sqrq-xyzhqx",rejectRule:"productDate",ruleNameEng:"applyDate",ruleExplainEng:"applyDateLast",ruleName:"申请日期",ruleExplain:"小于最后期限"}
      if(this.formFilter.applyDateLast){
        this.productDateAppoint_disabled=true
        this.productDateRange_disabled=true
        this.productDateLast_disabled=true
        this.applyDateAppoint_disabled=true
        this.applyDateRange_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择生产日期规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDateAppoint_disabled=false
        this.productDateRange_disabled=false
        this.productDateLast_disabled=false
        this.applyDateAppoint_disabled=false
        this.applyDateRange_disabled=false
      }
    },
    goodKindChange(){
        let rule = {ruleCode:"spzl",rejectRule:"none",ruleNameEng:"goodKind",ruleExplainEng:"goodKind",ruleName:"商品种类",ruleExplain:"商品种类"}
      if(this.formFilter.goodKind){

        if(this.chooseRuleList.length > 0){
          let choosen = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
          })
          if(choosen){
            alert("此规则已经选择")
          }else{
            this.chooseRuleList.push(rule)
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
      }
    },

    bigClassifyChange(){
      let rule = {ruleCode:"spfl-d",rejectRule:"none",ruleNameEng:"goodClassify",ruleExplainEng:"bigClassify",ruleName:"商品分类",ruleExplain:"大分类"}
      if(this.formFilter.bigClassify){

        if(this.chooseRuleList.length > 0){
          let choosen = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
          })
          if(choosen){
            alert("此规则已经选择")
          }else{
            this.chooseRuleList.push(rule)
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
      }
    },
    middleClassifyChange(){
      let rule = {ruleCode:"spfl-z",rejectRule:"none",ruleNameEng:"goodClassify",ruleExplainEng:"middleClassify",ruleName:"商品分类",ruleExplain:"中分类"}
      if(this.formFilter.middleClassify){

        if(this.chooseRuleList.length > 0){
          let choosen = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
          })
          if(choosen){
            alert("此规则已经选择")
          }else{
            this.chooseRuleList.push(rule)
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else {
        this.removeChoose(rule)
      }
    },
    littleClassifyChange(){
      let rule = {ruleCode:"spfl-x",rejectRule:"none",ruleNameEng:"goodClassify",ruleExplainEng:"littleClassify",ruleName:"商品分类",ruleExplain:"小分类"}
      if(this.formFilter.littleClassify){

        if(this.chooseRuleList.length > 0){
          let choosen = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
          })
          if(choosen){
            alert("此规则已经选择")
          }else{
            this.chooseRuleList.push(rule)
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else {
        this.removeChoose(rule)
      }
    },
    fineClassifyChange(){
      let rule = {ruleCode:"spfl-xf",rejectRule:"none",ruleNameEng:"goodClassify",ruleExplainEng:"fineClassify",ruleName:"商品分类",ruleExplain:"细分类"}
      if(this.formFilter.fineClassify){

        if(this.chooseRuleList.length > 0){
          let choosen = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
          })
          if(choosen){
            alert("此规则已经选择")
          }else{
            this.chooseRuleList.push(rule)
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else {
        this.removeChoose(rule)
      }
    },
    supplierNameChange(){
      let rule = {ruleCode:"gys-mc",rejectRule:"customer",ruleNameEng:"supplier",ruleExplainEng:"supplierName",ruleName:"供应商",ruleExplain:"供应商名称"}
      if(this.formFilter.supplierName){
        this.supplierRegion_disabled=true
        this.customerName_disabled=true
        this.customerRegion_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择客户规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.supplierRegion_disabled=false
        this.customerName_disabled=false
        this.customerRegion_disabled=false
      }
    },
    supplierRegionChange(){
      let rule = {ruleCode:"gys-dq",rejectRule:"customer",ruleNameEng:"supplier",ruleExplainEng:"supplierRegion",ruleName:"供应商",ruleExplain:"供应商所属地区"}
      if(this.formFilter.supplierRegion){
        this.supplierName_disabled=true
        this.customerName_disabled=true
        this.customerRegion_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择客户规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.supplierName_disabled=false
        this.customerName_disabled=false
        this.customerRegion_disabled=false
      }
    },
    customerNameChange(){
      let rule = {ruleCode:"kh-mc",rejectRule:"supplier",ruleNameEng:"customer",ruleExplainEng:"customerName",ruleName:"客户",ruleExplain:"客户名称"}
      if(this.formFilter.customerName){
        this.supplierRegion_disabled=true
        this.supplierName_disabled=true
        this.customerRegion_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择供应商规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.supplierRegion_disabled=false
        this.supplierName_disabled=false
        this.customerRegion_disabled=false
      }
    },
    customerRegionChange(){
      let rule = {ruleCode:"kh-dq",rejectRule:"supplier",ruleNameEng:"customer",ruleExplainEng:"customerRegion",ruleName:"客户",ruleExplain:"客户所属地区"}
      if(this.formFilter.customerRegion){
        this.supplierName_disabled=true
        this.customerName_disabled=true
        this.supplierRegion_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false
          let choose = false
          let choosenReject = false
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择供应商规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              if(choosenClass){
                  alert("同一类别的规则只能选择一个")
              }else{
                this.chooseRuleList.push(rule)
              }
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.supplierName_disabled=false
        this.customerName_disabled=false
        this.supplierRegion_disabled=false
      }
    },

    Onselect(name){

      this.$router.push(name)
    },
    loginOut(){
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
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
    font-size: 12px;
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
    td{
      /* border: 1px solid red; */
    }
    .hint{
      text-align: center;
      align:center;
    }


  .batch{
    .ivu-input-icon{
         position: absolute;
         right:15px;
     }
    .ivu-input-icon-normal+.ivu-input{
      width: 160px;
    }
    .ivu-checkbox-inner{
      width: 12px;
      height: 12px;
    }
  }

</style>
<style lang="less">
  .batch{
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
        right:-5px;
    }
    .ivu-input-icon-normal+.ivu-input{
      width: 180px;
    }
  }
  .ivu-checkbox-inner{
    width: 12px;
    height: 12px;
  }

</style>
