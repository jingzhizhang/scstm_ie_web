<template>
  <div class="strategy">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="strategy-con">
        <nav-bar :navBar="navBar"
                 @handleClick="handleTypeClick">
        </nav-bar>
        <visit-road v-if="typeId===1 && roadTypes.length" @toggle="toggleClick" :roadTypes="roadTypes" :showImg="showImg"></visit-road>
        <traffic v-if="typeId===2"></traffic>
        <no-data v-if="typeId===1 && !roadTypes.length"></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import NavBar from '@/base/navBar'
  import {getAjax} from '@/public/js/config'
  import Bg from '@/base/bg'
  import Traffic from '@/base/visit_serve/traffic'
  import VisitRoad from '@/base/visit_serve/visit_road'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      NavBar,
      Banner,
      Bg,
      Traffic,
      VisitRoad,
      NoData
    },
    data() {
      return {
        navBar: [
          {title: '参观路线', id: 1},
          {title: '交通信息', id: 2},
          {title: '购票', id: 3, href: ''},
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
        title: '参观服务',
        typeId: 1,
        roadTypes: [],
        showImg: ''
      }
    },
    created() {
      this.getBanner()
      this.getTypeList()
      this.getShowImg('s')
      this.getTicketHref()
    },
    methods: {
      /**
       * 获取参观攻略banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '', url: 'api/visitbanner'})
      },

      handleTypeClick(typeId) {
        this.typeId = typeId
      },

      /**
       * 获取参观路线分类
       */
      getTypeList() {
        const url = 'api/visitclass'
        getAjax(url, {},
          (res) => {
            this.roadTypes = res.data
          }, (err) => {
            console.log(err)
          }, this)
      },

      toggleClick(id) {
        this.getShowImg(id)
      },

      /**
       * 获取参观路线对应id内容
       * @param id
       */
      getShowImg(id) {
        const url = 'api/visitcontent'
        getAjax(url, {
          id: id
        }, (res) => {
          this.showImg = res.data.line
        }, (err) => {
          console.log(err)
        }, this)
      },

      //获取购票链接
      getTicketHref() {
        const url = 'api/ticket'
        getAjax(url, {}, (res) => {
          this.navBar[2].href = res.data.ticket
        }, (err) => {
          console.log(err)
        }, this)
      }
    }
  }
</script>
<style lang="less">
  .strategy-con {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
  }
</style>
