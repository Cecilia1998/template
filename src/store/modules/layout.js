import * as types from '../mutation-types'
import {get, post} from '../../Util'
import iview from 'view-design'

const state = {
  pending: true,
  error: null,
  data: {
    ids: '',
    staff:[],
    grouplist:[],
  },
}

const getters = {
}
//获取后台接口数据
const actions = {
  fetchGrouplist ({commit}, payload) {
    commit(types.GROUPLIST, get('/get', payload))
  },
  commit ({commit}, payload) {
    commit(types.TRANSFER_COMMIT, post('/post', payload))
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
