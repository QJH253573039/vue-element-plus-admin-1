<template>
  <template v-if="item.meta.show">
    <el-menu-item
      :index="item.path"
      v-if="!item.children || !item.children.length"
    >
      <i :class="item.meta.icon"></i>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu :index="item.path" v-else>
      <template #title>
        <i :class="item.meta.icon" v-if="item.meta.icon"></i>
        <span>{{ item.meta.title }}</span>
      </template>
      <sider-menu-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-submenu>
  </template>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>