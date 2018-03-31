<template>
  <div class="vo-notice">
    <div class="notice-info" v-html="data">

    </div>
    <div class="remember">
      <input type="checkbox" ref="checkbox" class="checkbox" @click="handleInput()"/>
      <span>我已阅读并同意遵守相关条约</span>
    </div>
    <p class="next" :class="{active:isNext}" @click="next()">下一步</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isNext: false
      }
    },
    methods: {
      handleInput() {
        this.isNext = this.$refs.checkbox.checked
      },
      next() {
        if (this.$refs.checkbox.checked) {
          this.$emit('next')
        }
      }
    }
  }
</script>
<style lang="less">
  .vo-notice {
    .item {
      font-size: 15px;
      color: #333;
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .content {
        line-height: 34px;
      }
    }
    .remember {
      text-align: center;
      margin-top: 40px;
      input {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #333;
      }
    }
    .next {
      padding: 8px 20px;
      background: gray;
      font-size: 15px;
      color: #fff;
      display: table;
      margin: 30px auto;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      cursor: pointer;
      &.active {
        background-image: linear-gradient(90deg,
        #00b1f6 0%,
        #21bef8 0%,
        #41cbfa 0%,
        #21cefb 0%,
        #00d0fb 0%,
        #00acf6 100%),
        linear-gradient(
          #ffffff,
          #ffffff);
      }
    }
  }
</style>
