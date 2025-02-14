<template>
  <div :class="{hideSidebar:collapse}" class="app-wrapper withoutAnimation">
    <el-container>
      <sider :collapse="collapse" class="sider-container"/>
      <el-container class="main-container" direction="vertical">
        <div class="fixed-header">
          <topbar/>
          <process/>
        </div>
        <el-main class="main-body">
          <div class="main__view">
            <router-view v-slot="{ Component }">
              <transition mode="out-in" name="fade-transform">
                <keep-alive :include="caches">
                  <component :is="Component"/>
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';
import sider from './sider';
import topbar from './topbar';
import process from './process';

export default {
  name: 'Layout',
  components: {sider, topbar, process},
  setup() {
    const store = useStore();

    const collapse = computed(() => store.getters.menuCollapse);
    const caches = computed(() => store.getters.processList.filter(e => e.keepAlive).map(e => e.name))

    return {
      collapse,
      caches
    };
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
}

.hideSidebar {
  .fixed-header {
    width: calc(100% - 65px) !important;
  }
}

.sider-container {
  transition: width 0.3s;
  background-color: #304156;
  height: 100%;
  overflow: hidden;
}

.main-container {
  height: 100%;
  width: calc(100% - 260px);
  display: flex;
  flex-direction: column;
  padding-top: 120px;

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 20;
    width: calc(100% - 260px);
    transition: width 0.36s;
    background-color: #f7f7f7;
  }

  .main-body {
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    min-height: 100%;

    .main__view {
      width: 100%;
      height: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      overflow: hidden auto;
      position: relative;
    }
  }
}

.withoutAnimation {
  .main-body,
  .sider-container {
    transition: none;
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>