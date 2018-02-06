import {getAjax} from './config'

export const getBannerMixin = {
  data() {
    return {
      banner: ''
    }
  },
  created() {
    //this.getBanner()
  },
  methods: {
    /**
     * 获取临展信息banner
     * @param obj  接收参数
     */
    getBannerData(obj) {
      const url = obj.url
      getAjax(url, {type: obj.id},
        (res) => {
          this.banner = res.data.banner
        }, (err) => {
          console.log(err)
        }, this)
    }
  }
}
