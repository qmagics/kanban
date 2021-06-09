<template>
  <div class="login-container">
    <el-form :model="vm" :rules="rules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录系统</h3>
      </div>

      <el-form-item prop="Account">
        <span class="svg-container">
          <svg-icon name="user" />
        </span>
        <el-input
          v-model="vm.Account"
          placeholder="请输入账号"
          name="Account"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="Password">
        <span class="svg-container">
          <svg-icon name="password" />
        </span>
        <el-input
          :key="passwordType"
          v-model="vm.Password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          autocomplete="on"
        />
        <span class="show-pwd" @click="togglePwd">
          <svg-icon :name="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >登 录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { login } from "@/service/user";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "Login",

  setup() {
    const vm = reactive({
      Account: "",
      Password: "",
      Token: "",
    });

    const rules = {};
    const capsTooltip = ref(false);
    const passwordType = ref("password");
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const redirect = ref("");
    const otherQuery = ref({});

    const handleLogin = async () => {
      loading.value = true;
      try {
        const { bl, msg } = await login(vm);

        if (bl) {
          router.push({
            path: redirect.value || "/",
            query: otherQuery.value,
          });
        } else {
          ElMessage.error(msg);
        }
      } finally {
        loading.value = false;
      }
    };

    const togglePwd = () => {
      if (passwordType.value === "password") {
        passwordType.value = "";
      } else {
        passwordType.value = "password";
      }
    };

    function getOtherQuery(query: any) {
      return Object.keys(query).reduce((acc: any, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }

    watchEffect(() => {
      const query: any = route.query;
      if (query) {
        redirect.value = query.redirect;
        otherQuery.value = getOtherQuery(query);
      }
    });

    return {
      vm,
      rules,
      loading,
      capsTooltip,
      passwordType,
      redirect,
      otherQuery,
      handleLogin,
      togglePwd,
    };
  },
});
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
