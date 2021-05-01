<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="直接使用" name="directly">
        <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width: 400px; max-width: 100%"
        />
        <el-button
          type="primary"
          icon="el-icon-document"
          @click="handleClipboard(inputData, $event)"
        >
          copy
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="指令使用" name="directive">
            <el-input
          v-model="inputData"
          placeholder="Please input"
          style="width:400px; max-width:100%;"
        />
        <el-button
          v-clipboard:copy="inputData"
          v-clipboard:success="clipboardSuccess"
          type="primary"
          icon="el-icon-document"
        >
          copy
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { handleClipboard,clipboardSuccess } from "@/utils/clipboard";
export default {
  name: "clipboard",
  setup() {
    const state = reactive({
      activeName: "directly",
      inputData: "https://github.com/TheFirework/vue-element-plus-admin",
      handleClipboard: handleClipboard,
      clipboardSuccess:clipboardSuccess
    });

    console.log(state);

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
}
</style>