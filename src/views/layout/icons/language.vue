<template>
   <el-dropdown :hide-on-click="false" class="border-0 text-2xl px-2">
				<el-button  icon="el-icon-s-flag"  class="border-0 text-2xl px-2 py-1"   circle></el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><i class="el-icon-edit">chinese</i></el-dropdown-item>
					<el-dropdown-item><i class="el-icon-edit">japanese</i></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
</template>

<script>
export default {
 components: {},
 data() {
 return {}
 },
 computed: {},
 methods: {},
}
</script>
<style lang='scss'>
</style>