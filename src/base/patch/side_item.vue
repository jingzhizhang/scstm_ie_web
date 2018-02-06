<template>
  <li class="exhibit-item">
    <router-link :to="{path:'/patch/patch-detail',query:{id:data.id}}" class="item-img">
      <img v-lazy="data.img"/>
    </router-link>
    <div class="m-txt">
      <h2 class="m-title">
        <router-link :to="{path:'/patch/patch-detail',query:{id:data.id}}">{{data.title}}</router-link>
      </h2>
      <p class="m-time">
        <Icon type="ios-calendar-outline" class="time"></Icon>
        {{data.time}}
      </p>
      <p class="address">
        <Icon type="ios-location-outline" class="location"></Icon>
        {{data.address}}
      </p>
      <p class="intr">
        {{data.introduce}}
      </p>
    </div>
  </li>
</template>
<script>
  import {Icon} from 'iview'

  export default {
    props: {
      data: {
        type: Object,
        default: ''
      }
    },
    components: {
      Icon
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  li.exhibit-item {
    margin-top: 15px;
    padding-bottom: 5px;
    border-bottom: 1px dashed #d4d4d4;
    .item-img{
      width: 300px;
      height: 200px;
      text-align: center;
      border-radius: 4px;
      line-height: 200px;
      overflow: hidden;
    }
    img {
      width: 100%;
    }
    .m-txt {
      margin-top: 20px;
      text-align: justify;
      width: 100%;
      .m-title {
        font-size: 24px;
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
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          width: 46px;
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
        margin-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
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
      .keywords {
        color: #a3a3a3;
        display: inline-block;
        span {
          display: inline-block;
          margin-right: 10px;
          padding: 10px 20px;
          background: #f0f0f0;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
</style>
