<template>
	<div class="container">
		<h1 class="text-center text-3xl">csv文件转json</h1>
		<input type="file" id="files-list" @change="inputChange" />
		<div>
			<el-input v-model="fileName" placeholder="请输入要生成的文件名，否则为默认名"></el-input>
		</div>
		<div>
			<el-button size="medium" @click="saveJSON(1)">中文</el-button>
			<el-button size="medium" @click="saveJSON(2)">日文</el-button>
			<el-button size="medium" @click="saveJSON(3)">英文</el-button>
			<!-- <el-button size="medium" @click="saveJSON(-1)">全部</el-button> -->
			<el-button @click="down">测试</el-button>
			<a id="h">点此进行下载</a>
		</div>

	</div>

</template>

<script>

export default {
	name: 'home',
	components: {},
	data() {
		return {
			chineseJson: {},
			japaneseJson: {},
			englishJson: {},
			fileName:'',
			file:null
		}
	},
	mounted() {
	},

	computed: {},
	methods: {
		inputChange(e) {
			let that = this
			let reader = new FileReader();
			if (e.target.files[0].type !== 'text/csv') {
				this.$message({
					message: '文件不是csv',
					type: 'error'
				});

			} else {
				that.file = e.target.files[0]
				reader.readAsText(e.target.files[0], "gb2312");
			}
			reader.onload = function () {
				that.textToCsv(reader.result)
			};
		},
		textToCsv(data) {
			var allRows = data.split(/\r\n/);
			var chineseMap = new Map()
			var japaneseMap = new Map()
			var englishMap = new Map()
			for (let i = 0; i < allRows.length; i++) {
				var rowCells = allRows[i].split(',');
				chineseMap.set(rowCells[0], rowCells[1])
				japaneseMap.set(rowCells[0], rowCells[2])
				englishMap.set(rowCells[0], rowCells[3])
			}
			this.chineseJson = this._strMapToObj(chineseMap)
			this.japaneseJson = this._strMapToObj(japaneseMap)
			this.englishJson = this._strMapToObj(englishMap)

		},
		_strMapToObj(strMap) {
			let obj = Object.create(null);
			for (let [k, v] of strMap) {
				obj[k] = v;
			}
			return obj;
		},
		saveJSON(mode, filename) {
			// 1中文,2日文,3英文
			let data = null
			let name = ''
			switch (mode) {
				case 1:
					data = this.chineseJson
					name = 'chinese'
					break;
				case 2:
					data = this.japaneseJson
					name = 'japanese'
					break;
				case 3:
					data = this.englishJson
					name = 'english'
					break;
				default:
					break;
			}
			if(!this.file){
				this.$message({
					message: '数据为空',
					type: 'error'
				});
				return 
			}
			if (!this.fileName){
				filename = name + new Date().getTime() + ".json";
			}else{
				filename = this.fileName + ".json";
			}
			if (typeof data === "object") {
				data = JSON.stringify(data, undefined, 4);
			}
			var blob = new Blob([data], { type: "text/json" }),
				e = document.createEvent("MouseEvents"),
				a = document.createElement("a");
			a.download = filename;
			a.href = window.URL.createObjectURL(blob);
			a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
			e.initMouseEvent("click", true,);
			a.dispatchEvent(e);
		},
		down(){
			var blob = new Blob(["Hello World"]);
			var url = window.URL.createObjectURL(blob);
			var a = document.getElementById("h");
			a.download = "helloworld.txt";
			a.href = url;
			const url2 = 'http://ecat-tw-test.jcipn.com/ecat-service/api/part/export/sheet?categoryIds=&partNo=&carIds=&levelIds=&languageType=zh-cn'
			window.open(url2)
		}
	},
}
</script>
<style lang="scss" scoped>
.container {
	height: 100%;
	width: 100%;
	overflow: hidden;
}
</style>
