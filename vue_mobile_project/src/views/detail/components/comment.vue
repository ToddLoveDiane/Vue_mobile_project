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
          <!-- 用户名 -->
          <div class="nickname">
            <van-cell>
              <template slot="title">我吃西红柿</template>
            </van-cell>
          </div>
          <!-- 点赞按钮 -->
          <div class="btn">
            <van-cell>
              <van-icon name="good-job-o" />9999
            </van-cell>
          </div>
          <!-- 评论 -->
        </div>
        <div class="mycontent">111111111111111111111111111</div>
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
  .btn {
    .van-cell__value--alone {
      line-height: 21px;
    }
  }
}
.mycontent {
  margin-left: 66px;
  margin-top: -16px;
}
</style>