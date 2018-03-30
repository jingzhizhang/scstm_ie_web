<template>
  <div class="vo-notice">
    <div class="item">
      <p class="title">一、招募条件</p>
      <p class="content">
        1.18—65周岁，大专以上文凭，身心健康，交通便利。<br>
        2.具有良好的思想道德品质、热心公益事业，具有奉献精神。<br>
        3.普通话标准，具有较好的沟通表达能力。<br>
        4.具有良好的纪律性和团队协作精神。<br>
        5.时间充裕者优先，适应周末、节假日、春节寒假，服从安排。</p>
    </div>
    <div class="item">
      <p class="title">二、工作职责</p>
      <p class="content">
        1.展厅管理：负责展厅展品开关机，正确引导观众操作展品，展品故障报修，引导观众有序参观等。<br>
        2.活动实施：协助辅导员或独立策划、实施专业或擅长领域的教育活动或科普讲座。独立开展定时开放展项活动。<br>
        3.游客服务：包括“票务服务”和“参观咨询”两个岗位。“票务服务”负责引导预约观众取票。“参观咨询”岗位则需接受观众现场及
        电话咨询等。</p>
    </div>
    <div class="item">
      <p class="title">三、工作时间</p>
      <p class="content">
        周末、法定节假日、寒暑假<br>
        9：00-16：30
      </p>
    </div>
    <div class="item">
      <p class="title">四、志愿者行为规范</p>
      <p class="content">
        1.自觉接受管理部门安排的岗位和工作，服从调配，如有特殊情况应向管理部门提出。<br>
        2.上岗实行签到制度，未签到、签退视服务无效。上岗和离岗时，到志愿者工作办公室签到及签退。<br>
        3.准时到岗，不迟到，不早退，不缺勤。<br>
        4. 在工作岗位上不得无故脱岗，不扎堆闲聊，不得吃东西，不读书看报，不玩手机。如有特殊情况需离开，应取得工作人员同意。<br>
        5.在岗期间需佩戴志愿者证，着统一发放的志愿者服，保持仪容仪表整洁，不着奇装异服，不穿拖鞋，不化浓妆，不戴夸张饰物。<br>
        6.普通话用语标准，精神饱满。<br>
        7.如遇观众咨询应热情主动，大方得体应答，不可态度傲慢、爱搭不理，避免与公众发生争吵、纠纷。<br>
        8.未经允许不得从事任何与志愿服务无关的广告宣传活动。<br>
        9.不得向服务对象收取任何财物报酬。<br>
        10.志愿者在当日服务结束后，应及时持《四川科技馆志愿者服务证》到志愿者办公室盖章。本轮服务结束后，工作合格者到志愿者办公室领取交通补贴，并归还志愿者标识。<br>
        11.表现消极、有损本馆和志愿者形象及日常考核不合格的志愿者，本馆将予以辞退，2年内不得再申请四川科技馆志愿者。
      </p>
    </div>
    <div class="item">
      <p class="title">五、报名表</p>
      <p class="content">
        请仔细阅读以上内容后谨慎填写报名表，便于准确建立志愿者资料库，我馆每年将评选出“年度星级志愿者”。"
      </p>
    </div>
    <div class="remember">
      <input type="checkbox" ref="checkbox" class="checkbox" @click="handleInput()"/>
      <span>我已阅读并同意遵守相关条约</span>
    </div>
    <p class="next" :class="{active:isNext}" @click="next()">下一步</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isNext: false
      }
    },
    methods: {
      handleInput() {
        this.isNext = this.$refs.checkbox.checked
      },
      next() {
        if (this.$refs.checkbox.checked) {
          this.$emit('next')
        }
      }
    }
  }
</script>
<style lang="less">
  .vo-notice {
    .item {
      font-size: 15px;
      color: #333;
      margin-bottom: 20px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .content {
        line-height: 34px;
      }
    }
    .remember {
      text-align: center;
      margin-top: 40px;
      input {
        display: inline-block;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        color: #333;
      }
    }
    .next {
      padding: 8px 20px;
      background: gray;
      font-size: 15px;
      color: #fff;
      display: table;
      margin: 30px auto;
      -webkit-border-radius: 2px;
      -moz-border-radius: 2px;
      border-radius: 2px;
      cursor: pointer;
      &.active {
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
      }
    }
  }
</style>
