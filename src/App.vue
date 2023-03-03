<template>
    <div id="app">
        <router-view />
        <swimmingFish></swimmingFish>
    </div>
</template>
<script>
export default {
    components: {
    },
    created() {
        // this.openMsg();
        //关闭启动动画
        let loading = document.getElementById('FeizaiOpen');
        if (loading != null) {
            document.body.removeChild(loading);
        }
    },
    methods: {

    }
};
</script>
<style>
#app{
    padding-bottom:50px;
}
.d39f6f {
    background: #d39f6f;
}
</style>