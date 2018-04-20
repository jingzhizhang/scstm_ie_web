<template>
  <div class="setting-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"/>
    <bg>
      <div class="user-con clearfix">
        <div class="user-head">
          <img
            :src="img ? img : defaultImg"/>
          <p class="btn-head" @click="toggleShow">{{img ? '修改头像' : '上传头像'}}</p>
          <my-upload field="img"
                     @crop-success="cropSuccess"
                     v-model="show"
                     :width="200"
                     :height="200"
                     :noCircle="true"
                     :noRotate="false"
                     img-format="png"></my-upload>
        </div>
        <div class="form-con">
          <div class="form-group clearfix">
            <label class="name">昵称</label>
            <div class="form-item">
              <input type="text"
                     name="nickName"
                     v-model="nickname.value"
                     placeholder="请输入昵称"
                     class="phone"/>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">真实姓名</label>
            <div class="form-item">
              <input type="text"
                     name="name"
                     v-model="name.value"
                     placeholder="请输入真实姓名"
                     class="phone"/>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">邮箱</label>
            <div class="form-item">
              <input type="text"
                     name="email"
                     @input="verifyEmail"
                     v-model="email.value"
                     placeholder="请输入邮箱"
                     class="phone"/>
              <label class="error"
                     :class="email.error ? 'is-visible' : ''">
                {{email.error}}
              </label>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">学校</label>
            <div class="form-item">
              <input type="text"
                     name="school"
                     v-model="school.value"
                     placeholder="请输入学校"
                     class="phone"/>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">出生日期</label>
            <div class="form-item">
              <DatePicker :value="born"
                          format="yyyy年MM月dd日"
                          type="date"
                          placeholder="请选择年月日"
                          @on-change="handleDate"
                          style="width: 100%;">
              </DatePicker>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="name">身份证号</label>
            <div class="form-item">
              <input type="text"
                     name="card"
                     @input="verifyCard"
                     v-model="card.value"
                     placeholder="请输入身份证号"
                     class="phone"/>
              <label class="error"
                     :class="card.error ? 'is-visible' : ''">
                {{card.error}}
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
  import myUpload from 'vue-image-crop-upload'
  import {mapActions} from 'vuex'
  import {DatePicker} from 'iview'

  export default {
    components: {
      Banner,
      Bg,
      myUpload,
      DatePicker
    },
    data() {
      return {
        show: false,
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
        nickname: {
          value: '',
          error: '',
          isVerify: false
        },
        name: {
          value: '',
          error: '',
          isVerify: false
        },
        email: {
          value: '',
          error: '',
          isVerify: true
        },
        school: {
          value: '',
          error: '',
          isVerify: false
        },
        born: '',
        card: {
          value: '',
          error: '',
          isVerify: true
        },
        img: '',
        isChoose: false, //是否选择图片源
        defaultImg: '../static/images/loading.png',
        load: false
      }
    },
    created() {
      this.backInfo()
    },
    methods: {
      ...mapActions([
        'set_loading_state'
      ]),
      /**
       * 验证邮箱
       */
      verifyEmail() {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        if (this.email.value === '') {
          this.email.error = ''
          this.email.isVerify = true
        } else if (!reg.test(this.email.value)) {
          this.email.error = '请输入正确的邮箱格式'
          this.email.isVerify = false
        } else {
          this.email.error = ''
          this.email.isVerify = true
        }
      },
      /**
       * 验证身份证
       */
      verifyCard() {
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (this.card.value === '') {
          this.card.error = ''
          this.card.isVerify = true
        } else if (!reg.test(this.card.value)) {
          this.card.error = '请输入有效身份证号'
          this.card.isVerify = false
        } else {
          this.card.error = ''
          this.card.isVerify = true
        }
      },

      toggleShow() {
        this.show = !this.show;
      },

      cropSuccess(imgDataUrl, field) {
        this.isChoose = true
        this.img = imgDataUrl;
      },

      /**
       * 出生日期
       * @param date
       */
      handleDate(date) {
        this.born = date
      },

      /**
       * 提交数据
       */
      handleSubmit() {
        if (
          (this.email.value && !this.email.isVerify)
          ||
          (this.card.value && !this.card.isVerify)
        ) {
          return
        }
        this.load = true
        this.set_loading_state(true)
        const url = 'api/eduser'
        getAjax(url, {
          name: this.name.value,
          nickname: this.nickname.value,
          email: this.email.value,
          school: this.school.value,
          born: this.born,
          img: this.isChoose ? this.img : '',
          card: this.card.value
        }, (res) => {
          if (res.status === 0) {
            this.set_loading_state(false)
            this.isChoose = false
            this.load = false
          } else {
            const obj = res.interpret
            this[Object.keys(obj)[0]].error = res.interpret[Object.keys(obj)[0]]
          }
        }, (error) => {
          console.log(error)
        }, this)
      },

      /**
       * 回显信息
       */
      backInfo() {
        const url = 'api/user'
        getAjax(url, {},
          (res) => {
            this.born = res.data.born
            this.card.value = res.data.card
            this.email.value = res.data.email
            this.img = res.data.img
            this.name.value = res.data.name
            this.nickname.value = res.data.nickname
            this.school.value = res.data.school
          }, (error) => {
            if (error.status === 401) {
              this.$router.push('/signIn')
            }
          }, this)
      }
    }
  }
</script>
<style lang="less">

</style>
