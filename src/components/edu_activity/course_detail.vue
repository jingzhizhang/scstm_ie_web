<template>
  <div class="th_detail-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="movie-detail" v-if="courseDetail.status===0">
        <div class="m-info clearfix">
          <div class="de-img">
            <img :src="courseDetail.data.img"/>
          </div>
          <div class="m-txt">
            <h2 class="m-title">
              {{courseDetail.data.title}}
              <span class="mold" v-for="(item,index) in courseDetail.data.courseclass"
                    :key="index">
                {{item}}
              </span>
            </h2>
            <p class="address">
              <Icon type="ios-location-outline" class="location"></Icon>
              {{courseDetail.data.address}}
            </p>
            <p class="m-time">
              <Icon type="ios-timer-outline" class="time"></Icon>
              {{courseDetail.data.time}}
            </p>
            <p class="intr">
              简介：{{courseDetail.data.introduce}}
            </p>
            <!--<p class="btn-book">立即预定</p>-->
          </div>
        </div>
        <order-box :details="courseDetail ? courseDetail : {}" typeVal="3"></order-box>
        <div class="movie-clips clearfix" v-if="courseDetail.data.content">
          <p class="title">活动内容</p>
          <div class="act-content" v-html="courseDetail.data.content">

          </div>
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Icon} from 'iview'
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import {getAjax} from '@/public/js/config'
  import Bg from '@/base/bg'
  import OrderBox from '@/base/order-box'

  export default {
    mixins: [getBannerMixin],
    components: {
      Icon,
      Banner,
      Bg,
      OrderBox
    },
    data() {
      return {
        courseDetail: '',
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
      this.getDetailData()
    },
    methods: {
      /**
       * 获取全部课程banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/educationbanner'})
      },

      getDetailData() {
        const url = 'api/educationdeta'
        getAjax(url, {
          id: this.$route.query.id
        }, (res) => {
          this.courseDetail = res
        }, (err) => {
          console.log(err)
        }, this)
      }
    }
  }
</script>
<style scoped lang="less">
  .movie-detail {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    .m-info {
      .de-img{
        width: 450px;
        height: 320px;
        float: left;
        overflow: hidden;
        border: 8px solid #fff;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        box-shadow: 0 3px 36px 0 #EDEDED;
        img {
          width: 100%;
        }
      }
      .m-txt {
        float: left;
        margin-top: 40px;
        margin-left: 40px;
        width: 710px;
        text-align: justify;
        .m-title {
          font-size: 30px;
          color: #333;
          margin-bottom: 15px;
          .mold {
            font-size: 14px;
            background-image: -webkit-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -moz-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -o-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -ms-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            padding: 0 15px;
            height: 28px;
            margin-left: 10px;
            display: inline-block;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            vertical-align: middle;
            text-align: center;
            line-height: 28px;
            color: #fff;
          }
        }
        .address {
          color: #28bbff;
          font-size: 16px;
          margin-bottom: 10px;
          .location {
            width: 18px;
            font-size: 20px;
            font-weight: bold;
            margin-right: 5px;
          }
        }
        .m-time {
          color: #596781;
          font-size: 16px;
          margin-bottom: 10px;
          .time {
            width: 18px;
            font-size: 20px;
            font-weight: bold;
            margin-right: 5px;
          }
        }
        .intr {
          font-size: 16px;
          color: #596781;
          line-height: 28px;
          margin-top: 10px;
          margin-bottom: 30px;
        }
        .btn-book {
          width: 130px;
          height: 45px;
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          text-align: center;
          line-height: 45px;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .movie-clips {
      padding-top: 80px;
      padding-bottom: 50px;
      .title {
        font-size: 25px;
        color: #333;
        margin-bottom: 20px;
      }
      .act-content{
        border:1px solid #fff;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        box-shadow: 0 3px 36px 0 #EDEDED;
        padding: 30px 20px;
        color: #596781;
        background: #fff;
      }
    }
  }
</style>
