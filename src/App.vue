<template>
  <el-config-provider :locale="locale">
    <div id="root">
      <router-view/>
    </div>
  </el-config-provider>
</template>

<script>
import {ElConfigProvider, ElNotification} from 'element-plus'
import {defineComponent, reactive, toRefs} from "vue";
import {useStore} from "vuex";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      locale: store.getters.language
    });

    return {
      ...toRefs(state)
    }
  },
})
</script>

<style lang="scss" ></style>