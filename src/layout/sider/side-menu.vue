<template>
  <el-aside class="aside" width="initial">
    <el-menu
        :collapse="collapse"
        :default-active="activedPath"
        background-color="#304156"
        class="sider-menu"
        menu-trigger="click"
        router
        text-color="#FFFFFF"
        unique-opened
    >
      <side-menu-item v-for="route in routeList" :key="route.path" :item="route"/>
    </el-menu>
  </el-aside>
</template>

<script>
import _ from 'lodash';
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import sideMenuItem from './side-menu-item';

export default {
  name: 'side-menu',
  components: {sideMenuItem},
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const {currentRoute} = useRouter();
    const store = useStore();
    const isCollapse = ref(false);

    let routeList = computed(() => {
      if (store.getters.menuGroup && store.getters.menuGroup.length > 0) {
        return store.getters.menuGroup;
      }
      return [];
    });

    const handleResize = (e) => {
      let innerWidth = e.target.innerWidth;
      if (innerWidth < 780 && !props.collapse) {
        store.commit('menu/COLLAPSE', true);
      } else if (innerWidth > 1200 && props.collapse) {
        store.commit('menu/COLLAPSE', false);
      }
    };

    onMounted(() => {
      window.addEventListener('resize', _.debounce(handleResize, 200), true);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize, true);
    });

    const activedPath = computed(() => {
      const {path} = currentRoute.value;
      return path;
    });

    return {
      routeList,
      isCollapse,
      activedPath,
    };
  },
};
</script>

<style lang="scss">
.sider-menu {
  &:not(.el-menu--collapse) {
    width: 260px;
  }
}

.el-aside {
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

.el-menu {
  border-right: none;
}

.el-menu--collapse {
  width: 65px;
}
</style>

<style lang="scss" scoped>
.aside {
  height: 100%;
}
</style>