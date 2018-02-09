<template>
  <li class="item">
    <p class="date">
      <span class="day">{{dateStr.slice(-2)}}</span>
      <span class="month">{{dateStr.slice(0, -3)}}</span>
    </p>
    <router-link target="_blank" :to="{path:'/patch/flow-detail',query:{id:data.id}}" class="info">
      <span class="info-title">{{data.title}}</span>
      <span
        class="intr">{{data.introduce}}</span>
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
      }
    },
    data() {
      return {}
    },
    created() {
    },
    computed: {
      dateStr() {
        return moment.unix(this.data.addtime).format('YYYY.MM.DD')
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
        .info-title {
          font-size: 22px;
          display: block;
          margin-bottom: 5px;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
