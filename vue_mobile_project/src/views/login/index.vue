<template>
  <div class="mylogin">
    <!-- 头部 -->
    <van-nav-bar class="myhead" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-model="mobile"
        left-icon="contact"
        clearable
        required
        label="手机号"
        placeholder="请输入正确的手机号"
        v-validate="'required'"
        name="mobile"
      />
      <span>{{ errors.first('mobile') }}</span>
      <van-field
        v-model="code"
        left-icon="eye-o"
        type="text"
        label="验证码"
        placeholder="请输入验证码"
        required
        v-validate="'required'"
        name="code"
      />
      <span>{{ errors.first('code') }}</span>
    </van-cell-group>
    <!-- 按钮 -->
    <div class="mybtn">
      <van-button :loading="isLoading" type="info" size="large" @click="doLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/userInfo.js";
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810",
      isLoading: false
    };
  },
  methods: {
    myrule() {
      //自定义验证规则
      const dict = {
        // 自定义规则
        custom: {
          // 定义 age 的规则:age 规则的名称
          mobile: {
            required: "请输入手机号"
          },
          code: {
            required: () => "请输入验证码"
          }
        }
      };
      this.$validator.localize("zh_CN", dict);
    },
    async doLogin() {
      this.isLoading = true;
      //因为这个this.$validator.validate()也是promise对象,await表示t成功后执行的then方法
      let valid = await this.$validator.validate();
      if (valid) {
        // console.log("校验成功");
        // 1. 请求登录接口，提交数据
        // 1.1 通过异步请求将数据提交到服务器
        try {
          let res = await userLogin({
            mobile: this.mobile,
            code: this.code
          });
          this.$store.commit("setStore", res);
          // this.$router.push("/home");
          //这里的home路径不能写死,需要返回到上一级
          this.$router.back();
        } catch (error) {
          this.$toast.fail("登录失败,请重试");
          console.log(error);
        }
      }

      this.isLoading = false;
    }
  },
  mounted() {
    this.myrule();
  }
};
</script>

<style lang='less' scoped>
.mylogin {
  margin-top: 50px;
}
.myhead {
  background-color: #3296fa;
}
.mybtn {
  margin: 20px;
  .van-button--large {
    border-radius: 8px;
  }
}
</style>