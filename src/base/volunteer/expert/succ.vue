<template>
  <div class="succ-con">
    <div class="icon">
      <Icon type="ios-checkmark-outline"></Icon>
    </div>
    <div class="txt">
      <p class="title">您的专家志愿者申请提交成功！</p>
      <p>我们将认真审核您的专家志愿者申请</p>
      <p>如果通过，我们将通过手机短信、微信的方式联系您</p>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .succ-con{
    display: table;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    .icon{
      float: left;
      i{
        font-size: 45px;
        color: #02adf1;
      }
    }
    .txt{
      float: left;
      margin-left: 15px;
      p{
        margin-bottom: 10px;
        font-size: 16px;
        color: #333;
      }
      .title{
        color: #01aef3;
        font-size: 30px;
       margin-bottom: 20px;
      }
    }
  }
</style>
