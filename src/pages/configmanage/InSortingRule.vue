<template lang="html">
  <div class="inSorting">
    <div class="chooseRule">
      <table>
        <tr height="40px">
          <!-- <td class="blueYaHei20">入库分拣规则</td> -->
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
          <td width="25%"></td>
          <td class="redYaHei18" align="center">
            客户规则和供应商规则二选一，商品种类规则和商品分类规则二选一
          </td>
        </tr>
      </table>
      <table>
        <!-- <tr height="40px">
          <td class="blueYaHei18" align="right" width="10%">出库方式</td>
          <td width="2%"></td>
          <td align="left">
            <Checkbox class="yaHei18" v-model="formFilter.firstInFirstOut"  :disabled='firstInFirstOut_disabled' @on-change="firstInFirstOutChange">先进先出</Checkbox>
          </td>
          <td align="left">
            <Checkbox class="yaHei18" v-model="formFilter.fristInLastOut" :disabled='fristInLastOut_disabled' @on-change="fristInLastOutChange">先进后出</Checkbox>

          </td>
          <td  width="20%" align="left">
            <Checkbox class="yaHei18" v-model="formFilter.mixture"  :disabled='mixture_disabled' @on-change="mixtureChange">混合</Checkbox>
          </td>

        </tr> -->

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
          <td class="blueYaHei18" align="right" width="10%"></td>
          <td width="2%"></td>
          <td align="left">
            <Checkbox class="yaHei18"  v-model="formFilter.productDate"    :disabled='productDate_disabled' @on-change="productDateChange">生产日期</Checkbox>
          </td align="left">
          <td align="left">
            <Checkbox class="yaHei18"  v-model="formFilter.entryDate"  :disabled='entryDate_disabled' @on-change="entryDateChange">入库日期</Checkbox>
          </td>
          <td  align="left">
            <Checkbox class="yaHei18"  v-model="formFilter.batchCode"   :disabled='batchCode_disabled' @on-change="batchCodeChange">批次号</Checkbox>
          </td>
        </tr>
      </table>

    </div>
    <div class="ruleList" width="30%" >
      <table>
        <tr height="40px">
          <td width="10%"></td>
          <td class="blueYaHei18" width="40%">入库分拣规则顺序</td>
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
// import Http from './Http.vue'
export default {
  components: {
    JoinOrderRule,
     // FilterBar,
     // Http
   },
  data () {
    return {
      http:'http://localhost:9090',
      testtest:true,
      chooseRuleList:[],
      generateRuleList:[],
      dateRange:[],
      lastDate:'',
      submitLock:false,
       formFilter: {
         cur_page:1,
         autoOrHand:'hand',

       },
       firstInFirstOut_disabled:true,
       fristInLastOut_disabled:true,
       mixture_disabled:true,
       productDate_disabled:true,
       entryDate_disabled:true,
       batchCode_disabled:true,
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
        this.chooseRuleList.forEach((item)=>{
          let rule = item.ruleCode
          this.generateRuleList.push(rule)
        })
        let url = sessionStorage.http+"/generateRule?recordType=5&rules="+this.generateRuleList+"&loginStatus="+`${sessionStorage.loginStatus}`
        this.generateRule(url)
      }else{
        alert("请先选择规则")
      }
    },

    autoHand(){
      if(this.formFilter.autoOrHand=='hand'){
        this.firstInFirstOut_disabled=true
        this.fristInLastOut_disabled=true
        this.mixture_disabled=true
        this.productDate_disabled=true
        this.entryDate_disabled=true
        this.batchCode_disabled=true
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
        this.firstInFirstOut_disabled=false
        this.fristInLastOut_disabled=false
        this.mixture_disabled=false
        this.productDate_disabled=false
        this.entryDate_disabled=false
        this.batchCode_disabled=false
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
      if (rule.ruleExplainEng == 'firstInFirstOut') {
        this.formFilter.firstInFirstOut = false
        this.fristInLastOut_disabled=false
        this.mixture_disabled=false
      }else if (rule.ruleExplainEng == 'fristInLastOut') {
        this.formFilter.fristInLastOut = false
        this.firstInFirstOut_disabled=false
        this.fristInLastOut_disabled=false
      }else if (rule.ruleExplainEng == 'mixture') {
        this.formFilter.mixture = false
        this.firstInFirstOut_disabled=true
        this.fristInLastOut_disabled=true
      }else if (rule.ruleExplainEng == 'productDate') {
        this.formFilter.productDate = false
        this.entryDate_disabled=false
        this.batchCode_disabled=false
      }else if (rule.ruleExplainEng == 'entryDate') {
        this.formFilter.entryDate = false
        this.productDate_disabled=false
        this.batchCode_disabled=false
      }else if (rule.ruleExplainEng == 'batchCode') {
        this.formFilter.batchCode = false
        this.productDate_disabled=false
        this.entryDate_disabled=false
      }else if (rule.ruleExplainEng == 'goodKind') {
        this.formFilter.goodKind = false
        this.bigClassify_disabled= false
        this.middleClassify_disabled= false
        this.littleClassify_disabled= false
        this.fineClassify_disabled= false
      }else if (rule.ruleExplainEng == 'bigClassify') {
        this.formFilter.bigClassify = false
        this.goodKind_disabled = false
      }else if (rule.ruleExplainEng == 'middleClassify') {
        this.formFilter.middleClassify = false
        this.goodKind_disabled = false
      }else if (rule.ruleExplainEng == 'littleClassify') {
        this.formFilter.littleClassify = false
        this.goodKind_disabled = false
      }else if (rule.ruleExplainEng == 'fineClassify') {
        this.formFilter.fineClassify = false
        this.goodKind_disabled = false
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
    firstInFirstOutChange(){
      let rule = {ruleCode:"ckfs-xjxc",rejectRule:"none",ruleNameEng:"outWay",ruleExplainEng:"firstInFirstOut",ruleName:"出库方式",ruleExplain:"先进先出"}
      if(this.formFilter.firstInFirstOut){
        this.fristInLastOut_disabled=true
        this.mixture_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          this.chooseRuleList.forEach((item)=>{ //已选的规则
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }

          })
          if(choose){
            alert("此规则已经选择")
          }else{
            if(choosenClass){
                alert("同一类别的规则只能选择一个")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.fristInLastOut_disabled=false
        this.mixture_disabled=false
      }
    },
    fristInLastOutChange(){
      let rule = {ruleCode:"ckfs-xjhc",rejectRule:"none",ruleNameEng:"outWay",ruleExplainEng:"fristInLastOut",ruleName:"出库方式",ruleExplain:"先进后出"}
      if(this.formFilter.fristInLastOut){
        this.firstInFirstOut_disabled=true
        this.mixture_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }

          })
          if(choose){
            alert("此规则已经选择")
          }else{
            if(choosenClass){
                alert("同一类别的规则只能选择一个")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }

      }else{
        this.removeChoose(rule)
        this.firstInFirstOut_disabled=false
        this.mixture_disabled=false
      }
    },
    mixtureChange(){
      let rule = {ruleCode:"ckfs-hh",rejectRule:"none",ruleNameEng:"outWay",ruleExplainEng:"mixture",ruleName:"出库方式",ruleExplain:"混合"}
      if(this.formFilter.mixture){
        this.firstInFirstOut_disabled=true
        this.fristInLastOut_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }
          })
          if(choose){
            alert("此规则已经选择")
          }else{
            if(choosenClass){
                alert("同一类别的规则只能选择一个")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.firstInFirstOut_disabled=false
        this.fristInLastOut_disabled=false
      }
    },
    productDateChange(){
      let rule = {ruleCode:"rqph-scrq",rejectRule:"none",ruleNameEng:"dateBatch",ruleExplainEng:"productDate",ruleName:"日期批号",ruleExplain:"生产日期"}
      if(this.formFilter.productDate){
        this.entryDate_disabled=true
        this.batchCode_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }

          })
          if(choose){
            alert("此规则已经选择")
          }else{
            if(choosenClass){
                alert("同一类别的规则只能选择一个")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.entryDate_disabled=false
        this.batchCode_disabled=false
      }
    },
    entryDateChange(){
      let rule = {ruleCode:"rqph-rkrq",rejectRule:"none",ruleNameEng:"dateBatch",ruleExplainEng:"entryDate",ruleName:"日期批号",ruleExplain:"入库日期"}
      if(this.formFilter.entryDate){
        this.productDate_disabled=true
        this.batchCode_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }

          })
          if(choose){
            alert("此规则已经选择")
          }else{
            if(choosenClass){
                alert("同一类别的规则只能选择一个")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDate_disabled=false
        this.batchCode_disabled=false
      }
    },
    batchCodeChange(){
      let rule = {ruleCode:"rqph-pch",rejectRule:"none",ruleNameEng:"dateBatch",ruleExplainEng:"batchCode",ruleName:"日期批号",ruleExplain:"批次号"}
      if(this.formFilter.batchCode){
        this.productDate_disabled=true
        this.entryDate_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleNameEng==rule.ruleNameEng){
              choosenClass = true
              if(item.ruleExplainEng==rule.ruleExplainEng){
                choose = true
              }
            }

          })
          if(choose){
            alert("此规则已经选择")
          }else{
            if(choosenClass){
                alert("同一类别的规则只能选择一个")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.productDate_disabled=false
        this.entryDate_disabled=false
      }
    },
    goodKindChange(){
      let rule = {ruleCode:"spzl",rejectRule:"goodClassify",ruleNameEng:"goodKind",ruleExplainEng:"goodKind",ruleName:"商品种类",ruleExplain:"商品种类"}
      if(this.formFilter.goodKind){
        this.bigClassify_disabled = true
        this.middleClassify_disabled = true
        this.littleClassify_disabled = true
        this.fineClassify_disabled = true

        if(this.chooseRuleList.length > 0){
          let choose = false //未选本规则
          let choosenReject = false //未选互斥的规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choose = true
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择商品分类规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
              this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.bigClassify_disabled= false
        this.middleClassify_disabled= false
        this.littleClassify_disabled= false
        this.fineClassify_disabled= false
      }
    },
    bigClassifyChange(){
      let rule = {ruleCode:"spfl-d",rejectRule:"goodKind",ruleNameEng:"goodClassify",ruleExplainEng:"bigClassify",ruleName:"商品分类",ruleExplain:"大分类"}
      if(this.formFilter.bigClassify){
        this.goodKind_disabled = true

        if(this.chooseRuleList.length > 0){
          let choosen = false //未选本规则
          let choosenReject = false //未选互斥的规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择商品种类规则")
          }else{
            if(choose){
              alert("此规则已经选择")
            }else{
                this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.goodKind_disabled = false
      }
    },
    middleClassifyChange(){
      let rule = {ruleCode:"spfl-z",rejectRule:"goodKind",ruleNameEng:"goodClassify",ruleExplainEng:"middleClassify",ruleName:"商品分类",ruleExplain:"中分类"}
      if(this.formFilter.middleClassify){
        this.goodKind_disabled = true

        if(this.chooseRuleList.length > 0){
          let choosen = false //未选本规则
          let choosenReject = false //未选互斥的规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择商品种类规则")
          }else{
            if(choosen){
              alert("此规则已经选择")
            }else{
                this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.goodKind_disabled = false
      }
    },
    littleClassifyChange(){
      let rule = {ruleCode:"spfl-x",rejectRule:"goodKind",ruleNameEng:"goodClassify",ruleExplainEng:"littleClassify",ruleName:"商品分类",ruleExplain:"小分类"}
      if(this.formFilter.littleClassify){
        this.goodKind_disabled = true

        if(this.chooseRuleList.length > 0){
          let choosen = false //未选本规则
          let choosenReject = false //未选互斥的规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择商品种类规则")
          }else{
            if(choosen){
              alert("此规则已经选择")
            }else{
                this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.goodKind_disabled = false
      }
    },
    fineClassifyChange(){
      let rule = {ruleCode:"spfl-xf",rejectRule:"goodKind",ruleNameEng:"goodClassify",ruleExplainEng:"fineClassify",ruleName:"商品分类",ruleExplain:"细分类"}
      if(this.formFilter.fineClassify){
        this.goodKind_disabled = true

        if(this.chooseRuleList.length > 0){
          let choosen = false //未选本规则
          let choosenReject = false //未选互斥的规则
          this.chooseRuleList.forEach((item)=>{
            if(item.ruleExplainEng==rule.ruleExplainEng){
              choosen = true
            }
            if(item.ruleNameEng==rule.rejectRule){
              choosenReject = true
            }
          })
          if(choosenReject){
            alert("已经选择商品种类规则")
          }else{
            if(choosen){
              alert("此规则已经选择")
            }else{
                this.chooseRuleList.push(rule)
            }
          }
        }else{
          this.chooseRuleList.push(rule)
        }
      }else{
        this.removeChoose(rule)
        this.goodKind_disabled = false
      }
    },
    supplierNameChange(){
      let rule = {ruleCode:"gys-mc",rejectRule:"customer",ruleNameEng:"supplier",ruleExplainEng:"supplierName",ruleName:"供应商",ruleExplain:"供应商名称"}
      if(this.formFilter.supplierName){
        this.supplierRegion_disabled=true
        this.customerName_disabled=true
        this.customerRegion_disabled=true

        if(this.chooseRuleList.length > 0){
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          let choosenReject = false //未选互斥的规则
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
          this.removeChoose(rule)
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
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          let choosenReject = false //未选互斥的规则
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
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          let choosenReject = false //未选互斥的规则
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
          let choosenClass = false //未选同类的规则
          let choose = false //未选本规则
          let choosenReject = false //未选互斥的规则
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
  .inSorting{
    .ivu-checkbox-inner{
      width: 12px;
      height: 12px;
    }
  }

</style>
