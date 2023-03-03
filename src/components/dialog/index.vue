<template>
  <div class="member-upgrade-box" v-show="showPopup">
    <div class="shelter">
      <el-button @click="showPopup = false">close</el-button>
      12312312
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "memberUpgradeBox",
  props: {
    show: false,
    type: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    buttons: {
      type: Object,
      default() {
      },
    },
  },
  data() {
    return {
      proM: 12,
      prosM: 79,
      proY: 60,
      prosY: 588,
      selectVipType: false,
      showPopup: false,
    };
  },
  computed: {
  },
  watch: {
    show(nv) {
      this.showPopup = nv;
    },
  },
  created() {
    this.showPopup = this.show;
  },
  mounted() { },
  methods: {
    doAction(item) {
      if (!item.keepOpen) {
        this.showPopup = false;
      }
      item.clickAction && item.clickAction();
    },
  },
};

</script>

<style type="text/css" lang="scss" scoped>
.member-upgrade-box {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  font-family: "Montserrat-Regular";
}

.content {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 640px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  padding-top: 60px;
  padding-bottom: 40px;
  text-align: center;
}
</style>

