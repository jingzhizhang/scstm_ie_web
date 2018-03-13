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
            </p>
          </div>
          <div class="art-con" v-html="content.content"></div>
        </div>
        <div class="news-lists">
          <div class="news-head clearfix">
            <h2 class="news-title">{{$route.query.typeId == 1 ? '热门新闻' : '热门公告'}}</h2>
            <router-link to="/visit_serve/notice" class="more">更多</router-link>
          </div>
          <ul class="lists-con clearfix" v-if="hotList.data">
            <li v-for="(item,index) in hotList.data">
              <router-link :to="{path:'/visit_serve/detail',query:{id:item.id,typeId:$route.query.typeId}}"
                           class="n-title">
                {{item.title}}
              </router-link>
              <span class="n-time">{{item.addtime}}</span>
            </li>
          </ul>
          <no-data v-if="!hotList.data"></no-data>
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
        title: '参观服务',
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
        content: '',
        hotList: ''
      }
    },
    created() {
      this.getBanner()
      this.getNewsDetail()
      this.getHotList()
    },
    methods: {
      /**
       * 获取新闻公告banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '', url: 'api/informbanner'})
      },

      /**
       * 获取详情内容
       */
      getNewsDetail() {
        const url = 'api/informdetails'
        getAjax(url, {
          id: this.$route.query.id
        }, (res) => {
          this.content = res.data
        }, (err) => {
          console.log(err)
        }, this)
      },

      /**
       * 右侧热门列表
       */
      getHotList() {
        const url = 'api/informlistsright'
        getAjax(url, {
          type: this.$route.query.typeId
        }, (res) => {
          this.hotList = res.data
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
    .news-lists {
      float: right;
      width: 370px;
      background: #fff;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      box-shadow: 0 3px 36px 0 #EDEDED;
      padding: 30px 20px 15px 20px;
      .news-head {
        margin-bottom: 5px;
        .news-title {
          font-size: 18px;
          color: #333;
          float: left;
        }
        .more {
          float: right;
          font-size: 15px;
          color: #333;
        }
      }
      .lists-con {
        li {
          height: 40px;
          line-height: 40px;
          border-bottom: 1px dashed #d8d8d8;
          .n-title {
            font-size: 15px;
            color: #666;
            width: 240px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            float: left;
          }
          .n-time {
            color: #cacaca;
            float: right;
          }
          &:hover {
            .n-title {
              color: #4bc5f4;
            }
          }
        }
      }
    }
  }
</style>
