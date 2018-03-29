<template>
  <sign-bg>
    <div class="sign-box">
      <p class="sign-title">注册</p>
      <div class="form-group clearfix">
        <input type="text"
               v-model="phone.value"
               name="phone"
               @input="verifyPhone()"
               placeholder="请输入手机号"
               class="phone"/>
        <img src="../assets/user2.png"/>
        <label class="error"
               :class="phone.error ? 'is-visible' : ''">
          {{phone.error}}
        </label>
      </div>
      <div class="form-group clearfix">
        <input type="password"
               v-model="password.value"
               placeholder="请输入密码"
               class="passwd"
               @input="verifyPasswd()"
               name="passwd"
               autocomplete="new-password"/>
        <img src="../assets/pass2.png"/>
        <label class="error"
               :class="password.error ? 'is-visible' : ''">
          {{password.error}}
        </label>
      </div>
      <div class="form-group clearfix">
        <input type="password"
               v-model="passwdCheck.value"
               placeholder="确认密码"
               class="passwdCheck"
               @input="verifyPasswdCheck()"
               name="passwdCheck"
               autocomplete="new-password"/>
        <img src="../assets/pass2.png"/>
        <label class="error"
               :class="passwdCheck.error ? 'is-visible' : ''">
          {{passwdCheck.error}}
        </label>
      </div>
      <div class="form-group clearfix">
        <input type="text"
               v-model="card.value"
               placeholder="请输入身份证号"
               class="card"
               @input="verifyCard()"
               name="card"
               autocomplete="new-password"/>
        <img src="../assets/card.png"/>
        <label class="error"
               :class="card.error ? 'is-visible' : ''">
          {{card.error}}
        </label>
      </div>
      <div class="form-group clearfix">
        <div class="lyz-left">
          <input type="text"
                 placeholder="图片验证码"
                 class="captcha"
                 name="captcha"
                 maxlength="4"
                 @input="verifyImgCode()"
                 v-model="imgCode.value"
                 autocomplete="new-password"/>
          <label class="error"
                 :class="imgCode.error ? 'is-visible' : ''">
            {{imgCode.error}}
          </label>
        </div>
        <div class="lyz-right" @click="getImgCode()">
          <p v-if="!isShowImg" class="input-btn">获取图片验证码</p>
          <img v-if="isShowImg" :src="imgCaptcha"/>
        </div>
      </div>
      <div class="form-group clearfix">
        <div class="lyz-left">
          <input type="text"
                 placeholder="手机验证码"
                 class="tmsg"
                 name="tmsg"
                 @input="verifyPhoneCode()"
                 v-model="phone_code.value"
                 autocomplete="new-password"/>
          <label class="error"
                 :class="phone_code.error ? 'is-visible' : ''">
            {{phone_code.error}}
          </label>
        </div>
        <div class="lyz-right">
          <p v-if="!isCount" class="input-btn" @click="sendPhoneCode()">发送验证码</p>
          <p v-if="isCount" class="input-btn disabled">{{count}} s</p>
        </div>
      </div>
      <div class="form-group clearfix" style="margin-top: 40px">
        <button type="button" class="input-btn" @click="handleSubmit()">注册</button>
      </div>
      <p class="tologin">
        <span>已有账号</span>
        <router-link to="/signIn">立即登录</router-link>
      </p>
    </div>
  </sign-bg>
</template>
<script type="text/ecmascript-6">
  import SignBg from '@/base/signBg'
  import {getAjax, serveUrl} from '@/public/js/config'

  export default {
    components: {
      SignBg
    },
    data() {
      return {
        phone: {
          value: '',
          error: '',
          isVerify: false
        },
        password: {
          value: '',
          error: '',
          isVerify: false
        },
        passwdCheck: {
          value: '',
          error: '',
          isVerify: false
        },
        imgCode: {
          value: '',
          error: '',
          isVerify: false
        },
        phone_code: {
          value: '',
          error: '',
          isVerify: false
        },
        card: {
          value: '',
          error: '',
          isVerify: false
        },
        isShowImg: false,
        serveUrl: serveUrl,
        count: 120,
        isCount: false,
        timer: null,
        imgCaptcha: ''
      }
    },
    methods: {
      /**
       * 手机号验证
       */
      verifyPhone() {
        if (this.phone.value === null || this.phone.value === '' || this.phone.value === undefined) {
          this.phone.error = '请输入手机号'
          this.phone.isVerify = false
        } else if (!/^1[0-9]{10}$/.test(this.phone.value)) {
          this.phone.error = '请输入正确手机号'
          this.phone.isVerify = false
        } else {
          this.phone.error = ''
          this.phone.isVerify = true
        }
      },
      /**
       * 密码验证
       */
      verifyPasswd() {
        if (this.password.value === null || this.password.value === '' || this.password.value === undefined) {
          this.password.error = '请输入密码'
          this.password.isVerify = false
        } else if (this.password.value.length < 6) {
          this.password.error = '至少6位密码'
          this.password.isVerify = false
        } else {
          this.password.error = ''
          this.password.isVerify = true
        }
      },
      /**
       * 身份证验证
       */
      verifyCard() {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (this.card.value === '') {
          this.card.error = '请输入身份证号'
          this.card.isVerify = false
        } else if (!reg.test(this.card.value)) {
          this.card.error = '请输入有效身份证号'
          this.card.isVerify = false
        } else {
          this.card.error = ''
          this.card.isVerify = true
        }
      },
      /**
       * 确认密码验证
       */
      verifyPasswdCheck() {
        if (this.passwdCheck.value === '') {
          this.passwdCheck.error = '请确认密码'
          this.passwdCheck.isVerify = false
        } else if (this.password.value !== this.passwdCheck.value) {
          this.passwdCheck.error = '两次密码不一致'
          this.passwdCheck.isVerify = false
        } else {
          this.passwdCheck.error = ''
          this.passwdCheck.isVerify = true
        }
      },
      /**
       * 图片验证码验证
       */
      verifyImgCode() {
        if (this.imgCode.value === '') {
          this.imgCode.error = '请输入图片验证码'
          this.imgCode.isVerify = false
        } else {
          this.imgCode.error = ''
          this.imgCode.isVerify = true
        }
      },
      /**
       * 手机验证码验证
       */
      verifyPhoneCode() {
        if (this.phone_code.value === '') {
          this.phone_code.error = '请输入手机验证码'
          this.phone_code.isVerify = false
        } else {
          this.phone_code.error = ''
          this.phone_code.isVerify = true
        }
      },
      /**
       * 触发验证
       */
      handleForm() {
        this.verifyPhone()
        this.verifyPasswd()
        this.verifyPasswdCheck()
        this.verifyImgCode()
        this.verifyPhoneCode()
        this.verifyCard()
      },
      /**
       * 提交表单数据
       */
      handleSubmit() {
        this.handleForm()
        if (
          this.phone.isVerify && this.password.isVerify && this.passwdCheck.isVerify && this.imgCode.isVerify && this.phone_code.isVerify
        ) {
          this.handleFormAjax()
        }
      },
      /**
       * 提交数据
       */
      handleFormAjax() {
        const url = 'api/registr'
        getAjax(url, {
          phone: this.phone.value,
          phone_code: this.phone_code.value,
          password: this.password.value,
          card: this.card.value
        }, (res) => {
          if (res.status === 0) {
            this.$router.push('/signIn')
          } else {
            const obj = res.interpret
            this[Object.keys(obj)[0]].error = res.interpret[Object.keys(obj)[0]]
          }
        }, (err) => {
          console.log(err)
        }, this)
      },

      /**
       * 获取图片验证码
       */
      getImgCode() {
        this.verifyPhone()
        if (this.phone.isVerify) {
          this.isShowImg = true
          this.imgCaptcha = serveUrl + '/api/captcha/' + this.phone.value + '/' + Date.parse(new Date());
        }
      },


      /**
       * 发送手机验证码
       */
      sendPhoneCode() {
        this.imgCodeAjax()
      },

      /**
       * 倒数
       */
      countDown() {
        if (this.isCount) {
          this.timer = setInterval(() => {
            var countNum = this.count
            countNum -= 1;
            if (countNum < 1) {
              this.isCount = false
              countNum = 120
              clearInterval(this.timer)
            }
            this.count = countNum
          }, 1000)
        }
      },

      /**
       * 验证图片验证码
       */
      imgCodeAjax() {
        const url = 'api/wer_add'
        getAjax(url, {
          code: this.imgCode.value,
          phone: this.phone.value
        }, (res) => {
          if (res.status === 0) {
            this.isCount = true
            this.countDown()
          } else {
            this.imgCode.error = res.interpret.code
          }
        }, (err) => {
          console.log(err)
        }, this)
      }
    },
    /*watch: {
      phone: {
        deep: true,
        handler(newValue, oldValue) {
          this.verifyPhone()
        }
      },
      passwd: {
        deep: true,
        handler() {
          this.verifyPasswd()
        }
      },
      passwdCheck: {
        deep: true,
        handler(newValue,oldValue) {
          this.verifyPasswdCheck()
        }
      },
      imgCode: {
        deep: true,
        handler(newValue,oldValue) {
          this.verifyImgCode()
        }
      },
      phone_code: {
        deep: true,
        handler() {
          this.verifyPhoneCode()
        }
      }
    }*/
  }
</script>
<style scoped lang="less">
  .sign-box {
    width: 420px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    background: rgba(0, 0, 0, .6);
    padding: 20px 30px 28px;
    float: right;
    .sign-title {
      font-size: 30px;
      text-align: center;
      margin-bottom: 20px;
      color: #fff;
      margin-top: 30px;
    }
  }

  .form-group {
    width: 100%;
    position: relative;
    margin-bottom: 15px;
    input {
      width: 100%;
      border: 2px solid #fff;
      padding: 12px 20px 12px 60px;
      -webkit-transition: all .3s ease-in-out;
      transition: all .3s ease-in-out;
      background: #fff;
      box-shadow: none;
      color: #333;
      font-size: 14px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      &:focus {
        border: 2px solid #22A0DD;
        -webkit-transition: all .3s ease-in-out;
        transition: all .3s ease-in-out;
      }
    }
    & > img {
      position: absolute;
      top: 6px;
      left: 15px;
    }
    label.error.is-visible {
      visibility: visible;
      opacity: 1;
      right: 8px;
      -ms-filter: "alpha(Opacity=100)";
      -webkit-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      transform: translate(0, 0);
      -webkit-transition: .3s ease-out;
      transition: .3s ease-out;
    }
    label.error {
      position: absolute;
      top: 0;
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
    }
    .lyz-left {
      float: left;
      width: 58%;
      position: relative;
      input {
        width: 100%;
        padding: 12px 20px 12px 13px;
      }
    }
    .lyz-right {
      float: right;
      width: 38%;
      height: 44px;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
        height: 44px;
        cursor: pointer;
      }
    }
    .input-btn {
      width: 100%;
      display: block;
      border: none;
      height: 44px;
      line-height: 44px;
      background-color: #3c97ee;
      background-image: linear-gradient(90deg, #00d0fb, #00acf6);
      color: #fff;
      overflow: hidden;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
    }
    .disabled {
      background: gray;
    }
  }

  .tologin {
    color: #969696;
    -webkit-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
    text-align: center;
    span {
      color: #969696;
      margin-right: 10px;
    }
    a {
      color: #3c97ee;
    }
  }
</style>
