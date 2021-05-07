<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>切换主题色</span>
        </div>
      </template>
      <theme-picker @change="themeChange" />
    </el-card>

    <div class="block">
      <el-button type="primary"> Primary </el-button>
      <el-button type="success"> Success </el-button>
      <el-button type="info"> Info </el-button>
      <el-button type="warning"> Warning </el-button>
      <el-button type="danger"> Danger </el-button>
    </div>

    <div class="block">
      <el-button type="primary" icon="el-icon-edit" />
      <el-button type="primary" icon="el-icon-share" />
      <el-button type="primary" icon="el-icon-delete" />
      <el-button type="primary" icon="el-icon-search"> Search </el-button>
      <el-button type="primary">
        Upload
        <i class="el-icon-upload el-icon-right" />
      </el-button>
    </div>
  </div>
</template>

<script>
import ThemePicker from "@/components/theme-picker";
import { useStore } from "vuex";
export default {
  name: "theme",
  components: { ThemePicker },
  setup() {
    const store = useStore();
    const themeChange = (val) => {
      store.dispatch("settings/changeSetting", {
        key: "theme",
        value: val,
      });
    };

    return {
      themeChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
}
.block {
  padding: 30px 24px;
}
.tag-item {
  margin-right: 15px;
}
</style>