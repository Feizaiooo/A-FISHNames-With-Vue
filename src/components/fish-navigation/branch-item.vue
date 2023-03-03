<template>
    <div class="fish-navigation-branch">
        <p class="fish-navigation-branch-title">{{item.title}}↓</p>
        <div v-for="data in item.collapseList"  :class="{'fish-navigation-branch-basic' : data.type === 'basic','fish-navigation-branch-collapse':data.type=== 'collapse'}">
            <template v-if="data.type === 'basic'">
                <!-- <div class="fish-navigation-branch-basic"> -->
                    <NavigationBasic :item="data"></NavigationBasic>
                <!-- </div> -->
            </template>
            <template v-if="data.type === 'collapse'">
                <!-- <div class="fish-navigation-branch-collapse"> -->
                    <NavigationCollapse :item="data"></NavigationCollapse>

                <!-- </div> -->
             

            </template>
        </div>

    </div>
</template>

<script>
import NavigationBasic from '@/components/fish-navigation/basic-item.vue'
import NavigationCollapse from './branch-item.vue';
export default {
    name:'NavigationCollapse',
    components: {
        NavigationBasic,
        NavigationCollapse
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
.fish-navigation-branch{
    // margin: 0 12px;
    // border: 1px solid #fff;

    .fish-navigation-branch-title{
        border: 1px solid #fff;
        padding:10px 16px;
        // padding-left: 36px;
        
    }
    .fish-navigation-branch-basic{
         padding:10px 16px;
        padding-left: 36px;

    }
    .fish-navigation-branch-collapse{
        border: 1px solid #fff;

        padding-left: 36px;
    }
}
</style>