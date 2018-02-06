<template>
  <div class="se">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="se-con">
        <expect></expect>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import Expect from '@/base/expect'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      Expect
    },
    data(){
      return{
        navs: [
          {
            href: '/visit_serve/strategy',
            title: '参观攻略',
            id: 1
          },
          {
            href: '/visit_serve/act_calendar',
            title: '活动日历',
            id: 2
          },
          {
            href: '/visit_serve/SE',
            title: 'SE餐厅',
            id: 3
          },
          {
            href: '/visit_serve/consult',
            title: '参观咨询',
            id: 4
          },
          {
            href: '/visit_serve/notice',
            title: '新闻公告',
            id: 5
          }
        ],
        title: '参观服务',
      }
    },
    created() {
      this.getBanner()
    },
    methods:{
      /**
       * 获取SE餐厅banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '', url: 'api/Sebanner'})
      },
    }
  }
</script>
<style lang="less">
  .se-con{
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
  }
</style>
