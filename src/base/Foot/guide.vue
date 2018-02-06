<template>
  <div class="bottom-nav">
    <div class="clearfix layout">
      <ul class="bottom-nav-con">
        <li class="wow fadeInUp"
            data-wow-duration="2.5s"
            :data-wow-delay="(0.2 + 0.15 * index).toFixed(1)+'s'"
            v-for="(item,index) in guides"
            :key="index"
            :class="item.className">
          <img :src="item.icon"/>
          <div class="guide-btn">
            <router-link :to="item.href" tag="p" class="ch_title">{{item.ch_title}}</router-link>
            <router-link :to="item.href" tag="p" class="en_title">{{item.en_title}}</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        guides: [
          {
            href: '/visit_serve/strategy',
            className: 'traffic',
            ch_title: '交通攻略',
            en_title:'Traffic Strategy',
            icon: '../static/images/bg1.jpg'
          },
          {
            href: '/',
            className: 'volunter',
            ch_title: '志愿者招募',
            en_title:'Volunteers Needed',
            icon: '../static/images/bg2.jpg'
          },
          {
            href: '/exhibit/survey',
            className: 'about',
            ch_title: '关于科技馆',
            en_title:'Science Museum',
            icon: '../static/images/bg3.jpg'
          }
        ]
      }
    }
  }
</script>
<style scoped lang="less">
  .bottom-nav {
    width: 100%;
    background: url("../../assets/guide_bg.jpg") no-repeat;
    background-size: cover;
    .bottom-nav-con {
      padding: 50px 0;
      text-align: center;
      li {
        width: 370px;
        height: 180px;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        margin-right: 38px;
        position: relative;
        overflow: hidden;
        //background: url("../../../static/images/test/guide.png") no-repeat;
        &:last-child {
          margin-right: 0;
        }
        img{
          width: 100%;
          min-height: 180px;
          -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
          transition: opacity 0.35s, transform 0.35s;
          -webkit-transform: scale(1.12);
          transform: scale(1.12);
        }
        .guide-btn {
          position: absolute;
          top:56px;
          color: #fff;
          width: 100%;
          .ch_title{
            font-size: 25px;
            cursor: pointer;
          }
          .en_title{
            font-size: 18px;
            color: rgba(255,255,255,.8);
            cursor: pointer;
          }
        }
        &:hover{
          img{
            background: rgba(0,0,0,.8);
            -webkit-transform: scale(1);
             transform: scale(1);
          }
        }
      }
    }
  }
</style>
