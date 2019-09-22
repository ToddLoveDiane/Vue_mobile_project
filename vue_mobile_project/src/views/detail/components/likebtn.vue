<template>
  <van-cell>
    <template slot="title">
      <div class="btn">
        <van-button icon="good-job-o">点赞</van-button>
        <van-button icon="like-o" >喜欢</van-button>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.btn{
  text-align: center;
  .van-button{
    margin: 0 30px;
    border-radius: 10px
  }
}
</style>