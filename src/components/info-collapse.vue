<template>
  <div class="info-collapse">
    <div @click="handleInfo($event)">
      <!-- <i class="el-icon-arrow-down font-600" v-if="defaultInfoShow"></i>
      <i class="el-icon-arrow-up font-600" v-else></i>
      <span> {{ infoTitle }}</span> -->
      <slot name="title"></slot>
    </div>
    <el-collapse-transition>
      <div v-show="defaultInfoShow">
        <slot name="content"></slot>
      </div>
    </el-collapse-transition>
  </div>

</template>

<script>
export default {
  props: {
    infoTitle: {
      type: String,
      default: ''
    },
    propsInfoShow: null
  },
  data() {
    return {
      defaultInfoShow: false
    }
  },
  computed: {

  },
  methods: {
    handleInfo(e) {
      if (!this.propsInfoShow) {
        this.defaultInfoShow = !this.defaultInfoShow
      } else {
        this.$emit('onInfoCollapseChange')
      }
      // console.log(document.getElementsByClassName('info-title'))
      // console.log(e.target.classList.toggle('rotate-90'))
      e.target.childNodes[1].classList.toggle('rotate-90')
      // e.target.classList.toggle('rotate-90')
    }
  }
}
</script>

<style lang="scss" scoped>
.info-collapse {
  position: relative;

  .info-title {
    padding: 10px 0px;
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    font-size: 14Px;
    // cursor: pointer;
    // &:hover{
    //   opacity: 0.7;
    // }
  }
}
</style>
