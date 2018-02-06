<template>
  <div class="su_type-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="su-detail">
      <div class="detail-con">
        <p class="title" v-if="succinctDetail.data">{{succinctDetail.classname}}<span></span></p>
        <ul class="detail-list clearfix">
          <succinct-item
            v-for="(item,index) in succinctDetail.data"
            :key="index"
            :data="item">
          </succinct-item>
        </ul>
        <Pagination
          v-if="succinctDetail.total"
          :total="succinctDetail.total*10"
          :page="page"
          @handleChange="handlePage">
        </Pagination>

        <no-data v-if="!succinctDetail.data"></no-data>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import {getAjax} from '@/public/js/config'
  import SuccinctItem from '@/base/exhibit/succinct_item'
  import Pagination from '@/base/pagination'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      SuccinctItem,
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
        succinctDetail: '',
        page: 1
      }
    },
    created() {
      this.getExhibitList()
      this.getBanner()
    },
    methods: {
      /**
       * 获取藏品精粹banner
       * @param id  分类id
       */
      getBanner(id = 3) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      },
      /**
       * 获取分类列表
       */
      getExhibitList() {
        const url = 'api/collectionlists'
        getAjax(url, {
          clas: parseInt(this.$route.query.id),
          page: this.page
        }, (res) => {
          this.succinctDetail = res.data
        }, (err) => {
          console.log(err)
        }, this)
      },
      /**
       * 获取分页页码
       * @param page
       */
      handlePage(page) {
        this.page = page
        this.getExhibitList()
      },
    }
  }
</script>
<style lang="less">
  .su-detail {
    width: 100%;
    .detail-con {
      width: 1200px;
      margin: 0 auto;
      padding-top: 50px;
      padding-bottom: 60px;
      .title {
        font-size: 22px;
        color: #666;
        text-align: center;
        margin-bottom: 50px;
        letter-spacing: 2px;
        span {
          width: 90px;
          height: 4px;
          display: block;
          margin: 10px auto;
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
        }
      }
      .detail-list {
        width: 100%;
      }
    }
  }
</style>
