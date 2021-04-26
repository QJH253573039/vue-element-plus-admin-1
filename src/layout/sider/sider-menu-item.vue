<template>
  <template v-if="item.meta.show">
    <el-menu-item
      :index="item.path"
      v-if="!item.children || !item.children.length"
    >
      <icon-svg :name="item.meta.icon" v-if="item.meta.icon" class="icon-svg-item"/>
      <span class="title">{{ item.meta.title }}</span>
    </el-menu-item>

    <el-submenu :index="item.path" v-else>
      <template #title>
        <icon-svg :name="item.meta.icon" v-if="item.meta.icon" class="icon-svg-item"/>
        <span class="title">{{ item.meta.title }}</span>
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
.icon-svg-item{
  // margin: 0 15px 0 5px;
  font-size: 16px;
}
.title{
  margin-left: 20px;
}
</style>