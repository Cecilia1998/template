// import * as types from './mutation-types'

export const updateUser = ({ commit }, payload) => {
  commit('user/' + types.UPDATE_USER, payload)
}
