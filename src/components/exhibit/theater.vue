<template>
  <div class="theater-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="movie-list">
      <div class="list-con">
        <nav-bar :navBar="navBar"
                 @handleClick="handleTypeClick">
        </nav-bar>
        <div class="lists">
          <movie-item v-if="theaterData.data"
                      v-for="(item,index) in theaterData.data"
                      :key="index"
                      :data="item">
          </movie-item>
        </div>
        <Pagination
          v-if="theaterData.total"
          :total="theaterData.total*10"
          :page="page"
          @handleChange="handlePage">
        </Pagination>

        <no-data v-if="!theaterData.data"></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import MovieItem from '@/base/exhibit/movie_item'
  import Pagination from '@/base/pagination'
  import NavBar from '@/base/navBar'
  import {getAjax} from '@/public/js/config'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      MovieItem,
      Pagination,
      NavBar,
      Banner,
      Bg,
      NoData
    },
    data() {
      return {
        navBar: [
          {title: '正在上映', id: 1},
          {title: '即将上映', id: 2},
          {title: '往期回顾', id: 3},
        ],
        navs: [
          {
            href: '/exhibit/survey',
            title: '展馆概况',
            id: ''
          },
          {
            href: '/exhibit/guide',
            title: '楼层导览',
            id: 1
          },
          {
            href: '/exhibit/round',
            title: '全景环游',
            id: ''
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
        theaterData: '',
        page: 1,  //页码
        type: 1   //查询条件
      }
    },
    created() {
      this.getBanner()
      this.getTheaterData()
    },
    methods: {
      handlePage(page) {
        this.page = page
        this.getTheaterData()
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this.page = 1
        this.getTheaterData()
      },
      /**
       * 获取影院剧场列表
       */
      getTheaterData() {
        const url = 'api/cinemalists'
        getAjax(url, {
            page: this.page,
            type: this.type
          },
          (res) => {
            this.theaterData = res.data
          }, (err) => {
            console.log(err)
          }, this)
      },
      /**
       * 获取影院剧场banner
       * @param id  分类id
       */
      getBanner(id = 2) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      }
    }
  }
</script>
<style lang="less">
  .movie-list {
    padding-top: 50px;
    padding-bottom: 60px;
    .list-con {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
