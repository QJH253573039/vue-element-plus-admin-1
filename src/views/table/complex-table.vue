<template>
  <div class="app-container">
    <div class="container-header">
      <div>
        <filter-switch>
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
                <el-option label="上架" :value="1"></el-option>
                <el-option label="下架" :value="0"></el-option>
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
        <el-button type="primary" icon="el-icon-plus" size="small"
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
      >
        <el-table-column prop="id" label="ID" width="100" v-if="hasParam('id')">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          v-if="hasParam('title')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          v-if="hasParam('author')"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="star"
          label="评分"
          v-if="hasParam('star')"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          v-if="hasParam('status')"
          width="120"
        >
          <template #default="scope">
            <el-tag type="success" effect="dark" v-if="scope.row.status"
              >上架</el-tag
            >
            <el-tag type="danger" effect="dark" v-else>下架</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="阅读数"
          v-if="hasParam('viewCount')"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="create_at"
          label="时间"
          v-if="hasParam('create_at')"
          width="160"
        >
          <template #default="scope">
            {{ handleFormatDate(scope.row.create_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger">删除</el-button>
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
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import { getTableList } from "@/api/table";
import { formatDate } from "@/utils/date";
export default {
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
    };
  },
};
</script>

<style lang="scss" scoped>
</style>