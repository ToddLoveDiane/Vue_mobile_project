<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="bar">
          <!-- 图片 -->
          <div class="img">
            <img :src="obj.aut_photo" alt />
          </div>
          <!-- 用户详情 -->
          <div class="nickname">
            <van-cell>
              <template slot="title">{{obj.aut_name}}</template>
              <template slot="label">{{obj.pubdate | dateformat}} 来自iphone客户端</template>
            </van-cell>
          </div>
          <!-- 关注按钮 -->
          <div class="btn">
            <van-button v-if="obj.is_followed===false" type="primary" @click="toFollow" icon="plus" size="normal">关注</van-button>
            <van-button v-else @click="outFollow" class="cancel" size="normal">取消关注</van-button>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getFollow, noFollow } from "@/api/userInfo";
export default {
  props: ["obj"],
  data() {
    return {};
  },
  methods: {
    async toFollow() {
      try {
        await getFollow(this.obj.aut_id);
        //行内不能用this
        this.obj.is_followed = true;
        this.$toast.success("关注成功");
      } catch (error) {
        this.$toast.fail("网络超时,请重试");
      }
    },
    async outFollow() {
      try {
        await noFollow(this.obj.aut_id);
        //行内不能用this
        this.obj.is_followed = false;
        this.$toast.success("取关成功");
        console.log(this.obj.is_followed);
      } catch (error) {
        this.$toast.fail("取关失败");
        console.log(error);
      }
    }
  }
};
</script>

<style lang='less' scoped>
.bar {
  display: flex;
  align-items: center;
  .img {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .nickname {
    flex: 1;
  }
  .cancel {
    background-color: #eee;
    border-radius: 5px;
  }
}
</style>