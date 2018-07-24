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
          <type-list :type_list="activities" title="活动类型" :isCheckBox="true" @toggle="handleAct"></type-list>
          <type-list :type_list="floor" title="楼层筛选" :isCheckBox="true" @toggle="handleFloor"></type-list>
          <type-list :type_list="act_status" title="活动状态" :isCheckBox="false" @toggle="handleStatus"></type-list>
        </div>
        <div class="lists">
          <edu-item v-if="courseList.data"
                    v-for="(item,index) in courseList.data"
                    :key="index"
                    :data="item">
          </edu-item>
        </div>
        <Pagination v-if="courseList.total"
                    :total="courseList.total*10"
                    :page="page"
                    @handleChange="handlePage">
        </Pagination>
        <no-data v-if="!courseList.data"></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import TypeList from '@/base/edu/type_list'
  import EduItem from '@/base/edu/edu_item'
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
      EduItem,
      Banner,
      Pagination,
      Bg,
      NoData
    },
    data() {
      return {
        crowds: [],
        activities: [],
        act_status: [
          {
            classname: '无需预约',
            id: 1
          },
          {
            classname: '需预约',
            id: 2
          }
        ],
        floor: [
          {classname: '1F', id: 1},
          {classname: '2F', id: 2},
          {classname: '3F', id: 3},
          {classname: '4F', id: 4},
        ],
        crowdId: [],  //面向人群id
        actId: [],    //活动类型id
        floorId: [],  //楼层筛选id
        statusId: '',  //活动状态id
        state: '',
        total: 100,
        page: 1,
        courseList: '',
        navs: [
          {
            href: '/edu_activity/all_course',
            title: '全部课程',
            id: 1
          }
        ],
        title: '教育活动',
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
        const url = 'api/listscourseclasp'
        getAjax(url, {},
          res => {
            this.crowds = res.data
          }, err => {
            console.log(err)
          }, this)
      },
      /**
       * 获取活动类型列表
       */
      getActList() {
        const url = 'api/listscourseclash'
        getAjax(url, {},
          res => {
            this.activities = res.data
          }, err => {
            console.log(err)
          }, this)
      },
      /**
       * 获取全部课程列表
       */
      getCourseList() {
        const url = 'api/educationlists'
        getAjax(url, {
            page: this.page,
            clas_p: this.crowdId,
            clas_h: this.actId,
            floor: this.floorId,
            state: this.state, //是否需要预约
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
       * 获取子组件楼层id
       * @param id
       */
      handleFloor(id) {
        this.floorId = id
        this.page = 1
        this.getCourseList()
      },
      /**
       * 获取子组件状态id
       * @param id
       */
      handleStatus(id) {
        this.statusId = id
        this.page = 1
        if (id[0] === 2) { //需预约
          this.state = 1
          this.getCourseList()
        } else if(id[0] === 1){
          this.state = 2
          this.getCourseList()
        }else {
          this.state = ''
          this.getCourseList()
        }
      },
      /**
       * 获取全部课程banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/educationbanner'})
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
