<template>
  <div class="flex justify-between">
    <el-button class="border-0 text-2xl px-2 py-1" icon="el-icon-menu" circle @click="toToggle()"></el-button>
    <div class="flex">
      <addFishIcon ref="addFish"></addFishIcon>
      <languageIcon></languageIcon>
      <el-button class="border-0 text-2xl px-2 py-1" icon="el-icon-s-tools" circle></el-button>
    </div>
  </div>

</template>

<script>
import asideServce from "../aside/asideServce";
import addFishIcon from '../icons/addFish.vue'
import languageIcon from "../icons/language.vue";
export default {
  name: "Head",
  components: {
    addFishIcon,
    languageIcon
  },
  data() {
    return {};
  },
  created() {
  },
  mounted() {
  },
  methods: {
    toToggle(bool) {
      // bool ? asideServce.$emit("toggle", bool) : asideServce.$emit("toggle");
      //$emit这个方法会触发一个事件
      console.log(this.$refs)
    },
  },
};
</script>