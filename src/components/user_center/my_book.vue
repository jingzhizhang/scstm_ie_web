<template>
  <div class="my-book">
    <banner
      :navs="navs"
      :banner="banner"
      :title="title"/>
    <bg>
      <div class="book-con">
        <expect></expect>
      </div>
    </bg>
  </div>
</template>
<script type="text/ecmascript-6">
  import Banner from '@/base/banner'
  import Bg from '@/base/bg'
  import Expect from '@/base/expect'

  export default {
    components: {
      Banner,
      Bg,
      Expect
    },
    data() {
      return {
        navs: [
          {
            href: '/user_center/setting',
            title: '个人设置',
            id: ''
          },
          {
            href: '/user_center/manage',
            title: '账号管理',
            id: ''
          },
          {
            href: '/user_center/my_book',
            title: '我的预约',
            id: ''
          },
        ],
        title: '账号设置',
        banner: '../static/images/user.jpg',
      }
    }
  }
</script>
<style lang="less">
  .book-con{
    width: 1200px;
    padding-top: 50px;
    padding-bottom: 60px;
    margin: 0 auto;
  }
</style>
