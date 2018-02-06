<template>
  <div class="patch-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="patch-list">
      <div class="info-con">
        <nav-bar :navBar="navBar"
                 @handleClick="handleTypeClick">
        </nav-bar>
        <div class="lists">
          <patch-item v-if="patchData"
                      v-for="(item,index) in patchData.data"
                      :key="index"
                      :data="item">
          </patch-item>
        </div>
        <Pagination v-if="patchData.total"
                    :total="patchData.total*10"
                    :page="page"
                    @handleChange="handlePage">
        </Pagination>
        <no-data v-if="!patchData.data"></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import NavBar from '@/base/navBar'
  import PatchItem from '@/base/patch/patch_item'
  import Pagination from '@/base/pagination'
  import {getAjax} from '@/public/js/config'
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      NavBar,
      PatchItem,
      Pagination,
      Banner,
      Bg,
      NoData
    },
    data() {
      return {
        navBar: [
          {title: '正在展览', id: 1},
          {title: '即将展览', id: 2},
          {title: '展览回顾', id: 3},
        ],
        patchData: '',
        page: 1,  //页码
        type: 1,   //查询条件
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
      }
    },
    created() {
      this.getBanner()
      this.getPatchList()
    },
    methods: {
      handlePage(page) {
        this.page = page
        this.getPatchList()
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this.page = 1
        this.getPatchList()
      },
      /**
       * 获取临展信息列表
       */
      getPatchList() {
        const url = 'api/showlists'
        getAjax(url, {
            page: this.page,
            type: this.type
          },
          (res) => {
            this.patchData = res.data
          }, (err) => {
            console.log(err)
          }, this)
      },
      /**
       * 获取临时展览banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/tembanner'})
      }
    }
  }
</script>
<style scoped lang="less">
  .patch-list {
    padding-top: 50px;
    padding-bottom: 60px;
    .info-con {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
