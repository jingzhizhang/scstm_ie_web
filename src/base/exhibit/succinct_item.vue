<template>
  <li>
    <div class="item-img">
      <img v-lazy="data.img"/>
      <div class="mask">
        <div class="mask-con">
          <p class="mask-txt">
            <router-link :to="{path:'/exhibit/succinct-detail',query:{id:data.id}}">查看详情</router-link>
          </p>
        </div>
      </div>
    </div>
    <p class="txt">{{data.title}}</p>
  </li>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Object,
        default: ""
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .detail-list {
    li {
      width: 385px;
      position: relative;
      background: #fff;
      border-radius: 2px;
      overflow: hidden;
      margin-right: 20px;
      margin-bottom: 20px;
      float: left;
      cursor: pointer;
      box-shadow: 0 3px 36px 0 #EDEDED;
      &:nth-child(3n) {
        margin-right: 0;
      }
      .item-img {
        width: 385px;
        height: 257px;
        text-align: center;
        line-height: 257px;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
        }
        .mask {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          background: rgba(0, 0, 0, .6);
          z-index: 100;
          opacity: 0;
          transition: opacity .6s ease 0s;
          cursor: default;
          .mask-con {
            width: 100%;
            padding: 0 50px;
            height: 100%;
            .mask-txt {
              font-size: 15px;
              letter-spacing: 1.5px;
              text-align: center;
              width: 140px;
              height: 40px;
              margin: auto;
              background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: linear-gradient(135deg, #00d0fb, #00acf6);
              border-radius: 4px;
              line-height: 40px;
              margin-top: 108px;
              cursor: pointer;
              a {
                color: #fff;
                display: block;
              }
            }
          }
          &:hover {
            opacity: 1;
          }
        }
      }
      .txt {
        height: 50px;
        width: 100%;
        text-align: center;
        line-height: 50px;
        padding: 0 10px;
        color: #333;
        font-size: 16px;
      }
    }
  }
</style>
