<template>
  <el-header height="70px" class="topbar-wrap">
    <div class="topbar__collapse" @click="collapse">
      <i class="el-icon-s-fold"></i>
    </div>

    <div class="topbar__route-nav">
      <route-nav />
    </div>

    <div class="topbar__flex"></div>

    <div class="topbar__user">
      <el-dropdown trigger="click" :hide-on-click="false" @command="onCommand">
        <span class="el-dropdown-link">
          <span class="name">{{ userInfo.name }}</span>
          <el-avatar :size="32" :src="userInfo.avartar"></el-avatar>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
import RouteNav from "./route-nav";
export default {
  components: { RouteNav },
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfo = computed(() => {
      return store.getters.userInfo;
    });

    const menuCollapse = computed(() => {
      return store.getters.menuCollapse;
    });

    const collapse = () => {
      store.commit("menu/SET_COLLASPE", !menuCollapse.value);
    };

    const onCommand = (name) => {
      switch (name) {
        case "userInfo":
          router.push("/my/info");
          break;
        case "logout":
          store.dispatch("user/logout").then(() => {
            router.push({
              path: "/login",
              replace: true,
            });
          });
          break;
      }
    };

    return {
      collapse,
      userInfo,
      menuCollapse,
      onCommand,
    };
  },
};
</script>

<style lang="scss" scoped>
.topbar-wrap {
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #fff;

  .topbar__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    cursor: pointer;

    i {
      // height: 22px;
      // width: 22px;
      font-size: 22px;
    }
  }

  .topbar__flex {
    flex: 1;
  }

  .topbar__user {
    cursor: pointer;
    margin-right: 10px;

    .el-dropdown-link {
      display: flex;
      align-items: center;
    }

    .name {
      white-space: nowrap;
      margin-right: 15px;
    }
  }
}
</style>