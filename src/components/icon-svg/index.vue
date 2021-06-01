<template>
  <svg class="icon-svg" aria-hidden="true" v-bind="$attrs">
    <use :xlink:href="iconName" ></use>
  </svg>
</template>

<script>
import { computed } from "vue";
export default {
  name: "icon-svg",
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {
    const iconName = computed(() => {
      if(props.name.includes('icon-')){
        return `#${props.name}`;
      } else {
        return `#icon-${props.name}`;
      }
    });

    return {
      iconName,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon-svg {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
  pointer-events: none;
}
</style>