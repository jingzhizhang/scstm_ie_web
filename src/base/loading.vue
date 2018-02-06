<template>
  <div class="loading" v-if="isloading">
    <Spin size="large" fix></Spin>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Icon, Spin} from 'iview'

  export default {
    props: {
      isloading: {}
    },
    components: {
      Icon,
      Spin
    },
    data() {
      return {}
    }
  }
</script>
<style scoped lang="less">
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    opacity: 1;
    .ivu-spin-fix{
      background-color: rgba(255,255,255,.4);
    }
    .load {
      font-size: 60px;
      color: #fff;
      position: absolute;
      top: 50%;
      margin-top: -38px;
      left: 50%;
      margin-left: -38px;
      z-index: 100;
      animation: loading 1.5s linear infinite;
    }
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
