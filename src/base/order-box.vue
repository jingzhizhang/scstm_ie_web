<template>
  <div class="order-box">
    <div class="book-box" v-if="token && details.data.state===1">
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
                    <input type="text" v-model.trim="item.name" class="inp"/>
                  </p>
                  <p>
                    <label class="lab">年龄：</label>
                    <input type="number" min="1" max="200" v-model.trim="item.age" class="inp"/>
                  </p>
                  <p>
                    <label class="lab">身份证号：</label>
                    <input type="text" style="width: 200px" v-model.trim="item.card" class="inp"/>
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
            添加人数（￥{{details.data.money}} / 人）
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

    <div class="book-box" v-if="token && details.data.state===2">
      <p class="title">活动预约</p>
      <p class="s-tit">预约活动场次前，请先确保已成功预定科技馆门票</p>
      <div class="book">
        <no-login title="暂未开启在线预约"></no-login>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import NoLogin from '@/base/no-login'
  import {getAjax} from '@/public/js/config'

  export default {
    name: "order-box",
    props: {
      details: {
        type: Object,
        default: {}
      },
      typeVal: {
        default: 1
      }
    },
    components: {
      NoLogin
    },
    data() {
      return {
        date: '',
        numbers: '',   //场次
        current: -1,
        reser_id: '',  //场次id
        number: [
          {
            name: '',
            age: '',
            card: '',
            status: 1,
            index: 1
          }
        ],
        token: false,
        nowDate: moment().format('YYYY-MM-DD')
      }
    },
    created() {
      this.handleDate(moment().format('YYYY-MM-DD'))
      this.getUserInfo()
      this._token()
    },
    methods: {
      _token() {
        this.token = sessionStorage.getItem('token')
      },
      toggle(index, id) {
        this.current = index
        this.reser_id = id
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
          type: this.typeVal
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
        if (!this.verifyOrderItem()) {
          return
        }
        this.number.push(
          {
            name: '',
            age: '',
            card: '',
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
        if (!this.verifyOrderItem()) {
          return
        }
        for (let k in this.number) {
          if (this.number[k].status) {
            details.push(
              {
                age: this.number[k].age,
                name: this.number[k].name,
                card: this.number[k].card
              }
            )
          }
        }

        this._bookSubmit(details)
      },
      _bookSubmit(details) {
        const url = 'api/reser'
        getAjax(url, {
          reser_id: this.reser_id,
          details: details
        }, (res) => {
          if (res.status === 0) {
            this.$Message.success('预约成功！');
            this.getNumbers()
            this.number = [
              {
                name: '',
                age: '',
                card: '',
                status: 1,
                index: 1
              }
            ]
            this.reser_id = ''
            this.current = -1
          } else {
            this.$Message.error({
              duration: 4,
              content: `第${res.data+1}条数据，${res.interpret}`
            });
          }
        }, (err) => {
          console.log(err)
        }, this)
      },
      //查找最后一个状态值为1
      findLastNumber(){
        let length = this.number.length
        let item
        for (let i = length - 1; i >= 0; i--) {
          if(this.number[i].status){
            item = this.number[i]
            return item
          }
        }
      },
      //验证预约格式
      verifyOrderItem() {
        let item = this.findLastNumber()
        if (!this.reser_id) {
          this.$Message.error({
            duration: 4,
            content: '请选择场次'
          });
          return false
        } else if (!item.name) {
          this.$Message.error({
            duration: 4,
            content: '姓名不能为空'
          });
          return false
        } else if (!item.age) {
          this.$Message.error({
            duration: 4,
            content: '年龄不能为空'
          });
        } else if (item.age.length >= 4) {
          this.$Message.error({
            duration: 4,
            content: '年龄不能超过200'
          });
          return false
        } else if (!item.card) {
          this.$Message.error({
            duration: 4,
            content: '身份证号不能为空'
          });
          return false
        } else if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(item.card)) {
          this.$Message.error({
            duration: 4,
            content: '身份证格式有误'
          });
          return false
        }
        return true
      }
    }
  }
</script>

<style lang="less">
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
        .no-session {
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
</style>
