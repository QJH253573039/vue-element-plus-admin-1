<template>
  <div class="components-container">
    <div>
      <tinymce v-model:value="content" :height="300" />
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/tinymce'
import { ref } from 'vue'

export default {
  name: 'ricttext',
  components: { Tinymce },
  setup(){
    const content = ref('');
    return {
      content
    }
  },
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

