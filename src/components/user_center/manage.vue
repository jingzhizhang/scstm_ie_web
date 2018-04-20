<template>
  <div class="setting-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"/>
    <bg>
      <div class="user-con clearfix">
        <div class="form-con">
          <div class="form-group clearfix">
            <label class="name">旧密码</label>
            <div class="form-item">
              <input type="password"
                     name="password1"
                     v-model="password1.value"
                     @input="verifyOldPass"
                     placeholder="请输入旧密码"/>
              <label class="error"
                     :class="password1.error ? 'is-visible' : ''">
                {{password1.error}}
              </label>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">新密码</label>
            <div class="form-item">
              <input type="password"
                     name="password"
                     @input="verifyNewPass"
                     v-model="password2.value"
                     placeholder="请输入新密码"/>
              <label class="error"
                     :class="password2.error ? 'is-visible' : ''">
                {{password2.error}}
              </label>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">确认新密码</label>
            <div class="form-item">
              <input type="password"
                     name="passCheck"
                     @input="verifyPasswdCheck"
                     v-model="passwdCheck.value"
                     placeholder="请确认密码"/>
              <label class="error"
                     :class="passwdCheck.error ? 'is-visible' : ''">
                {{passwdCheck.error}}
              </label>
            </div>
          </div>
          <div class="form-group clearfix" style="margin-top: 40px">
            <button type="button" class="input-btn" @click="handleSubmit()">{{load ? '加载中...' : '确认'}}</button>
          </div>
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import Bg from '@/base/bg'
  import {getAjax} from '@/public/js/config'

  export default {
    components: {
      Banner,
      Bg
    },
    data() {
      return {
        navs: [
          {
            href: '/user_center/setting',
            title: '个人设置',
            id: ''
          },
          {
            href: '/user_center/manage',
            title: '密码管理',
            id: ''
          },
          {
            href: '/user_center/my_book',
            title: '我的预约',
            id: ''
          },
        ],
        title: '账号设置',
        banner: '../static/images/user.jpg',
        password1: {
          value: '',
          error: '',
          isVerify: false
        },
        password2: {
          value: '',
          error: '',
          isVerify: false
        },
        passwdCheck: {
          value: '',
          error: '',
          isVerify: false
        },
        load: false
      }
    },
    methods: {
      /**
       * 确认密码验证
       */
      verifyPasswdCheck() {
        if (this.passwdCheck.value === '') {
          this.passwdCheck.error = '请确认密码'
          this.passwdCheck.isVerify = false
        } else if (this.password2.value !== this.passwdCheck.value) {
          this.passwdCheck.error = '两次密码不一致'
          this.passwdCheck.isVerify = false
        } else {
          this.passwdCheck.error = ''
          this.passwdCheck.isVerify = true
        }
      },
      /**
       * 旧密码不能为空
       */
      verifyOldPass() {
        if (this.password1.value === '') {
          this.password1.error = '请输入旧密码'
          this.password1.isVerify = false
        } else {
          this.password1.error = ''
          this.password1.isVerify = true
        }
      },
      /**
       * 新密码不能为空
       */
      verifyNewPass() {
        if (this.password2.value === '') {
          this.password2.error = '请输入新密码'
          this.password2.isVerify = false
        } else {
          this.password2.error = ''
          this.password2.isVerify = true
        }
      },
      /**
       * 提交数据
       */
      handleSubmit() {
        this.verifyOldPass()
        this.verifyNewPass()
        this.verifyPasswdCheck()
        if (!this.password1.isVerify || !this.password2.isVerify || !this.passwdCheck.isVerify) {
          return
        }
        this.load = true
        const url = 'api/editpwd'
        getAjax(url, {
          password1: this.password1.value,
          password2: this.password2.value,
        }, (res) => {
          if (res.status === 0) {
            localStorage.removeItem('login')
            localStorage.removeItem('token')
            this.$cookie.delete('phone')
            this.$cookie.delete('password')
            this.$router.push('/signIn')
            this.load = false
          } else {
            const obj = res.interpret
            this[Object.keys(obj)[0]].error = res.interpret[Object.keys(obj)[0]]
          }
        }, (error) => {
          console.log(error)
        }, this)
      }
    }
  }
</script>
<style lang="less">

</style>
