<template>
  <div>
    <van-cell>
      <template slot="title">
        <div class="bar">
          <!-- 图片 -->
          <div class="img">
            <img :src="arComment.aut_photo" alt />
          </div>
          <!-- 用户名 -->
          <div class="nickname">
            <van-cell>
              <template slot="title">{{arComment.aut_name}}</template>
            </van-cell>
          </div>
          <!-- 点赞按钮 -->
          <div class="btn">
            <van-cell>
              <van-icon name="good-job-o" />
              {{arComment.like_count}}
            </van-cell>
          </div>
          <!-- 评论 -->
        </div>
        <div class="mycontent">
          <div>{{arComment.content}}</div>
          <div>
            <span style="margin-right:10px">{{arComment.pubdate|dateformat}}</span>
            <span>回复 ({{ arComment.reply_count }})</span>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ["arComment"]
};
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