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

    ElNotification({
      title: 'Success',
      message: '排班计划已推送',
      type: 'success',
      duration:10000000
    })

    return {
      ...toRefs(state)
    }
  },
})
</script>

<style lang="scss" ></style>