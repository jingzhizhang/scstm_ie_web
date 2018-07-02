<template>
  <div class="flow_science">
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
          <ul class="clearfix lists-con">
            <notice-item v-if="flowList.data"
                         v-for="(item,index) in flowList.data"
                         :key="index" :data="item">
            </notice-item>
          </ul>
          <Pagination
            v-if="flowList.data"
            :total="flowList.total*10"
            :page="page"
            @handleChange="handlePage">
          </Pagination>
          <no-data v-if="!flowList.data"></no-data>
        </div>
        <div class="now-exhibit">
          <p class="title">正在展览</p>
          <ul v-if="patchData.data" class="clearfix">
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
<script>
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import NavBar from '@/base/navBar'
  import Bg from '@/base/bg'
  import {getAjax} from '@/public/js/config'
  import NoticeItem from '@/base/patch/notice_item'
  import SideItem from '@/base/patch/side_item'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      NavBar,
      Banner,
      Bg,
      NoticeItem,
      SideItem,
      Pagination,
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
        navBar: [],
        page: 1,
        clas: 1,
        flowList: '',
        patchData: ''
      }
    },
    created() {
      this.getBanner()
      this.getTypeList()
      this.getFlowList()
      this.getPatchData()
    },
    methods: {
      /**
       * 获取临时展览banner
       * @param id  分类id
       */
      getBanner(id = 2) {
        this.getBannerData({id: id, url: 'api/tembanner'})
      },

      handleTypeClick(typeId) {
        this.clas = typeId
        this.page = 1
        this.getFlowList()
      },

      handlePage(page) {
        this.page = page
        this.getFlowList()
      },

      /**
       * 获取nav分类信息
       */
      getTypeList() {
        const url = 'api/flowclass'
        getAjax(url, {},
          (res) => {
            this.navBar = res.data
          }, (err) => {
            console.log(err)
          }, this)
      },

      /**
       * 获取流动科技馆列表
       */
      getFlowList() {
        const url = 'api/flowlists'
        getAjax(url, {
          page: this.page,
          clas: this.clas
        }, (res) => {
          this.flowList = res.data
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
    }
  }
</script>
<style lang="less">
  .flow_science {
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
        .lists-con {
          padding: 0 40px;
          background: #fff;
          box-shadow: 0 3px 36px 0 #EDEDED;
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
  }
</style>
