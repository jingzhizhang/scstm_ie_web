<template>
  <div class="consult">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="consult-con">
        <nav-bar :navBar="navBar"
                 @handleClick="handleTypeClick">
        </nav-bar>
        <consult v-if="typeId===1"></consult>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import NavBar from '@/base/navBar'
  import Bg from '@/base/bg'
  import Consult from '@/base/visit_serve/consult'

  export default {
    mixins: [getBannerMixin],
    components: {
      NavBar,
      Banner,
      Bg,
      Consult
    },
    data() {
      return {
        navBar: [
          {title: '参观咨询', id: 1},
          {title: '个人预约', id: 2, href: 'http://ticket.scstm.com/Book/OrderInfo.aspx'},
          {title: '团队预约', id: 3, href: 'http://ticket.scstm.com/Member/Login.aspx?RedirectUrl=/Book/OrderInfoForGroups.aspx'},
          {title: '个人预约查询', id: 4, href: 'http://ticket.scstm.com/Book/OrderQueryPersonal.aspx'},
          {title: '团队预约查询', id: 5, href: 'http://ticket.scstm.com/Member/Login.aspx?RedirectUrl=/Book/OrderInfoForGroups.aspx'},
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
        typeId: 1
      }
    },
    created() {
      this.getBanner()
    },
    methods: {
      /**
       * 获取参观咨询banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '', url: 'api/consulbanner'})
      },
      handleTypeClick(typeId) {
        this.typeId = typeId
      },
    }
  }
</script>
<style lang="less">
  .consult-con {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
  }
</style>
