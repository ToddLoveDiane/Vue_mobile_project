<template>
  <div class="home">
    <!-- 头部 -->
    <van-nav-bar title="首页" />
    <!-- 标签栏 -->
    <!-- 频道+列表栏 -->
    <van-tabs v-model="active">
      <van-tab title="标签 1">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
      <div class="myicon" @click="showPop" slot="nav-right">
        <van-icon name="wap-nav" />
      </div>
    </van-tabs>
    <!-- 弹出框 -->
    <van-popup v-model="show" position="bottom" :style="{ height: '80%' }">
      <van-grid>
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
        <van-grid-item icon="photo-o" text="文字" />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ],
      loading: false,
      finished: false,
      show: false
    };
  },
  methods: {
    onload() {
      console.log(1);
    },
    showPop() {
      this.show = true;
    }
  }
};
</script>

<style lang='less'>
.home {
  margin-bottom: 90px;
  margin-top: 50px;
}
.home /deep/ .van-tabs__wrap {
  position: fixed;
  top: 50px;
  z-index: 999;
  left: 0px;
  width: 90%;
}
.myicon {
  position: fixed;
  top: 63px;
  right: 10px;
}
</style>