<template>
  <van-cell>
    <template slot="title">
      <div class="btn">
        <van-button @click="doThumbsDown" type="info" v-if="obj.attitude===1" icon="good-job-o">点赞</van-button>
        <van-button @click="doThumbsUp" v-else icon="good-job-o">取消点赞</van-button>
        <van-button @click="doHate" v-if="obj.attitude===0" icon="like-o" type="danger">喜欢</van-button>
        <van-button @click="doLike" v-else icon="like-o">取消喜欢</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
import { thumbsUp, thumbsDown, iLike, iHate } from "@/api/userInfo";
export default {
  props: ["obj"],
  methods: {
    async doThumbsUp() {
      try {
        await thumbsUp(this.obj.art_id);
        //行内不能用this
        this.obj.attitude = 1;
        this.$toast.success("点赞成功");
      } catch (error) {
        this.$toast.fail("网络超时,请重试");
      }
    },
    async doThumbsDown() {
      try {
        await thumbsDown(this.obj.art_id);
        //行内不能用this
        this.obj.attitude = -1;
        this.$toast.success("取消成功");
      } catch (error) {
        this.$toast.fail("网络超时,请重试");
      }
    },
    async doLike() {
      try {
        await iLike(this.obj.art_id);
        //行内不能用this
        this.obj.attitude = 0;
        this.$toast.success("喜欢");
      } catch (error) {
        this.$toast.fail("网络超时,请重试");
      }
    },
    async doHate() {
      try {
        await iHate(this.obj.art_id);
        //行内不能用this
        this.obj.attitude = -1;
        this.$toast.success("点赞成功");
      } catch (error) {
        this.$toast.fail("网络超时,请重试");
      }
    }
  }
};
</script>

<style lang='less' scoped>
.btn {
  text-align: center;
  .van-button {
    margin: 0 30px;
    border-radius: 10px;
  }
}
</style>