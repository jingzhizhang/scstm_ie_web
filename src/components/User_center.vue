<template>
  <div class="user_center">
    <router-view></router-view>
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
  .user_center {
    position: relative;
  }
  .user-con {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    text-align: center;
    .user-head {
      width: 230px;
      height: 230px;
      position: relative;
      display: inline-block;
      vertical-align: top;
      margin-right: 50px;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 3px 36px 0 #EDEDED;
      img {
        width: 100%;
      }
      .btn-head {
        position: absolute;
        bottom: 0;
        height: 40px;
        background: rgba(0, 0, 0, .6);
        color: #fff;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        width: 100%;
        font-size: 15px;
      }
    }
    .form-con {
      display: inline-block;
      width: 500px;
      .form-group {
        width: 100%;
        position: relative;
        margin-bottom: 25px;
        .form-item {
          position: relative;
          .ivu-input-icon {
            line-height: 42px;
          }
          .ivu-input {
            height: 42px;
          }
        }
        input {
          width: 100%;
          border: 1px solid #dddee1;
          padding: 12px 20px 12px 12px;
          -webkit-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out;
          background: rgba(255, 255, 255, 1);
          box-shadow: none;
          color: #333;
          font-size: 14px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          &:focus {
            border: 1px solid #57a3f3;
            -webkit-transition: all .3s ease-in-out;
            transition: all .3s ease-in-out;
            box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
          }
        }
        label.error.is-visible {
          visibility: visible;
          opacity: 1;
          right: 22px;
          -ms-filter: "alpha(Opacity=100)";
          -webkit-transform: translate(0, 0);
          -ms-transform: translate(0, 0);
          transform: translate(0, 0);
          -webkit-transition: .3s ease-out;
          transition: .3s ease-out;
        }
        label.name {
          font-size: 16px;
          margin-bottom: 15px;
          display: block;
          text-align: left;
        }
        label.error {
          position: absolute;
          top: -1px;
          right: -70px;
          padding: 0 8px;
          line-height: 44px;
          color: #c33;
          cursor: text;
          background: 0 0;
          opacity: 0;
          -webkit-transform: translate(20px, 0);
          -ms-transform: translate(20px, 0);
          transform: translate(20px, 0);
          -webkit-transition: .25s ease-out;
          transition: .25s ease-out;
          font-size: 14px;
        }
        .input-btn {
          width: 100%;
          display: block;
          border: none;
          height: 44px;
          line-height: 44px;
          background-color: #3c97ee;
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          color: #fff;
          overflow: hidden;
          cursor: pointer;
          font-size: 15px;
          text-align: center;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }
        .disabled {
          background: gray;
        }
      }
    }
  }
</style>
