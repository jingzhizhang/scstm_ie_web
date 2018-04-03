<template>
  <div class="ind-nav">
    <div class="layout clearfix nav-con">
      <div class="fl logo">
        <router-link to="/">
          <img :src="logo" v-if="logo"/>
        </router-link>
      </div>
      <ul class="fr">
        <li v-for="(item,index) in navs"
            :key="index"
            :class="pathname===item.title ? 'active' : ''">
          <router-link :to="item.href">
            <!--<img :src="item.icon"/>-->
            <span class="icon-img"
                  :class="item.className"
                  :style="{background: 'url('+item.icon+') no-repeat center'}">
            </span>
            <p>{{item.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      logo: {
        type: String,
        default: ''
      },
      pathname:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        navs: [
          {
            icon: '../static/images/header/icon_home.png',
            href: '/',
            title: '首页',
            className: 'home'
          },
          {
            icon: '../static/images/header/icon_exhibit.png',
            href: '/exhibit/survey',
            title: '常设展览',
            className: 'exhibit'
          },
          {
            icon: '../static/images/header/icon_patch.png',
            href: '/patch/patch_info',
            title: '临展信息',
            className: 'patch'
          },
          {
            icon: '../static/images/header/icon_edu.png',
            href: '/edu_activity/all_course',
            title: '教育活动',
            className: 'edu'
          },
          {
            icon: '../static/images/header/icon_mkx.png',
            href: '/mkx_school/school_course',
            title: '美科新未来学院',
            className: 'mkx'
          },
          {
            icon: '../static/images/header/icon_serve.png',
            href: '/visit_serve/strategy',
            title: '参观服务',
            className: 'visit'
          },
          {
            icon: '../static/images/header/answer.png',
            href: '/questions/answers',
            title: '咨询问答',
            className: 'visit'
          },
          /*{
            icon: '../static/images/test/scstm_06.png',
            href: '/friends',
            title: '科学朋友圈',
            className: 'friends'
          },*/
        ],
        title: '首页'
      }
    },
    methods: {
      /*toggle(index) {
        this.current = this.$route.name
      }*/
    }
  }
</script>
<style scoped lang="less">
  .ind-nav {
    width: 100%;
    background: #fff;
    .nav-con {
      .logo {
        line-height: 100px;
        a{
          display: block;
          height:100%;
        }
        img {
          width: 220px;
          height: 79px;
        }
      }
      ul {
        li {
          display: table;
          width: 110px;
          text-align: center;
          margin-right: 10px;
          height: 100px;
          float: left;
          &:last-child {
            margin-right: 0;
          }
          a {
            color: #596781;
            display: table-cell;
            vertical-align: middle;
            font-size: 14px;
            img {
              margin-bottom: 8px;
            }
            .icon-img {
              width: 50px;
              background-size: 50px 50px !important;
              display: inline-block;
              height: 50px;
              -webkit-transition: -webkit-transform 0.35s;
              transition: transform 0.3s;
              -webkit-transform: translate3d(0,6px,0) scale(1);
              transform: translate3d(0,6px,0) scale(1);
              margin-bottom: 5px;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
          }
          &:hover {
            //background: url("../../../static/images/test/scstm_03.png") no-repeat;
            //background: #27bdfa;
            a {
              color: #0f6c9a;
              .icon-img{
                 -webkit-transform: translate3d(0,-2px,0) scale(1.2);
                transform: translate3d(0,-2px,0) scale(1.2);
              }
            }
          }
          &.active {
            //background: #27bdfa;
            a {
              color: #0f6c9a;
              .icon-img{
                -webkit-transform: translate3d(0,-2px,0) scale(1.2);
                transform: translate3d(0,-2px,0) scale(1.2);
              }
            }
          }
        }
      }
    }
  }
</style>
