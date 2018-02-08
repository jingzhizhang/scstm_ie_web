<template>
  <li class="item">
    <p class="date">
      <span class="day">{{dateStr.slice(-2)}}</span>
      <span class="month">{{dateStr.slice(0, -3)}}</span>
    </p>
    <router-link :to="{path:'/visit_serve/detail',query:{id:data.id,typeId:typeId}}" class="info">
      <div class="a-title">
        <span class="info-title">{{data.title}}</span>
        <img src="../../assets/top.png" v-if="data.up===1" class="icon-type"/>
        <img src="../../assets/hot.png" v-if="data.hot===1" class="icon-type"/>
        <img src="../../assets/new.png" v-if="data.new===1" class="icon-type"/>
      </div>
      <span class="intr">{{data.introduce}}</span>
    </router-link>
  </li>
</template>
<script>
  import moment from 'moment'

  export default {
    props: {
      data: {
        type: Object,
        default: ""
      },
      typeId: {
        type: Number,
        default: ''
      }
    },
    data() {
      return {}
    },
    created() {

    },
    computed: {
      dateStr() {
        return moment(this.data.addtime).format('YYYY.MM.DD')
      }
    }
  }
</script>
<style lang="less">
  .notice-list {
    li.item {
      padding: 30px 0;
      border-bottom: 1px dashed #d4d4d4;
      color: #fff;
      .date {
        display: inline-block;
        vertical-align: middle;
        width: 60px;
        text-align: left;
        margin-right: 8px;
        color: #05afee;
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
        vertical-align: middle;
        color: #fff;
        width: 645px;
        .a-title{
          position: relative;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .info-title {
            font-size: 22px;
            margin-bottom: 5px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-right: 5px;
            display: inline-block;
            vertical-align: middle;
          }
          .icon-type{
            width: 60px;
            display: inline-block;
            vertical-align: middle;
            margin-top: -2px;
          }
        }
        .intr {
          font-size: 15px;
          color: #666;
          display: block;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>
