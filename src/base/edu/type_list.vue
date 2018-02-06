<template>
  <div class="item-list clearfix">
    <p>{{title}}：</p>
    <ul class="lists clearfix">
      <li :class="{active:!current.length}"
          @click="toggle('')">全部
      </li>
      <li v-for="(item,index) in type_list"
          :key="index"
          :class="{active:current.includes(item.id)}" @click="toggle(item.id)">
        {{item.classname}}
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '面向人群'
      },
      type_list: {
        type: Array,
        default: ''
      },
      isCheckBox: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        current: []
      }
    },
    methods: {
      toggle(id) {
        if (this.isCheckBox) {  //多选
          const index = this.current.indexOf(id)
          if (id === '') {  //点击全部清空
            this.current = []
          } else if (index !== -1) {  //去重
            this.current.splice(index, 1)
          } else {
            this.current.push(id)
          }
          if (this.current.length === this.type_list.length) {
            this.current = []
          }
        } else {  //单选
          this.current = []
          this.current.push(id)
          if (id === '') this.current = []
        }
        this.$emit('toggle', this.current)
      }
    }
  }
</script>
<style lang="less" scoped>
  .item-list {
    padding-top: 8px;
    padding-bottom: 3px;
    border-bottom: 1px dashed #e4e4e4;
    p {
      color: #a3a3a3;
      font-size: 14px;
      float: left;
      margin-top: 6px;
    }
    .lists {
      float: left;
      width: 1100px;
      li {
        color: #6c6c6c;
        font-size: 14px;
        float: left;
        cursor: pointer;
        padding: 8px 15px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 5px;
        &:hover {
          background: #d4d4d4;
          color: #fff;
        }
        &.active {
          background-image: -webkit-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -moz-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -o-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: -ms-linear-gradient(135deg, #00d0fb, #00acf6);
          background-image: linear-gradient(135deg, #00d0fb, #00acf6);
          color: #fff;
        }
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
</style>
