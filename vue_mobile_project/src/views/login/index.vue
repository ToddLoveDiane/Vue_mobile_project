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
      <van-button type="info" size="large" @click="doLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mobile: "18888888888",
      code: "246810"
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
    doLogin() {
      this.$validator.validate().then(valid => {
        if (valid) {
          //点击按钮发送axios请求获取数据
          axios
            .post(`http://ttapi.research.itcast.cn/app/v1_0/authorizations`, {
              mobile: this.mobile,
              code: this.code
            })
            .then(res => {
              console.log(res);
              //返回一个带有token的字符串
              //将token存储到localstorage中,然后跳转到主页即可
              let user= res.data.data.token;
              window.localStorage.getItem('token',JSON.stringify(user));
              this.$router.push('/home')
            });
        }
      });
    }
  },
  mounted() {
    this.myrule();
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