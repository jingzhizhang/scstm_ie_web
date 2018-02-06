import * as types from './mutation-types'

/**
 * 修改loading状态
 * @param commit
 */
export const set_loading_state = function ({commit}, flag) {
  commit(types.SET_LOADING_STATE, flag)
}

/**
 * 修改登录状态
 * @param commit
 * @param flag
 */
export const set_login_state = function ({commit}, flag) {
  commit(types.SET_LOGIN_STATE, flag)
}

