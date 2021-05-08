<template>
  <div class="app-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <icon-svg name="international" />
          <span>切换语言</span>
        </div>
      </template>
      <div style="margin-top: 20px">
        <el-radio-group v-model="lang" size="small">
          <el-radio label="zh-cn" border>简体中文</el-radio>
          <el-radio label="en" border>English</el-radio>
        </el-radio-group>
      </div>
    </el-card>
    <h4>当前语言：{{ language }}</h4>
    <el-link type="primary" disabled>{{ $t("message.hello") }}</el-link>

    <el-row :gutter="20" style="margin: 100px 15px 50px">
      <el-col :span="24" >
        <div class="block">
          <el-button class="item-btn" size="small">
            {{ $t("i18nView.default") }}
          </el-button>
          <el-button class="item-btn" size="small" type="primary">
            {{ $t("i18nView.primary") }}
          </el-button>
          <el-button class="item-btn" size="small" type="success">
            {{ $t("i18nView.success") }}
          </el-button>
          <el-button class="item-btn" size="small" type="info">
            {{ $t("i18nView.info") }}
          </el-button>
          <el-button class="item-btn" size="small" type="warning">
            {{ $t("i18nView.warning") }}
          </el-button>
          <el-button class="item-btn" size="small" type="danger">
            {{ $t("i18nView.danger") }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import local from "./local";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
export default {
  name: "i18n",
  setup() {
    const { t, locale, getLocaleMessage, mergeLocaleMessage } = useI18n({
      useScope: "global",
    });
    const store = useStore();

    const lang = computed({
      get: () => store.getters.language,
      set: (lang) => {
        locale.value = lang;
        store.dispatch("app/setLanguage", lang);
      },
    });

    const language = computed(() => t("message.lang"));

    if (!getLocaleMessage("en")['i18nView']) {
      mergeLocaleMessage("en", local.en);
      mergeLocaleMessage("zh-cn", local.zh);
    }

    return { t, lang, language };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
  padding: 20px;
}

.box-card {
  width: 600px;
  max-width: 100%;
  margin: 20px auto;

  .card-header {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }
}

.item-btn {
  margin-bottom: 15px;
  margin-left: 10px;
}
</style>