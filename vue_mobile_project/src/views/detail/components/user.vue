<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="bar">
          <!-- 图片 -->
          <div class="img">
            <img
              src="https://static.zhihu.com/heifetz/assets/apple-touch-icon-152.67c7b278.png"
              alt
            />
          </div>
          <!-- 用户详情 -->
          <div class="nickname">
            <van-cell>
              <template slot="title">我吃西红柿</template>
              <template slot="label">11:11:11 来自iphone客户端</template>
            </van-cell>
          </div>
          <!-- 关注按钮 -->
          <div class="btn">
            <van-button icon="plus" size="normal">关注</van-button>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {};
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
}
</style>