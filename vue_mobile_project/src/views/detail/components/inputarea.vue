<template>
  <div class="bottom">
    <van-cell>
      <template slot="title">
        <div class="bottom-area">
          <!-- 输入框 -->
          <div class="input-area">
            <van-cell-group>
              <van-field v-model="msg" placeholder="请输入评论">
                <template slot="left-icon">
                  <van-icon name="edit" />
                </template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- sendbtn -->
          <div class="sendbtn">
            <van-button type="primary" size="normal" round @click="sendData">发送</van-button>
          </div>
          <!-- 点击收藏按钮 -->
          <div class="star">
            <van-icon name="star-o" />
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { sendComment } from "@/api/comment";
export default {
  props: ["obj"],
  data() {
    return {
      msg: ""
    };
  },
  methods: {
    async sendData() {
      //点击发送数据给父组件,这里是文章评论
      try {
        this.$login();
        let res = await sendComment({
          target: this.obj.art_id,
          content: this.msg
        });
        console.log(res); //将子组件的值传递给父组件
        this.$emit("getMyData", res);
        this.msg = "";
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
}
.bottom-area {
  display: flex;
  text-align: center;
  .input-area {
    flex: 1;
    width: 100%;
    .van-field {
      background-color: #eee;
      border-radius: 20px;
    }
  }
  .sendbtn {
    margin: 0 20px;
  }
  .star {
    font-size: 26px;
    margin: 10px auto;
  }
}
</style>