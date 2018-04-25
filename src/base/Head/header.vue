<template>
  <div class="header">
    <div class="layout header-con clearfix">
      <vue-seam-less :data="topList" :class-option="optionLeft" class="notice">
        <ul class="item clearfix">
          <li v-for="(item,index) in topList">
            <a v-if="item.url" target="_blank" :href="item.url">{{item.note}}</a>
            <p v-if="!item.url">{{item.note}}</p>
          </li>
        </ul>
      </vue-seam-less>
      <ul class="sign" v-if="!token">
        <li>
          <router-link to="/signIn">登录</router-link>
        </li>
        <li>|</li>
        <li>
          <router-link to="/signUp">注册</router-link>
        </li>
        <li>|</li>
      </ul>
      <ul class="sign" v-else>
        <li>
          欢迎：
          <router-link to="/user_center/setting">{{user_phone}}</router-link>
        </li>
        <li>
          <span class="layout" @click="layout">退出</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import vueSeamLess from 'vue-seamless-scroll'

  export default {
    props:{
      topList:{
        type:Array,
        default:[]
      }
    },
    components:{
      vueSeamLess
    },
    data() {
      return {
      }
    },
    computed: {
      user_phone() {
        return sessionStorage.getItem('login')
      },
      token(){
        return sessionStorage.getItem('token')
      },
      optionLeft() {
        return {
          direction: 2,
          limitMoveNum: 2
        }
      }
    },
    methods: {
      layout() {
        this.$emit('layout')
      }
    }
  }
</script>
<style scoped lang="less">
  .header {
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #e7e7e7;
    .header-con {
      padding: 0 10px;
      .notice {
        float: left;
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        color: #666;
        width: 800px;
        overflow: hidden;
        .item{
          list-style: none;
          padding: 0;
          margin: 0 auto;
          li{
            float: left;
            margin-right: 30px;
            color: #666;
            font-size: 12px;
            a{
              color: #666;
              &:hover{
                color: #2d8cf0;
              }
            }
          }
        }
      }
      .sign {
        float: right;
        li {
          display: inline-block;
          line-height: 40px;
          margin-left: 10px;
          vertical-align: middle;
          .layout {
            cursor: pointer;
            &:hover {
              color: #279ee4;
            }
          }
          a {
            color: #666;
            &:hover {
              color: #279ee4;
            }
          }
        }
      }
    }
  }
</style>
