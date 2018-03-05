//export const serveUrl = 'http://www.kjg.com:8080'
//export const serveUrl = 'http://scstm.api.pthola.cn'
export const serveUrl = 'http://218.6.173.219:8081/api/public'

export function getAjax(url, params, resolveBack, rejectErr, _this) {
  _this.$http.defaults.headers.common['Authorization'] = 'Bearer ' + sessionStorage.getItem('token'),
    _this.$http({
      method: 'post',
      url: serveUrl + '/' + url,
      data: params
    })
      .then((res) => {
        if (res.status === 200) {
          resolveBack(res.data)
        }
      })
      .catch((err) => {
        rejectErr(err.response)
      })
}
