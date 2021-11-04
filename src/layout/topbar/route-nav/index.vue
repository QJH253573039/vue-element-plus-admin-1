<template>
  <div class="route-nav">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(item, index) in list" :key="index" :to="item.path">{{
          item.meta.title
        }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";

export default {
  setup() {
    const store = useStore();
    const {currentRoute} = useRouter();

    const list = ref([]);

    const menuGroup = computed(() => {
      return store.getters.menuGroup;
    });

    watch(
        () => currentRoute.value,
        (route) => {
          if (route.path.startsWith("/redirect/")) {
            return;
          }
          getBreadcrumb();
        },
        {
          immediate: true,
        }
    );

    function getBreadcrumb() {
      const matched = currentRoute.value.matched.filter(
          (item) => item.meta && item.meta.title
      );
      list.value = matched.filter(
          (item) => item.meta && item.meta.title && item.meta.show !== false
      );
    }

    return {
      menuGroup,
      list,
    };
  },
};
</script>

<style lang="scss" scoped>
.route-nav {
  :deep .el-breadcrumb {
    margin: 0 10px;

    &__inner {
      font-size: 12px;
      padding: 0 10px;
      font-weight: normal;
      letter-spacing: 1px;
    }
  }
}
</style>