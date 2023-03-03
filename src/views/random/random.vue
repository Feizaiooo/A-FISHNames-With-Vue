<template>
    <div class="text-center mt-10">
        <el-button @click="startRandom(imageList)">roll</el-button>
        <div>

        {{info.fileId}}
        </div>
    </div>
</template>

<script>
    import baseApi from '../../api/base';
export default {
    components: {},
    data() {
    return {
        imageList:[],
        info:null
    }
    },
    created(){
        this.getRandomImage()
    },
    computed: {},
    methods: {
        getRandomImage(){
            baseApi.randomImage().then(res=>{
                if (res.data.resultCode === '0') {
                    this.imageList = res.data.resultData.image || []
                    this.startRandom(this.imageList)
                }
            })
        },
        startRandom(list){
            const length = list.length
            if(length){
                        let random =Math.floor(Math.random() *length)
                        console.log(random,length)
                        this.info = this.imageList[random]
                    }
        }
    },
}
</script>
<style lang='scss'>
</style>