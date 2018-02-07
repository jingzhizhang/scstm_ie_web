<template>
  <div class="su_detail-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="ty_detail">
        <p class="title">{{content.name}}<span></span></p>
        <div class="art" v-html="content.content">
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import {getAjax} from '@/public/js/config'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg
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
        content: '',
      }
    },
    created() {
      this.getBanner()
      this.getArticleText()
    },
    methods: {
      /**
       * 获取楼层导览banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      },
      getArticleText() {
        const url = 'api/floordeta'
        getAjax(url, {
          id: parseInt(this.$route.query.id)
        }, (res) => {
          this.content = res.data
        }, (err) => {
          console.log(err)
        }, this)
      }
    }
  }
</script>
<style lang="less">
  .ty_detail {
    padding-top: 50px;
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 60px;
    .art{
      background: #fff;
      padding: 20px 30px;
      border-radius: 4px;
      width: 900px;
      margin: 0 auto;
      box-shadow: 0 3px 36px 0 #EDEDED;
      p{
        background: none !important;
      }
      span{
        background: none !important;
      }
    }
    .title {
      font-size: 22px;
      color: #666;
      text-align: center;
      margin-bottom: 50px;
      letter-spacing: 2px;
      span {
        width: 90px;
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
  }
</style>
