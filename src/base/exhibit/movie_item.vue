<template>
  <div class="m-info clearfix">
    <router-link :to="{path:'/exhibit/theater-detail',query:{id:data.id}}" class="movie-img">
      <img v-lazy="data.img"/>
    </router-link>
    <div class="m-txt">
      <h2 class="m-title">
        <router-link :to="{path:'/exhibit/theater-detail',query:{id:data.id}}">
          {{data.title}}
          <span class="mold">{{data.type}}</span>
        </router-link>
      </h2>
      <p class="address">
        <Icon type="ios-location-outline" class="location"></Icon>
        {{data.address}}
      </p>
      <p class="m-time">
        <Icon type="ios-timer-outline" class="time"></Icon>
        {{data.length}}
      </p>
      <p class="m-time">
        <Icon type="ios-calendar-outline" class="time"></Icon>
        {{data.time}}
      </p>
      <p class="intr">
        {{data.introduce}}
      </p>
      <!--<p class="btn-book">立即预定</p>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Icon} from 'iview'

  export default {
    props: {
      data: {
        type: Object,
        default: ''
      }
    },
    components: {
      Icon,
    },
    data() {
      return {}
    }
  }
</script>
<style scoped lang="less">
  .m-info {
    margin-bottom: 25px;
    .movie-img{
      width: 340px;
      overflow: hidden;
      height: 460px;
      float: left;
      border: 8px solid #fff;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      box-shadow: 0 3px 36px 0 #EDEDED;
      text-align: center;
      line-height: 460px;
      img{
        width: 100%;
        height: 462px;
      }
    }
    .m-txt {
      float: left;
      margin-top: 60px;
      margin-left: 40px;
      width: 810px;
      text-align: justify;
      .m-title {
        font-size: 30px;
        color: #333;
        margin-bottom: 15px;
        a {
          color: #333;
          &:hover {
            color: #28bbff;
          }
        }
        .mold {
          font-size: 14px;
          background-image: -webkit-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
          background-image: -moz-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
          background-image: -o-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
          background-image: -ms-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
          background-image: linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
          padding: 0 15px;
          height: 25px;
          margin-left: 10px;
          display: inline-block;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          vertical-align: middle;
          text-align: center;
          line-height: 25px;
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
        color: #5e6d84;
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
        color: #9a9a9a;
        line-height: 28px;
        margin-top: 10px;
        margin-bottom: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
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
</style>
