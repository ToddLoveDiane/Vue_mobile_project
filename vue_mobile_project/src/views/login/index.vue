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
        label="用户名"
        placeholder="请输入正确的手机号"
      />
      <van-field
        v-model="code"
        left-icon="eye-o"
        type="text"
        label="密码"
        placeholder="请输入验证码"
        required
      />
    </van-cell-group>
    <!-- 按钮 -->
    <div class="mybtn">
      <van-button type="info" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: "",
      code: ""
    };
  }
};
</script>

<style lang='less' scoped>
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