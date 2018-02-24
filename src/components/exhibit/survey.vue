<template>
  <div class="survey-con">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"
      @handleClick="getBanner"/>
    <bg class="item">
      <p class="title">全新科技馆<span></span></p>
      <div class="txt-con">
        <p class="txt">
          四川科技馆位于成都市中心天府广场北侧,由原四川省 展览馆改建而成,占地面积60000m²,建筑面积41800m²。 于2006年11月2日建成开放,经过10年的运行,于2016年 6月进行全面更新改造
        </p>
        <img src="../../assets/survey_03.jpg" class="bg-img"/>
        <p class="txt">
          改造后的四川科技馆展示面积约25000m²,1F-3F分别 以“三问—问天、问水、问未来,三寻—寻知、寻智、寻 迹,三生—生命、生存、生活”为主题,生动形象地展示了 航空航天、都江堰水利工程、
          儿童科技乐园,数学、力学、 声学等基础学科、机器人,科学生活等相关方面的科学知 识,共计16个展区360件(项)展品,以及4D影院、飞向未 来剧场、机器人剧场、生命起源剧场4个特色剧场。
        </p>
        <ul class="floor clearfix">
          <li>
            <img src="../../assets/survey-01.png"/>
            <div class="list">
              <h2 class="floor-txt">1F</h2>
              <p class="one">航天航空</p>
              <p class="one">都江堰水利工程</p>
              <p class="one">儿童馆</p>
            </div>
          </li>
          <li>
            <img src="../../assets/survey-02.png"/>
            <div class="list">
              <h2 class="floor-txt">2F</h2>
              <p class="one">机器人大世界</p>
              <p class="one">基础科学</p>
            </div>
          </li>
          <li>
            <img src="../../assets/survey-03.png"/>
            <div class="list">
              <h2 class="floor-txt">3F</h2>
              <p class="one">生命科学</p>
              <p class="one">健康生活</p>
              <p class="one">防灾避险</p>
              <p class="one">生态家园</p>
              <p class="one">交通科技</p>
              <p class="one">好奇科技</p>
            </div>
          </li>
          <li>
            <img src="../../assets/survey-04.png"/>
            <div class="list">
              <h2 class="floor-txt">4F</h2>
              <p class="one">美科新未来学院</p>
            </div>
          </li>
        </ul>
        <div class="floor-item">
          <span class="grad">
            1F 航空航天、都江堰水利工程、儿童馆
          </span>
          <div class="grad-bg grad-1f">
            <div class="mask">
              <p>
                1F以“三问——问天、问水、问未来”为主题, 包括室内四个展厅和东西庭两个室外展厅。
                “航空航 天”展厅约1500m²,展示了航空航天领域的基础知识 和科技发展,人类探索太空的历程以及天文现象等;
                都江堰水利工程模型约800m²,通过展示鱼嘴、飞沙 堰、宝瓶口三大渠首工程,主要揭秘李冰治水的科学 原理;
                儿童馆约2600m²,包括探索自然奥秘、感知与 分享、快乐成长天地三个展厅(限6岁以下儿童并由家 长陪伴参与),
                其展品带给孩子们探索、观察、倾 听、触摸、讨论及玩耍的机会。让孩子们在参与过程 中获得动手、动脑、身心并用的体验。
                当孩子们离开 后能获得更加宽广的视野,对脚下土地的好奇心也必 将让孩子们越走越远。
              </p>
            </div>
          </div>
        </div>
        <div class="floor-item">
          <span class="grad">
            2F 机器人大世界、基础科学
          </span>
          <div class="grad-bg grad-2f">
            <div class="mask">
              <p>
                2F以“三寻——寻知、寻智、寻迹”为主题,展示面 积约5200m²,包括声光电厅、数学力学厅、虚拟厅、机械 厅、机器人大世界及四川省十二五科技创新成就展等6个主 题展厅,涵盖了趣味数学、经典物理、神奇的力、美妙的 光、巧妙的机械装置等基础科学类的经典展项以及利用 VR虚拟现实技术增强观众与虚拟环境的沉浸感、交互感和 体验感的展项,展示了科技的美妙与神奇;此外,机器人 展厅运用多元化的展示手段,展示了各式各样身怀绝技的 机器人。
              </p>
            </div>
          </div>
        </div>
        <div class="floor-item">
          <span class="grad">
            3F 生命科学、健康生活、防灾避险、生态家园、交通科技、好奇生活
          </span>
          <div class="grad-bg grad-3f">
            <div class="mask">
              <p>
                3F以“三生——生命、生存、生活”为主题,展示面积约 5200m²,包括生命科学、健康生活、防灾避险、生态家园、交 通科技和好奇生活等6个主题展厅,涵盖了人体和生命的奥秘、 科学的生活方式、真实灾难险境中的处置方式、生态建设以及 水资源利用、交通工具的发展与历史变迁,日常生活中的科学 知识等方面的内容。
              </p>
            </div>
          </div>
        </div>
        <div class="floor-item">
          <span class="grad">
            4F 美科未来新学院
          </span>
          <div class="grad-bg grad-4f">
            <div class="mask">
              <p>
                为了建设全民的科学中心,“美科新未来学院”作为1-3F常展区 的有益补充,完善了我馆科普教育的功能和形式。按照投资和运营主 体的不同,划分为三类项目:第一类是我馆自主运营的科普教学和科 学表演项目,有机器人工作室和科学秀(SE剧场);第二类是由四 川省科协培训中心与社会专业机构合作经营的项目,有杨梅红艺术与 科学创意中心、次元空间和蒲公英创客学院(除机器人工作室);第 三类是我馆引进的专业社会机构投资经营的项目,有文轩 · 格致书 馆、智胜乐飞航空科普体验园。
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="text-info">
        <no-data></no-data>
      </div>-->
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import {getBannerMixin} from '@/public/js/mixin'
  import Bg from '@/base/bg'
  import NoData from '@/base/no-data'

  export default {
    mixins: [getBannerMixin],
    components: {
      Banner,
      Bg,
      NoData
    },
    data() {
      return {
        navs: [
          {
            href: '/exhibit/survey',
            title: '展馆概况',
            id: 5
          },
          {
            href: '/exhibit/guide',
            title: '楼层导览',
            id: 1
          },
          {
            href: '/exhibit/round',
            title: '全景环游',
            id: 4
          },
          {
            href: '/exhibit/theater',
            title: '影院剧场',
            id: 2
          },
          {
            href: '/exhibit/succinct',
            title: '展品精粹',
            id: 3
          }
        ],
        title: '常设展览',
      }
    },
    created() {
      this.getBanner()
    },
    methods: {
      /**
       * 获取楼层导览banner
       * @param id  分类id
       */
      getBanner(id = 5) {
        this.getBannerData({id: id, url: 'api/oftenbanner'})
      },
    }
  }
</script>
<style lang="less">
  .survey-con {
    .item {
      padding-top: 50px;
      padding-bottom: 60px;
      .title {
        font-size: 20px;
        color: #666;
        text-align: center;
        margin-bottom: 35px;
        span {
          width: 80px;
          height: 4px;
          display: block;
          margin: 10px auto;
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          -webkit-border-radius: 10px;
          -moz-border-radius: 10px;
          border-radius: 10px;
        }
      }
      .txt-con {
        width: 1200px;
        margin: auto;
        .txt {
          font-size: 14px;
          color: #666;
          letter-spacing: 2px;
          line-height: 25px;
          text-indent: 2em;
          text-align: justify;
        }
        .bg-img {
          width: 100%;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .floor {
          width: 100%;
          margin-top: 50px;
          margin-bottom: 50px;
          li {
            float: left;
            width: 270px;
            text-align: center;
            margin-right: 40px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            .list {
              margin-top: 20px;
              background: url("../../assets/grad-bg.jpg");
              width: 100%;
              height: 380px;
              text-align: center;
              .floor-txt {
                font-size: 50px;
                padding: 28px 0;
                color: #fff;
                text-align: center;
              }
              .one {
                font-size: 18px;
                color: #fff;
                text-align: center;
                padding: 5px;
              }
            }
            &:last-child {
              margin-right: 0;
            }
          }
        }
        .floor-item {
          text-align: center;
          margin-top: 60px;
          .grad{
            font-size: 16px;
            color: #333;
            padding-bottom: 4px;
            border-bottom: 3px solid #00c3fa;
            margin-bottom: 40px;
            display: inline-block;
          }
          .grad-bg{
            width: 100%;
            height: 600px;
            position: relative;
            &.grad-1f{
              background: url("../../assets/survey_20.jpg") no-repeat;
            }
            &.grad-2f{
              background: url("../../assets/survey_22.jpg") no-repeat;
            }
            &.grad-3f{
              background: url("../../assets/survey_24.jpg") no-repeat;
            }
            &.grad-4f{
              background: url("../../assets/survey_26.jpg") no-repeat;
            }
            .mask{
              position: absolute;
              bottom: 0;
              height: 250px;
              background: rgba(0,0,0,.5);
              left: 0;
              p{
                padding: 30px 45px;
                color: #fff;
                font-size: 15px;
                text-align: justify;
                line-height: 25px;
                letter-spacing: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
