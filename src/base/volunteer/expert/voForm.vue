<template>
  <div class="vo-form clearfix">
    <div class="form-con clearfix" v-if="isLogin">
      <div class="head-img clearfix">
        <label class="lab"><span>*</span>照片：</label>
        <div class="img-box">
          <img :src="formValidate.img ? formValidate.img : defaultImg"/>
          <p class="btn-head" @click="toggleShow">{{formValidate.img ? '修改头像' : '上传头像'}}</p>
          <my-upload field="img"
                     @crop-success="cropSuccess"
                     v-model="show"
                     :width="220"
                     :height="260"
                     :noCircle="true"
                     :noRotate="false"
                     img-format="png"></my-upload>
          <p style="display: none;" :class="{err:imgerr}">请上传头像</p>
        </div>
        <p class="notice"><span>*</span> 请上传本人真实照片</p>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="form-box">
        <FormItem prop="name" label="姓名：">
          <Input size="large" v-model="formValidate.name" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem label="性别：" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio size="large" label="1">男</Radio>
            <Radio size="large" label="2">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="出生年月：" prop="born">
          <DatePicker size="large" type="date" placeholder="请选择日期" v-model="formValidate.born"></DatePicker>
        </FormItem>
        <FormItem label="学历：" prop="degree">
          <Select size="large" v-model="formValidate.degree" placeholder="请选择您的学历">
            <Option value="4">大专</Option>
            <Option value="1">本科</Option>
            <Option value="2">硕士</Option>
            <Option value="3">博士</Option>
          </Select>
        </FormItem>
        <FormItem label="专业/特长" prop="specialty">
          <Input v-model="formValidate.specialty" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                 placeholder="请填写内容"></Input>
        </FormItem>
        <FormItem prop="card" label="身份证号码：">
          <Input size="large" v-model="formValidate.card" placeholder="请输入您的身份证号码"></Input>
        </FormItem>
        <FormItem prop="phone" label="联系电话：">
          <Input size="large" v-model="formValidate.phone" placeholder="请输入您的手机号"></Input>
        </FormItem>
        <FormItem prop="wx" label="微信号：">
          <Input size="large" v-model="formValidate.wx" placeholder="请输入您的微信号："></Input>
        </FormItem>
        <FormItem prop="unit" label="工作单位：">
          <Input size="large" v-model="formValidate.unit" placeholder="请填写工作单位："></Input>
        </FormItem>
        <FormItem label="志愿者服务经历：" prop="experience">
          <Input v-model="formValidate.experience" type="textarea" :autosize="{minRows: 5,maxRows: 10}"
                 placeholder="请填写经历"></Input>
        </FormItem>
        <p class="sumbitBtn" @click="handleSubmit('formValidate')">提交申请表</p>
      </Form>
    </div>
    <no-login v-if="!isLogin" title="请先登录"></no-login>
  </div>
</template>
<script type="text/ecmascript-6">
  import myUpload from 'vue-image-crop-upload'
  import moment from 'moment'
  import noLogin from '@/base/no-login'

  export default {
    props: {
      isLogin: {
        type: Boolean,
        default: false
      }
    },
    components: {
      myUpload,
      noLogin
    },
    data() {
      return {
        isChoose: false,
        defaultImg: '../static/images/loading.png',
        show: false,
        imgerr: false,
        formValidate: {
          img: '',
          name: '',
          gender: '',
          born: '',
          degree: '',
          specialty: '',
          card: '',
          phone: '',
          wx: '',
          experience: '',
          unit: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          born: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ],
          degree: [
            {required: true, message: '请选择您的学历', trigger: 'change'}
          ],
          specialty: [
            {required: true, message: '请填写内容', trigger: 'blur'}
          ],
          card: [
            {required: true, message: '请填写您的身份证号码', trigger: 'blur'},
            {
              required: true,
              pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
              message: '请填写有效身份证号'
            }
          ],
          phone: [
            {required: true, message: '请填写您的手机号', trigger: 'blur'},
            {required: true, message: '请填写正确手机号', pattern: /^1[0-9]{10}$/}
          ],
          wx: [
            {required: true, message: '请填写您的微信号', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '请填写工作单位', trigger: 'blur'}
          ],
          experience: [
            {required: true, message: '请填写您的经历', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      cropSuccess(imgDataUrl, field) {
        this.isChoose = true
        this.formValidate.img = imgDataUrl;
        this.imgerr = false
      },
      toggleShow() {
        this.show = !this.show;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (!this.formValidate.img) {
            this.imgerr = true
            return
          }
          if (valid) {
            this.formValidate.born = moment(this.formValidate.born).format('X')
            this.$emit('next', this.formValidate)
            this.formValidate.born = ''
          }
        })
      },
    }
  }
</script>
<style lang="less">
  .vo-form {
    .form-con {
      width: 580px;
      margin: auto;
      .lab {
        width: 140px;
        float: left;
        margin-top: 5px;
        font-size: 16px;
        color: #333;
        text-align: right;
        margin-right: 20px;
        span {
          color: #ed3f14;
          padding-right: 5px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .head-img {
        margin-bottom: 30px;
        .img-box {
          float: left;
          width: 220px;
          height: 300px;
          position: relative;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          line-height: 260px;
          border: 1px solid #dddee1;
          .err {
            position: absolute;
            color: #ed3f14;
            font-size: 14px;
            bottom: -144px;
            display: block !important;
          }
          img {
            width: 100%;
            display: block;
          }
          .btn-head {
            position: absolute;
            bottom: 0;
            height: 40px;
            line-height: 40px;
            background: rgba(0, 0, 0, .6);
            cursor: pointer;
            width: 100%;
            font-size: 15px;
            color: #fff;
            text-align: center;
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
          }
        }
        .notice {
          font-size: 14px;
          margin-top: 250px;
          span {
            color: #ff1010;
            margin-top: 10px;
            margin-left: 10px;
          }
        }
      }
      .form-box {
        width: 100%;
        .ivu-form-item {
          width: 100%;
          .ivu-form-item-label {
            width: 140px;
            float: left;
            margin-top: 8px;
            font-size: 16px;
            color: #333;
            text-align: right;
            margin-right: 20px;
            padding: 0;
          }
          .ivu-form-item-content {
            float: left;
            width: 400px;
            .other {
              border-bottom: 1px solid #999;
            }
            .start-date, .end-date {
              float: left;
              width: 45%;
              .ivu-form-item-content {
                width: 100%;
              }
            }
            .txt {
              width: 10%;
              float: left;
              font-size: 16px;
              color: #333;
              text-align: center;
            }
            .ivu-date-picker {
              width: 100%;
            }
          }
        }
        .sumbitBtn {
          cursor: pointer;
          display: table;
          margin: auto;
          padding: 8px 20px;
          font-size: 15px;
          color: #fff;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          background-image: linear-gradient(90deg,
          #00b1f6 0%,
          #21bef8 0%,
          #41cbfa 0%,
          #21cefb 0%,
          #00d0fb 0%,
          #00acf6 100%),
          linear-gradient(
            #ffffff,
            #ffffff);
          margin-top: 60px;
          overflow: hidden;
        }
      }
    }
  }
</style>
