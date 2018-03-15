<template>
  <div class="content">
    <swiper v-if="homeData.banner.length" :banners="homeData.banner"></swiper>
    <bg>
      <div class="wrap clearfix">
        <div class="wrap-left">
          <div class="l-top wow fadeInUp" data-wow-duration="3s" data-wow-delay=".2s">
            <img src="../assets/mkx_bg.jpg"/>
            <div class="news mkx-news">
              <div class="title clearfix">
                <h2>美科新学院</h2>
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
                      <span class="info-title">{{item.title}}</span>
                      <span class="intr">{{item.introduce}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="l-bottom wow fadeInUp" data-wow-duration="3s" data-wow-delay=".3s">
            <img src="../assets/edu_bg.jpg"/>
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
                    <router-link target="_blank" :to="{path:'/edu_activity/course_detail',query:{id:item.id}}" class="info">
                      <span class="info-title">{{item.title}}</span>
                      <span class="intr">{{item.introduce}}</span>
                    </router-link>
                  </li>
                </ul>
              </div>
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
            <div class="notice">
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
    </bg>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAjax} from '@/public/js/config'
  import Swiper from '@/base/Home/swiper'
  import {Icon} from 'iview'
  import Bg from '@/base/bg'
  import vueSeamLess from 'vue-seamless-scroll'

  export default {
    components: {
      Swiper,
      Icon,
      Bg,
      vueSeamLess
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
        current: 0
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
      padding-bottom: 50px;
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
        .l-top {
          width: 100%;
          height: 410px;
          position: relative;
          margin-bottom: 26px;
          overflow: hidden;
          img {
            width: 100%;
            min-height: 410px;
            transform: scale3d(1, 1, 1);
            transition: opacity 0.35s ease 0s, transform 0.35s ease 0s;
            &:hover {
              transform: scale3d(1.15, 1.15, 1);
            }
          }
          .mkx-news {
            position: absolute;
            width: 362px;
            right: 0;
            top: 0;
            bottom: 0;
            background: url("../assets/mkx_bg.png") no-repeat;
            background-size: cover;
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
                  width: 278px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  .info-title {
                    font-size: 17px;
                    display: block;
                    margin-bottom: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
          img {
            float: right;
            overflow: hidden;
            width: 100%;
            height: 410px;
            transform: scale3d(1, 1, 1);
            transition: opacity 0.35s ease 0s, transform 0.35s ease 0s;
            &:hover {
              transform: scale3d(1.15, 1.15, 1);
            }
          }
          .edu-news {
            position: absolute;
            top: 0;
            left: 0;
            background: url("../assets/edu_bg.png") no-repeat;
            background-size: cover;
            bottom: 0;
            width: 362px;
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
          .time-group {
            .time-item {
              background: rgba(255, 255, 255, .3);
              border: 1px solid #fff;
              padding: 9px 50px;
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
              padding-top: 30px;
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
        left: 60px;
        img {
          width: 100%;
          height: 100%;
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
