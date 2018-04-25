<template>
  <div class="question">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="qu-con clearfix">
        <div class="answers-box">
          <div class="answers">
            <div class="search clearfix">
              <input v-model="searchVal" placeholder="搜索关键词" type="text"/>
              <span class="ico" @click="searchKeyword()">
                <Icon type="ios-search-strong"></Icon>
              </span>
            </div>
            <ul class="answers-list clearfix">
              <li class="clearfix" v-for="(item,index) in langList.data" :key="index">
                <p class="date">
                  <span class="day">{{item.addtime.slice(-2)}}</span>
                  <span class="month">{{item.addtime.slice(0, -3)}}</span>
                </p>
                <div class="answers-item">
                  <p class="q">Q：{{item.content}}？<span>{{item.type}}</span></p>
                  <p class="a">
                    A：{{item.reply}}
                  </p>
                </div>
              </li>
            </ul>
            <div class="data" style="margin-top: 40px">
              <no-data v-if="!langList.data"></no-data>
            </div>
          </div>
          <Pagination
            v-if="langList.total"
            :total="langList.total*10"
            :page="page"
            @handleChange="handlePage">
          </Pagination>
        </div>
        <div class="ques">
          <h2 class="tit">您的意见是我们进步的动力</h2>
          <div class="form-box" v-if="token">
            <Select size="large" v-model="id">
              <Option
                v-for="(item,index) in typeList"
                :key="index"
                v-model="item.id">
                {{item.type}}
              </Option>
            </Select>
            <div class="form-group">
              <textarea v-model="content.value" placeholder="填写内容：" @input="verifyTextarea()" rows="5"
                        cols="25"></textarea>
              <label class="error"
                     :class="content.error ? 'is-visible' : ''">
                {{content.error}}
              </label>
            </div>
            <div class="form-group clearfix">
              <div class="form_item">
                <input placeholder="验证码" type="text" v-model="imgCode.value" @input="verifyCode()" name="code"
                       class="code-input"/>
                <label class="error"
                       :class="imgCode.error ? 'is-visible' : ''">
                  {{imgCode.error}}
                </label>
              </div>
              <div class="code-img">
                <img :src="imgCaptcha" @click="getImgCode()"/>
              </div>
            </div>
            <div class="form-group" style="margin-top: .4rem">
              <p class="input-btn" @click="handleSubmit()">提交</p>
            </div>
          </div>
          <no-login v-if="!token" title="请先登录"></no-login>
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import {getAjax, serveUrl} from '@/public/js/config'
  import Pagination from '@/base/pagination'
  import NoData from '@/base/no-data'
  import NoLogin from '@/base/no-login'
  import moment from 'moment'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      Pagination,
      NoData,
      NoLogin
    },
    data() {
      return {
        navs: [
          {
            href: '/questions/answers',
            title: '问题回答',
            id: 1
          }
        ],
        typeList: [],
        title: '咨询问答',
        current: 0,
        id: 1,
        content: {
          value: '',
          error: '',
          isVerify: false
        }, //文本框内容
        imgCode: {
          value: '',
          error: '',
          isVerify: false
        },
        imgCaptcha: serveUrl + '/api/language/' + sessionStorage.getItem('login') + '/' + Date.parse(new Date()), //图片验证码
        page: 1, //页码
        searchVal: '',  //搜索内容
        langList: [], //留言列表
        icon: '../static/images/loading.png',
        token: false
      }
    },
    created() {
      this.getBanner()
      this.getTypeList()
      this.getLangLists()
      this._token()
      this.getUserInfo()
    },
    methods: {
      /**
       * 获取咨询问答banner
       * @param id  分类id
       */
      getBanner() {
        this.getBannerData({id: '', url: 'api/Langbanner'})
      },
      /**
       * 获取分类列表
       */
      getTypeList() {
        const url = 'api/Langtype'
        getAjax(url, {},
          (res) => {
            this.typeList = res.data
          }, (err) => {
            console.log(err)
          }, this)
      },
      _token() {
        this.token = sessionStorage.getItem('token')
      },
      /**
       * 验证token是否过期
       */
      getUserInfo() {
        const url = 'api/user'
        getAjax(url, {},
          (res) => {
          }, (err) => {
            if (err.status === 401) {
              this.token = false
            }
          }, this)
      },
      toggle(index, id) {
        this.current = index
        this.id = id
      },
      /**
       * 验证文本输入框
       */
      verifyTextarea() {
        if (this.content.value === null || this.content.value === '' || this.content.value === undefined) {
          this.content.error = '请输入文本内容'
          this.content.isVerify = false
        } else {
          this.content.error = ''
          this.content.isVerify = true
        }
      },
      /**
       * 验证图片验证码
       */
      verifyCode() {
        if (this.imgCode.value === null || this.imgCode.value === '' || this.imgCode.value === undefined) {
          this.imgCode.error = '请填写图片验证码'
          this.imgCode.isVerify = false
        } else {
          this.imgCode.error = ''
          this.imgCode.isVerify = true
        }
      },
      /**
       * 提交表单数据
       */
      handleSubmit() {
        this.verifyCode()
        this.verifyTextarea()
        if (
          this.content.isVerify && this.imgCode.isVerify
        ) {
          this.handleFormAjax()
        }
      },
      handleFormAjax() {
        const url = 'api/lang_add'
        getAjax(url, {
          code: this.imgCode.value,
          content: this.content.value,
          type_id: this.id
        }, (res) => {
          if (res.status === 0) {
            this.imgCode.value = ''
            this.content.value = ''
            this.getImgCode()
            this.$Message.success({
              top: 100,
              content: '您的信息提交成功！',
              duration: 6
            })
          } else {
            this.imgCode.error = res.interpret.code
          }
        }, (err) => {
          if (err.status === 401) {
            this.$router.push('/signIn')
          }
        }, this)
      },
      /**
       * 获取图片验证码
       */
      getImgCode() {
        this.imgCaptcha = serveUrl + '/api/language/' + sessionStorage.getItem('login') + '/' + Date.parse(new Date());
      },
      handlePage(page) {
        this.page = page
        this.getLangLists()
      },
      /**
       * 获取留言列表
       */
      getLangLists() {
        const url = 'api/langlists'
        getAjax(url, {
          page: this.page,
          search: this.searchVal,
          type_id: ''
        }, (res) => {
          this.langList = res.data
        }, (err) => {
          console.log(err)
        }, this)
      },
      searchKeyword() {
        this.getLangLists()
      },
    }
  }
</script>
<style lang="less">
  .qu-con {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    .answers-box {
      width: 800px;
      float: left;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      .answers {
        padding: 30px;
        background: #fff;
        box-shadow: 0 3px 36px 0 #EDEDED;
        .search {
          position: relative;
          width: 300px;
          float: right;
          input {
            border: 1px solid #dddee1;
            font-size: 15px;
            border-radius: 2px;
            background: #fff;
            color: #666;
            width: 100%;
            padding: 8px 35px 8px 10px;
            &:focus {
              border-color: #57a3f3;
              outline: 0;
              box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
              -webkit-transition: all .3s ease-in-out;
              transition: all .3s ease-in-out;
            }
          }
          .ico {
            position: absolute;
            right: 10px;
            font-size: 26px;
            top: 2px;
            cursor: pointer;
          }
        }
      }
      .answers-list {
        clear: both;
        li {
          padding: 30px 0;
          border-bottom: 1px dashed #d4d4d4;
          .date {
            float: left;
            width: 60px;
            text-align: center;
            margin-right: 15px;
            color: #05afee;
            .day {
              font-size: 38px;
              display: block;
            }
            .month {
              font-size: 14px;
              display: block;
            }
          }
          .answers-item {
            float: left;
            width: 645px;
            margin-top: 10px;
            .q {
              font-size: 24px;
              color: #333;
              margin-bottom: 15px;
              span {
                font-size: 16px;
                padding: 3px 10px;
                background-image: linear-gradient(90deg,
                #00d1fb 0%,
                #1dd4e6 0%,
                #39d7d0 0%,
                #079fe1 100%),
                linear-gradient(
                  #ffffff,
                  #ffffff);
                margin-left: 10px;
                color: #fff;
                border-radius: 2px;
              }
            }
            .a {
              font-size: 16px;
              text-indent: 20px;
              line-height: 24px;
            }
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    .ques {
      width: 370px;
      border-radius: 2px;
      background: #fff;
      float: right;
      padding: 32px 38px;
      box-shadow: 0 3px 36px 0 #EDEDED;
      .tit {
        font-size: 22px;
        color: #333;
        margin-bottom: 30px;
      }
      .form-box {
        margin-top: 30px;
        .form-group {
          position: relative;
          width: 100%;
          margin-top: 20px;
          textarea {
            border: 1px solid #dddee1;
            outline: 0;
            width: 100%;
            color: #495060;
            border-radius: 4px;
            padding: 5px 8px;
            font-size: 14px;
            &:focus {
              border-color: #57a3f3;
              outline: 0;
              box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
              -webkit-transition: all .3s ease-in-out;
              transition: all .3s ease-in-out;
            }
          }
          .form_item {
            float: left;
            width: 60%;
            position: relative;
            input {
              -webkit-transition: all .3s ease-in-out;
              transition: all .3s ease-in-out;
              background: #fff;
              box-shadow: none;
              color: #495060;
              font-size: 14px;
              width: 100%;
              padding: 5px 8px;
              border: 1px solid #dddee1;
              border-radius: 4px;
              height: 38px;
              &:focus {
                border-color: #57a3f3;
                outline: 0;
                box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
                -webkit-transition: all .3s ease-in-out;
                transition: all .3s ease-in-out;
              }
            }
          }
          .code-img {
            float: right;
            height: 38px;
            border-radius: 4px;
            overflow: hidden;
            img {
              height: 100%;
            }
          }

          label.error.is-visible {
            visibility: visible;
            opacity: 1;
            right: 0;
            -ms-filter: "alpha(Opacity=100)";
            -webkit-transform: translate(0, 0);
            -ms-transform: translate(0, 0);
            transform: translate(0, 0);
            -webkit-transition: .3s ease-out;
            transition: .3s ease-out;
          }
          label.error {
            position: absolute;
            top: 11px;
            right: -60px;
            padding: 0 8px;
            opacity: 0;
            color: #c33;
            cursor: text;
            -webkit-transform: translate(20px, 0);
            -ms-transform: translate(20px, 0);
            transform: translate(20px, 0);
            -webkit-transition: .25s ease-out;
            transition: .25s ease-out;
          }
          .input-btn {
            cursor: pointer;
            width: 100%;
            height: 38px;
            text-align: center;
            line-height: 38px;
            font-size: 14px;
            border-radius: 2px;
            margin-top: 20px;
            letter-spacing: 3px;
            background: rgb(52, 152, 233);
            color: #fff;
          }
        }
      }
    }
  }
</style>
