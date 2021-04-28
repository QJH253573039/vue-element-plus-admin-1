<template>
  <div class="app-container">
    <div class="container-header">
      <div class="box-action">
        <el-dropdown
          size="medium"
          type="primary"
          trigger="click"
          :hide-on-click="false"
        >
          <el-button type="primary" icon="el-icon-s-grid"
            ><i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-checkbox-group v-model="tableHead">
                <el-dropdown-item
                  v-for="(param, index) in paramList"
                  :key="index"
                  ><el-checkbox :label="param.value">{{
                    param.key
                  }}</el-checkbox></el-dropdown-item
                >
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="app-body">
      <div class="custom-table-header">
        <div class="refresh-button">
          <i class="el-icon-refresh"></i>
        </div>
        <el-button type="primary" icon="el-icon-plus">新增</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column :label="item" v-for="item in tableHead" :key="item">
          <template #default="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
const params = [
  {
    key: "ID",
    value: "id",
  },
  {
    key: "Title",
    value: "title",
  },
  {
    key: "Tags",
    value: "tags",
  },
  {
    key: "Create at",
    value: "create_at",
  },
];
const data = [
  {
    id: 1,
    title: "前端",
    tags: ["JavaScript", "vue", "react", "flutter"],
    create_at: "2020-01-10",
  },
  {
    id: 2,
    title: "后端",
    tags: ["C++", "GoLang", "Java", "PHP"],
    create_at: "2020-01-10",
  },
  {
    id: 3,
    title: "运维",
    tags: ["Linux", "SSH", "DHCP/DNS", "NFS"],
    create_at: "2020-01-10",
  },
];
export default {
  setup() {
    const tableHead = ref(["id", "title"]);
    const paramList = ref(params);
    const tableData = ref(data);
    return {
      tableHead,
      paramList,
      tableData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>