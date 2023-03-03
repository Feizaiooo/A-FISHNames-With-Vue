<template>
    <div class="fish-navigation-base-item">
        {{ item.title }}
    </div>
</template>

<script>
export default {
    name:'NavigationBasic',
    components: {
    },
    props: {
        item: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {}
    },
    created() {
    },
    computed: {},

    methods: {},
}
</script>
<style lang='scss' scoped>
.fish-navigation-base-item{
    // padding: 20px 0px;
    // border: 1px solid #fff;
    // margin:0 12px;
    // padding-left: 36px;
    // background-color: antiquewhite;
}
</style>