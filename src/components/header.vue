<template>
    <div>
        <h2>{{title}}</h2>
    </div>
</template>

<script>
export default {
    components: {},
    porps:[{
        title:String,
        default:'',
    },{
        bgColor:String,
        default:'',
    },{
        fontColor:String,
        default:'#fff',
    }],
    data() {
    return {}
    },
    computed: {},
    methods: {},
}
</script>
<style lang='scss'>
</style>