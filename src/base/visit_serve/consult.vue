<template>
  <div class="consult-txt" v-html="data">
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props:{
      data:{
        type:String,
        default:''
      }
    },
    data() {
      return {}
    }
  }
</script>
<style lang="less">
  .consult-txt{
    width: 100%;
    padding-bottom: 60px;
    .item{
      width: 100%;
      margin-bottom: 15px;
      .title{
        font-size: 28px;
        color: #333;
        padding-bottom: 30px;
        border-bottom:1px solid #dcdcdc;
        margin-top: 30px;
      }
      .txt{
        color: #333;
        margin-top: 10px;
        p{
          padding-top: 15px;
          font-size: 16px;
        }
      }
    }
  }
</style>
