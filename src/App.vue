<template>
  <div id="app" v-cloak>

    <router-view name="sign"></router-view>

    <div class="containers" v-if="pathname!=='登录' && pathname!=='注册' && pathname!=='忘记密码'">
      <div class="head">
        <Header @layout="handleLayout"/>
        <ind-nav :logo="logo" :pathname="pathname"/>
      </div>

      <router-view/>

      <div class="foot" v-if="foot.data">
        <guide/>
        <Footer :phones="foot.data.end_phone"
                :ewm="foot.data.wx"
                :options="foot.data.related_url"
                :number="foot.data.number"/>
      </div>
    </div>

    <loading :isloading="loading"></loading>
  </div>
</template>

<script>
  import {getAjax} from '@/public/js/config'
  import Header from '@/base/Head/header'
  import IndNav from '@/base/Head/ind_nav'
  import Guide from '@/base/Foot/guide'
  import Footer from '@/base/Foot/footer'
  import Loading from '@/base/loading'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    components: {
      Header,
      IndNav,
      Guide,
      Footer,
      Loading
    },
    data() {
      return {
        logo: '',
        foot: '',
        pathname: '',
      }
    },
    created() {
      this.getLogoData()
      this.getFootInfoData()
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    },
    methods: {
      /**
       * 获取logo
       */
      getLogoData() {
        const url = 'api/logo'
        getAjax(url, {},
          (res) => {
            //console.log(res)
            this.logo = res.data.logo
          }, (err) => {
            console.log(err)
          }, this)
      },

      /**
       * 获取底部数据
       */
      getFootInfoData() {
        const url = 'api/thetail'
        getAjax(url, {},
          (res) => {
            this.foot = res
          }, (err) => {
            console.log(err)
          }, this)
      },

      /**
       * 退出
       */
      handleLayout() {
        const url = 'api/out'
        getAjax(url, {},
          (res) => {
            localStorage.removeItem('login')
            localStorage.removeItem('token')
            window.location.href = '/'
          }, (err) => {
            if (err.status === 401) {
              localStorage.removeItem('login')
              localStorage.removeItem('token')
              window.location.href = '/'
            }
          }, this)
      }
    },
    watch: {
      "$route"(to, from) {
        this.pathname = to.meta[0]
      }
    }
  }
</script>

<style lang="less">
  @import "./public/css/base.css";

  img[lazy=loading] {
    width: 202px !important;
    height: 144px !important;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 20s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .layout {
    width: 1200px;
    margin: 0 auto;
  }

  .item {
    .ivu-select-selection {
      background-color: #5e7482 !important;
      border: none;
      border-radius: 4px;
      height: 32px;
    }
    .ivu-select-input {
      font-size: 14px;
      height: 32px;
      text-align: center;
      color: #bbbec4;
    }
    .ivu-select-arrow {
      color: rgba(255, 255, 255, .9);
    }
  }
</style>
