<template>
  <ul class="m-type clearfix">
    <li v-for="(item,index) in navBar"
        :key="index"
        @click="handleClick(index,item.id)"
        :class="{active:index===current}">
      <a v-if="item.href" :href="item.href" target="_blank">
        {{item.title}}
      </a>
      <p v-else>
        {{item.title}}
      </p>
    </li>
  </ul>
</template>
<script type="text/ecmascript-6">

  export default {
    props: {
      navBar: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        current: 0
      }
    },
    methods: {

      handleClick(index, id) {
        this.current = index
        this.$emit('handleClick', id)
      }
    }
  }
</script>
<style scoped lang="less">
  .m-type {
    margin-bottom: 30px;
    height: 40px;
    background: #ececec;
    line-height: 40px;
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 3px 36px 0 #f7f7f7;
    li {
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
      width: 140px;
      color: #555555;
      text-align: center;
      border-right: 1px solid #fff;
      a {
        color: #555555;
        display: block;
      }
      &.active {
        background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
        background-image: linear-gradient(135deg, #00d0fb, #00acf6);
        color: #fff;
        a {
          color: #fff;
        }
      }
    }
  }
</style>
