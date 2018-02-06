<template>
  <div class="expect">
    <img :src="icon"/>
    <p class="txt">敬请期待</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        icon: '../static/images/loading.png'
      }
    }
  }
</script>
<style lang="less">
  .expect {
    width: 202px;
    text-align: center;
    margin: 0 auto;
    img{
      width: 100%;
    }
    .txt{
      font-size: 20px;
      color: #d2d2d2;
      padding-top: 20px;
      padding-bottom: 30px;
    }
  }
</style>
