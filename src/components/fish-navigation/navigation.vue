<template>
  <div class="fish-layout" :class="{ 'open': isOpen, 'side': changeType === 'side', 'over': changeType === 'over' }">
    <div class="fish-navigation">
      <div v-for="navigation in navigationList">
        <router-link :to="navigation.url" active-class="navigation-item" v-if="navigation.type === 'basic'">
          <div class="fish-navigation-basic" @click="doFuc(navigation)">
            <i class="iconfont" :class="navigation.icon" v-if="navigation.icon"></i> {{ navigation.title }}
          </div>
        </router-link>
        <div v-if="navigation.type === 'collapse'" class="fish-navigation-collapse">
          <div class="fish-navigation-branch">
            <InfoCollapse>
              <template #title>
                <div class="fish-navigation-branch-title">
                  <span><i class="iconfont" :class="navigation.icon" v-if="navigation.icon"></i> {{ navigation.title
}}</span>
                  <i class="el-icon-arrow-right"></i>
                </div>
              </template>
              <template #content>
                <div v-for="data in navigation.collapseList">
                  <router-link :to="data.url" active-class="navigation-item" v-if="data.type === 'basic'">
                    <div class="fish-navigation-branch-basic">
                      <i class="iconfont" :class="data.icon" v-if="data.icon"></i> {{ data.title }}
                    </div>
                  </router-link>
                  <div class="fish-navigation-branch-collapse" v-if="data.type === 'collapse'">
                    <InfoCollapse>
                      <template #title>
                        <div class="fish-navigation-branch-title-2">
                          <span><i class="iconfont" :class="data.icon" v-if="data.icon"></i> {{ data.title }}</span>
                          <i class="el-icon-arrow-right"></i>
                        </div>
                      </template>
                      <template #content>
                        <div v-for="item in data.collapseList">
                          <router-link :to="item.url" active-class="navigation-item" v-if="item.type === 'basic'">
                            <div class="fish-navigation-branch-basic-2">
                              <i class="iconfont" :class="item.icon" v-if="item.icon"></i> {{ item.title }}
                            </div>
                          </router-link>
                        </div>
                      </template>
                    </InfoCollapse>
                  </div>
                </div>
              </template>
            </InfoCollapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasicItem from './basic-item.vue';
import BranchItem from './branch-item.vue';
import InfoCollapse from '@/components/info-collapse.vue'
import _ from 'lodash'
export default {
  components: {
    BasicItem,
    BranchItem,
    InfoCollapse
  },
  props: {
    navigationList: {
      type: Array,
      default: () => {
        return []
      }
    },
  },
  data() {
    return {
      isOpen: false,
      changeType: ''
    }
  },
  computed: {},
  watch: {
    changeType(val) {
      if (val === 'over' && this.isOpen) {
        this.handleDiv(true)
      } else if (val === 'side' && this.isOpen) {
        this.handleDiv(false)
      }
    },
    isOpen(val) {
      if (this.changeType === 'side') return
      this.handleDiv(val)
    }
  },
  mounted() {
    console.log('mounted')
    this.getWidth()
    window.addEventListener('resize', _.throttle(this.getWidth, 1000), true)
  },
  destroyed() {
    window.removeEventListener('resize', this.getWidth, true)
    this.handleDiv(false)
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    handle() {
      this.isOpen = !this.isOpen
    },
    getWidth() {
      const width = window.innerWidth
      console.log(width)
      switch (true) {
        case width < 768:
          this.changeType = 'over'
          break;
        case width >= 768 && width < 992:
          this.changeType = 'side'
          break;
        case width >= 992 && width < 1200:
          this.changeType = 'side'
          break;
        case width >= 1200:
          this.changeType = 'side'
          break;
        default:
          break;
      }
    },
    handleDiv(bool) {
      var body = document.body;
      if (bool) {
        var backgroundDiv = document.createElement("div");
        backgroundDiv.id = 'navigation-bg-div'
        backgroundDiv.className = 'navigation-bg'
        body.appendChild(backgroundDiv);
        backgroundDiv.onclick = () => {
          this.isOpen = false
          body.removeChild(backgroundDiv)
        }
      } else {
        const navigationBgDiv = document.getElementById("navigation-bg-div");
        if (navigationBgDiv) {
          body.removeChild(navigationBgDiv)
        }
      }

    },
    onInfoCollapseChange() {

    },
    doFuc(navigation) {
      // if(navigation.url === '/login' && this.changeType === 'over') this.handleDiv(false)
      if (navigation.fuc) fuc()
    }

  },
}
</script>
<style lang='scss' scoped>
.fish-layout {
  width: 250px;
  background-color: #fff;
  height: 100%;
  z-index: 10;
  flex-shrink: 0;
  margin-left: -250px;
  // visibility: visible;
  transition-duration: .4s;
  transition-timing-function: cubic-bezier(.25, .8, .25, 1);
  transition-property: visibility, margin-left, margin-right, transform, width, max-width, min-width;
  // box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 20%), 0 16px 24px 2px rgba(0, 0, 0, 14%), 0 6px 30px 5px rgba(0, 0, 0, 12%);
  background-color: $base-dark;
  color: #fff;

  .fish-navigation {
    margin-top: 40px;
    padding: 0px 10px;

    .navigation-item {

      // border: 1px solid #fff;
      // margin-bottom: 10px;
      div {
        border-radius: 10px;
        background-color: $base-background-opacity;

      }

    }

    .fish-navigation-basic {
      padding: 10px 16px;

      &:hover {
        border-radius: 10px;
        background-color: $base-background-opacity;
      }
    }

    .fish-navigation-branch {

      .fish-navigation-branch-title {
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        &:hover {
          border-radius: 10px;
          background-color: $base-background-opacity;
        }
      }

      .fish-navigation-branch-title-2 {
        padding: 10px 16px;
        padding-left: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        &:hover {
          border-radius: 10px;
          background-color: $base-background-opacity;
        }

      }

      .fish-navigation-branch-basic {
        padding: 10px 16px;
        padding-left: 36px;

        &:hover {
          border-radius: 10px;
          background-color: $base-background-opacity;
        }
      }

      .fish-navigation-branch-basic-2 {
        padding: 10px 16px;
        padding-left: 72px;

        &:hover {
          border-radius: 10px;
          background-color: $base-background-opacity;
        }
      }

    }

  }
}

// .side {
//   margin-left: -320px;
// }
.over {
  position: absolute;
  top: 0px;
  left: 0px;
}

.open {
  margin-left: 0px;
}

.rotate-90 {
  transition-duration: .4s;
  transition-timing-function: cubic-bezier(.25, .8, .25, 1);
  transition-property: transform;
  transform: rotateZ(90deg);
}
</style>