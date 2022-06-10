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
        </div>
      </div>

      <el-table
        :data="list"
        row-key="id"
        border
        style="height: 100%"
        default-expand-all
        :tree-props="{ children: 'children' }"
        size="mini"
      >
        <el-table-column prop="name" label="名称" align="left" width="260" />
        <el-table-column prop="icon" label="图标" align="center" width="100">
          <template #default="scope">
            <icon-svg :name="scope.row.icon" v-if="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" align="center" width="100">
          <template #default="scope">
            <el-tag effect="dark">{{ typeOptions[scope.row.type] }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="router"
          label="节点路由"
          align="center"
          width="240"
        />
        <el-table-column
          prop="keepAlive"
          label="路由缓存"
          align="center"
          width="100"
        >
          <template #default="scope">
            <div v-if="scope.row.type == 1">
              <i class="el-icon-check" v-if="scope.row.keepAlive"></i>
              <i class="el-icon-close" v-else></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewPath"
          label="文件路径"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="create_at"
          label="更新时间"
          align="center"
          width="150"
        />
        <el-table-column label="操作" fixed="right" align="center" width="150">
          <template #default="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleCreateToRaw(scope.row.id)"
              >新增</el-button
            >
            <el-button type="text" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="mini" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      v-model="dialogFormVisible"
      :close-on-click-modal="false"
      style="width: 960px"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-width="100px">
        <el-form-item label="节点类型" prop="type">
          <el-radio-group v-model="temp.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="节点名称" prop="name" required>
          <el-input v-model="temp.name" placeholder="请输入节点名称"></el-input>
        </el-form-item>
        <el-form-item label="上级节点" prop="parentId">
          <MenuTree v-model:value="temp.parentId" :menuList="menuList" />
        </el-form-item>
        <el-form-item label="节点路由" prop="router" v-if="temp.type == 1">
          <el-input v-model="temp.router" placeholder="请输入节点路由" />
        </el-form-item>
        <el-form-item label="路由缓存" prop="keepAlive" v-if="temp.type == 1">
          <el-radio-group v-model="temp.keepAlive">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="isShow" label="是否显示">
          <el-switch v-model="temp.isShow" />
        </el-form-item>
        <el-form-item label="文件路径" prop="viewPath" v-if="temp.type == 1">
          <MenuFilePath v-model:value="temp.viewPath" placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="icon" label="节点图标">
          <MenuIcons v-model:value="temp.icon" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
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
import { reactive, toRefs, ref } from "vue";
import { ElNotification, ElMessageBox,ElMessage } from "element-plus";
import { getMenuList } from "@/api/user";
import { deepTree } from "@/utils";
import _ from "lodash";
import MenuTree from "@/components/menu-tree";
import MenuIcons from "@/components/menu-icons";
import MenuFilePath from "@/components/menu-file-path";

export default {
  name:'menu',
  components: { MenuTree, MenuIcons, MenuFilePath },
  setup() {
    const dataForm = ref(null);
    const state = reactive({
      menuList: [],
      list: [],
      typeOptions: {
        0: "目录",
        1: "菜单",
      },
      dialogFormVisible: false,
      dialogTitleMap: {
        update: "Edit",
        create: "Create",
      },
      dialogStatus: "",
      temp: {
        type: 0,
        name: "",
        parentId: "",
        isShow: true,
        icon: "",
        router: "",
        keepAlive: 1,
        viewPath: "",
      },
      rules: {
        name: [{ required: true, message: "节点名称必须", trigger: "blur" }],
      },
    });

    const refresh = () => {
      queryMenuList();
    };

    const queryMenuList = async () => {
      const result = await getMenuList();
      if (result.code == 200) {
        state.menuList = _.cloneDeep(result.data);
        state.list = deepTree(result.data);
      }
    };

    const resetTemp = () => {
      state.temp = {
        type: 0,
        name: "",
        parentId: "",
        isShow: true,
        icon: "",
        router: "",
        keepAlive: 1,
        viewPath: "",
      };
    };

    const handleCreate = () => {
      resetTemp();
      state.dialogStatus = "create";
      state.dialogFormVisible = true;
    };

    const handleCreateToRaw = (parentId) => {
      resetTemp();
      state.temp.parentId = parentId;
      state.dialogStatus = "create";
      state.dialogFormVisible = true;
    };

    const handleEdit = (row) => {
      state.temp = Object.assign({}, row);
      state.dialogStatus = "update";
      state.dialogFormVisible = true;
    };

    const createData = () => {
      dataForm.value.validate((valid) => {
        if (valid) {
          //提交数据重新请求
          state.dialogFormVisible = false;
          ElNotification({
            title: "Success",
            message: "创建成功",
            type: "success",
            duration: 2000,
          });
        }
      });
    };

    const updateData = () => {
      dataForm.value.validate((valid) => {
        if (valid) {
          //提交数据 重新请求
          state.dialogFormVisible = false;
          ElNotification({
            title: "Success",
            message: "更新完成",
            type: "success",
            duration: 2000,
          });
        }
      });
    };

    const handleDelete = (row) => {
      ElMessageBox.confirm(`是否删除 ${row.name}？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage.success("删除成功!");
        })
        .catch(() => {
          console.log("已取消删除");
        });
    };

    refresh();

    return {
      dataForm,
      ...toRefs(state),
      refresh,
      getMenuList,
      handleCreate,
      handleCreateToRaw,
      handleEdit,
      createData,
      updateData,
      handleDelete,
    };
  },
};
</script>

<style lang="scss" scoped></style>