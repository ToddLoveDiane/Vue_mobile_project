<template>
  <div class="bottom">
    <van-cell>
      <template slot="title">
        <div class="bottom-area">
          <!-- 输入框 -->
          <div class="input-area">
            <van-cell-group>
              <van-field value="1111" placeholder="请输入评论">
                <template slot="left-icon">
                  <van-icon name="edit" />
                </template>
              </van-field>
            </van-cell-group>
          </div>
          <!-- sendbtn -->
          <div class="sendbtn">
            <van-button type="primary" size="normal" round>发送</van-button>
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
export default {
  data() {
    return {
      value: ""
    };
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
  .star{
    font-size: 26px;
    margin: 10px auto
  }
}
</style>