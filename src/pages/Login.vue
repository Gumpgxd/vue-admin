<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">网易云音乐后台管理系统</div>
      <el-form ref="login" label-width="0px" class="ms-content" :model="form">
        <el-form-item prop="accountNum">
          <i class="el-icon-user"></i>
          <el-input placeholder="请输入账号" v-model="form.username">
            <!-- <el-button icon="el-icon-search" slot="prepend"></el-button> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          >
            <el-button slot="prepend" icon="el-icon-lock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { handleError } from "./../http/api";
import { Login } from "../http/user/user";
import { useStore } from "vuex";
export default {
  setup() {
    interface message {
      username: string | number;
      password: string | number;
    }

    const store = useStore();

    const router = useRouter();

    let form: message = reactive({
      username: "",
      password: "",
    });

    const login = async () => {
      const data = await Login(form).catch(handleError);
      // window.sessionStorage.setItem('token',data.token)
      store.commit("addToken", data.token);
      router.push("/home");
    };
    return {
      form,
      login,
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("http://cool.gumpxd.cn/file/1637151537026.jpg");
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: rgb(141, 137, 137);
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(187, 185, 185, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>