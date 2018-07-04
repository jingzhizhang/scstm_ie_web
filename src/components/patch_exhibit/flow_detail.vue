<template>
  <div class="news_detail">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="news-con clearfix">
        <div class="art-info" v-if="content">
          <div class="art-head">
            <h2 class="art-title">{{content.title}}</h2>
            <p class="author">
              <span>作者：{{content.people}}</span>
              发布时间：{{content.addtime}}
              &nbsp;&nbsp;
              阅读数量：{{content.number}}
            </p>
          </div>
          <div class="art-con" v-html="content.content"></div>
        </div>
        <!--<div class="news-lists">-->
          <!--<div class="news-head clearfix">-->
            <!--<h2 class="news-title">热门新闻</h2>-->
            <!--<router-link to="/visit_serve/notice" class="more">更多</router-link>-->
          <!--</div>-->
          <!--<ul class="lists-con clearfix">-->
            <!--<li v-for="(item,index) in hotList.data">-->
              <!--<router-link :to="{path:'/visit_serve/detail',query:{id:item.id,typeId:1}}" class="n-title">-->
                <!--{{item.title}}-->
              <!--</router-link>-->
              <!--<span class="n-time">{{item.addtime}}</span>-->
            <!--</li>-->
          <!--</ul>-->
        <!--</div>-->
        <div class="now-exhibit">
          <p class="title">正在展览</p>
          <ul class="clearfix">
            <side-item v-for="(item,index) in patchData.data"
                       :key="index"
                       :data="item"
                       v-if="index<=1">
            </side-item>
          </ul>
          <no-data v-if="!patchData.data"></no-data>
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import {getAjax} from '@/public/js/config'
  import Bg from '@/base/bg'
  import SideItem from '@/base/patch/side_item'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      SideItem,
      NoData
    },
    data() {
      return {
        title: '临展信息',
        navs: [
          {
            href: '/patch/patch_info',
            title: '临时展览',
            id: 1
          },
          {
            href: '/patch/flow_science',
            title: '流动科技馆',
            id: 2
          },
        ],
        content: '',
        patchData: ''
      }
    },
    created() {
      this.getBanner()
      this.getNewsDetail()
      this.getPatchData()
    },
    methods: {
      /**
       * 获取新闻公告banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '2', url: 'api/tembanner'})
      },

      /**
       * 获取详情内容
       */
      getNewsDetail() {
        const url = 'api/flowdeta'
        getAjax(url, {
          id: this.$route.query.id
        }, (res) => {
          this.content = res.data
        }, (err) => {
          console.log(err)
        }, this)
      },

      /**
       * 获取临时展览列表
       */
      getPatchData() {
        const url = 'api/showlists'
        getAjax(url, {
            page: 1,
            type: 1
          },
          (res) => {
            this.patchData = res.data
          }, (err) => {
            console.log(err)
          }, this)
      }
    },
    watch: {
      '$route'(to, from) {
        this.getNewsDetail()
      }
    }
  }

</script>
<style lang="less">
  .news-con {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    .art-info {
      width: 800px;
      float: left;
      background: #fff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      box-shadow: 0 3px 36px 0 #EDEDED;
      padding: 50px 40px;
      .art-head {
        padding-bottom: 20px;
        border-bottom: 1px solid #d8d8d8;
        margin-bottom: 30px;
        .art-title {
          font-size: 22px;
          margin-bottom: 15px;
          color: #333;
        }
        .author {
          color: #d8d8d8;
          font-size: 14px;
          span {
            color: #4bc5f4;
            margin-right: 10px;
          }
        }
      }
      .art-con {
        overflow: hidden;
      }
    }
    .now-exhibit {
      float: right;
      width: 370px;
      background: #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      padding: 32px 38px;
      box-shadow: 0 3px 36px 0 #EDEDED;
      .title {
        font-size: 18px;
        color: #333;
      }
    }
  }
</style>
