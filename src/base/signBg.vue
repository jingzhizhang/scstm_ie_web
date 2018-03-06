<template>
  <div class="sign-bg">
    <div class="logo clearfix">
      <router-link to="/">
        <img :src="logo"/>
      </router-link>
    </div>
    <div class="sign-con">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getAjax} from '@/public/js/config'
  export default {
    data() {
      return {
        logo: '',
      }
    },
    created() {
      this.getLogoData()
    },
    methods:{
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
    }
  }
</script>
<style lang="less">
  .sign-bg{
    width: 100%;
    height: calc(100vh);
    background: url("../assets/signBg.jpg") no-repeat center;
    background-size: cover;
    position: relative;
    .logo{
      position: absolute;
      width: 264px;
      left: 50px;
      top:50px;
      img{
        width: 100%;
      }
    }
    .sign-con{
      width: 1200px;
      margin: auto;
      position: absolute;
      top:0;
      right:0;
      left: 0;
      bottom: 0;
      display: table;
    }
  }
</style>
