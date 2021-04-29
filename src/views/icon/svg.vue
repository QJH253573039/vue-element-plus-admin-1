<template>
  <div class="svg-container">
    <div class="title">Svg 图标</div>
    <ul class="icon-list">
      <li
        v-for="(icon, index) in icons"
        :key="index"
        @click="handleClipboard(icon, $event)"
      >
        <el-tooltip effect="dark" placement="top">
          <template #content>
            {{ generateIconCode(icon) }}
          </template>
          <div class="icon-item">
            <span class="icon">
              <icon-svg :name="icon" />
            </span>
            <span class="icon-name">{{ icon }}</span>
          </div>
        </el-tooltip>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";
import clipboard from "@/utils/clipboard";
import svgIcons from "./svg-icons";
export default {
  name:'svg',
  setup() {
    const icons = ref(svgIcons);
    const generateIconCode = (name) => {
      return `<icon-svg name="${name}" />`;
    };
    const handleClipboard = (name, event) => {
      let text = generateIconCode(name);
      clipboard(text, event);
    };
    return {
      icons,
      generateIconCode,
      handleClipboard,
    };
  },
};
</script>

<style lang="scss" scoped>
.svg-container {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 3px;
  background-color: #fff;

  .title {
    font-weight: 400;
    color: #1f2f3d;
    font-size: 28px;
  }


  .icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border: 1px solid #eaeefb;
    border-radius: 4px;

    li {
      float: left;
      width: 16.66%;
      text-align: center;
      height: 120px;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;

      .icon-item {
        width: 100%;
        height: 100%;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        .icon,
        .icon-name {
          color: #5cb6ff !important;
        }
      }

      .icon {
        font-size: 32px;
        margin-bottom: 15px;
      }

      .icon-name {
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        color: #99a9bf;
        transition: color 0.15s linear;
      }
    }
  }
}
</style>