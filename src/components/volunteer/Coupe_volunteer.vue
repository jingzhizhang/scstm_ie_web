<template>
  <div class="volunteer">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="volunteer-box">
      <div class="volunteer-con">
        <div class="top">
          <Steps :current="Step">
            <Step title="阅读招募须知"></Step>
            <Step title="填写个人信息"></Step>
            <Step title="申请提交成功"></Step>
          </Steps>
        </div>
        <div class="bottom">
          <notice v-if="Step===0" @next="StepOneNext()"></notice>
          <vo-form v-if="Step===1" @next="StepTwoNext()"></vo-form>
          <succ v-if="Step===2"></succ>
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import Bg from '@/base/bg'
  import {getBannerMixin} from '@/public/js/mixin'
  import Notice from '@/base/volunteer/notice'
  import VoForm from '@/base/volunteer/voForm'
  import Succ from '@/base/volunteer/succ'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      Notice,
      VoForm,
      Succ
    },
    data() {
      return {
        title: '志愿者招募',
        navs: [
          {
            href: '/coupe_volunteer',
            title: '科普志愿者',
            id: 1
          },
          {
            href: '/expert_volunterr',
            title: '专家志愿者',
            id: 2
          }
        ],
        Step: 0,
      }
    },
    created() {
      this.getBanner()
    },
    methods: {
      /**
       * 获取志愿者banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/futurebanner'})
      },
      StepOneNext() {
        this.Step = 1
      },
      StepTwoNext() {
        this.Step = 2
      }
    }
  }
</script>
<style lang="less">

  .ivu-steps {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .ivu-steps-item {
      width: 40% !important;
      .ivu-steps-head {
        background: #f5f5f5;
        vertical-align: middle;
      }
      .ivu-steps-title {
        background: #f5f5f5;
        font-family: Serif;
        vertical-align: middle;
      }
      .ivu-steps-tail > i {
        background-color: #d9d9d9;
      }
      &:last-child {
        width: auto !important;
      }
    }
  }

  .volunteer-box {
    padding-top: 50px;
    padding-bottom: 60px;
  }

  .volunteer-con {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #d9d9d9;
    -webkit-border-radius: 2px;
    overflow: hidden;
    -moz-border-radius: 2px;
    border-radius: 2px;
    .top {
      width: 100%;
      height: 100px;
      background: #f5f5f5;
      border-bottom: 1px solid #d9d9d9;
    }
    .bottom {
      padding: 30px 60px;
    }
  }
</style>
