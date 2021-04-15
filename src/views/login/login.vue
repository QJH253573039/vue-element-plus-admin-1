<template>
  <div class="page-wrap">
    <div class="box">
      <p class="title">Vue3-ElementPlus-Admin</p>
      <el-form
        label-position="top"
        label-width="80px"
        :model="formModel"
        ref="loginForm"
        :rules="rules"
      >
        <el-form-item label="用户名">
          <el-input v-model="formModel.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formModel.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref ,toRefs} from "vue";
import {useStore} from 'vuex';
import { useRouter } from 'vue-router'
import {login} from '@/api/user';
export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    const loginForm = ref(null);

    let state = reactive({
        formModel:{
            username: "admin",
            password: 123456,
        },
        loading:false,
        rules:{
            username: [{ required: true, message: '请输入用户名' }],
            password: [{ required: true, message: '请输入密码' }]
        }
    })


    function handleLogin() {
        loginForm.value.validate(async (valid)=>{
            if(valid){
                state.loading = true;
                const {code,data} = await login(state.formModel);
                if(code === 200){
                    store.dispatch('user/login',data);
                    router.replace({
                        path:'/'
                    })
                }
                state.loading = false;
            }
        })
    }

    return {
        ...toRefs(state),
        loginForm,
        handleLogin
    };
  },
};
</script>

<style scoped lang="scss">
.page-wrap {
  width: 100vw;
  height: 100vh;
  background-color: #2f3447;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      color: #ffffff;
      font-size: 14px;
      margin-bottom: 60px;
      letter-spacing: 1px;
    }

    &:deep .el-form-item {
      width: 300px;
    }

    &:deep .el-form-item__label {
      color: #ffffff;
      float: left;
    }

    &:deep .el-button {
      color: #000;
      width: 300px;
      margin-top: 20px;
    }
  }
}
</style>
