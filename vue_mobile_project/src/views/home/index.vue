<template>
  <div class="home">
    <!-- 头部 -->
    <van-nav-bar title="首页" />
    <!-- channel -->
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in channelList" :key="index" :title="item.name"></van-tab>
      <!-- icon -->
      <div class="myicon" slot="nav-right">
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
import { userchannel } from "@/api/channel";
export default {
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      show: false,
      channelList: []
    };
  },
  methods: {
    //获取频道数据
    async getChannel() {
      //拿到所有的数据
      let res = this.$store.state;
      if (res) {
        let user = await userchannel();
        this.channelList = user.channels;
      } else {
        //没有登录,查看缓存中是否有
        let user = JSON.parse(window.localStorage.getItem("channel"));
        if (user) {
          //如果有设置,就直接赋值
          this.channelList = user;
        } else {
          //没登录没设置
          let user = await userchannels();
          this.channelList = user.channels;
        }
      }
    }
  },
  mounted() {
    this.getChannel();
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