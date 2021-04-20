<template>
  <div class="app-wrapper">
    <el-container>
      <sider class="sider-container" />
      <el-container class="main-container">
        <topbar />
        <el-main class="main-body">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sider from "./sider";
import topbar from './topbar';
export default {
  name: "Layout",
  components: { sider,topbar},
  setup() {
    return {};
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
  // width: 260px !important;
  background-color: #304156;
  height: 100%;
  overflow: hidden;
}

.main-container {
  min-height: 100%;
  width: calc(100% - 260px);
  transition: margin-left 0.28s;
  display: flex;
  flex-direction: column;
}

.main-body {
  min-height: calc(100vh - 70px);
  width: 100%;
  overflow: hidden;
}
</style>