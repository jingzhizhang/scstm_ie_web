<template>
  <div class="traffic">
    <div class="traffic-map">
      <div id="map"></div>
      <p class="title">地址：中国四川省成都市人民中路一段16号</p>
    </div>
    <div class="traffic-info">
      <div class="traffic-item">
        <p class="title">怎么去科技馆</p>
        <div class="traffic-con">
          <div class="con-tit">科技馆周边</div>
          <p class="clearfix">
            <span class="con-button">乘地铁</span>
            换乘 / 乘坐
            <span class="orange">1号线</span>
            到天府广场站下
          </p>
          <p class="clearfix">
            <span class="con-button">乘公交</span>
            天府广场公交站：16、45、53、61、64、机场专线2号线&nbsp;&nbsp;&nbsp;&nbsp;西御街公交站：13、30、47、51、64、78&nbsp;&nbsp;&nbsp;&nbsp;东御街公交站：47、51、62、104、334
          </p>
          <div class="con-tit">机场方向</div>
          <p class="clearfix">
            <span class="con-button">乘地铁</span>
            ［43分钟］地铁
            <span class="orange">10号线</span>
            → 地铁
            <span class="orange">3号线</span>
            → 地铁
            <span class="orange">1号线</span>
            天府广场站（F出口）下车
          </p>
          <p class="clearfix">
            <span class="con-button">乘公交</span>
            ［1小时7分钟］机场专线 <span class="orange">2号线</span> ,  天府广场站下车
          </p>
          <div class="con-tit">火车站方向</div>
          <div class="con-tit-sm">［火车东站］</div>
          <p class="clearfix">
            <span class="con-button">乘地铁</span>
            ［32分钟］地铁 <span class="orange">2号线</span> , 天府广场站（F出口）下车
          </p>
          <div class="con-tit-sm" style="margin-top: 10px">［火车北站］</div>
          <p class="clearfix">
            <span class="con-button">乘地铁</span>
            ［19分钟］ 地铁 <span class="orange">2号线</span> , 天府广场站（F出口）下车
          </p>
        </div>
      </div>
      <!--<div class="traffic-item">
        <p class="title" style="margin-bottom: 30px">停车信息</p>
        <div class="traffic-con">
          <p>四川科技馆停车场位于科技馆2号门出入口外，分设两个区域，总面积约为1280平方米。泊车方便，可停放各类型的车辆</p>
          <p>1、开放时间：周二至周日7:15~19:30，周一休馆（国定假日除外）</p>
          <p>2、收费标准：自2017年4月1日实施</p>
          <div class="guide-table">
            <table class="item">
              <tbody class="clearfix">
              <tr>
                <td>
                  <div class="txt">小型车</div>
                </td>
                <td>
                  <div class="txt">
                    停车小于0.5小时<br/>
                    <span class="orange">不收费</span>
                  </div>
                </td>
                <td>
                  <div class="txt">
                    0.5小时至1.5小时<br/>
                    <span class="orange">5元</span>
                  </div>
                </td>
                <td>
                  <div class="txt">
                    1.5小时至4小时<br/>
                    <span class="orange">10元</span>
                  </div>
                </td>
                <td>
                  <div class="txt">
                    4小时以上至8小时按5元/小时计费<br/>
                    上限为20元，24小时内不重复计费
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
            <table class="item">
              <tbody class="clearfix">
              <tr>
                <td>
                  <div class="txt">大型车</div>
                </td>
                <td style="width: 224px">
                  <div class="txt">
                    停车小于0.5小时<br/>
                    <span class="orange">不收费</span>
                  </div>
                </td>
                <td>
                  <div class="txt">
                    按7元每小时收费、上限为30元、24小时内不重复计费<br/>
                    <span class="orange">7元 / 小时 30元 / 天</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BMap from 'BMap'

  export default {
    data() {
      return {
      }
    },
    mounted() {
      this.readyMap()
    },
    methods: {
      /**
       * 加载百度地图
       */
      readyMap() {
        var map = new BMap.Map('map')
        var point = new BMap.Point(104.072268, 30.666134)
        map.centerAndZoom(point, 14)
        //map.addControl(new BMap.MapTypeControl())
        map.enableScrollWheelZoom(true)
        map.enableDoubleClickZoom(true)
        var marker = new BMap.Marker(point)
        map.addOverlay(marker)

        map.centerAndZoom(point, 16)
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
      }
    }
  }
</script>
<style lang="less">
  .traffic {
    width: 100%;
    .traffic-map {
      width: 100%;
      margin-bottom: 40px;
      #map {
        width: 100%;
        height: 470px;
      }
      .title {
        font-size: 17px;
        color: #232323;
        margin-top: 28px;
        text-align: center;
      }
    }
    .traffic-info {
      width: 100%;
      .traffic-item {
        .title {
          font-size: 28px;
          color: #333;
          padding-bottom: 30px;
          border-bottom: 1px solid #dcdcdc;
          margin-top: 60px;
        }
        .traffic-con {
          .con-tit {
            font-size: 24px;
            color: #333;
            background: url("../../assets/spot.jpg") 0 14px no-repeat;
            padding-left: 20px;
            margin-top: 30px;
            padding-bottom: 30px;
          }
          .con-tit-sm{
            font-size: 20px;
            color: #333;
            padding-left: 20px;
            padding-bottom: 20px;
          }
          p{
            text-indent: 0;
            margin: 0;
            font-size: 16px;
            padding-bottom: 15px;
            padding-left: 20px;
            .con-button{
              width: 70px;
              height: 25px;
              background: #3b97ee;
              background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
              background-image: linear-gradient(135deg, #00d0fb, #00acf6);
              color: #fff;
              font-size: 16px;
              line-height: 25px;
              float: left;
              text-align: center;
              margin-right: 20px;
            }
            .orange{
              color: #fd7958 !important;
            }
          }
          .guide-table{
            width: 100%;
            padding-bottom: 60px;
            .item{
              margin-top: 30px;
              width: 100%;
              td{
                padding-left: 20px;
                padding-right: 20px;
                background: #edf2f6;
                height: 60px;
                font-size: 16px;
                border-right: 1px solid #c9ced2;
                .txt{
                  text-align: center;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: normal;
                  word-break: break-all;
                  box-sizing: border-box;
                  line-height:22px;
                }
                .orange{
                  color: #fd7958 !important;
                }
                &:nth-of-type(1){
                  width: 124px;
                  border-left: 4px solid #e9654c;
                }
                &:last-child{
                  border-right: none;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
