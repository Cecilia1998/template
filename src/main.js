// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import {router} from './router'
import axios from 'axios'


import formCreate from '@form-create/iview4' //动态渲染表单
import VueI18n from "vue-i18n" //多语言支持
import VueDragResize from "vue-drag-resize" //拖拽缩放

import viewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

import $ from "jquery"
//打印

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()


Vue.use(viewUI)
Vue.use(formCreate)
Vue.use(VueI18n)

import Print from 'vue-print-nb'
Vue.use(Print);  //注册

Vue.component('vue-drag-resize',VueDragResize)
// 多语言
import cn from '@/lang/cn.json'
import en from '@/lang/en.json'
import jp from '@/lang/jp.json'

const i18n = new VueI18n({
  locale:'CN',
  messages:{
    CN:require('@/lang/cn.json'),
    EN:require('@/lang/en.json'),
    JP:require('@/lang/jp.json')
  },

})

//字符串类型的日期时间格式化
Vue.prototype.timeConvert = function(time){
  var year = time.substr(0,4);
  var month = time.substr(4,2);
  var day = time.substr(6,2);
  var hour = time.substr(8,2);
  var min = time.substr(10,2);
  var sec = time.substr(12,2);
  time = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
  return time;
}
//iview自带表单的验证
Vue.prototype.checkValidate=function(ref){
  return this.$refs[ref].validate(valid=>{
    return valid;
  })
}
//form-create创建的表单验证
Vue.prototype.checkValidate2=function(model,func){
  model.validate(valid=>{
    if(valid){
      func()
    }else{
      this.$root.mes("error","w-20200605135011")
    }
  },(valid)=>{
    console.log(valid)
    
  })
}
//根据系统参数值获取系统参数
Vue.prototype.getType = function(code,types){
  return this.$axios.get(`/systemparam/paramenum?code=${code}&lang=${this.$store.state.globalLang}`).then(res=>{
    var options=[]
    if(res.code === 0){
      for(let i of res.data){
        types.push({"label":i.name,"value":i.code})
      }
    }else{
      console.log("获取失败！",res)
    }
  }).catch(err=>{
    console.log(err)
  })
}
//根据code/value 获得name/value
Vue.prototype.getLabel = function(data,value){
  for(let i of data){
    if(i.value!=undefined && i.value == value){
      return i.label;
    }else if(i.code!=undefined&&i.code == value){
      return i.name;
    }
  }
  return ""
}
Vue.prototype.getValue = function(data,label){
  for(let i of data){
    if(i.label!=undefined && i.label == label){
      return i.value;
    }else if(i.name!=undefined&&i.name == label){
      return i.code;
    }
  }
  return ""
}
//将name-code格式的数组转化为label-value
Vue.prototype.arrConvert = function(data){
  var arr=[];
  for(let i of data){
    arr.push({label:i.name,value:i.code})
  }
  return arr;
}
//日期格式化
Vue.prototype.dateFormat = function(date,format){
  format = format ? format : 'yyyy-MM-dd hh:mm';
  var str = format;
  if(!date){
    return null;
  }
  date = new Date(date)
  str = str.replace(/y+/,date.getFullYear());
  str = str.replace(/M+/,date.getMonth()>8?date.getMonth()+1:'0'+(date.getMonth()+1));
  str = str.replace(/d+/,date.getDate()>9?date.getDate():'0'+date.getDate());
  str = str.replace(/h+/,date.getHours()>9?date.getHours():'0'+date.getHours());
  str = str.replace(/m+/,date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes());
  str = str.replace(/s+/,date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds());
  return str;
}
//获取增删改查结果的系统消息
Vue.prototype.getMes=function(type,res){
  switch(type){
    case "post":
      return this.$root.mes(res?"info":"error",res?"w-20200430131600":"w-20200608125822")
    case "delete":
    return this.$root.mes(res?"info":"error",res?"w-20200430131813":"w-20200601145237")
    case "put":
    return this.$root.mes(res?"info":"error",res?"w-20200430131709":"w-20200605180340")
    case "get":
    return this.$root.mes(res?"info":"error",res?"w-w-20200430131855":"w-20200608125910")
  }
}
//请求封装
Vue.prototype._axios = function(type,url){
  var promise = undefined;
  var params = typeof arguments[2] == "object" ? arguments[2] : undefined;
  var func = typeof arguments[2] == "function" ? arguments[2] : (typeof arguments[3]=="function"?arguments[3]:undefined)
  switch(type){
    case "get":
    promise = this.$axios.get(url,{params:params})
    break;
    case "delete":
    promise = this.$axios.delete(url,{data:params})
    break;
    case "put":
    promise =this.$axios.put(url,params)
    break;
    case "post":
    promise = this.$axios.post(url,params)
    break;
  }
  return promise.then(res=>{
    if(res.code === 0){
      // console.log(res)
      // if(typeof res.data == "boolean"){
      //   this.getMes(type,res.data)
      // }
      func(res.data)
    }else{
      // console.log(res)
      // this.getMes(type,false)
      if(res.message != null){
        this.$Message.error(res.message)
      }else{
        this.$Message.error("未知的异常情况")
      }

    }
  }).catch(err=>{
    console.log(err)
    this.getMes(type,false)
  })
}
//设置form-create创建的表单中各的值
Vue.prototype.setFormData=function(formData,obj){
  for(let i in obj){
    formData.model.setValue(i,obj[i])
  }
}
//判空
Vue.prototype.isEmpty=function(data){
  if(data === null || data === undefined){
    return true;
  }
  return false;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  methods:{
    mes(type,mes){
      this.$children[0].$refs.mesmodal.show(type,mes)
      return new Promise((resolve, reject) => {
        this.$bus.$on('modalvalue', value => {
          resolve(value)
        })
      })
    }
  },
  render: h => h(App),
  beforeCreate () {
    this.$store.dispatch('routerAdd', null);
    this.$store.dispatch('setControls', null);
  }
})
