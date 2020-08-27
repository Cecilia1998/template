import axios from 'axios'
import qs from 'qs'
import iview from 'view-design'
import {
  router
} from './router'
window.$router = router;
axios.defaults.timeout = 20 * 1000;
axios.interceptors.request.use(config => {
  // console.log(globalconf.axios)
  config.baseURL = globalconf.axios.baseURL;

  const user = sessionStorage.operatorid
  if (user) {
    config.params = {
      operatorid: sessionStorage.operatorid,
      opername: sessionStorage.opername,
      ...config.params
    }

  }
  let params = config.params;
  let newparam = {};
  for (let i in params) {
    // if (params[i] !== null && params[i] !==undefined ) {
    //   if(typeof params[i] == "string" && params[i].replace(" ","") !==''){
    //      newparam[i] = params[i]
    //   }
    // }
    if(params[i]==undefined || params[i] == null || (typeof params[i] == "string" && params[i].trim() == "")){
      continue;
    }
    newparam[i] = params[i]
  }
  config.params = newparam;
  iview.LoadingBar.start();
  /* 5.15新增*/
  let token = sessionStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  /* 5.15新增*/
  return config
}, function(error) {
  return Promise.reject(error)
});

axios.interceptors.response.use(function(response) {
    iview.LoadingBar.finish()
    // console.log('fishfishfish')
    const {
      code,
      data,
      message
    } = response.data
    // if (code === 0) {
    //   iview.Message.success({
    //     content: message,
    //     duration: 5,
    //         onClose: function () {
    //
    //         }
    //   })
    // }
    let status = location.href.indexOf('#/login') < 0
    // console.log(status)
    // if (code === -1) {
    //   if(status){
    //     iview.Message.error({content: message,duration: 2})
    //   }
    //   return Promise.reject(message)
    // }
    if (code === -2) {
      if (status) {
        // iview.Message.error({content: message,duration: 2})
        router.push("/login")
        // location.href = location.origin + '#/login';
      }
      return Promise.reject(message)
    }
    return response.data
  },

  function(error) {
    iview.LoadingBar.error()
    return Promise.reject(error)
  })
//对接口地址进行封装
function resolveUri(url) {
  return resolveUri.url + url
}
resolveUri.url = (function() {
  var base = '192.168.1.60:8088'
  return `//` + base
}())

export function get(url, params = {}) {
  params['access-token'] = sessionStorage.accessToken
  if (params != null) {
    url += '?' + qs.stringify(params)
  }
  return axios.get(resolveUri(url))
}

export function post(url, params) {
  url += `?access-token=${sessionStorage.accessToken}`
  return axios.post(resolveUri(url), qs.stringify(params))
}


export function sectomin(sec) {
  if (sec < 3600) {
    return (sec > 600) ? (Math.floor(sec / 60)) : ("0" + Math.floor(sec / 60)) + ':' + (sec % 60 > 9 ? ((sec % 60)) : (
      '0' + (sec % 60)))
  } else {
    return Math.floor(sec / 3600) + ':' + Math.floor(((sec % 3600) / 60) > 9 ? ((sec % 3600) / 60) : ('0' + ((sec %
      3600) / 60))) + ':' + Math.floor((sec % 3600 % 60) > 9 ? (sec % 3600 % 60) : ('0' + (sec % 3600 % 60)))
  }
}

export function getTitles(a) {
  if (localStorage.globalColor === 'iconblue') {
    return `${a} ${a}_blue`
  } else if (localStorage.globalColor === 'iconpink') {
    return `${a} ${a}_pink`
  } else if (localStorage.globalColor === 'iconyellow') {
    return `${a} ${a}_yellow`
  } else if (localStorage.globalColor === 'iconred') {
    return `${a} ${a}_red`
  } else if (localStorage.globalColor === 'iconpurple') {
    return `${a} ${a}_purple`
  } else {
    return `${a} ${a}_blue`
  }
}

export function getButtons(a) {
  if (localStorage.globalColor === 'iconblue') {
    return `${a}_blue`
  } else if (localStorage.globalColor === 'iconpink') {
    return `${a}_pink`
  } else if (localStorage.globalColor === 'iconyellow') {
    return `${a}_yellow`
  } else if (localStorage.globalColor === 'iconred') {
    return `${a}_red`
  } else if (localStorage.globalColor === 'iconpurple') {
    return `${a}_purple`
  } else {
    return `${a}_blue`
  }
}


export function formatFloat(f, digit) {
  var m = Math.pow(10, digit);
  return parseInt(f * m, 10) / m;
}

//通过登陆态获取权限信息 --xuj
export async function getAllPermission() {
  //通过登陆态获取所有的对应的权限信息
  let res = await axios.get(`/getAllPermission`)
  return res.data;

}


export function objInArr(name, arr) {
  let idx = arr.findIndex((item) => {
    return item.name == name
  })
  if (idx > -1) {
    return {
      result: true,
      index: idx
    }
  } else {
    return {
      result: false
    }
  }
}
