<template>
  <div class="act-calendar">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="calendar-con">
        <div class="calendar-date clearfix">
          <calendar ref="calendar" @toggle="toggleClick"></calendar>
          <div class="act-info">
            <h2 class="title">{{currentDate}}活动</h2>
            <p class="intr">可以查询近7天场馆活动内容，以便大家合理安排参观时间</p>
            <div class="btns">
              <div v-for="(item,index) in actMonth"
                   :class="{active:current===index}"
                   :key="index" class="btn" @click="toggleMonth(index)">
                {{item}}
              </div>
            </div>
          </div>
        </div>
        <div class="calendar-list">
          <nav-bar :navBar="navBar"
                   @handleClick="handleTypeClick">
          </nav-bar>
          <p class="total">所有活动 （共10个活动）</p>
          <div class="activity-con" v-if="listData.data">
            <div class="activity_list">
              <edu-item v-if="type===1"
                        v-for="(item,index) in listData.data"
                        :key="index"
                        :data="item">
              </edu-item>
              <mkx-item v-if="type===2"
                        v-for="(item,index) in listData.data"
                        :key="index"
                        :data="item">
              </mkx-item>
              <movie-item v-if="type===3"
                          v-for="(item,index) in listData.data"
                          :key="index"
                          :data="item">
              </movie-item>
              <patch-item v-if="type===4"
                          v-for="(item,index) in listData.data"
                          :key="index"
                          :data="item">
              </patch-item>
            </div>
            <Pagination
              :total="listData.total*10"
              :page="page"
              @handleChange="handlePage">
            </Pagination>
          </div>
          <no-data v-if="listData.length===0">暂无数据</no-data>
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
  import NavBar from '@/base/navBar'
  import moment from 'moment'
  import Calendar from '@/base/visit_serve/calendar'
  import EduItem from '@/base/edu/edu_item'
  import MkxItem from '@/base/mkx/mkx_item'
  import MovieItem from '@/base/exhibit/movie_item'
  import PatchItem from '@/base/patch/patch_item'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      Calendar,
      NavBar,
      EduItem,
      MkxItem,
      MovieItem,
      PatchItem,
      Pagination,
      NoData
    },
    data() {
      return {
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
        actMonth: ['本月活动', '下月活动'],
        current: 0,
        navBar: [
          {title: '教育活动', id: 1},
          {title: '美科新未来学院', id: 2},
          {title: '影院剧场', id: 3},
          {title: '临时展览', id: 4},
        ],
        currentDate: moment().format('YYYY年M月'),
        type: 1,
        page: 1,
        time: '',
        listData: []
      }
    },
    created() {
      this.getBanner()
      this.getActivityList()
    },
    methods: {
      /**
       * 获取活动日历banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '', url: 'api/Calendarbanner'})
      },
      nextMonth() {
        this.currentDate = moment().add(1, 'months').format('YYYY年M月')
        this.$refs.calendar.nextMonth()
      },
      nowMonth() {
        this.currentDate = moment().format('YYYY年M月')
        this.$refs.calendar.nowMonth()
      },
      toggleMonth(index) {
        this.current = index
        index === 0 ? this.nowMonth() : this.nextMonth()
      },
      toggleClick(date) {
        this.time = parseInt(moment(date).format('X')) + 12 * 60 * 60
        this.getActivityList()
      },
      handleTypeClick(type) {
        this.type = type
        this.page = 1
        this.getActivityList()
      },
      handlePage(page) {
        this.page = page
        this.getActivityList()
      },

      /**
       * 获取列表数据
       */
      getActivityList() {
        const url = 'api/Calendarlists'
        getAjax(url, {
          page: this.page,
          type: this.type,
          time: this.time
        }, (res) => {
          this.listData = res.data
        }, (err) => {
          console.log(err)
        }, this)
      }
    }
  }
</script>
<style lang="less">
  .calendar-con {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    .calendar-date {
      width: 100%;
      padding: 26px 42px 26px 26px;
      background: #fff;
      box-shadow: 0 3px 36px 0 #EDEDED;
      .act-info {
        display: inline-block;
        vertical-align: middle;
        padding-left: 50px;
        .title {
          font-size: 28px;
          color: #121c2a;
          padding: 5px 0 10px 0;
        }
        .intr {
          font-size: 14px;
          color: #616775;
        }
        .btns {
          width: 380px;
          height: 60px;
          border: 1px solid #26baf1;
          margin-top: 25px;
          border-radius: 4px;
          overflow: hidden;
          .btn {
            width: 50%;
            height: 60px;
            text-align: center;
            line-height: 60px;
            font-size: 16px;
            cursor: pointer;
            color: #1b2534;
            float: left;
          }
          .active {
            background: #0eb2ef;
            color: #fff;
          }
        }
      }
    }
    .calendar-list {
      margin-top: 50px;
      .total {
        font-size: 24px;
        color: #333333;
        margin-top: 30px;
      }
      .activity_list {
        margin-top: 30px;
      }
    }
  }
</style>
