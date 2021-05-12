<template>
  <div class="content">
    <el-row>
      <el-col :md="24">
        <div class="title">Vue-ElementPlus-Admin</div>
        <div class="links">
          <a
            href="https://github.com/TheFirework/vue-element-plus-admin.git"
            target="_blank"
            >GitHub</a
          >
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :md="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Navigator</span>
            </div>
          </template>
          <div class="box-body">
            <el-table
              :data="environment"
              stripe
              style="width: 100%"
              :show-header="false"
              max-height="500"
            >
              <el-table-column>
                <template #default="scope">
                  <div class="row">
                    <span class="env">{{ scope.row.name }}</span>
                    <span>{{ scope.row.value }} </span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :md="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Dependencies</span>
            </div>
          </template>
          <div class="box-body">
            <el-table
              :data="dependencies"
              stripe
              style="width: 100%"
              :show-header="false"
              max-height="500"
            >
              <el-table-column>
                <template #default="scope">
                  <div class="row">
                    <span class="label">{{ scope.row.name }}</span>
                    <el-tag effect="dark">{{ scope.row.value }} </el-tag>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dependencies } from "@/utils/package.js";
import { reactive, toRefs } from "vue";
export default {
  name: "dashboard",
  setup() {
    let environment = [
      {
        name: "appCodeName",
        value: navigator.appCodeName,
      },
      {
        name: "appName",
        value: navigator.appName,
      },
      {
        name: "appVersion",
        value: navigator.appVersion,
      },
      {
        name: "cookieEnabled",
        value: navigator.cookieEnabled,
      },
      {
        name: "platform",
        value: navigator.platform,
      },
      {
        name: "userAgent",
        value: navigator.userAgent,
      },
      {
        name: "language",
        value: navigator.language,
      },
      {
        name: "mimeTypes",
        value: navigator.mimeTypes,
      },
      {
        name: "onLine",
        value: navigator.onLine,
      },
    ];

    const genDependencies = () => {
      let list = [];
      for (const key in dependencies) {
        list.push({
          name: key,
          value: dependencies[key],
        });
      }

      return list;
    };

    const state = reactive({
      dependencies: genDependencies(),
      environment,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  min-height: 250px;
  padding: 15px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;

  .title {
    font-size: 50px;
    color: #636b6f;
    font-weight: 100;
    display: block;
    text-align: center;
    margin: 20px 0 10px 0px;
  }

  .links {
    text-align: center;
    margin-bottom: 20px;

    a {
      color: #636b6f;
      padding: 0 25px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.1rem;
      text-decoration: none;
      text-transform: uppercase;
    }
  }

  :deep .el-card__body {
    padding: 0;
    position: relative;
    overflow: hidden;
    height: 500px;
  }
}

.box-body {
  width: auto;
  height: 500px;
}

.row {
  display: flex;
  align-items: center;
  overflow-x: auto;
}

.env{
  flex-shrink: 0;
  width: 120px;
  display: inline-block;
}

.label {
  flex-shrink: 0;
  width: 140px;
  display: inline-block;
}
</style>
