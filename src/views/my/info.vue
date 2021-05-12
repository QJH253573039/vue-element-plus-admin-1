<template>
  <div class="app-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="220px"
      class="form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.avatar" :src="form.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import storage from "@/utils/storage";
import { reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "info",
  setup() {
    let userInfo = storage.get("userInfo");
    const formRef = ref(null);
    const state = reactive({
      form: {
        username: userInfo.username,
        name: userInfo.name,
        avatar: userInfo.avatar,
        password: "****************",
        email: userInfo.email,
      },
      rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 1, message: '长度最少 1 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          password: [
            { min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur' }
          ],
      },
    });

    const submitForm = () => {
        formRef.value.validate((valid)=>{
            if(valid){
                ElMessage.success('用户信息更新成功')
            } else {
                return false;
            }
        })
    };

    const handleAvatarSuccess = (res, file) => {
      state.form.avatar = URL.createObjectURL(file.raw);
    };

    const beforeAvatarUpload = (file) => {
      const fileType = ["image/jpeg", "image/png"];
      const isJPG = fileType.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ElMessage.error("上传头像图片只能是 JPG、PNG 格式!");
      }
      if (!isLt2M) {
        ElMessage.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    };

    return {
        formRef,
      ...toRefs(state),
      submitForm,
      handleAvatarSuccess,
      beforeAvatarUpload,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  background-color: #fff;
}

.form {
  padding: 10px;
  max-width: 900px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>