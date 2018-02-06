<template>
  <div class="clips">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in data" :key="index">
        <img :src="item" @click="chooseImg(item)"/>
      </swiper-slide>
    </swiper>
    <p class="next" slot="button-next">
      <Icon type="ios-arrow-right" class="swiper-icon"></Icon>
    </p>
    <p class="prev" slot="button-prev">
      <Icon type="ios-arrow-left" class="swiper-icon"></Icon>
    </p>
    <div class="mask" @click="close" v-if="isChoose">
      <div class="img-box">
        <div class="box">
          <div class="img-item" :class="{active:isChoose}">
            <img :src="img"/>
            <!--<span @click="close" class="close">-->
               <!--<Icon type="ios-close"></Icon>-->
            <!--</span>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import 'swiper/dist/css/swiper.css'
  import {Icon} from 'iview'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'

  export default {
    props: {
      data: {
        type: Array,
        default: ''
      }
    },
    components: {
      swiper,
      swiperSlide,
      Icon
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          centeredSlides: false,
          spaceBetween: 13,
          navigation: {
            nextEl: '.next',
            prevEl: '.prev'
          }
        },
        img: '',
        isChoose: false
      }
    },
    methods: {
      chooseImg(img) {
        this.isChoose = !this.isChoose
        this.img = img
      },
      close(){
        this.isChoose = !this.isChoose
      }
    }
  }
</script>
<style lang="less" scoped>
  .clips {
    width: 100%;
    position: relative;
    .swiper-slide {
      width: 290px !important;
      height: 192px;
      text-align: center;
      line-height: 190px;
      img {
        width: 100%;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        cursor: pointer;
      }
    }
    .next {
      width: 35px;
      height: 70px;
      background: #bfbfbf;
      position: absolute;
      top: 50%;
      margin-top: -35px;
      right: -50px;
      text-align: center;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      cursor: pointer;
      z-index: 111;
    }
    .prev {
      width: 35px;
      height: 70px;
      background: #bfbfbf;
      position: absolute;
      top: 50%;
      margin-top: -35px;
      left: -50px;
      text-align: center;
      cursor: pointer;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      z-index: 111;
    }
    .swiper-icon {
      color: #fff;
      cursor: pointer;
      font-size: 30px;
      text-align: center;
      line-height: 70px;
    }
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .3);
      z-index: 111;
      .img-box {
        width: 100%;
        height: 100%;
        display: table;
        .box {
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          .img-item {
            width: 0;
            border: 6px solid #fff;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            margin: auto;
            position: relative;
            transition: all 1s ease 0s;
            &.active{
              width: 650px;
            }
            img {
              width: 100%;
            }
            .close {
              position: absolute;
              font-size: 30px;
              top: -20px;
              right: -17px;
              color: #666;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>
