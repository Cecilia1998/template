import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import VuexPromiseMiddleware from 'vuex-promise-middleware'

import * as actions from './actions'
import * as getters from './getters'
import layout from './modules/layout'
import rolemanage from './modules/rolemanage'
import {routers} from "../router/router";
import {router} from "../router";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state:{
    controls :{
      M_2_200421111846_insert:true,
    },
    globalmes:{},
    globalWare: null,
    globalLang: 'CN'
  },
  getters,
  modules: {
    layout,
    rolemanage
  },
  mutations: {
    setRouter(state, data) {
      data= data ?  data :  JSON.parse(localStorage.getItem('routerList') || '[]');
      if(data.length===0)return;
      const arr =[]
      let resolRouter =function (data) {
         if(!data)return;
         data.forEach(item=>{
           if (item.isLeaf==='1')
             arr.push({
             path: item.menuAction,
             component: () => import(`@/pages${item.relativePath}`),
             meta: {
               breadcrumb: [{
                 name: state.globalLang=="CN"?"首页":(state.globalLang=="EN"?"Home":"トップページ"),
                 href: '/'
               },
                 {
                   name: item.parentLabel,
                   href: null
                 },
                 {
                   name: item.menuLabel,
                   href: null
                 }
               ],
               storage: 'selectionAll',
               type: 'card'
             }
           });
           resolRouter(item.children)
         })
       };
      resolRouter(data);
      routers[1].children.push(...arr);
      router.addRoutes(routers)
    },

    setControls(state,controls){
      controls= controls ?  controls :  JSON.parse(localStorage.getItem('controls') || '[]');
     // if(controls.length===0)return;
      state.controls = controls;
    },

     setglobalmes(state, globalmes) {
       globalmes = globalmes ? globalmes : JSON.parse(localStorage.getItem('globalmes') || '{}')
       state.globalmes = globalmes;
     },
    setLang(state,globalLang){
      state.globalLang = globalLang;
    },

    setWare(wareInfo){
      state.globalWare = wareInfo;
    }
  },
  actions:
    {
      routerAdd(state, data) {
        state.commit('setRouter', data)
      },
      setControls(state,controls){
        state.commit('setControls',controls)
      },
      setglobalmes(state, globalmes) {
        state.commit('setglobalmes', globalmes)
      },
      setLang(state,globalLang){
        state.commit('setLang',globalLang)
      }
    },
  strict: debug,
  plugins:
    debug ? [createLogger(), VuexPromiseMiddleware] : [VuexPromiseMiddleware]
})
