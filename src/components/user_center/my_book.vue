<template>
  <div class="my-book">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"/>
    <bg>
      <div class="book-con">
        <nav-bar :navBar="navBar" @handleClick="handleTypeClick"></nav-bar>
        <ul class="book-list clearfix">
          <li v-for="(item,index) in reserList" :key="index">
            <div class="act-img">
              <img :src="item.img"/>
              <div class="mask" v-if="type===1">
                <div class="mask-con">
                  <p class="mask-txt">
                    <router-link :to="{path:'/mkx_school/mkx_detail',query:{id:item.future_id}}">查看详情</router-link>
                  </p>
                </div>
              </div>
            </div>
            <div class="act-info">
              <div class="time" :style="{color:type===2 ? '#666' : '#05afee'}">
                <p class="date">{{item.sess}}</p>
                <p>{{item.sesstime}}</p>
              </div>
              <div class="act-name">
                <p class="act-title">{{item.title}}</p>
                <p class="number">人数{{item.count}}人</p>
              </div>
            </div>
          </li>
        </ul>
        <no-login title="暂无预约数据" v-if="!reserList.length"></no-login>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import Bg from '@/base/bg'
  import Expect from '@/base/expect'
  import NavBar from '@/base/navBar'
  import NoLogin from '@/base/no-login'
  import {getAjax} from '@/public/js/config'
  import moment from 'moment'

  export default {
    components: {
      Banner,
      Bg,
      Expect,
      NavBar,
      NoLogin
    },
    data() {
      return {
        navs: [
          {
            href: '/user_center/setting',
            title: '个人设置',
            id: ''
          },
          {
            href: '/user_center/manage',
            title: '密码管理',
            id: ''
          },
          {
            href: '/user_center/my_book',
            title: '我的预约',
            id: ''
          },
        ],
        title: '账号设置',
        banner: '../static/images/user.jpg',
        navBar: [
          {title: '即将进行', id: 1},
          {title: '已经结束', id: 2}
        ],
        type: 1,
        reserList: ''
      }
    },
    created() {
      this._Reserlists()
    },
    methods: {
      _Reserlists() {
        const url = 'api/reserlists'
        getAjax(url, {
          type: this.type
        }, (res) => {
          this.reserList = res.data
        }, (err) => {
          console.log(err)
        }, this)
      },
      handleTypeClick(typeId) {
        this.type = typeId
        this._Reserlists()
      }
    }
  }
</script>
<style lang="less">
  .book-con {
    width: 1200px;
    padding-top: 50px;
    padding-bottom: 60px;
    margin: 0 auto;
    .book-list {
      li {
        width: 385px;
        position: relative;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        overflow: hidden;
        margin-right: 20px;
        margin-bottom: 20px;
        float: left;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .act-img {
          width: 100%;
          height: 257px;
          overflow: hidden;
          position: relative;
          text-align: center;
          img {
            width: 100%;
            transition: opacity 0.35s, transform 0.35s;
            -webkit-transform: scale(1.12);
            transform: scale(1.12);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
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
          &:hover {
            img {
              background: rgba(255, 255, 255, .8);
              -webkit-transform: scale(1);
              transform: scale(1);
            }
          }
        }
        .act-info {
          width: 100%;
          height: 80px;
          background: #fff;
          padding: 10px;
          text-align: center;
          .time {
            width: 130px;
            height: 100%;
            float: left;
            color: #05afee;
            border-right: 1px solid #d4d4d4;
            font-size: 18px;
            .date {
              font-size: 24px;
            }
          }
          .act-name {
            float: left;
            width: 230px;
            padding-right: 10px;
            padding-left: 10px;
            .act-title {
              font-size: 20px;
              color: #333;
              margin-bottom: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .number {
              font-size: 16px;
              color: #333;
            }
          }
        }
      }
    }
  }
</style>
