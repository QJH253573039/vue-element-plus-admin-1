<template>
  <div class="route-nav">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";
import { useRouter } from 'vue-router'
// import _ from "lodash";
export default {
  setup() {
    const store = useStore();
    const { currentRoute } = useRouter()

    const list = ref([]);

    const menuGroup = computed(() => {
      return store.getters.menuGroup;
    });

     watch(
      () => currentRoute.value,
      (route) => {
        if (route.path.startsWith('/redirect/')) {
          return
        }
        getBreadcrumb()
      },
      {
        immediate: true
      }
    )

     function getBreadcrumb() {
      const matched  = currentRoute.value.matched.filter((item) => item.meta && item.meta.title);
      list.value = matched.filter((item) => item.meta && item.meta.title && item.meta.show !== false)
    }

    // watch(
    //   "$route",
    //   (route) => {
    //       console.log(route);
    //       console.log(Boolean);
    //     const deep = (item) => {
    //       if (route === "/") {
    //         return false;
    //       }

    //       if (item.path == route) {
    //         return item;
    //       } else {
    //         if (item.children) {
    //           const ret = item.children.map(deep).find(Boolean);

    //           if (ret) {
    //             return [item, ret];
    //           } else {
    //             return false;
    //           }
    //         } else {
    //           return false;
    //         }
    //       }
    //     };

    //     list.value = _(menuGroup)
    //       .map(deep)
    //       .filter(Boolean)
    //       .flattenDeep()
    //       .value();

    //     if (list.value.length === 0) {
    //       list.value.push(route);
    //     }
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

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