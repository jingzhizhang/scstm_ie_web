<template>
  <div class="guide-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="floor">
      <div class="floor-con" v-if="floorList">
        <nav-bar :navBar="navBar"
                 @handleClick="handleTypeClick">
        </nav-bar>
        <div class="guide-img">
          <img v-lazy="floorList.floor_img"/>
        </div>

        <ul class="guide-list clearfix">
           <guide-item
             v-for="(item,index) in floorList.data"
             :key="index"
             :data="item">
           </guide-item>
        </ul>
        <Pagination
          v-if="floorList.total"
          :total="floorList.total*10"
          :page="page"
          @handleChange="handlePage">
        </Pagination>

        <no-data v-if="!floorList.data"></no-data>

      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import NavBar from '@/base/navBar'
  import {getAjax} from '@/public/js/config'
  import GuideItem from '@/base/exhibit/guide_item'
  import Pagination from '@/base/pagination'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'
  import {mapActions} from 'vuex'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      NavBar,
      GuideItem,
      Pagination,
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
        navBar: [
          {title: '1F', id: 1},
          {title: '2F', id: 2},
          {title: '3F', id: 3},
          {title: '4F', id: 4},
        ],
        type: 1,
        page: 1,
        floorList: ''
      }
    },
    created() {
      this.getBanner()
      this.getFloorName()
      this.getFloorList()
    },
    methods: {
      ...mapActions([
        'set_loading_state'
      ]),
      /**
       * 获取楼层导览banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      },

      /**
       * 楼层id
       * @param typeId
       */
      handleTypeClick(typeId) {
        this.set_loading_state(true)
        this.type = typeId
        this.page = 1
        this.getFloorList()
      },

      /**
       * 获取页码
       * @param page
       */
      handlePage(page) {
        this.page = page
        this.getFloorList()
      },

      /**
       * 获取楼层列表
       */
      getFloorList() {
        const url = 'api/floorlists'
        getAjax(url, {
          page: this.page,
          floor_id: this.type
        }, (res) => {
          this.floorList = res.data
          this.set_loading_state(false)
        }, (err) => {
          console.log(err)
        }, this)
      },

      /**
       * 获取楼层名称
       */
      getFloorName() {
        const url = 'api/floors'
        getAjax(url, {},
          (res) => {
            this.navBar = res.data
          }, (err) => {
            console.log(err)
          }, this)
      }
    }
  }
</script>
<style scoped lang="less">
  .floor {
    padding-top: 50px;
    .floor-con {
      width: 1200px;
      margin: 0 auto;
      .guide-img {
        height: 450px;
        width: 100%;
        margin-top: 40px;
        margin-bottom: 40px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        overflow: hidden;
        text-align: center;
        line-height: 450px;
        img {
          width: 100%;
          transform: scale(1);
        }
      }
      .guide-list {
        width: 100%;
      }
    }
  }
</style>
