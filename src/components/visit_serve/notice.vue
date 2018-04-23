<template>
  <div class="serve-notice">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="flow-con clearfix">
        <nav-bar :navBar="navBar"
                 @handleClick="handleTypeClick">
        </nav-bar>
        <div class="notice-list">
          <!--<p class="title">新闻公告</p>-->
          <ul class="clearfix lists-con">
            <news-item v-if="noticeData.data"
                         v-for="(item,index) in noticeData.data"
                         :key="index" :data="item"
                        :typeId="typeId">
            </news-item>
          </ul>
          <Pagination
            v-if="noticeData.total"
            :total="noticeData.total*10"
            :page="page"
            @handleChange="handlePage">
          </Pagination>
          <no-data v-if="!noticeData.data"></no-data>
        </div>
        <div class="news-lists">
          <div class="news-head clearfix">
            <h2 class="news-title">{{typeId == 1 ? '热门新闻' : '热门公告'}}</h2>
            <a href="/visit_serve/notice" class="more">更多</a>
          </div>
          <ul class="lists-con clearfix" v-if="hotList.data">
            <li v-for="(item,index) in hotList.data">
              <router-link :to="{path:'/visit_serve/detail',query:{id:item.id,typeId:typeId}}"
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
<script>
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import NavBar from '@/base/navBar'
  import Bg from '@/base/bg'
  import {getAjax} from '@/public/js/config'
  import NewsItem from '@/base/visit_serve/news_item'
  import SideItem from '@/base/patch/side_item'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      NavBar,
      Banner,
      Bg,
      NewsItem,
      SideItem,
      Pagination,
      NoData
    },
    data() {
      return {
        title: '参观服务',
        navBar: [
          {title: '新闻', id: 1},
          {title: '公告', id: 2},
        ],
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
        page: 1,
        clas: 1,
        noticeData: '',
        patchData: '',
        typeId: 1,
        hotList:''
      }
    },
    created() {
      this.getBanner()
      this.getNoticeList()
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

      handlePage(page) {
        this.page = page
        this.getNoticeList()
      },

      handleTypeClick(typeId) {
        this.typeId = typeId
        this.getNoticeList()
        this.getHotList()
      },

      /**
       * 获取流动科技馆列表
       */
      getNoticeList() {
        const url = 'api/informlists'
        getAjax(url, {
          page: this.page,
          type: this.typeId
        }, (res) => {
          this.noticeData = res.data
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
          type: this.typeId
        }, (res) => {
          this.hotList = res.data
        }, (err) => {
          console.log(err)
        }, this)
      }
    }
  }
</script>
<style lang="less">
  .serve-notice {
    .flow-con {
      width: 1200px;
      margin: 0 auto;
      padding-top: 50px;
      padding-bottom: 60px;
      .notice-list {
        width: 800px;
        float: left;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        .title {
          font-size: 22px;
          color: #333;
          margin-bottom: 20px;
        }
        .lists-con {
          padding: 0 40px;
          background: #fff;
          box-shadow: 0 3px 36px 0 #EDEDED;
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
  }
</style>
