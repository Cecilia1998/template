import * as types from '../mutation-types'
import {get, post} from '../../Util'
import iview from 'view-design'
import axios from 'axios'


const state = {
  pending: true,
  error: null,
  data: {
      testdata:[],
      constdata : 0
  },
}

const getters = {
  testdata : state => state.data.testdata,
  constdata : state => 111,
}
//获取后台接口数据
const actions = {
  aaa ({commit}, payload) {
    commit(types.GROUPLIST, get('/get', payload))
  },
  fetchGrouplist ({commit}, payload) {
    return axios
        .post(
            `http://localhost:8091/workRemind/getWorkRemindList?loginStatus=${localStorage.loginStatus}`,
          payload
        ).then(res => {
      commit(types.TRANSFER_COMMIT_SUCCEEDED, res.data)
      })
  },
}
const mutations = {
  [types.GROUPLIST] (state) {
    state.pending = true
    state.error = null
  },
  [types.GROUPLIST_SUCCEEDED] (state, payload) {
    state.pending = false
  },
  [types.GROUPLIST_FAILED] (state, payload) {
    state.pending = false
    state.error = payload
  },

  [types.TRANSFER_COMMIT](state) {
    state.pending = true
    state.error = null
  },
  [types.TRANSFER_COMMIT_SUCCEEDED](state, payload) {
    state.pending = false
    state.data.testdata = payload
  },
  [types.TRANSFER_COMMIT_FAILED](state, payload) {
    state.pending = false
    state.error = payload
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
