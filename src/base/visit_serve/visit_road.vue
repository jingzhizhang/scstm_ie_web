<template>
  <div class="visit-road">
    <ul class="ways clearfix">
      <li v-for="(item,index) in roadTypes"
          :key="index"
          @click="toggle(index,item.id)"
          :class="{active:index===current}">
        <img :src="item.img" class="head-img"/>
        <p>{{item.people}}</p>
      </li>
    </ul>
    <div class="road">
      <ul class="clearfix">
        <li>
          <img :src="showImg"/>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

  export default {
    props: {
      roadTypes: {
        type: Array,
        default: ""
      },
      showImg: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        current: 0
      }
    },
    methods: {
      toggle(index, id) {
        this.current = index
        this.$emit('toggle', id)
      },
    }
  }
</script>
<style lang="less">
  .visit-road {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 3px 36px 0 #EDEDED;
    padding: 60px 45px 45px 45px;
    .ways {
      text-align: center;
      li {
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        max-width: 140px;
        cursor: pointer;
        margin-right: 60px;
        position: relative;
        .head-img {
          width: 117px;
          border-radius: 50%;
          transition: all .3s;
        }
        p {
          font-size: 16px;
          color: #333;
          margin-top: 10px;
        }
        &.active {
          .head-img {
            box-shadow: 0 0 10px #000;
          }
          p {
            color: #00d0fb;
          }
        }
        /*.spot{
          position: absolute;
          width: 0;
          height: 0;
          border-width: 15px;
          border-style: solid;
          left: 50%;
          margin-left: -15px;
          border-color:transparent transparent #75defe transparent;
        }*/
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .road {
      position: relative;
      width: 100%;
      margin-top: 30px;
      ul {
        li {
          width: 100%;
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
  }
</style>

