<template>
    <div id="jsi-flying-fish-container" class="container"></div>
</template>
<script>
import RENDERER from './fish.js'
export default {
    name:'swimmingFish',
    components: {},
    data() {
        return {}
    },
    mounted() {
        RENDERER.init()
    },
    computed: {},
    methods: {},
}
</script>
<style lang='scss'>
#jsi-flying-fish-container{
    position: fixed;
    bottom: 0px;
}
</style>