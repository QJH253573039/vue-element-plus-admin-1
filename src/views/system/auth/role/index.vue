<template>
  <div class="app-container">
    <div class="app-body">
      <div class="custom-table-header">
        <div class="custom-table-header-action">
          <div class="refresh-button" @click="refresh">
            <i class="el-icon-refresh"></i>
          </div>
          <el-button type="primary" size="small" @click="handleCreate"
            >新增</el-button
          >
          <el-button type="danger" size="small" @click="handleDestory"
            >删除</el-button
          >
        </div>
        <div class="table-search-box">
          <el-input
            v-model="searchKey"
            placeholder="请输入关键字"
            class="table-search-key"
          />
          <el-button type="primary" size="small" @click="handleSearch"
            >搜索</el-button
          >
        </div>
      </div>
      <el-table
        :data="list"
        border
        fit
        max-height="700"
        style="width: 100%"
        current-row-key="id"
        @selection-change="handleSelectionChange"
        size="mini"
      >
        <el-table-column align="center" type="selection" width="60" />
        <el-table-column prop="name" label="名称" width="150" align="center" />
        <el-table-column
          prop="label"
          label="标识"
          align="center"
        />
        <el-table-column
          prop="create_at"
          label="时间"
          align="center"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" >
          <template #default="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="custom-table-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.pageNo"
          :page-sizes="[10, 15, 20, 40]"
          prev-text="上一页"
          next-text="下一页"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      style="width: 650px"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="temp.name" placeholder="请填写名称" />
        </el-form-item>
        <el-form-item label="标识" prop="label">
          <el-input v-model="temp.label" placeholder="请填写标识" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="temp.remark"
            placeholder="请填写备注"
            type="textarea"
            :rows="2"
          />
        </el-form-item>
        <el-form-item label="功能权限" prop="menuIdList">
          <RoleTree v-model:value="temp.menuIdList" :data="menuList"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button type="success"  @click="dialogStatus === 'create' ? createData() : updateData()" >确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import RoleTree from "@/components/role-tree";
import { toRefs } from "vue";
import useRole from "./useRole";
export default {
  name:'role',
  components: { RoleTree },
  setup() {
    const state = useRole();

    state.queryRoleList();
    state.queryMenuList()

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.app-body {
  :deep .el-tag + .el-tag {
    margin-left: 10px;
    margin-bottom: 10px;
  }
}
</style>