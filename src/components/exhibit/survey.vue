<template>
  <div class="survey-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="item">
      <p class="title">全新科技馆<span></span></p>
      <div class="text-info">
        <no-data></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      NoData
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
      getBanner(id = 5) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      },
    }
  }
</script>
<style lang="less">
  .survey-con {
    .item {
      padding-top: 50px;
      padding-bottom: 60px;
      .title {
        font-size: 20px;
        color: #666;
        text-align: center;
        margin-bottom: 35px;
        span {
          width: 80px;
          height: 4px;
          display: block;
          margin: 10px auto;
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
        }
      }
      .text-info {
        text-align: center;
        .txt {
          font-size: 14px;
          line-height: 25px;
        }
      }
    }
  }
</style>
