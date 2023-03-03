<template>
    <div>
        <div class="wrap">
            <input type="color" onchange="this.nextElementSibling.style.color = this.value">
            <div class="box">
                <span class="txt">文字测试</span>
            </div>
        </div>
        <div class="test">
            <p >12312312312321</p>
        </div>
        <el-button @click="changeColor" type="primary">切换主题</el-button>
    </div>
</template>

<script>
export default {
    components: {
        Progress
    },
    data() {
        return {}
    },
    computed: {},
    methods: {
        changeColor(){
            document.getElementsByTagName('body')[0].style.setProperty('--elementui', 'yellow');
        }
    },
}
</script>
<style lang='scss' scoped>
html,body{
    margin: 0;
    height: 100%;
    display: grid;
    place-content: center;
    gap: 10px;
    background: aliceblue;
}
.wrap{
  text-align: right;
}
input{
  margin-bottom: 10px;
}
.box{
  display: grid;
  place-content: center;
  width: 300px;
  height: 150px;
  font-size: 32px;
  color: #ffeb3b;
  background-color: currentColor;
}
.txt{
  filter: grayscale(1) contrast(9999) invert(1);
}
.test{
    color: #ffeb3b;
  background-color: currentColor;
}

// @font-face {
//   font-family:splatoon1;src:url("@/assets/fonts/Splatoon1-symbol-common.woff2") format("woff2"),url("@/assets/fonts/Splatoon1-symbol-common.woff") format("woff");unicode-range:U+20a0-20cf,U+2100-214f,U+22??,U+23??,U+25a0-25ff,U+26??,U+fb00-fb4f;
// }

// @font-face {
//   font-family:splatoon1;src:url("@/assets/fonts/Splatoon1-cjk-common.woff2") format("woff2"),url("@/assets/fonts/Splatoon1-cjk-common.woff") format("woff");unicode-range:U+3000-303f,U+4e00-9fff,U+ff00-ffef;
// }

// @font-face {
//   font-family:splatoon1;src:url("@/assets/fonts/Splatoon1JP-hiragana-katakana.woff2") format("woff2"),url("@/assets/fonts/Splatoon1JP-hiragana-katakana.woff") format("woff");unicode-range:U+3040-309f,U+30a0-30ff;
// }
</style>
<style>

  </style>