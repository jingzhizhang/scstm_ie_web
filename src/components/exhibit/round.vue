<template>
  <div class="round-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="round">
        <!--<iframe class="round-map" src="http://720yun.com/t/12a27jOuc1r" frameborder="no"/>-->
        <expect></expect>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import Expect from '@/base/expect.vue'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      Expect
    },
    data() {
      return {
        navs: [
          {
            href: '/exhibit/survey',
            title: '展馆概况',
            id: 5
          },
          {
            href: '/exhibit/guide',
            title: '楼层导览',
            id: 1
          },
          {
            href: '/exhibit/round',
            title: '全景环游',
            id: 4
          },
          {
            href: '/exhibit/theater',
            title: '影院剧场',
            id: 2
          },
          {
            href: '/exhibit/succinct',
            title: '展品精粹',
            id: 3
          }
        ],
        title: '常设展览',
      }
    },
    created() {
      this.getBanner()
    },
    methods: {
      /**
       * 获取楼层导览banner
       * @param id  分类id
       */
      getBanner(id = 4) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      },
    }
  }
</script>
<style scoped lang="less">
  .round-con{
    position: relative;
    .round{
      padding-top: 50px;
      padding-bottom: 60px;
      width: 1200px;
      margin: 0 auto;
      .round-map{
        width: 100%;
        height: 800px;
      }
    }
  }
</style>
