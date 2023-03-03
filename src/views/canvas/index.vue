<template>
    <div>
        <!-- <img :src="image.src" alt=""> -->
        <canvas id="canvas"></canvas>
     
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            image: '',
            ctx: '',
            canvas: {
                width: '',
                height: ''
            },
            animationId: '',
            imagesList: []
        }
    },
    mounted() {
        // const image = new Image()
        // image.src = require('../../assets/img/star.png')
        // image.onload = () => {
        //     this.initCanvas()
        //     setInterval(() => {
        //         this.imagesList.push(this.initImageItem(image))
        //     }, 1000);
        //     this.drawImage()
        // }
        this.styleNodeText()
    },
    computed: {},
    methods: {
        initCanvas() {
            const canvas = document.getElementById('canvas')
            this.canvas.width = canvas.width = window.innerWidth
            this.canvas.height = canvas.height = window.innerHeight
            if (canvas.getContext) {
                this.ctx = canvas.getContext('2d')
            }
        },
        drawImage() {
            // console.log('drawImage')
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.imagesList.forEach((item, index) => {
                this.ctx.drawImage(item.image, item.x -= item.speed, item.y += (item.speed + 1), item.width, item.height)
                // 如果下落到超出canvas范围 则删除该红包
                if (item.y > this.canvas.height) {
                    this.imagesList.splice(index, 1)
                }
            })
            this.animationId = window.requestAnimationFrame(this.drawImage)

        },
        initImageItem(image) {
            return {
                image,
                x: parseInt(Math.random() * this.canvas.width - 50), // 图片右下角x坐标
                y: parseInt(Math.random() * -30), // 图片右下角y坐标
                // parseInt(Math.random() * 1 + 2)
                speed: parseInt(Math.random() * 1 + 1), // 下落速度
                // width: 151.3, // 图片宽度
                // height: 284.3 // 图片高度
                width: 113.5, // 1/4图片宽度
                height: 213.3 // 1/4图片高度
            }
        },
        
    },
}
</script>
<style lang='scss'>

</style>