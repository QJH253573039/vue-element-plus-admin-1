<template>
  <div class="app-container">
    <div class="app-body">
      <div class="custom-table-header">
        <div class="custom-table-header-action">
          <div class="refresh-button" @click="refresh">
            <i class="el-icon-refresh"></i>
          </div>
          <el-button type="primary" size="small" @click="handleCreate"
          >新增
          </el-button
          >
          <el-button type="danger" size="small" @click="handleDestory"
          >删除
          </el-button
          >
        </div>
        <div class="table-search-box">
          <el-input
              v-model="searchKey"
              placeholder="请输入关键字"
              class="table-search-key"
          />
          <el-button type="primary" size="small" @click="handleSearch"
          >搜索
          </el-button
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
        <el-table-column align="center" type="selection" width="55"/>
        <el-table-column props="avatar" label="头像" width="80" align="center">
          <template #default="scope">
            <el-avatar shape="square" :src="scope.row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="150" align="center"/>
        <el-table-column
            prop="username"
            label="用户名"
            width="150"
            align="center"
        />
        <el-table-column
            prop="nickname"
            label="昵称"
            width="150"
            align="center"
        />
        <el-table-column
            prop="departmentName"
            label="部门"
            width="150"
            align="center"
        />
        <el-table-column
            prop="roleName"
            label="角色"
            align="center"
            width="200"
        >
          <template #default="scope">
            <div>
              <el-tag
                  effect="dark"
                  v-for="role in scope.row.roleName"
                  :key="role"
              >{{ role }}
              </el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center" width="120">
          <template #default="scope">
            <el-tag
                style="margin: 2px"
                effect="dark"
                v-if="scope.row.status === 1"
            >{{ statusOptions[scope.row.status] }}
            </el-tag
            >
            <el-tag type="danger" effect="dark" v-if="scope.row.status === 0">{{
                statusOptions[scope.row.status]
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号"
            width="150"
            align="center"
        />
        <el-table-column
            prop="备注"
            label="remark"
            width="150"
            align="center"
        />
        <el-table-column
            prop="create_at"
            label="时间"
            align="center"
            width="160"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="230">
          <template #default="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)"
            >编辑
            </el-button
            >
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index)"
            >删除
            </el-button
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
        <el-form-item label="头像" prop="avatar">
          <AvatarUpload v-model="temp.avatar"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name" placeholder="请填写姓名"/>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :md="12">
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="temp.nickname" placeholder="请填写昵称"/>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="temp.username" placeholder="请填写用户名"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="角色" prop="roleName">
          <el-select
              v-model="temp.roleName"
              multiple
              placeholder="请选择"
              style="width: 100%"
          >
            <el-option
                v-for="item in roleList"
                :key="item"
                :label="item"
                :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-select
              v-model="temp.departmentName"
              placeholder="请选择"
              style="width: 100%"
          >
            <el-option
                v-for="item in departmentList"
                :key="item"
                :label="item"
                :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :md="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="temp.phone" placeholder="请填写手机号码"/>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="temp.email" placeholder="请填写邮箱"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input
              v-model="temp.remark"
              placeholder="请填写备注"
              type="textarea"
              :rows="2"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="temp.status" :label="1">开启</el-radio>
          <el-radio v-model="temp.status" :label="0">关闭</el-radio>
        </el-form-item>
        <el-form-item label="">
          <i class="el-icon-warning"></i>
          <span style="margin-left: 6px">新增用户默认密码为：123456</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false"> 取消</el-button>
        <el-button
            type="success"
            @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import AvatarUpload from "@/components/avatar-upload";
import {toRefs} from "vue";
import useUser from "./useUser";

export default {
  name: 'user',
  components: {AvatarUpload},
  setup() {
    const state = useUser();

    state.queryUserList();

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