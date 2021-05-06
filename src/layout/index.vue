<template>
  <div class="app-wrapper withoutAnimation" >
    <el-container>
      <sider class="sider-container" />
      <el-container class="main-container" direction="vertical">
        <div class="topbar">
          <topbar />
        </div>
        <div class="process">
          <process />
        </div>
        <el-main class="main-body">
          <div class="main__view">
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <keep-alive :include="caches" >
                  <component :is="Component" :key="key" />
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
import { reactive, toRefs, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import sider from "./sider";
import topbar from "./topbar";
import process from "./process";
export default {
  name: "Layout",
  components: { sider, topbar, process },
  setup() {
    const store = useStore();
    const route = useRoute();
    const state = reactive({
      caches: [
        ...store.getters.processList
          .filter((e) => e.keepAlive)
          .map((e) => e.name),
      ],
    });

    const key = computed(() => route.path);

    watch(
      () => store.getters.processList.length,
      () => {
        state.caches = [
          ...store.getters.processList
            .filter((e) => e.keepAlive)
            .map((e) => e.name),
        ];
      }
    );

    return {
      key,
      ...toRefs(state),
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
  background-color: #f7f7f7;
}

.sider-container {
  transition: width 0.28s;
  background-color: #304156;
  height: 100%;
  overflow: hidden;
}

.main-container {
  height: 100%;
  width: calc(100% - 260px);
  display: flex;
  flex-direction: column;

  .topbar {
    margin-bottom: 10px;
  }

  .process {
    margin-bottom: 10px;
  }

  .main-body {
    min-height: calc(100vh - 100px);
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;

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