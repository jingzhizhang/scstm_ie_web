<template>
  <div class="question">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="qu-con clearfix">
        <div class="form clearfix">
          <!--提交问题-->
          <div class="form-con">
            <h1 class="txt">您的意见是我们进步的动力</h1>
            <ul class="screen">
              <li v-for="(item,index) in typeList"
                  :key="index"
                  :class="{active:index===current}"
                  @click="toggle(index,item.id)">
                {{item.type}}
              </li>
            </ul>
            <div class="form-list" v-if="isLogin">
              <!-- <li class="form-group clearfix">
                 <label class="name">您的姓名：</label>
                 <div class="form-item">
                   <input type="text" name="name"/>
                   <label class="error">
                     不能为空
                   </label>
                 </div>
               </li>
               <li class="form-group clearfix">
                 <label class="name">您的手机：</label>
                 <div class="form-item">
                   <input type="text" name="phone"/>
                   <label class="error">
                     不能为空
                   </label>
                 </div>
               </li>-->
              <li class="form-group clearfix">
                <label class="name" style="vertical-align: top">填写内容：</label>
                <div class="form-item">
                  <textarea v-model="content.value" @input="verifyTextarea()" rows="5" cols="25" name="name"></textarea>
                  <label class="error"
                         :class="content.error ? 'is-visible' : ''">
                    {{content.error}}
                  </label>
                </div>
              </li>
              <li class="form-group clearfix" style="padding: 5px 15px 5px 25px">
                <div class="form_item">
                  <input type="text" v-model="imgCode.value" @input="verifyCode()" name="code" class="code-input"/>
                  <label class="error"
                         :class="imgCode.error ? 'is-visible' : ''">
                    {{imgCode.error}}
                  </label>
                </div>
                <div class="code-img">
                  <img :src="imgCaptcha" @click="getImgCode()"/>
                </div>
              </li>
              <input type="button" value="提交" class="submit" @click="handleSubmit()"/>
            </div>
            <div class="no-login" v-if="!isLogin">
              <img :src="icon"/>
              <p class="txt">请先登录！</p>
            </div>
          </div>
          <!--联系方式-->
          <div class="contact-way">
            <h1 class="txt">联系方式</h1>
            <ul class="list">
              <li>
                <div class="ico">
                  <img src="../../assets/add-icon.png"/>
                </div>
                <p>中国四川省成都市人民中路一段16号</p>
              </li>
              <li>
                <div class="ico">
                  <img src="../../assets/emial-icon.png"/>
                </div>
                <p>邮编：610041</p>
              </li>
              <li>
                <div class="ico">
                  <img src="../../assets/phone-ico.png"/>
                </div>
                <p>服务热线：<br/>028-7822817</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="answers clearfix">
          <div class="search">
            <input class="search-input" v-model="searchVal" placeholder="搜索关键词">
            <span class="ico" @click="searchKeyword()">
              <img src="../../assets/search.png"/>
            </span>
          </div>
          <ul class="answers-list clearfix">
            <li v-for="(item,index) in langList.data" :key="index">
              <div class="issue item">
                <div class="user-img">
                  <img
                    :src="item.img"/>
                </div>
                <p class="txt">{{item.content}}</p>
              </div>
              <div class="result item">
                <div class="user-img">
                  <img
                    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3652661687,4210497541&fm=27&gp=0.jpg"/>
                </div>
                <p class="txt">{{item.reply}}</p>
              </div>
            </li>
          </ul>
          <no-data v-if="!langList.data"></no-data>
        </div>
        <Pagination
          v-if="langList.total"
          :total="langList.total*10"
          :page="page"
          @handleChange="handlePage">
        </Pagination>
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

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      Pagination,
      NoData
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
        icon: '../static/images/loading.png'
      }
    },
    created() {
      this.getBanner()
      this.getTypeList()
      this.getLangLists()
    },
    computed: {
      isLogin() {
        return sessionStorage.getItem('login')
      }
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
            this.imgCode.error = res.interpret
          }
        }, (err) => {
          console.log(err)
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
    .form {
      width: 100%;
      position: relative;
      .form-con {
        float: left;
        width: 657px;
        height: 593px;
        -webkit-border-radius: 15px;
        color: #fff;
        -moz-border-radius: 15px;
        border-radius: 15px;
        background: url("../../assets/question_bg.png") no-repeat center;
        padding-left: 90px;
        .txt {
          font-size: 24px;
          padding-top: 80px;
          margin-bottom: 34px;
        }
        .screen {
          margin-bottom: 26px;
          overflow: hidden;
          li {
            float: left;
            width: 97px;
            padding: 9px 0;
            border: 1px solid #4aa0d8;
            border-radius: 8px;
            color: #82bee6;
            text-align: center;
            cursor: pointer;
            -webkit-transition: all 0.2s;
            -moz-transition: all 0.2s;
            transition: all 0.2s;
            font-size: 15px;
            margin-right: 5px;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              color: #fff;
              border-color: #1b8cdb;
              background-color: #1b8cdb;
            }
          }
        }
        .form-list {
          width: 411px;
          .form-group {
            width: 100%;
            margin-bottom: 10px;
            position: relative;
            border: 1px solid #4aa0d8;
            border-radius: 8px;
            list-style: none;
            font-size: 14px;
            padding: 10px 15px 10px 25px;
            .name {
              color: #82bee6;
              display: inline-block;
              vertical-align: middle;
            }
            .form_item {
              display: inline-block;
              vertical-align: middle;
              width: 250px;
              position: relative;
            }
            .code-input {
              outline: 0;
              border: 0;
              background: none;
              color: inherit;
              width: 100%;
              font-size: 16px;
            }
            .code-img {
              display: inline-block;
              vertical-align: middle;
              width: 110px;
              -webkit-border-radius: 5px;
              -moz-border-radius: 5px;
              border-radius: 5px;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
            .form-item {
              display: inline-block;
              vertical-align: middle;
              width: 280px;
              input {
                display: block;
                width: 100%;
                outline: 0;
                border: 0;
                background: none;
                color: inherit;
                font: 14px/1.5 "Microsoft YaHei", Arial, Tahoma, Helvetica, sans-serif;
              }
              textarea {
                background: none;
                outline: 0;
                border: 0;
                font: 14px/1.5 "Microsoft YaHei", Arial, Tahoma, Helvetica, sans-serif;
                width: 100%;
                color: #fff;
              }
            }
          }
          label.error {
            position: absolute;
            top: 4px;
            right: -70px;
            padding: 0 8px;
            color: #f00;
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
          .submit {
            height: 42px;
            width: 142px;
            border-radius: 20px;
            background: #59c3e1;
            color: #fff;
            font-size: 16px;
            margin: 20px 0 0 0;
            cursor: pointer;
          }
        }
        .no-login {
          width: 202px;
          text-align: center;
          margin-top: 60px;
          margin-left: 80px;
          img {
            width: 100%;
          }
          .txt {
            font-size: 20px;
            color: #82bee6;
            padding-top: 20px;
            padding-bottom: 30px;
          }
        }
      }
      .contact-way {
        position: absolute;
        left: 50%;
        top: 80px;
        margin-left: -52px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        background: url("../../assets/contact_bg.jpg") center no-repeat;
        width: 666px;
        height: 418px;
        text-align: center;
        overflow: hidden;
        .txt {
          padding-top: 68px;
          margin-bottom: 42px;
          font-size: 24px;
        }
        .list {
          list-style: none;
          li {
            display: inline-block;
            margin: 0 17px;
            vertical-align: top;
            width: 150px;
            .ico {
              width: 116px;
              height: 116px;
              margin: 0 auto 18px;
              border-radius: 50%;
              background-color: #fff;
              img {
                width: 100%;
                display: block;
              }
            }
            p {
              font-size: 14px;
            }
          }
        }
      }
    }
    .answers {
      padding-bottom: 32px;
      -webkit-border-radius: 8px;
      -moz-border-radius: 8px;
      border-radius: 8px;
      box-shadow: 0 0 27px 0 rgba(0, 0, 0, 0.09);
      background: #fff;
      margin-top: 40px;
      .search {
        float: right;
        margin-top: 20px;
        margin-right: 40px;
        position: relative;
        .search-input {
          font-size: 15px;
          padding: 6px 45px 6px 20px;
          height: 36px;
          width: 300px;
          border: 1px solid #dddee1;
          border-radius: 4px;
          color: #495060;
          background-color: #fff;
          &:focus {
            outline: 0;
            box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
            border-color: #57a3f3;
          }
        }
        .ico {
          position: absolute;
          right: 8px;
          top: 8px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          img {
            width: 100%;
          }
        }
      }
      .answers-list {
        padding: 16px 30px 30px;
        margin-top: 60px;
        li {
          width: 100%;
          padding-bottom: 15px;
          margin-top: 20px;
          .item {
            .user-img {
              width: 40px;
              height: 40px;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              border-radius: 50%;
              overflow: hidden;
              display: inline-block;
              vertical-align: top;
              margin-right: 15px;
              margin-top: 6px;
              img {
                width: 100%;
              }
            }
            .txt {
              display: inline-block;
              vertical-align: top;
              font-size: 15px;
              width: 1000px;
              text-align: justify;
              margin-top: 6px;
              line-height: 26px;
            }
          }
          .result {
            margin-left: 20px;
            margin-top: 15px;
            background-color: #f5f5f5;
            padding: 8px 15px;
            border-radius: 6px;
          }
        }
      }
    }
  }
</style>
