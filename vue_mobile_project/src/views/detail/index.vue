<template>
  <div class="detail_top">
    <!-- 头部 -->
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 标题 -->
    <van-cell>
      <template slot="title">
        <div class="mytitle">我是标题栏打算看来大家奥克兰圣诞节快乐就立刻</div>
      </template>
    </van-cell>
    <!-- 用户信息 -->
    <user></user>
    <!-- 文章内容不需要抽取 -->
    <van-cell>
      <template slot="title">
        <div class="article">打篮球乌克兰的气味进口的环境空气温度和却看见我的空间千万别的空间千万别的空间</div>
      </template>
    </van-cell>
    <!-- 点赞和喜欢按钮 -->
    <likebtn></likebtn>
    <!--评论专区 -->
    <comment></comment>
    <!-- 输入专区 -->
    <inputarea></inputarea>
  </div>
</template>

<script>
import user from "@/views/detail/components/user";
import likebtn from "@/views/detail/components/likebtn";
import comment from "@/views/detail/components/comment";
import inputarea from "@/views/detail/components/inputarea";

export default {
  components: {
    user,
    likebtn,
    comment,
    inputarea
  }
};
</script>

<style lang='less' scoped>
.detail_top {
  margin-top: 46px;
  margin-bottom: 90px;
}

.van-nav-bar {
  background: #1989fa;
  z-index: 99 !important;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.mytitle {
  font-size: 23px;
  font-weight: 700;
}
</style>