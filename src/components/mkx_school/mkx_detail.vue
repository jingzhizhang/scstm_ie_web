<template>
  <div class="th_detail-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg>
      <div class="movie-detail" v-if="mkxDetail.status===0">
        <div class="m-info clearfix">
          <div class="de-img">
            <img :src="mkxDetail.data.img"/>
          </div>
          <div class="m-txt">
            <h2 class="m-title">
              {{mkxDetail.data.title}}
              <span class="mold" v-for="(item,index) in mkxDetail.data.courseclass"
                    :key="index">
                {{item}}
              </span>
            </h2>
            <p class="address">
              <Icon type="ios-location-outline" class="location"></Icon>
              {{mkxDetail.data.address}}
            </p>
            <p class="m-time">
              <Icon type="ios-timer-outline" class="time"></Icon>
              {{mkxDetail.data.activity_time}}
            </p>
            <p class="intr">
              简介：{{mkxDetail.data.introduce}}
            </p>
            <!--<p class="btn-book">立即预定</p>-->
          </div>
        </div>

        <div class="book-box" v-if="token && mkxDetail.data.state===1">
          <p class="title">活动预约</p>
          <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
          <div class="book">
            <div class="item-group">
              <label class="lab">日期选择：</label>
              <div class="form-item">
                <DatePicker type="date"
                            :value="nowDate"
                            placeholder="请选择查询日期"
                            @on-change="handleDate"
                            style="width: 200px">
                </DatePicker>
              </div>
            </div>
            <div class="item-group" style="padding-bottom: 0">
              <label class="lab">选择场次：</label>
              <ul class="numbers clearfix" v-if="numbers.length">
                <li
                  :class="{active:current===index}"
                  :style="{cursor:item.is_stop==1?'pointer':'not-allowed'}"
                  @click="item.is_stop===1 ? toggle(index,item.id) : ''"
                  v-for="(item,index) in numbers"
                  :key="index">
                  {{item.sess}}（{{item.determine}}/{{item.qualified}}）
                </li>
              </ul>
              <p class="no-session" v-if="!numbers.length">暂无场次</p>
            </div>
            <div class="item-group">
              <div class="group">
                <label class="lab">添加人数：</label>
                <ul class="peoples">
                  <li v-for="(item,index) in number" v-if="item.status">
                    <div class="form-box clearfix">
                      <p>
                        <label class="lab">姓名：</label>
                        <input type="text" v-model="item.name" class="inp"/>
                      </p>
                      <p>
                        <label class="lab">年龄：</label>
                        <input type="text" v-model="item.age" class="inp"/>
                      </p>
                      <p>
                        <label class="lab">身份证号：</label>
                        <input type="text" style="width: 200px" maxlength="18" v-model="item.card" class="inp"/>
                      </p>
                    </div>
                    <div class="icon-minus" @click="minusNumbers(index)">
                      <Icon v-if="index!==0" type="ios-minus"></Icon>
                    </div>
                  </li>
                </ul>
              </div>
              <p class="notice">
                <span>*</span> 请准确填写预约人年龄信息，并确认与该活动要求年龄是否符合
              </p>
              <p class="add" @click="addNumbers()">
                <Icon type="ios-plus-empty"></Icon>
                添加人数
              </p>
            </div>
            <p class="book-btn" @click="bookSumbit()" style="display: inline-block; vertical-align: middle">
              立即预约
            </p>
            <p class="notice" style="display: inline-block; vertical-align: middle;margin-left: 20px">
              <span>*</span> 本活动将于活动开始前半小时停止预约
            </p>
          </div>
        </div>

        <div class="book-box" v-if="!token">
          <p class="title">活动预约</p>
          <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
          <div class="book">
            <no-login title="请先登录"></no-login>
          </div>
        </div>

        <div class="book-box" v-if="token && mkxDetail.data.state===2">
          <p class="title">活动预约</p>
          <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
          <div class="book">
            <no-login title="暂未开启在线预约"></no-login>
          </div>
        </div>

        <div class="movie-clips clearfix">
          <p class="title">活动内容</p>
          <div class="act-content" v-html="mkxDetail.data.content">

          </div>
        </div>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import NoLogin from '@/base/no-login'
  import {Icon, DatePicker} from 'iview'
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import {getAjax} from '@/public/js/config'
  import Bg from '@/base/bg'
  import moment from 'moment'

  export default {
    mixins: [getBannerMixin],
    components: {
      Icon,
      Banner,
      Bg,
      DatePicker,
      NoLogin
    },
    data() {
      return {
        mkxDetail: '',
        navs: [
          {
            href: '/mkx_school/school_course',
            title: '学院课程',
            id: 1
          }
        ],
        title: '美科星未来学院',
        date: '',
        numbers: '',   //场次
        current: -1,
        reser_id: '',  //场次id
        number: [
          {
            name: '',
            age: '',
            card:'',
            status: 1,
            index: 1
          }
        ],
        listNumber: 1,
        token: false,
        nowDate:moment().format('YYYY-MM-DD')
      }
    },
    created() {
      this.getBanner()
      this.getDetailData()
      this.handleDate(moment().format('YYYY-MM-DD'))
      this.getUserInfo()
      this._token()
    },
    methods: {
      /**
       * 获取全部课程banner
       * @param id  分类id
       */
      getBanner(id = 1) {
        this.getBannerData({id: id, url: 'api/futurebanner'})
      },
      toggle(index, id) {
        this.current = index
        this.reser_id = id
      },
      getDetailData() {
        const url = 'api/futuredeta'
        getAjax(url, {
          id: this.$route.query.id
        }, (res) => {
          this.mkxDetail = res
        }, (err) => {
          console.log(err)
        }, this)
      },
      /**
       * 日期
       * @param date
       */
      handleDate(date) {
        this.date = parseInt(moment(date).format('X')) + 12 * 60 * 60
        this.current = -1
        this.reser_id = ''
        this.getNumbers()
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
      /**
       * 获取场次
       */
      getNumbers() {
        const url = 'api/sess'
        getAjax(url, {
          activity_id: this.$route.query.id,
          sesstime: this.date,
          type:1
        }, (res) => {
          this.numbers = res.data
        }, (err) => {
          if (err.status === 401) {
            this.token = ''
          }
        }, this)
      },
      /**
       * 添加人数
       */
      addNumbers() {
        this.listNumber++
        this.number.push(
          {
            name: '',
            age: '',
            card:'',
            status: 1,
            index: 1
          }
        )
      },
      /**
       * 删除
       */
      minusNumbers(index) {
        this.number[index].status = 0
      },
      /**
       * 立即预约
       */
      bookSumbit() {
        const details = []
        for (let k in this.number) {
          if (this.number[k].status) {
            if(!this.reser_id){
              this.$Message.error({
                duration: 4,
                content: '请选择场次'
              });
              return
            }else if(!this.number[k].name){
              this.$Message.error({
                duration: 4,
                content: '姓名不能为空'
              });
              return
            }else if(!this.number[k].age){
              this.$Message.error({
                duration: 4,
                content: '年龄不能为空'
              });
              return
            }else if(!this.number[k].card){
              this.$Message.error({
                duration: 4,
                content: '身份证号不能为空'
              });
              return
            }else {
              details.push(
                {
                  age: this.number[k].age,
                  name: this.number[k].name,
                  card:this.number[k].card
                }
              )
            }
          }
        }

        this._bookSubmit(details)
      },
      _bookSubmit(details){
        const url = 'api/reser'
        getAjax(url, {
          reser_id: this.reser_id,
          details: details
        }, (res) => {
          if (res.status === 0) {
            this.handleDate(moment().format('YYYY-MM-DD'))
            this.number = [
              {
                name: '',
                age: '',
                card:'',
                status: 1,
                index: 1
              }
            ]
            this.reser_id = ''
            this.current = -1
          } else {
            this.$Message.error({
              duration: 4,
              content: res.interpret
            });
          }
        }, (err) => {
          console.log(err)
        }, this)
      }
    }
  }
</script>
<style scoped lang="less">
  .movie-detail {
    width: 1200px;
    margin: 0 auto;
    padding-top: 50px;
    padding-bottom: 60px;
    .m-info {
      .de-img {
        width: 450px;
        height: 320px;
        float: left;
        overflow: hidden;
        border: 8px solid #fff;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        box-shadow: 0 3px 36px 0 #EDEDED;
        img {
          width: 100%;
        }
      }
      .m-txt {
        float: left;
        margin-top: 40px;
        margin-left: 40px;
        width: 710px;
        text-align: justify;
        .m-title {
          font-size: 30px;
          color: #333;
          margin-bottom: 15px;
          .mold {
            font-size: 14px;
            background-image: -webkit-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -moz-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -o-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: -ms-linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            background-image: linear-gradient(-131deg, #0097E3 -16%, #3BD9D0 100%);
            padding: 0 15px;
            height: 28px;
            margin-left: 10px;
            display: inline-block;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            vertical-align: middle;
            text-align: center;
            line-height: 28px;
            color: #fff;
          }
        }
        .address {
          color: #28bbff;
          font-size: 16px;
          margin-bottom: 10px;
          .location {
            width: 18px;
            font-size: 20px;
            font-weight: bold;
            margin-right: 5px;
          }
        }
        .m-time {
          color: #596781;
          font-size: 16px;
          margin-bottom: 10px;
          .time {
            width: 18px;
            font-size: 20px;
            font-weight: bold;
            margin-right: 5px;
          }
        }
        .intr {
          font-size: 16px;
          color: #596781;
          line-height: 28px;
          margin-top: 10px;
          margin-bottom: 30px;
        }
        .btn-book {
          width: 130px;
          height: 45px;
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          text-align: center;
          line-height: 45px;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .movie-clips {
      padding-top: 40px;
      padding-bottom: 50px;
      .title {
        font-size: 25px;
        color: #333;
        margin-bottom: 40px;
      }
      .act-content {
        border: 1px solid #fff;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        box-shadow: 0 3px 36px 0 #EDEDED;
        padding: 30px 20px;
        color: #596781;
        background: #fff;
      }
    }
    .book-box {
      margin-top: 40px;
      .title {
        font-size: 25px;
        margin-bottom: 20px;
        color: #333;
      }
      .s-tit {
        font-size: 16px;
        color: #333;
      }
      .book {
        margin-top: 40px;
        background: #fff;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        padding: 30px;
        .item-group {
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f5f5f5;
          .lab {
            font-size: 16px;
            margin-bottom: 10px;
            display: block;
          }
          .no-session{
            font-size: 20px;
            color: #d2d2d2;
            padding-bottom: 15px;
          }
          .numbers {
            li {
              padding: 10px 30px;
              background: #f5f5f5;
              border-radius: 2px;
              margin-right: 20px;
              font-size: 18px;
              overflow: hidden;
              color: #9b9b9b;
              float: left;
              cursor: pointer;
              margin-bottom: 15px;
              &.active {
                background-image: linear-gradient(90deg,
                #00b3f7 0%,
                #00b2f7 0%,
                #00b1f6 0%,
                #21bef8 0%,
                #41cbfa 0%,
                #38a6f4 100%),
                linear-gradient(
                  #f5f5f5,
                  #f5f5f5);
                color: #fff;
              }
            }
          }
          .peoples {
            li {
              margin-bottom: 15px;
              .form-box {
                background: #f5f5f5;
                padding: 10px 30px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                border-radius: 2px;
                display: inline-block;
                vertical-align: middle;
                p {
                  float: left;
                  color: #9b9b9b;
                  font-size: 18px;
                  margin-right: 20px;
                  .lab {
                    display: inline-block;
                    vertical-align: middle;
                    margin-bottom: 0;
                  }
                  .inp {
                    width: 100px;
                    height: 30px;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 16px;
                    text-align: center;
                    padding: 0 10px;
                  }
                }
              }
              .icon-minus {
                cursor: pointer;
                font-size: 30px;
                display: inline-block;
                vertical-align: middle;
                margin-left: 20px;
              }
            }
          }
          .add {
            padding: 10px 20px;
            background: #ececec;
            color: #999999;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            display: inline-block;
            font-size: 15px;
            cursor: pointer;
            margin-top: 20px;
          }

        }
        .book-btn {
          padding: 10px 20px;
          background-image: linear-gradient(90deg,
          #00b3f7 0%,
          #00b2f7 0%,
          #00b1f6 0%,
          #21bef8 0%,
          #41cbfa 0%,
          #38a6f4 100%),
          linear-gradient(
            #f5f5f5,
            #f5f5f5);
          color: #fff;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          display: inline-block;
          font-size: 15px;
          cursor: pointer;
        }
        .notice {
          margin-top: 10px;
          font-size: 14px;
          color: #9b9b9b;
          span {
            color: #ff1010;
          }
        }
      }
    }
  }
</style>
