<template>
    <el-container class="h-full">
        <FishNavigation :navigationList="navigationList_" ref="FishNavigation"></FishNavigation>
        <!-- <el-aside class="w-auto bg-gray-900 relative">
            <Aside></Aside>
        </el-aside> -->
        <el-container>
            <el-backtop> </el-backtop>
            <el-header class="h-12 p-1 m-0 tagTop overflow-auto shadow">
                <el-button @click="handleOpen" icon="iconfont icon-menu"  circle><i class=""></i></el-button>
                <el-button @click="handlePopup">popup</el-button>
                <ThemePicker></ThemePicker>
                <!-- <Head></Head> -->
            </el-header>
            <el-main class="relative">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </el-main>
            <!-- <el-footer class="p-0 m-0 shadow">
          <Footer></Footer>
        </el-footer> -->
        </el-container>
    </el-container>
</template>

<script>
import Head from '../layout/head/Head.vue';
import Footer from "../layout/footer/Footer.vue";
import Aside from './aside/Aside.vue';
import FishNavigation from '@/components/fish-navigation/navigation.vue'
import ThemePicker from '@/components/theme-picker.vue';
import {navigationList} from '@/views/navigation.js'
export default {
    name: 'layout',
    components: {
        Head,
        Footer,
        Aside,
        FishNavigation,
        ThemePicker
    },
    data() {
        return {
            tagsList: [],
            navigationList_:[]
        };
    },
    created() {
        this.navigationList_ = navigationList
      
    },
    methods: {
        message() {
            this.$emit('message');
        },
        handleOpen(){
            this.$refs.FishNavigation.handle()
        },
        open(){
            this.$refs.FishNavigation.open()
        },
        handlePopup(){
            this.$popup ({
                show: true,
                title: "标题"
        });
        }
    }
};
</script>
<style lang="scss">
</style>

