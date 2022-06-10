<template>
  <el-header class="topbar-wrap" height="70px">
    <div class="topbar__collapse" @click="collapse">
      <icon-svg v-if="menuCollapse" name="indent"/>
      <icon-svg v-else name="outdent"/>
    </div>

    <div class="topbar__route-nav">
      <route-nav/>
    </div>

    <div class="topbar__flex"></div>

    <div class="topbar__user">
      <el-dropdown :hide-on-click="false" trigger="click" @command="onCommand">
        <span class="el-dropdown-link">
          <span class="name">{{ userInfo.userName }}</span>
          <el-avatar :size="32" :src="userInfo.headImgUrl"></el-avatar>
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
import {useStore} from 'vuex';
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import RouteNav from './route-nav';

export default {
  components: {RouteNav},
  setup() {
    const store = useStore();
    const router = useRouter();

    const userInfo = computed(() => {
      let userInfo = store.getters.userInfo
      return {
        ...userInfo,
        headImgUrl:`${process.env.VUE_APP_BASE_API}/${userInfo.headImgUrl}`
      };
    });

    const menuCollapse = computed(() => {
      return store.getters.menuCollapse;
    });

    const collapse = () => {
      store.commit('menu/COLLAPSE', !menuCollapse.value);
    };

    const onCommand = (name) => {
      switch (name) {
        case 'userInfo':
          router.push('/my/info');
          break;
        case 'logout':
          store.dispatch('user/logout').then(() => {
            router.push({
              path: '/login',
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
  margin-bottom: 10px;

  .topbar__collapse {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    width: 40px;
    cursor: pointer;

    svg {
      font-size: 24px;
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