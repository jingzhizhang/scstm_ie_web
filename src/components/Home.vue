<template>
  <div class="content">
    <home-swiper v-if="homeData.banner.length" :banners="homeData.banner"></home-swiper>
    <bg>
      <div class="wrap clearfix">
        <div class="wrap-left">
          <div class="l-top wow fadeInUp" data-wow-duration="3s" data-wow-delay=".2s">
            <!--<img src="../assets/mkx_bg.jpg"/>-->
            <div class="swiper-list">
              <swiper :options="mkxOption">

                <swiper-slide
                  v-for="(item,index) in homeData.future_banners"
                  :key="index">
                  <div  class="bg-img"
                     :style="{background: 'url('+item.banner+') no-repeat center'}"></div>
                </swiper-slide>

              </swiper>
            </div>
            <div class="news mkx-news">
              <div class="title clearfix">
                <h2>美科新未来学院</h2>
                <router-link to='/mkx_school/school_course'>
                <span>
                  <Icon type="ios-arrow-right"></Icon>
                </span>
                </router-link>
              </div>
              <div class="news-list">
                <ul v-if="homeData.future.length">
                  <li v-for="(item,index) in homeData.future" :key="index">
                    <!--<p class="date">
                      <span class="day">30</span>
                      <span class="month">2017.10</span>
                    </p>-->
                    <router-link target="_blank" :to="{path:'/mkx_school/mkx_detail',query:{id:item.id}}" class="info">
                      <div class="a-title clearfix">
                        <span class="info-title">{{item.title}}</span>
                        <img src="../assets/hot.png" v-if="item.hot===1" class="icon-status"/>
                        <img src="../assets/new.png" v-if="item.new===2" class="icon-status"/>
                      </div>

                      <span class="intr">{{item.introduce}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="l-bottom wow fadeInUp" data-wow-duration="3s" data-wow-delay=".3s">
            <div class="news edu-news">
              <div class="title clearfix">
                <h2>教育活动</h2>
                <router-link to='/edu_activity/all_course'>
                  <span>
                    <Icon type="ios-arrow-right"></Icon>
                  </span>
                </router-link>
              </div>
              <div class="news-list">
                <ul v-if="homeData.education.length">
                  <li v-for="(item,index) in homeData.education" :key="index">
                    <!--<p class="date">
                      <span class="day">30</span>
                      <span class="month">2017.10</span>
                    </p>-->
                    <router-link target="_blank" :to="{path:'/edu_activity/course_detail',query:{id:item.id}}"
                                 class="info">
                      <div class="a-title clearfix">
                        <span class="info-title">{{item.title}}</span>
                        <img src="../assets/hot.png" v-if="item.hot===1" class="icon-status"/>
                        <img src="../assets/new.png" v-if="item.new===2" class="icon-status"/>
                      </div>

                      <span class="intr">{{item.introduce}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="swiper-list">
              <swiper :options="eduOption">

                <swiper-slide
                  v-for="(item,index) in homeData.educations_banners"
                  :key="index">
                  <div  class="bg-img"
                        :style="{background: 'url('+item.banner+') no-repeat center'}"></div>
                </swiper-slide>

              </swiper>
            </div>
          </div>
        </div>
        <div class="wrap-right">
          <div class="r-top wow fadeInUp" data-wow-duration="3s" data-wow-delay=".2s">
            <ul class="clearfix">
              <li v-for="(item,index) in gudies" :key="index" :style="{background:'url('+item.bg+')'}">
                <a target="_blank" :href="item.href">
                  <div class="bg">
                    <img :src="item.rotateBg"/>
                  </div>
                  <div class="cont">
                    <h3>{{item.title}}</h3>
                    <p>{{item.intr}}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div class="r-bottom wow fadeInUp" data-wow-duration="3s" data-wow-delay=".3s">
            <div class="start-time" v-if="homeData.is_acc==1">
              <p class="t-title">开闭馆时间</p>
              <div class="time-group" v-if="homeData.time">
                <p class="time-item">
                  <span class="time">{{homeData.time.time_sta}}</span>
                  <span class="txt">开馆时间</span>
                </p>
                <p class="and">~</p>
                <p class="time-item">
                  <span class="time">{{homeData.time.time_end}}</span>
                  <span class="txt">闭馆时间</span>
                </p>
              </div>
              <div class="notice-txt">
                <vue-seam-less :data="homeData.switch" :class-option="optionLeft" class="seamless-warp2">
                  <ul class="item">
                    <li v-for="(item,index) in homeData.switch" :key="index">
                      {{item}}
                    </li>
                  </ul>
                </vue-seam-less>
              </div>
            </div>
            <div class="new-notice" v-if="homeData.is_acc==2">
              <p class="t-title">临时公告</p>
              <div class="notice-info">
                <vue-seam-less :data="homeData.advert" :class-option="optionLeft" class="seamless-warp2">
                  <ul class="item">
                    <li v-for="(item,index) in homeData.advert" :key="index">
                      {{item}}
                    </li>
                  </ul>
                </vue-seam-less>
              </div>
            </div>
            <div class="notice clearfix">
              <div class="n-title clearfix">
                <div class="tab-btn">
                  <h2 v-for="(item,index) in tabs"
                      :key="index"
                      :class="{active:current===index}"
                      @click="toggle(index)">
                    {{item}}
                  </h2>
                </div>
                <router-link to='/visit_serve/notice'>
                  <span>
                    <Icon type="ios-arrow-right"></Icon>
                  </span>
                </router-link>
              </div>
              <ul class="clearfix" v-if="current===0">
                <li v-for="(item,index) in homeData.inform" :key="index">
                  <router-link target="_blank" :to="{path:'/visit_serve/detail',query:{id:item.id,typeId:2}}">
                    {{item.title}}
                  </router-link>
                  <span>{{item.addtime}}</span>
                </li>
              </ul>
              <ul class="clearfix" v-if="current===1">
                <li v-for="(item,index) in homeData.news" :key="index">
                  <router-link :to="{path:'/visit_serve/detail',query:{id:item.id,typeId:1}}">
                    {{item.title}}
                  </router-link>
                  <span>{{item.addtime}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mask-img wow fadeInUp" data-wow-duration="3s" data-wow-delay=".8s">
          <img :src="homeData.latest"/>
        </div>
      </div>
      <div class="pithy clearfix wow fadeInUp" data-wow-duration="3s" data-wow-delay=".8s">
        <div class="pithy-left clearfix">
          <p class="title">展品精粹</p>
          <router-link class="exhibit" to="/exhibit/succinct">
            查看所有展品
          </router-link>
        </div>
        <div class="pithy-right">
          <swiper :options="collectOption">
            <swiper-slide v-for="(item,index) in homeData.collection" :key="index">
              <router-link class="lists" target="_blank" :to="{path:'/exhibit/succinct-detail',query:{id:item.id}}">
                <img :src="item.img"/>
                <h3 class="tit">{{item.title}}</h3>
              </router-link>
            </swiper-slide>
            <div class="prev" slot="button-prev">
              <Icon type="ios-arrow-left" class="swiper-icon"></Icon>
            </div>
            <div class="next" slot="button-next">
              <Icon type="ios-arrow-right" class="swiper-icon"></Icon>
            </div>
          </swiper>
        </div>
      </div>
    </bg>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAjax} from '@/public/js/config'
  import homeSwiper from '@/base/Home/swiper'
  import {Icon} from 'iview'
  import Bg from '@/base/bg'
  import vueSeamLess from 'vue-seamless-scroll'
  import 'swiper/dist/css/swiper.css'
  import '@/public/css/animate.min.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    components: {
      homeSwiper,
      Icon,
      Bg,
      vueSeamLess,
      swiper,
      swiperSlide,
    },
    data() {
      return {
        homeData: [],
        gudies: [
          {
            bg: '../static/images/guide_bg1.png',
            rotateBg: '../static/images/guide_item1.png',
            href: 'http://ticket.scstm.com/Book/OrderInfo.aspx',
            title: '在线预约',
            intr: '贴心的票务服务，让您省时省力更省心'
          },
          {
            bg: '../static/images/guide_bg2.png',
            rotateBg: '../static/images/guide_item2.png',
            href: '/visit_serve/strategy',
            title: '参观服务',
            intr: '从科技馆开始，感受宇宙魅力'
          },
          {
            bg: '../static/images/guide_bg3.png',
            rotateBg: '../static/images/guide_item3.png',
            href: '/exhibit/guide',
            title: '场馆导览',
            intr: '随时随地，为您提供身临其境的游览体验'
          },
        ],
        tabs: ['公告', '新闻'],
        current: 0,
        mkxOption: {
          spaceBetween: 5,
          speed: 600,
          //effect: 'flip',
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          loop: true,
        },
        eduOption: {
          speed: 600,
          //effect: 'flip',
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
        },
        collectOption:{
          slidesPerView: 3,
          spaceBetween: 13,
          loop: true,
          slidesPerGroup: 3,
          loopFillGroupWithBlank: true,
          speed: 600,
          navigation: {
            nextEl: '.prev',
            prevEl: '.next'
          }
        }
      }
    },
    computed: {
      optionLeft() {
        return {
          direction: 2,
          limitMoveNum: 1
        }
      }
    },
    created() {
      this.getHomeDate()
    },
    methods: {
      /**
       * 获取首页数据
       */
      getHomeDate() {
        const url = 'api/index'
        getAjax(url, {},
          (res) => {
            this.homeData = res.data
          }, (err) => {
            console.log(err)
          }, this)
      },

      toggle(index) {
        this.current = index
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .content {
    width: 100%;
    .wrap {
      width: 1400px;
      margin: 0 auto;
      padding-top: 50px;
      position: relative;
      .title {
        color: #fff;
        padding-top: 30px;
        a {
          float: right;
          color: #fff;
          width: 26px;
          height: 26px;
          border-radius: 4px;
          border: 1px solid #fff;
          font-size: 18px;
          line-height: 26px;
          text-align: center;
          margin-top: 6px;
          position: relative;
          z-index: 10;
        }
        h2 {
          float: left;
          font-size: 24px;
        }
      }
      .wrap-left {
        float: left;
        width: 854px;
        .swiper-list{
          width: 427px;
          height: 100%;
          float: left;
        }
        .l-top {
          width: 100%;
          height: 410px;
          position: relative;
          margin-bottom: 26px;
          overflow: hidden;
          /*img {*/
            /*width: 100%;*/
            /*min-height: 410px;*/
            /*transform: scale3d(1, 1, 1);*/
            /*transition: opacity 0.35s ease 0s, transform 0.35s ease 0s;*/
            /*&:hover {*/
              /*transform: scale3d(1.15, 1.15, 1);*/
            /*}*/
          /*}*/
          .mkx-news {
            width: 427px;
            height: 100%;
            background: url("../assets/mkx_bg.png") no-repeat;
            background-size: cover;
            float: left;
          }
        }
        .news {
          padding: 0 20px 20px 20px;
          overflow: hidden;
          color: #fff;
          .news-list {
            padding-top: 10px;
            ul {
              li {
                padding: 15px 0 16px 0;
                border-bottom: 1px dashed rgba(255, 255, 255, .8);
                color: #fff;
                .date {
                  display: inline-block;
                  vertical-align: middle;
                  width: 60px;
                  text-align: left;
                  margin-right: 8px;
                  .day {
                    font-size: 32px;
                    display: block;
                  }
                  .month {
                    font-size: 12px;
                    display: block;
                  }
                }
                .info {
                  display: inline-block;
                  vertical-align: bottom;
                  color: #fff;
                  width: 380px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  .a-title{
                    position: relative;
                    .info-title {
                      font-size: 17px;
                      display: inline-block;
                      vertical-align: middle;;
                      margin-bottom: 5px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                      max-width: 328px;
                      font-weight: bold;
                    }
                    .icon-status{
                      width: 22px;
                      display: inline-block;
                      vertical-align: middle;;
                      margin-top: -2px;
                    }
                  }
                  .intr {
                    font-size: 14px;
                    color: rgba(255, 255, 255, .9);
                  }
                }
                &:last-child {
                  border-bottom: none;
                }
              }
            }
          }
        }
        .l-bottom {
          height: 410px;
          width: 100%;
          margin-bottom: 26px;
          overflow: hidden;
          position: relative;
          /*img {*/
            /*float: right;*/
            /*overflow: hidden;*/
            /*width: 100%;*/
            /*height: 410px;*/
            /*transform: scale3d(1, 1, 1);*/
            /*transition: opacity 0.35s ease 0s, transform 0.35s ease 0s;*/
            /*&:hover {*/
              /*transform: scale3d(1.15, 1.15, 1);*/
            /*}*/
          /*}*/
          .edu-news {
            float: left;
            height: 100%;
            background: url("../assets/edu_bg.png") no-repeat;
            background-size: cover;
            width: 427px;
          }
        }
      }
      .wrap-right {
        float: right;
        width: 520px;
        .r-top {
          width: 100%;
          height: 300px;
          margin-bottom: 26px;
          overflow: hidden;
          ul {
            li {
              float: left;
              width: 173px;
              height: 300px;
              position: relative;
              overflow: hidden;
              background-size: cover !important;
              .bg {
                position: absolute;
                left: 62px;
                bottom: 60px;
                margin-top: -126px;
                width: 140px;
                img {
                  width: 100%;
                  height: 100%;
                  animation: swinging 30s linear 0s infinite;
                }
              }
              .ico {
                width: 90px;
                padding-top: 26px;
                margin: auto;
                position: relative;
                img {
                  text-align: center;
                  width: 100%;
                  height: 100%;
                }
              }
              .cont {
                padding: 0 20px;
                color: #fff;
                position: relative;
                z-index: 2;
                text-align: left;
                h3 {
                  font-size: 22px;
                  line-height: 1.2;
                  color: #fff;
                  margin-top: 25px;
                  margin-bottom: 15px;
                  font-weight: bold;
                }
                p {
                  line-height: 22px;
                  color: #fff;
                  font-size: 14px;
                }
              }
            }
          }
        }
        .r-bottom {
          width: 100%;
          height: 520px;
          margin-bottom: 26px;
          padding: 30px 40px 20px 40px;
          background: url("../assets/notice_bg.png") no-repeat;
          background-size: cover;
          overflow: hidden;
          .t-title {
            font-size: 24px;
            color: #fff;
            margin-bottom: 25px;
          }
          .start-time{
            position: relative;
          }
          .time-group {
            .time-item {
              background: rgba(255, 255, 255, .3);
              border: 1px solid #fff;
              padding: 4px 50px;
              -webkit-border-radius: 4px;
              -moz-border-radius: 4px;
              border-radius: 4px;
              color: #fff;
              display: inline-block;
              vertical-align: middle;
              text-align: center;
              .time {
                font-size: 30px;
                font-weight: bold;
                display: block;
              }
              .txt {
                font-size: 14px;
              }
            }
            .and {
              display: inline-block;
              vertical-align: middle;
              color: #fff;
              font-size: 40px;
              margin: 0 10px;
            }
          }
          .notice-txt{
            color: #fff;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            width: 422px;
            position: absolute;
            .seamless-warp2 {
              overflow: hidden;
              height: 40px;
              width: 100%;
              line-height: 40px;
              ul.item {
                width: 420px;
                li {
                  float: left;
                  margin-right: 2px;
                  font-size: 17px;
                }
              }
            }
          }
          .notice-info {
            background: rgba(255, 255, 255, .3);
            border: 1px solid #fff;
            padding: 9px 9px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            color: #fff;
            display: inline-block;
            vertical-align: middle;
            text-align: center;
            width: 100%;
            .seamless-warp2 {
              overflow: hidden;
              height: 40px;
              width: 100%;
              line-height: 40px;
              ul.item {
                width: 580px;
                li {
                  float: left;
                  margin-right: 10px;
                  font-size: 20px;
                }
              }
            }
          }
          .notice {
            .n-title {
              padding-top: 60px;
              .tab-btn {
                float: left;
                font-size: 24px;
                color: #fff;
                h2 {
                  float: left;
                  margin-right: 20px;
                  cursor: pointer;
                  color: #5f5f5f;
                  &:hover {
                    color: #fff;
                  }
                  &.active {
                    color: #fff;
                  }
                }
              }
              a {
                float: right;
                color: #fff;
                width: 26px;
                height: 26px;
                border-radius: 4px;
                border: 1px solid #fff;
                font-size: 18px;
                line-height: 26px;
                text-align: center;
                margin-top: 6px;
                position: relative;
                z-index: 10;
              }
            }
            ul {
              margin-top: 5px;
              li {
                padding: 15px 0 10px 0;
                border-bottom: 1px dashed rgba(255, 255, 255, .8);
                color: #fff;
                span {
                  float: right;
                  font-size: 14px;
                  line-height: 25px;
                  display: inline-block;
                  vertical-align: middle;
                }
                a {
                  color: #fff;
                  font-size: 17px;
                  height: 25px;
                  line-height: 25px;
                  width: 330px;
                  display: inline-block;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  vertical-align: middle;
                  font-weight: bold;
                }
                &:last-child {
                  border-bottom: none;
                }
              }
            }
          }
        }
      }
      .mask-img {
        position: absolute;
        width: 400px;
        top: 260px;
        left: 30px;
        z-index: 100;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .pithy{
      width: 1400px;
      margin: 0 auto;
      padding-bottom: 50px;
      position: relative;
      .pithy-left{
        background: url("../assets/zpbg.png") no-repeat center center;
        background-size: cover !important;
        width: 250px;
        height: 250px;
        text-align: center;
        float: left;
        .title{
          font-size: 26px;
          color: #fff;
          margin-top: 50px;
          text-align: center;
          margin-bottom: 40px;
        }
        .exhibit{
          border:1px solid #fff;
          padding: 12px 20px;
          background: #68d5f6;
          color: #fff;
          font-size: 20px;
          border-radius: 4px;
          display: inline-block;
          text-align: center;
        }
      }
      .pithy-right{
        position: relative;
        float: right;
        width: 1125px;
        height: 250px;
        overflow: hidden;
        .swiper-slide{
          height: 250px !important;
          overflow: hidden;
          a{
            height: 100%;
            display: block;
            position: relative;
            img{
              height: 100%;
            }
            .tit{
              position: absolute;
              text-align: center;
              height: 50px;
              color: #fff;
              font-size: 20px;
              line-height: 50px;
              bottom: 0;
              background: linear-gradient(to bottom, rgba(27, 32, 41, 0) 0, rgba(27, 32, 41, 0.6) 55%, rgba(27, 32, 41, 0.6) 100%);
              width: 100%;
              font-weight: normal;
            }
          }
        }
        .next,.prev{
          position: absolute;
          top:50%;
          margin-top: -27px;
          z-index: 100;
          .swiper-icon {
            color: #fff;
            cursor: pointer;
            font-size: 55px;
            text-align: center;
            text-shadow: 0 0 10px #bab7b7;
          }
        }
        .prev{
          left: 20px;
        }
        .next{
          right: 20px;
        }
      }
    }
  }

  @-moz-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.2) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.2) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @-o-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.2) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.2) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @-webkit-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.2) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.2) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @-ms-keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.2) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.2) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }

  @keyframes swinging {
    0% {
      -webkit-transform: scale(1);
    }
    10%, 20% {
      -webkit-transform: scale(0.9) rotate(-20deg);
    }
    30%, 50%, 70%, 90% {
      -webkit-transform: scale(1.2) rotate(20deg);
    }
    40%, 60%, 80% {
      -webkit-transform: scale(1.2) rotate(-20deg);
    }
    100% {
      -webkit-transform: scale(1) rotate(0);
    }
  }
</style>
