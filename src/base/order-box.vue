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
                        size="large"
                        :value="nowDate"
                        placeholder="请选择查询日期"
                        @on-change="handleDate"
                        style="width: 238px">
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
            <label class="lab">活动参与人（最多三位）：</label>
            <Form ref="formValidate" :model="formValidate">
              <FormItem
                v-for="(item,index) in formValidate.items"
                v-if="item.status"
                :key="index">
                <Row>
                  <Col span="5">
                    <FormItem :prop="'items.' + index + '.name'" label="姓名" :rules="ruleValidate.name">
                      <Input size="large" v-model.trim="item.name" placeholder="请输入参观人姓名"></Input>
                    </FormItem>
                  </Col>
                  <Col span="5">
                    <FormItem :prop="'items.' + index + '.age'" label="年龄" :rules="ruleValidate.age">
                      <Input size="large" v-model.trim="item.age" placeholder="请输入参观人年龄"></Input>
                    </FormItem>
                  </Col>
                  <Col span="8">
                    <FormItem :prop="'items.' + index + '.card'" label="身份证号" :rules="ruleValidate.card">
                      <Input size="large" v-model.trim="item.card" placeholder="请输入参观人身份证号"></Input>
                    </FormItem>
                  </Col>
                  <Col span="2">
                    <div class="icon-minus" @click="minusNumbers(index)">
                      <Icon v-if="index!==0" type="ios-minus"></Icon>
                    </div>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </div>
          <p class="notice">
            <span>*</span> 请准确填写预约人年龄信息，并确认与该活动要求年龄是否符合
          </p>
          <p class="add" @click="addNumbers()">
            <Icon type="ios-plus-empty"></Icon>
            活动参与人（￥{{details.data.money}} / 人）
          </p>
        </div>
        <p class="book-btn" @click="handleSubmit('formValidate')" style="display: inline-block; vertical-align: middle">
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

    <dialog-con
      :options="options"
      ref="dialog"
      @confirm="confirm">
    </dialog-con>
  </div>
</template>

<script>
  import moment from 'moment'
  import NoLogin from '@/base/no-login'
  import {getAjax} from '@/public/js/config'
  import DialogCon from '@/base/dialog_con'

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
      NoLogin,
      DialogCon
    },
    data() {
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入参观人年龄'))
        } else if (!/^[0-9]*$/.test(value)) {
          return callback(new Error('请输入1~200内的数字'))
        } else if (value > 200 || value <= 0) {
          return callback(new Error('请输入1~200内的数字'))
        } else {
          callback()
        }
      }
      return {
        type: '',
        inputIndex: 1,
        date: '',
        numbers: '',   //场次
        current: -1,
        reser_id: '',  //场次id
        token: false,
        nowDate: moment().format('YYYY-MM-DD'),
        formValidate: {
          items: [
            {
              name: '',
              age: '',
              card: '',
              index: 1,
              status: 1
            }
          ]
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入参观人姓名', trigger: 'blur'}
          ],
          age: [
            {required: true, validator: validateAge, trigger: 'blur'},
          ],
          card: [
            {required: true, message: '请输入参观人身份证号', trigger: 'blur'},
            {
              pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '请输入有效身份证号'
            }
          ]
        },
        options: {
          okText: '确认',
          cancelText: '取消',
          icon: 'information-circled',
          title: '',
          content: '',
          showClose: true,
        }
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
        this.inputIndex++;
        let arr = this.formValidate.items.filter(item => item.status)
        if(arr.length < 3 ){
          this.formValidate.items.push({
            name: '',
            age: '',
            card: '',
            status: 1,
            index: this.inputIndex
          })
        }else {
          this.showDialog({type: '', title: '温馨提示', content: '最多只能添加三位活动参与人', showClose: false})
        }
      },
      /**
       * 删除
       */
      minusNumbers(index) {
        this.formValidate.items[index].status = 0
      },
      /**
       * 立即预约
       */
      handleSubmit(name) {
        if (!this.verifyOrderItem()) return
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.bookSumbit()
          }
        })
      },
      bookSumbit() {
        let details = []
        let items = this.formValidate.items
        for (let k in items) {
          if (items[k].status) {
            details.push(
              {
                age: items[k].age,
                name: items[k].name,
                card: items[k].card
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
            this.showDialog({
              type: '',
              title: '温馨提示',
              icon:'ios-checkmark',
              iconColor:'#19be6b',
              content: '恭喜您，预约成功！',
              showClose: false
            })
            this.getNumbers()
            this.formValidate = {
              items: [
                {
                  name: '',
                  age: '',
                  card: '',
                  index: 1,
                  status: 1
                }
              ]
            }
            this.reser_id = ''
            this.current = -1
          } else {
            if (res.status === 2) {
              if (res.data[0]) {
                this.showDialog({
                  type: '',
                  title: '温馨提示',
                  content: `第${res.data + 1}条数据，${res.interpret}`,
                  showClose: false
                })
                return
              } else {
                this.type = ''
                this.showDialog({type: '', title: '温馨提示', content: res.interpret, showClose: false})
                return
              }
            } else if (res.status === 3) {
              this.showDialog({type: 'href', title: '温馨提示', content: res.interpret, showClose: true})
            }
          }
        }, (err) => {
          console.log(err)
        }, this)
      },
      //验证预约格式
      verifyOrderItem() {
        if (!this.reser_id) {
          this.showDialog({type: '', title: '温馨提示', content: '请选择场次后进行预约', showClose: false})
          return false
        }
        return true
      },
      confirm() {
        if (this.type === 'href') {
          this.$router.push({
            path: '/user_center/setting',
            query: {callback: this.$route.fullPath}
          })
        }
        this.$refs.dialog.hide()
      },
      showDialog(options) {
        this.type = options.type
        this.options = {
          okText: options.okText || '确认',
          cancelText: options.cancelText || '取消',
          icon: options.icon || 'information-circled',
          iconColor:options.iconColor,
          title: options.title,
          content: options.content,
          showClose: options.showClose,
        }
        this.$refs.dialog.show()
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
      .ivu-input-wrapper {
        width: 70%;
      }
      .ivu-form-item-error-tip {
        margin-left: 19%;
      }
      .icon-minus {
        cursor: pointer;
        font-size: 30px;
        display: inline-block;
        vertical-align: middle;
      }
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
