<template>
  <div class="app-container">
    <div id="map" class="chart"></div>
  </div>
</template>

<script>
export default {
  name:'map',
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>