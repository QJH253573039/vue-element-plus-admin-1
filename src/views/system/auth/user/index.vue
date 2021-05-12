<template>
  <div class="app-container">
    <div class="app-body">
      <div class="custom-table-header">
        <div class="refresh-button" @click="refresh">
          <i class="el-icon-refresh"></i>
        </div>
        <el-button
          type="primary"
          size="small"
          @click="handleCreate"
          >新增</el-button
        >
        <el-button
          type="danger"
          size="small"
          @click="handleDestory"
          >删除</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const refresh = () => {};

    const handleCreate = () => {};

    const handleDestory = () => {

    }

    return {
      refresh,
      handleCreate,
      handleDestory
    };
  },
};
</script>

<style lang="scss" scoped>
</style>