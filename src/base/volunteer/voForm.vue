<template>
  <div class="vo-form clearfix">
    <div class="form-con clearfix">
      <div class="head-img clearfix">
        <label class="lab"><span>*</span>照片：</label>
        <div class="img-box">
          <img :src="img ? img : defaultImg"/>
          <p class="btn-head" @click="toggleShow">{{img ? '修改头像' : '上传头像'}}</p>
          <my-upload field="img"
                     @crop-success="cropSuccess"
                     v-model="show"
                     :width="220"
                     :height="260"
                     :noCircle="true"
                     :noRotate="false"
                     img-format="png"></my-upload>
        </div>
        <p class="notice"><span>*</span> 请上传本人真实照片</p>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="form-box">
        <FormItem prop="name" label="姓名：">
          <Input size="large" v-model="formValidate.name" placeholder="请输入您的姓名"></Input>
        </FormItem>
        <FormItem label="性别：" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio size="large" label="male">男</Radio>
            <Radio size="large" label="female">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="出生年月：" prop="date">
          <DatePicker size="large" type="date" placeholder="请选择日期" v-model="formValidate.date"></DatePicker>
        </FormItem>
        <p class="sumbitBtn" @click="handleSubmit('formValidate')">提交申请表</p>
      </Form>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import myUpload from 'vue-image-crop-upload'

  export default {
    components: {
      myUpload
    },
    data() {
      return {
        isChoose: false,
        defaultImg: '../static/images/loading.png',
        show: false,
        img: '',
        formValidate: {
          name: '',
          gender: '',
          date: ''
        },
        ruleValidate: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          date: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      cropSuccess(imgDataUrl, field) {
        this.isChoose = true
        this.img = imgDataUrl;
      },
      toggleShow() {
        this.show = !this.show;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
    }
  }
</script>
<style lang="less">
  .vo-form {
    .form-con {
      width: 550px;
      margin: auto;
      .lab {
        width: 100px;
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
          overflow: hidden;
          line-height: 260px;
          border: 1px solid #dddee1;
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
          margin-bottom: 30px;
          .ivu-form-item-label {
            width: 100px;
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
            width: 420px;
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
