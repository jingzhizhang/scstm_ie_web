<template>
  <div class="course-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="activity">
      <div class="act-con">
        <div class="type_list">
          <type-list :type_list="crowds" title="面向人群" :isCheckBox="true" @toggle="handleCrowds"></type-list>
          <type-list :type_list="activities" title="精选学院" :isCheckBox="true" @toggle="handleAct"></type-list>
        </div>
        <div class="lists">
          <mkx-item v-if="courseList"
                      v-for="(item,index) in courseList.data"
                      :key="index"
                      :data="item">
          </mkx-item>
        </div>
        <Pagination v-if="courseList.total"
                    :total="courseList.total*10"
                    :page="page"
                    @handleChange="handlePage">
        </Pagination>
        <no-data v-if="!courseList.length"></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import TypeList from '@/base/edu/type_list'
  import MkxItem from '@/base/mkx/mkx_item'
  import Pagination from '@/base/pagination'
  import {getAjax} from '@/public/js/config'
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      TypeList,
      MkxItem,
      Banner,
      Pagination,
      Bg,
      NoData
    },
    data() {
      return {
        crowds: [],
        activities: [],
        crowdId: [],  //面向人群id
        actId: [],    //活动类型id
        page: 1,
        courseList: '',
        navs: [
          {
            href: '/mkx_school/school_course',
            title: '学院课程',
            id: 1
          }
        ],
        title: '美科星未来学院',
      }
    },
    created() {
      this.getBanner()
      this.getCrowdList()
      this.getActList()
      this.getCourseList()
    },
    methods: {
      /**
       * 获取面向人群列表
       */
      getCrowdList() {
        const url = 'api/listfutureclasp'
        getAjax(url, {},
          res => {
            this.crowds = res.data
          }, err => {
            console.log(err)
          }, this)
      },
      /**
       * 获取精选学院列表
       */
      getActList() {
        const url = 'api/listfutureclash'
        getAjax(url, {},
          res => {
            this.activities = res.data
          }, err => {
            console.log(err)
          }, this)
      },
      /**
       * 获取学院课程列表
       */
      getCourseList() {
        const url = 'api/futurelists'
        getAjax(url, {
            page: this.page,
            clas_p: this.crowdId,
            clas_h: this.actId,
          },
          res => {
            this.courseList = res.data
          }, err => {
            console.log(err)
          }, this)
      },

      /**
       * 获取子组件页码
       * @param page
       */
      handlePage(page) {
        this.page = page
        this.getCourseList()
      },

      /**
       * 获取子组件面向人群id
       * @param id
       */
      handleCrowds(id) {
        this.crowdId = id
        this.page = 1
        this.getCourseList()
      },
      /**
       * 获取子组件活动id
       * @param id
       */
      handleAct(id) {
        this.actId = id
        this.page = 1
        this.getCourseList()
      },
      /**
       * 获取全部课程banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/futurebanner'})
      }
    }
  }
</script>
<style lang="less">
  .activity {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 60px;
    .act-con {
      width: 1200px;
      margin: 0 auto;
      .type_list {
        margin-bottom: 20px;
      }
    }
  }
</style>
