<template>
	<div>
		<el-form :inline="true" class="flex">
			<el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword">
			</el-input>
			<el-button type="primary" @click="toSearch">查询</el-button>
		</el-form>
		<el-table :data="fishList" style="width: 100%" >
			<el-table-column label="中文" prop="cnName">
			</el-table-column>
			<el-table-column label="日文" prop="jpName">
			</el-table-column>
			<el-table-column label="图片" prop="imageUrl">
			</el-table-column>
			<el-table-column label="B站链接" prop="bilibiliUrl">
			</el-table-column>
			<el-table-column label="油管链接" prop="uTuberUrl">
			</el-table-column>
			<el-table-column label="备注" prop="note">
			</el-table-column>
			<el-table-column label="商品 ID" prop="id">
			</el-table-column>
		</el-table>
		<el-dialog title="" :visible.sync="dialogDetail"></el-dialog>
		<div id="mutation" data-foo="foo1"></div>
	</div>

</template>

<script>
import baseApi from '../api/base';
import { mapState } from 'vuex'
class Test{
	constructor(name,age){
		this.name = name 
		this.age = age
	}
	print(){
		console.log('print',this.name ,this.age)
	}
}
export default {
	components: {},
	data() {
		return {
			keyword: '',
			dialogDetail: false,
			testData : new Test('jack',10)
		}
	},
	computed: {
		...mapState({
			fishList: state => state.fish.fishList,
		})
	},
	mounted() {
		this.getfishList()
		this.testData.print()

		let observer = new MutationObserver(
			(mutationRecords) => console.log(mutationRecords));
		observer.observe(document.getElementById('mutation'), { attributes: true }); 
		document.getElementById('mutation').setAttribute('foo', 'bar')
	},

	methods: {
		getfishList() {
			this.$store.dispatch('updateFishList')
		},
		toSearch() {
			baseApi.queryFish({ keyword: this.keyword }).then(res => {
				if (res.data.resultCode === '01') {
					const { list } = res.data.resultData
					console.log(list)
					this.fishList = list || []
				}
			})
		},
		clickCell(row, column, cell, event) {
			this.dialogDetail = true
			console.log(row, column, cell, event)
		}
	},

}
</script>
<style lang='scss' scoped>

</style>