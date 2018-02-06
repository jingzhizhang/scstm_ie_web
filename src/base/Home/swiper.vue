<template>
  <div class="swiper-con">
    <swiper :options="swiperOption">

      <swiper-slide
        v-for="(item,index) in banners"
        :key="index">
        <a target="_blank" :href="item.url" class="bg-img"
           :style="{background: 'url('+item.banner+') no-repeat center'}"></a>
        <!-- <h2 class="ani top" swiper-animate-effect="fadeInUp" swiper-animate-duration="1.5s" swiper-animate-delay="0.2s">
           让科学流行起来</h2>
         <p class="ani" swiper-animate-effect="fadeInUp" swiper-animate-duration="1.5s" swiper-animate-delay="0.4s">
           四川科技馆全新启幕</p>-->
      </swiper-slide>

      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>

      <Icon type="ios-arrow-right" class="swiper-icon swiper-next" slot="button-next"></Icon>
      <Icon type="ios-arrow-left" class="swiper-icon swiper-prev" slot="button-prev"></Icon>
      <div class="mask" slot="button-prev"></div>

    </swiper>
  </div>
</template>
<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css'
  import '@/public/css/animate.min.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {Icon} from 'iview'

  export default {
    props: {
      banners: {
        default: ''
      }
    },
    components: {
      swiper,
      swiperSlide,
      Icon
    },
    data() {
      const _this = this
      return {
        swiperOption: {
          spaceBetween: 5,
          speed: 600,
          effect: 'fade',
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet(index, className) {
              return `<div class="silde-item ${className} ">
                        <span class="swiper-pagination-bullet-custom"></span>
                        <p class="txt">${_this.banners[index].note}</p>
                      </div>`
            }
          },
          navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev'
          },
          on: {
            init: function () {
              swiperAnimateCache(this); //隐藏动画元素
              swiperAnimate(this); //初始化完成开始动画
            },
            slideChangeTransitionEnd: function () {
              swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
            }
          }
        }
      }
    },

    mounted() {
      //console.log(this.banners)
    }
  }
</script>
<style lang="less">
  .swiper-con {
    width: 100%;
    height: 850px;
    position: relative;
    .swiper-icon {
      position: absolute;
      bottom: 41px;
      display: block;
      color: #fff;
      z-index: 100;
      cursor: pointer;
      font-size: 50px;
    }
    .swiper-next {
      right: 15px;
    }
    .swiper-prev {
      left: 15px;
    }
    .mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 230px;
      background: #000;
      z-index: 10;
      background: -moz-linear-gradient(top, rgba(27, 32, 41, 0) 0, rgba(27, 32, 41, .85) 55%, rgba(27, 32, 41, .85) 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(27, 32, 41, 0)), color-stop(55%, rgba(27, 32, 41, .85)), color-stop(100%, rgba(27, 32, 41, .85)));
      background: -webkit-linear-gradient(top, rgba(27, 32, 41, 0) 0, rgba(27, 32, 41, .85) 55%, rgba(27, 32, 41, .85) 100%);
      background: -o-linear-gradient(top, rgba(27, 32, 41, 0) 0, rgba(27, 32, 41, .85) 55%, rgba(27, 32, 41, .85) 100%);
      background: -ms-linear-gradient(top, rgba(27, 32, 41, 0) 0, rgba(27, 32, 41, .85) 55%, rgba(27, 32, 41, .85) 100%);
      background: linear-gradient(to bottom, rgba(27, 32, 41, 0) 0, rgba(27, 32, 41, .85) 55%, rgba(27, 32, 41, .85) 100%);
    }
  }

  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    .bg-img {
      width: 100%;
      height: 850px;
      display: block;
    }

    h2 {
      font-size: 45px;
      color: #fff;
      text-align: right;
      font-weight: 700;
      margin-right: 200px;
      margin-top: 350px;
    }
    p {
      font-size: 25px;
      color: rgba(255, 255, 255, .9);
      text-align: right;
      margin-top: 20px;
      margin-right: 200px;
    }
  }

  .swiper-pagination {
    bottom: 24px !important;
    z-index: 100 !important;
    &:after {
      content: '';
      position: absolute;
      border: 1px dashed rgba(255, 255, 255, .3);
      bottom: 41px;
      width: 100%;
      left: 0;
      z-index: -1;
    }
    .silde-item {
      width: 150px;
      display: inline-block;
      .txt {
        color: #fff;
        margin-top: 5px;
        //transition: all .2s linear;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &.swiper-pagination-bullet-active {
        background: none;
        .swiper-pagination-bullet-custom {
          color: #fff;
          background: #29bcff;
          border: 1px solid #fff;
          width: 20px;
          height: 20px;
        }
        .txt {
          color: #29bcff;
        }
      }
      &.swiper-pagination-bullet {
        opacity: 1;
        background: none;
      }
      &:hover {
        .swiper-pagination-bullet-custom {
          color: #fff;
          background: #29bcff;
          border: 1px solid #fff;
          width: 20px;
          height: 20px;
        }
        .txt {
          color: #29bcff;
        }
      }
    }
  }

  .swiper-pagination-bullet-custom {
    width: 19px;
    height: 19px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: #000;
    opacity: 1;
    border: 1px dashed rgba(255, 255, 255, .6);
    background: rgba(5, 71, 97, 1);
    display: inline-block;
    border-radius: 50%;
    //transition: all .2s linear;
  }
</style>
