<template>
  <el-row type="flex" justify='end' class="m-0 p-0 h-full w-full items-center">
    <p class="text-3xl mx-4">@{{ footerText }}</p>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Footer',
  components: {
  },
  computed: {
    ...mapState({
      footerText: state => state.base.footerText
    })
  },
  mounted() {
    console.log(this.footerText)
  },


}
</script>