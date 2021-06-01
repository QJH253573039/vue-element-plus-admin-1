<template>
  <div class="app-container">
    <div class="container-header">
      <div>
        <filter-switch >
          <el-form ref="form" :model="filterForm" label-width="80px">
            <el-form-item prop="title" label="标题名称">
              <el-input
                v-model="filterForm.title"
                placeholder="请输入标题"
                class="w300"
              ></el-input>
            </el-form-item>
            <el-form-item prop="date" label="范围时间">
              <el-date-picker
                v-model="filterForm.date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="status" label="状态">
              <el-select v-model="filterForm.status" placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="审核中" :value="0"></el-option>
                <el-option label="上架" :value="1"></el-option>
                <el-option label="下架" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="submitForm"
                >筛选</el-button
              >
              <el-button size="small" @click="resetForm">清空</el-button>
            </el-form-item>
          </el-form>
        </filter-switch>
      </div>
    </div>
    <div class="app-body">
      <div class="custom-table-header">
        <div class="refresh-button" @click="refresh">
          <i class="el-icon-refresh"></i>
        </div>
        <el-button type="primary" icon="el-icon-plus" size="small" @click="handleCreate"
          >新增</el-button
        >
        <param-selector
          v-model:params="params"
          :list="paramsList"
          class="ml20"
        />
      </div>
      <el-table
        :data="tableData"
        border
        fit
        height="500"
        style="width: 100%"
        current-row-key="id"
        size="mini"
      >
        <el-table-column
          prop="id"
          align="center"
          label="ID"
          width="100"
          v-if="hasParam('id')"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="标题"
          v-if="hasParam('title')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          align="center"
          v-if="hasParam('author')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="star"
          label="评分"
          align="center"
          v-if="hasParam('star')"
          width="120"
        >
          <template #default="scope">
            <el-rate v-model="scope.row.star" disabled show-score> </el-rate>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          v-if="hasParam('status')"
          width="120"
        >
          <template #default="scope">
            <el-tag effect="dark" v-if="scope.row.status === 0">{{
              statusOptions[scope.row.status]
            }}</el-tag>
            <el-tag
              type="success"
              effect="dark"
              v-if="scope.row.status === 1"
              >{{ statusOptions[scope.row.status] }}</el-tag
            >
            <el-tag type="danger" effect="dark" v-if="scope.row.status === 2">{{
              statusOptions[scope.row.status]
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="阅读数"
          align="center"
          v-if="hasParam('viewCount')"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="create_at"
          label="时间"
          align="center"
          v-if="hasParam('create_at')"
          width="160"
        >
          <template #default="scope">
            {{ handleFormatDate(scope.row.create_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230">
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
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="temp.author" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="temp.status" placeholder="Please select">
            <el-option label="审核中" :value="0"></el-option>
            <el-option label="上架" :value="1"></el-option>
            <el-option label="下架" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评分" prop="star">
          <el-rate
            v-model="temp.star"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top: 8px"
          />
        </el-form-item>
        <el-form-item label="阅读数" prop="viewCount">
          <el-input v-model="temp.viewCount" type="number"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import {ElNotification} from 'element-plus';
import { getTableList } from "@/api/table";
import { formatDate } from "@/utils/date";
export default {
  name:'complex-table',
  setup() {
    const form = ref(null);

    // 需要显示的参数列表
    const paramsList = [
      {
        key: "ID",
        value: "id",
      },
      {
        key: "Title",
        value: "title",
      },
      {
        key: "作者",
        value: "author",
      },
      {
        key: "评分",
        value: "star",
      },
      {
        key: "状态",
        value: "status",
      },
      {
        key: "阅读数",
        value: "viewCount",
      },
      {
        key: "时间",
        value: "create_at",
      },
    ];

    let keys = paramsList.map((item) => item.value);

    const state = reactive({
      pagination: {
        pageNo: 1,
        pageSize: 10,
      },
      filterForm: {
        title: "",
        status: "",
        date: [],
      },
      tableData: [],
      params: keys,
      temp: {
        id: undefined,
        author: "",
        create_at: undefined,
        star: "",
        status: undefined,
        title: "",
        viewCount: undefined,
      },
      dialogTitleMap: {
        update: "Edit",
        create: "Create",
      },
      dialogStatus: "",
      dialogFormVisible: false,
      statusOptions: {
        0: "审核中",
        1: "上架",
        2: "下架",
      },
      rules: {
        title: [{ required: true, message: "标题必须", trigger: "change" }],
        author: [{ required: true, message: "作者必须", trigger: "change" }],
      },
    });

    // 筛选
    const submitForm = () => {
      queryList(state.pagination);
    };

    // 重置
    const resetForm = () => {
      form.value.resetFields();
    };

    // 列表数据
    const queryList = async () => {
      let payload = state.pagination;
      const { code, data } = await getTableList(payload);
      if (code === 200) {
        const { rows, ...pagination } = data;
        state.tableData = rows;
        state.pagination = pagination;
      }
    };

    // 刷新
    const refresh = () => {
      queryList();
    };

    // 切换每页条数
    const handleSizeChange = (size) => {
      state.pagination.pageSize = size;
      queryList();
    };

    // 切换页码
    const handleCurrentChange = (pageNo) => {
      state.pagination.pageNo = pageNo;
      queryList();
    };

    // 格式化时间
    const handleFormatDate = (time) => {
      return formatDate(time);
    };

    // 是否显示参数
    const hasParam = (key) => {
      return state.params.includes(key);
    };

    const handleDelete = (index) => {
      state.tableData.splice(index, 1);
    };

    const handleEdit = (row) => {
      state.temp = Object.assign({}, row);
      state.dialogStatus = "update";
      state.dialogFormVisible = true;
    };

    const resetTemp = () => {
        state.temp = {
            id: undefined,
            author: "",
            create_at: undefined,
            star: "",
            status: undefined,
            title: "",
            viewCount: undefined,
        }
    }

    const handleCreate = () => {
        resetTemp()
        state.dialogStatus = 'create';
        state.dialogFormVisible = true;
    }

    const updateData = () => {
      form.value.validate((valid) => {
        if (valid) {
          const index = state.tableData.findIndex(
            (v) => v.id === state.temp.id
          );
          state.tableData.splice(index, 1, state.temp);
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

    const createData = () => {
        form.value.validate((valid) => {
        if (valid) {
          state.temp.id = parseInt(Math.random() * 100) + 1024;
          state.temp.create_at = 1568861371000;

          state.tableData.unshift(state.temp)
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

    queryList();

    return {
      ...toRefs(state),
      paramsList,
      form,
      resetForm,
      submitForm,
      refresh,
      handleSizeChange,
      handleCurrentChange,
      handleFormatDate,
      hasParam,
      handleDelete,
      handleEdit,
      handleCreate,
      updateData,
      createData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>