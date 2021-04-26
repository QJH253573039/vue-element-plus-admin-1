<template>
  <div class="app-wrapper">
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
              <keep-alive :include="caches">
                <component :is="Component" />
              </keep-alive>
            </router-view>
           </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import sider from "./sider";
import topbar from "./topbar";
import process from "./process";
export default {
  name: "Layout",
  components: { sider, topbar, process },
  setup() {
    const store = useStore();

    // 缓存列表
    const caches = computed(() => {
      return store.getters.processList
        .filter((e) => e.keepAlive)
        .map((e) => {
          return e.name;
        });
    });

    return {
      caches,
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
    flex: 1;
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;

      .main__view{
        width: 100%;
        height: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        overflow: hidden auto;
        position: relative;
        
        // & > div{
        //   height: 100%;
        //   background-color: #FFF;
        // }
      }
  }
}
</style>