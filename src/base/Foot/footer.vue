<template>
  <div class="footer">
    <div class="contact">
      <ul class="grad clearfix">
        <li v-for="(item,index) in contacts" :key="index">
          <p class="title">{{item.title}}</p>
          <p class="phone">{{item.phone}}</p>
        </li>
      </ul>
    </div>
    <div class="agreement">
      <div class="item">
        <p class="title">四川科技馆</p>
        <router-link to="/" style="cursor: not-allowed">服务协议</router-link>
      </div>
      <div class="item">
        <p class="title">游客服务</p>
        <router-link to="/visit_serve/notice">新闻公告</router-link>
        <router-link to="/questions/answers">反馈建议</router-link>
      </div>
      <div class="item" style="width: 250px">
        <p class="title" style="margin-bottom: 15px;">相关链接</p>
        <Select filterable placeholder="四川省自然科学博物馆">
          <Option v-for="(item,index) in options" :value="item.value" :key="index">
            <a :href="item.href" target="_blank">{{ item.label }}</a>
          </Option>
        </Select>
      </div>
      <div class="item">
        <img :src="ewm"/>
        <p class="ewm-txt">关注公众号</p>
      </div>
    </div>
    <div class="count">
      <p>浏览人数</p>
      <span v-for="(item,index) in counts" :key="index">
        {{item}}
      </span>
    </div>
    <div class="copyright">
      蜀ICP备：060202226号&nbsp;&nbsp;技术支持：<a style="color: #fff" href="http://www.pthola.cn/" target="_blank">成都匹体科技有限公司</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {Select, Option} from 'iview'

  export default {
    props: {
      phones: {
        type: Object,
        default: ''
      },
      ewm: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: ''
      },
      number: {
        type: String,
        default: ''
      }
    },
    components: {
      Select,
      Option
    },
    data() {
      const _this = this
      return {
        contacts: [
          {
            title: '服务热线',
            phone: _this.phones.phone_service
          },
          {
            title: '团队预约',
            phone: _this.phones.phone_team
          },
          {
            title: '美科新咨询电话',
            phone: _this.phones.phone_consulting
          },
          {
            title: '投诉电话',
            phone: _this.phones.phone_complaints
          }
        ]
      }
    },
    computed: {
      /**
       * 浏览人数
       * @returns {Array}
       */
      counts() {
        const numArr = []
        const num = this.number.toString()
        for (let i = 0; i < num.length; i++) {
          numArr.push(num.substr(i, 1))
        }
        return numArr
      }
    }
  }
</script>
<style lang="less">
  .footer {
    background-color: #2b3340;
    color: #5e7482;
    padding-top: 30px;
    min-width: 1400px;
    .contact {
      padding-bottom: 30px;
      border-bottom: 1px solid #3f4754;
      ul {
        width: 100%;
        text-align: center;
        li {
          width: 340px;
          text-align: center;
          display: inline-block;
          vertical-align: middle;
          border-left: 1px solid #3f4754;
          padding: 26px 0;
          .title {
            color: #fff;
            font-size: 16px;
            margin-bottom: 8px;
          }
          .phone {
            font-size: 18px;
          }
          &:last-child {
            border-right: 1px solid #3f4754;
          }
        }
      }
    }
    .agreement {
      padding: 25px 0;
      border-bottom: 1px solid #3f4754;
      text-align: center;
      .item {
        display: inline-block;
        vertical-align: top;
        width: 200px;
        text-align: center;
        margin-right: 150px;
        .title {
          padding-bottom: 10px;
          font-size: 16px;
        }
        a {
          color: #5e7482;
          font-size: 16px;
          display: block;
          margin-bottom: 10px;
        }
        img {
          width: 80px;
          border: 5px solid #fff;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          height: 100%;
        }
        .ewm-txt {
          font-size: 14px;
          margin-top: 10px;
        }
        &:last-child {
          margin-right: 0;
        }
        .ivu-select-dropdown {
          max-height: 126px;
          .ivu-select-dropdown-list {
            .ivu-select-item-selected {
              a {
                color: #fff;
              }
            }
            .ivu-select-item {
              padding: 0;
              a {
                padding: 7px;
              }
            }
          }
        }
      }
    }
    .count {
      text-align: center;
      font-size: 14px;
      padding: 15px 0;
      p {
        display: inline-block;
        margin-right: 10px;
      }
      span {
        width: 25px;
        height: 25px;
        display: inline-block;
        text-align: center;
        line-height: 25px;
        background-color: #3f475a;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        margin-right: 5px;
        color: #fff;
      }
    }
    .copyright {
      text-align: center;
      color: #fff;
      font-size: 14px;
      padding: 15px 0;
      background: #141c29;
    }
  }
</style>
