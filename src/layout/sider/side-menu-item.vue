<template>
  <template v-if="!!item.meta.show">
    <el-menu-item
        v-if="!item.children || !item.children.length"
        :index="item.path"
    >
      <icon-svg v-if="item.meta.icon" :name="item.meta.icon" class="icon-svg-item"/>
      <span class="title">{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu v-else :index="item.path">
      <template #title>
        <icon-svg v-if="item.meta.icon" :name="item.meta.icon" class="icon-svg-item"/>
        <span class="title">{{ item.meta.title }}</span>
      </template>
      <side-menu-item v-for="child in item.children" :key="child.path" :item="child" />
    </el-submenu>
  </template>
</template>

<script>
import sideMenuItem from './side-menu-item';
export default {
  components: {sideMenuItem},
  props: {
    item: Object,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.icon-svg-item {
  // margin: 0 15px 0 5px;
  font-size: 16px;
}

.title {
  margin-left: 20px;
}
</style>