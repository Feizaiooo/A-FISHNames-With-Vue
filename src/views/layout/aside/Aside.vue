<template>
    <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        v-if="isCollapse"
        router
        background-color="#0f172a"
        active-text-color="#ffd04b"
        text-color="#fff"
    >
        <template v-for="(items, i) in naList">
            <!-- collapsable -->
            <template v-if="items.type == 'collapsable'">
                <el-submenu :index="items.index" :key="i">
                    <template slot="title">
                        <i :class="items.icon"></i>
                        <span slot="title">{{ items.title }}</span>
                    </template>
                    <template v-for="(item, j) in items.child">
                        <!-- group -->
                        <template v-if="item.type == 'group'">
                            <el-menu-item-group :key="j">
                                <span slot="title">{{ item.title }}</span>
                                <!-- basic -->
                                <el-menu-item :index="child.url" v-for="(child, z) in item.child" :key="z"> {{ child.title }}</el-menu-item>
                            </el-menu-item-group>
                        </template>
                        <!-- basic -->
                        <template v-if="item.type == 'basic'">
                            <el-menu-item :index="item.index" :key="j">
                                <i :class="item.icon"></i>
                                <span slot="title">{{ item.title }}</span>
                            </el-menu-item>
                        </template>
                        <!-- collapsable -->
                        <template v-if="item.type == 'collapsable'">
                            <el-submenu :index="item.index" :key="j">
                                <template slot="title">
                                    <i :class="item.icon"></i>
                                    <span slot="title">{{ item.title }}</span>
                                </template>
                                <!-- basic -->
                                <el-menu-item :index="child.url" v-for="(child, z) in item.child" :key="z">
                                    {{ child.title }}
                                </el-menu-item>
                            </el-submenu>
                        </template>
                    </template>
                </el-submenu>
            </template>

            <template v-if="items.type == 'basic'">
                <el-menu-item :index="items.index" :key="i">
                    <i :class="items.icon"></i>
                    <span slot="title">{{ items.title }}</span>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
import asideServce from './asideServce';
export default {
    name: 'Aside',
    components: {},
    data() {
        return {
            isCollapse: true,
            naList: []
        };
    },
    mounted() {
        this.getWidth();
        console.log(this.$router)
        const layout = this.$router.options.routes.find(item =>{
            if(item.name === 'layout'){
                return item
            }
        })
        layout.children.map(item =>{
            this.naList.push({
                url:'/' + item.path,
                title:item.name,
                type:'basic',
                index: '/' + item.path,
                icon: 'el-icon-menu',
            })
        })
    },
    created() {
        this.toggle();
        window.addEventListener('resize', () => {
            this.getWidth();
        });
    },
    methods: {
        toggle() {
            asideServce.$on('toggle', (state) => {
                if (state) this.isCollapse = !state;
                else this.isCollapse = !this.isCollapse;
            });
        },
        getWidth() {
            var width = window.innerWidth;
            switch (true) {
                case width < 768:
                    this.isCollapse = true;
                    break;
                case width >= 768 && width < 992:
                    this.isCollapse = true;
                    break;
                case width >= 992 && width < 1200:
                    this.isCollapse = false;
                    break;
                case width >= 1200:
                    this.isCollapse = false;
                    break;
                default:
                    break;
            }
        }
    }
};
</script>
<style >
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}
</style>