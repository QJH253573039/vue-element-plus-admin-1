<template>
  <div class="sider-wrap">
    <div class="logo">
      <div v-if="!collapse" class="logo-title">{{ config.title }}</div>
      <div v-else :class="{collapse:collapse}" class="logo-title">{{config.subtitle}}</div>
    </div>
    <div class="menu">
      <side-menu :collapse="collapse"/>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import sideMenu from './side-menu';

export default {
  components: {sideMenu},
  props: {
    collapse: Boolean,
  },
  setup() {
    return {
      config
    };
  },
};
</script>

<style lang="scss" scoped>
.sider-wrap {
  height: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;

    .logo-title {
      color: #fff;
      font-size: 30px;
      text-align: center;
    }

    .collapse {
      width: 65px !important;
    }
  }

  .menu {
    height: calc(100% - 80px);
  }
}
</style>