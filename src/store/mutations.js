import * as types from './mutation-types'

const mutations = {
  [types.SET_LOADING_STATE](state, flag) {
    state.loading = flag
  },
  [types.SET_LOGIN_STATE](state, flag) {
    state.islogin = flag
  }
}

export default mutations
