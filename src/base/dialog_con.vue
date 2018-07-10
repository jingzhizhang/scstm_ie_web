<template>
  <div class="popup" v-if="isShow">
    <div class="mask"></div>
    <div class="popup-center">
      <div class="popup-content">
        <div class="popup-main">
          <p class="popup-icon">
            <Icon :type="icon"></Icon>
          </p>
          <h2 class="popup-title">
            <p class="popup-title-def">{{title}}</p>
          </h2>
          <div class="popup-txt">
            <div class="popup-txt-def">
              <p>{{content}}</p>
            </div>
          </div>
          <div class="popup-btns">
            <p class="sure" @click="confirm">{{okText}}</p>
            <p class="cancel" @click="cancel">{{cancelText}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dialog_con",
    props: {
      okText: {
        type: String,
        default: '确认'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      icon: {
        type: String,
        default: 'ios-minus'
      },
      title: {
        type: String,
        default: '我的标题'
      },
      content: {
        type: String,
        default: '我的内容'
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      confirm() {
        this.$emit('confirm')
      },
      cancel() {
        this.$emit('cancel')
      },
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>

<style lang="less">
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    pointer-events: auto;
    .mask {
      display: block;
      overflow: hidden;
      background-color: #25262d;
      opacity: .4;
      pointer-events: auto;
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .popup-center {
      transform: translate(100%, 100%);
      position: absolute;
      width: 100%;
      height: 100%;
      .popup-content {
        transform: translate(-50%, -50%);
        top: -50%;
        left: -50%;
        width: auto;
        max-width: 100%;
        position: absolute;
        box-sizing: border-box;
        pointer-events: auto;
        .popup-main {
          width: 270px;
          padding: 0;
          text-align: center;
          overflow: hidden;
          border-radius: 10px;
          background-color: #fff;
        }
        .popup-icon {
          margin-top: 20px;
          margin-bottom: 16px;
          line-height: 1;
          color: #4a4c5b;
          font-size: 30px;
        }
        .popup-title {
          color: #333;
          font-size: 16px;
          line-height: 1;
          .popup-title-def {
            margin: 30px 16px 0;
            white-space: nowrap;
          }
        }
        .popup-txt {
          margin: 16px 0;
          text-align: left;
          color: #666;
          font-size: 14px;
          line-height: 22px;
          .popup-txt-def {
            padding: 0 16px;
            p {
              display: table;
              margin: auto;
            }
          }
        }
        .popup-btns {
          overflow: hidden;
          width: 100%;
          font-size: 0;
          border-top: 1px solid #ebebeb;
          p {
            width: 50%;
            float: left;
            display: inline-block;
            padding: 17px 10px;
            margin: 0;
            font-size: 16px;
            line-height: 1;
            text-align: center;
            text-decoration: none;
            color: #999;
            background-color: #fff;
            background-clip: padding-box;
            box-sizing: border-box;
            &:active {
              background-color: rgba(0, 0, 0, .04);
            }
          }
          p.sure {
            color: #fc9153;
            border-right: 1px solid #ebebeb;
            &:active {
              background-color: rgba(252, 145, 83, .04);
            }
          }
        }
      }
    }
  }
</style>
